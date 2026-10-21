// Tout ce qu'affiche le site de De A à G, cabinet de diagnostic immobilier fictif imaginé
// dans la vidéo « Si je devais remplir l'agenda d'un diagnostiqueur immobilier ».
//
// La liste des diagnostics suit les fiches Service-Public, lues le 17/10/2026 :
//   - vente : F10798 (« vérifié le 07 mars 2025 ») —
//     https://www.service-public.gouv.fr/particuliers/vosdroits/F10798
//   - location : F33463 (« vérifié le 20 février 2026 ») —
//     https://www.service-public.gouv.fr/particuliers/vosdroits/F33463
// Les pages des lettres suivent F16096 (DPE, « vérifié le 01 janvier 2026 »), F2042
// (logement décent, « vérifié le 21 mars 2025 ») et F37110 (audit énergétique,
// « vérifié le 14 septembre 2026 »).
// Indépendance (CCH L271-6, R271-3) : présentée comme celle de tout diagnostiqueur,
// jamais comme un avantage propre ; aucune entreprise de travaux recommandée.
// Certification par domaine, par un organisme accrédité (R271-1) : numéros d'exemple.

export const DOSSIER = "/exemples/de-a-a-g";

export const cabinet = {
  nom: "De A à G",
  telephone: "01 99 00 62 45",
  adresse: "3 rue de l'Exemple, 00000 Ville-Exemple",
  diagnostiqueur: "Thomas R.",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#questions`, libelle: "Mes diagnostics" },
  { href: `${DOSSIER}#prix`, libelle: "Les prix" },
  { href: `${DOSSIER}#lettres`, libelle: "Le DPE, lettre par lettre" },
  { href: `${DOSSIER}/rendez-vous`, libelle: "Rendez-vous" },
];

export const euros = (n: number) => `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;

/* ---------- Les prix (exemple, TTC) ---------- */

export const PRIX = {
  dpe: 160,
  amiante: 120,
  plomb: 150,
  electricite: 110,
  gaz: 110,
  termites: 100,
  risques: 25,
};

export const TARIFS = [
  { nom: "Diagnostic de performance énergétique (DPE)", prix: euros(PRIX.dpe) },
  { nom: "Amiante", prix: euros(PRIX.amiante) },
  { nom: "Plomb (Crep)", prix: euros(PRIX.plomb) },
  { nom: "Électricité", prix: euros(PRIX.electricite) },
  { nom: "Gaz", prix: euros(PRIX.gaz) },
  { nom: "Termites", prix: euros(PRIX.termites) },
  { nom: "État des risques", prix: euros(PRIX.risques) },
  { nom: "Audit énergétique", prix: "sur devis" },
];

/* ---------- Les trois questions ---------- */

export type Bien = "maison" | "appartement";
export type Permis = "avant1949" | "avant1997" | "apres1997";
export type Projet = "vente" | "location";

export const QUESTIONS = {
  bien: { titre: "Ton bien", options: [{ id: "maison", libelle: "Maison" }, { id: "appartement", libelle: "Appartement" }] },
  permis: {
    titre: "Permis de construire, quand\u00A0?",
    options: [{ id: "avant1949", libelle: "Avant 1949" }, { id: "avant1997", libelle: "1949 – juin 1997" }, { id: "apres1997", libelle: "Après juin 1997" }],
  },
  projet: { titre: "Tu…", options: [{ id: "vente", libelle: "Vends" }, { id: "location", libelle: "Loues" }] },
} as const;

export type Ligne = {
  statut: "oui" | "non" | "peut";
  nom: string;
  condition: string;
  prix?: number;
};

/**
 * La liste des diagnostics pour un bien, d'après les fiches F10798 (vente) et F33463
 * (location). Trois questions ne suffisent pas à tout trancher : ce qui dépend du bien
 * (gaz, zone, installation) est marqué « selon ton bien », jamais omis.
 */
export function diagnostics(bien: Bien, permis: Permis, projet: Projet): Ligne[] {
  const avant1997 = permis !== "apres1997";
  const lignes: Ligne[] = [];
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

export type Page = { titre: string; vendre: string[]; louer: string[]; annonce: string[] };

const ANNONCE_TOUS = "L'annonce affiche les classes énergie et climat, en couleur, et le montant estimé des dépenses annuelles d'énergie pour un usage standard.";
const ANNONCE_EXCESSIF = "Elle porte aussi la mention « logement à consommation énergétique excessive ».";
const AUDIT = "Pour vendre une maison (ou un immeuble de plusieurs logements qui t'appartient en entier), il faut aussi un audit énergétique : un état des lieux et des scénarios de travaux chiffrés. Pas pour un appartement en copropriété.";

export const PAGES: Record<Lettre, Page> = {
  a: { titre: "DPE A : ce que ça change pour toi", vendre: ["Rien de plus à fournir que les autres diagnostics.", "C'est la meilleure lettre de l'échelle : elle se dit dans l'annonce, comme les autres."], louer: ["Aucune date butoir n'est annoncée pour un logement classé A."], annonce: [ANNONCE_TOUS] },
  b: { titre: "DPE B : ce que ça change pour toi", vendre: ["Rien de plus à fournir que les autres diagnostics."], louer: ["Aucune date butoir n'est annoncée pour un logement classé B."], annonce: [ANNONCE_TOUS] },
  c: { titre: "DPE C : ce que ça change pour toi", vendre: ["Rien de plus à fournir que les autres diagnostics."], louer: ["Aucune date butoir n'est annoncée pour un logement classé C."], annonce: [ANNONCE_TOUS] },
  d: { titre: "DPE D : ce que ça change pour toi", vendre: ["Aujourd'hui, rien de plus à fournir.", "À partir du 1er janvier 2034, vendre une maison classée D demandera aussi un audit énergétique."], louer: ["Un logement D reste louable : à partir de 2034, ce sont les classes A à D qui pourront l'être."], annonce: [ANNONCE_TOUS] },
  e: { titre: "DPE E : ce que ça change pour toi", vendre: [AUDIT], louer: ["Louable jusqu'en 2033. Pour un bail signé, renouvelé ou reconduit à partir de 2034, seuls les logements A à D pourront être loués."], annonce: [ANNONCE_TOUS] },
  f: { titre: "DPE F : ce que ça change pour toi", vendre: [AUDIT], louer: ["Louable jusqu'en 2027. Pour un bail signé, renouvelé ou reconduit à partir de 2028, seuls les logements A à E pourront être loués."], annonce: [ANNONCE_TOUS, ANNONCE_EXCESSIF] },
  g: { titre: "DPE G : ce que ça change pour toi", vendre: [AUDIT], louer: ["Depuis le 1er janvier 2025, un logement classé G ne peut plus être loué : nouveau bail, renouvellement ou reconduction tacite."], annonce: [ANNONCE_TOUS, ANNONCE_EXCESSIF] },
};

/* ---------- Les certifications (exemple) ---------- */

export const CERTIFICATIONS = ["DPE", "Amiante", "Électricité", "Gaz", "Plomb", "Termites"];

/* ---------- Le rendez-vous (exemple) ---------- */

export const CRENEAUX = [
  { id: "jeudi", libelle: "Jeudi", date: "22 octobre", heures: [{ h: "9 h", pris: false }, { h: "11 h", pris: true }, { h: "14 h", pris: false }] },
  { id: "vendredi", libelle: "Vendredi", date: "23 octobre", heures: [{ h: "9 h", pris: true }, { h: "14 h", pris: false }, { h: "16 h", pris: true }] },
  { id: "lundi", libelle: "Lundi", date: "26 octobre", heures: [{ h: "9 h", pris: false }, { h: "11 h", pris: false }, { h: "14 h", pris: true }] },
];

/* ---------- Questions fréquentes ---------- */

export const FAQ = [
  {
    q: "Combien coûte un diagnostic immobilier pour une vente ?",
    r: "Ça dépend de ton bien : le site te donne la liste et le prix en trois questions. Pour une maison avec un permis entre 1949 et juin 1997, le pack DPE, amiante et électricité coûte 390 € TTC ici (prix d'exemple).",
  },
  {
    q: "Un DPE, c'est valable combien de temps ?",
    r: "Dix ans. Mais les DPE faits entre le 1er janvier 2018 et le 30 juin 2021 ne sont plus valables depuis le 1er janvier 2025 : il faut les refaire pour vendre ou louer.",
  },
  {
    q: "Mon agence m'a donné le nom d'un diagnostiqueur. Je dois le prendre ?",
    r: "Non : tu choisis ton diagnostiqueur. C'est toi qui le paies, et c'est à toi qu'il rend son rapport. L'annuaire officiel du ministère recense les diagnostiqueurs certifiés et leurs certifications.",
  },
  {
    q: "Tu peux me conseiller un artisan pour les travaux ?",
    r: "Non, et aucun diagnostiqueur ne devrait : la loi lui interdit tout lien avec une entreprise de travaux. On t'explique ce que dit le rapport ; pour les travaux, tu demandes des devis à qui tu veux.",
  },
  {
    q: "Mon logement est chauffé à l'électricité. Ma lettre a changé ?",
    r: "Peut-être. Depuis le 1er janvier 2026, le calcul du DPE compte l'électricité autrement. Un DPE fait avant reste valable, et il peut être mis à jour gratuitement sur le site de l'Ademe, sans nouvelle visite, si l'étiquette s'améliore.",
  },
];
