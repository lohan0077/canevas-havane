// Les données du site On Apporte Quoi, épicerie fine imaginaire de la vidéo
// « Si je devais remplir le carnet de commandes d'une épicerie fine ».
// Tout est inventé et marqué « exemple » à l'affichage. Aucune boisson alcoolique,
// ni dans les coffrets ni dans le texte (loi Évin : CSP, art. L3323-4).
//
// Chaque produit porte ses ingrédients et ses allergènes : un coffret commandé en
// ligne est vendu à distance, et ces mentions doivent être lues avant la commande
// (règlement (UE) n° 1169/2011, art. 14). Dans la liste d'ingrédients, les
// allergènes sont écrits entre astérisques et s'affichent en gras (même règlement,
// art. 21).

export const DOSSIER = "/exemples/on-apporte-quoi";

export const boutique = {
  nom: "On Apporte Quoi",
  telephone: "01 99 00 42 17",
  adresse: "12 rue de l'Exemple",
  horaires: [
    { jours: "Mardi – vendredi", heures: "10 h – 19 h 30" },
    { jours: "Samedi", heures: "9 h 30 – 19 h 30" },
    { jours: "Dimanche et lundi", heures: "Fermé" },
  ],
  retrait: "18 h",
  limite: "12 h",
};

export type CleProduit =
  | "huile" | "miel" | "sables" | "tapenade" | "gressins" | "figue" | "nougat" | "fleurDeSel" | "chocolat";

export type Produit = {
  nom: string;
  poids: string;
  ingredients: string; // allergènes entre *astérisques*
  allergenes: string[];
  origine?: string;
  dessin: "bouteille" | "pot" | "sachet" | "tablette" | "boite";
  teinte: string;
};

export const produits: Record<CleProduit, Produit> = {
  huile: {
    nom: "Huile d'olive vierge extra",
    poids: "25 cl",
    ingredients: "Huile d'olive de catégorie supérieure obtenue directement des olives et uniquement par des procédés mécaniques.",
    allergenes: [],
    origine: "Espagne",
    dessin: "bouteille",
    teinte: "#5E6B2E",
  },
  miel: {
    nom: "Miel de châtaignier",
    poids: "250 g",
    ingredients: "Miel de châtaignier.",
    allergenes: [],
    origine: "France",
    dessin: "pot",
    teinte: "#B5651D",
  },
  sables: {
    nom: "Sablés au beurre",
    poids: "150 g",
    ingredients: "Farine de *blé*, *beurre* (24 %), sucre, *œufs*, sel.",
    allergenes: ["gluten (blé)", "lait", "œufs"],
    dessin: "sachet",
    teinte: "#D9A441",
  },
  tapenade: {
    nom: "Tapenade verte",
    poids: "90 g",
    ingredients: "Olives vertes (72 %), huile d'olive vierge extra, câpres, ail, jus de citron, thym.",
    allergenes: [],
    dessin: "pot",
    teinte: "#7C8B3A",
  },
  gressins: {
    nom: "Gressins à l'huile d'olive",
    poids: "125 g",
    ingredients: "Farine de *blé*, huile d'olive vierge extra (8 %), sel, levure.",
    allergenes: ["gluten (blé)"],
    dessin: "sachet",
    teinte: "#C8A06A",
  },
  figue: {
    nom: "Confiture de figue",
    poids: "220 g",
    ingredients: "Figues (55 %), sucre de canne, jus de citron. Préparée avec 55 g de fruits pour 100 g.",
    allergenes: [],
    dessin: "pot",
    teinte: "#6E2F3A",
  },
  nougat: {
    nom: "Nougat tendre aux amandes",
    poids: "100 g",
    ingredients: "*Amandes* (30 %), miel (15 %), sucre, sirop de glucose, blanc d'*œuf*, feuille azyme (fécule de pomme de terre, eau, huile de tournesol).",
    allergenes: ["fruits à coque (amandes)", "œufs"],
    dessin: "tablette",
    teinte: "#E8D6B0",
  },
  fleurDeSel: {
    nom: "Fleur de sel",
    poids: "125 g",
    ingredients: "Fleur de sel.",
    allergenes: [],
    origine: "France",
    dessin: "boite",
    teinte: "#9BB0BD",
  },
  chocolat: {
    nom: "Chocolat noir 70 %",
    poids: "80 g",
    ingredients: "Pâte de cacao, sucre, beurre de cacao. Peut contenir des traces de *lait* et de *fruits à coque*.",
    allergenes: ["traces possibles : lait, fruits à coque"],
    dessin: "tablette",
    teinte: "#3B2418",
  },
};

export type Gout = "sucre" | "sale" | "lesDeux";
export type Budget = 20 | 35 | 50;

export const QUESTIONS = {
  combien: { question: "Vous serez combien ?", options: [{ v: 4, libelle: "4" }, { v: 6, libelle: "6" }, { v: 8, libelle: "8 et plus" }] },
  gout: { question: "Ils aiment quoi ?", options: [{ v: "sucre", libelle: "Sucré" }, { v: "sale", libelle: "Salé" }, { v: "lesDeux", libelle: "Les deux" }] },
  budget: { question: "Ton budget ?", options: [{ v: 20, libelle: "20 €" }, { v: 35, libelle: "35 €" }, { v: 50, libelle: "50 €" }] },
} as const;

/** Le coffret composé pour un goût et un budget. Le prix est le budget choisi. */
export const COMPOSITIONS: Record<Gout, Record<Budget, { nom: string; contenu: CleProduit[] }>> = {
  sucre: {
    20: { nom: "Le petit sucré", contenu: ["miel", "sables"] },
    35: { nom: "Le goûter des hôtes", contenu: ["miel", "figue", "sables"] },
    50: { nom: "La grande table sucrée", contenu: ["miel", "figue", "sables", "nougat"] },
  },
  sale: {
    20: { nom: "Le petit salé", contenu: ["tapenade", "gressins"] },
    35: { nom: "L'avant-dîner", contenu: ["huile", "tapenade", "gressins"] },
    50: { nom: "La grande table salée", contenu: ["huile", "tapenade", "gressins", "fleurDeSel"] },
  },
  lesDeux: {
    20: { nom: "Le petit invité", contenu: ["huile", "sables"] },
    35: { nom: "Le coffret invité", contenu: ["huile", "miel", "sables"] },
    50: { nom: "Le grand coffret invité", contenu: ["huile", "miel", "sables", "tapenade", "chocolat"] },
  },
};

/** Pour huit personnes et plus, les sablés et les gressins passent en format partage. */
export const formatPour = (cle: CleProduit, convives: number) =>
  convives >= 8 && cle === "sables" ? "300 g · format partage"
    : convives >= 8 && cle === "gressins" ? "250 g · format partage"
      : produits[cle].poids;

/** Les coffrets de la page « Coffrets » : les neuf compositions, rangées par goût. */
export const RAYONS: { gout: Gout; titre: string; phrase: string }[] = [
  { gout: "lesDeux", titre: "Un peu de tout", phrase: "Pour une table où l'on ne sait pas encore ce qui sera servi." },
  { gout: "sucre", titre: "Plutôt sucré", phrase: "Pour le café, le dessert, ou le petit-déjeuner du lendemain." },
  { gout: "sale", titre: "Plutôt salé", phrase: "Pour ouvrir le repas, avant de passer à table." },
];

export const allergenesDe = (contenu: CleProduit[]) =>
  [...new Set(contenu.flatMap((c) => produits[c].allergenes))];

// Les dégustations : un samedi par mois, vingt places. Dates réelles (calendrier
// vérifié), places d'exemple.
export const DEGUSTATIONS = [
  { libelle: "7 nov.", sous: "samedi", pris: true },
  { libelle: "5 déc.", sous: "samedi" },
  { libelle: "9 janv.", sous: "samedi" },
  { libelle: "6 févr.", sous: "samedi" },
  { libelle: "6 mars", sous: "samedi" },
  { libelle: "3 avril", sous: "samedi" },
];

export const QUESTIONS_FREQUENTES = [
  {
    q: "Jusqu'à quelle heure je peux commander ?",
    r: "Commandé avant 12 h, ton coffret est prêt à 18 h le jour même. Après midi, il est prêt le lendemain à 18 h. Le dimanche et le lundi, la boutique est fermée.",
  },
  {
    q: "Je peux voir ce qu'il y a dedans avant de commander ?",
    r: "Oui, et c'est fait pour : chaque produit du coffret affiche son poids, ses ingrédients et ses allergènes avant le bouton « Commander ». Les allergènes sont écrits en gras dans la liste.",
  },
  {
    q: "Un invité est allergique. Comment je fais ?",
    r: "Regarde la liste des allergènes du coffret proposé, puis appelle-nous : on remplace un produit par un autre du même prix. Les sablés, par exemple, contiennent du blé, du beurre et des œufs.",
  },
  {
    q: "Je paie comment ?",
    r: "En boutique, au moment du retrait. Rien n'est payé en ligne : la commande réserve ton coffret, c'est tout.",
  },
  {
    q: "Le petit mot, c'est vous qui l'écrivez ?",
    r: "Tu tapes la phrase, on la recopie à la main sur une carte glissée sous le ruban. Cent quarante signes au plus : une carte, pas une lettre.",
  },
  {
    q: "Vous livrez ?",
    r: "Non. Les coffrets se retirent en boutique. C'est ce qui permet de les composer le matin et de te les remettre le soir.",
  },
];

export const photos = {
  huile: { src: "/exemples/on-apporte-quoi/huile-olives.webp", largeur: 1400, hauteur: 933, alt: "Un filet d'huile d'olive versé dans une coupelle, à côté d'olives vertes et d'une tranche de pain" },
  miel: { src: "/exemples/on-apporte-quoi/miel.webp", largeur: 1200, hauteur: 1800, alt: "Un pot de miel noué d'une ficelle, une cuillère en bois qui goutte au-dessus" },
  sables: { src: "/exemples/on-apporte-quoi/sables.webp", largeur: 1200, hauteur: 1800, alt: "Une pile de sablés au beurre saupoudrés de sucre, sur une assiette" },
  coffret: { src: "/exemples/on-apporte-quoi/coffret.webp", largeur: 1400, hauteur: 2006, alt: "Une boîte en carton kraft fermée d'une ficelle blanche et d'une branche de verdure" },
};
