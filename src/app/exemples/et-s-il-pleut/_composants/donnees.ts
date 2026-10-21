// Les données d'« Et s'il pleut », marque de wedding planner imaginaire (vidéo « Créer
// une marque — wedding planners »). Tout est inventé ; les prix sont des exemples, TTC
// (des particuliers). Garde-fous tenus partout (SOURCES.md de la vidéo) : le plan B
// figure réellement au devis (« les deux, dans le même devis ») ; aucun « il a plu,
// c'était parfait » tant qu'aucun mariage n'a eu lieu ; aucune photo de mariés ; aucun
// avis, aucune note, aucun nombre de mariages ; aucune prévision météo présentée comme
// vraie (la date montrée est un exemple).

export const DOSSIER = "/exemples/et-s-il-pleut";

export const entreprise = {
  nom: "Et s'il pleut",
  signature: "On a toujours un plan B.",
  metier: "Wedding planner",
  region: "Rouen et la Normandie",
  adresse: "12 rue de l'Exemple, 76000 Rouen",
  telephone: "06\u00A039\u00A098\u00A052\u00A063",
  telephoneLien: "+33639985263",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/deux-versions`, libelle: "Deux versions" },
  { href: `${DOSSIER}/parapluies`, libelle: "Les parapluies" },
  { href: `${DOSSIER}#prix`, libelle: "Les prix" },
];

export const photos = {
  fenetre: { src: "/exemples/et-s-il-pleut/fenetre-pluie.webp", largeur: 1200, hauteur: 900, alt: "Des gouttes de pluie sur une vitre, des arbres verts flous derrière" },
  jardin: { src: "/exemples/et-s-il-pleut/table-jardin.webp", largeur: 1200, hauteur: 800, alt: "Une longue table en bois dressée dans un jardin au soleil, serviettes bleu clair et fleurs jaunes" },
  grange: { src: "/exemples/et-s-il-pleut/grange.webp", largeur: 1200, hauteur: 1798, alt: "L'intérieur d'une grange aux poutres apparentes, dressée pour une réception, un lustre et des fleurs" },
  parapluies: { src: "/exemples/et-s-il-pleut/parapluies-jaunes.webp", largeur: 1400, hauteur: 1400, alt: "Des dizaines de parapluies jaunes ouverts, serrés les uns contre les autres" },
  lac: { src: "/exemples/et-s-il-pleut/parapluie-lac.webp", largeur: 1400, hauteur: 2100, alt: "Un parapluie jaune posé à la surface d'un lac, des arbres qui s'y reflètent" },
};

export type Moment = { moment: string; heure: string; soleil: string; pluie: string };

/** Le mariage d'exemple, en deux versions. */
export const MOMENTS: Moment[] = [
  { moment: "Cérémonie", heure: "15 h", soleil: "Sous le vieux tilleul", pluie: "Dans la grange, bancs en arc" },
  { moment: "Cocktail", heure: "16 h 30", soleil: "Dans le verger", pluie: "Sous la halle, côté cour" },
  { moment: "Photos", heure: "18 h", soleil: "Au coucher du soleil, dans le pré", pluie: "Sous cent parapluies jaunes" },
  { moment: "Dîner", heure: "20 h", soleil: "La grande table du pré", pluie: "Tables rondes dans la grange" },
  { moment: "Danse", heure: "23 h", soleil: "Parquet en plein air", pluie: "Parquet dans la grange, portes ouvertes" },
];

/** Le devis d'exemple : les deux versions, chacune chiffrée. Prix TTC d'exemple. */
export const DEVIS = {
  commun: [
    { poste: "Organisation complète, jusqu'au jour J", prix: 4200 },
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
  { quand: "J-7", texte: "On regarde le ciel, ensemble, et on prévient les prestataires des deux versions." },
  { quand: "J-2, 10 h", texte: "On décide avec toi : soleil ou pluie. Une seule décision, prise à l'avance." },
  { quand: "J-1", texte: "On installe la version choisie. L'autre reste prête, au cas où le ciel hésite." },
  { quand: "Jour J", texte: "Tu n'as plus à regarder la météo. C'est prévu." },
];

export const FORMULES = [
  { titre: "Le jour J, deux fois", sous: "Coordination du jour J, plan B compris", prix: 1500, compris: ["Le déroulé en deux versions", "Le protocole météo, de J-7 au jour J", "Présente de 10 h à la dernière danse"] },
  { titre: "De A à Z, deux fois", sous: "Organisation complète, plan B compris", prix: 5200, compris: ["Le lieu et son plan B, trouvés ensemble", "Chaque prestataire briefé sur les deux versions", "Les cent parapluies jaunes"] },
];

export const QUESTIONS = [
  { question: "Le plan B coûte-t-il plus cher ?", reponse: "Il est chiffré dans le devis, ligne par ligne, dès le premier jour. Tu sais ce que coûte chaque version avant de signer : pas de supplément découvert la veille." },
  { question: "Et si le ciel hésite ?", reponse: "On décide à J-2, à 10 h, avec toi. La version choisie s'installe la veille ; l'autre reste prête. Le jour J, personne ne regarde le ciel." },
  { question: "Que deviennent les parapluies ?", reponse: "Les invités repartent avec. Les prénoms et la date sont sur l'étiquette, pas sur la toile : le parapluie resservira." },
  { question: "Et s'il fait beau ?", reponse: "Tant mieux. La grange réservée sert de vestiaire et de coin des enfants : le plan B n'est jamais perdu." },
];

/** « 1 500 € » : espace insécable pour les milliers et avant €. */
export const euros = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;
