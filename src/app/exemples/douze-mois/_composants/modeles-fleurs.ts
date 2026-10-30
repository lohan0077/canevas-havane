import * as THREE from "three";
import type { Forme } from "./fleurs";

// Les vingt-deux fleurs du jardin, construites pétale par pétale : aucun modèle
// téléchargé. Chaque fonction rend une « touffe » (quelques tiges d'une même fleur,
// ou un arbuste) posée à l'origine, le sol à y = 0, en une seule géométrie : le
// jardin la répète par instances, une couleur de pétale par touffe.
//
// Trois attributs par sommet : la position, la couleur peinte (ombrage, cœur, tige),
// et `teinte` (0 à 1) — la part du sommet qui prend la couleur de l'instance. Un
// pétale a sa teinte à 1, un cœur noir ou une tige à 0 : la même anémone peut ainsi
// être rouge, violette ou blanche sans que son cœur change.

/** Un hasard qui se rejoue : la même graine donne la même touffe. */
export function hasard(graine: number) {
  let s = graine | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
type Hasard = () => number;

const Y = new THREE.Vector3(0, 1, 0);
const c = (hex: string) => new THREE.Color(hex);
const BLANC = c("#ffffff");

/** L'établi : on y pose des pièces (grilles, primitives), il rend une géométrie. */
class Etabli {
  positions: number[] = [];
  couleurs: number[] = [];
  teintes: number[] = [];
  indices: number[] = [];
  private v = new THREE.Vector3();

  get compte() {
    return this.positions.length / 3;
  }

  sommet(p: THREE.Vector3, m: THREE.Matrix4, col: THREE.Color, t: number) {
    this.v.copy(p).applyMatrix4(m);
    this.positions.push(this.v.x, this.v.y, this.v.z);
    this.couleurs.push(col.r, col.g, col.b);
    this.teintes.push(t);
  }

  /** Une grille (nu + 1) × (nv + 1) de sommets, refermée en quadrilatères. */
  grille(nu: number, nv: number, m: THREE.Matrix4, f: (i: number, j: number) => [THREE.Vector3, THREE.Color, number]) {
    const debut = this.compte;
    for (let i = 0; i <= nu; i++)
      for (let j = 0; j <= nv; j++) {
        const [p, col, t] = f(i, j);
        this.sommet(p, m, col, t);
      }
    for (let i = 0; i < nu; i++)
      for (let j = 0; j < nv; j++) {
        const a = debut + i * (nv + 1) + j;
        const b = a + nv + 1;
        this.indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
  }

  /**
   * Une fleurette à plat, en éventail autour de son centre : `lobes` pétales dessinés
   * par le rayon du bord (8 triangles pour quatre pétales, quand une grille en
   * demanderait le double).
   */
  eventail(m: THREE.Matrix4, lobes: number, r: number, creux: number, centre: THREE.Color, bord: THREE.Color, t: number) {
    const debut = this.compte;
    const n = lobes * 2;
    this.sommet(new THREE.Vector3(0, 0, 0), m, centre, t);
    for (let k = 0; k < n; k++) {
      const a = (k / n) * Math.PI * 2;
      const rk = k % 2 ? r * 0.42 : r;
      this.sommet(new THREE.Vector3(Math.cos(a) * rk, -creux * (k % 2 ? 0.4 : 1), Math.sin(a) * rk), m, bord, t);
    }
    for (let k = 0; k < n; k++) this.indices.push(debut, debut + 1 + ((k + 1) % n), debut + 1 + k);
  }

  /** Une primitive de three.js, transformée et peinte, puis libérée. */
  primitive(geo: THREE.BufferGeometry, m: THREE.Matrix4, col: THREE.Color | ((p: THREE.Vector3) => THREE.Color), t: number) {
    const debut = this.compte;
    const pos = geo.getAttribute("position");
    const p = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      p.fromBufferAttribute(pos, i);
      this.sommet(p, m, typeof col === "function" ? col(p) : col, t);
    }
    if (geo.index) for (let i = 0; i < geo.index.count; i++) this.indices.push(debut + geo.index.getX(i));
    else for (let i = 0; i < pos.count; i++) this.indices.push(debut + i);
    geo.dispose();
  }

  /** La géométrie finale. Le bas de la plante est assombri : l'ombre que les feuilles
      se font entre elles, peinte une fois pour toutes. */
  geometrie(hauteur: number) {
    for (let i = 0; i < this.compte; i++) {
      const y = this.positions[i * 3 + 1];
      const k = 0.5 + 0.5 * THREE.MathUtils.smoothstep(y, 0, hauteur * 0.7);
      this.couleurs[i * 3] *= k;
      this.couleurs[i * 3 + 1] *= k;
      this.couleurs[i * 3 + 2] *= k;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(this.positions, 3));
    g.setAttribute("color", new THREE.Float32BufferAttribute(this.couleurs, 3));
    g.setAttribute("teinte", new THREE.Float32BufferAttribute(this.teintes, 1));
    g.setIndex(this.indices);
    g.computeVertexNormals();
    g.computeBoundingSphere();
    return g;
  }
}

/* ============================ le pétale ============================ */

type Profil = "ovale" | "rond" | "pointu" | "ruban" | "lance";
const PROFILS: Record<Profil, (u: number) => number> = {
  ovale: (u) => Math.max(0.12, Math.pow(Math.sin(Math.PI * Math.pow(u, 0.8)), 0.75)),
  rond: (u) => Math.max(0.16, Math.sqrt(Math.max(0, 1 - Math.pow(2 * Math.pow(u, 0.7) - 1, 4)))),
  pointu: (u) => Math.max(0.08, Math.sin(Math.PI * Math.pow(u, 0.62)) * (1 - u * 0.3)),
  ruban: (u) => Math.max(0.06, Math.min(1, 0.35 + u * 4) * (1 - Math.pow(u, 3) * 0.85)),
  lance: (u) => Math.max(0.03, Math.sin(Math.PI * Math.pow(u, 0.55))),
};

type Petale = {
  l: number;          // longueur
  w: number;          // largeur la plus grande
  profil?: Profil;
  cuvette?: number;   // creux en travers : les bords remontent vers l'intérieur
  courbe?: number;    // courbure en long, en radians : > 0 se referme, < 0 se renverse
  exp?: number;       // où la courbure se concentre (2 : vers la pointe)
  ondule?: number;    // bord froissé (pivoine, renoncule)
  echancre?: number;  // pointe échancrée (cosmos)
  nu?: number;
  nv?: number;
  base?: THREE.Color;
  pointe?: THREE.Color;
  teinte?: number;     // teinte de la pointe
  teinteBase?: number; // teinte du talon (une anémone a le talon blanc)
};

/** Un pétale, couché le long de +Z, sa face intérieure vers +Y. */
function petale(e: Etabli, p: Petale, m: THREE.Matrix4) {
  const nu = p.nu ?? 3;
  const nv = p.nv ?? 2;
  const profil = PROFILS[p.profil ?? "ovale"];
  const base = p.base ?? c("#d8d2d6");
  const pointe = p.pointe ?? BLANC;
  const t1 = p.teinte ?? 1;
  const t0 = p.teinteBase ?? t1;
  // la nervure centrale, intégrée pas à pas
  const ligne: { y: number; z: number; th: number }[] = [];
  let y = 0;
  let z = 0;
  for (let i = 0; i <= nu; i++) {
    const th = (p.courbe ?? 0) * Math.pow(i / nu, p.exp ?? 1.4);
    ligne.push({ y, z, th });
    y += Math.sin(th) * (p.l / nu);
    z += Math.cos(th) * (p.l / nu);
  }
  const col = new THREE.Color();
  e.grille(nu, nv, m, (i, j) => {
    const u = i / nu;
    const v = -1 + (2 * j) / nv;
    const { y: cy, z: cz, th } = ligne[i];
    const demi = (profil(u) * p.w) / 2;
    const creux = (p.cuvette ?? 0) * v * v * demi + (p.ondule ?? 0) * p.w * Math.sin(v * 2.6 * Math.PI + u * 7) * u;
    const recul = (p.echancre ?? 0) * p.l * Math.pow(1 - Math.abs(v), 2) * Math.pow(u, 6);
    const pos = new THREE.Vector3(
      v * demi,
      cy + Math.cos(th) * creux - Math.sin(th) * recul,
      cz - Math.sin(th) * creux - Math.cos(th) * recul,
    );
    col.copy(base).lerp(pointe, Math.pow(u, 0.8));
    const t = t0 + (t1 - t0) * THREE.MathUtils.smoothstep(u, 0.08, 0.3);
    return [pos, col.clone(), t];
  });
}

/** La place d'un pétale autour de l'axe +Y : azimut, ouverture (0 : droit, π/2 : à plat). */
function autour(r0: number, y0: number, phi: number, ouverture: number, roulis = 0) {
  return new THREE.Matrix4()
    .makeTranslation(Math.sin(phi) * r0, y0, Math.cos(phi) * r0)
    .multiply(new THREE.Matrix4().makeRotationY(phi))
    .multiply(new THREE.Matrix4().makeRotationX(-(Math.PI / 2 - ouverture)))
    .multiply(new THREE.Matrix4().makeRotationZ(roulis));
}

/** Une couronne de pétales identiques. */
function couronne(e: Etabli, m: THREE.Matrix4, n: number, p: Petale, ouverture: number, r0 = 0, y0 = 0, decalage = 0, h?: Hasard) {
  for (let k = 0; k < n; k++) {
    const jeu = h ? (h() - 0.5) * 0.25 : 0;
    const phi = decalage + (k / n) * Math.PI * 2 + jeu;
    petale(e, p, m.clone().multiply(autour(r0, y0, phi, ouverture + jeu * 0.6)));
  }
}

/** Un repère posé en `pos`, son axe +Y tourné vers `dir`. */
function repere(pos: THREE.Vector3, dir: THREE.Vector3, echelle = 1, tour = 0) {
  const q = new THREE.Quaternion().setFromUnitVectors(Y, dir.clone().normalize());
  q.multiply(new THREE.Quaternion().setFromAxisAngle(Y, tour));
  return new THREE.Matrix4().compose(pos, q, new THREE.Vector3(echelle, echelle, echelle));
}

/** Un dôme (cœur de fleur), aplati. */
function dome(e: Etabli, m: THREE.Matrix4, r: number, aplati: number, col: THREE.Color | ((p: THREE.Vector3) => THREE.Color), segments = 8) {
  const g = new THREE.SphereGeometry(r, segments, 3, 0, Math.PI * 2, 0, Math.PI / 2);
  g.scale(1, aplati, 1);
  e.primitive(g, m, col, 0);
}

/** Des étamines : de fines aiguilles en couronne. */
function etamines(e: Etabli, m: THREE.Matrix4, n: number, r0: number, longueur: number, ouverture: number, col: THREE.Color) {
  for (let k = 0; k < n; k++) {
    const phi = (k / n) * Math.PI * 2;
    const g = new THREE.ConeGeometry(longueur * 0.09, longueur, 3, 1, true);
    g.translate(0, longueur / 2, 0);
    e.primitive(g, m.clone().multiply(autour(r0, 0, phi, ouverture)).multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2)), col, 0);
  }
}

/* ============================ tiges et feuilles ============================ */

const VERTS = {
  tige: c("#5f8f48"),
  feuille: c("#3d6b34"),
  feuilleClaire: c("#5f8f47"),
  glauque: c("#5b8a63"),
  sombre: c("#2e5530"),
  gris: c("#7e9479"),
};

/** Une tige courbe de `de` à `a`. Rend la direction de la tige à son sommet. */
function tige(e: Etabli, de: THREE.Vector3, a: THREE.Vector3, rayon: number, col = VERTS.tige, flexion = 0.15) {
  const milieu = de.clone().lerp(a, 0.5).add(new THREE.Vector3((a.x - de.x) * flexion, 0, (a.z - de.z) * flexion));
  const courbe = new THREE.QuadraticBezierCurve3(de, milieu, a);
  e.primitive(new THREE.TubeGeometry(courbe, 3, rayon, 3, false), new THREE.Matrix4(), col, 0);
  return courbe.getTangent(1);
}

/** Une feuille, accrochée en `pos`, partant dans la direction `phi`. */
function feuille(e: Etabli, pos: THREE.Vector3, phi: number, ouverture: number, p: Petale) {
  petale(e, { nu: 3, nv: 2, cuvette: 0.35, courbe: -0.7, profil: "lance", base: VERTS.sombre, pointe: VERTS.feuilleClaire, teinte: 0, ...p }, new THREE.Matrix4().makeTranslation(pos.x, pos.y, pos.z).multiply(autour(0, 0, phi, ouverture)));
}

/** Des feuilles en ruban qui partent du pied (tulipe, narcisse, iris…). */
function rubans(e: Etabli, h: Hasard, pied: THREE.Vector3, n: number, l: number, w: number, ouverture: number, courbe: number, col = VERTS.glauque, profil: Profil = "ruban") {
  for (let k = 0; k < n; k++) {
    const phi = (k / n) * Math.PI * 2 + h() * 1.2;
    feuille(e, pied, phi, ouverture + (h() - 0.5) * 0.3, { l: l * (0.75 + h() * 0.4), w, profil, courbe: courbe * (0.7 + h() * 0.6), cuvette: 0.55, nu: 5, base: col.clone().multiplyScalar(0.7), pointe: col });
  }
}

type Tige = { pied: THREE.Vector3; sommet: THREE.Vector3; dir: THREE.Vector3 };

/**
 * Les tiges d'une touffe : `n` tiges réparties dans un disque de `rayon`, de hauteur
 * `hauteur` (moins un peu de hasard), légèrement écartées du centre.
 */
function tiges(e: Etabli, h: Hasard, n: number, rayon: number, hauteur: number, epaisseur: number, ecart = 0.18, col = VERTS.tige): Tige[] {
  const sortie: Tige[] = [];
  for (let k = 0; k < n; k++) {
    const a = (k / n) * Math.PI * 2 + h() * 0.9;
    const r = k === 0 && n > 2 ? 0 : rayon * (0.35 + 0.65 * Math.sqrt(h()));
    const pied = new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r);
    const haut = hauteur * (0.82 + h() * 0.18);
    const penche = ecart * haut * (0.5 + h());
    const sommet = new THREE.Vector3(pied.x + Math.cos(a) * penche, haut, pied.z + Math.sin(a) * penche);
    const dir = tige(e, pied, sommet, epaisseur, col);
    sortie.push({ pied, sommet, dir });
  }
  return sortie;
}

/** Penche la direction d'une fleur vers l'horizontale (0 : vers le ciel, π/2 : de profil). */
function pencher(dir: THREE.Vector3, angle: number, vers?: THREE.Vector3) {
  const horiz = (vers ?? new THREE.Vector3(dir.x, 0, dir.z)).clone().setY(0);
  if (horiz.lengthSq() < 1e-6) horiz.set(1, 0, 0);
  horiz.normalize();
  const axe = new THREE.Vector3().crossVectors(Y, horiz).normalize();
  return new THREE.Vector3(0, 1, 0).applyAxisAngle(axe, angle).normalize();
}

/* ============================ arbustes ============================ */

type Ancre = { pos: THREE.Vector3; normale: THREE.Vector3 };

/**
 * Un arbuste : quelques masses de feuillage (un cœur sombre hérissé de feuilles).
 * Rend des points d'accroche à sa surface, pour y poser les fleurs.
 */
function buisson(e: Etabli, h: Hasard, masses: { x: number; y: number; z: number; r: number }[], feuilleL: number, feuilleW: number, col: THREE.Color, nFeuilles = 60, tronc = true): Ancre[] {
  const ancres: Ancre[] = [];
  if (tronc) for (const s of masses) tige(e, new THREE.Vector3(s.x * 0.3, 0, s.z * 0.3), new THREE.Vector3(s.x, s.y, s.z), 0.012, c("#4a3a2c"), 0);
  for (const s of masses) {
    const coeur = new THREE.IcosahedronGeometry(s.r * 0.78, 1);
    e.primitive(coeur, new THREE.Matrix4().makeTranslation(s.x, s.y, s.z).multiply(new THREE.Matrix4().makeScale(1, 0.85, 1)), col.clone().multiplyScalar(0.7), 0);
    for (let k = 0; k < nFeuilles; k++) {
      const n = new THREE.Vector3(h() * 2 - 1, h() * 1.6 - 0.5, h() * 2 - 1).normalize();
      const pos = new THREE.Vector3(s.x, s.y, s.z).addScaledVector(n, s.r * (0.72 + h() * 0.25));
      const phi = Math.atan2(n.x, n.z) + (h() - 0.5) * 1.4;
      const teinte = col.clone().multiplyScalar(0.8 + h() * 0.55);
      petale(e, { l: feuilleL * (0.9 + h() * 0.7), w: feuilleW * 1.15, nu: 2, nv: 1, cuvette: 0.3, courbe: -0.4, profil: "ovale", base: teinte.clone().multiplyScalar(0.8), pointe: teinte, teinte: 0 }, new THREE.Matrix4().makeTranslation(pos.x, pos.y, pos.z).multiply(autour(0, 0, phi, 0.6 + h() * 1.2)));
    }
    for (let k = 0; k < 14; k++) {
      const n = new THREE.Vector3(h() * 2 - 1, 0.15 + h() * 0.9, h() * 2 - 1).normalize();
      ancres.push({ pos: new THREE.Vector3(s.x, s.y, s.z).addScaledVector(n, s.r * 0.95), normale: n });
    }
  }
  return ancres;
}

/* ============================ les têtes ============================ */

/** Tulipe : six pétales en coupe, qui se referment vers le haut. */
function teteTulipe(e: Etabli, m: THREE.Matrix4) {
  const p: Petale = { l: 0.075, w: 0.056, profil: "ovale", cuvette: 1.05, courbe: 0.42, exp: 1.6, nu: 4, nv: 2, base: c("#c9c0c4") };
  couronne(e, m, 3, p, 0.24, 0.004, 0);
  couronne(e, m, 3, { ...p, l: 0.07, w: 0.05 }, 0.14, 0.003, 0.004, Math.PI / 3);
}

function teteAnemone(e: Etabli, m: THREE.Matrix4, h: Hasard) {
  couronne(e, m, 6, { l: 0.042, w: 0.04, profil: "rond", cuvette: 0.45, courbe: 0.25, nu: 2, nv: 2, base: BLANC, pointe: c("#f4f0f0"), teinteBase: 0, teinte: 1 }, 1.12, 0.003, 0, 0, h);
  dome(e, m, 0.012, 0.75, c("#160d1c"), 7);
  etamines(e, m, 10, 0.011, 0.011, 0.95, c("#221428"));
}

function teteRenoncule(e: Etabli, m: THREE.Matrix4, h: Hasard) {
  const p: Petale = { l: 0.032, w: 0.032, profil: "rond", cuvette: 1.05, courbe: 0.9, nu: 2, nv: 2, base: c("#d0c4c4") };
  couronne(e, m, 7, p, 1.3, 0.004, 0, 0, h);
  couronne(e, m, 7, { ...p, l: 0.029, courbe: 1.0 }, 0.98, 0.003, 0.004, 0.4, h);
  couronne(e, m, 6, { ...p, l: 0.024, courbe: 1.1 }, 0.66, 0.002, 0.008, 0.8, h);
  couronne(e, m, 4, { ...p, l: 0.018, courbe: 1.2, nv: 1 }, 0.36, 0.001, 0.012, 1.1, h);
  dome(e, m.clone().multiply(new THREE.Matrix4().makeTranslation(0, 0.012, 0)), 0.006, 0.8, c("#5f7a3a"), 6);
}

function teteHellebore(e: Etabli, m: THREE.Matrix4, h: Hasard) {
  couronne(e, m, 5, { l: 0.042, w: 0.04, profil: "rond", cuvette: 0.35, courbe: 0.12, nu: 3, nv: 2, base: c("#d9e3c2"), pointe: BLANC, teinteBase: 0.25, teinte: 1 }, 1.02, 0.003, 0, 0, h);
  dome(e, m, 0.01, 0.7, c("#a3b86f"), 8);
  etamines(e, m, 20, 0.009, 0.014, 0.8, c("#e6cf55"));
}

function teteNarcisse(e: Etabli, m: THREE.Matrix4) {
  couronne(e, m, 6, { l: 0.034, w: 0.026, profil: "pointu", cuvette: 0.2, courbe: -0.1, nu: 3, nv: 2, base: c("#e6e0cc") }, 1.42, 0.004);
  const g = new THREE.LatheGeometry([new THREE.Vector2(0.006, 0), new THREE.Vector2(0.008, 0.012), new THREE.Vector2(0.0105, 0.022), new THREE.Vector2(0.0145, 0.027)], 9);
  e.primitive(g, m, (p) => c("#e9922a").lerp(c("#f6b844"), p.y / 0.027), 0);
}

function teteJacinthe(e: Etabli, m: THREE.Matrix4, h: Hasard) {
  for (let k = 0; k < 15; k++) {
    const y = 0.006 + (k / 15) * 0.085;
    const phi = k * 2.399;
    const r = 0.016 * (1 - (k / 15) * 0.45);
    const flor = m.clone().multiply(new THREE.Matrix4().makeTranslation(Math.sin(phi) * r, y, Math.cos(phi) * r)).multiply(repere(new THREE.Vector3(), new THREE.Vector3(Math.sin(phi), 0.25, Math.cos(phi))));
    e.eventail(flor.multiply(new THREE.Matrix4().makeRotationY(h() * 2)), 6, 0.014, 0.004, c("#c4bcd2"), BLANC, 1);
  }
  const g = new THREE.CylinderGeometry(0.008, 0.01, 0.09, 5, 1, true);
  g.translate(0, 0.045, 0);
  e.primitive(g, m, c("#7f8f5a"), 0);
}

function tetePivoine(e: Etabli, m: THREE.Matrix4, h: Hasard) {
  const p: Petale = { l: 0.058, w: 0.062, profil: "rond", cuvette: 1.15, courbe: 0.55, nu: 3, nv: 2, base: c("#c8b6bb") };
  couronne(e, m, 5, p, 1.05, 0.006, 0, 0, h);
  couronne(e, m, 8, { ...p, l: 0.046, w: 0.05, courbe: 0.9, ondule: 0.09, nu: 2 }, 0.72, 0.004, 0.006, 0.3, h);
  couronne(e, m, 9, { ...p, l: 0.036, w: 0.04, courbe: 1.2, ondule: 0.14, nu: 2, base: c("#ddd0d3") }, 0.4, 0.002, 0.012, 0.7, h);
  couronne(e, m, 5, { ...p, l: 0.022, w: 0.028, courbe: 1.4, ondule: 0.12, nu: 2, base: c("#e6dcdf") }, 0.18, 0.001, 0.02, 1.2, h);
}

function teteIris(e: Etabli, m: THREE.Matrix4) {
  couronne(e, m, 3, { l: 0.058, w: 0.042, profil: "rond", cuvette: 0.75, courbe: 0.55, ondule: 0.07, nu: 3, nv: 2, base: c("#cfc6e6") }, 0.32, 0.004, 0.008);
  const chute: Petale = { l: 0.064, w: 0.048, profil: "rond", cuvette: -0.25, courbe: -1.05, exp: 1.2, ondule: 0.05, nu: 4, nv: 2, base: c("#f3eefc"), pointe: BLANC, teinteBase: 0.35, teinte: 1 };
  for (let k = 0; k < 3; k++) {
    const phi = Math.PI / 3 + (k / 3) * Math.PI * 2;
    const pm = m.clone().multiply(autour(0.004, 0.006, phi, 1.25));
    petale(e, chute, pm);
    // la barbe jaune, au talon de chaque pétale retombant
    const barbe = new THREE.BoxGeometry(0.005, 0.003, 0.024);
    barbe.translate(0, 0.004, 0.016);
    e.primitive(barbe, pm, c("#f0bf2a"), 0);
  }
}

function teteRose(e: Etabli, m: THREE.Matrix4, h: Hasard) {
  const p: Petale = { l: 0.036, w: 0.04, profil: "rond", cuvette: 0.95, courbe: -0.35, nu: 3, nv: 2, base: c("#bfb0b4") };
  couronne(e, m, 5, p, 1.08, 0.005, 0, 0, h);
  couronne(e, m, 5, { ...p, l: 0.031, courbe: 0.45, cuvette: 1.2 }, 0.62, 0.003, 0.004, 0.6, h);
  couronne(e, m, 5, { ...p, l: 0.025, w: 0.032, courbe: 0.95, cuvette: 1.4, nu: 2 }, 0.26, 0.002, 0.008, 1.2, h);
  const bouton = new THREE.ConeGeometry(0.008, 0.024, 6, 1);
  bouton.translate(0, 0.02, 0);
  e.primitive(bouton, m, c("#9a7f86"), 0.85);
}

/** Les fleurs « composées » : un cœur, et une ou deux couronnes de rayons. */
function teteComposee(e: Etabli, m: THREE.Matrix4, h: Hasard, o: { coeur: number; coeurCol: THREE.Color | ((p: THREE.Vector3) => THREE.Color); aplati?: number; rayons: number; l: number; w: number; courbe?: number; profil?: Profil; nu?: number; nv?: number; double?: boolean; echancre?: number; cuvette?: number; ouverture?: number }) {
  const p: Petale = { l: o.l, w: o.w, profil: o.profil ?? "ovale", courbe: o.courbe ?? -0.12, nu: o.nu ?? 2, nv: o.nv ?? 1, cuvette: o.cuvette ?? 0.2, echancre: o.echancre, base: c("#d6d0d0") };
  couronne(e, m, o.rayons, p, o.ouverture ?? 1.48, o.coeur * 0.8, 0, 0, h);
  if (o.double) couronne(e, m, o.rayons, { ...p, l: o.l * 0.92 }, (o.ouverture ?? 1.48) - 0.12, o.coeur * 0.75, 0.002, Math.PI / o.rayons, h);
  dome(e, m, o.coeur, o.aplati ?? 0.55, o.coeurCol, o.coeur > 0.03 ? 14 : 7);
}

function teteDahlia(e: Etabli, m: THREE.Matrix4, h: Hasard) {
  const p: Petale = { l: 0.046, w: 0.024, profil: "pointu", cuvette: 1.0, courbe: -0.08, nu: 2, nv: 2, base: c("#c7bcbc") };
  const rangs: [number, number, number][] = [[12, 1.58, 1], [12, 1.28, 0.88], [11, 0.98, 0.74], [10, 0.68, 0.6], [8, 0.38, 0.45]];
  rangs.forEach(([n, ouverture, k], i) => couronne(e, m, n, { ...p, l: p.l * k, w: p.w * (0.75 + 0.25 * k), courbe: i > 2 ? 0.5 : -0.08 }, ouverture, 0.004, i * 0.004, i * 0.37, h));
}

function teteChardon(e: Etabli, m: THREE.Matrix4) {
  const g = new THREE.IcosahedronGeometry(0.024, 1);
  e.primitive(g, m.clone().multiply(new THREE.Matrix4().makeTranslation(0, 0.02, 0)), c("#b6bfd6"), 1);
  const d = new THREE.Vector3();
  for (let k = 0; k < 26; k++) {
    const y = 1 - (k / 25) * 2;
    const r = Math.sqrt(1 - y * y);
    const phi = k * 2.399;
    d.set(Math.cos(phi) * r, y, Math.sin(phi) * r);
    const pic = new THREE.ConeGeometry(0.0035, 0.016, 3, 1, true);
    pic.translate(0, 0.008, 0);
    e.primitive(pic, m.clone().multiply(repere(new THREE.Vector3(0, 0.02, 0).addScaledVector(d, 0.022), d)), c("#d8def0"), 1);
  }
}

function teteCamelia(e: Etabli, m: THREE.Matrix4, h: Hasard) {
  const p: Petale = { l: 0.032, w: 0.03, profil: "rond", cuvette: 0.3, courbe: 0.1, nu: 2, nv: 2, base: c("#cdc2c2") };
  couronne(e, m, 7, p, 1.42, 0.004, 0, 0, h);
  couronne(e, m, 7, { ...p, l: 0.026 }, 1.1, 0.003, 0.003, 0.45, h);
  couronne(e, m, 6, { ...p, l: 0.02, courbe: 0.4 }, 0.75, 0.002, 0.006, 0.9, h);
  couronne(e, m, 5, { ...p, l: 0.013, courbe: 0.7 }, 0.4, 0.001, 0.009, 1.3, h);
}

/** Une petite fleur en croix (hortensia, lilas) : quatre pétales. */
function fleurette(e: Etabli, m: THREE.Matrix4, l: number, base: THREE.Color) {
  e.eventail(m, 4, l, l * 0.15, base, BLANC, 1);
}

/* ============================ les touffes ============================ */

type Fabrique = (e: Etabli, h: Hasard) => void;

const FABRIQUES: Record<Forme, Fabrique> = {
  tulipe(e, h) {
    for (const t of tiges(e, h, 5, 0.12, 0.47, 0.0045, 0.08, VERTS.glauque)) {
      teteTulipe(e, repere(t.sommet, t.dir, 1.25, h() * 6));
      rubans(e, h, t.pied, 2, 0.24, 0.06, 0.4, -0.8);
    }
  },
  anemone(e, h) {
    for (const t of tiges(e, h, 6, 0.11, 0.34, 0.0028, 0.22)) {
      teteAnemone(e, repere(t.sommet, pencher(t.dir, 0.35), 1.25), h);
      const col = t.pied.clone().lerp(t.sommet, 0.72);
      for (let k = 0; k < 3; k++) feuille(e, col, (k / 3) * Math.PI * 2 + h(), 1.2, { l: 0.035, w: 0.014, profil: "pointu", ondule: 0.3, nu: 2, nv: 1 });
      feuille(e, t.pied, h() * 6.28, 1.0, { l: 0.08, w: 0.04, profil: "ovale", ondule: 0.25, nu: 2 });
    }
  },
  renoncule(e, h) {
    for (const t of tiges(e, h, 4, 0.11, 0.4, 0.003, 0.15)) {
      teteRenoncule(e, repere(t.sommet, pencher(t.dir, 0.3), 1.3), h);
      feuille(e, t.pied, h() * 6.28, 1.0, { l: 0.08, w: 0.035, profil: "ovale", ondule: 0.25, nu: 2 });
    }
  },
  hellebore(e, h) {
    for (const t of tiges(e, h, 4, 0.12, 0.34, 0.004, 0.3, c("#6b6b3e"))) teteHellebore(e, repere(t.sommet, pencher(t.dir, 1.95), 1.35), h);
    for (let k = 0; k < 7; k++) feuille(e, new THREE.Vector3((h() - 0.5) * 0.1, 0.02, (h() - 0.5) * 0.1), (k / 7) * 6.28, 0.85, { l: 0.2, w: 0.05, profil: "pointu", base: c("#203d22"), pointe: c("#3c6338"), courbe: -0.5 });
  },
  narcisse(e, h) {
    for (const t of tiges(e, h, 6, 0.1, 0.4, 0.0035, 0.06, VERTS.glauque)) {
      teteNarcisse(e, repere(t.sommet, pencher(t.dir, 1.45), 1.3));
      rubans(e, h, t.pied, 2, 0.34, 0.013, 0.2, -0.5);
    }
  },
  jacinthe(e, h) {
    for (const t of tiges(e, h, 4, 0.09, 0.18, 0.005, 0.05, VERTS.glauque)) {
      teteJacinthe(e, repere(t.sommet, t.dir, 1.2), h);
      rubans(e, h, t.pied, 3, 0.2, 0.02, 0.45, -0.7);
    }
  },
  pivoine(e, h) {
    for (const t of tiges(e, h, 3, 0.14, 0.72, 0.0055, 0.16)) {
      tetePivoine(e, repere(t.sommet, pencher(t.dir, 0.3), 1.25), h);
      for (let k = 0; k < 5; k++) {
        const pos = t.pied.clone().lerp(t.sommet, 0.25 + k * 0.1);
        feuille(e, pos, h() * 6.28, 1.05, { l: 0.13, w: 0.045, profil: "pointu", base: c("#2c4f2a"), pointe: c("#4a7a3c") });
      }
    }
  },
  iris(e, h) {
    for (const t of tiges(e, h, 4, 0.1, 0.78, 0.004, 0.04, VERTS.glauque)) {
      teteIris(e, repere(t.sommet, t.dir, 1.3, h() * 6));
      rubans(e, h, t.pied, 3, 0.5, 0.032, 0.14, -0.2, c("#5d8a6a"), "lance");
    }
  },
  rose(e, h) {
    const ancres = buisson(e, h, [{ x: 0, y: 0.5, z: 0, r: 0.3 }, { x: 0.2, y: 0.68, z: 0.08, r: 0.22 }, { x: -0.16, y: 0.72, z: -0.1, r: 0.2 }], 0.06, 0.035, c("#3e6a36"), 38);
    for (let k = 0; k < 8; k++) {
      const a = ancres[Math.floor(h() * ancres.length)];
      const pos = a.pos.clone().addScaledVector(a.normale, 0.04);
      tige(e, a.pos, pos, 0.003);
      teteRose(e, repere(pos, a.normale.clone().lerp(Y, 0.45), 1.35), h);
    }
  },
  marguerite(e, h) {
    for (const t of tiges(e, h, 8, 0.13, 0.58, 0.0028, 0.22)) {
      teteComposee(e, repere(t.sommet, pencher(t.dir, 0.4), 1.3), h, { coeur: 0.011, coeurCol: c("#f2c12e"), rayons: 20, l: 0.03, w: 0.008, nu: 2, nv: 1, courbe: -0.15 });
      feuille(e, t.pied.clone().lerp(t.sommet, 0.3), h() * 6.28, 1.0, { l: 0.06, w: 0.016, profil: "pointu", ondule: 0.2, nu: 2, nv: 1 });
    }
  },
  tournesol(e, h) {
    // Les tournesols regardent vers +Z : le jardin les tourne vers le cadran.
    for (const t of tiges(e, h, 2, 0.12, 1.25, 0.011, 0.05)) {
      const dir = pencher(t.dir, 1.15, new THREE.Vector3(0, 0, 1));
      const m = repere(t.sommet, dir, 1.25);
      teteComposee(e, m, h, { coeur: 0.06, aplati: 0.35, coeurCol: (p) => c("#2e1a0c").lerp(c("#6e4a1c"), Math.min(1, Math.hypot(p.x, p.z) / 0.06) ** 3), rayons: 21, l: 0.068, w: 0.022, profil: "pointu", nu: 2, nv: 2, double: true, courbe: -0.15, cuvette: 0.35 });
      couronne(e, m, 14, { l: 0.03, w: 0.012, profil: "pointu", nu: 1, nv: 1, base: VERTS.sombre, pointe: VERTS.feuille, teinte: 0 }, 2.1, 0.05, -0.004);
      for (let k = 0; k < 5; k++) {
        const pos = t.pied.clone().lerp(t.sommet, 0.2 + k * 0.14);
        feuille(e, pos, k * 2.4 + h(), 1.15, { l: 0.2, w: 0.15, profil: "ovale", courbe: -0.9, base: c("#2f5a2b"), pointe: c("#4f8239") });
      }
    }
  },
  lavande(e, h) {
    const masse = new THREE.IcosahedronGeometry(0.17, 1);
    e.primitive(masse, new THREE.Matrix4().makeTranslation(0, 0.1, 0).multiply(new THREE.Matrix4().makeScale(1, 0.6, 1)), c("#5f7458"), 0);
    for (let k = 0; k < 40; k++) {
      const n = new THREE.Vector3(h() * 2 - 1, h() * 0.8 + 0.2, h() * 2 - 1).normalize();
      feuille(e, new THREE.Vector3(n.x * 0.15, 0.1 + n.y * 0.09, n.z * 0.15), Math.atan2(n.x, n.z), 0.5 + h() * 0.6, { l: 0.07, w: 0.008, profil: "lance", base: c("#5c7357"), pointe: c("#9bab92"), nu: 1, nv: 1 });
    }
    for (let k = 0; k < 16; k++) {
      const a = (k / 16) * Math.PI * 2 + h() * 0.4;
      const r = 0.05 + h() * 0.08;
      const pied = new THREE.Vector3(Math.cos(a) * r * 0.4, 0.12, Math.sin(a) * r * 0.4);
      const haut = 0.52 * (0.85 + h() * 0.15);
      const sommet = new THREE.Vector3(Math.cos(a) * (r + 0.1), haut, Math.sin(a) * (r + 0.1));
      const dir = tige(e, pied, sommet, 0.0018, c("#7d8f6f"), 0.05);
      const epi = new THREE.LatheGeometry(Array.from({ length: 7 }, (_, i) => new THREE.Vector2(i === 0 || i === 6 ? 0.002 : 0.0065 + (i % 2) * 0.0025 - i * 0.0004, i * 0.013)), 5);
      e.primitive(epi, repere(sommet, dir), (p) => c("#c9c2dc").lerp(BLANC, p.y / 0.08), 1);
    }
  },
  glaieul(e, h) {
    for (const t of tiges(e, h, 3, 0.1, 1.05, 0.005, 0.04)) {
      for (let k = 0; k < 8; k++) {
        const u = 0.5 + k * 0.065;
        const pos = t.pied.clone().lerp(t.sommet, u);
        const cote = k % 2 ? 0.5 : -0.5;
        const vers = new THREE.Vector3(Math.sin(cote), 0.35, Math.cos(cote)).normalize();
        const bouton = k >= 6;
        couronne(e, repere(pos, vers, (1.4 - k * 0.07) * 1.25), 6, { l: 0.034, w: 0.03, profil: "rond", cuvette: 0.6, courbe: bouton ? 0.6 : -0.25, nu: 2, nv: 2, base: c("#d3c6c6") }, bouton ? 0.12 : 0.95, 0.002, 0, k);
      }
      rubans(e, h, t.pied, 3, 0.6, 0.035, 0.12, -0.15, c("#4f7d52"), "lance");
    }
  },
  hortensia(e, h) {
    const ancres = buisson(e, h, [{ x: 0, y: 0.42, z: 0, r: 0.34 }, { x: 0.26, y: 0.5, z: 0.1, r: 0.26 }, { x: -0.22, y: 0.52, z: -0.12, r: 0.26 }], 0.11, 0.075, c("#3e6b3a"), 30, false);
    for (let k = 0; k < 5; k++) {
      const a = ancres[(k * 7) % ancres.length];
      const centre = a.pos.clone().addScaledVector(a.normale, 0.06);
      const ball = new THREE.IcosahedronGeometry(0.075, 1);
      e.primitive(ball, new THREE.Matrix4().makeTranslation(centre.x, centre.y, centre.z), c("#9a92a8"), 1);
      for (let f = 0; f < 24; f++) {
        const y = 1 - (f / 23) * 1.6;
        const r = Math.sqrt(Math.max(0, 1 - y * y));
        const phi = f * 2.399;
        const n = new THREE.Vector3(Math.cos(phi) * r, y, Math.sin(phi) * r);
        fleurette(e, repere(centre.clone().addScaledVector(n, 0.072), n, 1, h() * 6), 0.024, c("#cfc9d8"));
      }
    }
  },
  dahlia(e, h) {
    for (const t of tiges(e, h, 3, 0.13, 0.86, 0.005, 0.15)) {
      teteDahlia(e, repere(t.sommet, pencher(t.dir, 0.55), 1.35), h);
      for (let k = 0; k < 4; k++) feuille(e, t.pied.clone().lerp(t.sommet, 0.3 + k * 0.12), h() * 6.28, 1.0, { l: 0.1, w: 0.05, profil: "ovale", base: c("#2c4c2a"), pointe: c("#4a7a3c") });
    }
  },
  cosmos(e, h) {
    for (const t of tiges(e, h, 6, 0.15, 0.88, 0.0025, 0.2)) {
      teteComposee(e, repere(t.sommet, pencher(t.dir, 0.45), 1.3), h, { coeur: 0.009, coeurCol: c("#e3b52c"), rayons: 8, l: 0.036, w: 0.024, profil: "rond", nu: 3, nv: 2, echancre: 0.16, cuvette: 0.3, courbe: 0.05, ouverture: 1.4 });
      for (let k = 0; k < 5; k++) feuille(e, t.pied.clone().lerp(t.sommet, 0.15 + k * 0.1), h() * 6.28, 1.0, { l: 0.07, w: 0.004, profil: "lance", nu: 2, nv: 1, cuvette: 0 });
    }
  },
  aster(e, h) {
    for (const t of tiges(e, h, 6, 0.15, 0.78, 0.0028, 0.22)) {
      for (let b = 0; b < 3; b++) {
        const a = b * 2.1 + h();
        const sommet = t.sommet.clone().add(new THREE.Vector3(Math.cos(a) * 0.045, -0.02 - b * 0.03, Math.sin(a) * 0.045));
        const dir = tige(e, t.sommet.clone().setY(t.sommet.y - 0.1), sommet, 0.0018);
        teteComposee(e, repere(sommet, pencher(dir, 0.5), 1.9), h, { coeur: 0.0075, coeurCol: c("#f0c93e"), rayons: 14, l: 0.026, w: 0.0105, profil: "ovale", nu: 2, nv: 1, courbe: 0, ouverture: 1.38 });
      }
      for (let k = 0; k < 2; k++) feuille(e, t.pied.clone().lerp(t.sommet, 0.2 + k * 0.25), h() * 6.28, 1.05, { l: 0.05, w: 0.012, profil: "pointu", nu: 2, nv: 1 });
    }
  },
  graminees(e, h) {
    for (let k = 0; k < 20; k++) feuille(e, new THREE.Vector3((h() - 0.5) * 0.08, 0, (h() - 0.5) * 0.08), h() * 6.28, 0.15 + h() * 0.5, { l: 0.5 + h() * 0.3, w: 0.009, profil: "lance", courbe: -1.3, exp: 1.6, nu: 5, nv: 1, cuvette: 0, base: c("#5d6a3c"), pointe: c("#a99a62") });
    for (const t of tiges(e, h, 9, 0.06, 0.92, 0.0016, 0.3, c("#a2945e"))) {
      const dir = pencher(t.dir, 0.6);
      // l'épi plumeux : six fines barbes qui s'écartent un peu, plus claires au bout
      for (let p = 0; p < 6; p++) petale(e, { l: 0.12 + h() * 0.05, w: 0.01, profil: "lance", nu: 3, nv: 1, cuvette: 0, courbe: -0.45, base: c("#b9ad8c"), pointe: BLANC, teinte: 1 }, repere(t.sommet, dir).multiply(autour(0.003, -0.025 + p * 0.004, (p / 6) * Math.PI * 2 + h(), 0.2 + h() * 0.2)));
    }
  },
  chardon(e, h) {
    for (const t of tiges(e, h, 4, 0.1, 0.76, 0.0045, 0.12, c("#7f927f"))) {
      teteChardon(e, repere(t.sommet, t.dir, 1.35));
      for (let k = 0; k < 4; k++) feuille(e, t.pied.clone().lerp(t.sommet, 0.12 + k * 0.15), h() * 6.28, 1.0, { l: 0.12, w: 0.04, profil: "pointu", ondule: 0.35, nu: 3, base: c("#4d6150"), pointe: c("#8ea08f") });
    }
  },
  mimosa(e, h) {
    const masses = [{ x: 0, y: 0.75, z: 0, r: 0.36 }, { x: 0.25, y: 0.95, z: 0.1, r: 0.28 }, { x: -0.22, y: 1.0, z: -0.08, r: 0.26 }];
    const ancres = buisson(e, h, masses, 0.07, 0.016, c("#5a7a68"), 46);
    const g = new THREE.OctahedronGeometry(1, 0);
    for (let k = 0; k < 140; k++) {
      const a = ancres[Math.floor(h() * ancres.length)];
      const pos = a.pos.clone().add(new THREE.Vector3((h() - 0.5) * 0.12, (h() - 0.5) * 0.08, (h() - 0.5) * 0.12));
      const r = 0.012 + h() * 0.006;
      e.primitive(g.clone(), new THREE.Matrix4().makeTranslation(pos.x, pos.y, pos.z).multiply(new THREE.Matrix4().makeScale(r, r, r)), c("#e8e2c8"), 1);
    }
    g.dispose();
  },
  lilas(e, h) {
    const ancres = buisson(e, h, [{ x: 0, y: 0.7, z: 0, r: 0.36 }, { x: 0.24, y: 0.88, z: 0.1, r: 0.26 }, { x: -0.22, y: 0.92, z: -0.1, r: 0.26 }], 0.09, 0.07, c("#3f6b3a"), 32);
    for (let k = 0; k < 7; k++) {
      const a = ancres[(k * 5 + 3) % ancres.length];
      const dir = a.normale.clone().lerp(Y, 0.6).normalize();
      const pied = a.pos.clone();
      for (let f = 0; f < 24; f++) {
        const u = f / 24;
        const r = 0.05 * (1 - u) + 0.008;
        const phi = f * 2.399;
        const local = new THREE.Vector3(Math.cos(phi) * r, u * 0.17, Math.sin(phi) * r);
        const n = new THREE.Vector3(Math.cos(phi), 0.6, Math.sin(phi)).normalize();
        const m = repere(pied, dir).multiply(repere(local, n));
        fleurette(e, m, 0.013, c("#cdc4d8"));
      }
    }
  },
  camelia(e, h) {
    const ancres = buisson(e, h, [{ x: 0, y: 0.55, z: 0, r: 0.36 }, { x: 0.22, y: 0.82, z: 0.06, r: 0.26 }, { x: -0.2, y: 0.85, z: -0.1, r: 0.24 }], 0.07, 0.04, c("#2e5030"), 38);
    for (let k = 0; k < 8; k++) {
      const a = ancres[(k * 4 + 1) % ancres.length];
      teteCamelia(e, repere(a.pos.clone().addScaledVector(a.normale, 0.02), a.normale, 1.4), h);
    }
  },
};

/** La touffe d'une fleur, prête à être répétée. */
export function touffe(forme: Forme, hauteur: number, graine = 7) {
  const e = new Etabli();
  FABRIQUES[forme](e, hasard(graine));
  return e.geometrie(hauteur);
}
