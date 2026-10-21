// Tout ce que le site Dimanche Midi affiche. Le cabinet est fictif : honoraires, dates,
// numéros et exemples du carnet sont des exemples, et le site le dit à chaque fois.
//
// Les règles qui façonnent ces données (Videos/marque-cgp/SOURCES.md,
// Videos/regles-metiers/cgp-01-agree-amf.md) :
// - jamais « agréé AMF », jamais le logo de l'AMF (position AMF DOC-2006-23, q. 4.6) ;
// - « courtier en assurance » à côté de « conseiller en investissements financiers » : le
//   site parle d'assurance vie, qui relève de ce statut-là ;
// - le carnet de famille reste sur l'appareil de la famille : le cabinet n'envoie rien à
//   personne (CPCE L34-5 ; CMF L341-1, al. 1) et ne garde rien (RGPD) ; c'est le parent qui
//   le télécharge et le donne ;
// - les familles viennent au cabinet, on ne va pas chez elles (CMF L341-1, al. 2) ;
// - aucun placement, aucun rendement, aucune défiscalisation promise.

export const DOSSIER = "/exemples/dimanche-midi";

export const STATUT =
  "Conseiller en investissements financiers, adhérent d'une association agréée par l'AMF · Courtier en assurance · ORIAS n° 00 000 000 (exemple)";

export const cabinet = {
  nom: "Dimanche Midi",
  adresse: "3 place de l'Exemple, 69000 Lyon",
  telephone: "06 39 98 12 00",
  telephoneLien: "+33639981200",
  horaires: "Du mardi au vendredi, de 9 h à 18 h · un dimanche par mois, de midi à 15 h",
  association: "association professionnelle d'exemple",
  mediateur: "médiateur d'exemple, ses coordonnées et l'adresse de son site",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/carnet`, libelle: "Le carnet de famille" },
  { href: `${DOSSIER}/dimanche`, libelle: "Un dimanche par mois" },
  { href: `${DOSSIER}#rendez-vous`, libelle: "Rendez-vous" },
];

export type Ligne = { cle: string; libelle: string; aide: string; exemple: string };
export type Rubrique = { cle: string; titre: string; chapeau: string; lignes: Ligne[] };

/**
 * Le carnet de famille : où est quoi, qui appeler, ce qui est prévu. Les exemples ne
 * remplissent pas « Logement » : la vidéo montre la famille l'écrire elle-même.
 */
export const rubriques: Rubrique[] = [
  {
    cle: "ou",
    titre: "Où est quoi",
    chapeau: "Ce que tu as, et où c'est.",
    lignes: [
      { cle: "assurance-vie", libelle: "Assurance vie", aide: "Quel assureur, quel contrat", exemple: "Assureur A · la boîte bleue" },
      { cle: "comptes", libelle: "Comptes et livrets", aide: "Quelles banques", exemple: "Banque B, banque C" },
      { cle: "logement", libelle: "Logement", aide: "Où est rangé l'acte de propriété", exemple: "" },
      { cle: "ou-autre", libelle: "Autre chose", aide: "Un coffre, une épargne salariale…", exemple: "Le classeur vert" },
    ],
  },
  {
    cle: "qui",
    titre: "Qui appeler",
    chapeau: "Les gens qui savent, et leur numéro.",
    lignes: [
      { cle: "notaire", libelle: "Le notaire", aide: "Nom, ville, téléphone", exemple: "Maître A., à Lyon" },
      { cle: "conseiller", libelle: "Le conseiller", aide: "Nom, téléphone", exemple: "Le cabinet du dimanche" },
      { cle: "comptable", libelle: "Le comptable", aide: "Nom, téléphone", exemple: "Celui de l'atelier" },
      { cle: "qui-autre", libelle: "Autre chose", aide: "La banque, l'assureur…", exemple: "" },
    ],
  },
  {
    cle: "prevu",
    titre: "Ce qui est prévu",
    chapeau: "Ce qui a déjà été décidé, et où c'est écrit.",
    lignes: [
      { cle: "donation", libelle: "Donation", aide: "Où l'acte est rangé", exemple: "Chez le notaire" },
      { cle: "testament", libelle: "Testament", aide: "Chez quel notaire, ou où", exemple: "Déposé chez Maître A." },
      { cle: "volontes", libelle: "Tes volontés", aide: "Ce que tu veux qu'on sache", exemple: "La maison, à nous trois" },
      { cle: "prevu-autre", libelle: "Autre chose", aide: "Une clause, un mandat…", exemple: "" },
    ],
  },
];

/** Les prochains dimanches où le cabinet ouvre à midi (le deuxième du mois ; exemple). */
export const dimanches = [
  { cle: "2026-11-08", libelle: "Dimanche 8 novembre" },
  { cle: "2026-12-13", libelle: "Dimanche 13 décembre" },
  { cle: "2027-01-10", libelle: "Dimanche 10 janvier" },
];

export const programme = [
  { heure: "12 h", titre: "On arrive", texte: "Parents et enfants, ensemble, au cabinet. On apporte le café." },
  { heure: "12 h 30", titre: "On ouvre le carnet", texte: "Chacun pose ses questions. Personne n'est obligé de répondre à tout." },
  { heure: "13 h 30", titre: "On écrit ce qui manque", texte: "Ce qu'il faut chercher, qui appeler, ce qu'on décide de reparler." },
  { heure: "15 h", titre: "On rentre", texte: "Le carnet repart avec vous. Le cabinet n'en garde pas de copie." },
];

export const honoraires = [
  { titre: "Le premier rendez-vous", prix: "Sans frais", detail: "Une heure, au cabinet ou en visio" },
  { titre: "Le dimanche des familles", prix: "Sans frais", detail: "Sur inscription, un dimanche par mois" },
  { titre: "Le bilan de transmission", prix: "1 400 € TTC", detail: "Exemple · écrit, remis en main propre" },
  { titre: "Le suivi", prix: "350 € TTC par an", detail: "Exemple · un rendez-vous par an" },
];

export const questions = [
  {
    q: "Vous allez écrire à mes enfants ?",
    r: "Non. Le carnet reste sur ton téléphone : c'est toi qui le télécharges et qui le donnes. Le cabinet n'écrit à personne qui ne l'a pas demandé, et ne garde aucune copie.",
  },
  {
    q: "Vous pouvez venir à la maison, pour toute la famille ?",
    r: "Non, et c'est pour ça que le cabinet ouvre un dimanche par mois. Un rendez-vous chez toi serait du démarchage, même à ta demande (code monétaire et financier, art. L341-1). Vous venez, ensemble.",
  },
  {
    q: "Vous êtes agréé par l'AMF ?",
    r: "Aucun conseiller en investissements financiers ne l'est. Je suis adhérent d'une association agréée par l'AMF, et courtier en assurance : les deux sont écrits en haut et en bas de chaque page, avec le numéro ORIAS.",
  },
  {
    q: "Comment êtes-vous payé ?",
    r: "Par des honoraires (le bilan, le suivi), et, si tu souscris un contrat sur mon conseil, par une part des frais que t'appliquent l'assureur ou la société de gestion. Mon conseil est donc « non indépendant ». Tout est écrit avant que tu ne signes.",
  },
  {
    q: "Et si on ne veut rien placer ?",
    r: "Alors on ne place rien. Un carnet rempli, une famille qui sait où sont les choses : c'est déjà le but.",
  },
];

export const photos = {
  salle: { src: "/exemples/dimanche-midi/salle-a-manger.webp", largeur: 1100, hauteur: 1647, alt: "Une salle à manger ancienne : une table dressée, des chaises en bois sombre et une horloge au mur" },
  table: { src: "/exemples/dimanche-midi/table-dressee.webp", largeur: 1200, hauteur: 1796, alt: "Une table dressée de vaisselle bleue et blanche, des verres d'eau et deux bougies" },
  lampe: { src: "/exemples/dimanche-midi/table-lampe.webp", largeur: 1100, hauteur: 825, alt: "Une table en bois et ses chaises sous une lampe, dans la lumière de midi" },
};
