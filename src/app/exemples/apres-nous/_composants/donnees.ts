// Tout ce que le site d'Après Nous affiche, au même endroit. L'atelier est fictif :
// chaque registre, chaque prix, chaque pièce, chaque famille est un exemple, et le site
// le dit.
//
// Après Nous réunit les deux vidéos des artisans d'art : « Créer une marque » (un
// atelier d'ébénisterie : sous chaque table, un numéro gravé ouvre son registre, dont
// les dernières lignes sont vides ; le premier repas filmé) et « Remplir l'agenda » (un
// céramiste : chaque pièce a sa page et vingt secondes de vidéo de son tournage ;
// l'ouverture du four une fois par mois, en direct ; en ligne le soir même, une seule
// de chaque). Un même atelier, deux mains : le bois et la terre — la table, et ce
// qu'on pose dessus.
//
// Règles tenues (SOURCES.md des deux vidéos) :
//   - « tes petits-enfants feront leurs devoirs dessus » est une image, pas une
//     promesse de durée : ni « à vie », ni « cent ans » ; garanties légales telles quelles ;
//   - un registre doit être vrai ; une « pièce unique » l'est vraiment, « Partie » veut
//     dire vendue — jamais de faux « bientôt épuisé » (C. conso., L121-4, 7°) ;
//   - la vidéo d'une pièce est celle de son tournage (ici une animation, et c'est dit) ;
//   - ni « artisan », « artisanal », « artisan d'art » ni « maître artisan » : rien ne
//     l'établit ; « ébéniste », « céramiste », « atelier », « fait main » ne sont pas réservés ;
//   - le premier repas n'est filmé qu'avec l'accord écrit de la famille ;
//   - téléphone dans la tranche ARCEP réservée à la fiction, aucune adresse e-mail.

export const DOSSIER = "/exemples/apres-nous";

export const atelier = {
  nom: "Après Nous",
  adresse: "12 rue de l'Exemple, 00000 Ta Ville",
  telephone: "01 99 00 27 31",
  horaires: "Atelier ouvert le samedi, de 10 h à 13 h, et sur rendez-vous",
  siret: "000 000 000 00000",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/registre`, libelle: "Le registre" },
  { href: `${DOSSIER}/meubles`, libelle: "Les tables" },
  { href: `${DOSSIER}/fournee`, libelle: "La fournée" },
  { href: `${DOSSIER}/ouverture-du-four`, libelle: "Le four" },
  { href: `${DOSSIER}/atelier`, libelle: "L'atelier" },
];

// ------------------------------------------------------------------ le bois

export type Ligne = { annee: string; texte: string; detail?: string; par: string };

export type Registre = {
  numero: string;
  meuble: string;
  essence: string;
  dimensions: string;
  livre: string;
  lignes: Ligne[];
  vides: number;
};

export const registres: Registre[] = [
  {
    numero: "31",
    meuble: "Table de famille",
    essence: "Chêne, huilé",
    dimensions: "220 × 95 cm · 8 couverts",
    livre: "Livrée en 2026",
    lignes: [
      { annee: "2024", texte: "Le chêne est scié", detail: "Un chêne de 140 ans, scié en plateaux de 5 cm, puis mis à sécher sous abri.", par: "l'atelier" },
      { annee: "2026", texte: "74 heures à l'atelier", detail: "Dégauchi, raboté, assemblé à tenons et mortaises, huilé en trois couches.", par: "l'atelier" },
      { annee: "2026", texte: "Premier repas · famille M.", detail: "Huit couverts, une soupe dans les bols de l'atelier, un gâteau. Filmé avec l'accord écrit de la famille.", par: "l'atelier" },
    ],
    vides: 4,
  },
  {
    numero: "12",
    meuble: "Bureau d'écolier",
    essence: "Noyer, ciré",
    dimensions: "110 × 60 cm",
    livre: "Livré en 2025",
    lignes: [
      { annee: "2023", texte: "Le noyer est scié", detail: "Un noyer tombé dans un verger, scié sur place.", par: "l'atelier" },
      { annee: "2025", texte: "41 heures à l'atelier", detail: "Un tiroir à queues d'aronde, un plateau d'un seul tenant.", par: "l'atelier" },
      { annee: "2025", texte: "Première dictée · famille R.", par: "famille R." },
    ],
    vides: 4,
  },
  {
    numero: "47",
    meuble: "Banc de table",
    essence: "Frêne, huilé",
    dimensions: "200 × 35 cm",
    livre: "Livré en 2026",
    lignes: [
      { annee: "2025", texte: "Le frêne est scié", par: "l'atelier" },
      { annee: "2026", texte: "22 heures à l'atelier", par: "l'atelier" },
    ],
    vides: 5,
  },
];

export const registreParNumero = (n: string) => registres.find((r) => r.numero === n.replace(/\D/g, "").replace(/^0+/, ""));

export type Meuble = { id: string; nom: string; texte: string; prix: string; delai: string; photo: keyof typeof photos };

export const meubles: Meuble[] = [
  { id: "table", nom: "La table de famille", texte: "Rectangulaire, de 6 à 14 couverts. Plateau massif, pieds assemblés à tenons et mortaises.", prix: "à partir de 2 900 € TTC", delai: "12 semaines", photo: "tableDuSoir" },
  { id: "ronde", nom: "La table ronde", texte: "Pour quatre ou six. Le plateau est fait de trois planches, choisies dans le même arbre.", prix: "à partir de 2 400 € TTC", delai: "10 semaines", photo: "tableRonde" },
  { id: "bureau", nom: "Le bureau d'écolier", texte: "Un plateau, un tiroir, des pieds qui se rallongent : il grandit avec celui qui s'y assoit.", prix: "à partir de 1 450 € TTC", delai: "8 semaines", photo: "assemblage" },
  { id: "banc", nom: "Le banc", texte: "Celui qu'on pousse sous la table, celui où l'on se serre à trois.", prix: "à partir de 690 € TTC", delai: "6 semaines", photo: "cernes" },
];

/** Le calcul d'une table sur mesure : le nombre de convives donne la taille et le prix de départ. */
export const paliers = [
  { jusqua: 4, titre: "Table ronde, Ø 110 cm", prix: "à partir de 2 400 € TTC · exemple", detail: "Quatre couverts, un pied central ou quatre pieds." },
  { jusqua: 6, titre: "Table de 180 × 90 cm", prix: "à partir de 2 900 € TTC · exemple", detail: "Six couverts, et la place pour un plat au milieu." },
  { jusqua: 8, titre: "Table de 220 × 95 cm", prix: "à partir de 3 400 € TTC · exemple", detail: "Huit couverts : c'est la table n° 31." },
  { jusqua: 10, titre: "Table de 260 × 100 cm", prix: "à partir de 3 900 € TTC · exemple", detail: "Dix couverts, un pied de plus au milieu." },
  { jusqua: 12, titre: "Table de 300 × 100 cm", prix: "à partir de 4 600 € TTC · exemple", detail: "Douze couverts, plateau en deux pièces assemblées." },
  { jusqua: 14, titre: "Table de 340 × 105 cm", prix: "à partir de 5 200 € TTC · exemple", detail: "Quatorze couverts : on vient la monter chez toi." },
];

// ------------------------------------------------------------------ la terre

/** Les ouvertures du four : le troisième jeudi du mois, à 19 h, en direct. */
export const ouvertures = {
  derniere: { date: "jeudi 15 octobre 2026", court: "15 oct." },
  prochaine: { date: "jeudi 19 novembre 2026", heure: "19 h", court: "19 nov." },
  suivante: { date: "jeudi 17 décembre 2026", court: "17 déc." },
};

export type Forme = "bol" | "vase" | "tasse" | "assiette";

export type Piece = {
  slug: string;
  numero: string;
  forme: Forme;
  nom: string;
  email: string;      // la couleur de l'émail, pour le dessin
  emailNom: string;
  terre: string;
  dimensions: string;
  tourneLe: string;
  prix: number;       // TTC, exemple
  partie: boolean;    // vendue : elle ne reviendra pas
  note: string;
};

export const pieces: Piece[] = [
  { slug: "bol-112", numero: "112", forme: "bol", nom: "Bol n° 112", email: "#2F4A44", emailNom: "Émail vert sapin, coulé sur le bord", terre: "Grès moucheté", dimensions: "Ø 14 cm · hauteur 7 cm · 45 cl", tourneLe: "3 octobre 2026", prix: 48, partie: false, note: "Le pied a gardé la trace du fil : c'est lui qui l'a détaché du tour." },
  { slug: "vase-37", numero: "37", forme: "vase", nom: "Vase n° 37", email: "#B65A3A", emailNom: "Émail rouille, mat", terre: "Grès rouge", dimensions: "Hauteur 24 cm · Ø 11 cm", tourneLe: "26 septembre 2026", prix: 95, partie: true, note: "Tourné en deux fois, le col ajouté le lendemain." },
  { slug: "tasse-58", numero: "58", forme: "tasse", nom: "Tasse n° 58", email: "#E8E0CF", emailNom: "Émail coquille d'œuf", terre: "Grès blanc", dimensions: "Ø 8 cm · hauteur 9 cm · 25 cl", tourneLe: "1er octobre 2026", prix: 32, partie: false, note: "L'anse est tirée à la main, pas moulée." },
  { slug: "assiette-9", numero: "9", forme: "assiette", nom: "Assiette n° 9", email: "#5C7A4E", emailNom: "Émail céladon, vert mousse", terre: "Grès moucheté", dimensions: "Ø 26 cm", tourneLe: "29 septembre 2026", prix: 38, partie: true, note: "Une bulle d'émail a éclaté au four, sur le marli : c'est sa signature." },
  { slug: "bol-113", numero: "113", forme: "bol", nom: "Bol n° 113", email: "#C9A04A", emailNom: "Émail miel, brillant", terre: "Grès moucheté", dimensions: "Ø 13 cm · hauteur 7 cm · 40 cl", tourneLe: "3 octobre 2026", prix: 48, partie: false, note: "Tourné juste après le 112, dans la même motte de terre." },
  { slug: "vase-38", numero: "38", forme: "vase", nom: "Vase n° 38", email: "#2F3E5C", emailNom: "Émail nuit, satiné", terre: "Grès noir", dimensions: "Hauteur 21 cm · Ø 12 cm", tourneLe: "28 septembre 2026", prix: 95, partie: false, note: "La lèvre est légèrement ovale : elle a bougé au séchage, on l'a laissée faire." },
  { slug: "tasse-59", numero: "59", forme: "tasse", nom: "Tasse n° 59", email: "#8C5A3C", emailNom: "Émail tenmoku, brun profond", terre: "Grès blanc", dimensions: "Ø 8 cm · hauteur 9 cm · 25 cl", tourneLe: "1er octobre 2026", prix: 32, partie: false, note: "Le tenmoku s'éclaircit sur les arêtes, là où l'émail est plus fin." },
  { slug: "assiette-10", numero: "10", forme: "assiette", nom: "Assiette n° 10", email: "#D9D4C7", emailNom: "Émail blanc cassé, mat", terre: "Grès moucheté", dimensions: "Ø 22 cm", tourneLe: "30 septembre 2026", prix: 34, partie: false, note: "Les points sombres sont le fer de la terre, remonté à la cuisson." },
];

export const pieceParSlug = (slug: string) => pieces.find((p) => p.slug === slug);
export const feminin = (f: Forme) => f === "tasse" || f === "assiette";
/** « Acheter ce bol », « Acheter cette tasse ». */
export const boutonAchat = (f: Forme) => `Acheter ${feminin(f) ? "cette" : "ce"} ${f}`;

export const FORMES: { id: Forme | "tout"; libelle: string }[] = [
  { id: "tout", libelle: "Tout" },
  { id: "bol", libelle: "Bols" },
  { id: "tasse", libelle: "Tasses" },
  { id: "assiette", libelle: "Assiettes" },
  { id: "vase", libelle: "Vases" },
];

/** « 48 € » : les prix sont ronds, l'espace avant € est insécable. */
export const prix = (n: number) => `${n} €`;

export const ENVOI = { prix: "7,90 € TTC", delai: "expédiée sous 3 jours ouvrés, livrée en 2 à 4 jours" };

// ------------------------------------------------------------------ l'atelier

/** Les deux métiers de l'atelier, étape par étape. */
export const etapesBois = [
  { titre: "L'arbre", texte: "On choisit l'arbre avant le dessin. Chêne, noyer ou frêne, scié en plateaux, séché à l'air au moins deux ans." },
  { titre: "Le dessin", texte: "Chez toi, avec un mètre et une feuille. On regarde la pièce, la lumière, combien vous êtes le dimanche." },
  { titre: "Les assemblages", texte: "Tenons, mortaises, queues d'aronde. Pas de vis là où le bois doit pouvoir bouger." },
  { titre: "Le numéro", texte: "Gravé au fer sous le plateau. Il ouvre le registre du meuble, sur ce site. La livraison, puis, si la famille le veut, le premier repas filmé." },
];

export const etapesTerre = [
  { titre: "La terre", duree: "1 jour", texte: "Du grès, pétri à la main pour chasser l'air. Une motte par pièce, pesée avant de monter sur le tour." },
  { titre: "Le tournage", duree: "20 minutes", texte: "Centrer, ouvrir, monter, affiner. On filme la pièce du début à la fin : vingt secondes de ce film vont sur sa page." },
  { titre: "Le séchage, le biscuit", duree: "1 semaine", texte: "Lentement, à l'abri des courants d'air. Puis une première cuisson, à 980 °C." },
  { titre: "L'émail, la cuisson", duree: "3 jours", texte: "Un émail préparé à l'atelier, puis 1 280 °C. Le four refroidit seul : on ne l'ouvre qu'une fois froid, le jour de l'ouverture." },
];

export const questions = [
  { q: "Qui écrit dans le registre d'une table ?", r: "L'atelier écrit les premières lignes : l'arbre, les heures, la livraison. Les suivantes sont à toi, avec ton numéro et un code remis à la livraison." },
  { q: "La vidéo d'un bol est vraiment celle de mon bol ?", r: "Oui. On filme chaque tournage, et la vidéo est rangée avec le numéro de la pièce. Si elle rate au four, la vidéo part avec elle. (Ici, l'atelier étant fictif, une animation la remplace.)" },
  { q: "Je peux acheter une pièce sans venir à l'atelier ?", r: "Oui : tout ce qui est en vente est sur le site, le soir de l'ouverture du four. Une seule de chaque ; envoi suivi, calée dans du papier froissé." },
  { q: "Le premier repas est-il obligatoire ?", r: "Non. On le filme seulement si la famille le veut, avec un accord écrit qui dit où la vidéo sera publiée. Elle peut le retirer quand elle veut." },
  { q: "Quelle garantie ?", r: "Les garanties légales : deux ans de conformité, et la garantie des vices cachés. On ne promet pas « à vie » : on promet une table qui se répare, un bol qui passe au lave-vaisselle." },
  { q: "Je peux changer d'avis ?", r: "Pour une pièce de céramique, oui : quatorze jours après la réception, comme pour tout achat à distance. Une table faite sur mesure n'ouvre pas de délai de rétractation : c'est pour ça qu'on la dessine ensemble, et que le devis détaille tout avant de signer." },
];

export const photos = {
  tableDuSoir: { src: `${DOSSIER}/table-du-soir.webp`, largeur: 1400, hauteur: 2100, alt: "Une longue table en bois sombre dans une pièce, la lumière du soir posée en biais sur le plateau" },
  tableRonde: { src: `${DOSSIER}/table-ronde.webp`, largeur: 1100, hauteur: 1650, alt: "Une table ronde en noyer, dans le soleil d'après-midi, un brin de fleurs dans un verre" },
  assemblage: { src: `${DOSSIER}/assemblage.webp`, largeur: 1000, hauteur: 1280, alt: "L'angle d'une table en bois clair, là où le pied rejoint le plateau" },
  huile: { src: `${DOSSIER}/huile.webp`, largeur: 1000, hauteur: 1333, alt: "Une main passe un chiffon d'huile sur un plateau de bois brut" },
  cernes: { src: `${DOSSIER}/cernes.webp`, largeur: 640, hauteur: 853, alt: "Des billes de bois empilées, leurs cernes visibles en bout" },
  tournage: { src: `${DOSSIER}/tournage.webp`, largeur: 1400, hauteur: 933, alt: "Deux mains couvertes de barbotine montent un bol en grès sur un tour qui tourne" },
  fournee: { src: `${DOSSIER}/fournee.webp`, largeur: 1200, hauteur: 1800, alt: "Une dizaine de bols émaillés, gris, miel et blancs, posés sur un fond rose poudré" },
  etagere: { src: `${DOSSIER}/etagere.webp`, largeur: 1200, hauteur: 800, alt: "Des piles de bols de toutes les couleurs sur une étagère en bois de l'atelier" },
  bol: { src: `${DOSSIER}/bol-112.webp`, largeur: 1000, hauteur: 787, alt: "Un bol vu de dessus, émail sombre sur le bord et grès moucheté au fond" },
};
