// Tout ce qu'affiche le site de Minute Quarante, photographe de famille imaginaire.
// L'entreprise est fictive : chaque prix, chaque date est un exemple, et le site le dit.
//
// Règles tenues ici :
//   - téléphone pris dans la tranche que l'ARCEP réserve à la fiction (01 99 00 xx xx) ;
//   - aucune adresse e-mail, aucune adresse postale réelle ;
//   - aucune photo de visage : des mains, des dos, des vêtements, des tirages ;
//   - aucun avis, aucune note, aucun « 500 familles » ;
//   - le droit à l'image (Code civil, art. 9) : rien n'est publié sans accord écrit.

export const DOSSIER = "/exemples/minute-quarante";

export const entreprise = {
  nom: "Minute Quarante",
  metier: "Photographe de famille",
  telephone: "01 99 00 40 40",
  telephoneLien: "+33199004040",
  zone: "En extérieur, à 30 km autour de chez toi",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/seance-famille`, libelle: "La séance" },
  { href: `${DOSSIER}/s-habiller`, libelle: "S'habiller" },
  { href: `${DOSSIER}/reserver`, libelle: "Réserver" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };

const P = DOSSIER;
export const photos = {
  minute1: { src: `${P}/minute-1.webp`, largeur: 1100, hauteur: 1650, alt: "La main d'un adulte qui tient sagement celle d'un enfant, sur un trottoir pavé" },
  minute40: { src: `${P}/minute-40.webp`, largeur: 1400, hauteur: 933, alt: "Deux petites filles, vues de dos, qui courent dans les hautes herbes au soleil couchant" },
  troisCouleurs: { src: `${P}/trois-couleurs.webp`, largeur: 1100, hauteur: 1651, alt: "Trois pulls pliés et empilés : beige, brun chiné et moutarde" },
  tirages: { src: `${P}/tirage-mer.webp`, largeur: 1300, hauteur: 867, alt: "Un tirage instantané d'un bord de mer, posé sur des enveloppes de couleur" },
  ratee: { src: `${P}/la-ratee.webp`, largeur: 1000, hauteur: 1500, alt: "Une photo complètement floue : des silhouettes qui courent sur une pelouse" },
} satisfies Record<string, Photo>;

/** Ce qu'on voit sur le curseur de l'accueil, minute après minute. */
export const MINUTES = [
  { jusqua: 5, titre: "Tout le monde se tient droit.", texte: "Personne ne sait quoi faire de ses mains. C'est normal : on commence toujours par là." },
  { jusqua: 15, titre: "Le plus petit a trouvé un bâton.", texte: "On le suit. L'appareil reste à hauteur de hanche, on parle d'autre chose." },
  { jusqua: 29, titre: "Plus personne ne regarde l'objectif.", texte: "On marche, on se dispute un peu pour savoir qui porte qui. Ça commence." },
  { jusqua: 40, titre: "Ils ont oublié l'appareil.", texte: "C'est la minute qu'on vend. Et c'est là qu'on déclenche le plus." },
];

export const DEROULE = [
  { minute: "1", titre: "Bonjour, on marche", texte: "Pas de pose. On se présente, on marche dix minutes ensemble. L'appareil est là, il ne fait rien." },
  { minute: "10", titre: "Un jeu, pas une pose", texte: "Une course, une cachette, un secret à se dire à l'oreille. On photographie ce qui se passe." },
  { minute: "25", titre: "Les grands, seuls", texte: "Cinq minutes pour les parents, pendant que les enfants cherchent des cailloux." },
  { minute: "40", titre: "La minute qu'on vend", texte: "Plus personne ne pense à l'appareil. On ne s'arrête pas là : c'est le meilleur moment." },
  { minute: "60", titre: "La photo ratée", texte: "On finit toujours par une photo ratée exprès. Tout le monde en rit, et on se dit au revoir." },
];

export const SEANCE = {
  nom: "Séance famille",
  duree: "1 heure",
  prix: "290 €",
  photos: 25,
  compris: [
    "Une heure de séance, en extérieur, à 30 km autour de chez toi",
    "Jusqu'à six personnes, enfants compris",
    "25 photos retouchées, choisies avec toi",
    "Une galerie privée pour les télécharger, sans limite de temps",
    "La photo ratée, offerte, si tu la veux",
  ],
  pasCompris: [
    "Les tirages et l'album : en option, ci-dessous",
    "Les déplacements au-delà de 30 km : 0,50 € TTC du kilomètre (exemple)",
  ],
};

export const OPTIONS = [
  { nom: "Tirage 20 × 30", detail: "Papier mat, bord blanc", prix: 25 },
  { nom: "Lot de 10 tirages 13 × 18", detail: "Les dix que tu préfères", prix: 60 },
  { nom: "Album de 20 pages", detail: "Couverture en lin", prix: 140 },
];

export type Palette = { id: string; nom: string; couleurs: [string, string, string]; noms: [string, string, string]; idee: string };

/** Trois couleurs qui vont ensemble : une par personne, ou presque. */
export const PALETTES: Palette[] = [
  { id: "sable", nom: "Sable", couleurs: ["#D9C3A5", "#8A6A4F", "#F2EBDD"], noms: ["beige", "noisette", "écru"], idee: "Pour la plage et les champs en été : rien ne jure avec le ciel." },
  { id: "foret", nom: "Forêt", couleurs: ["#4F5D45", "#C08A3E", "#E9E1D2"], noms: ["kaki", "moutarde", "crème"], idee: "Pour l'automne en forêt : les feuilles font le reste." },
  { id: "ardoise", nom: "Ardoise", couleurs: ["#3E4B5B", "#9DB0C2", "#F1F0EC"], noms: ["bleu ardoise", "bleu gris", "blanc cassé"], idee: "Pour la ville et les jours gris : sobre, jamais triste." },
  { id: "brique", nom: "Brique", couleurs: ["#A4482E", "#E2B79A", "#5A4636"], noms: ["brique", "rose poudré", "chocolat"], idee: "Pour un parc en octobre : chaud, sans être criard." },
];

export const REGLES = [
  { id: "couleurs", titre: "Trois couleurs qui vont ensemble", texte: "Pas tous en blanc, pas tous en jean : trois couleurs, réparties entre vous. Une par personne, ou presque." },
  { id: "logo", titre: "Pas de gros logo", texte: "Un logo, c'est la seule chose qu'on regarde sur la photo. Dans vingt ans aussi. Les petites rayures et les motifs discrets, oui." },
  { id: "chaussures", titre: "Des chaussures où tu es bien", texte: "On marche, on court, on s'assoit dans l'herbe. Les chaussures neuves, c'est pour une autre fois." },
];

export const VEILLE = [
  "Les vêtements de chacun posés sur une chaise",
  "Une veste en plus, s'il fait frais",
  "Le goûter des enfants (il servira)",
  "Un jouet qu'ils aiment, pour les dix premières minutes",
  "Rien à apprendre : on ne fait pas poser",
];

export type Creneau = { libelle: string; sous: string; pris?: boolean };

/** Novembre 2026. Les créneaux « pris » sont un exemple, et la page le dit. */
export const CRENEAUX: Creneau[] = [
  { libelle: "Sam. 14 nov.", sous: "10 h · en extérieur", pris: true },
  { libelle: "Sam. 14 nov.", sous: "15 h · en extérieur", pris: true },
  { libelle: "Dim. 15 nov.", sous: "10 h · en extérieur" },
  { libelle: "Sam. 21 nov.", sous: "10 h · en extérieur" },
  { libelle: "Sam. 21 nov.", sous: "15 h · en extérieur", pris: true },
  { libelle: "Dim. 22 nov.", sous: "14 h · en extérieur" },
  { libelle: "Sam. 28 nov.", sous: "10 h · en extérieur" },
  { libelle: "Dim. 29 nov.", sous: "15 h · en extérieur" },
];

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  { q: "Et si mon enfant ne veut pas être pris en photo ?", r: "Il a le droit. On ne le force jamais : on joue, on marche, et en général il revient de lui-même vers la minute quinze. S'il ne revient pas, on photographie le reste de la famille et on décale sa partie." },
  { q: "Et s'il pleut ?", r: "On décale, sans frais, jusqu'à la veille au soir. Une petite pluie fine, en revanche, donne souvent les plus belles photos." },
  { q: "Combien de temps pour recevoir les photos ?", r: "Trois semaines au plus (exemple). Tu choisis les 25 avec moi, sur une galerie privée, puis je les retouche." },
  { q: "Vous publiez nos photos ?", r: "Non, sauf si tu dis oui, par écrit, photo par photo. Pour un enfant, il faut l'accord de ses deux parents. Sans accord, tes photos restent dans ta galerie privée, et nulle part ailleurs." },
  { q: "Pourquoi une photo ratée ?", r: "Parce que tout le monde est gêné au début, et que la voir aide les suivants. Elle n'est publiée qu'avec ton accord écrit ; sinon, elle est à toi, et c'est tout." },
];
