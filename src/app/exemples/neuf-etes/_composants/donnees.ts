// Tout ce que le site de Neuf Étés affiche, au même endroit : l'entreprise, ses
// coques, ses chantiers, son équipe, son planning. L'entreprise est fictive — chaque
// chiffre, chaque nom, chaque date est un exemple, et le site le dit.
//
// Le site réunit les deux vidéos des piscinistes : « Créer une marque » (le nom, l'âge
// des enfants et les étés qui restent, l'affiche, le chantier filmé jusqu'au premier
// plongeon) et « Remplir l'agenda » (le jardin qui dit quelle coque rentre, une page
// par chantier, le compte à rebours, les dates qu'on bloque soi-même).
//
// Règles tenues ici :
//   - le téléphone est pris dans la tranche que l'ARCEP réserve à la fiction
//     (04 65 71 xx xx) : il ne sonne chez personne ;
//   - aucune adresse e-mail : un domaine inventé peut exister et recevoir du courrier ;
//   - aucun avis, aucune note : une entreprise inventée n'a pas de clients ;
//   - l'équipe est présentée par ses initiales, jamais par le visage d'un inconnu ;
//   - les faits réglementaires (déclaration, sécurité, garanties) sont vrais en France.

export const DOSSIER = "/exemples/neuf-etes";

export const entreprise = {
  nom: "Neuf Étés",
  accroche: "Piscines familiales en Drôme-Ardèche",
  baseline: "Les étés commencent ici.",
  depuis: 2011,
  ville: "Valence",
  adresse: ["Chemin des Baigneurs", "26000 Valence"],
  telephone: "04 65 71 26 07",
  telephoneLien: "+33465712607",
  horaires: [
    { jours: "Lundi – vendredi", heures: "8 h – 18 h" },
    { jours: "Samedi", heures: "Visites techniques sur rendez-vous" },
  ],
  zone: ["Drôme", "Ardèche", "Sud Isère"],
  rayon: "60 km autour de Valence",
  chiffres: {
    piscines: "340",
    semaines: "3",
    delaiDevis: "72 h",
  },
  // Les mentions qu'un constructeur de piscines doit pouvoir montrer : des exemples.
  siret: "000 000 000 00000 (exemple)",
  assureur: "Assurance décennale : contrat n° 0000-EXEMPLE",
};

/** Un été par an jusqu'à la majorité : l'outil de la marque compte jusqu'à 18 ans. */
export const MAJORITE = 18;

/* ---------- Les photos ----------
   Photos Unsplash (licence gratuite, usage commercial autorisé), servies depuis
   notre domaine. Crédits complets dans les mentions légales du site. */

export type Photo = {
  src: string;
  largeur: number;
  hauteur: number;
  alt: string;
  auteur: string;
  page: string;
};

const P = `${DOSSIER}/photos`;
const photo = (fichier: string, largeur: number, hauteur: number, alt: string, auteur: string, id: string): Photo => ({
  src: `${P}/${fichier}.webp`,
  largeur,
  hauteur,
  alt,
  auteur,
  page: `https://unsplash.com/photos/${id}`,
});

export const photos = {
  jardinFamilial: photo("jardin-familial", 1920, 1280, "Piscine aux bords arrondis au milieu d'un jardin engazonné, devant la maison", "Point3D Commercial Imaging Ltd.", "xqlHYzU7WAY"),
  eteEnFamille: photo("ete-en-famille", 1280, 1920, "Bouées et chaises longues au bord d'une piscine, un jour d'été", "Taylor Friehl", "3wBaPeC0ijw"),
  vueDuCiel: photo("vue-du-ciel", 1920, 1440, "Piscine rectangulaire vue du ciel, au milieu d'une pelouse", "Michaela Böhm (Římáková)", "pB-TsiiZdfQ"),
  petitJardin: photo("petit-jardin", 1274, 1920, "Petit bassin rond sur une terrasse en pierre, sous un parasol", "Maximilian Bungart", "Kliqa3KG1HM"),
  escalierFleuri: photo("escalier-fleuri", 1920, 1280, "Piscine bordée d'une terrasse et de massifs fleuris", "Leo_Visions", "hFuW-GfSONI"),
  grandBassin: photo("grand-bassin", 1536, 1920, "Long bassin entre les arbres, devant une maison", "Marc Mintel", "nSy6EkPBwe8"),
  maisonContemporaine: photo("maison-contemporaine", 1920, 1280, "Maison contemporaine et sa piscine, au bout d'une pelouse", "Salvo Media LLC", "ylzGfY-xzBY"),
  faceAuxMontagnes: photo("face-aux-montagnes", 1920, 1080, "Piscine sur une terrasse, face aux montagnes", "Leon Kohle", "NEnYF8HK7FY"),
  mosaiqueEtBois: photo("mosaique-et-bois", 1920, 1440, "Angle d'un bassin en mosaïque bleue, bordé de bois", "Pauline Bernfeld", "aiu57sP-lrE"),
  terrassement: photo("terrassement", 1920, 1275, "Mini-pelle creusant dans un jardin, au premier jour d'un chantier", "Annie Spratt", "6yk1HL8tll0"),
  engins: photo("engins-de-chantier", 1920, 1275, "Deux engins de chantier et un tas de terre dans un jardin", "Annie Spratt", "1-aSTeX2TgY"),
  avantMiseEnEau: photo("avant-mise-en-eau", 1280, 1920, "Bassin vide aux margelles posées, juste avant la mise en eau", "Arthur Shuraev", "pAI1BZwFvG8"),
  bouee: photo("bouee", 1440, 1920, "Bouée jaune posée sur l'eau, au bord d'une piscine", "Jubéo Hernandez", "ZmWLGkPe1Sg"),
  reflets: photo("reflets", 1080, 1920, "Reflets du soleil sur l'eau d'une piscine", "Jana Kowalewicz", "VpQJwAmwhbs"),
} satisfies Record<string, Photo>;

/** Les quatre vidéos de l'ouverture (Pexels), et leurs auteurs. */
export const videos = [
  { fichier: "ete.mp4", sujet: "le plongeon", auteur: "Marc Espejo" },
  { fichier: "jardin.mp4", sujet: "le jardin vu du ciel", auteur: "Marc Espejo" },
  { fichier: "chantier.mp4", sujet: "le chantier", auteur: "Giwrgos Lamp" },
  { fichier: "mise-en-eau.mp4", sujet: "le volet qui s'ouvre sur l'eau", auteur: "Marc Van den Broeck" },
];

/* ---------- Les coques ---------- */

export type Gamme = {
  id: string;
  nom: string;
  coque: string;
  longueur: number;
  largeur: number;
  profondeur: string;
  volume: number;
  /** Surface de jardin jusqu'à laquelle le calculateur propose cette coque. */
  jusqua: number;
  jardin: string;
  prix: string;
  apartir: string;
  photo: Photo;
  phrase: string;
};

export const gammes: Gamme[] = [
  {
    id: "petit-jardin",
    nom: "Petit jardin",
    coque: "5 × 2,5",
    longueur: 5,
    largeur: 2.5,
    profondeur: "1,20 – 1,40 m",
    volume: 16,
    jusqua: 89,
    jardin: "60 à 90 m²",
    prix: "17 000 – 23 000 €",
    apartir: "17 000 €",
    photo: photos.petitJardin,
    phrase: "Pour une cour ou un jardin de ville : un vrai bassin, pas une pataugeoire.",
  },
  {
    id: "classique",
    nom: "Classique",
    coque: "6 × 3",
    longueur: 6,
    largeur: 3,
    profondeur: "1,20 – 1,50 m",
    volume: 24,
    jusqua: 119,
    jardin: "90 à 120 m²",
    prix: "20 000 – 27 000 €",
    apartir: "20 000 €",
    photo: photos.vueDuCiel,
    phrase: "La taille qu'on nous demande le plus : on y nage, on y joue, elle laisse de la pelouse.",
  },
  {
    id: "famille",
    nom: "Famille",
    coque: "7 × 3,5",
    longueur: 7,
    largeur: 3.5,
    profondeur: "1,20 – 1,60 m",
    volume: 34,
    jusqua: 159,
    jardin: "120 à 160 m²",
    prix: "23 000 – 31 000 €",
    apartir: "23 000 €",
    photo: photos.jardinFamilial,
    phrase: "Assez longue pour les longueurs des parents, assez large pour les bombes des enfants.",
  },
  {
    id: "grand-bain",
    nom: "Grand bain",
    coque: "8 × 4",
    longueur: 8,
    largeur: 4,
    profondeur: "1,30 – 1,80 m",
    volume: 46,
    jusqua: 200,
    jardin: "160 m² et plus",
    prix: "25 000 – 34 000 €",
    apartir: "25 000 €",
    photo: photos.grandBassin,
    phrase: "Le grand bassin, avec une vraie partie profonde pour le premier plongeon.",
  },
];

export const options = [
  { nom: "Volet immergé", detail: "Sécurité et couverture en un geste, caché sous l'eau.", prix: "à partir de 5 900 €" },
  { nom: "Plage en bois composite", detail: "Tout autour du bassin, ou sur un seul côté.", prix: "à partir de 140 € le m²" },
  { nom: "Pompe à chaleur", detail: "Des semaines de baignade en plus, au printemps et en septembre.", prix: "à partir de 2 400 €" },
  { nom: "Éclairage LED", detail: "Deux projecteurs, une télécommande, les soirées d'août.", prix: "à partir de 390 €" },
];

/* ---------- Les chantiers ---------- */

export type Jour = { jour: string; titre: string; texte: string; etape: number };

const TROIS_SEMAINES: Jour[] = [
  { jour: "Jour 1", titre: "Implantation et terrassement", texte: "On trace le bassin au sol, la pelle creuse. La terre part le jour même.", etape: 1 },
  { jour: "Jour 3", titre: "Lit de pose", texte: "Un lit de gravier compacté, mis à niveau au millimètre : c'est lui qui porte la coque.", etape: 2 },
  { jour: "Jour 5", titre: "Pose de la coque", texte: "La grue la dépose en une matinée. On vérifie le niveau avant de la lâcher.", etape: 3 },
  { jour: "Jours 6 à 8", titre: "Remblai et remplissage", texte: "On remblaie et on remplit en même temps, pour que la pression reste égale des deux côtés.", etape: 4 },
  { jour: "Jour 14", titre: "Margelles et plage", texte: "Les margelles, puis la plage et les équipements.", etape: 5 },
  { jour: "Jour 21", titre: "Le premier plongeon", texte: "Filtration réglée, eau équilibrée. Le premier plongeon est pour eux : c'est la dernière image du film.", etape: 6 },
];

const DEUX_SEMAINES: Jour[] = [
  { jour: "Jour 1", titre: "Implantation et terrassement", texte: "Un petit bassin, une mini-pelle : on creuse sans abîmer la terrasse voisine.", etape: 1 },
  { jour: "Jour 2", titre: "Lit de pose", texte: "Gravier compacté et mis à niveau : la coque reposera à plat, sur toute sa surface.", etape: 2 },
  { jour: "Jour 3", titre: "Pose de la coque", texte: "Livrée par l'allée sur un porteur : pas besoin de grue pour cette taille.", etape: 3 },
  { jour: "Jours 4 et 5", titre: "Remblai et remplissage", texte: "Remblai et eau montent ensemble, centimètre par centimètre.", etape: 4 },
  { jour: "Jour 9", titre: "Margelles et plage", texte: "Margelles en pierre reconstituée, assorties à la terrasse existante.", etape: 5 },
  { jour: "Jour 14", titre: "Le premier plongeon", texte: "Pompe à chaleur réglée, eau équilibrée : le premier plongeon a eu lieu le premier week-end.", etape: 6 },
];

export type Chantier = {
  slug: string;
  numero: number;
  titre: string;
  lieu: string;
  gamme: string;
  duree: string;
  prix: string;
  caracteristiques: string[];
  photo: Photo;
  resume: string;
  jours: Jour[];
};

export const chantiers: Chantier[] = [
  {
    slug: "coque-8x4",
    numero: 27,
    titre: "Piscine coque 8 × 4",
    lieu: "Bourg-lès-Valence (Drôme)",
    gamme: "grand-bain",
    duree: "3 semaines",
    prix: "31 400 € TTC",
    caracteristiques: ["3 semaines de travaux", "Volet immergé", "Plage en bois"],
    photo: photos.faceAuxMontagnes,
    resume: "Un grand bassin face au Vercors, avec un volet immergé et une plage en bois sur la longueur.",
    jours: TROIS_SEMAINES,
  },
  {
    slug: "coque-7x3-5",
    numero: 31,
    titre: "Piscine coque 7 × 3,5",
    lieu: "Guilherand-Granges (Ardèche)",
    gamme: "famille",
    duree: "3 semaines",
    prix: "28 900 € TTC",
    caracteristiques: ["3 semaines de travaux", "Escalier d'angle", "Éclairage LED"],
    photo: photos.maisonContemporaine,
    resume: "Une maison contemporaine, une pelouse à garder intacte : la grue a travaillé depuis la rue.",
    jours: TROIS_SEMAINES,
  },
  {
    slug: "coque-5x2-5",
    numero: 34,
    titre: "Piscine coque 5 × 2,5",
    lieu: "Tournon-sur-Rhône (Ardèche)",
    gamme: "petit-jardin",
    duree: "2 semaines",
    prix: "19 800 € TTC",
    caracteristiques: ["2 semaines de travaux", "Margelles en pierre", "Pompe à chaleur"],
    photo: photos.escalierFleuri,
    resume: "Un jardin de ville de 70 m², une coque livrée par l'allée, et des massifs replantés tout autour.",
    jours: DEUX_SEMAINES,
  },
];

export const photosDeChantier = [photos.terrassement, photos.engins, photos.avantMiseEnEau];

/* ---------- L'équipe, les engagements, la méthode ---------- */

export const equipe = [
  { initiales: "JM", nom: "Julien Marchal", role: "Fondateur · conduite de chantier", phrase: "Présent sur chaque chantier, le premier et le dernier jour." },
  { initiales: "SB", nom: "Sarah Benali", role: "Visites techniques et devis", phrase: "Elle vient chez toi, mesure, et te dit ce qui rentre vraiment." },
  { initiales: "TR", nom: "Thomas Roux", role: "Chef de pose", phrase: "Douze ans de coques posées, et le niveau vérifié deux fois." },
];

export const engagements = [
  { titre: "Un prix écrit avant tout", texte: "Une fourchette ici même, puis un prix ferme après la visite technique. Aucune ligne ne s'ajoute pendant le chantier." },
  { titre: "Ta semaine, pas la nôtre", texte: "Tu choisis ta semaine de chantier en ligne, dans le planning. Elle est tenue." },
  { titre: "Le chantier, filmé chaque jour", texte: "Avec ton accord, une courte vidéo et trois lignes sur la page de ton chantier, du premier coup de pelle au premier plongeon." },
  { titre: "Un seul interlocuteur", texte: "La même personne du devis à la mise en eau, avec son numéro direct." },
];

export const methode = [
  { titre: "Visite technique", texte: "Une heure chez toi, gratuite : accès pour la grue, nature du sol, réseaux.", duree: "1 h" },
  { titre: "Devis ferme", texte: "Un prix ferme et un plan de masse, sous trois jours ouvrés.", duree: "72 h" },
  { titre: "Le chantier", texte: "Du terrassement à la mise en eau, à la semaine que tu as choisie.", duree: "2 à 3 sem." },
  { titre: "Prise en main", texte: "On règle la filtration avec toi, au bord de l'eau, le temps qu'il faut.", duree: "1 h" },
];

export const garanties = [
  { titre: "Garantie décennale", texte: "Dix ans sur tout ce qui touche à la solidité du bassin. L'attestation d'assurance est jointe au devis." },
  { titre: "Parfait achèvement", texte: "Un an après la réception : tout défaut signalé est repris, quelle que soit sa nature." },
  { titre: "Bon fonctionnement", texte: "Deux ans sur les équipements : pompe, filtre, volet, éclairage." },
];

/** Ce qui se passe l'été, au bord d'une piscine de famille : le bandeau qui défile. */
export const souvenirs = [
  "Le premier dimanche de juillet",
  "Les bombes du plus petit",
  "Le goûter au bord de l'eau",
  "Les longueurs des parents",
  "La bouée jaune",
  "Les copains de la rentrée",
  "Le bain de 21 h",
  "Le dernier jour d'août",
];

/* ---------- Les questions ---------- */

export type Question = { q: string; r: string };

export const questions: Question[] = [
  {
    q: "Faut-il un permis pour une piscine ?",
    r: "Un bassin de 10 m² ou moins ne demande aucune formalité, hors secteur protégé. De 10 à 100 m², s'il n'est pas couvert, il faut une déclaration préalable de travaux ; au-delà, un permis de construire. Toutes nos coques dépassent 10 m² : on prépare la déclaration avec toi, et la mairie a un mois pour répondre.",
  },
  {
    q: "Quand faut-il signer pour se baigner en juillet ?",
    r: "Avant la fin février, idéalement. Il faut compter un mois pour la déclaration préalable, puis deux à trois semaines de chantier : les semaines de mars à mai partent vite.",
  },
  {
    q: "Combien de temps dure le chantier ?",
    r: "Deux semaines pour un petit bassin, trois pour les autres, du premier coup de pelle à la mise en eau. Seule une grosse pluie peut décaler une étape : on te prévient la veille.",
  },
  {
    q: "Que comprend le prix ?",
    r: "Le terrassement et l'évacuation des terres, le lit de pose, la coque, la filtration, le remblai, les margelles et la mise en eau. La plage, le volet et la pompe à chaleur sont des options, chiffrées à part sur le devis.",
  },
  {
    q: "Une sécurité est-elle obligatoire ?",
    r: "Oui. La loi impose au moins un dispositif de sécurité normalisé sur toute piscine enterrée privée : volet, barrière, abri ou alarme. Le volet immergé est le plus discret ; on t'aide à choisir à la visite technique.",
  },
  {
    q: "Le chantier est-il vraiment filmé ?",
    r: "Seulement si tu es d'accord, et tu choisis ce qui est publié : le jardin et le bassin, jamais toi ni tes enfants sans ton accord écrit. Tu peux retirer la page quand tu veux.",
  },
  {
    q: "Pourquoi compter les étés jusqu'à 18 ans ?",
    r: "Parce que c'est souvent l'âge où l'on part de la maison. Le calcul est une façon de voir le temps, pas une promesse : après, ils reviendront peut-être l'été.",
  },
  {
    q: "Mon terrain est en pente ou difficile d'accès : est-ce possible ?",
    r: "Le plus souvent, oui. La visite technique sert précisément à le vérifier : accès pour la grue, nature du sol, distance aux réseaux. Le devis ferme en tient compte, sans surprise ensuite.",
  },
  {
    q: "Une piscine a-t-elle un coût fiscal ?",
    r: "Oui : une taxe d'aménagement, payée une fois, et une valeur locative en hausse pour la taxe foncière. On te remet une estimation avec le devis.",
  },
  {
    q: "Quelles garanties avez-vous ?",
    r: "La garantie décennale sur la structure, la garantie de parfait achèvement pendant un an, et deux ans de bon fonctionnement sur les équipements. L'attestation d'assurance est jointe à chaque devis.",
  },
];

/* ---------- Le planning des chantiers ---------- */

export const ANNEE = 2027;
export const SEMAINES = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
// Semaines déjà prises : un exemple. Sur un vrai site, le planning de l'entreprise.
export const PRISES = new Set([10, 11, 12, 15, 17, 18, 20]);

/** Lundi de la semaine ISO `semaine` de l'année `annee` (le 4 janvier est toujours en semaine 1). */
export function lundi(annee: number, semaine: number) {
  const quatreJanvier = new Date(Date.UTC(annee, 0, 4));
  const lundiSemaine1 = Date.UTC(annee, 0, 4 - ((quatreJanvier.getUTCDay() + 6) % 7));
  return new Date(lundiSemaine1 + (semaine - 1) * 7 * 86_400_000);
}

export const premiereSemaineLibre = SEMAINES.find((s) => !PRISES.has(s)) ?? SEMAINES[0];

export const NAVIGATION = [
  { libelle: "Piscines", href: `${DOSSIER}/piscines` },
  { libelle: "Chantiers", href: `${DOSSIER}/chantiers` },
  { libelle: "Prix", href: `${DOSSIER}/prix` },
  { libelle: "L'entreprise", href: `${DOSSIER}/entreprise` },
  { libelle: "Questions", href: `${DOSSIER}/questions` },
];
