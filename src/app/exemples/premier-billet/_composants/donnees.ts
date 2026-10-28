// Tout ce qu'affiche Premier Billet, cabinet d'expertise comptable fictif filmé dans les
// deux vidéos des experts-comptables :
//   - « Créer une marque » : le nom, la première facture qu'on fête, l'outil « Votre
//     première facture », le cadre envoyé aux clients du cabinet ;
//   - « Remplir l'agenda » (ancien site Heure Claire, fondu ici) : les honoraires par mois
//     selon le statut et le chiffre d'affaires, et le délai de réponse, publié en haut du
//     site chaque mois — y compris le mois où il est monté.
//
// Règles tenues ici (décret n° 2012-432 du 30 mars 2012, art. 152) : information utile,
// expression « décente et empreinte de retenue », aucune inexactitude, aucun élément
// comparatif ; moyens de promotion « mis en œuvre avec discrétion » — d'où le cadre
// réservé aux clients du cabinet. Vouvoiement partout. Honoraires hors taxes (clientèle
// professionnelle, et le site le dit), d'exemple, fixés dans la lettre de mission
// (ordonnance n° 45-2138, art. 24). Le délai est un exemple : sur un vrai site, il doit
// être exact et justifiable.

export const DOSSIER = "/exemples/premier-billet";

export const cabinet = {
  nom: "Premier Billet",
  signature: "Le premier se fête. Les autres se comptent.",
  adresse: "12 rue de l'Exemple, 00000 Ville-Exemple",
  telephone: "01 99 00 74 26",
  horaires: "Du lundi au vendredi, de 9 h à 18 h",
  ordre: "Société d'expertise comptable inscrite au tableau de l'Ordre des experts-comptables, conseil régional d'exemple, n° 00 000 000 (exemple)",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/premiere-facture`, libelle: "Première facture" },
  { href: `${DOSSIER}/honoraires`, libelle: "Honoraires" },
  { href: `${DOSSIER}/delai`, libelle: "Délai de réponse" },
  { href: `${DOSSIER}/le-cadre`, libelle: "Le cadre" },
];

/* ---------- Les photos ----------
   Unsplash (licence Unsplash), servies depuis notre domaine ; crédits dans les mentions.
   Aucun visage, aucune marque, ni poignée de main ni calculatrice. */
export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const photo = (fichier: string, largeur: number, hauteur: number, alt: string): Photo => ({
  src: `${DOSSIER}/${fichier}.webp`, largeur, hauteur, alt,
});

export const photos = {
  poterie: photo("atelier-poterie", 1200, 750, "Deux mains façonnent un pot d'argile sur un tour de potier"),
  colis: photo("colis", 1400, 933, "Deux petits paquets en papier kraft ficelés, une carte blanche et une enveloppe"),
  cadre: photo("cadre-vide", 1200, 800, "Un cadre en bois clair, vide, accroché à un mur blanc dans la lumière"),
  canape: photo("canape-soir", 1400, 934, "Un canapé vide dans la lumière chaude d'une lampe, un soir"),
  pieds: photo("pieds-leves", 1200, 1800, "Deux pieds en chaussettes posés sur l'accoudoir d'un canapé, sous une lampe"),
  feuilles: photo("deux-feuilles", 1200, 800, "Deux feuilles blanches tenues au mur par des pinces dorées"),
};

/* ---------- L'outil « Votre première facture » ----------
   Les mentions de base (code de commerce, art. L441-9 ; CGI, annexe II, art. 242 nonies A).
   Une partie seulement : d'autres s'ajoutent selon la situation, et la réforme de la
   facturation électronique en ajoute. */
export const MENTIONS = [
  "Un numéro unique",
  "La date",
  "Votre SIREN",
  "Le nom et l'adresse du client",
  "Le prix HT, et la TVA ou sa mention",
  "La date de paiement",
];

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

export const CALCUL = [
  { titre: "Ce qui est compté", texte: "Chaque message reçu d'un client : messagerie du cabinet, courriel, formulaire. Du lundi au vendredi, de 9 h à 18 h." },
  { titre: "Jusqu'à quand", texte: "Jusqu'à la première réponse écrite par une personne du cabinet. Les accusés de réception automatiques ne comptent pas." },
  { titre: "Hors des heures", texte: "Un message reçu le soir ou le week-end commence à compter le jour ouvré suivant, à 9 h." },
  { titre: "Quand", texte: "Le chiffre est calculé et publié le 1er de chaque mois, pour le mois écoulé. Il n'est jamais retouché." },
];

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

export const A_PART = [
  { offre: "Création de société", detail: "Statuts, formalités d'immatriculation, ouverture du dossier", prix: "390 € HT, une fois" },
  { offre: "Bulletins de paie", detail: "Le jour où vous embauchez : chiffrés dans un avenant", prix: "Sur la lettre de mission" },
  { offre: "L'outil « première facture »", detail: "Sur ce site, pour tout le monde, client ou non", prix: "Gratuit" },
];

/* ---------- Le cabinet ---------- */
export const MISSIONS = [
  { numero: "I", titre: "Choisir le statut", texte: "Micro-entreprise, EURL, SASU : ce que chacun change pour vous, chiffré sur votre activité." },
  { numero: "II", titre: "La première année", texte: "Vos premières factures, vos premières déclarations, le premier rendez-vous avec la banque." },
  { numero: "III", titre: "La TVA", texte: "Franchise ou non, les dates, les montants : un rappel avant chaque échéance." },
  { numero: "IV", titre: "Le premier bilan", texte: "Comptes annuels, liasse fiscale, et une heure pour les relire ensemble." },
];

export const PREMIERES_FOIS = [
  { moment: "Avant tout", titre: "Un premier rendez-vous", texte: "Votre projet, votre statut, vos questions. Une heure, au cabinet ou par téléphone, sans engagement." },
  { moment: "Avant de commencer", titre: "La lettre de mission", texte: "Ce que nous faisons, ce que vous faites, et le prix : écrits et signés avant toute mission. Ils ne changent pas sans un avenant." },
  { moment: "Le jour J", titre: "La première facture", texte: "Nous la relisons avec vous avant qu'elle parte. Le jour où elle est payée, le cadre part par la poste." },
  { moment: "Un an plus tard", titre: "Le premier bilan", texte: "Les comptes, et ce qu'ils racontent de votre première année. Vos pièces, elles, sont traitées en semaine : le dimanche soir reste à vous." },
];

export const EQUIPE = [
  { initiales: "H. D.", role: "Expert-comptable inscrite au tableau de l'Ordre", phrase: "Signe les comptes et les lettres de mission." },
  { initiales: "O. K.", role: "Collaborateur comptable", phrase: "Suit les créateurs pendant leur première année." },
  { initiales: "C. F.", role: "Assistante", phrase: "Les rendez-vous, les dossiers, et les cadres." },
];

export const QUESTIONS = [
  {
    q: "Le prix affiché est-il celui que je paierai ?",
    r: "C'est une indication d'exemple. Vos honoraires sont fixés par écrit, dans la lettre de mission, avant le début de la mission. Ils ne changent pas sans un avenant signé.",
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
    q: "L'outil de facture remplace-t-il un expert-comptable ?",
    r: "Non. Il rassemble les mentions de base d'une facture et vous aide à ne pas en oublier. Selon votre situation, d'autres mentions s'ajoutent ; nous vous disons lesquelles lors d'un rendez-vous.",
  },
  {
    q: "Le cadre, c'est pour tout le monde ?",
    r: "Non : il est réservé aux clients du cabinet. Le jour où vous encaissez votre première facture, nous vous l'envoyons, par la poste, avec un mot.",
  },
  {
    q: "Un expert-comptable est-il obligatoire ?",
    r: "En règle générale, non : ce qui est obligatoire, c'est de tenir une comptabilité adaptée à votre statut et de déposer vos déclarations. Lors du premier rendez-vous, nous vous disons si votre situation justifie un accompagnement.",
  },
  {
    q: "Pourquoi ne comparez-vous pas vos prix à ceux d'autres cabinets ?",
    r: "Notre code de déontologie exclut tout élément comparatif dans notre communication. Nous publions nos propres prix et notre propre délai, rien d'autre.",
  },
  {
    q: "Pourquoi « Premier Billet » ?",
    r: "Parce que certains commerçants encadrent le premier billet reçu, au-dessus de la caisse. Le premier se fête. Les autres se comptent : c'est notre métier.",
  },
];

export const CRENEAUX = [
  { libelle: "Mardi", sous: "10 h 00" },
  { libelle: "Mardi", sous: "15 h 30", pris: true },
  { libelle: "Mercredi", sous: "9 h 00" },
  { libelle: "Jeudi", sous: "14 h 00" },
  { libelle: "Vendredi", sous: "11 h 30", pris: true },
  { libelle: "Vendredi", sous: "16 h 00" },
];
