// La boutique de fleurs imaginaire « Douze Mois », montrée dans les deux vidéos des
// fleuristes : « Créer une marque » (le nom, le calendrier qu'on feuillette, pas une
// rose à la Saint-Valentin, la vidéo du premier du mois) et « Remplir l'agenda »
// (« c'est pour dire quoi ? », le bouquet et la phrase écrite à la main, l'heure
// limite en gros). Les deux se tiennent : on dit ce qu'on veut dire, et le bouquet
// est fait de ce qui fleurit en France ce mois-ci.
//
// Le calendrier est indicatif : février (mimosa), mai (pivoine) et septembre (dahlia)
// viennent de la vidéo et de ses sources ; les autres mois suivent les listes de saison
// publiées pour les fleuristes. Ils varient selon la région et l'année : le site le
// dit. Prix, heure limite et zone de livraison sont des exemples ; le téléphone est
// dans la tranche que l'ARCEP réserve à la fiction.

export const DOSSIER = "/exemples/douze-mois";

export const boutique = {
  nom: "Douze Mois",
  telephone: "06 39 98 27 12",
  telephoneLien: "+33639982712",
  adresse: "12 rue de l'Exemple",
  ville: "00000 Exemple-Ville",
  horaires: "Du mardi au samedi, 9 h 30 – 19 h",
  livraisons: "Livraisons du mardi au samedi, de 10 h à 19 h",
  heureLimite: "14 h",
  livraison: 6,
};

export const NAVIGATION = [
  { href: `${DOSSIER}/calendrier`, libelle: "Le calendrier" },
  { href: `${DOSSIER}/la-carte`, libelle: "La carte" },
  { href: `${DOSSIER}/livraison`, libelle: "Livraison" },
  { href: `${DOSSIER}/saint-valentin`, libelle: "14 février" },
];

export const euros = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).replace(/ | /g, " ") + " €";

/* ---------- Les photos ----------
   Pexels et Unsplash (usage commercial permis), servies depuis notre domaine ;
   crédits dans les mentions légales. Aucun visage, aucune enseigne. */
export type Photo = { src: string; alt: string; largeur: number; hauteur: number };
const P = DOSSIER;
export const PHOTOS = {
  anemone: { src: `${P}/m01-anemone.webp`, alt: "Une anémone rouge au cœur noir, parmi ses feuilles", largeur: 1100, hauteur: 1467 },
  mimosa: { src: `${P}/m02-mimosa.webp`, alt: "Une branche de mimosa en fleur dans la lumière du soir, sur un fond sombre", largeur: 1100, hauteur: 1650 },
  narcisse: { src: `${P}/m03-narcisse.webp`, alt: "Des narcisses jaunes dans un vase, sur un fond noir", largeur: 1100, hauteur: 1467 },
  tulipe: { src: `${P}/m04-tulipe.webp`, alt: "Des tulipes orangées à demi ouvertes, dans la pénombre", largeur: 1800, hauteur: 1200 },
  pivoine: { src: `${P}/m05-pivoine.webp`, alt: "Trois pivoines roses sur un feuillage sombre", largeur: 1100, hauteur: 1467 },
  rose: { src: `${P}/m06-rose.webp`, alt: "Un bouquet de roses de jardin, corail et vieux rose, sur un fond sombre", largeur: 1600, hauteur: 1067 },
  tournesol: { src: `${P}/m07-tournesol.webp`, alt: "Des tournesols dans un vase blanc, devant un feuillage", largeur: 1100, hauteur: 1510 },
  hortensia: { src: `${P}/m08-hortensia.webp`, alt: "Des têtes d'hortensias roses, rouges et blanches, en gros plan", largeur: 1100, hauteur: 1650 },
  dahlia: { src: `${P}/m09-dahlia.webp`, alt: "Un dahlia rose pâle épanoui parmi des feuilles sombres", largeur: 1100, hauteur: 1465 },
  aster: { src: `${P}/m10-aster.webp`, alt: "Des asters mauves au cœur jaune, en automne", largeur: 1100, hauteur: 1650 },
  chardon: { src: `${P}/m11-chardon.webp`, alt: "Un chardon séché, doré, sur un fond noir", largeur: 1600, hauteur: 1068 },
  hellebore: { src: `${P}/m12-hellebore.webp`, alt: "Une hellébore blanche parmi ses feuilles vertes", largeur: 1100, hauteur: 1650 },
  dahliasJardin: { src: `${P}/dahlias-jardin.webp`, alt: "Des dahlias orangés en pleine floraison, dans un jardin", largeur: 1920, hauteur: 1280 },
  mimosaLarge: { src: `${P}/mimosa-large.webp`, alt: "Des grappes de mimosa jaune vif au soleil", largeur: 1920, hauteur: 1223 },
  mimosaBranche: { src: `${P}/mimosa.webp`, alt: "Une branche de mimosa en fleur sur un fond gris clair", largeur: 900, hauteur: 1350 },
  pivoineBlanche: { src: `${P}/pivoine.webp`, alt: "Une pivoine blanche sur sa tige, sur un fond gris clair", largeur: 900, hauteur: 1350 },
  dahliaBlanc: { src: `${P}/dahlia.webp`, alt: "Un dahlia blanc au cœur rose, sur un fond blanc", largeur: 900, hauteur: 675 },
  atelierAutomne: { src: `${P}/atelier-automne.webp`, alt: "De dos, une fleuriste compose un bouquet d'automne sur une table en bois", largeur: 1800, hauteur: 1200 },
  atelier: { src: `${P}/atelier.webp`, alt: "Une main tient des sécateurs sur un plan de travail en marbre, à côté d'un dahlia", largeur: 1400, hauteur: 933 },
  carteEcrite: { src: `${P}/carte-ecrite.webp`, alt: "Une carte écrite à la main posée à côté d'un bouquet", largeur: 1100, hauteur: 1650 },
  velo: { src: `${P}/velo.webp`, alt: "Un vélo blanc et son panier de fleurs, sur un tapis de feuilles mortes", largeur: 1100, hauteur: 1650 },
  bouquetBlanc: { src: `${P}/bouquet-blanc.webp`, alt: "Un bouquet de renoncules blanches tenu à deux mains", largeur: 900, hauteur: 1350 },
  bouquetJaune: { src: `${P}/bouquet-jaune.webp`, alt: "Un bouquet de fleurs jaunes sur un fond noir", largeur: 900, hauteur: 1200 },
  bouquetRose: { src: `${P}/bouquet-rose.webp`, alt: "Un bouquet de fleurs roses et de petites fleurs, emballé dans du papier clair", largeur: 900, hauteur: 1200 },
} satisfies Record<string, Photo>;

export type CleePhoto = keyof typeof PHOTOS;

/* ---------- Le calendrier ---------- */
export type Ton = "blanc" | "vif" | "tendre";

export type Mois = {
  n: number;
  nom: string;
  court: string;
  fleur: string;
  photo: CleePhoto;
  aussi: string[];
  arrive: string;
  part: string;
  mot: string;
  /** Les trois bouquets du mois, selon ce qu'on veut dire. */
  bouquets: Record<Ton, string>;
};

export const MOIS: Mois[] = [
  { n: 1, nom: "Janvier", court: "Janv.", fleur: "Anémone", photo: "anemone", aussi: ["renoncule", "hellébore"], arrive: "le mimosa", part: "le houx", mot: "Le mois le plus maigre. Et pourtant, les premières anémones.",
    bouquets: { blanc: "anémones blanches et hellébores", vif: "renoncules orangées et anémones rouges", tendre: "anémones roses et renoncules" } },
  { n: 2, nom: "Février", court: "Févr.", fleur: "Mimosa", photo: "mimosa", aussi: ["anémone", "jacinthe"], arrive: "le narcisse", part: "l'hellébore", mot: "Le soleil en branches, au cœur de l'hiver.",
    bouquets: { blanc: "anémones blanches et jacinthes", vif: "du mimosa, rien que du mimosa", tendre: "anémones roses et jacinthes" } },
  { n: 3, nom: "Mars", court: "Mars", fleur: "Narcisse", photo: "narcisse", aussi: ["tulipe", "renoncule"], arrive: "la tulipe", part: "le mimosa", mot: "Le printemps arrive par le jaune.",
    bouquets: { blanc: "narcisses blancs et renoncules", vif: "jonquilles et tulipes jaunes", tendre: "tulipes roses et renoncules" } },
  { n: 4, nom: "Avril", court: "Avr.", fleur: "Tulipe", photo: "tulipe", aussi: ["renoncule", "lilas"], arrive: "la pivoine", part: "l'anémone", mot: "Des tulipes partout. Elles bougent encore dans le vase.",
    bouquets: { blanc: "tulipes blanches et lilas blanc", vif: "tulipes orangées et renoncules", tendre: "tulipes roses et lilas" } },
  { n: 5, nom: "Mai", court: "Mai", fleur: "Pivoine", photo: "pivoine", aussi: ["lilas", "iris"], arrive: "la rose", part: "la tulipe", mot: "Trois semaines de pivoines. Pas une de plus.",
    bouquets: { blanc: "pivoines blanches et lilas blanc", vif: "iris et marguerites", tendre: "des pivoines roses, rien d'autre" } },
  { n: 6, nom: "Juin", court: "Juin", fleur: "Rose", photo: "rose", aussi: ["pivoine", "marguerite"], arrive: "le tournesol", part: "la pivoine", mot: "Enfin des roses. Elles ont attendu leur tour.",
    bouquets: { blanc: "roses blanches et marguerites", vif: "roses jaunes et camomille", tendre: "roses de jardin, rouges et roses" } },
  { n: 7, nom: "Juillet", court: "Juil.", fleur: "Tournesol", photo: "tournesol", aussi: ["lavande", "glaïeul"], arrive: "l'hortensia", part: "la marguerite", mot: "Des bouquets hauts comme l'été.",
    bouquets: { blanc: "glaïeuls blancs et lavande", vif: "des tournesols, en brassée", tendre: "glaïeuls roses et lavande" } },
  { n: 8, nom: "Août", court: "Août", fleur: "Hortensia", photo: "hortensia", aussi: ["dahlia", "tournesol"], arrive: "le cosmos", part: "la lavande", mot: "Les grosses têtes de l'été, avant la rentrée.",
    bouquets: { blanc: "hortensias blancs", vif: "tournesols et dahlias jaunes", tendre: "hortensias roses et premiers dahlias" } },
  { n: 9, nom: "Septembre", court: "Sept.", fleur: "Dahlia", photo: "dahlia", aussi: ["cosmos", "aster"], arrive: "l'aster", part: "le tournesol", mot: "Le mois des dahlias. Le plus beau, peut-être.",
    bouquets: { blanc: "dahlias blancs et cosmos", vif: "dahlias orangés et rudbeckias", tendre: "dahlias roses et cosmos" } },
  { n: 10, nom: "Octobre", court: "Oct.", fleur: "Aster", photo: "aster", aussi: ["derniers dahlias", "graminées"], arrive: "le chardon", part: "le dahlia, au premier gel", mot: "Les derniers dahlias, jusqu'au premier gel.",
    bouquets: { blanc: "derniers dahlias blancs, asters et graminées", vif: "dahlias orangés et graminées dorées", tendre: "asters mauves et derniers dahlias rouges" } },
  { n: 11, nom: "Novembre", court: "Nov.", fleur: "Chardon", photo: "chardon", aussi: ["graminées", "feuillages"], arrive: "l'hellébore", part: "l'aster", mot: "Peu de fleurs. On le dit, et on fait de beaux feuillages.",
    bouquets: { blanc: "chardons argentés, graminées claires et feuillages", vif: "feuillages d'automne et graminées dorées", tendre: "chardons, baies et feuillages rouges" } },
  { n: 12, nom: "Décembre", court: "Déc.", fleur: "Hellébore", photo: "hellebore", aussi: ["anémone", "camélia"], arrive: "l'anémone", part: "le chardon", mot: "La rose de Noël, qui n'est pas une rose.",
    bouquets: { blanc: "hellébores blanches et branches", vif: "branches, baies et feuillages dorés", tendre: "anémones rouges et hellébores roses" } },
];

/** « de mai », « d'octobre ». */
export const deMois = (m: Mois) => (/^[aeiouyéèêàâîôûAEIOUYÉ]/.test(m.nom) ? "d'" : "de ") + m.nom.toLowerCase();

/** Les trois prochains « premier du mois », vus depuis octobre : la fleur qui arrive, celle qui s'en va. */
export const PREMIERS = [MOIS[10], MOIS[11], MOIS[0]];

/* ---------- C'est pour dire quoi ? ---------- */
export type Message = { id: string; dire: string; ton: Ton; prix: number; phrases: string[] };

export const NOM_TON: Record<Ton, string> = { blanc: "blanc", vif: "vif", tendre: "tendre" };

export const MESSAGES: Message[] = [
  { id: "merci", dire: "Merci", ton: "vif", prix: 39, phrases: ["Merci. Vraiment.", "Sans toi, je n'y serais pas arrivé.", "Merci pour tout, et pour le reste."] },
  { id: "bravo", dire: "Bravo", ton: "vif", prix: 45, phrases: ["Bravo. Je savais que tu y arriverais.", "Tu l'as fait. Je suis fier de toi.", "Ce n'était pas de la chance."] },
  { id: "pense", dire: "Je pense à toi", ton: "blanc", prix: 42, phrases: ["Je pense à toi. Même quand je ne le dis pas.", "Je suis là, si tu veux.", "Un bouquet, juste pour te dire que je pense à toi."] },
  { id: "pardon", dire: "Pardon", ton: "blanc", prix: 45, phrases: ["Pardon pour hier. Tu avais raison.", "J'ai eu tort. Je t'invite à dîner ?", "Je suis désolé. Vraiment."] },
  { id: "anniversaire", dire: "Joyeux anniversaire", ton: "tendre", prix: 49, phrases: ["Joyeux anniversaire. Encore cent comme ça.", "Tu ne fais pas ton âge. Et je sais lequel.", "Un an de plus, et toujours le même sourire."] },
  { id: "aime", dire: "Je t'aime", ton: "tendre", prix: 55, phrases: ["Je t'aime. C'est tout.", "Encore toi. Toujours toi.", "Rien à ajouter."] },
];

/** La page « La carte » : ce que les gens cherchent — « message bouquet de fleur amour,
 * anniversaire, amitié » (suggestions Google, 15/10/2026) —, des phrases toutes prêtes. */
export const CARTES: { occasion: string; phrases: string[] }[] = [
  { occasion: "Pour dire je t'aime", phrases: ["Je t'aime. C'est tout.", "Encore toi. Toujours toi.", "Je t'aurais bien écrit un poème. Voilà des fleurs."] },
  { occasion: "Pour un anniversaire", phrases: ["Joyeux anniversaire. Encore cent comme ça.", "Tu ne fais pas ton âge. Et je sais lequel.", "Bon anniversaire à la personne qui m'a appris à souffler les bougies."] },
  { occasion: "Pour un ami, une amie", phrases: ["Pour rien. Juste parce que tu es là.", "Tu me manques. On se voit quand ?", "Merci d'être toi, depuis toutes ces années."] },
  { occasion: "Pour dire merci", phrases: ["Merci. Vraiment.", "Sans toi, je n'y serais pas arrivé.", "Merci pour le dîner, et pour tout le reste."] },
  { occasion: "Pour se faire pardonner", phrases: ["Pardon pour hier. Tu avais raison.", "J'ai eu tort. Je t'invite à dîner ?", "Je ne recommencerai pas. (J'essaierai.)"] },
];

/* ---------- Le récit : trois gestes, et ta signature ---------- */
export const GESTES: { titre: string; surtitre: string; texte: string; photo: CleePhoto }[] = [
  { surtitre: "D'abord", titre: "Tu dis ce que tu veux dire.", texte: "Merci, bravo, pardon… Une question, pas quarante vignettes qui s'appellent toutes Tendresse.", photo: "carteEcrite" },
  { surtitre: "Ensuite", titre: "On compose avec ce qui fleurit.", texte: "Le bouquet est fait de ce qui fleurit en France ce mois-ci. La phrase est écrite à la main, à l'encre, sur la carte.", photo: "atelierAutomne" },
  { surtitre: "Enfin", titre: "Tu signes. On livre.", texte: "Commandé avant 14 h, livré aujourd'hui dans la ville, du mardi au samedi. Après 14 h : demain matin.", photo: "velo" },
];

/* ---------- Le bouquet du mois (abonnement) ---------- */
export const ABONNEMENT = [
  { nom: "Le petit", pour: "pour une table de chevet", prix: 29 },
  { nom: "Le moyen", pour: "pour la table du salon", prix: 45 },
  { nom: "Le grand", pour: "pour l'entrée, ou pour offrir", prix: 65 },
];

/* ---------- Questions ---------- */
export const QUESTIONS: { q: string; r: string }[] = [
  { q: "Et si je veux des roses rouges en janvier ?", r: "On n'en a pas. En janvier, en France, les roses ne fleurissent pas dehors. On te proposera des anémones : demande-leur, elles ont du caractère." },
  { q: "Commandé avant 14 h, c'est vraiment livré aujourd'hui ?", r: "Oui, du mardi au samedi, dans la zone de livraison. C'est une promesse : si on ne peut pas la tenir un jour (un vélo en panne, une tempête), le site le dit dès le matin, avant que tu commandes." },
  { q: "Qui écrit la carte ?", r: "Nous, à la main, à l'encre, avec la phrase que tu as choisie ou écrite. Tu signes en ligne, on recopie ta signature en toutes lettres." },
  { q: "D'où viennent les fleurs ?", r: "De producteurs installés en France. Sur un vrai site, on les nommerait, avec leur région. Ici, la boutique est fictive." },
  { q: "Le calendrier est exact ?", r: "Il est indicatif : une saison avance ou recule d'une ou deux semaines selon la région et l'année. Chaque mois, on le confirme avec nos producteurs avant le premier." },
  { q: "Et en novembre, quand il n'y a presque rien ?", r: "On le dit. Chardons, graminées, feuillages, branches : on fait de beaux bouquets avec ce que la saison donne, sans aller chercher ailleurs ce qu'elle ne donne pas." },
  { q: "Les bouquets ressemblent aux photos ?", r: "Dans l'esprit et la couleur, oui. Les fleurs exactes dépendent de l'arrivage du jour et du mois : on te le dit au téléphone si tu veux savoir." },
];
