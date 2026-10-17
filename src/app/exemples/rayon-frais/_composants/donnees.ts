// Le cabinet de diététique imaginaire « Rayon Frais ». La diététicienne, l'adresse,
// les prix, les créneaux et la date de l'atelier sont des exemples ; le téléphone est
// dans la tranche que l'ARCEP réserve à la fiction. Aucun conseil nutritionnel sur le
// site, aucun kilo promis, aucun « avant / après ». Aucune enseigne de supermarché.

export const DOSSIER = "/exemples/rayon-frais";

export const cabinet = {
  nom: "Rayon Frais",
  dieteticienne: "Maud L.",
  diplome: "BTS Diététique et nutrition — exemple",
  adeli: "00 000 000 0",
  adresse: "12 rue de l'Exemple",
  ville: "Saint-Exemple",
  telephone: "06 39 98 20 64",
  horaires: "Du mardi au samedi, de 9 h à 19 h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#ticket`, libelle: "Le ticket" },
  { href: `${DOSSIER}/rayons`, libelle: "Au rayon" },
  { href: `${DOSSIER}/atelier`, libelle: "L'atelier" },
  { href: `${DOSSIER}#tarifs`, libelle: "Tarifs" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const P = "/exemples/rayon-frais";
export const photos = {
  caisse: { src: `${P}/caisse.webp`, largeur: 1000, hauteur: 1333, alt: "Une cagette de légumes et de raisin posée dans l'herbe, vue de dessus" },
  cagettes: { src: `${P}/cagettes.webp`, largeur: 1200, hauteur: 800, alt: "Des cagettes en bois remplies de légumes, sur un étal" },
  poivrons: { src: `${P}/poivrons.webp`, largeur: 1000, hauteur: 667, alt: "Des poivrons rouges, jaunes et verts dans une caisse, des citrons derrière" },
  panier: { src: `${P}/panier.webp`, largeur: 1000, hauteur: 667, alt: "Un panier tressé rempli d'asperges, d'avocats, de tomates et d'un poivron" },
} satisfies Record<string, Photo>;

/* ---------- Le ticket de caisse (exemple) ----------
   Ligne par ligne, les mêmes questions pour chaque ligne : on comprend, on ne juge pas. */
export const ticket = [
  { article: "Pain de mie", prix: "1,45" },
  { article: "8 yaourts", prix: "2,90" },
  { article: "Pâtes 1 kg", prix: "1,60" },
  { article: "Chips", prix: "2,10" },
  { article: "Pommes", prix: "2,75" },
  { article: "Jambon, 4 tranches", prix: "3,20" },
  { article: "Soda 1,5 l", prix: "1,95" },
];
export const totalTicket = "15,95";
export const questionsLigne = ["Pour qui ?", "Pour quel moment de la semaine ?", "Par habitude, par envie, ou faute de temps ?"];

/* ---------- Les rayons ---------- */
export type Rayon = { id: string; emoji: string; nom: string; texte: string };
export const rayons: Rayon[] = [
  { id: "petit-dej", emoji: "🥐", nom: "Le petit-déj", texte: "Le rayon des matins pressés. On regarde ce que vous prenez d'habitude, et ce que vous aimeriez y trouver." },
  { id: "apero", emoji: "🧀", nom: "L'apéro", texte: "Le rayon des vendredis soir. On regarde ce qui part dans le caddie, sans faire la morale à personne." },
  { id: "gouter", emoji: "🍪", nom: "Le goûter", texte: "Le rayon des sorties d'école. On regarde ce qui plaît aux enfants, et ce qui vous plaît à vous." },
];
export const seanceRayon = { duree: "45 min", prix: "50 €", lieu: "Dans le supermarché où vous faites vos courses, avec l'accord du magasin" };
export const samedis = [
  { libelle: "9 h 00", sous: "Samedi" },
  { libelle: "10 h 30", sous: "Samedi", pris: true },
  { libelle: "11 h 30", sous: "Samedi" },
  { libelle: "17 h 30", sous: "Mercredi" },
  { libelle: "18 h 15", sous: "Jeudi", pris: true },
  { libelle: "18 h 30", sous: "Vendredi" },
];

/* ---------- L'atelier étiquettes : une vraie date, à six ---------- */
export const atelierInfo = {
  date: "Samedi 16 janvier 2027",
  heure: "10 h",
  places: 6,
  duree: "1 h 15",
  prix: "15 €",
  regles: [
    "On apprend à lire une étiquette : la liste des ingrédients, le tableau, les mentions.",
    "On parle d'étiquettes, jamais du cas de chacun : à six, dans un lieu public, personne ne raconte sa santé.",
    "Au rayon frais d'un supermarché, avec l'accord du magasin. Aucune marque n'est recommandée.",
  ],
};

export const seances = [
  { nom: "Première séance, au cabinet", duree: "1 h", prix: "55 €", detail: "Vous venez avec votre ticket de caisse. On part de là, ligne par ligne." },
  { nom: "Séance au rayon, en individuel", duree: "45 min", prix: "50 €", detail: "Si vous voulez. Le rayon que vous choisissez, dans votre magasin." },
  { nom: "Atelier étiquettes, à six", duree: "1 h 15", prix: "15 €", detail: "Le samedi matin, au rayon frais." },
];

export const questions = [
  { q: "Les séances au supermarché, c'est obligatoire ?", r: "Non. La première séance a lieu au cabinet. Le rayon, c'est seulement si vous en avez envie, et en individuel." },
  { q: "Les autres clients sauront pourquoi je suis là ?", r: "Non. On fait ses courses à deux, sans blouse ni badge. Les questions de santé, on les garde pour le cabinet." },
  { q: "Est-ce que vous allez me promettre de perdre du poids ?", r: "Non. Zéro kilo promis, pas d'avant-après. On part de vos courses, pas d'un objectif sur une balance." },
  { q: "Combien ça coûte ?", r: "55 € la première séance d'une heure, 50 € la séance au rayon, 15 € l'atelier (prix d'exemple). Facture à chaque séance." },
];
