// Les données du site Vert en Août, paysagiste fictif. Prix, devis, climat : exemples.
//
// Aucune promesse de jardin « sans arrosage » (C. conso., L121-2) : la première année,
// il faut arroser, et le site le dit partout. Les restrictions d'eau sont graduées
// (service-public.gouv.fr, A18382, 07/07/2026) : on n'écrit jamais « arrosage
// interdit » comme une généralité. Aucune mention de crédit d'impôt sur la création
// (circulaire du 3 janvier 2025, § I-5.2), sinon pour dire qu'elle n'y ouvre pas droit.

export const DOSSIER = "/exemples/vert-en-aout";

export const CONTACT = {
  telephone: "06 39 98 15 08", // tranche réservée à la fiction par l'ARCEP
  adresse: "Route de l'Exemple · pépinière et bureau",
  zone: "Nord Ardèche et alentours, à 30 km",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#commune`, libelle: "Ta commune" },
  { href: `${DOSSIER}/devis`, libelle: "Le devis" },
  { href: `${DOSSIER}/15-aout`, libelle: "Le 15 août" },
  { href: `${DOSSIER}#restrictions`, libelle: "L'eau, l'été" },
  { href: `${DOSSIER}#contact`, libelle: "Nous appeler" },
];

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

export const NIVEAUX = [
  { nom: "Vigilance", texte: "Pas de restriction. Chacun est invité à économiser l'eau." },
  { nom: "Alerte", texte: "Premières restrictions, notamment pour l'arrosage." },
  { nom: "Alerte renforcée", texte: "Les restrictions d'arrosage sont renforcées." },
  { nom: "Crise", texte: "L'eau est réservée aux usages prioritaires." },
];

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

export const PHOTOS = {
  jardinSec: { src: "/exemples/vert-en-aout/jardin-sec.webp", largeur: 800, hauteur: 600, alt: "Un massif de lavandes et de fétuques bleues sur un sol de graviers, en plein été" },
  allee: { src: "/exemples/vert-en-aout/allee-seche.webp", largeur: 900, hauteur: 511, alt: "Une allée de graviers entre des graminées et des vivaces en fleurs" },
  pots: { src: "/exemples/vert-en-aout/pots-gravier.webp", largeur: 900, hauteur: 599, alt: "Des jarres de terre cuite posées sur un lit de cailloux, parmi les lavandes" },
  paille: { src: "/exemples/vert-en-aout/herbe-paille.webp", largeur: 900, hauteur: 675, alt: "Une pelouse jaunie par la sécheresse, en gros plan" },
};

export const QUESTIONS = [
  {
    q: "Un jardin sans arrosage, alors\u00a0?",
    r: "Non. La première année, il faut arroser l'été, le temps que les racines descendent. Ensuite, seulement en cas de canicule. On choisit des plantes qui ont peu soif ; on ne promet pas qu'elles n'auront jamais soif.",
  },
  {
    q: "Et si l'arrosage est restreint dans ma commune\u00a0?",
    r: "Les restrictions sont graduées, et c'est l'arrêté du préfet qui dit ce qui est permis chez toi : tu le trouves sur la plateforme officielle VigiEau ou en mairie. On plante à l'automne, pour que la première année d'arrosage tombe le moins possible en été.",
  },
  {
    q: "La création de jardin ouvre-t-elle droit au crédit d'impôt\u00a0?",
    r: "Non. Le crédit d'impôt des services à la personne ne vaut que pour l'entretien courant du jardin, par une entreprise déclarée dont c'est l'activité. La création n'y ouvre pas droit ; on préfère le dire avant le devis.",
  },
  {
    q: "Vous publiez mon jardin\u00a0?",
    r: "Seulement si tu le veux, par écrit, sans adresse, sans visage. Chaque 15 août, l'album montre les jardins dont les propriétaires ont dit oui, même ceux qui ont souffert.",
  },
];
