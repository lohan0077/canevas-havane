// Tout ce que le site Ligne par Ligne affiche. Le cabinet est fictif : honoraires, taux de
// rétrocession, numéros et créneaux sont des exemples, et le site le dit à chaque fois.
//
// Les règles qui façonnent ces données (Videos/agenda-cgp/SOURCES.md,
// Videos/regles-metiers/cgp-01-agree-amf.md) :
// - jamais « agréé AMF », jamais le logo de l'AMF : « adhérent d'une association agréée
//   par l'AMF » (position AMF DOC-2006-23, q. 4.6) ;
// - « conseil non indépendant » dès qu'on garde des rétrocessions (CMF L541-8-1, 7° b),
//   et les rétrocessions dites prises sur les frais payés par le client (8°) ;
// - le statut de courtier en assurance à côté de celui de CIF, avec l'ORIAS ;
// - aucune promesse de rendement, aucun produit mis en avant ;
// - aucun démarchage : pas d'appel non sollicité (C. consom. L223-1), pas de rendez-vous
//   à domicile (CMF L341-1, al. 2), aucun envoi à des tiers.

export const DOSSIER = "/exemples/ligne-par-ligne";

export const STATUT = "Conseiller en investissements financiers, adhérent d'une association agréée par l'AMF";
export const STATUTS_COURTS = "CIF · Courtier en assurance · ORIAS n°\u00a000\u00a0000\u00a0000 (exemple)";

export const cabinet = {
  nom: "Ligne par Ligne",
  adresse: "4 allée de l'Exemple, 44000 Nantes",
  telephone: "01 99 00 84 61",
  telephoneLien: "+33199008461",
  orias: "00\u00a0000\u00a0000",
  association: "Association professionnelle d'exemple",
  mediateur: "Médiateur d'exemple, ses coordonnées et l'adresse de son site",
  horaires: "Du lundi au vendredi, de 9 h à 18 h 30",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/ce-que-je-gagne`, libelle: "Ce que je gagne" },
  { href: `${DOSSIER}/moments`, libelle: "Ce qui t'arrive" },
  { href: `${DOSSIER}#rendez-vous`, libelle: "Rendez-vous" },
];

/** Le ticket : les honoraires, et ce que les partenaires reversent. Montants TTC d'exemple. */
export const HONORAIRES = [
  { libelle: "Bilan patrimonial", montant: 900, note: "payé par toi, une fois" },
  { libelle: "Suivi, par an", montant: 300, note: "payé par toi, chaque année" },
];
export const RETROCESSIONS = [
  { libelle: "Reversé par l'assureur", taux: 0.005, note: "pris sur les frais de ton contrat" },
  { libelle: "Reversé par la société de gestion", taux: 0.004, note: "pris sur les frais des fonds" },
];

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

export const methode = [
  { titre: "Le premier rendez-vous", detail: "45 minutes · sans engagement", texte: "Tes questions d'abord. Je te dis ce que je peux faire, ce que je ne fais pas, et ce que ça coûte." },
  { titre: "Le bilan", detail: "900 € TTC · exemple", texte: "Ce que tu as, ce que tu veux, ce qui manque. Écrit, et remis en main propre." },
  { titre: "Les recommandations", detail: "Avec le bilan", texte: "Pour chacune : pourquoi, ce qu'elle coûte, et ce que je touche si tu la suis." },
  { titre: "Le suivi", detail: "300 € TTC par an · exemple", texte: "Un rendez-vous par an, et à chaque moment de ta vie qui change la donne." },
];

export const questions = [
  {
    q: "Comment se rémunère un conseiller en gestion de patrimoine ?",
    r: "De deux façons, souvent les deux : des honoraires payés par toi, et des rétrocessions versées par les assureurs et les sociétés de gestion, prises sur les frais de tes contrats et de tes fonds. Le ticket de l'accueil les montre, ligne par ligne.",
  },
  {
    q: "Pourquoi « conseil non indépendant » ?",
    r: "Parce que je garde des rétrocessions. Un conseiller qui se dit indépendant ne garde aucune rémunération versée par un tiers (code monétaire et financier, art. L541-8-1). Je préfère l'écrire en tête du ticket.",
  },
  {
    q: "Vous êtes agréé par l'AMF ?",
    r: "Non, et aucun conseiller en investissements financiers ne l'est : je suis adhérent d'une association agréée par l'AMF. C'est l'AMF elle-même qui demande de l'écrire ainsi.",
  },
  {
    q: "Vous pouvez venir chez moi ?",
    r: "Non. Un rendez-vous chez toi, ou à ton travail, serait du démarchage, même à ta demande (code monétaire et financier, art. L341-1). Je te reçois au cabinet, ou en visio.",
  },
  {
    q: "Vous allez me rappeler, ou écrire à mes proches ?",
    r: "Non. Je n'appelle personne qui ne l'a pas demandé, et je n'écris à personne de ta part. Ce que tu me confies ne sert qu'à ton bilan.",
  },
];

export const photos = {
  lac: { src: "/exemples/ligne-par-ligne/lac-pins.webp", largeur: 1600, hauteur: 1068, alt: "Un lac calme reflète une forêt de pins dans la lumière douce du matin" },
  carnet: { src: "/exemples/ligne-par-ligne/carnet.webp", largeur: 1000, hauteur: 1500, alt: "Un carnet à spirale ouvert sur une table en bois, un stylo posé à côté" },
  banc: { src: "/exemples/ligne-par-ligne/banc-foret.webp", largeur: 1000, hauteur: 667, alt: "Un banc blanc au milieu d'une forêt d'automne" },
};
