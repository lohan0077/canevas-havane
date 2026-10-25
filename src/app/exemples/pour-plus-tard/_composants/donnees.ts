// Tout ce qu'affiche le site de Pour Plus Tard, studio photo de famille imaginaire, filmé
// dans les deux vidéos des photographes :
//   - « Créer une marque » : le nom, pas des fichiers mais la photo que tes petits-enfants
//     retrouveront dans un tiroir ; une seule formule, une séance et une boîte de vingt
//     tirages livrée chez toi ; la vitrine des plus vieilles photos du quartier ;
//   - « Remplir l'agenda » (ancien site Minute Quarante) : pas de portfolio, la minute 1 et
//     la minute 40 ; une page « comment s'habiller » (trois couleurs, pas de gros logo) ; le
//     prix affiché ; la photo ratée, publiée avec l'accord de chacun ; les créneaux.
// Entreprise fictive : chaque prix, chaque date est un exemple, et le site le dit.
//
// Règles tenues ici :
//   - téléphone dans la tranche ARCEP réservée à la fiction (01 99 00 xx xx) ;
//   - aucune adresse e-mail, aucune adresse postale réelle ;
//   - aucune photo de visage : des mains, des dos, des albums, des tirages ;
//   - aucun avis, aucune note, aucune fausse rareté ; prix TTC marqués « exemple » ;
//   - droit à l'image (C. civ., art. 9) : rien n'est publié sans accord écrit, et pour un
//     enfant, celui de ses deux parents ; la vitrine : accord de chacun, et prudence sur
//     le droit d'auteur des vieux portraits de studio (CPI, art. L122-2 et L123-1).

export const DOSSIER = "/exemples/pour-plus-tard";

export const studio = {
  nom: "Pour Plus Tard",
  baseline: "Des photos qu'on garde.",
  metier: "Studio photo de famille",
  telephone: "01 99 00 20 20",
  zone: "Chez toi ou dehors, à 30 km autour du studio",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#minutes`, libelle: "Minute 1, minute 40" },
  { href: `${DOSSIER}/la-boite`, libelle: "La séance et la boîte" },
  { href: `${DOSSIER}/s-habiller`, libelle: "S'habiller" },
  { href: `${DOSSIER}/la-vitrine`, libelle: "La vitrine" },
];

/* ---------- Les photos ----------
   Unsplash et Pexels, servies depuis notre domaine ; crédits dans les mentions légales.
   Aucun visage reconnaissable. */
export type Photo = { src: string; alt: string };
const P = DOSSIER;
export const photos = {
  minute1: { src: `${P}/minute-1.webp`, alt: "La main d'un adulte qui tient sagement celle d'un enfant, sur un trottoir pavé" },
  minute40: { src: `${P}/minute-40.webp`, alt: "Deux petites filles, vues de dos, qui courent dans les hautes herbes au soleil couchant" },
  troisCouleurs: { src: `${P}/trois-couleurs.webp`, alt: "Trois pulls pliés et empilés : beige, brun chiné et moutarde" },
  tirageMer: { src: `${P}/tirage-mer.webp`, alt: "Un tirage instantané d'un bord de mer, posé sur des enveloppes de couleur" },
  ratee: { src: `${P}/la-ratee.webp`, alt: "Une photo complètement floue : des silhouettes qui courent sur une pelouse" },
  pageQuiAttend: { src: `${P}/page-qui-attend.webp`, alt: "Les pages vides d'un vieil album photo, l'ombre d'une branche posée dessus" },
  vieuxTirage: { src: `${P}/vieux-tirage.webp`, alt: "Un vieux tirage en noir et blanc d'une maison au pied d'une colline, posé sur un carton kraft" },
  albumFleurs: { src: `${P}/album-fleurs.webp`, alt: "Un album ancien à la couverture dorée, trois œillets séchés posés dessus" },
  boite1942: { src: `${P}/boite-1942.webp`, alt: "Le couvercle usé d'une vieille boîte, l'année 1942 gravée dessus" },
  colis: { src: `${P}/colis.webp`, alt: "Un colis en papier kraft ficelé, une enveloppe et une carte blanche" },
} satisfies Record<string, Photo>;

/* ---------- La seule formule ---------- */

export const FORMULE = {
  nom: "Séance + boîte de 20 tirages",
  prix: "390 €",
  details: [
    "Une séance d'une heure, chez toi ou dehors",
    "Jusqu'à six personnes, enfants compris",
    "Vingt tirages 13 × 18, papier mat, choisis avec toi",
    "Une boîte toilée, à ton nom",
    "Les fichiers sur une clé, au fond de la boîte",
    "Livrée chez toi, trois semaines après la séance",
  ],
  pasCompris: [
    "Une seconde boîte de vingt tirages : 120 € TTC (exemple)",
    "Les déplacements au-delà de 30 km : 0,50 € TTC du kilomètre (exemple)",
  ],
};

/** Ce qu'on voit sur le curseur de l'accueil, minute après minute. */
export const MINUTES = [
  { jusqua: 5, titre: "Tout le monde se tient droit.", texte: "Personne ne sait quoi faire de ses mains. C'est normal : on commence toujours par là." },
  { jusqua: 15, titre: "Le plus petit a trouvé un bâton.", texte: "On le suit. L'appareil reste à hauteur de hanche, on parle d'autre chose." },
  { jusqua: 29, titre: "Plus personne ne regarde l'objectif.", texte: "On marche, on se dispute un peu pour savoir qui porte qui. Ça commence." },
  { jusqua: 40, titre: "Ils ont oublié l'appareil.", texte: "C'est la minute qu'on garde. Et c'est là qu'on déclenche le plus." },
];

export const DEROULE = [
  { minute: "1", titre: "Bonjour, on marche", texte: "Pas de pose. On se présente, on marche dix minutes ensemble. L'appareil est là, il ne fait rien." },
  { minute: "10", titre: "Un jeu, pas une pose", texte: "Une course, une cachette, un secret à se dire à l'oreille. On photographie ce qui se passe." },
  { minute: "40", titre: "Ils ont oublié l'appareil", texte: "Plus personne n'y pense. On ne s'arrête pas là : c'est le meilleur moment." },
  { minute: "60", titre: "La photo ratée", texte: "On finit toujours par une photo ratée exprès. Tout le monde en rit, et on se dit au revoir." },
];

export const COMPARAISON = [
  { quoi: "Ce que tu reçois", habitude: "Cinquante fichiers", ici: "Vingt tirages" },
  { quoi: "Où ça finit", habitude: "Dans un téléphone que tu changeras", ici: "Dans un tiroir, chez toi" },
  { quoi: "Combien de temps", habitude: "Un lien qui expire", ici: "Le temps que la boîte dure" },
  { quoi: "Qui les regarde", habitude: "Toi, une fois", ici: "Tes petits-enfants, un jour de pluie" },
];

export const INVENTAIRE = [
  { n: "01", titre: "Vingt tirages 13 × 18", texte: "Papier mat, bord blanc. Choisis avec toi, à la table de la cuisine, pas par un algorithme." },
  { n: "02", titre: "Une boîte toilée, à ton nom", texte: "Lin gris, coins renforcés. L'étiquette porte ton nom et la date de la séance." },
  { n: "03", titre: "Au dos de chaque tirage", texte: "La date et le lieu, au crayon. Les prénoms, c'est toi qui les écris : dans cinquante ans, personne ne s'en souviendra." },
  { n: "04", titre: "Les fichiers, aussi", texte: "Sur une clé, au fond de la boîte. Pour les partager, pas pour les garder." },
  { n: "05", titre: "Une page vide", texte: "Pour écrire ce jour-là, en quelques lignes. C'est souvent ce qu'on relit en premier." },
];

export const CONSEILS = [
  { titre: "En imprimer vingt, pas deux cents", texte: "Un tri qui fait mal sur le moment, et qui rend la boîte lisible dans trente ans." },
  { titre: "Écrire au dos", texte: "Qui, où, quand. Au crayon à papier : l'encre traverse et bave." },
  { titre: "Les ranger à l'abri", texte: "Loin de la lumière et de l'humidité. Une boîte fermée dans un placard, pas une cave." },
];

/* ---------- S'habiller ---------- */

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

/* ---------- Réserver ---------- */

export type Creneau = { id: string; jour: string; heure: string; pris?: boolean };

/** Novembre 2026. Les créneaux « pris » sont un exemple, et la page le dit. */
export const CRENEAUX: Creneau[] = [
  { id: "sam-14-10h", jour: "Sam. 14 nov.", heure: "10 h", pris: true },
  { id: "sam-14-15h", jour: "Sam. 14 nov.", heure: "15 h", pris: true },
  { id: "dim-15-10h", jour: "Dim. 15 nov.", heure: "10 h" },
  { id: "sam-21-10h", jour: "Sam. 21 nov.", heure: "10 h" },
  { id: "sam-21-15h", jour: "Sam. 21 nov.", heure: "15 h", pris: true },
  { id: "dim-22-14h", jour: "Dim. 22 nov.", heure: "14 h" },
  { id: "sam-28-10h", jour: "Sam. 28 nov.", heure: "10 h" },
  { id: "dim-29-15h", jour: "Dim. 29 nov.", heure: "15 h" },
];

/* ---------- La vitrine ---------- */

export const VITRINE = { dates: "du 2 au 28 novembre 2026" };

/** Le mur de la vitrine : des cadres dessinés, l'année seulement. Aucune photo réelle. */
export const MUR = ["1931", "1948", "1952", "1957", "1963", "1968", "1974", "1979", "1986", "1991", "1998"];

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  { q: "Pourquoi seulement vingt tirages ?", r: "Parce qu'une boîte de vingt, on l'ouvre. Une clé de cinq cents fichiers, on ne l'ouvre jamais. Si tu en veux plus, une seconde boîte existe." },
  { q: "On a les fichiers quand même ?", r: "Oui, sur une clé au fond de la boîte. Ils servent à partager ; les tirages, eux, servent à garder." },
  { q: "Et si mon enfant ne veut pas être pris en photo ?", r: "Il a le droit. On ne le force jamais : on joue, on marche, et en général il revient de lui-même vers la minute quinze. S'il ne revient pas, on photographie le reste de la famille." },
  { q: "Et s'il pleut ?", r: "On décale, sans frais, jusqu'à la veille au soir. Une petite pluie fine, en revanche, donne souvent les plus belles photos." },
  { q: "Vous publiez nos photos ?", r: "Non, sauf si tu dis oui, par écrit, photo par photo. Pour un enfant, il faut l'accord de ses deux parents. Sans accord, tes photos restent dans ta boîte, et nulle part ailleurs." },
  { q: "Pourquoi une photo ratée ?", r: "Parce que tout le monde est gêné au début, et que la voir aide les suivants. Elle n'est publiée qu'avec ton accord écrit ; sinon, elle est à toi, et c'est tout." },
];
