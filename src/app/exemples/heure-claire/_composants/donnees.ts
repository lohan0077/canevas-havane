// Tout ce qu'affiche le site d'Heure Claire, cabinet d'expertise comptable fictif imaginé
// dans la vidéo « Si je devais remplir l'agenda d'un expert-comptable ».
//
// Règles tenues ici (décret n° 2012-432 du 30 mars 2012, art. 152) : une information
// utile, une expression « décente et empreinte de retenue », aucune inexactitude, aucun
// élément comparatif. D'où le vouvoiement, des phrases sobres, aucune comparaison avec
// un autre cabinet, aucune promesse. Les honoraires affichés sont une indication : ils
// sont fixés par écrit, dans la lettre de mission, avant de commencer (ordonnance
// n° 45-2138, art. 24). Prix hors taxes : la clientèle est professionnelle, et le site
// le dit ; le TTC est donné à côté.
import type { CSSProperties } from "react";

export const DOSSIER = "/exemples/heure-claire";

export const cabinet = {
  nom: "Heure Claire",
  accroche: "Expertise comptable · créateurs, indépendants, SCI",
  adresse: ["12 rue de l'Exemple", "00000 Ville-Exemple"],
  telephone: "01 99 00 63 18",
  horaires: "Du lundi au vendredi, de 9 h à 18 h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/honoraires`, libelle: "Honoraires" },
  { href: `${DOSSIER}/delai`, libelle: "Délai de réponse" },
  { href: `${DOSSIER}#methode`, libelle: "Méthode" },
  { href: `${DOSSIER}#questions`, libelle: "Questions" },
  { href: `${DOSSIER}#echange`, libelle: "Premier échange" },
];

/** Les bandes sombres : mêmes variables que le Cadre, autres valeurs (chaque couple tient 4,5:1). */
export const SOMBRE = {
  "--fond": "#141B24",
  "--encre": "#F6F5F1",
  "--doux": "#B9C1CC",
  "--accent": "#F2D049",
  "--sur-accent": "#141B24",
  "--accent-texte": "#F2D049",
  "--carte": "#1E2733",
  "--trait": "#344050",
} as CSSProperties;

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const photo = (fichier: string, largeur: number, hauteur: number, alt: string): Photo => ({
  src: `/exemples/heure-claire/${fichier}.webp`, largeur, hauteur, alt,
});

export const photos = {
  canape: photo("canape-soir", 1400, 934, "Un canapé vide dans la lumière chaude d'une lampe, un soir"),
  pieds: photo("pieds-leves", 1200, 1800, "Deux pieds en chaussettes posés sur l'accoudoir d'un canapé, sous une lampe"),
  feuilles: photo("deux-feuilles", 1200, 800, "Deux feuilles blanches tenues au mur par des pinces dorées"),
};

/* ---------- Le chiffre du mois : le délai de réponse ----------
   Exemple. Sur un vrai site : le délai moyen entre la réception d'un message (jours
   ouvrés, 9 h – 18 h) et la première réponse écrite par une personne du cabinet. */

export const MOIS_DU_CHIFFRE = "octobre 2026";
export const HISTORIQUE = [
  { mois: "mai", minutes: 190, messages: 268, note: "" },
  { mois: "juin", minutes: 170, messages: 291, note: "" },
  { mois: "juil.", minutes: 200, messages: 244, note: "" },
  { mois: "août", minutes: 260, messages: 198, note: "Équipe réduite pendant trois semaines. Le chiffre est monté ; il est affiché quand même." },
  { mois: "sept.", minutes: 210, messages: 312, note: "" },
  { mois: "oct.", minutes: 220, messages: 305, note: "" },
];
export const heures = (m: number) => `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")}`;
export const DELAI_DU_MOIS = HISTORIQUE[HISTORIQUE.length - 1].minutes;

/* ---------- Les honoraires (exemples, par mois, hors taxes) ---------- */

export type Statut = "micro" | "eurl" | "sasu" | "sci";
export const STATUTS: { id: Statut; court: string; long: string; plafond: number; compris: string[]; paliers: [number, number][] }[] = [
  {
    id: "micro",
    court: "Micro",
    long: "Micro-entreprise",
    plafond: 200_000,
    compris: ["Contrôle de votre livre des recettes", "Rappel avant chaque déclaration de chiffre d'affaires", "Réponses à vos questions, par écrit"],
    paliers: [[30_000, 39], [80_000, 49], [200_000, 69]],
  },
  {
    id: "eurl",
    court: "EURL",
    long: "EURL",
    plafond: 500_000,
    compris: ["Tenue ou révision de la comptabilité", "Comptes annuels et liasse fiscale", "Déclarations de TVA", "Approbation annuelle des comptes"],
    paliers: [[30_000, 119], [80_000, 139], [150_000, 169], [300_000, 219], [500_000, 269]],
  },
  {
    id: "sasu",
    court: "SASU",
    long: "SASU",
    plafond: 500_000,
    compris: ["Tenue ou révision de la comptabilité", "Comptes annuels et liasse fiscale", "Déclarations de TVA", "Approbation annuelle des comptes"],
    paliers: [[30_000, 129], [80_000, 149], [150_000, 179], [300_000, 229], [500_000, 279]],
  },
  {
    id: "sci",
    court: "SCI",
    long: "SCI à l'impôt sur le revenu",
    plafond: 200_000,
    compris: ["Comptabilité des loyers et des charges", "Déclaration annuelle de la SCI", "Assemblée annuelle"],
    paliers: [[50_000, 59], [120_000, 79], [200_000, 99]],
  },
];

export function honoraires(statut: Statut, ca: number) {
  const s = STATUTS.find((x) => x.id === statut) ?? STATUTS[0];
  return (s.paliers.find(([jusqua]) => ca <= jusqua) ?? s.paliers[s.paliers.length - 1])[1];
}
export const euros = (n: number) => `${n.toLocaleString("fr-FR", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })} €`;

/* ---------- La méthode, l'équipe, les questions ---------- */

export const METHODE = [
  { titre: "Un premier échange", duree: "30 minutes", texte: "Votre activité, votre statut, ce que vous attendez de nous. Sans engagement." },
  { titre: "La lettre de mission", duree: "avant de commencer", texte: "Ce que nous faisons, ce que vous faites, et le prix : écrit, signé, avant toute mission." },
  { titre: "Vos pièces, en semaine", duree: "chaque mois", texte: "Vous déposez vos justificatifs quand vous voulez ; nous les classons du lundi au vendredi." },
  { titre: "La clôture", duree: "une fois par an", texte: "Comptes annuels, déclarations, et un rendez-vous pour les relire ensemble." },
];

export const EQUIPE = [
  { initiales: "N. B.", role: "Expert-comptable inscrit au tableau de l'Ordre", phrase: "Signe les comptes annuels et les lettres de mission." },
  { initiales: "P. G.", role: "Collaboratrice comptable", phrase: "Suit les SASU et les EURL au quotidien." },
  { initiales: "R. T.", role: "Collaborateur comptable", phrase: "Suit les micro-entreprises et les SCI." },
];

export const QUESTIONS = [
  {
    q: "Un expert-comptable est-il obligatoire ?",
    r: "En règle générale, non : ce qui est obligatoire, c'est de tenir une comptabilité adaptée à votre statut et de déposer vos déclarations. Lors du premier échange, nous vous disons honnêtement si votre situation justifie un accompagnement.",
  },
  {
    q: "Le prix affiché est-il celui que je paierai ?",
    r: "C'est une indication. Vos honoraires sont fixés par écrit, dans la lettre de mission, avant le début de la mission. Ils ne changent pas sans un avenant signé.",
  },
  {
    q: "Comment le délai de réponse est-il calculé ?",
    r: "C'est le délai moyen entre la réception de votre message, du lundi au vendredi de 9 h à 18 h, et la première réponse écrite par une personne du cabinet. Les réponses automatiques ne comptent pas. Il est mis à jour le 1er de chaque mois.",
  },
  {
    q: "Et si le délai augmente ?",
    r: "Il est affiché tel quel, avec une phrase pour l'expliquer. En août, il est monté : l'équipe était réduite.",
  },
  {
    q: "Pourquoi ne comparez-vous pas vos prix à ceux d'autres cabinets ?",
    r: "Notre code de déontologie exclut tout élément comparatif dans notre communication. Nous publions nos propres prix et notre propre délai, rien d'autre.",
  },
];
