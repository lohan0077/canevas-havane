"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { GTAOPass } from "three/examples/jsm/postprocessing/GTAOPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import type { Jardin, Rect } from "./jardin-geometrie";

// Le jardin du visiteur en maquette d'architecte : un socle de pierre sombre, la maison
// en deux volumes, un bassin creusé dont l'eau laisse voir le fond, la vie autour
// (haie taillée, arbres, transats, parasol, table, bornes). Depuis le 30/10/2026, les
// matières sont celles de l'ouverture du site (mosaïque claire, travertin, eau qui
// réfracte, feuillages peints) : la maquette ne fait plus jouet à côté d'elle. Lumière de studio, reflets d'environnement, et sur ordinateur
// occlusion ambiante et halo. Deux ambiances, et le passage de l'une à l'autre se
// joue : le soleil descend et rougit, puis chaque fenêtre s'allume à son tour, les
// bornes du jardin et la piscine s'éclairent, les étoiles sortent. Le jour, la
// lumière danse au fond du bassin ; les arbres bougent un peu au vent.
//
// Tout est construit et peint sur place : aucun fichier chargé, aucun serveur tiers
// (les éclairages tout faits des surcouches React de Kéo se téléchargent sur un CDN que
// la politique de sécurité bloque). La boucle s'arrête quand la vue sort de l'écran ;
// rien ne bouge si le visiteur limite les animations.

export type Ambiance = "jour" | "soir";

type Props = {
  jardin: Jardin;
  ambiance: Ambiance;
  /** Appelé si le navigateur ne sait pas faire de 3D : le parent garde le plan. */
  onIndisponible: () => void;
};

/* ============================ textures peintes ============================ */

function toile(l: number, h: number, dessin: (ctx: CanvasRenderingContext2D) => void, srgb = true) {
  const c = document.createElement("canvas");
  c.width = l;
  c.height = h;
  dessin(c.getContext("2d")!);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function pointille(ctx: CanvasRenderingContext2D, l: number, h: number, n: number, teinte: () => string, rayon: () => number) {
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = teinte();
    ctx.beginPath();
    ctx.arc(Math.random() * l, Math.random() * h, rayon(), 0, Math.PI * 2);
    ctx.fill();
  }
}

/** Pelouse tondue : bandes à peine marquées et brins d'herbe. Un motif = 4 m. */
const texturePelouse = () =>
  toile(512, 512, (ctx) => {
    ctx.fillStyle = "#557a37";
    ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = i % 2 ? "rgba(255,255,210,0.05)" : "rgba(0,30,0,0.05)";
      ctx.fillRect(i * 128, 0, 128, 512);
    }
    for (let i = 0; i < 24000; i++) {
      const v = Math.random();
      ctx.fillStyle = v > 0.5 ? `rgba(170,200,100,${(v - 0.5) * 0.45})` : `rgba(25,45,15,${(0.5 - v) * 0.45})`;
      ctx.fillRect(Math.random() * 512, Math.random() * 512, 1, 2 + Math.random() * 3);
    }
  });

/** Lames de bois avec leurs joints, dans le sens de la largeur du motif. Un motif = 1 m. */
const textureLames = () =>
  toile(512, 512, (ctx) => {
    const lame = 512 / 7;
    for (let i = 0; i < 7; i++) {
      const v = Math.floor(Math.random() * 22);
      ctx.fillStyle = `rgb(${158 + v},${116 + v},${78 + Math.round(v * 0.6)})`;
      ctx.fillRect(0, i * lame, 512, lame);
      for (let k = 0; k < 18; k++) {
        ctx.strokeStyle = `rgba(80,50,25,${0.06 + Math.random() * 0.08})`;
        ctx.beginPath();
        const y = i * lame + Math.random() * lame;
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(170, y + 2, 340, y - 2, 512, y + 1);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(45,28,14,0.85)";
      ctx.fillRect(0, (i + 1) * lame - 3, 512, 3);
    }
  });

/** Mosaïque de bassin : carreaux de 5 cm, presque blancs ; c'est l'eau qui bleuit.
    Un motif = 1 m. */
const textureCarreaux = (fond: string, joint: string) =>
  toile(400, 400, (ctx) => {
    ctx.fillStyle = joint;
    ctx.fillRect(0, 0, 400, 400);
    for (let x = 0; x < 20; x++)
      for (let y = 0; y < 20; y++) {
        ctx.fillStyle = fond;
        ctx.globalAlpha = 0.86 + Math.random() * 0.14;
        ctx.fillRect(x * 20 + 1, y * 20 + 1, 18, 18);
      }
    ctx.globalAlpha = 1;
  });

/** Travertin des margelles et du parvis, veiné, en dalles. Un motif = 2 m. */
const texturePierre = (base: string) =>
  toile(256, 256, (ctx) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 256, 256);
    pointille(ctx, 256, 256, 2600, () => (Math.random() < 0.5 ? "rgba(70,50,30,0.06)" : "rgba(255,250,240,0.08)"), () => 0.5 + Math.random() * 1.6);
    for (let i = 0; i < 22; i++) {
      ctx.strokeStyle = `rgba(140,115,85,${0.08 + Math.random() * 0.1})`;
      ctx.lineWidth = 0.5 + Math.random();
      const y = Math.random() * 256;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(85, y + (Math.random() - 0.5) * 16, 170, y + (Math.random() - 0.5) * 16, 256, y + (Math.random() - 0.5) * 6);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(0,0,0,0.12)";
    ctx.lineWidth = 1.5;
    for (let i = 0; i <= 256; i += 64) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 256);
      ctx.moveTo(0, i);
      ctx.lineTo(256, i);
      ctx.stroke();
    }
  });

/** Le chant du socle : une pierre sombre, à peine litée, comme une base de maquette. */
const texturePlinthe = () =>
  toile(256, 256, (ctx) => {
    ["#2f2b27", "#35302b", "#2c2824", "#322d29"].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.fillRect(0, i * 64, 256, 64);
    });
    pointille(ctx, 256, 256, 1600, () => `rgba(${Math.random() < 0.5 ? "0,0,0" : "255,240,220"},0.05)`, () => 0.6 + Math.random() * 2);
  });

/** Un feuillage vu de près : des feuilles claires et sombres sur un fond vert. */
const textureFeuillage = (fond: string, clair: string) =>
  toile(256, 256, (ctx) => {
    ctx.fillStyle = fond;
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 1800; i++) {
      ctx.fillStyle = Math.random() > 0.55 ? clair : "rgba(0,0,0,.28)";
      ctx.globalAlpha = 0.25 + Math.random() * 0.45;
      ctx.beginPath();
      ctx.ellipse(Math.random() * 256, Math.random() * 256, 2 + Math.random() * 4, 1 + Math.random() * 2, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  });

/** L'intérieur d'une pièce vu du jardin, le soir : plafonnier, rideaux, meubles en ombre. */
const textureInterieur = () =>
  toile(128, 128, (ctx) => {
    const d = ctx.createLinearGradient(0, 0, 0, 128);
    d.addColorStop(0, "#fff0d2");
    d.addColorStop(0.55, "#ffc57e");
    d.addColorStop(1, "#c9783c");
    ctx.fillStyle = d;
    ctx.fillRect(0, 0, 128, 128);
    const lampe = ctx.createRadialGradient(64, 16, 2, 64, 16, 62);
    lampe.addColorStop(0, "rgba(255,252,236,0.9)");
    lampe.addColorStop(1, "rgba(255,252,236,0)");
    ctx.fillStyle = lampe;
    ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = "rgba(150,80,35,0.35)";
    ctx.fillRect(0, 0, 15, 128);
    ctx.fillRect(113, 0, 15, 128);
    ctx.fillStyle = "rgba(70,35,15,0.55)";
    ctx.fillRect(26, 94, 58, 34);
    ctx.fillRect(22, 86, 10, 42);
    ctx.fillRect(80, 86, 10, 42);
    ctx.fillRect(100, 58, 3, 70);
  });

/** Une flaque de lumière au sol : claire au centre, noire au bord, posée en fondu additif. */
const textureNappe = () =>
  toile(128, 128, (ctx) => {
    const d = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    d.addColorStop(0, "#ffffff");
    d.addColorStop(0.35, "#8a8a8a");
    d.addColorStop(1, "#000000");
    ctx.fillStyle = d;
    ctx.fillRect(0, 0, 128, 128);
  });

/** Le réseau de lignes claires que l'eau dessine au fond d'un bassin, raccordable. */
const textureCaustiques = () =>
  toile(256, 256, (ctx) => {
    const img = ctx.createImageData(256, 256);
    for (let y = 0; y < 256; y++)
      for (let x = 0; x < 256; x++) {
        const u = (x / 256) * Math.PI * 2;
        const v = (y / 256) * Math.PI * 2;
        const a = Math.sin(u * 2 + Math.sin(v * 3) * 1.1) + Math.sin(v * 2 + Math.sin(u * 3 + 1.7) * 1.1);
        const b = Math.sin(u * 3 - v * 2 + Math.sin(u * 2 - v) * 0.9) + Math.sin(u + v * 4 + 2.3) * 0.6;
        const clair = Math.min(255, (Math.exp(-Math.abs(a) * 5) + Math.exp(-Math.abs(b) * 6) * 0.8) * 230);
        const k = (y * 256 + x) * 4;
        img.data[k] = img.data[k + 1] = img.data[k + 2] = clair;
        img.data[k + 3] = 255;
      }
    ctx.putImageData(img, 0, 0);
  });

/** Transition douce entre a et b (0 avant a, 1 après b). */
function lisse(a: number, b: number, t: number) {
  const x = THREE.MathUtils.clamp((t - a) / (b - a), 0, 1);
  return x * x * (3 - 2 * x);
}

/** Le fond de studio, repeint à chaque pas du passage au soir : un halo plus clair
    derrière la maquette, et les étoiles qui sortent à la nuit. */
function fondCiel() {
  const c = document.createElement("canvas");
  c.width = c.height = 512;
  const ctx = c.getContext("2d")!;
  const texture = new THREE.CanvasTexture(c);
  texture.colorSpace = THREE.SRGBColorSpace;
  const etoiles = Array.from({ length: 160 }, () => ({
    x: Math.random() * 512,
    y: Math.random() * 330,
    r: 0.5 + Math.random() * 1.1,
    a: 0.35 + Math.random() * 0.65,
  }));
  const centre = [new THREE.Color("#1F5E78"), new THREE.Color("#123247")];
  const bord = [new THREE.Color("#0A2A39"), new THREE.Color("#04131B")];
  const couleur = new THREE.Color();
  let dernier = -1;
  const peindre = (t: number) => {
    if (t === dernier) return;
    dernier = t;
    const d = ctx.createRadialGradient(256, 230, 20, 256, 256, 380);
    d.addColorStop(0, couleur.lerpColors(centre[0], centre[1], t).getStyle());
    d.addColorStop(1, couleur.lerpColors(bord[0], bord[1], t).getStyle());
    ctx.fillStyle = d;
    ctx.fillRect(0, 0, 512, 512);
    const nuit = lisse(0.55, 1, t);
    if (nuit > 0) {
      ctx.fillStyle = "#ffffff";
      for (const e of etoiles) {
        ctx.globalAlpha = e.a * nuit;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    texture.needsUpdate = true;
  };
  return { texture, peindre };
}

/** Carte de normales de l'eau : des vaguelettes, raccordables sur les bords. */
const textureVaguelettes = () =>
  toile(
    256,
    256,
    (ctx) => {
      const img = ctx.createImageData(256, 256);
      const h = (x: number, y: number) => {
        const u = (x / 256) * Math.PI * 2;
        const v = (y / 256) * Math.PI * 2;
        return Math.sin(u * 3 + v * 2) * 0.5 + Math.sin(u * 5 - v * 4 + 1.3) * 0.3 + Math.sin(u * 9 + v * 7 + 2.1) * 0.15 + Math.sin(-u * 2 + v * 11 + 0.4) * 0.12;
      };
      const n = new THREE.Vector3();
      for (let y = 0; y < 256; y++)
        for (let x = 0; x < 256; x++) {
          n.set(-(h(x + 1, y) - h(x - 1, y)) * 2.2, -(h(x, y + 1) - h(x, y - 1)) * 2.2, 1).normalize();
          const k = (y * 256 + x) * 4;
          img.data[k] = (n.x * 0.5 + 0.5) * 255;
          img.data[k + 1] = (n.y * 0.5 + 0.5) * 255;
          img.data[k + 2] = (n.z * 0.5 + 0.5) * 255;
          img.data[k + 3] = 255;
        }
      ctx.putImageData(img, 0, 0);
    },
    false,
  );

/* ============================ géométrie ============================ */

/** Rectangle à coins arrondis, centré, dans le plan du dessin (x, y). */
function contourArrondi(l: number, p: number, r: number): THREE.Shape;
function contourArrondi(l: number, p: number, r: number, trou: true): THREE.Path;
function contourArrondi(l: number, p: number, r: number, trou = false): THREE.Shape | THREE.Path {
  const f = trou ? new THREE.Path() : new THREE.Shape();
  const ra = Math.max(0.001, Math.min(r, l / 2 - 0.01, p / 2 - 0.01));
  if (!trou) {
    f.moveTo(l / 2, -p / 2 + ra);
    f.lineTo(l / 2, p / 2 - ra);
    f.absarc(l / 2 - ra, p / 2 - ra, ra, 0, Math.PI / 2, false);
    f.lineTo(-l / 2 + ra, p / 2);
    f.absarc(-l / 2 + ra, p / 2 - ra, ra, Math.PI / 2, Math.PI, false);
    f.lineTo(-l / 2, -p / 2 + ra);
    f.absarc(-l / 2 + ra, -p / 2 + ra, ra, Math.PI, (3 * Math.PI) / 2, false);
    f.lineTo(l / 2 - ra, -p / 2);
    f.absarc(l / 2 - ra, -p / 2 + ra, ra, (3 * Math.PI) / 2, 2 * Math.PI, false);
  } else {
    f.moveTo(-l / 2, p / 2 - ra);
    f.absarc(-l / 2 + ra, p / 2 - ra, ra, Math.PI, Math.PI / 2, true);
    f.lineTo(l / 2 - ra, p / 2);
    f.absarc(l / 2 - ra, p / 2 - ra, ra, Math.PI / 2, 0, true);
    f.lineTo(l / 2, -p / 2 + ra);
    f.absarc(l / 2 - ra, -p / 2 + ra, ra, 0, -Math.PI / 2, true);
    f.lineTo(-l / 2 + ra, -p / 2);
    f.absarc(-l / 2 + ra, -p / 2 + ra, ra, -Math.PI / 2, -Math.PI, true);
  }
  f.closePath();
  return f;
}

/** Le trou du bassin, en coordonnées du monde (le dessin porte -z en y). */
function trouBassin(r: Rect, coin: number) {
  const t = new THREE.Path();
  contourArrondi(r.largeur, r.profondeur, coin, true)
    .getPoints(8)
    .forEach((p, i) => (i ? t.lineTo(p.x + r.x, p.y - r.z) : t.moveTo(p.x + r.x, p.y - r.z)));
  t.closePath();
  return t;
}

/** Une surface horizontale percée, à la hauteur y, UV en mètres (`tourner` les échange). */
function surface(rect: Rect, trous: THREE.Path[], materiau: THREE.Material, y: number, metresParMotif: number, tourner = false) {
  const f = new THREE.Shape();
  const x0 = rect.x - rect.largeur / 2;
  const x1 = rect.x + rect.largeur / 2;
  const z0 = rect.z - rect.profondeur / 2;
  const z1 = rect.z + rect.profondeur / 2;
  f.moveTo(x0, -z1);
  f.lineTo(x1, -z1);
  f.lineTo(x1, -z0);
  f.lineTo(x0, -z0);
  f.closePath();
  f.holes.push(...trous);
  const g = new THREE.ShapeGeometry(f, 8);
  g.rotateX(-Math.PI / 2);
  const uv = g.attributes.uv as THREE.BufferAttribute;
  const pos = g.attributes.position as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) {
    const u = pos.getX(i) / metresParMotif;
    const v = pos.getZ(i) / metresParMotif;
    if (tourner) uv.setXY(i, v, u);
    else uv.setXY(i, u, v);
  }
  const m = new THREE.Mesh(g, materiau);
  m.position.y = y;
  m.receiveShadow = true;
  return m;
}

/** Les parois verticales d'un bassin, UV en mètres. */
function parois(l: number, p: number, coin: number, profondeur: number) {
  const pts = contourArrondi(l, p, coin).getPoints(10);
  const positions: number[] = [];
  const uvs: number[] = [];
  let parcouru = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    const longueur = a.distanceTo(b);
    if (longueur < 1e-4) continue;
    const coins = [
      [a.x, 0, -a.y, parcouru, 0],
      [b.x, 0, -b.y, parcouru + longueur, 0],
      [b.x, -profondeur, -b.y, parcouru + longueur, -profondeur],
      [a.x, -profondeur, -a.y, parcouru, -profondeur],
    ];
    for (const k of [0, 2, 1, 0, 3, 2]) {
      positions.push(coins[k][0], coins[k][1], coins[k][2]);
      uvs.push(coins[k][3], coins[k][4]);
    }
    parcouru += longueur;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  g.computeVertexNormals();
  return g;
}

/** Une boule de feuillage : une sphère bosselée, lisse, la même à chaque rendu. */
function boule(rayon: number, graine: number, detail = 3) {
  const g = mergeVertices(new THREE.IcosahedronGeometry(1, detail));
  const pos = g.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const bosse =
      1 +
      0.13 * Math.sin(v.x * 4.1 + graine) * Math.sin(v.y * 3.7 + graine * 1.7) +
      0.07 * Math.sin(v.z * 7.3 - graine * 0.6) * Math.cos(v.x * 6.1 + v.y * 2.3);
    v.multiplyScalar(rayon * bosse);
    pos.setXYZ(i, v.x, v.y * 0.92, v.z);
  }
  g.computeVertexNormals();
  return g;
}

/* ============================ les matières ============================ */

type Matieres = ReturnType<typeof creerMatieres>;

function creerMatieres() {
  const pelouse = texturePelouse();
  const lames = textureLames();
  const carreaux = textureCarreaux("#e8f3f5", "#c4d8dc");
  const carreauxFond = textureCarreaux("#dcedf0", "#bcd3d8");
  const pierre = texturePierre("#e3d7c3");
  const parvis = texturePierre("#cbbda6");
  const plinthe = texturePlinthe();
  const bardage = textureLames();
  bardage.rotation = Math.PI / 2;
  bardage.repeat.set(3, 3);
  const feuilles = textureFeuillage("#3f6a33", "#86a85a");
  const feuillesClaires = textureFeuillage("#557d3c", "#a7c47a");
  const feuillesHaie = textureFeuillage("#2f4f28", "#6f9148");
  const vaguelettes = textureVaguelettes();
  const interieur = textureInterieur();
  const nappe = textureNappe();
  const caustiques = textureCaustiques();
  // Partagés avec le nuanceur du fond du bassin : l'heure, et sa lueur propre le soir.
  const temps = { value: 0 };
  const fondLumineux = { value: 0 };
  const fondDuBassin = new THREE.MeshStandardMaterial({ map: carreauxFond, roughness: 0.4, emissiveMap: caustiques, emissive: "#c8f6ff", emissiveIntensity: 0 });
  // Deux passages du même dessin, à deux échelles, qui glissent l'un sur l'autre : la
  // lumière danse au lieu de défiler.
  fondDuBassin.onBeforeCompile = (nuanceur) => {
    nuanceur.uniforms.uTemps = temps;
    nuanceur.uniforms.uFondLumineux = fondLumineux;
    nuanceur.fragmentShader = nuanceur.fragmentShader.replace("void main() {", "uniform float uTemps;\nuniform float uFondLumineux;\nvoid main() {").replace(
      "#include <emissivemap_fragment>",
      `float caustique1 = texture2D( emissiveMap, vEmissiveMapUv * 0.55 + vec2( uTemps * 0.031, uTemps * 0.017 ) ).r;
      float caustique2 = texture2D( emissiveMap, vEmissiveMapUv * 0.43 + vec2( -uTemps * 0.022, uTemps * 0.027 ) ).r;
      totalEmissiveRadiance *= uFondLumineux + ( caustique1 + caustique2 ) * 0.6;`,
    );
  };
  fondDuBassin.customProgramCacheKey = () => "fond-du-bassin";
  const flaque = (couleur: string) =>
    new THREE.MeshBasicMaterial({
      map: nappe,
      color: couleur,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
    });
  return {
    textures: [pelouse, lames, bardage, carreaux, carreauxFond, pierre, parvis, plinthe, feuilles, feuillesClaires, feuillesHaie, vaguelettes, interieur, nappe, caustiques],
    vaguelettes,
    interieur,
    temps,
    fondLumineux,
    pelouse: new THREE.MeshStandardMaterial({ map: pelouse, roughness: 0.95 }),
    parvis: new THREE.MeshStandardMaterial({ map: parvis, roughness: 0.9 }),
    plinthe: new THREE.MeshStandardMaterial({ map: plinthe, roughness: 0.85 }),
    bois: new THREE.MeshStandardMaterial({ map: lames, roughness: 0.75 }),
    boisChant: new THREE.MeshStandardMaterial({ color: "#7a5434", roughness: 0.8 }),
    pierre: new THREE.MeshStandardMaterial({ map: pierre, roughness: 0.6 }),
    carreaux: new THREE.MeshStandardMaterial({ map: carreaux, roughness: 0.35, side: THREE.DoubleSide, emissive: "#0f6d8c", emissiveIntensity: 0 }),
    carreauxFond: fondDuBassin,
    // Une eau qui réfracte : on voit le fond à travers, bleui par la profondeur.
    eau: new THREE.MeshPhysicalMaterial({
      emissive: "#17a9dc",
      emissiveIntensity: 0,
      color: "#e6fbff",
      roughness: 0.04,
      metalness: 0,
      transmission: 1,
      thickness: 1.2,
      ior: 1.333,
      attenuationColor: new THREE.Color("#2aa7c2"),
      attenuationDistance: 1.6,
      normalMap: vaguelettes,
      normalScale: new THREE.Vector2(0.3, 0.3),
      envMapIntensity: 1.3,
    }),
    enduit: new THREE.MeshStandardMaterial({ color: "#eee8de", roughness: 0.92 }),
    // l'annexe en bardage de bois à claire-voie : les lames, tournées à la verticale
    enduitAnnexe: new THREE.MeshStandardMaterial({ map: bardage, roughness: 0.8 }),
    toit: new THREE.MeshStandardMaterial({ color: "#3d434b", roughness: 0.6, metalness: 0.2 }),
    gravier: new THREE.MeshStandardMaterial({ color: "#a39f97", roughness: 1 }),
    menuiserie: new THREE.MeshStandardMaterial({ color: "#2a2f35", roughness: 0.45, metalness: 0.4 }),
    vitre: new THREE.MeshStandardMaterial({ color: "#3d5560", roughness: 0.05, metalness: 0.35, envMapIntensity: 1.6 }),
    haie: new THREE.MeshStandardMaterial({ map: feuillesHaie, bumpMap: feuillesHaie, bumpScale: 2, roughness: 0.95 }),
    feuillage: new THREE.MeshStandardMaterial({ map: feuilles, bumpMap: feuilles, bumpScale: 1.5, roughness: 0.9 }),
    feuillageClair: new THREE.MeshStandardMaterial({ map: feuillesClaires, bumpMap: feuillesClaires, bumpScale: 1.5, roughness: 0.9 }),
    tronc: new THREE.MeshStandardMaterial({ color: "#6b4a33", roughness: 0.9 }),
    blanc: new THREE.MeshStandardMaterial({ color: "#f1eee8", roughness: 0.6 }),
    coussin: new THREE.MeshStandardMaterial({ color: "#F6C445", roughness: 0.85 }),
    toile: new THREE.MeshStandardMaterial({ color: "#efe7d8", roughness: 0.85, side: THREE.DoubleSide }),
    pot: new THREE.MeshStandardMaterial({ color: "#b8693f", roughness: 0.8 }),
    lanterne: new THREE.MeshStandardMaterial({ color: "#efe6d6", roughness: 0.4, emissive: "#ffc27a", emissiveIntensity: 0 }),
    nappeBornes: flaque("#ffb66e"),
    nappeFenetres: flaque("#ffb262"),
  };
}

/* ============================ les éléments ============================ */

function boite(l: number, h: number, p: number, m: THREE.Material, x: number, y: number, z: number) {
  const b = new THREE.Mesh(new THREE.BoxGeometry(l, h, p), m);
  b.position.set(x, y, z);
  b.castShadow = true;
  b.receiveShadow = true;
  return b;
}

/** Une vitre qui s'allume le soir à son heure (`seuil`, entre 0 et 1 du passage au soir). */
type Allumage = { mat: THREE.MeshStandardMaterial; seuil: number; force: number };

/** Un objet qui bouge au vent autour de son point d'attache. */
type Oscillant = { objet: THREE.Object3D; phase: number; ampli: number };

/** Ce qu'une maquette crée pour elle seule, et qu'il faut libérer avec elle. */
type Propre = { fenetres: Allumage[]; couronnes: Oscillant[]; matieres: THREE.Material[] };

/** Une flaque de lumière posée à plat. */
function nappe(l: number, p: number, mat: THREE.Material) {
  const n = new THREE.Mesh(new THREE.PlaneGeometry(l, p), mat);
  n.rotation.x = -Math.PI / 2;
  n.renderOrder = 3;
  return n;
}

/** La vitre d'une fenêtre : la sienne, pour s'allumer à son heure, sur l'intérieur peint. */
function vitre(m: Matieres, propre: Propre, seuil: number, force: number) {
  const mat = m.vitre.clone();
  mat.emissiveMap = m.interieur;
  mat.emissive.set("#ffffff");
  mat.emissiveIntensity = 0;
  propre.fenetres.push({ mat, seuil, force });
  propre.matieres.push(mat);
  return mat;
}

/** Une fenêtre : cadre fin, meneaux et vitre, face vers +z. */
function fenetre(l: number, h: number, m: Matieres, verre: THREE.Material, meneaux = 0) {
  const g = new THREE.Group();
  const e = 0.07;
  g.add(boite(l, e, 0.12, m.menuiserie, 0, h / 2 - e / 2, 0));
  g.add(boite(l, e, 0.12, m.menuiserie, 0, -h / 2 + e / 2, 0));
  g.add(boite(e, h, 0.12, m.menuiserie, -l / 2 + e / 2, 0, 0));
  g.add(boite(e, h, 0.12, m.menuiserie, l / 2 - e / 2, 0, 0));
  for (let i = 1; i <= meneaux; i++) g.add(boite(0.05, h, 0.1, m.menuiserie, -l / 2 + (l / (meneaux + 1)) * i, 0, 0));
  const plan = new THREE.Mesh(new THREE.PlaneGeometry(l - 2 * e, h - 2 * e), verre);
  plan.position.z = -0.02;
  g.add(plan);
  return g;
}

/** Un toit plat : gravier au centre, acrotère sombre tout autour. */
function toitPlat(l: number, p: number, m: Matieres, x: number, y: number, z: number) {
  const g = new THREE.Group();
  const e = 0.22;
  const h = 0.42;
  g.add(boite(l - 2 * e, 0.06, p - 2 * e, m.gravier, 0, 0.03, 0));
  g.add(boite(l + 0.04, h, e, m.toit, 0, h / 2, p / 2 - e / 2 + 0.02));
  g.add(boite(l + 0.04, h, e, m.toit, 0, h / 2, -p / 2 + e / 2 - 0.02));
  g.add(boite(e, h, p - 2 * e + 0.04, m.toit, l / 2 - e / 2 + 0.02, h / 2, 0));
  g.add(boite(e, h, p - 2 * e + 0.04, m.toit, -l / 2 + e / 2 - 0.02, h / 2, 0));
  g.position.set(x, y, z);
  return g;
}

/** La maison en deux volumes, construite face à +z puis tournée vers le jardin. Le
    soir, ses baies éclairent le sol devant elles, posé à la hauteur `sol`. */
function maison(rect: Rect, versX: number, m: Matieres, sol: number, propre: Propre) {
  const g = new THREE.Group();
  const facade = versX === 0 ? rect.largeur : rect.profondeur;
  const profondeur = 9;
  const lp = facade * 0.62;
  const la = facade - lp;
  const xp = -facade / 2 + lp / 2;
  const xa = facade / 2 - la / 2;
  const hp = 6.2;
  const ha = 3.3;
  g.add(boite(lp, hp, profondeur, m.enduit, xp, hp / 2, 0));
  g.add(boite(la, ha, profondeur - 1.2, m.enduitAnnexe, xa, ha / 2, -0.6));
  g.add(toitPlat(lp, profondeur, m, xp, hp, 0));
  g.add(toitPlat(la, profondeur - 1.2, m, xa, ha, -0.6));
  // Le séjour s'allume le premier, puis l'annexe, puis les chambres une à une.
  const baie = fenetre(lp * 0.78, 2.4, m, vitre(m, propre, 0.36, 1.05), 3);
  baie.position.set(xp, 1.3, profondeur / 2 + 0.06);
  g.add(baie);
  const flaqueBaie = nappe(lp * 0.9, 3.2, m.nappeFenetres);
  flaqueBaie.position.set(xp, sol, profondeur / 2 + 1.6);
  g.add(flaqueBaie);
  const nb = Math.max(2, Math.round(lp / 3.4));
  for (let i = 0; i < nb; i++) {
    const seuil = 0.5 + (((i * 7 + 3) % nb) / nb) * 0.3;
    const f = fenetre(1.25, 1.35, m, vitre(m, propre, seuil, i % 3 === 1 ? 0.6 : 0.9), 1);
    f.position.set(xp - lp / 2 + (lp / nb) * (i + 0.5), 4.35, profondeur / 2 + 0.06);
    g.add(f);
  }
  const baieAnnexe = fenetre(la * 0.72, 2.3, m, vitre(m, propre, 0.44, 0.95), 1);
  baieAnnexe.position.set(xa, 1.25, profondeur / 2 - 1.2 + 0.06);
  g.add(baieAnnexe);
  const flaqueAnnexe = nappe(la * 0.85, 2.8, m.nappeFenetres);
  flaqueAnnexe.position.set(xa, sol, profondeur / 2 - 1.2 + 1.4);
  g.add(flaqueAnnexe);
  g.position.set(rect.x, 0, rect.z);
  g.rotation.y = versX === 0 ? 0 : versX < 0 ? Math.PI / 2 : -Math.PI / 2;
  return g;
}

/** Un arbre : le tronc reste droit, la couronne oscille au vent depuis le haut du tronc. */
function arbre(x: number, z: number, taille: number, m: Matieres, propre: Propre) {
  const g = new THREE.Group();
  const haut = 1.9 * taille;
  const tronc = new THREE.Mesh(new THREE.CylinderGeometry(0.11 * taille, 0.16 * taille, haut, 7), m.tronc);
  tronc.position.y = haut / 2;
  tronc.castShadow = true;
  g.add(tronc);
  const couronne = new THREE.Group();
  couronne.position.y = haut;
  g.add(couronne);
  propre.couronnes.push({ objet: couronne, phase: x * 1.7 + z * 0.9, ampli: 0.026 + taille * 0.012 });
  const touffes: [number, number, number, number][] = [
    [0, 2.55, 0, 0.95],
    [0.75, 2.3, 0.3, 0.7],
    [-0.65, 2.35, -0.35, 0.72],
    [0.25, 3.2, -0.25, 0.68],
    [-0.35, 2.95, 0.5, 0.62],
    [0.55, 2.85, -0.6, 0.58],
    [-0.15, 2.05, 0.7, 0.55],
  ];
  touffes.forEach(([dx, dy, dz, r], i) => {
    const t = new THREE.Mesh(boule(r * taille, x + z + i * 2.3), i % 2 ? m.feuillageClair : m.feuillage);
    t.position.set(dx * taille, dy * taille - haut, dz * taille);
    t.castShadow = true;
    t.receiveShadow = true;
    couronne.add(t);
  });
  g.position.set(x, 0, z);
  g.rotation.y = (x * 7 + z * 3) % Math.PI;
  return g;
}

function transat(m: Matieres) {
  const g = new THREE.Group();
  g.add(boite(0.66, 0.1, 1.95, m.blanc, 0, 0.32, 0));
  for (const [x, z] of [[-0.28, -0.85], [0.28, -0.85], [-0.28, 0.85], [0.28, 0.85]]) g.add(boite(0.06, 0.3, 0.06, m.blanc, x, 0.15, z));
  g.add(boite(0.6, 0.07, 1.25, m.coussin, 0, 0.41, 0.3));
  const dossier = boite(0.6, 0.07, 0.72, m.coussin, 0, 0.62, -0.62);
  dossier.rotation.x = 0.6;
  g.add(dossier);
  return g;
}

function parasol(m: Matieres) {
  const g = new THREE.Group();
  const mat = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.4, 6), m.menuiserie);
  mat.position.y = 1.2;
  g.add(mat);
  const toileP = new THREE.Mesh(new THREE.ConeGeometry(1.35, 0.42, 8, 1, true), m.toile);
  toileP.position.y = 2.35;
  toileP.castShadow = true;
  g.add(toileP);
  g.add(boite(0.4, 0.08, 0.4, m.menuiserie, 0, 0.04, 0));
  return g;
}

function tableEtChaises(m: Matieres) {
  const g = new THREE.Group();
  g.add(boite(1.7, 0.06, 0.9, m.boisChant, 0, 0.75, 0));
  for (const [x, z] of [[-0.75, -0.35], [0.75, -0.35], [-0.75, 0.35], [0.75, 0.35]]) g.add(boite(0.06, 0.72, 0.06, m.menuiserie, x, 0.36, z));
  for (const [x, z, r] of [[-0.45, -0.75, 0], [0.45, -0.75, 0], [-0.45, 0.75, Math.PI], [0.45, 0.75, Math.PI]]) {
    const c = new THREE.Group();
    c.add(boite(0.46, 0.05, 0.46, m.blanc, 0, 0.45, 0));
    c.add(boite(0.46, 0.5, 0.05, m.blanc, 0, 0.72, -0.21));
    for (const [px, pz] of [[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]]) c.add(boite(0.04, 0.45, 0.04, m.menuiserie, px, 0.22, pz));
    c.position.set(x, 0, z);
    c.rotation.y = r;
    g.add(c);
  }
  return g;
}

/** Une borne de jardin : un fût sombre, une tête qui s'allume le soir, et sa flaque de
    lumière au pied. */
function borne(m: Matieres) {
  const g = new THREE.Group();
  const fut = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.6, 8), m.menuiserie);
  fut.position.y = 0.3;
  fut.castShadow = true;
  g.add(fut);
  const tete = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.075, 0.14, 10), m.lanterne);
  tete.position.y = 0.67;
  g.add(tete);
  const chapeau = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.03, 10), m.menuiserie);
  chapeau.position.y = 0.755;
  chapeau.castShadow = true;
  g.add(chapeau);
  const flaque = nappe(2.6, 2.6, m.nappeBornes);
  flaque.position.y = 0.02;
  g.add(flaque);
  return g;
}

function potEtBuisson(m: Matieres) {
  const g = new THREE.Group();
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.22, 0.5, 10), m.pot);
  pot.position.y = 0.25;
  pot.castShadow = true;
  g.add(pot);
  const b = new THREE.Mesh(boule(0.42, 3.1, 2), m.feuillage);
  b.position.y = 0.78;
  b.castShadow = true;
  g.add(b);
  return g;
}

/** Une haie taillée le long d'un segment : un volume net aux arêtes adoucies, et des
    feuilles peintes en relief. Un motif de feuillage = 1 m. */
function haie(x1: number, z1: number, x2: number, z2: number, m: Matieres) {
  const longueur = Math.hypot(x2 - x1, z2 - z1) + 0.8;
  const hauteur = 1.45;
  const geo = new RoundedBoxGeometry(longueur, hauteur, 0.8, 3, 0.16);
  const uv = geo.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * longueur, uv.getY(i) * hauteur);
  const h = new THREE.Mesh(geo, m.haie);
  h.position.set((x1 + x2) / 2, hauteur / 2, (z1 + z2) / 2);
  h.rotation.y = -Math.atan2(z2 - z1, x2 - x1);
  h.castShadow = true;
  h.receiveShadow = true;
  return h;
}

/* ============================ la maquette ============================ */

type Maquette = { groupe: THREE.Group; etendue: THREE.Box3; lumierePiscine: THREE.PointLight | null; regard: THREE.Vector3; propre: Propre };

function construireMaquette(j: Jardin, m: Matieres): Maquette {
  const groupe = new THREE.Group();
  const propre: Propre = { fenetres: [], couronnes: [], matieres: [] };
  const versX = j.maison.x === 0 ? 0 : Math.sign(j.maison.x);

  // Le socle : jardin + maison + une marge de parvis, posés sur une pierre sombre.
  const marge = 1.8;
  const minX = Math.min(-j.largeur / 2, j.maison.x - j.maison.largeur / 2) - marge;
  const maxX = Math.max(j.largeur / 2, j.maison.x + j.maison.largeur / 2) + marge;
  const minZ = Math.min(-j.profondeur / 2, j.maison.z - j.maison.profondeur / 2) - marge;
  const maxZ = Math.max(j.profondeur / 2, j.maison.z + j.maison.profondeur / 2) + marge;
  const socle: Rect = { x: (minX + maxX) / 2, z: (minZ + maxZ) / 2, largeur: maxX - minX, profondeur: maxZ - minZ };
  const epaisseur = 1.6;
  const b = j.bassin;
  const coin = 0.45;
  const trous = b ? [trouBassin(b, coin)] : [];

  groupe.add(surface(socle, trous, m.parvis, 0, 2));
  const faces: [number, number, number, number][] = [
    [socle.x, maxZ, socle.largeur, 0],
    [socle.x, minZ, socle.largeur, Math.PI],
    [maxX, socle.z, socle.profondeur, Math.PI / 2],
    [minX, socle.z, socle.profondeur, -Math.PI / 2],
  ];
  for (const [x, z, l, r] of faces) {
    const geo = new THREE.PlaneGeometry(l, epaisseur);
    const uv = geo.attributes.uv as THREE.BufferAttribute;
    for (let i = 0; i < uv.count; i++) uv.setXY(i, (uv.getX(i) * l) / 3, uv.getY(i) * 0.9);
    const face = new THREE.Mesh(geo, m.plinthe);
    face.position.set(x, -epaisseur / 2, z);
    face.rotation.y = r;
    groupe.add(face);
  }

  // La pelouse, percée du bassin, puis la haie sur les trois côtés libres.
  groupe.add(surface({ x: 0, z: 0, largeur: j.largeur, profondeur: j.profondeur }, trous, m.pelouse, 0.012, 4));
  const hx = j.largeur / 2 + 0.35;
  const hz = j.profondeur / 2 + 0.35;
  if (versX !== 0) groupe.add(haie(-hx, -hz, hx, -hz, m));
  groupe.add(haie(-hx, hz, hx, hz, m));
  if (versX !== -1) groupe.add(haie(-hx, -hz, -hx, hz, m));
  if (versX !== 1) groupe.add(haie(hx, -hz, hx, hz, m));

  // La maison et sa terrasse en bois, lames parallèles à la façade.
  groupe.add(maison(j.maison, versX, m, j.terrasse ? 0.135 : 0.022, propre));
  if (j.terrasse) {
    const r = j.terrasse;
    groupe.add(boite(r.largeur, 0.12, r.profondeur, m.boisChant, r.x, 0.06, r.z));
    groupe.add(surface(r, [], m.bois, 0.122, 1, versX !== 0));
    const table = tableEtChaises(m);
    table.position.set(r.x, 0.12, r.z);
    if (versX !== 0) table.rotation.y = Math.PI / 2;
    groupe.add(table);
    const pot = potEtBuisson(m);
    pot.position.set(r.x + (versX === 0 ? r.largeur / 2 - 0.5 : 0), 0.12, r.z + (versX === 0 ? 0 : r.profondeur / 2 - 0.5));
    groupe.add(pot);
  }

  // Ce qui occupe déjà le sol du jardin : rien ne se pose dessus.
  const occupe: Rect[] = [];
  if (j.terrasse) occupe.push(j.terrasse);
  if (b) occupe.push({ ...b, largeur: b.largeur + 0.9, profondeur: b.profondeur + 0.9 });
  const libre = (x: number, z: number, dl: number, dp: number) =>
    Math.abs(x) + dl <= j.largeur / 2 - 0.3 &&
    Math.abs(z) + dp <= j.profondeur / 2 - 0.3 &&
    occupe.every((r) => Math.abs(x - r.x) >= r.largeur / 2 + dl || Math.abs(z - r.z) >= r.profondeur / 2 + dp);

  // Le bassin : parois carrelées, fond, marches, margelles biseautées, eau.
  let lumierePiscine: THREE.PointLight | null = null;
  if (b) {
    const bassin = new THREE.Group();
    const prof = 1.45;
    const murs = new THREE.Mesh(parois(b.largeur, b.profondeur, coin, prof), m.carreaux);
    murs.receiveShadow = true;
    bassin.add(murs);
    const fondGeo = new THREE.ShapeGeometry(contourArrondi(b.largeur, b.profondeur, coin), 8);
    fondGeo.rotateX(-Math.PI / 2);
    const uvf = fondGeo.attributes.uv as THREE.BufferAttribute;
    const pf = fondGeo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < uvf.count; i++) uvf.setXY(i, pf.getX(i), pf.getZ(i));
    const fond = new THREE.Mesh(fondGeo, m.carreauxFond);
    fond.position.y = -prof;
    fond.receiveShadow = true;
    bassin.add(fond);
    const long = b.largeur >= b.profondeur;
    const court = long ? b.profondeur : b.largeur;
    const lm = Math.min(1.8, court - 0.6);
    for (let i = 0; i < 3; i++) {
      const hauteur = prof - 0.32 * (i + 1);
      const pas = 0.38;
      const decal = (long ? b.largeur : b.profondeur) / 2 - pas * (i + 0.5);
      bassin.add(boite(long ? pas : lm, hauteur, long ? lm : pas, m.carreaux, long ? -decal : 0, -prof + hauteur / 2, long ? 0 : -decal));
    }
    const contour = contourArrondi(b.largeur + 0.64, b.profondeur + 0.64, coin + 0.32);
    contour.holes.push(contourArrondi(b.largeur, b.profondeur, coin, true));
    const geoM = new THREE.ExtrudeGeometry(contour, { depth: 0.06, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2 });
    geoM.rotateX(-Math.PI / 2);
    const marg = new THREE.Mesh(geoM, m.pierre);
    marg.position.y = 0.03;
    marg.castShadow = true;
    marg.receiveShadow = true;
    bassin.add(marg);
    const geoEau = new THREE.ShapeGeometry(contourArrondi(b.largeur, b.profondeur, coin), 8);
    geoEau.rotateX(-Math.PI / 2);
    const uve = geoEau.attributes.uv as THREE.BufferAttribute;
    const pe = geoEau.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < uve.count; i++) uve.setXY(i, pe.getX(i) / 2.5, pe.getZ(i) / 2.5);
    const eau = new THREE.Mesh(geoEau, m.eau);
    eau.position.y = -0.12;
    eau.renderOrder = 2;
    bassin.add(eau);
    lumierePiscine = new THREE.PointLight("#5fd6ff", 0, Math.max(b.largeur, b.profondeur) * 1.6, 1.6);
    lumierePiscine.position.set(0, -0.5, 0);
    bassin.add(lumierePiscine);
    bassin.position.set(b.x, 0, b.z);
    groupe.add(bassin);

    // Deux transats et un parasol sur le premier côté du bassin où ils tiennent
    // dans le jardin sans toucher ni la terrasse ni la margelle ; sinon, rien.
    // côté opposé à la maison d'abord : les transats regardent l'eau et la caméra les voit
    const cotes: [number, number][] = versX === 0 ? [[0, 1], [1, 0], [-1, 0]] : [[0, 1], [-versX, 0], [0, -1]];
    for (const [nx, nz] of cotes) {
      const ecart = (nz ? b.profondeur : b.largeur) / 2 + 1.45;
      const cx = b.x + nx * ecart;
      const cz = b.z + nz * ecart;
      const le = nz ? [-0.9, 0.9] : [0, 0];
      const lz = nz ? [0, 0] : [-0.9, 0.9];
      const places = [0, 1].map((k) => ({ x: cx + le[k], z: cz + lz[k] }));
      const parasolEn = { x: cx + (nz ? 1.95 : 0.25 * nx), z: cz + (nz ? 0.25 * nz : 1.95) };
      const transatsTiennent = places.every((p) => libre(p.x, p.z, nz ? 0.35 : 1, nz ? 1 : 0.35));
      if (!transatsTiennent) continue;
      for (const p of places) {
        const t = transat(m);
        t.position.set(p.x, 0, p.z);
        // les pieds vers l'eau
        t.rotation.y = Math.atan2(-nx, -nz);
        groupe.add(t);
        occupe.push({ x: p.x, z: p.z, largeur: nz ? 0.7 : 2, profondeur: nz ? 2 : 0.7 });
      }
      if (libre(parasolEn.x, parasolEn.z, 0.25, 0.25)) {
        const p = parasol(m);
        p.position.set(parasolEn.x, 0, parasolEn.z);
        groupe.add(p);
        occupe.push({ x: parasolEn.x, z: parasolEn.z, largeur: 0.5, profondeur: 0.5 });
      }
      break;
    }
  }

  // Des arbres dans les coins opposés à la maison, s'ils ne gênent pas le bassin,
  // et un arbre hors du jardin pour l'échelle.
  const coins: [number, number][] =
    versX === 0
      ? [[-j.largeur / 2 + 1.3, j.profondeur / 2 - 1.3], [j.largeur / 2 - 1.3, j.profondeur / 2 - 1.3]]
      : [[-versX * (j.largeur / 2 - 1.3), -j.profondeur / 2 + 1.3], [-versX * (j.largeur / 2 - 1.3), j.profondeur / 2 - 1.3]];
  coins.forEach(([x, z], i) => {
    const loin = !b || Math.abs(x - b.x) > b.largeur / 2 + 1.6 || Math.abs(z - b.z) > b.profondeur / 2 + 1.6;
    if (!loin) return;
    groupe.add(arbre(x, z, i ? 0.95 : 1.15, m, propre));
    occupe.push({ x, z, largeur: 0.6, profondeur: 0.6 });
  });
  groupe.add(arbre(maxX - 0.9, minZ + 0.9, 1.3, m, propre));

  // Les bornes du soir : aux deux coins de la terrasse côté jardin, puis aux coins du
  // bassin, là où elles ne gênent rien.
  const bornes: [number, number, number][] = [];
  if (j.terrasse) {
    const r = j.terrasse;
    const dx = versX === 0 ? 0 : -versX;
    const dz = versX === 0 ? 1 : 0;
    const avant = (dz ? r.profondeur : r.largeur) / 2 - 0.3;
    const cote = (dz ? r.largeur : r.profondeur) / 2 - 0.3;
    for (const s of [-1, 1]) bornes.push([r.x + dx * avant + dz * s * cote, r.z + dz * avant + Math.abs(dx) * s * cote, 0.122]);
  }
  if (b)
    for (const [sx, sz] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) {
      const x = b.x + sx * (b.largeur / 2 + 0.75);
      const z = b.z + sz * (b.profondeur / 2 + 0.75);
      if (libre(x, z, 0.2, 0.2)) bornes.push([x, z, 0.012]);
    }
  for (const [x, z, y] of bornes) {
    const bo = borne(m);
    bo.position.set(x, y, z);
    groupe.add(bo);
  }

  // On regarde la façade côté jardin, de trois quarts.
  const face = versX === 0 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(-versX, 0, 0);
  const regard = face
    .clone()
    .multiplyScalar(0.64)
    .add(new THREE.Vector3(face.z, 0, Math.abs(face.x)).multiplyScalar(0.5))
    .setY(0.58)
    .normalize();

  return {
    groupe,
    etendue: new THREE.Box3(new THREE.Vector3(minX, -epaisseur, minZ), new THREE.Vector3(maxX, 6.5, maxZ)),
    lumierePiscine,
    regard,
    propre,
  };
}

function liberer(q: Maquette) {
  q.groupe.traverse((o) => {
    if (o instanceof THREE.Mesh) o.geometry.dispose();
  });
  q.propre.matieres.forEach((mat) => mat.dispose());
}

/* ============================ l'ambiance ============================ */

type Lumieres = {
  ciel: THREE.HemisphereLight;
  cle: THREE.DirectionalLight;
  contre: THREE.DirectionalLight;
  ambiante: THREE.AmbientLight;
  terrasse: THREE.PointLight;
};

type Moteur = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controles: OrbitControls;
  matieres: Matieres;
  lumieres: Lumieres;
  halo: UnrealBloomPass | null;
  ciel: ReturnType<typeof fondCiel>;
  maquette: Maquette | null;
  /** Où en est la lumière : 0 le jour, 1 le soir ; `cible` est l'ambiance demandée. */
  t: number;
  cible: number;
  /** Le point d'où vient le soleil, à sa hauteur de midi ; il descend en passant au soir. */
  soleil: THREE.Vector3;
  /** Le visiteur limite les animations : rien ne bouge, la lumière change d'un coup. */
  reduit: boolean;
  redessiner: () => void;
};

const TEINTES = {
  cielJour: new THREE.Color("#dfe8ff"),
  cielSoir: new THREE.Color("#5266a8"),
  solJour: new THREE.Color("#3a3f4f"),
  solSoir: new THREE.Color("#0c1020"),
  soleil: new THREE.Color("#fff1de"),
  couchant: new THREE.Color("#ffad66"),
  lune: new THREE.Color("#9fb2ff"),
  fondJour: new THREE.Color("#c8f6ff"),
  fondSoir: new THREE.Color("#1a8fb5"),
};

/** La lumière à l'instant t du passage au soir (0 : jour, 1 : soir). */
function appliquerAmbiance(m: Moteur, t: number) {
  const e = lisse(0, 1, t);
  const lerp = THREE.MathUtils.lerp;
  const { ciel, cle, contre, ambiante, terrasse } = m.lumieres;
  const mt = m.matieres;
  m.ciel.peindre(t);
  m.scene.environmentIntensity = lerp(0.45, 0.12, e);
  ambiante.intensity = 0.04 * e;
  ciel.color.lerpColors(TEINTES.cielJour, TEINTES.cielSoir, e);
  ciel.groundColor.lerpColors(TEINTES.solJour, TEINTES.solSoir, e);
  ciel.intensity = lerp(0.5, 0.3, e);
  contre.intensity = lerp(0.45, 0.2, e);
  // Le soleil descend et rougit jusqu'à mi-chemin, puis la lune prend le relais.
  const avant = t < 0.5;
  const k = avant ? lisse(0, 0.5, t) : lisse(0.5, 1, t);
  if (avant) cle.color.lerpColors(TEINTES.soleil, TEINTES.couchant, k);
  else cle.color.lerpColors(TEINTES.couchant, TEINTES.lune, k);
  cle.intensity = avant ? lerp(2.8, 1.9, k) : lerp(1.9, 0.35, k);
  cle.position.set(m.soleil.x, avant ? lerp(m.soleil.y, 7, k) : lerp(7, m.soleil.y, k), m.soleil.z);
  terrasse.intensity = 3 * lisse(0.45, 0.8, t);
  // Chaque fenêtre à son heure, puis la piscine, puis les bornes.
  for (const f of m.maquette?.propre.fenetres ?? []) f.mat.emissiveIntensity = f.force * lisse(f.seuil, f.seuil + 0.12, t);
  const baies = lisse(0.4, 0.75, t);
  mt.nappeFenetres.opacity = 0.6 * baies;
  mt.nappeFenetres.visible = baies > 0;
  const eau = lisse(0.4, 0.9, t);
  mt.eau.emissiveIntensity = 0.6 * eau;
  mt.carreaux.emissiveIntensity = 0.6 * eau;
  // Le fond garde ses reflets dansants le soir, sur sa propre lueur bleue.
  mt.carreauxFond.emissive.lerpColors(TEINTES.fondJour, TEINTES.fondSoir, eau);
  mt.carreauxFond.emissiveIntensity = lerp(0.65, 0.75, eau);
  mt.fondLumineux.value = 0.7 * eau;
  if (m.maquette?.lumierePiscine) m.maquette.lumierePiscine.intensity = 10 * eau;
  const lampes = lisse(0.55, 0.8, t);
  mt.lanterne.emissiveIntensity = 2.4 * lampes;
  mt.nappeBornes.opacity = 0.75 * lampes;
  mt.nappeBornes.visible = lampes > 0;
  // Le halo ne sert que le soir, autour de ce qui s'allume ; le jour il voilerait tout.
  if (m.halo) {
    m.halo.enabled = t > 0.25;
    m.halo.strength = 0.55 * lisse(0.25, 1, t);
  }
}

/* ============================ le composant ============================ */

export default function Jardin3D({ jardin, ambiance, onIndisponible }: Props) {
  const conteneur = useRef<HTMLDivElement>(null);
  const moteur = useRef<Moteur | null>(null);

  // Le moteur : créé une fois, détruit au départ.
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
    rendu.shadowMap.type = THREE.PCFSoftShadowMap;
    rendu.outputColorSpace = THREE.SRGBColorSpace;
    rendu.toneMapping = THREE.NeutralToneMapping;
    rendu.toneMappingExposure = 1;
    el.appendChild(rendu.domElement);
    Object.assign(rendu.domElement.style, { display: "block", width: "100%", height: "100%" });

    const scene = new THREE.Scene();
    const cielDuFond = fondCiel();
    scene.background = cielDuFond.texture;
    const pmrem = new THREE.PMREMGenerator(rendu);
    const environnement = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = environnement;

    const ambiante = new THREE.AmbientLight("#ffffff", 0.25);
    const ciel = new THREE.HemisphereLight("#e3ebff", "#2b3556", 0.85);
    const cle = new THREE.DirectionalLight("#fff2e2", 3.2);
    cle.castShadow = true;
    cle.shadow.mapSize.set(ordinateur ? 2048 : 1024, ordinateur ? 2048 : 1024);
    cle.shadow.bias = -0.0004;
    cle.shadow.normalBias = 0.03;
    cle.shadow.radius = 4;
    const contre = new THREE.DirectionalLight("#9db4ff", 0.8);
    contre.position.set(18, 14, -20);
    const terrasse = new THREE.PointLight("#ffbf73", 0, 14, 1.8);
    scene.add(ambiante, ciel, cle, cle.target, contre, terrasse);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.3, 400);
    const controles = new OrbitControls(camera, rendu.domElement);
    controles.enableDamping = true;
    controles.dampingFactor = 0.08;
    controles.enablePan = false;
    controles.minPolarAngle = 0.2;
    controles.maxPolarAngle = Math.PI / 2.15;
    controles.autoRotateSpeed = 0.55;

    // Sur ordinateur seulement : occlusion ambiante et halo. Un téléphone garde la
    // lumière, les ombres et les reflets, sans post-traitement.
    let composer: EffectComposer | null = null;
    let halo: UnrealBloomPass | null = null;
    if (ordinateur) {
      composer = new EffectComposer(rendu);
      composer.addPass(new RenderPass(scene, camera));
      const ao = new GTAOPass(scene, camera, 512, 512);
      ao.blendIntensity = 0.85;
      composer.addPass(ao);
      halo = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.55, 0.45, 0.7);
      composer.addPass(halo);
      composer.addPass(new OutputPass());
    }

    let aDessiner = true;
    const redessiner = () => {
      aDessiner = true;
    };
    controles.addEventListener("change", redessiner);

    // Rotation lente au repos, reprise quatre secondes après la dernière main.
    let repos = 0;
    controles.autoRotate = !reduit;
    controles.addEventListener("start", () => {
      controles.autoRotate = false;
      clearTimeout(repos);
    });
    controles.addEventListener("end", () => {
      if (reduit) return;
      repos = window.setTimeout(() => (controles.autoRotate = true), 4000);
    });

    const matieres = creerMatieres();
    let image = 0;
    let visible = true;
    let precedent = 0;
    let horloge = 0;
    const boucle = (maintenant: number) => {
      image = requestAnimationFrame(boucle);
      // une trentaine d'images par seconde suffisent à l'eau et à la rotation
      if (maintenant - precedent < 32) return;
      const dt = Math.min(0.1, (maintenant - precedent) / 1000);
      precedent = maintenant;
      let bouge = controles.update(dt);
      const m = moteur.current;
      // Le passage d'une ambiance à l'autre prend un peu moins de deux secondes.
      if (m && m.t !== m.cible) {
        const pas = dt / 1.8;
        m.t = m.cible > m.t ? Math.min(m.cible, m.t + pas) : Math.max(m.cible, m.t - pas);
        appliquerAmbiance(m, m.t);
        bouge = true;
      }
      if (!reduit) {
        horloge += dt;
        matieres.vaguelettes.offset.x += dt * 0.025;
        matieres.vaguelettes.offset.y += dt * 0.012;
        matieres.temps.value = horloge;
        for (const c of m?.maquette?.propre.couronnes ?? []) {
          c.objet.rotation.z = Math.sin(horloge * 1.3 + c.phase) * c.ampli;
          c.objet.rotation.x = Math.sin(horloge * 0.9 + c.phase * 1.7) * c.ampli * 0.6;
        }
        bouge = true;
      }
      if (bouge || aDessiner) {
        if (composer) composer.render();
        else rendu.render(scene, camera);
        aDessiner = false;
      }
    };
    const relancer = () => {
      if (!image && visible) image = requestAnimationFrame(boucle);
    };
    const observateur = new IntersectionObserver(([entree]) => {
      visible = entree.isIntersecting;
      if (visible) relancer();
      else {
        cancelAnimationFrame(image);
        image = 0;
      }
    });
    observateur.observe(el);

    const taille = new ResizeObserver(() => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      rendu.setSize(width, height, false);
      composer?.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      redessiner();
    });
    taille.observe(el);

    moteur.current = {
      scene,
      camera,
      controles,
      matieres,
      lumieres: { ciel, cle, contre, ambiante, terrasse },
      halo,
      ciel: cielDuFond,
      maquette: null,
      t: 0,
      cible: 0,
      soleil: new THREE.Vector3(0, 15, 19),
      reduit,
      redessiner,
    };
    relancer();

    return () => {
      cancelAnimationFrame(image);
      clearTimeout(repos);
      observateur.disconnect();
      taille.disconnect();
      controles.dispose();
      const m = moteur.current;
      if (m?.maquette) liberer(m.maquette);
      matieres.textures.forEach((t) => t.dispose());
      cielDuFond.texture.dispose();
      Object.values(matieres).forEach((v) => v instanceof THREE.Material && v.dispose());
      composer?.passes.forEach((p) => p.dispose());
      composer?.dispose();
      environnement.dispose();
      pmrem.dispose();
      rendu.dispose();
      rendu.domElement.remove();
      moteur.current = null;
    };
  }, [onIndisponible]);

  // La maquette : reconstruite à chaque réglage, la caméra recadrée sur sa taille.
  useEffect(() => {
    const m = moteur.current;
    if (!m) return;
    if (m.maquette) {
      m.scene.remove(m.maquette.groupe);
      liberer(m.maquette);
    }
    m.maquette = construireMaquette(jardin, m.matieres);
    m.scene.add(m.maquette.groupe);

    const centre = m.maquette.etendue.getCenter(new THREE.Vector3());
    const dim = m.maquette.etendue.getSize(new THREE.Vector3());
    const etendue = Math.max(dim.x, dim.z);
    // La maquette entière tient dans le champ, sous n'importe quel angle de rotation.
    const rayon = dim.length() / 2;
    const distance = (rayon / Math.sin(THREE.MathUtils.degToRad(m.camera.fov / 2))) * 0.74;
    const direction = m.maquette.regard;
    m.camera.position.set(centre.x, 0.8, centre.z).addScaledVector(direction, distance);
    m.controles.target.set(centre.x, 0.8, centre.z);
    m.controles.minDistance = distance * 0.5;
    m.controles.maxDistance = distance * 1.6;
    const ombre = m.lumieres.cle.shadow.camera;
    const demi = etendue * 0.75;
    ombre.left = ombre.bottom = -demi;
    ombre.right = ombre.top = demi;
    ombre.near = 1;
    ombre.far = 120;
    ombre.updateProjectionMatrix();
    // le soleil vient de la gauche du regard, un peu de face : les ombres tombent
    // vers la droite, là où la caméra les voit
    const soleil = new THREE.Vector3(direction.x, 0, direction.z).normalize().applyAxisAngle(new THREE.Vector3(0, 1, 0), THREE.MathUtils.degToRad(-100));
    m.soleil.set(centre.x + soleil.x * 19, 15, centre.z + soleil.z * 19);
    m.lumieres.contre.position.set(centre.x - direction.x * 20, 14, centre.z - direction.z * 20);
    m.lumieres.cle.target.position.set(centre.x, 0, centre.z);
    if (jardin.terrasse) m.lumieres.terrasse.position.set(jardin.terrasse.x, 2.2, jardin.terrasse.z);
    appliquerAmbiance(m, m.t);
    m.controles.update();
    m.redessiner();
  }, [jardin]);

  // Jour ou soir : la boucle joue le passage ; sans animations, il se fait d'un coup.
  useEffect(() => {
    const m = moteur.current;
    if (!m) return;
    m.cible = ambiance === "soir" ? 1 : 0;
    if (m.reduit) {
      m.t = m.cible;
      appliquerAmbiance(m, m.t);
    }
    m.redessiner();
  }, [ambiance]);

  return <div ref={conteneur} className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y" />;
}
