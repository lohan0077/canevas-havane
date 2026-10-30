import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// La cérémonie sous la pluie du premier écran d'« Et s'il pleut » : une allée de pierre
// mouillée, six rangs de chaises blanches, une arche ronde fleurie, les invités de dos
// (des silhouettes, aucun visage), et la pluie qui tombe, rebondit sur le sol, les
// chaises et les toiles. Puis les parapluies jaunes s'ouvrent un à un, d'abord celui
// des mariés, et la vague gagne toute l'assemblée.
//
// Tout est construit et peint ici : géométries dans le code, textures dessinées dans un
// canvas, ciel et reflets calculés par des shaders. Aucun fichier chargé, aucun serveur
// tiers. Le hasard est graine fixe : la scène est la même à chaque visite, et l'affiche
// qui l'attend (une capture de cette même scène) lui ressemble trait pour trait.

/* ============================ le plan de la cérémonie ============================ */

const RANGEES = 6;
const PAR_COTE = 5;
const ECART_SIEGES = 0.58;
const ECART_RANGEES = 1.12;
const BORD_ALLEE = 0.98; // du milieu de l'allée au centre du premier siège
const PREMIER_RANG = -6.2; // les rangs suivants reculent vers la caméra
const Z_ARCHE = -9.1;
const Z_COUPLE = -8.2;
/** Les sièges laissés libres : la pluie y rebondit. [rangée, côté, siège] */
const LIBRES = ["5:1:4", "2:-1:4", "4:-1:3"];

/** La zone peinte du sol (le reste est une pelouse unie qui se perd dans la brume). */
const ZONE = { x: -9, z: -14, l: 18, p: 20 };

/** La longueur d'une baleine et du manche, en mètres, pour un parapluie d'échelle 1. */
const L_BALEINE = 0.58;
const L_MANCHE = 0.86;
const PRISE = 0.11; // la main tient la poignée à 11 cm du bas

/** Un hasard reproductible (mulberry32). */
function hasard(graine: number) {
  let a = graine >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const lisse = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const sortieRebond = (x: number, s = 1.7) => 1 + (s + 1) * (x - 1) ** 3 + s * (x - 1) ** 2;
const entreeSortie = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);

/** Le profil d'une baleine dans son plan : (rayon, hauteur sous la noix) à l'abscisse s. */
function profilBaleine(s: number, o: number): [number, number] {
  const phi0 = 0.05 + (1.66 - 0.05) * o;
  const kappa = 1.72 * Math.min(1.3, Math.max(0, o));
  if (kappa < 0.001) return [s * Math.sin(phi0), -s * Math.cos(phi0)];
  return [(Math.cos(phi0 - kappa * s) - Math.cos(phi0)) / kappa, (Math.sin(phi0 - kappa * s) - Math.sin(phi0)) / kappa];
}

/* ================================ les shaders ================================ */

// La même fonction sert à la toile et aux baleines : le parapluie se déforme dans le
// GPU, d'après une seule valeur par parapluie, son ouverture (0 fermé, 1 ouvert, un
// peu plus au moment où il claque).
const GLSL_PARAPLUIE = /* glsl */ `
attribute float aOuverture;
#define L_BALEINE ${L_BALEINE.toFixed(3)}
#define L_MANCHE ${L_MANCHE.toFixed(3)}
#define HUITIEME 0.785398
vec2 profilBaleine(float s, float o) {
  float phi0 = mix(0.05, 1.66, o);
  float kappa = 1.72 * clamp(o, 0.0, 1.3);
  if (kappa < 0.001) return vec2(s * sin(phi0), -s * cos(phi0));
  return vec2((cos(phi0 - kappa * s) - cos(phi0)) / kappa, (sin(phi0 - kappa * s) - sin(phi0)) / kappa);
}
vec3 pointToile(float sn, float w, float pan, float o) {
  vec2 b = profilBaleine(sn * L_BALEINE, o);
  float ouvert = clamp(o, 0.0, 1.0);
  // fermé, la toile roulée fait un fuseau autour du manche
  float r = b.x + (1.0 - ouvert) * 0.022 * sin(3.14159 * sn);
  float a0 = pan * HUITIEME;
  vec3 c0 = vec3(cos(a0), 0.0, sin(a0));
  vec3 c1 = vec3(cos(a0 + HUITIEME), 0.0, sin(a0 + HUITIEME));
  float a = a0 + w * HUITIEME;
  float gonfle = sin(3.14159 * w);
  // la toile tendue d'une baleine à l'autre, à peine bombée
  vec3 p = mix(c0, c1, w) * r + vec3(cos(a), 0.0, sin(a)) * gonfle * r * 0.035 * ouvert;
  // l'ourlet festonné : entre deux baleines, le bord remonte un peu
  p.y = L_MANCHE + b.y + gonfle * pow(sn, 3.0) * 0.05 * ouvert;
  return p;
}
`;

function deformerToile(mat: THREE.Material) {
  mat.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader
      .replace("#include <common>", `#include <common>\nattribute vec3 aToile;\n${GLSL_PARAPLUIE}`)
      .replace(
        "#include <beginnormal_vertex>",
        /* glsl */ `
        float oP = aOuverture;
        vec3 posToile = pointToile(aToile.x, aToile.y, aToile.z, oP);
        float snN = clamp(aToile.x, 0.04, 0.98);
        vec3 pN = pointToile(snN, aToile.y, aToile.z, oP);
        vec3 dS = pointToile(snN + 0.02, aToile.y, aToile.z, oP) - pN;
        vec3 dW = pointToile(snN, aToile.y + 0.02, aToile.z, oP) - pN;
        vec3 objectNormal = normalize(cross(dW, dS));
        #ifdef USE_TANGENT
        vec3 objectTangent = vec3(1.0, 0.0, 0.0);
        #endif
        `,
      )
      .replace("#include <begin_vertex>", "vec3 transformed = posToile;");
  };
}

function deformerBaleines(mat: THREE.Material) {
  mat.onBeforeCompile = (sh) => {
    sh.vertexShader = sh.vertexShader
      .replace("#include <common>", `#include <common>\nattribute vec3 aBaleine;\n${GLSL_PARAPLUIE}`)
      .replace(
        "#include <beginnormal_vertex>",
        /* glsl */ `
        float oB = aOuverture;
        float aB = aBaleine.z * HUITIEME;
        vec3 rayonB = vec3(cos(aB), 0.0, sin(aB));
        vec3 travers = vec3(-sin(aB), 0.0, cos(aB));
        float sB = aBaleine.x * L_BALEINE;
        vec2 b = profilBaleine(sB, oB);
        vec2 t = normalize(profilBaleine(sB + 0.01, oB) - b + 1e-5);
        vec3 objectNormal = normalize(rayonB * -t.y + vec3(0.0, t.x, 0.0));
        vec3 posBaleine = rayonB * (b.x + (1.0 - clamp(oB, 0.0, 1.0)) * 0.02 * sin(3.14159 * min(aBaleine.x, 1.0)))
          + vec3(0.0, L_MANCHE + b.y, 0.0) - objectNormal * 0.006 + travers * aBaleine.y * 0.006;
        #ifdef USE_TANGENT
        vec3 objectTangent = vec3(1.0, 0.0, 0.0);
        #endif
        `,
      )
      .replace("#include <begin_vertex>", "vec3 transformed = posBaleine;");
  };
}

/** Le sol : herbe et pierre peintes, flaques qui reflètent la scène, rides de pluie. */
const SHADER_SOL = {
  name: "SolMouille",
  uniforms: {
    color: { value: null },
    tDiffuse: { value: null },
    textureMatrix: { value: null },
    tSol: { value: null as THREE.Texture | null },
    tMouille: { value: null as THREE.Texture | null },
    zone: { value: new THREE.Vector4(ZONE.x, ZONE.z, ZONE.l, ZONE.p) },
    temps: { value: 0 },
    lumiere: { value: new THREE.Color() },
    pelouseLoin: { value: new THREE.Color() },
    brume: { value: new THREE.Color() },
    brumeProche: { value: 10 },
    brumeLoin: { value: 50 },
    lanternes: { value: Array.from({ length: 10 }, () => new THREE.Vector4()) },
    chaud: { value: new THREE.Color("#ffb45c") },
    finesse: { value: 1 },
  },
  vertexShader: /* glsl */ `
    uniform mat4 textureMatrix;
    varying vec4 vUvReflet;
    varying vec3 vMonde;
    varying float vProfondeur;
    void main() {
      vUvReflet = textureMatrix * vec4(position, 1.0);
      vec4 monde = modelMatrix * vec4(position, 1.0);
      vMonde = monde.xyz;
      vec4 vue = viewMatrix * monde;
      vProfondeur = -vue.z;
      gl_Position = projectionMatrix * vue;
    }`,
  fragmentShader: /* glsl */ `
    uniform vec3 color;
    uniform sampler2D tDiffuse;
    uniform sampler2D tSol;
    uniform sampler2D tMouille;
    uniform vec4 zone;
    uniform float temps;
    uniform vec3 lumiere;
    uniform vec3 pelouseLoin;
    uniform vec3 brume;
    uniform float brumeProche;
    uniform float brumeLoin;
    uniform vec4 lanternes[10];
    uniform vec3 chaud;
    uniform float finesse;
    varying vec4 vUvReflet;
    varying vec3 vMonde;
    varying float vProfondeur;

    vec2 hash22(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.xx + p3.yz) * p3.zy);
    }

    // Les ronds que fait chaque goutte dans une flaque : (pente x, pente z, éclat).
    vec3 rides(vec2 p, float t) {
      vec2 cellule = floor(p);
      vec2 f = fract(p);
      vec3 somme = vec3(0.0);
      for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
          vec2 c = vec2(float(i), float(j));
          vec2 h = hash22(cellule + c);
          float phase = fract(t * (0.75 + 0.5 * h.y) + h.x * 7.13);
          vec2 d = c + h - f;
          float dist = length(d);
          float x = clamp((dist - phase * 0.85) * 12.0, -1.0, 1.0);
          float onde = sin(x * 3.14159) * (1.0 - abs(x));
          float force = (1.0 - phase) * (1.0 - phase);
          somme.xy += (d / (dist + 1e-4)) * onde * force;
          somme.z += max(onde, 0.0) * force;
        }
      }
      return somme;
    }

    void main() {
      vec2 uvZone = (vMonde.xz - zone.xy) / zone.zw;
      vec2 bord = smoothstep(vec2(0.0), vec2(0.07), uvZone) * smoothstep(vec2(0.0), vec2(0.07), 1.0 - uvZone);
      float dansZone = bord.x * bord.y;
      vec3 albedo = mix(pelouseLoin, texture2D(tSol, uvZone).rgb, dansZone);
      float mouille = mix(0.12, texture2D(tMouille, uvZone).r, dansZone);
      float flaque = smoothstep(0.55, 0.92, mouille);

      vec3 r = rides(vMonde.xz / 0.2, temps);
      if (finesse > 0.5) r += rides(vMonde.xz / 0.29 + 17.0, temps * 0.83 + 0.4) * 0.7;
      r *= 0.25 + 0.75 * smoothstep(0.3, 0.6, mouille);

      vec2 uvR = vUvReflet.xy / vUvReflet.w + r.xy * 0.010 * (0.35 + flaque);
      vec3 reflet = texture2D(tDiffuse, uvR).rgb;

      vec3 V = normalize(cameraPosition - vMonde);
      float fresnel = 0.04 + 0.96 * pow(1.0 - clamp(V.y, 0.0, 1.0), 5.0);
      float force = clamp(mouille * mix(0.4, 1.0, fresnel) + flaque * 0.3, 0.0, 0.92);

      vec3 couleur = mix(albedo * lumiere * (1.0 - 0.55 * flaque), reflet, force);
      couleur += lumiere * r.z * 0.22 * (0.15 + flaque);

      for (int i = 0; i < 10; i++) {
        vec4 L = lanternes[i];
        if (L.w <= 0.0) continue;
        vec2 d = vMonde.xz - L.xz;
        couleur += chaud * L.w * (0.2 + mouille) / (1.0 + dot(d, d) * 7.0);
      }

      couleur = mix(couleur, brume, smoothstep(brumeProche, brumeLoin, vProfondeur));
      gl_FragColor = vec4(couleur, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`,
};

/** Le ciel couvert : un dégradé doux et des nuées qui glissent lentement. */
function materiauCiel(zenith: THREE.Color, horizon: THREE.Color, bas: THREE.Color) {
  return new THREE.ShaderMaterial({
    name: "CielCouvert",
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: {
      zenith: { value: zenith },
      horizon: { value: horizon },
      bas: { value: bas },
      temps: { value: 0 },
      lueur: { value: new THREE.Color("#fff3e2") },
    },
    vertexShader: /* glsl */ `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position = p.xyww;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 zenith;
      uniform vec3 horizon;
      uniform vec3 bas;
      uniform float temps;
      uniform vec3 lueur;
      varying vec3 vDir;
      float bruit(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = fract(sin(dot(i, vec2(127.1, 311.7))) * 43758.5453);
        float b = fract(sin(dot(i + vec2(1.0, 0.0), vec2(127.1, 311.7))) * 43758.5453);
        float c = fract(sin(dot(i + vec2(0.0, 1.0), vec2(127.1, 311.7))) * 43758.5453);
        float d = fract(sin(dot(i + vec2(1.0, 1.0), vec2(127.1, 311.7))) * 43758.5453);
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 4; i++) { v += a * bruit(p); p *= 2.03; a *= 0.5; }
        return v;
      }
      void main() {
        vec3 d = normalize(vDir);
        float h = d.y;
        vec3 c = mix(horizon, zenith, smoothstep(0.0, 0.6, h));
        vec2 q = d.xz / max(h + 0.12, 0.06) * 0.55 + vec2(temps * 0.006, temps * 0.002);
        float n = fbm(q * 1.4);
        c *= mix(1.0, mix(0.84, 1.1, n), smoothstep(0.0, 0.25, h));
        // une éclaircie, très loin derrière l'arche : la lumière qui revient
        float e = max(dot(d, normalize(vec3(-0.08, 0.1, -1.0))), 0.0);
        c += lueur * (pow(e, 14.0) * 0.38 + pow(e, 90.0) * 0.3) * (0.75 + 0.5 * n);
        c = mix(bas, c, smoothstep(-0.06, 0.03, h));
        gl_FragColor = vec4(c, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
}

/** Les gouttes : des traits fins orientés selon leur chute, toujours larges d'au moins un pixel. */
function materiauPluie(brume: THREE.Color) {
  return new THREE.ShaderMaterial({
    name: "Pluie",
    transparent: true,
    depthWrite: false,
    fog: false,
    uniforms: {
      direction: { value: new THREE.Vector3(0.12, -1, 0.04).normalize() },
      longueur: { value: 0.5 },
      largeur: { value: 0.008 },
      pixels: { value: 800 },
      couleur: { value: new THREE.Color("#eef0f7") },
      brume: { value: brume },
      brumeProche: { value: 10 },
      brumeLoin: { value: 40 },
    },
    vertexShader: /* glsl */ `
      attribute vec4 aGoutte;
      uniform vec3 direction;
      uniform float longueur;
      uniform float largeur;
      uniform float pixels;
      uniform float brumeProche;
      uniform float brumeLoin;
      varying float vAlpha;
      varying vec2 vUv;
      void main() {
        vec4 centre = viewMatrix * vec4(aGoutte.xyz, 1.0);
        vec3 dirV = normalize((viewMatrix * vec4(direction, 0.0)).xyz);
        vec3 cote = normalize(cross(dirV, normalize(-centre.xyz)));
        float prof = max(-centre.z, 0.1);
        float l = largeur;
        float a = aGoutte.w;
        float px = largeur * pixels / prof;
        if (px < 1.2) { l = 1.2 * prof / pixels; a *= px / 1.2; }
        vec3 p = centre.xyz + dirV * position.y * longueur + cote * position.x * l;
        a *= smoothstep(1.5, 3.5, prof) * (1.0 - 0.85 * smoothstep(brumeProche, brumeLoin, prof));
        vAlpha = a;
        vUv = position.xy + 0.5;
        gl_Position = projectionMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 couleur;
      varying float vAlpha;
      varying vec2 vUv;
      void main() {
        float travers = 1.0 - abs(vUv.x - 0.5) * 2.0;
        float a = vAlpha * vUv.y * vUv.y * travers;
        gl_FragColor = vec4(couleur, a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
}

/** Les éclaboussures et les gouttes qui tombent du bord des toiles : des points ronds. */
function materiauEclats() {
  return new THREE.ShaderMaterial({
    name: "Eclaboussures",
    transparent: true,
    depthWrite: false,
    fog: false,
    uniforms: { taille: { value: 0.032 }, pixels: { value: 800 }, couleur: { value: new THREE.Color("#f3f4fa") } },
    vertexShader: /* glsl */ `
      attribute float aVie;
      uniform float taille;
      uniform float pixels;
      varying float vAlpha;
      void main() {
        vec4 vue = modelViewMatrix * vec4(position, 1.0);
        float px = taille * pixels / max(-vue.z, 0.1);
        gl_PointSize = clamp(px, 1.5, 7.0);
        vAlpha = aVie * clamp(px / 1.5, 0.35, 1.0);
        gl_Position = projectionMatrix * vue;
      }`,
    fragmentShader: /* glsl */ `
      uniform vec3 couleur;
      varying float vAlpha;
      void main() {
        vec2 d = gl_PointCoord - 0.5;
        float a = smoothstep(0.5, 0.15, length(d)) * vAlpha;
        if (a < 0.01) discard;
        gl_FragColor = vec4(couleur, a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  });
}

/* ============================== textures peintes ============================== */

function toile(l: number, h: number, dessin: (ctx: CanvasRenderingContext2D) => void, srgb = true) {
  const c = document.createElement("canvas");
  c.width = l;
  c.height = h;
  dessin(c.getContext("2d")!);
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** La toile d'un pan de parapluie : le jaune, ses coutures sur les baleines, l'ourlet. */
const textureToile = () =>
  toile(128, 256, (ctx) => {
    // u = travers du pan, v = du sommet vers le bord
    ctx.fillStyle = "#ffbf0f";
    ctx.fillRect(0, 0, 128, 256);
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, "rgba(255,240,190,0.25)");
    grad.addColorStop(0.5, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 256);
    // la couture le long de chaque baleine
    ctx.fillStyle = "rgba(178,112,0,0.55)";
    ctx.fillRect(0, 0, 3, 256);
    ctx.fillRect(125, 0, 3, 256);
    // l'ourlet, un passepoil d'un jaune plus profond
    ctx.fillStyle = "#e9a800";
    ctx.fillRect(0, 244, 128, 12);
    ctx.fillStyle = "rgba(120,70,0,0.35)";
    ctx.fillRect(0, 243, 128, 1.5);
    // le chapeau, au sommet
    ctx.fillStyle = "#d99a00";
    ctx.fillRect(0, 0, 128, 10);
    // un grain de tissu, à peine
    for (let i = 0; i < 900; i++) {
      ctx.fillStyle = Math.random() < 0.5 ? "rgba(255,255,255,0.05)" : "rgba(120,80,0,0.05)";
      ctx.fillRect(Math.random() * 128, Math.random() * 256, 1.5, 1.5);
    }
  });

/**
 * Le sol, vu de dessus : pelouse, allée de dalles calcaires, parvis rond sous l'arche,
 * pétales tombés, ombres de contact sous chaque chaise. Le second canvas dit où le sol
 * est mouillé, et où il fait flaque (blanc = miroir).
 */
function peindreSol(alea: () => number, sieges: { x: number; z: number }[]) {
  const T = 1024;
  const X = (x: number) => ((x - ZONE.x) / ZONE.l) * T;
  const Z = (z: number) => ((z - ZONE.z) / ZONE.p) * T;
  const MX = T / ZONE.l;
  const MZ = T / ZONE.p;
  const flaques: { x: number; z: number; rx: number; rz: number; a: number }[] = [
    { x: 0.05, z: 1.6, rx: 0.62, rz: 1.25, a: 0.15 },
    { x: -0.25, z: -1.25, rx: 0.42, rz: 0.55, a: -0.3 },
    { x: 0.3, z: -3.4, rx: 0.38, rz: 0.7, a: 0.2 },
    { x: -0.15, z: -5.7, rx: 0.5, rz: 0.45, a: 0 },
    { x: 0.35, z: -7.6, rx: 0.9, rz: 0.55, a: 0.4 },
    { x: -2.6, z: 0.9, rx: 0.9, rz: 0.5, a: 0.6 },
    { x: 3.1, z: 2.2, rx: 1.1, rz: 0.55, a: -0.5 },
    { x: -4.4, z: -3.2, rx: 0.8, rz: 0.4, a: 0.3 },
    { x: 4.6, z: -5.6, rx: 1.0, rz: 0.5, a: -0.2 },
    { x: -3.4, z: -9.6, rx: 1.4, rz: 0.6, a: 0.1 },
    { x: 3.2, z: -10.4, rx: 1.2, rz: 0.5, a: -0.4 },
    { x: -1.4, z: 3.9, rx: 0.9, rz: 0.5, a: 0.5 },
  ];
  const ellipse = (ctx: CanvasRenderingContext2D, f: (typeof flaques)[number], gonfle = 1) => {
    ctx.beginPath();
    ctx.ellipse(X(f.x), Z(f.z), f.rx * MX * gonfle, f.rz * MZ * gonfle, f.a, 0, Math.PI * 2);
  };
  const dans = (x: number, z: number) => Math.abs(x) < 0.8 || (x * x) / 3.4 + ((z - Z_ARCHE - 0.4) * (z - Z_ARCHE - 0.4)) / 3.4 < 1;

  const sol = toile(T, T, (ctx) => {
    // la pelouse, d'un vert de pluie, tachée
    ctx.fillStyle = "#3d4a38";
    ctx.fillRect(0, 0, T, T);
    for (let i = 0; i < 26000; i++) {
      const v = alea();
      ctx.fillStyle = v < 0.45 ? "rgba(20,32,20,0.16)" : v < 0.85 ? "rgba(110,135,95,0.12)" : "rgba(150,160,120,0.12)";
      const r = 0.6 + alea() * 2.2;
      ctx.fillRect(alea() * T, alea() * T, r, r);
    }
    // le parvis rond sous l'arche, puis l'allée de dalles
    const dalle = (x0: number, z0: number, l: number, p: number) => {
      const v = Math.floor(alea() * 26);
      ctx.fillStyle = `rgb(${150 + v},${148 + v},${150 + v})`;
      ctx.fillRect(X(x0) + 1.5, Z(z0) + 1.5, l * MX - 3, p * MZ - 3);
      ctx.fillStyle = "rgba(255,255,255,0.06)";
      ctx.fillRect(X(x0) + 1.5, Z(z0) + 1.5, l * MX - 3, 2);
    };
    ctx.fillStyle = "#2d3329";
    ctx.beginPath();
    ctx.ellipse(X(0), Z(Z_ARCHE + 0.4), 1.85 * MX, 1.85 * MZ, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(X(-0.8), Z(Z_ARCHE), 1.6 * MX, Z(6) - Z(Z_ARCHE));
    for (let z = Z_ARCHE - 1.4; z < 6; ) {
      const p = 0.42 + alea() * 0.3;
      const largeurs = alea() < 0.4 ? [1.6] : alea() < 0.7 ? [0.7, 0.9] : [0.5, 0.55, 0.55];
      if (alea() < 0.5) largeurs.reverse();
      let x = -0.8;
      for (const l of largeurs) {
        // sur le parvis, les dalles débordent de l'allée en cercle
        if (z < Z_ARCHE + 2.1) {
          for (let xx = -1.85; xx < 1.85; xx += 0.62) if (dans(xx + 0.3, z + p / 2)) dalle(xx, z, 0.62, p);
          break;
        }
        dalle(x, z, l, p);
        x += l;
      }
      z += p;
    }
    // des pétales blancs et poudrés, tombés le long de l'allée
    for (let i = 0; i < 260; i++) {
      const x = (alea() - 0.5) * 1.5;
      const z = Z_ARCHE + 1 + alea() * 9.8;
      ctx.fillStyle = alea() < 0.6 ? "rgba(246,242,238,0.95)" : "rgba(232,196,198,0.95)";
      ctx.beginPath();
      ctx.ellipse(X(x), Z(z), 2.4 + alea() * 1.8, 1.5 + alea(), alea() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
    // les flaques : plus sombres, le reflet fera le reste
    for (const f of flaques) {
      ctx.fillStyle = "rgba(25,28,30,0.55)";
      ellipse(ctx, f, 1.05);
      ctx.fill();
    }
    // ombres de contact : chaque chaise, chaque invité, l'arche, la haie
    ctx.filter = "blur(6px)";
    ctx.fillStyle = "rgba(10,14,10,0.42)";
    for (const s of sieges) ctx.fillRect(X(s.x - 0.25), Z(s.z - 0.24), 0.5 * MX, 0.5 * MZ);
    ctx.fillStyle = "rgba(10,14,10,0.5)";
    for (const x of [-1.3, 1.3]) {
      ctx.beginPath();
      ctx.ellipse(X(x), Z(Z_ARCHE + 0.05), 0.55 * MX, 0.32 * MZ, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "rgba(10,14,10,0.35)";
    ctx.beginPath();
    ctx.ellipse(X(0), Z(Z_COUPLE), 0.75 * MX, 0.38 * MZ, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(0, Z(-12.4), T, 0.9 * MZ);
    ctx.filter = "none";
  });
  sol.flipY = false;

  const mouille = toile(
    512,
    512,
    (ctx) => {
      const k = 512 / T;
      ctx.fillStyle = "rgb(26,26,26)";
      ctx.fillRect(0, 0, 512, 512);
      ctx.save();
      ctx.scale(k, k);
      ctx.fillStyle = "rgb(112,112,112)";
      ctx.fillRect(X(-0.8), Z(Z_ARCHE), 1.6 * MX, Z(6) - Z(Z_ARCHE));
      ctx.beginPath();
      ctx.ellipse(X(0), Z(Z_ARCHE + 0.4), 1.85 * MX, 1.85 * MZ, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.filter = "blur(5px)";
      for (const f of flaques) {
        ctx.fillStyle = "rgb(255,255,255)";
        ellipse(ctx, f);
        ctx.fill();
      }
      ctx.filter = "none";
      ctx.restore();
    },
    false,
  );
  mouille.flipY = false;
  return { sol, mouille, flaques };
}

/* ================================== géométries ================================== */

const fusion = (parties: THREE.BufferGeometry[]) => {
  const g = mergeGeometries(parties.map((p) => (p.index ? p.toNonIndexed() : p)));
  parties.forEach((p) => p.dispose());
  return g;
};

/** Une colonne de couleurs de sommet, pour fondre bois et métal dans une seule géométrie. */
const teinter = (g: THREE.BufferGeometry, couleur: string) => {
  const c = new THREE.Color(couleur);
  const n = g.attributes.position.count;
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) a.set([c.r, c.g, c.b], i * 3);
  g.setAttribute("color", new THREE.BufferAttribute(a, 3));
  return g;
};

/** Une chaise de cérémonie, blanche, assise à 46 cm, tournée vers l'arche (−z). */
function geoChaise() {
  const parties: THREE.BufferGeometry[] = [];
  const pied = (x: number, z: number, h: number) => {
    const g = new THREE.CylinderGeometry(0.013, 0.011, h, 6, 1, true);
    g.translate(x, h / 2, z);
    parties.push(g);
  };
  pied(-0.18, -0.18, 0.45);
  pied(0.18, -0.18, 0.45);
  pied(-0.17, 0.19, 0.93);
  pied(0.17, 0.19, 0.93);
  const assise = new THREE.BoxGeometry(0.42, 0.035, 0.41);
  assise.translate(0, 0.455, 0);
  parties.push(assise);
  for (const [y, h] of [
    [0.6, 0.018],
    [0.73, 0.018],
    [0.89, 0.045],
  ]) {
    const b = new THREE.BoxGeometry(0.36, h, 0.024);
    b.translate(0, y, 0.19);
    parties.push(b);
  }
  const traverse = new THREE.BoxGeometry(0.36, 0.016, 0.016);
  traverse.translate(0, 0.15, -0.18);
  parties.push(traverse);
  return fusion(parties);
}

/** Un invité assis, de dos : buste, cuisses, jambes. `epaules` élargit la carrure. */
function geoCorps(epaules: number) {
  const profil = [
    [0.001, 0.47],
    [0.15, 0.475],
    [0.165, 0.53],
    [0.15, 0.62],
    [0.136, 0.7],
    [0.148, 0.8],
    [0.168, 0.89],
    [0.165, 0.94],
    [0.128, 0.985],
    [0.06, 1.012],
    [0.042, 1.04],
  ].map(([r, y]) => new THREE.Vector2(r, y));
  const buste = new THREE.LatheGeometry(profil, 11);
  buste.scale(epaules, 1, 0.78);
  buste.translate(0, 0, 0.07);
  const parties: THREE.BufferGeometry[] = [buste];
  for (const x of [-0.085, 0.085]) {
    const cuisse = new THREE.CapsuleGeometry(0.066, 0.32, 2, 7);
    cuisse.rotateX(Math.PI / 2);
    cuisse.translate(x, 0.53, -0.11);
    const jambe = new THREE.CylinderGeometry(0.05, 0.045, 0.44, 6, 1, true);
    jambe.translate(x, 0.24, -0.3);
    parties.push(cuisse, jambe);
  }
  return fusion(parties);
}

/** La tête et le cou : une forme lisse, sans visage. */
function geoTete(y = 1.135, z = 0.05) {
  const tete = new THREE.SphereGeometry(0.093, 10, 7);
  tete.scale(0.86, 1.12, 0.98);
  tete.translate(0, y, z);
  const cou = new THREE.CylinderGeometry(0.037, 0.042, 0.12, 8, 1, true);
  cou.translate(0, y - 0.105, z + 0.01);
  return fusion([tete, cou]);
}

/** Quatre coiffures, vues de dos : courte, chignon, longue, carré. */
function geoCoiffure(sorte: number, y = 1.145, z = 0.058) {
  const calotte = (part: number, s: number, bascule: number) => {
    const g = new THREE.SphereGeometry(0.1, 12, 6, 0, Math.PI * 2, 0, Math.PI * part);
    g.scale(0.9 * s, 1.03, s);
    g.rotateX(bascule);
    g.translate(0, y, z);
    return g;
  };
  if (sorte === 0) return calotte(0.55, 1, 0.45);
  if (sorte === 1) {
    const chignon = new THREE.SphereGeometry(0.05, 10, 8);
    chignon.translate(0, y + 0.035, z + 0.1);
    return fusion([calotte(0.55, 1, 0.4), chignon]);
  }
  if (sorte === 2) {
    const meche = new THREE.CapsuleGeometry(0.07, 0.16, 3, 8);
    meche.scale(1.25, 1, 0.42);
    meche.translate(0, y - 0.12, z + 0.07);
    return fusion([calotte(0.6, 1.03, 0.35), meche]);
  }
  return calotte(0.7, 1.07, 0.2);
}

/** La toile : huit pans, chacun maillé du sommet au bord ; la forme vient du shader. */
function geoToile() {
  const NS = 9;
  const NW = 3;
  const sommets: number[] = [];
  const toileAttr: number[] = [];
  const uv: number[] = [];
  const index: number[] = [];
  for (let pan = 0; pan < 8; pan++) {
    const depart = sommets.length / 3;
    for (let i = 0; i <= NS; i++) {
      const sn = Math.pow(i / NS, 0.85);
      for (let j = 0; j <= NW; j++) {
        const w = j / NW;
        const a = (pan + w) * (Math.PI / 4);
        sommets.push(Math.cos(a) * sn * 0.5, L_MANCHE - sn * 0.22, Math.sin(a) * sn * 0.5);
        toileAttr.push(sn, w, pan);
        uv.push(w, sn);
      }
    }
    for (let i = 0; i < NS; i++)
      for (let j = 0; j < NW; j++) {
        const a = depart + i * (NW + 1) + j;
        const b = a + NW + 1;
        // sens direct vu d'en haut : la face avant de la toile regarde le ciel
        index.push(a, a + 1, b, a + 1, b + 1, b);
      }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(sommets, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(new Array(sommets.length).fill(0).map((_, i) => (i % 3 === 1 ? 1 : 0)), 3));
  g.setAttribute("aToile", new THREE.Float32BufferAttribute(toileAttr, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(index);
  return g;
}

/** Les huit baleines, en rubans fins sous la toile ; leurs embouts dépassent du bord. */
function geoBaleines() {
  const NS = 8;
  const sommets: number[] = [];
  const attr: number[] = [];
  const index: number[] = [];
  for (let k = 0; k < 8; k++) {
    const depart = sommets.length / 3;
    for (let i = 0; i <= NS; i++) {
      const s = (i / NS) * 1.04;
      for (const cote of [-1, 1]) {
        sommets.push(0, L_MANCHE, 0);
        attr.push(s, cote, k);
      }
    }
    for (let i = 0; i < NS; i++) {
      const a = depart + i * 2;
      index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(sommets, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(new Array(sommets.length).fill(0), 3));
  g.setAttribute("aBaleine", new THREE.Float32BufferAttribute(attr, 3));
  g.setIndex(index);
  return g;
}

/** Le manche : tige d'acier, pointe, noix, et la poignée-canne en bois. */
function geoManche() {
  const tige = teinter(new THREE.CylinderGeometry(0.0075, 0.0075, L_MANCHE - 0.16, 6, 1, true), "#2a2a33");
  tige.translate(0, 0.16 + (L_MANCHE - 0.16) / 2, 0);
  const pointe = teinter(new THREE.CylinderGeometry(0.003, 0.0065, 0.08, 5, 1, true), "#2a2a33");
  pointe.translate(0, L_MANCHE + 0.04, 0);
  const noix = teinter(new THREE.CylinderGeometry(0.016, 0.02, 0.03, 6), "#c79400");
  noix.translate(0, L_MANCHE - 0.005, 0);
  const poignee = teinter(new THREE.CylinderGeometry(0.014, 0.0135, 0.11, 6, 1, true), "#8a5a36");
  poignee.translate(0, 0.105, 0);
  const crosse = teinter(new THREE.TorusGeometry(0.038, 0.012, 5, 8, Math.PI), "#8a5a36");
  crosse.rotateZ(Math.PI);
  crosse.translate(0.038, 0.05, 0);
  return fusion([tige, pointe, noix, poignee, crosse]);
}

/* ================================== la scène ================================== */

type Invite = {
  x: number;
  z: number;
  main: number; // la main qui tient le parapluie : −1 gauche, 1 droite
  epaule: THREE.Vector3;
  vetement: THREE.Color;
  peau: THREE.Color;
  cheveux: THREE.Color;
  coiffure: number;
  corps: number;
  index: { corps: number; coiffure: number };
};

type Parapluie = {
  main: THREE.Vector3; // où la main tient la poignée
  echelle: number;
  roulis: number;
  tangage: number;
  lacet: number;
  debut: number;
  phase: number;
  invite: number; // −1 : le parapluie des mariés
  o: number;
  levee: number;
  secoue: boolean;
  rayon: number; // rayon horizontal de la toile, recalculé à chaque image
  sommet: number;
  centre: THREE.Vector2;
};

export type Options = { ordinateur: boolean; reduit: boolean };

const PALETTE = {
  vestes: ["#272c3b", "#363a45", "#20253a", "#474b5a", "#58566a", "#2c3631", "#3b3445"],
  robes: ["#b48a93", "#8a84a6", "#9badc2", "#7d8e7c", "#6b3443", "#c4b2a6", "#5b4c7a", "#a6a0b8", "#8f6f86"],
  peaux: ["#f0d2bd", "#e2b999", "#c69270", "#a46f4d", "#7a4e35", "#5a3826"],
  cheveux: ["#1d1a18", "#38291f", "#5a3f2f", "#86684a", "#b59870", "#9c9ca2", "#2a2321"],
  fleurs: ["#f4efe7", "#fbfaf7", "#e6c4c3", "#c7bddb", "#ecd0b6", "#f6f2ee"],
  feuilles: ["#7d907a", "#9caf9f", "#5c6e5a", "#a9b6a5", "#6f8476"],
};

/**
 * La scène entière et sa mise en scène. `avancer(dt)` fait vivre la pluie et l'ouverture
 * des parapluies ; `dessiner()` rend une image. Le composant React s'occupe de la boucle.
 */
export class Ceremonie {
  readonly scene = new THREE.Scene();
  readonly sceneReflet: Reflector;
  private alea = hasard(20270911);
  private invites: Invite[] = [];
  private parapluies: Parapluie[] = [];
  private libres: { x: number; z: number }[] = [];
  private dossiers: { x: number; z: number }[] = [];
  private matrices: THREE.InstancedBufferAttribute;
  private ouvertures: THREE.InstancedBufferAttribute;
  private maillesInvites: { corps: THREE.InstancedMesh[]; coiffures: THREE.InstancedMesh[]; tetes: THREE.InstancedMesh; bras: THREE.InstancedMesh; mains: THREE.InstancedMesh };
  private pluie: { mesh: THREE.Mesh; attr: THREE.InstancedBufferAttribute; vitesse: Float32Array; n: number };
  private eclats: {
    points: THREE.Points;
    pos: THREE.BufferAttribute;
    vie: THREE.BufferAttribute;
    v: Float32Array;
    duree: Float32Array;
    age: Float32Array;
    prochain: number;
  };
  private ciel: THREE.ShaderMaterial;
  private sol: THREE.ShaderMaterial;
  private textures: THREE.Texture[] = [];
  private flammes: THREE.Mesh[] = [];
  private zoneX = 8.5;
  private temps = 0;
  /** Le temps de la mise en scène, en secondes : les parapluies s'ouvrent sur cette horloge. */
  horloge = 0;
  readonly fin: number;

  constructor(private options: Options) {
    const { scene } = this;
    const brume = new THREE.Color("#bab8c6");
    scene.fog = new THREE.Fog(brume, 9, 42);

    // Le ciel couvert, gris lavande, et l'éclairage diffus qu'il donne.
    this.ciel = materiauCiel(new THREE.Color("#7c7d92"), new THREE.Color("#c3c1cd"), new THREE.Color("#5d6158"));
    const dome = new THREE.Mesh(new THREE.SphereGeometry(300, 32, 16), this.ciel);
    dome.renderOrder = -10;
    dome.frustumCulled = false;
    scene.add(dome);
    scene.add(new THREE.HemisphereLight("#dedce9", "#3d4537", 1.55));
    const cle = new THREE.DirectionalLight("#f3f1fa", 0.85);
    cle.position.set(-4, 10, 7);
    scene.add(cle);

    // ---- les sièges, les invités, leurs parapluies ----
    const sieges: { x: number; z: number; r: number; cote: number; i: number }[] = [];
    for (let r = 0; r < RANGEES; r++)
      for (const cote of [-1, 1])
        for (let i = 0; i < PAR_COTE; i++)
          sieges.push({ x: cote * (BORD_ALLEE + i * ECART_SIEGES), z: PREMIER_RANG + r * ECART_RANGEES, r, cote, i });

    const textureSol = peindreSol(this.alea, sieges);
    this.textures.push(textureSol.sol, textureSol.mouille);

    const chaises = new THREE.InstancedMesh(
      geoChaise(),
      new THREE.MeshPhysicalMaterial({ color: "#f4f3f6", roughness: 0.42, clearcoat: 1, clearcoatRoughness: 0.12 }),
      sieges.length,
    );
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    const v = new THREE.Vector3();
    const un = new THREE.Vector3(1, 1, 1);
    sieges.forEach((s, k) => {
      q.setFromEuler(e.set(0, (this.alea() - 0.5) * 0.06, 0));
      chaises.setMatrixAt(k, m.compose(v.set(s.x, 0, s.z), q, un));
    });
    scene.add(chaises);

    for (const s of sieges) {
      this.dossiers.push({ x: s.x, z: s.z + 0.19 });
      if (LIBRES.includes(`${s.r}:${s.cote}:${s.i}`)) {
        this.libres.push({ x: s.x, z: s.z });
        continue;
      }
      const corps = this.alea() < 0.52 ? 0 : 1;
      const coiffure = corps === 0 ? (this.alea() < 0.85 ? 0 : 3) : [1, 2, 3][Math.floor(this.alea() * 3)];
      const main = this.alea() < 0.5 ? -1 : 1;
      this.invites.push({
        x: s.x,
        z: s.z,
        main,
        epaule: new THREE.Vector3(s.x + main * 0.165, 0.95, s.z + 0.08),
        vetement: new THREE.Color(corps === 0 ? choisir(PALETTE.vestes, this.alea) : choisir(PALETTE.robes, this.alea)),
        peau: new THREE.Color(choisir(PALETTE.peaux, this.alea)),
        cheveux: new THREE.Color(choisir(PALETTE.cheveux, this.alea)),
        coiffure,
        corps,
        index: { corps: 0, coiffure: 0 },
      });
      // la main au-dessus de l'épaule, à côté de la tête ; une rangée sur deux tient le parapluie plus haut
      const haut = ((s.r + s.i) % 2) * 0.11 + this.alea() * 0.05;
      this.parapluies.push({
        main: new THREE.Vector3(s.x + main * 0.2, 1.05 + haut, s.z + 0.02),
        echelle: 0.93 + this.alea() * 0.08,
        roulis: -main * (0.1 + this.alea() * 0.06),
        tangage: 0.02 + this.alea() * 0.07,
        lacet: this.alea() * Math.PI,
        debut: 0,
        phase: this.alea() * 6.28,
        invite: this.invites.length - 1,
        o: 0,
        levee: 0,
        secoue: false,
        rayon: 0,
        sommet: 0,
        centre: new THREE.Vector2(),
      });
    }

    // L'ordre d'ouverture : les mariés d'abord, puis de l'avant vers l'arrière, l'allée
    // avant les bouts de rang. La vague accélère : lente au début, puis elle gagne tout.
    this.parapluies.unshift({
      main: new THREE.Vector3(0.12, 1.3, Z_COUPLE + 0.05),
      echelle: 1.42,
      roulis: 0.06,
      tangage: 0.03,
      lacet: 0.3,
      debut: 0.9,
      phase: 1,
      invite: -1,
      o: 0,
      levee: 0,
      secoue: false,
      rayon: 0,
      sommet: 0,
      centre: new THREE.Vector2(),
    });
    const ordre = this.parapluies
      .slice(1)
      .map((p) => ({ p, rang: p.main.z * 1.0 + Math.abs(p.main.x) * 0.45 + this.alea() * 0.5 }))
      .sort((a, b) => a.rang - b.rang);
    let t = 1.75;
    ordre.forEach(({ p }, k) => {
      p.debut = t;
      t += Math.max(0.055, 0.3 * Math.pow(0.86, k)) + this.alea() * 0.03;
    });
    this.fin = t + 1.2;

    this.maillesInvites = this.construireInvites();
    const { matrices, ouvertures } = this.construireParapluies();
    this.matrices = matrices;
    this.ouvertures = ouvertures;
    this.construireCouple();
    this.construireArche();
    this.construireDecor();
    const lanternes = this.construireLanternes();

    // ---- le sol : la pelouse peinte et ses flaques, qui reflètent la scène ----
    const ordi = options.ordinateur;
    this.sceneReflet = new Reflector(new THREE.PlaneGeometry(140, 140), {
      textureWidth: 512,
      textureHeight: 512,
      clipBias: 0.003,
      multisample: ordi ? 4 : 0,
      shader: SHADER_SOL,
    });
    this.sceneReflet.rotation.x = -Math.PI / 2;
    this.sol = this.sceneReflet.material as THREE.ShaderMaterial;
    const u = this.sol.uniforms;
    u.tSol.value = textureSol.sol;
    u.tMouille.value = textureSol.mouille;
    u.lumiere.value = new THREE.Color("#b7b6c4");
    u.pelouseLoin.value = new THREE.Color("#3a4636");
    u.brume.value = brume;
    u.brumeProche.value = 9;
    u.brumeLoin.value = 42;
    u.finesse.value = ordi ? 1 : 0;
    lanternes.forEach((p, i) => u.lanternes.value[i].set(p.x, p.y, p.z, 0.3));
    scene.add(this.sceneReflet);

    this.pluie = this.construirePluie(brume);
    this.eclats = this.construireEclats();

    if (options.reduit) {
      // Pas d'animation : l'état final, tout de suite, et une pluie figée.
      this.horloge = this.fin;
    }
    this.mettreAJourParapluies(0);
  }

  /** Les invités : un maillage par pièce (corps, tête, coiffure, bras), une instance par personne. */
  private construireInvites() {
    const n = this.invites.length;
    const matiere = (r = 0.78) => new THREE.MeshStandardMaterial({ roughness: r, metalness: 0 });
    const corps = [geoCorps(1.3), geoCorps(1.12)].map((g, k) => new THREE.InstancedMesh(g, matiere(0.72), this.invites.filter((i) => i.corps === k).length));
    const coiffures = [0, 1, 2, 3].map((k) => new THREE.InstancedMesh(geoCoiffure(k), matiere(0.55), Math.max(1, this.invites.filter((i) => i.coiffure === k).length)));
    const tetes = new THREE.InstancedMesh(geoTete(), matiere(0.6), n);
    const brasGeo = new THREE.CylinderGeometry(0.036, 0.031, 1, 7, 1, true);
    brasGeo.translate(0, 0.5, 0);
    const bras = new THREE.InstancedMesh(brasGeo, matiere(0.72), n);
    const mains = new THREE.InstancedMesh(new THREE.SphereGeometry(0.034, 6, 4), matiere(0.6), n);
    const comptes = { corps: [0, 0], coiffure: [0, 0, 0, 0] };
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const un = new THREE.Vector3(1, 1, 1);
    const pos = new THREE.Vector3();
    this.invites.forEach((inv, k) => {
      q.setFromEuler(new THREE.Euler(0, (this.alea() - 0.5) * 0.25, 0));
      m.compose(pos.set(inv.x, 0, inv.z), q, un);
      inv.index.corps = comptes.corps[inv.corps]++;
      inv.index.coiffure = comptes.coiffure[inv.coiffure]++;
      corps[inv.corps].setMatrixAt(inv.index.corps, m);
      corps[inv.corps].setColorAt(inv.index.corps, inv.vetement);
      coiffures[inv.coiffure].setMatrixAt(inv.index.coiffure, m);
      coiffures[inv.coiffure].setColorAt(inv.index.coiffure, inv.cheveux);
      tetes.setMatrixAt(k, m);
      tetes.setColorAt(k, inv.peau);
      bras.setColorAt(k, inv.vetement);
      mains.setColorAt(k, inv.peau);
    });
    coiffures.forEach((c, k) => (c.count = comptes.coiffure[k]));
    for (const mesh of [...corps, ...coiffures, tetes, bras, mains]) {
      mesh.frustumCulled = false;
      this.scene.add(mesh);
    }
    return { corps, coiffures, tetes, bras, mains };
  }

  /** Les parapluies : toile, baleines et manche partagent les mêmes matrices d'instance. */
  private construireParapluies() {
    const n = this.parapluies.length;
    const texture = textureToile();
    texture.flipY = false; // v = 0 au sommet de la toile, comme dans le dessin
    this.textures.push(texture);
    // Un nylon mouillé : un vernis léger, et un peu de lumière qui traverse la toile
    // (l'émissif), pour que le jaune reste franc sous un ciel gris.
    const matToile = new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      map: texture,
      roughness: 0.5,
      clearcoat: 0.35,
      clearcoatRoughness: 0.3,
      emissive: "#ffae00",
      emissiveIntensity: 0.16,
      side: THREE.DoubleSide,
    });
    deformerToile(matToile);
    const matBaleines = new THREE.MeshStandardMaterial({ color: "#26262e", roughness: 0.35, metalness: 0.6, side: THREE.DoubleSide });
    deformerBaleines(matBaleines);
    const geoT = geoToile();
    const geoB = geoBaleines();
    const toileM = new THREE.InstancedMesh(geoT, matToile, n);
    const baleines = new THREE.InstancedMesh(geoB, matBaleines, n);
    const manches = new THREE.InstancedMesh(geoManche(), new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.4, metalness: 0.25 }), n);
    const ouvertures = new THREE.InstancedBufferAttribute(new Float32Array(n), 1);
    ouvertures.setUsage(THREE.DynamicDrawUsage);
    geoT.setAttribute("aOuverture", ouvertures);
    geoB.setAttribute("aOuverture", ouvertures);
    const matrices = toileM.instanceMatrix;
    matrices.setUsage(THREE.DynamicDrawUsage);
    baleines.instanceMatrix = matrices;
    manches.instanceMatrix = matrices;
    for (const mesh of [toileM, baleines, manches]) {
      mesh.frustumCulled = false;
      this.scene.add(mesh);
    }
    return { matrices, ouvertures };
  }

  /** Les mariés, debout devant l'arche, de dos : elle en blanc, lui en bleu nuit. */
  private construireCouple() {
    const groupe = new THREE.Group();
    const mat = (c: string, r = 0.7, extra: THREE.MeshPhysicalMaterialParameters = {}) => new THREE.MeshPhysicalMaterial({ color: c, roughness: r, ...extra });
    // elle : une robe longue évasée, une traîne, un voile
    const robe = new THREE.LatheGeometry(
      [
        [0.001, 0],
        [0.36, 0.0],
        [0.33, 0.06],
        [0.25, 0.42],
        [0.17, 0.78],
        [0.125, 0.99],
        [0.122, 1.08],
        [0.148, 1.24],
        [0.158, 1.35],
        [0.128, 1.43],
        [0.06, 1.47],
        [0.04, 1.53],
      ].map(([r, y]) => new THREE.Vector2(r, y)),
      28,
    );
    const p = robe.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const y = p.getY(i);
      const z = p.getZ(i);
      if (z > 0 && y < 0.35) p.setZ(i, z + (0.35 - y) * 1.5 * (z / 0.36));
    }
    robe.computeVertexNormals();
    const elle = new THREE.Mesh(robe, mat("#e4ded6", 0.7, { sheen: 0.5, sheenColor: new THREE.Color("#f4eee8") }));
    const teteElle = new THREE.Mesh(geoTete(1.635, 0.02), mat("#e8c2a4", 0.6));
    const coiffeElle = new THREE.Mesh(geoCoiffure(1, 1.645, 0.03), mat("#3b2a20", 0.5));
    const voileGeo = new THREE.CylinderGeometry(0.07, 0.36, 1.25, 20, 6, true, -0.9, 1.8);
    voileGeo.translate(0, 1.06, 0.1);
    const voile = new THREE.Mesh(
      voileGeo,
      new THREE.MeshStandardMaterial({ color: "#ffffff", transparent: true, opacity: 0.42, roughness: 0.4, side: THREE.DoubleSide, depthWrite: false }),
    );
    voile.rotation.y = Math.PI / 2;
    voile.position.z = 0.05;
    const mariee = new THREE.Group();
    mariee.add(elle, teteElle, coiffeElle, voile);
    mariee.position.set(-0.32, 0, Z_COUPLE);

    // lui : jambes, veste, une main levée qui tient le grand parapluie
    const costume = mat("#1f2538", 0.6);
    const marie = new THREE.Group();
    for (const x of [-0.09, 0.09]) {
      const jambe = new THREE.Mesh(new THREE.CapsuleGeometry(0.068, 0.82, 3, 8), costume);
      jambe.position.set(x, 0.48, 0);
      marie.add(jambe);
    }
    const veste = new THREE.LatheGeometry(
      [
        [0.001, 0.86],
        [0.165, 0.87],
        [0.17, 0.95],
        [0.158, 1.1],
        [0.18, 1.32],
        [0.19, 1.42],
        [0.14, 1.49],
        [0.06, 1.52],
        [0.045, 1.56],
      ].map(([r, y]) => new THREE.Vector2(r, y)),
      18,
    );
    veste.scale(1.3, 1, 0.8);
    marie.add(new THREE.Mesh(veste, costume));
    marie.add(new THREE.Mesh(geoTete(1.665, 0.01), mat("#b98563", 0.6)));
    marie.add(new THREE.Mesh(geoCoiffure(0, 1.675, 0.02), mat("#1f1a17", 0.5)));
    const bras = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.036, 0.5, 8, 1, true), costume);
    const epaule = new THREE.Vector3(-0.2, 1.43, 0.0);
    const main = new THREE.Vector3(0.12 - 0.32, 1.3 + PRISE, 0.05);
    bras.position.copy(epaule).add(main).multiplyScalar(0.5);
    bras.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), main.clone().sub(epaule).normalize());
    bras.scale.y = epaule.distanceTo(main) / 0.5;
    marie.add(bras);
    marie.position.set(0.32, 0, Z_COUPLE);
    groupe.add(mariee, marie);
    this.scene.add(groupe);
  }

  /** L'arche ronde en laiton, fleurie en asymétrie, et des fleurs au bout de chaque rang. */
  private construireArche() {
    const a = this.alea;
    const centre = new THREE.Vector3(0, 1.42, Z_ARCHE);
    const R = 1.32;
    const laiton = new THREE.MeshStandardMaterial({ color: "#cdb68c", metalness: 1, roughness: 0.32 });
    const anneau = new THREE.Mesh(new THREE.TorusGeometry(R, 0.03, 10, 96), laiton);
    anneau.position.copy(centre);
    const socle = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.36), laiton);
    socle.position.set(0, 0.03, Z_ARCHE);
    this.scene.add(anneau, socle);

    const fleurs: { p: THREE.Vector3; s: number; c: string }[] = [];
    const feuilles: { p: THREE.Vector3; s: number; c: string; r: THREE.Euler }[] = [];
    const surAnneau = (angle: number, ecart: number) =>
      new THREE.Vector3(Math.cos(angle) * (R + (a() - 0.5) * ecart), Math.sin(angle) * (R + (a() - 0.5) * ecart), (a() - 0.5) * ecart).add(centre);
    const grappe = (debut: number, finA: number, nF: number, nL: number) => {
      const milieu = (debut + finA) / 2;
      for (let i = 0; i < nF; i++) {
        const t = (a() + a()) / 2; // plus dense au milieu
        const angle = debut + (finA - debut) * t;
        const plein = 1 - Math.abs(angle - milieu) / ((finA - debut) / 2);
        fleurs.push({ p: surAnneau(angle, 0.12 + plein * 0.18), s: 0.045 + plein * 0.06 + a() * 0.03, c: a() < 0.08 ? "#f2c230" : choisir(PALETTE.fleurs, a) });
      }
      for (let i = 0; i < nL; i++) {
        const angle = debut - 0.35 + (finA - debut + 0.7) * a();
        feuilles.push({ p: surAnneau(angle, 0.42), s: 0.06 + a() * 0.06, c: choisir(PALETTE.feuilles, a), r: new THREE.Euler(a() * 6, a() * 6, a() * 6) });
      }
    };
    grappe(THREE.MathUtils.degToRad(196), THREE.MathUtils.degToRad(292), 120, 190);
    grappe(THREE.MathUtils.degToRad(28), THREE.MathUtils.degToRad(84), 70, 120);
    // la cascade qui retombe de la grappe basse
    for (let i = 0; i < 40; i++) {
      const y = 0.15 + a() * 0.5;
      feuilles.push({ p: new THREE.Vector3(-1.2 + (a() - 0.5) * 0.25, y, Z_ARCHE + (a() - 0.5) * 0.25), s: 0.06 + a() * 0.05, c: choisir(PALETTE.feuilles, a), r: new THREE.Euler(a() * 6, a() * 6, a() * 6) });
    }
    // deux massifs au pied de l'arche
    for (const x of [-1.25, 1.3]) {
      for (let i = 0; i < 26; i++)
        fleurs.push({ p: new THREE.Vector3(x + (a() - 0.5) * 0.7, 0.08 + a() * 0.32, Z_ARCHE + 0.1 + (a() - 0.5) * 0.45), s: 0.05 + a() * 0.05, c: choisir(PALETTE.fleurs, a) });
      for (let i = 0; i < 44; i++)
        feuilles.push({ p: new THREE.Vector3(x + (a() - 0.5) * 0.9, 0.06 + a() * 0.36, Z_ARCHE + 0.1 + (a() - 0.5) * 0.55), s: 0.07 + a() * 0.06, c: choisir(PALETTE.feuilles, a), r: new THREE.Euler(a() * 6, a() * 6, a() * 6) });
    }
    // un petit bouquet au dossier de chaque chaise côté allée
    for (let r = 0; r < RANGEES; r++)
      for (const cote of [-1, 1]) {
        const c = new THREE.Vector3(cote * (BORD_ALLEE - 0.17), 0.82, PREMIER_RANG + r * ECART_RANGEES + 0.22);
        for (let i = 0; i < 4; i++) fleurs.push({ p: c.clone().add(new THREE.Vector3((a() - 0.5) * 0.08, (a() - 0.5) * 0.1, (a() - 0.5) * 0.06)), s: 0.03 + a() * 0.02, c: choisir(PALETTE.fleurs, a) });
        for (let i = 0; i < 6; i++)
          feuilles.push({ p: c.clone().add(new THREE.Vector3((a() - 0.5) * 0.12, -0.05 - a() * 0.14, (a() - 0.5) * 0.06)), s: 0.04 + a() * 0.03, c: choisir(PALETTE.feuilles, a), r: new THREE.Euler(a() * 6, a() * 6, a() * 6) });
      }

    // un dodécaèdre à facettes : de loin, des pétales
    const geoFleur = new THREE.DodecahedronGeometry(1, 0);
    geoFleur.scale(1, 0.72, 1);
    const mFleurs = new THREE.InstancedMesh(geoFleur, new THREE.MeshStandardMaterial({ roughness: 0.75, flatShading: true }), fleurs.length);
    const geoFeuille = new THREE.IcosahedronGeometry(1, 0);
    geoFeuille.scale(1, 0.18, 0.5);
    const mFeuilles = new THREE.InstancedMesh(geoFeuille, new THREE.MeshStandardMaterial({ roughness: 0.6 }), feuilles.length);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const s = new THREE.Vector3();
    fleurs.forEach((f, i) => {
      q.setFromEuler(new THREE.Euler((a() - 0.5) * 0.8, a() * 6, (a() - 0.5) * 0.8));
      mFleurs.setMatrixAt(i, m.compose(f.p, q, s.setScalar(f.s)));
      mFleurs.setColorAt(i, new THREE.Color(f.c));
    });
    feuilles.forEach((f, i) => {
      q.setFromEuler(f.r);
      mFeuilles.setMatrixAt(i, m.compose(f.p, q, s.setScalar(f.s)));
      mFeuilles.setColorAt(i, new THREE.Color(f.c));
    });
    this.scene.add(mFleurs, mFeuilles);
  }

  /** Le fond : une haie taillée, deux buis, et la lisière des arbres dans la brume. */
  private construireDecor() {
    const a = this.alea;
    const vert = new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.9 });
    const boule = new THREE.IcosahedronGeometry(1, 1);
    const blocs: THREE.Matrix4[] = [];
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    // la haie taillée au cordeau, derrière l'arche, et deux buis en boule dans leurs bacs
    const buis = new THREE.MeshStandardMaterial({ color: "#3a4a3e", roughness: 0.95 });
    const haie = new THREE.Mesh(new THREE.BoxGeometry(40, 1.35, 0.9), buis);
    haie.position.set(0, 0.675, -12.3);
    const bac = new THREE.MeshPhysicalMaterial({ color: "#efedf2", roughness: 0.4, clearcoat: 1, clearcoatRoughness: 0.15 });
    for (const x of [-2.35, 2.35]) {
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.19, 0.42, 16), bac);
      pot.position.set(x, 0.21, Z_ARCHE - 0.1);
      const boule = new THREE.Mesh(new THREE.IcosahedronGeometry(0.34, 2), buis);
      boule.position.set(x, 0.72, Z_ARCHE - 0.1);
      this.scene.add(pot, boule);
    }
    this.scene.add(haie);
    // la lisière, dans la brume : des couronnes rondes posées derrière la haie, et
    // quelques peupliers en fuseau qui donnent de la hauteur
    const teintes: THREE.Color[] = [];
    for (let i = 0; i < 34; i++) {
      const x = (a() - 0.5) * 70;
      const z = -26 - a() * 18;
      const teinte = new THREE.Color(choisir(["#34443b", "#3c4b40", "#2f3c36", "#455349", "#3a4442"], a));
      if (a() < 0.15) {
        const haut = 8 + a() * 4;
        for (let k = 0; k < 5; k++) {
          const r = 1.15 * Math.sin(((k + 0.7) / 5.6) * Math.PI);
          blocs.push(m.clone().compose(new THREE.Vector3(x, 0.8 + (k / 4) * haut, z), q, new THREE.Vector3(r, 1.9, r)));
          teintes.push(teinte);
        }
        continue;
      }
      const R = 2 + a() * 1.5;
      for (let k = 0; k < 5; k++) {
        const r = R * (0.5 + a() * 0.3);
        const dir = new THREE.Vector3(a() - 0.5, a() * 0.7, a() - 0.5).normalize().multiplyScalar(R - r);
        blocs.push(m.clone().compose(new THREE.Vector3(x + dir.x, 1.2 + R * 0.8 + dir.y, z + dir.z), q, new THREE.Vector3(r, r * 0.92, r)));
        teintes.push(teinte.clone().offsetHSL(0, 0, (a() - 0.5) * 0.04));
      }
    }
    const feuillage = new THREE.InstancedMesh(boule, vert, blocs.length);
    blocs.forEach((b, i) => {
      feuillage.setMatrixAt(i, b);
      feuillage.setColorAt(i, teintes[i]);
    });
    this.scene.add(feuillage);

  }

  /** Des photophores le long de l'allée : une bougie sous verre, chaude dans le gris. */
  private construireLanternes() {
    const places: THREE.Vector3[] = [];
    for (let r = 0; r < RANGEES; r++) places.push(new THREE.Vector3((r % 2 ? 1 : -1) * 0.68, 0, PREMIER_RANG + r * ECART_RANGEES + 0.55));
    places.push(new THREE.Vector3(-0.72, 0, 1.0), new THREE.Vector3(0.72, 0, 1.0), new THREE.Vector3(-0.95, 0, Z_ARCHE + 0.7));
    const ordi = this.options.ordinateur;
    const verre = new THREE.MeshStandardMaterial({ color: "#f4f2fa", transparent: true, opacity: 0.28, roughness: 0.05, metalness: 0, depthWrite: false });
    const halo = new THREE.SpriteMaterial({
      map: this.textureHalo(),
      color: new THREE.Color("#ffb866").multiplyScalar(ordi ? 0.7 : 0.75),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
    });
    const socle = new THREE.MeshStandardMaterial({ color: "#2a2a30", roughness: 0.5, metalness: 0.4 });
    const cire = new THREE.MeshStandardMaterial({ color: "#f4efe6", roughness: 0.6, emissive: "#ffcf8a", emissiveIntensity: 0.25 });
    const feu = new THREE.MeshBasicMaterial({ color: new THREE.Color("#ffd28a").multiplyScalar(ordi ? 4 : 1.2), toneMapped: false });
    const geoVerre = new THREE.CylinderGeometry(0.1, 0.09, 0.38, 14, 1, true);
    const geoSocle = new THREE.CylinderGeometry(0.11, 0.12, 0.04, 14);
    const geoCire = new THREE.CylinderGeometry(0.04, 0.04, 0.12, 10);
    const geoFeu = new THREE.SphereGeometry(0.016, 8, 6);
    geoFeu.scale(1, 1.8, 1);
    for (const p of places) {
      const g = new THREE.Group();
      const v = new THREE.Mesh(geoVerre, verre);
      v.position.y = 0.23;
      const s = new THREE.Mesh(geoSocle, socle);
      s.position.y = 0.02;
      const c = new THREE.Mesh(geoCire, cire);
      c.position.y = 0.1;
      const f = new THREE.Mesh(geoFeu, feu);
      f.position.y = 0.19;
      this.flammes.push(f);
      const lueur = new THREE.Sprite(halo);
      lueur.position.y = 0.21;
      lueur.scale.setScalar(0.48);
      g.add(s, c, f, v, lueur);
      g.position.copy(p);
      this.scene.add(g);
    }
    return places;
  }

  /** Le halo d'une flamme : un disque doux, peint une fois. */
  private textureHalo() {
    const t = toile(64, 64, (ctx) => {
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,0.9)");
      g.addColorStop(0.25, "rgba(255,255,255,0.35)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
    });
    this.textures.push(t);
    return t;
  }

  /** La pluie : des milliers de traits, déplacés à chaque image, arrêtés par ce qu'ils touchent. */
  private construirePluie(brume: THREE.Color) {
    const n = this.options.ordinateur ? 3400 : 2200;
    const geo = new THREE.InstancedBufferGeometry();
    const base = new THREE.PlaneGeometry(1, 1);
    geo.index = base.index;
    geo.setAttribute("position", base.attributes.position);
    const tableau = new Float32Array(n * 4);
    const vitesse = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      tableau.set([(Math.random() - 0.5) * 2 * this.zoneX, Math.random() * 10, -15 + Math.random() * 21, 0.26 + Math.random() * 0.36], i * 4);
      vitesse[i] = 6.8 + Math.random() * 2.2;
    }
    const attr = new THREE.InstancedBufferAttribute(tableau, 4);
    attr.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute("aGoutte", attr);
    geo.instanceCount = n;
    const mesh = new THREE.Mesh(geo, materiauPluie(brume));
    mesh.frustumCulled = false;
    mesh.layers.set(1);
    mesh.renderOrder = 5;
    this.scene.add(mesh);
    return { mesh, attr, vitesse, n };
  }

  private construireEclats() {
    const n = this.options.ordinateur ? 1200 : 700;
    const geo = new THREE.BufferGeometry();
    const pos = new THREE.BufferAttribute(new Float32Array(n * 3).fill(-50), 3);
    const vie = new THREE.BufferAttribute(new Float32Array(n), 1);
    pos.setUsage(THREE.DynamicDrawUsage);
    vie.setUsage(THREE.DynamicDrawUsage);
    geo.setAttribute("position", pos);
    geo.setAttribute("aVie", vie);
    const points = new THREE.Points(geo, materiauEclats());
    points.frustumCulled = false;
    points.layers.set(1);
    points.renderOrder = 6;
    this.scene.add(points);
    return { points, pos, vie, v: new Float32Array(n * 3), duree: new Float32Array(n), age: new Float32Array(n).fill(9), prochain: 0 };
  }

  /** Une goutte qui rebondit : quelques éclats lancés en l'air. */
  private eclabousser(x: number, y: number, z: number, nombre: number, force = 1, dehors?: THREE.Vector2) {
    const e = this.eclats;
    const n = e.duree.length;
    for (let k = 0; k < nombre; k++) {
      const i = e.prochain;
      e.prochain = (e.prochain + 1) % n;
      const angle = Math.random() * Math.PI * 2;
      const h = (0.25 + Math.random() * 0.45) * force;
      let vx = Math.cos(angle) * h;
      let vz = Math.sin(angle) * h;
      if (dehors) {
        vx = dehors.x * (0.9 + Math.random() * 0.8) + vx * 0.3;
        vz = dehors.y * (0.9 + Math.random() * 0.8) + vz * 0.3;
      }
      e.pos.setXYZ(i, x, y + 0.01, z);
      e.v.set([vx, (0.8 + Math.random() * 0.9) * force, vz], i * 3);
      e.age[i] = 0;
      e.duree[i] = 0.28 + Math.random() * 0.22;
    }
  }

  /** La hauteur de ce qu'une goutte rencontre en (x, z) : toile, chaise libre, invité ou sol. */
  private surface(x: number, z: number): [number, number] {
    // [hauteur, éclats] — 0 éclat : la goutte se perd (sur un invité, par exemple)
    let h = 0;
    for (const p of this.parapluies) {
      if (p.o < 0.35) continue;
      const dx = x - p.centre.x;
      const dz = z - p.centre.y;
      const d2 = dx * dx + dz * dz;
      if (d2 < p.rayon * p.rayon) {
        h = Math.max(h, p.sommet - (d2 / (p.rayon * p.rayon)) * 0.22 * p.echelle);
      }
    }
    if (h > 0) return [h, 2];
    for (const l of this.libres) if (Math.abs(x - l.x) < 0.21 && Math.abs(z - l.z) < 0.2) return [0.475, 3];
    // le haut des dossiers : la pluie rebondit sur la laque blanche
    for (const d of this.dossiers) if (Math.abs(x - d.x) < 0.19 && Math.abs(z - d.z) < 0.035) return [0.912, 2];
    for (const inv of this.invites) {
      const dx = x - inv.x;
      const dz = z - inv.z - 0.06;
      if (dx * dx + dz * dz < 0.045) return [1.1, 0];
    }
    return [0, Math.random() < 0.7 ? 3 : 0];
  }

  /** L'ouverture de chaque parapluie au temps `horloge`, ses matrices, et les bras qui suivent. */
  private mettreAJourParapluies(dt: number) {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    const pos = new THREE.Vector3();
    const echelle = new THREE.Vector3();
    const haut = new THREE.Vector3(0, 1, 0);
    const dir = new THREE.Vector3();
    const { bras, mains, corps, coiffures, tetes } = this.maillesInvites;
    const reduit = this.options.reduit;
    const ombre = new THREE.Color();
    this.parapluies.forEach((p, i) => {
      const tau = this.horloge - p.debut;
      const cibleLevee = 0.12 * lisse(0, 0.35, tau);
      const x = Math.min(1, Math.max(0, (tau - 0.1) / 0.6));
      const cibleO = x <= 0 ? 0 : sortieRebond(x);
      // Rejouer : les parapluies se referment vite au lieu de sauter.
      if (cibleO < p.o - 0.01 && dt > 0) {
        p.o = Math.max(cibleO, p.o - dt * 3);
        p.levee = Math.max(cibleLevee, p.levee - dt * 0.5);
      } else {
        p.o = cibleO;
        p.levee = cibleLevee;
      }
      if (p.o > 0.95 && !p.secoue && dt > 0) {
        p.secoue = true;
        // la toile claque : l'eau qu'elle portait part en couronne
        const n = 12;
        for (let k = 0; k < n; k++) {
          const a = (k / n) * Math.PI * 2 + p.lacet;
          const r = 0.5 * p.echelle;
          this.eclabousser(p.main.x + Math.cos(a) * r, p.main.y + p.levee + 0.55 * p.echelle, p.main.z + Math.sin(a) * r, 1, 0.6, new THREE.Vector2(Math.cos(a) * 1.1, Math.sin(a) * 1.1));
        }
      }
      if (p.o < 0.05) p.secoue = false;
      const balance = reduit ? 0 : Math.min(1, p.o);
      e.set(
        p.tangage + Math.sin(this.temps * 0.63 + p.phase * 1.7) * 0.022 * balance,
        p.lacet,
        p.roulis + Math.sin(this.temps * 0.8 + p.phase) * 0.028 * balance,
        "XYZ",
      );
      q.setFromEuler(e);
      pos.copy(p.main);
      pos.y += p.levee - PRISE * p.echelle;
      m.compose(pos, q, echelle.setScalar(p.echelle));
      m.toArray(this.matrices.array, i * 16);
      this.ouvertures.setX(i, p.o);
      // pour la pluie : où est la toile, et quelle largeur elle couvre
      const [r] = profilBaleine(L_BALEINE, Math.min(1, p.o));
      const sommet = new THREE.Vector3(0, L_MANCHE, 0).applyMatrix4(m);
      p.rayon = r * p.echelle;
      p.sommet = sommet.y;
      p.centre.set(sommet.x, sommet.z);
      if (p.invite >= 0) {
        const inv = this.invites[p.invite];
        const prise = pos.clone().add(new THREE.Vector3(0, PRISE * p.echelle, 0).applyQuaternion(q));
        dir.subVectors(prise, inv.epaule);
        const longueur = dir.length();
        m.compose(inv.epaule, q.setFromUnitVectors(haut, dir.normalize()), echelle.set(1, longueur, 1));
        bras.setMatrixAt(p.invite, m);
        mains.setMatrixAt(p.invite, m.makeTranslation(prise.x, prise.y, prise.z));
        // sous la toile, l'invité passe à l'ombre
        const f = 1 - 0.3 * Math.min(1, p.o);
        corps[inv.corps].setColorAt(inv.index.corps, ombre.copy(inv.vetement).multiplyScalar(f));
        coiffures[inv.coiffure].setColorAt(inv.index.coiffure, ombre.copy(inv.cheveux).multiplyScalar(f));
        tetes.setColorAt(p.invite, ombre.copy(inv.peau).multiplyScalar(f));
        bras.setColorAt(p.invite, ombre.copy(inv.vetement).multiplyScalar(0.85 + 0.15 * f));
      }
    });
    this.matrices.needsUpdate = true;
    this.ouvertures.needsUpdate = true;
    for (const mesh of [bras, mains, tetes, ...corps, ...coiffures]) {
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    }
  }

  /** Fait avancer la pluie et ses éclats. */
  private mettreAJourPluie(dt: number) {
    const { attr, vitesse, n } = this.pluie;
    const a = attr.array as Float32Array;
    const vent = 0.12;
    const L = 0.25;
    for (let i = 0; i < n; i++) {
      const k = i * 4;
      const dy = vitesse[i] * dt;
      a[k] += dy * vent;
      a[k + 1] -= dy;
      a[k + 2] += dy * 0.04;
      const bas = a[k + 1] - L;
      if (bas < 2.9) {
        const [h, eclats] = this.surface(a[k], a[k + 2]);
        if (bas <= h) {
          if (eclats && a[k + 2] > -13) this.eclabousser(a[k], h, a[k + 2], eclats, h > 0.6 ? 0.8 : 1);
          a[k] = (Math.random() - 0.5) * 2 * this.zoneX;
          a[k + 1] = 9 + Math.random() * 2.5;
          a[k + 2] = -15 + Math.random() * 21;
        }
      }
    }
    attr.needsUpdate = true;

    const e = this.eclats;
    const p = e.pos.array as Float32Array;
    const vie = e.vie.array as Float32Array;
    for (let i = 0; i < e.duree.length; i++) {
      if (e.age[i] >= e.duree[i]) {
        vie[i] = 0;
        continue;
      }
      e.age[i] += dt;
      e.v[i * 3 + 1] -= 9.8 * dt;
      p[i * 3] += e.v[i * 3] * dt;
      p[i * 3 + 1] += e.v[i * 3 + 1] * dt;
      p[i * 3 + 2] += e.v[i * 3 + 2] * dt;
      if (p[i * 3 + 1] < 0) e.age[i] = e.duree[i];
      vie[i] = 0.8 * (1 - e.age[i] / e.duree[i]);
    }
    // des gouttes tombent du bord des toiles ouvertes
    for (const pp of this.parapluies) {
      if (pp.o < 0.9 || Math.random() > dt * 2.2) continue;
      const angle = Math.floor(Math.random() * 8) * (Math.PI / 4) + pp.lacet;
      const r = pp.rayon * 1.02;
      const i = e.prochain;
      e.prochain = (e.prochain + 1) % e.duree.length;
      e.pos.setXYZ(i, pp.centre.x + Math.cos(angle) * r, pp.sommet - 0.22 * pp.echelle, pp.centre.y + Math.sin(angle) * r);
      e.v.set([0, -0.5, 0], i * 3);
      e.age[i] = 0;
      e.duree[i] = 0.7;
    }
    e.pos.needsUpdate = true;
    e.vie.needsUpdate = true;
  }

  /** Une image de plus : `dt` en secondes. La mise en scène n'avance que si `jouer`. */
  avancer(dt: number) {
    this.temps += dt;
    this.horloge += dt;
    this.ciel.uniforms.temps.value = this.temps;
    this.sol.uniforms.temps.value = this.temps;
    this.mettreAJourParapluies(dt);
    // la pluie avance par pas de 50 ms au plus : une goutte ne traverse pas une toile
    for (let reste = dt; reste > 1e-4; reste -= 0.05) this.mettreAJourPluie(Math.min(0.05, reste));
    const scintille = 1 + Math.sin(this.temps * 13) * 0.04 + Math.sin(this.temps * 7.3) * 0.05;
    for (const f of this.flammes) f.scale.set(1, scintille, 1);
  }

  /** Rejouer la vague : les parapluies se referment, puis s'ouvrent de nouveau un à un. */
  rejouer() {
    this.horloge = -0.4;
  }

  get termine() {
    return this.horloge >= this.fin;
  }

  /** Le temps passé depuis la première image (rejouer ne le remet pas à zéro) : il guide la grue. */
  get ecoule() {
    return this.options.reduit ? Infinity : this.temps;
  }

  /** Le calibre des traits de pluie : combien de pixels fait un mètre à un mètre de distance. */
  regler(pixelsParMetre: number, largeurReflet: number, hauteurReflet: number) {
    (this.pluie.mesh.material as THREE.ShaderMaterial).uniforms.pixels.value = pixelsParMetre;
    (this.eclats.points.material as THREE.ShaderMaterial).uniforms.pixels.value = pixelsParMetre;
    this.sceneReflet.getRenderTarget().setSize(largeurReflet, hauteurReflet);
  }

  liberer() {
    this.scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
      if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
      else mat?.dispose();
    });
    this.sceneReflet.dispose();
    this.textures.forEach((t) => t.dispose());
  }
}

function choisir<T>(liste: T[], alea: () => number) {
  return liste[Math.floor(alea() * liste.length)];
}

/** Le décor d'ambiance des reflets : un ciel couvert, clair en haut, sombre au sol. */
export function sceneEnvironnement() {
  const scene = new THREE.Scene();
  const geo = new THREE.SphereGeometry(10, 32, 16);
  const couleurs: number[] = [];
  const haut = new THREE.Color("#e6e4ef");
  const horizon = new THREE.Color("#a9a8b6");
  const bas = new THREE.Color("#2f352d");
  const c = new THREE.Color();
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i) / 10;
    if (y > 0) c.copy(horizon).lerp(haut, Math.pow(y, 0.6));
    else c.copy(horizon).lerp(bas, Math.min(1, -y * 4));
    couleurs.push(c.r, c.g, c.b);
  }
  geo.setAttribute("color", new THREE.Float32BufferAttribute(couleurs, 3));
  scene.add(new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide })));
  return scene;
}

/** Le cadrage selon la forme de l'écran : debout (téléphone) ou couché (ordinateur). */
export function cadrage(aspect: number) {
  const t = Math.min(1, Math.max(0, (aspect - 0.5) / (1.65 - 0.5)));
  const mix = (a: number, b: number) => a + (b - a) * t;
  return {
    position: new THREE.Vector3(mix(0.3, 1.0), mix(5.6, 4.2), mix(6.4, 6.4)),
    cible: new THREE.Vector3(mix(0, -0.3), mix(0.4, 0.8), mix(-6.0, -5.4)),
    fov: mix(56, 35),
    decalX: mix(0, -0.19),
    decalY: mix(0.07, 0.08),
  };
}

export { entreeSortie, lisse };
