// Les données du Grand Samedi, wedding planner imaginaire (vidéo « Remplir l'agenda —
// wedding planners »). Tout est inventé ; les prix sont des exemples, TTC (des
// particuliers). Garde-fous du métier tenus partout : aucune photo de vrais mariés,
// aucun avis ni témoignage, aucun chiffre d'expérience (« 200 mariages »), aucun
// prestataire nommé ; les coulisses ne se publient qu'avec l'accord écrit des mariés,
// et l'épisode montré est un exemple écrit pour la démonstration.

export const DOSSIER = "/exemples/le-grand-samedi";

export const entreprise = {
  nom: "Le Grand Samedi",
  metier: "Wedding planner",
  region: "Bordeaux et la Gironde",
  adresse: "12 rue de l'Exemple, 33000 Bordeaux",
  telephone: "06 39 98 14 27",
  telephoneLien: "+33639981427",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#ma-date`, libelle: "Ma date" },
  { href: `${DOSSIER}/formules`, libelle: "Les prix" },
  { href: `${DOSSIER}/coulisses`, libelle: "Les coulisses" },
];

export const photos = {
  arche: { src: "/exemples/le-grand-samedi/arche-jardin.webp", largeur: 800, hauteur: 1200, alt: "Une arche de fleurs dans un jardin clos, des chaises blanches de part et d'autre d'une allée d'herbe" },
  chaises: { src: "/exemples/le-grand-samedi/chaises-fleurs.webp", largeur: 1400, hauteur: 2100, alt: "Des rangées de chaises en bois, décorées de fleurs des champs et de rubans blancs" },
  soir: { src: "/exemples/le-grand-samedi/ceremonie-soir.webp", largeur: 1100, hauteur: 719, alt: "Une cérémonie installée sur une pelouse, au coucher du soleil, sous de grands sapins" },
};

export type Formule = { id: string; titre: string; sous: string; prix: number; compris: string[] };

export const FORMULES: Formule[] = [
  { id: "jour-j", titre: "Le jour J", sous: "Coordination le jour même", prix: 1200, compris: ["Deux rendez-vous avant le mariage", "Le déroulé, minute par minute", "Présente de 10 h à minuit", "Chaque prestataire briefé la veille"] },
  { id: "moitie", titre: "La moitié du chemin", sous: "Organisation partielle", prix: 2500, compris: ["Tout « Le jour J »", "Ton rétroplanning, suivi chaque mois", "Trois prestataires trouvés ensemble", "Le budget, tenu à jour"] },
  { id: "a-z", titre: "De A à Z", sous: "Organisation complète", prix: 4500, compris: ["Tout « La moitié du chemin »", "Le lieu, trouvé et visité ensemble", "Tous les prestataires, réservés", "Un seul numéro à appeler, jusqu'au dernier invité"] },
];

/** Les étapes du rétroplanning, en mois avant le mariage : un ordre courant, pas une norme. */
export const ETAPES = [
  { mois: 12, titre: "Le lieu et la date" },
  { mois: 10, titre: "Le traiteur" },
  { mois: 9, titre: "Le photographe" },
  { mois: 8, titre: "La tenue" },
  { mois: 6, titre: "Les faire-part" },
  { mois: 4, titre: "La musique et la déco" },
  { mois: 2, titre: "Le plan de table" },
  { mois: 1, titre: "Les derniers essayages" },
];

export const QUESTIONS = [
  { question: "Combien coûte un wedding planner ?", reponse: "Chez nous, dès 1 200 € TTC pour le jour J, dès 2 500 € pour la moitié du chemin, dès 4 500 € pour tout organiser. Prix d'exemple, affichés ici plutôt que dans un PDF." },
  { question: "À quoi sert un wedding planner ?", reponse: "À ce que tu n'aies rien d'autre à faire, le jour J, que d'être là. On tient le déroulé, on répond aux prestataires, on règle ce qui coince — sans que tu le saches." },
  { question: "Combien de temps à l'avance faut-il s'y prendre ?", reponse: "Un an, c'est confortable ; six mois, c'est faisable. Entre ta date sur l'accueil : le rétroplanning te dit ce qui presse." },
  { question: "Vous travaillez avec quels prestataires ?", reponse: "Ceux que tu choisis. On t'en propose plusieurs, on ne t'en impose aucun, et on n'est payés que par toi." },
];

/** « 1 200 € » : espace insécable pour les milliers (Instrument Serif n'a pas l'espace fine) et avant €. */
export const euros = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0")}\u00A0€`;
