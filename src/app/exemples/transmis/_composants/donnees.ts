// Tout ce qu'affiche le site de Transmis, maison de traiteur imaginaire qui sert la
// recette de ta famille à cent vingt. Entreprise fictive : chaque prix, chaque date,
// chaque personne (Mamie Jo, Léa) est un exemple, et le site le dit.
//
// Les règles tenues ici (voir Videos/marque-traiteurs/SOURCES.md) :
//   - prix TTC par personne, marqués « exemple » ;
//   - allergènes : écrits pour chaque plat et demandés avant toute commande (14 de
//     l'annexe II du règlement UE n° 1169/2011, décret n° 2015-447) ;
//   - aucune boisson alcoolisée, ni au menu, ni dans une recette (la blanquette se fait
//     ici sans vin), ni en photo ;
//   - la carte de table ne dit que l'histoire vraie du client : le site le rappelle ;
//   - les vidéos de grands-mères : avec leur accord écrit, et le site le dit ;
//   - la photo envoyée reste dans le navigateur : rien n'est envoyé.

export const DOSSIER = "/exemples/transmis";

export const entreprise = {
  nom: "Transmis",
  telephone: "06 39 98 70 25",
  telephoneLien: "+33639987025",
  siret: "000 000 000 00000",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#recette`, libelle: "Ma recette" },
  { href: `${DOSSIER}/de-la-recette-a-la-table`, libelle: "De la recette à la table" },
  { href: `${DOSSIER}/carte-de-table`, libelle: "La carte de table" },
  { href: `${DOSSIER}/prix`, libelle: "Le prix" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };

export const photos = {
  papier: { src: `${DOSSIER}/papier.webp`, largeur: 1300, hauteur: 867, alt: "De vieilles pages écrites à la main, à l'encre, sur un papier jauni" },
  mains: { src: `${DOSSIER}/mains.webp`, largeur: 1100, hauteur: 1650, alt: "Les mains âgées d'une cuisinière remuent une casserole avec une cuillère en bois" },
  ragout: { src: `${DOSSIER}/ragout.webp`, largeur: 1100, hauteur: 1649, alt: "Un plat mijoté de viande, de carottes et d'herbes dans un bol blanc, vu de dessus" },
} satisfies Record<string, Photo>;

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
  { titre: "Tu envoies la page", texte: "En photo, telle qu'elle est : tachée, raturée, avec les quantités « à l'œil ». C'est elle qu'on veut." },
  { titre: "On la refait en cuisine", texte: "Une fois, deux fois, trois s'il le faut. On note ce qui change, on t'envoie chaque essai." },
  { titre: "Tu viens goûter", texte: "Avec la personne qui te l'a transmise, si elle le peut. C'est elle qui valide, pas nous." },
  { titre: "On la sert à 120", texte: "Le jour J, le plat de ta famille, et sur chaque table, une carte qui raconte d'où il vient." },
];

export type Essai = { numero: number; date: string; note: string };

/** Le carnet d'essais de la blanquette de Mamie Jo. Exemple. */
export const ESSAIS: Essai[] = [
  { numero: 1, date: "6 mars", note: "« Trop salé. Et elle mettait plus de carottes. »" },
  { numero: 2, date: "13 mars", note: "« La sauce est trop épaisse. Un peu plus de citron. »" },
  { numero: 3, date: "20 mars", note: "« Là, on y est presque. Goûte, toi. »" },
];

/** Le prix par personne selon le nombre d'invités. TTC, exemple. */
export const PALIERS_PRIX = [
  { jusqua: 60, titre: "Une petite tablée", prix: "74 € TTC par personne, jusqu'à 60 invités · exemple", detail: "Entrée, le plat de ta famille, dessert, service, vaisselle, eaux et café." },
  { jusqua: 120, titre: "Un mariage", prix: "68 € TTC par personne, de 70 à 120 invités · exemple", detail: "Entrée, le plat de ta famille, dessert, service, vaisselle, eaux et café." },
  { jusqua: 200, titre: "Une grande fête", prix: "64 € TTC par personne, de 130 à 200 invités · exemple", detail: "Entrée, le plat de ta famille, dessert, service, vaisselle, eaux et café." },
];

export const COMPRIS = [
  "Les essais en cuisine, autant qu'il en faut",
  "La dégustation, à deux ou à trois",
  "Entrée, le plat de ta famille, dessert",
  "Le service, la vaisselle, le nappage",
  "Les eaux, la citronnade maison, le café",
  "Une carte sur chaque table",
];

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  { q: "Et si la recette n'a pas de quantités ?", r: "C'est presque toujours le cas. « Une bonne poignée », « cuire jusqu'à ce que ce soit bon » : on part de là, et les essais servent à retrouver le goût, pas à suivre la page à la lettre." },
  { q: "Et si la personne n'est plus là ?", r: "Alors c'est toi, ou quelqu'un qui se souvient du goût, qui viens valider. On peut aussi travailler à partir de souvenirs : la couleur de la sauce, ce qu'on mangeait avec." },
  { q: "Les allergies ?", r: "On note les allergènes de ta recette dès le premier essai, et on te demande les allergies et les régimes de tes invités avant la commande. Une recette de famille peut s'adapter sans se trahir." },
  { q: "Ma recette a du vin dedans.", r: "On la cuisine sans : c'est la règle de la maison. Les essais servent aussi à ça, retrouver le goût autrement." },
  { q: "Vous gardez la recette ?", r: "Non. Elle est à ta famille. On la cuisine pour ton mariage, puis on te rend la page, et une fiche propre si tu veux la transmettre à ton tour." },
  { q: "La vidéo du mois, c'est obligatoire ?", r: "Non. On ne filme que des personnes qui le veulent, avec leur accord écrit. Ta recette peut rester secrète." },
];
