// Les données du site Sept Mille Dîners, marque de cuisines imaginée dans la vidéo
// « Si je devais créer une marque de cuisines ». On vend des dîners ; les meubles sont
// fournis.
//
// Règles tenues (voir SOURCES.md de la vidéo) :
// - 7 300 est un calcul dit comme tel (20 ans × 365 soirs), jamais une durée de vie
//   annoncée ;
// - le premier dîner est offert sans condition : il n'est pas compté dans le prix, la
//   cuisine coûte le même prix avec ou sans lui, et rien d'autre n'est à payer
//   (C. consom., art. L121-4, 19°) ; il est cuisiné par un chef à domicile déclaré et
//   assuré (exemple) ;
// - aucune enseigne d'ameublement n'est citée ; prix TTC, pose comprise, « exemple ».

export const DOSSIER = "/exemples/sept-mille-diners";

export const NAVIGATION = [
  { href: `${DOSSIER}/ta-vie`, libelle: "Ta vie, ton plan" },
  { href: `${DOSSIER}/le-premier-diner`, libelle: "Le premier dîner" },
];

export const maison = {
  telephone: "01 99 00 73 00",
  adresse: "12 rue de l'Exemple, Ta Ville",
};

export const photos = {
  table: { src: "/exemples/sept-mille-diners/table-du-soir.webp", largeur: 1400, hauteur: 1867, alt: "Des assiettes partagées sur une table en bois, vues de dessus, des mains qui se servent" },
  cocotte: { src: "/exemples/sept-mille-diners/cocotte.webp", largeur: 1100, hauteur: 795, alt: "Une main remue une cocotte rouge avec une cuillère en bois, sur la plaque d'une cuisine" },
  herbes: { src: "/exemples/sept-mille-diners/herbes.webp", largeur: 1000, hauteur: 667, alt: "Des herbes hachées au couteau sur une planche en bois" },
  service: { src: "/exemples/sept-mille-diners/service.webp", largeur: 1000, hauteur: 714, alt: "Une main sert une soupe dans un bol, le soir, au-dessus de la table" },
};

export type Reponses = { combien: "2" | "4" | "6"; cuisine: "moi" | "deux" | "tous"; vaisselle: "moi" | "enfants" | "personne" };

export const QUESTIONS = [
  { id: "combien", question: "Vous êtes combien à table\u00A0?", options: [{ v: "2", libelle: "2" }, { v: "4", libelle: "4" }, { v: "6", libelle: "6 et +" }] },
  { id: "cuisine", question: "Qui cuisine\u00A0?", options: [{ v: "moi", libelle: "Moi" }, { v: "deux", libelle: "À deux" }, { v: "tous", libelle: "Tout le monde" }] },
  { id: "vaisselle", question: "Et qui fait la vaisselle\u00A0?", options: [{ v: "moi", libelle: "Moi" }, { v: "enfants", libelle: "Les enfants" }, { v: "personne", libelle: "Personne" }] },
] as const;

export const NOTES = {
  combien: {
    "2": { titre: "Un comptoir, deux places", texte: "Le long du mur\u00A0: on dîne face à face, sans table à pousser." },
    "4": { titre: "Îlot, quatre places", texte: "Au milieu de la pièce\u00A0: celui qui cuisine voit ceux qui attendent." },
    "6": { titre: "Une table de six, côté fenêtre", texte: "Une vraie table, à deux pas du plan de travail." },
  },
  cuisine: {
    moi: { titre: "Un seul poste, tout à portée", texte: "Évier, plaque et frigo à trois pas les uns des autres." },
    deux: { titre: "Deux postes de travail", texte: "Un à l'évier, un à la plaque\u00A0: on ne se marche pas dessus." },
    tous: { titre: "Un plan qu'on contourne", texte: "Dégagé de tous les côtés\u00A0: chacun prend sa planche." },
  },
  vaisselle: {
    moi: { titre: "Lave-vaisselle à droite de l'évier", texte: "Le geste le plus court, pour celui qui s'y colle tous les soirs." },
    enfants: { titre: "Lave-vaisselle côté table", texte: "Et les assiettes rangées en bas, à leur hauteur." },
    personne: { titre: "Grand lave-vaisselle, évier à deux bacs", texte: "Puisque personne ne veut, autant que ce soit vite fait." },
  },
} as const;

export const FOYERS = [
  { pour: "Pour deux", fourchette: "9\u00A0000\u00A0– 12\u00A0000\u00A0€" },
  { pour: "Pour quatre", fourchette: "12\u00A0000\u00A0– 16\u00A0000\u00A0€" },
  { pour: "Pour six et plus", fourchette: "15\u00A0000\u00A0– 21\u00A0000\u00A0€" },
];

export const ETAPES = [
  { titre: "Trois questions", texte: "Sur ta vie, pas sur un catalogue. Le site dessine un premier plan." },
  { titre: "Chez toi", texte: "On vient prendre les cotes, et voir où vous vous asseyez vraiment." },
  { titre: "Le plan, le devis", texte: "Le plan qui va avec ta vie, et un devis ligne par ligne, TTC, pose comprise." },
  { titre: "La pose", texte: "Quelques jours de travaux. Le dernier soir, la cuisine est à toi." },
  { titre: "Le premier dîner", texte: "Ce soir-là, on le cuisine chez toi. Les 7\u00A0299 suivants sont pour toi." },
];

export const FAQ = [
  { q: "7\u00A0300 dîners, c'est la durée de vie d'une cuisine\u00A0?", r: "Non. C'est un calcul\u00A0: si tu la gardes vingt ans, vingt fois 365 soirs font 7\u00A0300. On ne promet pas une durée\u00A0: on dit ce qu'il y a au bout." },
  { q: "Le premier dîner est vraiment offert\u00A0?", r: "Oui, sans condition. Il n'est pas compté dans le prix de la cuisine, qui est le même si tu n'en veux pas, et tu n'as rien d'autre à payer." },
  { q: "Qui cuisine le premier dîner\u00A0?", r: "Un chef à domicile, déclaré et assuré, avec qui on travaille. Le menu se décide avec toi, allergies comprises." },
  { q: "Et si je ne veux pas de dîner\u00A0?", r: "Tu le dis, et rien ne change\u00A0: ni la cuisine, ni le prix." },
  { q: "Les prix sont TTC\u00A0?", r: "Oui, toutes taxes comprises, pose comprise, hors électroménager. Ce sont des fourchettes d'exemple\u00A0: le prix ferme est sur le devis." },
];
