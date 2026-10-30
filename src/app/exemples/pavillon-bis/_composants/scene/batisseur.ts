import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// Les outils de maçonnerie de la maquette : des boîtes aux coordonnées des plans
// (deux coins, en mètres), des toits à deux ou quatre pans, et un « lot » qui fond
// toutes les pièces d'une même matière en un seul objet — trois maisons de deux cents
// pièces chacune restent ainsi une soixantaine d'appels de dessin.

/** Une boîte dont les UV sont en mètres (divisés par `echelle`), pour des matières qui ne s'étirent pas. */
export function boiteGeo(l: number, h: number, p: number, echelle = 1) {
  const g = new THREE.BoxGeometry(l, h, p);
  const uv = g.attributes.uv as THREE.BufferAttribute;
  // faces dans l'ordre +x, -x, +y, -y, +z, -z ; quatre sommets chacune
  const dims: [number, number][] = [[p, h], [p, h], [l, p], [l, p], [l, h], [l, h]];
  for (let f = 0; f < 6; f++)
    for (let k = 0; k < 4; k++) {
      const i = f * 4 + k;
      uv.setXY(i, (uv.getX(i) * dims[f][0]) / echelle, (uv.getY(i) * dims[f][1]) / echelle);
    }
  return g;
}

/** Un polygone plan (sommets dans l'ordre trigonométrique vu de dehors), UV en mètres dans son plan. */
function polygone(points: THREE.Vector3[], echelle: number, inverse = false) {
  const p0 = points[0];
  const u = points[1].clone().sub(p0).normalize();
  const n = new THREE.Vector3().subVectors(points[1], p0).cross(new THREE.Vector3().subVectors(points[2], p0)).normalize();
  const v = n.clone().cross(u);
  const pos: number[] = [];
  const uv: number[] = [];
  for (const p of points) {
    pos.push(p.x, p.y, p.z);
    const d = p.clone().sub(p0);
    uv.push(d.dot(u) / echelle, d.dot(v) / echelle);
  }
  const index: number[] = [];
  for (let i = 1; i < points.length - 1; i++) {
    if (inverse) index.push(0, i + 1, i);
    else index.push(0, i, i + 1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(index);
  g.computeVertexNormals();
  return g;
}

export type Toit = { dessus: THREE.BufferGeometry[]; dessous: THREE.BufferGeometry[]; rives: THREE.BufferGeometry[] };

/** Un pan de toit épais : la face tuilée, la sous-face, et les rives sur les bords libres. */
function pans(faces: THREE.Vector3[][], bordLibre: (a: THREE.Vector3, b: THREE.Vector3) => boolean, epaisseur: number, echelle: number): Toit {
  const bas = new THREE.Vector3(0, -epaisseur, 0);
  const t: Toit = { dessus: [], dessous: [], rives: [] };
  for (const f of faces) {
    t.dessus.push(polygone(f, echelle));
    t.dessous.push(polygone(f.map((p) => p.clone().add(bas)), 1, true));
    for (let i = 0; i < f.length; i++) {
      const a = f[i];
      const b = f[(i + 1) % f.length];
      if (!bordLibre(a, b)) continue;
      t.rives.push(polygone([a.clone().add(bas), b.clone().add(bas), b, a], 1));
    }
  }
  return t;
}

/**
 * Toit à quatre pans sur un rectangle `l` × `p` (l ≥ p), débord compris dans le calcul.
 * Origine : le centre du rectangle des murs, au niveau du haut des murs.
 */
export function toitQuatrePans(l: number, p: number, pente: number, debord: number, epaisseur = 0.16, echelle = 2): Toit {
  const L = l / 2 + debord;
  const P = p / 2 + debord;
  const r = (l - p) / 2;
  const h = P * pente;
  const y0 = -debord * pente; // le bord du débord descend sous le haut des murs
  const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y + y0, z);
  const faces = [
    [V(-L, 0, P), V(L, 0, P), V(r, h, 0), V(-r, h, 0)],
    [V(L, 0, -P), V(-L, 0, -P), V(-r, h, 0), V(r, h, 0)],
    [V(L, 0, P), V(L, 0, -P), V(r, h, 0)],
    [V(-L, 0, -P), V(-L, 0, P), V(-r, h, 0)],
  ];
  return pans(faces, (a, b) => Math.abs(a.y - y0) < 1e-4 && Math.abs(b.y - y0) < 1e-4, epaisseur, echelle);
}

/** Toit à deux pans, faîtage parallèle à la façade (axe x). */
export function toitDeuxPans(l: number, p: number, pente: number, debord: number, epaisseur = 0.16, echelle = 2): Toit {
  const L = l / 2 + debord;
  const P = p / 2 + debord;
  const h = P * pente;
  const y0 = -debord * pente;
  const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y + y0, z);
  const faces = [
    [V(-L, 0, P), V(L, 0, P), V(L, h, 0), V(-L, h, 0)],
    [V(L, 0, -P), V(-L, 0, -P), V(-L, h, 0), V(L, h, 0)],
  ];
  // bords libres : l'égout (en bas) et les rives des pignons (x = ±L)
  return pans(
    faces,
    (a, b) => (Math.abs(a.y - y0) < 1e-4 && Math.abs(b.y - y0) < 1e-4) || (Math.abs(Math.abs(a.x) - L) < 1e-4 && Math.abs(a.x - b.x) < 1e-4),
    epaisseur,
    echelle,
  );
}

/** Le triangle d'un pignon, plein, d'épaisseur `e` (axe x), au-dessus des murs. */
export function pignonGeo(p: number, pente: number, e: number, echelle = 2) {
  const h = (p / 2) * pente;
  const forme = new THREE.Shape([new THREE.Vector2(-p / 2, 0), new THREE.Vector2(p / 2, 0), new THREE.Vector2(0, h)]);
  const g = new THREE.ExtrudeGeometry(forme, { depth: e, bevelEnabled: false });
  g.translate(0, 0, -e / 2);
  g.rotateY(Math.PI / 2);
  const uv = g.attributes.uv as THREE.BufferAttribute;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / echelle, uv.getY(i) / echelle);
  return g;
}

/** Un lot de pièces rangées par matière, fondues à la fin. */
export class Lot {
  private pieces = new Map<string, THREE.BufferGeometry[]>();

  ajouter(cle: string, geo: THREE.BufferGeometry, x = 0, y = 0, z = 0, rotY = 0) {
    if (rotY) geo.rotateY(rotY);
    geo.translate(x, y, z);
    // les géométries fondues doivent porter les mêmes attributs
    if (!geo.index) geo.setIndex([...Array(geo.attributes.position.count).keys()]);
    geo.clearGroups();
    for (const nom of Object.keys(geo.attributes)) if (nom !== "position" && nom !== "normal" && nom !== "uv") geo.deleteAttribute(nom);
    const liste = this.pieces.get(cle) ?? [];
    liste.push(geo);
    this.pieces.set(cle, liste);
    return this;
  }

  /** Une boîte entre deux coins opposés. */
  entre(cle: string, x0: number, y0: number, z0: number, x1: number, y1: number, z1: number, echelle = 1) {
    const g = boiteGeo(Math.abs(x1 - x0), Math.abs(y1 - y0), Math.abs(z1 - z0), echelle);
    return this.ajouter(cle, g, (x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  }

  /** Un cylindre debout, posé sur `y`. */
  cylindre(cle: string, rayon: number, h: number, x: number, y: number, z: number, cotes = 14, rayonHaut = rayon) {
    return this.ajouter(cle, new THREE.CylinderGeometry(rayonHaut, rayon, h, cotes), x, y + h / 2, z);
  }

  toit(t: Toit, cles: { dessus: string; dessous: string; rives: string }, x = 0, y = 0, z = 0, rotY = 0) {
    t.dessus.forEach((g) => this.ajouter(cles.dessus, g, x, y, z, rotY));
    t.dessous.forEach((g) => this.ajouter(cles.dessous, g, x, y, z, rotY));
    t.rives.forEach((g) => this.ajouter(cles.rives, g, x, y, z, rotY));
    return this;
  }

  get vide() {
    return this.pieces.size === 0;
  }

  /** Fond chaque matière en un seul objet. `ombres` : porte et reçoit les ombres. */
  finir(matieres: Record<string, THREE.Material>, ombres = true) {
    const groupe = new THREE.Group();
    for (const [cle, liste] of this.pieces) {
      const m = matieres[cle];
      if (!m) throw new Error(`matière inconnue : ${cle}`);
      const geo = mergeGeometries(liste, false);
      liste.forEach((g) => g.dispose());
      if (!geo) continue;
      const objet = new THREE.Mesh(geo, m);
      objet.castShadow = ombres;
      objet.receiveShadow = ombres;
      objet.name = cle;
      groupe.add(objet);
    }
    this.pieces.clear();
    return groupe;
  }
}

/** Libère tout ce qu'un objet porte de géométries (les matières sont partagées, libérées à part). */
export function libererGeometries(o: THREE.Object3D) {
  o.traverse((n) => {
    if (n instanceof THREE.Mesh) n.geometry.dispose();
  });
}

/* ------------------------------ courbes ------------------------------ */

export const borne = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
/** 0 avant `de`, 1 après `a`, lissé entre les deux. */
export const lisse = (de: number, a: number, t: number) => {
  const x = borne((t - de) / (a - de));
  return x * x * (3 - 2 * x);
};
export const lineaire = (de: number, a: number, t: number) => borne((t - de) / (a - de));
export const sortieDouce = (x: number) => 1 - Math.pow(1 - x, 3);
export const entreeDouce = (x: number) => x * x * x;
export const aller = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
/** Arrive un peu au-delà, puis se pose : pour ce qui sort du sol. */
export const rebond = (x: number) => {
  const c1 = 1.4;
  const c3 = c1 + 1;
  return x <= 0 ? 0 : x >= 1 ? 1 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
