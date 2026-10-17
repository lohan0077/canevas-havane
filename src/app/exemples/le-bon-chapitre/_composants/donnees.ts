// Tout ce qu'affiche le site du Bon Chapitre, cours de maths à domicile imaginaires.
// Entreprise fictive : chaque prix, chaque date est un exemple, et le site le dit.
//
// La règle du métier tenue ici — arrêté du 17 mars 2015 (information préalable du
// consommateur sur les prestations de services à la personne), relu le 15/10/2026 :
//   - art. 2 : les prestations et le mode d'intervention, sur le site ;
//   - art. 4 : le prix à l'heure, HT et TTC, frais annexes compris ;
//   - art. 5 : l'avantage fiscal à part du prix, en caractères plus petits ;
//   - art. 6 : le devis gratuit au-delà de 100 € TTC par mois, ou sur demande.
// Le crédit d'impôt (CGI, art. 199 sexdecies) suppose un cours chez l'élève, individuel,
// donné par une activité déclarée en services à la personne : ni visio, ni groupe.
// Aucune note, aucun résultat promis. Aucune photo d'élève.

export const DOSSIER = "/exemples/le-bon-chapitre";

export const entreprise = {
  nom: "Le Bon Chapitre",
  prof: "Inès B.",
  telephone: "06 39 98 45 67",
  telephoneLien: "+33639984567",
  sap: "SAP000000000",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/maths-3e`, libelle: "Maths, 3e" },
  { href: `${DOSSIER}#prix`, libelle: "Le prix" },
  { href: `${DOSSIER}/reserver`, libelle: "Réserver" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };

export const photos = {
  equerre: { src: `${DOSSIER}/equerre.webp`, largeur: 1000, hauteur: 1333, alt: "Une équerre et un rapporteur en bois posés l'un sur l'autre, sur un fond bleu" },
  compas: { src: `${DOSSIER}/compas.webp`, largeur: 1300, hauteur: 867, alt: "La pointe d'un compas sur une feuille quadrillée" },
  chrono: { src: `${DOSSIER}/chrono.webp`, largeur: 1300, hauteur: 867, alt: "Un chronomètre de poche, une gomme et un crayon sur des feuilles de calculs" },
  crayonRouge: { src: `${DOSSIER}/crayon-rouge.webp`, largeur: 1000, hauteur: 1333, alt: "Un crayon rouge posé sur une feuille de multiplications corrigées" },
} satisfies Record<string, Photo>;

/** Le prix, tel que l'arrêté du 17/03/2015 le demande. Exemple. */
export const PRIX = {
  heure: 40,
  frais: "Déplacement compris dans un rayon de 10 km. Aucun frais de dossier, aucun frais d'inscription.",
  tva: "TVA non applicable, art. 293 B du CGI",
  credit: 0.5,
};

export type Etape = { minute: string; titre: string };
export type Chapitre = { id: string; nom: string; classe: string; etapes: Etape[] };

const seance = (controle: string, methode: string, exercice: string, mercredi: string): Etape[] => [
  { minute: "0′", titre: `On reprend le contrôle raté : ${controle}` },
  { minute: "10′", titre: `La méthode, pas à pas : ${methode}` },
  { minute: "40′", titre: `Un exercice, seul : ${exercice}` },
  { minute: "55′", titre: `Ce qu'on revoit mercredi : ${mercredi}` },
];

export const CHAPITRES: Chapitre[] = [
  { id: "fractions", nom: "Fractions", classe: "5e", etapes: seance("la question où tout a dérapé", "le dénominateur commun, avec des parts de gâteau", "trois additions, de la plus simple à la plus piégeuse", "la multiplication de fractions") },
  { id: "equations", nom: "Équations", classe: "4e", etapes: seance("la ligne où l'inconnue a disparu", "ce qu'on fait d'un côté, on le fait de l'autre", "deux équations, sans aide", "les problèmes à mettre en équation") },
  { id: "thales", nom: "Thalès", classe: "3e", etapes: seance("la figure qu'on n'arrivait pas à lire", "repérer les deux droites parallèles, puis écrire les rapports", "un calcul de longueur, seul", "la réciproque, et le brevet") },
  { id: "fonctions", nom: "Fonctions", classe: "3e", etapes: seance("le tableau de valeurs à moitié rempli", "f(x) comme une machine : on entre un nombre, il en sort un", "lire un graphique, seul", "les fonctions affines") },
  { id: "pythagore", nom: "Pythagore", classe: "4e", etapes: seance("le triangle dont on ne trouvait pas l'hypoténuse", "repérer l'angle droit avant de calculer", "une longueur à trouver, seul", "la réciproque") },
  { id: "statistiques", nom: "Statistiques", classe: "3e", etapes: seance("la moyenne qui ne tombait pas juste", "moyenne, médiane, étendue : ce que chacune raconte", "une série de notes à analyser", "les probabilités") },
];

export const CLASSES = [
  { classe: "6e", lien: false },
  { classe: "5e", lien: false },
  { classe: "4e", lien: false },
  { classe: "3e", lien: true },
  { classe: "2de", lien: false },
];

export const METHODE = [
  { titre: "Le chapitre d'abord", texte: "Pas de bilan de trois heures : on part du chapitre qui bloque, celui du contrôle raté." },
  { titre: "Une méthode, écrite", texte: "Chaque méthode tient sur une fiche, rangée dans le cahier. Elle reste quand je pars." },
  { titre: "Un exercice, seul", texte: "Pendant que je me tais. C'est là qu'on voit ce qui est compris, et ce qui ne l'est pas encore." },
  { titre: "Un mot aux parents", texte: "Deux lignes à la fin de chaque cours : ce qu'on a fait, ce qu'on revoit. Pas de bulletin." },
];

export const PROGRAMME_3E = [
  { nom: "Arithmétique", detail: "Nombres premiers, décomposition, fractions irréductibles" },
  { nom: "Calcul littéral", detail: "Développer, factoriser, identités remarquables" },
  { nom: "Équations", detail: "Équations produit, problèmes à mettre en équation" },
  { nom: "Thalès", detail: "Le théorème, sa réciproque, les configurations" },
  { nom: "Trigonométrie", detail: "Cosinus, sinus, tangente dans le triangle rectangle" },
  { nom: "Fonctions", detail: "Notion de fonction, fonctions linéaires et affines" },
  { nom: "Statistiques et probabilités", detail: "Moyenne, médiane, étendue, probabilités simples" },
  { nom: "Le brevet", detail: "Sujets des années passées, gestion du temps" },
];

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  { q: "Vous promettez de meilleures notes ?", r: "Non. Personne ne peut le promettre honnêtement. Ce que je promets, c'est le format : une heure par semaine, chez vous, sur le chapitre qui bloque, et deux lignes pour vous dire ce qu'on a fait." },
  { q: "Le crédit d'impôt, ça marche comment ?", r: "Si vous y avez droit, 50 % des sommes versées vous reviennent en crédit d'impôt, dans la limite d'un plafond annuel. Conditions : le cours a lieu chez vous, en individuel, et l'activité est déclarée en services à la personne. Les cours en visio ou en groupe n'y ouvrent pas droit." },
  { q: "Et l'avance immédiate ?", r: "Avec l'avance immédiate, le crédit d'impôt est déduit tout de suite : vous ne payez que le reste. Il faut que le professeur soit habilité par l'Urssaf et que vous validiez votre compte sur le site de l'Urssaf (exemple)." },
  { q: "Et si on doit annuler ?", r: "Prévenez la veille : le cours est déplacé, sans frais. Le jour même, il est dû (exemple)." },
  { q: "Vous faites cours en visio ?", r: "Oui, mais au même prix et sans crédit d'impôt : un cours à distance n'y ouvre pas droit." },
];

export type Creneau = { libelle: string; sous: string; pris?: boolean };

/** Semaine du 2 novembre 2026. Les créneaux pris sont un exemple. */
export const CRENEAUX: Creneau[] = [
  { libelle: "Lundi", sous: "2 nov. · 17 h 30", pris: true },
  { libelle: "Mardi", sous: "3 nov. · 18 h" },
  { libelle: "Mercredi", sous: "4 nov. · 14 h" },
  { libelle: "Mercredi", sous: "4 nov. · 16 h", pris: true },
  { libelle: "Jeudi", sous: "5 nov. · 17 h 30" },
  { libelle: "Samedi", sous: "7 nov. · 10 h" },
];
