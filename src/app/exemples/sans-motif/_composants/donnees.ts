// Le cabinet de psychologue imaginaire « Sans Motif ». La psychologue, l'adresse, les
// prix et les créneaux sont des exemples ; le téléphone est dans la tranche que
// l'ARCEP réserve à la fiction. Le site ne demande jamais ce qui amène quelqu'un :
// c'est une donnée de santé (RGPD, art. 4 (15) et 9), et il n'en a pas besoin.

export const DOSSIER = "/exemples/sans-motif";

export const cabinet = {
  nom: "Sans Motif",
  psychologue: "Claire V.",
  titre: "Psychologue",
  diplome: "Master de psychologie clinique — exemple",
  adeli: "00 000 000 0",
  adresse: "12 rue de l'Exemple, 1er étage",
  ville: "Saint-Exemple",
  telephone: "01 99 00 64 12",
  horaires: "Du lundi au samedi, de 9 h à 21 h",
  seance: { duree: "50 min", prix: "60 €" },
};

export const NAVIGATION = [
  { href: `${DOSSIER}/premiere-seance`, libelle: "La première séance" },
  { href: `${DOSSIER}#soutien`, libelle: "Mon soutien psy" },
  { href: `${DOSSIER}#tarifs`, libelle: "Tarifs" },
  { href: `${DOSSIER}/rendez-vous`, libelle: "Rendez-vous" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const P = "/exemples/sans-motif";
export const photos = {
  chaise: { src: `${P}/chaise-soleil.webp`, largeur: 1400, hauteur: 635, alt: "Une chaise blanche dans une pièce vide, baignée de soleil" },
  fauteuil: { src: `${P}/fauteuil.webp`, largeur: 1200, hauteur: 901, alt: "Un fauteuil blanc et un coussin près d'une fenêtre voilée" },
  nuit: { src: `${P}/chambre-nuit.webp`, largeur: 1400, hauteur: 933, alt: "Une chambre dans la nuit, une lampe de chevet allumée près du lit" },
} satisfies Record<string, Photo>;

/* ---------- Le rendez-vous en trois clics ---------- */
export const typesSeance = [
  { id: "premiere", libelle: "Première séance", detail: "50 min · on fait connaissance" },
  { id: "suivi", libelle: "Séance de suivi", detail: "50 min" },
];

export type Jour = { id: string; court: string; long: string; heures: { h: string; pris?: boolean }[] };
export const jours: Jour[] = [
  { id: "lundi", court: "Lun.", long: "lundi", heures: [{ h: "9 h", pris: true }, { h: "12 h 30" }, { h: "18 h" }, { h: "20 h", pris: true }] },
  { id: "mardi", court: "Mar.", long: "mardi", heures: [{ h: "10 h" }, { h: "14 h", pris: true }, { h: "19 h" }, { h: "20 h" }] },
  { id: "jeudi", court: "Jeu.", long: "jeudi", heures: [{ h: "9 h" }, { h: "12 h 30", pris: true }, { h: "18 h" }, { h: "20 h 30" }] },
  { id: "vendredi", court: "Ven.", long: "vendredi", heures: [{ h: "11 h" }, { h: "17 h", pris: true }, { h: "19 h" }] },
  { id: "samedi", court: "Sam.", long: "samedi", heures: [{ h: "9 h" }, { h: "10 h", pris: true }, { h: "11 h" }] },
];

/* ---------- Mon soutien psy, en trois lignes ----------
   Aucun chiffre (nombre de séances, tarif, taux) : ils changent. La source est
   ameli.fr ; la psychologue de ce site est « partenaire » pour l'exemple. */
export const soutienPsy = [
  "Mon soutien psy est un dispositif de l'Assurance Maladie : des séances avec un psychologue partenaire sont remboursées.",
  "Je suis psychologue partenaire (exemple) : je vous dis au premier rendez-vous si le dispositif s'applique à vous, et comment.",
  "Le nombre de séances, le tarif et les démarches sont expliqués sur ameli.fr. Je ne vous demande rien en ligne.",
];

/* ---------- La première séance ---------- */
export const premiereSeance = [
  { titre: "Vous n'avez rien à préparer", texte: "Pas de liste, pas de résumé. On commence là où vous voulez commencer." },
  { titre: "Je vous explique comment je travaille", texte: "Mon approche, le rythme des séances, le tarif, la confidentialité et ses limites. Avant que vous ne disiez quoi que ce soit." },
  { titre: "Vous parlez de ce que vous voulez", texte: "Ce qui vous amène, vous le dites si vous le souhaitez, comme vous le souhaitez. Il n'y a pas de bonne façon de commencer." },
  { titre: "On décide ensemble de la suite", texte: "Une autre séance, un autre rythme, ou un autre professionnel si c'est plus adapté. Vous repartez sans engagement." },
];

/* ---------- Questions ---------- */
export const questions = [
  {
    q: "Pourquoi le site ne me demande-t-il pas ce qui m'amène ?",
    r: "Parce que c'est une donnée de santé, et que le site n'en a pas besoin pour vous donner un rendez-vous. Vous le direz en séance, à moi, si vous le voulez.",
  },
  {
    q: "Psychologue ou psychiatre ?",
    r: "Le psychiatre est médecin : il peut prescrire des médicaments. Le psychologue n'est pas médecin et ne prescrit pas. Psychologue est un titre protégé par la loi (loi n° 85-772 du 25 juillet 1985, art. 44).",
  },
  {
    q: "Est-ce que vous prenez la carte bancaire ?",
    r: "Oui. Carte bancaire, espèces ou virement.",
  },
  {
    q: "Et si c'est urgent ?",
    r: "Ne prenez pas rendez-vous : appelez le 15. Pour une pensée suicidaire, la vôtre ou celle d'un proche : le 3114, numéro national de prévention du suicide.",
  },
  {
    q: "Puis-je annuler ?",
    r: "Oui, en appelant le cabinet au moins 24 heures avant. Le créneau revient dans l'agenda.",
  },
];
