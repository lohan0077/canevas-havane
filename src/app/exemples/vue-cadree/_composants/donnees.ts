// Les données du site Vue Cadrée, paysagiste fictif. Prix, dates, numéros : exemples.
//
// Le crédit d'impôt des services à la personne n'apparaît que sur l'entretien, et
// seulement comme il le doit : détaché du prix, en plus petit (arrêté du 17 mars
// 2015, art. 5), avec ses conditions — entreprise déclarée dont c'est l'activité
// exclusive, jardin de la résidence du client, jamais la création (CGI, art. 199
// sexdecies ; C. trav., L7232-1-1, L7232-1-2, D7231-1 ; circulaire du 3 janvier 2025,
// § I-5.2). Prix exprimés hors taxes et toutes taxes comprises (même arrêté, art. 4).

export const DOSSIER = "/exemples/vue-cadree";

export const CONTACT = {
  telephone: "06 39 98 07 15", // tranche réservée à la fiction par l'ARCEP
  adresse: "Chemin de l'Exemple · atelier et dépôt",
  zone: "À 25 km autour de l'atelier",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#photos`, libelle: "Trois photos" },
  { href: `${DOSSIER}#croquis`, libelle: "Le croquis d'hiver" },
  { href: `${DOSSIER}/arbres`, libelle: "Quand tailler" },
  { href: `${DOSSIER}/entretien`, libelle: "L'entretien" },
  { href: `${DOSSIER}#contact`, libelle: "Nous joindre" },
];

export type Arbre = {
  slug: string;
  nom: string;
  question: string;
  reponse: [string, string, string];   // trois lignes, pas plus
  saison: string;
  semaines: string[];
  photo?: "olivier";
};

export const ARBRES: Arbre[] = [
  {
    slug: "olivier",
    nom: "Olivier",
    question: "Quand tailler un olivier\u00a0?",
    reponse: [
      "En fin d'hiver, de mars à avril, une fois les gelées passées, avant la floraison.",
      "Une taille légère : on éclaircit le centre pour que la lumière passe, sans enlever plus d'un tiers du feuillage.",
      "Jamais par temps de gel, ni en pleine chaleur.",
    ],
    saison: "mars – avril",
    semaines: ["Semaine du 8 mars 2027", "Semaine du 15 mars 2027", "Semaine du 22 mars 2027"],
    photo: "olivier",
  },
  {
    slug: "cerisier",
    nom: "Cerisier",
    question: "Quand tailler un cerisier\u00a0?",
    reponse: [
      "En été, juste après la récolte : de juillet à août, par temps sec.",
      "On enlève le bois mort et les branches qui se croisent ; les plaies cicatrisent mieux qu'en hiver.",
      "Pas de grosse coupe : un cerisier n'aime pas qu'on le rabatte.",
    ],
    saison: "juillet – août",
    semaines: ["Semaine du 12 juillet 2027", "Semaine du 19 juillet 2027", "Semaine du 26 juillet 2027"],
  },
  {
    slug: "haie",
    nom: "Haie",
    question: "Quand tailler les haies\u00a0?",
    reponse: [
      "Deux fois par an : en fin d'hiver (février – début mars) et en fin d'été (septembre).",
      "Entre mi-mars et fin juillet, on évite : c'est la saison des nids.",
      "Taillée un peu plus étroite en haut qu'en bas, elle reste dense jusqu'au pied.",
    ],
    saison: "février – mars, septembre",
    semaines: ["Semaine du 15 février 2027", "Semaine du 22 février 2027", "Semaine du 1er mars 2027"],
  },
];

export const arbre = (slug: string) => ARBRES.find((a) => a.slug === slug);

/** L'entretien à l'année, selon la surface. Micro-entreprise en franchise : HT = TTC. */
export const PALIERS_ENTRETIEN = [
  { jusqua: 300, titre: "Petit jardin · 14 passages", prix: "840 € HT · 840 € TTC par an · exemple", detail: "Tonte, taille des haies deux fois l'an, désherbage des massifs." },
  { jusqua: 700, titre: "Jardin moyen · 18 passages", prix: "1 200 € HT · 1 200 € TTC par an · exemple", detail: "Tonte, taille des haies deux fois l'an, désherbage, ramassage des feuilles." },
  { jusqua: 1500, titre: "Grand jardin · 22 passages", prix: "1 680 € HT · 1 680 € TTC par an · exemple", detail: "Tonte, haies, désherbage, feuilles, taille des arbustes à hauteur d'homme." },
];

export const SAP = {
  entreprise: "Vue Cadrée Entretien",
  numero: "SAP 000000000 · exemple",
};

export const PHOTOS = {
  fenetre: { src: "/exemples/vue-cadree/fenetre-ouverte.webp", largeur: 1200, hauteur: 900, alt: "Une fenêtre grande ouverte sur un jardin vert, un arbre au milieu" },
  fenetreJardin: { src: "/exemples/vue-cadree/fenetre-jardin.webp", largeur: 700, hauteur: 1050, alt: "Un jardin vu à travers les carreaux d'une fenêtre" },
  olivier: { src: "/exemples/vue-cadree/olivier.webp", largeur: 1000, hauteur: 667, alt: "Un vieil olivier au tronc tordu, au milieu d'un massif fleuri" },
  hiver: { src: "/exemples/vue-cadree/jardin-hiver.webp", largeur: 1000, hauteur: 667, alt: "Un jardin en hiver, ses haies taillées couvertes de givre" },
};

export const QUESTIONS = [
  {
    q: "Pourquoi trois photos prises de la fenêtre ?",
    r: "Parce que c'est de là que tu regardes ton jardin, tous les jours. On le dessine pour cette vue-là, pas pour une photo aérienne. Les trois photos suffisent pour un premier croquis ; on vient voir avant le chantier.",
  },
  {
    q: "Le croquis est-il payant ?",
    r: "Oui : 150 € TTC (exemple), déduits du chantier si tu nous le confies. Un croquis, c'est une demi-journée de dessin ; on préfère le dire.",
  },
  {
    q: "Le crédit d'impôt vaut-il pour la création ?",
    r: "Non. Il ne vaut que pour l'entretien du jardin de ta résidence, confié à une entreprise déclarée services à la personne dont c'est l'activité exclusive. La création, le terrassement ou un élagage dans l'arbre n'y ouvrent pas droit.",
  },
  {
    q: "Vous intervenez où ?",
    r: "À 25 km autour de l'atelier. Au-delà, on te le dit tout de suite, pour ne pas te faire attendre.",
  },
];
