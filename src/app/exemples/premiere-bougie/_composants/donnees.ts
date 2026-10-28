// Les contenus du site Première Bougie, cabinet de recrutement imaginaire filmé dans les
// deux vidéos des cabinets de recrutement :
//   - « Créer une marque » : le nom ; il ne compte pas les CV placés, il compte les
//     premiers anniversaires ; pas d'offres d'emploi, un seul chiffre — combien de recrues
//     sont toujours là un an après, et combien sont parties ; le gâteau à une bougie ;
//   - « Remplir l'agenda » (ancien site Chaise Pleine) : une seule question sur l'accueil,
//     « ton poste est vide depuis combien de semaines ? » ; les heures de travail en
//     attente ; juste en dessous, vingt minutes pour définir le poste ; une page qui
//     répond à « combien coûte un cabinet de recrutement », ligne par ligne.
//
// Le bilan est un chiffre d'ensemble, jamais une ligne par personne (RGPD, art. 4 ;
// confidentialité due au client) ; les départs sont comptés aussi (pas d'omission
// trompeuse, C. consom., art. L.121-3). Aucune promesse de résultat. Prix HT : les clients
// sont des entreprises, et le site le dit. Placement gratuit pour les candidats (C. trav.,
// art. L.5321-3). Chiffres d'exemple ; aucun nom de recrue ni d'entreprise cliente.

export const DOSSIER = "/exemples/premiere-bougie";

export const cabinet = {
  nom: "Première Bougie",
  baseline: "On fête la première année.",
  metier: "Cabinet de recrutement pour les PME",
  // Tranche que l'ARCEP réserve aux œuvres de fiction.
  telephone: "01 99 00 85 30",
  adresse: "12 rue de l'Exemple, 00000 Ville-d'Exemple",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#bilan`, libelle: "Le bilan" },
  { href: `${DOSSIER}/honoraires`, libelle: "Honoraires" },
  { href: `${DOSSIER}/bilan`, libelle: "Comment on compte" },
  { href: `${DOSSIER}/candidats`, libelle: "Candidats" },
];

export type Photo = { src: string; alt: string };
const P = DOSSIER;
export const photos = {
  cupcake: { src: `${P}/cupcake-bougie.webp`, alt: "Un petit gâteau avec une seule bougie allumée, sur une table en bois, dans le noir" },
  gateau: { src: `${P}/gateau-blanc.webp`, alt: "Un gâteau blanc sur une assiette grise, une seule bougie étincelle dessus" },
  main: { src: `${P}/cupcake-main.webp`, alt: "Une main tend un petit gâteau surmonté d'une bougie rayée" },
  chaiseOrange: { src: `${P}/chaise-mur-orange.webp`, alt: "Une chaise de bureau noire, vide, devant un mur de carrelage orange" },
  chaiseRouge: { src: `${P}/chaise-rouge.webp`, alt: "Une chaise pivotante rouge, vide, sur un sol de béton" },
  atelier: { src: `${P}/atelier.webp`, alt: "Un atelier de production à contre-jour, les machines dans la lumière des verrières" },
} satisfies Record<string, Photo>;

/* ---------- La chaise vide ---------- */

/** Durée légale du travail à temps complet : 35 heures par semaine (C. trav., art. L.3121-27). */
export const HEURES_SEMAINE = 35;

export const CRENEAUX = [
  { jour: "Lundi", heure: "8 h 30", pris: true },
  { jour: "Mardi", heure: "9 h" },
  { jour: "Mardi", heure: "13 h 30" },
  { jour: "Jeudi", heure: "8 h" },
  { jour: "Jeudi", heure: "17 h 40", pris: true },
  { jour: "Vendredi", heure: "12 h 40" },
];

/* ---------- Le bilan ---------- */

/** Le bilan d'ensemble, en exemple : jamais une ligne par personne. */
export const BILAN = { recrues: 18, toujoursLa: 15, parties: 3, periode: "recrues arrivées entre septembre 2023 et septembre 2025" };

export const ETAPES = [
  { jour: "Jour −30", titre: "Vingt minutes, et le poste", texte: "On définit avec toi ce qui fera rester quelqu'un, pas seulement ce qui le fera venir : le travail réel, le salaire réel, ce qui a fait partir le précédent." },
  { jour: "Jour 0", titre: "L'arrivée", texte: "Trois candidats présentés avec leur accord ; tu choisis ; la personne arrive. Une première partie des honoraires est due ce jour-là." },
  { jour: "Jours 30, 90, 180", titre: "Les points", texte: "Un appel à la personne, un à toi, convenus dès le départ. Pas de surveillance, pas de recherche sur les réseaux." },
  { jour: "Jour 365", titre: "La première bougie", texte: "Un gâteau livré dans l'entreprise. Une seule bougie. Le reste des honoraires, et le bilan qui se met à jour." },
];

/* ---------- Honoraires : des exemples, ligne par ligne, HT ---------- */

export type Ligne = { quoi: string; detail: string; montant: number };
export type Poste = { id: string; intitule: string; contexte: string; lignes: Ligne[] };

const POINTS: Ligne = { quoi: "Les points et la première bougie", detail: "Appels aux jours 30, 90 et 180 ; le gâteau du jour 365, livré dans l'entreprise", montant: 900 };

export const POSTES: Poste[] = [
  {
    id: "chef-atelier",
    intitule: "Chef d'atelier",
    contexte: "PME industrielle, 40 salariés, encadrement d'une équipe de huit",
    lignes: [
      { quoi: "Définition du poste", detail: "Vingt minutes au téléphone, puis une fiche de poste relue avec toi", montant: 600 },
      { quoi: "Annonce et diffusion", detail: "Rédaction, publication sur les sites d'emploi du secteur", montant: 900 },
      { quoi: "Tri des CV et préqualification", detail: "Lecture de chaque candidature, appel des plus proches", montant: 1500 },
      { quoi: "Entretiens", detail: "Deux tours, dont un sur place, dans l'atelier", montant: 2400 },
      { quoi: "Prise de références", detail: "Avec l'accord écrit de chaque candidat", montant: 600 },
      { quoi: "Suivi de la période d'essai", detail: "Un point à un mois, un à trois mois ; nouvelle recherche si départ pendant l'essai", montant: 900 },
      POINTS,
    ],
  },
  {
    id: "comptable",
    intitule: "Comptable",
    contexte: "Entreprise de services, 25 salariés, poste unique au service financier",
    lignes: [
      { quoi: "Définition du poste", detail: "Vingt minutes au téléphone, puis une fiche de poste relue avec toi", montant: 600 },
      { quoi: "Annonce et diffusion", detail: "Rédaction, publication sur les sites d'emploi du secteur", montant: 700 },
      { quoi: "Tri des CV et préqualification", detail: "Lecture de chaque candidature, appel des plus proches", montant: 1200 },
      { quoi: "Entretiens", detail: "Deux tours, dont un avec un cas pratique", montant: 1800 },
      { quoi: "Prise de références", detail: "Avec l'accord écrit de chaque candidat", montant: 500 },
      { quoi: "Suivi de la période d'essai", detail: "Un point à un mois, un à trois mois ; nouvelle recherche si départ pendant l'essai", montant: 700 },
      POINTS,
    ],
  },
  {
    id: "technicien",
    intitule: "Technicien de maintenance",
    contexte: "Site de production, travail en équipes, astreintes",
    lignes: [
      { quoi: "Définition du poste", detail: "Vingt minutes au téléphone, puis une fiche de poste relue avec toi", montant: 600 },
      { quoi: "Annonce et approche directe", detail: "Annonce, et approche de profils qui ne cherchent pas activement", montant: 1400 },
      { quoi: "Tri des CV et préqualification", detail: "Lecture de chaque candidature, appel des plus proches", montant: 1300 },
      { quoi: "Entretiens", detail: "Deux tours, dont un technique sur le site", montant: 2000 },
      { quoi: "Prise de références", detail: "Avec l'accord écrit de chaque candidat", montant: 500 },
      { quoi: "Suivi de la période d'essai", detail: "Un point à un mois, un à trois mois ; nouvelle recherche si départ pendant l'essai", montant: 800 },
      POINTS,
    ],
  },
];

/** Le versement : une part à l'arrivée, le reste à la première bougie. */
export const VERSEMENT = [
  { quand: "À l'arrivée", part: 60 },
  { quand: "À la première bougie", part: 40 },
];

export const total = (p: Poste) => p.lignes.reduce((s, l) => s + l.montant, 0);
export const euros = (n: number) => `${n.toLocaleString("fr-FR").replace(/\s/g, " ")} €`;

export const QUESTIONS = [
  { q: "Combien coûte un cabinet de recrutement ?", r: "Ça dépend du poste. Plutôt que « nous consulter », on montre des exemples chiffrés ligne par ligne, en HT, sur la page Honoraires : 7 800 € HT pour un chef d'atelier, par exemple." },
  { q: "Forfait ou pourcentage du salaire ?", r: "Forfait. Il est écrit et signé avant de commencer ; il ne bouge pas si le salaire négocié monte. 60 % à l'arrivée, 40 % à la première bougie." },
  { q: "Pourquoi pas d'offres d'emploi sur le site ?", r: "Parce qu'on ne vend pas des annonces. On parle aux entreprises de ce qui compte après : que la personne soit toujours là dans un an." },
  { q: "Vous promettez que la recrue restera ?", r: "Non. Personne ne peut le promettre. On compte, on montre aussi les départs, et une partie des honoraires n'est due qu'à la première bougie." },
  { q: "Le gâteau, et la photo sur LinkedIn ?", r: "Le gâteau, toujours. La photo, seulement avec l'accord de la personne et celui de l'entreprise. Sinon, pas de photo." },
  { q: "Les candidats paient quelque chose ?", r: "Non. Placement gratuit pour les candidats : aucun frais ne peut leur être demandé pour leur trouver un poste (code du travail, art. L.5321-3)." },
];
