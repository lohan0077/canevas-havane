// Les données d'« Et s'il pleut », la wedding planner imaginaire des deux vidéos des
// wedding planners : « Créer une marque » (le plan B prévu, chiffré, réservé ; chaque
// mariage en deux versions, soleil ou pluie ; cent parapluies jaunes aux prénoms des
// mariés) et « Remplir l'agenda » (une seule question sur l'accueil, « tu te maries
// quand ? », et le rétroplanning mois par mois ; le prix sur l'accueil ; les coulisses
// plutôt que les couchers de soleil ; être invité à son propre mariage). Tout est
// inventé ; les prix sont des exemples, TTC (des particuliers). Garde-fous tenus
// partout (SOURCES.md des deux vidéos) : le plan B figure réellement au devis ; aucune
// photo de vrais mariés ; aucun avis, aucune note, aucun nombre de mariages ; aucun
// prestataire nommé ; aucune prévision météo présentée comme vraie (la date montrée
// est un exemple) ; les coulisses ne se publient qu'avec l'accord écrit des mariés, et
// l'épisode montré est un exemple écrit pour la démonstration.

export const DOSSIER = "/exemples/et-s-il-pleut";

export const entreprise = {
  nom: "Et s'il pleut",
  signature: "On a toujours un plan B.",
  metier: "Wedding planner",
  region: "Rouen et la Normandie",
  adresse: "12 rue de l'Exemple, 76000 Rouen",
  telephone: "06 39 98 52 63",
  telephoneLien: "+33639985263",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/deux-versions`, libelle: "Deux versions" },
  { href: `${DOSSIER}/formules`, libelle: "Les prix" },
  { href: `${DOSSIER}/parapluies`, libelle: "Les parapluies" },
  { href: `${DOSSIER}/coulisses`, libelle: "Les coulisses" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const P = DOSSIER;
export const photos = {
  fenetre: { src: `${P}/fenetre-pluie.webp`, largeur: 1200, hauteur: 900, alt: "Des gouttes de pluie sur une vitre, des arbres verts flous derrière" },
  jardin: { src: `${P}/table-jardin.webp`, largeur: 1200, hauteur: 800, alt: "Une longue table en bois dressée dans un jardin au soleil, serviettes bleu clair et fleurs jaunes" },
  grange: { src: `${P}/grange.webp`, largeur: 1200, hauteur: 1798, alt: "L'intérieur d'une grange aux poutres apparentes, dressée pour une réception, un lustre et des fleurs" },
  parapluies: { src: `${P}/parapluies-jaunes.webp`, largeur: 1400, hauteur: 1400, alt: "Des dizaines de parapluies jaunes ouverts, serrés les uns contre les autres" },
  lac: { src: `${P}/parapluie-lac.webp`, largeur: 1400, hauteur: 2100, alt: "Un parapluie jaune posé à la surface d'un lac, des arbres qui s'y reflètent" },
  arche: { src: `${P}/arche-jardin.webp`, largeur: 800, hauteur: 1200, alt: "Une arche de fleurs dans un jardin clos, des chaises blanches de part et d'autre d'une allée d'herbe" },
  chaises: { src: `${P}/chaises-fleurs.webp`, largeur: 1400, hauteur: 2100, alt: "Des rangées de chaises en bois, décorées de fleurs des champs et de rubans blancs" },
  soir: { src: `${P}/ceremonie-soir.webp`, largeur: 1100, hauteur: 719, alt: "Une cérémonie installée sur une pelouse, au coucher du soleil, sous de grands sapins" },
} satisfies Record<string, Photo>;

export type Moment = { moment: string; heure: string; soleil: string; pluie: string };

/** Le mariage d'exemple, en deux versions. */
export const MOMENTS: Moment[] = [
  { moment: "Cérémonie", heure: "15 h", soleil: "Sous le vieux tilleul", pluie: "Dans la grange, bancs en arc" },
  { moment: "Cocktail", heure: "16 h 30", soleil: "Dans le verger", pluie: "Sous la halle, côté cour" },
  { moment: "Photos", heure: "18 h", soleil: "Au coucher du soleil, dans le pré", pluie: "Sous cent parapluies jaunes" },
  { moment: "Dîner", heure: "20 h", soleil: "La grande table du pré", pluie: "Tables rondes dans la grange" },
  { moment: "Danse", heure: "23 h", soleil: "Parquet en plein air", pluie: "Parquet dans la grange, portes ouvertes" },
];

/** Le devis d'exemple (formule « De A à Z, deux fois ») : les deux versions, chacune chiffrée. Prix TTC d'exemple. */
export const DEVIS = {
  commun: [
    { poste: "Organisation complète, jusqu'au jour J", prix: 4550 },
    { poste: "Cent parapluies jaunes aux prénoms des mariés", prix: 650 },
  ],
  soleil: [
    { poste: "Grande table et bancs dans le pré", prix: 780 },
    { poste: "Guirlandes lumineuses au-dessus du parquet", prix: 420 },
  ],
  pluie: [
    { poste: "Grange réservée à la même date, dès la signature", prix: 900 },
    { poste: "Tables rondes, nappes et chauffage d'appoint", prix: 540 },
  ],
};

/** Le protocole météo, le même pour chaque mariage. */
export const PROTOCOLE = [
  { quand: "J-7", texte: "On regarde le ciel, ensemble, et on prévient les prestataires des deux versions.", photo: "fenetre" as const },
  { quand: "J-2, 10 h", texte: "On décide avec toi : soleil ou pluie. Une seule décision, prise à l'avance.", photo: "jardin" as const },
  { quand: "J-1", texte: "On installe la version choisie. L'autre reste prête, au cas où le ciel hésite.", photo: "grange" as const },
  { quand: "Jour J", texte: "Tu n'as plus à regarder la météo. Ce jour-là, ta seule place est celle d'invité, à ton propre mariage.", photo: "chaises" as const },
];

export type Formule = { id: string; titre: string; sous: string; prix: number; compris: string[] };

/** Trois formules, plan B compris dans chacune. Prix TTC d'exemple, affichés sur l'accueil. */
export const FORMULES: Formule[] = [
  { id: "jour-j", titre: "Le jour J, deux fois", sous: "Coordination du jour J", prix: 1500, compris: ["Deux rendez-vous avant le mariage", "Le déroulé en deux versions, minute par minute", "Le protocole météo, de J-7 au jour J", "Présente de 10 h à la dernière danse"] },
  { id: "moitie", titre: "La moitié du chemin", sous: "Organisation partielle", prix: 3200, compris: ["Tout « Le jour J, deux fois »", "Ton rétroplanning, suivi chaque mois", "Trois prestataires trouvés ensemble, briefés sur les deux versions", "Le budget des deux versions, tenu à jour"] },
  { id: "a-z", titre: "De A à Z, deux fois", sous: "Organisation complète", prix: 5200, compris: ["Tout « La moitié du chemin »", "Le lieu et son plan B, trouvés et réservés ensemble", "Tous les prestataires, réservés", "Les cent parapluies jaunes"] },
];

/** Les étapes du rétroplanning, en mois avant le mariage : un ordre courant, pas une norme. */
export const ETAPES = [
  { mois: 12, titre: "Le lieu, et son plan B" },
  { mois: 10, titre: "Le traiteur" },
  { mois: 9, titre: "Le photographe" },
  { mois: 8, titre: "La tenue" },
  { mois: 6, titre: "Les faire-part" },
  { mois: 4, titre: "La musique et la déco" },
  { mois: 2, titre: "Le plan de table, en deux versions" },
  { mois: 1, titre: "Les derniers essayages" },
];

export const QUESTIONS = [
  { question: "Combien coûte une wedding planner ?", reponse: "Chez nous, dès 1 500 € TTC pour le jour J, dès 3 200 € pour la moitié du chemin, dès 5 200 € pour tout organiser — plan B compris à chaque fois. Prix d'exemple, affichés ici plutôt que dans un PDF." },
  { question: "Le plan B coûte-t-il plus cher ?", reponse: "Il est chiffré dans le devis, ligne par ligne, dès le premier jour. Tu sais ce que coûte chaque version avant de signer : pas de supplément découvert la veille." },
  { question: "Et si le ciel hésite ?", reponse: "On décide à J-2, à 10 h, avec toi. La version choisie s'installe la veille ; l'autre reste prête. Le jour J, personne ne regarde le ciel." },
  { question: "Combien de temps à l'avance faut-il s'y prendre ?", reponse: "Un an, c'est confortable ; six mois, c'est faisable. Entre ta date sur l'accueil : le rétroplanning te dit ce qui presse." },
  { question: "Que deviennent les parapluies ?", reponse: "Les invités repartent avec. Les prénoms et la date sont sur l'étiquette, pas sur la toile : le parapluie resservira." },
  { question: "Vous travaillez avec quels prestataires ?", reponse: "Ceux que tu choisis. On t'en propose plusieurs, on ne t'en impose aucun, et on n'est payés que par toi." },
  { question: "Et s'il fait beau ?", reponse: "Tant mieux. La grange réservée sert de vestiaire et de coin des enfants : le plan B n'est jamais perdu." },
];

/** « 1 500 € » : espace fine insécable pour les milliers, espace insécable avant €. */
export const euros = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;
