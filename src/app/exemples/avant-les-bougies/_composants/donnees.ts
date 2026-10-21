// Les données du site Avant les Bougies : une pâtisserie imaginaire qui commence par
// « Vous serez combien ? ». Les prix, les parts, le compteur du samedi et les dates
// sont des exemples. Les allergènes sont ceux qu'un vrai pâtissier établirait pour
// ces recettes classiques ; chaque fiche les montre avant toute commande.

export const DOSSIER = "/exemples/avant-les-bougies";

export const boutique = {
  nom: "Avant les Bougies",
  telephone: "01 99 00 74 26",
  telephoneLien: "+33199007426",
  adresse: ["Avant les Bougies, pâtisserie", "12 rue de l'Exemple", "00000 Exemple-Ville"],
  horaires: "Du mardi au samedi, 8 h – 19 h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#invites`, libelle: "Combien ?" },
  { href: `${DOSSIER}/gateaux`, libelle: "Les gâteaux" },
  { href: `${DOSSIER}/samedi`, libelle: "Le samedi" },
  { href: `${DOSSIER}#questions`, libelle: "Questions" },
];

export const euros = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).replace(/ | /g, " ") + " €";

/** Les 14 allergènes à déclarer (règlement (UE) n° 1169/2011, annexe II). */
export const ALLERGENES = [
  "Gluten", "Crustacés", "Œufs", "Poissons", "Arachides", "Soja", "Lait",
  "Fruits à coque", "Céleri", "Moutarde", "Sésame", "Sulfites", "Lupin", "Mollusques",
] as const;
export type Allergene = (typeof ALLERGENES)[number];

export type Gateau = {
  id: string;
  nom: string;
  photo: { src: string; alt: string; largeur: number; hauteur: number };
  parPart: number;
  recette: string;
  allergenes: Allergene[];
  precision?: string;
};

export const GATEAUX: Gateau[] = [
  {
    id: "fraisier",
    nom: "Fraisier",
    photo: { src: "/exemples/avant-les-bougies/fraisier.webp", alt: "Un fraisier entier, fraises coupées sur le pourtour, sur un fond blanc", largeur: 1000, hauteur: 693 },
    parPart: 3.2,
    recette: "Génoise, crème mousseline à la vanille, fraises entières.",
    allergenes: ["Gluten", "Œufs", "Lait"],
  },
  {
    id: "foret-noire",
    nom: "Forêt-noire",
    photo: { src: "/exemples/avant-les-bougies/foret-noire.webp", alt: "Un gâteau au chocolat en trois étages, crème et cerises", largeur: 900, hauteur: 1039 },
    parPart: 3.5,
    recette: "Génoise au chocolat, chantilly, cerises. Sans alcool.",
    allergenes: ["Gluten", "Œufs", "Lait", "Soja"],
    precision: "Soja : dans la lécithine du chocolat.",
  },
  {
    id: "paris-brest",
    nom: "Paris-brest",
    photo: { src: "/exemples/avant-les-bougies/paris-brest.webp", alt: "Un paris-brest garni de crème pralinée et d'amandes effilées", largeur: 900, hauteur: 1023 },
    parPart: 3.4,
    recette: "Pâte à choux, crème pralinée à la noisette, amandes effilées.",
    allergenes: ["Gluten", "Œufs", "Lait", "Fruits à coque"],
    precision: "Fruits à coque : noisettes et amandes.",
  },
];

/** Les tailles qu'on fait, en parts. Au-delà de la dernière : deux gâteaux. */
export const TAILLES = [6, 8, 10, 12, 15, 20, 25, 30];
export const tailleFaite = (invites: number) => TAILLES.find((t) => t >= invites) ?? null;
export const prix = (g: Gateau, parts: number) => Math.round(g.parPart * parts);

/** Le samedi : ce que le labo sort vraiment, et ce qui est déjà commandé (exemple). */
export const SAMEDI = { date: "samedi 24 octobre", suivant: "samedi 31 octobre", capacite: 12, commandes: [1, 2, 3, 5, 6, 8, 9, 10, 12] };

export const RAPPEL = { prenom: "Léo", age: 6, gateau: "Fraisier", parts: 20, livre: "samedi 10 octobre", message: "début septembre 2027" };

export const ETAPES = [
  { titre: "Vous serez combien ?", texte: "Un nombre, et le site montre les gâteaux qui conviennent, avec leur prix." },
  { titre: "Vous choisissez", texte: "La fiche de chaque gâteau dit ce qu'il y a dedans, allergènes compris, avant de commander." },
  { titre: "Le samedi", texte: "Douze gâteaux, c'est ce que le labo sort. Le site en vend douze, pas un de plus." },
  { titre: "Les bougies", texte: "Vous passez le prendre. Le reste, c'est la seconde juste avant de souffler." },
];

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  {
    q: "Combien coûte un gâteau d'anniversaire pour 20 personnes ?",
    r: "Chez nous, de 64 € (fraisier) à 70 € (forêt-noire), en prix d'exemple TTC. Tapez votre nombre d'invités en haut de la page : le site fait le calcul pour chaque gâteau.",
  },
  {
    q: "Et les allergènes ?",
    r: "Ils sont écrits sur chaque fiche, et rappelés juste avant de commander. En cas de doute ou d'allergie sévère, appelez-nous : on vous dit exactement ce qu'il y a dans l'atelier ce jour-là.",
  },
  {
    q: "Pourquoi douze gâteaux le samedi, pas plus ?",
    r: "Parce que c'est ce que le labo sort, bien, un samedi. Le compteur suit les vraies commandes : quand il en reste trois, il en reste trois. Quand c'est complet, le samedi suivant est ouvert.",
  },
  {
    q: "Je peux faire écrire un prénom ?",
    r: "Oui, sur une plaque en chocolat, à indiquer en commandant. C'est le seul « personnalisé » qu'on fait : le reste, c'est le gâteau.",
  },
  {
    q: "Le rappel de l'an prochain, c'est obligatoire ?",
    r: "Non. On vous pose la question à la livraison, la case n'est jamais cochée d'avance. Si vous dites oui, vous recevez un seul message par an, et un lien pour ne plus rien recevoir.",
  },
];
