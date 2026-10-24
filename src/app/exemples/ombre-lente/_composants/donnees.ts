// La pépinière imaginaire « Ombre Lente », montrée dans les deux vidéos des jardineries :
// « Créer une marque » (on ne vend pas des arbres, on vend l'ombre de dans vingt ans ; tu
// glisses les années ; le passeport sur chaque fiche ; le film de vingt ans) et « Remplir
// l'agenda » (on vend la première cerise : l'été de la première récolte, variété par
// variété ; le passeport montré en photo ; la Sainte-Catherine, quand tout le monde
// plante). Les deux se tiennent : des arbres qui prennent leur temps — l'ombre dans vingt
// ans, la première cerise dans trois.
//
// Tout est exemple : hauteurs, années de récolte, prix, numéros. La croissance d'un arbre
// dépend de l'essence, du porte-greffe, du sol, de l'eau et de la taille : le site l'écrit
// partout. Le téléphone est dans la tranche que l'ARCEP réserve à la fiction.

export const DOSSIER = "/exemples/ombre-lente";
export const PLANTATION = 2026;

export const CONTACT = {
  telephone: "01 99 00 20 46",
  adresse: "Lieu-dit l'Exemple · Val de Loire",
  horaires: "Du mercredi au samedi, 9 h – 18 h, d'octobre à avril",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/arbres`, libelle: "Nos arbres" },
  { href: `${DOSSIER}/sainte-catherine`, libelle: "Le 25 novembre" },
  { href: `${DOSSIER}/vingt-ans`, libelle: "Le film de vingt ans" },
];

export const euros = (n: number) =>
  `${n.toLocaleString("fr-FR", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })} €`;

/** Livrés la veille de la Sainte-Catherine, avec leur passeport phytosanitaire. */
export const LIVRAISON = { prix: 14.9, date: "mardi 24 novembre 2026", limite: "15 novembre" };

/* ---------- Les arbres d'ombre ---------- */
export type Essence = {
  slug: string;
  nom: string;
  latin: string;
  depart: number;   // hauteur à la livraison (m)
  vingt: number;    // hauteur indicative à vingt ans (m), exemple
  port: number;     // largeur de la couronne rapportée à la hauteur
  feuillage: string;
  phrase: string;
  sol: string;
  prix: number;     // TTC, exemple
  lot: string;      // rubrique C du passeport, exemple
};

export const ESSENCES: Essence[] = [
  { slug: "tilleul", nom: "Tilleul à petites feuilles", latin: "Tilia cordata", depart: 1.5, vingt: 9, port: 0.7, feuillage: "#4E6E3A", phrase: "Une ombre dense et fraîche, et l'odeur des fleurs en juin.", sol: "Tout sol frais, soleil ou mi-ombre", prix: 69, lot: "2026-12" },
  { slug: "erable-champetre", nom: "Érable champêtre", latin: "Acer campestre", depart: 1.5, vingt: 8, port: 0.75, feuillage: "#5F7E3C", phrase: "Rustique, sobre en eau, doré en octobre.", sol: "Sol calcaire ou sec, soleil", prix: 59, lot: "2026-14" },
  { slug: "micocoulier", nom: "Micocoulier de Provence", latin: "Celtis australis", depart: 1.5, vingt: 10, port: 0.8, feuillage: "#6B8F4E", phrase: "L'arbre des places du Sud : il supporte la chaleur et donne une ombre légère.", sol: "Sol drainé, plein soleil", prix: 74, lot: "2026-15" },
  { slug: "chene-pubescent", nom: "Chêne pubescent", latin: "Quercus pubescens", depart: 1.2, vingt: 6, port: 0.85, feuillage: "#3F5E37", phrase: "Le plus lent de tous. Celui qui sera encore là dans deux cents ans.", sol: "Sol sec et calcaire, soleil", prix: 64, lot: "2026-16" },
];

/**
 * Hauteur indicative (m) au bout de `n` années : lente au début, comme un vrai arbre.
 * Arrondie au centimètre : le serveur et le navigateur doivent dessiner exactement
 * le même arbre (Math.pow peut différer d'un moteur à l'autre au dernier chiffre).
 */
export const hauteur = (e: Essence, n: number) =>
  Math.round((e.depart + (e.vingt - e.depart) * Math.pow(Math.min(20, Math.max(0, n)) / 20, 1.25)) * 100) / 100;

/** « 1,5 m », « 9 m ». */
export const metres = (h: number) => `${(Math.round(h * 10) / 10).toLocaleString("fr-FR")} m`;

/* ---------- Les arbres fruitiers ---------- */
export type Forme = "demi-tige" | "scion";

export type Fruitier = {
  slug: string;
  espece: string;
  variete: string;
  latin: string;
  fruit: "cerise" | "pomme" | "figue" | "abricot" | "poire" | "prune";
  saison: string;
  cueillette: string;
  recolte: Record<Forme, number>; // année de la première récolte estimée
  prix: Record<Forme, number>;    // TTC, exemple
  livre: Record<Forme, string>;
  pollinisation: string;
  phrase: string;
  lot: string;
};

export const FRUITIERS: Fruitier[] = [
  { slug: "cerisier-burlat", espece: "Cerisier", variete: "Burlat", latin: "Prunus avium", fruit: "cerise", saison: "Été", cueillette: "fin mai – début juin", recolte: { "demi-tige": 2029, scion: 2030 }, prix: { "demi-tige": 39, scion: 24 }, livre: { "demi-tige": "Demi-tige de 2 ans, racines nues, 1,60 à 1,80 m", scion: "Scion d'un an, racines nues, 1,20 m environ" }, pollinisation: "Il lui faut un autre cerisier à proximité pour bien fructifier (un Napoléon, par exemple).", phrase: "La première cerise de la saison, grosse et noire. Celle qu'on mange sur l'arbre.", lot: "2026-47" },
  { slug: "pommier-reine-des-reinettes", espece: "Pommier", variete: "Reine des reinettes", latin: "Malus domestica", fruit: "pomme", saison: "Automne", cueillette: "septembre", recolte: { "demi-tige": 2029, scion: 2030 }, prix: { "demi-tige": 34, scion: 21 }, livre: { "demi-tige": "Demi-tige de 2 ans, racines nues, 1,50 à 1,70 m", scion: "Scion d'un an, racines nues, 1,20 m environ" }, pollinisation: "Un autre pommier dans le voisinage l'aide à fructifier.", phrase: "La pomme des tartes, acidulée, qui se garde jusqu'à Noël.", lot: "2026-48" },
  { slug: "figuier-ronde-de-bordeaux", espece: "Figuier", variete: "Ronde de Bordeaux", latin: "Ficus carica", fruit: "figue", saison: "Été", cueillette: "août – septembre", recolte: { "demi-tige": 2028, scion: 2029 }, prix: { "demi-tige": 32, scion: 19 }, livre: { "demi-tige": "Plant de 2 ans en conteneur de 10 L, 1,20 m environ", scion: "Jeune plant d'un an en conteneur de 3 L" }, pollinisation: "Il se suffit à lui-même.", phrase: "Petites figues violettes, très sucrées, sur un arbre qui aime le soleil.", lot: "2026-51" },
  { slug: "abricotier-bergeron", espece: "Abricotier", variete: "Bergeron", latin: "Prunus armeniaca", fruit: "abricot", saison: "Été", cueillette: "fin juillet – début août", recolte: { "demi-tige": 2029, scion: 2030 }, prix: { "demi-tige": 36, scion: 22 }, livre: { "demi-tige": "Demi-tige de 2 ans, racines nues, 1,50 à 1,70 m", scion: "Scion d'un an, racines nues, 1,20 m environ" }, pollinisation: "Il se suffit à lui-même.", phrase: "L'abricot de la vallée du Rhône, orange, ferme, parfait en confiture.", lot: "2026-49" },
  { slug: "poirier-williams", espece: "Poirier", variete: "Williams", latin: "Pyrus communis", fruit: "poire", saison: "Fin d'été", cueillette: "fin août – septembre", recolte: { "demi-tige": 2030, scion: 2031 }, prix: { "demi-tige": 34, scion: 21 }, livre: { "demi-tige": "Demi-tige de 2 ans, racines nues, 1,50 à 1,70 m", scion: "Scion d'un an, racines nues, 1,20 m environ" }, pollinisation: "Un autre poirier à proximité améliore la récolte.", phrase: "Fondante et parfumée, à cueillir un peu avant qu'elle soit mûre.", lot: "2026-50" },
  { slug: "prunier-reine-claude-doree", espece: "Prunier", variete: "Reine-Claude dorée", latin: "Prunus domestica", fruit: "prune", saison: "Été", cueillette: "août", recolte: { "demi-tige": 2029, scion: 2030 }, prix: { "demi-tige": 35, scion: 21 }, livre: { "demi-tige": "Demi-tige de 2 ans, racines nues, 1,50 à 1,70 m", scion: "Scion d'un an, racines nues, 1,20 m environ" }, pollinisation: "Elle fructifie seule ; un autre prunier aide.", phrase: "La prune verte et dorée qui fond en bouche.", lot: "2026-52" },
];

/** « Été 2029 », « Automne 2029 »… */
export const recolteDe = (a: Fruitier, forme: Forme) => `${a.saison} ${a.recolte[forme]}`;

export const essence = (slug: string) => ESSENCES.find((e) => e.slug === slug);
export const fruitier = (slug: string) => FRUITIERS.find((a) => a.slug === slug);

/** Couleurs des fruits dessinés (ornements, jamais du texte). */
export const TEINTES: Record<Fruitier["fruit"], { fruit: string; reflet: string }> = {
  cerise: { fruit: "#9E1B2A", reflet: "#D9485A" },
  pomme: { fruit: "#C23B22", reflet: "#E8A33D" },
  figue: { fruit: "#5B2C4F", reflet: "#8E5A7E" },
  abricot: { fruit: "#E07A1F", reflet: "#F4B860" },
  poire: { fruit: "#B9B23A", reflet: "#E3DC7A" },
  prune: { fruit: "#8FA83A", reflet: "#D7C85A" },
};

/* ---------- Les photos ----------
   Unsplash et Pexels (usage commercial permis), servies depuis notre domaine ;
   crédits dans les mentions légales. Aucun visage reconnaissable. */
export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const P = DOSSIER;
export const PHOTOS = {
  arbreSeul: { src: `${P}/arbre-seul.webp`, largeur: 1600, hauteur: 1200, alt: "Un grand arbre seul au milieu d'un pré, sa couronne ronde et dense, sous un ciel bleu" },
  feuilles: { src: `${P}/feuilles.webp`, largeur: 1200, hauteur: 800, alt: "Feuilles de tilleul traversées par la lumière" },
  fleursTilleul: { src: `${P}/fleurs-tilleul.webp`, largeur: 1000, hauteur: 667, alt: "Fleurs et feuilles de tilleul, en gros plan" },
  tableOmbre: { src: `${P}/table-ombre.webp`, largeur: 800, hauteur: 1200, alt: "Une table et deux chaises à l'ombre d'un grand arbre" },
  terrasseOmbre: { src: `${P}/terrasse-ombre.webp`, largeur: 1000, hauteur: 1500, alt: "Une table de jardin et ses chaises dans l'ombre tachetée d'un arbre, devant une maison" },
  cerises: { src: `${P}/cerises.webp`, largeur: 1600, hauteur: 2400, alt: "Grappes de cerises rouges sur une branche de cerisier, au soleil" },
  cueillette: { src: `${P}/cueillette.webp`, largeur: 1200, hauteur: 1800, alt: "Une main qui cueille des cerises sur l'arbre" },
  pepiniere: { src: `${P}/pepiniere.webp`, largeur: 1000, hauteur: 667, alt: "Rangs de jeunes arbres tuteurés dans une pépinière" },
  arrosage: { src: `${P}/arrosage.webp`, largeur: 1200, hauteur: 800, alt: "Un jeune arbre tout juste planté, arrosé à l'arrosoir" },
  vergerNovembre: { src: `${P}/verger-novembre.webp`, largeur: 640, hauteur: 1137, alt: "Un verger aux arbres nus, à la fin de l'automne" },
  mainsPlantation: { src: `${P}/mains-plantation.webp`, largeur: 1200, hauteur: 1798, alt: "Deux mains gantées tassent la terre au pied d'un jeune arbre qu'on vient de planter" },
  vergerRangs: { src: `${P}/verger-rangs.webp`, largeur: 1920, hauteur: 1154, alt: "Des rangs de jeunes arbres dans un verger au printemps, un pépiniériste au travail au loin" },
  jeuneArbre: { src: `${P}/jeune-arbre.webp`, largeur: 1100, hauteur: 1650, alt: "Un très jeune arbre attaché à son tuteur, dans l'herbe" },
} satisfies Record<string, Photo>;

/* ---------- Le 25 novembre ---------- */
export const CALENDRIER = [
  ["Jusqu'au 15 novembre", "Tu commandes ton arbre sur le site, ou à la pépinière."],
  ["Mardi 24 novembre", "Il arrive chez toi, racines nues, avec son passeport phytosanitaire."],
  ["Mercredi 25 novembre", "Tu le plantes. Le même jour que tous les autres."],
  ["Le soir", "Si tu veux, tu nous envoies la photo de ton arbre planté. Puis chaque 25 novembre, la suivante."],
];

/* ---------- Questions ---------- */
export const QUESTIONS = [
  { q: "Mon arbre fera-t-il vraiment 9 mètres dans vingt ans ?", r: "Peut-être plus, peut-être moins. Les hauteurs du site sont des moyennes d'exemple, pour un arbre en bon sol, arrosé ses deux premiers étés et jamais étêté. On te les donne pour imaginer, pas comme une promesse." },
  { q: "Quand vais-je récolter mes premiers fruits ?", r: "Chaque fiche donne une année estimée, pour un arbre planté en novembre. C'est une estimation, pas une promesse : le délai dépend de la variété, du porte-greffe, de l'âge du plant, du sol et de l'entretien. Une demi-tige de deux ans donne en général un an plus tôt qu'un scion." },
  { q: "Pourquoi un passeport phytosanitaire ?", r: "Parce que c'est la loi : tout végétal destiné à la plantation vendu à distance voyage avec son passeport (règlement (UE) 2016/2031). Toutes les pépinières qui expédient y sont tenues. Nous en montrons la photo sur chaque fiche, pour que tu saches ce que tu recevras." },
  { q: "À quelle distance de la limite du voisin ?", r: "Un arbre qui dépassera 2 mètres se plante à 2 mètres au moins de la limite de propriété, sauf règlement ou usage local contraire (Code civil, article 671). Pour une ombre sur ta terrasse, on calcule la place avec toi." },
  { q: "Racines nues, c'est quoi ?", r: "L'arbre est arraché en novembre, quand il dort, et voyage sans motte, les racines protégées. Il se plante de novembre à mars, hors gel. C'est la façon la plus ancienne de planter un arbre, et celle qui reprend le mieux." },
  { q: "Et si je ne suis pas là le 25 novembre ?", r: "Ton arbre attend quelques jours en jauge : une tranchée, les racines couvertes de terre. Le 25 novembre est un rendez-vous, pas une obligation." },
];
