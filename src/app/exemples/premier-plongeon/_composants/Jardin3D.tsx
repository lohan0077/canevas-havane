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
import type { Jardin, Rect } from "./jardin-geometrie";

// Le jardin du visiteur en maquette d'architecte, d'après le rendu du configurateur de
// Kéo (vue « maquette ») : un socle avec sa coupe de terre, la maison en deux volumes,
// un bassin creusé et carrelé dont l'eau bouge, la vie autour (haie, arbres, transats,
// parasol, table). Lumière de studio, reflets d'environnement, et sur ordinateur
// occlusion ambiante et halo. Deux ambiances : le jour, et le soir où la piscine
// s'éclaire de l'intérieur.
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

/** Pelouse tondue : bandes alternées et grain d'herbe. Un motif = 4 m. */
const texturePelouse = () =>
  toile(512, 512, (ctx) => {
    ctx.fillStyle = "#5b9447";
    ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = i % 2 ? "rgba(255,255,210,0.07)" : "rgba(0,40,0,0.06)";
      ctx.fillRect(i * 128, 0, 128, 512);
    }
    pointille(ctx, 512, 512, 9000, () => (Math.random() < 0.5 ? "rgba(20,60,15,0.18)" : "rgba(190,230,140,0.14)"), () => 0.6 + Math.random() * 1.4);
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

/** Carrelage de bassin : carreaux de 12,5 cm, joints clairs. Un motif = 1 m. */
const textureCarreaux = (fond: string, joint: string) =>
  toile(256, 256, (ctx) => {
    ctx.fillStyle = joint;
    ctx.fillRect(0, 0, 256, 256);
    for (let x = 0; x < 8; x++)
      for (let y = 0; y < 8; y++) {
        ctx.fillStyle = fond;
        ctx.globalAlpha = 0.9 + Math.random() * 0.1;
        ctx.fillRect(x * 32 + 1.5, y * 32 + 1.5, 29, 29);
      }
    ctx.globalAlpha = 1;
  });

/** Pierre claire des margelles et du parvis, en dalles. Un motif = 2 m. */
const texturePierre = (base: string) =>
  toile(256, 256, (ctx) => {
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, 256, 256);
    pointille(ctx, 256, 256, 2600, () => (Math.random() < 0.5 ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.07)"), () => 0.5 + Math.random() * 1.6);
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

/** Coupe de terre du socle : strates horizontales. */
const textureTerre = () =>
  toile(256, 256, (ctx) => {
    ["#4a3b2e", "#5b4837", "#6a5440", "#56442f"].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.fillRect(0, i * 64, 256, 64);
    });
    pointille(ctx, 256, 256, 1600, () => `rgba(${Math.random() < 0.5 ? "0,0,0" : "255,240,220"},0.08)`, () => 0.6 + Math.random() * 2);
  });

/** Le fond de studio : un halo plus clair derrière la maquette. */
const textureFond = (centre: string, bord: string) =>
  toile(512, 512, (ctx) => {
    const d = ctx.createRadialGradient(256, 230, 20, 256, 256, 380);
    d.addColorStop(0, centre);
    d.addColorStop(1, bord);
    ctx.fillStyle = d;
    ctx.fillRect(0, 0, 512, 512);
  });

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
  const carreaux = textureCarreaux("#7fcde2", "#d4eef5");
  const carreauxFond = textureCarreaux("#4fb2cf", "#a9dcea");
  const pierre = texturePierre("#ece5d8");
  const parvis = texturePierre("#cfc8bb");
  const terre = textureTerre();
  const vaguelettes = textureVaguelettes();
  return {
    textures: [pelouse, lames, carreaux, carreauxFond, pierre, parvis, terre, vaguelettes],
    vaguelettes,
    pelouse: new THREE.MeshStandardMaterial({ map: pelouse, roughness: 0.95 }),
    parvis: new THREE.MeshStandardMaterial({ map: parvis, roughness: 0.9 }),
    terre: new THREE.MeshStandardMaterial({ map: terre, roughness: 1 }),
    bois: new THREE.MeshStandardMaterial({ map: lames, roughness: 0.75 }),
    boisChant: new THREE.MeshStandardMaterial({ color: "#7a5434", roughness: 0.8 }),
    pierre: new THREE.MeshStandardMaterial({ map: pierre, roughness: 0.6 }),
    carreaux: new THREE.MeshStandardMaterial({ map: carreaux, roughness: 0.35, side: THREE.DoubleSide }),
    carreauxFond: new THREE.MeshStandardMaterial({ map: carreauxFond, roughness: 0.4 }),
    eau: new THREE.MeshStandardMaterial({
      color: "#1b9cc4",
      roughness: 0.03,
      metalness: 0,
      transparent: true,
      opacity: 0.62,
      normalMap: vaguelettes,
      normalScale: new THREE.Vector2(0.25, 0.25),
      envMapIntensity: 1.4,
    }),
    enduit: new THREE.MeshStandardMaterial({ color: "#eee8de", roughness: 0.92 }),
    enduitAnnexe: new THREE.MeshStandardMaterial({ color: "#d9d1c4", roughness: 0.92 }),
    toit: new THREE.MeshStandardMaterial({ color: "#3d434b", roughness: 0.6, metalness: 0.2 }),
    gravier: new THREE.MeshStandardMaterial({ color: "#a39f97", roughness: 1 }),
    menuiserie: new THREE.MeshStandardMaterial({ color: "#2a2f35", roughness: 0.45, metalness: 0.4 }),
    vitre: new THREE.MeshStandardMaterial({ color: "#24384a", roughness: 0.04, metalness: 0.7, envMapIntensity: 1.6 }),
    haie: new THREE.MeshStandardMaterial({ color: "#3d6b37", roughness: 0.95 }),
    feuillage: new THREE.MeshStandardMaterial({ color: "#4a7d40", roughness: 0.9 }),
    feuillageClair: new THREE.MeshStandardMaterial({ color: "#5f9149", roughness: 0.9 }),
    tronc: new THREE.MeshStandardMaterial({ color: "#6b4a33", roughness: 0.9 }),
    blanc: new THREE.MeshStandardMaterial({ color: "#f1eee8", roughness: 0.6 }),
    coussin: new THREE.MeshStandardMaterial({ color: "#e8d1cb", roughness: 0.85 }),
    toile: new THREE.MeshStandardMaterial({ color: "#efe7d8", roughness: 0.85, side: THREE.DoubleSide }),
    pot: new THREE.MeshStandardMaterial({ color: "#b8693f", roughness: 0.8 }),
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

/** Une fenêtre : cadre fin, meneaux et vitre, face vers +z. */
function fenetre(l: number, h: number, m: Matieres, meneaux = 0) {
  const g = new THREE.Group();
  const e = 0.07;
  g.add(boite(l, e, 0.12, m.menuiserie, 0, h / 2 - e / 2, 0));
  g.add(boite(l, e, 0.12, m.menuiserie, 0, -h / 2 + e / 2, 0));
  g.add(boite(e, h, 0.12, m.menuiserie, -l / 2 + e / 2, 0, 0));
  g.add(boite(e, h, 0.12, m.menuiserie, l / 2 - e / 2, 0, 0));
  for (let i = 1; i <= meneaux; i++) g.add(boite(0.05, h, 0.1, m.menuiserie, -l / 2 + (l / (meneaux + 1)) * i, 0, 0));
  const vitre = new THREE.Mesh(new THREE.PlaneGeometry(l - 2 * e, h - 2 * e), m.vitre);
  vitre.position.z = -0.02;
  g.add(vitre);
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

/** La maison en deux volumes, construite face à +z puis tournée vers le jardin. */
function maison(rect: Rect, versX: number, m: Matieres) {
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
  const baie = fenetre(lp * 0.78, 2.4, m, 3);
  baie.position.set(xp, 1.3, profondeur / 2 + 0.06);
  g.add(baie);
  const nb = Math.max(2, Math.round(lp / 3.4));
  for (let i = 0; i < nb; i++) {
    const f = fenetre(1.25, 1.35, m, 1);
    f.position.set(xp - lp / 2 + (lp / nb) * (i + 0.5), 4.35, profondeur / 2 + 0.06);
    g.add(f);
  }
  const baieAnnexe = fenetre(la * 0.72, 2.3, m, 1);
  baieAnnexe.position.set(xa, 1.25, profondeur / 2 - 1.2 + 0.06);
  g.add(baieAnnexe);
  g.position.set(rect.x, 0, rect.z);
  g.rotation.y = versX === 0 ? 0 : versX < 0 ? Math.PI / 2 : -Math.PI / 2;
  return g;
}

function arbre(x: number, z: number, taille: number, m: Matieres) {
  const g = new THREE.Group();
  const tronc = new THREE.Mesh(new THREE.CylinderGeometry(0.11 * taille, 0.16 * taille, 1.9 * taille, 7), m.tronc);
  tronc.position.y = 0.95 * taille;
  tronc.castShadow = true;
  g.add(tronc);
  const touffes: [number, number, number, number][] = [
    [0, 2.6, 0, 1.25],
    [0.7, 2.25, 0.3, 0.9],
    [-0.6, 2.35, -0.35, 0.95],
    [0.1, 3.25, -0.2, 0.85],
  ];
  touffes.forEach(([dx, dy, dz, r], i) => {
    const t = new THREE.Mesh(boule(r * taille, x + z + i * 2.3), i % 2 ? m.feuillageClair : m.feuillage);
    t.position.set(dx * taille, dy * taille, dz * taille);
    t.castShadow = true;
    t.receiveShadow = true;
    g.add(t);
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

/** Une rangée de haie le long d'un segment, en boules irrégulières. */
function haie(x1: number, z1: number, x2: number, z2: number, m: Matieres) {
  const longueur = Math.hypot(x2 - x1, z2 - z1);
  const n = Math.max(2, Math.round(longueur / 0.42));
  const inst = new THREE.InstancedMesh(boule(0.58, x1 + z2, 2), m.haie, n);
  const mat = new THREE.Matrix4();
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const s = 0.85 + ((i * 37) % 10) / 28;
    mat.compose(
      new THREE.Vector3(x1 + (x2 - x1) * t, 0.62 * s, z1 + (z2 - z1) * t),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(i * 0.7, i * 1.3, i * 0.4)),
      new THREE.Vector3(s, s * 1.35, s),
    );
    inst.setMatrixAt(i, mat);
  }
  inst.castShadow = true;
  inst.receiveShadow = true;
  return inst;
}

/* ============================ la maquette ============================ */

type Maquette = { groupe: THREE.Group; etendue: THREE.Box3; lumierePiscine: THREE.PointLight | null; regard: THREE.Vector3 };

function construireMaquette(j: Jardin, m: Matieres): Maquette {
  const groupe = new THREE.Group();
  const versX = j.maison.x === 0 ? 0 : Math.sign(j.maison.x);

  // Le socle : jardin + maison + une marge de parvis, et sa coupe de terre.
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
    const face = new THREE.Mesh(geo, m.terre);
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
  groupe.add(maison(j.maison, versX, m));
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
    const occupe = [j.terrasse, { ...b, largeur: b.largeur + 0.9, profondeur: b.profondeur + 0.9 }].filter(Boolean) as Rect[];
    const libre = (x: number, z: number, dl: number, dp: number) =>
      Math.abs(x) + dl <= j.largeur / 2 - 0.3 &&
      Math.abs(z) + dp <= j.profondeur / 2 - 0.3 &&
      occupe.every((r) => Math.abs(x - r.x) >= r.largeur / 2 + dl || Math.abs(z - r.z) >= r.profondeur / 2 + dp);
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
      }
      if (libre(parasolEn.x, parasolEn.z, 0.25, 0.25)) {
        const p = parasol(m);
        p.position.set(parasolEn.x, 0, parasolEn.z);
        groupe.add(p);
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
    if (loin) groupe.add(arbre(x, z, i ? 0.95 : 1.15, m));
  });
  groupe.add(arbre(maxX - 0.9, minZ + 0.9, 1.3, m));

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
  };
}

function liberer(objet: THREE.Object3D) {
  objet.traverse((o) => {
    if (o instanceof THREE.Mesh) o.geometry.dispose();
  });
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
  fonds: Record<Ambiance, THREE.Texture>;
  maquette: Maquette | null;
  ambiance: Ambiance;
  redessiner: () => void;
};

function appliquerAmbiance(m: Moteur, ambiance: Ambiance) {
  const soir = ambiance === "soir";
  const { ciel, cle, contre, ambiante, terrasse } = m.lumieres;
  m.scene.background = m.fonds[ambiance];
  m.scene.environmentIntensity = soir ? 0.12 : 0.45;
  ambiante.intensity = soir ? 0.04 : 0;
  ciel.color.set(soir ? "#5266a8" : "#dfe8ff");
  ciel.groundColor.set(soir ? "#0c1020" : "#3a3f4f");
  ciel.intensity = soir ? 0.3 : 0.5;
  cle.color.set(soir ? "#9fb2ff" : "#fff1de");
  cle.intensity = soir ? 0.35 : 2.8;
  contre.intensity = soir ? 0.2 : 0.45;
  terrasse.intensity = soir ? 3 : 0;
  const allumer = (mat: THREE.MeshStandardMaterial, couleur: string, force: number) => {
    mat.emissive.set(soir ? couleur : "#000000");
    mat.emissiveIntensity = soir ? force : 0;
  };
  allumer(m.matieres.vitre, "#ffb969", 0.85);
  allumer(m.matieres.eau, "#17a9dc", 0.6);
  allumer(m.matieres.carreaux, "#0f6d8c", 0.6);
  allumer(m.matieres.carreauxFond, "#0f6d8c", 0.7);
  if (m.maquette?.lumierePiscine) m.maquette.lumierePiscine.intensity = soir ? 10 : 0;
  // Le halo ne sert que le soir, autour de ce qui s'allume ; le jour il voilerait tout.
  if (m.halo) m.halo.enabled = soir;
}

/* ============================ le composant ============================ */

export default function Jardin3D({ jardin, ambiance, onIndisponible }: Props) {
  const conteneur = useRef<HTMLDivElement>(null);
  const moteur = useRef<Moteur | null>(null);

  // Le moteur : créé une fois, détruit au départ.
  useEffect(() => {
    const el = conteneur.current;
    if (!el) return;
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
    const fonds = { jour: textureFond("#243248", "#070b13"), soir: textureFond("#131d36", "#03050b") };
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
    const boucle = (t: number) => {
      image = requestAnimationFrame(boucle);
      // une trentaine d'images par seconde suffisent à l'eau et à la rotation
      if (t - precedent < 32) return;
      const dt = Math.min(0.1, (t - precedent) / 1000);
      precedent = t;
      let bouge = controles.update(dt);
      if (!reduit) {
        matieres.vaguelettes.offset.x += dt * 0.025;
        matieres.vaguelettes.offset.y += dt * 0.012;
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
      fonds,
      maquette: null,
      ambiance: "jour",
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
      if (m?.maquette) liberer(m.maquette.groupe);
      matieres.textures.forEach((t) => t.dispose());
      fonds.jour.dispose();
      fonds.soir.dispose();
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
      liberer(m.maquette.groupe);
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
    m.lumieres.cle.position.set(centre.x + soleil.x * 19, 15, centre.z + soleil.z * 19);
    m.lumieres.contre.position.set(centre.x - direction.x * 20, 14, centre.z - direction.z * 20);
    m.lumieres.cle.target.position.set(centre.x, 0, centre.z);
    if (jardin.terrasse) m.lumieres.terrasse.position.set(jardin.terrasse.x, 2.2, jardin.terrasse.z);
    appliquerAmbiance(m, m.ambiance);
    m.controles.update();
    m.redessiner();
  }, [jardin]);

  // Jour ou soir.
  useEffect(() => {
    const m = moteur.current;
    if (!m) return;
    m.ambiance = ambiance;
    appliquerAmbiance(m, ambiance);
    m.redessiner();
  }, [ambiance]);

  return <div ref={conteneur} className="absolute inset-0 cursor-grab active:cursor-grabbing touch-pan-y" />;
}
