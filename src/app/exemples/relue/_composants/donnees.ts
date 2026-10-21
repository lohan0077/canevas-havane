// Les données du site Relue, marque de papeterie imaginée dans la vidéo « Si je
// devais créer une marque de papeterie ». On ne vend pas du papier : on vend la lettre
// qu'on garde quarante ans.
//
// Règles tenues (voir SOURCES.md de la vidéo) :
// - la lettre de la semaine n'est lue qu'avec l'accord de celui qui l'a écrite : seul
//   l'auteur décide de divulguer son texte (CPI, art. L121-2) — et pas celui qui l'a
//   reçue ; la lettre montrée (Robert, Brest, 1984) est inventée ;
// - « postée dans un an, jour pour jour » : la date de dépôt, pas une date de
//   distribution, que la marque ne maîtrise pas ;
// - les lettres restent cachetées ; l'adresse ne sert qu'à poster la lettre (RGPD) ;
// - prix TTC, marqués « exemple » (arrêté du 3 décembre 1987, art. 1).

export const DOSSIER = "/exemples/relue";

export const NAVIGATION = [
  { href: `${DOSSIER}/dans-un-an`, libelle: "Ta lettre dans un an" },
  { href: `${DOSSIER}/lettre-de-la-semaine`, libelle: "La lettre de la semaine" },
  { href: `${DOSSIER}#papeterie`, libelle: "La papeterie" },
];

export const maison = {
  telephone: "01 99 00 61 84",
  adresse: "12 rue de l'Exemple, Ta Ville",
  prixService: 4.9,
};

export const photos = {
  plume: { src: "/exemples/relue/porte-plume.webp", largeur: 1400, hauteur: 945, alt: "Un porte-plume posé sur une lettre manuscrite, à côté de fleurs séchées" },
  lettres: { src: "/exemples/relue/lettres.webp", largeur: 1100, hauteur: 733, alt: "De vieilles lettres manuscrites, pliées, sur une table en bois" },
  cachet: { src: "/exemples/relue/cachet.webp", largeur: 1100, hauteur: 1650, alt: "Une main scelle une enveloppe blanche avec un cachet de cire" },
  enveloppe: { src: "/exemples/relue/enveloppe.webp", largeur: 1100, hauteur: 733, alt: "Des mains écrivent sur une enveloppe, sur une table en bois" },
};

/** La lettre n° 12, inventée pour l'exemple. */
export const LETTRE = {
  numero: 12,
  lignes: [
    "Ma Jeanne,",
    "Il a plu toute la journée sur le port,",
    "et je n'ai pensé qu'à toi.",
    "Les bateaux sont rentrés tôt\u00A0; moi aussi.",
    "J'ai acheté le papier bleu que tu aimes",
    "pour t'écrire celle-ci.",
    "Garde cette lettre\u00A0: je te la relirai.",
  ],
  signature: "Robert",
  lieu: "Brest, 12 mai 1984",
  duree: 9, // secondes de lecture (démonstration)
};

export const PRODUITS = [
  { nom: "Papier vergé, 20 feuilles A5", detail: "Crème, 120 g, qui ne jaunit pas vite", prix: 12 },
  { nom: "Enveloppes doublées, par 10", detail: "Bleu nuit, doublure kraft", prix: 9.5 },
  { nom: "Bâton de cire, rouge cachet", detail: "Pour une dizaine de lettres", prix: 6 },
  { nom: "La boîte à garder", detail: "Carton épais, pour quarante ans de lettres", prix: 18 },
];

export const CONSEILS = [
  { titre: "La date et le lieu, en haut", texte: "Dans quarante ans, c'est la première chose qu'on cherche. «\u00A0Brest, 12 mai 1984\u00A0» vaut une photo." },
  { titre: "Une chose vraie", texte: "Pas un bilan. Une chose de la journée\u00A0: la pluie sur le port, le café trop chaud, ce qu'on n'a pas osé dire." },
  { titre: "À la main", texte: "L'écriture vieillit avec la lettre. Elle dit qui écrivait, et comment il allait ce jour-là." },
  { titre: "Une signature", texte: "Un prénom suffit. Celui qui relira saura." },
];

export const FAQ = [
  { q: "Qui lit ma lettre à moi-même\u00A0?", r: "Personne. Tu l'écris, on l'imprime sur notre papier, on la cachette, et elle reste fermée jusqu'au jour où on la poste." },
  { q: "«\u00A0Jour pour jour\u00A0», c'est la date d'arrivée\u00A0?", r: "Non\u00A0: c'est la date où on la dépose à la poste, un an après. On ne maîtrise pas le jour de distribution, alors on ne le promet pas." },
  { q: "Que devient mon adresse\u00A0?", r: "Elle sert à une seule chose\u00A0: te poster ta lettre. Une fois la lettre partie, elle est effacée." },
  { q: "Comment une lettre devient «\u00A0la lettre de la semaine\u00A0»\u00A0?", r: "Seulement si celui qui l'a écrite est d'accord — ou ses héritiers, s'il n'est plus là. L'avoir reçue ne suffit pas\u00A0: le papier t'appartient, le texte reste à son auteur." },
  { q: "Les prix sont-ils TTC\u00A0?", r: "Oui, toutes taxes comprises. Ici, ce sont des prix d'exemple." },
];

export const euros = (n: number) => `${n.toFixed(2).replace(".", ",")} €`;
