// Les données du site Souvenance, savonnerie fictive filmée dans les deux vidéos des
// cosmétiques : « Créer une marque » (pas de type de peau, une seule question — ça
// sentait quoi, chez toi, enfant ?) et « Remplir l'agenda » (le numéro de lot devient
// la page d'accueil ; le séchoir, le rendez-vous). Prix, lots, dates, ingrédients :
// exemples.
//
// Aucune allégation sur la peau (règl. (CE) 1223/2009, art. 20 ; règl. (UE) 655/2013) :
// un savon porte le nom d'un souvenir, on décrit son odeur et ce qu'il contient, jamais
// un effet. Les noms évoquent des lieux, pas des aliments. Le numéro de lot et la liste
// des ingrédients sont obligatoires : le site les montre, il ne s'en fait pas un mérite.
// Ni « artisanal », ni « naturel », ni « bio » : rien ne l'établit. « Fait main » l'est.
//
// Le carnet est arrêté au 17 octobre 2026, la date des vidéos : les états (« au séchoir »,
// « sort mercredi », « épuisé ») en découlent, pas de l'horloge du visiteur.

export const DOSSIER = "/exemples/souvenance";
export const CARNET_AU = "17 octobre 2026";

export const CONTACT = {
  telephone: "01 99 00 77 31", // tranche réservée à la fiction par l'ARCEP
  adresse: "12 rue de l'Exemple · boutique-atelier au fond de la cour",
  horaires: "Du mardi au samedi, de 10 h à 19 h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#souvenir`, libelle: "Ton savon" },
  { href: `${DOSSIER}/savons`, libelle: "Les savons" },
  { href: `${DOSSIER}/sechoir`, libelle: "Le séchoir" },
  { href: `${DOSSIER}/saponifie-a-froid`, libelle: "Saponifié à froid ?" },
  { href: `${DOSSIER}/prochain-savon`, libelle: "Le prochain" },
];

export type SlugSavon = "linge" | "armoire" | "pluie";

export type Savon = {
  slug: SlugSavon;
  nom: string;          // le nom du savon
  souvenir: string;     // la réponse à la question
  odeur: string;        // ce qu'on sent, décrit sans promesse
  inci: string;
  fond: string;
  bord: string;
};

export const SAVONS: Savon[] = [
  {
    slug: "linge",
    nom: "Le linge au soleil",
    souvenir: "Le linge qui sèche au soleil",
    odeur: "Une odeur de drap propre, d'air et de coton chaud.",
    inci: "Sodium Olivate, Sodium Cocoate, Aqua, Glycerin, Parfum, Linalool, Limonene",
    fond: "#FBF8F2",
    bord: "#E2D8C6",
  },
  {
    slug: "armoire",
    nom: "L'armoire de mamie",
    souvenir: "L'armoire de ta grand-mère",
    odeur: "Le bois ciré, la lavande glissée entre les draps, un peu de cèdre.",
    inci: "Sodium Olivate, Sodium Cocoate, Aqua, Glycerin, Lavandula Angustifolia Oil, Cedrus Atlantica Bark Oil, Linalool, Limonene",
    fond: "#E9DDF0",
    bord: "#BFA9CF",
  },
  {
    slug: "pluie",
    nom: "Après la pluie",
    souvenir: "Le jardin après la pluie",
    odeur: "La terre mouillée, les feuilles vertes, l'herbe qu'on vient de couper.",
    inci: "Sodium Olivate, Sodium Cocoate, Aqua, Glycerin, Parfum, Citronellol, Geraniol, Linalool",
    fond: "#DCE5D3",
    bord: "#A9BC98",
  },
];

export const savonDe = (slug: SlugSavon) => SAVONS.find((s) => s.slug === slug)!;

export const PRIX = 9; // € TTC, exemple, le savon de 100 g

export type Etat = "epuise" | "pret" | "sechoir";

export type Lot = {
  numero: string;      // « 047 »
  savon: SlugSavon;
  coule: string;       // date de coulée
  sortie: string;      // sortie du séchoir
  sortieCourte: string;
  ddm: string;         // durabilité minimale, mois/année
  savons: number;
  etat: Etat;
  coulePar: string;    // une initiale
  jours: number;       // jours de séchoir au 17 octobre 2026 (cure : 35 jours)
};

// Un lot : 96 savons coulés le même jour, cinq semaines de séchoir. Le lot 047 est
// celui de la vidéo « Remplir l'agenda » (coulé le 2 septembre, sorti le 7 octobre).
export const LOTS: Lot[] = [
  { numero: "045", savon: "linge", coule: "5 août 2026", sortie: "mercredi 9 septembre", sortieCourte: "9 sept.", ddm: "08/2027", savons: 96, etat: "epuise", coulePar: "C.", jours: 73 },
  { numero: "046", savon: "pluie", coule: "19 août 2026", sortie: "mercredi 23 septembre", sortieCourte: "23 sept.", ddm: "08/2027", savons: 96, etat: "epuise", coulePar: "M.", jours: 59 },
  { numero: "047", savon: "armoire", coule: "2 septembre 2026", sortie: "mercredi 7 octobre", sortieCourte: "7 oct.", ddm: "09/2027", savons: 96, etat: "epuise", coulePar: "C.", jours: 45 },
  { numero: "048", savon: "armoire", coule: "16 septembre 2026", sortie: "mercredi 21 octobre", sortieCourte: "21 oct.", ddm: "09/2027", savons: 96, etat: "pret", coulePar: "M.", jours: 31 },
  { numero: "049", savon: "linge", coule: "30 septembre 2026", sortie: "mercredi 4 novembre", sortieCourte: "4 nov.", ddm: "09/2027", savons: 96, etat: "sechoir", coulePar: "C.", jours: 17 },
  { numero: "050", savon: "pluie", coule: "14 octobre 2026", sortie: "mercredi 18 novembre", sortieCourte: "18 nov.", ddm: "10/2027", savons: 96, etat: "sechoir", coulePar: "M.", jours: 3 },
];

export const CURE = 35;
export const PROCHAIN = LOTS.find((l) => l.etat === "pret")!;

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

/** Le dernier lot coulé d'un savon : celui dont l'étiquette est montrée. */
export const dernierLot = (slug: SlugSavon) => [...LOTS].reverse().find((l) => l.savon === slug)!;

export const PHOTOS = {
  bois: { src: `${DOSSIER}/bois-armoire.webp`, largeur: 1000, hauteur: 1500, alt: "Le bois sombre d'une vieille armoire, traversé par la lumière" },
  linge: { src: `${DOSSIER}/linge.webp`, largeur: 1200, hauteur: 796, alt: "Du linge blanc qui sèche sur un fil, au soleil, au bord de la mer" },
  armoire: { src: `${DOSSIER}/armoire.webp`, largeur: 800, hauteur: 1067, alt: "Une armoire ancienne peinte de fleurs, dans une chambre sombre" },
  pluie: { src: `${DOSSIER}/apres-la-pluie.webp`, largeur: 1000, hauteur: 667, alt: "Des feuilles vertes couvertes de gouttes de pluie" },
  rang: { src: `${DOSSIER}/rang-de-savons.webp`, largeur: 1400, hauteur: 933, alt: "Sept pains de savon debout, alignés sur une table claire" },
  cure: { src: `${DOSSIER}/savons-en-cure.webp`, largeur: 1200, hauteur: 800, alt: "Des pains de savon rangés serrés, pendant leur séchage" },
  deux: { src: `${DOSSIER}/deux-savons.webp`, largeur: 1000, hauteur: 667, alt: "Deux savons, l'un blanc, l'autre vert olive, posés sur une poudre blanche" },
  lavande: { src: `${DOSSIER}/lavande-en-bottes.webp`, largeur: 900, hauteur: 600, alt: "Des bottes de lavande séchée, liées par une ficelle" },
};

export const PHOTO_DU_SAVON: Record<SlugSavon, keyof typeof PHOTOS> = { linge: "linge", armoire: "armoire", pluie: "pluie" };

/** Couler, couper, sécher, sortir : la fabrication d'un lot, en quatre étapes. */
export const FABRICATION = [
  { titre: "Couler", moment: "Le jour J", texte: "Les huiles et la soude, mélangées sans chauffer, puis le souvenir : la lavande, le cèdre, une composition parfumée. Versé dans un moule. Un lot, un numéro.", photo: "lavande" as const },
  { titre: "Couper", moment: "Le lendemain", texte: "Le bloc est démoulé et coupé en 96 savons de 100 g, à la main, au fil.", photo: "rang" as const },
  { titre: "Sécher", moment: "Cinq semaines", texte: "Sur les claies du séchoir. Le savon durcit et perd son eau : c'est la cure. Chaque étagère porte son numéro de lot.", photo: "cure" as const },
  { titre: "Sortir", moment: "Un mercredi sur deux", texte: "Le lot sort du séchoir et part en ligne. Quand ses 96 savons sont vendus, il est épuisé : le suivant aura un autre numéro.", photo: "deux" as const },
];

/** Les mots de l'étiquette, traduits. */
export const LEXIQUE = [
  ["Sodium Olivate", "L'huile d'olive, une fois devenue savon."],
  ["Sodium Cocoate", "L'huile de coco, une fois devenue savon."],
  ["Aqua", "L'eau."],
  ["Glycerin", "La glycérine, qui se forme pendant la saponification."],
  ["Lavandula Angustifolia Oil", "L'huile essentielle de lavande vraie."],
  ["Cedrus Atlantica Bark Oil", "L'huile essentielle de cèdre de l'Atlas."],
  ["Parfum", "Une composition parfumée : le nom que lui donnent toutes les étiquettes."],
  ["Linalool, Limonene, Citronellol, Geraniol", "Des composants des huiles essentielles et des parfums, que l'étiquette doit nommer au-delà d'un certain seuil."],
];

export const QUESTIONS = [
  {
    q: "Pourquoi ne pas me demander mon type de peau ?",
    r: "Parce qu'on ne promet rien à ta peau. Un savon Souvenance se choisit à l'odeur. La liste complète des ingrédients est sur chaque lot ; en cas d'allergie connue à l'un d'eux, demande conseil à un professionnel de santé.",
  },
  {
    q: "Où trouver le numéro de lot ?",
    r: "Sur la bande de papier qui entoure ton savon, sous la date. Trois chiffres : tape-les sur la page d'accueil, tu vois le jour où il a été coulé, sa sortie du séchoir et ses ingrédients.",
  },
  {
    q: "Pourquoi mon savon n'est plus disponible ?",
    r: "Parce que son lot est épuisé. Un lot, c'est 96 savons coulés le même jour. Le suivant sort du séchoir cinq semaines après sa coulée : le séchoir dit quand.",
  },
  {
    q: "Que veut dire « Souvenance » ?",
    r: "C'est un vieux mot de la langue française, devenu littéraire, qui veut dire souvenir. On l'a trouvé joli, et un peu oublié : comme les odeurs d'enfance.",
  },
  {
    q: "Pourquoi « Parfum » dans la liste des ingrédients ?",
    r: "C'est le nom qu'utilisent toutes les étiquettes de cosmétiques pour une composition parfumée. Les substances qui doivent être nommées à part au-delà d'un certain seuil le sont, après lui : Linalool, Limonene…",
  },
  {
    q: "Combien de temps se garde-t-il ?",
    r: "La date est sur l'étiquette : « à utiliser de préférence avant fin… », suivie du mois et de l'année. Elle est fixée lors de l'évaluation de la sécurité du savon.",
  },
  {
    q: "Quand sortira le prochain savon ?",
    r: "Quand l'odeur la plus citée aura été choisie, puis formulée, évaluée et déclarée comme l'exige la réglementation des cosmétiques. Compte plusieurs mois.",
  },
];
