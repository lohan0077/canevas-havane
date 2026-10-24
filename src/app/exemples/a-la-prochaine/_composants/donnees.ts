// Les données du site À la Prochaine, marque de bijoux imaginaire filmée dans les deux
// vidéos des créatrices : « Créer une marque » (chaque bijou est gravé d'un numéro, ce
// numéro a sa page — le registre —, le premier nom est le tien, et en dessous une ligne
// vide) et « Remplir l'agenda » (chaque pièce est faite une fois, sa page porte le film
// de sa fabrication ; vendue, sa page reste, avec un tampon « Partie » ; la sortie du
// vendredi, 18 h, six pièces). Tout est inventé : numéros, prénoms, prix, dates, ventes.
//
// Règles tenues (Videos/agenda-createurs et marque-createurs, SOURCES.md) : une pièce
// unique l'est vraiment (C. conso., L121-2 et L121-4) ; aucun compte à rebours ; le
// registre ne publie qu'un prénom et une année, avec l'accord de chacun ; jamais le nom
// ni la ville de qui a acheté ; ni « artisan » ni « artisanal » (code de l'artisanat,
// L241-1) : « fait main » décrit la façon de faire.

export const DOSSIER = "/exemples/a-la-prochaine";

export const entreprise = {
  nom: "À la Prochaine",
  creatrice: "Lise",
  telephone: "01 99 00 21 12", // tranche réservée par l'ARCEP aux œuvres de fiction
  adresse: "12 rue de l'Exemple",
  horaires: "Atelier-boutique ouvert du mercredi au samedi, 11 h – 19 h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/pieces`, libelle: "Les pièces" },
  { href: `${DOSSIER}#vendredi`, libelle: "Vendredi 18 h" },
  { href: `${DOSSIER}/registre`, libelle: "Le registre" },
  { href: `${DOSSIER}/transmettre`, libelle: "Transmettre" },
  { href: `${DOSSIER}/atelier`, libelle: "L'atelier" },
];

export const IMAGES = {
  baguePortee: { src: `${DOSSIER}/bague-portee.webp`, largeur: 1000, hauteur: 1250, alt: "Une main glissée dans la poche d'un jean, une bague en or à l'annulaire" },
  baguesLin: { src: `${DOSSIER}/bagues-lin.webp`, largeur: 1200, hauteur: 1425, alt: "Deux bagues en or posées sur du lin, près d'un livre ouvert" },
  gourmette: { src: `${DOSSIER}/gourmette.webp`, largeur: 1200, hauteur: 1800, alt: "Une gourmette en or à plaque lisse, posée sur un drap blanc" },
  boite: { src: `${DOSSIER}/boite-a-bijoux.webp`, largeur: 1000, hauteur: 1334, alt: "Une boîte à bijoux ancienne : boucles d'oreilles en or et en perles, rangées sur du velours clair" },
  bagueMartelee: { src: `${DOSSIER}/bague-martelee.webp`, largeur: 1200, hauteur: 800, alt: "Deux anneaux d'argent martelés, posés sur un billot de bois" },
  baguesFeuille: { src: `${DOSSIER}/bagues-feuille.webp`, largeur: 1200, hauteur: 800, alt: "Deux anneaux d'argent posés sur une grande feuille sombre" },
  soudureBloc: { src: `${DOSSIER}/soudure-bloc.webp`, largeur: 900, hauteur: 599, alt: "Une flamme de chalumeau sur un bloc de soudure, une pince tient la pièce" },
  flamme: { src: `${DOSSIER}/flamme.webp`, largeur: 900, hauteur: 600, alt: "Un anneau chauffé au rouge dans la flamme, sur l'établi" },
  ajustage: { src: `${DOSSIER}/ajustage.webp`, largeur: 900, hauteur: 600, alt: "Deux mains ajustent une petite pièce d'argent avec un outil" },
};

// Le film de fabrication d'une pièce : quatre plans, quinze secondes. La marque étant
// fictive, des photos tiennent lieu de film, et le site le dit.
export const FILM = [
  { image: IMAGES.soudureBloc, legende: "Souder l'anneau", temps: "0:00" },
  { image: IMAGES.flamme, legende: "Le recuire à la flamme", temps: "0:04" },
  { image: IMAGES.ajustage, legende: "L'ajuster à la taille", temps: "0:08" },
  { image: IMAGES.bagueMartelee, legende: "Le marteler, le polir, le graver", temps: "0:12" },
];

export type Forme = "bague" | "boucles" | "pendentif" | "jonc" | "gourmette";
export type Inscription = { annee: string; prenom: string };

export type Piece = {
  numero: number;
  nom: string;
  forme: Forme;
  or?: boolean;              // or jaune 750 ‰ ; sinon argent 925 ‰
  pierre?: { nom: string; couleur: string };
  taille: string;
  prix: number;              // TTC, prix d'exemple
  faiteLe: string;
  sortie: string;            // le vendredi où elle est sortie
  partieLe?: string;         // vendue : sa page reste, avec un tampon
  registre?: Inscription[];  // les prénoms inscrits, avec l'accord de chacun
  histoire: string;
  photo?: { src: string; alt: string };
};

export const PIECES: Piece[] = [
  { numero: 41, nom: "Galet", forme: "bague", pierre: { nom: "labradorite", couleur: "#5D7A8C" }, taille: "Taille 52", prix: 95, faiteLe: "10 septembre", sortie: "11 septembre", partieLe: "11 septembre", registre: [{ annee: "2026", prenom: "Anne" }], histoire: "Une pierre plate, sertie à plat, comme un galet tenu dans la main." },
  { numero: 42, nom: "Pluie lente", forme: "boucles", taille: "Hauteur 3 cm", prix: 70, faiteLe: "11 septembre", sortie: "11 septembre", histoire: "Deux gouttes d'argent qui ne tombent pas tout à fait à la même hauteur." },
  { numero: 43, nom: "Lune basse", forme: "pendentif", pierre: { nom: "pierre de lune", couleur: "#C9C3D6" }, taille: "Chaîne de 45 cm", prix: 110, faiteLe: "17 septembre", sortie: "18 septembre", partieLe: "20 septembre", registre: [{ annee: "2026", prenom: "Nadia" }], histoire: "Une demi-lune posée sous la chaîne, sa pierre tournée vers le bas." },
  { numero: 44, nom: "Fil tordu", forme: "bague", taille: "Taille 56", prix: 65, faiteLe: "24 septembre", sortie: "25 septembre", partieLe: "25 septembre", histoire: "Trois fils torsadés à la main, puis aplatis au marteau sur le dessus." },
  { numero: 45, nom: "Marée", forme: "jonc", taille: "Diamètre 62 mm", prix: 140, faiteLe: "24 septembre", sortie: "25 septembre", histoire: "Un jonc ouvert, plus épais d'un côté que de l'autre, comme une vague." },
  { numero: 46, nom: "Sceau", forme: "bague", or: true, pierre: { nom: "onyx", couleur: "#2B2B2E" }, taille: "Taille 58", prix: 690, faiteLe: "1er octobre", sortie: "2 octobre", partieLe: "3 octobre", registre: [{ annee: "2026", prenom: "Claire" }], histoire: "Une chevalière basse en or, son onyx coupé net, laissé sans gravure : c'est la personne suivante qui décidera de la signer." },
  { numero: 47, nom: "Martelée", forme: "bague", taille: "Taille 54", prix: 85, faiteLe: "1er octobre", sortie: "2 octobre", histoire: "Un anneau large, martelé à petits coups jusqu'à ce que la lumière y accroche. Les marques ne se refont pas deux fois.", photo: { src: IMAGES.bagueMartelee.src, alt: IMAGES.bagueMartelee.alt } },
  { numero: 48, nom: "Braise", forme: "bague", pierre: { nom: "grenat", couleur: "#8C1C24" }, taille: "Taille 53", prix: 105, faiteLe: "14 octobre", sortie: "16 octobre", partieLe: "16 octobre", registre: [{ annee: "2026", prenom: "Hélène" }], histoire: "Un grenat rond, serti clos, sur un anneau fin." },
  { numero: 49, nom: "Pluie fine", forme: "boucles", taille: "Hauteur 2 cm", prix: 60, faiteLe: "14 octobre", sortie: "16 octobre", histoire: "Deux traits d'argent, à peine plus longs qu'un cil." },
  { numero: 50, nom: "Baptême", forme: "gourmette", or: true, taille: "Réglable : 14, 16 ou 18 cm", prix: 420, faiteLe: "15 octobre", sortie: "16 octobre", partieLe: "16 octobre", registre: [{ annee: "2026", prenom: "Malik" }], histoire: "Une gourmette en or à plaque lisse, réglable sur trois longueurs : du poignet d'un enfant à celui d'un adulte.", photo: { src: IMAGES.gourmette.src, alt: IMAGES.gourmette.alt } },
  { numero: 51, nom: "Ourlet", forme: "bague", taille: "Taille 55", prix: 75, faiteLe: "15 octobre", sortie: "16 octobre", partieLe: "17 octobre", histoire: "Un anneau dont le bord est replié sur lui-même, comme un tissu." },
  { numero: 52, nom: "Pierre d'eau", forme: "bague", pierre: { nom: "aigue-marine", couleur: "#7FB7C9" }, taille: "Taille 52", prix: 130, faiteLe: "15 octobre", sortie: "16 octobre", histoire: "Une aigue-marine claire, montée haute, qu'on voit de profil." },
  { numero: 53, nom: "Jonc martelé", forme: "jonc", taille: "Diamètre 60 mm", prix: 150, faiteLe: "16 octobre", sortie: "16 octobre", partieLe: "16 octobre", histoire: "Le même marteau que la pièce n° 47, sur un jonc : les marques, elles, sont autres." },
];

/** La dernière sortie du vendredi : six pièces. */
export const SORTIE = { date: "vendredi 16 octobre", numeros: [48, 49, 50, 51, 52, 53] };
/** La prochaine : une vraie date, six pièces encore à l'atelier. */
export const PROCHAINE = { date: "vendredi 23 octobre", heure: "18 h", numeros: "54 à 59" };

export const pieceNumero = (n: number) => PIECES.find((p) => p.numero === n);
/** Le numéro tel qu'il est gravé : quatre chiffres. */
export const grave = (n: number) => String(n).padStart(4, "0");
/** « 0046 », « 46 », « n° 46 » → la pièce, si elle existe. */
export const trouver = (saisie: string) => {
  const n = Number(saisie.replace(/\D/g, ""));
  return n ? pieceNumero(n) : undefined;
};
export const matiere = (p: Piece) => (p.or ? "Or jaune 750 ‰" : "Argent 925 ‰");
export const nomForme = (p: Piece) =>
  ({ bague: p.pierre && p.or ? "Chevalière" : "Bague", boucles: "Boucles d'oreilles", pendentif: "Pendentif", jonc: "Jonc", gourmette: "Gourmette" })[p.forme];

export const euros = (n: number) => `${n} €`;

/** Les réponses à la question posée sur les réseaux : imaginées, pour l'exemple. */
export const REPONSES = [
  { texte: "La bague de sa grand-mère", detail: "portée depuis le lycée" },
  { texte: "La gourmette de son baptême", detail: "agrandie deux fois" },
  { texte: "Une médaille sans nom", detail: "trouvée dans une boîte à bijoux" },
  { texte: "L'alliance de son grand-père", detail: "portée au pouce" },
];

export const QUESTIONS = [
  { q: "Une pièce unique, vraiment ?", r: "Oui. Chaque numéro est fait une fois, à l'atelier, et jamais refait : ni à l'identique, ni « presque pareil ». Quand une pièce est partie, son numéro reste à elle." },
  { q: "Où est gravé le numéro ?", r: "À l'intérieur de l'anneau, au dos de la plaque ou sur le fermoir : là où personne ne le voit. Le numéro n'est pas un poinçon ; les poinçons obligatoires de l'argent et de l'or sont apposés à côté, comme la loi l'exige." },
  { q: "Qu'est-ce qui est inscrit au registre ?", r: "Un prénom et une année. Jamais de nom de famille, de ville ni de photo. Rien n'est inscrit sans l'accord de la personne, et chacune peut faire retirer sa ligne à tout moment, sans se justifier." },
  { q: "Pourquoi sa page reste-t-elle en ligne une fois vendue ?", r: "Parce que c'est son histoire : on y voit sa fabrication, la date où elle est partie, et les prénoms de qui la porte — avec leur accord. Jamais le nom ni la ville de la personne qui l'a achetée." },
  { q: "Comment être prévenue de la sortie du vendredi ?", r: "Par la lettre du vendredi, si tu t'y inscris : elle part à 17 h avec les six pièces, une heure avant le site. Une lettre par semaine, pas plus, et un lien pour se désinscrire dans chacune." },
  { q: "Et si la taille ne va pas, à moi ou à la personne suivante ?", r: "Une bague s'ajuste d'une taille, en plus ou en moins, à l'atelier, sans frais. Et à chaque transmission, une mise à taille est offerte à la personne qui la reçoit." },
  { q: "Je peux renvoyer une pièce ?", r: "Oui : tu as quatorze jours après la réception pour changer d'avis, sans te justifier (code de la consommation, art. L221-18). Le retour est à ta charge, le remboursement intégral." },
];
