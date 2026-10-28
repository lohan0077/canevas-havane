// Les données du site Premier Trajet, auto-école imaginée pour la vidéo « Si je
// devais remplir l'agenda d'une auto-école ». Tout est inventé et marqué « exemple » :
// le nom, l'adresse, l'agrément, les prix, les créneaux, les moniteurs.
//
// La publicité d'une auto-école porte le nom, l'adresse et le numéro d'agrément, et
// pour un forfait : la répartition code / conduite, les frais inclus, les heures en
// plus du minimum, les frais restant à charge, en TTC (arrêté du 19 juin 1987, art. 3).

export const DOSSIER = "/exemples/premier-trajet";

export const ecole = {
  nom: "Premier Trajet",
  adresse: "12 rue de l'Exemple, Ta Ville",
  agrement: "E 00 000 0000 0",
  telephone: "01 99 00 31 42",
  horaires: [
    { jours: "Mardi – vendredi", heures: "14 h – 19 h" },
    { jours: "Samedi", heures: "9 h – 13 h" },
  ],
};

export const NAVIGATION = [
  { href: `${DOSSIER}/evaluation`, libelle: "L'évaluation" },
  { href: `${DOSSIER}/tarifs`, libelle: "Tarifs" },
  { href: `${DOSSIER}/lecons`, libelle: "Leçons" },
];

export type Photo = { src: string; alt: string; largeur: number; hauteur: number };

export const photos = {
  retroviseur: { src: `/exemples/premier-trajet/route-retroviseur.webp`, alt: "Une route bordée d'arbres vue depuis le siège conducteur, le rétroviseur intérieur au premier plan", largeur: 1600, hauteur: 1200 },
  campagne: { src: `/exemples/premier-trajet/route-campagne.webp`, alt: "Une route de campagne qui file droit entre les champs, vue depuis le tableau de bord", largeur: 1000, hauteur: 1500 },
  volant: { src: `/exemples/premier-trajet/main-volant.webp`, alt: "Une main posée sur le haut d'un volant", largeur: 1200, hauteur: 800 },
} satisfies Record<string, Photo>;

/** Le forfait, ligne par ligne, dans l'ordre de l'arrêté du 19 juin 1987, art. 3. */
export const forfait = {
  nom: "Forfait permis B",
  sous: "Boîte manuelle",
  heures: [
    { libelle: "Heures de code", detail: "en salle et en ligne", valeur: "10 h" },
    { libelle: "Conduite, au volant", detail: "heures effectives de conduite", valeur: "20 h" },
    { libelle: "Heures en plus du minimum", detail: "au-delà des obligations réglementaires", valeur: "aucune" },
  ],
  inclus: [
    "Inscription et constitution du dossier",
    "Livre de code et accès au code en ligne, 6 mois",
    "1er examen pratique, accompagné par ton moniteur",
  ],
  aCharge: ["Examen du code", "Les leçons en plus du forfait, si tu en as besoin (tarif à l'unité ci-dessous)"],
  total: "1 290 € TTC",
};

/** Les prestations à l'unité : dénomination, durée, prix TTC. */
export const aLUnite = [
  { nom: "Évaluation de départ", duree: "1 h, au volant", prix: "45 € TTC" },
  { nom: "Leçon de conduite", duree: "1 h, au volant", prix: "55 € TTC" },
  { nom: "Leçon de conduite", duree: "2 h, au volant", prix: "108 € TTC" },
  { nom: "Accès au code en ligne", duree: "3 mois", prix: "29 € TTC" },
  { nom: "Accompagnement à un nouvel examen pratique", duree: "le temps de l'épreuve", prix: "55 € TTC" },
];

/** Ce qui ne se facture jamais (C. route, art. L213-2, al. 2 à 4). */
export const jamaisFacture = [
  "La présentation à l'examen du permis",
  "La restitution de ton dossier, si tu le demandes",
  "Le transfert de ton dossier vers une autre école",
];

export const etapes = [
  { titre: "L'évaluation", texte: "Une heure au volant, avec un moniteur, sur un parking puis en ville. On regarde comment tu t'y prends, sans note.", duree: "1 h" },
  { titre: "Tes heures, écrites", texte: "À la fin, le moniteur estime le nombre d'heures qu'il te faudra. Ce nombre est inscrit au contrat.", duree: "le jour même" },
  { titre: "Le contrat", texte: "Signé à l'école ou à distance, après l'évaluation. Le prix y est ligne par ligne, comme sur cette page.", duree: "quand tu veux" },
  { titre: "Code et leçons", texte: "Le code en salle ou en ligne. Les leçons, tu les réserves sur le site, sans appeler.", duree: "à ton rythme" },
  { titre: "Le premier trajet", texte: "L'examen, accompagné par ton moniteur. Et un jour, le siège passager est vide.", duree: "le grand jour" },
];

export const moniteurs = [
  { prenom: "Nadia", initiale: "N", role: "Enseignante de la conduite", phrase: "Fait les évaluations du samedi matin. Commence toujours par le parking." },
  { prenom: "Hugo", initiale: "H", role: "Enseignant de la conduite", phrase: "Les leçons du soir, la conduite de nuit, et les ronds-points à deux voies." },
  { prenom: "Samir", initiale: "S", role: "Code et accueil", phrase: "Anime le code en salle le mercredi et le samedi. Répond au téléphone l'après-midi." },
];

export const questions = [
  {
    q: "Combien d'heures il me faudra ?",
    r: "Personne ne peut le dire avant de t'avoir vu conduire. C'est le rôle de l'évaluation de départ : à la fin, le moniteur estime ton nombre d'heures, et ce nombre est inscrit au contrat.",
  },
  {
    q: "Pourquoi commencer par une évaluation ?",
    r: "Parce que la loi l'impose : le contrat d'enseignement de la conduite se conclut après une évaluation préalable du candidat (Code de la route, art. L213-2). Autant qu'elle serve à quelque chose : te dire combien d'heures prévoir.",
  },
  {
    q: "Qu'est-ce qui n'est pas dans le forfait ?",
    r: "Tout est écrit sur la page des tarifs, ligne par ligne : ce qui est inclus, et ce qui reste à ta charge, comme l'examen du code. Aucune ligne cachée.",
  },
  {
    q: "Est-ce que je peux changer d'auto-école en cours de route ?",
    r: "Oui. Le transfert de ton dossier vers une autre école ne te coûte rien, et sa restitution non plus : la loi interdit de les facturer.",
  },
  {
    q: "Quel est votre taux de réussite ?",
    r: "L'État publie le taux de réussite au premier passage de chaque auto-école, sur la carte des auto-écoles de la Sécurité routière. Premier Trajet est une école fictive : elle n'en a pas, et ce site n'en invente pas.",
  },
  {
    q: "Comment je réserve mes leçons ?",
    r: "Sur la page Leçons : les créneaux libres de la semaine, tu touches celui qui te va, c'est réservé. Pas besoin d'appeler.",
  },
];

/** Le planning des leçons : six jours, trois heures. Les créneaux pris sont un exemple. */
export const JOURS = [
  { court: "Lun", long: "Lundi" },
  { court: "Mar", long: "Mardi" },
  { court: "Mer", long: "Mercredi" },
  { court: "Jeu", long: "Jeudi" },
  { court: "Ven", long: "Vendredi" },
  { court: "Sam", long: "Samedi" },
];
export const HEURES = ["8 h", "13 h", "17 h"];
export const SEMAINES = [
  {
    nom: "Cette semaine",
    pris: ["Lun-8 h", "Mar-13 h", "Mar-17 h", "Mer-8 h", "Ven-17 h", "Sam-8 h", "Jeu-8 h"],
  },
  {
    nom: "Semaine prochaine",
    pris: ["Lun-13 h", "Mer-17 h", "Jeu-13 h", "Sam-8 h", "Sam-13 h"],
  },
];
export const MONITEUR_DU_CRENEAU: Record<string, string> = { "8 h": "Nadia", "13 h": "Nadia", "17 h": "Hugo" };

/** Les évaluations de départ : samedi matin, et deux soirs de semaine. */
export const evaluations = [
  { libelle: "Sam. 9 h", sous: "avec Nadia", pris: true },
  { libelle: "Sam. 10 h", sous: "avec Nadia" },
  { libelle: "Sam. 11 h", sous: "avec Nadia" },
  { libelle: "Mar. 18 h", sous: "avec Hugo" },
  { libelle: "Mer. 17 h", sous: "avec Hugo", pris: true },
  { libelle: "Jeu. 18 h", sous: "avec Hugo" },
];
