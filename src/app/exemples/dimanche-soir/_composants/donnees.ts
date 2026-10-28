// Tout ce qu'affiche le site de Dimanche Soir, cabinet de coaching imaginaire. Entreprise
// fictive : chaque prix, chaque date est un exemple, et le site le dit.
//
// La règle qui gouverne ce site : aucune promesse de résultat (C. consom., art. L121-2,
// 2° b). Trois heures pour une question, c'est un format ; la question n'est jamais
// dite « résolue ». « Ma vie a changé ! » n'apparaît que barré. Aucun témoignage
// (art. L121-4, 27° et 28°). Pas de CPF (C. trav., art. L6323-8-1) : rien n'y est financé.
//
// Téléphone dans la tranche ARCEP réservée à la fiction ; aucune adresse e-mail ;
// aucune photo de personne (des lampes, une fenêtre, le soir).

export const DOSSIER = "/exemples/dimanche-soir";

export const entreprise = {
  nom: "Dimanche Soir",
  baseline: "Pour la question qui revient.",
  telephone: "01 99 00 22 00",
  telephoneLien: "+33199002200",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/programme`, libelle: "Le programme" },
  { href: `${DOSSIER}/reserver`, libelle: "Réserver" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };

export const photos = {
  lampeRouge: { src: `${DOSSIER}/lampe-rouge.webp`, largeur: 1400, hauteur: 934, alt: "Un salon vert le soir : une lampe à l'abat-jour rouge allumée, une chaise, une fenêtre bleu nuit" },
  abatJour: { src: `${DOSSIER}/abat-jour.webp`, largeur: 1000, hauteur: 1500, alt: "Une lampe à l'abat-jour clair allumée dans une pièce sombre" },
  fenetre: { src: `${DOSSIER}/fenetre-soir.webp`, largeur: 1400, hauteur: 933, alt: "Une fenêtre à la tombée du jour, une lampe allumée dans le coin de la pièce" },
} satisfies Record<string, Photo>;

export const FORMULE = { seances: 3, duree: "1 h", prix: "270 €" };

export const EXEMPLES = ["Est-ce que je quitte mon CDI ?", "Est-ce que je reprends des études ?", "Est-ce qu'on déménage ?"];

/** Le programme des trois heures : un déroulé, jamais un résultat. */
export const PROGRAMME = [
  { heure: "1", titre: "La question", texte: "On la regarde telle que tu l'as écrite. On la réécrit jusqu'à ce qu'elle dise exactement ce qui te tient éveillé le dimanche soir.", dedans: ["Ta phrase, mot pour mot", "Ce qu'elle cache, ce qu'elle oublie", "La version qu'on garde"] },
  { heure: "2", titre: "Les options", texte: "Toutes, même celles que tu as écartées trop vite. Pour chacune : ce qu'elle coûte, ce qu'elle change, qui elle concerne.", dedans: ["Les options sur la table", "Ce que chacune coûte", "Celle qui fait peur, et pourquoi"] },
  { heure: "3", titre: "Ce que tu testes", texte: "Une chose, petite, à essayer dans la semaine. Pas une décision : un essai. Tu choisis ; je ne choisis pas pour toi.", dedans: ["Un essai, pas une décision", "Ce que tu regarderas", "Le dimanche suivant"] },
];

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  { q: "Et si trois heures ne suffisent pas ?", r: "Alors on s'arrête quand même. Trois heures, c'est un format, pas une promesse. Tu repars avec ta question écrite et un essai choisi ; ce que tu en fais t'appartient." },
  { q: "Pourquoi une seule question ?", r: "Parce que c'est rarement trois problèmes. C'est une question, qui en entraîne d'autres. On commence par celle qui revient." },
  { q: "C'est remboursé ou financé par le CPF ?", r: "Non. Ce coaching n'est financé ni par le CPF, ni par la sécurité sociale : c'est une prestation privée, payée séance par séance (exemple)." },
  { q: "Tu es psychologue ?", r: "Non. Si ta question parle d'une souffrance qui dure, commence par ton médecin traitant. En cas de détresse : le 3114, jour et nuit." },
  { q: "Les séances ont lieu quand ?", r: "Le mardi ou le jeudi soir, trois semaines de suite, au cabinet ou en visio. Jamais le dimanche : le dimanche, on y pense déjà assez." },
];

export type Creneau = { libelle: string; sous: string; pris?: boolean };

/** Trois séances, une par semaine, au même horaire. */
export const CRENEAUX: Creneau[] = [
  { libelle: "Les mardis", sous: "3, 10 et 17 nov. · 19 h", pris: true },
  { libelle: "Les jeudis", sous: "5, 12 et 19 nov. · 19 h" },
  { libelle: "Les mardis", sous: "10, 17 et 24 nov. · 20 h" },
  { libelle: "Les jeudis", sous: "12, 19 et 26 nov. · 20 h" },
];
