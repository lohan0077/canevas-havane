// Les données de Sept Mille Dîners, marque de cuisines imaginaire filmée dans les deux
// vidéos des cuisinistes : « Créer une marque » (le nom, les trois questions sur ta vie,
// le premier dîner) et « Remplir l'agenda » (la longueur de tes murs qui dessine ta
// cuisine avec une fourchette pose comprise, le guide « comment choisir un bon
// cuisiniste », la pose filmée en accéléré). On vend des dîners ; les meubles sont fournis.
//
// Règles tenues (voir les SOURCES.md des deux vidéos) :
// - 7 300 est un calcul dit comme tel (20 ans × 365 soirs), jamais une durée de vie ;
// - le premier dîner est offert sans condition : compté dans aucun prix, la cuisine coûte
//   la même chose sans lui, rien d'autre à payer (C. consom., art. L121-4, 19°) ; cuisiné
//   par un chef à domicile déclaré et assuré (exemple) ;
// - les fourchettes sont TTC, pose comprise, marquées « exemple » ; le prix ferme vient au
//   devis, après la prise de cotes (arrêté du 3 décembre 1987, art. 1) ;
// - le guide ne nomme, ne compare et ne dénigre personne ; aucune enseigne citée ;
// - les poses filmées le sont avec l'accord écrit du client, sans rien montrer de chez lui ;
// - les réglages sont « compris dans le prix », jamais « gratuits ».

export const DOSSIER = "/exemples/sept-mille-diners";

export const NAVIGATION = [
  { href: `${DOSSIER}/ta-vie`, libelle: "Ta vie, ton plan" },
  { href: `${DOSSIER}/tes-murs`, libelle: "Tes murs, ton prix" },
  { href: `${DOSSIER}/le-premier-diner`, libelle: "Le premier dîner" },
  { href: `${DOSSIER}/choisir-son-cuisiniste`, libelle: "Le guide" },
];

export const maison = {
  nom: "Sept Mille Dîners",
  telephone: "01 99 00 73 00",
  adresse: "12 rue de l'Exemple",
  ville: "Ta Ville",
  horaires: "Atelier ouvert du mardi au samedi, de 10 h à 19 h",
  siret: "000 000 000 00000",
};

export const photos = {
  table: { src: "/exemples/sept-mille-diners/table-du-soir.webp", alt: "Des assiettes partagées sur une table en bois, vues de dessus, des mains qui se servent" },
  cocotte: { src: "/exemples/sept-mille-diners/cocotte.webp", alt: "Une main remue une cocotte rouge avec une cuillère en bois, sur la plaque d'une cuisine" },
  herbes: { src: "/exemples/sept-mille-diners/herbes.webp", alt: "Des herbes hachées au couteau sur une planche en bois" },
  service: { src: "/exemples/sept-mille-diners/service.webp", alt: "Une main sert une soupe dans un bol, le soir, au-dessus de la table" },
  planBois: { src: "/exemples/sept-mille-diners/plan-bois.webp", alt: "Un plan de travail en bois éclairé par en dessous, une planche, une cocotte et du basilic" },
  tasses: { src: "/exemples/sept-mille-diners/tasses.webp", alt: "Deux tasses de café sur une table, dans la pénombre du soir" },
  comptoir: { src: "/exemples/sept-mille-diners/table.webp", alt: "Une cuisine en bois clair avec un comptoir sombre, des tabourets et une grande fenêtre" },
  salle: { src: "/exemples/sept-mille-diners/salle.webp", alt: "Une cuisine blanche ouverte sur une table ronde en bois et ses chaises" },
};

/* ---------- Le premier écran : une semaine de dîners, sept cuisines ---------- */

/**
 * Les sept soirs du carrousel d'ouverture, du lundi au dimanche : un dîner en train de
 * se faire, chaque fois dans une autre cuisine. La légende dit le moment et la cuisine,
 * rien d'autre : aucun chiffre, aucune promesse. Photos Pexels regardées une à une :
 * aucune marque lisible (l'imprimé du tee-shirt de « noire mate » a été effacé).
 * `mobile` et `bureau` : le point de l'image gardé au cadrage (object-position) ;
 * `de` et `a` : le travelling — décalage en % de l'image, puis échelle.
 */
export type Soir = {
  jour: string;
  heure: string;
  cuisine: string;
  src: string;
  alt: string;
  portrait?: boolean;
  mobile: string;
  bureau: string;
  de: [number, number, number];
  a: [number, number, number];
};

export const SOIRS: Soir[] = [
  {
    jour: "Lundi", heure: "19 h 45", cuisine: "Une cuisine en merisier, une casserole qui fume.",
    src: "/exemples/sept-mille-diners/diner-casserole.webp",
    alt: "Une femme remue une casserole fumante, un verre de vin à la main, sous des placards en bois",
    portrait: true, mobile: "62% 50%", bureau: "50% 24%", de: [0, 2, 1.1], a: [-2, -1, 1.02],
  },
  {
    jour: "Mardi", heure: "20 h", cuisine: "Une cuisine noire mate, deux tabliers.",
    src: "/exemples/sept-mille-diners/diner-noire-mate.webp",
    alt: "Un couple en tablier noir rince des tomates dans une cuisine aux façades noires",
    mobile: "64% 50%", bureau: "50% 40%", de: [2, 0, 1.03], a: [-2, 0, 1.1],
  },
  {
    jour: "Mercredi", heure: "19 h 15", cuisine: "Une cuisine ouverte sur le salon. Les tomates d'abord.",
    src: "/exemples/sept-mille-diners/diner-ouverte.webp",
    alt: "Une femme en tablier coupe des tomates au-dessus des feux, dans une cuisine ouverte sur le salon",
    mobile: "66% 50%", bureau: "50% 50%", de: [-1.5, 1, 1.1], a: [1.5, -1, 1.03],
  },
  {
    jour: "Jeudi", heure: "20 h 05", cuisine: "Une cuisine de brique et de bois, les assiettes servies.",
    src: "/exemples/sept-mille-diners/diner-brique.webp",
    alt: "Un homme, un torchon sur l'épaule, sert des pâtes à une femme qui sourit, devant des vitrines en bois",
    mobile: "56% 50%", bureau: "50% 40%", de: [0, -1.5, 1.03], a: [-1.5, 1, 1.1],
  },
  {
    jour: "Vendredi", heure: "19 h 50", cuisine: "Un îlot au plan de bois, les verres déjà sortis.",
    src: "/exemples/sept-mille-diners/diner-ilot.webp",
    alt: "Une femme coupe des légumes sur un îlot en bois, des verres et des assiettes prêts pour le dîner",
    mobile: "70% 50%", bureau: "50% 50%", de: [1.5, 0, 1.1], a: [-1.5, 0.5, 1.03],
  },
  {
    jour: "Samedi", heure: "21 h 10", cuisine: "Une petite cuisine de ville, tout le monde debout.",
    src: "/exemples/sept-mille-diners/diner-ville.webp",
    alt: "Trois amies discutent, un verre à la main, dans une petite cuisine carrelée vue depuis la fenêtre",
    mobile: "63% 50%", bureau: "50% 30%", de: [-1, -1, 1.03], a: [1, 1, 1.1],
  },
  {
    jour: "Dimanche", heure: "20 h 15", cuisine: "Une grande table dans la cuisine, les bougies allumées.",
    src: "/exemples/sept-mille-diners/diner-grande-table.webp",
    alt: "Une famille dîne autour d'une table en bois éclairée aux bougies, dans la cuisine",
    mobile: "58% 50%", bureau: "50% 45%", de: [0, 1.5, 1.1], a: [0, -1.5, 1.03],
  },
];

/* ---------- Ta vie, ton plan : trois questions ---------- */

export type Reponses = { combien: "2" | "4" | "6"; cuisine: "moi" | "deux" | "tous"; vaisselle: "moi" | "enfants" | "personne" };

export const QUESTIONS = [
  { id: "combien", question: "Vous êtes combien à table ?", options: [{ v: "2", libelle: "2" }, { v: "4", libelle: "4" }, { v: "6", libelle: "6 et +" }] },
  { id: "cuisine", question: "Qui cuisine ?", options: [{ v: "moi", libelle: "Moi" }, { v: "deux", libelle: "À deux" }, { v: "tous", libelle: "Tout le monde" }] },
  { id: "vaisselle", question: "Et qui fait la vaisselle ?", options: [{ v: "moi", libelle: "Moi" }, { v: "enfants", libelle: "Les enfants" }, { v: "personne", libelle: "Personne" }] },
] as const;

export const NOTES = {
  combien: {
    "2": { titre: "Un comptoir, deux places", texte: "Le long du mur : on dîne face à face, sans table à pousser." },
    "4": { titre: "Îlot, quatre places", texte: "Au milieu de la pièce : celui qui cuisine voit ceux qui attendent." },
    "6": { titre: "Une table de six, côté fenêtre", texte: "Une vraie table, à deux pas du plan de travail." },
  },
  cuisine: {
    moi: { titre: "Un seul poste, tout à portée", texte: "Évier, plaque et frigo à trois pas les uns des autres." },
    deux: { titre: "Deux postes de travail", texte: "Un à l'évier, un à la plaque : on ne se marche pas dessus." },
    tous: { titre: "Un plan qu'on contourne", texte: "Dégagé de tous les côtés : chacun prend sa planche." },
  },
  vaisselle: {
    moi: { titre: "Lave-vaisselle à droite de l'évier", texte: "Le geste le plus court, pour celui qui s'y colle tous les soirs." },
    enfants: { titre: "Lave-vaisselle côté table", texte: "Et les assiettes rangées en bas, à leur hauteur." },
    personne: { titre: "Grand lave-vaisselle, évier à deux bacs", texte: "Puisque personne ne veut, autant que ce soit vite fait." },
  },
} as const;

/* ---------- Tes murs, ton prix : la fourchette ---------- */

/** Prix au mètre linéaire, TTC, pose comprise (exemple) : meubles, plan, évier, pose. */
export const GAMMES = [
  { id: "melamine", nom: "Mélaminé", detail: "Façades unies, plan stratifié", min: 1300, max: 1700 },
  { id: "laque", nom: "Laqué", detail: "Façades laquées, plan compact", min: 1950, max: 2500 },
  { id: "chene", nom: "Chêne massif", detail: "Façades en chêne, plan en bois", min: 2600, max: 3300 },
] as const;

export type IdGamme = (typeof GAMMES)[number]["id"];

export const COMPRIS = [
  "La prise de cotes chez toi",
  "Le plan, et ses modifications",
  "Les meubles, le plan de travail, l'évier",
  "La livraison et la pose",
  "Les raccordements de l'évier et de l'électroménager",
  "Les réglages des portes et des tiroirs, pendant deux ans",
];

export const PAS_COMPRIS = [
  "L'électroménager (tu peux garder le tien)",
  "L'électricité ou la plomberie au-delà des raccordements",
  "Le carrelage, la peinture, le sol",
];

/** Les créneaux de prise de cotes (exemple) : ceux qui sont pris le sont pour l'exemple. */
export const CRENEAUX_COTES = [
  { libelle: "Mar. 27", sous: "9 h – 10 h" },
  { libelle: "Mar. 27", sous: "17 h – 18 h", pris: true },
  { libelle: "Mer. 28", sous: "14 h – 15 h" },
  { libelle: "Jeu. 29", sous: "9 h – 10 h", pris: true },
  { libelle: "Ven. 30", sous: "17 h – 18 h" },
  { libelle: "Sam. 31", sous: "10 h – 11 h" },
];

/* ---------- Le guide ---------- */

export const QUESTIONS_GUIDE = [
  {
    id: "q-1",
    question: "Qui prend les cotes chez toi ?",
    pourquoi: "Un plan dessiné sur des mesures prises par quelqu'un d'autre, c'est le premier endroit où une cuisine se trompe. Demande qui vient, et si c'est la même personne qui dessine.",
    nous: "Mathieu vient prendre les cotes, et c'est lui qui dessine ton plan.",
  },
  {
    id: "q-2",
    question: "Qui pose ?",
    pourquoi: "Le magasin qui vend n'est pas toujours celui qui pose. Demande le nom de l'équipe, et si elle travaille pour l'entreprise ou pour un sous-traitant.",
    nous: "Notre équipe de deux poseurs. Pas de sous-traitance.",
  },
  {
    id: "q-3",
    question: "Qui revient, si une porte frotte ?",
    pourquoi: "Une cuisine bouge les premiers mois : le bois travaille, les charnières se règlent. Demande qui revient, sous quel délai, et à quel prix.",
    nous: "Les réglages des portes et des tiroirs sont compris dans le prix, pendant deux ans.",
  },
  {
    id: "q-4",
    question: "Le prix est-il TTC, pose comprise ?",
    pourquoi: "Un prix de meubles et un prix de cuisine posée, ce n'est pas le même prix. Demande ce qui est compris : livraison, pose, raccordements, électroménager.",
    nous: "Notre fourchette est TTC, pose comprise, hors électroménager. Le prix ferme est sur le devis.",
  },
  {
    id: "q-5",
    question: "Qu'est-ce qui est écrit sur le devis ?",
    pourquoi: "Un devis qui tient en une ligne ne se compare à rien. Demande le détail : chaque meuble, le plan, l'évier, la pose, les raccordements, la date.",
    nous: "Un devis ligne par ligne, avec la date de pose écrite.",
  },
];

/* ---------- Le chemin, du premier mot au premier dîner ---------- */

export const ETAPES = [
  { moment: "Sur le site", titre: "Trois questions, et tes murs", texte: "Combien à table, qui cuisine, qui fait la vaisselle. Puis la longueur de tes murs : un premier plan, et une fourchette TTC, pose comprise." },
  { moment: "Chez toi, une heure", titre: "La prise de cotes", texte: "Mathieu vient, mètre en main. Il regarde aussi où tu poses tes courses, et où tout le monde finit par s'asseoir." },
  { moment: "À l'atelier", titre: "Le plan, le devis", texte: "Le plan qui va avec ta vie, changé autant de fois qu'il faut. Un devis ligne par ligne, TTC, avec la date de pose écrite." },
  { moment: "Quatre jours, en moyenne", titre: "La pose", texte: "Notre équipe de deux poseurs. Filmée en accéléré si tu es d'accord, par écrit, sans rien montrer de chez toi." },
  { moment: "Le dernier soir", titre: "Le premier dîner", texte: "Ce soir-là, on le cuisine chez toi, dans ta nouvelle cuisine. Les 7 299 suivants sont à toi." },
];

export const DEROULE_DINER = [
  { quand: "Deux semaines avant", quoi: "On choisit le menu avec toi : ce que vous aimez, ce que vous ne mangez pas, les allergies." },
  { quand: "Le dernier jour de pose", quoi: "Les poseurs rangent. Le chef arrive vers 18 h, avec ses courses." },
  { quand: "Le soir", quoi: "Il cuisine dans ta nouvelle cuisine. Tu le regardes faire, ou tu mets la table." },
  { quand: "Après le dessert", quoi: "Il range, et il s'en va. Les 7 299 dîners suivants sont à toi." },
];

export const FAQ = [
  { q: "7 300 dîners, c'est la durée de vie d'une cuisine ?", r: "Non. C'est un calcul : si tu la gardes vingt ans, vingt fois 365 soirs font 7 300. On ne promet pas une durée : on dit ce qu'il y a au bout." },
  { q: "La fourchette, c'est un prix ?", r: "Non : c'est un ordre de grandeur honnête, TTC, pose comprise, pour une cuisine de cette longueur et de cette gamme. Le prix ferme est sur le devis, après la prise de cotes chez toi." },
  { q: "Le premier dîner est vraiment offert ?", r: "Oui, sans condition. Il n'est compté dans aucun prix : la cuisine coûte la même chose si tu n'en veux pas, et tu n'as rien d'autre à payer." },
  { q: "Qui cuisine le premier dîner ?", r: "Un chef à domicile, déclaré et assuré, avec qui on travaille (exemple). Le menu se décide avec toi, allergies comprises." },
  { q: "Qu'est-ce qui est filmé, pendant la pose ?", r: "Les meubles qui se montent, en accéléré : quatre jours en trente secondes. Seulement si tu es d'accord, par écrit, et sans rien montrer de chez toi : ni adresse, ni famille, ni objets personnels." },
];

// « 11 000 € » écrit à la main : le même rendu au serveur et dans le navigateur.
export const euros = (n: number) => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;
