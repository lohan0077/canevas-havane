// Tout ce qu'affiche le site de Lundi d'Après, agence d'événements d'entreprise
// imaginaire. Entreprise fictive : chaque prix, chaque phrase, chaque date est un
// exemple, et le site le dit.
//
// Les règles tenues ici (voir Videos/marque-evenementiel/SOURCES.md) :
//   - aucun faux témoignage : les « phrases du lundi » montrées sont des exemples,
//     marqués comme tels ; une vraie phrase ne se publie qu'avec l'accord de
//     l'entreprise cliente et de la personne (C. consom., art. L. 121-4, 28° ;
//     Code civil, art. 9) ;
//   - clients professionnels : prix hors taxes, et le site le dit ;
//   - aucune boisson alcoolisée annoncée ni montrée ;
//   - les croissants du lancement sont achetés chez un boulanger et livrés dans les
//     bureaux, sans achat imposé.

export const DOSSIER = "/exemples/lundi-d-apres";

export const entreprise = {
  nom: "Lundi d'Après",
  telephone: "01 99 00 41 07",
  telephoneLien: "+33199004107",
  siret: "000 000 000 00000",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/a-l-envers`, libelle: "La soirée à l'envers" },
  { href: `${DOSSIER}/la-phrase-du-lundi`, libelle: "La phrase du lundi" },
  { href: `${DOSSIER}/formats`, libelle: "Formats et prix" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };

export const photos = {
  croissants: { src: `${DOSSIER}/croissants.webp`, largeur: 1200, hauteur: 800, alt: "Des croissants dorés tout juste sortis du four, alignés sur du papier cuisson" },
  cafe: { src: `${DOSSIER}/cafe.webp`, largeur: 1200, hauteur: 805, alt: "Une tasse de café au dessin de mousse en feuille, devant des croissants et des pains au chocolat" },
  micro: { src: `${DOSSIER}/micro.webp`, largeur: 1200, hauteur: 1600, alt: "Un micro sur son pied, seul devant un mur orange vif" },
} satisfies Record<string, Photo>;

export type Moment = { heure: string; titre: string; texte: string };
export type Theme = { mots: RegExp; nom: string; moment: Moment; diner: Moment };

/**
 * La soirée construite à l'envers : on lit la phrase que les équipes doivent se
 * raconter lundi, on y cherche ce qui doit arriver, et on remonte jusqu'à l'accueil.
 * Tout se calcule dans le navigateur, à partir de mots-clés ; un vrai projet se
 * construirait en rendez-vous.
 */
export const THEMES: Theme[] = [
  {
    mots: /chant|karaok|micro|chanson/i,
    nom: "chant",
    moment: { heure: "23 h", titre: "Le karaoké", texte: "La scène s'allume, les paroles défilent, et quelqu'un de la compta prend le micro en premier. On l'a prévenu, pas les autres." },
    diner: { heure: "21 h", titre: "Le dîner, en équipes mélangées", texte: "Plan de table tiré au sort : on chante mieux devant des gens qu'on vient de rencontrer." },
  },
  {
    mots: /dans[eéè]|danser|dansai|piste|\bbal\b|valse|rock/i,
    nom: "danse",
    moment: { heure: "23 h", titre: "La piste", texte: "Un cours de danse de vingt minutes, puis la piste. Le premier rang, c'est la direction." },
    diner: { heure: "21 h", titre: "Le dîner", texte: "Court, pour garder de l'énergie. Le dessert arrive au moment où la musique monte." },
  },
  {
    mots: /cuisin|recette|pâtiss|dessert|gâteau|tarte/i,
    nom: "cuisine",
    moment: { heure: "22 h", titre: "Le concours de desserts", texte: "Par équipes, avec un chef. Le jury goûte à l'aveugle ; personne ne sait qui a fait quoi." },
    diner: { heure: "20 h", titre: "L'atelier cuisine", texte: "Chaque table prépare un plat du dîner. Les services se mélangent autour des fourneaux." },
  },
  {
    mots: /quiz|\bjeux?\b|gagn|perdu|énigme/i,
    nom: "jeu",
    moment: { heure: "22 h", titre: "La grande finale du quiz", texte: "Les deux meilleures tables, sur scène, buzzer en main. La salle entière vote pour la question bonus." },
    diner: { heure: "20 h 30", titre: "Le dîner-quiz", texte: "Une question entre chaque plat. Les équipes sont les tables, et les tables sont mélangées." },
  },
  {
    mots: /\bri\b|rire|rigol|drôle|blague|impro/i,
    nom: "rire",
    moment: { heure: "22 h 30", titre: "Le spectacle d'improvisation", texte: "Les comédiens jouent les histoires que les équipes ont écrites pendant le dîner. Sans nommer personne." },
    diner: { heure: "20 h 30", titre: "Le dîner aux histoires", texte: "Sur chaque table, une carte : « racontez le jour où… ». Les meilleures partent sur scène." },
  },
];

/** Quand la phrase ne dit rien qu'on sache lire : le moment reste à inventer ensemble. */
export const THEME_LIBRE: Theme = {
  mots: /$^/,
  nom: "libre",
  moment: { heure: "23 h", titre: "Le moment de votre phrase", texte: "Celui qu'on inventera ensemble en rendez-vous : c'est lui qui fera dire votre phrase, lundi." },
  diner: { heure: "21 h", titre: "Le dîner", texte: "Préparé pour que ce moment arrive au bon endroit, à la bonne heure." },
};

export const ACCUEIL: Moment = { heure: "19 h", titre: "L'accueil", texte: "Un badge sans fonction, seulement un prénom. Personne ne sait qui est chef de qui avant 23 h." };

export const themeDe = (phrase: string) => THEMES.find((t) => t.mots.test(phrase)) ?? THEME_LIBRE;

export const EXEMPLES_PHRASES = [
  "On ne savait pas que la compta chantait aussi bien.",
  "La direction a perdu au quiz, et elle l'a bien pris.",
  "Le stagiaire a gagné le concours de desserts.",
];

export const FORMATS = [
  { nom: "La soirée d'entreprise", prix: "à partir de 95 € HT par personne", detail: "De l'accueil à la dernière chanson. Lieu, dîner, animation et la phrase du lundi, construits ensemble." },
  { nom: "Le séminaire", prix: "à partir de 260 € HT par personne", detail: "Une journée de travail, une soirée qu'on raconte. Salles, repas, transport et soirée." },
  { nom: "La fête de fin d'année", prix: "à partir de 75 € HT par personne", detail: "Pour toute l'entreprise, familles comprises si vous le voulez." },
];

export const METHODE = [
  { titre: "La phrase", texte: "Avant le lieu, avant le traiteur, avant la date : la phrase que vos équipes doivent se raconter lundi." },
  { titre: "L'envers", texte: "On remonte le temps : ce qui doit arriver à 23 h pour que la phrase existe, puis ce qu'il faut à 21 h, puis à 19 h." },
  { titre: "Le vendredi", texte: "La soirée se déroule. Nous, on regarde l'heure, et on vérifie que le moment arrive." },
  { titre: "Le lundi", texte: "On passe à la machine à café. On écoute. Et avec votre accord, on note la vraie phrase." },
];

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  { q: "Et si on n'a pas de phrase ?", r: "C'est souvent le cas au début. On part de ce que vous voulez qu'il reste : que les services se parlent, que les nouveaux soient adoptés, que la direction soit approchable. La phrase vient en rendez-vous." },
  { q: "Vos prix sont hors taxes ?", r: "Oui : nos clients sont des entreprises. Les prix affichés sont des exemples, hors taxes, par personne ; le devis dit tout, ligne par ligne." },
  { q: "Vous publiez les phrases de nos salariés ?", r: "Seulement avec l'accord écrit de votre entreprise, et de la personne si on peut la reconnaître. Sans accord, la phrase reste entre nous." },
  { q: "Vous trouvez le lieu ?", r: "Oui, ou on s'adapte au vôtre. On le choisit pour le moment de 23 h : une scène pour un karaoké, une cuisine pour un concours de desserts." },
  { q: "Combien de temps avant faut-il s'y prendre ?", r: "Trois mois pour une soirée, six pour un séminaire, c'est confortable. Moins, c'est possible : on vous le dit franchement au premier appel." },
];
