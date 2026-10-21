// Les données du site Tour du Quartier : un magasin de vélos imaginaire pour celles et
// ceux qui n'ont pas pédalé depuis longtemps. Prénoms, prix, dates : tout est inventé.

export const DOSSIER = "/exemples/tour-du-quartier";

export const entreprise = {
  nom: "Tour du Quartier",
  telephone: "06 39 98 15 15", // tranche réservée par l'ARCEP aux œuvres de fiction
  adresse: "12 rue de l'Exemple",
  horaires: "Du mardi au samedi, 10 h – 19 h · le dimanche matin pour les premières heures",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#depuis`, libelle: "Depuis combien ?" },
  { href: `${DOSSIER}/premiere-heure`, libelle: "La première heure" },
  { href: `${DOSSIER}/course-de-lenteur`, libelle: "La course de lenteur" },
];

export const IMAGES = {
  mur: { src: "/exemples/tour-du-quartier/velo-mur-jaune.webp", largeur: 1200, hauteur: 752, alt: "Un vieux vélo à panier, appuyé contre un mur jaune" },
  parking: { src: "/exemples/tour-du-quartier/parking.webp", largeur: 1200, hauteur: 800, alt: "Un grand parking vide au soleil, bordé d'arbres" },
  rue: { src: "/exemples/tour-du-quartier/rue-calme.webp", largeur: 1000, hauteur: 628, alt: "Une allée tranquille sous une voûte d'arbres" },
  arbre: { src: "/exemples/tour-du-quartier/velo-arbre.webp", largeur: 1200, hauteur: 800, alt: "Un vélo de ville posé contre un arbre, au bord de l'eau" },
};

export type Reponse = { titre: string; texte: string; ou: string; duree: string; avec: string };

/** Ce que le magasin propose, selon le temps passé sans pédaler. */
export function repondre(ans: number, jamais: boolean): Reponse {
  if (jamais) return { titre: "Jamais appris ? Très bien.", texte: "On commence par l'équilibre, sur un vélo sans pédales à ta taille. Personne ne regarde, le parking est à nous.", ou: "Sur le parking", duree: "Une heure", avec: "Paul" };
  if (ans <= 1) return { titre: `${ans} an ? Tu n'as presque pas arrêté.`, texte: "On règle ton vélo, ou on t'en prête un, et on fait un tour du quartier ensemble.", ou: "Le tour du quartier", duree: "Trente minutes", avec: "Malo" };
  if (ans <= 5) return { titre: `${ans} ans ? Ça revient vite.`, texte: "Dix minutes sur le parking pour retrouver les freins, puis la rue calme derrière le magasin.", ou: "Le parking, puis la rue calme", duree: "Quarante-cinq minutes", avec: "Inès" };
  if (ans <= 14) return { titre: `${ans} ans ? On prend le temps.`, texte: "On commence sur le parking, et on ne sort dans la rue calme que quand tu le décides.", ou: "Sur le parking", duree: "Une heure", avec: "Inès" };
  return { titre: `${ans} ans ? Parfait.`, texte: "On commence sur le parking. Vélo et casque prêtés, selle réglée, et personne ne regarde.", ou: "Sur le parking", duree: "Une heure", avec: "Paul" };
}

export const EQUIPE = [
  { prenom: "Paul", role: "Les premières heures, sur le parking", couleur: "#F2C14E" },
  { prenom: "Inès", role: "La rue calme, puis le quartier", couleur: "#E8553D" },
  { prenom: "Malo", role: "L'atelier et les réglages", couleur: "#2E6B4F" },
];

export const CRENEAUX = ["Dimanche · 9 h", "Dimanche · 10 h 30", "Mercredi · 18 h", "Samedi · 9 h"];

export const COURSE = { date: "Dimanche 8 novembre", heure: "10 h", lieu: "sur le parking du magasin" };

export const VELOS = [
  { nom: "Le vélo de ville", texte: "Cadre bas, on monte sans lever la jambe. Le plus prêté de tous.", prix: "à partir de 390 €" },
  { nom: "Le vélo à assistance", texte: "Pour la côte qu'on n'ose plus. L'assistance s'arrête à 25 km/h.", prix: "à partir de 1 490 €" },
  { nom: "Le tricycle adulte", texte: "Trois roues, zéro équilibre à trouver. Pour aller au marché tranquille.", prix: "à partir de 990 €" },
];

export const QUESTIONS = [
  { q: "Je n'ai pas de vélo. Je peux venir ?", r: "Oui : pour la première heure, on prête le vélo et le casque. On règle la selle à ta taille avant de partir." },
  { q: "Et si j'ai peur de tomber ?", r: "C'est pour ça qu'on commence sur le parking, sans voiture, à ton rythme. On ne sort dans la rue que quand tu le décides." },
  { q: "La première heure, c'est payant ?", r: "Non. Elle est offerte, sans obligation d'achat. Si tu veux continuer, les heures suivantes coûtent 15 € (exemple)." },
  { q: "Le casque est obligatoire ?", r: "À vélo, il est obligatoire pour les moins de douze ans. Pour les adultes, on le conseille, et on le prête pour toutes nos sorties." },
  { q: "La course de lenteur, c'est sérieux ?", r: "Pas du tout. Elle se court sur le parking du magasin, le dernier arrivé gagne, et il n'y a rien à gagner. Juste le droit de dire qu'on a été le plus lent du quartier." },
];
