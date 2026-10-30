import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import {
  PIECES, POSE, REPERES, ROTULES, SQUELETTE, TACHES,
  longueurProfil, profil, type Ancre, type IdZone, type Piece,
} from "./mannequin-forme";

// Le mannequin de bois des ateliers de dessin, construit pièce par pièce : des fuseaux
// tournés, des rotules un peu plus foncées (le bois patiné par les mains), un socle et
// sa tige de métal. Le bois clair et son veinage sont peints dans le navigateur ; aucun
// fichier n'est chargé.
//
// La lumière d'une zone est peinte dans la matière elle-même : chaque pixel du bois
// mesure sa distance aux « taches » de la zone choisie et s'éclaire d'autant. Une tache
// devant le ventre n'allume donc que le devant ; celle du bas du dos, que le dos.

/** Le nombre de taches de lumière que le shader sait suivre (voir TACHES). */
export const N_TACHES = 10;

/** Un hasard reproductible : le même bois à chaque visite, la couleur et le relief alignés. */
function hasard(graine: number) {
  let a = graine >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ================================ le bois peint ================================ */

/** Combien de bois un motif couvre : autour d'une pièce, et le long. */
const MOTIF_AUTOUR = 0.4;
const MOTIF_LONG = 0.9;

/**
 * Le hêtre clair, peint : un fond doré, des veines de croissance larges et sinueuses,
 * des fibres fines, des pores, et les petites maillures propres au hêtre. Le motif se
 * raccorde sur ses quatre bords. Deux toiles : la couleur, et le relief (gris).
 */
function peindreBois() {
  const L = 512;
  const H = 1024;
  const toile = () => {
    const c = document.createElement("canvas");
    c.width = L;
    c.height = H;
    return [c, c.getContext("2d")!] as const;
  };
  const [cCouleur, couleur] = toile();
  const [cRelief, relief] = toile();
  const r = hasard(1907);

  const fond = couleur.createLinearGradient(0, 0, L, 0);
  fond.addColorStop(0, "#DDBE93");
  fond.addColorStop(0.27, "#E7CCA5");
  fond.addColorStop(0.52, "#DBBA8E");
  fond.addColorStop(0.78, "#E5C9A0");
  fond.addColorStop(1, "#DDBE93");
  couleur.fillStyle = fond;
  couleur.fillRect(0, 0, L, H);
  relief.fillStyle = "#808080";
  relief.fillRect(0, 0, L, H);

  // Une ligne ondulante sur toute la hauteur ; un nombre entier d'ondes, pour que le
  // motif se raccorde en haut et en bas. Dessinée trois fois : le raccord gauche-droite.
  const onde = (ctx: CanvasRenderingContext2D, x0: number, ampli: number, ondes: number, phase: number) => {
    for (const dx of [-L, 0, L]) {
      ctx.beginPath();
      for (let y = 0; y <= H; y += 8) {
        const x = x0 + dx + ampli * Math.sin((y / H) * Math.PI * 2 * ondes + phase) + ampli * 0.35 * Math.sin((y / H) * Math.PI * 2 * ondes * 3 + phase * 1.7);
        if (y === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  };
  for (const ctx of [couleur, relief]) {
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }

  // Veines de croissance : larges, douces (trois passes de plus en plus fines).
  for (let i = 0; i < 12; i++) {
    const x0 = r() * L;
    const large = 10 + r() * 26;
    const ampli = 4 + r() * 16;
    const ondes = 1 + Math.floor(r() * 3);
    const phase = r() * Math.PI * 2;
    const a = 0.035 + r() * 0.05;
    for (const [k, f] of [[1, 1], [0.55, 1.3], [0.22, 1.8]] as const) {
      couleur.strokeStyle = `rgba(150, 96, 50, ${a * f})`;
      couleur.lineWidth = large * k;
      onde(couleur, x0, ampli, ondes, phase);
      relief.strokeStyle = `rgba(0, 0, 0, ${0.05 * f})`;
      relief.lineWidth = large * k;
      onde(relief, x0, ampli, ondes, phase);
    }
  }
  // Fibres fines, sombres et claires.
  for (let i = 0; i < 320; i++) {
    const x0 = r() * L;
    const ampli = 1 + r() * 7;
    const ondes = 1 + Math.floor(r() * 3);
    const phase = r() * Math.PI * 2;
    const clair = r() < 0.28;
    couleur.strokeStyle = clair ? `rgba(255, 244, 222, ${0.04 + r() * 0.07})` : `rgba(118, 74, 36, ${0.03 + r() * 0.09})`;
    couleur.lineWidth = 0.5 + r() * 1.2;
    onde(couleur, x0, ampli, ondes, phase);
    if (!clair) {
      relief.strokeStyle = `rgba(0, 0, 0, ${0.06 + r() * 0.1})`;
      relief.lineWidth = couleur.lineWidth;
      onde(relief, x0, ampli, ondes, phase);
    }
  }
  // Pores et maillures : de petits traits dans le sens du fil.
  const tache = (ctx: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number) => {
    for (const dx of [-L, 0, L])
      for (const dy of [-H, 0, H]) {
        ctx.beginPath();
        ctx.ellipse(x + dx, y + dy, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
      }
  };
  for (let i = 0; i < 2600; i++) {
    const x = r() * L;
    const y = r() * H;
    const ry = 1 + r() * 3.5;
    couleur.fillStyle = `rgba(105, 64, 30, ${0.1 + r() * 0.18})`;
    tache(couleur, x, y, 0.5, ry);
    relief.fillStyle = "rgba(0, 0, 0, 0.35)";
    tache(relief, x, y, 0.6, ry);
  }
  for (let i = 0; i < 900; i++) {
    const x = r() * L;
    const y = r() * H;
    const ry = 2 + r() * 5;
    couleur.fillStyle = `rgba(178, 112, 62, ${0.08 + r() * 0.12})`;
    tache(couleur, x, y, 0.7 + r() * 0.8, ry);
    relief.fillStyle = "rgba(255, 255, 255, 0.12)";
    tache(relief, x, y, 0.8, ry);
  }

  const texture = (c: HTMLCanvasElement, srgb: boolean) => {
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 8;
    if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };
  return { couleur: texture(cCouleur, true), relief: texture(cRelief, false) };
}

/** La pastille d'un repère : un anneau fin et un point, couleur de la lumière des zones. */
function peindreRepere() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const halo = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  halo.addColorStop(0, "rgba(214, 220, 255, 0.55)");
  halo.addColorStop(0.45, "rgba(174, 184, 255, 0.18)");
  halo.addColorStop(1, "rgba(174, 184, 255, 0)");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = "rgba(244, 245, 250, 0.95)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(64, 64, 30, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#F4F5FA";
  ctx.beginPath();
  ctx.arc(64, 64, 11, 0, Math.PI * 2);
  ctx.fill();
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Le halo d'une zone allumée : une lueur douce, ajoutée à l'image devant la zone. */
function peindreHalo() {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(214, 220, 255, 0.7)");
  g.addColorStop(0.3, "rgba(170, 182, 255, 0.32)");
  g.addColorStop(0.65, "rgba(140, 156, 255, 0.08)");
  g.addColorStop(1, "rgba(140, 156, 255, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/* ================================== les matières ================================== */

export type Lueur = {
  uTaches: { value: THREE.Vector4[] };
  uForces: { value: number[] };
  uChaud: { value: THREE.Color };
  uFroid: { value: THREE.Color };
};

/**
 * La lumière des zones, ajoutée à la matière : un éclat blanc au cœur de la tache, un
 * liseré pervenche sur ses bords (là où la surface fuit le regard). Une lumière froide
 * sur un bois chaud : on la voit tout de suite. Rien d'autre ne change dans le rendu
 * physique de three.js.
 */
function rendreEclairable(m: THREE.MeshPhysicalMaterial, lueur: Lueur) {
  m.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, lueur);
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vMonde;")
      .replace("#include <project_vertex>", "#include <project_vertex>\nvMonde = (modelMatrix * vec4(transformed, 1.0)).xyz;");
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
uniform vec4 uTaches[${N_TACHES}];
uniform float uForces[${N_TACHES}];
uniform vec3 uChaud;
uniform vec3 uFroid;
varying vec3 vMonde;`,
      )
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
float lueur = 0.0;
for (int i = 0; i < ${N_TACHES}; i++) {
  float k = 1.0 - smoothstep(uTaches[i].w * 0.3, uTaches[i].w, distance(vMonde, uTaches[i].xyz));
  lueur += uForces[i] * k;
}
lueur = min(lueur, 1.0);
float bord = pow(1.0 - abs(dot(normal, normalize(vViewPosition))), 2.0);
totalEmissiveRadiance += lueur * (uChaud * 0.26 + uFroid * bord * 0.9);`,
      );
  };
  m.customProgramCacheKey = () => "le-pourquoi-bois-eclairable";
}

export type Matieres = ReturnType<typeof creerMatieres>;

export function creerMatieres() {
  const bois = peindreBois();
  const lueur: Lueur = {
    uTaches: { value: Array.from({ length: N_TACHES }, () => new THREE.Vector4(0, -10, 0, 0.001)) },
    uForces: { value: new Array(N_TACHES).fill(0) },
    uChaud: { value: new THREE.Color("#EEF0FF") },
    uFroid: { value: new THREE.Color("#8C9DFF") },
  };
  const commun = { map: bois.couleur, bumpMap: bois.relief, bumpScale: 0.55 };
  const corps = new THREE.MeshPhysicalMaterial({ ...commun, color: "#FFFFFF", roughness: 0.52, clearcoat: 0.32, clearcoatRoughness: 0.38 });
  const rotule = new THREE.MeshPhysicalMaterial({ ...commun, color: "#DCCBBB", roughness: 0.44, clearcoat: 0.5, clearcoatRoughness: 0.3 });
  const socle = new THREE.MeshPhysicalMaterial({ ...commun, color: "#C29B74", roughness: 0.56, clearcoat: 0.25, clearcoatRoughness: 0.4 });
  for (const m of [corps, rotule, socle]) rendreEclairable(m, lueur);
  const metal = new THREE.MeshStandardMaterial({ color: "#CDD2DC", metalness: 1, roughness: 0.3 });
  const repere = new THREE.SpriteMaterial({ map: peindreRepere(), transparent: true, depthWrite: false, sizeAttenuation: false });
  const imageHalo = peindreHalo();
  const halo = () =>
    new THREE.SpriteMaterial({ map: imageHalo, transparent: true, depthWrite: false, opacity: 0 });
  return {
    corps, rotule, socle, metal, repere, lueur, halo,
    liberer() {
      bois.couleur.dispose();
      bois.relief.dispose();
      repere.map?.dispose();
      imageHalo.dispose();
      for (const m of [corps, rotule, socle, metal, repere]) m.dispose();
    },
  };
}

/* ================================== les pièces ================================== */

type Finesse = { autour: number; long: number; sphere: number };

/** Une pièce tournée, le veinage calé sur sa taille réelle (le fil court dans la longueur). */
function tourner(p: Piece, f: Finesse) {
  const pts = profil(p, f.long);
  // phiStart = π : le raccord du tour est dans le dos de la pièce, pas devant.
  const geo = new THREE.LatheGeometry(pts.map(([x, y]) => new THREE.Vector2(x, y)), f.autour, Math.PI);
  const rayonMax = Math.max(...pts.map((q) => q[0]));
  const tour = 2 * Math.PI * rayonMax * (((p.echelleX ?? 1) + (p.echelleZ ?? 1)) / 2);
  caler(geo, Math.max(1, Math.round(tour / MOTIF_AUTOUR)), longueurProfil(pts) / MOTIF_LONG);
  geo.scale(p.echelleX ?? 1, 1, p.echelleZ ?? 1);
  return geo;
}

function boule(rayon: number, f: Finesse) {
  const geo = new THREE.SphereGeometry(rayon, f.sphere, Math.round(f.sphere * 0.7), Math.PI);
  caler(geo, Math.max(1, Math.round((2 * Math.PI * rayon) / MOTIF_AUTOUR)), (Math.PI * rayon) / MOTIF_LONG);
  return geo;
}

function caler(geo: THREE.BufferGeometry, ku: number, kv: number) {
  const uv = geo.getAttribute("uv") as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * ku, uv.getY(i) * kv);
  uv.needsUpdate = true;
}

/* ================================== le mannequin ================================== */

export type Mannequin = {
  /** Le plateau qui tourne : le mannequin et son socle. */
  plateau: THREE.Group;
  /** Ce qu'un doigt peut toucher : le corps seul. */
  corps: THREE.Mesh[];
  taches: { zone: IdZone; objet: THREE.Object3D; rayon: number }[];
  reperes: { zone: IdZone; sprite: THREE.Sprite }[];
  /** Un halo par zone (à poser dans la scène), placé chaque image entre la zone et l'objectif. */
  halos: { zone: IdZone; sprite: THREE.Sprite; ancre: THREE.Object3D; rayon: number }[];
  /** Hauteur du sommet de la tête au-dessus du socle. */
  hauteur: number;
  liberer: () => void;
};

const appliquer = (o: THREE.Object3D, r: { x: number; y: number; z: number }) => o.rotation.set(r.x, r.y, r.z, "YXZ");

export function construireMannequin(m: Matieres, fin: boolean): Mannequin {
  const f: Finesse = fin ? { autour: 56, long: 44, sphere: 36 } : { autour: 36, long: 30, sphere: 24 };
  const geometries: THREE.BufferGeometry[] = [];
  const corps: THREE.Mesh[] = [];

  const piece = (parent: THREE.Object3D, geo: THREE.BufferGeometry, mat: THREE.Material, y: number, x = 0, z = 0) => {
    geometries.push(geo);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    corps.push(mesh);
    return mesh;
  };
  const pivot = (parent: THREE.Object3D, x: number, y: number, z = 0) => {
    const g = new THREE.Group();
    g.position.set(x, y, z);
    parent.add(g);
    return g;
  };

  const plateau = new THREE.Group();
  const silhouette = new THREE.Group();
  plateau.add(silhouette);

  // Le bassin, et les jambes qui en partent.
  const bassin = pivot(silhouette, 0, SQUELETTE.bassin);
  appliquer(bassin, POSE.bassin);
  piece(bassin, tourner(PIECES.bassin, f), m.corps, 0.0);

  const jambe = (cote: 1 | -1) => {
    const G = cote === 1;
    const hanche = pivot(bassin, cote * SQUELETTE.hanche.x, SQUELETTE.hanche.y);
    appliquer(hanche, G ? POSE.hancheG : POSE.hancheD);
    piece(hanche, boule(ROTULES.hanche, f), m.rotule, 0);
    piece(hanche, tourner(PIECES.cuisse, f), m.corps, -(ROTULES.hanche + 0.012 + PIECES.cuisse.longueur / 2));
    const genou = pivot(hanche, 0, SQUELETTE.genou);
    appliquer(genou, G ? POSE.genouG : POSE.genouD);
    piece(genou, boule(ROTULES.genou, f), m.rotule, 0);
    piece(genou, tourner(PIECES.jambe, f), m.corps, -(ROTULES.genou + 0.006 + PIECES.jambe.longueur / 2));
    const cheville = pivot(genou, 0, SQUELETTE.cheville);
    appliquer(cheville, G ? POSE.chevilleG : POSE.chevilleD);
    piece(cheville, boule(ROTULES.cheville, f), m.rotule, 0);
    const geoPied = tourner(PIECES.pied, f);
    geoPied.rotateX(Math.PI / 2);
    geoPied.scale(1, 0.6, 1);
    const pied = piece(cheville, geoPied, m.corps, -0.044, 0, 0.042);
    return pied;
  };
  const pieds = [jambe(1), jambe(-1)];

  // La taille, le ventre, le thorax.
  const taille = pivot(bassin, 0, SQUELETTE.taille);
  appliquer(taille, POSE.taille);
  piece(taille, boule(ROTULES.taille, f), m.rotule, 0);
  piece(taille, tourner(PIECES.ventre, f), m.corps, 0.085);
  const thorax = pivot(taille, 0, SQUELETTE.thorax);
  appliquer(thorax, POSE.thorax);
  piece(thorax, tourner(PIECES.thorax, f), m.corps, PIECES.thorax.longueur / 2);

  // Le cou et la tête.
  const cou = pivot(thorax, 0, SQUELETTE.cou);
  piece(cou, boule(ROTULES.cou, f), m.rotule, 0);
  piece(cou, tourner(PIECES.cou, f), m.corps, 0.052);
  const tete = pivot(cou, 0, SQUELETTE.tete);
  appliquer(tete, POSE.tete);
  piece(tete, tourner(PIECES.tete, f), m.corps, PIECES.tete.longueur / 2, 0, 0.012);

  // Les bras.
  const bras = (cote: 1 | -1) => {
    const G = cote === 1;
    const epaule = pivot(thorax, cote * SQUELETTE.epaule.x, SQUELETTE.epaule.y);
    appliquer(epaule, G ? POSE.epauleG : POSE.epauleD);
    piece(epaule, boule(ROTULES.epaule, f), m.rotule, 0);
    piece(epaule, tourner(PIECES.bras, f), m.corps, -(ROTULES.epaule + 0.008 + PIECES.bras.longueur / 2));
    const coude = pivot(epaule, 0, SQUELETTE.coude);
    appliquer(coude, G ? POSE.coudeG : POSE.coudeD);
    piece(coude, boule(ROTULES.coude, f), m.rotule, 0);
    piece(coude, tourner(PIECES.avantBras, f), m.corps, -(ROTULES.coude + 0.006 + PIECES.avantBras.longueur / 2));
    const poignet = pivot(coude, 0, SQUELETTE.poignet);
    appliquer(poignet, G ? POSE.poignetG : POSE.poignetD);
    piece(poignet, boule(ROTULES.poignet, f), m.rotule, 0);
    piece(poignet, tourner(PIECES.main, f), m.corps, -(ROTULES.poignet + 0.004 + PIECES.main.longueur / 2));
    // Le pouce, sur le devant de la main, un peu ouvert.
    const pouce = pivot(poignet, cote * -0.004, -0.045, 0.028);
    pouce.rotation.set(-0.42, 0, cote * 0.12);
    piece(pouce, tourner(PIECES.pouce, f), m.corps, -PIECES.pouce.longueur / 2);
    return epaule;
  };
  const epauleG = bras(1);
  const epauleD = bras(-1);

  // Les pieds posent sur le socle, quelle que soit la pose.
  silhouette.updateMatrixWorld(true);
  const boite = new THREE.Box3();
  for (const p of pieds) boite.expandByObject(p);
  silhouette.position.y = -boite.min.y;
  silhouette.updateMatrixWorld(true);

  // Le socle et sa tige, qui entre sous le bassin.
  const geoSocle = new RoundedBoxGeometry(0.78, 0.07, 0.54, 4, 0.024);
  caler(geoSocle, 2, 1);
  geometries.push(geoSocle);
  const socle = new THREE.Mesh(geoSocle, m.socle);
  socle.position.y = -0.035;
  socle.castShadow = true;
  socle.receiveShadow = true;
  plateau.add(socle);

  const bas = new THREE.Vector3(0, 0, -0.15);
  const haut = bassin.localToWorld(new THREE.Vector3(0, -0.05, -0.035));
  plateau.worldToLocal(haut);
  const geoTige = new THREE.CylinderGeometry(0.0105, 0.0105, 1, 20);
  geometries.push(geoTige);
  const tige = new THREE.Mesh(geoTige, m.metal);
  tige.position.copy(bas).add(haut).multiplyScalar(0.5);
  tige.scale.y = bas.distanceTo(haut);
  tige.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), haut.clone().sub(bas).normalize());
  tige.castShadow = true;
  plateau.add(tige);
  const geoBague = new THREE.CylinderGeometry(0.032, 0.038, 0.034, 32);
  geometries.push(geoBague);
  const bague = new THREE.Mesh(geoBague, m.socle);
  bague.position.set(bas.x, 0.017, bas.z);
  bague.castShadow = true;
  plateau.add(bague);

  // La hauteur se mesure avant d'accrocher les repères : une boîte englobante compte un
  // sprite pour un carré d'un mètre.
  plateau.updateMatrixWorld(true);
  const toutLeCorps = new THREE.Box3().setFromObject(silhouette);

  // Les taches de lumière et les repères, accrochés aux articulations qui les portent.
  const ancres: Record<Ancre, THREE.Object3D> = { tete, cou, epauleG, epauleD, thorax, taille, bassin };
  const taches = TACHES.map((t) => {
    const o = new THREE.Object3D();
    o.position.set(t.x, t.y, t.z);
    ancres[t.ancre].add(o);
    return { zone: t.zone, objet: o, rayon: t.rayon };
  });
  const reperes = (Object.keys(REPERES) as IdZone[]).map((zone) => {
    const r = REPERES[zone];
    const sprite = new THREE.Sprite(m.repere);
    sprite.position.set(r.x, r.y, r.z);
    sprite.renderOrder = 2;
    ancres[r.ancre].add(sprite);
    return { zone, sprite };
  });

  const halos = (Object.keys(REPERES) as IdZone[]).map((zone) => {
    const t = taches.find((x) => x.zone === zone)!;
    const sprite = new THREE.Sprite(m.halo());
    sprite.renderOrder = 3;
    sprite.visible = false;
    return { zone, sprite, ancre: t.objet, rayon: t.rayon };
  });

  plateau.updateMatrixWorld(true);
  return {
    plateau,
    corps,
    taches,
    reperes,
    halos,
    hauteur: toutLeCorps.max.y,
    liberer: () => {
      geometries.forEach((g) => g.dispose());
      halos.forEach((h) => {
        h.sprite.removeFromParent();
        h.sprite.material.dispose();
      });
    },
  };
}
