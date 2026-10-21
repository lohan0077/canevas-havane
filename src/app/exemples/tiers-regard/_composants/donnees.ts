// Tout ce qu'affiche le site de Tiers Regard, diagnostiqueur immobilier fictif imaginé
// dans la vidéo « Si je devais créer une entreprise de diagnostic immobilier de zéro ».
//
// Le ton de la marque : dans une vente, tout le monde a un intérêt ; le diagnostiqueur,
// aucun. C'est la loi, pour tous (CCH L271-6 : aucun lien avec le propriétaire, son
// mandataire, ni une entreprise de travaux ; R271-3 : aucun avantage accordé pour être
// recommandé). Le site le dit toujours « comme tout diagnostiqueur » : présenter une
// obligation légale comme un avantage propre serait trompeur (C. consom. L121-4, 10°).
// Aucune entreprise de travaux n'est nommée ni recommandée, nulle part.
// Certification par domaine, par un organisme accrédité (R271-1) : numéros d'exemple.
// Les conditions de chaque diagnostic suivent les fiches Service-Public F10798 (vente,
// « vérifié le 07 mars 2025 ») et F33463 (location, « vérifié le 20 février 2026 »),
// lues le 17/10/2026.

export const DOSSIER = "/exemples/tiers-regard";

export const cabinet = {
  nom: "Tiers Regard",
  telephone: "01 99 00 74 21",
  adresse: "5 rue de l'Exemple, 00000 Ville-Exemple",
  diagnostiqueuse: "Inès L.",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#regard`, libelle: "Ce qu'on regarde" },
  { href: `${DOSSIER}/une-page`, libelle: "Ton rapport en une page" },
  { href: `${DOSSIER}#prix`, libelle: "Les prix" },
  { href: `${DOSSIER}/rendez-vous`, libelle: "Rendez-vous" },
];

export const euros = (n: number) => `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;

/** La phrase de la loi, mot pour mot (CCH, art. L271-6, extrait). */
export const CITATION = "Elle ne doit avoir aucun lien de nature à porter atteinte à son impartialité et à son indépendance";

/* ---------- Ce qu'on regarde : la photo annotée ---------- */

// Positions en pourcentage de la photo (1400 × 933, sans recadrage). Ce sont des
// endroits qu'un diagnostic examine, pas des défauts trouvés dans cette maison.
export const POINTS = [
  { id: "plafond", x: 41, y: 11, titre: "Plafonds et murs", diagnostic: "Amiante", texte: "Si le permis de construire date d'avant juillet 1997 : on repère les matériaux dans tout ce qui est visible et accessible." },
  { id: "peintures", x: 9, y: 31, titre: "Peintures et boiseries", diagnostic: "Plomb", texte: "Si le logement a été construit avant le 1er janvier 1949 : on mesure le plomb dans les revêtements." },
  { id: "fenetres", x: 45, y: 42, titre: "Fenêtres et vitrages", diagnostic: "DPE", texte: "Vitrages, menuiseries, ventilation : ils entrent dans le calcul de la lettre, de A à G." },
  { id: "prises", x: 25, y: 47, titre: "Prises et circuits", diagnostic: "Électricité", texte: "Si l'installation a plus de 15 ans : prises, terre, tableau, protection différentielle." },
  { id: "chauffage", x: 82, y: 63, titre: "Cheminée et chauffage", diagnostic: "DPE", texte: "Comment le logement est chauffé, et comment l'eau chaude est produite." },
  { id: "sol", x: 32, y: 74, titre: "Planchers et bois", diagnostic: "Termites", texte: "Si la commune est dans une zone déclarée par arrêté préfectoral." },
];

/* ---------- Les intérêts d'une vente ---------- */

export const INTERETS = [
  { qui: "Le vendeur", veut: "veut vendre cher." },
  { qui: "L'acheteur", veut: "veut payer moins." },
  { qui: "L'agent", veut: "veut que ça se vende." },
];

/* ---------- Le rapport, en une page (exemple) ---------- */

export type Ligne = { id: string; titre: string; rapport: string; clair: string };

export const RAPPORT = {
  bien: "Maison · 110 m² · permis de 1985",
  lettre: "D",
  climat: "D",
  va: [
    {
      id: "amiante",
      titre: "Amiante : rien de signalé",
      rapport: "Il n'a pas été repéré de matériaux et produits contenant de l'amiante dans les parties visibles et accessibles inspectées.",
      clair: "Dans tout ce qu'on a pu voir et atteindre, rien qui contienne de l'amiante. Ce qui était caché (sous un carrelage, derrière un doublage) n'a pas pu être vu : le rapport le dit.",
    },
    {
      id: "plomb",
      titre: "Plomb : non concerné",
      rapport: "Immeuble construit après le 1er janvier 1949 : le constat de risque d'exposition au plomb n'est pas requis.",
      clair: "Ta maison date d'après 1949 : le diagnostic plomb n'est pas exigé. Il n'y a rien à faire.",
    },
  ] as Ligne[],
  cloche: [
    {
      id: "electricite",
      titre: "Électricité : 2 anomalies",
      rapport: "L'installation intérieure d'électricité comporte des anomalies : socle de prise de courant non relié à la terre (chambre 2) ; circuit non protégé par un dispositif différentiel à haute sensibilité.",
      clair: "Deux choses à corriger : une prise de la chambre 2 n'est pas reliée à la terre, et un circuit n'est pas protégé par un différentiel de 30 mA, celui qui coupe le courant en cas de fuite. Pour vendre, ce diagnostic informe l'acheteur ; il ne t'oblige pas à faire les travaux.",
    },
    {
      id: "combles",
      titre: "Isolation des combles",
      rapport: "Recommandation n° 1 du DPE : isolation du plancher des combles perdus.",
      clair: "La première piste du DPE pour améliorer la lettre : isoler le plancher des combles. C'est une recommandation, pas une obligation. Pour des devis, demande à qui tu veux : on ne recommande aucune entreprise.",
    },
  ] as Ligne[],
};

/* ---------- Les prix (exemple, TTC) ---------- */

export const TARIFS = [
  { nom: "DPE", condition: "Pour vendre ou louer", prix: 150 },
  { nom: "Amiante", condition: "Permis de construire avant juillet 1997", prix: 110 },
  { nom: "Électricité", condition: "Installation de plus de 15 ans", prix: 100 },
  { nom: "Gaz", condition: "Installation de plus de 15 ans", prix: 100 },
  { nom: "Plomb", condition: "Construit avant le 1er janvier 1949", prix: 140 },
  { nom: "Termites", condition: "Commune en zone déclarée par arrêté préfectoral", prix: 90 },
];

/* ---------- La méthode ---------- */

export const METHODE = [
  { titre: "Tu réserves", texte: "Ton créneau, en ligne. Tu dis ton bien, sa date de construction, vente ou location." },
  { titre: "On regarde", texte: "Une à trois heures selon le bien. Tu peux suivre la visite et poser tes questions." },
  { titre: "Le rapport complet", texte: "Sous 48 h (exemple). C'est lui qui fait foi, page par page." },
  { titre: "La page qui le traduit", texte: "Ce qui va, ce qui cloche, en clair. Sans rien enjoliver, sans rien noircir." },
];

/* ---------- Le rendez-vous (exemple) ---------- */

export const CRENEAUX = [
  { libelle: "Mar. 27", sous: "9 h" },
  { libelle: "Mar. 27", sous: "14 h", pris: true },
  { libelle: "Mer. 28", sous: "9 h" },
  { libelle: "Jeu. 29", sous: "11 h", pris: true },
  { libelle: "Jeu. 29", sous: "15 h" },
  { libelle: "Ven. 30", sous: "9 h" },
];

export const PREPARER = [
  "Les clés de toutes les pièces, des combles, de la cave et des annexes.",
  "Un accès dégagé au tableau électrique et, s'il y en a un, au compteur de gaz.",
  "La date du permis de construire, si tu l'as : elle dit si l'amiante est à faire.",
  "Les factures d'énergie et de travaux d'isolation, si tu les as : elles servent au DPE.",
];

/* ---------- Questions fréquentes ---------- */

export const FAQ = [
  {
    q: "Tu peux me conseiller un artisan ?",
    r: "Non, et aucun diagnostiqueur ne le devrait : la loi lui interdit tout lien avec une entreprise de travaux. On t'explique ce qu'on a vu ; pour les devis, tu demandes à qui tu veux.",
  },
  {
    q: "C'est mon agence qui m'a donné votre nom. Vous la payez ?",
    r: "Non. Aucun diagnostiqueur ne peut accorder d'avantage ni de rétribution à une agence pour être recommandé (CCH, art. R271-3). Et tu restes libre de choisir ton diagnostiqueur.",
  },
  {
    q: "Le rapport « en une page » remplace le rapport ?",
    r: "Non. La page traduit ; le rapport complet reste joint, et c'est lui qui fait foi, page par page.",
  },
  {
    q: "Si ça cloche, je dois faire les travaux avant de vendre ?",
    r: "Non : pour vendre, les diagnostics informent l'acheteur, ils n'obligent pas à faire de travaux. Pour louer, c'est différent : un logement classé G ne peut plus être loué depuis le 1er janvier 2025.",
  },
  {
    q: "Et si le rapport ne me plaît pas ?",
    r: "On t'explique ce qu'on a vu, point par point. Mais on n'écrit que ce qu'on voit : ni plus beau, ni plus grave.",
  },
];
