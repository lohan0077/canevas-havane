// Tout ce qu'affiche Dimanche Midi, cabinet de gestion de patrimoine fictif filmé dans les
// deux vidéos des CGP :
//   - « Créer une marque » : le nom, le dimanche où l'on parle d'argent en famille, le
//     carnet de famille qui reste chez soi, l'affiche, un dimanche par mois au cabinet ;
//   - « Remplir l'agenda » (ancien site Ligne par Ligne, fondu ici) : le ticket « Ce que je
//     gagne » sur l'accueil, les moments de vie plutôt que des produits, le statut écrit
//     juste en haut de chaque page, le rendez-vous au cabinet ou en visio — jamais chez soi.
// Le cabinet est fictif : honoraires, taux, dates, numéros et exemples du carnet sont des
// exemples, et le site le dit à chaque fois.
//
// Les règles qui façonnent ces données (Videos/marque-cgp/SOURCES.md, agenda-cgp/SOURCES.md,
// regles-metiers/cgp-01-agree-amf.md) :
// - jamais « agréé AMF », jamais le logo de l'AMF : « adhérent d'une association agréée
//   par l'AMF » (position AMF DOC-2006-23, q. 4.6), en haut de chaque page ;
// - « courtier en assurance » à côté de « conseiller en investissements financiers » (le
//   site parle d'assurance vie), avec l'ORIAS (C. assur. R521-4) ;
// - « conseil non indépendant » dès qu'on garde des rétrocessions (CMF L541-8-1, 7° b), et
//   les rétrocessions dites prises sur les frais payés par le client (8°) ;
// - le carnet de famille reste sur l'appareil de la famille : le cabinet n'envoie rien à
//   personne (CPCE L34-5 ; CMF L341-1, al. 1) et ne garde rien ;
// - aucun démarchage : pas d'appel (C. consom. L223-1), pas de rendez-vous chez le client,
//   même à sa demande (CMF L341-1, al. 2) ;
// - aucun placement mis en avant, aucun rendement ni réduction d'impôt promis.

export const DOSSIER = "/exemples/dimanche-midi";

export const STATUT = "Conseiller en investissements financiers, adhérent d'une association agréée par l'AMF";
export const STATUT_COMPLET = `${STATUT} · Courtier en assurance · ORIAS n° 00 000 000 (exemple)`;
export const STATUTS_COURTS = "CIF · Courtier en assurance · ORIAS n° 00 000 000 (exemple)";

export const cabinet = {
  nom: "Dimanche Midi",
  signature: "On en parle à table.",
  adresse: "3 place de l'Exemple, 69000 Lyon",
  telephone: "06 39 98 12 00",
  orias: "00 000 000",
  horaires: "Du mardi au vendredi, de 9 h à 19 h · un dimanche par mois, de midi à 15 h",
  association: "association professionnelle d'exemple",
  mediateur: "médiateur d'exemple, ses coordonnées et l'adresse de son site",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/carnet`, libelle: "Le carnet" },
  { href: `${DOSSIER}/ce-que-je-gagne`, libelle: "Ce que je gagne" },
  { href: `${DOSSIER}/moments`, libelle: "Ce qui t'arrive" },
  { href: `${DOSSIER}/dimanche`, libelle: "Le dimanche" },
];

/* ---------- Les photos ----------
   Unsplash (licence Unsplash), servies depuis notre domaine ; crédits dans les mentions.
   Aucun visage, aucune marque, aucun alcool. */
export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
export const photos = {
  salle: { src: `${DOSSIER}/salle-a-manger.webp`, largeur: 1100, hauteur: 1647, alt: "Une salle à manger ancienne : une table dressée, des chaises en bois sombre et une horloge au mur" },
  table: { src: `${DOSSIER}/table-dressee.webp`, largeur: 1200, hauteur: 1796, alt: "Une table dressée de vaisselle bleue et blanche, des verres d'eau et deux bougies" },
  lampe: { src: `${DOSSIER}/table-lampe.webp`, largeur: 1100, hauteur: 825, alt: "Une table en bois et ses chaises sous une lampe, dans la lumière de midi" },
  lac: { src: `${DOSSIER}/lac-pins.webp`, largeur: 1600, hauteur: 1068, alt: "Un lac calme reflète une forêt de pins dans la lumière douce du matin" },
  carnet: { src: `${DOSSIER}/carnet.webp`, largeur: 1000, hauteur: 1500, alt: "Un carnet à spirale ouvert sur une table en bois, un stylo posé à côté" },
  banc: { src: `${DOSSIER}/banc-foret.webp`, largeur: 1000, hauteur: 667, alt: "Un banc blanc au milieu d'une forêt d'automne" },
} satisfies Record<string, Photo>;

/* ---------- Le carnet de famille ---------- */
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

/* ---------- Un dimanche par mois ---------- */
/** Les prochains dimanches où le cabinet ouvre à midi (le deuxième du mois ; exemple). */
export const dimanches = [
  { cle: "2026-11-08", libelle: "Dimanche 8 novembre" },
  { cle: "2026-12-13", libelle: "Dimanche 13 décembre" },
  { cle: "2027-01-10", libelle: "Dimanche 10 janvier" },
];

export const programme = [
  { heure: "12 h", titre: "On arrive", texte: "Parents et enfants, ensemble, au cabinet. On apporte le café." },
  { heure: "12 h 30", titre: "On ouvre le carnet", texte: "Chacun pose ses questions. Personne n'est obligé de répondre à tout." },
  { heure: "13 h 30", titre: "On écrit ce qui manque", texte: "Ce qu'il faut chercher, qui appeler, ce qu'on décide de reparler." },
  { heure: "15 h", titre: "On rentre", texte: "Le carnet repart avec vous. Le cabinet n'en garde pas de copie." },
];

/* ---------- Ce que je gagne : le ticket ----------
   Les honoraires (payés par le client) et ce que les partenaires reversent, pris sur les
   frais que paie le client. Montants TTC et taux d'exemple. */
export const HONORAIRES = [
  { libelle: "Bilan patrimonial", montant: 900, note: "payé par toi, une fois · transmission comprise" },
  { libelle: "Suivi, par an", montant: 300, note: "payé par toi, chaque année" },
];
export const RETROCESSIONS = [
  { libelle: "Reversé par l'assureur", taux: 0.005, note: "pris sur les frais de ton contrat" },
  { libelle: "Reversé par la société de gestion", taux: 0.004, note: "pris sur les frais des fonds" },
];

export const SANS_FRAIS = [
  { titre: "Le carnet de famille", detail: "Sur ce site, pour toutes les familles" },
  { titre: "Le premier rendez-vous", detail: "Une heure, au cabinet ou en visio" },
  { titre: "Le dimanche des familles", detail: "Sur inscription, un dimanche par mois" },
];

/* ---------- Les moments de vie ---------- */
export type Moment = {
  cle: string;
  libelle: string;
  titre: string;
  questions: string[];
  ensemble: string[];
  autres: string;
};

/** Des moments de vie, pas des produits : les questions, ce qu'on regarde, qui d'autre consulter. */
export const moments: Moment[] = [
  {
    cle: "vente",
    libelle: "Je vends ma boîte",
    titre: "Tu vends ton entreprise.",
    questions: ["Ce qui te restera, une fois l'impôt payé", "Ce dont tu auras besoin pour vivre, et quand", "Ce que tu veux transmettre, et à qui"],
    ensemble: ["Ton calendrier de cession, mois par mois", "Tes revenus de demain, sans ton salaire de dirigeant", "Ce qui doit être décidé avant la signature, pas après"],
    autres: "Ton expert-comptable et ton avocat, pour la cession elle-même. Nous travaillons avec eux, pas à leur place.",
  },
  {
    cle: "heritage",
    libelle: "J'hérite",
    titre: "Tu hérites.",
    questions: ["Ce qui t'arrive vraiment : biens, comptes, contrats", "Ce que tu dois décider, et dans quels délais", "Ce que tu veux en faire, sans te presser"],
    ensemble: ["La liste de ce qui t'est transmis, ligne par ligne", "Ce qui ne presse pas, et ce qui presse", "Tes projets, avant tout placement"],
    autres: "Le notaire règle la succession. Nous intervenons après lui, ou à côté, jamais à sa place.",
  },
  {
    cle: "retraite",
    libelle: "Je pars à la retraite",
    titre: "Tu pars à la retraite.",
    questions: ["Ce que tu toucheras, et à partir de quand", "L'écart avec ce que tu dépenses aujourd'hui", "Ce que tu veux faire de ton temps"],
    ensemble: ["Tes relevés de carrière, pour vérifier tes droits", "Tes dépenses d'aujourd'hui et de demain", "Ce que ton épargne peut combler, et ce qu'elle ne peut pas"],
    autres: "Ta caisse de retraite pour tes droits ; ton notaire si tu penses à transmettre.",
  },
  {
    cle: "enfant",
    libelle: "J'attends un enfant",
    titre: "Tu attends un enfant.",
    questions: ["Ce qui change dans ton budget, cette année et les suivantes", "Ce qui se passerait s'il t'arrivait quelque chose", "Ce que tu veux mettre de côté pour lui, et pourquoi"],
    ensemble: ["Ton budget, avec un enfant de plus", "Tes protections : décès, invalidité, et qui elles couvrent", "Une épargne à sa mesure, sans te priver"],
    autres: "Ton notaire, si tu veux organiser ce que tu lui transmettras.",
  },
];

/* ---------- Ce que je ne ferai jamais ---------- */
export const JAMAIS = [
  { titre: "Écrire à tes enfants", texte: "Le carnet reste chez toi. C'est toi qui le donnes, quand tu veux." },
  { titre: "Venir à la maison", texte: "Ce serait du démarchage, même à ta demande. Tu viens au cabinet, ou en visio." },
  { titre: "Te promettre un rendement", texte: "Ni rendement, ni réduction d'impôt. On parle de ce que tu as, et de ce que tu veux." },
  { titre: "Me dire « agréé AMF »", texte: "Aucun conseiller ne l'est. Mon association l'est : je l'écris ainsi, en haut de chaque page." },
];

export const questions = [
  {
    q: "Comment se rémunère un conseiller en gestion de patrimoine ?",
    r: "De deux façons, souvent les deux : des honoraires payés par toi, et des rétrocessions versées par les assureurs et les sociétés de gestion, prises sur les frais de tes contrats et de tes fonds. Le ticket de l'accueil les montre, ligne par ligne.",
  },
  {
    q: "Pourquoi « conseil non indépendant » ?",
    r: "Parce que je garde des rétrocessions. Un conseiller qui se dit indépendant ne garde aucune rémunération versée par un tiers (code monétaire et financier, art. L541-8-1). Je préfère l'écrire en tête du ticket.",
  },
  {
    q: "Vous êtes agréé par l'AMF ?",
    r: "Aucun conseiller en investissements financiers ne l'est. Je suis adhérent d'une association agréée par l'AMF, et courtier en assurance : les deux sont écrits en haut et en bas de chaque page, avec le numéro ORIAS.",
  },
  {
    q: "Vous allez écrire à mes enfants ?",
    r: "Non. Le carnet reste sur ton téléphone : c'est toi qui le télécharges et qui le donnes. Le cabinet n'écrit à personne qui ne l'a pas demandé, et ne garde aucune copie.",
  },
  {
    q: "Vous pouvez venir à la maison, pour toute la famille ?",
    r: "Non, et c'est pour ça que le cabinet ouvre un dimanche par mois. Un rendez-vous chez toi, ou à ton travail, serait du démarchage, même à ta demande (code monétaire et financier, art. L341-1). Vous venez, ensemble, ou en visio.",
  },
  {
    q: "Et si on ne veut rien placer ?",
    r: "Alors on ne place rien. Un carnet rempli, une famille qui sait où sont les choses : c'est déjà le but.",
  },
];
