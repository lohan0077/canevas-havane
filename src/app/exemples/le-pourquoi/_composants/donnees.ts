// Le cabinet d'ostéopathie imaginaire « Le Pourquoi ». La praticienne, l'adresse, les
// prix et les créneaux sont des exemples ; le téléphone est dans la tranche que
// l'ARCEP réserve à la fiction. Les textes des gestes décrivent une pratique : ils ne
// disent ni quand consulter, ni ce que l'ostéopathie guérirait.

export const DOSSIER = "/exemples/le-pourquoi";

export const cabinet = {
  nom: "Le Pourquoi",
  praticienne: "Inès T.",
  titre: "Ostéopathe D.O.",
  diplome: "Diplôme d'ostéopathe (D.O.), établissement agréé — exemple",
  adeli: "00 000 000 0",
  adresse: "12 rue de l'Exemple",
  ville: "Saint-Exemple",
  telephone: "01 99 00 31 58",
  horaires: "Du lundi au vendredi, 8 h 30 – 19 h 30 · samedi matin",
  prix: "55 €",
  duree: "50 min",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#gestes`, libelle: "Les gestes" },
  { href: `${DOSSIER}#seance`, libelle: "La séance" },
  { href: `${DOSSIER}#questions`, libelle: "Vos questions" },
  { href: `${DOSSIER}/rendez-vous`, libelle: "Rendez-vous" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const P = "/exemples/le-pourquoi";
export const photos = {
  colonne: { src: `${P}/colonne.webp`, largeur: 1400, hauteur: 2100, alt: "Maquette d'une colonne vertébrale et d'un bassin, en lumière bleue" },
  epaule: { src: `${P}/epaule.webp`, largeur: 1200, hauteur: 800, alt: "Deux mains posées sur l'épaule d'une personne allongée" },
  nuque: { src: `${P}/nuque.webp`, largeur: 1000, hauteur: 667, alt: "Une personne de dos, une main posée sur la nuque" },
  basDuDos: { src: `${P}/bas-du-dos.webp`, largeur: 1200, hauteur: 800, alt: "Une main posée à plat sur le bas du dos d'une personne allongée" },
} satisfies Record<string, Photo>;

/* ---------- Les gestes : une page chacun ---------- */
export type Geste = {
  slug: string;
  numero: string;
  question: string;     // le titre de la page, à la première personne
  recherche: string;    // ce que les gens tapent, tel que Google le suggère (relevé du 15/10/2026)
  photo: keyof typeof photos;
  fais: string[];
  pourquoi: string[];
  promet: string[];
};

export const gestes: Geste[] = [
  {
    slug: "craquer",
    numero: "01",
    question: "Pourquoi je fais craquer ?",
    recherche: "pourquoi l'ostéopathe fait craquer",
    photo: "epaule",
    fais: [
      "Un geste rapide et de faible amplitude sur une articulation, après vous avoir dit lequel et où. Parfois, on entend un bruit.",
      "Je vous demande votre accord avant. Si vous ne voulez pas, je ne le fais pas : d'autres gestes existent, plus lents.",
    ],
    pourquoi: [
      "Le bruit vient de l'articulation elle-même : quand ses surfaces s'écartent brièvement, une bulle de gaz se forme dans le liquide qui la lubrifie. C'est le même bruit que quand on fait craquer ses doigts.",
      "Je choisis ce geste quand l'examen me montre une articulation qui bouge moins que ses voisines, et quand rien ne s'y oppose.",
    ],
    promet: [
      "Le bruit n'est pas la preuve que quelque chose « s'est remis en place ». Il ne dit rien de ce que vous ressentirez ensuite.",
      "Pas de bruit ne veut pas dire que le geste a raté.",
    ],
  },
  {
    slug: "ventre",
    numero: "02",
    question: "Pourquoi j'appuie sur le ventre ?",
    recherche: "pourquoi l ostéopathe appuie sur le ventre",
    photo: "basDuDos",
    fais: [
      "J'appuie doucement, la main à plat, sur différentes zones du ventre. Je vous demande à chaque fois si c'est sensible.",
      "Vous pouvez garder un vêtement. Vous pouvez aussi me demander d'arrêter.",
    ],
    pourquoi: [
      "Le ventre fait partie de l'examen : je regarde comment les tissus bougent avec la respiration, et je repère ce qui est sensible.",
      "Ce que je trouve m'aide à choisir les gestes suivants — ou à vous dire qu'il vaut mieux en parler à votre médecin.",
    ],
    promet: [
      "Appuyer sur le ventre ne soigne pas une maladie digestive et ne remplace pas un examen médical.",
      "Si quelque chose m'inquiète, je vous le dis, et je vous oriente vers un médecin.",
    ],
  },
  {
    slug: "tete",
    numero: "03",
    question: "Pourquoi je touche la tête ?",
    recherche: "pourquoi l ostéopathe touche la tête",
    photo: "nuque",
    fais: [
      "Je pose les mains sur le crâne et la nuque, sans appuyer fort, parfois plusieurs minutes. Vous restez allongé, sur le dos.",
      "Il ne se passe rien de spectaculaire : c'est normal, c'est un geste lent.",
    ],
    pourquoi: [
      "Les muscles de la nuque et de la mâchoire s'attachent au crâne. Les mains posées là me permettent de travailler ces zones sans geste brusque.",
      "C'est aussi souvent le moment où l'on parle le moins. Si vous préférez parler, on parle.",
    ],
    promet: [
      "Ce geste n'agit pas sur le cerveau et ne remplace aucun traitement.",
      "Pour un nourrisson de moins de six mois : aucun geste sur le crâne sans diagnostic médical préalable attestant l'absence de contre-indication (décret n° 2007-435, art. 3, II).",
    ],
  },
];

/* ---------- La séance, avec un « Pourquoi ? » à chaque étape ---------- */
export const seance = [
  {
    moment: "En arrivant",
    etape: "Je vous pose des questions avant de vous toucher.",
    pourquoi: "Vos antécédents, vos traitements, ce qui vous amène : c'est ce qui me dit quels gestes sont possibles, et lesquels ne le sont pas. Vous le dites ici, au cabinet — jamais sur le site.",
  },
  {
    moment: "Debout",
    etape: "Je vous demande de vous pencher, de tourner la tête.",
    pourquoi: "Je regarde comment vous bougez, de quel côté c'est plus facile. Ça vaut mieux qu'une description.",
  },
  {
    moment: "Sur la table",
    etape: "Je vous dis chaque geste avant de le faire.",
    pourquoi: "Parce que vous avez le droit de savoir ce qu'on vous fait. Et de dire non à un geste, sans avoir à vous justifier.",
  },
  {
    moment: "À la fin",
    etape: "Je vous explique ce que j'ai fait.",
    pourquoi: "Pour que vous repartiez sans mystère — et avec la facture, que vous pouvez remettre à votre mutuelle si votre contrat le prévoit.",
  },
];

/* ---------- Une question de patient par semaine ----------
   Une réponse filmée d'une minute, sans jamais montrer le patient. Les dates sont
   un exemple de calendrier : celle d'un lancement en janvier 2027. */
export const questionsHebdo = [
  { n: 1, date: "8 janvier 2027", q: "Pourquoi je fais craquer ?", geste: "craquer" },
  { n: 2, date: "15 janvier 2027", q: "Pourquoi j'appuie sur le ventre ?", geste: "ventre" },
  { n: 3, date: "22 janvier 2027", q: "Pourquoi je touche la tête ?", geste: "tete" },
  { n: 4, date: "29 janvier 2027", q: "Pourquoi je vous demande de vous déshabiller ?" },
  { n: 5, date: "5 février 2027", q: "Pourquoi je vous pose des questions sur vos traitements ?" },
  { n: 6, date: "12 février 2027", q: "Pourquoi je touche ailleurs que là où vous avez mal ?" },
];

export const faq = [
  {
    q: "Combien coûte une séance ?",
    r: "55 € pour 50 minutes (prix d'exemple). Une facture vous est remise à chaque séance.",
  },
  {
    q: "Puis-je refuser un geste ?",
    r: "Oui, toujours, et sans vous justifier. Je vous dis chaque geste avant de le faire, justement pour ça.",
  },
  {
    q: "Pourquoi ne pas promettre de résultat ?",
    r: "Parce que personne ne peut le promettre honnêtement. Affirmer faussement qu'une prestation guérit est d'ailleurs une pratique commerciale trompeuse (code de la consommation, art. L121-4, 16°). Je promets autre chose : tout vous expliquer.",
  },
  {
    q: "Et pour un bébé ?",
    r: "Pour un nourrisson de moins de six mois, il faut d'abord un diagnostic établi par un médecin, qui atteste l'absence de contre-indication (décret n° 2007-435, art. 3, II).",
  },
  {
    q: "Les vidéos montrent-elles des patients ?",
    r: "Jamais. Les questions viennent des patients, les réponses de moi, filmées seule au cabinet.",
  },
];

/* ---------- Rendez-vous : créneaux d'exemple ---------- */
export const creneaux = [
  { libelle: "8 h 30", sous: "Lundi", pris: true },
  { libelle: "18 h 40", sous: "Lundi" },
  { libelle: "9 h 20", sous: "Mardi" },
  { libelle: "12 h 50", sous: "Mardi", pris: true },
  { libelle: "17 h 50", sous: "Mercredi" },
  { libelle: "8 h 30", sous: "Jeudi" },
  { libelle: "14 h 00", sous: "Jeudi", pris: true },
  { libelle: "11 h 10", sous: "Vendredi" },
  { libelle: "9 h 20", sous: "Samedi" },
];
