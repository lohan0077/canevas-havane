"use client";

import { useEffect, useRef } from "react";

const SOMMETS = `attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }`;

// Trois couleurs qui coulent l'une dans l'autre, comme une aurore, avec un grain de
// pellicule. Un bruit fractal déformé par lui-même (domain warping).
const FRAGMENTS = `
precision mediump float;
uniform vec2 r; uniform float t; uniform vec3 c1; uniform vec3 c2; uniform vec3 c3;
float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(h(i), h(i + vec2(1.0, 0.0)), f.x), mix(h(i + vec2(0.0, 1.0)), h(i + vec2(1.0, 1.0)), f.x), f.y);
}
float fbm(vec2 p) { float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { v += a * n(p); p *= 2.03; a *= 0.5; } return v; }
void main() {
  vec2 uv = gl_FragCoord.xy / r;
  vec2 p = uv * vec2(r.x / r.y, 1.0) * 1.7;
  float q = fbm(p + vec2(t * 0.045, -t * 0.03));
  float w = fbm(p * 1.3 + q * 2.4 + vec2(-t * 0.035, t * 0.05));
  vec3 col = mix(c1, c2, smoothstep(0.28, 0.78, w));
  col = mix(col, c3, smoothstep(0.52, 0.92, fbm(p * 0.8 - q + t * 0.02)) * 0.8);
  col += (h(gl_FragCoord.xy + fract(t)) - 0.5) * 0.04;
  gl_FragColor = vec4(col, 1.0);
}`;

const rgb = (hex: string) => {
  const v = parseInt(hex.replace("#", ""), 16);
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255];
};

/**
 * Un fond animé dessiné par la carte graphique, aux couleurs du site : rien à
 * télécharger. Il remplit son parent (`relative`, qui porte aussi une couleur de
 * fond : c'est elle qu'on voit sans WebGL, et elle que lit la mesure de contraste).
 * Il s'arrête hors de l'écran ; avec « animations réduites », il reste figé.
 */
export default function FondVivant({
  couleurs,
  vitesse = 1,
  className = "",
}: {
  couleurs: [string, string, string];
  vitesse?: number;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [a, b, c] = couleurs;

  useEffect(() => {
    const toile = ref.current;
    const gl = toile?.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!toile || !gl) return;
    const compiler = (type: number, source: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, source);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compiler(gl.VERTEX_SHADER, SOMMETS));
    gl.attachShader(prog, compiler(gl.FRAGMENT_SHADER, FRAGMENTS));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    const u = (nom: string) => gl.getUniformLocation(prog, nom);
    gl.uniform3fv(u("c1"), rgb(a));
    gl.uniform3fv(u("c2"), rgb(b));
    gl.uniform3fv(u("c3"), rgb(c));

    // Une demi-résolution suffit à un dégradé flou, et ménage les téléphones.
    const taille = () => {
      const l = Math.max(1, Math.round(toile.clientWidth * 0.5));
      const h = Math.max(1, Math.round(toile.clientHeight * 0.5));
      if (toile.width !== l || toile.height !== h) {
        toile.width = l;
        toile.height = h;
        gl.viewport(0, 0, l, h);
      }
      gl.uniform2f(u("r"), l, h);
    };
    const dessiner = (s: number) => {
      taille();
      gl.uniform1f(u("t"), s);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const fige = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (fige) {
      dessiner(14);
      return;
    }
    let visible = true;
    let image = 0;
    const debut = performance.now();
    const boucle = (maintenant: number) => {
      if (visible) dessiner(14 + ((maintenant - debut) / 1000) * vitesse);
      image = requestAnimationFrame(boucle);
    };
    const obs = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    obs.observe(toile);
    image = requestAnimationFrame(boucle);
    return () => {
      cancelAnimationFrame(image);
      obs.disconnect();
    };
  }, [a, b, c, vitesse]);

  return <canvas ref={ref} aria-hidden="true" className={`absolute inset-0 h-full w-full ${className}`} />;
}
