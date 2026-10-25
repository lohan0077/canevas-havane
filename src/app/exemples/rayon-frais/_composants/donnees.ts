// Le cabinet de diététique imaginaire « Rayon Frais », filmé dans les deux vidéos des
// diététiciens : « Créer une marque » (le nom, le ticket de caisse ligne par ligne, les
// séances au rayon, l'atelier étiquettes du samedi matin) et « Remplir l'agenda » (la
// seule question de l'accueil — qu'y a-t-il dans votre frigo ? —, la page diététicienne
// ou nutritionniste avec le diplôme dessous, les rendez-vous du soir).
//
// La diététicienne, l'adresse, les prix, les créneaux et la date de l'atelier sont des
// exemples ; le téléphone est dans la tranche que l'ARCEP réserve à la fiction. Aucun
// conseil nutritionnel, aucun kilo promis, aucun « avant / après », aucune enseigne de
// supermarché. Aucune donnée de santé recueillie : ni poids, ni objectif, ni motif ; la
// photo du frigo reste sur le téléphone du patient, le site ne la reçoit jamais.

export const DOSSIER = "/exemples/rayon-frais";

export const cabinet = {
  nom: "Rayon Frais",
  baseline: "On part de vos courses.",
  dieteticienne: "Maud L.",
  diplome: "BTS Diététique et nutrition",
  adeli: "00 000 000 0",
  adresse: "12 rue de l'Exemple",
  ville: "Saint-Exemple",
  telephone: "06 39 98 20 64",
  horaires: "Du lundi au vendredi, de 12 h à 21 h (séances du soir jusqu'à 20 h 30) · le samedi matin, au rayon",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#frigo`, libelle: "Votre frigo" },
  { href: `${DOSSIER}/rayons`, libelle: "Au rayon" },
  { href: `${DOSSIER}/atelier`, libelle: "L'atelier" },
  { href: `${DOSSIER}/dieteticienne-ou-nutritionniste`, libelle: "Diététicienne ?" },
];

/* ---------- Les photos ----------
   Unsplash (licence Unsplash), servies depuis notre domaine ; crédits dans les
   mentions légales. Des cagettes, des légumes, un frigo : aucune enseigne. */
export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const P = "/exemples/rayon-frais";
export const photos = {
  caisse: { src: `${P}/caisse.webp`, largeur: 1000, hauteur: 1333, alt: "Une cagette de légumes et de raisin posée dans l'herbe, vue de dessus" },
  cagettes: { src: `${P}/cagettes.webp`, largeur: 1200, hauteur: 800, alt: "Des cagettes en bois remplies de légumes, sur un étal" },
  poivrons: { src: `${P}/poivrons.webp`, largeur: 1000, hauteur: 667, alt: "Des poivrons rouges, jaunes et verts dans une caisse, des citrons derrière" },
  panier: { src: `${P}/panier.webp`, largeur: 1000, hauteur: 667, alt: "Un panier tressé rempli d'asperges, d'avocats, de tomates et d'un poivron" },
  cuisine: { src: `${P}/cuisine-nuit.webp`, largeur: 1400, hauteur: 933, alt: "Une cuisine dans le noir, la porte du réfrigérateur ouverte et allumée" },
  bocaux: { src: `${P}/frigo-bocaux.webp`, largeur: 1200, hauteur: 800, alt: "L'intérieur d'un réfrigérateur : bocaux, sauce tomate, poivrons et tomates" },
  legumes: { src: `${P}/frigo-legumes.webp`, largeur: 1200, hauteur: 800, alt: "La porte et les clayettes d'un réfrigérateur : salade, œufs, oranges" },
} satisfies Record<string, Photo>;

/* ---------- Ce qu'on apporte à la première séance (rien n'est envoyé) ---------- */
export const aApporter = [
  { id: "photo", libelle: "Une photo de votre frigo", detail: "Sur votre téléphone. Vous me la montrez, elle y reste." },
  { id: "ticket", libelle: "Votre dernier ticket de caisse", detail: "Celui de la semaine, tel quel. On le lit ligne par ligne." },
  { id: "soirs", libelle: "Vos soirs de la semaine", detail: "Qui rentre à quelle heure, qui cuisine, qui mange quoi." },
];

/* ---------- Le ticket de caisse (exemple) ----------
   Ligne par ligne, les mêmes questions pour chaque ligne : on comprend, on ne juge pas. */
export const ticket = [
  { article: "Pain de mie", prix: "1,45" },
  { article: "8 yaourts", prix: "2,90" },
  { article: "Pâtes 1 kg", prix: "1,60" },
  { article: "Chips", prix: "2,10" },
  { article: "Pommes", prix: "2,75" },
  { article: "Jambon, 4 tranches", prix: "3,20" },
  { article: "Soda 1,5 l", prix: "1,95" },
];
export const totalTicket = "15,95";
export const questionsLigne = ["Pour qui ?", "Pour quel moment de la semaine ?", "Par habitude, par envie, ou faute de temps ?"];

/* ---------- Les rayons ---------- */
export type Rayon = { id: string; emoji: string; nom: string; moment: string; texte: string };
export const rayons: Rayon[] = [
  { id: "petit-dej", emoji: "🥐", nom: "Le petit-déj", moment: "Les matins pressés", texte: "Le rayon des matins pressés. On regarde ce que vous prenez d'habitude, et ce que vous aimeriez y trouver." },
  { id: "apero", emoji: "🧀", nom: "L'apéro", moment: "Les vendredis soir", texte: "Le rayon des vendredis soir. On regarde ce qui part dans le caddie, sans faire la morale à personne." },
  { id: "gouter", emoji: "🍪", nom: "Le goûter", moment: "Les sorties d'école", texte: "Le rayon des sorties d'école. On regarde ce qui plaît aux enfants, et ce qui vous plaît à vous." },
];
export const seanceRayon = { duree: "45 min", prix: "50 €", lieu: "Dans le supermarché où vous faites vos courses, avec l'accord du magasin" };
export const creneauxRayon = [
  { libelle: "9 h 00", sous: "Samedi" },
  { libelle: "10 h 30", sous: "Samedi", pris: true },
  { libelle: "11 h 30", sous: "Samedi" },
  { libelle: "17 h 30", sous: "Mercredi" },
  { libelle: "18 h 15", sous: "Jeudi", pris: true },
  { libelle: "18 h 30", sous: "Vendredi" },
];

/* ---------- L'atelier étiquettes : une vraie date, à six ---------- */
export const atelierInfo = {
  date: "Samedi 16 janvier 2027",
  heure: "10 h",
  places: 6,
  duree: "1 h 15",
  prix: "15 €",
  regles: [
    "On apprend à lire une étiquette : la liste des ingrédients, le tableau, les mentions.",
    "On parle d'étiquettes, jamais du cas de chacun : à six, dans un lieu public, personne ne raconte sa santé.",
    "Au rayon frais d'un supermarché, avec l'accord du magasin. Aucune marque n'est recommandée.",
  ],
  deroule: [
    { heure: "10 h", texte: "Rendez-vous devant le rayon frais. Six personnes, une diététicienne." },
    { heure: "10 h 15", texte: "La liste des ingrédients : dans quel ordre, et pourquoi." },
    { heure: "10 h 40", texte: "Le tableau : pour 100 g, par portion, et ce que ça veut dire." },
    { heure: "11 h 15", texte: "Chacun repart avec ses courses. Personne n'a parlé de sa santé." },
  ],
};

/* ---------- Les séances et les prix (exemples, TTC) ---------- */
export const seances = [
  { id: "premiere", nom: "Première séance", lieu: "Au cabinet", duree: "1 h", prix: "55 €", detail: "Votre ticket de caisse et la photo de votre frigo. On part de là." },
  { id: "suivi", nom: "Séance de suivi", lieu: "Au cabinet", duree: "45 min", prix: "40 €", detail: "Ce qui a marché, ce qui coince, la suite." },
  { id: "rayon", nom: "Séance au rayon", lieu: "Dans votre magasin", duree: "45 min", prix: "50 €", detail: "Si vous voulez. Le rayon que vous choisissez." },
  { id: "atelier", nom: "Atelier étiquettes", lieu: "À six, au rayon frais", duree: "1 h 15", prix: "15 €", detail: "Le samedi matin." },
];

/* ---------- Les soirs : créneaux d'exemple ---------- */
export type Soir = { id: string; court: string; long: string; heures: { h: string; pris?: boolean }[] };
export const soirs: Soir[] = [
  { id: "lundi", court: "Lun.", long: "lundi", heures: [{ h: "17 h 30" }, { h: "18 h 30", pris: true }, { h: "19 h 30" }, { h: "20 h 30", pris: true }] },
  { id: "mardi", court: "Mar.", long: "mardi", heures: [{ h: "17 h 30", pris: true }, { h: "18 h 30" }, { h: "19 h 30" }, { h: "20 h 30" }] },
  { id: "mercredi", court: "Mer.", long: "mercredi", heures: [{ h: "17 h 30" }, { h: "18 h 30" }, { h: "19 h 30", pris: true }, { h: "20 h 30" }] },
  { id: "jeudi", court: "Jeu.", long: "jeudi", heures: [{ h: "17 h 30", pris: true }, { h: "18 h 30", pris: true }, { h: "19 h 30" }, { h: "20 h 30" }] },
  { id: "vendredi", court: "Ven.", long: "vendredi", heures: [{ h: "17 h 30" }, { h: "18 h 30" }, { h: "19 h 30", pris: true }] },
];

/* ---------- Diététicienne ou nutritionniste ? ---------- */
export const reponse = {
  titre: "Diététicienne ou nutritionniste ?",
  court: "Diététicienne : un titre protégé par la loi. Le voici, avec mon diplôme dessous.",
  points: [
    {
      titre: "Diététicien, un titre protégé",
      texte: "Seules les personnes titulaires des diplômes fixés par la loi peuvent exercer comme diététicien et porter ce titre. L'utiliser sans y avoir droit est puni comme une usurpation de titre.",
      source: "Code de la santé publique, art. L4371-2 et L4372-2",
    },
    {
      titre: "Et « nutritionniste » ?",
      texte: "Le mot seul ne correspond, dans ces textes, à aucun diplôme réglementé. Un « médecin nutritionniste », lui, est médecin. Si vous hésitez, demandez le diplôme : un professionnel vous le montre sans difficulté.",
      source: "",
    },
    {
      titre: "Ce que je fais",
      texte: "Des conseils nutritionnels et un bilan diététique, à partir de votre vie réelle : vos courses, votre frigo, vos soirs. Pour un trouble du métabolisme ou de l'alimentation, j'interviens sur prescription médicale.",
      source: "Code de la santé publique, art. L4371-1",
    },
    {
      titre: "Ce que je ne fais pas",
      texte: "Je ne pose pas de diagnostic de maladie, je ne promets aucun kilo et je ne vends pas de régime. Si quelque chose relève d'un médecin, je vous le dis.",
      source: "",
    },
  ],
};

/* ---------- Questions ---------- */
export const questions = [
  { q: "Est-ce que vous allez me mettre au régime ?", r: "Non. On part de ce que vous achetez et de ce que vous mangez vraiment, le mardi soir comme les autres soirs. Zéro kilo promis, pas d'avant-après." },
  { q: "Que dois-je apporter à la première séance ?", r: "Votre dernier ticket de caisse et une photo de votre frigo, prise avec votre téléphone. On part de là, ligne par ligne." },
  { q: "Dois-je envoyer la photo de mon frigo ?", r: "Non, surtout pas. Vous me la montrez en séance, elle reste sur votre téléphone. Le site ne reçoit aucune photo et n'enregistre rien." },
  { q: "Les séances au supermarché, c'est obligatoire ?", r: "Non. La première séance a lieu au cabinet. Le rayon, c'est seulement si vous en avez envie, en individuel, avec l'accord du magasin." },
  { q: "Les autres clients sauront pourquoi je suis là ?", r: "Non. On fait ses courses à deux, sans blouse ni badge. Les questions de santé, on les garde pour le cabinet." },
  { q: "Pourquoi des rendez-vous le soir ?", r: "Parce que c'est là que tout se joue, et que c'est souvent le seul moment libre. Les séances vont jusqu'à 20 h 30." },
  { q: "Combien ça coûte ?", r: "55 € la première séance d'une heure, 40 € le suivi de 45 minutes, 50 € la séance au rayon, 15 € l'atelier (prix d'exemple, TTC). Facture à chaque séance." },
];
