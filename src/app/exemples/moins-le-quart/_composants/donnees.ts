// Les données du site Moins le Quart, marque de café imaginaire filmée dans les deux
// vidéos des torréfacteurs : « Créer une marque » (on ne vend pas un pays, on vend une
// heure : chaque café porte une heure, toujours moins le quart, et l'accueil suit
// l'heure du visiteur — le soir, il propose le déca) et « Remplir le carnet de
// commandes » (une seule question, « tu fais ton café comment ? », la mouture et les
// deux cafés faits pour la cafetière — pas quinze, deux ; la date de torréfaction en
// gros sur chaque sachet ; l'abonnement réglé en tasses).
//
// Café seulement (loi Évin). Aucune allégation de santé : « au réveil », « pour la
// pause », « le soir » sont des moments de la journée, jamais un effet (règlement (CE)
// n° 1924/2006) ; le déca n'est présenté comme bon pour rien d'autre que le goût. Le
// « tasses par jour » de l'abonnement est un repère de consommation, pas une dose.
// Prix et dates d'exemple.

export const DOSSIER = "/exemples/moins-le-quart";

export const maison = {
  nom: "Moins le Quart",
  telephone: "01 99 00 64 45",
  adresse: "12 rue de l'Exemple",
  ville: "Saint-Exemple",
  horaires: [
    { jours: "Mardi", heures: "Torréfaction · comptoir fermé" },
    { jours: "Mercredi – samedi", heures: "6 h 45 – 18 h 45" },
    { jours: "Dimanche et lundi", heures: "Fermé" },
  ],
};

export const NAVIGATION = [
  { href: `${DOSSIER}/cafes`, libelle: "Les trois cafés" },
  { href: `${DOSSIER}/abonnement`, libelle: "L'abonnement" },
  { href: `${DOSSIER}/maison`, libelle: "La maison" },
];

export type CleCafe = "matin" | "pause" | "soir";
export type Cafe = {
  heure: string;
  enLettres: string;
  moment: string;
  nom: string;
  enClair: string;
  phrase: string;
  ingredient: string;
  prix: number;
  fond: string;
  encre: string;
};

export const CAFES: Record<CleCafe, Cafe> = {
  matin: {
    heure: "6 h 45",
    enLettres: "sept heures moins le quart",
    moment: "au réveil",
    nom: "Le café du réveil",
    enClair: "rond, chocolaté",
    phrase: "Le premier café, celui d'avant que la maison se réveille. Rond, chocolaté, sans détour.",
    ingredient: "Café torréfié, 100 % arabica (Brésil, Colombie).",
    prix: 9.5,
    fond: "#2B1B12",
    encre: "#F2E3C9",
  },
  pause: {
    heure: "15 h 45",
    enLettres: "quatre heures moins le quart",
    moment: "pour la pause",
    nom: "Le café de la pause",
    enClair: "plus vif, fruité",
    phrase: "Celui de l'après-midi, qu'on boit debout près de la fenêtre. Plus léger, un goût de fruit.",
    ingredient: "Café torréfié, 100 % arabica (Éthiopie).",
    prix: 10.5,
    fond: "#C8742F",
    encre: "#2B1B12",
  },
  soir: {
    heure: "21 h 45",
    enLettres: "dix heures moins le quart",
    moment: "le soir",
    nom: "Le décaféiné du soir",
    enClair: "doux, noisette",
    phrase: "Pour finir le dîner avec un café, sans faire d'exception. Doux, un goût de noisette.",
    ingredient: "Café décaféiné torréfié, 100 % arabica (Pérou).",
    prix: 10,
    fond: "#3E5C76",
    encre: "#F2E3C9",
  },
};

export const ORDRE: CleCafe[] = ["matin", "pause", "soir"];

/** Le café d'une heure de la journée (en minutes depuis minuit). */
export const cafeDe = (minutes: number): CleCafe =>
  minutes >= 4 * 60 && minutes < 12 * 60 ? "matin" : minutes >= 12 * 60 && minutes < 19 * 60 ? "pause" : "soir";

/** La nuit, pour l'habillage de l'accueil : avant 6 h et à partir de 19 h. */
export const nuit = (minutes: number) => minutes < 6 * 60 || minutes >= 19 * 60;

export const heureLisible = (minutes: number) => {
  const h = Math.floor(minutes / 60), m = minutes % 60;
  return `${h} h ${String(m).padStart(2, "0")}`;
};

/** « 9,50 € » : écrit à la main, l'espace avant € variant d'un navigateur à l'autre. */
export const euros = (n: number) => `${n.toFixed(2).replace(".", ",")} €`;

/* ---------- « Tu fais ton café comment ? » ----------
   Pour chaque cafetière : la mouture, et les deux cafés de la maison faits pour elle.
   Pas quinze origines : trois cafés en tout, et deux pour ta cafetière. */
export type CleMethode = "filtre" | "piston" | "expresso" | "italienne";
export type Methode = { libelle: string; pour: string; mouture: string; finesse: number; cafes: [CleCafe, CleCafe]; conseil: string };

export const METHODES: Record<CleMethode, Methode> = {
  filtre: { libelle: "Filtre", pour: "ta cafetière filtre", mouture: "moyenne", finesse: 2, cafes: ["pause", "soir"], conseil: "Comme du sable. Trop fin, l'eau passe mal ; trop gros, elle passe trop vite." },
  piston: { libelle: "Piston", pour: "ta cafetière à piston", mouture: "grossière", finesse: 3, cafes: ["matin", "soir"], conseil: "Comme du gros sel. Quatre minutes d'infusion, puis on presse doucement." },
  expresso: { libelle: "Expresso", pour: "ta machine à expresso", mouture: "fine", finesse: 0, cafes: ["matin", "pause"], conseil: "Presque de la farine. Le mieux reste de moudre juste avant, si tu as un moulin." },
  italienne: { libelle: "Italienne", pour: "ta cafetière italienne", mouture: "moyenne-fine", finesse: 1, cafes: ["matin", "pause"], conseil: "Un peu plus fine qu'en filtre. On ne tasse pas le café dans le panier." },
};

export const ORDRE_METHODES: CleMethode[] = ["filtre", "piston", "expresso", "italienne"];
export const FINESSES = ["fine", "moyenne-fine", "moyenne", "grossière"];

/* ---------- L'abonnement, réglé en tasses ----------
   7 g par tasse (repère d'exemple), et un envoi qui arrive avant que le paquet soit
   vide. Trois tasses par jour : 500 g toutes les 3 semaines (3 × 7 × 21 = 441 g). */
export const GRAMMES_PAR_TASSE = 7;
export const abonnementPour = (tasses: number) => {
  const poids = tasses <= 1 ? 250 : tasses <= 3 ? 500 : 1000;
  const semaines = Math.floor(poids / (tasses * GRAMMES_PAR_TASSE * 7));
  const prix = poids === 250 ? 9.5 : poids === 500 ? 18 : 34;
  return { poids, semaines, prix, libelle: poids === 1000 ? "1 kg" : `${poids} g` };
};

export const QUESTIONS = [
  { q: "Pourquoi « moins le quart » ?", r: "Parce que le café arrive toujours un peu avant l'heure : avant le départ, avant la réunion, avant la fin du dîner. Chaque café porte l'heure à laquelle on l'a imaginé." },
  { q: "Je peux boire celui de 6 h 45 à midi ?", r: "Bien sûr. L'heure est un nom, pas une consigne. L'accueil du site te propose celui de l'heure qu'il est ; tu choisis celui que tu veux." },
  { q: "Café en grain ou moulu ?", r: "En grain si tu as un moulin : tu mouds juste avant. Sinon, moulu pour ta cafetière, le lendemain de la torréfaction. Tu nous dis laquelle, on règle la mouture." },
  { q: "Pourquoi seulement deux cafés par cafetière ?", r: "Parce que quinze origines, c'est quinze questions. On a goûté nos trois cafés dans chaque cafetière, et on te donne les deux qui y sont les meilleurs." },
  { q: "C'est quoi, « torréfié mardi » ?", r: "Le jour où ton café a été torréfié, écrit en gros sur le sachet. On torréfie le mardi ; le comptoir rouvre et les abonnements partent le mercredi." },
  { q: "Comment marche l'abonnement ?", r: "Tu dis combien de tasses tu bois par jour, on calcule le paquet et le rythme pour qu'il arrive avant que le précédent soit vide. Tu changes le rythme, tu suspends ou tu arrêtes quand tu veux, en ligne." },
  { q: "Le déca est fait comment ?", r: "Le café vert est décaféiné avant la torréfaction, puis torréfié comme les autres, le même mardi. C'est le café du soir, toute l'année." },
];

/* ---------- Les photos ----------
   Unsplash (licence Unsplash), servies depuis notre domaine ; crédits dans les
   mentions légales. Aucun visage, aucune marque visible. */
export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const P = DOSSIER;
export const photos = {
  matin: { src: `${P}/matin.webp`, largeur: 1400, hauteur: 2100, alt: "Une tasse fumante sur une table en bois, dans la lumière rasante d'une fenêtre au matin" },
  soir: { src: `${P}/soir.webp`, largeur: 1400, hauteur: 2489, alt: "Une tasse sur un bureau, un livre ouvert et un petit miroir, sous la lumière d'une lampe le soir" },
  aube: { src: `${P}/aube.webp`, largeur: 1200, hauteur: 1600, alt: "Un café noir dans un verre, posé près d'un rideau, dans la première lumière du jour" },
  moulin: { src: `${P}/moulin.webp`, largeur: 1200, hauteur: 1800, alt: "Un moulin à café manuel en bois rempli de grains, dans la pénombre" },
  italienne: { src: `${P}/italienne.webp`, largeur: 1200, hauteur: 800, alt: "Une cafetière italienne en aluminium posée sur un fond jaune vif" },
  filtre: { src: `${P}/filtre.webp`, largeur: 1200, hauteur: 1800, alt: "De l'eau versée en filet sur du café moulu, dans un filtre en papier" },
  refroidissement: { src: `${P}/refroidissement.webp`, largeur: 1400, hauteur: 791, alt: "Des grains de café qui refroidissent, brassés par les bras d'acier du torréfacteur, vus de dessus" },
  tasses: { src: `${P}/trois-tasses.webp`, largeur: 1200, hauteur: 1800, alt: "Trois tasses blanches alignées sur une table en bois : un café au lait, un café, des grains" },
} satisfies Record<string, Photo>;
