// Les contenus du site Un Seul Onglet, agence de voyage imaginée dans la vidéo « Si
// je devais remplir l'agenda d'une agence de voyage ». Tout est inventé ; budgets,
// numéros d'immatriculation, garant et assureur sont des exemples. Mentions du Code
// du tourisme (art. R.211-2) en pied de chaque page.

export const DOSSIER = "/exemples/un-seul-onglet";

export const entreprise = {
  nom: "Un Seul Onglet",
  // Tranche que l'ARCEP réserve aux œuvres de fiction.
  telephone: "01 99 00 73 62",
  telephoneLien: "+33199007362",
  adresse: "12 rue de l'Exemple",
  ville: "Ville-d'Exemple",
  horaires: "Du lundi au samedi, 10 h – 19 h · rendez-vous en visio jusqu'à 21 h",
};

// Code du tourisme, art. R.211-2 : nom, forme juridique, immatriculation, garant et
// assureur (nom et adresse), sur le site. Tous des exemples.
export const MENTIONS_TOURISME = [
  { libelle: "Raison sociale", valeur: "Un Seul Onglet, SAS au capital de 10 000 € (exemple)" },
  { libelle: "Immatriculation Atout France", valeur: "IM000000000 (exemple), au registre des opérateurs de voyages et de séjours" },
  { libelle: "Garant financier", valeur: "Garantie Exemple, 12 rue de l'Exemple, Ville-d'Exemple (exemple)" },
  { libelle: "Assureur responsabilité civile professionnelle", valeur: "Assurances Exemple, 12 rue de l'Exemple, Ville-d'Exemple (exemple)" },
];

export const NAVIGATION = [
  { href: `${DOSSIER}#questions`, libelle: "Ferme tes onglets" },
  { href: `${DOSSIER}/budgets/voyage-de-noces`, libelle: "Budgets" },
  { href: `${DOSSIER}#dimanche`, libelle: "Dimanche 21 h" },
  { href: `${DOSSIER}/l-agence`, libelle: "L'agence" },
];

export const photos = {
  lisbonne: { src: "/exemples/un-seul-onglet/lisbonne.webp", largeur: 1400, hauteur: 933, alt: "Les toits rouges de Lisbonne et le Tage, sous un ciel bleu" },
  bali: { src: "/exemples/un-seul-onglet/bali.webp", largeur: 720, hauteur: 1280, alt: "Des rizières en terrasses et des palmiers, à Bali" },
  polynesie: { src: "/exemples/un-seul-onglet/polynesie.webp", largeur: 1200, hauteur: 800, alt: "Des bungalows sur pilotis au-dessus d'un lagon turquoise, une montagne au fond" },
};
export type CleePhoto = keyof typeof photos;

/* ---------- Les trois questions ---------- */

export const QUESTIONS = [
  { id: "qui", question: "Avec qui ?", reponses: ["Seul·e", "À deux", "En famille", "Entre amis"] },
  { id: "quand", question: "Quand ?", reponses: ["Printemps 2027", "Été 2027", "Automne 2027", "Pas encore de date"] },
  { id: "budget", question: "Quel budget ?", reponses: ["Moins de 1 000 €", "1 000 – 2 500 €", "2 500 – 5 000 €", "Plus de 5 000 €"] },
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

/* ---------- Les pages de budgets ---------- */

export type Ligne = { quoi: string; montant: number };
export type Voyage = { ou: string; duree: string; photo: CleePhoto; lignes: Ligne[]; note: string };
export type PageBudgets = {
  slug: string;
  recherche: string;   // ce que les gens tapent
  titre: string;
  pour: string;        // « pour deux »
  intro: string;
  voyages: Voyage[];
};

export const total = (v: Voyage) => v.lignes.reduce((s, l) => s + l.montant, 0);
export const euros = (n: number) => `${n.toLocaleString("fr-FR").replace(/ /g, " ")} €`;

export const BUDGETS: PageBudgets[] = [
  {
    slug: "voyage-de-noces",
    recherche: "voyage de noces prix moyen",
    titre: "Voyage de noces",
    pour: "pour deux",
    intro: "Trois voyages de noces, trois budgets. Pas « à partir de » : le détail, ligne par ligne.",
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

export const ETAPES = [
  { titre: "Tu fermes tes onglets", texte: "Trois questions sur l'accueil : avec qui, quand, quel budget. Une minute." },
  { titre: "Trente minutes avec un conseiller", texte: "En visio ou à l'agence. Il a lu tes réponses, il a déjà ouvert les onglets à ta place." },
  { titre: "Un voyage, chiffré ligne par ligne", texte: "Une proposition, pas quarante. Les vols, les nuits, les transferts, et ce qui n'est pas compris." },
  { titre: "Tu réserves, ou pas", texte: "Si tu dis oui, tu reçois le formulaire d'information prévu par le Code du tourisme, avant de signer quoi que ce soit." },
];

export const EPISODES = [
  { titre: "Lisbonne à deux, 5 nuits", budget: "2 150 €", photo: "lisbonne" as CleePhoto },
  { titre: "Bali, 12 nuits, deux hôtels", budget: "6 360 €", photo: "bali" as CleePhoto },
  { titre: "Polynésie, deux îles", budget: "12 250 €", photo: "polynesie" as CleePhoto },
];

export const EQUIPE = [
  { initiales: "IN", prenom: "Inès", role: "Europe et week-ends" },
  { initiales: "MA", prenom: "Malik", role: "Asie, Océanie, voyages de noces" },
  { initiales: "CL", prenom: "Claire", role: "Voyages en famille" },
];

export const FAQ = [
  { q: "Les trente minutes sont payantes ?", r: "Non. Tu repars avec un voyage chiffré ligne par ligne, que tu réserves avec nous ou pas." },
  { q: "En visio ou à l'agence ?", r: "Comme tu veux. En visio, jusqu'à 21 h : c'est souvent l'heure où les onglets s'ouvrent." },
  { q: "Pourquoi trois questions seulement ?", r: "Parce qu'elles suffisent pour préparer le rendez-vous. Le reste, on se le dit de vive voix." },
  { q: "Les budgets du site, ce sont des offres ?", r: "Non, des exemples datés. Avant toute réservation, on te remet le formulaire d'information prévu par le Code du tourisme (art. L.211-8), avec le prix exact." },
  { q: "Et si l'agence fait défaut ?", r: "Notre garantie financière sert à rembourser les sommes que tu as versées (Code du tourisme, art. L.211-18 ; conditions à l'art. R.211-31). Son nom et son adresse sont en bas de chaque page." },
  { q: "Comment vérifier que vous êtes immatriculés ?", r: "Atout France publie la liste des agences immatriculées. Notre numéro est en bas de chaque page." },
];
