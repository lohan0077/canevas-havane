// Les données du site Autographe, épicerie fine imaginaire filmée dans les deux vidéos
// des épiceries fines : « Créer une marque » (l'épicerie vend des auteurs : chaque pot
// porte la signature de celui qui l'a fait, on cherche quelqu'un, pas un produit, et le
// lancement est une séance de dédicace) et « Remplir le carnet de commandes » (trois
// questions, le coffret composé, commandé le matin, prêt le soir, avec un mot pour les
// hôtes ; une dégustation d'huiles d'olive un samedi par mois, vingt places).
//
// Les deux idées se tiennent : chaque produit d'un coffret est le pot d'un auteur.
// Les auteurs, leurs fermes, leurs pots, les coffrets et les prix sont inventés, et
// marqués « exemple » à l'affichage. Aucune boisson alcoolique (loi Évin : CSP,
// art. L3323-4), ni dans les coffrets, ni dans le texte, ni parmi les auteurs.
//
// Chaque produit porte ses mentions de vente à distance — poids, ingrédients,
// allergènes entre *astérisques* (affichés en gras), origine quand elle est requise
// (règlement (UE) n° 1169/2011, art. 9, 14 et 21 ; miel : décret n° 2003-587 ;
// confitures : décret n° 85-872, fruits et sucres pour 100 g).

export const DOSSIER = "/exemples/autographe";

export const boutique = {
  nom: "Autographe",
  telephone: "01 99 00 31 58",
  adresse: "12 rue de l'Exemple",
  ville: "Saint-Exemple",
  horaires: [
    { jours: "Mardi – samedi", heures: "10 h – 19 h 30" },
    { jours: "Dimanche", heures: "9 h 30 – 13 h" },
    { jours: "Lundi", heures: "Fermé" },
  ],
  retrait: "18 h",
  limite: "12 h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/auteurs`, libelle: "Les auteurs" },
  { href: `${DOSSIER}/coffrets`, libelle: "Les coffrets" },
  { href: `${DOSSIER}/dedicaces`, libelle: "Dédicaces" },
  { href: `${DOSSIER}/degustations`, libelle: "Dégustations" },
];

export type Dessin = "bouteille" | "pot" | "sachet" | "tablette" | "boite";

export type Oeuvre = {
  nom: string;
  poids: string;
  prix: number;
  ingredients: string;
  allergenes: string[];
  origine?: string;
  teinte: string;
  dessin: Dessin;
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
      { nom: "Miel de châtaignier", poids: "250 g", prix: 9.5, ingredients: "Miel de châtaignier.", allergenes: [], origine: "France", teinte: "#8A4B14", dessin: "pot" },
      { nom: "Miel de bruyère", poids: "250 g", prix: 10, ingredients: "Miel de bruyère.", allergenes: [], origine: "France", teinte: "#A0521C", dessin: "pot" },
      { nom: "Miel de printemps", poids: "250 g", prix: 8.5, ingredients: "Miel de fleurs de printemps.", allergenes: [], origine: "France", teinte: "#D9A441", dessin: "pot" },
      { nom: "Pain d'épices au miel", poids: "400 g", prix: 11, ingredients: "Farine de *seigle*, miel (45 %), sucre de canne, *lait* entier, *œufs*, épices (cannelle, anis vert, gingembre), bicarbonate de sodium.", allergenes: ["gluten (seigle)", "lait", "œufs"], teinte: "#7A4A26", dessin: "tablette" },
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
      { nom: "Confiture d'abricot", poids: "320 g", prix: 6.8, ingredients: "Abricots, sucre de canne, jus de citron. Préparée avec 60 g de fruits pour 100 g. Teneur totale en sucres : 55 g pour 100 g.", allergenes: [], teinte: "#E08A2E", dessin: "pot" },
      { nom: "Gelée de coing", poids: "320 g", prix: 7.2, ingredients: "Jus de coing, sucre de canne, jus de citron. Préparée avec 50 g de fruits pour 100 g. Teneur totale en sucres : 60 g pour 100 g.", allergenes: [], teinte: "#C9762B", dessin: "pot" },
      { nom: "Confiture de figue", poids: "320 g", prix: 7.5, ingredients: "Figues, sucre de canne, jus de citron. Préparée avec 55 g de fruits pour 100 g. Teneur totale en sucres : 58 g pour 100 g.", allergenes: [], teinte: "#6E2F3A", dessin: "pot" },
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
    resume: "600 oliviers dans le Gard · 3 huiles · 2 recettes",
    travail: [
      "Lina fait presser chaque variété à part, au moulin du village, dans les heures qui suivent la récolte : la picholine, la lucques, la négrette. Trois arbres, trois huiles, et le millésime sur l'étiquette.",
      "Avec les olives de table, deux recettes : des olives vertes cassées, et une tapenade noire qui contient de l'anchois — c'est écrit en gras.",
      "Un samedi par mois, ses trois huiles se goûtent à la boutique, à l'aveugle, autour de la grande table : vingt places.",
    ],
    signature: 2,
    oeuvres: [
      { nom: "Huile d'olive vierge extra · picholine", poids: "50 cl", prix: 18, ingredients: "Huile d'olive de catégorie supérieure obtenue directement des olives et uniquement par des procédés mécaniques.", allergenes: [], origine: "France", teinte: "#5E6B2E", dessin: "bouteille" },
      { nom: "Huile d'olive vierge extra · lucques", poids: "50 cl", prix: 19, ingredients: "Huile d'olive de catégorie supérieure obtenue directement des olives et uniquement par des procédés mécaniques.", allergenes: [], origine: "France", teinte: "#7C8B3A", dessin: "bouteille" },
      { nom: "Huile d'olive vierge extra · négrette", poids: "50 cl", prix: 19, ingredients: "Huile d'olive de catégorie supérieure obtenue directement des olives et uniquement par des procédés mécaniques.", allergenes: [], origine: "France", teinte: "#45501F", dessin: "bouteille" },
      { nom: "Olives vertes cassées au fenouil", poids: "200 g", prix: 6, ingredients: "Olives vertes, eau, sel, fenouil.", allergenes: [], teinte: "#8E9C48", dessin: "pot" },
      { nom: "Tapenade noire", poids: "90 g", prix: 5.5, ingredients: "Olives noires (75 %), huile d'olive vierge extra, câpres, *anchois* (4 %), ail, thym.", allergenes: ["poisson (anchois)"], teinte: "#2C2A24", dessin: "pot" },
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
      { nom: "Sablés au beurre demi-sel", poids: "150 g", prix: 5.5, ingredients: "Farine de *blé*, *beurre* demi-sel (28 %), sucre, *œufs*.", allergenes: ["gluten (blé)", "lait", "œufs"], teinte: "#D9A441", dessin: "sachet" },
      { nom: "Croquants aux amandes", poids: "150 g", prix: 6, ingredients: "Sucre, farine de *blé*, *amandes* (25 %), blancs d'*œufs*.", allergenes: ["gluten (blé)", "fruits à coque (amandes)", "œufs"], teinte: "#B8864B", dessin: "sachet" },
      { nom: "Biscuits au sésame", poids: "120 g", prix: 5, ingredients: "Farine de *blé*, graines de *sésame* (20 %), sucre, huile de tournesol, sel.", allergenes: ["gluten (blé)", "sésame"], teinte: "#C8A06A", dessin: "sachet" },
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
      { nom: "Safran en pistils", poids: "0,5 g", prix: 14, ingredients: "Pistils de safran (Crocus sativus).", allergenes: [], origine: "France", teinte: "#B43A2E", dessin: "boite" },
      { nom: "Sel au safran", poids: "100 g", prix: 7, ingredients: "Sel de mer, safran (0,5 %).", allergenes: [], teinte: "#E08A2E", dessin: "boite" },
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
      { nom: "Chocolat noir 72 %", poids: "80 g", prix: 6.5, ingredients: "Fèves de cacao, sucre de canne, beurre de cacao. Cacao : 72 % minimum. Peut contenir des traces de *lait* et de *fruits à coque*.", allergenes: ["traces possibles : lait, fruits à coque"], teinte: "#3B2418", dessin: "tablette" },
      { nom: "Pâte à tartiner noisette", poids: "200 g", prix: 9, ingredients: "*Noisettes* (45 %), sucre de canne, cacao maigre en poudre, *lait* entier en poudre.", allergenes: ["fruits à coque (noisettes)", "lait"], teinte: "#5C3A21", dessin: "pot" },
    ],
  },
];

export const auteurDe = (slug: string) => AUTEURS.find((a) => a.slug === slug);

/** « 9,50 € » : écrit à la main, l'espace avant € variant d'un navigateur à l'autre. */
export const euros = (n: number) => `${n.toFixed(2).replace(".", ",")} €`;

/** Pour chercher sans tenir compte des accents ni des majuscules. */
export const plat = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/* ---------- Les coffrets « On apporte quoi ? » ----------
   Chaque produit d'un coffret est le pot d'un auteur : on retrouve sa page, sa
   signature, ses ingrédients. Le prix du coffret est le budget choisi : il comprend
   les pots, la boîte, la ficelle et la carte écrite à la main. */
export const PRODUITS = {
  huile: { auteur: "lina", oeuvre: 0 },
  mielChataignier: { auteur: "helene", oeuvre: 0 },
  mielBruyere: { auteur: "helene", oeuvre: 1 },
  mielPrintemps: { auteur: "helene", oeuvre: 2 },
  painEpices: { auteur: "helene", oeuvre: 3 },
  abricot: { auteur: "joseph", oeuvre: 0 },
  coing: { auteur: "joseph", oeuvre: 1 },
  figue: { auteur: "joseph", oeuvre: 2 },
  olives: { auteur: "lina", oeuvre: 3 },
  tapenade: { auteur: "lina", oeuvre: 4 },
  sables: { auteur: "anouk", oeuvre: 0 },
  croquants: { auteur: "anouk", oeuvre: 1 },
  sesame: { auteur: "anouk", oeuvre: 2 },
  safran: { auteur: "paul", oeuvre: 0 },
  chocolat: { auteur: "mathilde", oeuvre: 0 },
  tartiner: { auteur: "mathilde", oeuvre: 1 },
} as const;

export type CleProduit = keyof typeof PRODUITS;

/** Le pot et son auteur, pour une clé de coffret. */
export const produit = (cle: CleProduit) => {
  const ref = PRODUITS[cle];
  const auteur = auteurDe(ref.auteur)!;
  return { auteur, oeuvre: auteur.oeuvres[ref.oeuvre] };
};

/** Le nom court d'un produit dans un coffret : « Huile d'olive vierge extra ». */
export const nomCourt = (cle: CleProduit) => produit(cle).oeuvre.nom.split(" · ")[0];

export type Gout = "sucre" | "sale" | "lesDeux";
export type Budget = 20 | 35 | 50;

export const QUESTIONS_COFFRET = {
  combien: { question: "Vous serez combien ?", options: [{ v: 4, libelle: "4" }, { v: 6, libelle: "6" }, { v: 8, libelle: "8 et plus" }] },
  gout: { question: "Ils aiment quoi ?", options: [{ v: "sucre", libelle: "Sucré" }, { v: "sale", libelle: "Salé" }, { v: "lesDeux", libelle: "Les deux" }] },
  budget: { question: "Ton budget ?", options: [{ v: 20, libelle: "20 €" }, { v: 35, libelle: "35 €" }, { v: 50, libelle: "50 €" }] },
} as const;

/** Le coffret composé pour un goût et un budget. Le prix est le budget choisi. */
export const COMPOSITIONS: Record<Gout, Record<Budget, { nom: string; contenu: CleProduit[] }>> = {
  sucre: {
    20: { nom: "Le petit sucré", contenu: ["figue", "sables", "chocolat"] },
    35: { nom: "Le goûter des hôtes", contenu: ["mielBruyere", "painEpices", "figue", "chocolat"] },
    50: { nom: "La grande table sucrée", contenu: ["mielChataignier", "painEpices", "coing", "croquants", "tartiner"] },
  },
  sale: {
    20: { nom: "Le petit salé", contenu: ["olives", "tapenade", "sesame"] },
    35: { nom: "L'avant-dîner", contenu: ["huile", "olives", "tapenade", "sesame"] },
    50: { nom: "La grande table salée", contenu: ["huile", "safran", "olives", "tapenade", "sesame"] },
  },
  lesDeux: {
    20: { nom: "Le petit invité", contenu: ["olives", "sables", "mielPrintemps"] },
    35: { nom: "Le coffret invité", contenu: ["huile", "mielChataignier", "sables"] },
    50: { nom: "Le grand coffret invité", contenu: ["huile", "mielChataignier", "sables", "tapenade", "chocolat"] },
  },
};

/** Pour huit personnes et plus, on double les sachets de biscuits ; le coffret garde son prix. */
export const formatPour = (cle: CleProduit, convives: number) => {
  const { oeuvre } = produit(cle);
  return convives >= 8 && oeuvre.dessin === "sachet" ? `2 × ${oeuvre.poids} · format partage` : oeuvre.poids;
};

/** Les auteurs d'un coffret, chacun une fois. */
export const auteursDu = (contenu: readonly CleProduit[]) => [...new Set(contenu.map((c) => produit(c).auteur))];

export const allergenesDe = (contenu: readonly CleProduit[]) => [...new Set(contenu.flatMap((c) => produit(c).oeuvre.allergenes))];

/** Les coffrets de la page « Coffrets » : les neuf compositions, rangées par goût. */
export const RAYONS: { gout: Gout; titre: string; phrase: string }[] = [
  { gout: "lesDeux", titre: "Un peu de tout", phrase: "Pour une table où l'on ne sait pas encore ce qui sera servi." },
  { gout: "sucre", titre: "Plutôt sucré", phrase: "Pour le café, le dessert, ou le petit-déjeuner du lendemain." },
  { gout: "sale", titre: "Plutôt salé", phrase: "Pour ouvrir le repas, avant de passer à table." },
];

/* ---------- Les samedis ---------- */

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

// Les dégustations d'huiles d'olive : un samedi par mois, vingt places — le nombre de
// chaises de la grande table. Vrais samedis (vérifiés par calcul) ; la séance
// complète est un exemple, et la page le dit.
export const DEGUSTATIONS = [
  { libelle: "7 nov.", sous: "samedi", pris: true },
  { libelle: "5 déc.", sous: "samedi" },
  { libelle: "9 janv.", sous: "samedi" },
  { libelle: "6 févr.", sous: "samedi" },
  { libelle: "6 mars", sous: "samedi" },
  { libelle: "3 avril", sous: "samedi" },
];

/* ---------- Vos questions ---------- */
export const QUESTIONS = [
  {
    q: "Jusqu'à quelle heure je peux commander un coffret ?",
    r: "Commandé avant 12 h, il est prêt à 18 h le jour même, du mardi au samedi. Après midi, il est prêt le lendemain à 18 h. Le dimanche, la boutique ferme à 13 h ; le lundi, elle est fermée.",
  },
  {
    q: "Je peux voir ce qu'il y a dans le coffret avant de commander ?",
    r: "Oui, et c'est fait pour : chaque pot affiche son auteur, son poids, ses ingrédients et ses allergènes avant le bouton « Commander ». Les allergènes sont écrits en gras.",
  },
  {
    q: "Un invité est allergique. Comment je fais ?",
    r: "Regarde la liste des allergènes du coffret proposé, puis appelle-nous : on remplace un pot par un autre du même prix. Les sablés d'Anouk, par exemple, contiennent du blé, du beurre et des œufs ; la tapenade de Lina, de l'anchois.",
  },
  {
    q: "La signature est imprimée ou faite à la main ?",
    r: "Sur l'étiquette, elle est imprimée : c'est celle de l'auteur, reproduite. Le jour des dédicaces, l'auteur signe à la main le pot que tu achètes.",
  },
  {
    q: "Qui est responsable de l'étiquette ?",
    r: "L'étiquette légale du pot — dénomination, ingrédients, allergènes, poids, origine — reste celle du producteur. La nôtre est une collerette : son nom en grand, sa signature, son numéro d'auteur.",
  },
  {
    q: "Le petit mot, c'est vous qui l'écrivez ?",
    r: "Tu tapes la phrase, on la recopie à la main sur une carte glissée sous la ficelle. Cent quarante signes au plus : une carte, pas une lettre.",
  },
  {
    q: "Je paie comment ? Vous livrez ?",
    r: "Tu paies en boutique, au retrait : rien n'est payé en ligne. Et on ne livre pas : c'est ce qui permet de composer le coffret le matin et de te le remettre le soir.",
  },
  {
    q: "Comment vous choisissez vos auteurs ?",
    r: "On va les voir. On goûte, on regarde comment ils travaillent, et on ne vend que ce qu'ils font eux-mêmes. Chaque auteur a accepté que son prénom et son métier soient publiés.",
  },
];

/* ---------- Les photos ----------
   Unsplash (licence Unsplash), servies depuis notre domaine ; crédits dans les
   mentions légales. Aucun visage, aucune marque lisible. */
export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const P = DOSSIER;
export const photos = {
  miel: { src: `${P}/miel.webp`, largeur: 1200, hauteur: 800, alt: "Un pot de miel ambré posé sur une table en bois, dans la lumière du soir" },
  ruche: { src: `${P}/ruche.webp`, largeur: 1200, hauteur: 1798, alt: "Une apicultrice en tenue blanche tient un cadre de ruche couvert d'abeilles, à contre-jour" },
  pots: { src: `${P}/pots.webp`, largeur: 1400, hauteur: 933, alt: "Des pots de confiture sans étiquette alignés sur une table en bois" },
  plume: { src: `${P}/plume.webp`, largeur: 1400, hauteur: 933, alt: "Un stylo plume posé sur une feuille écrite à la main" },
  huile: { src: `${P}/huile-olives.webp`, largeur: 1400, hauteur: 933, alt: "Un filet d'huile d'olive versé dans une coupelle, à côté d'olives vertes et d'une tranche de pain" },
  mielCuillere: { src: `${P}/miel-cuillere.webp`, largeur: 1200, hauteur: 1800, alt: "Un pot de miel noué d'une ficelle, une cuillère en bois qui goutte au-dessus" },
  sables: { src: `${P}/sables.webp`, largeur: 1200, hauteur: 1800, alt: "Une pile de sablés au beurre saupoudrés de sucre, sur une assiette" },
  coffret: { src: `${P}/coffret.webp`, largeur: 1400, hauteur: 2006, alt: "Une boîte en carton kraft fermée d'une ficelle blanche et d'une branche de verdure" },
} satisfies Record<string, Photo>;
