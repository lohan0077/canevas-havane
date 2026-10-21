// Tout ce qu'affiche le site de Samedi Chantier, loueur de mini-pelles imaginaire.
// Entreprise fictive : chaque prix, chaque date, chaque durée est un exemple, et le
// site le dit.
//
// Les règles tenues ici (voir Videos/agenda-loueurs/SOURCES.md) :
//   - les prix sont TTC, pour des particuliers, et marqués « exemple » ;
//   - aucune capacité d'engin n'est affirmée sans « capacité du fabricant » ;
//   - creuser oblige à déclarer les travaux aux exploitants de réseaux (DT-DICT),
//     particuliers compris : le site le dit avant le bouton, et « on t'aide » ;
//   - aucune durée de travaux promise : « estimation d'exemple, selon ton terrain » ;
//   - les disponibilités « prises » sont un exemple, et la page le dit (pas de fausse
//     rareté, C. consom. art. L. 121-4, 7°) ; aucun avis, aucune note.

export const DOSSIER = "/exemples/samedi-chantier";

export const entreprise = {
  nom: "Samedi Chantier",
  telephone: "06 39 98 21 47",
  telephoneLien: "+33639982147",
  siret: "000 000 000 00000",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/mini-pelle-1-5-tonne`, libelle: "Mini-pelle 1,5 t" },
  { href: `${DOSSIER}#machines`, libelle: "Les machines" },
  { href: `${DOSSIER}/disponibilites`, libelle: "Disponibilités" },
  { href: `${DOSSIER}/dt-dict`, libelle: "DT-DICT" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };

export const photos = {
  godet: { src: `${DOSSIER}/godet.webp`, largeur: 1400, hauteur: 933, alt: "Le godet jaune d'une pelle mécanique plonge dans un tas de terre, des arbres au loin" },
  tranchee: { src: `${DOSSIER}/tranchee.webp`, largeur: 1200, hauteur: 803, alt: "Un godet creuse une tranchée dans une terre caillouteuse" },
  godets: { src: `${DOSSIER}/godets-terrasse.webp`, largeur: 1200, hauteur: 805, alt: "Trois godets de mini-pelle posés sur les dalles d'une terrasse, au bord d'un massif" },
} satisfies Record<string, Photo>;

/** « 1 290 € » : espace fine insécable pour les milliers, insécable avant €. */
export const euros = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;

export type IdMachine = "mp15" | "mp25" | "plaque" | "betonniere" | "rogneuse" | "dumper";

export type Machine = {
  id: IdMachine;
  nom: string;
  court: string;
  usage: string;
  jour: number;         // la première journée, TTC, livraison comprise (exemple)
  jourEnPlus: number;   // chaque journée suivante (exemple)
  chauffeur?: number;   // la journée avec chauffeur, carburant compris (exemple)
  fabricant: string[];  // caractéristiques : capacité du fabricant
};

export const MACHINES: Machine[] = [
  {
    id: "mp15", nom: "Mini-pelle 1,5 tonne", court: "Mini-pelle 1,5 t",
    usage: "Tranchées, fondations de terrasse, petites fouilles. Celle qu'on réserve le plus.",
    jour: 190, jourEnPlus: 140, chauffeur: 480,
    fabricant: ["Profondeur de fouille 2,2 m", "Largeur 0,99 m", "Godets de 30 et 60 cm"],
  },
  {
    id: "mp25", nom: "Mini-pelle 2,5 tonnes", court: "Mini-pelle 2,5 t",
    usage: "Terrassement, nivellement, grosses souches. Pour un terrain dégagé.",
    jour: 240, jourEnPlus: 180, chauffeur: 540,
    fabricant: ["Profondeur de fouille 2,6 m", "Largeur 1,5 m", "Lame de nivellement"],
  },
  {
    id: "plaque", nom: "Plaque vibrante", court: "Plaque vibrante",
    usage: "Compacter le gravier sous une terrasse, une allée, un abri.",
    jour: 60, jourEnPlus: 40,
    fabricant: ["Largeur de travail 50 cm", "Poids 90 kg"],
  },
  {
    id: "betonniere", nom: "Bétonnière 160 litres", court: "Bétonnière",
    usage: "Couler une dalle, des plots, un muret. Électrique, sur roues.",
    jour: 35, jourEnPlus: 20,
    fabricant: ["Cuve de 160 litres", "Branchement 230 V"],
  },
  {
    id: "rogneuse", nom: "Rogneuse de souches", court: "Rogneuse",
    usage: "Faire disparaître une souche sous le niveau du sol, sans tout arracher.",
    jour: 150, jourEnPlus: 110, chauffeur: 380,
    fabricant: ["Souches jusqu'à 40 cm de diamètre", "Passe un portillon de 80 cm"],
  },
  {
    id: "dumper", nom: "Mini-dumper", court: "Mini-dumper",
    usage: "Sortir la terre du jardin sans abîmer la pelouse à la brouette.",
    jour: 120, jourEnPlus: 90,
    fabricant: ["Charge utile 500 kg", "Benne basculante"],
  },
];

export const machine = (id: IdMachine) => MACHINES.find((m) => m.id === id)!;

/** Le prix d'une machine pour un nombre de jours, avec ou sans chauffeur. Exemple. */
export const prixMachine = (m: Machine, jours: number, avecChauffeur: boolean) =>
  avecChauffeur && m.chauffeur ? m.chauffeur * jours : m.jour + m.jourEnPlus * (jours - 1);

export type Ligne = { id: IdMachine; jours: number };

export type Projet = {
  id: string;
  libelle: string;
  court: string;
  quantite: { etiquette: string; unite: string; min: number; max: number; pas: number; depart: number };
  surtitre: (q: number) => string;
  lignes: (q: number) => Ligne[];
  duree: (q: number) => string;
  hypothese: string;
};

export const PROJETS: Projet[] = [
  {
    id: "tranchee",
    libelle: "Creuser une tranchée",
    court: "Tranchée",
    quantite: { etiquette: "Longueur", unite: "mètres", min: 5, max: 60, pas: 5, depart: 20 },
    surtitre: (q) => `Ta tranchée · ${q} mètres`,
    lignes: (q) => [{ id: "mp15", jours: q <= 25 ? 1 : q <= 45 ? 2 : 3 }],
    duree: (q) => (q <= 25 ? "Une journée suffit" : q <= 45 ? "Deux journées" : "Trois journées"),
    hypothese: "Une tranchée de 50 cm de profondeur, en terre ordinaire.",
  },
  {
    id: "terrasse",
    libelle: "Couler une terrasse",
    court: "Terrasse",
    quantite: { etiquette: "Surface", unite: "m²", min: 10, max: 60, pas: 5, depart: 20 },
    surtitre: (q) => `Ta terrasse · ${q} m²`,
    lignes: (q) => [{ id: "mp15", jours: 1 }, { id: "plaque", jours: 1 }, { id: "betonniere", jours: q <= 25 ? 1 : 2 }],
    duree: (q) => (q <= 25 ? "Un week-end : décaisser samedi, couler dimanche" : "Deux week-ends"),
    hypothese: "Décaisser 20 cm, compacter le gravier, couler une dalle de 12 cm.",
  },
  {
    id: "souche",
    libelle: "Arracher une souche",
    court: "Souche",
    quantite: { etiquette: "Souches", unite: "souches", min: 1, max: 6, pas: 1, depart: 2 },
    surtitre: (q) => `Ton jardin · ${q} souche${q > 1 ? "s" : ""}`,
    lignes: (q) => [{ id: "rogneuse", jours: q <= 3 ? 1 : 2 }],
    duree: (q) => (q <= 3 ? "Une journée suffit" : "Deux journées"),
    hypothese: "Des souches de 40 cm de diamètre au plus, accessibles par un portillon.",
  },
  {
    id: "niveler",
    libelle: "Niveler un terrain",
    court: "Terrain",
    quantite: { etiquette: "Surface", unite: "m²", min: 50, max: 600, pas: 50, depart: 200 },
    surtitre: (q) => `Ton terrain · ${q} m²`,
    lignes: (q) => [{ id: "mp25", jours: q <= 250 ? 1 : 2 }, { id: "plaque", jours: q <= 250 ? 1 : 2 }],
    duree: (q) => (q <= 250 ? "Une journée suffit" : "Deux journées"),
    hypothese: "Un terrain dégagé, sans arbres à garder, une pente légère.",
  },
];

export type EtatCase = "libre" | "pris";

/** Les samedis d'avril 2027 (vérifiés : ce sont des samedis). Les « pris » sont un exemple. */
export const SAMEDIS = [
  { id: "3-avril", court: "3 avr.", long: "samedi 3 avril 2027" },
  { id: "10-avril", court: "10 avr.", long: "samedi 10 avril 2027" },
  { id: "17-avril", court: "17 avr.", long: "samedi 17 avril 2027" },
  { id: "24-avril", court: "24 avr.", long: "samedi 24 avril 2027" },
];

export const PLANNING: { id: IdMachine; etats: EtatCase[] }[] = [
  { id: "mp15", etats: ["pris", "libre", "libre", "pris"] },
  { id: "mp25", etats: ["libre", "pris", "pris", "libre"] },
  { id: "plaque", etats: ["libre", "libre", "pris", "libre"] },
  { id: "rogneuse", etats: ["libre", "pris", "libre", "libre"] },
];

export const DEROULE = [
  { quand: "Vendredi, 18 h", titre: "On livre", texte: "La machine arrive chez toi, sur notre camion. Elle passe le portail : on a mesuré au téléphone." },
  { quand: "Vendredi, 18 h 20", titre: "Vingt minutes de prise en main", texte: "On te montre les commandes, sur ton terrain, jusqu'à ce que ce soit naturel." },
  { quand: "Samedi, 8 h", titre: "Tu creuses", texte: "Ta DT-DICT est faite, les réponses sont arrivées : la journée est à toi." },
  { quand: "Samedi, 18 h", titre: "Le but : fini", texte: "On a choisi la machine pour que ton chantier tienne dans la journée. Ton terrain a le dernier mot, mais c'est le but." },
  { quand: "Lundi, 8 h", titre: "On reprend", texte: "Tu n'as rien à rapporter. On repart avec la machine, tu gardes ton week-end." },
];

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  { q: "Je n'ai jamais conduit de mini-pelle. C'est possible ?", r: "On te fait vingt minutes de prise en main à la livraison, sur ton terrain. Les conditions pour conduire (âge, assurance) sont écrites dans le contrat de location (exemple). Si tu préfères ne pas toucher aux commandes : prends l'option avec chauffeur." },
  { q: "C'est quoi, la DT-DICT ?", r: "Une déclaration à faire avant de creuser, pour que les exploitants des réseaux enterrés (gaz, électricité, eau, fibre) te disent où passent leurs câbles et leurs tuyaux. Particuliers compris. On t'aide à la remplir : c'est gratuit et ça prend un quart d'heure au téléphone." },
  { q: "Et s'il pleut samedi ?", r: "Préviens-nous la veille avant midi : on décale sans frais au samedi libre suivant (exemple)." },
  { q: "Il y a une caution ?", r: "Oui : 1 500 € par empreinte bancaire, jamais encaissée si la machine revient comme elle est partie (exemple)." },
  { q: "Le carburant ?", r: "La machine arrive avec le plein. Tu la rends avec le plein, ou on complète au prix affiché à la livraison (exemple). Avec chauffeur, le carburant est compris." },
  { q: "Vous évacuez la terre ?", r: "Non : on loue des machines, pas un chantier clés en main. Pour sortir la terre du jardin, il y a le mini-dumper." },
];
