// Tout ce qu'affiche le site de Premier Billet, cabinet d'expertise comptable fictif
// imaginé dans la vidéo « Si je devais créer un cabinet d'expertise comptable ».
//
// Règles tenues ici (décret n° 2012-432 du 30 mars 2012, art. 152) : information utile,
// expression « décente et empreinte de retenue », aucune inexactitude, aucun élément
// comparatif ; moyens de promotion « mis en œuvre avec discrétion » — d'où le cadre
// réservé aux clients du cabinet, jamais promis au public. Vouvoiement partout.
// Honoraires hors taxes (clientèle professionnelle), d'exemple, fixés dans la lettre de
// mission (ordonnance n° 45-2138, art. 24).
import type { CSSProperties } from "react";

export const DOSSIER = "/exemples/premier-billet";

export const cabinet = {
  nom: "Premier Billet",
  signature: "Le premier se fête. Les autres se comptent.",
  adresse: ["12 rue de l'Exemple", "00000 Ville-Exemple"],
  telephone: "01 99 00 74 26",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/premiere-facture`, libelle: "Votre première facture" },
  { href: `${DOSSIER}/le-cadre`, libelle: "Le cadre" },
  { href: `${DOSSIER}#missions`, libelle: "Missions" },
  { href: `${DOSSIER}#honoraires`, libelle: "Honoraires" },
  { href: `${DOSSIER}#rendez-vous`, libelle: "Rendez-vous" },
];

export const SOMBRE = {
  "--fond": "#1E3B32",
  "--encre": "#F3EBD8",
  "--doux": "#D9CFB8",
  "--accent": "#C9A227",
  "--sur-accent": "#1E3B32",
  "--accent-texte": "#E0C25A",
  "--carte": "#274A3F",
  "--trait": "#3C5E52",
} as CSSProperties;

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const photo = (fichier: string, largeur: number, hauteur: number, alt: string): Photo => ({
  src: `/exemples/premier-billet/${fichier}.webp`, largeur, hauteur, alt,
});

export const photos = {
  colis: photo("colis", 1400, 933, "Deux petits paquets en papier kraft ficelés, une carte blanche et une enveloppe"),
  poterie: photo("atelier-poterie", 1200, 750, "Deux mains façonnent un pot d'argile sur un tour de potier"),
  cadre: photo("cadre-vide", 1200, 800, "Un cadre en bois clair, vide, accroché à un mur blanc dans la lumière"),
};

/* ---------- Les mentions de base d'une facture (code de commerce, art. L441-9 ;
   CGI, annexe II, art. 242 nonies A). Une partie seulement : d'autres s'ajoutent selon
   la situation, et la réforme de la facturation électronique en ajoute. ---------- */

export const MENTIONS = [
  "Un numéro unique",
  "La date",
  "Votre SIREN",
  "Le nom et l'adresse du client",
  "Le prix HT, et la TVA ou sa mention",
  "La date de paiement",
];

export const MISSIONS = [
  { titre: "Choisir le statut", texte: "Micro-entreprise, EURL, SASU : ce que chacun change pour vous, chiffré sur votre activité." },
  { titre: "La première année", texte: "Vos premières factures, vos premières déclarations, le premier rendez-vous avec la banque." },
  { titre: "La TVA", texte: "Franchise ou non, les dates, les montants : un rappel avant chaque échéance." },
  { titre: "Le premier bilan", texte: "Comptes annuels, liasse fiscale, et une heure pour les relire ensemble." },
];

export const HONORAIRES = [
  { offre: "Première année · micro-entreprise", detail: "Suivi des recettes, rappels de déclaration, réponses écrites", prix: "45 € HT / mois" },
  { offre: "Première année · société (EURL, SASU)", detail: "Comptabilité, TVA, comptes annuels et liasse fiscale", prix: "135 € HT / mois" },
  { offre: "Création de société", detail: "Statuts, formalités d'immatriculation, ouverture du dossier", prix: "390 € HT, une fois" },
  { offre: "L'outil « première facture »", detail: "Sur ce site, pour tout le monde", prix: "Gratuit" },
];

export const METHODE = [
  { titre: "Un premier rendez-vous", texte: "Votre projet, votre statut, vos questions. Une heure, au cabinet ou par téléphone." },
  { titre: "La lettre de mission", texte: "Ce que nous faisons, et le prix, écrits et signés avant de commencer." },
  { titre: "La première facture", texte: "Nous la relisons avec vous avant qu'elle parte. Ensuite, vous savez faire." },
  { titre: "Le premier bilan", texte: "Un an plus tard, les comptes, et ce qu'ils racontent de votre première année." },
];

export const EQUIPE = [
  { initiales: "H. D.", role: "Expert-comptable inscrite au tableau de l'Ordre", phrase: "Signe les comptes et les lettres de mission." },
  { initiales: "O. K.", role: "Collaborateur comptable", phrase: "Suit les créateurs pendant leur première année." },
  { initiales: "C. F.", role: "Assistante", phrase: "Les rendez-vous, les dossiers, et les cadres." },
];

export const QUESTIONS = [
  {
    q: "L'outil de facture remplace-t-il un expert-comptable ?",
    r: "Non. Il rassemble les mentions de base d'une facture et vous aide à ne pas en oublier. Selon votre situation, d'autres mentions s'ajoutent ; nous vous disons lesquelles lors d'un rendez-vous.",
  },
  {
    q: "Le cadre, c'est pour tout le monde ?",
    r: "Non : il est réservé aux clients du cabinet. Le jour où vous encaissez votre première facture, nous vous l'envoyons, par la poste, avec un mot.",
  },
  {
    q: "Les honoraires affichés sont-ils définitifs ?",
    r: "Ce sont des exemples d'honoraires. Les vôtres sont fixés par écrit dans la lettre de mission, avant le début de la mission.",
  },
  {
    q: "Pourquoi « Premier Billet » ?",
    r: "Parce que certains commerçants encadrent le premier billet reçu, au-dessus de la caisse. Le premier se fête. Les autres se comptent : c'est notre métier.",
  },
];
