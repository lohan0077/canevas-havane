import * as THREE from "three";
import { Lot, aller, boiteGeo, entreeDouce, lineaire, lisse, rebond } from "./batisseur";
import * as P from "./peintures";
import type { Modele } from "../donnees";

// Dedans : chaque maison vue en coupe, comme sur la planche d'un architecte. La façade
// est ôtée, les murs coupés montrent leur épaisseur (le « poché » clair, l'isolant
// dessiné en ondulation), et l'on regarde la pièce telle qu'elle était en 1974, 1976 ou
// 1978 : couloir, cuisine fermée, garage, salle de bains vert avocat, papier peint,
// lambris, moquette, petites fenêtres derrière leurs volets.
//
// Une seule valeur, de 0 (avant) à 1 (après), joue le travail de l'architecte dans
// l'ordre du projet : les cloisons s'enfoncent dans le sol, les murs s'ouvrent, la
// lumière entre, les matières changent, les meubles d'aujourd'hui sortent du sol. Le
// curseur la règle à la main ; la bascule la joue en trois secondes. Rien que ce que la
// page du projet décrit : cloisons, baie, extension, escalier, isolation, fenêtres.

/* ============================ l'atelier : matières partagées ============================ */

export type Atelier = {
  palette: Record<string, THREE.Material>;
  herbe: THREE.Material;
  terre: THREE.Material;
  crepi: THREE.Material;
  poche: THREE.Material;
  isolant: THREE.Material;
  verre: THREE.Material;
  verreDepoli: THREE.Material;
  lumineux: THREE.Material;
  textures: Record<string, THREE.Texture>;
  liberer: () => void;
};

/**
 * Les couleurs des meubles, créées à la demande : « #c8742f » donne une matière mate,
 * « #c8742f/0.3/0.6 » précise rugosité et métal.
 */
export function creerAtelier(): Atelier {
  const cache = new Map<string, THREE.Material>();
  const palette = new Proxy({} as Record<string, THREE.Material>, {
    get(_, cle: string) {
      let m = cache.get(cle);
      if (!m) {
        const [couleur, rug = "0.8", metal = "0"] = cle.split("/");
        m = new THREE.MeshStandardMaterial({ color: couleur, roughness: Number(rug), metalness: Number(metal) });
        cache.set(cle, m);
      }
      return m;
    },
  });
  const textures: Record<string, THREE.Texture> = {
    poche: P.pocheCoupe(),
    isolant: P.isolantCoupe(),
    papierPeint: P.papierPeint(),
    carrelage70: P.carrelage70(),
    moquette: P.moquette(),
    lambris: P.lambris(),
    parquet: P.parquet(),
    enduit: P.enduit(),
    parpaing: P.parpaing(),
    betonGarage: P.betonGarage(),
    betonCire: P.betonCire(),
    beton: P.beton("#9a968e"),
    faience: P.faience(),
    bardage: P.bardage(),
    pelouse: P.pelouse(),
    strates: P.strates(),
    crepi: P.crepi("#d8c6a0", 3),
  };
  // la coupe, blanche comme une maquette d'architecte ; l'isolant dessiné comme sur un plan
  const poche = new THREE.MeshStandardMaterial({ map: textures.poche, roughness: 0.92 });
  const isolant = new THREE.MeshStandardMaterial({ map: textures.isolant, roughness: 0.95 });
  const verre = new THREE.MeshStandardMaterial({ color: "#dfeaf0", roughness: 0.04, metalness: 0, transparent: true, opacity: 0.14, depthWrite: false, envMapIntensity: 1.4 });
  const verreDepoli = new THREE.MeshStandardMaterial({ color: "#e8eee9", roughness: 0.5, transparent: true, opacity: 0.75 });
  const lumineux = new THREE.MeshStandardMaterial({ color: "#fff2d6", emissive: "#ffd79a", emissiveIntensity: 2.2 });
  const herbe = new THREE.MeshStandardMaterial({ map: textures.pelouse, roughness: 0.95 });
  const terre = new THREE.MeshStandardMaterial({ map: textures.strates, roughness: 1 });
  const crepi = new THREE.MeshStandardMaterial({ map: textures.crepi, roughness: 0.95 });
  return {
    palette,
    herbe,
    terre,
    crepi,
    poche,
    isolant,
    verre,
    verreDepoli,
    lumineux,
    textures,
    liberer: () => {
      cache.forEach((m) => m.dispose());
      Object.values(textures).forEach((t) => t.dispose());
      [poche, isolant, verre, verreDepoli, lumineux, herbe, terre, crepi].forEach((m) => m.dispose());
    },
  };
}

/**
 * Une matière qui passe d'une texture à l'autre (papier peint → enduit, carrelage →
 * parquet…). Les coordonnées viennent de la position dans la pièce, pas de l'objet :
 * une cloison qui s'enfonce garde son papier peint en place, et une texture ne s'étire
 * jamais quand un mur s'ouvre.
 */
function matiereMelangee(avant: THREE.Texture, apres: THREE.Texture, echelles: [number, number], melange: { value: number }, rugosites: [number, number] = [0.85, 0.75]) {
  const m = new THREE.MeshStandardMaterial({ map: avant, roughness: rugosites[0] });
  m.onBeforeCompile = (s) => {
    s.uniforms.uApres = { value: apres };
    s.uniforms.uMelange = melange;
    s.uniforms.uEchelles = { value: new THREE.Vector2(1 / echelles[0], 1 / echelles[1]) };
    s.uniforms.uRugosites = { value: new THREE.Vector2(rugosites[0], rugosites[1]) };
    s.vertexShader = s.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vPiece;\nvarying vec3 vNormalePiece;")
      .replace("#include <project_vertex>", "#include <project_vertex>\nvPiece = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvNormalePiece = normalize(mat3(modelMatrix) * objectNormal);");
    s.fragmentShader = s.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vPiece;\nvarying vec3 vNormalePiece;\nuniform sampler2D uApres;\nuniform float uMelange;\nuniform vec2 uEchelles;\nuniform vec2 uRugosites;")
      .replace(
        "#include <map_fragment>",
        `vec3 nP = abs(vNormalePiece);
        vec2 uvP = nP.y > max(nP.x, nP.z) ? vPiece.xz : (nP.x > nP.z ? vPiece.zy : vPiece.xy);
        vec4 couleurP = mix(texture2D(map, uvP * uEchelles.x), texture2D(uApres, uvP * uEchelles.y), uMelange);
        diffuseColor *= couleurP;`,
      )
      .replace("#include <roughnessmap_fragment>", "float roughnessFactor = mix(uRugosites.x, uRugosites.y, uMelange);");
  };
  m.customProgramCacheKey = () => "pavillon-bis-melange";
  return m;
}

/* ============================ les pièces qui bougent ============================ */

type Mouvement =
  | { objet: THREE.Object3D; sens: "sort" | "entre"; de: number; a: number }
  | { objet: THREE.Object3D; sens: "libre"; jouer: (t: number) => void };

/** Ce qui s'enfonce dans le sol, ce qui en sort avec un petit rebond. */
function jouerMouvement(m: Mouvement, t: number) {
  if (m.sens === "libre") return m.jouer(t);
  const o = m.objet;
  if (m.sens === "sort") {
    const k = entreeDouce(lisse(m.de, m.a, t));
    o.visible = k < 0.999;
    o.scale.set(1 - 0.06 * k, Math.max(0.001, 1 - k), 1 - 0.06 * k);
  } else {
    const k = lineaire(m.de, m.a, t);
    const s = rebond(k);
    o.visible = k > 0.001;
    o.scale.set(0.9 + 0.1 * Math.min(1, s), Math.max(0.001, s), 0.9 + 0.1 * Math.min(1, s));
  }
}

/** Un groupe posé au sol à (x, z) : les meubles se construisent autour de leur base. */
function socle(x: number, z: number, rotY = 0, y = 0) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = rotY;
  return g;
}

/** Un meuble : un lot de boîtes fondues, posé dans son groupe. */
function meuble(a: Atelier, x: number, z: number, construire: (l: Lot) => void, rotY = 0) {
  const g = socle(x, z, rotY);
  const lot = new Lot();
  construire(lot);
  g.add(lot.finir(a.palette));
  return g;
}

/* ============================ les meubles ============================ */
// Origine au sol, au centre ; l'avant du meuble regarde +z avant rotation.

const canape = (l: number, tissu: string, pieds: string, moderne: boolean) => (lot: Lot) => {
  const p = moderne ? 0.95 : 0.88;
  lot.entre(pieds, -l / 2 + 0.08, 0, -p / 2 + 0.08, l / 2 - 0.08, 0.14, p / 2 - 0.08);
  lot.entre(tissu, -l / 2, 0.14, -p / 2, l / 2, moderne ? 0.42 : 0.46, p / 2);
  lot.entre(tissu, -l / 2, 0.4, -p / 2, l / 2, moderne ? 0.78 : 0.9, -p / 2 + (moderne ? 0.2 : 0.26));
  const bras = moderne ? 0.16 : 0.22;
  lot.entre(tissu, -l / 2, 0.14, -p / 2, -l / 2 + bras, moderne ? 0.6 : 0.68, p / 2);
  lot.entre(tissu, l / 2 - bras, 0.14, -p / 2, l / 2, moderne ? 0.6 : 0.68, p / 2);
  const n = moderne ? 2 : 3;
  for (let i = 0; i < n; i++) {
    const u0 = -l / 2 + bras + ((l - 2 * bras) * i) / n;
    lot.entre(tissu, u0 + 0.02, 0.42, -p / 2 + 0.24, u0 + (l - 2 * bras) / n - 0.02, moderne ? 0.52 : 0.56, p / 2 - 0.02);
  }
};

const fauteuil = (tissu: string, bois: string) => (lot: Lot) => {
  lot.entre(bois, -0.38, 0, -0.38, 0.38, 0.12, 0.38);
  lot.entre(tissu, -0.38, 0.12, -0.38, 0.38, 0.42, 0.38);
  lot.entre(tissu, -0.38, 0.42, -0.38, 0.38, 0.95, -0.2);
  lot.entre(tissu, -0.38, 0.42, -0.38, -0.26, 0.62, 0.38);
  lot.entre(tissu, 0.26, 0.42, -0.38, 0.38, 0.62, 0.38);
};

const table = (l: number, p: number, h: number, plateau: string, pied: string, epaisseur = 0.04) => (lot: Lot) => {
  lot.entre(plateau, -l / 2, h - epaisseur, -p / 2, l / 2, h, p / 2);
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]])
    lot.entre(pied, sx * (l / 2 - 0.08) - 0.025, 0, sz * (p / 2 - 0.08) - 0.025, sx * (l / 2 - 0.08) + 0.025, h - epaisseur, sz * (p / 2 - 0.08) + 0.025);
};

const chaise = (assise: string, pied: string) => (lot: Lot) => {
  lot.entre(assise, -0.22, 0.44, -0.22, 0.22, 0.48, 0.22);
  lot.entre(assise, -0.22, 0.48, -0.24, 0.22, 0.88, -0.2);
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) lot.entre(pied, sx * 0.19 - 0.02, 0, sz * 0.19 - 0.02, sx * 0.19 + 0.02, 0.44, sz * 0.19 + 0.02);
};

const tapis = (l: number, p: number, couleur: string) => (lot: Lot) => lot.entre(couleur, -l / 2, 0, -p / 2, l / 2, 0.015, p / 2);

const plante = (h: number) => (lot: Lot) => {
  lot.cylindre("#d8d2c6/0.7", 0.2, 0.42, 0, 0, 0, 16, 0.24);
  const f = new THREE.IcosahedronGeometry(h * 0.32, 1);
  lot.ajouter("#4f6e3c", f, 0, 0.42 + h * 0.36, 0);
  lot.ajouter("#5d7d43", new THREE.IcosahedronGeometry(h * 0.24, 1), 0.12, 0.42 + h * 0.68, 0.05);
};

const lampadaire = (pied: string, abatJour: string) => (lot: Lot) => {
  lot.cylindre(pied, 0.16, 0.03, 0, 0, 0);
  lot.cylindre(pied, 0.015, 1.45, 0, 0.03, 0, 8);
  lot.cylindre(abatJour, 0.2, 0.3, 0, 1.4, 0, 18, 0.14);
};

/** La cuisine fermée de 1974 : façades brunes, plan en stratifié orange, éléments hauts. */
const cuisine70 = (long: number) => (lot: Lot) => {
  lot.entre("#6b4a2e/0.6", 0, 0, -long / 2, 0.6, 0.86, long / 2);
  lot.entre("#c8742f/0.35", -0.02, 0.86, -long / 2, 0.62, 0.9, long / 2);
  for (let z = -long / 2 + 0.6; z < long / 2; z += 0.6) lot.entre("#3e2a1a", 0.6, 0.06, z - 0.01, 0.605, 0.82, z + 0.01);
  lot.entre("#6b4a2e/0.6", 0, 1.45, -long / 2, 0.34, 2.1, long / 2);
  lot.entre("#e7dfcc/0.4", 0.1, 0.9, -long / 2 + 0.3, 0.5, 0.92, -long / 2 + 0.9);
};

/** La cuisine d'aujourd'hui : façades claires sans poignées, plan en chêne, colonnes. */
const cuisineNeuve = (long: number, colonnes: number) => (lot: Lot) => {
  lot.entre("#efede8/0.45", 0, 0.1, -long / 2, 0.62, 0.88, long / 2);
  lot.entre("#2b2f33/0.6", 0.05, 0, -long / 2, 0.58, 0.1, long / 2);
  lot.entre("#c9a57a/0.5", -0.01, 0.88, -long / 2, 0.64, 0.92, long / 2);
  for (let z = -long / 2 + 0.6; z < long / 2; z += 0.6) lot.entre("#d9d6cf/0.5", 0.62, 0.12, z - 0.004, 0.623, 0.86, z + 0.004);
  lot.entre("#efede8/0.45", 0, 0, long / 2, 0.62, 2.3, long / 2 + colonnes);
  lot.entre("#c9a57a/0.5", 0, 1.5, -long / 2, 0.36, 1.53, -long / 2 + 1.6);
};

const ilot = (l: number, p: number) => (lot: Lot) => {
  lot.entre("#2b2f33/0.55", -l / 2, 0, -p / 2, l / 2, 0.88, p / 2);
  lot.entre("#ece9e2/0.3", -l / 2 - 0.03, 0.88, -p / 2 - 0.15, l / 2 + 0.03, 0.92, p / 2 + 0.03);
};

const tabouret = () => (lot: Lot) => {
  lot.cylindre("#1f2226/0.4/0.4", 0.18, 0.04, 0, 0.62, 0);
  lot.cylindre("#1f2226/0.4/0.4", 0.02, 0.62, 0, 0, 0, 8);
  lot.cylindre("#1f2226/0.4/0.4", 0.17, 0.02, 0, 0, 0);
};

const lit = (l: number, p: number, drap: string, couverture: string, tete: string) => (lot: Lot) => {
  lot.entre(tete, -l / 2, 0, -p / 2 - 0.06, l / 2, 1.0, -p / 2);
  lot.entre(tete, -l / 2, 0.08, -p / 2, l / 2, 0.32, p / 2);
  lot.entre(drap, -l / 2 + 0.02, 0.32, -p / 2, l / 2 - 0.02, 0.52, p / 2 - 0.02);
  lot.entre(couverture, -l / 2 - 0.02, 0.48, -p / 2 + 0.55, l / 2 + 0.02, 0.56, p / 2);
  lot.entre(drap, -l / 2 + 0.12, 0.52, -p / 2 + 0.08, -0.06, 0.66, -p / 2 + 0.45);
  lot.entre(drap, 0.06, 0.52, -p / 2 + 0.08, l / 2 - 0.12, 0.66, -p / 2 + 0.45);
};

const armoire = (l: number, p: number, h: number, bois: string) => (lot: Lot) => {
  lot.entre(bois, -l / 2, 0, -p / 2, l / 2, h, p / 2);
  lot.entre("#3a2616", -0.01, 0.1, p / 2, 0.01, h - 0.1, p / 2 + 0.005);
  lot.entre("#c9a24a/0.3/0.7", -0.12, h / 2, p / 2, -0.06, h / 2 + 0.03, p / 2 + 0.02);
  lot.entre("#c9a24a/0.3/0.7", 0.06, h / 2, p / 2, 0.12, h / 2 + 0.03, p / 2 + 0.02);
};

const radiateur = (l: number) => (lot: Lot) => {
  for (let x = -l / 2; x < l / 2; x += 0.07) lot.entre("#e6e1d6/0.5", x, 0.12, -0.05, x + 0.05, 0.7, 0.05);
};

const televiseur = () => (lot: Lot) => {
  lot.entre("#5a3b24/0.6", -0.6, 0, -0.22, 0.6, 0.5, 0.22);
  lot.entre("#4a3a2e/0.5", -0.32, 0.5, -0.24, 0.32, 0.98, 0.2);
  lot.entre("#1b1d1e/0.2", -0.26, 0.56, 0.2, 0.22, 0.92, 0.205);
};

const suspension = (h: number, couleur: string) => (lot: Lot) => {
  lot.cylindre("#1a1a1a", 0.006, h - 0.3, 0, 0.3, 0, 6);
  lot.cylindre(couleur, 0.15, 0.3, 0, 0, 0, 18, 0.06);
};

const baignoire = () => (lot: Lot) => {
  lot.entre("#7b8a45/0.25", 0, 0, -0.85, 0.72, 0.56, 0.85);
  lot.entre("#5e6b33/0.3", 0.08, 0.5, -0.77, 0.64, 0.565, 0.77);
  lot.cylindre("#c9c9c4/0.2/0.8", 0.02, 0.25, 0.36, 0.56, -0.8, 8);
};

const lavabo = () => (lot: Lot) => {
  lot.cylindre("#7b8a45/0.25", 0.1, 0.72, 0, 0, 0, 12, 0.12);
  lot.entre("#7b8a45/0.25", -0.3, 0.72, -0.24, 0.3, 0.86, 0.22);
  lot.entre("#d7dfe2/0.05/0.6", -0.28, 1.15, -0.27, 0.28, 1.7, -0.25);
};

/** Une voiture d'époque, sans marque : caisse, pavillon, vitres sombres, quatre roues. */
function voiture(a: Atelier) {
  const g = new THREE.Group();
  const lot = new Lot();
  const c = "#a5823f/0.45/0.3";
  lot.entre(c, -0.84, 0.28, -2.05, 0.84, 0.86, 2.05);
  lot.entre(c, -0.78, 0.86, -0.95, 0.78, 1.3, 0.95);
  lot.entre("#20262b/0.1/0.3", -0.8, 0.9, -0.85, 0.8, 1.26, 0.85);
  lot.entre("#20262b/0.1/0.3", -0.7, 0.88, -1.0, 0.7, 1.26, 1.0);
  lot.entre("#c9c9c4/0.2/0.8", -0.86, 0.3, -2.1, 0.86, 0.42, -2.05);
  lot.entre("#c9c9c4/0.2/0.8", -0.86, 0.3, 2.05, 0.86, 0.42, 2.1);
  lot.entre("#f4ecd0/0.2", -0.7, 0.55, -2.07, -0.45, 0.72, -2.04);
  lot.entre("#f4ecd0/0.2", 0.45, 0.55, -2.07, 0.7, 0.72, -2.04);
  lot.entre("#8c2a20/0.4", -0.75, 0.6, 2.05, -0.45, 0.74, 2.08);
  lot.entre("#8c2a20/0.4", 0.45, 0.6, 2.05, 0.75, 0.74, 2.08);
  g.add(lot.finir(a.palette));
  const roues: THREE.Object3D[] = [];
  for (const [x, z] of [[-0.8, -1.35], [0.8, -1.35], [-0.8, 1.3], [0.8, 1.3]]) {
    const r = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16), a.palette["#1a1b1c/0.9"]);
    r.rotation.z = Math.PI / 2;
    r.position.set(x, 0.3, z);
    r.castShadow = true;
    const jante = new THREE.Mesh(new THREE.BoxGeometry(0.21, 0.36, 0.08), a.palette["#b9b9b4/0.3/0.8"]);
    r.add(jante);
    g.add(r);
    roues.push(r);
  }
  return { g, roues };
}

/* ============================ l'enveloppe en coupe ============================ */

type Rect = [number, number, number, number]; // x0, x1, y0, y1

type Enveloppe = {
  W: number; D: number; H: number; e: number;
  sol: [THREE.Texture, THREE.Texture, number, number];
  murs: [THREE.Texture, THREE.Texture, number, number];
  plafond: [THREE.Texture, THREE.Texture, number, number];
  ouvertures: { avant: Rect; apres: Rect }[];
  ouverture: [number, number];        // la phase où le mur du fond s'ouvre
  epaissirFond?: { de: number; a: number; plus: number }; // isolation par l'extérieur
  isolation: { de: number; a: number; epaisseur: number; bardage?: number };
  tremie?: { rect: [number, number, number, number]; a: number }; // x0, x1, z0, z1 dans le plafond
};

type Melanges = { sol: { value: number }; murs: { value: number }; plafond: { value: number } };

function enveloppe(a: Atelier, o: Enveloppe, melanges: Melanges, mouvements: Mouvement[], matieres: THREE.Material[]) {
  const { W, D, H, e } = o;
  const g = new THREE.Group();
  const sol = matiereMelangee(o.sol[0], o.sol[1], [o.sol[2], o.sol[3]], melanges.sol, [0.75, 0.55]);
  const murs = matiereMelangee(o.murs[0], o.murs[1], [o.murs[2], o.murs[3]], melanges.murs, [0.9, 0.85]);
  const plafond = matiereMelangee(o.plafond[0], o.plafond[1], [o.plafond[2], o.plafond[3]], melanges.plafond, [0.7, 0.9]);
  matieres.push(sol, murs, plafond);
  // Une boîte coupée : la face tournée vers nous (+z) est la coupe.
  const coupe = (x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, faces: Partial<Record<number, THREE.Material>>) => {
    const geo = boiteGeo(x1 - x0, y1 - y0, z1 - z0, 0.5);
    const liste = [0, 1, 2, 3, 4, 5].map((i) => faces[i] ?? a.poche);
    const m = new THREE.Mesh(geo, liste);
    m.position.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
    m.castShadow = true;
    m.receiveShadow = true;
    g.add(m);
    return m;
  };
  // Le plafond est ôté, comme le toit d'une maquette qu'on soulève — mais il porte
  // encore ses ombres (calque 1, que seule la lumière du soleil voit) : le jour n'entre
  // que par les fenêtres.
  const plafondOmbre = (m: THREE.Mesh) => {
    m.layers.set(1);
    m.receiveShadow = false;
    return m;
  };
  // la dalle et les deux murs latéraux
  coupe(-W / 2 - e, -0.32, -D - e, W / 2 + e, 0, 0, { 2: sol });
  coupe(-W / 2 - e, 0, -D - e, -W / 2, H, 0, { 0: murs });
  coupe(W / 2, 0, -D - e, W / 2 + e, H, 0, { 1: murs });
  if (o.tremie) {
    const [tx0, tx1, tz0, tz1] = o.tremie.rect;
    coupe(-W / 2 - e, H, -D - e, tx0, H + 0.26, 0, { 3: plafond });
    coupe(tx1, H, -D - e, W / 2 + e, H + 0.26, 0, { 3: plafond });
    coupe(tx0, H, -D - e, tx1, H + 0.26, tz0, { 3: plafond });
    coupe(tx0, H, tz1, tx1, H + 0.26, 0, { 3: plafond });
    const bouchon = coupe(tx0, H, tz0, tx1, H + 0.26, tz1, { 3: plafond });
    const au = o.tremie.a;
    mouvements.push({ objet: bouchon, sens: "libre", jouer: (t) => { bouchon.visible = t < au; } });
  } else {
    coupe(-W / 2 - e, H, -D - e, W / 2 + e, H + 0.26, 0, { 3: plafond });
  }
  g.children.filter((m) => m instanceof THREE.Mesh && m.position.y > H).forEach((m) => plafondOmbre(m as THREE.Mesh));

  // L'isolation (et le bardage) qui s'ajoute dehors, contre les murs coupés.
  const { epaisseur, bardage = 0 } = o.isolation;
  for (const cote of [-1, 1]) {
    const couche = (de: number, ep: number, face: THREE.Material, autre: THREE.Material) => {
      const pivot = new THREE.Group();
      pivot.position.set(cote * (W / 2 + e + de), 0, 0);
      const geo = boiteGeo(ep, H, D + e + 0.02, 0.5);
      const m = new THREE.Mesh(geo, [autre, autre, face, autre, face, autre]);
      m.position.set((cote * ep) / 2, H / 2, -(D + e) / 2 + 0.01);
      m.castShadow = true;
      pivot.add(m);
      g.add(pivot);
      mouvements.push({
        objet: pivot,
        sens: "libre",
        jouer: (t) => {
          const k = aller(lisse(o.isolation.de, o.isolation.a, t));
          pivot.visible = k > 0.001;
          pivot.scale.x = Math.max(0.001, k);
          pivot.position.x = cote * (W / 2 + e + de * k);
        },
      });
    };
    couche(0, epaisseur, a.isolant, a.palette["#d8cfa8"]);
    if (bardage) {
      const bois = new THREE.MeshStandardMaterial({ map: a.textures.bardage, roughness: 0.8 });
      matieres.push(bois);
      couche(epaisseur, bardage, bois, bois);
    }
  }

  // Le mur du fond, percé : piliers, linteaux et allèges suivent les ouvertures.
  const unite = new THREE.BoxGeometry(1, 1, 1);
  const pieces: THREE.Mesh[] = [];
  const nouvelle = () => {
    const m = new THREE.Mesh(unite, [murs, murs, a.poche, murs, murs, murs]);
    m.castShadow = true;
    m.receiveShadow = true;
    g.add(m);
    pieces.push(m);
    return m;
  };
  const n = o.ouvertures.length;
  const piliers = Array.from({ length: n + 1 }, nouvelle);
  const linteaux = Array.from({ length: n }, nouvelle);
  const alleges = Array.from({ length: n }, nouvelle);
  const poser = (m: THREE.Mesh, x0: number, x1: number, y0: number, y1: number, z0: number, z1: number) => {
    const l = x1 - x0;
    const h = y1 - y0;
    m.visible = l > 0.002 && h > 0.002;
    m.scale.set(Math.max(l, 0.001), Math.max(h, 0.001), z1 - z0);
    m.position.set((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  };
  const actuelles: Rect[] = o.ouvertures.map((x) => [...x.avant]);
  const mur = (t: number) => {
    const k = aller(lisse(o.ouverture[0], o.ouverture[1], t));
    const profondeur = e + (o.epaissirFond ? aller(lisse(o.epaissirFond.de, o.epaissirFond.a, t)) * o.epaissirFond.plus : 0);
    const z0 = -D - profondeur;
    const z1 = -D;
    o.ouvertures.forEach((ov, i) => {
      for (let j = 0; j < 4; j++) actuelles[i][j] = ov.avant[j] + (ov.apres[j] - ov.avant[j]) * k;
    });
    let x = -W / 2 - e;
    actuelles.forEach((r, i) => {
      poser(piliers[i], x, r[0], 0, H, z0, z1);
      poser(linteaux[i], r[0], r[1], r[3], H, z0, z1);
      poser(alleges[i], r[0], r[1], 0, r[2], z0, z1);
      x = r[1];
    });
    poser(piliers[n], x, W / 2 + e, 0, H, z0, z1);
  };
  mouvements.push({ objet: g, sens: "libre", jouer: mur });
  mur(0);
  return { groupe: g, matieres: { sol, murs, plafond }, liberer: () => unite.dispose() };
}

/** Les menuiseries d'avant (cadre blanc, volet) et d'après (cadres noirs fins) d'une ouverture. */
function menuiseries(a: Atelier, r: Rect, z: number, o: { volet?: number; depoli?: boolean; noir?: boolean; vantaux?: number }) {
  const [x0, x1, y0, y1] = r;
  const lot = new Lot();
  const cadre = o.noir ? "#1c1f23/0.4/0.3" : "#ece8de/0.5";
  const c = o.noir ? 0.05 : 0.07;
  const zc = z;
  lot.entre(cadre, x0, y0, zc - 0.04, x0 + c, y1, zc + 0.04);
  lot.entre(cadre, x1 - c, y0, zc - 0.04, x1, y1, zc + 0.04);
  lot.entre(cadre, x0, y1 - c, zc - 0.04, x1, y1, zc + 0.04);
  lot.entre(cadre, x0, y0, zc - 0.04, x1, y0 + c, zc + 0.04);
  const v = o.vantaux ?? 2;
  for (let i = 1; i < v; i++) {
    const x = x0 + ((x1 - x0) * i) / v;
    lot.entre(cadre, x - 0.025, y0, zc - 0.035, x + 0.025, y1, zc + 0.035);
  }
  if (o.volet) lot.entre("#7b5a3d/0.6", x0 + 0.02, y1 - o.volet * (y1 - y0), zc - 0.09, x1 - 0.02, y1, zc - 0.05);
  const g = new THREE.Group();
  g.add(lot.finir(a.palette));
  const verre = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0 - 2 * c, y1 - y0 - 2 * c), o.depoli ? a.verreDepoli : a.verre);
  verre.position.set((x0 + x1) / 2, (y0 + y1) / 2, zc);
  g.add(verre);
  return g;
}

/**
 * Le jardin autour de la pièce, en socle de maquette : pelouse, coupe de terre, haie de
 * thuyas au fond et deux arbres. `niveau` : le sol du jardin (un étage plus bas pour la
 * chambre, posée alors sur le rez-de-chaussée).
 */
function jardin(a: Atelier, W: number, D: number, e: number, niveau: number) {
  const g = new THREE.Group();
  const x0 = -W / 2 - 3.6, x1 = W / 2 + 3.6, z0 = -D - 6.5, z1 = 1.4;
  const terre = new THREE.Mesh(boiteGeo(x1 - x0, 1.3, z1 - z0, 1.4), a.terre);
  terre.position.set((x0 + x1) / 2, niveau - 0.69, (z0 + z1) / 2);
  const herbe = new THREE.Mesh(boiteGeo(x1 - x0, 0.02, z1 - z0, 4), a.herbe);
  herbe.position.set((x0 + x1) / 2, niveau - 0.04, (z0 + z1) / 2);
  herbe.receiveShadow = true;
  g.add(terre, herbe);
  if (niveau < -0.5) {
    // le rez-de-chaussée, sous la chambre
    const rdc = new THREE.Mesh(boiteGeo(W + 2 * e, -0.32 - niveau, D + e, 2), a.crepi);
    rdc.position.set(0, (niveau - 0.32) / 2, -(D + e) / 2);
    rdc.castShadow = rdc.receiveShadow = true;
    g.add(rdc);
  }
  const lot = new Lot();
  lot.entre("#3d5835/0.95", x0 + 0.2, niveau, z0 + 0.2, x1 - 0.2, niveau + 1.5, z0 + 0.9);
  lot.entre("#3d5835/0.95", x0 + 0.2, niveau, z0 + 0.9, x0 + 0.9, niveau + 1.5, z1 - 2.5);
  lot.entre("#3d5835/0.95", x1 - 0.9, niveau, z0 + 0.9, x1 - 0.2, niveau + 1.5, z1 - 2.5);
  for (const [x, z, r] of [[x0 + 2.2, z0 + 2.6, 1.6], [x1 - 2.4, z0 + 2.2, 1.2]]) {
    lot.cylindre("#4a3a2b", 0.12, 3.2, x, niveau, z, 8, 0.08);
    lot.ajouter("#5a7340/0.9", new THREE.IcosahedronGeometry(r, 3), x, niveau + 3.2 + r * 0.6, z);
  }
  const vegetal = lot.finir(a.palette);
  g.add(vegetal);
  return g;
}

/** Une direction de regard : `az` vers la droite, `el` vers le haut, en radians. */
const vue = (az: number, el: number) => new THREE.Vector3(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el));

/* ============================ les trois intérieurs ============================ */

export type Interieur = {
  groupe: THREE.Group;
  appliquer: (t: number) => void;
  /** La pièce coupée, à faire tenir à l'écran. */
  boite: THREE.Box3;
  /** D'où l'on regarde : direction du centre vers la caméra. */
  regard: THREE.Vector3;
  soleil: { position: THREE.Vector3; cible: THREE.Vector3; demi: number };
  ampoule: THREE.Vector3;
  /** La part de lumière d'après, selon la valeur de la bascule. */
  lumiere: (t: number) => number;
  liberer: () => void;
};

type Chantier = {
  a: Atelier;
  mouvements: Mouvement[];
  matieres: THREE.Material[];
  geometries: (() => void)[];
  groupe: THREE.Group;
};

function chantier(a: Atelier): Chantier {
  return { a, mouvements: [], matieres: [], geometries: [], groupe: new THREE.Group() };
}

function poser(c: Chantier, objet: THREE.Object3D, sens: "sort" | "entre", de: number, a: number) {
  c.groupe.add(objet);
  c.mouvements.push({ objet, sens, de, a });
  return objet;
}

/** Une cloison coupée (sa tranche, vers nous, est du poché), percée d'une porte. */
function cloison(c: Chantier, murs: THREE.Material, x: number, D: number, H: number, porte: [number, number], ouverte: number) {
  const g = socle(x, 0);
  const ep = 0.08;
  const morceaux: [number, number, number, number][] = [[-D, porte[0], 0, H], [porte[1], 0, 0, H], [porte[0], porte[1], 2.04, H]];
  for (const [z0, z1, y0, y1] of morceaux) {
    const m = new THREE.Mesh(boiteGeo(ep, y1 - y0, z1 - z0), [murs, murs, c.a.poche, murs, c.a.poche, murs]);
    m.position.set(0, (y0 + y1) / 2, (z0 + z1) / 2);
    m.castShadow = m.receiveShadow = true;
    g.add(m);
  }
  const vantail = new THREE.Mesh(boiteGeo(0.04, 2.0, porte[1] - porte[0] - 0.04), c.a.palette["#7a5232/0.6"]);
  const charniere = new THREE.Group();
  charniere.position.set(0, 0, porte[1] - 0.02);
  vantail.position.set(0, 1.0, -(porte[1] - porte[0] - 0.04) / 2);
  charniere.rotation.y = ouverte;
  charniere.add(vantail);
  vantail.castShadow = true;
  g.add(charniere);
  return g;
}

function finir(c: Chantier, env: ReturnType<typeof enveloppe>, reste: Omit<Interieur, "groupe" | "appliquer" | "liberer">, melanges: Melanges, phases: { sol: [number, number]; murs: [number, number]; plafond: [number, number] }): Interieur {
  c.groupe.add(env.groupe);
  const appliquer = (t: number) => {
    melanges.sol.value = lisse(phases.sol[0], phases.sol[1], t);
    melanges.murs.value = lisse(phases.murs[0], phases.murs[1], t);
    melanges.plafond.value = lisse(phases.plafond[0], phases.plafond[1], t);
    for (const m of c.mouvements) jouerMouvement(m, t);
  };
  appliquer(0);
  return {
    groupe: c.groupe,
    appliquer,
    ...reste,
    liberer: () => {
      c.groupe.traverse((n) => {
        if (n instanceof THREE.Mesh) n.geometry.dispose();
      });
      c.geometries.forEach((f) => f());
      env.liberer();
      c.matieres.forEach((m) => m.dispose());
    },
  };
}

/** Le plain-pied de 1974 : le couloir, la cuisine fermée ; puis tout s'ouvre sur l'extension en bois. */
function interieurPlainPied(a: Atelier): Interieur {
  const c = chantier(a);
  const W = 7.6, D = 6.2, H = 2.5, e = 0.22;
  const T = a.textures;
  const melanges: Melanges = { sol: { value: 0 }, murs: { value: 0 }, plafond: { value: 0 } };
  const env = enveloppe(a, {
    W, D, H, e,
    sol: [T.carrelage70, T.parquet, 0.8, 2],
    murs: [T.papierPeint, T.enduit, 0.8, 2],
    plafond: [T.lambris, T.enduit, 1, 2],
    ouvertures: [
      { avant: [-2.9, -1.7, 1.05, 2.1], apres: [-3.45, -0.6, 0, 2.42] },
      { avant: [-0.45, 0.45, 0, 2.15], apres: [-0.6, 0.6, 0, 2.42] },
      { avant: [1.7, 3.1, 0.9, 2.1], apres: [0.6, 3.45, 0, 2.42] },
    ],
    ouverture: [0.3, 0.56],
    isolation: { de: 0.34, a: 0.6, epaisseur: 0.14 },
  }, melanges, c.mouvements, c.matieres);
  const mursMelange = env.matieres.murs;

  // Avant : le couloir central, ses deux cloisons et leurs portes.
  poser(c, cloison(c, mursMelange, -0.7, D, H, [-4.7, -3.9], 1.1), "sort", 0.02, 0.22);
  poser(c, cloison(c, mursMelange, 0.7, D, H, [-2.3, -1.5], -0.9), "sort", 0.07, 0.27);
  // la cuisine fermée, sa table en formica
  poser(c, meuble(a, -3.8, -4.4, cuisine70(3.0)), "sort", 0.06, 0.24);
  poser(c, meuble(a, -2.1, -4.3, table(0.9, 0.7, 0.74, "#d88a3a/0.35", "#c9c9c4/0.2/0.8")), "sort", 0.08, 0.26);
  poser(c, meuble(a, -2.1, -3.75, chaise("#b5562a/0.5", "#c9c9c4/0.2/0.8"), Math.PI), "sort", 0.08, 0.26);
  poser(c, meuble(a, -1.7, -1.6, armoire(0.7, 0.6, 1.75, "#efe8d8/0.5")), "sort", 0.09, 0.27);
  // le séjour d'avant : canapé de velours brun, fauteuil orange, la télévision
  poser(c, meuble(a, 3.35, -3.2, canape(2.0, "#6e4630/0.95", "#3e2a1a", false), -Math.PI / 2), "sort", 0.1, 0.3);
  poser(c, meuble(a, 1.75, -5.0, fauteuil("#c8662c/0.95", "#4a3220")), "sort", 0.12, 0.3);
  poser(c, meuble(a, 1.25, -2.4, televiseur(), Math.PI / 2), "sort", 0.12, 0.3);
  poser(c, meuble(a, 2.3, -3.2, tapis(1.8, 2.2, "#8a4a26/0.95")), "sort", 0.12, 0.3);
  // les menuiseries d'origine, qui s'effacent quand le mur s'ouvre
  const zf = -D - e / 2;
  poser(c, menuiseries(a, [-2.9, -1.7, 1.05, 2.1], zf, { volet: 0.35 }), "sort", 0.28, 0.36);
  poser(c, menuiseries(a, [-0.45, 0.45, 0, 2.15], zf, { volet: 0.5, vantaux: 1 }), "sort", 0.28, 0.36);
  poser(c, menuiseries(a, [1.7, 3.1, 0.9, 2.1], zf, { volet: 0.55 }), "sort", 0.28, 0.36);

  // Après : l'extension en bois de 40 m², à toit plat, qui pousse côté jardin.
  const z0 = -D - e;
  const P = 4.4;
  const ext = new THREE.Group();
  ext.position.set(0, 0, z0);
  const lot = new Lot();
  lot.entre("#3a3d41/0.8", -3.85, 2.68, -P - 0.1, 3.85, 2.92, 0);
  for (let x = -3.55; x <= 3.56; x += 7.1 / 4) lot.entre("#1c1f23/0.4/0.3", x - 0.03, 0, -P - 0.03, x + 0.03, 2.62, -P + 0.03);
  lot.entre("#1c1f23/0.4/0.3", -3.55, 0, -P - 0.03, 3.55, 0.05, -P + 0.03);
  lot.entre("#1c1f23/0.4/0.3", -3.55, 2.57, -P - 0.03, 3.55, 2.62, -P + 0.03);
  const toitExt = lot.finir(a.palette);
  toitExt.children.filter((m) => m.name === "#3a3d41/0.8").forEach((m) => m.layers.set(1));
  ext.add(toitExt);
  // le plancher continue le parquet du séjour ; murs et plafond en lames de bois
  const parquetExt = matiereMelangee(T.parquet, T.parquet, [2, 2], { value: 0 }, [0.55, 0.55]);
  const boisExt = matiereMelangee(T.bardage, T.bardage, [1.2, 1.2], { value: 0 }, [0.7, 0.7]);
  c.matieres.push(parquetExt, boisExt);
  for (const [x0, y0, z1, x1, y1, z2, m] of [
    [-3.75, -0.32, -P, 3.75, 0, 0, parquetExt],
    [-3.75, 2.62, -P, 3.75, 2.68, 0, boisExt],
    [-3.75, 0, -P, -3.55, 2.62, 0, boisExt],
    [3.55, 0, -P, 3.75, 2.62, 0, boisExt],
  ] as const) {
    const piece = new THREE.Mesh(boiteGeo(x1 - x0, y1 - y0, z2 - z1), m);
    piece.position.set((x0 + x1) / 2, (y0 + y1) / 2, (z1 + z2) / 2);
    if (y0 > 2) piece.layers.set(1);
    ext.add(piece);
  }
  const vitrage = new THREE.Mesh(new THREE.PlaneGeometry(7.1, 2.6), a.verre);
  vitrage.position.set(0, 1.31, -P);
  ext.add(vitrage);
  ext.traverse((n) => { if (n instanceof THREE.Mesh) { n.castShadow = true; n.receiveShadow = true; } });
  c.groupe.add(ext);
  c.mouvements.push({
    objet: ext,
    sens: "libre",
    jouer: (t) => {
      const k = aller(lisse(0.3, 0.6, t));
      ext.visible = k > 0.001;
      ext.scale.z = Math.max(0.001, k);
    },
  });

  // la cuisine ouverte sur le séjour, l'îlot, les suspensions
  poser(c, meuble(a, -3.8, -3.4, cuisineNeuve(3.6, 0.9)), "entre", 0.56, 0.74);
  poser(c, meuble(a, -1.75, -3.4, ilot(1.0, 2.0), Math.PI / 2), "entre", 0.6, 0.78);
  [-4.0, -3.4, -2.8].forEach((z, i) => poser(c, meuble(a, -1.05, z, tabouret()), "entre", 0.66 + i * 0.03, 0.8 + i * 0.03));
  [-3.9, -2.9].forEach((z, i) => {
    const s = meuble(a, -1.75, z, suspension(1.0, "#1f2226/0.5"));
    s.position.y = H - 1.0;
    poser(c, s, "entre", 0.7 + i * 0.03, 0.85 + i * 0.03);
  });
  // le séjour, tourné vers le jardin
  poser(c, meuble(a, 2.4, -1.4, canape(2.4, "#d6d0c4/0.95", "#2b2f33", true), Math.PI), "entre", 0.64, 0.84);
  poser(c, meuble(a, 2.4, -2.6, tapis(2.8, 2.0, "#c9c1b2/0.95")), "entre", 0.62, 0.78);
  poser(c, meuble(a, 2.4, -2.6, table(1.0, 0.6, 0.38, "#c9a57a/0.5", "#2b2f33")), "entre", 0.68, 0.86);
  poser(c, meuble(a, 3.1, -4.3, fauteuil("#e9e4da/0.95", "#c9a57a/0.5"), -Math.PI / 3), "entre", 0.7, 0.88);
  poser(c, meuble(a, 3.3, -5.6, plante(1.6)), "entre", 0.74, 0.92);
  poser(c, meuble(a, 1.2, -0.7, lampadaire("#1f2226/0.4/0.4", "#efe8da/0.7")), "entre", 0.74, 0.92);
  // la table, dans l'extension
  poser(c, meuble(a, 0, z0 - 2.2, table(2.0, 0.95, 0.75, "#c9a57a/0.5", "#2b2f33")), "entre", 0.72, 0.9);
  [-0.6, 0.6].forEach((x, i) => {
    poser(c, meuble(a, x, z0 - 1.55, chaise("#2b2f33/0.6", "#2b2f33"), Math.PI), "entre", 0.76 + i * 0.02, 0.92);
    poser(c, meuble(a, x, z0 - 2.85, chaise("#2b2f33/0.6", "#2b2f33")), "entre", 0.77 + i * 0.02, 0.93);
  });

  c.groupe.add(jardin(a, W, D + e + P, e, 0));

  return finir(c, env, {
    boite: new THREE.Box3(new THREE.Vector3(-W / 2 - e - 0.2, -0.32, -D - e - P), new THREE.Vector3(W / 2 + e + 0.2, H, 0)),
    regard: vue(0.36, 0.66),
    soleil: { position: new THREE.Vector3(-5, 6.5, -D - 16), cible: new THREE.Vector3(1.2, 0, -D + 1.5), demi: 9 },
    ampoule: new THREE.Vector3(0, H - 0.35, -3.0),
    lumiere: (t) => lisse(0.3, 0.72, t),
  }, melanges, { sol: [0.36, 0.72], murs: [0.4, 0.78], plafond: [0.45, 0.84] });
}

/** Le sous-sol de 1976 : le garage, sa voiture, son établi ; puis le séjour de plain-pied avec le jardin. */
function interieurSousSol(a: Atelier): Interieur {
  const c = chantier(a);
  const W = 7.0, D = 7.0, H = 2.35, e = 0.22;
  const T = a.textures;
  const melanges: Melanges = { sol: { value: 0 }, murs: { value: 0 }, plafond: { value: 0 } };
  const escalier = { x0: 2.42, x1: 3.5, n: 12 };
  const giron = 0.27;
  const debut = -0.85;
  const env = enveloppe(a, {
    W, D, H, e,
    sol: [T.betonGarage, T.parquet, 3, 2],
    murs: [T.parpaing, T.enduit, 1, 2],
    plafond: [T.beton, T.enduit, 2, 2],
    ouvertures: [
      { avant: [-2.9, -2.2, 1.72, 2.08], apres: [-3.15, -1.15, 0, 2.2] },
      { avant: [-1.2, 1.2, 0, 2.05], apres: [-1.15, 1.15, 0, 2.2] },
      { avant: [2.2, 2.9, 1.72, 2.08], apres: [1.15, 3.15, 0, 2.2] },
    ],
    ouverture: [0.3, 0.52],
    isolation: { de: 0.26, a: 0.5, epaisseur: 0.12 },
    tremie: { rect: [escalier.x0 - 0.02, escalier.x1, debut - escalier.n * giron - 0.15, debut - 2.2], a: 0.64 },
  }, melanges, c.mouvements, c.matieres);
  const zf = -D - e / 2;

  // Avant : la porte basculante, qui se lève…
  const porte = new THREE.Group();
  porte.position.set(0, 2.05, zf + 0.06);
  const panneau = new THREE.Mesh(boiteGeo(2.4, 2.05, 0.05, 1), new THREE.MeshStandardMaterial({ map: P.nervures("#8f6e4c"), roughness: 0.55, metalness: 0.2 }));
  c.matieres.push(panneau.material as THREE.Material);
  c.geometries.push(() => ((panneau.material as THREE.MeshStandardMaterial).map?.dispose()));
  panneau.position.set(0, -1.025, 0);
  panneau.castShadow = true;
  porte.add(panneau);
  c.groupe.add(porte);
  c.mouvements.push({
    objet: porte,
    sens: "libre",
    jouer: (t) => {
      const k = aller(lisse(0.03, 0.2, t));
      porte.rotation.x = k * 1.45;
      const f = lisse(0.3, 0.36, t);
      porte.visible = f < 1;
      porte.scale.setScalar(Math.max(0.001, 1 - f));
    },
  });
  // … et la voiture qui s'en va, à reculons, par le jardin.
  const { g: auto, roues } = voiture(a);
  auto.position.set(-0.05, 0, -4.3);
  c.groupe.add(auto);
  c.mouvements.push({
    objet: auto,
    sens: "libre",
    jouer: (t) => {
      const k = lisse(0.14, 0.42, t);
      const d = entreeDouce(k) * 13;
      auto.position.z = -4.3 - d;
      auto.visible = k < 0.999;
      roues.forEach((r) => (r.rotation.x = -d / 0.3));
    },
  });
  // l'établi, les étagères et leurs cartons, les bidons
  poser(c, meuble(a, 3.5, -4.4, (l) => {
    l.entre("#8a6a45/0.7", -0.65, 0.84, -1.1, 0, 0.9, 1.1);
    l.entre("#5a4632/0.8", -0.6, 0, -1.05, -0.05, 0.84, -0.98);
    l.entre("#5a4632/0.8", -0.6, 0, 0.98, -0.05, 0.84, 1.05);
    l.entre("#a68f6a/0.9", -0.04, 1.05, -1.0, 0, 1.95, 1.0);
    for (let k = 0; k < 9; k++) l.entre(k % 3 ? "#3d3f41/0.4/0.6" : "#b23a2a/0.5", -0.08, 1.2 + (k % 3) * 0.24, -0.85 + Math.floor(k / 3) * 0.6, -0.04, 1.36 + (k % 3) * 0.24, -0.75 + Math.floor(k / 3) * 0.6);
  }), "sort", 0.12, 0.3);
  poser(c, meuble(a, -3.5, -2.0, (l) => {
    for (const y of [0.05, 0.75, 1.45]) l.entre("#7a6a52/0.8", 0, y, -1.0, 0.45, y + 0.03, 1.0);
    l.entre("#4a4038/0.8", 0, 0, -1.0, 0.45, 2.0, -0.97);
    l.entre("#4a4038/0.8", 0, 0, 0.97, 0.45, 2.0, 1.0);
    [[0.08, -0.9], [0.78, -0.2], [0.08, 0.3], [1.48, -0.7], [0.78, 0.45], [1.48, 0.2]].forEach(([y, z], i) => l.entre(i % 2 ? "#a8835a/0.9" : "#b8956a/0.9", 0.04, y, z, 0.42, y + 0.36 + (i % 3) * 0.08, z + 0.42));
  }), "sort", 0.15, 0.32);
  poser(c, meuble(a, 2.6, -6.2, (l) => {
    l.cylindre("#5d6e4a/0.5/0.4", 0.16, 0.42, 0, 0, 0);
    l.cylindre("#8c2a20/0.5/0.4", 0.14, 0.36, 0.38, 0, 0.1);
  }), "sort", 0.16, 0.32);
  const ampoule = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 8), a.lumineux);
  ampoule.position.set(0, H - 0.32, -3.6);
  const fil = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.3, 6), a.palette["#1a1a1a"]);
  fil.position.set(0, H - 0.15, -3.6);
  const ampouleG = new THREE.Group();
  ampouleG.add(ampoule, fil);
  c.groupe.add(ampouleG);
  c.mouvements.push({ objet: ampouleG, sens: "libre", jouer: (t) => { ampouleG.visible = t < 0.5; } });
  // les soupiraux
  poser(c, menuiseries(a, [-2.9, -2.2, 1.72, 2.08], zf, { vantaux: 1 }), "sort", 0.28, 0.34);
  poser(c, menuiseries(a, [2.2, 2.9, 1.72, 2.08], zf, { vantaux: 1 }), "sort", 0.28, 0.34);

  // Après : la grande baie à la place de la porte de garage.
  const baie = menuiseries(a, [-3.15, 3.15, 0, 2.2], zf, { noir: true, vantaux: 4 });
  poser(c, baie, "entre", 0.5, 0.6);
  // le séjour, tourné vers le jardin
  poser(c, meuble(a, -0.2, -2.6, tapis(3.2, 2.4, "#cfc6b6/0.95")), "entre", 0.55, 0.7);
  poser(c, meuble(a, -0.2, -1.55, canape(2.5, "#d9d2c5/0.95", "#2b2f33", true), Math.PI), "entre", 0.58, 0.78);
  poser(c, meuble(a, -0.2, -2.9, table(1.1, 0.6, 0.36, "#c9a57a/0.5", "#2b2f33")), "entre", 0.62, 0.8);
  poser(c, meuble(a, -2.35, -3.3, fauteuil("#b8643a/0.95", "#c9a57a/0.5"), Math.PI / 3), "entre", 0.64, 0.82);
  poser(c, meuble(a, -3.5, -4.6, (l) => {
    l.entre("#c9a57a/0.5", 0, 0, -1.4, 0.42, 0.75, 1.4);
    for (const z of [-1.0, -0.2, 0.6]) l.entre("#e9e4da/0.6", 0.05, 0.75, z, 0.35, 0.75 + 0.22 + (z + 1) * 0.08, z + 0.3);
  }), "entre", 0.6, 0.8);
  poser(c, meuble(a, -2.9, -6.3, plante(1.7)), "entre", 0.7, 0.88);
  poser(c, meuble(a, 1.6, -1.0, lampadaire("#1f2226/0.4/0.4", "#efe8da/0.7")), "entre", 0.7, 0.88);
  // l'escalier intérieur : il se construit marche après marche jusqu'au plafond
  const hm = H / escalier.n;
  for (let i = 0; i < escalier.n; i++) {
    const marche = meuble(a, (escalier.x0 + escalier.x1) / 2, debut - i * giron, (l) => {
      l.entre("#c9a57a/0.5", -0.52, (i + 1) * hm - 0.05, -giron / 2 - 0.02, 0.52, (i + 1) * hm, giron / 2);
      l.entre("#2b2f33/0.5/0.4", -0.56, Math.max(0, (i + 1) * hm - 0.3), -giron / 2, -0.52, (i + 1) * hm, giron / 2);
    });
    poser(c, marche, "entre", 0.66 + i * 0.022, 0.7 + i * 0.022);
  }
  const rampe = meuble(a, escalier.x0 - 0.04, debut, (l) => {
    for (let i = 0; i <= escalier.n; i += 3) l.entre("#2b2f33/0.5/0.4", -0.015, i * hm, -i * giron - 0.015, 0.015, i * hm + 0.9, -i * giron + 0.015);
    const g = boiteGeo(0.03, 0.04, Math.hypot(escalier.n * giron, H) + 0.1);
    g.rotateX(Math.atan2(H, escalier.n * giron));
    l.ajouter("#2b2f33/0.5/0.4", g, 0, H / 2 + 0.9, -(escalier.n * giron) / 2);
  });
  poser(c, rampe, "entre", 0.92, 0.98);

  c.groupe.add(jardin(a, W, D + e, e, 0));

  return finir(c, env, {
    boite: new THREE.Box3(new THREE.Vector3(-W / 2 - e - 0.2, -0.32, -D - e), new THREE.Vector3(W / 2 + e + 0.2, H, 0)),
    regard: vue(-0.36, 0.66),
    soleil: { position: new THREE.Vector3(4.5, 6, -D - 15), cible: new THREE.Vector3(-1, 0, -D + 2), demi: 9 },
    ampoule: new THREE.Vector3(0, H - 0.4, -3.6),
    lumiere: (t) => lisse(0.3, 0.68, t),
  }, melanges, { sol: [0.36, 0.7], murs: [0.4, 0.74], plafond: [0.44, 0.78] });
}

/** L'étage de 1978 : salle de bains vert avocat et chambre sous un toit mal isolé ; puis isolée, ouverte, lumineuse. */
function interieurEtage(a: Atelier): Interieur {
  const c = chantier(a);
  const W = 7.4, D = 4.6, H = 2.45, e = 0.22;
  const T = a.textures;
  const melanges: Melanges = { sol: { value: 0 }, murs: { value: 0 }, plafond: { value: 0 } };
  const env = enveloppe(a, {
    W, D, H, e,
    sol: [T.moquette, T.parquet, 1, 2],
    murs: [T.papierPeint, T.enduit, 0.8, 2],
    plafond: [T.lambris, T.enduit, 1, 2],
    ouvertures: [
      { avant: [-2.85, -2.15, 1.4, 2.0], apres: [-3.25, -1.35, 0.2, 2.3] },
      { avant: [0.5, 1.7, 0.95, 2.05], apres: [0.0, 2.4, 0.2, 2.3] },
    ],
    ouverture: [0.3, 0.56],
    epaissirFond: { de: 0.04, a: 0.3, plus: 0.17 },
    isolation: { de: 0.04, a: 0.3, epaisseur: 0.14, bardage: 0.04 },
  }, melanges, c.mouvements, c.matieres);
  const mursMelange = env.matieres.murs;
  const zf = -D - e / 2;

  // Avant : la salle de bains derrière sa cloison — elle descendra au rez-de-chaussée.
  poser(c, cloison(c, mursMelange, -1.2, D, H, [-1.5, -0.7], 0.9), "sort", 0.6, 0.78);
  const faience = new THREE.MeshStandardMaterial({ map: T.faience, roughness: 0.3 });
  c.matieres.push(faience);
  const carreaux = socle(0, 0);
  for (const [x0, x1, z0, z1] of [[-3.7, -3.68, -D, 0], [-3.7, -1.24, -D + 0.01, -D + 0.03], [-1.26, -1.24, -D, -1.6]] as const) {
    const m = new THREE.Mesh(boiteGeo(x1 - x0, 1.32, z1 - z0, 0.6), faience);
    m.position.set((x0 + x1) / 2, 0.66, (z0 + z1) / 2);
    m.receiveShadow = true;
    carreaux.add(m);
  }
  poser(c, carreaux, "sort", 0.62, 0.8);
  poser(c, meuble(a, -3.7, -3.75, baignoire()), "sort", 0.62, 0.82);
  poser(c, meuble(a, -1.55, -3.1, lavabo(), -Math.PI / 2), "sort", 0.64, 0.84);
  poser(c, menuiseries(a, [-2.85, -2.15, 1.4, 2.0], zf, { depoli: true, vantaux: 1 }), "sort", 0.28, 0.36);
  // la chambre : lit au couvre-lit brun, armoire, radiateur sous la petite fenêtre
  poser(c, meuble(a, 2.75, -2.3, lit(1.4, 1.9, "#efe6d2/0.9", "#7a4a2a/0.95", "#5a3b24/0.6"), -Math.PI / 2), "sort", 0.58, 0.76);
  poser(c, meuble(a, 3.35, -3.6, table(0.45, 0.4, 0.5, "#5a3b24/0.6", "#5a3b24/0.6")), "sort", 0.58, 0.76);
  poser(c, meuble(a, -0.75, -3.9, armoire(1.1, 0.6, 2.0, "#6b452b/0.6"), Math.PI / 2), "sort", 0.6, 0.78);
  poser(c, meuble(a, 1.1, -D + 0.12, radiateur(1.0)), "sort", 0.3, 0.42);
  poser(c, menuiseries(a, [0.5, 1.7, 0.95, 2.05], zf, { volet: 0.6 }), "sort", 0.28, 0.36);

  // Après : deux grandes fenêtres à cadres noirs, plein sud
  poser(c, menuiseries(a, [-3.25, -1.35, 0.2, 2.3], zf - 0.1, { noir: true, vantaux: 2 }), "entre", 0.54, 0.62);
  poser(c, menuiseries(a, [0.0, 2.4, 0.2, 2.3], zf - 0.1, { noir: true, vantaux: 2 }), "entre", 0.55, 0.63);
  // et la chambre d'aujourd'hui : lit clair, bureau sous la fenêtre, coin lecture
  poser(c, meuble(a, 2.7, -2.4, lit(1.6, 2.0, "#f4f2ee/0.95", "#a9b0b5/0.95", "#c9a57a/0.5"), -Math.PI / 2), "entre", 0.7, 0.88);
  poser(c, meuble(a, 3.4, -3.85, table(0.45, 0.4, 0.5, "#c9a57a/0.5", "#2b2f33")), "entre", 0.74, 0.9);
  poser(c, meuble(a, 2.3, -2.4, tapis(2.6, 2.4, "#d4ccbd/0.95")), "entre", 0.68, 0.84);
  poser(c, meuble(a, -2.3, -3.95, table(1.5, 0.65, 0.75, "#c9a57a/0.5", "#2b2f33")), "entre", 0.72, 0.9);
  poser(c, meuble(a, -2.3, -3.2, chaise("#2b2f33/0.6", "#2b2f33"), Math.PI), "entre", 0.76, 0.92);
  poser(c, meuble(a, -0.4, -1.6, fauteuil("#b8643a/0.95", "#c9a57a/0.5"), Math.PI / 5), "entre", 0.76, 0.92);
  poser(c, meuble(a, 0.4, -1.0, lampadaire("#1f2226/0.4/0.4", "#efe8da/0.7")), "entre", 0.78, 0.94);
  poser(c, meuble(a, -3.25, -0.8, plante(1.5)), "entre", 0.8, 0.95);

  c.groupe.add(jardin(a, W, D + e + 0.2, e, -2.75));

  return finir(c, env, {
    boite: new THREE.Box3(new THREE.Vector3(-W / 2 - e - 0.25, -0.32, -D - e), new THREE.Vector3(W / 2 + e + 0.25, H, 0)),
    regard: vue(0.36, 0.66),
    soleil: { position: new THREE.Vector3(-4.5, 7.5, -D - 13), cible: new THREE.Vector3(1.0, 0, -D + 2), demi: 8 },
    ampoule: new THREE.Vector3(1.2, H - 0.4, -2.3),
    lumiere: (t) => lisse(0.3, 0.66, t),
  }, melanges, { sol: [0.38, 0.72], murs: [0.42, 0.78], plafond: [0.46, 0.82] });
}

export const INTERIEURS: Record<Modele, (a: Atelier) => Interieur> = { plain: interieurPlainPied, "sous-sol": interieurSousSol, etage: interieurEtage };
