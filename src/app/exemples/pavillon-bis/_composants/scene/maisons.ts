import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Lot, boiteGeo, pignonGeo, toitDeuxPans, toitQuatrePans } from "./batisseur";
import * as P from "./peintures";
import type { Modele } from "../donnees";

// Les trois pavillons des années 70, dehors, en maquette : le plain-pied (1974), le
// pavillon sur sous-sol, garage en bas et perron (1976), et le pavillon à étage (1978).
// Tuiles mécaniques, crépi, volets roulants bruns, porte de garage basculante, petites
// fenêtres, haie de thuyas et muret : le lotissement tel qu'il est. Chacun sur son socle,
// avec sa coupe de terre, comme une maquette d'architecte.
//
// Chaque maison a aussi sa « deuxième version » (ce qu'on a fait de la même, page du
// projet) : l'extension en bois du plain-pied, le sous-sol ouvert sur le jardin, la
// façade isolée et bardée de bois du pavillon à étage. On la découvre en ressortant.

export type MatieresDehors = { matieres: Record<string, THREE.Material>; textures: THREE.Texture[] };

/** Taille du motif de chaque matière, en mètres. */
const ECHELLE: Record<string, number> = {
  crepi: 2, crepiGris: 2, crepiBas: 2, volet: 1, garage: 1, bardage: 1.2, herbe: 4, haie: 1.5, terre: 1.4, beton: 2, dalle: 1.2,
};

export function creerMatieresDehors(): MatieresDehors {
  const textures: THREE.Texture[] = [];
  const t = (x: THREE.Texture) => (textures.push(x), x);
  const std = (o: THREE.MeshStandardMaterialParameters) => new THREE.MeshStandardMaterial({ roughness: 0.9, ...o });
  const matieres: Record<string, THREE.Material> = {
    crepi: std({ map: t(P.crepi("#d8c6a0", 3)) }),
    crepiBas: std({ map: t(P.crepi("#c3b8a4", 4)) }),
    crepiGris: std({ map: t(P.crepi("#9c968c", 5)) }),
    tuiles: std({ map: t(P.tuiles()), roughness: 0.82 }),
    sousToit: std({ color: "#e4dccb" }),
    rives: std({ color: "#5a3f2c", roughness: 0.7 }),
    volet: std({ map: t(P.lamelles("#7b5a3d")), roughness: 0.6 }),
    cadre: std({ color: "#ebe6db", roughness: 0.55 }),
    cadreBrun: std({ color: "#5b412e", roughness: 0.6 }),
    cadreNoir: std({ color: "#1c1f23", roughness: 0.4, metalness: 0.35 }),
    vitre: std({ color: "#2a3640", roughness: 0.05, metalness: 0.1, envMapIntensity: 1.6 }),
    vitreNeuve: std({ color: "#3a4c5a", roughness: 0.03, metalness: 0.15, envMapIntensity: 2 }),
    porte: std({ color: "#6b452b", roughness: 0.6 }),
    garage: std({ map: t(P.nervures("#8f6e4c")), roughness: 0.55, metalness: 0.2 }),
    zinc: std({ color: "#8a8f92", roughness: 0.35, metalness: 0.65 }),
    beton: std({ map: t(P.beton()) }),
    dalle: std({ map: t(P.beton("#c4bdb0")) }),
    appui: std({ color: "#cdc5b6" }),
    herbe: std({ map: t(P.pelouse()) }),
    haie: std({ map: t(P.haie()) }),
    terre: std({ map: t(P.strates()), roughness: 1 }),
    tronc: std({ color: "#4a3a2b" }),
    feuillage: std({ color: "#566f3c", roughness: 0.85 }),
    feuillageClair: std({ color: "#6f8a45", roughness: 0.85 }),
    bardage: std({ map: t(P.bardage()), roughness: 0.75 }),
    toitPlat: std({ color: "#3a3d41", roughness: 0.8 }),
    ferronnerie: std({ color: "#2a2724", roughness: 0.5, metalness: 0.5 }),
    noir: new THREE.MeshBasicMaterial({ color: "#0b0c0e" }),
  };
  return { matieres, textures };
}

/* ------------------------------ façades ------------------------------ */

/**
 * Une façade : on y place les pièces en coordonnées de façade (u vers la droite vu de
 * dehors, v vers le haut, w vers l'extérieur), elle les tourne et les pose.
 */
class Facade {
  constructor(private lot: Lot, private rot: number, private ox: number, private oz: number, private dw = 0) {}

  /** La matrice qui pose une pièce de la façade dans la maison. */
  get matrice() {
    return new THREE.Matrix4().makeTranslation(this.ox, 0, this.oz).multiply(new THREE.Matrix4().makeRotationY(this.rot));
  }

  geo(u0: number, v0: number, w0: number, u1: number, v1: number, w1: number, echelle = 1) {
    const g = boiteGeo(Math.abs(u1 - u0), Math.abs(v1 - v0), Math.abs(w1 - w0), echelle);
    g.translate((u0 + u1) / 2, (v0 + v1) / 2, (w0 + w1) / 2 + this.dw);
    g.applyMatrix4(this.matrice);
    return g;
  }

  boite(cle: string, u0: number, v0: number, w0: number, u1: number, v1: number, w1: number) {
    this.lot.ajouter(cle, this.geo(u0, v0, w0, u1, v1, w1, ECHELLE[cle] ?? 1));
    return this;
  }

  /** Une fenêtre de l'époque : cadre blanc, appui, volet roulant à moitié baissé et son coffre. */
  fenetre(u0: number, u1: number, v0: number, v1: number, o: { volet?: number; coffre?: boolean; cadre?: string; deuxVantaux?: boolean; appui?: boolean } = {}) {
    const { volet = 0.4, coffre = true, cadre = "cadre", deuxVantaux = true, appui = true } = o;
    const c = 0.07;
    this.boite("vitre", u0, v0, -0.03, u1, v1, 0.01);
    this.boite(cadre, u0, v0, 0, u0 + c, v1, 0.06);
    this.boite(cadre, u1 - c, v0, 0, u1, v1, 0.06);
    this.boite(cadre, u0, v1 - c, 0, u1, v1, 0.06);
    this.boite(cadre, u0, v0, 0, u1, v0 + c, 0.06);
    if (deuxVantaux) this.boite(cadre, (u0 + u1) / 2 - 0.035, v0, 0, (u0 + u1) / 2 + 0.035, v1, 0.055);
    if (volet > 0) this.boite("volet", u0 + 0.02, v1 - volet * (v1 - v0), 0.06, u1 - 0.02, v1, 0.085);
    if (coffre) this.boite("cadreBrun", u0 - 0.03, v1, 0, u1 + 0.03, v1 + 0.2, 0.16);
    if (appui) this.boite("appui", u0 - 0.08, v0 - 0.07, 0, u1 + 0.08, v0, 0.16);
    return this;
  }

  /** Une baie d'aujourd'hui : cadres noirs fins, vitrage du sol presque au plafond. */
  baie(u0: number, u1: number, v0: number, v1: number, vantaux = 3) {
    const c = 0.05;
    this.boite("vitreNeuve", u0, v0, -0.02, u1, v1, 0.02);
    this.boite("cadreNoir", u0, v0, 0, u0 + c, v1, 0.07);
    this.boite("cadreNoir", u1 - c, v0, 0, u1, v1, 0.07);
    this.boite("cadreNoir", u0, v1 - c, 0, u1, v1, 0.07);
    this.boite("cadreNoir", u0, v0, 0, u1, v0 + c, 0.07);
    for (let i = 1; i < vantaux; i++) {
      const u = u0 + ((u1 - u0) * i) / vantaux;
      this.boite("cadreNoir", u - 0.025, v0, 0, u + 0.025, v1, 0.07);
    }
    return this;
  }

  /** Une porte d'entrée en bois, à petits carreaux. */
  porte(u0: number, u1: number, v0: number, v1: number) {
    this.boite("cadreBrun", u0 - 0.07, v0, 0, u0, v1 + 0.07, 0.06);
    this.boite("cadreBrun", u1, v0, 0, u1 + 0.07, v1 + 0.07, 0.06);
    this.boite("cadreBrun", u0, v1, 0, u1, v1 + 0.07, 0.06);
    return this;
  }

  /** Le vantail de la porte, avec ses quatre carreaux : rendu à part s'il doit s'ouvrir. */
  vantail(lot: Lot, u0: number, u1: number, v0: number, v1: number, w = 0) {
    const l = u1 - u0;
    lot.ajouter("porte", this.geo(u0, v0, w, u1, v1, w + 0.05));
    for (let i = 0; i < 2; i++)
      for (let j = 0; j < 2; j++) {
        const a = u0 + l * 0.2 + i * l * 0.32;
        const b = v1 - 0.28 - j * 0.3;
        lot.ajouter("vitre", this.geo(a, b - 0.22, w + 0.05, a + l * 0.26, b, w + 0.058));
      }
  }
}

/* ------------------------------ jardin ------------------------------ */

/** Une couronne de maquette : une sphère douce, à peine cabossée. */
function couronne(r: number, hasard: () => number) {
  const g = mergeVertices(new THREE.IcosahedronGeometry(r, 4).deleteAttribute("normal").deleteAttribute("uv"));
  const pos = g.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  const phases = [hasard() * 6, hasard() * 6, hasard() * 6];
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i).normalize();
    const k = 1 + 0.07 * Math.sin(v.x * 3 + phases[0]) * Math.sin(v.y * 3 + phases[1]) + 0.05 * Math.sin(v.z * 4 + phases[2]);
    v.multiplyScalar(r * k);
    v.y *= 0.9;
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  // des UV vides : le lot fond ensemble des pièces aux mêmes attributs
  g.setAttribute("uv", new THREE.Float32BufferAttribute(new Float32Array(pos.count * 2), 2));
  g.computeVertexNormals();
  return g;
}

/** Un arbre : un tronc fin, une couronne et une plus petite à côté. */
function arbre(lot: Lot, x: number, z: number, h: number, r: number, graine: number, cle = "feuillage") {
  const hasard = P.alea(graine);
  lot.cylindre("tronc", 0.14 * (h / 5), h * 0.6, x, 0, z, 8, 0.09 * (h / 5));
  lot.ajouter(cle, couronne(r, hasard), x, h * 0.55 + r * 0.72, z);
  lot.ajouter(cle, couronne(r * 0.6, hasard), x + r * 0.6, h * 0.55 + r * 0.3, z + r * 0.25);
}

type Parcelle = {
  allee: [number, number];        // l'allée du garage, de x à x
  chemin: [number, number];       // le chemin de la porte
  garageZ: number;                 // où s'arrête l'allée (la façade)
  cheminZ: number;
  muret: [number, number][];      // les morceaux de muret de la rue
  arbres: [number, number, number, number][]; // x, z, hauteur, rayon
  haieDroite?: number;            // jusqu'où va la haie de droite (vers le fond)
};

export const SOCLE = { l: 18, p: 15, h: 1.4 };

function parcelle(lot: Lot, o: Parcelle, graine: number) {
  const { l, p, h } = SOCLE;
  lot.entre("terre", -l / 2, -h, -p / 2, l / 2, -0.02, p / 2);
  lot.ajouter("herbe", boiteGeo(l, 0.02, p, 4), 0, -0.01, 0);
  // l'allée du garage et le chemin, en béton et en dalles
  lot.entre("beton", o.allee[0], -0.005, o.garageZ, o.allee[1], 0.025, p / 2);
  for (let z = o.cheminZ + 0.15; z < p / 2 - 0.3; z += 0.7) lot.entre("dalle", o.chemin[0], -0.005, z, o.chemin[1], 0.03, z + 0.5);
  // le muret de la rue, et la haie de thuyas sur les trois autres côtés
  for (const [a, b] of o.muret) {
    lot.entre("crepiGris", a, 0, p / 2 - 0.32, b, 0.55, p / 2 - 0.08);
    lot.entre("appui", a - 0.02, 0.55, p / 2 - 0.35, b + 0.02, 0.62, p / 2 - 0.05);
  }
  lot.entre("haie", -l / 2 + 0.1, 0, -p / 2 + 0.1, -l / 2 + 0.8, 1.5, p / 2 - 0.5);
  lot.entre("haie", l / 2 - 0.8, 0, -p / 2 + 0.1, l / 2 - 0.1, 1.5, o.haieDroite ?? p / 2 - 0.5);
  lot.entre("haie", -l / 2 + 0.8, 0, -p / 2 + 0.1, l / 2 - 0.8, 1.5, -p / 2 + 0.8);
  o.arbres.forEach(([x, z, ha, r], i) => arbre(lot, x, z, ha, r, graine + i, i % 2 ? "feuillageClair" : "feuillage"));
}

/** Gouttière pendante et descente, le long d'un égout de façade (axe x). */
function gouttiere(lot: Lot, x0: number, x1: number, y: number, z: number, descentes: number[]) {
  const g = new THREE.CylinderGeometry(0.07, 0.07, x1 - x0, 8);
  g.rotateZ(Math.PI / 2);
  lot.ajouter("zinc", g, (x0 + x1) / 2, y, z);
  for (const x of descentes) lot.cylindre("zinc", 0.045, y, x, 0, z - 0.05, 8);
}

/* ------------------------------ les maisons ------------------------------ */

export type MaisonDehors = {
  groupe: THREE.Group;
  /** La maison elle-même (sans le jardin) : cachée quand on est dedans. */
  coque: THREE.Group;
  avant: THREE.Object3D[];
  apres: THREE.Object3D[];
  /** Ce qui s'ouvre pour nous laisser entrer, 0 → 1. */
  ouvrir: (k: number) => void;
  /** Le seuil : son centre et la direction de dehors, dans le repère de la maison. */
  seuil: { point: THREE.Vector3; normale: THREE.Vector3 };
  /** Ce qu'il faut faire tenir à l'écran, dans le repère de la maison. */
  boite: THREE.Box3;
};

function assembler(m: MatieresDehors, lots: { commun: Lot; maison: Lot; avant: Lot; apres: Lot }) {
  const groupe = new THREE.Group();
  const coque = new THREE.Group();
  const jardin = lots.commun.finir(m.matieres);
  const maison = lots.maison.finir(m.matieres);
  const avant = lots.avant.finir(m.matieres);
  const apres = lots.apres.finir(m.matieres);
  apres.visible = false;
  coque.add(maison, avant, apres);
  groupe.add(jardin, coque);
  return { groupe, coque, avant, apres };
}

/** Le plain-pied de 1974 : long et bas, toit à quatre pans, garage accolé. */
function plainPied(m: MatieresDehors): MaisonDehors {
  const commun = new Lot();
  const maison = new Lot();
  const avant = new Lot();
  const apres = new Lot();
  const x0 = -6.2, x1 = 4.8, z0 = -3.6, z1 = 3.4, haut = 2.8;
  maison.entre("crepi", x0, 0, z0, x1, haut, z1, 2);
  maison.entre("crepiGris", x0 - 0.03, 0, z0 - 0.03, x1 + 0.03, 0.4, z1 + 0.03, 2);
  maison.toit(toitQuatrePans(x1 - x0, z1 - z0, 0.62, 0.5), { dessus: "tuiles", dessous: "sousToit", rives: "rives" }, (x0 + x1) / 2, haut + 0.02, (z0 + z1) / 2);
  maison.entre("crepi", 1.4, 3.6, -1.6, 2.0, 5.55, -1.0, 2);
  maison.entre("appui", 1.32, 5.55, -1.68, 2.08, 5.68, -0.92);
  gouttiere(maison, x0 - 0.5, x1 + 0.5, haut - 0.3, z1 + 0.52, [x0 - 0.3, x1 + 0.3]);

  const f = new Facade(maison, 0, 0, z1);
  // la porte du garage, la porte d'entrée et sa marquise, trois fenêtres
  f.boite("garage", -5.7, 0, 0, -3.4, 2.05, 0.04).boite("cadreBrun", -5.78, 0, 0, -5.7, 2.12, 0.07).boite("cadreBrun", -3.4, 0, 0, -3.32, 2.12, 0.07).boite("cadreBrun", -5.78, 2.05, 0, -3.32, 2.12, 0.07);
  f.porte(-2.5, -1.55, 0.12, 2.2);
  f.boite("noir", -2.5, 0.12, 0.0, -1.55, 2.2, 0.004);
  f.boite("beton", -2.85, 0, 0, -1.2, 0.12, 0.75);
  f.boite("appui", -2.75, 2.42, 0, -1.3, 2.5, 0.85);
  f.fenetre(-0.8, 0.5, 0.95, 2.2, { volet: 0.35 });
  f.fenetre(1.2, 2.5, 0.95, 2.2, { volet: 0.55 });
  f.fenetre(3.1, 4.3, 0.95, 2.2, { volet: 0.2 });
  new Facade(maison, Math.PI / 2, x1, 0).fenetre(0.4, 1.6, 0.95, 2.2, { volet: 0.45 });
  new Facade(maison, -Math.PI / 2, x0, 0).fenetre(-1.2, 0, 1.2, 2.2, { volet: 0.3, deuxVantaux: false });

  // la porte d'entrée, qui s'ouvre pour nous
  const vantail = new Lot();
  new Facade(vantail, 0, 0, 0).vantail(vantail, 0, 0.95, 0.12, 2.2);
  const porte = vantail.finir(m.matieres);
  const charniere = new THREE.Group();
  charniere.position.set(-2.5, 0, z1 + 0.005);
  charniere.add(porte);

  // la deuxième version : l'extension en bois, à toit plat, côté jardin
  apres.entre("bardage", 4.8, 0, -6.6, 8.4, 2.9, 0.6, 1.2);
  apres.entre("toitPlat", 4.7, 2.9, -6.75, 8.55, 3.12, 0.75);
  new Facade(apres, Math.PI / 2, 8.4, 0, 0.0).baie(0.4, 6.2, 0.1, 2.65, 4);
  new Facade(apres, 0, 0, 0.6).baie(5.2, 8.0, 0.1, 2.65, 2);

  parcelle(commun, {
    allee: [-5.9, -3.2], garageZ: z1, chemin: [-2.45, -1.6], cheminZ: z1 + 0.75,
    muret: [[-9, -6.1], [-0.9, 9]], arbres: [[-6.6, -5.4, 5.2, 2.1], [6.6, 4.4, 3.6, 1.4]], haieDroite: -6.9,
  }, 101);

  const r = assembler(m, { commun, maison, avant, apres });
  r.coque.add(charniere);
  return {
    ...r,
    avant: [r.avant],
    apres: [r.apres],
    ouvrir: (k) => { charniere.rotation.y = k * 1.9; },
    seuil: { point: new THREE.Vector3(-2.02, 1.2, z1), normale: new THREE.Vector3(0, 0, 1) },
    boite: new THREE.Box3(new THREE.Vector3(-9, -SOCLE.h, -7.5), new THREE.Vector3(9, 6.4, 7.5)),
  };
}

/** Le pavillon sur sous-sol de 1976 : garage en bas, perron, habitation au-dessus. */
function sousSol(m: MatieresDehors): MaisonDehors {
  const commun = new Lot();
  const maison = new Lot();
  const avant = new Lot();
  const apres = new Lot();
  const x0 = -4.8, x1 = 4.8, z0 = -4.2, z1 = 3.6, bas = 2.5, haut = 5.1;
  maison.entre("crepiBas", x0, 0, z0, x1, bas, z1, 2);
  maison.entre("crepi", x0, bas, z0, x1, haut, z1, 2);
  maison.entre("appui", x0 - 0.04, bas - 0.06, z0 - 0.04, x1 + 0.04, bas + 0.06, z1 + 0.06);
  maison.toit(toitQuatrePans(x1 - x0, z1 - z0, 0.66, 0.5), { dessus: "tuiles", dessous: "sousToit", rives: "rives" }, 0, haut + 0.02, (z0 + z1) / 2);
  maison.entre("crepi", -2.6, 6.2, -1.2, -2.0, 8.1, -0.6, 2);
  maison.entre("appui", -2.68, 8.1, -1.28, -1.92, 8.22, -0.52);
  gouttiere(maison, x0 - 0.5, x1 + 0.5, haut - 0.33, z1 + 0.52, [x0 - 0.3, x1 + 0.3]);

  const f = new Facade(maison, 0, 0, z1);
  // en haut : trois fenêtres et la porte, sur le palier
  f.fenetre(-3.9, -2.6, 3.25, 4.55, { volet: 0.4 });
  f.fenetre(-1.6, -0.3, 3.25, 4.55, { volet: 0.6 });
  f.fenetre(3.0, 4.1, 3.25, 4.55, { volet: 0.25 });
  f.porte(1.0, 1.95, bas, 4.65);
  f.vantail(maison, 1.0, 1.95, bas, 4.65);
  // le perron maçonné : palier, dix marches, rambarde
  f.boite("crepiBas", 0.6, 0, 0, 2.6, bas - 0.06, 1.2).boite("beton", 0.55, bas - 0.12, 0, 2.65, bas, 1.25);
  for (let i = 0; i < 10; i++) {
    const a = 2.6 + i * 0.28;
    const y = bas - (i + 1) * 0.25;
    if (y > 0.02) f.boite("crepiBas", a, 0, 0, a + 0.28, y, 1.2);
    f.boite("beton", a, Math.max(0, y - 0.05), 0, a + 0.3, y + 0.04, 1.25);
  }
  for (let u = 0.65; u <= 2.6; u += 0.32) f.boite("ferronnerie", u, bas, 1.12, u + 0.03, bas + 0.95, 1.15);
  f.boite("ferronnerie", 0.6, bas + 0.92, 1.1, 2.65, bas + 0.98, 1.17);
  const rampe = boiteGeo(2.9, 0.06, 0.07);
  rampe.rotateZ(-Math.atan2(0.25, 0.28));
  rampe.translate(2.6 + 1.4, bas + 0.95 - 1.25, 1.135 + z1);
  maison.ajouter("ferronnerie", rampe);
  for (let i = 1; i < 10; i += 2) {
    const a = 2.6 + i * 0.28;
    f.boite("ferronnerie", a, bas - (i + 1) * 0.25 + 0.04, 1.12, a + 0.03, bas - (i + 1) * 0.25 + 0.98, 1.15);
  }
  new Facade(maison, Math.PI / 2, x1, 0).fenetre(-0.2, 1.1, 3.25, 4.55, { volet: 0.5 }).fenetre(0.2, 1.0, 1.4, 2.0, { volet: 0, coffre: false, deuxVantaux: false });
  new Facade(maison, -Math.PI / 2, x0, 0).fenetre(-1.0, 0.3, 3.25, 4.55, { volet: 0.35 });

  // avant : la porte de garage basculante, la porte de service et un soupirail
  const fa = new Facade(avant, 0, 0, z1);
  fa.boite("noir", -3.9, 0, 0.0, -1.5, 2.1, 0.004);
  fa.boite("cadreBrun", -3.98, 0, 0, -3.9, 2.18, 0.07).boite("cadreBrun", -1.5, 0, 0, -1.42, 2.18, 0.07).boite("cadreBrun", -3.98, 2.1, 0, -1.42, 2.18, 0.07);
  fa.porte(-0.85, -0.05, 0, 2.0);
  fa.vantail(avant, -0.85, -0.05, 0, 2.0);
  const basculante = new Lot();
  basculante.ajouter("garage", boiteGeo(2.4, 2.1, 0.04, 1), 0, -1.05, 0.02);
  const porteGarage = basculante.finir(m.matieres);
  const axe = new THREE.Group();
  axe.position.set(-2.7, 2.1, z1 + 0.004);
  axe.add(porteGarage);

  // après : le sous-sol habillé de bois, une grande baie à la place du garage
  const fp = new Facade(apres, 0, 0, z1);
  fp.boite("bardage", x0, 0.0, 0, 0.6, bas - 0.07, 0.06);
  fp.boite("bardage", 2.6, 0.0, 0, x1, bas - 0.07, 0.06);
  new Facade(apres, 0, 0, z1, 0.06).baie(-4.3, -0.15, 0.05, 2.28, 3);

  parcelle(commun, {
    allee: [-4.1, -1.3], garageZ: z1, chemin: [5.4, 6.2], cheminZ: z1 + 0.2,
    muret: [[-9, -4.4], [-1.0, 4.9], [6.7, 9]], arbres: [[6.2, -5.2, 5.6, 2.2], [-6.9, 4.6, 3.2, 1.3]],
  }, 202);

  const r = assembler(m, { commun, maison, avant, apres });
  r.avant.add(axe);
  return {
    ...r,
    avant: [r.avant],
    apres: [r.apres],
    ouvrir: (k) => { axe.rotation.x = -k * 1.35; },
    seuil: { point: new THREE.Vector3(-2.7, 1.05, z1), normale: new THREE.Vector3(0, 0, 1) },
    boite: new THREE.Box3(new THREE.Vector3(-9, -SOCLE.h, -7.5), new THREE.Vector3(9, 8.2, 7.5)),
  };
}

/** Le pavillon à étage de 1978 : un cube sous un toit à deux pans, pignons sur les côtés. */
function aEtage(m: MatieresDehors): MaisonDehors {
  const commun = new Lot();
  const maison = new Lot();
  const avant = new Lot();
  const apres = new Lot();
  const x0 = -4.5, x1 = 4.5, z0 = -4.0, z1 = 4.0, haut = 5.5, pente = 0.72;
  maison.entre("crepi", x0, 0, z0, x1, haut, z1, 2);
  maison.entre("crepiGris", x0 - 0.03, 0, z0 - 0.03, x1 + 0.03, 0.4, z1 + 0.03, 2);
  maison.ajouter("crepi", pignonGeo(z1 - z0, pente, 0.3), x0 + 0.15, haut, 0);
  maison.ajouter("crepi", pignonGeo(z1 - z0, pente, 0.3), x1 - 0.15, haut, 0);
  maison.toit(toitDeuxPans(x1 - x0, z1 - z0, pente, 0.5), { dessus: "tuiles", dessous: "sousToit", rives: "rives" }, 0, haut + 0.02, 0);
  maison.entre("crepi", 2.2, 7.4, 0.4, 2.8, 9.2, 1.0, 2);
  maison.entre("appui", 2.12, 9.2, 0.32, 2.88, 9.32, 1.08);
  gouttiere(maison, x0 - 0.5, x1 + 0.5, haut - 0.36, z1 + 0.52, [x0 - 0.3]);

  // avant : la façade d'origine, et ses fenêtres à l'étage
  const fa = new Facade(avant, 0, 0, z1);
  fa.fenetre(-3.7, -2.4, 0.95, 2.2, { volet: 0.3 });
  fa.porte(-1.3, -0.35, 0.1, 2.2).vantail(avant, -1.3, -0.35, 0.1, 2.2);
  fa.boite("garage", 1.0, 0, 0, 3.6, 2.15, 0.04).boite("cadreBrun", 0.92, 0, 0, 1.0, 2.22, 0.07).boite("cadreBrun", 3.6, 0, 0, 3.68, 2.22, 0.07).boite("cadreBrun", 0.92, 2.15, 0, 3.68, 2.22, 0.07);
  fa.fenetre(-3.3, -2.3, 3.75, 4.75, { volet: 0.45, deuxVantaux: false });
  fa.fenetre(1.5, 2.7, 3.6, 4.75, { volet: 0, coffre: true });
  new Facade(avant, Math.PI / 2, x1, 0).fenetre(-0.6, 0.6, 3.6, 4.75, { volet: 0.5 }).fenetre(-0.6, 0.6, 0.95, 2.2, { volet: 0.4 });
  // le volet de la chambre, qui remonte pour nous laisser entrer
  const volet = new THREE.Mesh(boiteGeo(1.16, 1, 0.03, 1), m.matieres.volet);
  const voletAxe = new THREE.Group();
  voletAxe.position.set(2.1, 4.75 - 0.07, z1 + 0.075);
  volet.position.y = -0.5;
  voletAxe.add(volet);
  voletAxe.scale.y = 0.62;

  // après : isolée par l'extérieur, bardée de bois, deux grandes fenêtres à l'étage
  apres.entre("bardage", x0 - 0.1, 0.4, z1, x1 + 0.1, haut - 0.02, z1 + 0.1, 1.2);
  apres.entre("bardage", x1, 0.4, z0 - 0.1, x1 + 0.1, haut - 0.02, z1, 1.2);
  apres.entre("bardage", x0 - 0.1, 0.4, z0 - 0.1, x0, haut - 0.02, z1, 1.2);
  const fp = new Facade(apres, 0, 0, z1, 0.1);
  fp.fenetre(-3.7, -2.4, 0.95, 2.2, { volet: 0, coffre: false, cadre: "cadreNoir" });
  fp.porte(-1.3, -0.35, 0.1, 2.2).vantail(apres, -1.3, -0.35, 0.1, 2.2);
  fp.boite("garage", 1.0, 0, 0, 3.6, 2.15, 0.04);
  fp.baie(-3.75, -1.85, 3.0, 5.05, 2);
  fp.baie(1.05, 3.05, 3.0, 5.05, 2);
  new Facade(apres, Math.PI / 2, x1, 0, 0.1).fenetre(-0.6, 0.6, 3.6, 4.75, { volet: 0, coffre: false, cadre: "cadreNoir" }).fenetre(-0.6, 0.6, 0.95, 2.2, { volet: 0, coffre: false, cadre: "cadreNoir" });

  parcelle(commun, {
    allee: [0.9, 3.7], garageZ: z1, chemin: [-1.25, -0.4], cheminZ: z1 + 0.05,
    muret: [[-9, -1.6], [4.1, 9]], arbres: [[-6.5, -5.0, 6.0, 2.3], [6.7, -4.6, 4.2, 1.6]],
  }, 303);

  const r = assembler(m, { commun, maison, avant, apres });
  r.avant.add(voletAxe);
  return {
    ...r,
    avant: [r.avant],
    apres: [r.apres],
    ouvrir: (k) => { voletAxe.scale.y = Math.max(0.001, 0.62 * (1 - k)); },
    seuil: { point: new THREE.Vector3(2.1, 4.15, z1), normale: new THREE.Vector3(0, 0, 1) },
    boite: new THREE.Box3(new THREE.Vector3(-9, -SOCLE.h, -7.5), new THREE.Vector3(9, 9.3, 7.5)),
  };
}

export const MAISONS: Record<Modele, (m: MatieresDehors) => MaisonDehors> = { plain: plainPied, "sous-sol": sousSol, etage: aEtage };

/** La deuxième version se montre dès que la bascule a passé la moitié. */
export function montrerVersion(maison: MaisonDehors, t: number) {
  const apres = t >= 0.5;
  maison.avant.forEach((o) => (o.visible = !apres));
  maison.apres.forEach((o) => (o.visible = apres));
}
