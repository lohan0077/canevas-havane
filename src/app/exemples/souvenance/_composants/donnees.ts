// Les données du site Souvenance, marque fictive de savons. Prix, lots, dates et
// listes d'ingrédients : exemples. Aucune allégation sur la peau (règl. (CE)
// 1223/2009, art. 20 ; règl. (UE) 655/2013) : un savon porte le nom d'un souvenir et
// on décrit son odeur, jamais un effet. Les noms évoquent des lieux, pas des aliments.

export const DOSSIER = "/exemples/souvenance";

export const CONTACT = {
  telephone: "01 99 00 77 31", // tranche réservée à la fiction par l'ARCEP
  adresse: "12 rue de l'Exemple · boutique-atelier",
  horaires: "Du mardi au samedi, 10 h – 19 h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#souvenir`, libelle: "Ton savon" },
  { href: `${DOSSIER}/savons`, libelle: "Les trois savons" },
  { href: `${DOSSIER}/prochain-savon`, libelle: "Le prochain savon" },
  { href: `${DOSSIER}#boutique`, libelle: "La boutique" },
];

export type Savon = {
  slug: "linge" | "armoire" | "pluie";
  nom: string;          // le nom du savon
  souvenir: string;     // la réponse à la question
  odeur: string;        // ce qu'on sent, décrit sans promesse
  inci: string;
  lot: string;
  ddm: string;
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
    lot: "S-112",
    ddm: "10/2027",
    fond: "#FBF8F2",
    bord: "#E9E1D2",
  },
  {
    slug: "armoire",
    nom: "L'armoire de mamie",
    souvenir: "L'armoire de ta grand-mère",
    odeur: "Le bois ciré, la lavande glissée entre les draps, un peu de cèdre.",
    inci: "Sodium Olivate, Sodium Cocoate, Aqua, Glycerin, Lavandula Angustifolia Oil, Cedrus Atlantica Bark Oil, Linalool, Limonene",
    lot: "S-113",
    ddm: "10/2027",
    fond: "#F1D9D6",
    bord: "#D9AFAA",
  },
  {
    slug: "pluie",
    nom: "Après la pluie",
    souvenir: "Le jardin après la pluie",
    odeur: "La terre mouillée, les feuilles vertes, l'herbe qu'on vient de couper.",
    inci: "Sodium Olivate, Sodium Cocoate, Aqua, Glycerin, Parfum, Citronellol, Geraniol, Linalool",
    lot: "S-114",
    ddm: "10/2027",
    fond: "#DCE5D3",
    bord: "#AFC09F",
  },
];

export const PRIX = 9; // € TTC, exemple, le savon de 100 g

export const PHOTOS = {
  bois: { src: "/exemples/souvenance/bois-armoire.webp", largeur: 1000, hauteur: 1500, alt: "Le bois sombre d'une vieille armoire, traversé par la lumière" },
  linge: { src: "/exemples/souvenance/linge.webp", largeur: 1200, hauteur: 796, alt: "Du linge blanc qui sèche sur un fil, au soleil, au bord de la mer" },
  armoire: { src: "/exemples/souvenance/armoire.webp", largeur: 800, hauteur: 1067, alt: "Une armoire ancienne peinte de fleurs, dans une chambre sombre" },
  pluie: { src: "/exemples/souvenance/apres-la-pluie.webp", largeur: 1000, hauteur: 667, alt: "Des feuilles vertes couvertes de gouttes de pluie" },
};

export const PHOTO_DU_SAVON: Record<Savon["slug"], keyof typeof PHOTOS> = { linge: "linge", armoire: "armoire", pluie: "pluie" };

export const QUESTIONS = [
  {
    q: "Pourquoi ne pas me demander mon type de peau ?",
    r: "Parce qu'on ne promet rien à ta peau. Un savon Souvenance se choisit à l'odeur. La liste complète des ingrédients est sur chaque savon ; en cas d'allergie connue à l'un d'eux, demande conseil à un professionnel de santé.",
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
    q: "Quand sortira le prochain savon ?",
    r: "Quand l'odeur la plus citée aura été choisie, puis formulée, évaluée et déclarée comme l'exige la réglementation des cosmétiques. Compte plusieurs mois.",
  },
];
