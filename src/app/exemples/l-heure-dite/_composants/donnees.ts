// Les contenus de L'Heure Dite, installateur de pompes à chaleur et de panneaux solaires
// imaginaire, filmé dans les deux vidéos du métier « solaire-pac » : « Créer une marque »
// (le nom, l'heure de l'appel choisie par le client, l'affiche et son message France
// Rénov') et « Remplir l'agenda » (le toit heure par heure, le conseil « lance la
// machine », le rappel seulement sur demande et sous cinq jours ouvrables, le lien
// France Rénov' tout en haut). Noms, prix, numéros et délais sont des exemples ; les
// règles citées sont réelles et datées dans les SOURCES.md des deux vidéos et dans
// Videos/regles-metiers/solaire-pac-01-demarchage-interdit.md :
// - démarcher un particulier pour ces travaux est interdit à tous (C. consom., art.
//   L223-1 et L223-8) : le site le dit comme une règle pour tous, jamais comme un mérite
//   (art. L121-4, 10°) ;
// - on ne rappelle que celui qui l'a demandé, dans les cinq jours ouvrables, et
//   seulement à ce sujet (art. R223-4) ;
// - le message de l'annexe I de l'arrêté du 7 juillet 2026, mot pour mot, en tête de
//   chaque page, lien vers france-renov.gouv.fr/servicepublic (art. L122-26) ;
// - aucune aide chiffrée ni promise, aucune économie annoncée ; la courbe du toit est
//   une forme indicative, pas une mesure ; prix TTC, pose comprise, « exemple ».

export const DOSSIER = "/exemples/l-heure-dite";

export const entreprise = {
  nom: "L'Heure Dite",
  signature: "On appelle à l'heure que vous dites.",
  // Tranche réservée par l'ARCEP aux œuvres de fiction : ce numéro ne sonne chez personne.
  telephone: "01 99 00 27 48",
  zone: "Exemple-Ville et 50 km autour",
  adresse: "12 rue de l'Exemple, 00000 Exemple-Ville",
  rge: "00 000 000",
  decennale: "00 000 000",
  siret: "000 000 000 00000",
};

/** Le message de l'annexe I de l'arrêté du 7 juillet 2026, reproduit sans en changer un mot. */
export const FRANCE_RENOV = {
  message:
    "Avant de vous engager, le service public vous informe gratuitement pour préparer et sécuriser votre projet : www.france-renov.gouv.fr",
  lien: "https://france-renov.gouv.fr/servicepublic",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/ma-journee`, libelle: "Ton toit, heure par heure" },
  { href: `${DOSSIER}/pompes-a-chaleur`, libelle: "Pompes à chaleur" },
  { href: `${DOSSIER}/panneaux-solaires`, libelle: "Panneaux solaires" },
  { href: `${DOSSIER}/rendez-vous`, libelle: "Choisir mon heure" },
];

/** Les heures d'appel proposées chaque jour ouvrable : celles que l'équipe tient vraiment. */
export const HEURES = [
  { id: "9", libelle: "9 h", parle: "9 h" },
  { id: "12-30", libelle: "12 h 30", parle: "12 h 30" },
  { id: "18", libelle: "18 h", parle: "18 h" },
];

export const photos = {
  horloge: { src: "/exemples/l-heure-dite/horloge-verte.webp", alt: "Une horloge murale au cadre vert, sur un mur de carreaux blancs, qui marque midi et demi" },
  unite: { src: "/exemples/l-heure-dite/unite-exterieure.webp", alt: "L'unité extérieure d'une pompe à chaleur fixée sur un mur blanc, sous un ciel bleu" },
  radiateur: { src: "/exemples/l-heure-dite/radiateur-salon.webp", alt: "Un radiateur blanc sous une fenêtre, à côté d'un canapé vert pâle et d'une plante" },
  fauteuil: { src: "/exemples/l-heure-dite/fauteuil-fenetre.webp", alt: "Un fauteuil ancien près d'une grande fenêtre, un radiateur sous l'allège, un parquet en chevrons" },
  ciel: { src: "/exemples/l-heure-dite/toits-ciel-bleu.webp", alt: "Une rangée de maisons aux toits pointus couverts de panneaux solaires, sous un ciel bleu" },
  panneaux: { src: "/exemples/l-heure-dite/panneaux-tuiles.webp", alt: "Des panneaux solaires noirs posés à côté de tuiles brunes, au-dessus d'une fenêtre" },
  tuiles: { src: "/exemples/l-heure-dite/toit-tuiles-rouges.webp", alt: "Une dizaine de panneaux solaires sur un toit de tuiles rouges, un arbre au premier plan" },
  linge: { src: "/exemples/l-heure-dite/linge-au-soleil.webp", alt: "Du linge clair qui sèche au soleil sur un cintre en bois" },
  gris: { src: "/exemples/l-heure-dite/toits-ciel-gris.webp", alt: "Des toits d'immeubles et leurs cheminées sous un ciel gris" },
};

/* ---------- L'appel, à l'heure dite ---------- */

export const ETAPES_APPEL = [
  { titre: "Tu choisis ton créneau", texte: "Un jour parmi les cinq prochains jours ouvrables, une heure parmi celles qu'on tient. Comme chez le coiffeur." },
  { titre: "On appelle à cette heure-là", texte: "Mardi, 18 h ? Mardi, 18 h. Pas une minute avant, pas un autre jour." },
  { titre: "On ne parle que de ton devis", texte: "L'appel porte sur ta demande et sur rien d'autre. Si ta maison s'y prête, on fixe une visite." },
];

/* ---------- Ce qu'on installe ---------- */

export const POMPES = [
  {
    nom: "Air / eau",
    phrase: "Elle remplace la chaudière.",
    texte: "Elle prend les calories de l'air dehors et chauffe l'eau de tes radiateurs ou de ton plancher, et souvent l'eau chaude.",
    prix: "12\u202F900\u00A0€",
  },
  {
    nom: "Air / air",
    phrase: "Elle chauffe pièce par pièce.",
    texte: "Une unité dehors, des unités dans les pièces de vie. Pour une maison sans radiateurs à eau, ou en appoint.",
    prix: "6\u202F900\u00A0€",
  },
  {
    nom: "Chauffe-eau thermodynamique",
    phrase: "Il chauffe l'eau du ballon.",
    texte: "Le même principe, pour l'eau chaude seulement. Il se pose souvent dans le garage ou la buanderie.",
    prix: "3\u202F200\u00A0€",
  },
];

export const PANNEAUX = [
  { taille: "Petit toit", detail: "8 panneaux, environ 15 m²", prix: "7\u202F900\u00A0€" },
  { taille: "Toit moyen", detail: "14 panneaux, environ 27 m²", prix: "12\u202F400\u00A0€" },
  { taille: "Grand toit", detail: "20 panneaux, environ 38 m²", prix: "16\u202F900\u00A0€" },
];

export const POSE_SOLAIRE = [
  { titre: "Les panneaux", texte: "Posés sur ta toiture, dans le sens où ton toit regarde. On te dit à la visite combien il en tient, et où l'ombre d'une cheminée les gênerait." },
  { titre: "Ta courbe, chaque jour", texte: "Après la pose, le suivi te montre ta vraie journée sur ton téléphone : la forme de « Ton toit, heure par heure », mais mesurée sur ton toit." },
  { titre: "La mise en service", texte: "Raccordement, contrôle, et un rendez-vous pour régler avec toi l'heure de départ de tes appareils programmables." },
];

export const VISITE = [
  "Les déperditions de ta maison, pièce par pièce : murs, fenêtres, toiture",
  "Tes émetteurs : radiateurs, plancher, et la température qu'il leur faut",
  "Ton toit : orientation, pente, ombres, état de la charpente",
  "La place de l'unité extérieure : bruit, voisins, écoulement",
  "Ton tableau électrique et ce qu'il peut porter",
];

/** Le chemin, de la demande au premier midi, et à la première soirée au chaud. */
export const ETAPES = [
  { moment: "Sur le site", titre: "Tu choisis ton heure", texte: "Tu coches que tu veux être appelé, pour ton projet et rien d'autre. Tu choisis le jour, parmi les cinq prochains jours ouvrables, et l'heure." },
  { moment: "À l'heure dite", titre: "L'appel", texte: "Mardi, 18 h, si c'est ce que tu as choisi. On parle de ta demande, et seulement d'elle." },
  { moment: "Chez toi, une heure", titre: "La visite", texte: "Ton toit, tes radiateurs, ton tableau électrique. On mesure, on ne devine pas." },
  { moment: "Avant de signer", titre: "Le devis écrit", texte: "Le prix ferme, la date de pose, et notre qualification RGE dite par écrit, avec ce qu'elle change pour les aides." },
  { moment: "Après la pose", titre: "Ton premier midi", texte: "On règle avec toi l'heure de départ de la machine, du lave-vaisselle, du chauffe-eau. Et le soir, la maison est au chaud." },
];

export const DEFILE = [
  "Mardi, 18 h",
  "Pas une minute avant",
  "Plein sud, vers 13 h 30",
  "Lance la machine à 12 h 30",
  "Rappel seulement sur demande",
  "Dans les cinq jours ouvrables",
  "Et quand il fait gris ?",
  "France Rénov', tout en haut",
];

export const QUESTIONS = [
  {
    q: "Pourquoi seulement cinq jours ?",
    r: "Parce que c'est la règle. Pour ces travaux, un professionnel ne peut rappeler un particulier qui le lui a demandé que dans les cinq jours ouvrables suivant sa demande, et seulement à son sujet (C. consom., art. R223-4). Au-delà, l'appel redevient du démarchage, interdit.",
  },
  {
    q: "Vous allez m'appeler pour me proposer une pompe à chaleur ou des panneaux ?",
    r: "Non. Personne n'en a le droit : pour ces travaux, le démarchage d'un particulier par téléphone, SMS, e-mail ou réseaux sociaux est interdit à tous les professionnels. On n'appelle qu'à l'heure que tu as choisie ici.",
  },
  {
    q: "Et quand il fait gris ?",
    r: "Ton toit produit beaucoup moins, mais il ne s'arrête pas : la lumière passe à travers les nuages. Dans « Ton toit, heure par heure », touche « Gris » : la courbe s'aplatit. On ne t'annonce aucun chiffre ; on mesure ton vrai toit à la visite.",
  },
  {
    q: "Mon toit regarde l'est ou l'ouest. Ça vaut le coup ?",
    r: "La courbe glisse vers le matin ou vers le soir, au lieu de culminer vers midi. Ce n'est ni mieux ni moins bien en soi : ça dépend des heures où tu consommes. C'est exactement ce que montre la courbe.",
  },
  {
    q: "Combien d'aides vais-je toucher ?",
    r: "On ne t'en promet aucune, et ce site n'en chiffre aucune : elles changent et dépendent de ta situation. France Rénov', le service public, t'informe gratuitement — le lien est tout en haut de chaque page.",
  },
  {
    q: "Êtes-vous RGE ?",
    r: "Oui, dans cet exemple : qualification n° 00 000 000. Avant toute signature, on te le dit par écrit, avec ce que cela change pour les aides, comme la loi l'exige de tous (C. consom., art. L224-114).",
  },
  {
    q: "Et si je rate l'appel ?",
    r: "On ne rappelle pas au hasard. Tu reprends un créneau ici, quand tu veux : c'est une nouvelle demande, avec ses cinq jours ouvrables.",
  },
];
