// Les données du site Jusqu'au Café, cuisiniste imaginé dans la vidéo « Si je devais
// remplir le carnet de commandes d'un cuisiniste ». On ne vend pas des meubles : on
// vend la pièce où finissent toutes les soirées.
//
// Règles tenues (voir SOURCES.md de la vidéo) :
// - la fourchette est une fourchette TTC, pose comprise, marquée « exemple » ; le prix
//   ferme vient au devis, après la prise de cotes (arrêté du 3 décembre 1987, art. 1) ;
// - le guide « comment choisir un bon cuisiniste » ne nomme, ne compare et ne dénigre
//   personne : des questions à poser à tous, nous compris (C. consom., art. L122-1) ;
//   aucune enseigne d'ameublement n'est citée ;
// - les poses filmées le sont avec l'accord écrit du client, sans rien montrer de chez
//   lui (C. civ., art. 9) ;
// - rien n'est dit « gratuit » ou « offert » : les réglages sont compris dans le prix.

export const DOSSIER = "/exemples/jusqu-au-cafe";

export const NAVIGATION = [
  { href: `${DOSSIER}/ma-cuisine`, libelle: "Ma cuisine, mes murs" },
  { href: `${DOSSIER}/choisir-son-cuisiniste`, libelle: "Le guide" },
];

export const atelier = {
  telephone: "01 99 00 35 17",
  adresse: "12 rue de l'Exemple, Ta Ville",
  siret: "000 000 000 00000",
};

export const photos = {
  planBois: { src: "/exemples/jusqu-au-cafe/plan-bois.webp", largeur: 1400, hauteur: 788, alt: "Un plan de travail en bois éclairé par en dessous, une planche, une cocotte et du basilic" },
  tasses: { src: "/exemples/jusqu-au-cafe/tasses.webp", largeur: 1000, hauteur: 1500, alt: "Deux tasses de café sur une table, dans la pénombre du soir" },
  table: { src: "/exemples/jusqu-au-cafe/table.webp", largeur: 1100, hauteur: 1650, alt: "Une cuisine en bois clair avec un comptoir sombre, des tabourets et une grande fenêtre" },
  salle: { src: "/exemples/jusqu-au-cafe/salle.webp", largeur: 1100, hauteur: 733, alt: "Une cuisine blanche ouverte sur une table ronde en bois et ses chaises" },
};

/** Prix au mètre linéaire, TTC, pose comprise (exemple) : meubles, plan, évier, pose. */
export const GAMMES = [
  { id: "melamine", nom: "Mélaminé", detail: "Façades unies, plan stratifié", min: 1300, max: 1700 },
  { id: "laque", nom: "Laqué", detail: "Façades laquées, plan compact", min: 1950, max: 2500 },
  { id: "chene", nom: "Chêne massif", detail: "Façades en chêne, plan en bois", min: 2600, max: 3300 },
] as const;

export type IdGamme = (typeof GAMMES)[number]["id"];

export const COMPRIS = [
  "La prise de cotes chez toi",
  "Le plan, et ses modifications",
  "Les meubles, le plan de travail, l'évier",
  "La livraison et la pose",
  "Les raccordements de l'évier et de l'électroménager",
  "Les réglages des portes et des tiroirs, pendant deux ans",
];

export const PAS_COMPRIS = [
  "L'électroménager (tu peux garder le tien)",
  "Les travaux d'électricité ou de plomberie au-delà des raccordements",
  "Le carrelage, la peinture, le sol",
];

export const QUESTIONS_GUIDE = [
  {
    id: "q-1",
    question: "Qui prend les cotes chez toi\u00A0?",
    pourquoi: "Un plan dessiné sur des mesures prises par quelqu'un d'autre, c'est le premier endroit où une cuisine se trompe. Demande qui vient, et si c'est la même personne qui dessine.",
    nous: "Mathieu vient prendre les cotes, et c'est lui qui dessine ton plan.",
  },
  {
    id: "q-2",
    question: "Qui pose\u00A0?",
    pourquoi: "Le magasin qui vend n'est pas toujours celui qui pose. Demande le nom de l'équipe, et si elle travaille pour l'entreprise ou pour un sous-traitant.",
    nous: "Notre équipe de deux poseurs. Pas de sous-traitance.",
  },
  {
    id: "q-3",
    question: "Qui revient, si une porte frotte\u00A0?",
    pourquoi: "Une cuisine bouge les premiers mois\u00A0: le bois travaille, les charnières se règlent. Demande qui revient, sous quel délai, et à quel prix.",
    nous: "Les réglages des portes et des tiroirs sont compris dans le prix, pendant deux ans.",
  },
  {
    id: "q-4",
    question: "Le prix est-il TTC, pose comprise\u00A0?",
    pourquoi: "Un prix de meubles et un prix de cuisine posée, ce n'est pas le même prix. Demande ce qui est compris\u00A0: livraison, pose, raccordements, électroménager.",
    nous: "Notre fourchette est TTC, pose comprise, hors électroménager. Le prix ferme est sur le devis.",
  },
  {
    id: "q-5",
    question: "Qu'est-ce qui est écrit sur le devis\u00A0?",
    pourquoi: "Un devis qui tient en une ligne ne se compare à rien. Demande le détail\u00A0: chaque meuble, le plan, l'évier, la pose, les raccordements, la date.",
    nous: "Un devis ligne par ligne, avec la date de pose écrite.",
  },
];

export const METHODE = [
  { titre: "Les cotes, chez toi", texte: "Une heure chez toi, mètre en main. On regarde aussi où tu poses tes courses, et où tout le monde finit par s'asseoir." },
  { titre: "Le plan", texte: "Dessiné sur tes cotes. On le change autant de fois qu'il faut avant de signer." },
  { titre: "La pose", texte: "Quatre jours, en moyenne, pour une cuisine en L. Filmée en accéléré si tu es d'accord." },
  { titre: "Le retour", texte: "Si une porte frotte, on revient la régler. C'est compris dans le prix, pendant deux ans." },
];

export const FAQ = [
  { q: "La fourchette, c'est un prix\u00A0?", r: "Non\u00A0: c'est un ordre de grandeur honnête, TTC, pose comprise, pour une cuisine de cette taille et de cette gamme. Le prix ferme est sur le devis, après la prise de cotes chez toi." },
  { q: "Pourquoi un guide pour choisir un autre cuisiniste\u00A0?", r: "Parce que les bonnes questions sont les mêmes pour tout le monde. Pose-les à tous ceux que tu verras, nous compris. On ne dit rien des autres\u00A0: on dit ce qu'on fait." },
  { q: "Qu'est-ce qui est filmé, pendant la pose\u00A0?", r: "Les meubles qui se montent, en accéléré. Seulement si tu es d'accord, par écrit, et sans rien montrer de chez toi\u00A0: ni adresse, ni famille, ni objets personnels." },
  { q: "Combien de temps dure une pose\u00A0?", r: "Quatre jours pour une cuisine en L, en moyenne. La date est écrite sur le devis." },
];

/** Les créneaux de prise de cotes (exemple) : ceux qui sont pris le sont pour l'exemple. */
export const CRENEAUX_COTES = [
  { libelle: "Mar. 20", sous: "9 h – 10 h" },
  { libelle: "Mar. 20", sous: "17 h – 18 h", pris: true },
  { libelle: "Mer. 21", sous: "14 h – 15 h" },
  { libelle: "Jeu. 22", sous: "9 h – 10 h", pris: true },
  { libelle: "Ven. 23", sous: "17 h – 18 h" },
  { libelle: "Sam. 24", sous: "10 h – 11 h" },
];

// « 11 000 € » écrit à la main : le même rendu au serveur et dans le navigateur.
export const euros = (n: number) => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u202F")}\u00A0€`;
