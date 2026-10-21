// Les données du site Vingt-Deux Heures, boutique de jeux de société imaginée dans la
// vidéo « Si je devais remplir le carnet de commandes d'une boutique de jeux de
// société ». On ne vend pas deux mille boîtes : on vend le fou rire de vingt-deux
// heures. Trois questions, et trois jeux choisis par la vendeuse.
//
// Règles tenues (voir SOURCES.md de la vidéo) :
// - aucun jeu réel : chaque jeu est décrit par son genre et une phrase, sans titre ni
//   éditeur ; les couvertures sont des aplats dessinés ;
// - l'âge et les avertissements de chaque jeu sont affichés AVANT le bouton qui le
//   met de côté (directive 2009/48/CE, art. 11 § 2 : visibles avant l'achat, y
//   compris en ligne), précédés du mot « Attention » ;
// - prix TTC, marqués « exemple » (arrêté du 3 décembre 1987, art. 1) ;
// - les places de la soirée découverte sont de vraies places : celles déjà prises
//   sont un exemple, et la page le dit (C. consom., art. L121-4, 7°) ;
// - la soirée est gratuite sans condition : aucun achat demandé.

export const DOSSIER = "/exemples/vingt-deux-heures";

export const NAVIGATION = [
  { href: `${DOSSIER}#trois-questions`, libelle: "Trois questions" },
  { href: `${DOSSIER}/soiree-decouverte`, libelle: "Soirée découverte" },
  { href: `${DOSSIER}/jeux-pour-deux`, libelle: "Jeux pour deux" },
];

export const boutique = {
  telephone: "01 99 00 47 22",
  adresse: "12 rue de l'Exemple, Ta Ville",
  vendeuse: "Léa",
  horaires: [
    { jours: "Mardi – vendredi", heures: "11 h – 19 h 30" },
    { jours: "Jeudi de soirée", heures: "11 h – 23 h" },
    { jours: "Samedi", heures: "10 h – 19 h 30" },
  ],
};

export const photos = {
  pions: { src: "/exemples/vingt-deux-heures/pions.webp", largeur: 1400, hauteur: 933, alt: "Une file de petits pions en bois de couleur sur une table claire" },
  des: { src: "/exemples/vingt-deux-heures/des.webp", largeur: 1000, hauteur: 665, alt: "Deux dés blancs en l'air sur un fond bleu" },
  pionsVerts: { src: "/exemples/vingt-deux-heures/pions-verts.webp", largeur: 1000, hauteur: 562, alt: "Des pions verts en bois rangés sur une table de jeu" },
  lancer: { src: "/exemples/vingt-deux-heures/lancer.webp", largeur: 1100, hauteur: 733, alt: "Une main lance des dés sur une table en bois" },
  deNoir: { src: "/exemples/vingt-deux-heures/de-noir.webp", largeur: 1000, hauteur: 667, alt: "Un dé noir posé sur un tapis clair" },
};

export type Jeu = {
  ref: string;
  genre: string;
  phrase: string;          // ce qu'on y fait, en une phrase
  min: number;
  max: number;
  duree: string;
  age: number;             // âge minimal conseillé par le fabricant (exemple)
  attention?: string;      // avertissement, affiché précédé de « Attention »
  prix: number;            // TTC, exemple
  mot: string;             // le mot de Léa
  teinte: string;
  motif: 0 | 1 | 2 | 3;
};

const PETITS = "Ne convient pas aux enfants de moins de 3 ans\u00A0: petits éléments, risque d'étouffement.";

export const JEUX: Record<string, Jeu> = {
  A1: { ref: "A1", genre: "Ambiance", phrase: "Des mots à faire deviner, en équipe, contre le sablier.", min: 4, max: 8, duree: "20 min", age: 10, attention: PETITS, prix: 24, mot: "Celui qui fait crier toute la table au bout de cinq minutes.", teinte: "#C93C22", motif: 0 },
  B1: { ref: "B1", genre: "Bluff", phrase: "Des cartes face cachée, des jetons, et un grand sourire pour mentir.", min: 3, max: 6, duree: "30 min", age: 10, attention: PETITS, prix: 22, mot: "On rit surtout quand quelqu'un se fait prendre.", teinte: "#2F5D8A", motif: 3 },
  C1: { ref: "C1", genre: "Coopératif", phrase: "Tous ensemble contre le jeu\u00A0: on gagne ou on perd ensemble.", min: 2, max: 4, duree: "45 min", age: 8, attention: PETITS, prix: 29, mot: "Personne ne boude à la fin\u00A0: tout le monde a perdu, ou tout le monde a gagné.", teinte: "#1F6B4F", motif: 1 },
  A2: { ref: "A2", genre: "Ambiance", phrase: "Dessiner les yeux fermés, et faire deviner quand même.", min: 4, max: 10, duree: "30 min", age: 8, prix: 19.9, mot: "Les dessins finissent sur le frigo.", teinte: "#E0A12E", motif: 2 },
  A3: { ref: "A3", genre: "Ambiance", phrase: "Une image, un mot, le premier qui tape sur la table.", min: 3, max: 8, duree: "15 min", age: 6, attention: PETITS, prix: 16.5, mot: "Parfait pour commencer la soirée, ou la finir.", teinte: "#8E4A6E", motif: 0 },
  R1: { ref: "R1", genre: "Rapidité", phrase: "Des piles de cartes, des réflexes, aucune pitié.", min: 2, max: 6, duree: "10 min", age: 6, prix: 12.9, mot: "On en fait trois parties sans s'en rendre compte.", teinte: "#C93C22", motif: 3 },
  X1: { ref: "X1", genre: "Dés", phrase: "Lancer, garder, relancer\u00A0: jusqu'où vas-tu prendre le risque\u00A0?", min: 2, max: 5, duree: "20 min", age: 8, attention: PETITS, prix: 17, mot: "Le jeu où les plus prudents perdent.", teinte: "#2F5D8A", motif: 1 },
  D1: { ref: "D1", genre: "Duel", phrase: "Deux joueurs, une grille, des tuiles à poser au bon endroit.", min: 2, max: 2, duree: "20 min", age: 8, attention: PETITS, prix: 21, mot: "Simple à expliquer, impossible à lâcher.", teinte: "#1F6B4F", motif: 2 },
  D2: { ref: "D2", genre: "Duel", phrase: "Des cartes à deux, du calcul et un peu de culot.", min: 2, max: 2, duree: "15 min", age: 7, prix: 13.5, mot: "Il tient dans une poche\u00A0: on le sort au café.", teinte: "#E0A12E", motif: 3 },
  D3: { ref: "D3", genre: "Duel abstrait", phrase: "Des pièces en bois, aucune chance, toute la tête.", min: 2, max: 2, duree: "15 min", age: 8, attention: PETITS, prix: 26, mot: "Beau sur une table basse, même rangé.", teinte: "#4A4E69", motif: 0 },
  P1: { ref: "P1", genre: "Placement", phrase: "Poser ses pions sur le plateau avant les autres. Simple, et profond.", min: 2, max: 4, duree: "30 min", age: 8, attention: PETITS, prix: 27, mot: "Les enfants y battent les parents. Souvent.", teinte: "#5B8C85", motif: 1 },
  T1: { ref: "T1", genre: "Tuiles", phrase: "Assembler un paysage tuile après tuile, et compter à la fin.", min: 2, max: 4, duree: "25 min", age: 8, attention: PETITS, prix: 23, mot: "Le plus calme de la boutique.", teinte: "#A3B86C", motif: 2 },
  Q2: { ref: "Q2", genre: "Logique", phrase: "Déduire la combinaison secrète avant les autres.", min: 2, max: 5, duree: "20 min", age: 10, prix: 18, mot: "Silence total pendant vingt minutes. Puis tout le monde parle.", teinte: "#2F5D8A", motif: 0 },
  S1: { ref: "S1", genre: "Stratégie", phrase: "Construire sa ville quartier par quartier, sans gêner le voisin. Ou si.", min: 2, max: 4, duree: "45 min", age: 10, attention: PETITS, prix: 34, mot: "Celui qu'on ressort le dimanche suivant.", teinte: "#4A4E69", motif: 3 },
  E1: { ref: "E1", genre: "Enquête", phrase: "Une affaire, des indices, une seule bonne réponse.", min: 1, max: 4, duree: "1 h", age: 12, prix: 22, mot: "À faire à deux, avec un carnet et un crayon.", teinte: "#8E4A6E", motif: 2 },
  L1: { ref: "L1", genre: "Lettres", phrase: "Des tuiles-lettres, une grille, des mots qui se croisent.", min: 2, max: 4, duree: "45 min", age: 8, attention: PETITS, prix: 25, mot: "Le jeu des familles qui aiment les mots.", teinte: "#E0A12E", motif: 1 },
  S2: { ref: "S2", genre: "Stratégie longue", phrase: "Une ferme à faire tourner, saison après saison.", min: 1, max: 4, duree: "2 h 30", age: 14, attention: PETITS, prix: 49, mot: "Pour les soirées où personne ne regarde l'heure.", teinte: "#1F6B4F", motif: 0 },
  C2: { ref: "C2", genre: "Aventure coopérative", phrase: "Une histoire en plusieurs soirées, qu'on reprend là où on l'a laissée.", min: 1, max: 4, duree: "3 h", age: 12, attention: PETITS, prix: 59, mot: "On en parle encore le lendemain matin.", teinte: "#4A4E69", motif: 1 },
  N1: { ref: "N1", genre: "Négociation", phrase: "Échanger, marchander, construire\u00A0: tout se négocie.", min: 3, max: 5, duree: "1 h 30", age: 10, attention: PETITS, prix: 36, mot: "Il y a toujours un traité rompu vers 23 h.", teinte: "#C93C22", motif: 2 },
  H1: { ref: "H1", genre: "Histoires", phrase: "Des cartes illustrées, et une histoire à inventer à plusieurs.", min: 3, max: 6, duree: "40 min", age: 8, prix: 21, mot: "Les meilleures histoires sont les plus absurdes.", teinte: "#5B8C85", motif: 3 },
  G1: { ref: "G1", genre: "Rôles cachés", phrase: "Chacun a un rôle secret. Le village doit trouver qui ment.", min: 6, max: 12, duree: "45 min", age: 10, prix: 14.9, mot: "Le seul jeu où l'on accuse sa sœur en public.", teinte: "#8E4A6E", motif: 0 },
  M1: { ref: "M1", genre: "Mots codés", phrase: "Faire deviner à son équipe avec un seul mot.", min: 4, max: 8, duree: "20 min", age: 10, prix: 19.9, mot: "On réfléchit, et on rit quand même.", teinte: "#2F5D8A", motif: 2 },
  N2: { ref: "N2", genre: "Enchères", phrase: "Miser juste, au bon moment, sans se ruiner.", min: 3, max: 6, duree: "20 min", age: 10, attention: PETITS, prix: 15, mot: "Court, malin, et on rejoue tout de suite.", teinte: "#E0A12E", motif: 1 },
  Q1: { ref: "Q1", genre: "Quiz par équipes", phrase: "Des questions sur tout, et des paris sur ses propres réponses.", min: 4, max: 12, duree: "1 h", age: 12, prix: 27, mot: "Pour les grandes tablées qui aiment avoir raison.", teinte: "#1F6B4F", motif: 3 },
};

export const QUESTIONS = [
  { id: "combien", question: "Vous êtes combien\u00A0?", options: [{ v: "2", libelle: "2" }, { v: "4", libelle: "3 – 4" }, { v: "6", libelle: "5 et +" }] },
  { id: "temps", question: "Vous avez combien de temps\u00A0?", options: [{ v: "20", libelle: "20 min" }, { v: "60", libelle: "1 h" }, { v: "180", libelle: "3 h" }] },
  { id: "humeur", question: "Plutôt…", options: [{ v: "rire", libelle: "Rire" }, { v: "reflechir", libelle: "Réfléchir" }] },
] as const;

/**
 * Les trois jeux de Léa pour chaque soirée : nombre de joueurs, temps, humeur.
 * Un choix fait à la main en boutique, pas un tri automatique.
 */
export const CHOIX: Record<string, [string, string, string]> = {
  "2-20-rire": ["D2", "R1", "X1"],
  "2-20-reflechir": ["D1", "D3", "Q2"],
  "2-60-rire": ["C1", "X1", "D2"],
  "2-60-reflechir": ["S1", "E1", "D1"],
  "2-180-rire": ["C1", "X1", "R1"],
  "2-180-reflechir": ["S2", "C2", "E1"],
  "4-20-rire": ["A3", "R1", "X1"],
  "4-20-reflechir": ["P1", "Q2", "T1"],
  "4-60-rire": ["A1", "B1", "C1"],
  "4-60-reflechir": ["S1", "E1", "L1"],
  "4-180-rire": ["H1", "A2", "B1"],
  "4-180-reflechir": ["S2", "C2", "N1"],
  "6-20-rire": ["A3", "A1", "R1"],
  "6-20-reflechir": ["M1", "Q2", "N2"],
  "6-60-rire": ["G1", "A2", "A1"],
  "6-60-reflechir": ["M1", "N2", "Q1"],
  "6-180-rire": ["G1", "A2", "H1"],
  "6-180-reflechir": ["N1", "Q1", "M1"],
};

/** Les jeux pour deux de la page dédiée (la recherche « jeux de société pour 2 personnes »). */
export const POUR_DEUX = [
  { titre: "Pour dix minutes au café", jeux: ["D2", "R1"] },
  { titre: "Pour un soir de semaine", jeux: ["D1", "D3", "X1"] },
  { titre: "Pour un dimanche entier", jeux: ["E1", "S1", "C1"] },
];

// « 24,00 € » écrit à la main, comme dans le kit : l'espace avant € reste insécable.
export const euros = (n: number) => `${n.toFixed(2).replace(".", ",")} €`;

export const joueurs = (j: Jeu) => (j.min === j.max ? `${j.min} joueurs` : `${j.min} à ${j.max} joueurs`);

/** La soirée découverte : un jeudi par mois. */
export const SOIREE = {
  date: "Jeudi 5 novembre",
  heure: "20\u00A0h",
  places: 24,
  jeux: 10,
  suivantes: ["Jeudi 3 décembre", "Jeudi 7 janvier"],
  // Places déjà prises, table par table (exemple) : 6 sièges par table.
  prises: [[0, 1, 2, 3, 4, 5], [0, 1, 2, 3], [0, 2, 3, 5], [1, 4]] as number[][],
};

export const FAQ = [
  { q: "Comment sont choisis les trois jeux\u00A0?", r: "À la main, par Léa, pour chaque réponse possible aux trois questions. Elle les a tous joués. Le site ne trie rien par prix ni par nouveauté." },
  { q: "Où sont l'âge et les avertissements\u00A0?", r: "Sur chaque jeu, avant le bouton «\u00A0Mettre de côté\u00A0»\u00A0: l'âge conseillé, et, quand la boîte en porte un, l'avertissement précédé du mot «\u00A0Attention\u00A0». Ce sont les mêmes que sur la boîte." },
  { q: "Je paie en ligne\u00A0?", r: "Non. Tu mets le jeu de côté sur le site, et tu le règles en boutique quand tu viens le chercher. Il t'attend trois jours." },
  { q: "La soirée découverte est payante\u00A0?", r: "Non. Elle est gratuite, et on ne te demande rien d'acheter. Il faut seulement réserver sa place\u00A0: 24 places, quatre tables de six." },
  { q: "Et si on n'aime pas le jeu\u00A0?", r: "Viens jouer à la soirée découverte avant de l'acheter\u00A0: c'est fait pour ça. Dix jeux sur les tables, et Léa pour les expliquer." },
];
