// Le cabinet d'ostéopathie imaginaire « Le Pourquoi », montré dans les deux vidéos
// des ostéopathes : « Créer une marque » (le nom, les gestes expliqués) et « Remplir
// l'agenda » (ce que je ne fais pas, le prix en gros, les créneaux de 7 h et 20 h).
// La praticienne, l'adresse, les prix et les créneaux sont des exemples ; le
// téléphone est dans la tranche que l'ARCEP réserve à la fiction. Les textes
// décrivent une pratique : ils ne disent ni quand consulter, ni ce que
// l'ostéopathie guérirait.

export const DOSSIER = "/exemples/le-pourquoi";

export const cabinet = {
  nom: "Le Pourquoi",
  praticienne: "Inès T.",
  titre: "Ostéopathe D.O.",
  diplome: "Diplôme d'ostéopathe (D.O.), établissement agréé (exemple)",
  adeli: "00 000 000 0",
  adresse: "12 rue de l'Exemple, 2e étage",
  ville: "Saint-Exemple",
  telephone: "01 99 00 31 58",
  horaires: "Du lundi au vendredi, de 7 h à 20 h 45 ; le samedi, de 8 h à 13 h.",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#gestes`, libelle: "Les gestes" },
  { href: `${DOSSIER}/ce-que-je-ne-fais-pas`, libelle: "Ce que je ne fais pas" },
  { href: `${DOSSIER}/seance-et-prix`, libelle: "Séance et prix" },
];

/* ---------- Les photos ----------
   Unsplash (licence Unsplash, usage commercial permis), servies depuis notre
   domaine ; crédits dans les mentions légales. Aucun visage. */
export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const P = "/exemples/le-pourquoi";
export const photos = {
  colonne: { src: `${P}/colonne.webp`, largeur: 1400, hauteur: 2100, alt: "Maquette d'une colonne vertébrale et d'un bassin, en lumière bleue" },
  epaule: { src: `${P}/epaule.webp`, largeur: 1200, hauteur: 800, alt: "Deux mains posées sur l'épaule d'une personne allongée" },
  nuque: { src: `${P}/nuque.webp`, largeur: 1000, hauteur: 667, alt: "Une personne de dos, une main posée sur la nuque" },
  basDuDos: { src: `${P}/bas-du-dos.webp`, largeur: 1200, hauteur: 800, alt: "Une main posée à plat sur le bas du dos d'une personne allongée" },
  mainsDos: { src: `${P}/mains-dos.webp`, largeur: 1200, hauteur: 1800, alt: "Deux mains posées à plat sur le bas du dos d'une personne allongée" },
  omoplate: { src: `${P}/omoplate.webp`, largeur: 1000, hauteur: 1498, alt: "Les mains de l'ostéopathe sur l'omoplate d'une personne en t-shirt noir" },
  mains: { src: `${P}/mains.webp`, largeur: 1000, hauteur: 667, alt: "Deux mains posées en triangle au milieu d'un dos, vues de dessus" },
  table: { src: `${P}/table.webp`, largeur: 1200, hauteur: 1800, alt: "Une table de soin près d'une fenêtre, dans une pièce boisée" },
  attente: { src: `${P}/attente.webp`, largeur: 1000, hauteur: 667, alt: "Salle d'attente claire, chaises blanches et plantes vertes" },
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

/* ---------- Ce que je ne fais pas ----------
   Trois lignes communes à tous les ostéopathes, et dites comme telles :
   code de la consommation L121-4 16° ; décret n° 2007-435, art. 2 et art. 3, II. */
export const nonFais = [
  {
    id: "guerir",
    titre: "Promettre de vous guérir",
    texte:
      "Je ne vous promettrai pas de guérison, ni un nombre de séances pour « régler » quoi que ce soit. Je vous dis ce que je fais, et pourquoi. Le reste, personne ne peut le promettre honnêtement.",
    source: "Code de la consommation, art. L121-4, 16°",
  },
  {
    id: "medecin",
    titre: "Remplacer votre médecin",
    texte:
      "Je ne pose pas de diagnostic médical et je ne touche pas à vos traitements. Si ce que vous me décrivez relève d'un médecin, je vous le dis, et je vous oriente vers lui.",
    source: "Décret n° 2007-435, art. 2",
  },
  {
    id: "bebe",
    titre: "Bébé de moins de 6 mois sans diagnostic médical",
    texte:
      "Pour un nourrisson de moins de six mois, je travaille seulement après un diagnostic établi par un médecin, qui atteste l'absence de contre-indication. Apportez-le à la séance.",
    source: "Décret n° 2007-435, art. 3, II",
  },
];

export const jeFais = [
  "Je vous écoute, et je vous pose des questions avant de vous toucher.",
  "Je vous dis ce que je vais faire, où, et pourquoi.",
  "Je vous demande votre accord avant chaque geste. Vous pouvez dire non.",
  "Je vous remets une facture à la fin de la séance.",
];

/* ---------- La séance et le prix ---------- */
export const seanceAdulte = { duree: "45 min", prix: "60 €" };

export const tarifs = [
  { nom: "Séance adulte", duree: "45 min", prix: "60 €", note: "" },
  { nom: "Séance enfant, de 6 mois à 15 ans", duree: "40 min", prix: "50 €", note: "" },
  { nom: "Nourrisson de moins de 6 mois", duree: "40 min", prix: "50 €", note: "Après diagnostic médical attestant l'absence de contre-indication" },
  { nom: "Séance tôt (7 h) ou tard (20 h)", duree: "45 min", prix: "60 €", note: "Même prix, aucune majoration" },
];

export const deroule = [
  { minute: "0", titre: "On parle", texte: "Ce qui vous amène, vos antécédents, vos traitements. Vous le dites ici, au cabinet — le site ne vous le demande jamais." },
  { minute: "10", titre: "J'observe", texte: "Debout, assis, allongé : je regarde comment vous bougez. Vous restez en sous-vêtements ou en tenue souple, comme vous préférez." },
  { minute: "15", titre: "Je vous explique", texte: "Ce que je vais faire, où, et pourquoi. Avec des mots simples, avant de commencer." },
  { minute: "20", titre: "Je travaille", texte: "Avec votre accord, geste par geste. Si un geste vous gêne, on arrête, sans avoir à se justifier." },
  { minute: "40", titre: "On finit", texte: "Ce que j'ai fait, et pourquoi. Vous posez vos questions, je vous remets la facture." },
];

/* ---------- L'agenda ----------
   Créneaux d'exemple. Sur un vrai site, ils suivent l'agenda réel du cabinet :
   aucune urgence affichée, aucun « plus que deux places ». */
export type Jour = { id: string; court: string; long: string; creneaux: { heure: string; pris?: boolean }[] };

const journee = (pris: string[]) =>
  ["7 h 00", "7 h 45", "9 h 00", "12 h 30", "14 h 00", "17 h 30", "18 h 30", "19 h 15", "20 h 00"].map((heure) => ({
    heure,
    pris: pris.includes(heure),
  }));

export const semaine: Jour[] = [
  { id: "lundi", court: "Lun", long: "lundi", creneaux: journee(["7 h 00", "9 h 00", "18 h 30", "20 h 00"]) },
  { id: "mardi", court: "Mar", long: "mardi", creneaux: journee(["9 h 00", "14 h 00", "17 h 30"]) },
  { id: "mercredi", court: "Mer", long: "mercredi", creneaux: journee(["7 h 45", "12 h 30", "19 h 15"]) },
  { id: "jeudi", court: "Jeu", long: "jeudi", creneaux: journee(["7 h 00", "14 h 00", "18 h 30"]) },
  { id: "vendredi", court: "Ven", long: "vendredi", creneaux: journee(["12 h 30", "17 h 30", "20 h 00"]) },
  {
    id: "samedi", court: "Sam", long: "samedi",
    creneaux: ["8 h 00", "9 h 00", "10 h 15", "11 h 30", "12 h 30"].map((heure) => ({ heure, pris: heure === "9 h 00" })),
  },
];

/* ---------- Vos questions ---------- */
export const questions = [
  {
    q: "Combien coûte une séance, et combien de temps dure-t-elle ?",
    r: "Une séance adulte dure 45 minutes et coûte 60 € (prix d'exemple). Le prix est le même à 7 h ou à 20 h.",
  },
  {
    q: "Est-ce que vous me remettez une facture ?",
    r: "Oui, à chaque séance. Elle vous sert à demander une prise en charge à votre mutuelle, si votre contrat le prévoit.",
  },
  {
    q: "Faut-il dire pourquoi je viens en réservant ?",
    r: "Non. Le site vous demande un nom, un téléphone et un créneau, rien d'autre. Ce qui vous amène, vous me le direz au cabinet.",
  },
  {
    q: "Puis-je refuser un geste ?",
    r: "Oui, toujours, et sans vous justifier. Je vous dis chaque geste avant de le faire, justement pour ça.",
  },
  {
    q: "Pourquoi ne pas promettre de résultat ?",
    r: "Parce que personne ne peut le promettre honnêtement. Affirmer faussement qu'une prestation guérit est d'ailleurs une pratique commerciale trompeuse (code de la consommation, art. L121-4, 16°). Je promets autre chose : tout vous expliquer.",
  },
  {
    q: "Et pour un bébé ?",
    r: "Pour un nourrisson de moins de six mois, il faut d'abord un diagnostic établi par un médecin, qui atteste l'absence de contre-indication (décret n° 2007-435, art. 3, II). Apportez-le à la séance.",
  },
  {
    q: "Les vidéos montrent-elles des patients ?",
    r: "Jamais. Les questions viennent des patients, les réponses de moi, filmées seule au cabinet.",
  },
  {
    q: "Et si je dois annuler ?",
    r: "Appelez ou annulez en ligne jusqu'à 24 heures avant. Le créneau revient dans l'agenda pour quelqu'un d'autre.",
  },
];

/* ---------- Le mannequin du premier écran ----------
   Cinq zones, et pour chacune la question telle qu'un patient la pose. Les réponses
   sont reprises des pages du site (les gestes, la séance, ce que je ne fais pas) : le
   premier écran n'ajoute aucune affirmation, ne nomme aucun symptôme à soigner et ne
   dit pas quand consulter. Le dessin et la 3D des zones sont dans mannequin-forme.ts. */
export type ZoneCorps = {
  id: "tete" | "epaules" | "dos" | "ventre" | "basDuDos";
  libelle: string;
  question: string;
  fais: string;
  pasFais: string;
  lien: { href: string; libelle: string };
  /** Pas encore de page pour ce geste : la date de sa réponse filmée. */
  aVenir?: string;
};

const geste = (slug: string) => gestes.find((g) => g.slug === slug)!;

export const zonesCorps: ZoneCorps[] = [
  {
    id: "tete",
    libelle: "Tête et nuque",
    question: "Pourquoi vous me touchez la tête ?",
    fais: geste("tete").fais[0],
    pasFais: geste("tete").promet[0],
    lien: { href: `${DOSSIER}/gestes/tete`, libelle: geste("tete").question },
  },
  {
    id: "epaules",
    libelle: "Épaules",
    question: "Pourquoi ça a craqué ?",
    fais: `${geste("craquer").fais[0]} Je vous demande votre accord avant.`,
    // La seconde phrase de geste("craquer").fais[1].
    pasFais: "Si vous ne voulez pas, je ne le fais pas : d'autres gestes existent, plus lents.",
    lien: { href: `${DOSSIER}/gestes/craquer`, libelle: geste("craquer").question },
  },
  {
    id: "dos",
    libelle: "Dos",
    question: "Pourquoi vous me faites pencher ?",
    fais: `${seance[1].etape} ${seance[1].pourquoi}`,
    pasFais: nonFais[1].texte,
    lien: { href: `${DOSSIER}/seance-et-prix`, libelle: "La séance, étape par étape" },
  },
  {
    id: "ventre",
    libelle: "Ventre",
    question: "Pourquoi vous appuyez sur mon ventre ?",
    fais: geste("ventre").fais[0],
    pasFais: geste("ventre").promet[0],
    lien: { href: `${DOSSIER}/gestes/ventre`, libelle: geste("ventre").question },
  },
  {
    id: "basDuDos",
    libelle: "Bas du dos",
    question: "Pourquoi vous touchez ailleurs que là où j'ai mal ?",
    fais: `${jeFais[1]} ${jeFais[2]}`,
    // La première phrase de nonFais[0].texte.
    pasFais: "Je ne vous promettrai pas de guérison, ni un nombre de séances pour « régler » quoi que ce soit.",
    lien: { href: `${DOSSIER}/ce-que-je-ne-fais-pas`, libelle: "Ce que je ne fais pas" },
    aVenir: `Sa réponse filmée arrive le ${questionsHebdo[5].date}.`,
  },
];
