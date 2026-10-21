// Les contenus du site Midi Pile, entreprise fictive : noms, prix, numéros et
// délais sont des exemples. Les règles citées sont réelles et datées dans
// Videos/agenda-solaire-pac/SOURCES.md.

export const DOSSIER = "/exemples/midi-pile";

export const entreprise = {
  nom: "Midi Pile",
  // Tranche réservée par l'ARCEP aux œuvres de fiction : ce numéro ne sonne chez personne.
  telephone: "01 99 00 41 12",
  horaires: "du lundi au vendredi, 8 h – 18 h",
  zone: "Exemple-Ville et 40 km autour",
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
  { href: `${DOSSIER}/ma-journee`, libelle: "Ma journée" },
  { href: `${DOSSIER}#prix`, libelle: "Prix" },
  { href: `${DOSSIER}#methode`, libelle: "Comment ça se passe" },
  { href: `${DOSSIER}/etre-rappele`, libelle: "Être rappelé" },
];

export const photos = {
  ciel: { src: "/exemples/midi-pile/toits-ciel-bleu.webp", largeur: 1600, hauteur: 1048, alt: "Une rangée de maisons aux toits pointus couverts de panneaux solaires, sous un ciel bleu" },
  panneaux: { src: "/exemples/midi-pile/panneaux-tuiles.webp", largeur: 1000, hauteur: 1500, alt: "Des panneaux solaires noirs posés à côté de tuiles brunes, au-dessus d'une fenêtre" },
  tuiles: { src: "/exemples/midi-pile/toit-tuiles-rouges.webp", largeur: 1200, hauteur: 801, alt: "Une dizaine de panneaux solaires sur un toit de tuiles rouges, un arbre au premier plan" },
  linge: { src: "/exemples/midi-pile/linge-au-soleil.webp", largeur: 1200, hauteur: 800, alt: "Du linge clair qui sèche au soleil sur un cintre en bois" },
  gris: { src: "/exemples/midi-pile/toits-ciel-gris.webp", largeur: 1200, hauteur: 800, alt: "Des toits d'immeubles et leurs cheminées sous un ciel gris" },
};

export const POSE = [
  {
    titre: "Les panneaux",
    texte: "Posés sur ta toiture, dans le sens où ton toit regarde. On te dit à la visite combien il en tient, et où l'ombre d'une cheminée les gênerait.",
  },
  {
    titre: "Ta courbe, chaque jour",
    texte: "Après la pose, le suivi te montre ta vraie journée sur ton téléphone : la forme de cette page, mais mesurée sur ton toit.",
  },
  {
    titre: "La mise en service",
    texte: "Raccordement, contrôle, et un rendez-vous pour régler avec toi l'heure de départ de tes appareils programmables.",
  },
];

export const PRIX = [
  { taille: "Petit toit", detail: "8 panneaux, environ 15 m²", prix: "7 900 €" },
  { taille: "Toit moyen", detail: "14 panneaux, environ 27 m²", prix: "12 400 €" },
  { taille: "Grand toit", detail: "20 panneaux, environ 38 m²", prix: "16 900 €" },
];

export const METHODE = [
  { etape: "Ta demande", texte: "Sur ce site, tu coches que tu veux être rappelé, pour ton projet et rien d'autre." },
  { etape: "Le rappel", texte: "Dans les cinq jours ouvrables. On parle de ta demande, et seulement d'elle." },
  { etape: "La visite du toit", texte: "Orientation, pente, ombres, état de la charpente. On mesure, on ne devine pas." },
  { etape: "Le devis écrit", texte: "Le prix ferme, la date de pose, et notre qualification RGE dite par écrit, avant toute signature." },
  { etape: "La pose", texte: "Un à deux jours sur le toit selon sa taille (exemple). Le raccordement prend plus de temps : la date est au devis." },
  { etape: "Ton premier midi", texte: "On règle avec toi l'heure de départ de la machine, du lave-vaisselle, du chauffe-eau." },
];

export const QUESTIONS = [
  {
    q: "Et quand il fait gris ?",
    r: "Ton toit produit beaucoup moins, mais il ne s'arrête pas : la lumière passe à travers les nuages. Dans « Ma journée », touche « Gris » : la courbe s'aplatit. On ne t'annonce aucun chiffre ; on mesure ton vrai toit à la visite.",
  },
  {
    q: "Mon toit regarde l'est ou l'ouest. Ça vaut le coup ?",
    r: "La courbe glisse vers le matin ou vers le soir, au lieu de culminer vers midi. Ce n'est ni mieux ni moins bien en soi : ça dépend des heures où tu consommes. C'est exactement ce que montre « Ma journée ».",
  },
  {
    q: "Combien d'aides vais-je toucher ?",
    r: "On ne t'en promet aucune, et ce site n'en chiffre aucune : les conditions changent et dépendent de ta situation. France Rénov', le service public, t'informe gratuitement — le lien est tout en haut de chaque page.",
  },
  {
    q: "Êtes-vous RGE ?",
    r: "Oui, dans cet exemple : qualification n° 00 000 000. Avant toute signature, on te le dit par écrit, avec ce que cela change pour les aides : la loi l'exige de tous les professionnels (C. consom., art. L224-114).",
  },
  {
    q: "Allez-vous m'appeler pour me proposer des panneaux ?",
    r: "Non, et personne ne le peut : pour ces travaux, le démarchage par téléphone, SMS, e-mail ou réseaux sociaux est interdit à tous les professionnels. On ne rappelle que si tu l'as demandé ici.",
  },
  {
    q: "Je ne suis pas chez moi à midi.",
    r: "Les appareils programmables partent seuls à l'heure que tu choisis. C'est l'heure que « Ma journée » te propose, selon l'orientation de ton toit.",
  },
];
