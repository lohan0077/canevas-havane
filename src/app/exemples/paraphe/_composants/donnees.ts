// Les données du site Paraphe : une librairie imaginaire où chaque livre en rayon a été
// lu par quelqu'un de la boutique, et porte son paraphe. Lecteurs, mots, prix (fixés
// par l'éditeur, d'exemple) : tout est inventé. Les livres sont des classiques du
// domaine public.

export const DOSSIER = "/exemples/paraphe";

export const entreprise = {
  nom: "Paraphe",
  telephone: "06 39 98 50 50", // tranche réservée par l'ARCEP aux œuvres de fiction
  adresse: "12 rue de l'Exemple",
  horaires: "Du mardi au samedi, 10 h – 19 h 30",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/envies`, libelle: "Les envies" },
  { href: `${DOSSIER}/club`, libelle: "Le club" },
  { href: `${DOSSIER}/commander`, libelle: "Commander" },
];

export const IMAGES = {
  lunettes: { src: "/exemples/paraphe/lunettes-livre.webp", largeur: 1200, hauteur: 800, alt: "Des lunettes et une feuille de ginkgo posées sur un livre ouvert" },
  vieux: { src: "/exemples/paraphe/vieux-livres.webp", largeur: 1000, hauteur: 1500, alt: "Une pile de vieux livres aux pages jaunies, sur un fond sombre" },
  rayon: { src: "/exemples/paraphe/rayon.webp", largeur: 1400, hauteur: 933, alt: "Un mur de livres rangés tranche vers l'intérieur : on ne voit que leurs pages" },
};

// Chaque lecteur a son paraphe : un trait de plume, tracé une fois pour toutes.
export const LECTEURS = {
  Margaux: { initiale: "M.", lit: "Les nouvelles qui font peur, les romans courts qui durent longtemps.", trait: "M 18 82 C 40 20, 70 18, 74 60 C 78 96, 52 104, 50 80 C 48 58, 96 40, 120 62 C 140 80, 150 30, 170 50 C 186 66, 196 74, 216 52 C 236 30, 262 40, 284 70" },
  Antoine: { initiale: "A.", lit: "Les contes philosophiques, les voyages, tout ce qui se lit en un trajet.", trait: "M 20 76 C 44 12, 70 12, 84 70 L 96 40 C 120 96, 150 20, 176 60 C 196 92, 236 88, 284 36" },
  Léa: { initiale: "L.", lit: "Les romans d'hiver, les amours difficiles, les pluies anglaises.", trait: "M 24 30 C 30 70, 30 96, 60 90 C 96 84, 100 44, 130 52 C 160 60, 150 96, 190 84 C 220 76, 240 50, 284 58" },
  Théo: { initiale: "T.", lit: "Les livres qui font rire en public. Et ceux qu'on lit à voix haute.", trait: "M 16 44 L 84 44 M 50 44 C 52 80, 60 96, 92 86 C 126 76, 130 40, 160 46 C 196 54, 190 92, 224 86 C 250 82, 262 60, 284 52" },
} as const;
export type NomLecteur = keyof typeof LECTEURS;

export type Livre = { id: string; titre: string; auteur: string; lecteur: NomLecteur; duree: string; prix: number; mot: string; couleur: string };
// Prix d'exemple, fixés par l'éditeur (loi n° 81-766) : les mêmes partout.
export const LIVRES: Livre[] = [
  { id: "candide", titre: "Candide", auteur: "Voltaire", lecteur: "Antoine", duree: "environ 3 heures", prix: 3.5, mot: "Ça se lit entre deux gares. Et ça fait rire jusqu'au terminus.", couleur: "#B04A15" },
  { id: "meaulnes", titre: "Le Grand Meaulnes", auteur: "Alain-Fournier", lecteur: "Léa", duree: "deux soirs", prix: 5.4, mot: "Pour ceux qui ont perdu quelque chose. On ne le retrouve pas, mais on n'est plus seul à chercher.", couleur: "#2B4C8C" },
  { id: "horla", titre: "Le Horla", auteur: "Guy de Maupassant", lecteur: "Margaux", duree: "une heure", prix: 2.9, mot: "Court, et ça fait peur. Il le finira.", couleur: "#23412F" },
  { id: "hurlevent", titre: "Les Hauts de Hurlevent", auteur: "Emily Brontë", lecteur: "Léa", duree: "un dimanche, et le suivant", prix: 7.2, mot: "Dehors il pleut. Dedans aussi. C'est exactement ce qu'il faut.", couleur: "#5E4B3E" },
  { id: "bateau", titre: "Trois Hommes dans un bateau", auteur: "Jerome K. Jerome", lecteur: "Théo", duree: "quelques trajets", prix: 6.5, mot: "Tu vas rire tout seul. Préviens tes voisins de banquette.", couleur: "#C99A2E" },
  { id: "tour", titre: "Le Tour du monde en quatre-vingts jours", auteur: "Jules Verne", lecteur: "Théo", duree: "dix soirs, un chapitre par soir", prix: 4.9, mot: "À lire à deux voix. Le pari tient jusqu'à la dernière page.", couleur: "#7A3B2E" },
];
export const livre = (id: string) => LIVRES.find((l) => l.id === id)!;

export type Envie = { id: string; libelle: string; livre: string };
export const ENVIES: Envie[] = [
  { id: "train", libelle: "Un train de 3 heures", livre: "candide" },
  { id: "chagrin", libelle: "Un chagrin", livre: "meaulnes" },
  { id: "pas-lire", libelle: "Quelqu'un qui dit qu'il n'aime pas lire", livre: "horla" },
  { id: "pluie", libelle: "Un dimanche de pluie", livre: "hurlevent" },
  { id: "rire", libelle: "Rire dans le métro", livre: "bateau" },
  { id: "enfant", libelle: "Un enfant de dix ans", livre: "tour" },
];

export const euros = (n: number) => `${n.toFixed(2).replace(".", ",")}\u00a0€`;

export const CLUB = { date: "Vendredi 6 novembre", heure: "19 h", places: "une vingtaine de chaises" };

export const QUESTIONS = [
  { q: "Vraiment tout est lu ?", r: "Tout ce qui est en rayon, oui : chaque livre a été lu par quelqu'un de la boutique, qui y a mis son paraphe. Ce qu'on n'a pas lu, on ne le met pas en rayon. Mais on le commande volontiers." },
  { q: "Et si je veux un livre que vous n'avez pas lu ?", r: "On le commande, à l'unité et sans frais de commande : c'est la loi, et c'est normal. Il ne portera pas de paraphe, et on te le dira." },
  { q: "Vos prix sont-ils plus chers ?", r: "Non. Le prix d'un livre neuf est fixé par l'éditeur (loi n° 81-766 du 10 août 1981) : c'est le même partout. On ne joue pas sur le prix, on joue sur la signature." },
  { q: "Vous expédiez ?", r: "Pour l'instant, on réserve en ligne et on retire en boutique : 0 € de port. Par la poste, la loi impose au moins 3 € de port sous 35 € de livres neufs." },
  { q: "Le club des livres pas finis, c'est quoi ?", r: "Une soirée gratuite. Chacun apporte le livre qu'il a lâché en route et raconte pourquoi. On ne vend rien ce soir-là, et on ne fait pas lire de force." },
];
