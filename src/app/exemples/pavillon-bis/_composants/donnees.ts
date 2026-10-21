// Tout ce qu'affiche le site de Pavillon Bis, agence d'architecture fictive imaginée dans
// la vidéo « Si je devais créer un cabinet d'architecture » : uniquement les pavillons des
// années 70. Chaque projet, chaque budget, chaque maison du lotissement est un exemple.
//
// Règles tenues ici : publicité autorisée aux architectes (code de déontologie, art. 10
// bis) ; ni dénigrement ni comparaison avec un confrère (art. 18) ; rémunération annoncée
// avant tout engagement (art. 46) ; vie privée (C. civ., art. 9) : la visite du n° 14 et
// les avant / après se font avec l'accord des propriétaires, et le site le dit ; prix TTC
// marqués exemple (arrêté du 3 décembre 1987, art. 1).
import type { CSSProperties } from "react";

export const DOSSIER = "/exemples/pavillon-bis";

export const agence = {
  nom: "Pavillon Bis",
  signature: "Ta maison, deuxième version.",
  adresse: ["12 rue de l'Exemple", "00000 Ville-Exemple"],
  telephone: "01 99 00 96 14",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#ta-maison`, libelle: "Ta maison" },
  { href: `${DOSSIER}/maisons`, libelle: "Les trois maisons" },
  { href: `${DOSSIER}#lotissement`, libelle: "Le lotissement" },
  { href: `${DOSSIER}/visite-du-14`, libelle: "Samedi, le n° 14" },
  { href: `${DOSSIER}#questions`, libelle: "Questions" },
];

export const SOMBRE = {
  "--fond": "#2F3B35",
  "--encre": "#F4EFE6",
  "--doux": "#D8D2C4",
  "--accent": "#E3B04B",
  "--sur-accent": "#2F3B35",
  "--accent-texte": "#E3B04B",
  "--carte": "#3A4842",
  "--trait": "#4F5E57",
} as CSSProperties;

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const photo = (fichier: string, largeur: number, hauteur: number, alt: string): Photo => ({
  src: `/exemples/pavillon-bis/${fichier}.webp`, largeur, hauteur, alt,
});
export const photos = {
  sousSol: photo("sous-sol-sejour", 1400, 933, "Un séjour aménagé en demi-sous-sol, lambris de bois, canapé et fauteuil, une petite fenêtre haute"),
  salon: photo("salon-annees-70", 1400, 933, "Un salon aux couleurs chaudes : canapé vert, coussins ocre, fauteuils en bois, lampe arc"),
  jardin: photo("fenetre-jardin", 1200, 1690, "Un jardin vert vu à travers une grande fenêtre à petits bois noirs"),
};

/* ---------- Les trois maisons ---------- */

export type Modele = "plain" | "sous-sol" | "etage";

export const MODELES: {
  id: Modele;
  nom: string;
  avant: { annee: number; surface: string; texte: string };
  apres: string;
  budget: string;
  duree: string;
  detail: string[];
}[] = [
  {
    id: "plain",
    nom: "Plain-pied",
    avant: { annee: 1974, surface: "88 m²", texte: "88 m², couloir central, cuisine fermée" },
    apres: "La cuisine s'ouvre, une extension de 25 m² vitrée sur le jardin",
    budget: "72 000 € TTC",
    duree: "6 mois",
    detail: ["Le couloir disparaît : on entre dans la pièce de vie", "Une extension en bois, à toit plat, côté jardin", "Isolation des combles et de la toiture"],
  },
  {
    id: "sous-sol",
    nom: "Sur sous-sol",
    avant: { annee: 1976, surface: "95 m²", texte: "95 m², garage en bas" },
    apres: "Le sous-sol devient le séjour, ouvert sur le jardin",
    budget: "96 000 € TTC",
    duree: "8 mois",
    detail: ["Le garage devient le séjour, de plain-pied avec le jardin", "La porte de garage laisse place à une grande baie", "L'escalier intérieur relie enfin les deux niveaux"],
  },
  {
    id: "etage",
    nom: "À étage",
    avant: { annee: 1978, surface: "110 m²", texte: "110 m², chambres sous un toit mal isolé" },
    apres: "Isolée par l'extérieur, une façade en bois et deux grandes fenêtres à l'étage",
    budget: "84 000 € TTC",
    duree: "5 mois",
    detail: ["Isolation par l'extérieur, façade en bardage bois", "Deux fenêtres agrandies à l'étage, plein sud", "La salle de bains descend au rez-de-chaussée"],
  },
];

/* ---------- Le lotissement (exemple) ---------- */

export const LOTISSEMENT = { nom: "Lotissement des Tilleuls", annee: 1976, maisons: 36, colonnes: 6, transformee: 14 };

export const VISITE = {
  date: "Samedi 14 novembre 2026",
  heures: "de 10\u00a0h à 13\u00a0h",
  creneaux: [
    { libelle: "10 h 00", sous: "petit groupe" },
    { libelle: "10 h 30", sous: "petit groupe", pris: true },
    { libelle: "11 h 00", sous: "petit groupe" },
    { libelle: "11 h 30", sous: "petit groupe" },
    { libelle: "12 h 00", sous: "petit groupe", pris: true },
    { libelle: "12 h 30", sous: "petit groupe" },
  ],
};

export const TRANSFORMATIONS = [
  { titre: "Ouvrir le sous-sol", texte: "Le garage du bas devient la pièce de vie, de plain-pied avec le jardin." },
  { titre: "Isoler par l'extérieur", texte: "Une nouvelle peau, et la maison change de visage sans perdre un mètre carré." },
  { titre: "Agrandir de plain-pied", texte: "Une extension en bois côté jardin, là où la maison n'avait qu'une porte-fenêtre." },
  { titre: "Retrouver la lumière", texte: "Des fenêtres agrandies, un couloir supprimé, une cuisine ouverte." },
];

export const QUESTIONS = [
  {
    q: "Faut-il un architecte pour transformer mon pavillon ?",
    r: "Pas toujours. Pour un particulier qui construit pour lui-même, l'architecte devient obligatoire quand un permis de construire porte la surface de plancher de l'ensemble au-delà de 150 m². Beaucoup de pavillons des années 70 font moins de 110 m² : on te dit honnêtement de quoi ton projet a besoin.",
  },
  {
    q: "Les avant / après sont-ils de vraies maisons ?",
    r: "Sur ce site de démonstration, ce sont des exemples dessinés. Sur un vrai site, chaque avant / après est publié avec l'accord écrit des propriétaires, sans adresse ni photo qui permette de les reconnaître.",
  },
  {
    q: "Qui peut venir voir le n° 14 ?",
    r: "Les voisins du lotissement, et tous ceux qui ont la même maison. Les propriétaires ont accepté d'ouvrir leur porte un samedi matin ; on visite par petits groupes, et on respecte les pièces qu'ils gardent fermées.",
  },
  {
    q: "Comment êtes-vous rémunérés ?",
    r: "Au forfait, fixé avant la mission, ou selon la mission. Avant tout engagement, nous te communiquons les modalités de notre rémunération ; elles figurent au contrat.",
  },
];
