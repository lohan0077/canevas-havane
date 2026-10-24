// Les contenus du site Parole Tenue, agence de voyage imaginaire filmée dans les deux
// vidéos des agences de voyage :
//   - « Créer une marque » : le nom ; elle ne vend qu'une chose, les voyages qu'on a
//     promis ; tu écris ta promesse (à qui, quel voyage, depuis quand), le site compte
//     depuis quand tu la repousses et propose une date, avec ce qu'il faut mettre de côté
//     chaque mois ; l'affiche « Tu avais dit un jour. C'est quand ? » ; le mur des billets ;
//   - « Remplir l'agenda » (ancien site Un Seul Onglet) : sur l'accueil, un seul bouton,
//     « ferme tes onglets », trois questions (avec qui, quand, quel budget), trente
//     minutes avec un conseiller ; une vidéo chaque dimanche à 21 h ; une page par vraie
//     question (« voyage de noces prix moyen »), trois budgets détaillés ligne par ligne.
//
// Budgets, numéros, garant et assureur : des exemples. « Mettre de côté » est un calcul
// affiché, pas un produit d'épargne : l'agence n'encaisse rien d'avance. Mentions du
// Code du tourisme (art. R.211-2) en bas de chaque page.

export const DOSSIER = "/exemples/parole-tenue";

export const agence = {
  nom: "Parole Tenue",
  baseline: "Le voyage que tu as promis.",
  // Tranche que l'ARCEP réserve aux œuvres de fiction.
  telephone: "01 99 00 26 81",
  adresse: "12 rue de l'Exemple, 00000 Ville-d'Exemple",
  horaires: "Du mardi au samedi, 10 h – 19 h · en visio jusqu'à 21 h",
};

// Code du tourisme, art. R.211-2 : nom, forme juridique, immatriculation, garant et
// assureur (nom et adresse), sur le site. Tous des exemples.
export const MENTIONS_TOURISME = [
  { libelle: "Raison sociale", valeur: "Parole Tenue, SARL au capital de 8 000 €, RCS Ville-d'Exemple 000 000 000 (exemple)" },
  { libelle: "Immatriculation Atout France", valeur: "IM000000000 (exemple), au registre des opérateurs de voyages et de séjours" },
  { libelle: "Garant financier", valeur: "Garantie Exemple, 12 rue de l'Exemple, Ville-d'Exemple (exemple)" },
  { libelle: "Assureur responsabilité civile professionnelle", valeur: "Assurances Exemple, 12 rue de l'Exemple, Ville-d'Exemple (exemple)" },
];

export const NAVIGATION = [
  { href: `${DOSSIER}/ta-promesse`, libelle: "Ta promesse" },
  { href: `${DOSSIER}/voyages`, libelle: "Les voyages promis" },
  { href: `${DOSSIER}/budgets/voyage-de-noces`, libelle: "Budgets" },
  { href: `${DOSSIER}/l-agence`, libelle: "L'agence" },
];

export type Photo = { src: string; alt: string };
const P = DOSSIER;
export const photos = {
  fuji: { src: `${P}/fuji.webp`, alt: "Le mont Fuji enneigé qui se reflète dans un lac, sous un ciel bleu" },
  islande: { src: `${P}/islande.webp`, alt: "Une cascade islandaise qui tombe d'une falaise verte, au coucher du soleil" },
  venise: { src: `${P}/venise.webp`, alt: "Le Grand Canal de Venise au lever du soleil, une coupole au fond" },
  lisbonne: { src: `${P}/lisbonne.webp`, alt: "Les toits rouges de Lisbonne et le Tage, sous un ciel bleu" },
  bali: { src: `${P}/bali.webp`, alt: "Des rizières en terrasses et des palmiers, à Bali" },
  polynesie: { src: `${P}/polynesie.webp`, alt: "Des bungalows sur pilotis au-dessus d'un lagon turquoise, une montagne au fond" },
} satisfies Record<string, Photo>;
export type CleePhoto = keyof typeof photos;

/* ---------- Ferme tes onglets : trois questions, trente minutes ---------- */

export const QUESTIONS = [
  { id: "qui", question: "Avec qui ?", reponses: ["Seul·e", "À deux", "En famille", "Entre amis"] },
  { id: "quand", question: "Quand ?", reponses: ["Printemps 2027", "Été 2027", "Automne 2027", "Pas encore de date"] },
  { id: "budget", question: "Quel budget ?", reponses: ["Moins de 1 000 €", "1 000 – 2 500 €", "2 500 – 5 000 €", "Plus de 5 000 €"] },
] as const;
export type IdQuestion = (typeof QUESTIONS)[number]["id"];

export const CRENEAUX = [
  { jour: "Lundi", heure: "18 h 30" },
  { jour: "Mardi", heure: "12 h 30", pris: true },
  { jour: "Mardi", heure: "18 h 30" },
  { jour: "Mercredi", heure: "20 h" },
  { jour: "Jeudi", heure: "19 h", pris: true },
  { jour: "Samedi", heure: "10 h 30" },
];

/* ---------- Les voyages promis ---------- */

const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

export type Voyage = {
  id: string;
  nom: string;          // « Le Japon »
  phrase: string;       // la promesse telle qu'on la dit
  budget: number;       // pour deux, TTC, exemple
  mois: number;         // le meilleur mois pour partir (0 = janvier)
  pourquoi: string;
  duree: string;
  photo?: CleePhoto;
};

export const VOYAGES: Voyage[] = [
  { id: "japon", nom: "Le Japon", phrase: "On ira au Japon, un jour.", budget: 4680, mois: 3, pourquoi: "en avril, pour les cerisiers", duree: "12 jours", photo: "fuji" },
  { id: "islande", nom: "L'Islande", phrase: "Un jour, on verra les cascades.", budget: 4200, mois: 5, pourquoi: "en juin, quand le soleil ne se couche pas", duree: "9 jours", photo: "islande" },
  { id: "venise", nom: "Venise", phrase: "Je t'emmènerai à Venise.", budget: 1680, mois: 2, pourquoi: "en mars, avant la foule", duree: "4 jours", photo: "venise" },
  { id: "lisbonne", nom: "Lisbonne", phrase: "On fera Lisbonne avec maman.", budget: 1440, mois: 4, pourquoi: "en mai, pour la lumière", duree: "5 jours", photo: "lisbonne" },
  { id: "new-york", nom: "New York", phrase: "Pour nos vingt ans, New York.", budget: 3960, mois: 9, pourquoi: "en octobre, pour l'automne", duree: "7 jours" },
  { id: "dakar", nom: "Revoir Dakar", phrase: "On retournera voir la famille à Dakar.", budget: 1980, mois: 11, pourquoi: "en décembre, pour les fêtes", duree: "10 jours" },
];

/**
 * Le plan d'une promesse : le premier « bon mois » qui laisse au moins un an pour
 * mettre de côté, et le montant mensuel qui y mène. Un calcul affiché, rien d'autre.
 */
export function plan(voyage: Voyage, maintenant: Date) {
  const ecart = (voyage.mois - maintenant.getMonth() + 12) % 12;
  const mois = ecart < 12 ? ecart + 12 : ecart; // toujours entre 12 et 23 mois
  const depart = new Date(maintenant.getFullYear(), maintenant.getMonth() + mois, 1);
  return {
    mois,
    date: `${MOIS[depart.getMonth()]} ${depart.getFullYear()}`,
    parMois: Math.ceil(voyage.budget / mois),
  };
}

export const MUR_EXEMPLES = [
  { ou: "Lisbonne", pour: "avec maman" },
  { ou: "Le Japon", pour: "avec Léo" },
  { ou: "Revoir Dakar", pour: "avant ses 80 ans" },
  { ou: "New York", pour: "pour nos 20 ans" },
  { ou: "L'Islande", pour: "enfin" },
  { ou: "Venise", pour: "promis à Jeanne" },
];

/* ---------- Les pages de budgets ---------- */

export type Ligne = { quoi: string; montant: number };
export type VoyageChiffre = { ou: string; duree: string; photo: CleePhoto; lignes: Ligne[]; note: string };
export type PageBudgets = {
  slug: string;
  recherche: string;   // ce que les gens tapent
  titre: string;
  pour: string;        // « pour deux »
  intro: string;
  voyages: VoyageChiffre[];
};

export const total = (v: VoyageChiffre) => v.lignes.reduce((s, l) => s + l.montant, 0);
export const euros = (n: number) => `${n.toLocaleString("fr-FR").replace(/\s/g, " ")} €`;

export const BUDGETS: PageBudgets[] = [
  {
    slug: "voyage-de-noces",
    recherche: "voyage de noces prix moyen",
    titre: "Voyage de noces",
    pour: "pour deux",
    intro: "Trois voyages de noces, trois budgets. Pas « à partir de » : le détail, ligne par ligne.",
    voyages: [
      { ou: "Lisbonne", duree: "5 nuits", photo: "lisbonne", note: "Vols directs, hôtel avec vue sur le Tage, transferts aller et retour.", lignes: [{ quoi: "Vols", montant: 380 }, { quoi: "Nuits", montant: 1650 }, { quoi: "Transferts", montant: 120 }] },
      { ou: "Bali", duree: "12 nuits", photo: "bali", note: "Une escale, deux hôtels (rizières puis plage), chauffeur pour les transferts.", lignes: [{ quoi: "Vols", montant: 2200 }, { quoi: "Nuits", montant: 3900 }, { quoi: "Transferts", montant: 260 }] },
      { ou: "Polynésie", duree: "14 nuits", photo: "polynesie", note: "Deux îles, un bungalow sur pilotis, vols intérieurs et bateaux compris.", lignes: [{ quoi: "Vols", montant: 4600 }, { quoi: "Nuits", montant: 7200 }, { quoi: "Transferts", montant: 450 }] },
    ],
  },
  {
    slug: "week-end-lisbonne",
    recherche: "week end lisbonne prix",
    titre: "Un week-end à Lisbonne",
    pour: "pour deux",
    intro: "Trois façons de passer trois nuits à Lisbonne, du plus simple au plus confortable.",
    voyages: [
      { ou: "Lisbonne, simple", duree: "3 nuits", photo: "lisbonne", note: "Vols en semaine, chambre double dans l'Alfama, métro depuis l'aéroport.", lignes: [{ quoi: "Vols", montant: 260 }, { quoi: "Nuits", montant: 390 }, { quoi: "Transferts", montant: 15 }] },
      { ou: "Lisbonne, confort", duree: "3 nuits", photo: "lisbonne", note: "Vols du vendredi, hôtel avec terrasse, taxi aller et retour.", lignes: [{ quoi: "Vols", montant: 340 }, { quoi: "Nuits", montant: 720 }, { quoi: "Transferts", montant: 70 }] },
      { ou: "Lisbonne et Sintra", duree: "3 nuits", photo: "lisbonne", note: "Deux nuits en ville, une à Sintra, voiture avec chauffeur entre les deux.", lignes: [{ quoi: "Vols", montant: 340 }, { quoi: "Nuits", montant: 860 }, { quoi: "Transferts", montant: 190 }] },
    ],
  },
];

/* ---------- Dimanche, 21 h ---------- */

export const EPISODES = [
  { titre: "Lisbonne à deux, 5 nuits", budget: "2 150 €", photo: "lisbonne" as CleePhoto, duree: "1 min 40" },
  { titre: "Bali, 12 nuits, deux hôtels", budget: "6 360 €", photo: "bali" as CleePhoto, duree: "1 min 55" },
  { titre: "Polynésie, deux îles", budget: "12 250 €", photo: "polynesie" as CleePhoto, duree: "2 min 10" },
];

/* ---------- L'agence ---------- */

export const ETAPES = [
  { titre: "Tu fermes tes onglets", texte: "Un seul bouton sur l'accueil, trois questions : avec qui, quand, quel budget. Ou ta promesse : à qui, quel voyage, depuis quand." },
  { titre: "Trente minutes avec un conseiller", texte: "En visio ou à l'agence. Il a lu tes réponses, il a déjà ouvert les onglets à ta place." },
  { titre: "Un voyage, chiffré ligne par ligne", texte: "Une proposition, pas quarante. Les vols, les nuits, les transferts, et ce qui n'est pas compris." },
  { titre: "Tu tiens ta promesse", texte: "Si tu dis oui, le formulaire d'information prévu par le Code du tourisme, avant de signer. Le jour du départ, une seule photo : la promesse écrite, et le billet." },
];

export const EQUIPE = [
  { initiales: "IN", prenom: "Inès", role: "Europe et week-ends" },
  { initiales: "MA", prenom: "Malik", role: "Asie, Océanie, voyages de noces" },
  { initiales: "CL", prenom: "Claire", role: "Voyages en famille, promesses de longue date" },
];

export const FAQ = [
  { q: "Les trente minutes sont payantes ?", r: "Non. Tu repars avec un voyage chiffré ligne par ligne, que tu réserves avec nous ou pas." },
  { q: "Vous encaissez l'argent que je mets de côté ?", r: "Non. Le montant mensuel est un calcul, pour t'aider à t'organiser. L'argent reste chez toi ; on ne propose aucun produit d'épargne." },
  { q: "Les budgets du site, ce sont des offres ?", r: "Non, des exemples datés. Avant toute réservation, on te remet le formulaire d'information prévu par le Code du tourisme (art. L.211-8), avec le prix exact." },
  { q: "Ce que j'écris sur le site part où ?", r: "Nulle part. Les calculs se font dans ton navigateur ; rien n'est envoyé ni enregistré." },
  { q: "Le mur de la vitrine, c'est quoi ?", r: "Des billets en papier où les passants écrivent leur voyage promis, sans nom ni coordonnées. On ne rappelle personne à partir du mur." },
  { q: "Et si l'agence fait défaut ?", r: "Sa garantie financière sert à rembourser les sommes versées (Code du tourisme, art. L.211-18 ; conditions à l'art. R.211-31). Garant et assureur sont en bas de chaque page." },
];
