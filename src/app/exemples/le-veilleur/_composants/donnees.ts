// Tout ce que le site Le Veilleur affiche, au même endroit. L'entreprise est fictive :
// numéros, prix, chiffres et noms sont des exemples, et le site le dit à chaque fois.
//
// Les règles du métier qui façonnent ces données (Videos/agenda-conciergeries/SOURCES.md) :
// - la carte professionnelle : loi n° 70-9 du 2 janvier 1970, art. 1er et 3 ; mention
//   « Gestion immobilière » (décret n° 72-678, art. 1er) ; numéro, lieu de délivrance et
//   garant sur les documents (décret, art. 92), sans rien qui fasse croire à un agrément ;
// - le barème : prix maximums TTC, à qui incombe le paiement, et de quoi calculer un prix
//   exprimé en pourcentage (arrêté du 10 janvier 2017, art. 2) ;
// - rien qui situe un logement ni ne dise quand il est vide ; aucune promesse absolue.

export const DOSSIER = "/exemples/le-veilleur";

export const entreprise = {
  nom: "Le Veilleur",
  telephone: "01 99 00 23 04",
  telephoneLien: "+33199002304",
  adresse: ["8 rue de l'Exemple", "69000 Lyon"],
  zone: "Lyon et Villeurbanne",
  bureau: "Du lundi au vendredi, de 9 h à 18 h",
  nuit: "Pour les voyageurs : jour et nuit, sept jours sur sept",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/proprietaires`, libelle: "Propriétaires" },
  { href: `${DOSSIER}/bareme`, libelle: "Barème" },
  { href: `${DOSSIER}/la-carte`, libelle: "La carte" },
];

/** La carte professionnelle, ligne par ligne, avec ce que chaque ligne veut dire. */
export const carte = [
  {
    cle: "numero",
    libelle: "Numéro",
    valeur: "CPI 0000 0000 000 000 000",
    explication: "Le numéro de la carte. Il figure aussi sur le mandat, les relevés et chaque courrier.",
  },
  {
    cle: "cci",
    libelle: "Délivrée par",
    valeur: "CCI territoriale de l'Exemple",
    explication: "La carte est délivrée par le président de la chambre de commerce et d'industrie territoriale. On peut la vérifier auprès d'elle.",
  },
  {
    cle: "mention",
    libelle: "Mention",
    valeur: "Gestion immobilière",
    explication: "Celle qui permet de gérer un logement pour son propriétaire, et de le louer dans le cadre d'un mandat de gestion.",
  },
  {
    cle: "garant",
    libelle: "Garant",
    valeur: "Garant d'exemple, 1 place de l'Exemple, 69000 Lyon",
    explication: "Nous encaissons les loyers pour les propriétaires : la loi exige alors une garantie financière, qui couvre ces sommes.",
  },
];

export type LigneBareme = {
  prestation: string;
  prix: string;
  unite: string;
  payeur: "proprietaire" | "voyageur" | "inclus";
  qui: string;
  detail: string;
};

/** Le barème : prix maximums TTC, qui paie, et sur quelle base. Prix d'exemple. */
export const bareme: LigneBareme[] = [
  {
    prestation: "Gestion des séjours",
    prix: "20 %",
    unite: "des loyers encaissés",
    payeur: "proprietaire",
    qui: "Payé par le propriétaire",
    detail: "Annonce, réservations, échanges avec les voyageurs, accueil et remise des clés, ligne de nuit, encaissement et reversement des loyers.",
  },
  {
    prestation: "Ménage et linge",
    prix: "45 €",
    unite: "par départ",
    payeur: "voyageur",
    qui: "Payé par le voyageur",
    detail: "Ajouté à sa réservation, affiché avant qu'il ne réserve. Draps, serviettes et torchons changés à chaque départ.",
  },
  {
    prestation: "Mise en ligne de l'annonce",
    prix: "Incluse",
    unite: "dans la gestion des séjours",
    payeur: "inclus",
    qui: "Comprise dans les 20 %",
    detail: "Photos, texte, calendrier et réglage des prix de la nuit.",
  },
  {
    prestation: "Intervention d'un artisan",
    prix: "Prix de l'artisan",
    unite: "sans majoration",
    payeur: "proprietaire",
    qui: "Payé par le propriétaire, après son accord",
    detail: "Plombier, serrurier, électricien : le devis t'est transmis tel quel. Rien n'est engagé sans ta réponse, sauf mise en sécurité urgente.",
  },
  {
    prestation: "Fin du mandat",
    prix: "0 €",
    unite: "préavis de trois mois",
    payeur: "inclus",
    qui: "Aucun frais",
    detail: "Les clés te sont rendues avec le dernier relevé.",
  },
];

/** Les mots du barème, pour qu'il se calcule sans deviner (arrêté du 10/01/2017, art. 2, III). */
export const BASE_DE_CALCUL =
  "Loyers encaissés : le prix des nuits payé par les voyageurs pour ton logement, hors frais de ménage et hors taxe de séjour, que nous reversons à la commune.";

export const TAUX_GESTION = 0.2;
export const MENAGE = 45;

/** Le bilan du lundi. Chiffres d'exemple : sur un vrai site, les vrais, chaque semaine. */
export const bilans = [
  {
    semaine: "du 5 au 11 octobre 2026",
    court: "5–11 oct.",
    arrivees: 14,
    appels: 3,
    reveilles: 0,
    note: "Une boîte à clés grippée à 23 h 04, réglée au téléphone avec le voyageur.",
  },
  {
    semaine: "du 28 septembre au 4 octobre 2026",
    court: "28 sept.–4 oct.",
    arrivees: 11,
    appels: 5,
    reveilles: 1,
    note: "Une fuite sous un évier un samedi soir. Faire venir un plombier, c'était au propriétaire de le décider : nous l'avons appelé. Nous l'écrivons ici.",
  },
  {
    semaine: "du 21 au 27 septembre 2026",
    court: "21–27 sept.",
    arrivees: 12,
    appels: 1,
    reveilles: 0,
    note: "Un code de wifi demandé à 0 h 40. Le seul appel de nuit de la semaine.",
  },
];

export const services = [
  { titre: "L'annonce", texte: "Photos, texte, calendrier, prix de la nuit selon la saison. Ton nom n'y figure pas." },
  { titre: "Les réservations", texte: "Nous répondons aux voyageurs, acceptons les séjours et préparons chaque arrivée." },
  { titre: "L'accueil", texte: "Remise des clés en main propre ou par boîte à code, selon le logement. Explication du logement à l'arrivée." },
  { titre: "Le ménage et le linge", texte: "Après chaque départ : ménage complet, draps et serviettes changés, lit fait pour le suivant." },
  { titre: "La ligne de nuit", texte: "Un numéro pour les voyageurs, de jour comme de nuit. C'est lui qui sonne, pas le tien." },
  { titre: "Les loyers", texte: "Encaissés pour ton compte et reversés chaque mois, avec un relevé séjour par séjour." },
];

export const methode = [
  { titre: "La visite", duree: "Une heure", texte: "Nous visitons le logement avec toi : ce qu'il faut pour accueillir, ce qu'il faut ranger, les démarches propres à ta commune." },
  { titre: "Le mandat", duree: "Avant toute location", texte: "Un mandat de gestion écrit : ce que nous faisons, ce que ça coûte, combien de temps. Le barème y est recopié." },
  { titre: "L'annonce", duree: "Une semaine", texte: "Photos, texte, calendrier. Tu relis avant la mise en ligne." },
  { titre: "Chaque séjour", duree: "Toute l'année", texte: "Accueil, ménage, linge, ligne de nuit. Le lundi, le bilan ; chaque mois, le relevé et le virement." },
];

export const questions = [
  {
    q: "Une conciergerie doit-elle avoir une carte professionnelle ?",
    r: "Dès qu'elle loue, de façon habituelle, le logement d'un autre, même à titre accessoire : oui. C'est la loi n° 70-9 du 2 janvier 1970 (art. 1er et 3). La nôtre porte la mention « Gestion immobilière », parce que nous louons dans le cadre d'un mandat de gestion. Le ménage et le linge, eux, ne figurent pas dans la liste de la loi.",
  },
  {
    q: "Pourquoi un garant ?",
    r: "Parce que nous encaissons les loyers pour ton compte. La loi exige alors une garantie financière : elle couvre les sommes que nous détenons pour toi, dans les conditions prévues par la loi. Son nom et son adresse sont sur la carte, plus haut.",
  },
  {
    q: "Qui paie le ménage ?",
    r: "Le voyageur : 45 € par départ (prix d'exemple), ajoutés à sa réservation et affichés avant qu'il ne réserve. Toi, tu paies la gestion des séjours : 20 % des loyers encaissés. Le barème complet dit qui paie quoi, ligne par ligne.",
  },
  {
    q: "Vous publiez l'adresse ou les photos de mon logement ?",
    r: "Pas sur ce site. L'annonce montre le logement, jamais ton nom ; l'adresse exacte n'est donnée qu'au voyageur qui a réservé. Tes dates d'absence et tes affaires personnelles n'apparaissent nulle part.",
  },
  {
    q: "Et si un voyageur appelle la nuit ?",
    r: "Il appelle notre ligne, pas toi. Nous réglons ce qui peut l'être. Si une décision t'appartient (faire venir un artisan, par exemple), nous t'appelons, même la nuit. Ça arrive, et le bilan du lundi le dit.",
  },
  {
    q: "Combien de temps dure le mandat ?",
    r: "Un an, renouvelable. Tu peux y mettre fin à tout moment avec un préavis de trois mois, sans frais. Conditions d'exemple : sur un vrai site, celles du mandat.",
  },
];

export const photos = {
  fenetre: { src: "/exemples/le-veilleur/fenetre-nuit.webp", largeur: 1400, hauteur: 1866, alt: "Une fenêtre éclairée, la nuit, derrière des branches" },
  lampe: { src: "/exemples/le-veilleur/lampe-chevet.webp", largeur: 1200, hauteur: 800, alt: "Une lampe de chevet allumée au-dessus d'un lit aux draps blancs" },
  cle: { src: "/exemples/le-veilleur/cle-serrure.webp", largeur: 1000, hauteur: 669, alt: "Une clé ancienne dans la serrure d'une porte en bois" },
  oreiller: { src: "/exemples/le-veilleur/oreiller-lumiere.webp", largeur: 1000, hauteur: 1500, alt: "Un oreiller blanc rayé par la lumière d'un store" },
};
