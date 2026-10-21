// Les contenus du site Bon Mardi, entreprise fictive : prix, numéros et délais sont des
// exemples. Les sources sont datées dans Videos/agenda-demenageurs/SOURCES.md.

export const DOSSIER = "/exemples/bon-mardi";

export const entreprise = {
  nom: "Bon Mardi",
  // Tranche réservée par l'ARCEP aux œuvres de fiction : ce numéro ne sonne chez personne.
  telephone: "01 99 00 63 17",
  zone: "Exemple-Ville et alentours",
  siret: "000 000 000 00000",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#calendrier`, libelle: "Prix par date" },
  { href: `${DOSSIER}/ton-demenagement`, libelle: "Jour par jour" },
  { href: `${DOSSIER}/tarifs`, libelle: "Tarifs et devis" },
];

export const photos = {
  route: { src: "/exemples/bon-mardi/camion-sur-la-route.webp", largeur: 1400, hauteur: 788, alt: "Des cartons à l'arrière d'un camion, portes ouvertes sur une rue de quartier au soleil couchant" },
  porte: { src: "/exemples/bon-mardi/cartons-devant-la-porte.webp", largeur: 1000, hauteur: 1500, alt: "Des cartons empilés devant une double porte blanche" },
  piece: { src: "/exemples/bon-mardi/piece-pleine-de-cartons.webp", largeur: 1200, hauteur: 800, alt: "Une pièce vide aux murs blancs, pleine de cartons de toutes tailles" },
  canape: { src: "/exemples/bon-mardi/canape-sous-un-drap.webp", largeur: 1200, hauteur: 800, alt: "Un canapé couvert d'un drap blanc, un lampadaire et des cartons fermés" },
};

export const COMPRIS = [
  { titre: "Le camion", texte: "Un 20 m³ avec hayon, ou deux pour une maison. Il part du dépôt le matin et y revient le soir." },
  { titre: "Deux déménageurs", texte: "Trois à partir d'un T3. Ils portent, protègent, chargent et déchargent." },
  { titre: "La protection", texte: "Couvertures pour les meubles, film pour les matelas, housses pour les canapés." },
  { titre: "Le démontage du lit", texte: "Démonté chez toi, remonté chez toi. Les autres meubles : au devis, si tu le demandes." },
];

export const DEVIS_EXEMPLE = {
  prestation: "Déménagement d'un T2 · 18 m³ · 12 km · mardi · 2 déménageurs, camion 20 m³",
  ht: 575,
  tva: 115,
  ttc: 690,
};

export const QUESTIONS = [
  {
    q: "Pourquoi le mardi est-il moins cher ?",
    r: "Parce que tout le monde veut le samedi de la fin du mois, et que le mardi du milieu du mois, le camion dort au dépôt. Un prix bas en semaine, c'est un camion qui roule au lieu d'attendre. La différence est réelle : c'est la même équipe, le même camion.",
  },
  {
    q: "Le prix du calendrier, c'est celui que je paierai ?",
    r: "C'est un prix indicatif, pour le volume choisi et moins de 30 km. Le prix ferme vient au devis, gratuit, une fois ton volume calculé (visite ou appel vidéo) : il ne change plus ensuite.",
  },
  {
    q: "Le devis est-il payant ?",
    r: "Non. Il est gratuit, écrit, et remis avant tout contrat. Il indique la prestation exacte, le montant HT et TTC, et que ce prix est définitif.",
  },
  {
    q: "Et si je dois décaler ma date ?",
    r: "On la change sans frais jusqu'à 15 jours avant (exemple). Le prix suit la nouvelle date : un samedi de fin de mois coûte plus qu'un mardi.",
  },
  {
    q: "Vous fournissez les cartons ?",
    r: "Oui, à l'unité ou en lot ; leur prix est dans nos tarifs et sur ton devis. Tu peux aussi venir avec les tiens.",
  },
];

/** « Ton déménagement, jour par jour » : ce qu'on fait avant, compté depuis le jour J. */
export const ETAPES = [
  { id: "cartons", decalage: -21, quand: "J-21", quoi: "Commencer les cartons", detail: "Par ce qui ne sert pas : livres, saisons passées, placards du haut. Une pièce par carton, son nom écrit sur deux faces." },
  { id: "adresse", decalage: -14, quand: "J-14", quoi: "Faire les changements d'adresse", detail: "Banque, assurances, employeur, caisses, impôts ; et la réexpédition du courrier, pour les lettres qui suivront." },
  { id: "demonter", decalage: -7, quand: "J-7", quoi: "Prévoir ce qu'on démonte", detail: "On démonte les meubles le jour J s'ils sont au devis ; sinon, c'est maintenant. Garde les vis dans un sachet scotché au meuble." },
  { id: "congelateur", decalage: -2, quand: "J-2", quoi: "Vider le congélateur", detail: "On mange ce qui reste, on donne le reste. Un congélateur plein ne voyage pas." },
  { id: "frigo", decalage: -1, quand: "J-1", quoi: "Débrancher le frigo", detail: "La veille, porte ouverte, une serpillière dessous : il doit être sec pour voyager." },
  { id: "jour", decalage: 0, quand: "Jour J", quoi: "Le camion arrive à 8 h", detail: "Garde sur toi les clés, les papiers, les chargeurs, et le carton de la première nuit." },
];
