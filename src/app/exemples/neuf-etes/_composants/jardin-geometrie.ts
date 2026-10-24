import { gammes, type Gamme } from "./donnees";

// Le jardin du visiteur, en mètres : sa surface, sa forme, le côté de la maison, la
// terrasse. On en déduit la zone libre, puis la plus grande coque qui y rentre
// vraiment — pas seulement en surface, mais en longueur et en largeur. Le calcul est
// pur : le plan 2D, la vue 3D et la fiche de prix lisent le même résultat.
//
// Repère : x de gauche à droite, z du haut vers le bas du plan, le jardin centré
// sur l'origine.

export type Forme = "carre" | "rectangle" | "longueur";
export type CoteMaison = "haut" | "gauche" | "droite";

export type Agencement = {
  surface: number;
  forme: Forme;
  maison: CoteMaison;
  terrasse: boolean;
};

export const FORMES: { id: Forme; libelle: string; rapport: number }[] = [
  { id: "carre", libelle: "Carré", rapport: 1 },
  { id: "rectangle", libelle: "Rectangle", rapport: 1.6 },
  { id: "longueur", libelle: "En longueur", rapport: 2.6 },
];

export const COTES: { id: CoteMaison; libelle: string }[] = [
  { id: "haut", libelle: "En haut" },
  { id: "gauche", libelle: "À gauche" },
  { id: "droite", libelle: "À droite" },
];

/** Recul de la piscine par rapport aux limites du terrain et à la terrasse. Un
    mètre : assez pour circuler autour ; la règle locale (PLU) se vérifie à la
    visite technique. Avec 1,5 m, un jardin carré de 60 m² n'accueillait plus rien. */
export const RECUL = 1;
/** Profondeur de la terrasse, le long de la maison. */
export const TERRASSE = 3;
/** Profondeur de la maison, hors du jardin. */
const MAISON_PROFONDEUR = 9;

export type Rect = { x: number; z: number; largeur: number; profondeur: number };

export type Jardin = {
  largeur: number;
  profondeur: number;
  maison: Rect;
  terrasse: Rect | null;
  /** La zone où le bassin peut se poser, recul compris. */
  libre: Rect;
  coque: Gamme | null;
  /** Le bassin posé : son centre et ses dimensions au sol (déjà tourné). */
  bassin: Rect | null;
};

export function calculerJardin({ surface, forme, maison, terrasse }: Agencement): Jardin {
  const rapport = FORMES.find((f) => f.id === forme)?.rapport ?? 1.6;
  const largeur = Math.sqrt(surface * rapport);
  const profondeur = surface / largeur;

  // La maison, hors du jardin, contre le côté choisi ; la terrasse, dedans, contre elle.
  let rectMaison: Rect;
  let rectTerrasse: Rect | null = null;
  let libre: Rect;
  const t = terrasse ? TERRASSE : 0;
  if (maison === "haut") {
    const l = Math.min(largeur * 0.75, 14);
    rectMaison = { x: 0, z: -profondeur / 2 - MAISON_PROFONDEUR / 2, largeur: l, profondeur: MAISON_PROFONDEUR };
    if (terrasse) rectTerrasse = { x: 0, z: -profondeur / 2 + TERRASSE / 2, largeur: l, profondeur: TERRASSE };
    libre = { x: 0, z: t / 2, largeur: largeur - 2 * RECUL, profondeur: profondeur - t - 2 * RECUL };
  } else {
    const signe = maison === "gauche" ? -1 : 1;
    const l = Math.min(profondeur * 0.75, 14);
    rectMaison = { x: signe * (largeur / 2 + MAISON_PROFONDEUR / 2), z: 0, largeur: MAISON_PROFONDEUR, profondeur: l };
    if (terrasse) rectTerrasse = { x: signe * (largeur / 2 - TERRASSE / 2), z: 0, largeur: TERRASSE, profondeur: l };
    libre = { x: -signe * (t / 2), z: 0, largeur: largeur - t - 2 * RECUL, profondeur: profondeur - 2 * RECUL };
  }

  // La plus grande coque permise par la surface, puis on descend jusqu'à celle qui
  // tient dans la zone libre, son grand côté dans le grand côté de la zone.
  const grand = Math.max(libre.largeur, libre.profondeur);
  const petit = Math.min(libre.largeur, libre.profondeur);
  const parSurface = gammes.findIndex((g) => surface <= g.jusqua);
  const plafond = parSurface === -1 ? gammes.length - 1 : parSurface;
  let coque: Gamme | null = null;
  for (let i = plafond; i >= 0; i--) {
    if (gammes[i].longueur <= grand && gammes[i].largeur <= petit) {
      coque = gammes[i];
      break;
    }
  }

  const enLargeur = libre.largeur >= libre.profondeur;
  const bassin = coque
    ? {
        x: libre.x,
        z: libre.z,
        largeur: enLargeur ? coque.longueur : coque.largeur,
        profondeur: enLargeur ? coque.largeur : coque.longueur,
      }
    : null;

  return { largeur, profondeur, maison: rectMaison, terrasse: rectTerrasse, libre, coque, bassin };
}

export const metres = (m: number) => m.toLocaleString("fr-FR", { maximumFractionDigits: 1 });
