// Tout ce qu'affiche le site de Voix Basse, cabinet vétérinaire fictif imaginé dans la
// vidéo « Si je devais créer une clinique vétérinaire ». Le site dit « cabinet » :
// l'appellation « clinique vétérinaire » est réservée aux établissements qui en
// remplissent les conditions (Code rural, R242-54).
//
// Règles tenues ici :
//   - ni avis, ni note, ni comparaison avec un autre cabinet (R242-35) : « Ici, on parle
//     bas » décrit ce cabinet, sans dire qu'ailleurs on parle fort ;
//   - aucune promesse sur l'animal : le calme est une façon de recevoir, pas un résultat ;
//   - prix TTC, d'exemple, datés, avec ce qu'ils comprennent (R242-35 ; arrêté du
//     3 décembre 1987, art. 1) ;
//   - téléphone dans la tranche que l'ARCEP réserve à la fiction, aucune adresse e-mail,
//     adresse inventée, équipe par ses initiales.
import type { CSSProperties } from "react";

export const DOSSIER = "/exemples/voix-basse";

export const cabinet = {
  nom: "Voix Basse",
  signature: "Ici, on parle bas.",
  adresse: ["12 rue de l'Exemple", "00000 Ville-Exemple"],
  telephone: "01 99 00 52 40",
  horaires: [
    { jours: "Lundi – vendredi", heures: "8 h 30 – 19 h" },
    { jours: "Créneaux calmes", heures: "8 h et 8 h 15, avant l'ouverture" },
    { jours: "Samedi", heures: "9 h – 12 h 30" },
  ],
};

export const NAVIGATION = [
  { href: `${DOSSIER}/rendez-vous`, libelle: "Rendez-vous" },
  { href: `${DOSSIER}/pour-rien`, libelle: "Viens pour rien" },
  { href: `${DOSSIER}#ici`, libelle: "Ce qui change ici" },
  { href: `${DOSSIER}#tarifs`, libelle: "Tarifs" },
  { href: `${DOSSIER}#venir`, libelle: "Venir" },
];

/** Les bandes sombres : mêmes variables que le Cadre, autres valeurs (chaque couple tient 4,5:1). */
export const SOMBRE = {
  "--fond": "#2F4A3E",
  "--encre": "#FBF7EF",
  "--doux": "#D9E3DB",
  "--accent": "#C9B6E4",
  "--sur-accent": "#2F4A3E",
  "--accent-texte": "#D6C8EE",
  "--carte": "#284035",
  "--trait": "#4A6457",
} as CSSProperties;

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const photo = (fichier: string, largeur: number, hauteur: number, alt: string): Photo => ({
  src: `/exemples/voix-basse/${fichier}.webp`, largeur, hauteur, alt,
});

export const photos = {
  soleil: photo("chat-soleil", 1000, 1333, "Un chat tigré dort au soleil sur la moquette, à côté de sa caisse de transport fermée"),
  caisse: photo("chat-caisse", 1200, 803, "Un chat roux couché, tranquille, dans sa caisse de transport ouverte"),
  chien: photo("chien-calme", 1200, 1800, "Un chiot golden retriever allongé sur un parquet, le museau sur les pattes"),
  friandise: photo("friandise", 1200, 675, "Un chat roux renifle une friandise posée sur le bout d'un doigt"),
};

/* ---------- La question, et les créneaux qu'elle ouvre ---------- */

export type Niveau = "pas-du-tout" | "un-peu" | "beaucoup";

export const NIVEAUX: { id: Niveau; libelle: string }[] = [
  { id: "pas-du-tout", libelle: "Pas du tout" },
  { id: "un-peu", libelle: "Un peu" },
  { id: "beaucoup", libelle: "Beaucoup" },
];

/** Les créneaux calmes : avant l'ouverture, la salle d'attente est réservée à un seul rendez-vous. */
export const CRENEAUX_CALMES = [
  { libelle: "Lundi", sous: "8 h 00", pris: true },
  { libelle: "Mardi", sous: "8 h 00" },
  { libelle: "Mardi", sous: "8 h 15" },
  { libelle: "Jeudi", sous: "8 h 00", pris: true },
  { libelle: "Jeudi", sous: "8 h 15" },
  { libelle: "Vendredi", sous: "8 h 00" },
];

export const CRENEAUX_HABITUELS = [
  { libelle: "Lundi", sous: "10 h 30" },
  { libelle: "Lundi", sous: "17 h 45", pris: true },
  { libelle: "Mardi", sous: "14 h 00" },
  { libelle: "Mercredi", sous: "9 h 15" },
  { libelle: "Jeudi", sous: "18 h 15", pris: true },
  { libelle: "Samedi", sous: "11 h 00" },
];

/* ---------- Ce qui change ici ---------- */

export const ICI = [
  { titre: "On parle bas", texte: "À l'accueil, en salle, en consultation. Le téléphone sonne doucement, la porte ne claque pas." },
  { titre: "Les chats attendent à part", texte: "Une petite salle sans chien, avec une étagère pour poser la caisse en hauteur." },
  { titre: "Le créneau calme", texte: "Avant l'ouverture, à 8 h ou 8 h 15 : la salle d'attente est à toi, et à personne d'autre." },
  { titre: "Trente minutes", texte: "Chaque consultation dure une demi-heure. On a le temps de laisser ton animal sortir seul de sa caisse." },
  { titre: "Tu restes avec lui", texte: "Pour l'examen, pour le vaccin. Sauf pour une intervention, évidemment." },
  { titre: "La table couverte", texte: "Une couverture sur la table d'examen, pas l'inox froid sous les pattes." },
];

export const CAISSE = [
  { titre: "Laisse-la ouverte", texte: "Dans le salon, toute la semaine. Une caisse qui ne sort que pour le vétérinaire, ton chat la reconnaît." },
  { titre: "Une couverture de la maison", texte: "Elle sent chez lui. Il la retrouvera chez nous, dans la salle des chats." },
  { titre: "Viens pour rien, d'abord", texte: "Une visite sans soin, pour que le cabinet devienne un endroit comme un autre." },
];

/* ---------- Les tarifs (exemples, datés) ---------- */

export const DATE_DES_TARIFS = "1er octobre 2026";
export const TARIFS = [
  { acte: "Visite pour rien", detail: "Il renifle, il a une friandise, il repart. Aucun soin.", prix: "Sans frais" },
  { acte: "Consultation", detail: "Trente minutes, examen complet, compte rendu dans le carnet", prix: "48 €" },
  { acte: "Consultation au créneau calme", detail: "La même, avant l'ouverture, la salle d'attente pour toi seul", prix: "48 €" },
  { acte: "Vaccin et rappel annuel", detail: "Examen avant l'injection, mise à jour du carnet", prix: "58 €" },
  { acte: "Stérilisation · chatte", detail: "Consultation avant, anesthésie, intervention, contrôle après", prix: "185 €" },
];

export const EQUIPE = [
  { initiales: "A. V.", role: "Docteure vétérinaire", phrase: "Les chats, surtout ceux qui se cachent." },
  { initiales: "T. M.", role: "Docteur vétérinaire", phrase: "Les chiens, et les chirurgies courantes." },
  { initiales: "S. L.", role: "Auxiliaire spécialisée vétérinaire", phrase: "L'accueil, à voix basse." },
];

export const QUESTIONS = [
  {
    q: "Le créneau calme coûte-t-il plus cher ?",
    r: "Non. C'est la même consultation, au même prix, simplement avant l'ouverture : la salle d'attente n'est qu'à toi.",
  },
  {
    q: "Et si une urgence arrive pendant mon créneau calme ?",
    r: "Avant l'ouverture, le cabinet ne reçoit que sur rendez-vous : la salle reste à toi. Une urgence vitale passerait d'abord, bien sûr, et on te le dirait.",
  },
  {
    q: "La visite pour rien, c'est vraiment pour rien ?",
    r: "Oui : ton animal entre, renifle, reçoit une friandise et repart. Aucun examen, aucun soin, aucune facture. Juste pour que la prochaine fois, la caisse redevienne une caisse.",
  },
  {
    q: "Le calme, ça marche pour tous les animaux ?",
    r: "On ne promet rien sur ton animal : chacun réagit à sa façon. On promet seulement la façon dont on le reçoit.",
  },
  {
    q: "Pourquoi n'y a-t-il pas d'avis sur ce site ?",
    r: "Notre code de déontologie nous interdit d'utiliser le témoignage de tiers. On préfère te montrer comment on travaille.",
  },
];
