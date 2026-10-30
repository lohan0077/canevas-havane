// La forme du mannequin de bois du premier écran : ses pièces, ses rotules, sa pose,
// et les zones que l'on peut toucher. Du calcul pur, sans three.js : le plan 2D de
// secours (rendu côté serveur, visible tout de suite) et la 3D chargée à la demande
// lisent les mêmes mesures, et dessinent donc le même mannequin.
//
// Unités : le mètre, à peu près. Le mannequin regarde vers +z, les pieds à y = 0 ;
// « gauche » est la gauche du mannequin (x > 0), à droite de l'écran quand il fait face.

/** Une pièce tournée : un fuseau aux deux bouts arrondis (membres), ou un œuf (tronc, tête). */
export type Piece = {
  longueur: number;
  haut: number; // rayon près du bout haut
  bas: number; // rayon près du bout bas
  galbe?: number; // renflement au milieu
  forme?: "fuseau" | "oeuf";
  echelleX?: number;
  echelleZ?: number;
};

/**
 * Le profil d'une pièce : n points (rayon, hauteur) du bout bas au bout haut,
 * espacés régulièrement le long de la courbe (le veinage du bois ne s'étire pas).
 */
export function profil(p: Piece, n = 40): [number, number][] {
  const brut: [number, number][] = [];
  const L = p.longueur;
  if (p.forme === "oeuf") {
    // Un superellipsoïde : bouts ronds, flancs pleins.
    for (let i = 0; i <= 160; i++) {
      const t = 0.5 - 0.5 * Math.cos((Math.PI * i) / 160);
      const r = p.bas + (p.haut - p.bas) * t + (p.galbe ?? 0) * Math.sin(Math.PI * t);
      const bout = Math.pow(Math.max(0, 1 - Math.pow(Math.abs(2 * t - 1), 2.3)), 1 / 2.3);
      brut.push([r * bout, (t - 0.5) * L]);
    }
  } else {
    // Un fuseau : deux calottes un peu aplaties, reliées par un flanc légèrement galbé.
    const cb = p.bas * 0.85;
    const ch = p.haut * 0.85;
    const yb = -L / 2 + cb;
    const yh = L / 2 - ch;
    for (let i = 0; i <= 24; i++) {
      const a = -Math.PI / 2 + (i / 24) * (Math.PI / 2);
      brut.push([p.bas * Math.cos(a), yb + cb * Math.sin(a)]);
    }
    for (let i = 1; i < 40; i++) {
      const t = i / 40;
      brut.push([p.bas + (p.haut - p.bas) * t + (p.galbe ?? 0) * Math.sin(Math.PI * t), yb + (yh - yb) * t]);
    }
    for (let i = 0; i <= 24; i++) {
      const a = (i / 24) * (Math.PI / 2);
      brut.push([p.haut * Math.cos(a), yh + ch * Math.sin(a)]);
    }
  }
  // Rééchantillonnage à pas constant le long de la courbe.
  const cumul = [0];
  for (let i = 1; i < brut.length; i++) {
    cumul.push(cumul[i - 1] + Math.hypot(brut[i][0] - brut[i - 1][0], brut[i][1] - brut[i - 1][1]));
  }
  const total = cumul[cumul.length - 1];
  const sortie: [number, number][] = [];
  let j = 1;
  for (let i = 0; i <= n; i++) {
    const s = (i / n) * total;
    while (j < cumul.length - 1 && cumul[j] < s) j++;
    const k = (s - cumul[j - 1]) / (cumul[j] - cumul[j - 1] || 1);
    sortie.push([
      Math.max(1e-4, brut[j - 1][0] + (brut[j][0] - brut[j - 1][0]) * k),
      brut[j - 1][1] + (brut[j][1] - brut[j - 1][1]) * k,
    ]);
  }
  return sortie;
}

/** La longueur de la courbe d'un profil : sert à caler le veinage. */
export const longueurProfil = (pts: [number, number][]) =>
  pts.reduce((s, p, i) => (i ? s + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0), 0);

/* ---------------------------------- les pièces ---------------------------------- */

export const PIECES = {
  bassin: { longueur: 0.165, haut: 0.096, bas: 0.11, forme: "oeuf", echelleX: 1.12, echelleZ: 0.78 },
  ventre: { longueur: 0.14, haut: 0.088, bas: 0.082, galbe: 0.004, forme: "oeuf", echelleX: 1.06, echelleZ: 0.9 },
  thorax: { longueur: 0.37, haut: 0.15, bas: 0.104, galbe: 0.018, forme: "oeuf", echelleX: 1.1, echelleZ: 0.66 },
  cou: { longueur: 0.1, haut: 0.033, bas: 0.038, forme: "fuseau" },
  tete: { longueur: 0.232, haut: 0.086, bas: 0.068, galbe: 0.004, forme: "oeuf", echelleZ: 1.2 },
  bras: { longueur: 0.29, haut: 0.042, bas: 0.032, galbe: 0.003, forme: "fuseau" },
  avantBras: { longueur: 0.255, haut: 0.035, bas: 0.025, galbe: 0.003, forme: "fuseau" },
  main: { longueur: 0.16, haut: 0.038, bas: 0.028, forme: "fuseau", echelleX: 0.42 },
  pouce: { longueur: 0.07, haut: 0.015, bas: 0.012, forme: "fuseau" },
  cuisse: { longueur: 0.375, haut: 0.068, bas: 0.045, galbe: 0.006, forme: "fuseau" },
  jambe: { longueur: 0.35, haut: 0.047, bas: 0.03, galbe: 0.006, forme: "fuseau" },
  pied: { longueur: 0.19, haut: 0.032, bas: 0.04, forme: "fuseau", echelleX: 0.95 },
} satisfies Record<string, Piece>;

/** Les rotules : leur rayon. */
export const ROTULES = { taille: 0.05, cou: 0.034, epaule: 0.049, coude: 0.033, poignet: 0.024, hanche: 0.044, genou: 0.043, cheville: 0.029 };

/** Les articulations : où chaque pivot se trouve dans le repère de son parent. */
export const SQUELETTE = {
  bassin: 1.02, // hauteur du centre du bassin
  hanche: { x: 0.066, y: -0.07 },
  genou: -0.46,
  cheville: -0.43,
  taille: 0.112, // depuis le centre du bassin
  thorax: 0.14, // le bas du thorax, depuis la rotule de la taille
  epaule: { x: 0.188, y: 0.312 },
  coude: -0.37,
  poignet: -0.315,
  cou: 0.39, // depuis le bas du thorax
  tete: 0.1,
};

/** La pose : légère, posée sur la jambe droite, le regard un peu tourné. Radians. */
export const POSE = {
  bassin: { x: 0, y: -0.05, z: -0.06 },
  taille: { x: 0.02, y: 0.04, z: 0.03 },
  thorax: { x: -0.03, y: 0.06, z: 0.04 },
  tete: { x: 0.07, y: 0.26, z: -0.05 },
  epauleG: { x: 0.12, y: 0, z: 0.16 },
  epauleD: { x: -0.08, y: 0, z: -0.14 },
  coudeG: { x: -0.48, y: 0, z: -0.05 },
  coudeD: { x: -0.22, y: 0, z: 0.04 },
  poignetG: { x: 0.1, y: 0.3, z: 0 },
  poignetD: { x: 0.04, y: -0.25, z: 0 },
  hancheG: { x: -0.2, y: 0.12, z: 0.1 },
  hancheD: { x: 0.03, y: 0, z: 0.035 },
  genouG: { x: 0.36, y: 0, z: 0 },
  genouD: { x: 0.015, y: 0, z: 0 },
  chevilleG: { x: -0.2, y: 0, z: -0.04 },
  chevilleD: { x: -0.04, y: 0, z: -0.03 },
};

/* ----------------------------------- les zones ----------------------------------- */

export type IdZone = "tete" | "epaules" | "dos" | "ventre" | "basDuDos";

/** Où se tient une tache de lumière : l'articulation qui la porte, et le point dans son repère. */
export type Ancre =
  | "tete" | "cou" | "epauleG" | "epauleD" | "thorax" | "taille" | "bassin";

export type Tache = { zone: IdZone; ancre: Ancre; x: number; y: number; z: number; rayon: number };

/** Les taches de lumière de chaque zone, dans le repère de l'articulation qui les porte. */
export const TACHES: Tache[] = [
  { zone: "tete", ancre: "tete", x: 0, y: 0.12, z: 0.0, rayon: 0.16 },
  { zone: "tete", ancre: "cou", x: 0, y: 0.05, z: 0, rayon: 0.08 },
  { zone: "epaules", ancre: "epauleG", x: 0.005, y: 0.012, z: 0, rayon: 0.11 },
  { zone: "epaules", ancre: "epauleD", x: -0.005, y: 0.012, z: 0, rayon: 0.11 },
  { zone: "dos", ancre: "thorax", x: 0, y: 0.22, z: -0.1, rayon: 0.19 },
  { zone: "ventre", ancre: "taille", x: 0, y: 0.085, z: 0.082, rayon: 0.12 },
  { zone: "ventre", ancre: "thorax", x: 0, y: 0.02, z: 0.07, rayon: 0.08 },
  { zone: "basDuDos", ancre: "taille", x: 0, y: 0.07, z: -0.08, rayon: 0.12 },
  { zone: "basDuDos", ancre: "bassin", x: 0, y: 0.04, z: -0.085, rayon: 0.09 },
];

/** Le repère visible de chaque zone : une pastille posée à la surface du bois. */
export const REPERES: Record<IdZone, { ancre: Ancre; x: number; y: number; z: number }> = {
  tete: { ancre: "tete", x: 0.092, y: 0.13, z: 0.03 },
  epaules: { ancre: "epauleG", x: 0.015, y: 0.056, z: 0.01 },
  dos: { ancre: "thorax", x: 0.02, y: 0.24, z: -0.112 },
  ventre: { ancre: "taille", x: 0, y: 0.085, z: 0.09 },
  basDuDos: { ancre: "taille", x: 0, y: 0.07, z: -0.09 },
};

/** L'angle (radians, autour de la verticale) sous lequel chaque zone se montre le mieux. */
export const VUES: Record<IdZone, number> = {
  tete: -0.55,
  epaules: -0.42,
  dos: Math.PI - 0.38,
  ventre: 0.12,
  basDuDos: Math.PI + 0.32,
};
