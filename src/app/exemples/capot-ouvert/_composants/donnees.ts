// Les données de Capot Ouvert, le garage imaginé pour la vidéo « Si je devais créer un
// garage ». Tout est inventé et marqué « exemple » : prix TTC, réparation, dates.
// Aucune marque automobile : la voiture de la page de réparation est « une citadine ».

export const DOSSIER = "/exemples/capot-ouvert";

export const garage = {
  nom: "Capot Ouvert",
  adresse: "12 rue de l'Exemple, Ta Ville",
  telephone: "01 99 00 62 35",
  horaires: [
    { jours: "Lundi – vendredi", heures: "8 h – 18 h 30" },
    { jours: "Samedi", heures: "9 h – 12 h" },
  ],
};

export const NAVIGATION = [
  { href: `${DOSSIER}/reparation`, libelle: "Une réparation" },
  { href: `${DOSSIER}/samedi`, libelle: "Le samedi" },
  { href: `${DOSSIER}/tarifs`, libelle: "Tarifs" },
];

export const photos = {
  capot: { src: "/exemples/capot-ouvert/capot-jaune.webp", alt: "Un mécanicien penché sous le capot ouvert d'une voiture jaune, un tournevis à la main", largeur: 1400, hauteur: 2100 },
  avant: { src: "/exemples/capot-ouvert/disque-avant.webp", alt: "Avant : un disque de frein rayé et rouillé, monté sur le moyeu, la voiture sur le pont", largeur: 1000, hauteur: 1334 },
  apres: { src: "/exemples/capot-ouvert/disque-apres.webp", alt: "Après : un disque de frein neuf et brillant, l'étrier remonté", largeur: 1000, hauteur: 666 },
  jauge: { src: "/exemples/capot-ouvert/jauge.webp", alt: "Une main tient la jauge d'huile qu'elle vient de sortir du moteur", largeur: 1000, hauteur: 1500 },
  cles: { src: "/exemples/capot-ouvert/mur-de-cles.webp", alt: "Un mur d'atelier où les clés plates sont rangées par taille", largeur: 1000, hauteur: 666 },
};

/** La réparation d'exemple, celle de la page privée. */
export const reparation = {
  numero: "R-0000",
  voiture: "Citadine",
  objet: "Freins avant",
  date: "14 mars",
  kilometrage: "87 400 km",
  piece: "Disques et plaquettes avant",
  raison: "Disque avant gauche usé sous l'épaisseur minimale gravée sur la pièce.",
  etiquette: { piece: "Disque avant gauche", raison: "Usé sous l'épaisseur minimale", quand: "Changé le 14 mars · 87 400 km" },
  lignes: [
    { libelle: "Disques de frein avant, la paire", prix: 118 },
    { libelle: "Plaquettes de frein avant, le jeu", prix: 54 },
    { libelle: "Main-d'œuvre, 1 h 30", prix: 105 },
  ],
};

export const tarifs = [
  { nom: "Vidange + filtre à huile", detail: "citadine, huile comprise", prix: 89 },
  { nom: "Disques et plaquettes avant", detail: "pièces et main-d'œuvre", prix: 277 },
  { nom: "Plaquettes avant seules", detail: "pièces et main-d'œuvre", prix: 129 },
  { nom: "Révision constructeur", detail: "selon le carnet, citadine", prix: 239 },
  { nom: "Diagnostic électronique", detail: "lecture des défauts, compte rendu écrit", prix: 49 },
  { nom: "Courroie de distribution", detail: "kit et pompe à eau, citadine", prix: 549 },
];

export const euros = (n: number) => `${n.toLocaleString("fr-FR").replace(/[\s ]/g, " ")} € TTC`;

/** Un samedi matin par mois. Les dates sont de vrais samedis. */
export const SAMEDIS = [
  { date: "Samedi 7 novembre 2026", court: "7 nov." },
  { date: "Samedi 5 décembre 2026", court: "5 déc." },
  { date: "Samedi 9 janvier 2027", court: "9 janv." },
  { date: "Samedi 6 février 2027", court: "6 févr." },
];

export const PROGRAMME = [
  { titre: "Les niveaux", texte: "Huile, liquide de refroidissement, lave-glace, liquide de frein : où ils sont, comment les lire." },
  { titre: "Les pneus", texte: "La pression à froid, l'usure, le petit témoin dans les rainures." },
  { titre: "La roue de secours", texte: "Où est le cric, comment le poser, dans quel ordre desserrer." },
];

export const questions = [
  { q: "La page de ma réparation est publique ?", r: "Non. Elle est privée : seul toi as le lien. Les photos montrent la pièce, jamais la plaque, et rien n'est publié sans ton accord." },
  { q: "Vous me rendez toujours la vieille pièce ?", r: "Quand c'est possible. Un disque, une plaquette, une courroie : oui, dans un sac étiqueté. L'huile, les filtres et les batteries usagés partent au recyclage : ceux-là, on ne les rend pas." },
  { q: "Et si vous trouvez autre chose pendant la réparation ?", r: "On t'envoie une photo et un devis. On attend ta réponse avant de toucher à quoi que ce soit." },
  { q: "Le samedi, je peux venir sans voiture ?", r: "Oui. L'atelier est gratuit et ouvert à tous ; on travaille sur la voiture de l'atelier. Personne ne passe sous un véhicule levé." },
  { q: "Vos prix sont définitifs ?", r: "Ce sont des prix TTC d'exemple, pièces et main-d'œuvre comprises, pour une citadine. Le prix de ta voiture est écrit sur le devis, avant de commencer." },
];
