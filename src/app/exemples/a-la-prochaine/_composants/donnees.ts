// Les données du site À la Prochaine : une marque de bijoux imaginaire, dont chaque
// pièce est gravée d'un numéro qui a sa page dans le registre. Tout est inventé :
// numéros, prénoms, prix, dates.

export const DOSSIER = "/exemples/a-la-prochaine";

export const entreprise = {
  nom: "À la Prochaine",
  telephone: "01 99 00 21 12", // tranche réservée par l'ARCEP aux œuvres de fiction
  adresse: "12 rue de l'Exemple",
  horaires: "Boutique ouverte du mercredi au samedi, 11\u00a0h – 19\u00a0h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/registre`, libelle: "Le registre" },
  { href: `${DOSSIER}/bijoux`, libelle: "Les bijoux" },
  { href: `${DOSSIER}/transmettre`, libelle: "Transmettre" },
];

export const IMAGES = {
  gourmette: { src: "/exemples/a-la-prochaine/gourmette.webp", largeur: 1200, hauteur: 1800, alt: "Une gourmette en or à plaque lisse, posée sur un drap blanc" },
  baguesLin: { src: "/exemples/a-la-prochaine/bagues-lin.webp", largeur: 1200, hauteur: 1425, alt: "Deux bagues en or posées sur du lin, près d'un livre ouvert" },
  baguePortee: { src: "/exemples/a-la-prochaine/bague-portee.webp", largeur: 1000, hauteur: 1250, alt: "Une main glissée dans la poche d'un jean, une bague en or à l'annulaire" },
  boite: { src: "/exemples/a-la-prochaine/boite-a-bijoux.webp", largeur: 1000, hauteur: 1334, alt: "Une boîte à bijoux ancienne : boucles d'oreilles en or et en perles, rangées sur du velours clair" },
};

export type Bijou = {
  id: string;
  nom: string;
  type: string;
  matiere: string;
  prix: number; // TTC, prix d'exemple
  texte: string;
  image: (typeof IMAGES)[keyof typeof IMAGES];
};

export const BIJOUX: Bijou[] = [
  { id: "relais", nom: "Relais", type: "Bague", matiere: "Or jaune 750 ‰", prix: 590, texte: "Un anneau plein, assez épais pour être retaillé deux fois. Il passera de main en main sans s'user.", image: IMAGES.baguePortee },
  { id: "heritiere", nom: "Héritière", type: "Chevalière", matiere: "Or jaune 750 ‰, onyx", prix: 890, texte: "Une chevalière basse, laissée lisse : c'est la personne suivante qui décidera de la graver.", image: IMAGES.baguesLin },
  { id: "bapteme", nom: "Baptême", type: "Gourmette", matiere: "Or jaune 750 ‰", prix: 420, texte: "Une gourmette à plaque, réglable sur trois longueurs : du poignet d'un enfant à celui d'un adulte.", image: IMAGES.gourmette },
  { id: "suite", nom: "Suite", type: "Boucles d'oreilles", matiere: "Or jaune 750 ‰, perles", prix: 360, texte: "Deux créoles fines, qu'on peut aussi séparer : une pour toi, une pour la suite.", image: IMAGES.boite },
];

export type Inscription = { annee: string; prenom: string };
export type Numero = { numero: string; bijou: string; inscriptions: Inscription[] };

// Le registre : un numéro gravé, le bijou, les prénoms inscrits (avec l'accord de chacun).
export const REGISTRE: Numero[] = [
  { numero: "0112", bijou: "relais", inscriptions: [{ annee: "2026", prenom: "Claire" }] },
  { numero: "0108", bijou: "suite", inscriptions: [{ annee: "2026", prenom: "Nadia" }] },
  { numero: "0097", bijou: "heritiere", inscriptions: [{ annee: "2026", prenom: "Malik" }] },
  { numero: "0064", bijou: "relais", inscriptions: [{ annee: "2026", prenom: "Anne" }] },
  { numero: "0031", bijou: "bapteme", inscriptions: [{ annee: "2026", prenom: "Hélène" }] },
];

export const bijouDe = (n: Numero) => BIJOUX.find((b) => b.id === n.bijou)!;
export const trouver = (numero: string) => REGISTRE.find((n) => n.numero === numero.padStart(4, "0"));
export const euros = (n: number) => `${n.toLocaleString("fr-FR").replace(/ /g, " ")}\u00a0€`;

export const QUESTIONS = [
  { q: "Qu'est-ce qui est inscrit au registre\u00a0?", r: "Un prénom et une année. Jamais de nom de famille, de ville ni de photo. Rien n'est inscrit sans l'accord de la personne, et chacune peut faire retirer sa ligne à tout moment, sans se justifier." },
  { q: "Où est gravé le numéro\u00a0?", r: "À l'intérieur de l'anneau, au dos de la plaque ou sur le fermoir : là où personne ne le voit. Le numéro n'est pas un poinçon ; les poinçons obligatoires de l'or sont apposés à côté, comme la loi l'exige." },
  { q: "Comment inscrire le nom suivant\u00a0?", r: "Quand tu donnes ton bijou, la personne qui le reçoit entre son numéro sur la page « Transmettre ». On vérifie avec toi, puis sa ligne s'ajoute sous la tienne." },
  { q: "Et si la taille ne va pas à la personne suivante\u00a0?", r: "Une mise à taille par transmission est faite à la boutique, sans frais. Les anneaux sont assez épais pour être retaillés." },
  { q: "Je peux changer d'avis après un achat en ligne\u00a0?", r: "Oui : tu as quatorze jours après la réception pour te rétracter (code de la consommation, art. L221-18), sauf pour un bijou gravé à ta demande d'un texte personnel." },
];
