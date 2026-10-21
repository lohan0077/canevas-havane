// Les données d'À Garder, l'imprimerie imaginée dans la vidéo « Si je devais créer une
// imprimerie de zéro ». Tout est inventé : adresse, prix (TTC pour les particuliers,
// HT pour les restaurateurs, et c'est dit), prénoms sur les faire-part d'exemple.

export const DOSSIER = "/exemples/a-garder";

export const atelier = {
  nom: "À Garder",
  telephone: "01 99 00 63 18",
  telephoneLien: "+33199006318",
  adresse: ["Atelier · 12 rue de l'Exemple", "00000 Ville-Exemple"],
  siret: "000 000 000 00000",
  horaires: "Du mardi au samedi, 10 h – 18 h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/ce-qu-on-imprime`, libelle: "Ce qu'on imprime" },
  { href: `${DOSSIER}/echantillons`, libelle: "Les échantillons" },
  { href: `${DOSSIER}#atelier`, libelle: "L'atelier" },
];

export type Photo = { src: string; alt: string; largeur: number; hauteur: number };

export const photos = {
  cartes: { src: "/exemples/a-garder/cartes.webp", alt: "Trois cartes de papier fait main, blanc, ivoire et rose poudré, aux bords déchirés", largeur: 1400, hauteur: 934 },
  casse: { src: "/exemples/a-garder/casse.webp", alt: "Casse d'imprimeur en bois remplie de caractères en plomb", largeur: 1000, hauteur: 1333 },
  enveloppe: { src: "/exemples/a-garder/enveloppe.webp", alt: "Une carte blanche posée sur une enveloppe kraft", largeur: 1400, hauteur: 933 },
  papiers: { src: "/exemples/a-garder/papiers.webp", alt: "Feuilles de papier kraft et gris qui se chevauchent", largeur: 1000, hauteur: 1332 },
} satisfies Record<string, Photo>;

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
  { id: "faire-part", genre: "Faire-part", titre: "Léa & Tom", sous: "se marient le 12 juin", papier: "Coton 600 g, enveloppe kraft", prix: "50 faire-part : 189\u00A0€ TTC" },
  { id: "menu", genre: "Menu de fête", titre: "Réveillon", sous: "chez Mamie Jo", papier: "Vergé 300 g, plié en deux", prix: "20 menus : 59\u00A0€ TTC" },
  { id: "carte", genre: "Carte postale", titre: "Bons baisers", sous: "de Saint-Malo", papier: "Couché mat 400 g", prix: "30 cartes : 45\u00A0€ TTC" },
  { id: "dessin", genre: "Dessin d'enfant", titre: "Pour papa", sous: "imprimé tel quel", papier: "Kraft 350 g, coins arrondis", prix: "10 tirages : 25\u00A0€ TTC" },
];

export const etapes = [
  { titre: "Tu reçois le papier", texte: "Quatre papiers dans une enveloppe, par la poste, offerts. Tu touches, tu compares, à la lumière de chez toi." },
  { titre: "On fait la maquette", texte: "Ton texte, tes dessins, mis en page à l'atelier. Tu valides un bon à tirer, rien ne part avant." },
  { titre: "On imprime", texte: "Sur le papier que tu as choisi, en petite série. On vérifie chaque feuille à la main." },
  { titre: "Tu le gardes", texte: "Livré dans une boîte qui se garde aussi. Le reste, c'est le frigo qui s'en occupe." },
];

export const questions = [
  { question: "Les échantillons sont-ils vraiment gratuits\u00A0?", reponse: "Oui : la boîte part par la poste, offerte, que tu commandes ensuite ou non. Une boîte par foyer, simplement pour que tout le monde en profite." },
  { question: "Vous imprimez des flyers\u00A0?", reponse: "Non, et c'est voulu. On n'imprime que ce qu'on garde : faire-part, menus, cartes, dessins. D'autres imprimeurs font très bien les flyers." },
  { question: "Je peux envoyer mon propre dessin\u00A0?", reponse: "Oui, en photo ou scanné. On le prépare pour l'impression et tu valides le bon à tirer avant qu'on imprime." },
  { question: "Combien de temps entre la commande et la livraison\u00A0?", reponse: "Comptez deux semaines pour des faire-part, maquette comprise. On te donne une date ferme au moment du bon à tirer." },
  { question: "Et pour un restaurant\u00A0?", reponse: "On imprime les menus des restaurateurs, avec des prix hors taxes. Le contenu du menu — plats, prix, mentions — reste celui du restaurant : nous, on l'imprime." },
];
