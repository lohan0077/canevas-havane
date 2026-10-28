// Tout ce qu'affiche le site de Pignon sur Pré, loueur imaginaire de tentes de réception
// et d'engins de jardin : « ton samedi, chez toi » — la tente pour la fête, la mini-pelle
// pour le chantier d'avant. Entreprise fictive : chaque prix, chaque date est un exemple,
// et le site le dit. Il réunit les deux vidéos des loueurs : « Créer une marque » (Pignon
// sur Pré, la tente posée sur la vue du ciel, le bal) et « Remplir l'agenda » (une seule
// question, « tu veux faire quoi ? », l'option avec chauffeur, les vraies disponibilités).
//
// Les règles tenues ici (Videos/marque-loueurs et agenda-loueurs, SOURCES.md) :
//   - capacités : celles du fabricant, jamais un calcul du site ;
//   - la vue du ciel est dessinée et le dit ; l'adresse tapée ne quitte pas le navigateur ;
//   - une tente qui reçoit du public ne se monte pas sans l'autorisation de la mairie ;
//   - creuser oblige à déclarer les travaux aux exploitants de réseaux (DT-DICT),
//     particuliers compris : le site le dit avant le bouton, et « on t'aide » ;
//   - aucune durée de travaux promise : « estimation d'exemple, selon ton terrain » ;
//   - prix TTC pour des particuliers, marqués « exemple » ; disponibilités « prises »
//     d'exemple, dites telles (C. consom., L. 121-4, 7°) ; aucun avis, aucune note.

export const DOSSIER = "/exemples/pignon-sur-pre";

export const entreprise = {
  nom: "Pignon sur Pré",
  // Tranche réservée par l'ARCEP aux œuvres de fiction : ce numéro ne sonne chez personne.
  telephone: "06 39 98 54 12",
  telephoneLien: "+33639985412",
  siret: "000 000 000 00000",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/tentes`, libelle: "Les tentes" },
  { href: `${DOSSIER}/engins`, libelle: "Les engins" },
  { href: `${DOSSIER}/disponibilites`, libelle: "Disponibilités" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };

export const photos = {
  pre: { src: `${DOSSIER}/pre.webp`, largeur: 1600, hauteur: 1199, alt: "Un pré en fleurs au coucher du soleil, un arbre seul à l'horizon" },
  tenteJardin: { src: `${DOSSIER}/tente-jardin.webp`, largeur: 1100, hauteur: 1649, alt: "Une tente de réception vitrée aperçue entre les arbres en fleurs d'un jardin" },
  village: { src: `${DOSSIER}/village.webp`, largeur: 1300, hauteur: 867, alt: "Un village aux toits gris vu d'une colline, une tente blanche montée près des vieux murs" },
  tenteNuit: { src: `${DOSSIER}/tente-nuit.webp`, largeur: 1200, hauteur: 800, alt: "Une grande tente éclairée de guirlandes, la nuit, sous un ciel étoilé" },
  godet: { src: `${DOSSIER}/godet.webp`, largeur: 1400, hauteur: 933, alt: "Le godet jaune d'une pelle mécanique plonge dans un tas de terre, des arbres au loin" },
  tranchee: { src: `${DOSSIER}/tranchee.webp`, largeur: 1200, hauteur: 803, alt: "Un godet creuse une tranchée dans une terre caillouteuse" },
  godets: { src: `${DOSSIER}/godets-terrasse.webp`, largeur: 1200, hauteur: 805, alt: "Trois godets de mini-pelle posés sur les dalles d'une terrasse, au bord d'un massif" },
} satisfies Record<string, Photo>;

/** « 2 400 € » : espace fine insécable pour les milliers, insécable avant €. */
export const euros = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;

// ---------- Les tentes ----------

export type Tente = {
  id: string;
  largeur: number;   // m
  longueur: number;  // m
  invites: number;   // assis : capacité du fabricant
  tables: number;    // tables rondes de 10, dessinées
  prix: number;      // le week-end, TTC, montage et démontage compris (exemple)
  surnom: string;
  pour: string;
};

export const TENTES: Tente[] = [
  { id: "6x12", largeur: 6, longueur: 12, invites: 60, tables: 6, prix: 1450, surnom: "La petite", pour: "Un anniversaire, des fiançailles, une fête de famille." },
  { id: "10x15", largeur: 10, longueur: 15, invites: 120, tables: 12, prix: 2400, surnom: "Celle des mariages", pour: "Le mariage dans le pré où tout a commencé." },
  { id: "12x25", largeur: 12, longueur: 25, invites: 240, tables: 24, prix: 3900, surnom: "La grande", pour: "Une fête de village, un comité des fêtes, une grande famille." },
];

export const tente = (id: string) => TENTES.find((t) => t.id === id) ?? TENTES[1];
export const tentePour = (invites: number) => TENTES.find((t) => invites <= t.invites) ?? TENTES[TENTES.length - 1];

/** Ce qu'on pose avec la tente. Prix TTC d'exemple, pour le week-end. */
export const OPTIONS = [
  { nom: "Plancher", detail: "Rattrape une pente légère, garde les pieds au sec.", prix: "8 € le m²" },
  { nom: "Tables rondes et chaises", detail: "Tables de 10, chaises pliantes en bois.", prix: "6 € par invité" },
  { nom: "Guirlandes", detail: "Ampoules chaudes, le long du faîtage et des côtés.", prix: "180 €" },
  { nom: "Parquet de bal", detail: "Une piste de 6 × 6 m, au centre ou au fond.", prix: "420 €" },
];

// ---------- Les engins ----------

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

// ---------- « Tu veux faire quoi ? » ----------

export type Ligne = { id: IdMachine; jours: number };

type Base = {
  id: string;
  libelle: string;
  court: string;
  quantite: { etiquette: string; unite: string; min: number; max: number; pas: number; depart: number };
  surtitre: (q: number) => string;
  duree: (q: number) => string;
  hypothese: string;
};

/** Un chantier : une ou plusieurs machines. Une fête : une tente. */
export type Projet = (Base & { genre: "engin"; lignes: (q: number) => Ligne[] }) | (Base & { genre: "tente"; public: boolean });

export const PROJETS: Projet[] = [
  {
    id: "fete",
    genre: "tente",
    public: false,
    libelle: "Une fête dans le pré",
    court: "Fête",
    quantite: { etiquette: "Invités assis", unite: "invités", min: 40, max: 240, pas: 20, depart: 120 },
    surtitre: (q) => `Ta fête · ${q} invités`,
    duree: () => "Un week-end : montée vendredi, démontée lundi",
    hypothese: "Des invités assis à des tables rondes de dix, selon la capacité du fabricant.",
  },
  {
    id: "tranchee",
    genre: "engin",
    libelle: "Creuser une tranchée",
    court: "Tranchée",
    quantite: { etiquette: "Longueur", unite: "mètres", min: 5, max: 60, pas: 5, depart: 20 },
    surtitre: (q) => `Ta tranchée · ${q} mètres`,
    lignes: (q) => [{ id: "mp15", jours: q <= 25 ? 1 : q <= 45 ? 2 : 3 }],
    duree: (q) => (q <= 25 ? "Une journée suffit" : q <= 45 ? "Deux journées" : "Trois journées"),
    hypothese: "Une tranchée de 50 cm de profondeur, en terre ordinaire.",
  },
  {
    id: "bal",
    genre: "tente",
    public: true,
    libelle: "Un bal au village",
    court: "Bal",
    quantite: { etiquette: "Invités assis", unite: "invités", min: 100, max: 240, pas: 20, depart: 200 },
    surtitre: (q) => `Ton bal · ${q} personnes`,
    duree: () => "Un week-end : montée vendredi, démontée dimanche matin",
    hypothese: "Une fête ouverte au public, sur une place : avec l'autorisation de la mairie.",
  },
  {
    id: "terrasse",
    genre: "engin",
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
    genre: "engin",
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
    genre: "engin",
    libelle: "Niveler un terrain",
    court: "Terrain",
    quantite: { etiquette: "Surface", unite: "m²", min: 50, max: 600, pas: 50, depart: 200 },
    surtitre: (q) => `Ton terrain · ${q} m²`,
    lignes: (q) => [{ id: "mp25", jours: q <= 250 ? 1 : 2 }, { id: "plaque", jours: q <= 250 ? 1 : 2 }],
    duree: (q) => (q <= 250 ? "Une journée suffit" : "Deux journées"),
    hypothese: "Un terrain dégagé, sans arbres à garder, une pente légère.",
  },
];

// ---------- Les samedis ----------

/** Les samedis de juin et juillet 2027 (vérifiés : ce sont des samedis). « pris » : exemple. */
export const SAMEDIS = [
  { id: "5-juin", court: "5 juin", long: "samedi 5 juin 2027", pris: true },
  { id: "12-juin", court: "12 juin", long: "samedi 12 juin 2027", pris: false },
  { id: "19-juin", court: "19 juin", long: "samedi 19 juin 2027", pris: false },
  { id: "26-juin", court: "26 juin", long: "samedi 26 juin 2027", pris: true },
  { id: "3-juillet", court: "3 juil.", long: "samedi 3 juillet 2027", pris: false },
  { id: "10-juillet", court: "10 juil.", long: "samedi 10 juillet 2027", pris: false },
];

export type EtatCase = "libre" | "pris";

/** Une ligne du planning : une tente ou une machine, et ses quatre samedis de juin. */
export type Dispo = { id: string; nom: string; court: string; prix: number; unite: "jour" | "week-end"; chauffeur?: number; etats: EtatCase[] };

const t1015 = tente("10x15"), t612 = tente("6x12");

/** Les vraies disponibilités, article par article. Les « pris » sont un exemple. */
export const PLANNING: Dispo[] = [
  { id: "tente-10x15", nom: `Tente ${t1015.largeur} × ${t1015.longueur} m`, court: `Tente ${t1015.largeur} × ${t1015.longueur}`, prix: t1015.prix, unite: "week-end", etats: SAMEDIS.slice(0, 4).map((s) => (s.pris ? "pris" : "libre")) },
  { id: "tente-6x12", nom: `Tente ${t612.largeur} × ${t612.longueur} m`, court: `Tente ${t612.largeur} × ${t612.longueur}`, prix: t612.prix, unite: "week-end", etats: ["libre", "pris", "libre", "libre"] },
  ...(
    [
      ["mp15", ["pris", "libre", "libre", "pris"]],
      ["mp25", ["libre", "pris", "pris", "libre"]],
      ["plaque", ["libre", "libre", "pris", "libre"]],
      ["rogneuse", ["libre", "pris", "libre", "libre"]],
    ] as [IdMachine, EtatCase[]][]
  ).map(([id, etats]) => {
    const m = machine(id);
    return { id, nom: m.nom, court: m.court, prix: m.jour, unite: "jour" as const, chauffeur: m.chauffeur, etats };
  }),
];

// ---------- Le week-end, raconté ----------

export const WEEKEND = [
  { quand: "Trois semaines avant", titre: "On vient voir le pré", texte: "Gratuitement. On mesure, on regarde la pente, l'accès du camion, où passe le soleil du soir. Et s'il y a une tranchée à creuser pour l'électricité, on te le dit.", photo: "pre" },
  { quand: "Vendredi", titre: "On monte, on livre", texte: "La tente, le plancher, les tables. La mini-pelle, si tu en as besoin, arrive sur notre camion avec vingt minutes de prise en main.", photo: "godet" },
  { quand: "Samedi, 18 h", titre: "La tranchée est finie avant l'apéro", texte: "On a choisi la machine pour que ton chantier tienne dans la journée. Ton terrain a le dernier mot, mais c'est le but.", photo: "tranchee" },
  { quand: "Samedi soir", titre: "La fête est chez toi", texte: "Le pré où tu as grandi, avec un toit et des guirlandes. On reste joignable tout le week-end.", photo: "tenteNuit" },
  { quand: "Lundi", titre: "On démonte, on reprend", texte: "On repart avec tout, piquets compris. Il ne reste que les photos.", photo: "tenteJardin" },
] as const;

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  { q: "Combien d'invités dans chaque tente ?", r: "La capacité affichée est celle du fabricant de chaque modèle, en invités assis à des tables rondes de dix. Une piste de danse, un buffet ou une allée prennent de la place : on en parle à la visite du pré, plan à la main." },
  { q: "Il faut une autorisation ?", r: "Pour une fête ouverte au public (un bal, une fête de village, un marché), oui : une tente qui reçoit du public ne se monte pas sans l'autorisation de la mairie. On prépare le dossier avec toi. Pour une fête privée chez toi, renseigne-toi auprès de ta mairie : on te dit quoi lui demander." },
  { q: "Je n'ai jamais conduit de mini-pelle. C'est possible ?", r: "On te fait vingt minutes de prise en main à la livraison, sur ton terrain. Les conditions pour conduire (âge, assurance) sont écrites dans le contrat de location (exemple). Si tu préfères ne pas toucher aux commandes : prends l'option avec chauffeur." },
  { q: "C'est quoi, la DT-DICT ?", r: "Une déclaration à faire avant de creuser, pour que les exploitants des réseaux enterrés (gaz, électricité, eau, fibre) te disent où passent leurs câbles et leurs tuyaux. Particuliers compris. On t'aide à la remplir : ça prend un quart d'heure au téléphone." },
  { q: "Et s'il y a du vent ?", r: "La notice du fabricant fixe la vitesse de vent au-delà de laquelle on fait sortir tout le monde. On te la donne avec le contrat, on suit la météo avec toi, et on reste joignable tout le week-end." },
  { q: "Il y a une caution ?", r: "Pour les engins : 1 500 € par empreinte bancaire, jamais encaissée si la machine revient comme elle est partie (exemple). Pour les tentes, l'état des lieux se fait au montage et au démontage, avec toi." },
  { q: "Et les voisins ?", r: "Préviens-les. Après la réservation, le site te donne un mot tout prêt à glisser dans leur boîte aux lettres, avec la date." },
];
