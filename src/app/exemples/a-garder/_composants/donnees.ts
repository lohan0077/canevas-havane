// Les données d'À Garder, l'imprimerie imaginée pour les deux vidéos des imprimeurs :
// « Créer une marque » (on n'imprime que ce qu'on garde, le papier par la poste avant
// la commande, les menus du restaurant d'en face) et « Remplir l'agenda » (l'enseigne
// posée sur la photo de la façade, avant / après, le dossier en mairie préparé).
// Tout est inventé : adresse, prix (TTC pour les particuliers, HT pour les commerces,
// et c'est dit), prénoms des faire-part. Aucun commerce réel n'est nommé : les façades
// portent un nom de métier.

export const DOSSIER = "/exemples/a-garder";

export const atelier = {
  nom: "À Garder",
  telephone: "01 99 00 63 18",
  telephoneLien: "+33199006318",
  adresse: ["Atelier · 12 rue de l'Exemple", "00000 Ville-Exemple"],
  siret: "000 000 000 00000",
  horaires: "Du mardi au samedi, 10 h – 18 h",
  zone: "Enseignes posées dans un rayon de 40 km autour de l'atelier",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/ce-qu-on-imprime`, libelle: "Ce qu'on imprime" },
  { href: `${DOSSIER}/echantillons`, libelle: "Les échantillons" },
  { href: `${DOSSIER}/enseignes`, libelle: "Les enseignes" },
  { href: `${DOSSIER}/dossier`, libelle: "Le dossier en mairie" },
];

export type Photo = { src: string; alt: string; largeur: number; hauteur: number };

const P = DOSSIER;
export const photos = {
  cartes: { src: `${P}/cartes.webp`, alt: "Trois cartes de papier fait main, blanc, ivoire et rose poudré, aux bords déchirés", largeur: 1400, hauteur: 934 },
  casse: { src: `${P}/casse.webp`, alt: "Casse d'imprimeur en bois remplie de caractères en plomb", largeur: 1000, hauteur: 1333 },
  enveloppe: { src: `${P}/enveloppe.webp`, alt: "Une carte blanche posée sur une enveloppe kraft", largeur: 1400, hauteur: 933 },
  papiers: { src: `${P}/papiers.webp`, alt: "Feuilles de papier kraft et gris qui se chevauchent", largeur: 1000, hauteur: 1332 },
  ampoules: { src: `${P}/ampoules.webp`, alt: "Ampoules à filament allumées, suspendues dans la pénombre", largeur: 1000, hauteur: 1500 },
  atelier: { src: `${P}/atelier-lampe.webp`, alt: "Établi d'atelier en métal, outils posés sous une lampe articulée", largeur: 1400, hauteur: 933 },
  soudure: { src: `${P}/soudure.webp`, alt: "Deux mains soudent une petite carte électronique au fer à souder", largeur: 1200, hauteur: 800 },
} satisfies Record<string, Photo>;

/* ---------- Le papier ---------- */

/** Les quatre papiers de la boîte d'échantillons (les grammages de la vidéo). */
export const PAPIERS = [
  { id: "coton", nom: "Coton", grammage: "600 g", texte: "Épais, doux, un peu de relief : le papier des faire-part qu'on encadre.", usage: "Faire-part, cartes de vœux" },
  { id: "verge", nom: "Vergé", grammage: "300 g", texte: "Les fines lignes du tamis, visibles à contre-jour. Le papier des lettres qu'on relit.", usage: "Menus, cartes de remerciement" },
  { id: "kraft", nom: "Kraft", grammage: "350 g", texte: "Brun, mat, solide. Il se patine un peu sur le frigo, et c'est très bien.", usage: "Cartes à aimanter, étiquettes" },
  { id: "couche", nom: "Couché mat", grammage: "400 g", texte: "Lisse, des couleurs franches, un toucher velouté. Pour les photos et les dessins.", usage: "Cartes postales, dessins d'enfants" },
] as const;

export type IdPapier = (typeof PAPIERS)[number]["id"];

/** Ce qui finit sur le frigo : les quatre objets de la vidéo. Prix TTC d'exemple. */
export const OBJETS = [
  { id: "faire-part", genre: "Faire-part", titre: "Léa & Tom", sous: "se marient le 12 juin", papier: "Coton 600 g, enveloppe kraft", prix: "50 faire-part : 189 € TTC" },
  { id: "menu", genre: "Menu de fête", titre: "Réveillon", sous: "chez Mamie Jo", papier: "Vergé 300 g, plié en deux", prix: "20 menus : 59 € TTC" },
  { id: "carte", genre: "Carte postale", titre: "Bons baisers", sous: "de Saint-Malo", papier: "Couché mat 400 g", prix: "30 cartes : 45 € TTC" },
  { id: "dessin", genre: "Dessin d'enfant", titre: "Pour papa", sous: "imprimé tel quel", papier: "Kraft 350 g, coins arrondis", prix: "10 tirages : 25 € TTC" },
];

/** Du papier au frigo : les quatre temps d'une commande. */
export const etapesPapier = [
  { titre: "Tu reçois le papier", moment: "Avant de commander", texte: "Quatre papiers dans une enveloppe, par la poste, offerts. Tu touches, tu compares, à la lumière de chez toi.", photo: "enveloppe" as const },
  { titre: "On fait la maquette", moment: "À l'atelier", texte: "Ton texte, tes dessins, mis en page à l'atelier. Tu valides un bon à tirer : rien ne part avant.", photo: "cartes" as const },
  { titre: "On imprime", moment: "En petite série", texte: "Sur le papier que tu as choisi. Presse typographique pour les faire-part, et chaque feuille regardée à la main.", photo: "casse" as const },
  { titre: "Tu le gardes", moment: "Des années", texte: "Livré dans une boîte qui se garde aussi. Le reste, c'est le frigo qui s'en occupe.", photo: "papiers" as const },
];

/* ---------- Les enseignes ---------- */

/** Ce que l'atelier fabrique pour les commerces. Prix HT d'exemple : la clientèle est professionnelle. */
export const enseignes = [
  { id: "boitier", nom: "Lettres boîtier rétroéclairées", texte: "Chaque lettre est une boîte en aluminium ; la lumière part vers le mur et dessine un halo autour d'elle.", prix: "à partir de 2 400 € HT", lumineuse: true },
  { id: "caisson", nom: "Caisson lumineux", texte: "Un panneau éclairé de l'intérieur, sur toute la longueur du bandeau. Lisible de loin, simple à changer.", prix: "à partir de 1 300 € HT", lumineuse: true },
  { id: "drapeau", nom: "Enseigne drapeau", texte: "Perpendiculaire à la façade : on la voit en remontant la rue, avant même d'être devant la vitrine.", prix: "à partir de 690 € HT", lumineuse: true },
  { id: "decoupees", nom: "Lettres découpées", texte: "Bois, laiton ou aluminium, fixées à distance du mur. Éclairées par deux projecteurs, ou pas du tout.", prix: "à partir de 890 € HT", lumineuse: false },
  { id: "vitrophanie", nom: "Vitrophanie", texte: "Les horaires, le métier, un dessin : des adhésifs découpés, posés sur la vitrine, sans percer.", prix: "à partir de 180 € HT", lumineuse: false },
];

/** De la photo au premier soir. */
export const etapesEnseigne = [
  { titre: "Tu envoies ta façade", texte: "Une photo, prise du trottoir d'en face, de jour. Toute la largeur de la boutique, le bandeau compris." },
  { titre: "Tu reçois le montage", texte: "Ta façade avec ton enseigne posée dessus, avant et après, de jour et le soir. Offert, que tu commandes ou non." },
  { titre: "On prépare le dossier", texte: "Quand l'enseigne doit être autorisée, on monte les pièces de la demande. Tu signes, tu déposes en mairie." },
  { titre: "On fabrique, on pose", texte: "À l'atelier, puis chez toi, par ceux qui l'ont fabriquée. Et on l'allume avec toi, le premier soir." },
];

/* ---------- Les questions ---------- */

export const questions = [
  { question: "Les échantillons sont-ils vraiment gratuits ?", reponse: "Oui : l'enveloppe part par la poste, offerte, que tu commandes ensuite ou non. Une enveloppe par foyer, simplement pour que tout le monde en profite." },
  { question: "Vous imprimez des flyers ?", reponse: "Non, et c'est voulu. On n'imprime que ce qu'on garde : faire-part, menus, cartes, dessins — et les enseignes, qu'une boutique garde des années. D'autres imprimeurs font très bien les flyers." },
  { question: "Je peux envoyer mon propre dessin ?", reponse: "Oui, en photo ou scanné. On le prépare pour l'impression et tu valides le bon à tirer avant qu'on imprime." },
  { question: "Combien de temps entre la commande et la livraison ?", reponse: "Comptez deux semaines pour des faire-part, maquette comprise. On te donne une date ferme au moment du bon à tirer." },
  { question: "Le montage de ma façade est-il gratuit ?", reponse: "Oui, il est offert, que tu commandes l'enseigne ou non. Il te sert à choisir, et il sert au dossier si l'enseigne doit être autorisée." },
  { question: "Faut-il une autorisation pour poser une enseigne ?", reponse: "Pas partout. L'installation d'une enseigne est soumise à autorisation sur certains immeubles et dans certains lieux (abords d'un monument historique, site patrimonial remarquable, site classé ou inscrit…), et dans les communes couvertes par un règlement local de publicité (Code de l'environnement, art. L. 581-18). On vérifie pour ton adresse avant de dessiner." },
  { question: "Mon enseigne peut-elle clignoter ?", reponse: "Non. Les enseignes clignotantes sont interdites, sauf pour les pharmacies et les services d'urgence (art. R. 581-59). Les nôtres s'allument doucement et restent allumées — et s'éteignent entre 1 h et 6 h quand la boutique est fermée, sauf règle locale." },
  { question: "Pourquoi certains prix sont-ils hors taxes ?", reponse: "Les faire-part, menus de fête et cartes sont affichés TTC : ils sont pour les particuliers. Les enseignes et les menus de restaurant sont affichés HT : ils sont pour des commerces, qui raisonnent hors taxes. Tous les prix du site sont des exemples." },
];
