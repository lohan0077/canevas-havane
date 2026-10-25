// Les contenus du site Après Vous, entreprise de nettoyage de bureaux fictive : horaires,
// rapports, prix, ancienneté et numéros sont des exemples. Le site réunit les deux vidéos
// du nettoyage : « Créer une marque » (Après Vous, l'équipe du soir, le petit mot) et
// « Remplir l'agenda » (le rapport de passage chaque soir, la grille de prix en ligne).
//
// Les règles tenues ici (Videos/marque-nettoyage-b2b et agenda-nettoyage-b2b, SOURCES.md) :
//   - aucun agent nommé ni montré : « l'équipe du soir · 2 agents », partout ;
//   - le rapport dit ce qui a été fait, jamais qui l'a fait ; les agents en sont
//     informés avant (C. trav., L1222-4), le CSE consulté quand il existe (L2312-38) ;
//   - clients professionnels : prix hors taxes, et le site le dit ; prix d'exemple,
//     prix ferme au devis après visite ;
//   - aucun avis, aucune note.

export const DOSSIER = "/exemples/apres-vous";

export const entreprise = {
  nom: "Après Vous",
  signature: "On arrive quand vous partez.",
  // Tranche réservée par l'ARCEP aux œuvres de fiction : ce numéro ne sonne chez personne.
  telephone: "01 99 00 74 19",
  siret: "000 000 000 00000",
  equipe: "L'équipe du soir · 2 agents",
  ensemble: 6, // années ensemble chez nous (exemple)
  zone: "Exemple-Ville et sa métropole",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/l-equipe-du-soir`, libelle: "L'équipe du soir" },
  { href: `${DOSSIER}/rapport-de-passage`, libelle: "Le rapport du soir" },
  { href: `${DOSSIER}/un-bureau-la-nuit`, libelle: "Un bureau, la nuit" },
  { href: `${DOSSIER}/prix`, libelle: "Nos prix" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };

export const photos = {
  interrupteur: { src: `${DOSSIER}/interrupteur-dans-l-ombre.webp`, largeur: 1400, hauteur: 933, alt: "Un interrupteur blanc sur un mur gris, à la limite de l'ombre et de la lumière" },
  vitre: { src: `${DOSSIER}/bureaux-derriere-la-vitre.webp`, largeur: 1400, hauteur: 944, alt: "Des bureaux vides derrière une grande vitre, le soir, où se reflète la ville" },
  nuit: { src: `${DOSSIER}/bureau-a-la-nuit.webp`, largeur: 1000, hauteur: 1250, alt: "Un bureau dans la pénombre, une lampe allumée, une fenêtre sur l'immeuble d'en face" },
  lampe: { src: `${DOSSIER}/lampe-orange.webp`, largeur: 900, hauteur: 1350, alt: "Une lampe de bureau allumée, sa lumière orangée sur un mur clair" },
  bureau: { src: `${DOSSIER}/bureau-ouvert.webp`, largeur: 1400, hauteur: 935, alt: "Un bureau ouvert, rangé et vide : postes de travail en bois clair, fauteuils bleus, grandes fenêtres" },
  sanitaires: { src: `${DOSSIER}/lavabo-miroir-rond.webp`, largeur: 1100, hauteur: 734, alt: "Un lavabo blanc sous un miroir rond, dans des sanitaires carrelés de blanc et de rouge" },
  chiffon: { src: `${DOSSIER}/chiffon-microfibre.webp`, largeur: 1200, hauteur: 801, alt: "Une main passe un chiffon microfibre gris sur une surface lisse" },
  plateau: { src: `${DOSSIER}/plateau-vide.webp`, largeur: 1400, hauteur: 933, alt: "Un plateau de bureaux vide et éclairé, piliers blancs et sol brillant" },
} satisfies Record<string, Photo>;

/** Le soir type, à partir de l'heure où vous partez (en minutes après votre départ). */
export const SOIR = [
  { heure: 0, quoi: "Vous partez", detail: "La dernière lumière s'éteint. Rien ne se passe pendant que vous êtes là." },
  { heure: 30, quoi: "On arrive", detail: "Badge, alarme, et la même équipe que la veille." },
  { heure: 40, quoi: "Les bureaux", detail: "Corbeilles, plans de travail, sols, poignées. Les papiers restent où vous les avez laissés." },
  { heure: 85, quoi: "Les sanitaires et la cuisine", detail: "Nettoyés, désinfectés, consommables complétés." },
  { heure: 110, quoi: "Le petit mot", detail: "Posé sur le bureau de l'accueil : l'heure du passage, ce qu'on a remarqué." },
  { heure: 120, quoi: "On repart", detail: "Lumières éteintes, alarme remise, clés à leur place. Le rapport part dans la foulée." },
];

/** Le même soir, raconté pas à pas sur l'accueil (avec sa photo). */
export const RECIT = [
  { moment: "18 h 30", titre: "Vous éteignez la lumière.", texte: "C'est notre signal. Tous nos contrats sont du soir : on ne commence jamais tant que vous êtes là.", photo: "interrupteur" },
  { moment: "19 h 40", titre: "L'équipe du soir arrive.", texte: "Toujours la même, depuis des années. Badge, alarme, et les clés qui ne quittent jamais l'armoire du dépôt sans elle.", photo: "vitre" },
  { moment: "20 h 12", titre: "Les bureaux, un par un.", texte: "Corbeilles, plans de travail, sols, poignées. Vos papiers restent où vous les avez laissés : on n'y touche pas.", photo: "bureau" },
  { moment: "21 h 05", titre: "Le rapport part. Le petit mot reste.", texte: "Le rapport arrive chez vous ce soir ; le mot vous attend demain matin sur le bureau de l'accueil.", photo: "lampe" },
] as const;

export const PRESTATIONS = [
  { titre: "Les bureaux", texte: "Corbeilles, plans de travail dégagés, sols, poignées et interrupteurs. On ne touche ni aux papiers ni aux écrans.", photo: "bureau" },
  { titre: "Les sanitaires", texte: "Nettoyés et désinfectés à chaque passage, consommables complétés.", photo: "sanitaires" },
  { titre: "La cuisine", texte: "Évier, plans, micro-ondes ; le réfrigérateur vidé le vendredi, avec votre accord.", photo: null },
  { titre: "Poubelles et tri", texte: "Sacs changés, tri sélectif descendu au local, bacs rincés le vendredi.", photo: null },
  { titre: "Les vitres intérieures", texte: "Une fois par mois, ou plus, en option.", photo: "chiffon" },
] as const;

export const PREUVES = [
  { titre: "Le rapport, chaque soir", texte: "L'heure d'arrivée et de départ, ce qui a été fait, ce qu'on a remarqué. Dans votre boîte avant 21 h 30." },
  { titre: "L'attestation de vigilance, d'office", texte: "Elle vous est due à la signature puis tous les six mois : on vous l'envoie sans que vous ayez à la demander." },
  { titre: "La même équipe chaque soir", texte: "Deux agents qui connaissent vos bureaux. Le rapport dit ce qui a été fait, jamais qui l'a fait." },
  { titre: "Le prix en ligne", texte: "Votre surface, vos passages : un prix mensuel d'exemple, tout de suite. Le prix ferme vient au devis, après visite." },
];

// ---------- Le rapport de passage ----------

export type Ligne = { titre: string; detail: string };
export type Remarque = { titre: string; lieu: string; heure: string; detail: string };
export type Soir = { id: string; jour: string; arrivee: string; depart: string; bureaux: number; remarques: Remarque[] };

/** Une semaine de rapports, d'exemple. Le rapport dit ce qui a été fait, pas qui l'a fait. */
export const SOIRS: Soir[] = [
  { id: "lundi", jour: "Lundi", arrivee: "19 h 35", depart: "21 h 00", bureaux: 14, remarques: [
    { titre: "Ampoule grillée", lieu: "Accueil", heure: "20 h 02", detail: "Le plafonnier de gauche. Rien de dangereux : à remplacer par votre mainteneur." },
  ] },
  { id: "mardi", jour: "Mardi", arrivee: "19 h 40", depart: "21 h 05", bureaux: 14, remarques: [
    { titre: "Store bloqué", lieu: "Salle 3", heure: "20 h 18", detail: "Lame coincée en position basse. Laissé tel quel : à voir par votre mainteneur." },
    { titre: "Fuite sous l'évier", lieu: "Cuisine", heure: "20 h 41", detail: "Goutte-à-goutte au siphon. Seau posé dessous, robinet d'arrêt fermé." },
  ] },
  { id: "mercredi", jour: "Mercredi", arrivee: "19 h 45", depart: "21 h 10", bureaux: 14, remarques: [] },
  { id: "jeudi", jour: "Jeudi", arrivee: "19 h 40", depart: "21 h 15", bureaux: 14, remarques: [
    { titre: "Fenêtre restée ouverte", lieu: "Bureau 7", heure: "20 h 30", detail: "Fermée par l'équipe. Rien d'autre à signaler dans le bureau." },
  ] },
  { id: "vendredi", jour: "Vendredi", arrivee: "18 h 50", depart: "20 h 40", bureaux: 14, remarques: [] },
];

/** Une heure qui ne se coupe pas en fin de ligne : « 21 h 05 ». */
export const nb = (t: string) => t.replace(/ /g, "\u00a0");

export function lignes(s: Soir): Ligne[] {
  return [
    { titre: `Arrivée ${nb(s.arrivee)} · départ ${nb(s.depart)}`, detail: `Entrée et sortie badgées ; alarme remise à ${s.depart}.` },
    { titre: `${s.bureaux} bureaux`, detail: "Corbeilles vidées, plans de travail dépoussiérés, sols aspirés, poignées essuyées." },
    { titre: "Sanitaires", detail: "Deux blocs nettoyés et désinfectés, consommables complétés." },
    { titre: "Poubelles et tri", detail: "Sacs changés, tri sélectif descendu au local, bacs rincés le vendredi." },
  ];
}

// ---------- La grille de prix ----------

export const SURFACES = [150, 300, 600, 1000];
export const PASSAGES = [1, 2, 3, 5];

/** Le prix mensuel d'exemple, HT : la surface, les passages par semaine, un tarif dégressif au m². */
export function prixMensuel(surface: number, passages: number): number {
  const tarif = surface <= 150 ? 0.2 : surface <= 300 ? 0.177 : surface <= 600 ? 0.155 : 0.14;
  return Math.max(180, Math.round((surface * passages * (52 / 12) * tarif) / 10) * 10);
}

/** « 1 290 € » : espace fine insécable pour les milliers, insécable avant €. */
export const euros = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;

/** Trois repères de la grille, pour l'accueil. */
export const REPERES = [
  { surface: 150, passages: 2, pour: "Un cabinet, une agence" },
  { surface: 300, passages: 3, pour: "Un plateau de 14 bureaux" },
  { surface: 600, passages: 5, pour: "Un étage entier" },
];

export const COMPRIS = [
  "Le rapport de passage, chaque soir",
  "Le petit mot, chaque matin",
  "Les produits et le matériel",
  "L'attestation de vigilance à la signature, puis tous les six mois",
  "Un passage de rattrapage le lendemain si quelque chose manque",
];

export const QUESTIONS = [
  {
    q: "« Vous ne nous verrez jamais », c'est vrai ?",
    r: "Oui : tous nos contrats sont du soir, après votre départ. Si quelqu'un reste tard, on commence par les autres pièces et on revient à la sienne quand elle est vide.",
  },
  {
    q: "Vos prix sont HT ?",
    r: "Oui : nos clients sont des entreprises, et nos prix sont affichés hors taxes, TVA à 20 % en sus. La grille donne un prix d'exemple ; le prix ferme vient au devis, après une visite.",
  },
  {
    q: "Qui sont les agents ?",
    r: "Une équipe de deux, toujours la même chez vous. On ne publie ni leurs noms ni leurs visages : sur ce site, dans le rapport comme dans le petit mot, c'est « l'équipe du soir ».",
  },
  {
    q: "Le rapport surveille-t-il les agents ?",
    r: "Il dit ce qui a été fait et à quelle heure, pas qui l'a fait. Nos agents en sont informés avant d'y travailler, comme la loi le demande, et le comité social et économique est consulté quand l'entreprise en a un.",
  },
  {
    q: "Et nos clés ?",
    r: "Un jeu de clés ou de badges par équipe, rangé au dépôt dans une armoire fermée, sans votre adresse dessus. Remis le premier soir, rendu le dernier.",
  },
  {
    q: "Et si quelque chose est oublié ?",
    r: "Vous répondez au rapport, on repasse le lendemain soir, et le rapport suivant le dit.",
  },
  {
    q: "Vous filmez nos bureaux pour vos vidéos ?",
    r: "Non. La série « Un bureau, la nuit » est tournée dans nos propres locaux, sans document, écran ni nom visible.",
  },
];
