// Les contenus du site L'Heure Dite, entreprise fictive : noms, prix, numéros et délais
// sont des exemples. Les règles citées sont réelles et datées dans
// Videos/marque-solaire-pac/SOURCES.md.

export const DOSSIER = "/exemples/l-heure-dite";

export const entreprise = {
  nom: "L'Heure Dite",
  signature: "On appelle à l'heure que vous dites.",
  // Tranche réservée par l'ARCEP aux œuvres de fiction : ce numéro ne sonne chez personne.
  telephone: "01 99 00 27 48",
  zone: "Exemple-Ville et 50 km autour",
  rge: "00 000 000",
  decennale: "00 000 000",
  siret: "000 000 000 00000",
};

/** Le message de l'annexe I de l'arrêté du 7 juillet 2026, reproduit sans en changer un mot. */
export const FRANCE_RENOV = {
  message:
    "Avant de vous engager, le service public vous informe gratuitement pour préparer et sécuriser votre projet : www.france-renov.gouv.fr",
  lien: "https://france-renov.gouv.fr/servicepublic",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/rendez-vous`, libelle: "Choisir mon heure" },
  { href: `${DOSSIER}/pompes-a-chaleur`, libelle: "Nos pompes à chaleur" },
  { href: `${DOSSIER}#questions`, libelle: "Questions" },
];

/** Les heures d'appel proposées chaque jour ouvrable : celles que l'équipe tient vraiment. */
export const HEURES = [
  { id: "9", libelle: "9 h", parle: "9 h" },
  { id: "12-30", libelle: "12 h 30", parle: "12 h 30" },
  { id: "18", libelle: "18 h", parle: "18 h" },
];

export const photos = {
  horloge: { src: "/exemples/l-heure-dite/horloge-verte.webp", largeur: 1100, hauteur: 1373, alt: "Une horloge murale au cadre vert, sur un mur de carreaux blancs, qui marque midi" },
  unite: { src: "/exemples/l-heure-dite/unite-exterieure.webp", largeur: 1400, hauteur: 933, alt: "L'unité extérieure d'une pompe à chaleur fixée sur un mur blanc, sous un ciel bleu" },
  radiateur: { src: "/exemples/l-heure-dite/radiateur-salon.webp", largeur: 1000, hauteur: 1375, alt: "Un radiateur blanc sous une fenêtre, à côté d'un canapé vert pâle et d'une plante" },
  fauteuil: { src: "/exemples/l-heure-dite/fauteuil-fenetre.webp", largeur: 1000, hauteur: 1500, alt: "Un fauteuil ancien près d'une grande fenêtre, un radiateur sous l'allège, un parquet en chevrons" },
};

export const ETAPES = [
  { titre: "Tu choisis ton créneau", texte: "Un jour parmi les cinq prochains jours ouvrables, une heure parmi celles qu'on tient. Comme chez le coiffeur." },
  { titre: "On appelle à cette heure-là", texte: "Mardi, 18 h ? Mardi, 18 h. Pas une minute avant, pas un autre jour." },
  { titre: "On ne parle que de ton devis", texte: "L'appel porte sur ta demande et sur rien d'autre. Si ta maison s'y prête, on fixe une visite." },
];

export const POMPES = [
  {
    nom: "Air / eau",
    phrase: "Elle remplace la chaudière.",
    texte: "Elle prend les calories de l'air dehors et chauffe l'eau de tes radiateurs ou de ton plancher, et souvent l'eau chaude.",
    prix: "12 900 €",
  },
  {
    nom: "Air / air",
    phrase: "Elle chauffe pièce par pièce.",
    texte: "Une unité dehors, des unités dans les pièces de vie. Pour une maison sans radiateurs à eau, ou en appoint.",
    prix: "6 900 €",
  },
  {
    nom: "Chauffe-eau thermodynamique",
    phrase: "Il chauffe l'eau du ballon.",
    texte: "Le même principe, pour l'eau chaude seulement. Il se pose souvent dans le garage ou la buanderie.",
    prix: "3 200 €",
  },
];

export const VISITE = [
  "Les déperditions de ta maison, pièce par pièce : murs, fenêtres, toiture",
  "Tes émetteurs : radiateurs, plancher, et la température qu'il leur faut",
  "La place de l'unité extérieure : bruit, voisins, écoulement",
  "Ton tableau électrique et ce qu'il peut porter",
];

export const QUESTIONS = [
  {
    q: "Pourquoi seulement cinq jours ?",
    r: "Parce que c'est la règle. Pour ces travaux, un professionnel ne peut rappeler un particulier qui le lui a demandé que dans les cinq jours ouvrables suivant sa demande, et seulement à son sujet (C. consom., art. R223-4). Au-delà, l'appel redevient du démarchage, interdit.",
  },
  {
    q: "Et si je rate l'appel ?",
    r: "On ne rappelle pas au hasard. Tu reprends un créneau ici, quand tu veux : c'est une nouvelle demande, avec ses cinq jours ouvrables.",
  },
  {
    q: "Le samedi compte ?",
    r: "Oui : un jour ouvrable, c'est tous les jours sauf le dimanche et les jours fériés. Le site recalcule la liste chaque jour et retire les jours fériés.",
  },
  {
    q: "Combien d'aides vais-je toucher ?",
    r: "On ne t'en promet aucune, et ce site n'en chiffre aucune : elles changent et dépendent de ta situation. France Rénov', le service public, t'informe gratuitement — le lien est en haut de chaque page.",
  },
  {
    q: "Êtes-vous RGE ?",
    r: "Oui, dans cet exemple : qualification n° 00 000 000. Avant toute signature, on te le dit par écrit, avec ce que cela change pour les aides, comme la loi l'exige de tous (C. consom., art. L224-114).",
  },
  {
    q: "Vous allez m'appeler pour me proposer une pompe à chaleur ?",
    r: "Non. Personne n'en a le droit : pour ces travaux, le démarchage d'un particulier est interdit à tous les professionnels. On n'appelle qu'à l'heure que tu as choisie ici.",
  },
];
