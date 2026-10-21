// Tout ce qu'affiche le site de Silence à Table, traiteur de mariage imaginaire.
// Entreprise fictive : chaque prix, chaque date, chaque mariage est un exemple, et le
// site le dit.
//
// Les règles tenues ici (voir Videos/agenda-traiteurs/SOURCES.md) :
//   - le prix est affiché par personne, TTC, et marqué « exemple » ;
//   - les allergènes (les 14 de l'annexe II du règlement UE n° 1169/2011) sont écrits
//     plat par plat, et demandés avant toute commande : pour une denrée non
//     préemballée, l'information se donne par écrit, sans que le client la demande
//     (décret n° 2015-447) ;
//   - aucune boisson alcoolisée : ni au menu, ni en photo, ni dans une recette ;
//   - les pages de mariage sont des exemples, sans nom ni photo de vrais mariés ;
//   - aucun avis, aucune note, aucune « dernière date disponible ».

export const DOSSIER = "/exemples/silence-a-table";

export const entreprise = {
  nom: "Silence à Table",
  telephone: "06 39 98 63 30",
  telephoneLien: "+33639986330",
  siret: "000 000 000 00000",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#invites`, libelle: "Le prix" },
  { href: `${DOSSIER}/mariages`, libelle: "Les mariages" },
  { href: `${DOSSIER}/degustation`, libelle: "Dégustation" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };

export const photos = {
  sauce: { src: `${DOSSIER}/sauce.webp`, largeur: 1400, hauteur: 1400, alt: "Les mains d'un chef versent une sauce sur une assiette dressée, dans la pénombre" },
  artichaut: { src: `${DOSSIER}/artichaut.webp`, largeur: 1200, hauteur: 800, alt: "Une assiette blanche d'artichauts rôtis et d'herbes, vue de dessus sur un fond bleu nuit" },
  poisson: { src: `${DOSSIER}/poisson.webp`, largeur: 1000, hauteur: 1500, alt: "Un filet de bar à la peau dorée sur un velouté vert, des courgettes et des pommes grenaille" },
  framboises: { src: `${DOSSIER}/framboises.webp`, largeur: 1200, hauteur: 800, alt: "Un crémeux rose entouré de framboises et de miettes de crumble, sur une assiette blanche" },
} satisfies Record<string, Photo>;

/** « 7 200 € » : espace fine insécable pour les milliers, insécable avant €. */
export const euros = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;

/** Le prix par personne selon le nombre d'invités. TTC, exemple. */
export const PALIERS = [
  { jusqua: 49, prix: 84 },
  { jusqua: 79, prix: 78 },
  { jusqua: 150, prix: 72 },
];
export const prixParPersonne = (invites: number) => (PALIERS.find((p) => invites <= p.jusqua) ?? PALIERS[PALIERS.length - 1]).prix;

/** Les 14 allergènes de l'annexe II du règlement (UE) n° 1169/2011. */
export const ALLERGENES = [
  "Gluten", "Crustacés", "Œufs", "Poissons", "Arachides", "Soja", "Lait",
  "Fruits à coque", "Céleri", "Moutarde", "Sésame", "Sulfites", "Lupin", "Mollusques",
];

export type Plat = { nom: string; detail: string; allergenes: string[] };
export type Menu = { id: string; saison: string; entree: Plat; plat: Plat; dessert: Plat };

export const MENUS: Record<string, Menu> = {
  juin: {
    id: "juin",
    saison: "Menu de juin",
    entree: { nom: "Petits pois, menthe et chèvre frais", detail: "Velouté froid, chèvre frais de la ferme, menthe du jardin.", allergenes: ["Lait"] },
    plat: { nom: "Volaille rôtie, jus court", detail: "Rôtie entière, découpée en salle. Pommes grenaille, carottes fanes.", allergenes: ["Lait", "Céleri"] },
    dessert: { nom: "Framboises, crémeux vanille", detail: "Crémeux à la vanille, framboises fraîches, crumble au beurre.", allergenes: ["Gluten", "Lait", "Œufs"] },
  },
  septembre: {
    id: "septembre",
    saison: "Menu de septembre",
    entree: { nom: "Tomates anciennes, burrata, basilic", detail: "Les dernières tomates de l'été, huile d'olive, fleur de sel.", allergenes: ["Lait"] },
    plat: { nom: "Bar, velouté de courgette", detail: "Bar rôti sur la peau, velouté de courgette, pommes grenaille.", allergenes: ["Poissons", "Lait"] },
    dessert: { nom: "Figues rôties, crème d'amande", detail: "Figues au miel, crème d'amande, tuile croustillante.", allergenes: ["Fruits à coque", "Lait", "Œufs", "Gluten"] },
  },
  octobre: {
    id: "octobre",
    saison: "Menu d'octobre",
    entree: { nom: "Artichauts rôtis, herbes", detail: "Artichauts violets rôtis, citron, herbes fraîches.", allergenes: [] },
    plat: { nom: "Joue de bœuf confite, céleri", detail: "Confite sept heures dans son jus, purée de céleri.", allergenes: ["Céleri", "Lait"] },
    dessert: { nom: "Tarte fine aux pommes", detail: "Pâte feuilletée, pommes du verger, caramel au beurre salé.", allergenes: ["Gluten", "Lait", "Œufs"] },
  },
};

/** Ce que comprend le prix par personne. Exemple. */
export const COMPRIS = [
  "Entrée, plat, dessert",
  "Le service à l'assiette, maîtres d'hôtel compris",
  "La vaisselle, le nappage, la mise en place",
  "Les eaux, la citronnade maison, le café",
  "Le chef en cuisine, sur place",
];

export type Mariage = {
  slug: string;
  numero: number;
  invites: number;
  menu: string;
  date: string;
  lieu: string;
  titre: string;
  photo: Photo;
  recit: string;
};

/** Chaque mariage devient une page. Des exemples : aucun vrai couple, aucune photo d'invités. */
export const MARIAGES: Mariage[] = [
  {
    slug: "100-invites", numero: 12, invites: 100, menu: "juin", date: "samedi 19 juin 2027", lieu: "une grange, au bord d'une rivière",
    titre: "100 invités, menu de juin", photo: photos.framboises,
    recit: "Cent invités, une grange, et une demande : que les assiettes arrivent toutes ensemble. Vingt maîtres d'hôtel, un signal du chef, cent assiettes posées en même temps.",
  },
  {
    slug: "140-invites", numero: 14, invites: 140, menu: "septembre", date: "samedi 18 septembre 2027", lieu: "un jardin, sous une tente",
    titre: "140 invités, menu de septembre", photo: photos.poisson,
    recit: "Un mariage de fin d'été, sous une tente. Le bar cuit à la minute dans la cuisine montée derrière, le velouté servi tiède.",
  },
  {
    slug: "60-invites", numero: 15, invites: 60, menu: "octobre", date: "samedi 9 octobre 2027", lieu: "une salle de village",
    titre: "60 invités, menu d'octobre", photo: photos.artichaut,
    recit: "Soixante invités, une seule grande table. La joue de bœuf servie à l'assiette, la tarte découpée devant tout le monde.",
  },
];

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

export const METHODE = [
  { titre: "Le prix, d'abord", texte: "Par personne, toutes taxes comprises, sur la page. Pas de « sur devis » pour savoir si tu peux te le permettre." },
  { titre: "La dégustation", texte: "Tu viens goûter ton menu, à deux, un samedi. On note ce qui change." },
  { titre: "Les allergies", texte: "Avant la commande, on te demande les allergies et les régimes de chaque table. Chaque plat dit ce qu'il contient." },
  { titre: "Le jour J", texte: "Les assiettes partent toutes ensemble, au signal du chef. Et pendant dix secondes, plus personne ne parle." },
];

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  { q: "Le prix affiché, c'est vraiment le prix ?", r: "C'est le prix par personne, toutes taxes comprises, pour le menu montré : entrée, plat, dessert, service, vaisselle, eaux et café. Il baisse avec le nombre d'invités. Ce sont des prix d'exemple : l'entreprise est fictive." },
  { q: "Et les allergies ?", r: "Chaque plat indique ses allergènes, parmi les quatorze que la réglementation européenne oblige à signaler. Avant la commande, on te demande les allergies et les régimes de tes invités, table par table, et on adapte les assiettes." },
  { q: "Les boissons sont comprises ?", r: "Les eaux plates et gazeuses, la citronnade maison et le café, oui. Elles sont dans le prix par personne." },
  { q: "Combien de temps avant faut-il réserver ?", r: "Le plus tôt possible pour un samedi de juin. Commence par la dégustation : elle se réserve en ligne, et la date du mariage se cale le même jour." },
  { q: "La dégustation est payante ?", r: "Elle est offerte pour deux (exemple). Tu goûtes le menu que tu as choisi, et on note ce qui change." },
];
