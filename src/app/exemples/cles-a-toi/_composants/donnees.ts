// Les données de Clés à Toi, l'auto-école imaginée pour la vidéo « Si je devais
// créer une auto-école ». Tout est inventé et marqué « exemple ».
//
// Deux règles du métier tenues ici :
// - toute publicité d'auto-école porte nom, adresse, numéro d'agrément ; un forfait
//   affiché donne heures de code et de conduite, frais inclus, heures en plus du
//   minimum, frais à charge, en TTC (arrêté du 19 juin 1987, art. 3) ;
// - rien n'est offert en échange d'une inscription : le permis B peut être financé
//   par le CPF, et le Code du travail l'interdit alors (art. L6323-8-1). Le trousseau
//   n'existe que sur le site.

export const DOSSIER = "/exemples/cles-a-toi";

export const ecole = {
  nom: "Clés à Toi",
  adresse: "12 rue de l'Exemple, Ta Ville",
  agrement: "E 00 000 0000 0",
  telephone: "06 39 98 20 14",
  rayon: "8 km",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/trousseau`, libelle: "Le trousseau" },
  { href: `${DOSSIER}/formules`, libelle: "Formules" },
];

export const photos = {
  foret: { src: "/exemples/cles-a-toi/route-foret.webp", alt: "Une route qui traverse une forêt d'automne, vue depuis le siège conducteur", largeur: 1600, hauteur: 1200 },
  cle: { src: "/exemples/cles-a-toi/cle-tendue.webp", alt: "Une main tend une clé de voiture à une autre main ouverte, sur fond clair", largeur: 1100, hauteur: 1650 },
  sortie: { src: "/exemples/cles-a-toi/premiere-sortie.webp", alt: "Deux mains sur un volant, une forêt derrière la vitre", largeur: 900, hauteur: 602 },
  nuit: { src: "/exemples/cles-a-toi/nuit.webp", alt: "Des lumières de ville floues derrière un pare-brise, la nuit", largeur: 900, hauteur: 600 },
  autoroute: { src: "/exemples/cles-a-toi/autoroute.webp", alt: "Une autoroute éclairée par des lampadaires, à la tombée de la nuit, vue depuis l'habitacle", largeur: 900, hauteur: 1200 },
};

/** Les clés du trousseau. La dernière, le permis, ne s'allume que le jour où on l'a. */
export const CLES = [
  { id: "code", nom: "Le code", detail: "L'examen théorique, réussi.", date: "12 mars" },
  { id: "sortie", nom: "La première sortie", detail: "Hors du parking, dans la circulation.", date: "2 avril" },
  { id: "nuit", nom: "La nuit", detail: "Une leçon après le coucher du soleil.", date: "18 avril" },
  { id: "autoroute", nom: "L'autoroute", detail: "Insertion, dépassement, sortie.", date: "6 mai" },
] as const;

export const PERMIS = { id: "permis", nom: "Le permis", detail: "La dernière clé. Elle s'allume le jour où tu l'as." };

export const forfait = {
  nom: "Permis B · je passe te prendre",
  heures: [
    { libelle: "Heures de code", valeur: "10 h", detail: "en salle et en ligne" },
    { libelle: "Conduite, au volant", valeur: "20 h", detail: "heures effectives, départ de chez toi" },
    { libelle: "Heures en plus du minimum", valeur: "aucune", detail: "au-delà des obligations réglementaires" },
  ],
  inclus: [
    "Inscription et dossier",
    "Code en ligne, 6 mois",
    "Départ et retour de chez toi, du lycée ou du travail, dans un rayon de 8 km",
    "1er examen pratique, accompagné",
  ],
  aCharge: ["Examen du code", "Les heures en plus du forfait, au tarif à l'unité"],
  total: 1390,
};

export const aLUnite = [
  { nom: "Évaluation de départ", duree: "1 h, au volant", prix: 50 },
  { nom: "Leçon de conduite", duree: "1 h, au volant", prix: 58 },
  { nom: "Leçon de nuit", duree: "1 h 30, au volant", prix: 87 },
  { nom: "Accompagnement à un nouvel examen pratique", duree: "le temps de l'épreuve", prix: 58 },
];

/** Un prix TTC, insécable : « 1 390 € TTC » ne se coupe jamais en fin de ligne. */
export const euros = (n: number) => `${n.toLocaleString("fr-FR").replace(/[\s\u202f]/g, "\u00a0")}\u00a0€\u00a0TTC`;

export const engagements = [
  { titre: "Aucun cadeau à l'inscription", texte: "Pas de porte-clés, pas de bon d'achat. Quand le permis est financé par le CPF, la loi interdit toute offre en échange d'une inscription. Le trousseau, lui, est sur le site." },
  { titre: "Aucun taux de réussite inventé", texte: "Celui de chaque vraie auto-école est publié par l'État. Une école fictive n'en a pas : on n'en affiche pas." },
  { titre: "Le prix, en entier", texte: "Heures, frais inclus, frais à ta charge : tout est écrit sur la page des formules, en TTC." },
];

export const moniteurs = [
  { prenom: "Inès", initiale: "I", texte: "Passe te prendre le matin et à la sortie du lycée. Spécialiste des créneaux en pente." },
  { prenom: "Théo", initiale: "T", texte: "Les leçons du soir et de nuit, et la première fois sur l'autoroute." },
];

export const questions = [
  { q: "Vous passez vraiment me prendre ?", r: "Oui : la leçon commence devant chez toi, devant le lycée ou devant ton travail, dans un rayon de 8 km autour de l'école (exemple). C'est compris dans le forfait." },
  { q: "C'est quoi, le trousseau ?", r: "Ton espace sur le site. Une clé par étape : le code, la première sortie, la nuit, l'autoroute. Ton moniteur l'allume quand l'étape est faite. La dernière, c'est le permis." },
  { q: "On reçoit un vrai porte-clés ?", r: "Non. Rien n'est offert en échange d'une inscription : quand le permis est financé par le CPF, le Code du travail l'interdit. Les clés sont sur le site, et la vraie, c'est toi qui la tiens à la fin." },
  { q: "Combien d'heures il me faudra ?", r: "On le dit après l'évaluation de départ, une heure au volant. Le nombre prévisionnel d'heures est ensuite inscrit au contrat." },
  { q: "Et si je change d'auto-école ?", r: "Le transfert et la restitution de ton dossier sont gratuits : la loi interdit de les facturer (Code de la route, art. L213-2)." },
];
