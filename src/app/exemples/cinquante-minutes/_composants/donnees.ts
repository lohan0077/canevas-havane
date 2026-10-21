// Le cabinet de psychologue imaginaire « Cinquante Minutes ». La psychologue,
// l'adresse, les prix, les créneaux et la date de la porte ouverte sont des exemples ;
// le téléphone est dans la tranche que l'ARCEP réserve à la fiction. Le site décrit un
// déroulé, jamais un résultat, et ne demande jamais ce qui amène quelqu'un.

export const DOSSIER = "/exemples/cinquante-minutes";

export const cabinet = {
  nom: "Cinquante Minutes",
  psychologue: "Hélène M.",
  titre: "Psychologue",
  diplome: "Master de psychologie clinique et psychopathologie — exemple",
  adeli: "00 000 000 0",
  adresse: "12 rue de l'Exemple, rez-de-chaussée sur cour",
  ville: "Saint-Exemple",
  telephone: "01 99 00 50 50",
  horaires: "Du lundi au vendredi, de 9 h à 20 h",
  seance: { duree: "50 min", prix: "65 €" },
};

export const NAVIGATION = [
  { href: `${DOSSIER}/premiere-seance`, libelle: "La première séance" },
  { href: `${DOSSIER}/porte-ouverte`, libelle: "Porte ouverte" },
  { href: `${DOSSIER}#rendez-vous`, libelle: "Rendez-vous" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const P = "/exemples/cinquante-minutes";
export const photos = {
  porte: { src: `${P}/porte-lumiere.webp`, largeur: 1000, hauteur: 1500, alt: "Une porte dans la pénombre, traversée par la lumière d'un store" },
  entrouverte: { src: `${P}/porte-entrouverte.webp`, largeur: 1200, hauteur: 796, alt: "Une porte entrouverte, une clé dans la serrure, la lumière du soir qui passe" },
  sablier: { src: `${P}/sablier.webp`, largeur: 1000, hauteur: 1503, alt: "Un sablier de sable doré sur fond blanc" },
} satisfies Record<string, Photo>;

/* ---------- L'horloge de la première séance ----------
   Un déroulé, pas un résultat : ce qui se passe, minute après minute. */
export const etapes = [
  { minute: 0, texte: "Vous arrivez. On s'assoit.", detail: "Pas de questionnaire en salle d'attente, pas de formulaire. Vous prenez le fauteuil que vous voulez." },
  { minute: 5, texte: "Je vous dis comment je travaille.", detail: "Le rythme, le tarif, ce qui reste entre nous et ses limites. Avant que vous ne disiez quoi que ce soit." },
  { minute: 10, texte: "Rien ne vous oblige à tout dire.", detail: "Vous pouvez commencer par un détail, par le milieu, ou par le silence. On ne vous demande pas de tout raconter." },
  { minute: 25, texte: "Vous parlez de ce que vous voulez.", detail: "À votre rythme. Je pose des questions ; vous répondez à celles que vous voulez." },
  { minute: 45, texte: "La suite, c'est vous qui décidez.", detail: "Une autre séance, plus tard, ou pas. Si un autre professionnel vous conviendrait mieux, je vous le dis." },
  { minute: 50, texte: "Vous repartez.", detail: "Sans rien avoir à prouver. Et sans engagement." },
];

/* ---------- La porte ouverte ----------
   Une vraie date (jeudi 14 janvier 2027), hors des heures de séance, sans patient. */
export const porteOuverte = {
  date: "Jeudi 14 janvier 2027",
  heures: "18 h – 20 h",
  regles: [
    "Sans inscription : venez, ou ne venez pas.",
    "Personne ne vous demandera votre nom, ni pourquoi vous êtes là.",
    "Le cabinet est fermé aux séances ce soir-là : aucun patient présent.",
    "Vous visitez, vous posez des questions si vous voulez, vous repartez.",
  ],
};

/* ---------- Rendez-vous : créneaux d'exemple ---------- */
export const creneaux = [
  { libelle: "9 h 10", sous: "Lundi", pris: true },
  { libelle: "17 h 30", sous: "Lundi" },
  { libelle: "11 h 00", sous: "Mardi" },
  { libelle: "19 h 00", sous: "Mardi", pris: true },
  { libelle: "14 h 20", sous: "Mercredi" },
  { libelle: "10 h 00", sous: "Jeudi", pris: true },
  { libelle: "18 h 10", sous: "Jeudi" },
  { libelle: "9 h 10", sous: "Vendredi" },
  { libelle: "16 h 40", sous: "Vendredi" },
];

export const questions = [
  { q: "Pourquoi « Cinquante Minutes » ?", r: "Parce que c'est la durée d'une séance ici, et qu'elle vous appartient. La durée varie selon les psychologues ; ici, elle est de cinquante minutes." },
  { q: "Que dois-je dire à la première séance ?", r: "Ce que vous voulez. Rien ne vous oblige à tout dire, ni même à savoir par où commencer." },
  { q: "Combien coûte une séance ?", r: "65 € la séance de cinquante minutes (prix d'exemple). Carte bancaire, espèces ou chèque ; une facture vous est remise." },
  { q: "Psychologue, est-ce un titre protégé ?", r: "Oui. L'usage professionnel du titre de psychologue est réservé aux titulaires d'un diplôme fixé par la loi (loi n° 85-772 du 25 juillet 1985, art. 44)." },
  { q: "Et si c'est urgent ?", r: "Ne prenez pas rendez-vous : appelez le 15. Pour une pensée suicidaire, la vôtre ou celle d'un proche : le 3114, numéro national de prévention du suicide." },
];
