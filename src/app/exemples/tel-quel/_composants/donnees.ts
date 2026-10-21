// Tout ce que le site Tel Quel affiche, au même endroit. L'entreprise est fictive :
// numéros, prix, séjours et noms sont des exemples, et le site le dit à chaque fois.
//
// Les règles qui façonnent ces données (Videos/marque-conciergeries/SOURCES.md) :
// - la carte professionnelle sur chaque page : loi n° 70-9, art. 1er et 3 ; mention
//   « Gestion immobilière » ; garant (art. 3, 2°) ; rien qui fasse croire à un agrément
//   (décret n° 72-678, art. 92) — d'où le monogramme en carré plein, jamais en sceau ;
// - « remis tel quel » est un engagement de méthode (remettre en place, photographier),
//   jamais la promesse que rien ne sera abîmé (C. consom., L121-2) ;
// - aucun logement situé, aucune date d'absence : les séjours n'ont qu'un numéro et des
//   heures, et l'espace propriétaire d'exemple le dit ;
// - le barème : prix maximums TTC, qui paie, base de calcul (arrêté du 10 janvier 2017).

export const DOSSIER = "/exemples/tel-quel";

export const entreprise = {
  nom: "Tel Quel",
  telephone: "01 99 00 41 27",
  telephoneLien: "+33199004127",
  adresse: ["3 passage de l'Exemple", "33000 Bordeaux"],
  zone: "Bordeaux et le bassin d'Arcachon",
  horaires: "Du lundi au samedi, de 9 h à 19 h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/mon-espace`, libelle: "Un séjour, en photos" },
  { href: `${DOSSIER}/methode`, libelle: "Tel quel, c'est quoi" },
  { href: `${DOSSIER}/bareme`, libelle: "Barème" },
];

export const carte = [
  { libelle: "Carte professionnelle", valeur: "Gestion immobilière" },
  { libelle: "Numéro", valeur: "CPI 0000 0000 000 000 000" },
  { libelle: "Délivrée par", valeur: "CCI territoriale de l'Exemple" },
  { libelle: "Garant", valeur: "Garant d'exemple, 5 cours de l'Exemple, 33000 Bordeaux" },
];

/** Ce qui est remis en place à chaque départ : la liste du mandat, cochée à chaque séjour. */
export const remiseEnPlace = [
  "Coussins et plaids à leur place",
  "Draps et serviettes changés",
  "Vaisselle lavée, rangée où tu la ranges",
  "Meubles et objets replacés d'après la photo d'arrivée",
  "Plantes arrosées",
  "Fenêtres fermées, volets comme tu les veux",
  "Chauffage réglé sur ta consigne",
  "Poubelles sorties, frigo vidé",
  "Une photo, sous le même angle qu'avant l'arrivée",
];

export type Sejour = {
  numero: number;
  nuits: number;
  voyageurs: number;
  heureAvant: string;
  heureApres: string;
  verifie: string[];
  incident: string | null;
};

/** Trois séjours d'exemple : un numéro, des heures, jamais de date ni d'adresse. */
export const sejours: Sejour[] = [
  {
    numero: 128,
    nuits: 3,
    voyageurs: 2,
    heureAvant: "15 h",
    heureApres: "11 h 02",
    verifie: ["Photos avant et après", "Linge changé", "Tout est remis en place"],
    incident: null,
  },
  {
    numero: 127,
    nuits: 5,
    voyageurs: 4,
    heureAvant: "16 h",
    heureApres: "10 h 48",
    verifie: ["Photos avant et après", "Linge changé", "Tout est remis en place"],
    incident: "Un verre cassé, signalé par les voyageurs. Remplacé à l'identique le jour même ; le prix est retenu sur leur dépôt de garantie. La photo du verre neuf est dans le séjour.",
  },
  {
    numero: 126,
    nuits: 2,
    voyageurs: 2,
    heureAvant: "15 h 30",
    heureApres: "11 h 20",
    verifie: ["Photos avant et après", "Linge changé", "Tout est remis en place"],
    incident: null,
  },
];

export type LigneBareme = { prestation: string; prix: string; unite: string; qui: string; detail: string };

/** Le barème : prix maximums TTC, qui paie, base de calcul. Prix d'exemple. */
export const bareme: LigneBareme[] = [
  {
    prestation: "Gestion des séjours",
    prix: "22 %",
    unite: "des loyers encaissés",
    qui: "Payé par le propriétaire",
    detail: "Annonce, réservations, accueil, remise en place, photos avant et après, encaissement et reversement des loyers.",
  },
  {
    prestation: "Ménage, linge et remise en place",
    prix: "55 €",
    unite: "par départ",
    qui: "Payé par le voyageur",
    detail: "Ajouté à sa réservation et affiché avant qu'il ne réserve.",
  },
  {
    prestation: "Inventaire photo du logement",
    prix: "Inclus",
    unite: "à la signature du mandat",
    qui: "Compris dans la gestion",
    detail: "Chaque pièce photographiée sous les angles qui serviront à chaque séjour.",
  },
  {
    prestation: "Objet abîmé remplacé",
    prix: "Prix de l'objet",
    unite: "sans majoration",
    qui: "Payé par le voyageur, sur son dépôt de garantie",
    detail: "Ticket de caisse et photo de l'objet neuf dans ton espace.",
  },
  {
    prestation: "Fin du mandat",
    prix: "0 €",
    unite: "préavis de trois mois",
    qui: "Aucun frais",
    detail: "Les clés te sont rendues avec le dernier relevé.",
  },
];

export const BASE_DE_CALCUL =
  "Loyers encaissés : le prix des nuits payé par les voyageurs, hors ménage et hors taxe de séjour. Exemple : 3 nuits à 100 € = 300 € de loyers, dont 66 € de gestion ; 234 € te sont reversés.";

export const methode = [
  { titre: "L'inventaire", texte: "À la signature du mandat, chaque pièce est photographiée sous des angles fixes. Ce sont tes photos de référence." },
  { titre: "L'arrivée", texte: "Avant chaque voyageur, une photo de chaque angle. Elle prouve l'état du logement à l'entrée." },
  { titre: "Le départ", texte: "Ménage, linge, et la liste de remise en place, cochée ligne à ligne, d'après la photo d'arrivée." },
  { titre: "La preuve", texte: "La photo d'après, sous le même angle. Les deux t'arrivent dans ton espace, le jour du départ." },
];

export const questions = [
  {
    q: "« Tel quel », vous garantissez que rien ne sera abîmé ?",
    r: "Non, et personne ne le peut : un voyageur peut casser un verre. Ce que nous promettons, c'est notre méthode : remettre chaque chose à sa place après chaque départ, et te le prouver en photo. Si quelque chose est abîmé, tu le vois dans ton espace, avec ce que nous avons fait.",
  },
  {
    q: "Pourquoi la carte professionnelle sur chaque page ?",
    r: "Parce que louer, de façon habituelle, le logement d'un autre l'exige, même à titre accessoire (loi n° 70-9 du 2 janvier 1970, art. 1er et 3). Un propriétaire doit pouvoir la lire avant de nous confier ses clés, quelle que soit la page par laquelle il arrive.",
  },
  {
    q: "Mes photos sont-elles publiques ?",
    r: "Non. Les photos avant et après sont dans ton espace, réservé à toi. Elles ne disent ni où est ton logement, ni quand il est vide. Les photos de ce site sont des illustrations.",
  },
  {
    q: "Qui paie le ménage ?",
    r: "Le voyageur : 55 € par départ (prix d'exemple), affichés avant qu'il ne réserve. Toi, tu paies la gestion des séjours : 22 % des loyers encaissés. Le barème complet est sur le site.",
  },
  {
    q: "Et si je veux arrêter ?",
    r: "Tu mets fin au mandat avec un préavis de trois mois, sans frais. Nous te rendons les clés, le dernier relevé, et toutes les photos de tes séjours.",
  },
];

export const photos = {
  salon: { src: "/exemples/tel-quel/salon.webp", largeur: 1400, hauteur: 739, alt: "Un salon clair : canapé gris, table basse en bois, deux poufs en cuir, des plantes près de la baie vitrée" },
  canape: { src: "/exemples/tel-quel/canape-vert.webp", largeur: 1000, hauteur: 1494, alt: "Un canapé vert sapin et deux coussins rayés couleur terre cuite" },
  drap: { src: "/exemples/tel-quel/drap-lisse.webp", largeur: 1000, hauteur: 1017, alt: "Deux mains lissent un drap blanc sur un lit" },
  coussins: { src: "/exemples/tel-quel/coussins.webp", largeur: 1000, hauteur: 1333, alt: "Un coussin blanc posé sur un coussin terre cuite, sur un tapis" },
};
