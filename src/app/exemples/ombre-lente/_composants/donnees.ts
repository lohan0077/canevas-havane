// Les données du site Ombre Lente, pépinière fictive d'arbres d'ombrage. Hauteurs,
// prix et années sont des exemples : la croissance d'un arbre dépend de l'essence,
// du sol, de l'eau et de la taille. La simulation l'écrit partout.

export const DOSSIER = "/exemples/ombre-lente";
export const PLANTATION = 2026;

export const CONTACT = {
  telephone: "01 99 00 20 46", // tranche réservée à la fiction par l'ARCEP
  adresse: "Lieu-dit l'Exemple · Val de Loire",
  horaires: "Le vendredi et le samedi, de novembre à mars",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#ombre`, libelle: "Glisse les années" },
  { href: `${DOSSIER}/arbres`, libelle: "Nos arbres" },
  { href: `${DOSSIER}/vingt-ans`, libelle: "Le film de vingt ans" },
  { href: `${DOSSIER}#passeport`, libelle: "Le passeport" },
  { href: `${DOSSIER}#contact`, libelle: "Nous trouver" },
];

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
  {
    slug: "tilleul",
    nom: "Tilleul à petites feuilles",
    latin: "Tilia cordata",
    depart: 1.5,
    vingt: 9,
    port: 0.7,
    feuillage: "#4E6E3A",
    phrase: "Une ombre dense et fraîche, et l'odeur des fleurs en juin.",
    sol: "Tout sol frais, soleil ou mi-ombre",
    prix: 69,
    lot: "2026-12",
  },
  {
    slug: "erable-champetre",
    nom: "Érable champêtre",
    latin: "Acer campestre",
    depart: 1.5,
    vingt: 8,
    port: 0.75,
    feuillage: "#5F7E3C",
    phrase: "Rustique, sobre en eau, doré en octobre.",
    sol: "Sol calcaire ou sec, soleil",
    prix: 59,
    lot: "2026-14",
  },
  {
    slug: "micocoulier",
    nom: "Micocoulier de Provence",
    latin: "Celtis australis",
    depart: 1.5,
    vingt: 10,
    port: 0.8,
    feuillage: "#6B8F4E",
    phrase: "L'arbre des places du Sud : il supporte la chaleur et donne une ombre légère.",
    sol: "Sol drainé, plein soleil",
    prix: 74,
    lot: "2026-15",
  },
  {
    slug: "chene-pubescent",
    nom: "Chêne pubescent",
    latin: "Quercus pubescens",
    depart: 1.2,
    vingt: 6,
    port: 0.85,
    feuillage: "#3F5E37",
    phrase: "Le plus lent des quatre. Celui qui sera encore là dans deux cents ans.",
    sol: "Sol sec et calcaire, soleil",
    prix: 64,
    lot: "2026-16",
  },
];

export const essence = (slug: string) => ESSENCES.find((e) => e.slug === slug);

/**
 * Hauteur indicative (m) au bout de `n` années : lente au début, comme un vrai arbre.
 * Arrondie au centimètre : le serveur et le navigateur doivent dessiner exactement
 * le même arbre (Math.pow peut différer d'un moteur à l'autre au dernier chiffre).
 */
export const hauteur = (e: Essence, n: number) =>
  Math.round((e.depart + (e.vingt - e.depart) * Math.pow(Math.min(20, Math.max(0, n)) / 20, 1.25)) * 100) / 100;

/** « 1,5 m », « 9 m ». */
export const metres = (h: number) => `${(Math.round(h * 10) / 10).toLocaleString("fr-FR")} m`;

export const euros = (n: number) => `${n.toLocaleString("fr-FR")} €`;

export const LIVRAISON = 19;

export const PHOTOS = {
  arbreSeul: { src: "/exemples/ombre-lente/arbre-seul.webp", largeur: 1400, hauteur: 1050, alt: "Un grand arbre seul au milieu d'un pré, sa couronne ronde et dense" },
  feuilles: { src: "/exemples/ombre-lente/feuilles.webp", largeur: 1200, hauteur: 800, alt: "Feuilles de tilleul traversées par la lumière" },
  fleursTilleul: { src: "/exemples/ombre-lente/fleurs-tilleul.webp", largeur: 1000, hauteur: 667, alt: "Fleurs et feuilles de tilleul, en gros plan" },
  tableOmbre: { src: "/exemples/ombre-lente/table-ombre.webp", largeur: 800, hauteur: 1200, alt: "Une table et deux chaises à l'ombre d'un grand arbre" },
};

export const QUESTIONS = [
  {
    q: "Mon arbre fera-t-il vraiment 9 mètres dans vingt ans ?",
    r: "Peut-être plus, peut-être moins. Les hauteurs du site sont des moyennes d'exemple, pour un arbre en bon sol, arrosé ses deux premiers étés et jamais étêté. On te les donne pour imaginer, pas comme une promesse.",
  },
  {
    q: "À quelle distance de la limite du voisin ?",
    r: "Un arbre qui dépassera 2 mètres se plante à 2 mètres au moins de la limite de propriété, sauf règlement ou usage local contraire (Code civil, article 671). Pour une ombre sur ta terrasse, on calcule la place avec toi.",
  },
  {
    q: "Pourquoi un passeport phytosanitaire ?",
    r: "Parce que c'est la loi : tout arbre vendu à distance voyage avec son passeport (règlement (UE) 2016/2031). Toutes les pépinières qui expédient y sont tenues. On le montre sur chaque fiche.",
  },
  {
    q: "Quand planter ?",
    r: "De novembre à mars, hors gel : l'arbre arrive à racines nues, pendant son repos. Il s'installe tout l'hiver et démarre au printemps.",
  },
];
