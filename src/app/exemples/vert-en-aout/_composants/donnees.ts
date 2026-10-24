// Les données du site Vert en Août, paysagiste fictif. Prix, devis, dates, climat,
// numéros : exemples.
//
// Le site réunit les deux vidéos des paysagistes : « Créer une marque » (le nom, la
// commune qui donne les plantes adaptées à l'été, la ligne d'arrosage du devis,
// l'affiche des restrictions, l'album du 15 août) et « Remplir l'agenda » (trois
// photos prises de la fenêtre, le croquis d'hiver et le chantier au printemps, une
// page par arbre, l'entretien avec le crédit d'impôt à sa place). Une seule version
// de chaque fait : le téléphone, la zone et le nom sont ceux de Vert en Août ; le
// chantier part au printemps, comme le dit la voix.
//
// Règles tenues ici :
//   - aucune promesse de jardin « sans arrosage » (C. conso., L121-2) : la première
//     année, il faut arroser, et le site le dit partout ;
//   - les restrictions d'eau sont graduées (service-public.gouv.fr, A18382,
//     07/07/2026) : jamais « arrosage interdit » comme une généralité ;
//   - le crédit d'impôt des services à la personne n'apparaît que sur l'entretien,
//     détaché du prix, en plus petit (arrêté du 17 mars 2015, art. 5), avec ses
//     conditions : entreprise déclarée dont c'est l'activité exclusive, jardin de la
//     résidence du client, jamais la création (CGI, art. 199 sexdecies ; C. trav.,
//     L7232-1-1, L7232-1-2, D7231-1 ; circulaire du 3 janvier 2025, § I-5.2) ;
//   - prix HT et TTC (même arrêté, art. 4) ; téléphone dans la tranche de fiction ;
//     aucune adresse e-mail, aucun avis, aucune photo de jardin inventée.

export const DOSSIER = "/exemples/vert-en-aout";

export const CONTACT = {
  telephone: "06 39 98 15 08", // tranche réservée à la fiction par l'ARCEP
  adresse: "Route de l'Exemple · pépinière et bureau",
  zone: "Nord Ardèche et alentours, à 30 km",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#commune`, libelle: "Ta commune" },
  { href: `${DOSSIER}/devis`, libelle: "Le devis" },
  { href: `${DOSSIER}/arbres`, libelle: "Quand tailler" },
  { href: `${DOSSIER}/entretien`, libelle: "L'entretien" },
  { href: `${DOSSIER}/15-aout`, libelle: "Le 15 août" },
];

/* ---------- Les photos (Pexels, licence Pexels, servies depuis notre domaine) ---------- */

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const photo = (fichier: string, largeur: number, hauteur: number, alt: string): Photo => ({ src: `${DOSSIER}/${fichier}.webp`, largeur, hauteur, alt });

export const PHOTOS = {
  jardinSec: photo("jardin-sec", 1100, 825, "Un massif de lavandes et de fétuques bleues sur un sol de graviers, en plein été"),
  allee: photo("allee-seche", 1600, 908, "Une allée de graviers entre des graminées et des vivaces en fleurs"),
  pots: photo("pots-gravier", 900, 599, "Des jarres de terre cuite posées sur un lit de cailloux, parmi les lavandes"),
  paille: photo("herbe-paille", 900, 675, "Une pelouse jaunie par la sécheresse, en gros plan"),
  fenetre: photo("fenetre-ouverte", 1200, 900, "Une fenêtre grande ouverte sur un jardin vert, un arbre au milieu"),
  fenetreJardin: photo("fenetre-jardin", 700, 1050, "Un jardin vu à travers les carreaux d'une fenêtre"),
  olivier: photo("olivier", 1000, 667, "Un vieil olivier au tronc tordu, au milieu d'un massif fleuri"),
  hiver: photo("jardin-hiver", 1000, 667, "Un jardin en hiver, ses haies taillées couvertes de givre"),
} satisfies Record<string, Photo>;

/* ---------- Les plantes : l'outil « Ta commune » ---------- */

export type Sol = "leger" | "ordinaire" | "lourd";
export type Expo = "soleil" | "mi-ombre";

export type Plante = {
  nom: string;
  latin: string;
  hauteur: string;
  fleurs: string;
  sols: Sol[];
  expos: Expo[];
  teinte: string;
};

// Dans l'ordre où le site les propose : les premières qui conviennent sont montrées.
export const PLANTES: Plante[] = [
  { nom: "Lavande vraie", latin: "Lavandula angustifolia", hauteur: "50 cm", fleurs: "juin – juillet", sols: ["leger", "ordinaire"], expos: ["soleil"], teinte: "#8A7BB8" },
  { nom: "Romarin", latin: "Salvia rosmarinus", hauteur: "1 m", fleurs: "mars – mai", sols: ["leger", "ordinaire"], expos: ["soleil"], teinte: "#6F8FB0" },
  { nom: "Sauge de Russie", latin: "Salvia yangii", hauteur: "1 m", fleurs: "juillet – septembre", sols: ["leger", "ordinaire"], expos: ["soleil"], teinte: "#7E8CC2" },
  { nom: "Achillée", latin: "Achillea millefolium", hauteur: "60 cm", fleurs: "juin – septembre", sols: ["leger", "ordinaire", "lourd"], expos: ["soleil"], teinte: "#D8B04A" },
  { nom: "Gaura", latin: "Oenothera lindheimeri", hauteur: "80 cm", fleurs: "juin – octobre", sols: ["leger", "ordinaire", "lourd"], expos: ["soleil"], teinte: "#E7B9C2" },
  { nom: "Népéta", latin: "Nepeta × faassenii", hauteur: "40 cm", fleurs: "mai – septembre", sols: ["leger", "ordinaire", "lourd"], expos: ["soleil", "mi-ombre"], teinte: "#9C8FD0" },
  { nom: "Euphorbe des garrigues", latin: "Euphorbia characias", hauteur: "1 m", fleurs: "mars – mai", sols: ["leger", "ordinaire"], expos: ["soleil", "mi-ombre"], teinte: "#A8B84A" },
  { nom: "Fétuque bleue", latin: "Festuca glauca", hauteur: "30 cm", fleurs: "en juin, épis beiges", sols: ["leger", "ordinaire"], expos: ["soleil"], teinte: "#8FA9B0" },
  { nom: "Orpin", latin: "Hylotelephium spectabile", hauteur: "50 cm", fleurs: "août – octobre", sols: ["leger", "ordinaire", "lourd"], expos: ["soleil", "mi-ombre"], teinte: "#C97A8C" },
  { nom: "Géranium vivace", latin: "Geranium macrorrhizum", hauteur: "30 cm", fleurs: "mai – juin", sols: ["leger", "ordinaire", "lourd"], expos: ["mi-ombre"], teinte: "#C46A8A" },
];

export const plantesPour = (sol: Sol, expo: Expo) => PLANTES.filter((p) => p.sols.includes(sol) && p.expos.includes(expo)).slice(0, 4);

/* ---------- L'eau, l'été ---------- */

export const NIVEAUX = [
  { nom: "Vigilance", texte: "Pas de restriction. Chacun est invité à économiser l'eau." },
  { nom: "Alerte", texte: "Premières restrictions, notamment pour l'arrosage." },
  { nom: "Alerte renforcée", texte: "Les restrictions d'arrosage sont renforcées." },
  { nom: "Crise", texte: "L'eau est réservée aux usages prioritaires." },
];

/* ---------- Le devis d'exemple (création : TVA 20 %) ---------- */

export const DEVIS = {
  numero: "27",
  titre: "Massif sec, devant la maison",
  postes: [
    { libelle: "Préparation du sol : décompactage, apport de graviers", ht: 900 },
    { libelle: "Plantes de terrain sec · 40 m², 120 godets", ht: 1600 },
    { libelle: "Paillage minéral · 40 m²", ht: 700 },
    { libelle: "Pose et plantation", ht: 800 },
  ],
  tva: 0.2,
};

/* ---------- Une page par arbre ---------- */

export type Arbre = {
  slug: string;
  nom: string;
  question: string;
  reponse: [string, string, string]; // trois lignes, pas plus
  saison: string;
  semaines: string[];
  photo?: Photo;
};

export const ARBRES: Arbre[] = [
  {
    slug: "olivier",
    nom: "Olivier",
    question: "Quand tailler un olivier ?",
    reponse: [
      "En fin d'hiver, de mars à avril, une fois les gelées passées, avant la floraison.",
      "Une taille légère : on éclaircit le centre pour que la lumière passe, sans enlever plus d'un tiers du feuillage.",
      "Jamais par temps de gel, ni en pleine chaleur.",
    ],
    saison: "mars – avril",
    semaines: ["Semaine du 8 mars 2027", "Semaine du 15 mars 2027", "Semaine du 22 mars 2027"],
    photo: PHOTOS.olivier,
  },
  {
    slug: "cerisier",
    nom: "Cerisier",
    question: "Quand tailler un cerisier ?",
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
    question: "Quand tailler les haies ?",
    reponse: [
      "Deux fois par an : en fin d'hiver (février – début mars) et en fin d'été (septembre).",
      "Entre mi-mars et fin juillet, on évite : c'est la saison des nids.",
      "Taillée un peu plus étroite en haut qu'en bas, elle reste dense jusqu'au pied.",
    ],
    saison: "février – mars, septembre",
    semaines: ["Semaine du 15 février 2027", "Semaine du 22 février 2027", "Semaine du 1er mars 2027"],
    photo: PHOTOS.hiver,
  },
];

export const arbre = (slug: string) => ARBRES.find((a) => a.slug === slug);

/* ---------- L'entretien (entreprise distincte, déclarée services à la personne) ---------- */

/** L'entretien à l'année, selon la surface. Micro-entreprise en franchise : HT = TTC. */
export const PALIERS_ENTRETIEN = [
  { jusqua: 300, titre: "Petit jardin · 14 passages", prix: "840 € HT · 840 € TTC par an · exemple", detail: "Tonte, taille des haies deux fois l'an, désherbage des massifs." },
  { jusqua: 700, titre: "Jardin moyen · 18 passages", prix: "1 200 € HT · 1 200 € TTC par an · exemple", detail: "Tonte, taille des haies deux fois l'an, désherbage, ramassage des feuilles." },
  { jusqua: 1500, titre: "Grand jardin · 22 passages", prix: "1 680 € HT · 1 680 € TTC par an · exemple", detail: "Tonte, haies, désherbage, feuilles, taille des arbustes à hauteur d'homme." },
];

export const SAP = {
  entreprise: "Vert en Août Entretien",
  numero: "SAP 000000000 · exemple",
};

/* ---------- L'année, la méthode, les questions ---------- */

export const MOIS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
export type Saison = "croquis" | "chantier" | "ete" | "entretien";
export const ANNEE: Saison[] = ["croquis", "croquis", "chantier", "chantier", "chantier", "ete", "ete", "ete", "entretien", "entretien", "croquis", "croquis"];
export const SAISONS: Record<Saison, { libelle: string; couleur: string }> = {
  croquis: { libelle: "Croquis d'hiver", couleur: "#8C4A33" },
  chantier: { libelle: "Chantiers", couleur: "#2F4A2C" },
  ete: { libelle: "L'été : arrosage, album du 15 août", couleur: "#E0B85C" },
  entretien: { libelle: "Entretien et tailles", couleur: "#8E9E6B" },
};

export const ETAPES = [
  { titre: "Trois photos", texte: "Prises de ta fenêtre, envoyées depuis le site. C'est tout ce qu'on te demande." },
  { titre: "Le croquis d'hiver", texte: "De novembre à février, on dessine ton jardin pour cette vue-là, avec des plantes qui ont peu soif." },
  { titre: "Le chantier", texte: "Au printemps, dès que la terre se réchauffe. Le devis dit l'arrosage qu'il faudra." },
  { titre: "Le 15 août", texte: "La première année, on arrose l'été. Puis on juge le jardin au pire moment : le 15 août." },
];

export const QUESTIONS = [
  {
    q: "Un jardin sans arrosage, alors ?",
    r: "Non. La première année, il faut arroser l'été, le temps que les racines descendent. Ensuite, seulement en cas de canicule. On choisit des plantes qui ont peu soif ; on ne promet pas qu'elles n'auront jamais soif.",
  },
  {
    q: "Pourquoi trois photos prises de la fenêtre ?",
    r: "Parce que c'est de là que tu regardes ton jardin, tous les jours. On le dessine pour cette vue-là, pas pour une photo aérienne. Les trois photos suffisent pour un premier croquis ; on vient voir avant le chantier.",
  },
  {
    q: "Le croquis est-il payant ?",
    r: "Oui : 150 € TTC (exemple), déduits du chantier si tu nous le confies. Un croquis, c'est une demi-journée de dessin ; on préfère le dire.",
  },
  {
    q: "Et si l'arrosage est restreint dans ma commune ?",
    r: "Les restrictions sont graduées, et c'est l'arrêté du préfet qui dit ce qui est permis chez toi : tu le trouves sur la plateforme officielle VigiEau ou en mairie. Si ta commune est souvent en alerte, on garde les plantes les plus sensibles pour une plantation d'automne.",
  },
  {
    q: "La création de jardin ouvre-t-elle droit au crédit d'impôt ?",
    r: "Non. Le crédit d'impôt des services à la personne ne vaut que pour l'entretien du jardin de ta résidence, confié à une entreprise déclarée dont c'est l'activité exclusive. La création, le terrassement ou un élagage dans l'arbre n'y ouvrent pas droit ; on préfère le dire avant le devis.",
  },
  {
    q: "Vous publiez mon jardin ?",
    r: "Seulement si tu le veux, par écrit, sans adresse, sans visage. Chaque 15 août, l'album montre les jardins dont les propriétaires ont dit oui, même ceux qui ont souffert.",
  },
  {
    q: "Vous intervenez où ?",
    r: "En Nord Ardèche et alentours, à 30 km de la pépinière. Au-delà, on te le dit tout de suite, pour ne pas te faire attendre.",
  },
];
