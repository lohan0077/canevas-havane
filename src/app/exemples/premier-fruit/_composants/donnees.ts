// Les données du site Premier Fruit, pépinière fictive d'arbres fruitiers. Tout est
// exemple : prix, années de récolte, numéros. Les années de première récolte sont des
// estimations d'ordre de grandeur pour un arbre planté en novembre 2026 ; elles
// dépendent de la variété, du porte-greffe, de l'âge du plant et du sol.

export const DOSSIER = "/exemples/premier-fruit";

export const CONTACT = {
  telephone: "01 99 00 25 11", // tranche réservée à la fiction par l'ARCEP
  adresse: "12 chemin de l'Exemple · Nord Ardèche",
  horaires: "Du mercredi au samedi, 9 h – 18 h, d'octobre à avril",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/arbres`, libelle: "Nos arbres" },
  { href: `${DOSSIER}#recolte`, libelle: "Ta récolte" },
  { href: `${DOSSIER}/sainte-catherine`, libelle: "Le 25 novembre" },
  { href: `${DOSSIER}#passeport`, libelle: "Le passeport" },
  { href: `${DOSSIER}#contact`, libelle: "Nous trouver" },
];

export type Forme = "demi-tige" | "scion";

export type Arbre = {
  slug: string;
  espece: string;          // « Cerisier »
  variete: string;         // « Burlat »
  latin: string;           // nom botanique, rubrique A du passeport
  fruit: "cerise" | "pomme" | "figue" | "abricot" | "poire" | "prune";
  saison: string;          // « Été », « Fin d'été », « Automne »
  cueillette: string;      // « début juin »
  recolte: Record<Forme, number>; // année de la première récolte estimée
  prix: Record<Forme, number>;    // TTC, exemple
  livre: Record<Forme, string>;   // ce qui arrive dans le colis
  pollinisation: string;
  phrase: string;
  lot: string;             // rubrique C du passeport, exemple
};

export const ARBRES: Arbre[] = [
  {
    slug: "cerisier-burlat",
    espece: "Cerisier",
    variete: "Burlat",
    latin: "Prunus avium",
    fruit: "cerise",
    saison: "Été",
    cueillette: "fin mai – début juin",
    recolte: { "demi-tige": 2029, scion: 2030 },
    prix: { "demi-tige": 39, scion: 24 },
    livre: { "demi-tige": "Demi-tige de 2 ans, racines nues, 1,60 à 1,80 m", scion: "Scion d'un an, racines nues, 1,20 m environ" },
    pollinisation: "Il lui faut un autre cerisier à proximité pour bien fructifier (un Napoléon, par exemple).",
    phrase: "La première cerise de la saison, grosse et noire. Celle qu'on mange sur l'arbre.",
    lot: "2026-47",
  },
  {
    slug: "pommier-reine-des-reinettes",
    espece: "Pommier",
    variete: "Reine des reinettes",
    latin: "Malus domestica",
    fruit: "pomme",
    saison: "Automne",
    cueillette: "septembre",
    recolte: { "demi-tige": 2029, scion: 2030 },
    prix: { "demi-tige": 34, scion: 21 },
    livre: { "demi-tige": "Demi-tige de 2 ans, racines nues, 1,50 à 1,70 m", scion: "Scion d'un an, racines nues, 1,20 m environ" },
    pollinisation: "Un autre pommier dans le voisinage l'aide à fructifier.",
    phrase: "La pomme des tartes, acidulée, qui se garde jusqu'à Noël.",
    lot: "2026-48",
  },
  {
    slug: "figuier-ronde-de-bordeaux",
    espece: "Figuier",
    variete: "Ronde de Bordeaux",
    latin: "Ficus carica",
    fruit: "figue",
    saison: "Été",
    cueillette: "août – septembre",
    recolte: { "demi-tige": 2028, scion: 2029 },
    prix: { "demi-tige": 32, scion: 19 },
    livre: { "demi-tige": "Plant de 2 ans en conteneur de 10 L, 1,20 m environ", scion: "Jeune plant d'un an en conteneur de 3 L" },
    pollinisation: "Il se suffit à lui-même.",
    phrase: "Petites figues violettes, très sucrées, sur un arbre qui aime le soleil.",
    lot: "2026-51",
  },
  {
    slug: "abricotier-bergeron",
    espece: "Abricotier",
    variete: "Bergeron",
    latin: "Prunus armeniaca",
    fruit: "abricot",
    saison: "Été",
    cueillette: "fin juillet – début août",
    recolte: { "demi-tige": 2029, scion: 2030 },
    prix: { "demi-tige": 36, scion: 22 },
    livre: { "demi-tige": "Demi-tige de 2 ans, racines nues, 1,50 à 1,70 m", scion: "Scion d'un an, racines nues, 1,20 m environ" },
    pollinisation: "Il se suffit à lui-même.",
    phrase: "L'abricot de la vallée du Rhône, orange, ferme, parfait en confiture.",
    lot: "2026-49",
  },
  {
    slug: "poirier-williams",
    espece: "Poirier",
    variete: "Williams",
    latin: "Pyrus communis",
    fruit: "poire",
    saison: "Fin d'été",
    cueillette: "fin août – septembre",
    recolte: { "demi-tige": 2030, scion: 2031 },
    prix: { "demi-tige": 34, scion: 21 },
    livre: { "demi-tige": "Demi-tige de 2 ans, racines nues, 1,50 à 1,70 m", scion: "Scion d'un an, racines nues, 1,20 m environ" },
    pollinisation: "Un autre poirier à proximité améliore la récolte.",
    phrase: "Fondante et parfumée, à cueillir un peu avant qu'elle soit mûre.",
    lot: "2026-50",
  },
  {
    slug: "prunier-reine-claude-doree",
    espece: "Prunier",
    variete: "Reine-Claude dorée",
    latin: "Prunus domestica",
    fruit: "prune",
    saison: "Été",
    cueillette: "août",
    recolte: { "demi-tige": 2029, scion: 2030 },
    prix: { "demi-tige": 35, scion: 21 },
    livre: { "demi-tige": "Demi-tige de 2 ans, racines nues, 1,50 à 1,70 m", scion: "Scion d'un an, racines nues, 1,20 m environ" },
    pollinisation: "Elle fructifie seule ; un autre prunier aide.",
    phrase: "La prune verte et dorée qui fond en bouche. Une prune de grand-mère.",
    lot: "2026-52",
  },
];

export const arbre = (slug: string) => ARBRES.find((a) => a.slug === slug);

/** « Été 2029 », « Automne 2029 »… */
export const recolteDe = (a: Arbre, forme: Forme) => `${a.saison} ${a.recolte[forme]}`;

export const euros = (n: number) =>
  `${n.toLocaleString("fr-FR", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })} €`;

export const LIVRAISON = { prix: 14.9, date: "mardi 24 novembre 2026", limite: "15 novembre" };

/** Couleurs des fruits dessinés (ornements, jamais du texte). */
export const TEINTES: Record<Arbre["fruit"], { fruit: string; reflet: string }> = {
  cerise: { fruit: "#9E1B2A", reflet: "#D9485A" },
  pomme: { fruit: "#C23B22", reflet: "#E8A33D" },
  figue: { fruit: "#5B2C4F", reflet: "#8E5A7E" },
  abricot: { fruit: "#E07A1F", reflet: "#F4B860" },
  poire: { fruit: "#B9B23A", reflet: "#E3DC7A" },
  prune: { fruit: "#8FA83A", reflet: "#D7C85A" },
};

export const PHOTOS = {
  cerises: { src: "/exemples/premier-fruit/cerises.webp", largeur: 1600, hauteur: 2400, alt: "Grappes de cerises rouges sur une branche de cerisier, au soleil" },
  cueillette: { src: "/exemples/premier-fruit/cueillette.webp", largeur: 1200, hauteur: 1800, alt: "Une main qui cueille des cerises sur l'arbre" },
  pepiniere: { src: "/exemples/premier-fruit/pepiniere.webp", largeur: 1000, hauteur: 667, alt: "Rangs de jeunes arbres tuteurés dans une pépinière" },
  arrosage: { src: "/exemples/premier-fruit/arrosage.webp", largeur: 1200, hauteur: 800, alt: "Un jeune arbre tout juste planté, arrosé à l'arrosoir" },
  vergerNovembre: { src: "/exemples/premier-fruit/verger-novembre.webp", largeur: 640, hauteur: 1137, alt: "Un verger aux arbres nus, à la fin de l'automne" },
};

export const QUESTIONS = [
  {
    q: "Quand vais-je récolter mes premiers fruits ?",
    r: "Chaque fiche donne une année estimée, pour un arbre planté en novembre. C'est une estimation, pas une promesse : le délai dépend de la variété, du porte-greffe, de l'âge du plant, du sol et de l'entretien. Une demi-tige de deux ans donne en général un an plus tôt qu'un scion.",
  },
  {
    q: "Pourquoi un passeport phytosanitaire avec chaque arbre ?",
    r: "Parce que c'est obligatoire : tout végétal destiné à la plantation vendu à distance voyage avec son passeport (règlement (UE) 2016/2031). Toutes les pépinières qui expédient y sont tenues. Nous en montrons la photo sur chaque fiche, pour que tu saches ce que tu recevras.",
  },
  {
    q: "Racines nues, c'est quoi ?",
    r: "L'arbre est arraché en novembre, quand il dort, et voyage sans motte, les racines protégées. Il se plante de novembre à mars, hors gel. C'est la façon la plus ancienne de planter un fruitier, et celle qui reprend le mieux.",
  },
  {
    q: "Et si je ne suis pas là le 25 novembre ?",
    r: "Ton arbre attend quelques jours en jauge : une tranchée, les racines couvertes de terre. Le 25 novembre est un rendez-vous, pas une obligation.",
  },
  {
    q: "Où livrez-vous ?",
    r: "En France continentale. Pour la Corse, certaines espèces demandent un passeport particulier : appelle-nous avant de commander.",
  },
];
