// Tout ce qu'affiche Trois Marches, agence immobilière fictive filmée dans les deux vidéos
// des agents immobiliers :
//   - « Créer une marque » : le nom, chaque annonce qui commence par l'histoire de la
//     maison, la loi juste en dessous, la dernière photo de famille sur le perron ;
//   - « Remplir l'agenda » (ancien site Le Soir Même, fondu ici) : le barème en page
//     d'accueil (on glisse son prix, le site dit ce que l'agence prend au maximum), le prix
//     honoraires inclus en plus gros sur chaque annonce, la page du vendeur où le compte
//     rendu de chaque visite tombe le soir même, et un seul bouton sur l'accueil : faire
//     estimer sa maison, au créneau choisi.
//
// L'idée : chaque annonce commence par l'histoire de la maison, racontée par ceux qui
// y ont vécu — des souvenirs seulement, jamais une affirmation sur l'état du bien. Et
// juste en dessous, ce que la loi impose (voir SOURCES.md de la vidéo) :
//   - arrêté du 10 janvier 2017 : prix honoraires inclus en caractères plus grands que
//     le prix hors honoraires, qui paie, honoraires en % TTC précédés de « Honoraires : »
//     (art. 3) ; barème des prix maximums TTC, qui paie, tranches, accessible depuis
//     chaque annonce (art. 2) ; loi n° 70-9, art. 6-1 ;
//   - CCH, art. L126-33 : classes énergie et climat et dépenses théoriques (présentation
//     de la fiche Service-Public F16096) ;
//   - décret n° 72-678, art. 92 à 94 : carte « Transactions sur immeubles et fonds de
//     commerce », numéro et lieu de délivrance, nom et adresse du garant.
// L'adresse d'une annonce ne nomme pas la rue : à côté du prénom du vendeur, elle
// localiserait le logement d'une personne nommée. Les prénoms sont des exemples.

export const DOSSIER = "/exemples/trois-marches";

export const agence = {
  nom: "Trois Marches",
  adresse: "8 rue de l'Exemple, 69000 Lyon",
  telephone: "01 99 00 31 08",
  carte: "CPI 0000 0000 0000 0000",
  cci: "CCI de Lyon",
  garant: "Garant d'exemple, 2 quai de l'Exemple, 69000 Lyon",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#maisons`, libelle: "Les maisons" },
  { href: `${DOSSIER}/bareme`, libelle: "Le barème" },
  { href: `${DOSSIER}/suivi`, libelle: "Le suivi du soir" },
  { href: `${DOSSIER}/la-derniere-photo`, libelle: "La dernière photo" },
];

export const euros = (n: number) => `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;
export const pourcent = (n: number) => `${n.toString().replace(".", ",")} %`;

/* ---------- Le barème (exemple) ---------- */

export const BAREME_DATE = "17 octobre 2026";

export const TRANCHES = [
  { jusqua: 150_000, libelle: "Prix jusqu'à 150 000 €", taux: 7 },
  { jusqua: 350_000, libelle: "De 150 001 à 350 000 €", taux: 5 },
  { jusqua: Infinity, libelle: "Au-delà de 350 000 €", taux: 4 },
];

/** Le taux maximum du barème pour un prix de vente hors honoraires. */
export const tauxMax = (prix: number) => (TRANCHES.find((t) => prix <= t.jusqua) ?? TRANCHES[TRANCHES.length - 1]).taux;
/** Les honoraires maximum, TTC, pour un prix de vente hors honoraires : le taux de sa tranche. */
export const honorairesMax = (prix: number) => (prix * tauxMax(prix)) / 100;
export const PAYEUR = "à la charge de l'acquéreur";

export const AUTRES_PRESTATIONS = [
  { prestation: "Vente d'un terrain à bâtir", prix: "6 % TTC du prix hors honoraires, au maximum", payeur: "Acquéreur" },
  { prestation: "Avis de valeur écrit, sans mandat", prix: "0 €", payeur: "Personne" },
  { prestation: "La dernière photo, sur le perron, tirée sur papier", prix: "0 €, comprise dans nos honoraires", payeur: "Personne" },
];

/* ---------- Les photos ---------- */

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const photo = (fichier: string, largeur: number, hauteur: number, alt: string): Photo => ({
  src: `${DOSSIER}/${fichier}.webp`, largeur, hauteur, alt,
});
export const photos = {
  perron: photo("perron-porte-verte", 900, 1201, "Une porte double vert sauge au haut de quelques marches blanches, deux grands pots de part et d'autre"),
  escalier: photo("maison-escalier-pierre", 900, 1350, "Une maison blanche aux volets verts, un escalier de pierre qui monte jusqu'à la porte, une lanterne au mur"),
  mas: photo("mas-volets-rouges", 900, 1350, "Un mas de pierre aux volets rouges, une grande voûte au rez-de-chaussée, dans la lumière du soir"),
  pierre: photo("maison-pierre-fleurs", 1100, 768, "Une maison de pierre aux volets bleus, sa façade couverte de pots de fleurs, au soleil"),
  velo: photo("velo-lierre", 1100, 766, "Un vélo vert appuyé contre un mur blanc où grimpe de la vigne vierge"),
  crepuscule: photo("maison-au-crepuscule", 1300, 1146, "Une maison blanche au pied d'une montagne, ses fenêtres allumées, à la tombée du soir"),
  voletsRouges: photo("maison-volets-rouges", 860, 1290, "Une maison de pierre blanche aux volets rouges, au fond d'une grande pelouse, un arbre en fleurs au premier plan"),
  salon: photo("salon-blanc", 1200, 800, "Un salon blanc et lumineux, une cheminée de marbre entre deux hautes fenêtres"),
  lampe: photo("lampe-du-soir", 1100, 733, "Un canapé dans la lumière chaude d'un lampadaire, le soir"),
  creme: photo("maison-creme", 1000, 666, "Une maison crème au toit d'ardoise, trois lucarnes et une porte noire"),
  arbres: photo("maison-arbres", 1000, 667, "Une grande maison blanche à cheminées, derrière un jardin planté d'arbres"),
};

/* ---------- Les maisons (exemples) ---------- */

export type Classe = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export type Maison = {
  slug: string;
  titre: string;
  surface: number;
  terrain: string;
  secteur: string;
  horsHonoraires: number;
  taux: number;
  energie: Classe;
  climat: Classe;
  depenses: [number, number];
  photo: Photo;
  histoire: { citation: string; auteur: string; annees: string; souvenirs: string[] };
  description: string[];
};

export const MAISONS: Maison[] = [
  {
    slug: "maison-5-pieces",
    titre: "Maison 5 pièces",
    surface: 120,
    terrain: "600 m² de jardin",
    secteur: "Quartier calme, à l'ouest de la ville",
    horsHonoraires: 300_000,
    taux: 4,
    energie: "D",
    climat: "D",
    depenses: [1500, 2100],
    photo: photos.escalier,
    histoire: {
      citation: "Ici, nos trois enfants ont appris le vélo, dans l'allée.",
      auteur: "Claire, qui vend la maison",
      annees: "2009 – 2026",
      souvenirs: [
        "Le figuier du fond, on l'a planté l'année de notre arrivée. Il donne maintenant plus qu'on ne peut en manger.",
        "Toutes les photos de rentrée ont été prises sur les marches, devant la porte. Dix-sept rentrées.",
        "Le soir, la lanterne s'allume toute seule. On a fini par l'appeler « la veilleuse ».",
      ],
    },
    description: [
      "Au rez-de-chaussée surélevé, une entrée, un séjour de 36 m² ouvert sur le jardin, une cuisine séparée et un bureau. À l'étage, trois chambres et une salle de bains. La cuisine est d'origine : elle est à refaire, et l'annonce le dit.",
      "Un sous-sol complet avec garage et buanderie. Chauffage au gaz, fenêtres en double vitrage. 600 m² de jardin clos.",
    ],
  },
  {
    slug: "maison-4-pieces",
    titre: "Maison 4 pièces",
    surface: 90,
    terrain: "350\u00A0m² de terrain",
    secteur: "Au bord du vieux bourg, à pied de l'école",
    horsHonoraires: 215_000,
    taux: 4.5,
    energie: "C",
    climat: "C",
    depenses: [1100, 1600],
    photo: photos.pierre,
    histoire: {
      citation: "Chaque printemps, les pots sortent tous le même jour : c'est comme ça qu'on sait que l'hiver est fini.",
      auteur: "Hélène et Paul, qui vendent la maison",
      annees: "1998 – 2026",
      souvenirs: [
        "La table de la cuisine a vu passer vingt-huit Noëls.",
        "Les volets bleus viennent de la maison d'à côté, démolie en 2003. On les a gardés.",
      ],
    },
    description: [
      "Une maison de pierre de plain-pied : séjour avec poêle, cuisine équipée, deux chambres, une salle d'eau et un cellier.",
      "Isolation des combles refaite, pompe à chaleur. Une cour fleurie devant, un jardin derrière.",
    ],
  },
  {
    slug: "maison-6-pieces",
    titre: "Maison 6 pièces",
    surface: 160,
    terrain: "1\u00A0100\u00A0m² de terrain",
    secteur: "Dans un hameau, à dix minutes de la ville",
    horsHonoraires: 395_000,
    taux: 4,
    energie: "E",
    climat: "D",
    depenses: [2400, 3300],
    photo: photos.mas,
    histoire: {
      citation: "Le dimanche matin, le soleil entre sous la voûte avant tout le reste.",
      auteur: "Marc, qui vend la maison",
      annees: "2014 – 2026",
      souvenirs: [
        "Les volets, on les a repeints en rouge le premier été. Les voisins ont mis deux ans à s'y faire.",
        "Sous la voûte, c'est là qu'on prend le café quand il fait beau. Et quand il pleut aussi.",
      ],
    },
    description: [
      "Un mas de pierre sur deux niveaux : grande cuisine, double séjour sous la voûte, quatre chambres, deux salles d'eau.",
      "Chaudière au fioul et murs anciens : la classe énergie est E, et l'annonce l'écrit. 1 100 m² de terrain et une grange.",
    ],
  },
];

export const prixHonorairesInclus = (m: Maison) => m.horsHonoraires * (1 + m.taux / 100);

/* ---------- La dernière photo ---------- */

export const MOMENTS_PHOTO = [
  { id: "dimanche", libelle: "Un dimanche, avant l'acte", detail: "La maison encore meublée" },
  { id: "veille", libelle: "La veille de l'acte", detail: "Les cartons sur le perron" },
  { id: "matin", libelle: "Le matin des clés", detail: "La maison vide, la porte ouverte" },
];

/* ---------- Le suivi du soir : la page du vendeur (exemple) ----------
   Claire vend la maison 5 pièces. Chaque visite a son compte rendu, envoyé le soir même ;
   les visiteurs ne sont jamais nommés. */

export type Visite = { jour: string; date: string; heure: string; envoi: string; phrase: string; plu: string; freine: string; suite: string };

export const VISITES: Visite[] = [
  {
    jour: "Mardi",
    date: "13 octobre",
    heure: "18\u00A0h",
    envoi: "19\u00A0h\u00A040",
    phrase: "«\u00A0La cuisine est à refaire.\u00A0»",
    plu: "La lumière du séjour, le jardin, le calme de la rue.",
    freine: "La cuisine d'origine : ils la referaient entièrement.",
    suite: "Pas de deuxième visite pour l'instant. Ils comparent avec une maison plus récente.",
  },
  {
    jour: "Jeudi",
    date: "15 octobre",
    heure: "17\u00A0h\u00A030",
    envoi: "19\u00A0h\u00A005",
    phrase: "«\u00A0Coup de cœur pour le jardin.\u00A0»",
    plu: "Le jardin, le figuier, le sous-sol pour l'atelier.",
    freine: "Le bureau, un peu petit pour deux.",
    suite: "Ils reviennent samedi pour revoir l'étage.",
  },
  {
    jour: "Samedi",
    date: "17 octobre",
    heure: "16\u00A0h",
    envoi: "19\u00A0h\u00A030",
    phrase: "Une deuxième visite demandée.",
    plu: "Les mêmes que jeudi : l'étage les a rassurés.",
    freine: "Le prix de la cuisine, encore. Ils demandent le diagnostic de performance énergétique complet.",
    suite: "Le diagnostic leur est envoyé ce soir. Une offre est possible la semaine prochaine : on t'appelle dès qu'elle arrive.",
  },
];

/* ---------- L'estimation : les créneaux (exemple) ---------- */

export const JOURS_ESTIMATION = [
  { id: "jeudi", libelle: "Jeudi", date: "22 octobre", heures: [{ h: "9\u00A0h", pris: true }, { h: "14\u00A0h", pris: false }, { h: "17\u00A0h\u00A030", pris: true }] },
  { id: "vendredi", libelle: "Vendredi", date: "23 octobre", heures: [{ h: "9\u00A0h", pris: false }, { h: "11\u00A0h", pris: true }, { h: "16\u00A0h", pris: false }] },
  { id: "samedi", libelle: "Samedi", date: "24 octobre", heures: [{ h: "9\u00A0h", pris: true }, { h: "10\u00A0h", pris: false }, { h: "11\u00A0h\u00A030", pris: false }] },
];

/* ---------- Questions ---------- */

export const QUESTIONS = [
  {
    q: "Faut-il raconter l'histoire de sa maison\u00A0?",
    r: "Non. C'est proposé, jamais imposé. Si vous racontez, ce sont vos mots, relus et signés par vous avant la mise en ligne, avec votre prénom seulement. Et ce ne sont que des souvenirs : rien sur l'état de la maison, qui relève des diagnostics et de nous.",
  },
  {
    q: "La photo est vraiment offerte\u00A0?",
    r: "Oui, à chaque vente, sans surcoût : elle est comprise dans nos honoraires et inscrite au barème à 0 €. Une séance sur le perron, une photo tirée sur papier. Seulement si toute la famille est d'accord, par écrit.",
  },
  {
    q: "Et les enfants sur la photo\u00A0?",
    r: "La photo est pour vous, pas pour nous : elle n'est jamais publiée. Pour photographier des enfants, nous demandons l'accord écrit de leurs deux parents.",
  },
  {
    q: "Pourquoi l'adresse n'est-elle pas sur l'annonce\u00A0?",
    r: "Parce que l'annonce porte le prénom de ceux qui vendent. Avec l'adresse, elle dirait à tout le monde où ils vivent, et quand la maison sera vide. On la donne à ceux qui visitent.",
  },
  {
    q: "Combien prenez-vous, exactement\u00A0?",
    r: "Au plus ce que dit le barème : 7 %, 5 % ou 4 % TTC du prix hors honoraires, selon la tranche. Le montant exact est écrit dans le mandat, avant la première visite, et il ne peut pas dépasser le barème.",
  },
  {
    q: "Pourquoi les agences ne répondent pas\u00A0?",
    r: "Souvent parce qu'il n'y a rien de neuf, et qu'on n'ose pas le dire. Chez nous, chaque visite donne un compte rendu écrit, sur la page du vendeur, le soir même, même quand il n'y a rien à espérer.",
  },
  {
    q: "Les visiteurs sont-ils nommés dans le compte rendu\u00A0?",
    r: "Jamais. Le compte rendu dit ce qui a plu, ce qui freine et la suite : ni nom, ni situation personnelle. Les visiteurs savent qu'un compte rendu anonyme est fait.",
  },
  {
    q: "L'estimation est payante\u00A0?",
    r: "Non : l'avis de valeur écrit est à 0 €, et il est dans le barème comme le reste. Il ne vous engage à rien, et il dit sur quoi repose le prix : les ventes comparables, l'état, ce qui est à refaire.",
  },
  {
    q: "Qui paie vos honoraires\u00A0?",
    r: "L'acquéreur, comme le dit le barème. L'annonce affiche le prix honoraires inclus en plus gros, le prix hors honoraires et nos honoraires en pourcentage.",
  },
];
