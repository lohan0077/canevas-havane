// Tout ce que le site de L'Addition affiche, au même endroit. La marque est fictive :
// chaque prix, chaque stock, chaque date est un exemple, et le site le dit.
//
// Règles tenues ici (Videos/agenda-marques-dtc/SOURCES.md) :
//   - pas de promo, pas de compte à rebours, pas de fausse rareté (C. conso., L121-4, 7°) :
//     le stock affiché est présenté comme le vrai stock, et marqué « exemple » ;
//   - une date de livraison avant l'achat (C. conso., L111-1, 3°) : le jeudi, calculé ;
//   - la composition avant l'achat, « 100 % » seulement pour une fibre unique
//     (règlement (UE) n° 1007/2011, art. 7 et 16) ;
//   - prix TTC pour un particulier, et l'addition tombe juste (HT + TVA = TTC) ;
//   - aucune origine revendiquée : pas de « Fabriqué en France » ;
//   - téléphone dans la tranche ARCEP réservée à la fiction, aucune adresse e-mail.

export const DOSSIER = "/exemples/l-addition";

export const marque = {
  nom: "L'Addition",
  adresse: "12 rue de l'Exemple, 00000 Ta Ville",
  telephone: "01 99 00 61 20",
  telephoneLien: "+33199006120",
  horaires: "Du lundi au vendredi, de 10 h à 18 h",
  siret: "000 000 000 00000",
};

export type LigneAddition = { id: string; libelle: string; montant: number; detail: string; marque?: boolean };

export type Produit = {
  id: string;
  nom: string;
  sous: string;
  composition: string;
  entretien: string;
  lignes: LigneAddition[]; // hors taxe ; la TVA à 20 % s'ajoute
};

export const TVA = 0.2;

export const produits: Produit[] = [
  {
    id: "jean",
    nom: "Jean droit",
    sous: "toile brute",
    composition: "100 % coton",
    entretien: "Lavage à 30 °C, à l'envers. Pas de sèche-linge.",
    lignes: [
      { id: "toile", libelle: "Toile denim", montant: 22, detail: "1,6 mètre de toile 13,5 onces, achetée au tissage, au mètre." },
      { id: "couture", libelle: "Coupe et couture", montant: 38, detail: "Environ une heure et quart de travail à l'atelier de confection, payée à l'heure." },
      { id: "rivets", libelle: "Boutons, rivets", montant: 6, detail: "Un bouton, cinq rivets, une fermeture, le fil." },
      { id: "envoi", libelle: "Envoi", montant: 6, detail: "Le carton, l'étiquette et la livraison du jeudi, jusqu'à chez toi." },
      { id: "marque", libelle: "La marque", montant: 28, detail: "Ce qu'on garde : les salaires, le loyer, les photos, les retours, et ce qui reste.", marque: true },
    ],
  },
  {
    id: "veste",
    nom: "Veste de travail",
    sous: "toile brute",
    composition: "100 % coton",
    entretien: "Lavage à 30 °C, fermée, à l'envers.",
    lignes: [
      { id: "toile", libelle: "Toile denim", montant: 31, detail: "2,2 mètres de la même toile que le jean." },
      { id: "couture", libelle: "Coupe et couture", montant: 54, detail: "Quatre poches, un col, deux heures de travail environ." },
      { id: "rivets", libelle: "Boutons, rivets", montant: 7, detail: "Six boutons, quatre rivets, le fil." },
      { id: "envoi", libelle: "Envoi", montant: 6, detail: "Le carton, l'étiquette et la livraison du jeudi." },
      { id: "marque", libelle: "La marque", montant: 39.5, detail: "Ce qu'on garde, comme pour le jean.", marque: true },
    ],
  },
  {
    id: "chemise",
    nom: "Chemise",
    sous: "chambray",
    composition: "100 % coton",
    entretien: "Lavage à 40 °C. Repassage à fer moyen.",
    lignes: [
      { id: "toile", libelle: "Toile chambray", montant: 14, detail: "1,8 mètre d'une toile plus légère, tissée en bleu et blanc." },
      { id: "couture", libelle: "Coupe et couture", montant: 29, detail: "Un col, deux poignets, une heure de travail environ." },
      { id: "rivets", libelle: "Boutons", montant: 4, detail: "Neuf boutons en corozo, le fil." },
      { id: "envoi", libelle: "Envoi", montant: 6, detail: "Le carton, l'étiquette et la livraison du jeudi." },
      { id: "marque", libelle: "La marque", montant: 22, detail: "Ce qu'on garde, comme pour le jean.", marque: true },
    ],
  },
];

export const horsTaxe = (p: Produit) => p.lignes.reduce((t, l) => t + l.montant, 0);
export const tva = (p: Produit) => Math.round(horsTaxe(p) * TVA * 100) / 100;
export const ttc = (p: Produit) => horsTaxe(p) + tva(p);

/** « 22,00 € », « 1 650,00 € » : deux décimales, espaces insécables. */
export const euros = (n: number, decimales = true) =>
  `${(decimales ? n.toFixed(2) : String(Math.round(n))).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;

/** Les tailles du jean droit et leur stock — exemple : sur le vrai site, le stock réel. */
export const tailles = [
  { taille: "W28", stock: 6 },
  { taille: "W30", stock: 21 },
  { taille: "W31", stock: 17 },
  { taille: "W32", stock: 14 },
  { taille: "W33", stock: 9 },
  { taille: "W34", stock: 3 },
  { taille: "W36", stock: 0 },
];

const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

/**
 * Le jeudi de livraison : on expédie le mardi, on livre le jeudi. Une commande passée
 * jusqu'au lundi soir part le mardi suivant ; après, elle part le mardi d'après.
 */
export function jeudiDeLivraison(depuis: Date) {
  const d = new Date(depuis.getFullYear(), depuis.getMonth(), depuis.getDate());
  let ecart = (4 - d.getDay() + 7) % 7;
  if (ecart < 3) ecart += 7;
  d.setDate(d.getDate() + ecart);
  return `${JOURS[d.getDay()]} ${d.getDate() === 1 ? "1er" : d.getDate()} ${MOIS[d.getMonth()]}`;
}

export const questions = [
  { q: "Pourquoi jamais de promo ?", r: "Parce qu'un prix qui baisse de 20 % un jour sur deux n'a jamais été le vrai prix. Le nôtre est le même en janvier et en juillet, et on te montre de quoi il est fait." },
  { q: "Pourquoi un jean coûte 120 € ?", r: "Ouvre l'addition sur la fiche : la toile, la couture, les rivets, l'envoi, la TVA, et ce que la marque garde. Rien d'autre." },
  { q: "Pourquoi toujours le jeudi ?", r: "On prépare les colis le lundi, on expédie le mardi, ils arrivent le jeudi. Une seule tournée par semaine : la date est écrite avant que tu commandes." },
  { q: "« Il en reste 14 », c'est vrai ?", r: "Sur le vrai site, oui : le chiffre vient du stock, mis à jour à chaque vente. Quand un modèle est épuisé, on le dit, et on dit quand il revient. Ici, les stocks sont des exemples." },
  { q: "Et si la taille ne va pas ?", r: "Tu as quatorze jours après la réception pour nous le renvoyer, comme pour tout achat à distance. Pour un échange de taille, l'envoi du nouveau jean est à notre charge." },
  { q: "Le jean est-il fabriqué en France ?", r: "On n'écrit l'origine d'un vêtement que si on peut la prouver, étiquette à l'appui. La marque est fictive : ici, on ne revendique rien." },
];

export const NAVIGATION = [
  { href: `${DOSSIER}/jean-droit`, libelle: "Le jean droit" },
  { href: `${DOSSIER}/pourquoi-ce-prix`, libelle: "Pourquoi ce prix" },
  { href: `${DOSSIER}/livraison`, libelle: "Livraison, retours" },
];

export const photos = {
  pile: { src: `${DOSSIER}/pile.webp`, largeur: 1400, hauteur: 1051, alt: "Quatre jeans pliés et empilés, du plus brut au plus clair, sur un fond blanc" },
  toile: { src: `${DOSSIER}/toile.webp`, largeur: 1000, hauteur: 667, alt: "Des épaisseurs de toile denim, bleu nuit et bleu délavé, vues en coupe" },
  rouleaux: { src: `${DOSSIER}/rouleaux.webp`, largeur: 1000, hauteur: 667, alt: "Des rouleaux de toile denim de plusieurs bleus, serrés les uns contre les autres" },
};
