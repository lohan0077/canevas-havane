// Le cabinet de psychologue imaginaire « Cinquante Minutes », filmé dans les deux
// vidéos des psychologues : « Créer une marque » (le nom, le titre plus gros que tout,
// l'horloge de la première séance, la porte ouverte) et « Remplir l'agenda » (le
// rendez-vous en trois clics sans motif, Mon soutien psy dit dès l'accueil, la carte
// bancaire acceptée, le 15 et le 3114).
//
// La psychologue, l'adresse, les prix, les créneaux et la date de la porte ouverte sont
// des exemples ; le téléphone est dans la tranche que l'ARCEP réserve à la fiction. Le
// site décrit un déroulé, jamais un résultat, et ne demande jamais ce qui amène
// quelqu'un : c'est une donnée de santé (RGPD, art. 4 (15) et 9), il n'en a pas besoin.

export const DOSSIER = "/exemples/cinquante-minutes";

export const cabinet = {
  nom: "Cinquante Minutes",
  baseline: "Rien à prouver.",
  psychologue: "Hélène M.",
  titre: "Psychologue",
  diplome: "Master de psychologie clinique et psychopathologie",
  adeli: "00 000 000 0",
  adresse: "12 rue de l'Exemple, rez-de-chaussée sur cour",
  ville: "Saint-Exemple",
  telephone: "01 99 00 50 50",
  horaires: "Du lundi au vendredi, de 9 h à 20 h 30 · le samedi, de 9 h à 12 h",
  seance: { duree: "50 min", prix: "65 €" },
};

export const NAVIGATION = [
  { href: `${DOSSIER}/premiere-seance`, libelle: "La première séance" },
  { href: `${DOSSIER}/porte-ouverte`, libelle: "Porte ouverte" },
  { href: `${DOSSIER}#tarifs`, libelle: "Tarifs" },
];

/* ---------- Les photos ----------
   Unsplash (licence Unsplash), servies depuis notre domaine ; crédits dans les
   mentions légales. Des portes, des fauteuils, la nuit : aucune personne. */
export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const P = "/exemples/cinquante-minutes";
export const photos = {
  porte: { src: `${P}/porte-lumiere.webp`, largeur: 1000, hauteur: 1500, alt: "Une porte dans la pénombre, traversée par la lumière d'un store" },
  entrouverte: { src: `${P}/porte-entrouverte.webp`, largeur: 1200, hauteur: 796, alt: "Une porte entrouverte, une clé dans la serrure, la lumière du soir qui passe" },
  sablier: { src: `${P}/sablier.webp`, largeur: 1000, hauteur: 1503, alt: "Un sablier de sable doré sur fond blanc" },
  chaise: { src: `${P}/chaise-soleil.webp`, largeur: 1400, hauteur: 635, alt: "Une chaise blanche dans une pièce vide, baignée de soleil" },
  fauteuil: { src: `${P}/fauteuil.webp`, largeur: 1200, hauteur: 901, alt: "Un fauteuil blanc et un coussin près d'une fenêtre voilée" },
  nuit: { src: `${P}/chambre-nuit.webp`, largeur: 1400, hauteur: 933, alt: "Une chambre dans la nuit, une lampe de chevet allumée près du lit" },
} satisfies Record<string, Photo>;

/* ---------- L'horloge de la première séance ----------
   Un déroulé, pas un résultat : ce qui se passe, minute après minute. Les minutes 12 et
   46 sont celles que la vidéo montre (« t'es pas obligé de tout dire », « la suite,
   c'est toi qui décides »). */
export const etapes = [
  { minute: 0, texte: "Vous arrivez. On s'assoit.", detail: "Pas de questionnaire en salle d'attente, pas de formulaire. Vous prenez le fauteuil que vous voulez." },
  { minute: 5, texte: "Je vous dis comment je travaille.", detail: "Le rythme, le tarif, ce qui reste entre nous et ses limites. Avant que vous ne disiez quoi que ce soit." },
  { minute: 10, texte: "Rien ne vous oblige à tout dire.", detail: "Vous pouvez commencer par un détail, par le milieu, ou par le silence. On ne vous demande pas de tout raconter." },
  { minute: 25, texte: "Vous parlez de ce que vous voulez.", detail: "À votre rythme. Je pose des questions ; vous répondez à celles que vous voulez." },
  { minute: 45, texte: "La suite, c'est vous qui décidez.", detail: "Une autre séance, plus tard, ou pas. Si un autre professionnel vous conviendrait mieux, je vous le dis." },
  { minute: 50, texte: "Vous repartez.", detail: "Sans rien avoir à prouver. Et sans engagement." },
];

/* ---------- Rien à préparer ---------- */
export const rienAPreparer = [
  { titre: "Vous n'avez rien à préparer", texte: "Pas de liste, pas de résumé. On commence là où vous voulez commencer." },
  { titre: "Je vous explique comment je travaille", texte: "Mon approche, le rythme des séances, le tarif, la confidentialité et ses limites." },
  { titre: "Vous parlez de ce que vous voulez", texte: "Ce qui vous amène, vous le dites si vous le souhaitez, comme vous le souhaitez." },
  { titre: "On décide ensemble de la suite", texte: "Une autre séance, un autre rythme, ou un autre professionnel si c'est plus adapté." },
];

/* ---------- La porte ouverte ----------
   Une vraie date (jeudi 14 janvier 2027), hors des heures de séance, sans patient. */
export const porteOuverte = {
  date: "Jeudi 14 janvier 2027",
  heures: "18 h – 20 h",
  regles: [
    "Sans inscription : venez, ou ne venez pas.",
    "Personne ne vous demandera votre nom, ni pourquoi vous êtes là.",
    "Le cabinet est fermé aux séances ce soir-là : aucun patient présent.",
    "Vous visitez, vous posez des questions si vous voulez, vous repartez.",
  ],
  deroule: [
    { heure: "18 h", texte: "La porte est ouverte. La lumière aussi." },
    { heure: "18 h 10", texte: "Vous entrez, ou vous regardez depuis le seuil." },
    { heure: "18 h 20", texte: "Les deux fauteuils, la fenêtre sur cour, la salle d'attente." },
    { heure: "20 h", texte: "On éteint. Personne n'a rien demandé à personne." },
  ],
};

/* ---------- Le rendez-vous en trois clics ---------- */
export const typesSeance = [
  { id: "premiere", libelle: "Première séance", detail: "50 min · on fait connaissance" },
  { id: "suivi", libelle: "Séance de suivi", detail: "50 min" },
];

export type Jour = { id: string; court: string; long: string; heures: { h: string; pris?: boolean }[] };
export const jours: Jour[] = [
  { id: "lundi", court: "Lun.", long: "lundi", heures: [{ h: "9 h", pris: true }, { h: "12 h 30" }, { h: "18 h" }, { h: "19 h 30", pris: true }] },
  { id: "mardi", court: "Mar.", long: "mardi", heures: [{ h: "10 h" }, { h: "14 h", pris: true }, { h: "18 h 30" }, { h: "19 h 30" }] },
  { id: "jeudi", court: "Jeu.", long: "jeudi", heures: [{ h: "9 h" }, { h: "12 h 30", pris: true }, { h: "18 h" }, { h: "19 h 30" }] },
  { id: "vendredi", court: "Ven.", long: "vendredi", heures: [{ h: "11 h" }, { h: "17 h", pris: true }, { h: "18 h 30" }] },
  { id: "samedi", court: "Sam.", long: "samedi", heures: [{ h: "9 h" }, { h: "10 h", pris: true }, { h: "11 h" }] },
];

/* ---------- Mon soutien psy, en trois lignes ----------
   Aucun chiffre (nombre de séances, tarif, taux) : ils changent. La source est
   ameli.fr ; la psychologue de ce site est « partenaire » pour l'exemple. */
export const soutienPsy = [
  "Mon soutien psy est un dispositif de l'Assurance Maladie : des séances avec un psychologue partenaire sont remboursées.",
  "Je suis psychologue partenaire (exemple) : je vous dis au premier rendez-vous si le dispositif s'applique à vous, et comment.",
  "Le nombre de séances, le tarif et les démarches sont expliqués sur ameli.fr. Je ne vous demande rien en ligne.",
];

/* ---------- Ce que le site ne vous demande pas ---------- */
export const champsAbsents = ["Motif de consultation", "Depuis quand ?", "Avez-vous déjà consulté ?"];

/* ---------- Questions ---------- */
export const questions = [
  { q: "Pourquoi « Cinquante Minutes » ?", r: "Parce que c'est la durée d'une séance ici, et qu'elle vous appartient. La durée varie selon les psychologues ; ici, elle est de cinquante minutes." },
  { q: "Pourquoi le site ne me demande-t-il pas ce qui m'amène ?", r: "Parce que c'est une donnée de santé, et que le site n'en a pas besoin pour vous donner un rendez-vous. Vous le direz en séance, si vous le voulez." },
  { q: "Que dois-je dire à la première séance ?", r: "Ce que vous voulez. Rien ne vous oblige à tout dire, ni même à savoir par où commencer." },
  { q: "Combien coûte une séance ? Prenez-vous la carte bancaire ?", r: "65 € la séance de cinquante minutes (prix d'exemple). Carte bancaire acceptée, espèces et virement aussi. Une facture vous est remise à chaque séance." },
  { q: "Psychologue ou psychiatre ?", r: "Le psychiatre est médecin : il peut prescrire des médicaments. Le psychologue n'est pas médecin et ne prescrit pas. Psychologue est un titre protégé par la loi (loi n° 85-772 du 25 juillet 1985, art. 44)." },
  { q: "Puis-je annuler ?", r: "Oui, en appelant le cabinet au moins 24 heures avant. Le créneau revient dans l'agenda." },
  { q: "Et si c'est urgent ?", r: "Ne prenez pas rendez-vous : appelez le 15. Pour une pensée suicidaire, la vôtre ou celle d'un proche : le 3114, numéro national de prévention du suicide, jour et nuit." },
];
