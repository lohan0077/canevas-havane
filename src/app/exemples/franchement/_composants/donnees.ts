// Tout ce qu'affiche le site de Franchement, cabinet de coaching imaginaire. Entreprise
// fictive : chaque prix, chaque date est un exemple, et le site le dit.
//
// La règle du métier qui gouverne ce site : aucune promesse de résultat (C. consom.,
// art. L121-2, 2° b). On montre ce qui se passe pendant la séance — le format, la durée,
// le prix — jamais ce que le client « obtiendra ». Aucun témoignage (art. L121-4, 27°
// et 28°). Et le coach ne se présente jamais comme psychologue ni comme médecin.
//
// Téléphone dans la tranche ARCEP réservée à la fiction ; aucune adresse e-mail ;
// aucune photo de personne (des fauteuils, une porte, un carnet).

export const DOSSIER = "/exemples/franchement";

export const entreprise = {
  nom: "Franchement",
  coach: "Camille R.",
  telephone: "06 39 98 12 34",
  telephoneLien: "+33639981234",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#seance`, libelle: "La séance" },
  { href: `${DOSSIER}/coach-ou-psy`, libelle: "Coach ou psy ?" },
  { href: `${DOSSIER}/premier-appel`, libelle: "Premier appel" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };

export const photos = {
  fauteuils: { src: `${DOSSIER}/fauteuils-face.webp`, largeur: 1400, hauteur: 934, alt: "Deux fauteuils en cuir face à face autour d'une petite table ronde, vus d'en haut" },
  porte: { src: `${DOSSIER}/porte-entrouverte.webp`, largeur: 1100, hauteur: 729, alt: "Une porte verte entrouverte, la lumière qui passe par l'embrasure" },
  carnet: { src: `${DOSSIER}/carnet.webp`, largeur: 1300, hauteur: 867, alt: "Un carnet blanc et un stylo sur une table en bois, à côté d'une tasse" },
} satisfies Record<string, Photo>;

export const TARIFS = {
  appel: { nom: "Premier appel", duree: "20 min", prix: "Sans frais", detail: "On regarde ta question. Si ce n'est pas pour moi, je te le dis." },
  seance: { nom: "Séance", duree: "1 heure", prix: "90 €", detail: "En cabinet ou en visio. Une à la fois : rien à acheter d'avance." },
};

/** La première séance, minute par minute : un format, jamais un résultat. */
export const DEROULE = [
  { minute: 0, titre: "Tu poses ta question", texte: "Telle qu'elle vient, même mal formulée. Je l'écris mot pour mot, et je te la relis.", toi: "Tu parles.", moi: "J'écris, je ne commente pas." },
  { minute: 20, titre: "On la retourne", texte: "Dans tous les sens. Qui d'autre est concerné, ce qui se passe si tu ne fais rien, ce que tu dirais à un ami.", toi: "Tu réponds, ou pas.", moi: "Je pose des questions, pas des conseils." },
  { minute: 50, titre: "Tu choisis quoi essayer", texte: "Une chose, petite, à faire avant la prochaine fois. C'est toi qui la choisis, pas moi.", toi: "Tu décides.", moi: "Je note, sans juger." },
  { minute: 60, titre: "On s'arrête", texte: "À l'heure. Tu repars avec ta question écrite et ce que tu as choisi d'essayer. Pas avec un forfait.", toi: "Tu repars.", moi: "Je ne relance pas." },
];

export const PROMESSES_BARREES = ["Ta nouvelle vie en 30 jours", "Révèle ton potentiel", "Deviens la meilleure version de toi", "Ma méthode a changé des milliers de vies"];

export const JE_FAIS = ["Poser des questions", "Reformuler ce que tu dis", "Te proposer d'essayer une chose, petite", "Te dire quand ce n'est pas pour moi"];
export const JE_NE_FAIS_PAS = ["Diagnostiquer ou soigner", "Décider à ta place", "Promettre un résultat", "Te vendre dix séances d'avance"];

/** Des questions reçues en commentaire public, jamais en séance. */
export const QUESTIONS_SEMAINE = [
  { numero: 12, recue: "Je quitte mon CDI ou pas ?", retour: "Qu'est-ce que tu garderais, si tu partais demain ?" },
  { numero: 11, recue: "Comment savoir si je suis fait pour être manager ?", retour: "Quelle est la dernière décision difficile que tu as prise pour quelqu'un d'autre ?" },
  { numero: 10, recue: "Je repousse tout au lendemain. Normal ?", retour: "Qu'est-ce que tu ne repousses jamais ?" },
];

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  { q: "Combien de séances faut-il ?", r: "Je ne sais pas, et personne ne le sait à l'avance. On en fait une ; à la fin, tu décides s'il y en a une autre. Rien n'est vendu en paquet." },
  { q: "Tu es psychologue ?", r: "Non. Je ne suis ni psychologue, ni médecin, et je ne soigne rien. Si ta question parle d'une souffrance qui dure, je t'oriente vers quelqu'un dont c'est le métier." },
  { q: "Et si ça ne m'aide pas ?", r: "Ça arrive. Tu arrêtes quand tu veux, sans préavis ni frais. Je préfère le dire avant que tu ne réserves." },
  { q: "Ce que je dis reste entre nous ?", r: "Oui. Rien de ce qui est dit en séance n'est publié, même anonyme. La « question de la semaine » vient de commentaires publics, jamais d'une séance." },
  { q: "C'est en visio ou en vrai ?", r: "Les deux. Le cabinet a deux fauteuils et une fenêtre ; la visio, une caméra et ta cuisine. La séance est la même." },
];

export type Creneau = { libelle: string; sous: string; pris?: boolean };

export const CRENEAUX: Creneau[] = [
  { libelle: "Lun. 19 oct.", sous: "12 h 30", pris: true },
  { libelle: "Mar. 20 oct.", sous: "18 h" },
  { libelle: "Mer. 21 oct.", sous: "8 h 30", pris: true },
  { libelle: "Jeu. 22 oct.", sous: "18 h" },
  { libelle: "Ven. 23 oct.", sous: "12 h 30" },
  { libelle: "Lun. 26 oct.", sous: "18 h" },
];

/** « Coach ou psy ? » : trois questions pour s'orienter. Aucun diagnostic. */
export const ORIENTATION = {
  questions: [
    { question: "Ce qui t'amène, c'est plutôt…", options: [{ libelle: "Une décision à prendre", points: 0 }, { libelle: "Un mal-être qui dure", points: 3 }, { libelle: "Je ne sais pas", points: 1 }] },
    { question: "Depuis combien de temps ça t'occupe ?", options: [{ libelle: "Quelques semaines", points: 0 }, { libelle: "Plusieurs mois", points: 1 }, { libelle: "Plus d'un an", points: 2 }] },
    { question: "Ça touche ton sommeil, ton appétit, ton envie de faire les choses ?", options: [{ libelle: "Non", points: 0 }, { libelle: "Un peu", points: 1 }, { libelle: "Beaucoup", points: 3 }] },
  ],
  resultats: [
    { min: 0, titre: "On peut en parler.", texte: "Une question à poser, une décision à prendre : c'est exactement ce qu'on regarde pendant le premier appel. S'il apparaît que ce n'est pas pour moi, je te le dirai." },
    { min: 3, titre: "Parles-en d'abord à ton médecin.", texte: "Ce que tu décris mérite l'avis de quelqu'un dont c'est le métier : ton médecin traitant, ou un psychologue. Ce n'est pas un refus : c'est la bonne porte. Le coaching pourra venir après, si tu en as encore envie." },
  ],
};
