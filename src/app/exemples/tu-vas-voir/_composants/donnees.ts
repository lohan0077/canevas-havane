// Les données du site Tu Vas Voir : une librairie indépendante imaginaire. Les
// libraires, leurs conseils, les prix (d'exemple, fixés par l'éditeur) : tout est
// inventé. Les livres cités sont des classiques du domaine public.

export const DOSSIER = "/exemples/tu-vas-voir";

export const entreprise = {
  nom: "Tu Vas Voir",
  telephone: "01 99 00 11 20", // tranche réservée par l'ARCEP aux œuvres de fiction
  adresse: "12 rue de l'Exemple",
  horaires: "Du mardi au samedi, 10 h – 19 h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#conseil`, libelle: "Un conseil" },
  { href: `${DOSSIER}/conseils`, libelle: "Les conseils" },
  { href: `${DOSSIER}/commander`, libelle: "Commander" },
  { href: `${DOSSIER}#venir`, libelle: "Venir" },
];

export const IMAGES = {
  annotes: { src: "/exemples/tu-vas-voir/livres-annotes.webp", largeur: 1400, hauteur: 935, alt: "Une pile de livres hérissée de marque-pages en papier de couleur" },
  pile: { src: "/exemples/tu-vas-voir/pile-couleurs.webp", largeur: 1200, hauteur: 798, alt: "Une pile de livres reliés aux tranches de couleur, sur un fond gris" },
  plaid: { src: "/exemples/tu-vas-voir/lecture-plaid.webp", largeur: 1200, hauteur: 800, alt: "Deux mains tiennent un livre ouvert, sur un plaid aux motifs orange" },
};

export type Libraire = { prenom: string; lit: string; couleur: string };
export const LIBRAIRES: Libraire[] = [
  { prenom: "Margaux", lit: "Les romans d'aventure, les vengeances, les polars d'avant les polars.", couleur: "#2340C8" },
  { prenom: "Julien", lit: "Les classiques anglais, les lettres, les romans où l'on se marie à la fin.", couleur: "#C8402A" },
  { prenom: "Inès", lit: "Hugo, Balzac, Stendhal. Les gros livres qui tiennent un hiver.", couleur: "#1F7A4D" },
  { prenom: "Sam", lit: "Les énigmes, les trésors, les gentlemen cambrioleurs. Dès douze ans, et après.", couleur: "#8A4FBF" },
];

export type Livre = { id: string; titre: string; auteur: string; prix: number; couleur: string };
// Prix d'exemple, fixés par l'éditeur (loi n° 81-766) : les mêmes partout.
export const LIVRES: Livre[] = [
  { id: "mousquetaires", titre: "Les Trois Mousquetaires", auteur: "Alexandre Dumas", prix: 9.9, couleur: "#8C2F39" },
  { id: "bossu", titre: "Le Bossu", auteur: "Paul Féval", prix: 8.5, couleur: "#1F4A3A" },
  { id: "scaramouche", titre: "Scaramouche", auteur: "Rafael Sabatini", prix: 9.2, couleur: "#C9A86A" },
  { id: "raison", titre: "Raison et Sentiments", auteur: "Jane Austen", prix: 7.9, couleur: "#7FA7C9" },
  { id: "eyre", titre: "Jane Eyre", auteur: "Charlotte Brontë", prix: 8.9, couleur: "#5B3A6E" },
  { id: "middlemarch", titre: "Middlemarch", auteur: "George Eliot", prix: 12.5, couleur: "#2F5B7A" },
  { id: "notre-dame", titre: "Notre-Dame de Paris", auteur: "Victor Hugo", prix: 8.9, couleur: "#3B3B3B" },
  { id: "rouge", titre: "Le Rouge et le Noir", auteur: "Stendhal", prix: 7.5, couleur: "#B3261E" },
  { id: "chagrin", titre: "La Peau de chagrin", auteur: "Honoré de Balzac", prix: 5.9, couleur: "#A0703C" },
  { id: "chambre", titre: "Le Mystère de la chambre jaune", auteur: "Gaston Leroux", prix: 6.9, couleur: "#D9A400" },
  { id: "lupin", titre: "Arsène Lupin, gentleman cambrioleur", auteur: "Maurice Leblanc", prix: 5.9, couleur: "#16130F" },
  { id: "tresor", titre: "L'Île au trésor", auteur: "Robert Louis Stevenson", prix: 5.9, couleur: "#2F7A6B" },
];
export const livre = (id: string) => LIVRES.find((l) => l.id === id)!;

export type Conseil = { pour: string; alias: string[]; libraire: string; livres: string[]; mot: string; page: number };
// Les conseils déjà écrits, à la main, par les libraires : on ne conseille que ce qu'on a lu.
export const CONSEILS: Conseil[] = [
  { pour: "Le Comte de Monte-Cristo", alias: ["monte-cristo", "monte cristo", "comte de monte"], libraire: "Margaux", livres: ["mousquetaires", "bossu", "scaramouche"], mot: "Tu as aimé la vengeance qui prend son temps. Ces trois-là savent attendre aussi.", page: 112 },
  { pour: "Orgueil et Préjugés", alias: ["orgueil", "prejuges"], libraire: "Julien", livres: ["raison", "eyre", "middlemarch"], mot: "Des héroïnes qui ont raison avant tout le monde. Commence par Jane Eyre.", page: 87 },
  { pour: "Les Misérables", alias: ["miserables"], libraire: "Inès", livres: ["notre-dame", "rouge", "chagrin"], mot: "Après Hugo, il faut encore du grand. Mais pas trop long tout de suite.", page: 64 },
  { pour: "Le Chien des Baskerville", alias: ["baskerville", "sherlock", "holmes"], libraire: "Sam", livres: ["chambre", "lupin", "tresor"], mot: "Une chambre fermée, un gentleman, un trésor. Dans cet ordre.", page: 41 },
];

const sansAccents = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, " ").replace(/\s+/g, " ").trim();
export function trouverConseil(saisie: string) {
  const s = sansAccents(saisie);
  if (s.length < 3) return undefined;
  return CONSEILS.find((c) => sansAccents(c.pour).includes(s) || s.includes(sansAccents(c.pour)) || c.alias.some((a) => s.includes(sansAccents(a))));
}

export const euros = (n: number) => `${n.toFixed(2).replace(".", ",")}\u00a0€`;

export const JOURS = ["mercredi", "jeudi", "vendredi", "samedi"];

export const RENCONTRES = [
  { date: "Jeudi 22 octobre", heure: "19 h", titre: "Les livres qu'on n'a pas osé conseiller", texte: "Chaque libraire défend le livre qu'il aime et que personne ne lui demande." },
  { date: "Samedi 7 novembre", heure: "11 h", titre: "Lecture à voix haute, dès huit ans", texte: "Sam lit le premier chapitre de L'Île au trésor. On s'arrête au meilleur moment." },
];

export const QUESTIONS = [
  { q: "Qui répond, vraiment ?", r: "Un des quatre libraires de la boutique, avec son prénom. Les conseils sont écrits à la main, à partir de livres qu'on a lus. Pas d'algorithme, pas de « les clients ont aussi acheté »." },
  { q: "Le prix est-il le même qu'ailleurs ?", r: "Oui. En France, le prix d'un livre neuf est fixé par l'éditeur ou l'importateur (loi n° 81-766 du 10 août 1981) : c'est le même en librairie, en grande surface ou en ligne, à 5 % près au plus." },
  { q: "Pourquoi le port n'est-il jamais offert ?", r: "Parce que la loi l'interdit pour les livres neufs : 3 € au moins pour une commande de moins de 35 €, et plus que zéro au-delà (arrêté du 4 avril 2023). La seule façon de ne rien payer de port : retirer ton livre en boutique." },
  { q: "Vous pouvez commander un livre que vous n'avez pas ?", r: "Oui, n'importe quel livre disponible chez son éditeur, à l'unité et sans frais de commande : c'est la loi, et c'est notre métier. Compte quelques jours." },
  { q: "Combien de temps un livre réservé m'attend-il ?", r: "Une semaine, dans un casier à ton prénom, avec le marque-page du libraire dedans. Tu paies en boutique, au prix de l'éditeur." },
];
