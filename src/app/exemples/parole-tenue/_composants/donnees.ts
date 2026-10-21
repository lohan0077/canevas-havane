// Les contenus du site Parole Tenue, agence de voyage imaginée dans la vidéo « Si je
// devais créer une agence de voyage ». Elle ne vend qu'une chose : les voyages qu'on
// a promis. Budgets, numéros, garant et assureur : des exemples. « Mettre de côté »
// est un calcul affiché, pas un produit d'épargne : l'agence n'encaisse rien d'avance.

export const DOSSIER = "/exemples/parole-tenue";

export const entreprise = {
  nom: "Parole Tenue",
  // Tranche que l'ARCEP réserve aux œuvres de fiction.
  telephone: "01 99 00 26 81",
  telephoneLien: "+33199002681",
  adresse: "12 rue de l'Exemple",
  ville: "Ville-d'Exemple",
  horaires: "Du mardi au samedi, 10 h – 19 h",
};

// Code du tourisme, art. R.211-2. Tous des exemples.
export const MENTIONS_TOURISME = [
  { libelle: "Raison sociale", valeur: "Parole Tenue, SARL au capital de 8 000 € (exemple)" },
  { libelle: "Immatriculation Atout France", valeur: "IM000000000 (exemple)" },
  { libelle: "Garant financier", valeur: "Garantie Exemple, 12 rue de l'Exemple, Ville-d'Exemple (exemple)" },
  { libelle: "Assureur responsabilité civile professionnelle", valeur: "Assurances Exemple, 12 rue de l'Exemple, Ville-d'Exemple (exemple)" },
];

export const NAVIGATION = [
  { href: `${DOSSIER}#promesse`, libelle: "Ta promesse" },
  { href: `${DOSSIER}/voyages`, libelle: "Les voyages promis" },
  { href: `${DOSSIER}#mur`, libelle: "Le mur" },
  { href: `${DOSSIER}/l-agence`, libelle: "L'agence" },
];

export const photos = {
  fuji: { src: "/exemples/parole-tenue/fuji.webp", largeur: 1400, hauteur: 933, alt: "Le mont Fuji enneigé qui se reflète dans un lac, sous un ciel bleu" },
  islande: { src: "/exemples/parole-tenue/islande.webp", largeur: 1000, hauteur: 605, alt: "Une cascade islandaise qui tombe d'une falaise verte, au coucher du soleil" },
  venise: { src: "/exemples/parole-tenue/venise.webp", largeur: 1000, hauteur: 667, alt: "Le Grand Canal de Venise au lever du soleil, une coupole au fond" },
};
export type CleePhoto = keyof typeof photos;

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
  { id: "japon", nom: "Le Japon", phrase: "On ira au Japon, un jour.", budget: 4680, mois: 3, pourquoi: "en avril, pour les cerisiers", duree: "12\u00A0jours", photo: "fuji" },
  { id: "islande", nom: "L'Islande", phrase: "Un jour, on verra les cascades.", budget: 4200, mois: 5, pourquoi: "en juin, quand le soleil ne se couche pas", duree: "9\u00A0jours", photo: "islande" },
  { id: "venise", nom: "Venise", phrase: "Je t'emmènerai à Venise.", budget: 1680, mois: 2, pourquoi: "en mars, avant la foule", duree: "4\u00A0jours", photo: "venise" },
  { id: "lisbonne", nom: "Lisbonne", phrase: "On fera Lisbonne avec maman.", budget: 1440, mois: 4, pourquoi: "en mai, pour la lumière", duree: "5\u00A0jours" },
  { id: "new-york", nom: "New York", phrase: "Pour nos vingt ans, New York.", budget: 3960, mois: 9, pourquoi: "en octobre, pour l'automne", duree: "7\u00A0jours" },
  { id: "dakar", nom: "Revoir Dakar", phrase: "On retournera voir la famille à Dakar.", budget: 1980, mois: 11, pourquoi: "en décembre, pour les fêtes", duree: "10\u00A0jours" },
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

export const euros = (n: number) => `${n.toLocaleString("fr-FR").replace(/ /g, " ")} €`;

export const ETAPES = [
  { titre: "Tu écris ta promesse", texte: "À qui, quel voyage, et depuis quand. Trois réponses, sur le site ou au comptoir." },
  { titre: "On te propose une date", texte: "Le bon mois pour ce voyage, assez loin pour avoir le temps, et ce qu'il faut mettre de côté chaque mois." },
  { titre: "On le construit ensemble", texte: "Un rendez-vous, un voyage chiffré. Avant de signer, le formulaire d'information prévu par le Code du tourisme." },
  { titre: "Tu la tiens", texte: "Le jour du départ, on t'envoie une seule photo : la promesse écrite, et le billet." },
];

export const MUR_EXEMPLES = [
  { ou: "Lisbonne", pour: "avec maman" },
  { ou: "Le Japon", pour: "avec Léo" },
  { ou: "Revoir Dakar", pour: "avant ses 80 ans" },
  { ou: "New York", pour: "pour nos 20 ans" },
  { ou: "L'Islande", pour: "enfin" },
  { ou: "Venise", pour: "promis à Jeanne" },
];

export const FAQ = [
  { q: "Vous encaissez l'argent que je mets de côté ?", r: "Non. Le montant mensuel est un calcul, pour t'aider à t'organiser. L'argent reste chez toi ; on ne propose aucun produit d'épargne." },
  { q: "Le budget affiché, c'est le prix ?", r: "C'est un exemple. Le prix réel est fixé au rendez-vous, et écrit dans le formulaire d'information que le Code du tourisme prévoit avant tout contrat (art. L.211-8)." },
  { q: "Ce que j'écris sur le site part où ?", r: "Nulle part. Le calcul se fait dans ton navigateur ; rien n'est envoyé ni enregistré." },
  { q: "Le mur de la vitrine, c'est quoi ?", r: "Des billets en papier où les passants écrivent leur voyage promis, sans nom ni coordonnées. On ne rappelle personne à partir du mur." },
  { q: "Et si l'agence fait défaut ?", r: "Sa garantie financière sert à rembourser les sommes versées (Code du tourisme, art. L.211-18 ; conditions à l'art. R.211-31). Garant et assureur sont en bas de chaque page." },
];

export const CRENEAUX = [
  { libelle: "Mardi", sous: "17 h" },
  { libelle: "Mercredi", sous: "11 h", pris: true },
  { libelle: "Jeudi", sous: "18 h 30" },
  { libelle: "Vendredi", sous: "12 h 30" },
  { libelle: "Samedi", sous: "10 h" },
  { libelle: "Samedi", sous: "15 h", pris: true },
];
