// Tout ce que le site Sans Détour affiche : un cabinet d'ostéopathie imaginaire.
// Le praticien, l'adresse, les prix et les créneaux sont des exemples ; le
// téléphone est dans la tranche que l'ARCEP réserve à la fiction (01 99 00 xx xx).

export const DOSSIER = "/exemples/sans-detour";

export const NAVIGATION = [
  { href: `${DOSSIER}/ce-que-je-ne-fais-pas`, libelle: "Ce que je ne fais pas" },
  { href: `${DOSSIER}/seance-et-prix`, libelle: "La séance et le prix" },
  { href: `${DOSSIER}/reserver`, libelle: "Réserver" },
];

export const cabinet = {
  nom: "Sans Détour",
  praticien: "Camille R.",
  titre: "Ostéopathe D.O.",
  diplome: "Diplôme d'ostéopathe (D.O.), établissement agréé — exemple",
  adeli: "00 000 000 0",
  adresse: "12 rue de l'Exemple, 2e étage",
  ville: "Villefranche (exemple)",
  telephone: "01 99 00 27 45",
  horaires: "Du lundi au vendredi, de 7 h à 20 h 45 · le samedi, de 8 h à 13 h",
};

/* ---------- Les photos ----------
   Unsplash (licence Unsplash, usage commercial permis), servies depuis notre
   domaine ; crédits dans les mentions légales. Aucun visage. */
export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const P = "/exemples/sans-detour";
export const photos = {
  mainsDos: { src: `${P}/mains-dos.webp`, largeur: 1200, hauteur: 1800, alt: "Deux mains posées à plat sur le bas du dos d'une personne allongée" },
  epaule: { src: `${P}/epaule.webp`, largeur: 1000, hauteur: 1498, alt: "Les mains de l'ostéopathe sur l'omoplate d'une personne en t-shirt noir" },
  mains: { src: `${P}/mains.webp`, largeur: 1000, hauteur: 667, alt: "Deux mains posées en triangle au milieu d'un dos, vues de dessus" },
  table: { src: `${P}/table.webp`, largeur: 1200, hauteur: 1800, alt: "Une table de soin près d'une fenêtre, dans une pièce boisée" },
  attente: { src: `${P}/attente.webp`, largeur: 1000, hauteur: 667, alt: "Salle d'attente claire, chaises blanches et plantes vertes" },
} satisfies Record<string, Photo>;

/* ---------- Ce que je ne fais pas ----------
   Trois lignes communes à tous les ostéopathes, et dites comme telles :
   code de la consommation L121-4 16° ; décret n° 2007-435, art. 2 et art. 3, II. */
export const nonFais = [
  {
    id: "guerir",
    titre: "Promettre de vous guérir",
    texte:
      "Je ne vous promettrai pas de guérison, ni un nombre de séances pour « régler » quoi que ce soit. Je vous dis ce que je fais, et pourquoi. Le reste, personne ne peut le promettre honnêtement.",
    source: "Code de la consommation, art. L121-4, 16°",
  },
  {
    id: "medecin",
    titre: "Remplacer votre médecin",
    texte:
      "Je ne pose pas de diagnostic médical et je ne touche pas à vos traitements. Si ce que vous me décrivez relève d'un médecin, je vous le dis, et je vous oriente vers lui.",
    source: "Décret n° 2007-435, art. 2",
  },
  {
    id: "bebe",
    titre: "Bébé de moins de 6 mois sans diagnostic médical",
    texte:
      "Pour un nourrisson de moins de six mois, je travaille seulement après un diagnostic établi par un médecin, qui atteste l'absence de contre-indication. Apportez-le à la séance.",
    source: "Décret n° 2007-435, art. 3, II",
  },
];

export const jeFais = [
  "Je vous écoute, et je vous pose des questions avant de vous toucher.",
  "Je vous dis ce que je vais faire, où, et pourquoi.",
  "Je vous demande votre accord avant chaque geste. Vous pouvez dire non.",
  "Je vous remets une facture à la fin de la séance.",
];

/* ---------- La séance et le prix ---------- */
export const seanceAdulte = { duree: "45 min", prix: "60 €" };

export const tarifs = [
  { nom: "Séance adulte", duree: "45 min", prix: "60 €", note: "" },
  { nom: "Séance enfant, de 6 mois à 15 ans", duree: "40 min", prix: "50 €", note: "" },
  { nom: "Nourrisson de moins de 6 mois", duree: "40 min", prix: "50 €", note: "Après diagnostic médical attestant l'absence de contre-indication" },
  { nom: "Séance tôt (7 h) ou tard (20 h)", duree: "45 min", prix: "60 €", note: "Même prix, aucune majoration" },
];

export const deroule = [
  { minute: "0", titre: "On parle", texte: "Ce qui vous amène, vos antécédents, vos traitements. Vous le dites ici, au cabinet — le site ne vous le demande jamais." },
  { minute: "10", titre: "J'observe", texte: "Debout, assis, allongé : je regarde comment vous bougez. Vous restez en sous-vêtements ou en tenue souple, comme vous préférez." },
  { minute: "15", titre: "Je vous explique", texte: "Ce que je vais faire, où, et pourquoi. Avec des mots simples, avant de commencer." },
  { minute: "20", titre: "Je travaille", texte: "Avec votre accord, geste par geste. Si un geste vous gêne, on arrête, sans avoir à se justifier." },
  { minute: "40", titre: "On finit", texte: "Ce que j'ai fait, et pourquoi. Vous posez vos questions, je vous remets la facture." },
];

/* ---------- L'agenda ----------
   Créneaux d'exemple. Sur un vrai site, ils suivent l'agenda réel du cabinet :
   aucune urgence affichée, aucun « plus que deux places ». */
export type Jour = { id: string; court: string; long: string; creneaux: { heure: string; pris?: boolean }[] };

const journee = (pris: string[]) =>
  ["7 h 00", "7 h 45", "9 h 00", "12 h 30", "14 h 00", "17 h 30", "18 h 30", "19 h 15", "20 h 00"].map((heure) => ({
    heure,
    pris: pris.includes(heure),
  }));

export const semaine: Jour[] = [
  { id: "lundi", court: "Lun", long: "lundi", creneaux: journee(["7 h 00", "9 h 00", "18 h 30", "20 h 00"]) },
  { id: "mardi", court: "Mar", long: "mardi", creneaux: journee(["9 h 00", "14 h 00", "17 h 30"]) },
  { id: "mercredi", court: "Mer", long: "mercredi", creneaux: journee(["7 h 45", "12 h 30", "19 h 15"]) },
  { id: "jeudi", court: "Jeu", long: "jeudi", creneaux: journee(["7 h 00", "14 h 00", "18 h 30"]) },
  { id: "vendredi", court: "Ven", long: "vendredi", creneaux: journee(["12 h 30", "17 h 30", "20 h 00"]) },
  {
    id: "samedi", court: "Sam", long: "samedi",
    creneaux: ["8 h 00", "9 h 00", "10 h 15", "11 h 30", "12 h 30"].map((heure) => ({ heure, pris: heure === "9 h 00" })),
  },
];

/* ---------- Questions ---------- */
export const questions = [
  {
    q: "Combien coûte une séance, et combien de temps dure-t-elle ?",
    r: "Une séance adulte dure 45 minutes et coûte 60 € (prix d'exemple). Le prix est le même à 7 h ou à 20 h.",
  },
  {
    q: "Est-ce que vous me remettez une facture ?",
    r: "Oui, à chaque séance. Elle vous sert à demander une prise en charge à votre mutuelle, si votre contrat le prévoit.",
  },
  {
    q: "Faut-il me dire pourquoi je viens en réservant ?",
    r: "Non. Le site vous demande un nom, un téléphone et un créneau, rien d'autre. Ce qui vous amène, vous me le direz au cabinet.",
  },
  {
    q: "Et pour un bébé ?",
    r: "Pour un nourrisson de moins de six mois, il faut d'abord un diagnostic établi par un médecin, qui atteste l'absence de contre-indication (décret n° 2007-435, art. 3, II). Apportez-le à la séance.",
  },
  {
    q: "Que porter ?",
    r: "Une tenue souple, ou des sous-vêtements dans lesquels vous êtes à l'aise. Vous pouvez garder un t-shirt.",
  },
  {
    q: "Et si je dois annuler ?",
    r: "Appelez ou annulez en ligne jusqu'à 24 heures avant. Le créneau revient dans l'agenda pour quelqu'un d'autre.",
  },
];
