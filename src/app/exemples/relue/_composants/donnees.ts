// Les données du site Relue, papeterie et boutique de jeux imaginaire, filmée dans les
// deux vidéos du métier « loisirs créatifs » :
//   - « Créer une marque » (marque-loisirs-creatifs) : la marque Relue, la lettre qu'on
//     garde quarante ans, le service « ta lettre dans un an », la lettre de la semaine
//     lue à voix haute, l'affiche « Personne n'encadre un texto » ;
//   - « Remplir l'agenda » (agenda-loisirs-creatifs) : l'accueil en trois questions qui
//     sort trois jeux choisis par la vendeuse, la soirée découverte d'un jeudi par mois,
//     places réservées sur le site, et la page « jeux de société pour 2 personnes ».
// Une seule idée pour les deux : ce qu'on fait à la main, ensemble, et qu'on garde. Une
// lettre s'écrit pour être relue ; un jeu s'achète pour être rejoué.
//
// Règles tenues (voir les SOURCES.md des deux vidéos) :
// - la lettre de la semaine n'est lue qu'avec l'accord de celui qui l'a écrite : seul
//   l'auteur décide de divulguer son texte (CPI, art. L121-2) — et pas celui qui l'a
//   reçue ; la lettre montrée (Robert, Brest, 1984) est inventée ;
// - « postée dans un an, jour pour jour » : la date de dépôt, pas une date de
//   distribution, que la boutique ne maîtrise pas ; l'adresse ne sert qu'à poster ;
// - aucun jeu réel : chaque jeu est décrit par son genre et une phrase, sans titre ni
//   éditeur ; les boîtes sont des aplats dessinés ;
// - l'âge et les avertissements de chaque jeu sont affichés AVANT le bouton qui le met
//   de côté (directive 2009/48/CE, art. 11 § 2), précédés du mot « Attention » ;
// - les places de la soirée découverte sont de vraies places : celles déjà prises sont
//   un exemple, et la page le dit (C. consom., art. L121-4, 7°) ; la soirée est gratuite,
//   sans achat ;
// - prix TTC, marqués « exemple » ; téléphone dans la tranche ARCEP de la fiction ;
//   aucune adresse e-mail.

export const DOSSIER = "/exemples/relue";

export const NAVIGATION = [
  { href: `${DOSSIER}/dans-un-an`, libelle: "Ta lettre dans un an" },
  { href: `${DOSSIER}#trois-questions`, libelle: "Trois questions" },
  { href: `${DOSSIER}/soiree-decouverte`, libelle: "Soirée découverte" },
  { href: `${DOSSIER}/lettre-de-la-semaine`, libelle: "La lettre de la semaine" },
];

export const maison = {
  nom: "Relue",
  telephone: "01 99 00 61 84",
  adresse: "12 rue de l'Exemple, Ta Ville",
  vendeuse: "Léa",
  prixService: 4.9,
  horaires: [
    { jours: "Mardi – vendredi", heures: "10 h – 19 h 30" },
    { jours: "Jeudi de soirée", heures: "10 h – 23 h" },
    { jours: "Samedi", heures: "10 h – 19 h 30" },
  ],
};

// Unsplash (licence Unsplash), servies depuis notre domaine ; crédits dans les mentions.
export const photos = {
  plume: { src: `${DOSSIER}/porte-plume.webp`, largeur: 1400, hauteur: 945, alt: "Un porte-plume posé sur une lettre manuscrite, à côté de fleurs séchées" },
  lettres: { src: `${DOSSIER}/lettres.webp`, largeur: 1100, hauteur: 733, alt: "De vieilles lettres manuscrites, pliées, sur une table en bois" },
  cachet: { src: `${DOSSIER}/cachet.webp`, largeur: 1100, hauteur: 1650, alt: "Une main scelle une enveloppe blanche avec un cachet de cire" },
  enveloppe: { src: `${DOSSIER}/enveloppe.webp`, largeur: 1100, hauteur: 733, alt: "Des mains écrivent sur une enveloppe, sur une table en bois" },
  pions: { src: `${DOSSIER}/pions.webp`, largeur: 1400, hauteur: 933, alt: "Une file de petits pions en bois de couleur sur une table claire" },
  des: { src: `${DOSSIER}/des.webp`, largeur: 1000, hauteur: 665, alt: "Deux dés blancs en l'air sur un fond bleu" },
  pionsVerts: { src: `${DOSSIER}/pions-verts.webp`, largeur: 1000, hauteur: 562, alt: "Des pions verts en bois rangés sur une table de jeu" },
  lancer: { src: `${DOSSIER}/lancer.webp`, largeur: 1100, hauteur: 733, alt: "Une main lance des dés sur une table en bois" },
  deNoir: { src: `${DOSSIER}/de-noir.webp`, largeur: 1000, hauteur: 667, alt: "Un dé noir posé sur un tapis clair" },
};

/* ---------- La papeterie (la marque) ---------- */

/** La lettre n° 12, inventée pour l'exemple. */
export const LETTRE = {
  numero: 12,
  lignes: [
    "Ma Jeanne,",
    "Il a plu toute la journée sur le port,",
    "et je n'ai pensé qu'à toi.",
    "Les bateaux sont rentrés tôt ; moi aussi.",
    "J'ai acheté le papier bleu que tu aimes",
    "pour t'écrire celle-ci.",
    "Garde cette lettre : je te la relirai.",
  ],
  signature: "Robert",
  lieu: "Brest, 12 mai 1984",
  duree: 9, // secondes de lecture (démonstration)
};

export const PRODUITS = [
  { nom: "Papier vergé, 20 feuilles A5", detail: "Crème, 120 g, qui ne jaunit pas vite", prix: 12 },
  { nom: "Enveloppes doublées, par 10", detail: "Bleu nuit, doublure kraft", prix: 9.5 },
  { nom: "Bâton de cire, rouge cachet", detail: "Pour une dizaine de lettres", prix: 6 },
  { nom: "La boîte à garder", detail: "Carton épais, pour quarante ans de lettres", prix: 18 },
];

export const CONSEILS = [
  { titre: "La date et le lieu, en haut", texte: "Dans quarante ans, c'est la première chose qu'on cherche. « Brest, 12 mai 1984 » vaut une photo." },
  { titre: "Une chose vraie", texte: "Pas un bilan. Une chose de la journée : la pluie sur le port, le café trop chaud, ce qu'on n'a pas osé dire." },
  { titre: "À la main", texte: "L'écriture vieillit avec la lettre. Elle dit qui écrivait, et comment il allait ce jour-là." },
  { titre: "Une signature", texte: "Un prénom suffit. Celui qui relira saura." },
];

/* ---------- Les jeux (l'agenda) ---------- */

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

const PETITS = "Ne convient pas aux enfants de moins de 3 ans : petits éléments, risque d'étouffement.";

export const JEUX: Record<string, Jeu> = {
  A1: { ref: "A1", genre: "Ambiance", phrase: "Des mots à faire deviner, en équipe, contre le sablier.", min: 4, max: 8, duree: "20 min", age: 10, attention: PETITS, prix: 24, mot: "Celui qui fait crier toute la table au bout de cinq minutes.", teinte: "#B5452F", motif: 0 },
  B1: { ref: "B1", genre: "Bluff", phrase: "Des cartes face cachée, des jetons, et un grand sourire pour mentir.", min: 3, max: 6, duree: "30 min", age: 10, attention: PETITS, prix: 22, mot: "On rit surtout quand quelqu'un se fait prendre.", teinte: "#2F5D8A", motif: 3 },
  C1: { ref: "C1", genre: "Coopératif", phrase: "Tous ensemble contre le jeu : on gagne ou on perd ensemble.", min: 2, max: 4, duree: "45 min", age: 8, attention: PETITS, prix: 29, mot: "Personne ne boude à la fin : tout le monde a perdu, ou tout le monde a gagné.", teinte: "#4E6B4A", motif: 1 },
  A2: { ref: "A2", genre: "Ambiance", phrase: "Dessiner les yeux fermés, et faire deviner quand même.", min: 4, max: 10, duree: "30 min", age: 8, prix: 19.9, mot: "Les dessins finissent sur le frigo.", teinte: "#C9962E", motif: 2 },
  A3: { ref: "A3", genre: "Ambiance", phrase: "Une image, un mot, le premier qui tape sur la table.", min: 3, max: 8, duree: "15 min", age: 6, attention: PETITS, prix: 16.5, mot: "Parfait pour commencer la soirée, ou la finir.", teinte: "#8E4A6E", motif: 0 },
  R1: { ref: "R1", genre: "Rapidité", phrase: "Des piles de cartes, des réflexes, aucune pitié.", min: 2, max: 6, duree: "10 min", age: 6, prix: 12.9, mot: "On en fait trois parties sans s'en rendre compte.", teinte: "#B5452F", motif: 3 },
  X1: { ref: "X1", genre: "Dés", phrase: "Lancer, garder, relancer : jusqu'où vas-tu prendre le risque ?", min: 2, max: 5, duree: "20 min", age: 8, attention: PETITS, prix: 17, mot: "Le jeu où les plus prudents perdent.", teinte: "#2F5D8A", motif: 1 },
  D1: { ref: "D1", genre: "Duel", phrase: "Deux joueurs, une grille, des tuiles à poser au bon endroit.", min: 2, max: 2, duree: "20 min", age: 8, attention: PETITS, prix: 21, mot: "Simple à expliquer, impossible à lâcher.", teinte: "#4E6B4A", motif: 2 },
  D2: { ref: "D2", genre: "Duel", phrase: "Des cartes à deux, du calcul et un peu de culot.", min: 2, max: 2, duree: "15 min", age: 7, prix: 13.5, mot: "Il tient dans une poche : on le sort au café.", teinte: "#C9962E", motif: 3 },
  D3: { ref: "D3", genre: "Duel abstrait", phrase: "Des pièces en bois, aucune chance, toute la tête.", min: 2, max: 2, duree: "15 min", age: 8, attention: PETITS, prix: 26, mot: "Beau sur une table basse, même rangé.", teinte: "#1E2B4A", motif: 0 },
  P1: { ref: "P1", genre: "Placement", phrase: "Poser ses pions sur le plateau avant les autres. Simple, et profond.", min: 2, max: 4, duree: "30 min", age: 8, attention: PETITS, prix: 27, mot: "Les enfants y battent les parents. Souvent.", teinte: "#5B8C85", motif: 1 },
  T1: { ref: "T1", genre: "Tuiles", phrase: "Assembler un paysage tuile après tuile, et compter à la fin.", min: 2, max: 4, duree: "25 min", age: 8, attention: PETITS, prix: 23, mot: "Le plus calme de la boutique.", teinte: "#7A8C6E", motif: 2 },
  Q2: { ref: "Q2", genre: "Logique", phrase: "Déduire la combinaison secrète avant les autres.", min: 2, max: 5, duree: "20 min", age: 10, prix: 18, mot: "Silence total pendant vingt minutes. Puis tout le monde parle.", teinte: "#2F5D8A", motif: 0 },
  S1: { ref: "S1", genre: "Stratégie", phrase: "Construire sa ville quartier par quartier, sans gêner le voisin. Ou si.", min: 2, max: 4, duree: "45 min", age: 10, attention: PETITS, prix: 34, mot: "Celui qu'on ressort le dimanche suivant.", teinte: "#1E2B4A", motif: 3 },
  E1: { ref: "E1", genre: "Enquête", phrase: "Une affaire, des indices, une seule bonne réponse.", min: 1, max: 4, duree: "1 h", age: 12, prix: 22, mot: "À faire à deux, avec un carnet et un crayon.", teinte: "#8E4A6E", motif: 2 },
  L1: { ref: "L1", genre: "Lettres", phrase: "Des tuiles-lettres, une grille, des mots qui se croisent.", min: 2, max: 4, duree: "45 min", age: 8, attention: PETITS, prix: 25, mot: "Le jeu des familles qui aiment les mots.", teinte: "#C9962E", motif: 1 },
  S2: { ref: "S2", genre: "Stratégie longue", phrase: "Une ferme à faire tourner, saison après saison.", min: 1, max: 4, duree: "2 h 30", age: 14, attention: PETITS, prix: 49, mot: "Pour les soirées où personne ne regarde l'heure.", teinte: "#4E6B4A", motif: 0 },
  C2: { ref: "C2", genre: "Aventure coopérative", phrase: "Une histoire en plusieurs soirées, qu'on reprend là où on l'a laissée.", min: 1, max: 4, duree: "3 h", age: 12, attention: PETITS, prix: 59, mot: "On en parle encore le lendemain matin.", teinte: "#1E2B4A", motif: 1 },
  N1: { ref: "N1", genre: "Négociation", phrase: "Échanger, marchander, construire : tout se négocie.", min: 3, max: 5, duree: "1 h 30", age: 10, attention: PETITS, prix: 36, mot: "Il y a toujours un traité rompu vers 23 h.", teinte: "#B5452F", motif: 2 },
  H1: { ref: "H1", genre: "Histoires", phrase: "Des cartes illustrées, et une histoire à inventer à plusieurs.", min: 3, max: 6, duree: "40 min", age: 8, prix: 21, mot: "Les meilleures histoires sont les plus absurdes.", teinte: "#5B8C85", motif: 3 },
  G1: { ref: "G1", genre: "Rôles cachés", phrase: "Chacun a un rôle secret. Le village doit trouver qui ment.", min: 6, max: 12, duree: "45 min", age: 10, prix: 14.9, mot: "Le seul jeu où l'on accuse sa sœur en public.", teinte: "#8E4A6E", motif: 0 },
  M1: { ref: "M1", genre: "Mots codés", phrase: "Faire deviner à son équipe avec un seul mot.", min: 4, max: 8, duree: "20 min", age: 10, prix: 19.9, mot: "On réfléchit, et on rit quand même.", teinte: "#2F5D8A", motif: 2 },
  N2: { ref: "N2", genre: "Enchères", phrase: "Miser juste, au bon moment, sans se ruiner.", min: 3, max: 6, duree: "20 min", age: 10, attention: PETITS, prix: 15, mot: "Court, malin, et on rejoue tout de suite.", teinte: "#C9962E", motif: 1 },
  Q1: { ref: "Q1", genre: "Quiz par équipes", phrase: "Des questions sur tout, et des paris sur ses propres réponses.", min: 4, max: 12, duree: "1 h", age: 12, prix: 27, mot: "Pour les grandes tablées qui aiment avoir raison.", teinte: "#4E6B4A", motif: 3 },
};

export const QUESTIONS = [
  { id: "combien", question: "Vous êtes combien ?", options: [{ v: "2", libelle: "2" }, { v: "4", libelle: "3 – 4" }, { v: "6", libelle: "5 et +" }] },
  { id: "temps", question: "Vous avez combien de temps ?", options: [{ v: "20", libelle: "20 min" }, { v: "60", libelle: "1 h" }, { v: "180", libelle: "3 h" }] },
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

export const joueurs = (j: Jeu) => (j.min === j.max ? `${j.min} joueurs` : `${j.min} à ${j.max} joueurs`);

/** La soirée découverte : un jeudi par mois. */
export const SOIREE = {
  date: "Jeudi 5 novembre",
  heure: "20 h",
  places: 24,
  jeux: 10,
  suivantes: ["Jeudi 3 décembre", "Jeudi 7 janvier"],
  // Places déjà prises, table par table (exemple) : 6 sièges par table.
  prises: [[0, 1, 2, 3, 4, 5], [0, 1, 2, 3], [0, 2, 3, 5], [1, 4]] as number[][],
};

// « 24,00 € » écrit à la main : l'espace avant € reste insécable.
export const euros = (n: number) => `${n.toFixed(2).replace(".", ",")} €`;

export const FAQ = [
  { q: "Qui lit ma lettre à moi-même ?", r: "Personne. Tu l'écris, on l'imprime sur notre papier, on la cachette, et elle reste fermée jusqu'au jour où on la poste." },
  { q: "« Jour pour jour », c'est la date d'arrivée ?", r: "Non : c'est la date où on la dépose à la poste, un an après. On ne maîtrise pas le jour de distribution, alors on ne le promet pas." },
  { q: "Comment une lettre devient « la lettre de la semaine » ?", r: "Seulement si celui qui l'a écrite est d'accord — ou ses héritiers, s'il n'est plus là. L'avoir reçue ne suffit pas : le papier t'appartient, le texte reste à son auteur." },
  { q: "Comment sont choisis les trois jeux ?", r: "À la main, par Léa, pour chaque réponse possible aux trois questions. Elle les a tous joués. Le site ne trie rien par prix ni par nouveauté." },
  { q: "Où sont l'âge et les avertissements des jeux ?", r: "Sur chaque jeu, avant le bouton « Mettre de côté » : l'âge conseillé, et, quand la boîte en porte un, l'avertissement précédé du mot « Attention ». Ce sont les mêmes que sur la boîte." },
  { q: "La soirée découverte est payante ?", r: "Non. Elle est gratuite, et on ne te demande rien d'acheter. Il faut seulement réserver sa place : 24 places, quatre tables de six." },
  { q: "Je paie en ligne ?", r: "Non. Tu mets un jeu ou du papier de côté sur le site, et tu le règles en boutique. Ici, tous les prix sont TTC et d'exemple." },
];
