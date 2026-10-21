// Les données du site La Coulée, savonnerie fictive. Lots, dates, prix : exemples.
// Le carnet est arrêté au 17 octobre 2026, la date de la vidéo : les états (« au
// séchoir », « en ligne », « épuisé ») en découlent, pas de l'horloge du visiteur.
//
// Aucune allégation sur la peau (règl. (CE) 1223/2009, art. 20 ; règl. (UE)
// 655/2013) : on décrit ce qu'il y a dans le savon et comment il est fait, jamais ce
// qu'il « fait ». Les listes d'ingrédients sont des exemples vraisemblables en noms
// INCI ; pour un vrai savon, c'est l'évaluateur de la sécurité qui les arrête.

export const DOSSIER = "/exemples/la-coulee";
export const CARNET_AU = "17 octobre 2026";

export const CONTACT = {
  telephone: "01 99 00 04 47", // tranche réservée à la fiction par l'ARCEP
  adresse: "12 rue de l'Exemple · atelier au fond de la cour",
  horaires: "L'atelier ouvre le mercredi où un lot sort du séchoir, de 14 h à 19 h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#lot`, libelle: "Ton numéro" },
  { href: `${DOSSIER}/sechoir`, libelle: "Le séchoir" },
  { href: `${DOSSIER}/savons`, libelle: "Les savons" },
  { href: `${DOSSIER}/saponifie-a-froid`, libelle: "Saponifié à froid ?" },
  { href: `${DOSSIER}#atelier`, libelle: "L'atelier" },
];

export type Recette = {
  id: "simple" | "lavande" | "romarin";
  nom: string;
  inci: string;
  phrase: string;
  teinte: string;
};

export const RECETTES: Record<Recette["id"], Recette> = {
  simple: {
    id: "simple",
    nom: "Le Simple",
    inci: "Sodium Olivate, Sodium Cocoate, Aqua, Glycerin",
    phrase: "Huile d'olive et huile de coco, devenues savon.",
    teinte: "#EFE6D2",
  },
  lavande: {
    id: "lavande",
    nom: "Savon à la lavande",
    inci: "Sodium Olivate, Sodium Cocoate, Aqua, Glycerin, Lavandula Angustifolia Oil, Linalool",
    phrase: "La même base, et de l'huile essentielle de lavande.",
    teinte: "#DCD3EA",
  },
  romarin: {
    id: "romarin",
    nom: "Savon au romarin",
    inci: "Sodium Olivate, Sodium Cocoate, Aqua, Glycerin, Rosmarinus Officinalis Leaf Oil, Limonene, Linalool",
    phrase: "La même base, et de l'huile essentielle de romarin.",
    teinte: "#DCE3CF",
  },
};

export type Etat = "epuise" | "pret" | "sechoir";

export type Lot = {
  numero: string;      // « 047 »
  recette: Recette["id"];
  coule: string;       // date de coulée
  sortie: string;      // sortie du séchoir
  sortieCourte: string;
  ddm: string;         // durabilité minimale, mois/année
  savons: number;
  etat: Etat;
  coulePar: string;    // une initiale
  jours: number;       // jours de séchoir au 17 octobre 2026 (cure : 35 jours)
};

export const LOTS: Lot[] = [
  { numero: "045", recette: "simple", coule: "5 août 2026", sortie: "mercredi 9 septembre", sortieCourte: "9 sept.", ddm: "08/2027", savons: 96, etat: "epuise", coulePar: "C.", jours: 73 },
  { numero: "046", recette: "romarin", coule: "19 août 2026", sortie: "mercredi 23 septembre", sortieCourte: "23 sept.", ddm: "08/2027", savons: 96, etat: "epuise", coulePar: "M.", jours: 59 },
  { numero: "047", recette: "lavande", coule: "2 septembre 2026", sortie: "mercredi 7 octobre", sortieCourte: "7 oct.", ddm: "09/2027", savons: 96, etat: "epuise", coulePar: "C.", jours: 45 },
  { numero: "048", recette: "lavande", coule: "16 septembre 2026", sortie: "mercredi 21 octobre", sortieCourte: "21 oct.", ddm: "09/2027", savons: 96, etat: "pret", coulePar: "M.", jours: 31 },
  { numero: "049", recette: "simple", coule: "30 septembre 2026", sortie: "mercredi 4 novembre", sortieCourte: "4 nov.", ddm: "09/2027", savons: 96, etat: "sechoir", coulePar: "C.", jours: 17 },
  { numero: "050", recette: "romarin", coule: "14 octobre 2026", sortie: "mercredi 18 novembre", sortieCourte: "18 nov.", ddm: "10/2027", savons: 96, etat: "sechoir", coulePar: "M.", jours: 3 },
];

export const CURE = 35;
export const PROCHAIN = LOTS.find((l) => l.etat === "pret")!;
export const PRIX = 8; // € TTC, exemple, le savon de 100 g

export const ETATS: Record<Etat, string> = {
  epuise: "Épuisé",
  pret: "Sort mercredi",
  sechoir: "Au séchoir",
};

/** « 047 », « 47 », « lot 47 » → le lot, s'il existe. */
export const trouverLot = (saisie: string) => {
  const n = saisie.replace(/\D/g, "");
  if (!n) return undefined;
  return LOTS.find((l) => Number(l.numero) === Number(n));
};

export const PHOTOS = {
  rang: { src: "/exemples/la-coulee/rang-de-savons.webp", largeur: 1400, hauteur: 933, alt: "Sept pains de savon debout, alignés sur une table claire" },
  cure: { src: "/exemples/la-coulee/savons-en-cure.webp", largeur: 1200, hauteur: 800, alt: "Des pains de savon rangés serrés, pendant leur séchage" },
  deux: { src: "/exemples/la-coulee/deux-savons.webp", largeur: 1000, hauteur: 667, alt: "Deux savons, l'un blanc, l'autre vert olive, posés sur une poudre blanche" },
  lavande: { src: "/exemples/la-coulee/lavande-en-bottes.webp", largeur: 900, hauteur: 600, alt: "Des bottes de lavande séchée, liées par une ficelle" },
};

export const QUESTIONS = [
  {
    q: "Pourquoi mon savon préféré n'est plus disponible ?",
    r: "Parce que son lot est épuisé. Un lot, c'est 96 savons coulés le même jour. Le suivant sort du séchoir cinq semaines après sa coulée : le séchoir dit quand.",
  },
  {
    q: "Ce savon convient-il à ma peau ?",
    r: "On ne promet rien sur la peau. La liste complète des ingrédients est sur chaque lot et sur l'étiquette ; en cas d'allergie connue à l'un d'eux, demande conseil à un professionnel de santé.",
  },
  {
    q: "Combien de temps se garde-t-il ?",
    r: "La date est sur l'étiquette : « à utiliser de préférence avant fin… », suivie du mois et de l'année. Elle est fixée lors de l'évaluation de la sécurité du produit.",
  },
  {
    q: "Que veut dire « Sodium Olivate » ?",
    r: "C'est le nom de l'huile d'olive une fois devenue savon, dans la nomenclature internationale des ingrédients (INCI) qu'utilisent toutes les étiquettes de cosmétiques.",
  },
];
