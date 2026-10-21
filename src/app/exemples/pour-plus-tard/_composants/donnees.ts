// Tout ce qu'affiche le site de Pour Plus Tard, studio photo imaginaire. Entreprise
// fictive : chaque prix, chaque date est un exemple, et le site le dit.
//
// Règles tenues ici :
//   - téléphone dans la tranche ARCEP réservée à la fiction (01 99 00 xx xx) ;
//   - aucune adresse e-mail, aucune adresse postale réelle ;
//   - aucune photo de visage : des albums, des boîtes, un vieux tirage de maison ;
//   - aucun avis, aucune note, aucune fausse rareté ;
//   - la vitrine : accord de chaque personne photographiée, et prudence sur le droit
//     d'auteur des vieux portraits de studio (CPI, art. L122-2 et L123-1).

export const DOSSIER = "/exemples/pour-plus-tard";

export const entreprise = {
  nom: "Pour Plus Tard",
  baseline: "Des photos qu'on garde.",
  telephone: "01 99 00 20 20",
  telephoneLien: "+33199002020",
};

export const NAVIGATION = [
  { href: DOSSIER, libelle: "Le studio" },
  { href: `${DOSSIER}/la-boite`, libelle: "La boîte" },
  { href: `${DOSSIER}/la-vitrine`, libelle: "La vitrine" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };

export const photos = {
  pageQuiAttend: { src: `${DOSSIER}/page-qui-attend.webp`, largeur: 1400, hauteur: 788, alt: "Les pages vides d'un vieil album photo, l'ombre d'une branche posée dessus" },
  vieuxTirage: { src: `${DOSSIER}/vieux-tirage.webp`, largeur: 1100, hauteur: 1650, alt: "Un vieux tirage en noir et blanc d'une maison au pied d'une colline, posé sur un carton kraft" },
  albumFleurs: { src: `${DOSSIER}/album-fleurs.webp`, largeur: 1300, hauteur: 975, alt: "Un album ancien à la couverture dorée, trois œillets séchés posés dessus" },
  boite1942: { src: `${DOSSIER}/boite-1942.webp`, largeur: 1100, hauteur: 1650, alt: "Le couvercle usé d'une vieille boîte, l'année 1942 gravée dessus" },
  colis: { src: `${DOSSIER}/colis.webp`, largeur: 1300, hauteur: 867, alt: "Un colis en papier kraft ficelé, une enveloppe et une carte blanche" },
} satisfies Record<string, Photo>;

export const FORMULE = {
  nom: "Séance + 20 tirages",
  prix: "390 €",
  prixNombre: 390,
  details: ["Une séance d'une heure, chez toi ou dehors", "Vingt tirages 13 × 18, papier mat", "Une boîte toilée, à ton nom", "Livrée chez toi"],
};

export const COMPARAISON = [
  { quoi: "Ce que tu reçois", eux: "50 fichiers", nous: "20 tirages" },
  { quoi: "Où ça finit", eux: "Dans un téléphone que tu changeras", nous: "Dans un tiroir, chez toi" },
  { quoi: "Combien de temps", eux: "Un lien qui expire dans 7 jours", nous: "Le temps que la boîte dure" },
  { quoi: "Qui les regarde", eux: "Toi, une fois", nous: "Tes petits-enfants, un jour de pluie" },
];

export const INVENTAIRE = [
  { n: "01", titre: "Vingt tirages 13 × 18", texte: "Papier mat, bord blanc. Choisis avec toi, à la table de la cuisine, pas par un algorithme." },
  { n: "02", titre: "Une boîte toilée, à ton nom", texte: "Lin gris, coins renforcés. L'étiquette porte ton nom et la date de la séance." },
  { n: "03", titre: "Au dos de chaque tirage", texte: "La date et le lieu, au crayon. Les prénoms, c'est toi qui les écris : dans cinquante ans, personne ne s'en souviendra." },
  { n: "04", titre: "Les fichiers, aussi", texte: "Sur une clé, au fond de la boîte. Pour les partager, pas pour les garder." },
  { n: "05", titre: "Une page vide", texte: "Pour écrire ce jour-là, en quelques lignes. C'est souvent ce qu'on relit en premier." },
];

export const ETAPES = [
  { titre: "La séance", texte: "Une heure, chez toi ou dehors. On ne fait pas poser : on regarde vivre." },
  { titre: "Le choix", texte: "On choisit les vingt ensemble. Pas cinquante : vingt, c'est ce qui tient dans une main." },
  { titre: "Le tirage", texte: "En atelier, sur papier mat. Chaque tirage est vérifié à la main." },
  { titre: "La boîte", texte: "Livrée chez toi trois semaines après la séance (délai d'exemple)." },
];

export const CONSEILS = [
  { titre: "En imprimer vingt, pas deux cents", texte: "Un tri qui fait mal sur le moment, et qui rend la boîte lisible dans trente ans." },
  { titre: "Écrire au dos", texte: "Qui, où, quand. Au crayon à papier : l'encre traverse et bave." },
  { titre: "Les ranger à l'abri", texte: "Loin de la lumière et de l'humidité. Une boîte fermée dans un placard, pas une cave." },
];

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  { q: "Pourquoi seulement vingt tirages ?", r: "Parce qu'une boîte de vingt, on l'ouvre. Une clé de cinq cents fichiers, on ne l'ouvre jamais. Si tu en veux plus, une seconde boîte existe." },
  { q: "On a les fichiers quand même ?", r: "Oui, sur une clé au fond de la boîte. Ils servent à partager ; les tirages, eux, servent à garder." },
  { q: "La séance a lieu où ?", r: "Chez toi, ou dans un endroit qui compte pour toi : le jardin des grands-parents, la plage de chaque été. À 30 km autour du studio, déplacement compris (exemple)." },
  { q: "Vous publiez nos photos ?", r: "Non, sauf si tu dis oui, par écrit, photo par photo. Pour un enfant, il faut l'accord de ses deux parents." },
  { q: "Et la vitrine ?", r: "Une fois par an, on expose les plus vieilles photos de famille du quartier, avec l'accord de chacun. Le détail est sur la page de la vitrine." },
];

export type Creneau = { libelle: string; sous: string; pris?: boolean };

export const CRENEAUX: Creneau[] = [
  { libelle: "Sam. 7 nov.", sous: "10 h", pris: true },
  { libelle: "Sam. 7 nov.", sous: "15 h" },
  { libelle: "Sam. 14 nov.", sous: "10 h", pris: true },
  { libelle: "Sam. 14 nov.", sous: "15 h" },
  { libelle: "Sam. 21 nov.", sous: "10 h" },
  { libelle: "Sam. 28 nov.", sous: "15 h" },
];

/** Le mur de la vitrine : des cadres dessinés, l'année seulement. Aucune photo réelle. */
export const MUR = ["1931", "1948", "1952", "1957", "1963", "1968", "1974", "1979", "1986", "1991", "1998"];
