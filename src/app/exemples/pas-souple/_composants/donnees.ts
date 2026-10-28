// Les données de Pas Souple, le studio de pilates imaginé pour la vidéo « Si je devais
// remplir l'agenda d'un studio de pilates ». Tout est inventé et marqué « exemple ».
// Aucune promesse de santé, de silhouette ni de résultat : le site décrit ce qui se
// passe pendant le cours, pas ce qu'il « apporte ».

export const DOSSIER = "/exemples/pas-souple";

export const studio = {
  nom: "Pas Souple",
  adresse: "12 rue de l'Exemple, Ta Ville",
  telephone: "06 39 98 51 07",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/le-studio`, libelle: "Le studio" },
  { href: `${DOSSIER}/planning`, libelle: "Planning" },
];

export const photos = {
  pieds: { src: "/exemples/pas-souple/pieds.webp", alt: "Des pieds nus sur un parquet, à côté d'un tapis qu'on déroule", largeur: 1200, hauteur: 800 },
  studio: { src: "/exemples/pas-souple/studio.webp", alt: "Le studio vide : des appareils de pilates en bois clair, des plantes, une lumière blanche", largeur: 1000, hauteur: 1500 },
  tapis: { src: "/exemples/pas-souple/tapis.webp", alt: "Deux tapis roulés, terracotta et olive, debout contre un mur au soleil", largeur: 1000, hauteur: 1500 },
  entree: { src: "/exemples/pas-souple/entree.webp", alt: "L'entrée : des tapis roulés dans un panier tressé, entre des plantes", largeur: 1000, hauteur: 1500 },
  vestiaire: { src: "/exemples/pas-souple/vestiaire.webp", alt: "Le vestiaire : des bancs en bois et des casiers sombres, vides", largeur: 1000, hauteur: 1334 },
};

export type Cle = "oui" | "presque" | "pasdutout";

/** La réponse à « Tu touches tes pieds ? », et le cours qui va avec. */
export const REPONSES: { cle: Cle; libelle: string; titre: string; cours: string; quand: string; details: string[] }[] = [
  { cle: "oui", libelle: "Oui", titre: "Oui ? Très bien.", cours: "Pilates tapis", quand: "Mercredi · 12 h 30 · 50 min", details: ["Groupe de huit", "Tapis fourni", "Déjà venu une fois ou deux"] },
  { cle: "presque", libelle: "Presque", titre: "Presque ? C'est déjà ça.", cours: "Pilates doux", quand: "Jeudi · 18 h · 50 min", details: ["Petit groupe", "Tapis fourni", "Rythme lent, beaucoup d'explications"] },
  { cle: "pasdutout", libelle: "Pas du tout", titre: "Pas du tout ? Parfait.", cours: "Premiers pas", quand: "Mardi · 19 h · 50 min", details: ["Petit groupe", "Tapis fourni", "Aucun niveau demandé"] },
];

export const COURS = [
  { nom: "Premiers pas", pour: "Pour qui n'a jamais fait de pilates", texte: "On découvre les mouvements de base, un par un, au sol. La prof montre, puis passe voir chacun. Personne ne regarde personne." },
  { nom: "Pilates doux", pour: "Pour reprendre tranquillement", texte: "Les mêmes mouvements, enchaînés plus lentement, avec des coussins et des briques pour adapter chaque position." },
  { nom: "Pilates tapis", pour: "Pour ceux qui sont déjà venus", texte: "Une séance complète au sol, des enchaînements plus longs. Toujours une variante plus simple, proposée à voix haute." },
];

/** Le planning de la semaine. Les places restantes ne sont pas affichées : on ne montre pas de rareté. */
export const PLANNING = [
  { jour: "Lundi", cours: [{ heure: "12 h 30", nom: "Pilates doux", prof: "Jeanne" }, { heure: "19 h", nom: "Pilates tapis", prof: "Malik" }] },
  { jour: "Mardi", cours: [{ heure: "9 h", nom: "Pilates doux", prof: "Jeanne" }, { heure: "19 h", nom: "Premiers pas", prof: "Jeanne" }] },
  { jour: "Mercredi", cours: [{ heure: "12 h 30", nom: "Pilates tapis", prof: "Malik" }, { heure: "18 h", nom: "Premiers pas", prof: "Malik" }] },
  { jour: "Jeudi", cours: [{ heure: "18 h", nom: "Pilates doux", prof: "Jeanne" }, { heure: "19 h 15", nom: "Pilates tapis", prof: "Malik" }] },
  { jour: "Samedi", cours: [{ heure: "10 h", nom: "Premiers pas", prof: "Malik" }, { heure: "11 h 15", nom: "Pilates doux", prof: "Malik" }] },
];

export const TARIFS = [
  { nom: "Premier cours", detail: "Premiers pas, une seule fois", prix: "15 € TTC" },
  { nom: "Séance à l'unité", detail: "Tous les cours", prix: "22 € TTC" },
  { nom: "Carte de 10 séances", detail: "Valable 6 mois, tous les cours", prix: "190 € TTC" },
];

export const questions = [
  { q: "Je ne touche pas du tout mes pieds. C'est grave ?", r: "Non, c'est même pour ça que le cours Premiers pas existe. Personne ne te demande d'y arriver : on travaille à partir de là où tu en es aujourd'hui." },
  { q: "Qu'est-ce que je dois apporter ?", r: "Une tenue dans laquelle tu bouges facilement, et une bouteille d'eau. Les tapis, les coussins et les briques sont fournis. Le vestiaire ferme à clé." },
  { q: "On est combien par cours ?", r: "Petit groupe : huit personnes au plus en Premiers pas. La prof a le temps de passer voir chacun." },
  { q: "J'ai mal au dos. Le pilates, c'est pour moi ?", r: "Le studio ne peut pas répondre à la place d'un médecin. En cas de douleur ou de problème de santé, demande-lui d'abord ; et dis-le à la prof en arrivant, elle adaptera les positions." },
  { q: "Je peux annuler ma place ?", r: "Oui, depuis le site, jusqu'à deux heures avant le cours. La place repart dans le planning pour quelqu'un d'autre." },
];
