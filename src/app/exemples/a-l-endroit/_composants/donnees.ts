// Les contenus du site À l'Endroit, boutique d'opticien imaginée dans la vidéo « Si
// je devais créer une boutique d'opticien ». Tout est inventé, les prix sont des
// exemples. Comme pour tout opticien : pas un mot sur la détermination de la
// réfraction (CSP D.4362-19) ni sur une prise en charge (CSP R.5213-1, 3°). La
// séance est un essayage de montures, devant un écran.

export const DOSSIER = "/exemples/a-l-endroit";

export const entreprise = {
  nom: "À l'Endroit",
  // Tranche que l'ARCEP réserve aux œuvres de fiction.
  telephone: "01 99 00 58 14",
  telephoneLien: "+33199005814",
  adresse: "12 rue de l'Exemple",
  ville: "Ville-d'Exemple",
  horaires: [
    { jours: "Mardi – samedi", heures: "10 h – 19 h" },
    { jours: "Jeudi", heures: "jusqu'à 20 h 30" },
    { jours: "Dimanche, lundi", heures: "Fermé" },
  ],
};

export const NAVIGATION = [
  { href: `${DOSSIER}#miroir`, libelle: "Le miroir" },
  { href: `${DOSSIER}/seance`, libelle: "La séance" },
  { href: `${DOSSIER}#montures`, libelle: "Les montures" },
  { href: `${DOSSIER}/la-boutique`, libelle: "La boutique" },
];

export const photos = {
  miroirTenu: { src: "/exemples/a-l-endroit/miroir-tenu.webp", largeur: 1200, hauteur: 1553, alt: "Une personne tient un grand miroir rond devant son visage, contre un mur clair" },
  miroirFleur: { src: "/exemples/a-l-endroit/miroir-fleur.webp", largeur: 1200, hauteur: 1800, alt: "Un miroir rond posé sur une table beige, une fleur blanche s'y reflète" },
  argent: { src: "/exemples/a-l-endroit/monture-argent.webp", largeur: 1200, hauteur: 1800, alt: "Une monture fine argentée posée sur un carnet ouvert, sur une table en bois" },
};

export type Forme = "ronde" | "carree" | "papillon" | "pilote" | "hexa";
export type Monture = { id: string; nom: string; matiere: string; forme: Forme; couleur: string; prix: number };

// Les montures de la boutique : une maison, aucune marque. Prix TTC, monture seule, exemple.
export const MONTURES: Monture[] = [
  { id: "a1", nom: "Recto", matiere: "Acétate noir", forme: "ronde", couleur: "#1D2B3A", prix: 165 },
  { id: "a2", nom: "Verso", matiere: "Acétate écaille", forme: "carree", couleur: "#8B5A2B", prix: 175 },
  { id: "a3", nom: "Endroit", matiere: "Acétate corail", forme: "papillon", couleur: "#C2452D", prix: 189 },
  { id: "a4", nom: "Revers", matiere: "Titane doré", forme: "hexa", couleur: "#B08A3A", prix: 239 },
  { id: "a5", nom: "Face", matiere: "Métal bleu acier", forme: "pilote", couleur: "#2E5A88", prix: 199 },
  { id: "a6", nom: "Profil", matiere: "Acétate cristal gris", forme: "carree", couleur: "#6E7A86", prix: 159 },
  { id: "a7", nom: "Reflet", matiere: "Métal argent", forme: "ronde", couleur: "#8C939C", prix: 179 },
  { id: "a8", nom: "Tain", matiere: "Acétate miel", forme: "ronde", couleur: "#A26A2E", prix: 169 },
  { id: "a9", nom: "Envers", matiere: "Acétate bordeaux", forme: "papillon", couleur: "#7A2E35", prix: 185 },
  { id: "a10", nom: "Droite", matiere: "Acier noir mat", forme: "hexa", couleur: "#1D2B3A", prix: 205 },
  { id: "a11", nom: "Gauche", matiere: "Acétate vert sapin", forme: "carree", couleur: "#2F5D4A", prix: 179 },
  { id: "a12", nom: "Selfie", matiere: "Acétate écaille blonde", forme: "pilote", couleur: "#9C6B35", prix: 195 },
];

export const euros = (n: number) => `${n.toLocaleString("fr-FR")} €`;

export const DEROULE = [
  { temps: "0 – 5 min", titre: "Le mur", texte: "Tu choisis cinq montures au mur, ou celles que tu as mises de côté sur le site." },
  { temps: "5 – 25 min", titre: "L'écran", texte: "Une caméra, un grand écran, et ton visage à l'endroit : de face, de trois quarts, en parlant." },
  { temps: "25 – 30 min", titre: "Les photos", texte: "Une photo par monture, imprimée sur place. Tu repars avec les cinq, pour choisir chez toi." },
];

export const FAQ = [
  { q: "C'est quoi, « à l'endroit »\u00A0?", r: "Un miroir inverse la gauche et la droite. Une caméra filmée sans retournement montre ton visage comme les autres le voient. C'est tout le principe de la boutique." },
  { q: "Les photos, vous les gardez\u00A0?", r: "Non. Elles sont imprimées pour toi et l'écran ne garde rien. On ne publie jamais une photo de client." },
  { q: "Je dois acheter à la fin de la séance\u00A0?", r: "Non. C'est même l'idée : tu repars avec les photos et tu choisis chez toi, tranquille." },
  { q: "Trente minutes, ça suffit\u00A0?", r: "Pour cinq montures, oui. Si tu veux en voir d'autres, on réserve une deuxième séance." },
  { q: "Vous faites les verres\u00A0?", r: "Oui, en boutique. Un devis détaillé t'est remis gratuitement, avant tout achat." },
  { q: "Et le miroir, alors\u00A0?", r: "Il y en a un, pour les retouches. Mais on choisit devant l'écran." },
];

export const EQUIPE = [
  { initiales: "MA", prenom: "Margaux", role: "Opticienne, fondatrice" },
  { initiales: "YS", prenom: "Yanis", role: "Opticien, séances du soir" },
];
