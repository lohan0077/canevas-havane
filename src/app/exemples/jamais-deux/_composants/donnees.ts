// Les données du site Jamais Deux : une créatrice de bijoux imaginaire, des pièces
// numérotées, chacune faite une fois. Tout est inventé : numéros, prix, dates, ventes.

export const DOSSIER = "/exemples/jamais-deux";

export const entreprise = {
  nom: "Jamais Deux",
  creatrice: "Lise",
  telephone: "01 99 00 47 47", // tranche réservée par l'ARCEP aux œuvres de fiction
  adresse: "12 rue de l'Exemple",
  horaires: "Atelier ouvert sur rendez-vous, du mardi au samedi",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/pieces`, libelle: "Les pièces" },
  { href: `${DOSSIER}#vendredi`, libelle: "Vendredi 18 h" },
  { href: `${DOSSIER}/atelier`, libelle: "L'atelier" },
  { href: `${DOSSIER}#questions`, libelle: "Questions" },
];

export type Forme = "bague" | "boucles" | "pendentif" | "jonc";

export type Piece = {
  numero: number;
  nom: string;
  forme: Forme;
  matiere: string;
  pierre?: { nom: string; couleur: string };
  taille: string;
  prix: number;              // TTC, prix d'exemple
  faiteLe: string;
  sortie: string;            // le vendredi où elle est sortie
  partieLe?: string;         // vendue : sa page reste, avec un tampon
  histoire: string;
  photo?: { src: string; alt: string };
};

// Les images servies depuis public/exemples/jamais-deux (crédits dans les mentions légales).
export const IMAGES = {
  bagueMartelee: { src: "/exemples/jamais-deux/bague-martelee.webp", largeur: 1200, hauteur: 800, alt: "Deux anneaux d'argent martelés, posés sur un billot de bois" },
  baguesFeuille: { src: "/exemples/jamais-deux/bagues-feuille.webp", largeur: 1200, hauteur: 800, alt: "Deux anneaux d'argent posés sur une grande feuille sombre" },
  soudureBloc: { src: "/exemples/jamais-deux/soudure-bloc.webp", largeur: 900, hauteur: 599, alt: "Une flamme de chalumeau sur un bloc de soudure, une pince tient la pièce" },
  flamme: { src: "/exemples/jamais-deux/flamme.webp", largeur: 900, hauteur: 600, alt: "Un anneau chauffé au rouge dans la flamme, sur l'établi" },
  ajustage: { src: "/exemples/jamais-deux/ajustage.webp", largeur: 900, hauteur: 600, alt: "Deux mains ajustent une petite pièce d'argent avec un outil" },
};

// Le film de fabrication d'une pièce : quatre plans, quinze secondes. Sur ce site de
// démonstration, des photos tiennent lieu de film.
export const FILM = [
  { image: IMAGES.soudureBloc, legende: "Souder l'anneau", temps: "0:00" },
  { image: IMAGES.flamme, legende: "Le recuire à la flamme", temps: "0:04" },
  { image: IMAGES.ajustage, legende: "L'ajuster à la taille", temps: "0:08" },
  { image: IMAGES.bagueMartelee, legende: "Le marteler, le polir", temps: "0:12" },
];

const ARGENT = "Argent 925 ‰";

export const PIECES: Piece[] = [
  { numero: 41, nom: "Galet", forme: "bague", matiere: ARGENT, pierre: { nom: "labradorite", couleur: "#5D7A8C" }, taille: "Taille 52", prix: 95, faiteLe: "10 septembre", sortie: "12 septembre", partieLe: "12 septembre", histoire: "Une pierre plate, sertie à plat, comme un galet tenu dans la main." },
  { numero: 42, nom: "Pluie lente", forme: "boucles", matiere: ARGENT, taille: "Hauteur 3 cm", prix: 70, faiteLe: "11 septembre", sortie: "12 septembre", histoire: "Deux gouttes d'argent qui ne tombent pas tout à fait à la même hauteur." },
  { numero: 43, nom: "Lune basse", forme: "pendentif", matiere: ARGENT, pierre: { nom: "pierre de lune", couleur: "#C9C3D6" }, taille: "Chaîne de 45 cm", prix: 110, faiteLe: "18 septembre", sortie: "19 septembre", partieLe: "21 septembre", histoire: "Une demi-lune posée sous la chaîne, sa pierre tournée vers le bas." },
  { numero: 44, nom: "Fil tordu", forme: "bague", matiere: ARGENT, taille: "Taille 56", prix: 65, faiteLe: "24 septembre", sortie: "26 septembre", partieLe: "26 septembre", histoire: "Trois fils torsadés à la main, puis aplatis au marteau sur le dessus." },
  { numero: 45, nom: "Marée", forme: "jonc", matiere: ARGENT, taille: "Diamètre 62 mm", prix: 140, faiteLe: "25 septembre", sortie: "26 septembre", histoire: "Un jonc ouvert, plus épais d'un côté que de l'autre, comme une vague." },
  { numero: 46, nom: "Sceau", forme: "bague", matiere: ARGENT, pierre: { nom: "onyx", couleur: "#2B2B2E" }, taille: "Taille 58", prix: 120, faiteLe: "1er octobre", sortie: "3 octobre", partieLe: "3 octobre", histoire: "Une chevalière basse, son onyx coupé net, sans gravure : à qui la portera de la signer." },
  { numero: 47, nom: "Martelée", forme: "bague", matiere: ARGENT, taille: "Taille 54", prix: 85, faiteLe: "2 octobre", sortie: "3 octobre", histoire: "Un anneau large, martelé à petits coups jusqu'à ce que la lumière y accroche. Les marques ne se refont pas deux fois.", photo: { src: IMAGES.bagueMartelee.src, alt: IMAGES.bagueMartelee.alt } },
  { numero: 48, nom: "Braise", forme: "bague", matiere: ARGENT, pierre: { nom: "grenat", couleur: "#8C1C24" }, taille: "Taille 53", prix: 105, faiteLe: "14 octobre", sortie: "16 octobre", partieLe: "16 octobre", histoire: "Un grenat rond, serti clos, sur un anneau fin." },
  { numero: 49, nom: "Pluie fine", forme: "boucles", matiere: ARGENT, taille: "Hauteur 2 cm", prix: 60, faiteLe: "14 octobre", sortie: "16 octobre", histoire: "Deux traits d'argent, à peine plus longs qu'un cil." },
  { numero: 50, nom: "Écorce", forme: "pendentif", matiere: ARGENT, taille: "Chaîne de 50 cm", prix: 90, faiteLe: "15 octobre", sortie: "16 octobre", partieLe: "16 octobre", histoire: "Une plaque texturée au burin, comme l'écorce d'un bouleau." },
  { numero: 51, nom: "Ourlet", forme: "bague", matiere: ARGENT, taille: "Taille 55", prix: 75, faiteLe: "15 octobre", sortie: "16 octobre", partieLe: "17 octobre", histoire: "Un anneau dont le bord est replié sur lui-même, comme un tissu." },
  { numero: 52, nom: "Pierre d'eau", forme: "bague", matiere: ARGENT, pierre: { nom: "aigue-marine", couleur: "#7FB7C9" }, taille: "Taille 52", prix: 130, faiteLe: "15 octobre", sortie: "16 octobre", histoire: "Une aigue-marine claire, montée haute, qu'on voit de profil." },
  { numero: 53, nom: "Jonc martelé", forme: "jonc", matiere: ARGENT, taille: "Diamètre 60 mm", prix: 150, faiteLe: "16 octobre", sortie: "16 octobre", partieLe: "16 octobre", histoire: "Le même marteau que la pièce n° 47, sur un jonc : les marques, elles, sont autres." },
];

/** La dernière sortie du vendredi : six pièces. */
export const SORTIE = { date: "vendredi 16 octobre", numeros: [48, 49, 50, 51, 52, 53] };
/** La prochaine : une vraie date, six pièces encore à l'atelier. */
export const PROCHAINE = { date: "vendredi 23 octobre", heure: "18 h", numeros: "54 à 59" };

export const pieceNumero = (n: number) => PIECES.find((p) => p.numero === n);

export const euros = (n: number) => `${n}\u00a0€`;

export const QUESTIONS = [
  { q: "Une pièce unique, vraiment\u00a0?", r: "Oui. Chaque numéro est fait une fois, à l'atelier, et jamais refait : ni à l'identique, ni « presque pareil ». Quand une pièce est partie, son numéro reste à elle." },
  { q: "Pourquoi sa page reste-t-elle en ligne une fois vendue\u00a0?", r: "Parce que c'est son histoire : on y voit sa fabrication et la date où elle est partie. Jamais le nom ni la ville de la personne qui l'a achetée." },
  { q: "Et si la taille ne me va pas\u00a0?", r: "Une bague s'ajuste d'une taille, en plus ou en moins, à l'atelier, sans frais. Au-delà, ce serait une autre pièce : on en parle avant." },
  { q: "En quoi sont faits les bijoux\u00a0?", r: "En argent massif au titre de 925 millièmes. Les obligations de titre et de poinçon du code général des impôts s'appliquent aux bijoux en métal précieux ; chaque fiche indique le titre." },
  { q: "Je peux renvoyer une pièce\u00a0?", r: "Oui : tu as quatorze jours après la réception pour changer d'avis, sans te justifier (code de la consommation, art. L221-18). Le retour est à ta charge, le remboursement intégral." },
  { q: "Comment être prévenue de la sortie du vendredi\u00a0?", r: "Par la lettre du vendredi, si tu t'y inscris : elle part à 17 h avec les six pièces, une heure avant le site. Une lettre par semaine, pas plus, et un lien pour se désinscrire dans chacune." },
];
