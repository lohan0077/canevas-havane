// Tout ce qu'affiche Tiers Regard, diagnostiqueur immobilier fictif. Le site réunit les
// deux vidéos des diagnostiqueurs : « Créer une marque » (le nom, « Je dis ce que je
// vois », celui qui n'a aucun intérêt dans la vente, le rapport traduit en une page,
// l'affiche) et « Remplir l'agenda » (le client, c'est le propriétaire ; trois questions
// et la liste des diagnostics avec le prix ; une page par lettre du DPE ; le rendez-vous
// en ligne, la certification en vue).
//
// Indépendance (CCH L271-6 : aucun lien avec le propriétaire, son mandataire, ni une
// entreprise de travaux ; R271-3 : aucun avantage accordé pour être recommandé) : dite
// « comme tout diagnostiqueur », jamais comme un avantage propre (C. consom. L121-4,
// 10°). Aucune entreprise de travaux nommée ni recommandée, nulle part.
// Certification par domaine, par un organisme accrédité (R271-1) : numéros d'exemple.
// La liste des diagnostics suit les fiches Service-Public lues le 17/10/2026 :
//   - vente : F10798 (« vérifié le 07 mars 2025 ») ;
//   - location : F33463 (« vérifié le 20 février 2026 ») ;
// les pages des lettres suivent F16096 (DPE, « vérifié le 01 janvier 2026 »), F2042
// (logement décent, « vérifié le 21 mars 2025 ») et F37110 (audit énergétique,
// « vérifié le 14 septembre 2026 »).

export const DOSSIER = "/exemples/tiers-regard";

export const cabinet = {
  nom: "Tiers Regard",
  telephone: "01 99 00 74 21",
  telephoneLien: "+33199007421",
  adresse: "5 rue de l'Exemple, 00000 Ville-Exemple",
  diagnostiqueuse: "Inès L.",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#questions`, libelle: "Mes diagnostics" },
  { href: `${DOSSIER}/une-page`, libelle: "Le rapport en une page" },
  { href: `${DOSSIER}/dpe/f`, libelle: "Le DPE, lettre par lettre" },
  { href: `${DOSSIER}#prix`, libelle: "Les prix" },
];

export const euros = (n: number) => `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;

/** La phrase de la loi, mot pour mot (CCH, art. L271-6, extrait). */
export const CITATION = "Elle ne doit avoir aucun lien de nature à porter atteinte à son impartialité et à son indépendance";

/* ---------- Les photos (Unsplash, servies depuis notre domaine ; crédits dans les mentions) ---------- */
export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const P = DOSSIER;
export const photos = {
  fenetres: { src: `${P}/fenetres-radiateur.webp`, largeur: 1800, hauteur: 1193, alt: "Une pièce vide en noir et blanc : de hautes fenêtres, un radiateur en fonte, le soleil au sol" },
  salon: { src: `${P}/salon-cheminee.webp`, largeur: 1400, hauteur: 933, alt: "Un salon ancien et clair : une commode, une lampe, trois fenêtres en rotonde, une cheminée de brique surmontée d'un miroir" },
  priseOuverte: { src: `${P}/prise-ouverte.webp`, largeur: 1000, hauteur: 667, alt: "Une prise électrique démontée dans un mur blanc, son mécanisme à nu" },
  priseAncienne: { src: `${P}/prise-ancienne.webp`, largeur: 1000, hauteur: 667, alt: "Une vieille prise ronde en porcelaine sur un mur à la peinture écaillée" },
  radiateur: { src: `${P}/radiateur-mur-vert.webp`, largeur: 900, hauteur: 1350, alt: "Un radiateur en fonte blanc contre un mur vert pâle, dans une ombre de fenêtre" },
  immeuble: { src: `${P}/immeuble-balcons.webp`, largeur: 900, hauteur: 1350, alt: "Un immeuble ancien aux volets clairs et aux balcons de fer forgé, sous un ciel bleu" },
  combles: { src: `${P}/combles-lucarnes.webp`, largeur: 800, hauteur: 1067, alt: "Des combles en travaux, un isolant réfléchissant entre les chevrons, deux fenêtres de toit" },
} satisfies Record<string, Photo>;

/* ---------- Les intérêts d'une vente ---------- */
export const INTERETS = [
  { qui: "Le vendeur", veut: "veut vendre cher." },
  { qui: "L'acheteur", veut: "veut payer moins." },
  { qui: "L'agent", veut: "veut que ça se vende." },
];

/* ---------- Ce qu'on regarde : la photo annotée ---------- */
// Positions en pourcentage de la photo du salon (1400 × 933, sans recadrage). Ce sont
// des endroits qu'un diagnostic examine, pas des défauts trouvés dans cette maison.
export const POINTS = [
  { id: "plafond", x: 41, y: 11, titre: "Plafonds et murs", diagnostic: "Amiante", texte: "Si le permis de construire date d'avant juillet 1997 : on repère les matériaux dans tout ce qui est visible et accessible." },
  { id: "peintures", x: 9, y: 31, titre: "Peintures et boiseries", diagnostic: "Plomb", texte: "Si le logement a été construit avant le 1er janvier 1949 : on mesure le plomb dans les revêtements." },
  { id: "fenetres", x: 45, y: 42, titre: "Fenêtres et vitrages", diagnostic: "DPE", texte: "Vitrages, menuiseries, ventilation : ils entrent dans le calcul de la lettre, de A à G." },
  { id: "prises", x: 25, y: 47, titre: "Prises et circuits", diagnostic: "Électricité", texte: "Si l'installation a plus de 15 ans : prises, terre, tableau, protection différentielle." },
  { id: "chauffage", x: 82, y: 63, titre: "Cheminée et chauffage", diagnostic: "DPE", texte: "Comment le logement est chauffé, et comment l'eau chaude est produite." },
  { id: "sol", x: 32, y: 74, titre: "Planchers et bois", diagnostic: "Termites", texte: "Si la commune est dans une zone déclarée par arrêté préfectoral." },
];

/* ---------- Les prix (exemple, TTC) ---------- */
// Ceux de la vidéo « Remplir l'agenda » : DPE + amiante + électricité = 390 € TTC.
export const PRIX = { dpe: 160, amiante: 120, plomb: 150, electricite: 110, gaz: 110, termites: 100, risques: 25 };

export const TARIFS = [
  { nom: "DPE", condition: "Pour vendre ou louer", prix: PRIX.dpe },
  { nom: "Amiante", condition: "Permis de construire avant juillet 1997", prix: PRIX.amiante },
  { nom: "Électricité", condition: "Installation de plus de 15 ans", prix: PRIX.electricite },
  { nom: "Gaz", condition: "Installation de plus de 15 ans", prix: PRIX.gaz },
  { nom: "Plomb (Crep)", condition: "Construit avant le 1er janvier 1949", prix: PRIX.plomb },
  { nom: "Termites", condition: "Commune en zone déclarée par arrêté préfectoral", prix: PRIX.termites },
  { nom: "État des risques", condition: "Zone ou périmètre à risques", prix: PRIX.risques },
];

/* ---------- Les trois questions de l'accueil ---------- */
export type Bien = "maison" | "appartement";
export type Permis = "avant1949" | "avant1997" | "apres1997";
export type Projet = "vente" | "location";

export const QUESTIONS = {
  bien: { titre: "Maison ou appartement ?", options: [{ id: "maison", libelle: "Maison" }, { id: "appartement", libelle: "Appartement" }] },
  permis: {
    titre: "Permis de construire, quand ?",
    options: [{ id: "avant1949", libelle: "Avant 1949" }, { id: "avant1997", libelle: "1949 – juin 1997" }, { id: "apres1997", libelle: "Après juin 1997" }],
  },
  projet: { titre: "Tu vends ou tu loues ?", options: [{ id: "vente", libelle: "Je vends" }, { id: "location", libelle: "Je loue" }] },
} as const;

export type LigneListe = { statut: "oui" | "non" | "peut"; nom: string; condition: string; prix?: number };

/**
 * La liste des diagnostics pour un bien, d'après les fiches F10798 (vente) et F33463
 * (location). Trois questions ne suffisent pas à tout trancher : ce qui dépend du bien
 * (gaz, zone, installation) est marqué « selon ton bien », jamais omis.
 */
export function diagnostics(bien: Bien, permis: Permis, projet: Projet): LigneListe[] {
  const avant1997 = permis !== "apres1997";
  const lignes: LigneListe[] = [];
  lignes.push({
    statut: "oui",
    nom: "DPE",
    condition: bien === "maison" ? "Maison de 50 m² de surface de plancher ou plus" : projet === "vente" ? "Tout appartement vendu" : "Sauf logement occupé moins de 4 mois par an",
    prix: PRIX.dpe,
  });
  if (projet === "vente") {
    lignes.push(avant1997
      ? { statut: "oui", nom: "Amiante", condition: "Permis de construire avant juillet 1997", prix: PRIX.amiante }
      : { statut: "non", nom: "Amiante", condition: "Permis de construire après juin 1997" });
  } else {
    lignes.push(avant1997
      ? { statut: "oui", nom: "Amiante", condition: "Permis avant juillet 1997 : à tenir à la disposition du locataire", prix: PRIX.amiante }
      : { statut: "non", nom: "Amiante", condition: "Permis de construire après juin 1997" });
  }
  lignes.push(permis === "apres1997"
    ? { statut: "peut", nom: "Électricité", condition: "Si l'installation a plus de 15 ans" }
    : { statut: "oui", nom: "Électricité", condition: "Installation de plus de 15 ans, sauf si elle a été refaite depuis", prix: PRIX.electricite });
  lignes.push(permis === "avant1949"
    ? { statut: "oui", nom: "Plomb (Crep)", condition: "Construit avant le 1er janvier 1949", prix: PRIX.plomb }
    : { statut: "non", nom: "Plomb", condition: "Construit après 1949" });
  if (projet === "vente" && bien === "maison") {
    lignes.push({ statut: "peut", nom: "Audit énergétique", condition: "Si le DPE de la maison est E, F ou G · sur devis" });
  }
  lignes.push({
    statut: "peut",
    nom: projet === "vente" ? "Gaz, assainissement, termites, risques, bruit" : "Gaz, risques, bruit",
    condition: "Selon ton bien",
  });
  return lignes;
}

/** Ce que veut dire « selon ton bien », condition par condition (fiches F10798 et F33463). */
export const SELON = {
  vente: [
    { nom: "Gaz", condition: "si l'installation intérieure de gaz a plus de 15 ans" },
    { nom: "Assainissement", condition: "si le logement a une installation autonome, ou dans certains territoires (arrêté municipal)" },
    { nom: "Termites", condition: "si le logement est dans une zone déclarée par arrêté préfectoral" },
    { nom: "État des risques", condition: "si le logement est dans une zone ou un périmètre à risques (naturels, miniers, sismiques, radon…)" },
    { nom: "Bruit", condition: "si le logement est dans une zone d'exposition au bruit d'un aéroport" },
    { nom: "Carnet d'information du logement", condition: "si permis ou déclaration préalable déposés depuis le 1er janvier 2023, ou travaux de rénovation depuis" },
    { nom: "Mérule et surface Carrez", condition: "ce ne sont pas des diagnostics : des mentions de la promesse ou de l'acte (zone à risque de mérule ; surface privative d'un lot de copropriété)" },
  ],
  location: [
    { nom: "Gaz", condition: "si l'installation intérieure de gaz a plus de 15 ans" },
    { nom: "État des risques", condition: "si le logement est dans une zone ou un périmètre à risques ; tu peux l'établir toi-même" },
    { nom: "Bruit", condition: "si le logement est dans une zone d'exposition au bruit d'un aéroport ; tu peux l'établir toi-même" },
  ],
};

/* ---------- Les lettres du DPE ---------- */
export type Lettre = "a" | "b" | "c" | "d" | "e" | "f" | "g";
export const LETTRES: Lettre[] = ["a", "b", "c", "d", "e", "f", "g"];
export const COULEURS: Record<Lettre, [string, string]> = {
  a: ["#009C6D", "#111111"], b: ["#52B153", "#111111"], c: ["#78BD76", "#111111"], d: ["#F4E70F", "#111111"],
  e: ["#F0B50F", "#111111"], f: ["#EB8235", "#111111"], g: ["#D7221F", "#FFFFFF"],
};

export type PageLettre = { titre: string; vendre: string[]; louer: string[]; annonce: string[] };

const ANNONCE_TOUS = "L'annonce affiche les classes énergie et climat, en couleur, et le montant estimé des dépenses annuelles d'énergie pour un usage standard.";
const ANNONCE_EXCESSIF = "Elle porte aussi la mention « logement à consommation énergétique excessive ».";
const AUDIT = "Pour vendre une maison (ou un immeuble de plusieurs logements qui t'appartient en entier), il faut aussi un audit énergétique : un état des lieux et des scénarios de travaux chiffrés. Pas pour un appartement en copropriété.";

export const PAGES: Record<Lettre, PageLettre> = {
  a: { titre: "DPE A : ce que ça change pour toi", vendre: ["Rien de plus à fournir que les autres diagnostics.", "C'est la meilleure lettre de l'échelle : elle se dit dans l'annonce, comme les autres."], louer: ["Aucune date butoir n'est annoncée pour un logement classé A."], annonce: [ANNONCE_TOUS] },
  b: { titre: "DPE B : ce que ça change pour toi", vendre: ["Rien de plus à fournir que les autres diagnostics."], louer: ["Aucune date butoir n'est annoncée pour un logement classé B."], annonce: [ANNONCE_TOUS] },
  c: { titre: "DPE C : ce que ça change pour toi", vendre: ["Rien de plus à fournir que les autres diagnostics."], louer: ["Aucune date butoir n'est annoncée pour un logement classé C."], annonce: [ANNONCE_TOUS] },
  d: { titre: "DPE D : ce que ça change pour toi", vendre: ["Aujourd'hui, rien de plus à fournir.", "À partir du 1er janvier 2034, vendre une maison classée D demandera aussi un audit énergétique."], louer: ["Un logement D reste louable : à partir de 2034, ce sont les classes A à D qui pourront l'être."], annonce: [ANNONCE_TOUS] },
  e: { titre: "DPE E : ce que ça change pour toi", vendre: [AUDIT], louer: ["Louable jusqu'en 2033. Pour un bail signé, renouvelé ou reconduit à partir de 2034, seuls les logements A à D pourront être loués."], annonce: [ANNONCE_TOUS] },
  f: { titre: "DPE F : ce que ça change pour toi", vendre: [AUDIT], louer: ["Louable jusqu'en 2027. Pour un bail signé, renouvelé ou reconduit à partir de 2028, seuls les logements A à E pourront être loués."], annonce: [ANNONCE_TOUS, ANNONCE_EXCESSIF] },
  g: { titre: "DPE G : ce que ça change pour toi", vendre: [AUDIT], louer: ["Depuis le 1er janvier 2025, un logement classé G ne peut plus être loué : nouveau bail, renouvellement ou reconduction tacite."], annonce: [ANNONCE_TOUS, ANNONCE_EXCESSIF] },
};

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

/* ---------- La méthode ---------- */
export const METHODE = [
  { titre: "Trois questions", texte: "Ton bien, son permis de construire, vente ou location : la liste et le prix s'affichent." },
  { titre: "Ton créneau", texte: "Tu le choisis en ligne. La certification de celle qui vient est écrite dessus." },
  { titre: "On regarde", texte: "Une à trois heures selon le bien. Tu peux suivre la visite et poser tes questions." },
  { titre: "Le rapport, et sa page", texte: "Sous 48 h (exemple). Le rapport complet fait foi ; une page dit en clair ce qui va et ce qui cloche." },
];

/* ---------- Le rendez-vous (exemple) ---------- */
export const CRENEAUX = [
  { id: "jeudi", libelle: "Jeudi", date: "29 octobre", heures: [{ h: "9 h", pris: false }, { h: "11 h", pris: true }, { h: "14 h", pris: false }] },
  { id: "vendredi", libelle: "Vendredi", date: "30 octobre", heures: [{ h: "9 h", pris: true }, { h: "14 h", pris: false }, { h: "16 h", pris: true }] },
  { id: "lundi", libelle: "Lundi", date: "2 novembre", heures: [{ h: "9 h", pris: false }, { h: "11 h", pris: false }, { h: "14 h", pris: true }] },
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
    q: "Combien coûte un diagnostic immobilier pour une vente ?",
    r: "Ça dépend de ton bien : le site te donne la liste et le prix en trois questions. Pour une maison avec un permis entre 1949 et juin 1997, le pack DPE, amiante et électricité coûte 390 € TTC ici (prix d'exemple).",
  },
  {
    q: "C'est mon agence qui m'a donné votre nom. Vous la payez ?",
    r: "Non. Aucun diagnostiqueur ne peut accorder d'avantage ni de rétribution à une agence pour être recommandé (CCH, art. R271-3). Et tu restes libre de choisir ton diagnostiqueur : c'est toi qui le paies, et c'est à toi qu'il rend son rapport.",
  },
  {
    q: "Tu peux me conseiller un artisan ?",
    r: "Non, et aucun diagnostiqueur ne le devrait : la loi lui interdit tout lien avec une entreprise de travaux. On t'explique ce qu'on a vu ; pour les devis, tu demandes à qui tu veux.",
  },
  {
    q: "Le rapport « en une page » remplace le rapport ?",
    r: "Non. La page traduit ; le rapport complet reste joint, et c'est lui qui fait foi, page par page.",
  },
  {
    q: "Si ça cloche, je dois faire les travaux avant de vendre ?",
    r: "Non : pour vendre, les diagnostics informent l'acheteur, ils n'obligent pas à faire de travaux. Pour louer, c'est différent : un logement classé G ne peut plus être loué depuis le 1er janvier 2025.",
  },
  {
    q: "Un DPE, c'est valable combien de temps ?",
    r: "Dix ans. Mais les DPE faits entre le 1er janvier 2018 et le 30 juin 2021 ne sont plus valables depuis le 1er janvier 2025 : il faut les refaire pour vendre ou louer.",
  },
  {
    q: "Mon logement est chauffé à l'électricité. Ma lettre a changé ?",
    r: "Peut-être. Depuis le 1er janvier 2026, le calcul du DPE compte l'électricité autrement. Un DPE fait avant reste valable, et il peut être mis à jour gratuitement sur le site de l'Ademe, sans nouvelle visite, si l'étiquette s'améliore.",
  },
  {
    q: "Et si le rapport ne me plaît pas ?",
    r: "On t'explique ce qu'on a vu, point par point. Mais on n'écrit que ce qu'on voit : ni plus beau, ni plus grave.",
  },
];
