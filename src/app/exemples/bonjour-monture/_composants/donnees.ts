// Les contenus du site Bonjour Monture, opticien imaginé dans la vidéo « Si je
// devais remplir l'agenda d'un opticien ». Tout est inventé ; les prix sont des
// exemples. Règles du métier tenues partout : pas un mot sur la détermination de
// la réfraction (« test de vue »…, CSP D.4362-19) ni sur une prise en charge
// (Sécurité sociale, mutuelle…, CSP R.5213-1, 3°). Le rendez-vous est un essayage
// de montures, en boutique.

export const DOSSIER = "/exemples/bonjour-monture";

export const entreprise = {
  nom: "Bonjour Monture",
  // Tranche que l'ARCEP réserve aux œuvres de fiction : ce numéro ne sonne chez personne.
  telephone: "01 99 00 41 27",
  telephoneLien: "+33199004127",
  adresse: "12 rue de l'Exemple",
  ville: "Ville-d'Exemple",
  horaires: [
    { jours: "Mardi – vendredi", heures: "10 h – 19 h" },
    { jours: "Samedi", heures: "9 h 30 – 18 h" },
    { jours: "Dimanche, lundi", heures: "Fermé" },
  ],
};

export const NAVIGATION = [
  { href: `${DOSSIER}#questions`, libelle: "Trois questions" },
  { href: `${DOSSIER}/visages/rond`, libelle: "Visages" },
  { href: `${DOSSIER}/la-boutique`, libelle: "La boutique" },
  { href: `${DOSSIER}/essayage`, libelle: "Essayage" },
];

export const photos = {
  verte: { src: "/exemples/bonjour-monture/monture-verte.webp", largeur: 1400, hauteur: 933, alt: "Une monture verte posée près d'une tasse de thé, sur une table crème" },
  ronde: { src: "/exemples/bonjour-monture/ronde-terracotta.webp", largeur: 1000, hauteur: 667, alt: "Une monture ronde noire, branches ouvertes, sur un papier terracotta" },
  ecaille: { src: "/exemples/bonjour-monture/ecaille-bois.webp", largeur: 1000, hauteur: 667, alt: "Une monture écaille posée sur une table en bois" },
};

/* ---------- Les trois questions ---------- */

export type Reponse = { id: string; libelle: string; pastille?: string };
export type QuestionEssayage = { id: "usage" | "presence" | "couleur"; question: string; reponses: Reponse[] };

export const QUESTIONS: QuestionEssayage[] = [
  {
    id: "usage",
    question: "Tu les portes quand\u00A0?",
    reponses: [
      { id: "ecran", libelle: "Écran" },
      { id: "volant", libelle: "Volant" },
      { id: "toujours", libelle: "Toujours" },
    ],
  },
  {
    id: "presence",
    question: "Discrètes, ou qu'on les remarque\u00A0?",
    reponses: [
      { id: "discretes", libelle: "Discrètes" },
      { id: "remarquees", libelle: "Qu'on les voie" },
    ],
  },
  {
    id: "couleur",
    question: "Ta couleur\u00A0?",
    reponses: [
      { id: "noir", libelle: "Noir", pastille: "#2C1E16" },
      { id: "ecaille", libelle: "Écaille", pastille: "#8B5A2B" },
      { id: "bleu", libelle: "Bleu", pastille: "#2E5A88" },
    ],
  },
];

export type Choix = Partial<Record<QuestionEssayage["id"], string>>;

/* ---------- Les montures de la boutique ---------- */

export type Forme = "ronde" | "carree" | "papillon" | "pilote" | "hexa" | "rectangle";
export type Monture = {
  id: string;
  nom: string;
  matiere: string;
  forme: Forme;
  couleur: string;          // trait du dessin
  teinte: "noir" | "ecaille" | "bleu" | "autre";
  presence: "discretes" | "remarquees";
  prix: number;             // TTC, monture seule, exemple
  visages: ("rond" | "ovale" | "carre" | "allonge")[];
};

export const MONTURES: Monture[] = [
  { id: "m01", nom: "La Carrée douce", matiere: "Acétate noir", forme: "carree", couleur: "#2C1E16", teinte: "noir", presence: "discretes", prix: 159, visages: ["rond", "ovale"] },
  { id: "m02", nom: "L'Hexagone fin", matiere: "Titane bronze", forme: "hexa", couleur: "#8B6A3A", teinte: "autre", presence: "remarquees", prix: 229, visages: ["rond", "ovale", "allonge"] },
  { id: "m03", nom: "La Rectangle nette", matiere: "Acétate bleu nuit", forme: "rectangle", couleur: "#2E5A88", teinte: "bleu", presence: "discretes", prix: 145, visages: ["rond", "ovale"] },
  { id: "m04", nom: "Le Papillon", matiere: "Acétate écaille", forme: "papillon", couleur: "#8B5A2B", teinte: "ecaille", presence: "remarquees", prix: 189, visages: ["rond", "carre"] },
  { id: "m05", nom: "La Pilote", matiere: "Métal doré", forme: "pilote", couleur: "#B08A3A", teinte: "autre", presence: "remarquees", prix: 175, visages: ["carre", "ovale", "allonge"] },
  { id: "m06", nom: "La Ronde atelier", matiere: "Acétate écaille miel", forme: "ronde", couleur: "#A26A2E", teinte: "ecaille", presence: "remarquees", prix: 169, visages: ["carre", "allonge"] },
  { id: "m07", nom: "La Carrée épaisse", matiere: "Acétate écaille foncée", forme: "carree", couleur: "#6B3F1F", teinte: "ecaille", presence: "remarquees", prix: 199, visages: ["rond", "ovale", "allonge"] },
  { id: "m08", nom: "La Ronde fine", matiere: "Métal noir mat", forme: "ronde", couleur: "#2C1E16", teinte: "noir", presence: "discretes", prix: 139, visages: ["carre", "ovale"] },
  { id: "m09", nom: "La Rectangle légère", matiere: "Titane gris", forme: "rectangle", couleur: "#5E6A70", teinte: "autre", presence: "discretes", prix: 249, visages: ["rond", "ovale"] },
  { id: "m10", nom: "Le Papillon bleu", matiere: "Acétate bleu profond", forme: "papillon", couleur: "#2E5A88", teinte: "bleu", presence: "remarquees", prix: 189, visages: ["rond", "carre"] },
  { id: "m11", nom: "L'Hexagone noir", matiere: "Acier noir", forme: "hexa", couleur: "#2C1E16", teinte: "noir", presence: "remarquees", prix: 179, visages: ["rond", "ovale"] },
  { id: "m12", nom: "La Carrée claire", matiere: "Acétate cristal fumé", forme: "carree", couleur: "#7A8A8F", teinte: "autre", presence: "discretes", prix: 155, visages: ["rond", "ovale", "allonge"] },
  { id: "m13", nom: "La Pilote noire", matiere: "Acétate et métal noirs", forme: "pilote", couleur: "#2C1E16", teinte: "noir", presence: "remarquees", prix: 205, visages: ["carre", "allonge"] },
  { id: "m14", nom: "La Ronde bleue", matiere: "Acétate bleu pétrole", forme: "ronde", couleur: "#2E5A6B", teinte: "bleu", presence: "discretes", prix: 149, visages: ["carre", "allonge"] },
  { id: "m15", nom: "La Rectangle écaille", matiere: "Acétate écaille blonde", forme: "rectangle", couleur: "#9C6B35", teinte: "ecaille", presence: "discretes", prix: 165, visages: ["rond", "ovale"] },
  { id: "m16", nom: "Le Papillon rouge", matiere: "Acétate rouge brique", forme: "papillon", couleur: "#9A3B2E", teinte: "autre", presence: "remarquees", prix: 195, visages: ["rond", "ovale", "carre", "allonge"] },
];

/** Les douze montures d'un plateau, d'après les réponses : la couleur d'abord, puis la présence. */
export function plateauPour(choix: Choix): Monture[] {
  const score = (m: Monture) =>
    (choix.couleur && m.teinte === choix.couleur ? 4 : 0) +
    (choix.presence && m.presence === choix.presence ? 2 : 0) +
    (choix.usage === "ecran" && m.presence === "discretes" ? 1 : 0) +
    (choix.usage === "volant" && (m.forme === "pilote" || m.forme === "rectangle") ? 1 : 0);
  return [...MONTURES].sort((a, b) => score(b) - score(a) || a.id.localeCompare(b.id)).slice(0, 12);
}

export const euros = (n: number) => `${n.toLocaleString("fr-FR")} €`;

/* ---------- Une page par forme de visage ---------- */

export type Visage = {
  slug: "rond" | "ovale" | "carre" | "allonge";
  nom: string;               // « rond »
  titre: string;             // « Visage rond »
  recherche: string;         // la question telle qu'on la tape
  idee: string;
  conseils: { titre: string; texte: string }[];
};

export const VISAGES: Visage[] = [
  {
    slug: "rond",
    nom: "rond",
    titre: "Visage rond",
    recherche: "Quelle monture pour un visage rond\u00A0?",
    idee: "Des lignes droites et un peu d'angle : la monture dessine ce que le visage ne dessine pas.",
    conseils: [
      { titre: "Des angles", texte: "Une monture carrée, rectangulaire ou hexagonale casse la rondeur des joues." },
      { titre: "Un pont un peu haut", texte: "Il allonge le nez et remonte le regard." },
      { titre: "Assez large", texte: "La monture va jusqu'au bord du visage, pas au-delà : elle l'affine." },
    ],
  },
  {
    slug: "ovale",
    nom: "ovale",
    titre: "Visage ovale",
    recherche: "Quelle monture pour un visage ovale\u00A0?",
    idee: "Presque tout va. La vraie question devient : qu'est-ce que tu veux qu'on remarque\u00A0?",
    conseils: [
      { titre: "Garder l'équilibre", texte: "Une monture aussi large que la partie la plus large du visage." },
      { titre: "Oser la forme", texte: "Papillon, hexagone, pilote : c'est le visage qui peut se le permettre." },
      { titre: "Suivre les sourcils", texte: "Le haut de la monture suit la ligne des sourcils, sans la cacher." },
    ],
  },
  {
    slug: "carre",
    nom: "carré",
    titre: "Visage carré",
    recherche: "Quelle monture pour un visage carré\u00A0?",
    idee: "Des courbes pour adoucir une mâchoire marquée.",
    conseils: [
      { titre: "Des courbes", texte: "Une ronde, une pilote ou un papillon adoucissent les angles." },
      { titre: "Des branches fines", texte: "Elles évitent d'ajouter de la largeur aux tempes." },
      { titre: "Le regard en haut", texte: "Une monture plus marquée en haut attire l'œil vers les yeux." },
    ],
  },
  {
    slug: "allonge",
    nom: "allongé",
    titre: "Visage allongé",
    recherche: "Quelle monture pour un visage allongé\u00A0?",
    idee: "Une monture haute qui coupe la longueur, et de la largeur.",
    conseils: [
      { titre: "De la hauteur", texte: "Des verres hauts occupent le milieu du visage." },
      { titre: "Un pont bas", texte: "Il raccourcit visuellement le nez." },
      { titre: "Des branches marquées", texte: "Elles ajoutent de la largeur sur les côtés." },
    ],
  },
];

/* ---------- Le reste du site ---------- */

export const ETAPES = [
  { titre: "Trois questions", duree: "1 minute", texte: "Sur le site : quand tu les portes, si on doit les remarquer, ta couleur. Rien d'autre." },
  { titre: "Ton plateau", duree: "la veille", texte: "On choisit douze montures de la boutique pour toi, et on pose ton prénom devant." },
  { titre: "L'essayage", duree: "45 minutes", texte: "Douze montures, pas deux cents. On compare, on écarte, on garde les trois qui te ressemblent." },
  { titre: "Celles-là", duree: "quand tu veux", texte: "Tu choisis le jour même, ou tu reviens. Le devis détaillé t'est remis gratuitement, avant tout achat." },
];

export const ATELIER = [
  { titre: "Ajustage", texte: "Des branches qui serrent, un nez qui glisse : on ajuste, sans rendez-vous." },
  { titre: "Petites réparations", texte: "Vis, plaquettes, charnière fatiguée : à l'atelier, au fond de la boutique." },
  { titre: "Nettoyage", texte: "Un bain à ultrasons pendant que tu attends. Les montures ressortent comme neuves." },
];

export const EQUIPE = [
  { initiales: "IN", prenom: "Inès", role: "Opticienne, prépare les plateaux", phrase: "Je lis tes trois réponses la veille, et je choisis comme pour une amie." },
  { initiales: "PA", prenom: "Paul", role: "Opticien, à l'atelier", phrase: "Une monture qui glisse n'est pas une fatalité. Passe me voir." },
  { initiales: "SO", prenom: "Sofia", role: "Accueil et essayages", phrase: "Je te pose les montures dans l'ordre où je les ai rangées. La bonne arrive souvent en quatrième." },
];

export const FAQ = [
  { q: "Combien de temps dure un essayage\u00A0?", r: "Quarante-cinq minutes. C'est assez pour douze montures, et pas trop pour rester attentif." },
  { q: "Je suis obligé d'acheter\u00A0?", r: "Non. Tu peux repartir sans rien, ou revenir plus tard : on garde ton plateau une semaine." },
  { q: "Et si aucune des douze ne me va\u00A0?", r: "Ça arrive. On en prépare d'autres avec ce que tu as aimé et pas aimé, et on te propose un autre créneau." },
  { q: "Je peux venir sans rendez-vous\u00A0?", r: "Oui, pour un ajustage, une réparation ou pour regarder. L'essayage préparé, lui, se réserve : le plateau se monte la veille." },
  { q: "Vous faites les verres\u00A0?", r: "Oui, en boutique. Un devis détaillé t'est remis gratuitement, avant tout achat." },
  { q: "Pourquoi trois questions seulement\u00A0?", r: "Parce qu'elles suffisent à écarter les trois quarts du mur. Le reste se voit en essayant." },
];
