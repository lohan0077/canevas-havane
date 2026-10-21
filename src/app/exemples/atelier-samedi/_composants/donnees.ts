// Tout ce qu'affiche le site d'Atelier Samedi, agence d'architecture fictive imaginée dans
// la vidéo « Si je devais remplir l'agenda d'un architecte ».
//
// La règle de droit que le site applique (Code de l'urbanisme, R431-2 et R*421-14 ; loi
// n° 77-2 du 3 janvier 1977, art. 3 et 4), lue sur Légifrance le 15 et le 16/10/2026 :
//   - un particulier qui construit pour lui-même est dispensé d'architecte tant que la
//     surface de plancher de l'ensemble ne dépasse pas 150 m² ;
//   - la dispense tombe quand un PERMIS DE CONSTRUIRE fait passer l'ensemble au-delà ;
//   - sur une maison existante, jusqu'à 20 m² créés, une déclaration préalable suffit
//     (40 m² en zone urbaine d'un PLU, sauf si l'ensemble dépasse alors 150 m²) : pas de
//     permis, donc pas d'architecte imposé, même au-delà de 150 m² au total ;
//   - d'où : architecte obligatoire si plus de 20 m² sont créés ET si le total dépasse
//     150 m². (Entre 20 et 40 m² en zone urbaine, le permis n'est exigé que si le total
//     dépasse 150 m² : la conclusion est la même.)
//   - une société (SCI comprise) n'a pas la dispense : le site le dit, sans calculer.
// Code de déontologie des architectes (version du 01/07/2026) : publicité autorisée
// (art. 10 bis) ; ni dénigrement ni sous-évaluation trompeuse (art. 18) — les trente
// minutes du samedi ont un prix ; rémunération annoncée avant tout engagement (art. 46).
import type { CSSProperties } from "react";

export const DOSSIER = "/exemples/atelier-samedi";

export const agence = {
  nom: "Atelier Samedi",
  accroche: "Architecture · extensions, surélévations, maisons existantes",
  adresse: ["12 rue de l'Exemple", "00000 Ville-Exemple"],
  telephone: "01 99 00 85 30",
  prixRendezVous: "40 € TTC",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#outil`, libelle: "Architecte ou pas ?" },
  { href: `${DOSSIER}#projets`, libelle: "Projets" },
  { href: `${DOSSIER}#honoraires`, libelle: "Honoraires" },
  { href: `${DOSSIER}/rendez-vous`, libelle: "Le samedi" },
  { href: `${DOSSIER}#questions`, libelle: "Questions" },
];

export const SOMBRE = {
  "--fond": "#1C2B44",
  "--encre": "#EEF2F7",
  "--doux": "#B7C3D6",
  "--accent": "#E4F25B",
  "--sur-accent": "#16202C",
  "--accent-texte": "#E4F25B",
  "--carte": "#25385A",
  "--trait": "#3A4F73",
} as CSSProperties;

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const photo = (fichier: string, largeur: number, hauteur: number, alt: string): Photo => ({
  src: `/exemples/atelier-samedi/${fichier}.webp`, largeur, hauteur, alt,
});
export const photos = {
  lumiere: photo("puits-de-lumiere", 1200, 1600, "Une salle à manger longue et blanche, éclairée par un grand puits de lumière"),
  maquette: photo("maquette", 1200, 675, "Une maquette blanche de maison, posée sur un fond gris clair"),
  croquis: photo("croquis", 1200, 800, "Un croquis au crayon sur un carnet, avec une règle et une gomme"),
};

/* ---------- Architecte ou pas ? ---------- */

export const SEUIL = 150;
export const DECLARATION = 20;

export type Verdict = "aucune" | "declaration" | "obligatoire" | "libre";
export function verdict(maison: number, ajout: number): Verdict {
  if (ajout <= 0) return "aucune";
  if (ajout <= DECLARATION) return "declaration";
  return maison + ajout > SEUIL ? "obligatoire" : "libre";
}

export const APPORTS = ["La lumière, pensée avant les murs", "Le dossier de permis, monté", "Le chantier, suivi"];

/* ---------- Les projets (exemples) ---------- */

export type Projet = {
  slug: string;
  numero: number;
  titre: string;
  court: string;
  annee: number;
  existant: number;
  cree: number;
  budget: string;
  duree: string;
  autorisation: string;
  architecteObligatoire: boolean;
  resume: string;
  etapes: { quoi: string; quand: string }[];
  postes: { poste: string; montant: string }[];
  honoraires: string;
};

export const PROJETS: Projet[] = [
  {
    slug: "extension-1974",
    numero: 12,
    titre: "Extension 40 m², maison de 1974",
    court: "Extension 40 m²",
    annee: 1974,
    existant: 120,
    cree: 40,
    budget: "85 000 € TTC",
    duree: "7 mois",
    autorisation: "Permis compris",
    architecteObligatoire: true,
    resume: "Un séjour ouvert sur le jardin, plein sud, accolé à une maison de 1974. 120 m² + 40 m² : 160 m² au total, avec permis de construire. L'architecte était obligatoire ; il a surtout déplacé la cuisine.",
    etapes: [
      { quoi: "Esquisse et chiffrage", quand: "3 semaines" },
      { quoi: "Dossier de permis de construire", quand: "1 mois" },
      { quoi: "Instruction du permis par la mairie", quand: "2 mois" },
      { quoi: "Consultation des entreprises", quand: "1 mois" },
      { quoi: "Chantier", quand: "3 mois" },
    ],
    postes: [
      { poste: "Gros œuvre et fondations", montant: "31 000 €" },
      { poste: "Menuiseries et baie vitrée", montant: "17 500 €" },
      { poste: "Charpente, toiture, isolation", montant: "16 000 €" },
      { poste: "Électricité, chauffage, finitions", montant: "20 500 €" },
    ],
    honoraires: "Mission complète au forfait : 9 800 € TTC, fixé avant la mission (exemple).",
  },
  {
    slug: "garage-1988",
    numero: 9,
    titre: "Garage devenu séjour, maison de 1988",
    court: "Garage → séjour, 28 m²",
    annee: 1988,
    existant: 105,
    cree: 28,
    budget: "42 000 € TTC",
    duree: "4 mois",
    autorisation: "Déclaration préalable",
    architecteObligatoire: false,
    resume: "Un garage de 28 m² transformé en séjour, dans le volume existant, en zone urbaine d'un PLU : 28 m² de surface de plancher créés, 133 m² au total. Une déclaration préalable a suffi, l'architecte n'était pas obligatoire. Les propriétaires voulaient la lumière.",
    etapes: [
      { quoi: "Relevé et esquisse", quand: "2 semaines" },
      { quoi: "Déclaration préalable", quand: "1 mois d'instruction" },
      { quoi: "Chantier", quand: "2 mois et demi" },
    ],
    postes: [
      { poste: "Ouverture de la façade, menuiseries", montant: "14 000 €" },
      { poste: "Isolation, sol, chauffage", montant: "16 500 €" },
      { poste: "Électricité et finitions", montant: "11 500 €" },
    ],
    honoraires: "Mission de conception et de suivi au forfait : 5 200 € TTC (exemple).",
  },
  {
    slug: "surelevation-1962",
    numero: 7,
    titre: "Surélévation 55 m², maison de 1962",
    court: "Surélévation 55 m²",
    annee: 1962,
    existant: 90,
    cree: 55,
    budget: "138 000 € TTC",
    duree: "11 mois",
    autorisation: "Permis compris",
    architecteObligatoire: false,
    resume: "Un étage de 55 m² en ossature bois sur une maison de plain-pied de 90 m². 145 m² au total : sous le seuil, l'architecte n'était pas obligatoire. La structure existante, elle, demandait qu'on la regarde de près.",
    etapes: [
      { quoi: "Diagnostic de la structure", quand: "1 mois" },
      { quoi: "Esquisse, permis de construire", quand: "1 mois et demi" },
      { quoi: "Instruction du permis", quand: "2 mois" },
      { quoi: "Chantier", quand: "6 mois" },
    ],
    postes: [
      { poste: "Renforcement et ossature bois", montant: "58 000 €" },
      { poste: "Toiture et isolation", montant: "34 000 €" },
      { poste: "Escalier, menuiseries, finitions", montant: "46 000 €" },
    ],
    honoraires: "Mission complète au forfait : 13 600 € TTC (exemple).",
  },
];

/* ---------- Le samedi ---------- */

export const SAMEDIS = [
  { id: "7-novembre", libelle: "Samedi 7 novembre", court: "7 nov." },
  { id: "5-decembre", libelle: "Samedi 5 décembre", court: "5 déc." },
];
export const HEURES = ["9 h 00", "9 h 30", "10 h 00", "10 h 30", "11 h 00", "11 h 30"];
/** Créneaux déjà pris, par samedi (exemple). */
export const PRIS: Record<string, string[]> = {
  "7-novembre": ["9 h 00", "10 h 30", "11 h 00"],
  "5-decembre": ["10 h 00"],
};

export const QUESTIONS = [
  {
    q: "Architecte ou maître d'œuvre ?",
    r: "Quand l'architecte est obligatoire, seul un architecte peut établir le projet architectural du permis de construire. En dessous, tu as le choix ; un architecte est inscrit à l'Ordre, assuré, et tenu par un code de déontologie.",
  },
  {
    q: "Et si je construis avec une SCI ?",
    r: "La dispense jusqu'à 150 m² vaut pour un particulier qui construit pour lui-même. Une société, SCI comprise, ne l'a pas : dès qu'il faut un permis de construire, l'architecte est obligatoire.",
  },
  {
    q: "Le calcul de l'accueil suffit-il pour mon dossier ?",
    r: "C'est une première réponse, sur la surface de plancher. Ton PLU, l'emprise au sol, un secteur protégé peuvent changer la donne : c'est ce qu'on regarde en trente minutes, le samedi.",
  },
  {
    q: "Les trente minutes du samedi sont-elles gratuites ?",
    r: "Non : elles coûtent 40 € TTC (exemple), déduits si tu nous confies ensuite une mission. C'est le prix d'un vrai premier avis.",
  },
  {
    q: "Comment êtes-vous rémunérés ?",
    r: "Au forfait, fixé avant le début de la mission, ou selon la mission. Dans tous les cas, avant tout engagement, nous te communiquons les modalités de notre rémunération, et elles figurent au contrat.",
  },
];
