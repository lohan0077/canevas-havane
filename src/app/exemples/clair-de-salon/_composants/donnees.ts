// Tout ce qu'affiche le site de Clair de Salon, cours de piano à domicile imaginaires.
// Entreprise fictive : chaque prix, chaque date est un exemple, et le site le dit.
//
// Règles tenues ici :
//   - les prix suivent l'arrêté du 17 mars 2015 (services à la personne) : à l'heure,
//     HT et TTC, frais annexes, mode d'intervention, devis ; l'avantage fiscal à part,
//     en plus petit (art. 5). Crédit d'impôt : CGI, art. 199 sexdecies, sous conditions ;
//   - aucun résultat promis : le « chemin » n'a pas de durée ;
//   - les morceaux proposés sont du domaine public (Satie, Debussy, Beethoven, Pachelbel) :
//     aucune partition, aucun enregistrement n'est montré ;
//   - le concert de salon est une invitation entre particuliers, entrée libre ;
//   - téléphone dans la tranche ARCEP réservée à la fiction ; aucune adresse e-mail ;
//     aucune photo de visage (un piano, des touches, une main).

export const DOSSIER = "/exemples/clair-de-salon";

export const entreprise = {
  nom: "Clair de Salon",
  baseline: "Ton piano s'est assez reposé.",
  prof: "Jeanne R.",
  telephone: "01 99 00 17 17",
  telephoneLien: "+33199001717",
  sap: "SAP000000000",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/ton-chemin`, libelle: "Ton chemin" },
  { href: `${DOSSIER}/concerts`, libelle: "Concerts de salon" },
  { href: `${DOSSIER}/tarifs`, libelle: "Tarifs" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };

export const photos = {
  pianoQuiDort: { src: `${DOSSIER}/piano-qui-dort.webp`, largeur: 1200, hauteur: 1800, alt: "Un vieux piano droit fermé dans la pénombre d'un salon, une chaise devant, la lumière d'une fenêtre" },
  touches: { src: `${DOSSIER}/touches.webp`, largeur: 1000, hauteur: 1500, alt: "Les touches d'un piano droit en bois, en gros plan" },
  main: { src: `${DOSSIER}/main.webp`, largeur: 1300, hauteur: 867, alt: "Une main posée sur le clavier d'un piano, dans un rayon de lumière" },
  clavierSoir: { src: `${DOSSIER}/clavier-soir.webp`, largeur: 1300, hauteur: 732, alt: "Le clavier d'un piano le soir, éclairé par une fenêtre" },
} satisfies Record<string, Photo>;

export type Morceau = { id: string; titre: string; compositeur: string; annee: string; etapes: string[]; mot: string };

/** Quatre morceaux du domaine public, et le chemin de chacun. Aucune durée promise. */
export const MORCEAUX: Morceau[] = [
  { id: "gymnopedie", titre: "Gymnopédie n° 1", compositeur: "Erik Satie", annee: "1888", mot: "Lent et douloureux, dit la partition. Lent, surtout : c'est une chance.", etapes: ["Les huit premières mesures", "La main gauche, seule", "Les deux mains, lentement", "Le morceau, en entier"] },
  { id: "clair-de-lune", titre: "Clair de lune", compositeur: "Claude Debussy", annee: "1905", mot: "On commence par les accords du début, ceux que tout le monde reconnaît.", etapes: ["Les accords du début", "La main droite qui chante", "Le passage qui s'emballe, à petite vitesse", "Le morceau, en entier"] },
  { id: "lettre-a-elise", titre: "Lettre à Élise", compositeur: "Ludwig van Beethoven", annee: "1810", mot: "Le thème que tout le monde connaît, puis ce qu'il y a derrière.", etapes: ["Le thème, main droite", "Le thème, deux mains", "Le passage du milieu", "Le morceau, en entier"] },
  { id: "canon", titre: "Canon", compositeur: "Johann Pachelbel", annee: "vers 1680", mot: "Huit accords qui tournent. Une fois qu'ils sont là, tout le reste se pose dessus.", etapes: ["Les huit accords de la main gauche", "La première mélodie", "Les variations, une à une", "Le morceau, en entier"] },
];

export const PRIX = {
  heure: 48,
  frais: "Déplacement compris dans un rayon de 15 km. Aucun frais de dossier.",
  tva: "TVA non applicable, art. 293 B du CGI",
};

export const CONCERT = {
  date: "Dimanche 15 novembre 2026",
  heure: "17\u00a0h",
  chez: "chez Mireille, une élève",
  eleves: 6,
  chaises: 12,
  programme: ["Erik Satie — Gymnopédie n° 1", "Claude Debussy — Clair de lune (le début)", "Ludwig van Beethoven — Lettre à Élise", "Johann Pachelbel — Canon (les huit accords)"],
};

/** Les douze chaises du concert. Les chaises prises sont un exemple. */
export const CHAISES_PRISES = [0, 1, 4, 7, 8];

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  { q: "Je n'ai pas joué depuis vingt ans. C'est trop tard ?", r: "Non. Les doigts se souviennent de plus de choses qu'on ne croit, et on ne recommence pas par les gammes : on recommence par un morceau que tu as envie d'entendre chez toi." },
  { q: "Mon piano n'a pas été accordé depuis des années.", r: "Commence quand même. S'il le faut, on fera venir un accordeur ; ce n'est pas compris dans le prix du cours, et je te le dirai avant." },
  { q: "Et le solfège ?", r: "Il vient au fil du morceau, quand on en a besoin. Pas en premier, pas en entier, et pas à l'accueil." },
  { q: "En combien de temps je jouerai mon morceau ?", r: "Je ne sais pas, et personne ne le sait. Le chemin a quatre étapes ; certains les passent en un mois, d'autres en un an. On avance au rythme de tes soirées." },
  { q: "Le concert, c'est obligatoire ?", r: "Non. On joue si on veut, ce qu'on veut, même huit mesures. Les voisins applaudissent tout." },
];
