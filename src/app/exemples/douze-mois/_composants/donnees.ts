// Les données du site Douze Mois : une boutique de fleurs imaginaire qui ne vend que
// ce qui fleurit en France le mois en cours. Le calendrier est indicatif : février
// (mimosa), mai (pivoine) et septembre (dahlia) viennent de la vidéo et de ses
// sources ; les autres mois suivent les listes de saison publiées pour les fleuristes
// (voir SOURCES.md de la vidéo). Ils varient selon la région et l'année : la page le dit.

export const DOSSIER = "/exemples/douze-mois";

export const boutique = {
  nom: "Douze Mois",
  telephone: "06 39 98 27 12",
  telephoneLien: "+33639982712",
  adresse: ["Douze Mois, fleurs de saison", "12 rue de l'Exemple", "00000 Exemple-Ville"],
  horaires: "Du mardi au samedi, 9 h 30 – 19 h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#calendrier`, libelle: "Le calendrier" },
  { href: `${DOSSIER}/calendrier`, libelle: "Les douze mois" },
  { href: `${DOSSIER}/saint-valentin`, libelle: "14 février" },
  { href: `${DOSSIER}#questions`, libelle: "Questions" },
];

export type Photo = { src: string; alt: string; largeur: number; hauteur: number };

export const PHOTOS: Record<string, Photo> = {
  mimosa: { src: "/exemples/douze-mois/mimosa.webp", alt: "Une branche de mimosa en fleur sur un fond gris clair", largeur: 900, hauteur: 1350 },
  pivoine: { src: "/exemples/douze-mois/pivoine.webp", alt: "Une pivoine blanche sur sa tige, sur un fond gris clair", largeur: 900, hauteur: 1350 },
  dahlia: { src: "/exemples/douze-mois/dahlia.webp", alt: "Un dahlia blanc au cœur rose, sur un fond blanc", largeur: 900, hauteur: 675 },
};

export type Mois = { n: number; nom: string; court: string; fleur: string; photo?: keyof typeof PHOTOS; aussi: string[]; arrive: string; part: string; mot: string };

export const MOIS: Mois[] = [
  { n: 1, nom: "Janvier", court: "Janv.", fleur: "Anémone", aussi: ["renoncule", "hellébore"], arrive: "le mimosa", part: "le houx", mot: "Le mois le plus maigre. Et pourtant, les premières anémones." },
  { n: 2, nom: "Février", court: "Févr.", fleur: "Mimosa", photo: "mimosa", aussi: ["anémone", "jacinthe"], arrive: "le narcisse", part: "l'hellébore", mot: "Le soleil en branches, au cœur de l'hiver." },
  { n: 3, nom: "Mars", court: "Mars", fleur: "Narcisse", aussi: ["tulipe", "renoncule"], arrive: "la tulipe", part: "le mimosa", mot: "Le printemps arrive par le jaune." },
  { n: 4, nom: "Avril", court: "Avr.", fleur: "Tulipe", aussi: ["renoncule", "lilas"], arrive: "la pivoine", part: "l'anémone", mot: "Des tulipes partout. Elles bougent encore dans le vase." },
  { n: 5, nom: "Mai", court: "Mai", fleur: "Pivoine", photo: "pivoine", aussi: ["lilas", "iris"], arrive: "la rose", part: "la tulipe", mot: "Trois semaines de pivoines. Pas une de plus." },
  { n: 6, nom: "Juin", court: "Juin", fleur: "Rose", aussi: ["pivoine", "marguerite"], arrive: "le tournesol", part: "la pivoine", mot: "Enfin des roses. Elles ont attendu leur tour." },
  { n: 7, nom: "Juillet", court: "Juil.", fleur: "Tournesol", aussi: ["lavande", "glaïeul"], arrive: "l'hortensia", part: "la marguerite", mot: "Des bouquets hauts comme l'été." },
  { n: 8, nom: "Août", court: "Août", fleur: "Hortensia", aussi: ["dahlia", "tournesol"], arrive: "le cosmos", part: "la lavande", mot: "Les grosses têtes de l'été, avant la rentrée." },
  { n: 9, nom: "Septembre", court: "Sept.", fleur: "Dahlia", photo: "dahlia", aussi: ["cosmos", "aster"], arrive: "l'aster", part: "le tournesol", mot: "Le mois des dahlias. Le plus beau, peut-être." },
  { n: 10, nom: "Octobre", court: "Oct.", fleur: "Aster", aussi: ["derniers dahlias", "graminées"], arrive: "le chardon", part: "le dahlia, au premier gel", mot: "Les derniers dahlias, jusqu'au premier gel." },
  { n: 11, nom: "Novembre", court: "Nov.", fleur: "Chardon", aussi: ["graminées", "feuillages"], arrive: "l'hellébore", part: "l'aster", mot: "Peu de fleurs. On le dit, et on fait de beaux feuillages." },
  { n: 12, nom: "Décembre", court: "Déc.", fleur: "Hellébore", aussi: ["anémone", "camélia"], arrive: "l'anémone", part: "le chardon", mot: "La rose de Noël, qui n'est pas une rose." },
];

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  {
    q: "Et si je veux des roses rouges en janvier ?",
    r: "On n'en a pas. En janvier, en France, les roses ne fleurissent pas dehors. On te proposera des anémones : demande-leur, elles ont du caractère.",
  },
  {
    q: "D'où viennent les fleurs ?",
    r: "De producteurs installés en France. Sur un vrai site, on les nommerait, avec leur région et la distance jusqu'à la boutique. Ici, la boutique est fictive.",
  },
  {
    q: "Le calendrier est exact ?",
    r: "Il est indicatif : une saison avance ou recule d'une ou deux semaines selon la région et l'année. Chaque mois, on le confirme avec nos producteurs avant le premier.",
  },
  {
    q: "Et en novembre, quand il n'y a presque rien ?",
    r: "On le dit. Chardons, graminées, feuillages, branches : on fait de beaux bouquets avec ce que la saison donne, sans aller chercher ailleurs ce qu'elle ne donne pas.",
  },
  {
    q: "Vous livrez ?",
    r: "Dans la ville, nous-mêmes, du mardi au samedi. Ou tu passes à la boutique.",
  },
];
