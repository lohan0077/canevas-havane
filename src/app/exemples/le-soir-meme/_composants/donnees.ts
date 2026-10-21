// Tout ce qu'affiche le site du Soir Même, agence immobilière fictive imaginée dans la
// vidéo « Si je devais remplir l'agenda d'un agent immobilier ».
//
// Les règles que le site applique, lues sur Légifrance (voir SOURCES.md de la vidéo) :
//   - arrêté du 10 janvier 2017 (version consolidée, modifiée en 2022) : le barème
//     affiche les prix MAXIMUMS, toutes taxes comprises, et à qui en incombe le paiement
//     (art. 2, I et II) ; s'il dépend du prix, ses tranches (art. 2, III) ; il est
//     « aisément accessible » sur le site et à partir de chaque annonce (art. 2, IV) ;
//     l'annonce donne le prix honoraires inclus en caractères plus grands que le prix
//     hors honoraires, qui paie, et les honoraires en % TTC précédés de « Honoraires : »
//     (art. 3) ; loi n° 70-9, art. 6-1 ;
//   - CCH, art. L126-33 : classes énergie et climat, et dépenses théoriques, dans toute
//     annonce ; présentation reprise de la fiche Service-Public F16096 (échelles en
//     couleur, « Montant estimé des dépenses annuelles d'énergie pour un usage
//     standard », année de référence des prix) ;
//   - décret n° 72-678, art. 92 à 94 : numéro et lieu de délivrance de la carte, nom et
//     adresse du garant, sur les documents à usage professionnel.
// Aucune adresse de logement : les annonces ne nomment ni rue ni numéro.

export const DOSSIER = "/exemples/le-soir-meme";

export const agence = {
  nom: "Le Soir Même",
  metier: "Agence immobilière",
  adresse: "12 rue de l'Exemple, 00000 Ville-Exemple",
  telephone: "01 99 00 47 12",
  carte: "CPI 0000 0000 0000 0000",
  cci: "CCI de Ville-Exemple",
  garant: "Garant d'exemple, 1 place de l'Exemple, 00000 Ville-Exemple",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#bareme`, libelle: "Le barème" },
  { href: `${DOSSIER}#annonces`, libelle: "Les maisons" },
  { href: `${DOSSIER}/suivi`, libelle: "Le suivi du soir" },
  { href: `${DOSSIER}#questions`, libelle: "Questions" },
];

/** « 312 000 € » : espaces fines insécables, comme sur une étiquette de prix. */
export const euros = (n: number) => `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;

/* ---------- Le barème (exemple) ---------- */

export const BAREME = {
  seuil: 100_000,
  forfait: 5_000,
  taux: 5,
  payeur: "à la charge de l'acquéreur",
  date: "17 octobre 2026",
};

/** Les honoraires maximum pour un prix de vente hors honoraires, selon le barème. */
export const honorairesMax = (prix: number) => (prix <= BAREME.seuil ? BAREME.forfait : (prix * BAREME.taux) / 100);

export const LIGNES_BAREME = [
  { prestation: "Vente d'une maison ou d'un appartement, prix jusqu'à 100\u00A0000\u00A0€", prix: "5\u00A0000\u00A0€ TTC, forfait maximum", payeur: "Acquéreur" },
  { prestation: "Vente d'une maison ou d'un appartement, prix au-delà de 100\u00A0000\u00A0€", prix: "5\u00A0% TTC du prix hors honoraires, au maximum", payeur: "Acquéreur" },
  { prestation: "Vente d'un terrain à bâtir", prix: "6\u00A0% TTC du prix hors honoraires, au maximum", payeur: "Acquéreur" },
  { prestation: "Avis de valeur écrit, sans mandat", prix: "0 €", payeur: "Personne" },
];

/* ---------- Les photos ---------- */

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const photo = (fichier: string, largeur: number, hauteur: number, alt: string): Photo => ({
  src: `${DOSSIER}/${fichier}.webp`, largeur, hauteur, alt,
});
export const photos = {
  crepuscule: photo("maison-au-crepuscule", 1300, 1146, "Une maison blanche au pied d'une montagne, ses fenêtres allumées, à la tombée du soir"),
  voletsRouges: photo("maison-volets-rouges", 860, 1290, "Une maison de pierre blanche aux volets rouges, au fond d'une grande pelouse, un arbre en fleurs au premier plan"),
  salon: photo("salon-blanc", 1200, 800, "Un salon blanc et lumineux, une cheminée de marbre entre deux hautes fenêtres"),
  lampe: photo("lampe-du-soir", 1100, 733, "Un canapé dans la lumière chaude d'un lampadaire, le soir"),
  creme: photo("maison-creme", 1000, 666, "Une maison crème au toit d'ardoise, trois lucarnes et une porte noire"),
  arbres: photo("maison-arbres", 1000, 667, "Une grande maison blanche à cheminées, derrière un jardin planté d'arbres"),
};

/* ---------- Les annonces (exemples) ---------- */

export type Classe = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export type Annonce = {
  slug: string;
  titre: string;
  pieces: number;
  surface: number;
  terrain: string;
  secteur: string;
  horsHonoraires: number;
  tauxHonoraires: number; // % TTC du prix hors honoraires, sous le maximum du barème
  energie: Classe;
  climat: Classe;
  depenses: [number, number];
  photo: Photo;
  galerie: Photo[];
  accroche: string;
  description: string[];
  points: string[];
};

export const ANNONCES: Annonce[] = [
  {
    slug: "maison-5-pieces",
    titre: "Maison 5 pièces",
    pieces: 5,
    surface: 120,
    terrain: "1\u00A0400\u00A0m² de terrain",
    secteur: "À dix minutes du centre-ville, au calme",
    horsHonoraires: 300_000,
    tauxHonoraires: 4,
    energie: "D",
    climat: "D",
    depenses: [1500, 2100],
    photo: photos.voletsRouges,
    galerie: [photos.salon],
    accroche: "Une maison de pierre, ses volets rouges et une grande pelouse en pente douce.",
    description: [
      "Au rez-de-chaussée, une entrée, un salon de 34 m² avec cheminée, une cuisine séparée et une chambre avec salle d'eau. À l'étage, trois chambres et une salle de bains.",
      "Un garage attenant, une cave, et 1 400 m² de terrain planté de fruitiers. Chauffage au gaz, fenêtres en double vitrage. La cuisine est d'origine : elle est à refaire, et l'annonce le dit.",
    ],
    points: ["4 chambres", "Cheminée", "Garage et cave", "Cuisine à refaire"],
  },
  {
    slug: "maison-4-pieces",
    titre: "Maison 4 pièces",
    pieces: 4,
    surface: 95,
    terrain: "520\u00A0m² de terrain",
    secteur: "Dans un quartier de maisons, près des écoles",
    horsHonoraires: 240_000,
    tauxHonoraires: 4.5,
    energie: "C",
    climat: "A",
    depenses: [900, 1300],
    photo: photos.creme,
    galerie: [],
    accroche: "Trois lucarnes, une porte noire, et rien à refaire.",
    description: [
      "Une maison de 2009 : séjour traversant de 38 m², cuisine ouverte, trois chambres dont une au rez-de-chaussée, une salle de bains et une salle d'eau.",
      "Pompe à chaleur, isolation des combles refaite en 2023. Un jardin clos de 520 m² et deux places de stationnement.",
    ],
    points: ["3 chambres", "Pompe à chaleur", "Jardin clos", "Rien à refaire"],
  },
  {
    slug: "maison-6-pieces",
    titre: "Maison 6 pièces",
    pieces: 6,
    surface: 150,
    terrain: "900\u00A0m² de terrain",
    secteur: "En lisière de bourg, à pied des commerces",
    horsHonoraires: 420_000,
    tauxHonoraires: 4,
    energie: "E",
    climat: "E",
    depenses: [2600, 3500],
    photo: photos.arbres,
    galerie: [],
    accroche: "Une maison de famille, ses cheminées et un jardin d'arbres.",
    description: [
      "Une maison du début du siècle dernier : double séjour, bureau, cuisine dînatoire, quatre chambres et deux salles de bains sur deux étages.",
      "Chaudière au fioul et menuiseries anciennes : la classe énergie est E, et l'annonce l'écrit en grand. Un jardin de 900 m² planté d'arbres anciens.",
    ],
    points: ["4 chambres et un bureau", "Cheminées", "Jardin arboré", "Travaux d'isolation à prévoir"],
  },
];

export const prixHonorairesInclus = (a: Annonce) => a.horsHonoraires * (1 + a.tauxHonoraires / 100);
export const pourcent = (n: number) => `${n.toString().replace(".", ",")} %`;

/* ---------- Le suivi du soir (exemple) ---------- */

export type Visite = {
  jour: string;
  date: string;
  heure: string;
  envoi: string;
  phrase: string;
  plu: string;
  freine: string;
  suite: string;
};

export const VISITES: Visite[] = [
  {
    jour: "Mardi",
    date: "13 octobre",
    heure: "18\u00A0h",
    envoi: "19\u00A0h\u00A040",
    phrase: "«\u00A0La cuisine est à refaire.\u00A0»",
    plu: "La lumière du salon, la cheminée, le calme de la rue.",
    freine: "La cuisine d'origine : ils la referaient entièrement.",
    suite: "Pas de deuxième visite pour l'instant. Ils comparent avec une maison plus récente.",
  },
  {
    jour: "Jeudi",
    date: "15 octobre",
    heure: "17\u00A0h\u00A030",
    envoi: "19\u00A0h\u00A005",
    phrase: "«\u00A0Coup de cœur pour le jardin.\u00A0»",
    plu: "Le jardin, les fruitiers, le garage pour l'atelier.",
    freine: "La quatrième chambre, un peu petite pour un bureau.",
    suite: "Ils reviennent samedi pour revoir l'étage.",
  },
  {
    jour: "Samedi",
    date: "17 octobre",
    heure: "16\u00A0h",
    envoi: "19\u00A0h\u00A030",
    phrase: "Une deuxième visite demandée.",
    plu: "Les mêmes que jeudi : l'étage les a rassurés.",
    freine: "Le prix de la cuisine, encore. Ils demandent le DPE complet.",
    suite: "Le DPE leur est envoyé ce soir. Une offre est possible la semaine prochaine : on t'appelle dès qu'elle arrive.",
  },
];

/* ---------- L'estimation : les créneaux (exemple) ---------- */

export const JOURS_ESTIMATION = [
  { id: "jeudi", libelle: "Jeudi", date: "22 octobre", heures: [{ h: "9\u00A0h", pris: true }, { h: "14\u00A0h", pris: false }, { h: "17\u00A0h\u00A030", pris: true }] },
  { id: "vendredi", libelle: "Vendredi", date: "23 octobre", heures: [{ h: "9\u00A0h", pris: false }, { h: "11\u00A0h", pris: true }, { h: "16\u00A0h", pris: false }] },
  { id: "samedi", libelle: "Samedi", date: "24 octobre", heures: [{ h: "9\u00A0h", pris: true }, { h: "10\u00A0h", pris: false }, { h: "11\u00A0h\u00A030", pris: false }] },
];

/* ---------- Questions ---------- */

export const QUESTIONS = [
  {
    q: "Les frais d'agence, qui les paie\u00A0?",
    r: "Celui que le barème désigne, et le même que sur l'annonce. Chez nous, l'acquéreur. Le vendeur touche le prix hors honoraires ; l'annonce affiche les deux prix, honoraires inclus en plus gros.",
  },
  {
    q: "Combien prenez-vous, exactement\u00A0?",
    r: "Au plus ce que dit le barème : 5\u00A0% TTC du prix hors honoraires au-delà de 100\u00A0000\u00A0€. Le montant exact est écrit dans le mandat, avant la première visite, et il ne peut pas dépasser le barème.",
  },
  {
    q: "Pourquoi les agences ne répondent pas\u00A0?",
    r: "Souvent parce qu'il n'y a rien de neuf, et qu'on n'ose pas le dire. Chez nous, chaque visite donne un compte rendu écrit, le soir même, même quand il n'y a rien à espérer.",
  },
  {
    q: "L'estimation est payante\u00A0?",
    r: "Non : l'avis de valeur écrit est à 0 €, et il est dans le barème comme le reste. Il ne vous engage à rien, et il dit sur quoi repose le prix : les ventes comparables, l'état, ce qui est à refaire.",
  },
  {
    q: "Les visiteurs sont-ils nommés dans le compte rendu\u00A0?",
    r: "Jamais. Le compte rendu dit ce qui a plu, ce qui freine et la suite : ni nom, ni situation personnelle. Les visiteurs savent qu'un compte rendu anonyme est fait.",
  },
];
