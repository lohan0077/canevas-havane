// Tout ce qu'affiche le site de Transmis, maison de traiteur imaginaire qui sert la
// recette de ta famille à cent vingt. Entreprise fictive : chaque prix, chaque date,
// chaque personne (Mamie Jo, Léa…) est un exemple, et le site le dit. Il réunit les deux
// vidéos des traiteurs : « Créer une marque » (Transmis, la page du cahier envoyée en
// photo, les essais validés par la grand-mère, la carte de table) et « Remplir
// l'agenda » (combien d'invités, le prix par personne et un menu complet en exemple, une
// page par mariage, la dégustation réservée en ligne, les dix secondes de silence).
//
// Les règles tenues ici (Videos/marque-traiteurs et agenda-traiteurs, SOURCES.md) :
//   - prix TTC par personne, marqués « exemple » ;
//   - allergènes : écrits pour chaque plat (les 14 de l'annexe II du règlement UE
//     n° 1169/2011) et demandés avant toute commande (décret n° 2015-447) ;
//   - aucune boisson alcoolisée, ni au menu, ni dans une recette, ni en photo ;
//   - la carte de table ne dit que l'histoire vraie du client ;
//   - les vidéos de grands-mères : avec leur accord écrit ;
//   - les pages de mariage sont des exemples, sans nom ni photo de vrais mariés ;
//   - aucun avis, aucune note, aucune « dernière date disponible ».

export const DOSSIER = "/exemples/transmis";

export const entreprise = {
  nom: "Transmis",
  // Tranche réservée par l'ARCEP aux œuvres de fiction : ce numéro ne sonne chez personne.
  telephone: "06 39 98 70 25",
  telephoneLien: "+33639987025",
  siret: "000 000 000 00000",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/de-la-recette-a-la-table`, libelle: "De la recette à la table" },
  { href: `${DOSSIER}/mariages`, libelle: "Les mariages" },
  { href: `${DOSSIER}/prix`, libelle: "Le prix" },
];

/** `centre` : le point à garder au cadrage quand la photo est rognée (object-position). */
export type Photo = { src: string; largeur: number; hauteur: number; alt: string; centre?: string };

export const photos = {
  papier: { src: `${DOSSIER}/papier.webp`, largeur: 1300, hauteur: 867, alt: "De vieilles pages écrites à la main, à l'encre, sur un papier jauni" },
  mains: { src: `${DOSSIER}/mains.webp`, largeur: 1100, hauteur: 1650, alt: "Les mains âgées d'une cuisinière remuent une casserole avec une cuillère en bois" },
  ragout: { src: `${DOSSIER}/ragout.webp`, largeur: 1100, hauteur: 1649, alt: "Un plat mijoté de viande, de carottes et d'herbes dans un bol blanc, vu de dessus" },
  sauce: { src: `${DOSSIER}/sauce.webp`, largeur: 1400, hauteur: 1400, alt: "Les mains d'un chef versent une sauce sur une assiette dressée, dans la pénombre" },
  artichaut: { src: `${DOSSIER}/artichaut.webp`, largeur: 1200, hauteur: 800, alt: "Une assiette blanche d'artichauts rôtis et d'herbes, vue de dessus sur un fond bleu nuit" },
  poisson: { src: `${DOSSIER}/poisson.webp`, largeur: 1000, hauteur: 1500, alt: "Un filet de bar à la peau dorée sur un velouté vert, des courgettes et des pommes grenaille" },
  framboises: { src: `${DOSSIER}/framboises.webp`, largeur: 1200, hauteur: 800, alt: "Un crémeux rose entouré de framboises et de miettes de crumble, sur une assiette blanche" },
  // Les plats du premier écran : une seule campagne, lumière chaude, fonds sombres.
  potAuFeu: { src: `${DOSSIER}/plat-pot-au-feu.webp`, largeur: 2000, hauteur: 3000, alt: "Deux mains tendent un bol fumant de bœuf mijoté, de carottes et de pommes de terre, sur un fond sombre", centre: "50% 58%" },
  blanquette: { src: `${DOSSIER}/plat-blanquette.webp`, largeur: 2000, hauteur: 2998, alt: "Une cuillère soulève des morceaux nappés d'une sauce à la crème et des champignons, au-dessus d'un bol blanc" },
  couscous: { src: `${DOSSIER}/plat-couscous.webp`, largeur: 1600, hauteur: 2844, alt: "Une assiette de couscous vue de près : semoule, pois chiches, carottes, courgettes, poivron et viande", centre: "50% 55%" },
  basquaise: { src: `${DOSSIER}/plat-basquaise.webp`, largeur: 2400, hauteur: 2400, alt: "Du sel tombe en pluie sur une assiette de poulet aux poivrons rouges et aux oignons, dans la pénombre", centre: "50% 78%" },
  tarte: { src: `${DOSSIER}/plat-tarte.webp`, largeur: 1600, hauteur: 2133, alt: "Une tarte fine aux pommes vue de dessus, les lamelles dorées posées en rosace" },
} satisfies Record<string, Photo>;

/** « 7 200 € » : espace fine insécable pour les milliers, insécable avant €. */
export const euros = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;

/** Les recettes en éventail, sur l'accueil : des exemples, des prénoms inventés. */
export const RECETTES = [
  { plat: "Blanquette", de: "Mamie Jo", annee: "1962" },
  { plat: "Couscous", de: "Baba Saïd", annee: "1971" },
  { plat: "Pot-au-feu", de: "Pépé Marcel", annee: "1958" },
  { plat: "Tarte aux pommes", de: "Tata Lise", annee: "1984" },
  { plat: "Gnocchis", de: "Nonna Rita", annee: "1966" },
  { plat: "Poulet basquaise", de: "Mamie Odette", annee: "1975" },
  { plat: "Riz au lait", de: "Grand-mère Anne", annee: "1949" },
];

/** La page de cahier d'exemple : la blanquette de Mamie Jo, sans vin. */
export const PAGE_EXEMPLE = {
  plat: "Blanquette de Mamie Jo",
  lignes: ["1 kg de veau, épaule", "2 carottes, 1 oignon, 1 clou", "200 g de champignons", "crème, 1 jaune, ½ citron", "cuire doucement, 2 h…"],
  allergenes: ["Lait", "Œufs", "Céleri"],
};

export const ETAPES = [
  { titre: "Tu envoies la page", texte: "En photo, telle qu'elle est : tachée, raturée, avec les quantités « à l'œil ». C'est elle qu'on veut.", photo: "papier" },
  { titre: "On la refait en cuisine", texte: "Une fois, deux fois, trois s'il le faut. On note ce qui change, on t'envoie chaque essai.", photo: "mains" },
  { titre: "Tu viens goûter", texte: "La dégustation se réserve en ligne, comme une table au restaurant. Avec la personne qui te l'a transmise, si elle le peut : c'est elle qui valide, pas nous.", photo: "ragout" },
  { titre: "On la sert à 120", texte: "Le jour J, les assiettes partent toutes ensemble. Dix secondes de silence. Et sur chaque table, une carte qui raconte d'où vient le plat.", photo: "sauce" },
] as const;

export type Essai = { numero: number; date: string; note: string };

/** Le carnet d'essais de la blanquette de Mamie Jo. Exemple. */
export const ESSAIS: Essai[] = [
  { numero: 1, date: "6 mars", note: "« Trop salé. Et elle mettait plus de carottes. »" },
  { numero: 2, date: "13 mars", note: "« La sauce est trop épaisse. Un peu plus de citron. »" },
  { numero: 3, date: "20 mars", note: "« Là, on y est presque. Goûte, toi. »" },
];

// ---------- Le prix par personne ----------

export const INVITES_MIN = 30;
export const INVITES_MAX = 200;

/** Le prix par personne selon le nombre d'invités. TTC, exemple. */
export const PALIERS = [
  { jusqua: 60, prix: 74, titre: "Une petite tablée" },
  { jusqua: 120, prix: 68, titre: "Un mariage" },
  { jusqua: 200, prix: 64, titre: "Une grande fête" },
];
export const prixParPersonne = (invites: number) => (PALIERS.find((p) => invites <= p.jusqua) ?? PALIERS[PALIERS.length - 1]).prix;

export const COMPRIS = [
  "Les essais en cuisine, autant qu'il en faut",
  "La dégustation, à deux ou à trois",
  "Entrée, le plat de ta famille, dessert",
  "Le service à l'assiette, la vaisselle, le nappage",
  "Les eaux, la citronnade maison, le café",
  "Une carte sur chaque table",
];

// ---------- Les menus et les allergènes ----------

/** Les 14 allergènes de l'annexe II du règlement (UE) n° 1169/2011. */
export const ALLERGENES = [
  "Gluten", "Crustacés", "Œufs", "Poissons", "Arachides", "Soja", "Lait",
  "Fruits à coque", "Céleri", "Moutarde", "Sésame", "Sulfites", "Lupin", "Mollusques",
];

export type Plat = { nom: string; detail: string; allergenes: string[] };
export type Menu = { id: string; saison: string; entree: Plat; plat: Plat; dessert: Plat };

/** Les plats de famille des exemples : chacun est « le plat de ta famille ». */
const PLATS_DE_FAMILLE = {
  blanquette: { nom: "La blanquette de Mamie Jo", detail: "Veau, carottes, champignons, sauce à la crème et au citron. Sans vin, comme toujours ici.", allergenes: ["Lait", "Œufs", "Céleri"] },
  basquaise: { nom: "Le poulet basquaise de Mamie Odette", detail: "Poulet mijoté, poivrons, tomates, piment doux. Riz pilaf.", allergenes: [] },
  couscous: { nom: "Le couscous de Baba Saïd", detail: "Semoule roulée à la main, légumes, pois chiches, agneau. Le bouillon à part.", allergenes: ["Gluten", "Céleri"] },
  potaufeu: { nom: "Le pot-au-feu de Pépé Marcel", detail: "Bœuf, os à moelle, poireaux, navets. La moutarde sur la table.", allergenes: ["Céleri", "Moutarde"] },
} satisfies Record<string, Plat>;

const ENTREES_DESSERTS = {
  juin: {
    saison: "Menu de juin",
    entree: { nom: "Petits pois, menthe et chèvre frais", detail: "Velouté froid, chèvre frais, menthe du jardin.", allergenes: ["Lait"] },
    dessert: { nom: "Framboises, crémeux vanille", detail: "Crémeux à la vanille, framboises fraîches, crumble au beurre.", allergenes: ["Gluten", "Lait", "Œufs"] },
  },
  septembre: {
    saison: "Menu de septembre",
    entree: { nom: "Tomates anciennes, burrata, basilic", detail: "Les dernières tomates de l'été, huile d'olive, fleur de sel.", allergenes: ["Lait"] },
    dessert: { nom: "Figues rôties, crème d'amande", detail: "Figues au miel, crème d'amande, tuile croustillante.", allergenes: ["Fruits à coque", "Lait", "Œufs", "Gluten"] },
  },
  octobre: {
    saison: "Menu d'octobre",
    entree: { nom: "Artichauts rôtis, herbes", detail: "Artichauts violets rôtis, citron, herbes fraîches.", allergenes: [] },
    dessert: { nom: "Tarte fine aux pommes", detail: "Pâte feuilletée, pommes du verger, caramel au beurre salé.", allergenes: ["Gluten", "Lait", "Œufs"] },
  },
};

const menu = (id: keyof typeof ENTREES_DESSERTS, plat: Plat): Menu => ({ id, ...ENTREES_DESSERTS[id], plat });

/** Le menu complet de l'accueil, en exemple : juin, et la blanquette de Mamie Jo. */
export const MENU_EXEMPLE = menu("juin", PLATS_DE_FAMILLE.blanquette);

export type Mariage = {
  slug: string;
  numero: number;
  invites: number;
  menu: Menu;
  date: string;
  lieu: string;
  titre: string;
  transmis: string;
  photo: Photo;
  recit: string;
};

/** Chaque mariage devient une page. Des exemples : aucun vrai couple, aucune photo d'invités. */
export const MARIAGES: Mariage[] = [
  {
    slug: "100-invites", numero: 12, invites: 100, menu: menu("juin", PLATS_DE_FAMILLE.basquaise), date: "samedi 19 juin 2027", lieu: "une grange, au bord d'une rivière",
    titre: "100 invités, menu de juin", transmis: "Le poulet basquaise de Mamie Odette, écrit en 1975", photo: photos.basquaise,
    recit: "Cent invités, une grange, et une demande : que les assiettes arrivent toutes ensemble. Vingt maîtres d'hôtel, un signal du chef, cent assiettes posées en même temps — et dix secondes de silence.",
  },
  {
    slug: "140-invites", numero: 14, invites: 140, menu: menu("septembre", PLATS_DE_FAMILLE.couscous), date: "samedi 18 septembre 2027", lieu: "un jardin, sous une tente",
    titre: "140 invités, menu de septembre", transmis: "Le couscous de Baba Saïd, roulé à la main depuis 1971", photo: photos.couscous,
    recit: "Un mariage de fin d'été, sous une tente. La semoule roulée la veille, le bouillon servi à part, comme chez Baba Saïd.",
  },
  {
    slug: "60-invites", numero: 15, invites: 60, menu: menu("octobre", PLATS_DE_FAMILLE.potaufeu), date: "samedi 9 octobre 2027", lieu: "une salle de village",
    titre: "60 invités, menu d'octobre", transmis: "Le pot-au-feu de Pépé Marcel, depuis 1958", photo: photos.potAuFeu,
    recit: "Soixante invités, une seule grande table. Le pot-au-feu servi à l'assiette, la moutarde sur la table, la tarte découpée devant tout le monde.",
  },
];

// ---------- Le carrousel du premier écran ----------

export type PlatCarrousel = {
  id: string;
  nom: string;
  court: string;      // le nom sous la vignette, sur ordinateur
  carte: string;      // le menu où le site le sert
  legende: string;    // une phrase : la recette de famille, servie à beaucoup
  lien: string;       // la partie du site qui en parle
  libelleLien: string;
  photo: Photo;
  tel: string;        // cadrage sur téléphone (object-position)
  monteTel?: string;  // sur téléphone, la photo s'agrandit vers le haut d'autant : pour remonter un plat posé trop bas
  monteOrdi?: string; // la même chose sur ordinateur
  ordi: string;       // cadrage sur ordinateur
};

/**
 * Les plats que le site sert déjà, dans ses menus et ses pages de mariage. Les années et
 * les détails viennent des recettes et des menus ci-dessus : rien de nouveau n'est
 * affirmé ici.
 */
export const PLATS_CARROUSEL: PlatCarrousel[] = [
  {
    id: "pot-au-feu", nom: PLATS_DE_FAMILLE.potaufeu.nom, court: "Pot-au-feu", carte: "Menu d'octobre",
    legende: "La recette de Pépé Marcel, depuis 1958, servie à l'assiette à toute la tablée.",
    lien: `${DOSSIER}/mariages/60-invites`, libelleLien: "Voir ce mariage", photo: photos.potAuFeu, tel: "50% 50%", ordi: "50% 88%",
  },
  {
    id: "blanquette", nom: PLATS_DE_FAMILLE.blanquette.nom, court: "Blanquette", carte: "Menu de juin",
    legende: "La page de Mamie Jo, refaite en cuisine jusqu'à ce qu'elle dise « c'est ça ».",
    lien: `${DOSSIER}/de-la-recette-a-la-table`, libelleLien: "Le carnet d'essais", photo: photos.blanquette, tel: "40% 30%", ordi: "45% 48%",
  },
  {
    id: "couscous", nom: PLATS_DE_FAMILLE.couscous.nom, court: "Couscous", carte: "Menu de septembre",
    legende: "La semoule roulée à la main, comme chez Baba Saïd. Le bouillon servi à part.",
    lien: `${DOSSIER}/mariages/140-invites`, libelleLien: "Voir ce mariage", photo: photos.couscous, tel: "50% 45%", ordi: "50% 50%",
  },
  {
    id: "basquaise", nom: PLATS_DE_FAMILLE.basquaise.nom, court: "Basquaise", carte: "Menu de juin",
    legende: "La recette de Mamie Odette, écrite en 1975 : poivrons, tomates, piment doux.",
    lien: `${DOSSIER}/mariages/100-invites`, libelleLien: "Voir ce mariage", photo: photos.basquaise, tel: "50% 80%", ordi: "50% 75%", monteTel: "35%", monteOrdi: "60%",
  },
  {
    id: "tarte", nom: "La tarte fine aux pommes", court: "Tarte fine", carte: "Menu d'octobre · dessert",
    legende: "Pâte feuilletée, pommes du verger, caramel au beurre salé : découpée devant tout le monde.",
    lien: `${DOSSIER}/mariages/60-invites#menu`, libelleLien: "Voir ce menu", photo: photos.tarte, tel: "50% 50%", ordi: "50% 50%",
  },
];

// ---------- La dégustation ----------

export type Creneau = { id: string; jour: string; court: string; heure: string; pris?: boolean };

/** Les dégustations de mars 2027 (vérifiées : ce sont des samedis). « pris » : exemple. */
export const DEGUSTATIONS: Creneau[] = [
  { id: "6-mars-11h", jour: "Samedi 6 mars", court: "6 mars", heure: "11 h", pris: true },
  { id: "13-mars-11h", jour: "Samedi 13 mars", court: "13 mars", heure: "11 h" },
  { id: "13-mars-15h", jour: "Samedi 13 mars", court: "13 mars", heure: "15 h" },
  { id: "20-mars-11h", jour: "Samedi 20 mars", court: "20 mars", heure: "11 h", pris: true },
  { id: "27-mars-11h", jour: "Samedi 27 mars", court: "27 mars", heure: "11 h" },
  { id: "27-mars-15h", jour: "Samedi 27 mars", court: "27 mars", heure: "15 h" },
];

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  { q: "Le prix affiché, c'est vraiment le prix ?", r: "C'est le prix par personne, toutes taxes comprises, pour un menu complet : entrée, le plat de ta famille, dessert, service, vaisselle, eaux et café. Il baisse avec le nombre d'invités. Ce sont des prix d'exemple : l'entreprise est fictive." },
  { q: "Et si la recette n'a pas de quantités ?", r: "C'est presque toujours le cas. « Une bonne poignée », « cuire jusqu'à ce que ce soit bon » : on part de là, et les essais servent à retrouver le goût, pas à suivre la page à la lettre." },
  { q: "Et si la personne n'est plus là ?", r: "Alors c'est toi, ou quelqu'un qui se souvient du goût, qui viens valider. On peut aussi travailler à partir de souvenirs : la couleur de la sauce, ce qu'on mangeait avec." },
  { q: "Les allergies ?", r: "Chaque plat indique ses allergènes, parmi les quatorze que la réglementation européenne oblige à signaler. Avant la commande, on te demande les allergies et les régimes de tes invités, table par table. Une recette de famille peut s'adapter sans se trahir." },
  { q: "Ma recette a du vin dedans.", r: "On la cuisine sans : c'est la règle de la maison. Les essais servent aussi à ça, retrouver le goût autrement." },
  { q: "La dégustation est payante ?", r: "Elle est offerte pour deux (exemple). Tu goûtes ton menu et le dernier essai de ta recette, et on note ce qui change." },
  { q: "Vous gardez la recette ?", r: "Non. Elle est à ta famille. On la cuisine pour ton mariage, puis on te rend la page, et une fiche propre si tu veux la transmettre à ton tour." },
  { q: "La vidéo du mois, c'est obligatoire ?", r: "Non. On ne filme que des personnes qui le veulent, avec leur accord écrit. Ta recette peut rester secrète." },
];
