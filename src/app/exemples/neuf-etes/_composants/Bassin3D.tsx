"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

// Le premier écran de Neuf Étés : une piscine vide, en fin de journée d'été, qui se
// remplit. La lame d'eau coule du mur du fond, le niveau monte, la lumière se met à
// danser sur le fond et les parois à mesure qu'ils passent sous l'eau, et la surface
// garde la trace de ce qui la touche : la lame d'eau, et le doigt ou la souris du
// visiteur. « Et puis un matin, l'eau est là. »
//
// Tout est construit et peint sur place, comme le jardin du calculateur : aucun
// fichier chargé, aucun serveur tiers. Le ciel est une sphère peinte, et c'est elle qui
// sert de reflet à l'eau et aux vitres. La boucle s'arrête quand l'écran sort de la
// vue ; si le visiteur limite les animations, la piscine est pleine et immobile.

type Props = {
  /** Appelé quand la première image est dessinée : le parent retire l'affiche. */
  onPret: () => void;
  /** Appelé si le navigateur ne sait pas faire de 3D : le parent garde l'affiche. */
  onIndisponible: () => void;
};

/* ============================ dimensions ============================ */

// Le bassin intérieur fait 8 × 4 m et 1,40 m de fond ; la margelle affleure à y = 0.
const L = 8, P = 4, FOND = -1.4, PLEIN = -0.1;
const MARGELLE = 0.32;
// La grille de l'eau : une case de 6,25 cm.
const NX = 128, NZ = 64;
// La lame d'eau tombe du mur du fond (x = +4).
const LAME_X = L / 2 - 0.02, LAME_LARGEUR = 1.3;

/* ============================ textures peintes ============================ */

function toile(l: number, h: number, dessin: (ctx: CanvasRenderingContext2D) => void, srgb = true) {
  const c = document.createElement("canvas");
  c.width = l;
  c.height = h;
  dessin(c.getContext("2d")!);
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}

// Un tirage pseudo-aléatoire fixe : la même piscine à chaque visite.
function hasard(graine: number) {
  let s = graine >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let x = s;
    x = Math.imul(x ^ (x >>> 15), x | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

// La mosaïque du bassin : des carreaux de 2,5 cm, blancs à peine bleutés.
const textureMosaique = () =>
  toile(512, 512, (x) => {
    const r = hasard(7);
    x.fillStyle = "#c9d9dd";
    x.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 16; i++)
      for (let j = 0; j < 16; j++) {
        const v = 232 + Math.round(r() * 14);
        x.fillStyle = `rgb(${v - 8},${v},${Math.min(255, v + 4)})`;
        x.fillRect(i * 32 + 1.5, j * 32 + 1.5, 29, 29);
      }
  });

// La pierre de la margelle et de la plage : un travertin clair, veiné.
const texturePierre = (dalles: boolean) =>
  toile(512, 512, (x) => {
    const r = hasard(dalles ? 11 : 13);
    x.fillStyle = "#d9cdb9";
    x.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 9000; i++) {
      const v = (r() - 0.5) * 30;
      x.fillStyle = v > 0 ? `rgba(255,250,240,${v / 255})` : `rgba(90,70,50,${-v / 255})`;
      x.fillRect(r() * 512, r() * 512, 1 + r() * 3, 1 + r() * 2);
    }
    for (let i = 0; i < 40; i++) {
      x.strokeStyle = `rgba(150,128,100,${0.08 + r() * 0.12})`;
      x.lineWidth = 0.6 + r() * 1.6;
      const y = r() * 512;
      x.beginPath();
      x.moveTo(0, y);
      x.bezierCurveTo(170, y + (r() - 0.5) * 30, 340, y + (r() - 0.5) * 30, 512, y + (r() - 0.5) * 12);
      x.stroke();
    }
    if (dalles) {
      x.fillStyle = "rgba(120,100,80,.55)";
      x.fillRect(0, 0, 512, 3);
      x.fillRect(0, 0, 3, 512);
    }
  });

const texturePelouse = () =>
  toile(512, 512, (x) => {
    const r = hasard(17);
    x.fillStyle = "#5c7a3a";
    x.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 26000; i++) {
      const v = r();
      x.fillStyle = v > 0.5 ? `rgba(160,190,90,${(v - 0.5) * 0.5})` : `rgba(30,50,20,${(0.5 - v) * 0.5})`;
      x.fillRect(r() * 512, r() * 512, 1, 2 + r() * 4);
    }
  });

const textureLames = () =>
  toile(512, 512, (x) => {
    const r = hasard(19);
    for (let i = 0; i < 8; i++) {
      const v = Math.round(r() * 20);
      x.fillStyle = `rgb(${128 + v},${90 + v * 0.7},${62 + v * 0.5})`;
      x.fillRect(0, i * 64, 512, 64);
      for (let k = 0; k < 40; k++) {
        x.strokeStyle = `rgba(${r() > 0.5 ? "255,235,210" : "50,30,15"},${0.05 + r() * 0.08})`;
        x.lineWidth = 0.6 + r() * 1.4;
        const y = i * 64 + r() * 64;
        x.beginPath();
        x.moveTo(0, y);
        x.lineTo(512, y + (r() - 0.5) * 6);
        x.stroke();
      }
      x.fillStyle = "rgba(40,25,15,.7)";
      x.fillRect(0, i * 64, 512, 3);
    }
  });

const textureFeuillage = (fond: string, clair: string, graine: number) =>
  toile(256, 256, (x) => {
    const r = hasard(graine);
    x.fillStyle = fond;
    x.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 1800; i++) {
      x.fillStyle = r() > 0.55 ? clair : "rgba(0,0,0,.25)";
      x.globalAlpha = 0.25 + r() * 0.45;
      x.beginPath();
      x.ellipse(r() * 256, r() * 256, 2 + r() * 4, 1 + r() * 2, r() * Math.PI, 0, Math.PI * 2);
      x.fill();
    }
    x.globalAlpha = 1;
  });

// Le réseau lumineux que la surface dessine au fond : les arêtes d'un pavage de
// Voronoï périodique, qu'on fait glisser en deux couches dans le shader.
function textureCaustiques() {
  const T = 256, r = hasard(23), points: [number, number][] = [];
  for (let i = 0; i < 22; i++) points.push([r() * T, r() * T]);
  const c = document.createElement("canvas");
  c.width = c.height = T;
  const x = c.getContext("2d")!;
  const img = x.createImageData(T, T);
  for (let py = 0; py < T; py++)
    for (let px = 0; px < T; px++) {
      let d1 = 1e9, d2 = 1e9;
      for (const [qx, qy] of points)
        for (let ox = -1; ox <= 1; ox++)
          for (let oy = -1; oy <= 1; oy++) {
            const d = Math.hypot(px - qx - ox * T, py - qy - oy * T);
            if (d < d1) { d2 = d1; d1 = d; } else if (d < d2) d2 = d;
          }
      const v = Math.max(0, 1 - (d2 - d1) / 9);
      const n = (py * T + px) * 4;
      img.data[n] = img.data[n + 1] = img.data[n + 2] = Math.round(255 * v * v);
      img.data[n + 3] = 255;
    }
  x.putImageData(img, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

/* ============================ le ciel ============================ */

// Une fin de journée d'été : bleu doux en haut, or vers l'horizon, un soleil bas.
const SOLEIL = new THREE.Vector3(-0.35, 0.3, -0.89).normalize();
function sphereCiel() {
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: { uSoleil: { value: SOLEIL } },
    vertexShader: `varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      uniform vec3 uSoleil; varying vec3 vDir;
      void main() {
        float h = clamp(vDir.y, -1.0, 1.0);
        vec3 zenith = vec3(0.28, 0.46, 0.72), milieu = vec3(0.62, 0.72, 0.84), horizon = vec3(1.0, 0.78, 0.52), sol = vec3(0.32, 0.30, 0.26);
        vec3 c = h > 0.0 ? mix(horizon, mix(milieu, zenith, smoothstep(0.25, 0.9, h)), smoothstep(0.0, 0.35, h)) : mix(horizon, sol, smoothstep(0.0, 0.2, -h));
        float s = max(dot(normalize(vDir), uSoleil), 0.0);
        c += vec3(1.0, 0.72, 0.42) * (pow(s, 6.0) * 0.55 + pow(s, 600.0) * 6.0);
        gl_FragColor = vec4(c, 1.0);
      }`,
  });
  return new THREE.Mesh(new THREE.SphereGeometry(200, 48, 24), mat);
}

/* ============================ la coque du bassin ============================ */

// Le fond et les parois savent où est l'eau : en dessous, la teinte bleuit avec la
// profondeur et la lumière danse ; juste au-dessus, une bande reste mouillée.
function matiereCoque(mosaique: THREE.Texture, caustiques: THREE.Texture, niveau: { value: number }, temps: { value: number }) {
  const m = new THREE.MeshStandardMaterial({ map: mosaique, roughness: 0.35, emissive: "#d9fbff", emissiveIntensity: 1 });
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uNiveau = niveau;
    shader.uniforms.uTemps = temps;
    shader.uniforms.uCaustiques = { value: caustiques };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vMonde;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvMonde = (modelMatrix * vec4(transformed, 1.0)).xyz;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vMonde;\nuniform float uNiveau;\nuniform float uTemps;\nuniform sampler2D uCaustiques;")
      .replace(
        "#include <map_fragment>",
        `#include <map_fragment>
        // La ligne d'eau : une frise bleue sur le haut des parois.
        if (vMonde.y > -0.17 && vMonde.y < -0.01) diffuseColor.rgb *= vec3(0.36, 0.56, 0.74);
        float sous = step(vMonde.y, uNiveau);
        float prof = clamp((uNiveau - vMonde.y) / 1.5, 0.0, 1.0);
        diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.52, 0.82, 0.93), sous * (0.3 + 0.55 * prof));
        float mouille = (1.0 - sous) * (1.0 - smoothstep(0.0, 0.05, vMonde.y - uNiveau)) * step(-1.39, uNiveau);
        diffuseColor.rgb *= 1.0 - 0.18 * mouille;`
      )
      .replace(
        "#include <emissivemap_fragment>",
        `vec2 cuv = vMonde.xz * 0.34 + vec2(vMonde.y * 0.25);
        float c1 = texture2D(uCaustiques, cuv + vec2(uTemps * 0.035, uTemps * 0.02)).r;
        float c2 = texture2D(uCaustiques, cuv * 0.83 + vec2(-uTemps * 0.025, uTemps * 0.031)).r;
        float lumiere = pow((c1 + c2) * 0.5, 1.6) * 1.7;
        float sousEau = step(vMonde.y, uNiveau) * smoothstep(-1.4, -1.25, uNiveau);
        totalEmissiveRadiance *= lumiere * sousEau * (0.45 + 0.4 * (1.0 - clamp((uNiveau - vMonde.y) / 1.5, 0.0, 1.0)));`
      );
  };
  m.customProgramCacheKey = () => "coque-neuf-etes";
  return m;
}

/* ============================ la surface de l'eau ============================ */

// L'onde : l'équation des vagues sur une grille, soixante pas par seconde, amortie.
// La vitesse (C2) est réglée pour qu'une ride traverse le bassin en quelques secondes,
// comme sur une vraie piscine ; les parois la renvoient.
const C2 = 0.07;
class Ondes {
  a = new Float32Array((NX + 1) * (NZ + 1));
  b = new Float32Array((NX + 1) * (NZ + 1));
  pas() {
    const { a, b } = this;
    const w = NX + 1;
    for (let j = 1; j < NZ; j++)
      for (let i = 1; i < NX; i++) {
        const k = j * w + i;
        b[k] = (2 * a[k] - b[k] + C2 * (a[k - 1] + a[k + 1] + a[k - w] + a[k + w] - 4 * a[k])) * 0.993;
      }
    this.a = b;
    this.b = a;
  }
  // Une goutte, un doigt : une bosse douce de rayon r (en cases).
  toucher(u: number, v: number, force: number, r = 3) {
    const ci = u * NX, cj = v * NZ, w = NX + 1;
    for (let j = Math.max(1, Math.floor(cj - r)); j <= Math.min(NZ - 1, Math.ceil(cj + r)); j++)
      for (let i = Math.max(1, Math.floor(ci - r)); i <= Math.min(NX - 1, Math.ceil(ci + r)); i++) {
        const d = Math.hypot(i - ci, j - cj) / r;
        if (d < 1) this.a[j * w + i] += force * (0.5 + 0.5 * Math.cos(d * Math.PI));
      }
  }
}

/* ============================ le décor ============================ */

function boite(l: number, h: number, p: number, mat: THREE.Material, x: number, y: number, z: number, arrondi = 0) {
  const g = arrondi ? new RoundedBoxGeometry(l, h, p, 2, arrondi) : new THREE.BoxGeometry(l, h, p);
  const m = new THREE.Mesh(g, mat);
  m.position.set(x, y, z);
  m.castShadow = m.receiveShadow = true;
  return m;
}

// Une couronne d'arbre ou un buisson : une sphère bosselée, toujours la même.
function touffe(rayon: number, graine: number, mat: THREE.Material) {
  const g = new THREE.IcosahedronGeometry(rayon, 3);
  const r = hasard(graine), p = g.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const n = 1 + Math.sin(v.x * 7 + graine) * 0.06 + Math.sin(v.y * 9) * 0.05 + Math.sin(v.z * 8 + graine * 2) * 0.06 + (r() - 0.5) * 0.04;
    v.multiplyScalar(n);
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, mat);
  m.castShadow = m.receiveShadow = true;
  return m;
}

function decor(scene: THREE.Scene, mat: ReturnType<typeof matieres>) {
  // La plage de pierre, percée du bassin, puis la pelouse tout autour.
  const plage = new THREE.Shape();
  plage.moveTo(-6, -4.2);
  plage.lineTo(6.6, -4.2);
  plage.lineTo(6.6, 4.2);
  plage.lineTo(-6, 4.2);
  plage.closePath();
  const trou = new THREE.Path();
  const ox = L / 2 + MARGELLE, oz = P / 2 + MARGELLE;
  trou.moveTo(-ox, -oz);
  trou.lineTo(-ox, oz);
  trou.lineTo(ox, oz);
  trou.lineTo(ox, -oz);
  trou.closePath();
  plage.holes.push(trou);
  const gPlage = new THREE.ShapeGeometry(plage);
  gPlage.rotateX(-Math.PI / 2);
  const uv = gPlage.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / 0.6, uv.getY(i) / 0.6);
  const sol = new THREE.Mesh(gPlage, mat.dalles);
  sol.receiveShadow = true;
  scene.add(sol);

  // La pelouse, percée elle aussi : sans ce trou, elle recouvrirait le bassin.
  const champ = new THREE.Shape();
  champ.moveTo(-45, -45);
  champ.lineTo(45, -45);
  champ.lineTo(45, 45);
  champ.lineTo(-45, 45);
  champ.closePath();
  champ.holes.push(trou);
  const gPelouse = new THREE.ShapeGeometry(champ);
  gPelouse.rotateX(-Math.PI / 2);
  const uvp = gPelouse.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < uvp.count; i++) uvp.setXY(i, uvp.getX(i) / 3, uvp.getY(i) / 3);
  const pelouse = new THREE.Mesh(gPelouse, mat.pelouse);
  pelouse.position.y = -0.015;
  pelouse.receiveShadow = true;
  scene.add(pelouse);

  // La margelle : quatre pierres arrondies qui débordent un peu sur l'eau.
  const e = 0.06;
  scene.add(
    boite(L + 2 * MARGELLE, e, MARGELLE + 0.04, mat.margelle, 0, e / 2 - 0.02, -(P / 2 + MARGELLE / 2) + 0.02, 0.02),
    boite(L + 2 * MARGELLE, e, MARGELLE + 0.04, mat.margelle, 0, e / 2 - 0.02, P / 2 + MARGELLE / 2 - 0.02, 0.02),
    boite(MARGELLE + 0.04, e, P, mat.margelle, -(L / 2 + MARGELLE / 2) + 0.02, e / 2 - 0.02, 0, 0.02),
    boite(MARGELLE + 0.04, e, P, mat.margelle, L / 2 + MARGELLE / 2 - 0.02, e / 2 - 0.02, 0, 0.02),
  );

  // Le bassin : le fond et les quatre parois.
  const coque = new THREE.Group();
  const fond = new THREE.Mesh(new THREE.PlaneGeometry(L, P), mat.coque);
  fond.rotation.x = -Math.PI / 2;
  fond.position.y = FOND;
  const paroi = (l: number, x: number, z: number, ry: number) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(l, -FOND), mat.coque);
    m.position.set(x, FOND / 2, z);
    m.rotation.y = ry;
    return m;
  };
  coque.add(fond, paroi(L, 0, -P / 2, 0), paroi(L, 0, P / 2, Math.PI), paroi(P, -L / 2, 0, Math.PI / 2), paroi(P, L / 2, 0, -Math.PI / 2));
  coque.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.receiveShadow = true;
      const g = o.geometry as THREE.PlaneGeometry;
      const u = g.attributes.uv as THREE.BufferAttribute;
      const { width, height } = g.parameters;
      for (let i = 0; i < u.count; i++) u.setXY(i, (u.getX(i) * width) / 0.4, (u.getY(i) * height) / 0.4);
    }
  });
  scene.add(coque);
  // La bonde de fond et le projecteur, deux disques d'inox.
  const bonde = new THREE.Mesh(new THREE.CircleGeometry(0.12, 32), mat.inox);
  bonde.rotation.x = -Math.PI / 2;
  bonde.position.set(0.6, FOND + 0.004, 0);
  const projecteur = new THREE.Mesh(new THREE.CircleGeometry(0.13, 32), mat.inox);
  projecteur.position.set(-1.2, -0.55, -P / 2 + 0.004);
  scene.add(bonde, projecteur);

  // L'échelle d'inox, côté pelouse.
  const tube = (points: THREE.Vector3[]) => {
    const m = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 40, 0.022, 12), mat.inox);
    m.castShadow = true;
    return m;
  };
  for (const dx of [-0.25, 0.25]) {
    scene.add(
      tube([
        new THREE.Vector3(-1.8 + dx, 0.0, P / 2 + 0.42),
        new THREE.Vector3(-1.8 + dx, 0.62, P / 2 + 0.36),
        new THREE.Vector3(-1.8 + dx, 0.7, P / 2 + 0.06),
        new THREE.Vector3(-1.8 + dx, 0.5, P / 2 - 0.12),
        new THREE.Vector3(-1.8 + dx, -0.9, P / 2 - 0.1),
      ]),
    );
  }
  for (const y of [-0.25, -0.55, -0.85]) scene.add(boite(0.5, 0.025, 0.09, mat.inox, -1.8, y, P / 2 - 0.12));

  // La bouche de la lame d'eau, sur la margelle du fond.
  scene.add(boite(LAME_LARGEUR + 0.08, 0.05, 0.16, mat.inox, LAME_X + 0.08, 0.06, 0, 0.012));

  // La terrasse de bois, côté maison, et la maison elle-même : deux volumes blancs,
  // une grande baie qui renvoie le ciel.
  scene.add(boite(5, 0.08, 8.4, mat.lames, 9.1, 0.02, 0));
  const maison = new THREE.Group();
  maison.add(boite(5.5, 3.1, 10, mat.enduit, 14.4, 1.55, 0));
  maison.add(boite(5.0, 2.9, 6.6, mat.enduit, 14.6, 4.55, -1.5));
  maison.add(boite(0.08, 2.4, 6.2, mat.vitre, 11.62, 1.4, 0.4));
  maison.add(boite(0.08, 1.6, 4.0, mat.vitre, 12.08, 4.5, -1.4));
  for (const z of [-2.7, -1.15, 0.4, 1.95, 3.5]) maison.add(boite(0.1, 2.4, 0.06, mat.cadre, 11.6, 1.4, z));
  maison.add(boite(0.12, 0.08, 6.3, mat.cadre, 11.6, 2.62, 0.4));
  maison.add(boite(6.0, 0.14, 10.4, mat.cadre, 14.4, 3.16, 0));
  maison.add(boite(5.4, 0.14, 7.0, mat.cadre, 14.6, 6.06, -1.5));
  scene.add(maison);

  // Les haies le long des deux côtés, un olivier, deux bains de soleil.
  for (const cote of [-1, 1]) {
    const haie = boite(18, 1.7, 1.1, mat.haie, 1.2, 0.85, cote * 6.4, 0.3);
    scene.add(haie);
  }
  const olivier = new THREE.Group();
  const tronc = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.18, 2.2, 10), mat.tronc);
  tronc.position.y = 1.1;
  tronc.rotation.z = 0.12;
  tronc.castShadow = true;
  olivier.add(tronc);
  [[0, 2.5, 0, 1.1], [0.7, 2.2, 0.4, 0.8], [-0.6, 2.3, -0.3, 0.85], [0.2, 3.0, -0.4, 0.7]].forEach(([x, y, z, rr], i) => {
    const t = touffe(rr, 31 + i, mat.olivier);
    t.position.set(x, y, z);
    olivier.add(t);
  });
  olivier.position.set(5.6, 0, -4.9);
  scene.add(olivier);

  const bain = (z: number) => {
    const g = new THREE.Group();
    g.add(boite(0.7, 0.24, 1.9, mat.cadreClair, 0, 0.12, 0, 0.04));
    g.add(boite(0.62, 0.08, 1.2, mat.coussin, 0, 0.28, 0.32, 0.04));
    const dossier = boite(0.62, 0.08, 0.7, mat.coussin, 0, 0.42, -0.55, 0.04);
    dossier.rotation.x = -0.75;
    g.add(dossier);
    g.position.set(z, 0, 3.35);
    g.rotation.y = Math.PI / 2 + 0.08;
    return g;
  };
  scene.add(bain(-0.6), bain(1.0));
}

function matieres(caustiques: THREE.Texture, niveau: { value: number }, temps: { value: number }) {
  const mosaique = textureMosaique();
  const pierre = texturePierre(false), dalles = texturePierre(true);
  const pelouse = texturePelouse();
  const lames = textureLames();
  lames.repeat.set(2, 2);
  const haie = textureFeuillage("#2f4a26", "#6f8f45", 41);
  haie.repeat.set(10, 1);
  const olivier = textureFeuillage("#5f6f47", "#b3bf8f", 43);
  const textures = [mosaique, pierre, dalles, pelouse, lames, haie, olivier, caustiques];
  return {
    textures,
    coque: matiereCoque(mosaique, caustiques, niveau, temps),
    margelle: new THREE.MeshStandardMaterial({ map: pierre, roughness: 0.75 }),
    dalles: new THREE.MeshStandardMaterial({ map: dalles, roughness: 0.82 }),
    pelouse: new THREE.MeshStandardMaterial({ map: pelouse, roughness: 1 }),
    lames: new THREE.MeshStandardMaterial({ map: lames, roughness: 0.7 }),
    inox: new THREE.MeshStandardMaterial({ color: "#d6dadd", metalness: 1, roughness: 0.18 }),
    enduit: new THREE.MeshStandardMaterial({ color: "#efece6", roughness: 0.9 }),
    cadre: new THREE.MeshStandardMaterial({ color: "#2a2c2e", roughness: 0.5, metalness: 0.3 }),
    cadreClair: new THREE.MeshStandardMaterial({ color: "#e9e6e0", roughness: 0.6 }),
    coussin: new THREE.MeshStandardMaterial({ color: "#f3efe6", roughness: 0.95 }),
    vitre: new THREE.MeshStandardMaterial({ color: "#3d5560", metalness: 0.35, roughness: 0.05, envMapIntensity: 1.6 }),
    haie: new THREE.MeshStandardMaterial({ map: haie, roughness: 0.95 }),
    tronc: new THREE.MeshStandardMaterial({ color: "#5b4a3a", roughness: 0.9 }),
    olivier: new THREE.MeshStandardMaterial({ map: olivier, roughness: 0.9 }),
  };
}

/* ============================ la lame d'eau ============================ */

// Un ruban qui tombe en parabole de la bouche jusqu'à la surface ; ses filets
// glissent vers le bas. Sa forme suit la hauteur de chute, qui baisse avec le niveau.
function lameDeau() {
  const geo = new THREE.PlaneGeometry(1, 1, 1, 24);
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: { uT: { value: 0 }, uForce: { value: 0 } },
    vertexShader: `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      uniform float uT; uniform float uForce; varying vec2 vUv;
      void main() {
        float filets = 0.55 + 0.45 * sin(vUv.x * 90.0 + sin(vUv.x * 17.0) * 3.0 + vUv.y * 2.0);
        float coule = 0.6 + 0.4 * sin((vUv.y + uT * 2.6) * 40.0 + vUv.x * 9.0);
        float bords = smoothstep(0.0, 0.06, vUv.x) * smoothstep(1.0, 0.94, vUv.x);
        float a = (0.18 + 0.32 * filets * coule) * bords * uForce;
        gl_FragColor = vec4(mix(vec3(0.78, 0.93, 0.97), vec3(1.0), filets * 0.6), a);
      }`,
  });
  const mesh = new THREE.Mesh(geo, mat);
  // x = position le long de la chute, z = largeur.
  const placer = (niveau: number) => {
    const p = geo.attributes.position as THREE.BufferAttribute;
    const chute = Math.max(0.02, 0.04 - niveau);
    const avance = 0.42 * Math.sqrt(chute / 1.4) + 0.06;
    for (let i = 0; i < p.count; i++) {
      const u = geo.attributes.uv.getX(i), v = 1 - geo.attributes.uv.getY(i);
      p.setXYZ(i, LAME_X - avance * Math.sqrt(v), 0.04 - chute * v, (u - 0.5) * LAME_LARGEUR);
    }
    p.needsUpdate = true;
    geo.computeBoundingSphere();
    return LAME_X - avance;
  };
  return { mesh, mat, placer };
}

/* ============================ le composant ============================ */

export default function Bassin3D({ onPret, onIndisponible }: Props) {
  const conteneur = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = conteneur.current;
    if (!el) return;
    // WebGL testé avant three : sans lui, three écrit trois erreurs en console avant
    // d'abandonner. Le repli (l'affiche, le plan 2D) suffit, en silence.
    const essai = document.createElement("canvas");
    if (!(essai.getContext("webgl2") ?? essai.getContext("webgl"))) {
      onIndisponible();
      return;
    }
    let rendu: THREE.WebGLRenderer;
    try {
      rendu = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch {
      onIndisponible();
      return;
    }
    const ordinateur = window.innerWidth >= 1024 && !window.matchMedia("(pointer: coarse)").matches;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rendu.setPixelRatio(Math.min(window.devicePixelRatio, ordinateur ? 1.75 : 1.5));
    rendu.shadowMap.enabled = true;
    rendu.shadowMap.type = THREE.PCFShadowMap;
    rendu.toneMapping = THREE.ACESFilmicToneMapping;
    rendu.toneMappingExposure = 0.98;
    el.appendChild(rendu.domElement);
    Object.assign(rendu.domElement.style, { display: "block", width: "100%", height: "100%" });

    const scene = new THREE.Scene();
    const ciel = sphereCiel();
    scene.add(ciel);
    // Le reflet : le même ciel, passé au filtre des reflets.
    const pmrem = new THREE.PMREMGenerator(rendu);
    const cielSeul = new THREE.Scene();
    cielSeul.add(sphereCiel());
    // la sphère fait 200 m : la prise de vue des reflets doit voir jusque-là
    const environnement = pmrem.fromScene(cielSeul, 0.02, 0.1, 500).texture;
    scene.environment = environnement;

    const soleil = new THREE.DirectionalLight("#ffc98f", 3.4);
    soleil.position.copy(SOLEIL).multiplyScalar(30);
    soleil.castShadow = true;
    soleil.shadow.mapSize.set(ordinateur ? 2048 : 1024, ordinateur ? 2048 : 1024);
    Object.assign(soleil.shadow.camera, { left: -14, right: 14, top: 12, bottom: -12, near: 5, far: 70 });
    soleil.shadow.bias = -0.0003;
    soleil.shadow.normalBias = 0.02;
    soleil.shadow.radius = 3;
    const voute = new THREE.HemisphereLight("#b9cbe6", "#5e4c36", 0.55);
    scene.add(soleil, voute);

    const niveau = { value: reduit ? PLEIN : FOND - 0.01 };
    const temps = { value: 0 };
    const caustiques = textureCaustiques();
    const mat = matieres(caustiques, niveau, temps);
    decor(scene, mat);

    // L'eau : une nappe déformée par l'onde, qui laisse voir le fond en le déviant.
    const geoEau = new THREE.PlaneGeometry(L, P, NX, NZ);
    geoEau.rotateX(-Math.PI / 2);
    const matEau = new THREE.MeshPhysicalMaterial({
      color: "#e6fbff",
      roughness: 0.03,
      metalness: 0,
      transmission: 1,
      thickness: 1.4,
      ior: 1.333,
      attenuationColor: new THREE.Color("#2aa7c2"),
      attenuationDistance: 2.2,
      envMapIntensity: 1.25,
    });
    // La pente de chaque point de la nappe : là où l'eau se creuse ou se soulève, la
    // lumière du ciel accroche. Sans ce reflet, une eau aussi claire cacherait ses rides.
    const pente = new Float32Array((NX + 1) * (NZ + 1));
    geoEau.setAttribute("aPente", new THREE.BufferAttribute(pente, 1));
    matEau.onBeforeCompile = (shader) => {
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", "#include <common>\nattribute float aPente;\nvarying float vPente;")
        .replace("#include <begin_vertex>", "#include <begin_vertex>\nvPente = aPente;");
      shader.fragmentShader = shader.fragmentShader
        .replace("#include <common>", "#include <common>\nvarying float vPente;")
        .replace("#include <emissivemap_fragment>", "#include <emissivemap_fragment>\ntotalEmissiveRadiance += vec3(0.78, 0.93, 0.98) * smoothstep(0.002, 0.04, vPente) * 0.42;");
    };
    matEau.customProgramCacheKey = () => "eau-neuf-etes";
    const eau = new THREE.Mesh(geoEau, matEau);
    eau.visible = reduit;
    scene.add(eau);
    const ondes = new Ondes();
    const lame = lameDeau();
    scene.add(lame.mesh);

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 400);
    const cible = new THREE.Vector3();
    // Deux cadrages : le téléphone regarde le bassin dans sa longueur, de haut ;
    // l'ordinateur le prend de trois quarts. Entre les deux, on mélange. Le texte
    // occupe le bas de l'écran sur téléphone et la gauche sur ordinateur : l'image est
    // décalée pour que le bassin reste dans la partie libre.
    const cadrer = (largeur: number, hauteur: number, avance: number) => {
      const aspect = largeur / hauteur;
      const k = THREE.MathUtils.clamp((aspect - 0.56) / (1.78 - 0.56), 0, 1);
      camera.fov = THREE.MathUtils.lerp(50, 40, k);
      camera.position.set(
        THREE.MathUtils.lerp(-9.2, -7.4, k) + avance * 0.8,
        THREE.MathUtils.lerp(5.0, 2.6, k) - avance * 0.3,
        THREE.MathUtils.lerp(0.7, 6.0, k) - avance * k * 0.6,
      );
      cible.set(THREE.MathUtils.lerp(1.4, 1.4, k), THREE.MathUtils.lerp(-0.9, -0.5, k), THREE.MathUtils.lerp(0, -0.6, k));
      camera.lookAt(cible);
      camera.aspect = aspect;
      camera.setViewOffset(largeur, hauteur, THREE.MathUtils.lerp(0, -0.17, k) * largeur, THREE.MathUtils.lerp(0.2, 0.02, k) * hauteur, largeur, hauteur);
      camera.updateProjectionMatrix();
    };

    let composer: EffectComposer | null = null;
    if (ordinateur) {
      composer = new EffectComposer(rendu);
      composer.addPass(new RenderPass(scene, camera));
      composer.addPass(new UnrealBloomPass(new THREE.Vector2(512, 512), 0.35, 0.5, 0.86));
      composer.addPass(new OutputPass());
    }

    // Le doigt ou la souris sur l'eau : un rayon jusqu'à la nappe, et une ride là où il
    // la touche.
    const rayon = new THREE.Raycaster();
    const pointeur = new THREE.Vector2();
    const sol = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const touche = new THREE.Vector3();
    let dernier = { u: -1, v: -1 };
    const surEau = (ev: PointerEvent) => {
      if (reduit || !eau.visible) return;
      const r = rendu.domElement.getBoundingClientRect();
      pointeur.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
      rayon.setFromCamera(pointeur, camera);
      sol.constant = -niveau.value;
      if (!rayon.ray.intersectPlane(sol, touche)) return;
      const u = (touche.x + L / 2) / L, v = (touche.z + P / 2) / P;
      if (u < 0 || u > 1 || v < 0 || v > 1) return;
      // Le long du geste, une ride tous les quelques centimètres.
      const pas = Math.hypot(u - dernier.u, (v - dernier.v) * 0.5);
      if (pas > 0.012 || dernier.u < 0) {
        ondes.toucher(u, v, ev.type === "pointerdown" ? 0.08 : 0.035, ev.type === "pointerdown" ? 4 : 2.5);
        dernier = { u, v };
      }
    };
    rendu.domElement.addEventListener("pointermove", surEau);
    rendu.domElement.addEventListener("pointerdown", surEau);

    // Les hauteurs de l'onde posées sur la nappe.
    const poser = () => {
      const p = geoEau.attributes.position as THREE.BufferAttribute;
      const w = NX + 1;
      for (let j = 0; j <= NZ; j++) for (let i = 0; i <= NX; i++) p.setY(j * w + i, ondes.a[j * w + i]);
      p.needsUpdate = true;
      geoEau.computeVertexNormals();
      const n = geoEau.attributes.normal as THREE.BufferAttribute;
      for (let i = 0; i < pente.length; i++) pente[i] = 1 - n.getY(i);
      geoEau.attributes.aPente.needsUpdate = true;
    };

    let image = 0, visible = true, debut = -1, premiere = true, precedent = 0, reste = 0;
    const dessiner = () => {
      if (composer) composer.render();
      else rendu.render(scene, camera);
      if (premiere) {
        premiere = false;
        onPret();
      }
    };
    const graine = hasard(57);
    const boucle = (maintenant: number) => {
      image = requestAnimationFrame(boucle);
      if (debut < 0) debut = maintenant;
      const t = (maintenant - debut) / 1000;
      temps.value = t;

      // Le remplissage : la lame s'ouvre, puis l'eau monte en huit secondes et demie,
      // doucement au départ et à l'arrivée, jusqu'à dix centimètres de la margelle.
      const monte = THREE.MathUtils.smoothstep(t, 0.8, 9.3);
      niveau.value = THREE.MathUtils.lerp(FOND - 0.01, PLEIN, monte);
      eau.visible = niveau.value > FOND + 0.005;
      eau.position.y = niveau.value;
      const debit = THREE.MathUtils.clamp((t - 0.3) / 0.6, 0, 1) * (1 - 0.55 * THREE.MathUtils.clamp((t - 8.5) / 2, 0, 1));
      lame.mat.uniforms.uT.value = t;
      lame.mat.uniforms.uForce.value = debit;
      const chute = lame.placer(niveau.value);
      if (eau.visible && debit > 0) {
        // la lame frappe l'eau sur toute sa largeur : des gouttes tirées au hasard
        const u = (chute + L / 2) / L;
        for (let k = 0; k < 3; k++) ondes.toucher(u - graine() * 0.01, 0.5 + (graine() - 0.5) * (LAME_LARGEUR / P) * 0.9, 0.012 * debit, 2);
      }
      // Un pas d'onde par soixantième de seconde, quel que soit l'écran.
      reste = Math.min(reste + (maintenant - (precedent || maintenant)) / 1000, 0.1);
      precedent = maintenant;
      while (reste >= 1 / 60) {
        ondes.pas();
        reste -= 1 / 60;
      }
      poser();

      cadrer(rendu.domElement.clientWidth, Math.max(1, rendu.domElement.clientHeight), Math.sin((Math.min(t, 12) / 12) * (Math.PI / 2)));
      dessiner();
    };

    const relancer = () => {
      if (!image && visible && !reduit) image = requestAnimationFrame(boucle);
    };
    const observateur = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) relancer();
      else {
        cancelAnimationFrame(image);
        image = 0;
        precedent = 0;
        // à la reprise, le temps repart d'où il s'était arrêté
        debut = -1 - temps.value * 1000;
      }
    });
    observateur.observe(el);

    const taille = new ResizeObserver(() => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      rendu.setSize(width, height, false);
      composer?.setSize(width, height);
      cadrer(width, height, reduit ? 1 : 0);
      if (reduit) {
        // Sans animations : le bassin plein, une ride à peine, une seule image.
        niveau.value = PLEIN;
        eau.position.y = PLEIN;
        eau.visible = true;
        lame.mat.uniforms.uForce.value = 0.5;
        lame.placer(PLEIN);
        temps.value = 3;
        ondes.toucher(0.55, 0.45, 0.02, 6);
        for (let i = 0; i < 25; i++) ondes.pas();
        poser();
        dessiner();
      }
    });
    taille.observe(el);
    relancer();

    return () => {
      cancelAnimationFrame(image);
      observateur.disconnect();
      taille.disconnect();
      rendu.domElement.removeEventListener("pointermove", surEau);
      rendu.domElement.removeEventListener("pointerdown", surEau);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          const m = o.material;
          (Array.isArray(m) ? m : [m]).forEach((x) => x.dispose());
        }
      });
      cielSeul.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (o.material as THREE.Material).dispose();
        }
      });
      mat.textures.forEach((x) => x.dispose());
      composer?.passes.forEach((p) => p.dispose());
      composer?.dispose();
      environnement.dispose();
      pmrem.dispose();
      rendu.dispose();
      rendu.domElement.remove();
    };
  }, [onPret, onIndisponible]);

  return <div ref={conteneur} className="absolute inset-0 touch-pan-y" aria-hidden="true" />;
}
