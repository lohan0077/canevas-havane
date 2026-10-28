// Les données du site Le Pré du Vendredi : une ferme imaginaire qui vend sa viande
// en colis, une découpe par mois, le vendredi. Tout ce qui suit est un exemple — les
// dates sont de vrais vendredis (vérifiés), les prix et les compteurs sont inventés.

export const DOSSIER = "/exemples/le-pre-du-vendredi";

export const ferme = {
  nom: "Le Pré du Vendredi",
  telephone: "01 99 00 41 27",
  telephoneLien: "+33199004127",
  adresse: ["Ferme du Pré du Vendredi", "Lieu-dit de l'Exemple", "00000 Exemple-sur-Prés"],
  retrait: "samedi, de 9 h à 12 h, à la ferme",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/colis`, libelle: "Le colis" },
  { href: `${DOSSIER}/dates`, libelle: "Les dates" },
  { href: `${DOSSIER}#ferme`, libelle: "La ferme" },
  { href: `${DOSSIER}#questions`, libelle: "Questions" },
];

/** Le prix au kilo, TTC, le même pour tout le colis. Exemple. */
export const PRIX_KILO = 17;

export const euros = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).replace(/ | /g, " ") + " €";
export const kilos = (n: number) => `${n.toLocaleString("fr-FR")} kg`;

export type Morceau = { nom: string; poids: number; usage: string };
export type Colis = { id: string; titre: string; poids: number; morceaux: Morceau[] };

export const COLIS: Colis[] = [
  {
    id: "10",
    titre: "Colis de 10 kg",
    poids: 10,
    morceaux: [
      { nom: "Entrecôte", poids: 1, usage: "À griller, à la poêle ou au barbecue" },
      { nom: "Rôti", poids: 1.5, usage: "Au four, le dimanche" },
      { nom: "Bourguignon", poids: 2.5, usage: "À mijoter trois heures" },
      { nom: "Steaks hachés", poids: 3, usage: "Par deux, prêts à cuire" },
      { nom: "Pot-au-feu", poids: 2, usage: "Avec les légumes de l'hiver" },
    ],
  },
  {
    id: "5",
    titre: "Colis de 5 kg",
    poids: 5,
    morceaux: [
      { nom: "Entrecôte", poids: 0.5, usage: "À griller, à la poêle ou au barbecue" },
      { nom: "Rôti", poids: 1, usage: "Au four, le dimanche" },
      { nom: "Bourguignon", poids: 1.5, usage: "À mijoter trois heures" },
      { nom: "Steaks hachés", poids: 1.5, usage: "Par deux, prêts à cuire" },
      { nom: "Pot-au-feu", poids: 0.5, usage: "Avec les légumes de l'hiver" },
    ],
  },
];

/**
 * La découpe en cours. Le compteur est un exemple : sur un vrai site, la ferme le
 * tient à jour à chaque réservation, et il ne compte que des colis réellement
 * réservés. Les numéros réservés ne se suivent pas, comme de vraies réservations.
 */
export const DECOUPE = {
  date: "vendredi 6 novembre",
  annee: 2026,
  retrait: "samedi 7 novembre, de 9 h à 12 h",
  total: 20,
  reserves: [1, 2, 3, 5, 6, 8, 9, 11, 12, 14, 15, 17, 18, 20],
  // Le petit colis de 5 kg : les douze sont partis.
  petitTotal: 12,
};

export const PROCHAINE = { date: "vendredi 4 décembre", ouverture: "lundi 9 novembre" };

export type DateDecoupe = { jour: string; mois: string; abr: string; annee: number; libelle: string; etat: "ouverte" | "bientot" | "plus-tard"; detail: string };

export const DATES: DateDecoupe[] = [
  { jour: "6", mois: "novembre", abr: "nov.", annee: 2026, libelle: "Vendredi 6 novembre", etat: "ouverte", detail: "6 colis de 10 kg restent · le colis de 5 kg est parti" },
  { jour: "4", mois: "décembre", abr: "déc.", annee: 2026, libelle: "Vendredi 4 décembre", etat: "bientot", detail: "Réservations ouvertes le lundi 9 novembre" },
  { jour: "8", mois: "janvier", abr: "janv.", annee: 2027, libelle: "Vendredi 8 janvier", etat: "plus-tard", detail: "Réservations ouvertes début décembre" },
  { jour: "5", mois: "février", abr: "févr.", annee: 2027, libelle: "Vendredi 5 février", etat: "plus-tard", detail: "Réservations ouvertes début janvier" },
];

export const ETAPES = [
  { titre: "Tu réserves ton colis", texte: "Ici, en deux gestes. Le compteur baisse d'un : c'est le tien." },
  { titre: "On découpe le vendredi", texte: "Une seule découpe par mois, à la date annoncée. Tous les colis le même jour." },
  { titre: "Tu passes le samedi", texte: "Retrait à la ferme, le samedi matin. Pas de livraison : on préfère te voir." },
  { titre: "Tu paies sur place", texte: "Au retrait, par carte ou en espèces. Rien à payer en ligne." },
];

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  {
    q: "Le compteur des colis, il est vrai ?",
    r: "Oui. Chaque colis compté réservé est une vraie réservation, d'une vraie personne. On ne gonfle jamais le nombre pour presser qui que ce soit : quand il en reste six, il en reste six.",
  },
  {
    q: "Et quand tout est parti ?",
    r: "Le site ne dit pas « épuisé ». Il donne la date de la découpe suivante, et tu peux demander qu'on te prévienne le jour où les réservations ouvrent. Un seul message, pour ça, et rien d'autre.",
  },
  {
    q: "Je peux choisir mes morceaux ?",
    r: "Le colis est le même pour tout le monde : un peu de chaque morceau, pour que la bête soit partagée en entier. Chaque morceau et son poids sont écrits sur la page du colis.",
  },
  {
    q: "Comment je paie ?",
    r: "Au retrait, à la ferme, par carte ou en espèces. Le site ne demande aucun paiement : réserver, c'est juste mettre un colis de côté.",
  },
  {
    q: "Et si je ne peux pas venir le samedi ?",
    r: "Appelle-nous avant le jeudi : on trouve un autre moment dans la semaine qui suit la découpe. Si ça sonne dans le vide, on est au champ. Laisse un message, on rappelle le soir.",
  },
  {
    q: "Vous livrez ?",
    r: "Non. Les colis se retirent à la ferme, le samedi matin. C'est l'occasion de voir où elles ont pâturé.",
  },
];
