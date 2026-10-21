// Les données du site Gâteaux Perdus : une pâtisserie imaginaire qui ne vend pas ses
// recettes, mais refait celle de ta grand-mère, d'après la photo de sa fiche. Les
// fiches, les prénoms, les prix et les allergènes sont des exemples.

export const DOSSIER = "/exemples/gateaux-perdus";

export const boutique = {
  nom: "Gâteaux Perdus",
  telephone: "06 39 98 61 04",
  telephoneLien: "+33639986104",
  adresse: ["Gâteaux Perdus, pâtisserie", "12 rue de l'Exemple", "00000 Exemple-Ville"],
  horaires: "Du mardi au samedi, 9 h – 19 h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#envoyer`, libelle: "Envoyer sa recette" },
  { href: `${DOSSIER}/comment-ca-marche`, libelle: "Comment ça marche" },
  { href: `${DOSSIER}/la-vitrine`, libelle: "La vitrine" },
  { href: `${DOSSIER}#questions`, libelle: "Questions" },
];

export type FicheRecette = { titre: string; lignes: string[]; famille: string; allergenes: string; refait: string };

/** Des fiches de grand-mère, inventées (les mêmes que dans la vidéo). */
export const FICHES: FicheRecette[] = [
  { titre: "Gâteau de Mamie Jeanne", lignes: ["250 g de beurre (salé !)", "4 œufs", "du sucre : pas trop", "cuire jusqu'à ce que ça sente bon"], famille: "envoyée par sa petite-fille, C.", allergenes: "gluten, œufs, lait", refait: "refait en 2 essais" },
  { titre: "Tarte de Lucienne", lignes: ["pâte : comme d'hab", "pommes du jardin", "four chaud"], famille: "envoyée par son fils, P.", allergenes: "gluten, œufs, lait", refait: "refaite en 3 essais" },
  { titre: "Le quatre-quarts", lignes: ["tout pareil", "un peu de citron"], famille: "envoyée par sa petite-fille, M.", allergenes: "gluten, œufs, lait", refait: "refait en 1 essai" },
  { titre: "Clafoutis d'Odette", lignes: ["cerises avec noyaux", "1 verre de lait"], famille: "envoyée par son petit-fils, J.", allergenes: "gluten, œufs, lait", refait: "refait en 2 essais" },
  { titre: "Gâteau du dimanche", lignes: ["chocolat noir", "beurre (beaucoup)"], famille: "envoyée par sa fille, A.", allergenes: "gluten, œufs, lait, soja", refait: "refait en 4 essais" },
  { titre: "Galette de Germaine", lignes: ["amandes", "une fève"], famille: "envoyée par sa nièce, S.", allergenes: "gluten, œufs, lait, fruits à coque", refait: "refaite en 2 essais" },
];

export const QUESTIONS_APPEL = [
  "Beurre doux ou salé ?",
  "Moule en fer ou en verre ?",
  "Four à gaz, ou à bois ?",
  "Ça croquait dessus, ou c'était moelleux ?",
  "On le mangeait tiède, ou le lendemain ?",
];

export const ETAPES = [
  { titre: "Tu envoies la photo", texte: "De la fiche, du cahier, du dos d'enveloppe. Même tachée, même incomplète." },
  { titre: "Le pâtissier t'appelle", texte: "Beurre doux ou salé ? Moule en fer ou en verre ? Vingt minutes de questions, pour combler les trous." },
  { titre: "Il la refait", texte: "Un essai, parfois trois. Il note tout : la recette retrouvée, et ses allergènes." },
  { titre: "Tu goûtes en premier", texte: "Et tu dis : c'est elle. Ou : pas encore. Alors il recommence." },
];

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  {
    q: "Et si la recette est incomplète ?",
    r: "Elles le sont presque toutes. « Du sucre : pas trop », « cuire jusqu'à ce que ça sente bon »… C'est pour ça que le pâtissier t'appelle : ta mémoire complète la fiche.",
  },
  {
    q: "Combien ça coûte ?",
    r: "Le premier gâteau refait, essais compris : 38 € pour six parts (prix TTC d'exemple). Ensuite, il entre dans tes commandes au prix d'un gâteau de la vitrine.",
  },
  {
    q: "Et les allergènes ?",
    r: "Un gâteau refait reste un gâteau vendu : ses allergènes sont établis avec toi au téléphone, d'après ce que contenait la recette, et écrits sur sa fiche avant la commande.",
  },
  {
    q: "La recette, vous la gardez ?",
    r: "Elle reste à ta famille. On ne la vend à personne d'autre, et on te rend la photo de la fiche et la recette retrouvée, écrite au propre.",
  },
  {
    q: "Ma fiche sera en vitrine ?",
    r: "Seulement si tu le veux, avec ton accord écrit. Une fiche porte un prénom, une écriture : on ne l'épingle pas sans demander.",
  },
];
