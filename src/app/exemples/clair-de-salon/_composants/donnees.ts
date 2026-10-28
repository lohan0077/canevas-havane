// Tout ce qu'affiche Clair de Salon, cours particuliers à domicile imaginaires : le
// piano qui dort dans le salon, et les maths du chapitre qui bloque. Le site réunit
// les deux vidéos des cours particuliers : « Créer une marque » (le nom, le morceau
// dont tu rêves, le chemin, le concert de salon) et « Remplir l'agenda » (pas de CV,
// le chapitre qui bloque, la première séance minute par minute, une page par classe,
// le prix en grand, l'agenda du mercredi). Entreprise fictive : chaque prix, chaque
// date, chaque prénom est un exemple, et le site le dit.
//
// Règles tenues ici — arrêté du 17 mars 2015 (information préalable du consommateur sur
// les prestations de services à la personne), relu le 15/10/2026 :
//   - art. 2 : les prestations et le mode d'intervention, sur le site ;
//   - art. 4 : le prix à l'heure, HT et TTC, frais annexes compris ;
//   - art. 5 : l'avantage fiscal détaché du prix, en caractères plus petits ;
//   - art. 6 : le devis gratuit dès 100 € TTC par mois, ou sur demande.
// Le crédit d'impôt (CGI, art. 199 sexdecies) suppose un cours chez l'élève, individuel,
// par une activité déclarée en services à la personne (C. trav., D7231-1, II, 5° :
// « Soutien scolaire à domicile ou cours à domicile ») : ni visio, ni groupe.
// Aucune note promise, aucune durée promise. Morceaux du domaine public. Aucun visage.
// Téléphone dans la tranche ARCEP réservée à la fiction ; aucune adresse e-mail.

export const DOSSIER = "/exemples/clair-de-salon";

export const entreprise = {
  nom: "Clair de Salon",
  baseline: "Ton piano s'est assez reposé.",
  pianiste: "Jeanne R.",
  mathematicienne: "Inès B.",
  telephone: "01 99 00 17 17",
  telephoneLien: "+33199001717",
  sap: "SAP000000000",
  siret: "000 000 000 00000",
  adresse: "12 rue de l'Exemple, 00000 Exemple-Ville",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/ton-chemin`, libelle: "Le piano" },
  { href: `${DOSSIER}/maths-3e`, libelle: "Les maths" },
  { href: `${DOSSIER}/concerts`, libelle: "Concerts de salon" },
  { href: `${DOSSIER}/tarifs`, libelle: "Tarifs" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };

/* Unsplash (licence Unsplash), servies depuis notre domaine ; crédits dans les mentions.
   Aucun visage, aucune marque de piano lisible, aucun élève. */
export const photos = {
  salon: { src: `${DOSSIER}/salon-lampes.webp`, largeur: 1800, hauteur: 1200, alt: "Un piano droit noir contre un mur de briques, deux appliques allumées et une lampe à abat-jour, le soir" },
  pianoQuiDort: { src: `${DOSSIER}/piano-qui-dort.webp`, largeur: 1200, hauteur: 1800, alt: "Un vieux piano droit fermé dans la pénombre d'un salon, une chaise devant, la lumière d'une fenêtre" },
  touches: { src: `${DOSSIER}/touches.webp`, largeur: 1000, hauteur: 1500, alt: "Les touches d'un piano droit en bois, en gros plan" },
  main: { src: `${DOSSIER}/main.webp`, largeur: 1300, hauteur: 867, alt: "Une main posée sur le clavier d'un piano, dans un rayon de lumière" },
  clavierSoir: { src: `${DOSSIER}/clavier-soir.webp`, largeur: 1300, hauteur: 732, alt: "Le clavier d'un piano le soir, éclairé par une fenêtre" },
  equerre: { src: `${DOSSIER}/equerre.webp`, largeur: 1000, hauteur: 1333, alt: "Une équerre et un rapporteur en bois posés l'un sur l'autre, sur un fond bleu" },
  compas: { src: `${DOSSIER}/compas.webp`, largeur: 1300, hauteur: 867, alt: "La pointe d'un compas sur une feuille quadrillée" },
  chrono: { src: `${DOSSIER}/chrono.webp`, largeur: 1300, hauteur: 867, alt: "Un chronomètre de poche, une gomme et un crayon sur des feuilles de calculs" },
  crayonRouge: { src: `${DOSSIER}/crayon-rouge.webp`, largeur: 1000, hauteur: 1333, alt: "Un crayon rouge posé sur une feuille de multiplications corrigées" },
} satisfies Record<string, Photo>;

/* ---------- Le prix : le même pour le piano et pour les maths (exemple) ---------- */
export const PRIX = {
  heure: 40,
  frais: "Déplacement compris dans un rayon de 15 km. Aucun frais de dossier, aucun frais d'inscription.",
  tva: "TVA non applicable, art. 293 B du CGI",
  credit: 0.5,
};

/* ---------- Le piano : le morceau dont tu rêves, et son chemin ---------- */
export type Morceau = { id: string; titre: string; compositeur: string; annee: string; etapes: string[]; mot: string };

/** Quatre morceaux du domaine public, et le chemin de chacun. Aucune durée promise. */
export const MORCEAUX: Morceau[] = [
  { id: "gymnopedie", titre: "Gymnopédie n° 1", compositeur: "Erik Satie", annee: "1888", mot: "Lent et douloureux, dit la partition. Lent, surtout : c'est une chance.", etapes: ["Les huit premières mesures", "La main gauche, seule", "Les deux mains, lentement", "Le morceau, en entier"] },
  { id: "clair-de-lune", titre: "Clair de lune", compositeur: "Claude Debussy", annee: "1905", mot: "On commence par les accords du début, ceux que tout le monde reconnaît.", etapes: ["Les accords du début", "La main droite qui chante", "Le passage qui s'emballe, à petite vitesse", "Le morceau, en entier"] },
  { id: "lettre-a-elise", titre: "Lettre à Élise", compositeur: "Ludwig van Beethoven", annee: "1810", mot: "Le thème que tout le monde connaît, puis ce qu'il y a derrière.", etapes: ["Le thème, main droite", "Le thème, deux mains", "Le passage du milieu", "Le morceau, en entier"] },
  { id: "canon", titre: "Canon", compositeur: "Johann Pachelbel", annee: "vers 1680", mot: "Huit accords qui tournent. Une fois qu'ils sont là, tout le reste se pose dessus.", etapes: ["Les huit accords de la main gauche", "La première mélodie", "Les variations, une à une", "Le morceau, en entier"] },
];

/* ---------- Les maths : le chapitre qui bloque, et la première séance ---------- */
export type Minute = { minute: string; titre: string };
export type Chapitre = { id: string; nom: string; classe: string; etapes: Minute[] };

const seance = (controle: string, methode: string, exercice: string, mercredi: string): Minute[] => [
  { minute: "0′", titre: `On reprend le contrôle raté : ${controle}` },
  { minute: "10′", titre: `La méthode, pas à pas : ${methode}` },
  { minute: "40′", titre: `Un exercice, seul : ${exercice}` },
  { minute: "55′", titre: `Ce qu'on revoit mercredi : ${mercredi}` },
];

export const CHAPITRES: Chapitre[] = [
  { id: "fractions", nom: "Fractions", classe: "5e", etapes: seance("la question où tout a dérapé", "le dénominateur commun, avec des parts de gâteau", "trois additions, de la plus simple à la plus piégeuse", "la multiplication de fractions") },
  { id: "equations", nom: "Équations", classe: "4e", etapes: seance("la ligne où l'inconnue a disparu", "ce qu'on fait d'un côté, on le fait de l'autre", "deux équations, sans aide", "les problèmes à mettre en équation") },
  { id: "thales", nom: "Thalès", classe: "3e", etapes: seance("la figure qu'on n'arrivait pas à lire", "repérer les deux droites parallèles, puis écrire les rapports", "un calcul de longueur, seul", "la réciproque, et le brevet") },
  { id: "fonctions", nom: "Fonctions", classe: "3e", etapes: seance("le tableau de valeurs à moitié rempli", "f(x) comme une machine : on entre un nombre, il en sort un", "lire un graphique, seul", "les fonctions affines") },
  { id: "pythagore", nom: "Pythagore", classe: "4e", etapes: seance("le triangle dont on ne trouvait pas l'hypoténuse", "repérer l'angle droit avant de calculer", "une longueur à trouver, seul", "la réciproque") },
  { id: "statistiques", nom: "Statistiques", classe: "3e", etapes: seance("la moyenne qui ne tombait pas juste", "moyenne, médiane, étendue : ce que chacune raconte", "une série de notes à analyser", "les probabilités") },
];

export const CLASSES = [
  { classe: "6e", lien: false },
  { classe: "5e", lien: false },
  { classe: "4e", lien: false },
  { classe: "3e", lien: true },
  { classe: "2de", lien: false },
];

export const METHODE = [
  { titre: "Le chapitre d'abord", texte: "Pas de bilan de trois heures : on part du chapitre qui bloque, celui du contrôle raté." },
  { titre: "Une méthode, écrite", texte: "Chaque méthode tient sur une fiche, rangée dans le cahier. Elle reste quand on part." },
  { titre: "Un exercice, seul", texte: "Pendant qu'on se tait. C'est là qu'on voit ce qui est compris, et ce qui ne l'est pas encore." },
  { titre: "Un mot aux parents", texte: "Deux lignes à la fin de chaque cours : ce qu'on a fait, ce qu'on revoit. Pas de bulletin." },
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

/* ---------- Le concert de salon ---------- */
export const CONCERT = {
  date: "Dimanche 15 novembre 2026",
  heure: "17 h",
  chez: "chez Mireille, une élève",
  eleves: 6,
  chaises: 12,
  programme: ["Erik Satie — Gymnopédie n° 1", "Claude Debussy — Clair de lune (le début)", "Ludwig van Beethoven — Lettre à Élise", "Johann Pachelbel — Canon (les huit accords)"],
};

/** Les douze chaises du concert. Les chaises prises sont un exemple. */
export const CHAISES_PRISES = [0, 1, 4, 7, 8];

/* ---------- L'agenda : la semaine du 2 novembre 2026 (exemple) ---------- */
export type Matiere = "Piano" | "Maths";
export type Creneau = { id: string; jour: string; date: string; heure: string; matiere: Matiere; pris?: boolean };

export const SEMAINE: Creneau[] = [
  { id: "lun-17h30", jour: "Lundi", date: "2 nov.", heure: "17 h 30", matiere: "Maths", pris: true },
  { id: "lun-20h", jour: "Lundi", date: "2 nov.", heure: "20 h", matiere: "Piano" },
  { id: "mar-18h", jour: "Mardi", date: "3 nov.", heure: "18 h", matiere: "Maths" },
  { id: "mar-20h30", jour: "Mardi", date: "3 nov.", heure: "20 h 30", matiere: "Piano", pris: true },
  { id: "mer-14h", jour: "Mercredi", date: "4 nov.", heure: "14 h", matiere: "Maths" },
  { id: "mer-16h", jour: "Mercredi", date: "4 nov.", heure: "16 h", matiere: "Maths", pris: true },
  { id: "jeu-19h", jour: "Jeudi", date: "5 nov.", heure: "19 h", matiere: "Piano" },
  { id: "sam-10h", jour: "Samedi", date: "7 nov.", heure: "10 h", matiere: "Piano" },
];

/* ---------- Les questions ---------- */
export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  { q: "Vous promettez de meilleures notes ?", r: "Non. Personne ne peut le promettre honnêtement. Ce qu'on promet, c'est le format : une heure par semaine, chez vous, sur le chapitre qui bloque, et deux lignes pour vous dire ce qu'on a fait." },
  { q: "Je n'ai pas joué depuis vingt ans. C'est trop tard ?", r: "Non. Les doigts se souviennent de plus de choses qu'on ne croit, et on ne recommence pas par les gammes : on recommence par un morceau que tu as envie d'entendre chez toi." },
  { q: "En combien de temps je jouerai mon morceau ?", r: "On ne sait pas, et personne ne le sait. Le chemin a quatre étapes ; certains les passent en un mois, d'autres en un an. On avance au rythme de tes soirées." },
  { q: "Et le solfège ?", r: "Il vient au fil du morceau, quand on en a besoin. Pas en premier, pas en entier, et pas à l'accueil." },
  { q: "Le crédit d'impôt, ça marche comment ?", r: "Si vous y avez droit, 50 % des sommes versées vous reviennent en crédit d'impôt, dans la limite d'un plafond annuel. Conditions : le cours a lieu chez vous, en individuel, et l'activité est déclarée en services à la personne. Piano ou maths, c'est la même règle." },
  { q: "Et l'avance immédiate ?", r: "Avec l'avance immédiate, le crédit d'impôt est déduit tout de suite : vous ne payez que le reste. Il faut que l'organisme soit habilité par l'Urssaf et que vous validiez votre compte sur le site de l'Urssaf (exemple)." },
  { q: "Mon piano n'a pas été accordé depuis des années.", r: "Commence quand même. S'il le faut, on fera venir un accordeur ; ce n'est pas compris dans le prix du cours, et on te le dira avant." },
  { q: "Et si on doit annuler ?", r: "Prévenez la veille : le cours est déplacé, sans frais. Le jour même, il est dû (exemple)." },
  { q: "Vous faites cours en visio ?", r: "Oui, mais au même prix et sans crédit d'impôt : un cours à distance n'y ouvre pas droit." },
];
