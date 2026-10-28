// La pâtisserie imaginaire « Gâteaux Perdus », montrée dans les deux vidéos des
// pâtisseries : « Créer une marque » (on ne vend pas nos recettes, on refait celle de ta
// grand-mère d'après la photo de sa fiche ; la vitrine des fiches) et « Remplir l'agenda »
// (« vous serez combien ? », le samedi plafonné à ce que le labo sort, le rappel de l'an
// prochain demandé à la livraison). Les deux se tiennent : les gâteaux de la vitrine sont
// des recettes de famille retrouvées, que les familles ont accepté de partager.
//
// Fiches, prénoms, initiales, prix, compteur et dates sont des exemples. Les allergènes
// sont ceux qu'un vrai pâtissier établirait pour ces recettes ; chaque fiche les montre
// avant toute commande. Le téléphone est dans la tranche que l'ARCEP réserve à la fiction.

export const DOSSIER = "/exemples/gateaux-perdus";

export const boutique = {
  nom: "Gâteaux Perdus",
  telephone: "06 39 98 61 04",
  telephoneLien: "+33639986104",
  adresse: "12 rue de l'Exemple",
  ville: "00000 Exemple-Ville",
  horaires: "Du mardi au samedi, 8 h – 19 h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/gateaux`, libelle: "Les gâteaux" },
  { href: `${DOSSIER}/samedi`, libelle: "Le samedi" },
  { href: `${DOSSIER}/la-vitrine`, libelle: "La vitrine" },
  { href: `${DOSSIER}/comment-ca-marche`, libelle: "Comment ça marche" },
];

export const euros = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).replace(/ | /g, " ") + " €";

/* ---------- Les photos ----------
   Unsplash et Pexels (usage commercial permis), servies depuis notre domaine ;
   crédits dans les mentions légales. Aucun visage. */
export type Photo = { src: string; alt: string; largeur: number; hauteur: number };
const P = DOSSIER;
export const PHOTOS = {
  farineLivre: { src: `${P}/farine-livre.webp`, alt: "Des mains farinées tournent la page d'un vieux livre de recettes, dans la lumière du soir", largeur: 1300, hauteur: 1950 },
  farineMains: { src: `${P}/farine-mains.webp`, alt: "Des mains étalent la farine sur une table, à côté d'un livre de recettes ouvert", largeur: 1920, hauteur: 1280 },
  mainsPate: { src: `${P}/mains-pate.webp`, alt: "Deux mains âgées façonnent une pâte sur un plan de travail sombre", largeur: 1920, hauteur: 1280 },
  gateauPommes: { src: `${P}/gateau-pommes.webp`, alt: "Un gâteau aux pommes doré sur une assiette ancienne à motifs", largeur: 1800, hauteur: 1200 },
  couronneIngredients: { src: `${P}/couronne-ingredients.webp`, alt: "Un gâteau en couronne vu de dessus, sur une table en bois, entouré de ses ingrédients", largeur: 1200, hauteur: 1600 },
  dentelle: { src: `${P}/gateau-sur-la-dentelle.webp`, alt: "Un gâteau en couronne saupoudré de sucre glace, sur une nappe en dentelle, dans une salle à manger", largeur: 1400, hauteur: 933 },
  tranche: { src: `${P}/une-tranche.webp`, alt: "Une tranche de gâteau moelleux sur une assiette, sur une table en marbre", largeur: 900, hauteur: 1162 },
  farineOeufs: { src: `${P}/farine-et-oeufs.webp`, alt: "De la farine, des œufs, du beurre et un rouleau à pâtisserie sur un torchon rayé", largeur: 900, hauteur: 1200 },
  fraisier: { src: `${P}/fraisier.webp`, alt: "Un fraisier entier, fraises coupées sur le pourtour, sur un fond blanc", largeur: 1000, hauteur: 693 },
  foretNoire: { src: `${P}/foret-noire.webp`, alt: "Un gâteau au chocolat en trois étages, crème et cerises", largeur: 900, hauteur: 1039 },
  parisBrest: { src: `${P}/paris-brest.webp`, alt: "Un paris-brest garni de crème pralinée et d'amandes effilées", largeur: 900, hauteur: 1023 },
  bougies: { src: `${P}/bougies.webp`, alt: "Un gâteau au chocolat et ses bougies allumées, dans le noir", largeur: 900, hauteur: 1352 },
} satisfies Record<string, Photo>;

/* ---------- Les fiches de grand-mère (inventées, les mêmes que dans la vidéo) ---------- */
export type FicheRecette = { titre: string; lignes: string[]; famille: string; allergenes: string; refait: string };

export const FICHES: FicheRecette[] = [
  { titre: "Gâteau de Mamie Jeanne", lignes: ["250 g de beurre (salé !)", "4 œufs", "du sucre : pas trop", "cuire jusqu'à ce que ça sente bon"], famille: "envoyée par sa petite-fille, C.", allergenes: "gluten, œufs, lait", refait: "refait en 2 essais" },
  { titre: "Tarte de Lucienne", lignes: ["pâte : comme d'hab", "pommes du jardin", "four chaud"], famille: "envoyée par son fils, P.", allergenes: "gluten, œufs, lait", refait: "refaite en 3 essais" },
  { titre: "Le quatre-quarts", lignes: ["tout pareil", "un peu de citron"], famille: "envoyée par sa petite-fille, M.", allergenes: "gluten, œufs, lait", refait: "refait en 1 essai" },
  { titre: "Clafoutis d'Odette", lignes: ["cerises avec noyaux", "1 verre de lait"], famille: "envoyée par son petit-fils, J.", allergenes: "gluten, œufs, lait", refait: "refait en 2 essais" },
  { titre: "Fraisier d'Yvonne", lignes: ["génoise : 4 œufs", "crème au beurre (vanille)", "fraises du marché"], famille: "envoyée par sa petite-fille, L.", allergenes: "gluten, œufs, lait", refait: "refait en 2 essais" },
  { titre: "Galette de Germaine", lignes: ["amandes", "une fève"], famille: "envoyée par sa nièce, S.", allergenes: "gluten, œufs, lait, fruits à coque", refait: "refaite en 2 essais" },
];

export const QUESTIONS_APPEL = [
  "Beurre doux ou salé ?",
  "Moule en fer ou en verre ?",
  "Four à gaz, ou à bois ?",
  "Ça croquait dessus, ou c'était moelleux ?",
  "On le mangeait tiède, ou le lendemain ?",
];

/* ---------- Les gâteaux à partager : des recettes de famille retrouvées ---------- */

/** Les 14 allergènes à déclarer (règlement (UE) n° 1169/2011, annexe II). */
export const ALLERGENES = [
  "Gluten", "Crustacés", "Œufs", "Poissons", "Arachides", "Soja", "Lait",
  "Fruits à coque", "Céleri", "Moutarde", "Sésame", "Sulfites", "Lupin", "Mollusques",
] as const;
export type Allergene = (typeof ALLERGENES)[number];

export type Gateau = {
  id: string;
  nom: string;
  court: string;
  photo: Photo;
  parPart: number;
  recette: string;
  famille: string;
  allergenes: Allergene[];
  precision?: string;
};

export const GATEAUX: Gateau[] = [
  { id: "fraisier", nom: "Le fraisier d'Yvonne", court: "Fraisier", photo: PHOTOS.fraisier, parPart: 3.2, recette: "Génoise, crème mousseline à la vanille, fraises entières.", famille: "La recette de la grand-mère de L., retrouvée en deux essais.", allergenes: ["Gluten", "Œufs", "Lait"] },
  { id: "couronne", nom: "La couronne de Jeanne", court: "Couronne", photo: PHOTOS.dentelle, parPart: 2.8, recette: "Beurre salé, quatre œufs, du sucre « pas trop », sucre glace dessus.", famille: "La fiche tachée de Mamie Jeanne, envoyée par sa petite-fille.", allergenes: ["Gluten", "Œufs", "Lait"] },
  { id: "pommes", nom: "Le gâteau aux pommes de Lucienne", court: "Pommes", photo: PHOTOS.gateauPommes, parPart: 2.9, recette: "Pâte « comme d'hab », pommes du jardin, four chaud.", famille: "Trois essais, et son fils a dit : c'est elle.", allergenes: ["Gluten", "Œufs", "Lait"] },
  { id: "foret-noire", nom: "La forêt-noire de Rose", court: "Forêt-noire", photo: PHOTOS.foretNoire, parPart: 3.5, recette: "Génoise au chocolat, chantilly, cerises. Sans alcool.", famille: "Le gâteau des dimanches d'une famille, retrouvé d'après un cahier.", allergenes: ["Gluten", "Œufs", "Lait", "Soja"], precision: "Soja : dans la lécithine du chocolat." },
  { id: "paris-brest", nom: "Le paris-brest de Lucien", court: "Paris-brest", photo: PHOTOS.parisBrest, parPart: 3.4, recette: "Pâte à choux, crème pralinée à la noisette, amandes effilées.", famille: "La seule recette qu'un grand-père avait écrite.", allergenes: ["Gluten", "Œufs", "Lait", "Fruits à coque"], precision: "Fruits à coque : noisettes et amandes." },
];

/** Les tailles qu'on fait, en parts. Au-delà de la dernière : deux gâteaux. */
export const TAILLES = [6, 8, 10, 12, 15, 20, 25, 30];
export const tailleFaite = (invites: number) => TAILLES.find((t) => t >= invites) ?? null;
export const prix = (g: Gateau, parts: number) => Math.round(g.parPart * parts);

/** Le samedi : ce que le labo sort vraiment, et ce qui est déjà commandé (exemple). */
export const SAMEDI = { date: "samedi 24 octobre", suivant: "samedi 31 octobre", capacite: 12, commandes: [1, 2, 3, 5, 6, 8, 9, 10, 12] };

/** Le rappel de l'an prochain, demandé à la livraison (exemple). */
export const RAPPEL = { prenom: "Léo", age: 6, gateau: "Le fraisier d'Yvonne", court: "le fraisier", parts: 20, livre: "samedi 10 octobre", message: "début septembre 2027" };

/* ---------- Le récit : de la fiche tachée à la première bouchée ---------- */
export const ETAPES: { titre: string; surtitre: string; texte: string; photo: keyof typeof PHOTOS }[] = [
  { surtitre: "Un", titre: "Tu envoies la photo", texte: "De la fiche, du cahier, du dos d'enveloppe. Même tachée, même incomplète.", photo: "farineLivre" },
  { surtitre: "Deux", titre: "Le pâtissier t'appelle", texte: "Beurre doux ou salé ? Moule en fer ou en verre ? Vingt minutes de questions, pour combler les trous.", photo: "farineOeufs" },
  { surtitre: "Trois", titre: "Il la refait", texte: "Un essai, parfois trois. Il note tout : la recette retrouvée, et ses allergènes.", photo: "mainsPate" },
  { surtitre: "Quatre", titre: "Tu goûtes en premier", texte: "Et tu dis : c'est elle. Ou : pas encore. Alors il recommence.", photo: "tranche" },
];

/* ---------- Questions ---------- */
export const QUESTIONS: { q: string; r: string }[] = [
  { q: "Combien coûte un gâteau d'anniversaire pour 20 personnes ?", r: "Chez nous, de 56 € (la couronne) à 70 € (la forêt-noire), en prix d'exemple TTC. Tape ton nombre d'invités plus haut : le site fait le calcul pour chaque gâteau." },
  { q: "Et si la recette est incomplète ?", r: "Elles le sont presque toutes. « Du sucre : pas trop », « cuire jusqu'à ce que ça sente bon »… C'est pour ça que le pâtissier t'appelle : ta mémoire complète la fiche." },
  { q: "Combien coûte une recette refaite ?", r: "Le premier gâteau refait, essais compris : 38 € pour six parts (prix TTC d'exemple). Ensuite, il entre dans tes commandes au prix d'un gâteau de la vitrine." },
  { q: "Et les allergènes ?", r: "Ils sont écrits sur chaque fiche, et rappelés juste avant de commander. Pour un gâteau refait, ils sont établis avec toi au téléphone, d'après ce que contenait la recette. En cas d'allergie sévère, appelle-nous : on te dit ce qu'il y a dans l'atelier ce jour-là." },
  { q: "Pourquoi douze gâteaux le samedi, pas plus ?", r: "Parce que c'est ce que le labo sort, bien, un samedi. Le compteur suit les vraies commandes : quand il en reste trois, il en reste trois. Quand c'est complet, le samedi suivant est ouvert." },
  { q: "La recette, vous la gardez ?", r: "Elle reste à ta famille. Elle n'entre dans la vitrine, et parmi nos gâteaux, que si ta famille le veut, avec son accord écrit. Sinon, on la refait pour toi seul." },
  { q: "Le rappel de l'an prochain, c'est obligatoire ?", r: "Non. On te pose la question à la livraison, la case n'est jamais cochée d'avance. Si tu dis oui, tu reçois un seul message par an, et un lien pour ne plus rien recevoir." },
];
