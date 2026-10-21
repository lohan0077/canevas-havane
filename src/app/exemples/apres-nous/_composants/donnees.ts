// Tout ce que le site d'Après Nous affiche, au même endroit. L'atelier est fictif :
// chaque registre, chaque prix, chaque famille est un exemple, et le site le dit.
//
// Règles tenues ici (Videos/marque-artisans-art/SOURCES.md) :
//   - « tes petits-enfants feront leurs devoirs dessus » est une image, pas une
//     promesse de durée : ni « à vie », ni « cent ans », ni garantie inventée ; les
//     garanties légales sont écrites telles qu'elles sont ;
//   - un registre doit être vrai : chaque ligne correspond à ce qui est arrivé à ce
//     meuble-là (ici, des exemples marqués comme tels) ;
//   - ni « artisan d'art » ni « maître artisan » : titres réservés, que rien
//     n'établit ; « ébéniste » et « atelier » ne le sont pas ;
//   - le premier repas n'est filmé qu'avec l'accord écrit de la famille ;
//   - téléphone dans la tranche ARCEP réservée à la fiction, aucune adresse e-mail.

export const DOSSIER = "/exemples/apres-nous";

export const atelier = {
  nom: "Après Nous",
  adresse: "12 rue de l'Exemple, 00000 Ta Ville",
  telephone: "01 99 00 27 31",
  telephoneLien: "+33199002731",
  horaires: "Atelier ouvert sur rendez-vous, du mardi au samedi",
  siret: "000 000 000 00000",
};

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
      { annee: "2026", texte: "Premier repas · famille M.", detail: "Huit couverts, une soupe, un gâteau. Filmé avec l'accord écrit de la famille.", par: "l'atelier" },
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

export type Meuble = { id: string; nom: string; texte: string; prix: string; delai: string; photo?: keyof typeof photos };

export const meubles: Meuble[] = [
  { id: "table", nom: "La table de famille", texte: "Rectangulaire, de 6 à 14 couverts. Plateau massif, pieds assemblés à tenons et mortaises.", prix: "à partir de 2 900 €", delai: "12 semaines", photo: "tableDuSoir" },
  { id: "ronde", nom: "La table ronde", texte: "Pour quatre ou six. Le plateau est fait de trois planches, choisies dans le même arbre.", prix: "à partir de 2 400 €", delai: "10 semaines", photo: "tableRonde" },
  { id: "bureau", nom: "Le bureau d'écolier", texte: "Un plateau, un tiroir, des pieds qui se rallongent : il grandit avec celui qui s'y assoit.", prix: "à partir de 1 450 €", delai: "8 semaines" },
  { id: "banc", nom: "Le banc", texte: "Celui qu'on pousse sous la table, celui où l'on se serre à trois.", prix: "à partir de 690 €", delai: "6 semaines" },
];

/** Le calcul d'une table sur mesure : le nombre de convives donne la taille et le prix de départ. */
export const paliers = [
  { jusqua: 4, titre: "Table ronde, Ø 110 cm", prix: "à partir de 2 400 € TTC", detail: "Quatre couverts, un pied central ou quatre pieds." },
  { jusqua: 6, titre: "Table de 180 × 90 cm", prix: "à partir de 2 900 € TTC", detail: "Six couverts, et la place pour un plat au milieu." },
  { jusqua: 8, titre: "Table de 220 × 95 cm", prix: "à partir de 3 400 € TTC", detail: "Huit couverts : c'est la table n° 31." },
  { jusqua: 10, titre: "Table de 260 × 100 cm", prix: "à partir de 3 900 € TTC", detail: "Dix couverts, un pied de plus au milieu." },
  { jusqua: 12, titre: "Table de 300 × 100 cm", prix: "à partir de 4 600 € TTC", detail: "Douze couverts, plateau en deux pièces assemblées." },
  { jusqua: 14, titre: "Table de 340 × 105 cm", prix: "à partir de 5 200 € TTC", detail: "Quatorze couverts : on vient la monter chez toi." },
];

export const etapes = [
  { titre: "L'arbre", texte: "On choisit l'arbre avant le dessin. Chêne, noyer ou frêne, scié en plateaux, séché à l'air au moins deux ans." },
  { titre: "Le dessin", texte: "Chez toi, avec un mètre et une feuille. On regarde la pièce, la lumière, combien vous êtes le dimanche." },
  { titre: "Les assemblages", texte: "Tenons, mortaises, queues d'aronde. Pas de vis là où le bois doit pouvoir bouger." },
  { titre: "La finition", texte: "Trois couches d'huile, poncées à la main entre chaque. Une tache se rattrape, une rayure aussi." },
  { titre: "Le numéro", texte: "Gravé sous le plateau, au fer. Il ouvre le registre du meuble, sur ce site." },
  { titre: "La livraison", texte: "On l'apporte, on la monte, on la règle. Et si la famille le veut, on filme le premier repas." },
];

export const questions = [
  { q: "Combien de temps faut-il ?", r: "Entre six et douze semaines selon le meuble, à partir du dessin validé. La date de livraison est écrite sur le devis." },
  { q: "Qui écrit dans le registre ?", r: "L'atelier écrit les premières lignes : l'arbre, les heures, la livraison. Les suivantes sont à toi, avec ton numéro et un code remis à la livraison." },
  { q: "Et si je déménage, ou si je la donne ?", r: "Le registre suit le meuble, pas la famille. Celui qui l'a reçue continue d'écrire." },
  { q: "Le premier repas est-il obligatoire ?", r: "Non. On le filme seulement si la famille le veut, avec un accord écrit qui dit où la vidéo sera publiée. Elle peut le retirer quand elle veut." },
  { q: "Quelle garantie ?", r: "Les garanties légales : deux ans de conformité, et la garantie des vices cachés. On ne promet pas « à vie » : on promet un meuble qui se répare." },
  { q: "Je peux changer d'avis après la commande ?", r: "Un meuble fait sur mesure n'ouvre pas de délai de rétractation : c'est pour ça qu'on dessine ensemble, et que le devis détaille tout avant de signer." },
];

export const NAVIGATION = [
  { href: `${DOSSIER}/registre`, libelle: "Le registre" },
  { href: `${DOSSIER}/meubles`, libelle: "Les meubles" },
  { href: `${DOSSIER}/atelier`, libelle: "L'atelier" },
];

export const photos = {
  tableDuSoir: { src: `${DOSSIER}/table-du-soir.webp`, largeur: 1400, hauteur: 2100, alt: "Une longue table en bois sombre dans une pièce, la lumière du soir posée en biais sur le plateau" },
  tableRonde: { src: `${DOSSIER}/table-ronde.webp`, largeur: 1100, hauteur: 1650, alt: "Une table ronde en noyer, dans le soleil d'après-midi, un brin de fleurs dans un verre" },
  assemblage: { src: `${DOSSIER}/assemblage.webp`, largeur: 1000, hauteur: 1280, alt: "L'angle d'une table en bois clair, là où le pied rejoint le plateau" },
  huile: { src: `${DOSSIER}/huile.webp`, largeur: 1000, hauteur: 1333, alt: "Une main passe un chiffon d'huile sur un plateau de bois brut" },
  cernes: { src: `${DOSSIER}/cernes.webp`, largeur: 640, hauteur: 853, alt: "Des billes de bois empilées, leurs cernes visibles en bout" },
};
