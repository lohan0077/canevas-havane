// Les fleurs du jardin de l'accueil : vingt-deux espèces, toutes prises dans le
// calendrier du site (`MOIS` : la fleur du mois et celles qui l'accompagnent). Les mois
// de floraison ne sont pas écrits ici : ils sont lus dans `MOIS`, pour que le jardin
// ne puisse jamais dire autre chose que le calendrier. Seuls les « feuillages » de
// novembre n'y sont pas : ce ne sont pas des fleurs.
//
// La signification vient du langage des fleurs, une tradition (le XIXe siècle en a
// fait des dictionnaires, qui ne disent pas toujours la même chose) : le site la
// présente comme telle, jamais comme un fait. Les graminées n'en ont pas : on le dit.

import { MOIS } from "./donnees";

export type Forme =
  | "anemone" | "renoncule" | "hellebore" | "mimosa" | "jacinthe" | "narcisse" | "tulipe"
  | "lilas" | "pivoine" | "iris" | "rose" | "marguerite" | "tournesol" | "lavande"
  | "glaieul" | "hortensia" | "dahlia" | "cosmos" | "aster" | "graminees" | "chardon" | "camelia";

export type Espece = {
  id: Forme;
  nom: string;
  /** « des anémones », « du mimosa » : pour dire ce que contient la composition. */
  pluriel: string;
  /** Les noms sous lesquels `MOIS` la cite, en minuscules. */
  cles: string[];
  /** Le langage des fleurs, sans majuscule ; `null` quand la tradition n'en dit rien. */
  signification: string | null;
  /** Les couleurs que la fleur prend dans le jardin (pétales). */
  couleurs: string[];
  /** Hauteur de la plante, en mètres (pour la 3D et le plan). */
  hauteur: number;
};

export const ESPECES: Espece[] = [
  { id: "anemone", nom: "Anémone", pluriel: "anémones", cles: ["anémone"], signification: "l'abandon", couleurs: ["#C8102E", "#6A2C91", "#F4F1F4"], hauteur: 0.36 },
  { id: "renoncule", nom: "Renoncule", pluriel: "renoncules", cles: ["renoncule"], signification: "le charme", couleurs: ["#F49A73", "#F6C9D2", "#E8553E"], hauteur: 0.42 },
  { id: "hellebore", nom: "Hellébore", pluriel: "hellébores", cles: ["hellébore"], signification: "l'apaisement : « calme mon angoisse »", couleurs: ["#ECE9D6", "#CFA3B8", "#6E2A4C"], hauteur: 0.38 },
  { id: "mimosa", nom: "Mimosa", pluriel: "branches de mimosa", cles: ["mimosa"], signification: "la certitude", couleurs: ["#F7D21E"], hauteur: 1.25 },
  { id: "jacinthe", nom: "Jacinthe", pluriel: "jacinthes", cles: ["jacinthe"], signification: "le jeu", couleurs: ["#4F63C9", "#E9A2C6", "#F4F1F8"], hauteur: 0.28 },
  { id: "narcisse", nom: "Narcisse", pluriel: "narcisses", cles: ["narcisse"], signification: "l'amour de soi", couleurs: ["#F7F2DE", "#F6D64A"], hauteur: 0.42 },
  { id: "tulipe", nom: "Tulipe", pluriel: "tulipes", cles: ["tulipe"], signification: "la déclaration d'amour", couleurs: ["#E2443A", "#F28A35", "#F4AFC0", "#F6F0E4"], hauteur: 0.5 },
  { id: "lilas", nom: "Lilas", pluriel: "branches de lilas", cles: ["lilas"], signification: "les premiers émois", couleurs: ["#B699DC", "#EDE6F6", "#8E68C4"], hauteur: 1.25 },
  { id: "pivoine", nom: "Pivoine", pluriel: "pivoines", cles: ["pivoine"], signification: "la sincérité", couleurs: ["#F3A2B8", "#F7E6E8", "#C2185B"], hauteur: 0.75 },
  { id: "iris", nom: "Iris", pluriel: "iris", cles: ["iris"], signification: "le message", couleurs: ["#4B3A9E", "#7E6BD3"], hauteur: 0.8 },
  { id: "rose", nom: "Rose", pluriel: "roses", cles: ["rose"], signification: "l'amour, selon sa couleur", couleurs: ["#C41E3A", "#F29BA9", "#F6E6D4", "#F4A35E"], hauteur: 0.95 },
  { id: "marguerite", nom: "Marguerite", pluriel: "marguerites", cles: ["marguerite"], signification: "l'innocence", couleurs: ["#FAFAF7"], hauteur: 0.6 },
  { id: "tournesol", nom: "Tournesol", pluriel: "tournesols", cles: ["tournesol"], signification: "la fierté", couleurs: ["#F6B81C", "#F2A516"], hauteur: 1.3 },
  { id: "lavande", nom: "Lavande", pluriel: "brins de lavande", cles: ["lavande"], signification: "la méfiance", couleurs: ["#7C68C9", "#6A55B8"], hauteur: 0.55 },
  { id: "glaieul", nom: "Glaïeul", pluriel: "glaïeuls", cles: ["glaïeul"], signification: "le rendez-vous", couleurs: ["#EC4E70", "#F7F1F1", "#F2906A"], hauteur: 1.1 },
  { id: "hortensia", nom: "Hortensia", pluriel: "hortensias", cles: ["hortensia"], signification: "le caprice", couleurs: ["#86A9E6", "#EBA6C6", "#F2EFF7"], hauteur: 0.95 },
  { id: "dahlia", nom: "Dahlia", pluriel: "dahlias", cles: ["dahlia", "derniers dahlias"], signification: "la reconnaissance", couleurs: ["#E8622C", "#B3123F", "#F5B3C6", "#F6EEE4"], hauteur: 0.9 },
  { id: "cosmos", nom: "Cosmos", pluriel: "cosmos", cles: ["cosmos"], signification: "l'harmonie", couleurs: ["#E46CA5", "#F7EFF4", "#A8205A"], hauteur: 0.9 },
  { id: "aster", nom: "Aster", pluriel: "asters", cles: ["aster"], signification: "la délicatesse", couleurs: ["#C9B6F2", "#A889E6", "#B7A0EA"], hauteur: 0.82 },
  { id: "graminees", nom: "Graminées", pluriel: "graminées", cles: ["graminées"], signification: null, couleurs: ["#D9BF8C", "#CDB27A"], hauteur: 0.95 },
  { id: "chardon", nom: "Chardon", pluriel: "chardons", cles: ["chardon"], signification: "l'austérité", couleurs: ["#8FA4D2", "#A9B6D6"], hauteur: 0.8 },
  { id: "camelia", nom: "Camélia", pluriel: "camélias", cles: ["camélia"], signification: "l'admiration", couleurs: ["#D3263D", "#F5C3CF", "#F6F1EC"], hauteur: 1.1 },
];

export const ESPECE = Object.fromEntries(ESPECES.map((e) => [e.id, e])) as Record<Forme, Espece>;

const cites = (n: number) => [MOIS[n - 1].fleur, ...MOIS[n - 1].aussi].map((s) => s.toLowerCase());

/** Les mois (1 à 12) où le calendrier du site cite cette fleur. */
export const moisDe = (e: Espece) => MOIS.filter((m) => cites(m.n).some((c) => e.cles.includes(c))).map((m) => m.n);

/** Les fleurs d'un mois, dans l'ordre du calendrier : la fleur du mois d'abord. */
export const fleursDuMois = (n: number): Espece[] =>
  cites(n).map((c) => ESPECES.find((e) => e.cles.includes(c))).filter((e): e is Espece => Boolean(e));

/** Est-elle de saison ce mois-ci ? */
export const deSaison = (e: Espece, courant: number) => moisDe(e).includes(courant);

/** Le prochain mois où elle refleurit, vu depuis `courant` (jamais `courant` lui-même). */
export function prochainMois(e: Espece, courant: number) {
  const mois = moisDe(e);
  for (let k = 1; k <= 12; k++) {
    const n = ((courant - 1 + k) % 12) + 1;
    if (mois.includes(n)) return n;
  }
  return courant;
}

const nomMois = (n: number) => MOIS[n - 1].nom.toLowerCase();
const voyelle = (n: number) => /^[aeiouyéèêàâîôû]/i.test(MOIS[n - 1].nom);
const de = (n: number) => (voyelle(n) ? "d'" : "de ") + nomMois(n);

/**
 * La période de floraison, en toutes lettres et dans l'ordre de l'année qui tourne :
 * « en mai », « en juillet et août », « d'août à octobre », « de décembre à février »,
 * « en janvier, mars et avril ».
 */
export function periode(e: Espece) {
  const mois = moisDe(e);
  if (mois.length === 0) return "";
  // Le début d'une suite : le mois dont le précédent n'en est pas.
  const debut = mois.find((n) => !mois.includes(((n + 10) % 12) + 1)) ?? mois[0];
  const ordre = Array.from({ length: 12 }, (_, k) => ((debut - 1 + k) % 12) + 1).filter((n) => mois.includes(n));
  const suite = ordre.every((n, i) => i === 0 || ((ordre[i - 1] % 12) + 1) === n);
  if (ordre.length === 1) return `en ${nomMois(ordre[0])}`;
  if (suite && ordre.length === 2) return `en ${nomMois(ordre[0])} et ${nomMois(ordre[1])}`;
  if (suite) return `${de(ordre[0])} à ${nomMois(ordre[ordre.length - 1])}`;
  return `en ${ordre.slice(0, -1).map(nomMois).join(", ")} et ${nomMois(ordre[ordre.length - 1])}`;
}

/**
 * La couleur d'une fleur dans un massif : la même règle que le jardin en 3D, une
 * couleur principale par massif et une seconde de temps en temps (`k` : la k-ième tige).
 */
export function couleurDans(e: Espece, mois: number, k = 0) {
  const rang = Math.max(0, fleursDuMois(mois).findIndex((f) => f.id === e.id));
  const premiere = (mois + rang * 2) % e.couleurs.length;
  return e.couleurs[k % 3 === 2 ? (premiere + 1) % e.couleurs.length : premiere];
}

/** « pas avant mars » */
export const pasAvant = (e: Espece, courant: number) => `pas avant ${nomMois(prochainMois(e, courant))}`;
