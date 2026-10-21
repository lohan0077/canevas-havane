// Les données du site Autographe, épicerie fine imaginaire de la vidéo « Si je
// devais créer une épicerie fine ». L'épicerie vend des auteurs : chaque pot porte
// la signature de celui qui l'a fait. Les auteurs, leurs fermes, leurs pots et leurs
// prix sont inventés, et marqués « exemple » à l'affichage. Aucune boisson
// alcoolique (loi Évin).
//
// Chaque produit porte ses mentions de vente à distance — poids, ingrédients,
// allergènes entre *astérisques* (affichés en gras), origine quand elle est requise
// (règlement (UE) n° 1169/2011, art. 9, 14 et 21 ; miel : décret n° 2003-587 ;
// confitures : décret n° 85-872, fruits et sucres pour 100 g).

export const DOSSIER = "/exemples/autographe";

export const boutique = {
  telephone: "01 99 00 31 58",
  adresse: "12 rue de l'Exemple",
  horaires: [
    { jours: "Mardi – samedi", heures: "10 h – 19 h" },
    { jours: "Dimanche", heures: "9 h 30 – 13 h" },
    { jours: "Lundi", heures: "Fermé" },
  ],
};

export type Oeuvre = {
  nom: string;
  poids: string;
  prix: number;
  ingredients: string;
  allergenes: string[];
  origine?: string;
  teinte: string;
};

export type Auteur = {
  slug: string;
  numero: number;
  prenom: string;
  feminin: boolean;
  metier: string;
  lieu: string;
  chiffre: string;
  resume: string;
  travail: string[];
  signature: number;
  oeuvres: Oeuvre[];
};

export const AUTEURS: Auteur[] = [
  {
    slug: "helene",
    numero: 12,
    prenom: "Hélène",
    feminin: true,
    metier: "apicultrice",
    lieu: "en Ardèche",
    chiffre: "80 ruches",
    resume: "80 ruches en Ardèche · 3 miels · 1 pain d'épices",
    travail: [
      "Hélène déplace ses ruches au fil des floraisons : les châtaigniers en juin, la bruyère à la fin de l'été. Chaque miel porte le nom de la fleur qui domine, et rien d'autre.",
      "Elle récolte, extrait et met en pot elle-même. Le pain d'épices est sa seule recette : du seigle, son miel, et des épices qu'elle ne change jamais.",
    ],
    signature: 0,
    oeuvres: [
      { nom: "Miel de châtaignier", poids: "250 g", prix: 9.5, ingredients: "Miel de châtaignier.", allergenes: [], origine: "France", teinte: "#8A4B14" },
      { nom: "Miel de bruyère", poids: "250 g", prix: 10, ingredients: "Miel de bruyère.", allergenes: [], origine: "France", teinte: "#A0521C" },
      { nom: "Miel de printemps", poids: "250 g", prix: 8.5, ingredients: "Miel de fleurs de printemps.", allergenes: [], origine: "France", teinte: "#D9A441" },
      { nom: "Pain d'épices au miel", poids: "400 g", prix: 11, ingredients: "Farine de *seigle*, miel (45 %), sucre de canne, *lait* entier, *œufs*, épices (cannelle, anis vert, gingembre), bicarbonate de sodium.", allergenes: ["gluten (seigle)", "lait", "œufs"], teinte: "#7A4A26" },
    ],
  },
  {
    slug: "joseph",
    numero: 7,
    prenom: "Joseph",
    feminin: false,
    metier: "arboriculteur",
    lieu: "dans la Drôme",
    chiffre: "4 hectares de vergers",
    resume: "4 hectares de vergers dans la Drôme · 3 confitures",
    travail: [
      "Joseph cueille à maturité et cuit le jour même, en petites bassines. Quand l'abricot manque, il n'y a pas de confiture d'abricot : on l'attend l'année suivante.",
      "Sur chaque pot, la quantité de fruits et de sucre pour cent grammes, comme l'exige l'étiquette d'une confiture.",
    ],
    signature: 1,
    oeuvres: [
      { nom: "Confiture d'abricot", poids: "320 g", prix: 6.8, ingredients: "Abricots, sucre de canne, jus de citron. Préparée avec 60 g de fruits pour 100 g. Teneur totale en sucres : 55 g pour 100 g.", allergenes: [], teinte: "#E08A2E" },
      { nom: "Gelée de coing", poids: "320 g", prix: 7.2, ingredients: "Jus de coing, sucre de canne, jus de citron. Préparée avec 50 g de fruits pour 100 g. Teneur totale en sucres : 60 g pour 100 g.", allergenes: [], teinte: "#C9762B" },
      { nom: "Confiture de figue", poids: "320 g", prix: 7.5, ingredients: "Figues, sucre de canne, jus de citron. Préparée avec 55 g de fruits pour 100 g. Teneur totale en sucres : 58 g pour 100 g.", allergenes: [], teinte: "#6E2F3A" },
    ],
  },
  {
    slug: "lina",
    numero: 21,
    prenom: "Lina",
    feminin: true,
    metier: "oléicultrice",
    lieu: "dans le Gard",
    chiffre: "600 oliviers",
    resume: "600 oliviers dans le Gard · 1 huile · 2 recettes",
    travail: [
      "Lina fait presser ses olives au moulin du village, dans les heures qui suivent la récolte. Une seule huile par an, et le millésime sur l'étiquette.",
      "Avec les olives de table, deux recettes : des olives vertes cassées, et une tapenade noire qui contient de l'anchois — c'est écrit en gras.",
    ],
    signature: 2,
    oeuvres: [
      { nom: "Huile d'olive vierge extra", poids: "50 cl", prix: 18, ingredients: "Huile d'olive de catégorie supérieure obtenue directement des olives et uniquement par des procédés mécaniques.", allergenes: [], origine: "France", teinte: "#5E6B2E" },
      { nom: "Olives vertes cassées au fenouil", poids: "200 g", prix: 6, ingredients: "Olives vertes, eau, sel, fenouil.", allergenes: [], teinte: "#7C8B3A" },
      { nom: "Tapenade noire", poids: "90 g", prix: 5.5, ingredients: "Olives noires (75 %), huile d'olive vierge extra, câpres, *anchois* (4 %), ail, thym.", allergenes: ["poisson (anchois)"], teinte: "#2C2A24" },
    ],
  },
  {
    slug: "anouk",
    numero: 3,
    prenom: "Anouk",
    feminin: true,
    metier: "biscuitière",
    lieu: "à Nantes",
    chiffre: "1 four, 3 recettes",
    resume: "1 four à Nantes · 3 biscuits",
    travail: [
      "Anouk cuit trois biscuits, pas un de plus, et les emballe le lendemain de la cuisson. Le beurre est demi-sel ; les amandes sont entières.",
      "Chaque sachet porte la date de cuisson à côté de sa signature.",
    ],
    signature: 3,
    oeuvres: [
      { nom: "Sablés au beurre demi-sel", poids: "150 g", prix: 5.5, ingredients: "Farine de *blé*, *beurre* demi-sel (28 %), sucre, *œufs*.", allergenes: ["gluten (blé)", "lait", "œufs"], teinte: "#D9A441" },
      { nom: "Croquants aux amandes", poids: "150 g", prix: 6, ingredients: "Sucre, farine de *blé*, *amandes* (25 %), blancs d'*œufs*.", allergenes: ["gluten (blé)", "fruits à coque (amandes)", "œufs"], teinte: "#B8864B" },
      { nom: "Biscuits au sésame", poids: "120 g", prix: 5, ingredients: "Farine de *blé*, graines de *sésame* (20 %), sucre, huile de tournesol, sel.", allergenes: ["gluten (blé)", "sésame"], teinte: "#C8A06A" },
    ],
  },
  {
    slug: "paul",
    numero: 18,
    prenom: "Paul",
    feminin: false,
    metier: "safranier",
    lieu: "dans le Lot",
    chiffre: "2 000 m² de crocus",
    resume: "2 000 m² de crocus dans le Lot · 2 pots",
    travail: [
      "Paul cueille ses fleurs à l'aube, en octobre, et émonde les pistils à la main le jour même. Trois pistils par fleur : il en faut des milliers pour un gramme.",
    ],
    signature: 1,
    oeuvres: [
      { nom: "Safran en pistils", poids: "0,5 g", prix: 14, ingredients: "Pistils de safran (Crocus sativus).", allergenes: [], origine: "France", teinte: "#B43A2E" },
      { nom: "Sel au safran", poids: "100 g", prix: 7, ingredients: "Sel de mer, safran (0,5 %).", allergenes: [], teinte: "#E08A2E" },
    ],
  },
  {
    slug: "mathilde",
    numero: 9,
    prenom: "Mathilde",
    feminin: true,
    metier: "chocolatière",
    lieu: "à Lyon",
    chiffre: "1 atelier",
    resume: "1 atelier à Lyon · 2 recettes",
    travail: [
      "Mathilde torréfie ses fèves dans son atelier et ne fait que deux choses : une tablette noire et une pâte à tartiner, sans huile ajoutée.",
    ],
    signature: 0,
    oeuvres: [
      { nom: "Chocolat noir 72 %", poids: "80 g", prix: 6.5, ingredients: "Fèves de cacao, sucre de canne, beurre de cacao. Cacao : 72 % minimum. Peut contenir des traces de *lait* et de *fruits à coque*.", allergenes: ["traces possibles : lait, fruits à coque"], teinte: "#3B2418" },
      { nom: "Pâte à tartiner noisette", poids: "200 g", prix: 9, ingredients: "*Noisettes* (45 %), sucre de canne, cacao maigre en poudre, *lait* entier en poudre.", allergenes: ["fruits à coque (noisettes)", "lait"], teinte: "#5C3A21" },
    ],
  },
];

export const auteurDe = (slug: string) => AUTEURS.find((a) => a.slug === slug);

export const euros = (n: number) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" }).replace(/\u202f/g, "\u00a0");

/** Pour chercher sans tenir compte des accents ni des majuscules. */
export const plat = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

// La prochaine séance de dédicace : un vrai samedi (14/11/2026, vérifié par calcul).
export const DEDICACE = {
  date: "Samedi 14 novembre",
  annee: "2026",
  heure: "10 h",
  programme: [
    { heure: "10 h – 12 h", slug: "helene", quoi: "signe ses pots de miel et son pain d'épices" },
    { heure: "14 h – 15 h 30", slug: "joseph", quoi: "signe ses confitures" },
    { heure: "15 h 30 – 17 h", slug: "anouk", quoi: "signe ses sachets de biscuits" },
  ],
};

export const QUESTIONS = [
  { q: "La signature est imprimée ou faite à la main ?", r: "Sur l'étiquette, elle est imprimée : c'est celle de l'auteur, reproduite. Le jour des dédicaces, l'auteur signe à la main le pot que tu achètes." },
  { q: "Qui est responsable de l'étiquette ?", r: "L'étiquette légale du pot — dénomination, ingrédients, allergènes, poids, origine — reste celle du producteur. La nôtre est une collerette : son nom en grand, sa signature, son numéro d'auteur." },
  { q: "Comment vous choisissez vos auteurs ?", r: "On va les voir. On goûte, on regarde comment ils travaillent, et on ne vend que ce qu'ils font eux-mêmes. Chaque auteur a accepté que son prénom et son métier soient publiés." },
  { q: "Je peux réserver des pots en ligne ?", r: "Oui : sur la page de chaque auteur, tu mets de côté ses pots et tu les retires en boutique. Les ingrédients et les allergènes sont affichés avant. Tu paies sur place." },
  { q: "Vous livrez ?", r: "Non. Les pots se retirent en boutique, du mardi au dimanche." },
];

export const photos = {
  miel: { src: "/exemples/autographe/miel.webp", largeur: 1200, hauteur: 800, alt: "Un pot de miel ambré posé sur une table en bois, dans la lumière du soir" },
  ruche: { src: "/exemples/autographe/ruche.webp", largeur: 1200, hauteur: 1798, alt: "Une apicultrice en tenue blanche tient un cadre de ruche couvert d'abeilles, à contre-jour" },
  pots: { src: "/exemples/autographe/pots.webp", largeur: 1400, hauteur: 933, alt: "Des pots de confiture sans étiquette alignés sur une table en bois" },
  plume: { src: "/exemples/autographe/plume.webp", largeur: 1400, hauteur: 933, alt: "Un stylo plume posé sur une feuille écrite à la main" },
};
