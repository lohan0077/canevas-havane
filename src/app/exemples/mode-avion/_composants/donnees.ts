// Les données de Mode Avion, la salle de sport imaginée pour la vidéo « Si je devais
// créer une salle de sport ». Tout est inventé et marqué « exemple ». Aucune promesse
// de santé, de silhouette ni de résultat : la salle vend une heure sans téléphone.

export const DOSSIER = "/exemples/mode-avion";

export const salle = {
  nom: "Mode Avion",
  adresse: "12 rue de l'Exemple, Ta Ville",
  accueil: "01 99 00 88 26",
  horaires: [
    { jours: "Lundi – vendredi", heures: "6 h 30 – 22 h" },
    { jours: "Samedi, dimanche", heures: "8 h – 20 h" },
  ],
};

export const NAVIGATION = [
  { href: `${DOSSIER}/la-salle`, libelle: "La salle" },
  { href: `${DOSSIER}/seances`, libelle: "Séances" },
];

export const photos = {
  nuages: { src: "/exemples/mode-avion/hublot-nuages.webp", alt: "Une mer de nuages au crépuscule, vue par un hublot d'avion", largeur: 1600, hauteur: 2206 },
  hublot: { src: "/exemples/mode-avion/hublot.webp", alt: "Un hublot dans une cabine sombre, le ciel rose et bleu derrière", largeur: 1000, hauteur: 666 },
  barres: { src: "/exemples/mode-avion/barres.webp", alt: "Des barres et des haltères sur leur support, dans une salle sombre traversée par la lumière", largeur: 1000, hauteur: 1499 },
};

/** La répartition d'exemple d'une semaine d'écran, du lundi au dimanche (somme 28). */
export const REPARTITION = [3.5, 4, 3, 4.5, 3.5, 5, 4.5];
export const JOURS_COURTS = ["L", "M", "M", "J", "V", "S", "D"];

export const TARIFS = [
  { nom: "Première séance", detail: "Une fois, pour voir", prix: "0 € TTC" },
  { nom: "Séance à l'unité", detail: "Une heure, casier compris", prix: "12 € TTC" },
  { nom: "Carte de 10 séances", detail: "Valable 6 mois", prix: "99 € TTC" },
];

/** Les créneaux d'une heure de la journée, pour la page Séances. */
export const CRENEAUX = ["7 h", "8 h", "12 h 30", "18 h", "19 h", "20 h"];

export const questions = [
  { q: "Et si on doit me joindre en urgence ?", r: "Tes proches appellent l'accueil, au 01 99 00 88 26 (numéro de fiction). Quelqu'un vient te chercher sur le plateau. L'accueil répond pendant toutes les heures d'ouverture." },
  { q: "Je peux garder ma montre ?", r: "Une montre qui sonne ou vibre va au casier avec le téléphone. Une montre qui donne l'heure, oui." },
  { q: "Et la musique ?", r: "Celle de la salle. Pas d'écouteurs reliés au téléphone, puisque le téléphone est au casier." },
  { q: "Le casier est accessible à tout le monde ?", r: "Oui : une rangée de casiers est à hauteur de fauteuil, près de l'entrée, et l'accueil peut garder ton téléphone si tu préfères." },
  { q: "C'est écrit quelque part ?", r: "Dans le règlement intérieur, que tu lis et acceptes à l'inscription. La règle est simple : une heure, téléphone au casier." },
];
