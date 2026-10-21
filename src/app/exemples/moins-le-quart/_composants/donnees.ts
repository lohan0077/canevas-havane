// Les données du site Moins le Quart, marque de café imaginaire de la vidéo « Si je
// devais créer une marque de café ». On ne vend pas un pays, on vend une heure :
// chaque café porte une heure, toujours moins le quart. Café seulement (loi Évin).
// Aucune allégation de santé : « au réveil », « pour la pause », « le soir » sont des
// moments de la journée, jamais un effet (règlement (CE) n° 1924/2006). Le déca n'est
// présenté comme bon pour rien. Prix d'exemple.

export const DOSSIER = "/exemples/moins-le-quart";

export const maison = {
  telephone: "01 99 00 64 45",
  adresse: "12 rue de l'Exemple",
};

export type CleCafe = "matin" | "pause" | "soir";
export type Cafe = {
  heure: string;
  enLettres: string;
  moment: string;
  nom: string;
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

export const euros = (n: number) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" }).replace(/\u202f/g, "\u00a0");

export const QUESTIONS = [
  { q: "Pourquoi « moins le quart » ?", r: "Parce que le café arrive toujours un peu avant l'heure : avant le départ, avant la réunion, avant la fin du dîner. Chaque café porte l'heure à laquelle on l'a imaginé." },
  { q: "Je peux boire celui de 6 h 45 à midi ?", r: "Bien sûr. L'heure est un nom, pas une consigne. L'accueil du site te propose celui de l'heure qu'il est ; tu choisis celui que tu veux." },
  { q: "Grain ou moulu ?", r: "Les deux, dans les trois cafés. Moulu pour filtre, piston, expresso ou cafetière italienne : tu choisis à la commande." },
  { q: "Le déca est fait comment ?", r: "Le café vert est décaféiné avant la torréfaction, puis torréfié comme les autres. C'est le même café du soir, toute l'année." },
  { q: "La vidéo de 6 h 45, c'est quoi ?", r: "Chaque matin, à sept heures moins le quart pile, une courte vidéo : le moulin qui tourne. Rien d'autre." },
];

export const photos = {
  matin: { src: "/exemples/moins-le-quart/matin.webp", largeur: 1400, hauteur: 2100, alt: "Une tasse fumante sur une table en bois, dans la lumière rasante d'une fenêtre au matin" },
  soir: { src: "/exemples/moins-le-quart/soir.webp", largeur: 1400, hauteur: 2489, alt: "Une tasse sur un bureau, un livre ouvert et un petit miroir, sous la lumière d'une lampe le soir" },
  aube: { src: "/exemples/moins-le-quart/aube.webp", largeur: 1200, hauteur: 1600, alt: "Un café noir dans un verre, posé près d'un rideau, dans la première lumière du jour" },
  moulin: { src: "/exemples/moins-le-quart/moulin.webp", largeur: 1200, hauteur: 1800, alt: "Un moulin à café manuel en bois rempli de grains, dans la pénombre" },
};
