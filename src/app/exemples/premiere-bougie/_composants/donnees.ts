// Les contenus du site Première Bougie, cabinet de recrutement imaginé dans la vidéo
// « Si je devais créer un cabinet de recrutement ». Il ne compte pas les CV placés :
// il compte les premiers anniversaires. Le bilan est un chiffre d'ensemble, jamais
// une ligne par personne (RGPD, art. 4 ; confidentialité due au client) ; les départs
// sont comptés aussi (pas d'omission trompeuse, C. consom., art. L.121-3). Chiffres
// d'exemple. Aucun nom de recrue ni d'entreprise cliente.

export const DOSSIER = "/exemples/premiere-bougie";

export const entreprise = {
  nom: "Première Bougie",
  // Tranche que l'ARCEP réserve aux œuvres de fiction.
  telephone: "01 99 00 85 30",
  telephoneLien: "+33199008530",
  adresse: "12 rue de l'Exemple",
  ville: "Ville-d'Exemple",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#bilan`, libelle: "Le bilan" },
  { href: `${DOSSIER}#jour-365`, libelle: "Jour 365" },
  { href: `${DOSSIER}/recruter`, libelle: "Recruter avec nous" },
  { href: `${DOSSIER}/bilan`, libelle: "Comment on compte" },
];

export const photos = {
  cupcake: { src: "/exemples/premiere-bougie/cupcake-bougie.webp", largeur: 1200, hauteur: 1770, alt: "Un petit gâteau avec une seule bougie allumée, sur une table en bois, dans le noir" },
  gateau: { src: "/exemples/premiere-bougie/gateau-blanc.webp", largeur: 1000, hauteur: 1094, alt: "Un gâteau blanc sur une assiette grise, une seule bougie étincelle dessus" },
  main: { src: "/exemples/premiere-bougie/cupcake-main.webp", largeur: 1000, hauteur: 1259, alt: "Une main tend un petit gâteau surmonté d'une bougie rayée" },
};

/** Le bilan d'ensemble, en exemple : jamais une ligne par personne. */
export const BILAN = { recrues: 18, toujoursLa: 15, parties: 3, periode: "recrues arrivées entre septembre 2023 et septembre 2025" };

export const ETAPES = [
  { jour: "Jour −30", titre: "Le poste", texte: "On définit avec toi ce qui fera rester quelqu'un, pas seulement ce qui le fera venir." },
  { jour: "Jour 0", titre: "L'arrivée", texte: "Trois candidats présentés avec leur accord ; tu choisis ; la personne arrive." },
  { jour: "Jours 30, 90, 180", titre: "Les points", texte: "Un appel à la personne, un à toi, convenus dès le départ. Pas de surveillance." },
  { jour: "Jour 365", titre: "La première bougie", texte: "Un gâteau livré dans l'entreprise. Une seule bougie. Et le bilan qui se met à jour." },
];

export const HONORAIRES = {
  exemple: "Responsable commerciale, PME de 30 salariés",
  total: 7800,
  parts: [
    { quand: "À l'arrivée", part: 60 },
    { quand: "À la première bougie", part: 40 },
  ],
};

export const FAQ = [
  { q: "Pourquoi pas d'offres d'emploi sur le site ?", r: "Parce qu'on ne vend pas des annonces. On parle aux entreprises de ce qui compte après : que la personne soit toujours là dans un an." },
  { q: "Le bilan, il est vérifiable ?", r: "Il est calculé sur toutes les recrues arrivées depuis plus d'un an, sans exception, départs compris. La méthode est écrite sur la page « Comment on compte »." },
  { q: "Vous promettez que la recrue restera ?", r: "Non. Personne ne peut le promettre. On compte, on montre aussi les départs, et une partie des honoraires n'est due qu'à la première bougie." },
  { q: "Le gâteau, et la photo sur LinkedIn ?", r: "Le gâteau, toujours. La photo, seulement avec l'accord de la personne et celui de l'entreprise. Sinon, pas de photo." },
  { q: "Les candidats paient quelque chose ?", r: "Non. Placement gratuit pour les candidats : aucun frais ne peut leur être demandé pour leur trouver un poste (Code du travail, art. L.5321-3)." },
];

export const euros = (n: number) => `${n.toLocaleString("fr-FR").replace(/ /g, " ")} €`;
