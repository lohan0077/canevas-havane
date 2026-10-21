// Tout ce que le site Mot pour Mot affiche. L'entreprise est fictive : numéros, prix,
// dossiers et créneaux sont des exemples, et le site le dit à chaque fois.
//
// Les règles qui façonnent ces données (Videos/agenda-courtiers/SOURCES.md,
// Videos/regles-metiers/courtiers-01-sans-accord.md) :
// - la phrase de C. consom. L322-2, mot pour mot, présentée comme la loi de tous les
//   courtiers en crédit immobilier, jamais comme un avantage propre (L121-4, 10°) ;
// - la mention de L313-3 (dix jours de réflexion, vente subordonnée au prêt) ;
// - nom, adresse, ORIAS et catégorie sur toute publicité (CMF R519-24), et les
//   établissements pour le compte desquels le courtier exerce (L322-2, al. 2) ;
// - le médiateur sur le site (C. consom. R616-1) ;
// - rien avant le versement des fonds (CMF L519-6), dit comme la loi pour tous ;
// - aucune formulation qui présuppose que la banque dira oui (C. consom. L313-5) ;
// - aucun appel de prospection (C. consom. L223-1) : c'est le client qui réserve.

export const DOSSIER = "/exemples/mot-pour-mot";

export const PHRASE_L322_2 =
  "Aucun versement, de quelque nature que ce soit, ne peut être exigé d'un particulier, avant l'obtention d'un ou plusieurs prêts d'argent.";

export const PHRASE_L313_3 =
  "L'emprunteur dispose d'un délai de réflexion de dix jours. La vente est subordonnée à l'obtention du prêt ; si celui-ci n'est pas obtenu, le vendeur doit lui rembourser les sommes versées.";

export const entreprise = {
  nom: "Mot pour Mot",
  telephone: "01 99 00 32 22",
  telephoneLien: "+33199003222",
  adresse: "1 rue de l'Exemple, 69000 Lyon",
  categorie: "Courtier en opérations de banque et en services de paiement",
  orias: "00 000 000",
  horaires: "Du lundi au vendredi, de 9 h à 19 h ; le samedi matin",
  banques: [
    "Banque d'exemple A, 1 avenue de l'Exemple, 75000 Paris",
    "Banque d'exemple B, 2 quai de l'Exemple, 69000 Lyon",
  ],
};

export const NAVIGATION = [
  { href: `${DOSSIER}/honoraires`, libelle: "Quand je paie" },
  { href: `${DOSSIER}/situations/pret-cdd`, libelle: "Ta situation" },
  { href: `${DOSSIER}#rendez-vous`, libelle: "Rendez-vous" },
];

export const etapes = [
  {
    titre: "Rendez-vous",
    prix: "0 €",
    texte: "Ta situation, ton projet, ce que les banques vont regarder. Au cabinet ou en visio, une heure.",
  },
  {
    titre: "Dossier",
    prix: "0 €",
    texte: "Nous montons ton dossier avec toi, pièce par pièce. Le mandat que tu signes fixe nos honoraires avant de commencer.",
  },
  {
    titre: "Offre de la banque",
    prix: "0 €",
    texte: "Nous présentons ton dossier aux banques et te transmettons leurs réponses. Si l'une te fait une offre, tu as dix jours de réflexion avant de l'accepter.",
  },
  {
    titre: "Fonds versés",
    prix: "Honoraires",
    note: "exemple : 1 900 € TTC",
    texte: "Tu paies nos honoraires une fois les fonds versés par la banque. Pas avant. Si aucune banque ne prête, les fonds ne sont jamais versés : tu ne nous dois rien.",
  },
];

export const HONORAIRES = "1 900 € TTC";

export type Situation = {
  slug: string;
  onglet: string;
  titre: string;
  accent: string;
  recherche: string;
  chapeau: string;
  regardent: string[];
  pieces: string[];
  dossier: { titre: string; lignes: string[] };
  question: { q: string; r: string };
};

export const situations: Situation[] = [
  {
    slug: "pret-cdd",
    onglet: "En CDD",
    titre: "Prêt immobilier en",
    accent: "CDD",
    recherche: "prêt immobilier cdd",
    chapeau:
      "Un CDD n'interdit pas d'emprunter. Il oblige à montrer autre chose qu'un contrat : la régularité de tes revenus, ton secteur, ton apport.",
    regardent: [
      "Ton ancienneté dans le métier, CDD compris",
      "Ton secteur : fonction publique, santé, enseignement…",
      "La régularité de tes revenus sur deux ou trois ans",
      "Ton apport, et l'épargne qui te reste après l'achat",
      "Ce que te coûte ton logement aujourd'hui",
    ],
    pieces: [
      "Tes trois derniers bulletins de salaire",
      "Tes contrats des deux ou trois dernières années",
      "Tes deux derniers avis d'imposition",
      "Tes trois derniers relevés de compte",
      "Le justificatif de ton apport",
      "Le compromis de vente, s'il est signé",
    ],
    dossier: {
      titre: "Contractuelle de la fonction publique, deux CDD en trois ans",
      lignes: ["Revenus réguliers sur trois ans, apport de 10 %", "Présenté à quatre banques : deux offres, deux refus", "Première offre reçue sept semaines après le rendez-vous"],
    },
    question: {
      q: "Quelle banque prête en CDD ?",
      r: "Il n'y a pas de banque « des CDD » : chacune a ses critères, et ils changent. C'est ce que nous regardons pour ton dossier, banque par banque. Aucune n'est tenue de prêter.",
    },
  },
  {
    slug: "auto-entrepreneur",
    onglet: "Auto-entrepreneur",
    titre: "Prêt immobilier",
    accent: "auto-entrepreneur",
    recherche: "prêt immobilier auto-entrepreneur",
    chapeau:
      "Les banques regardent ton chiffre d'affaires sur la durée, pas ton meilleur mois. Le plus important se prépare avant le premier rendez-vous.",
    regardent: [
      "Combien d'années de déclarations : souvent deux ou trois",
      "Le revenu retenu, souvent après l'abattement de ton régime",
      "La régularité d'une année sur l'autre",
      "Ton apport et ton épargne de précaution",
      "Ton activité : tes clients, ton secteur",
    ],
    pieces: [
      "Tes déclarations de chiffre d'affaires des deux ou trois dernières années",
      "Tes avis d'imposition des mêmes années",
      "Ton attestation d'immatriculation",
      "Tes relevés de compte, professionnel et personnel",
      "Le justificatif de ton apport",
    ],
    dossier: {
      titre: "Graphiste, micro-entreprise depuis quatre ans",
      lignes: ["Chiffre d'affaires stable sur trois ans", "Présenté à cinq banques : une offre, quatre refus", "Offre reçue neuf semaines après le rendez-vous"],
    },
    question: {
      q: "Combien d'années de bilans faut-il ?",
      r: "Souvent deux ou trois années de déclarations, selon les banques. Avec moins, ce n'est pas impossible, mais le dossier doit compenser : apport, épargne, régularité.",
    },
  },
  {
    slug: "primo-accedant",
    onglet: "Premier achat",
    titre: "Premier achat :",
    accent: "primo-accédant",
    recherche: "prêt immobilier primo-accédant",
    chapeau:
      "Le premier achat, c'est souvent le premier dossier de prêt. Nous te disons ce que les banques vont regarder, avant qu'elles le regardent.",
    regardent: [
      "Ton apport, même modeste",
      "Ce que tu peux rembourser chaque mois",
      "La tenue de tes comptes des derniers mois",
      "Les prêts aidés auxquels tu peux avoir droit, sous conditions",
    ],
    pieces: [
      "Tes trois derniers bulletins de salaire",
      "Tes deux derniers avis d'imposition",
      "Tes trois derniers relevés de compte",
      "Le justificatif de ton apport",
      "Le compromis de vente, s'il est signé",
    ],
    dossier: {
      titre: "Couple, premier appartement, deux CDI",
      lignes: ["Apport de 8 %, comptes tenus sans découvert", "Présenté à trois banques : deux offres, un refus", "Première offre reçue cinq semaines après le rendez-vous"],
    },
    question: {
      q: "Faut-il un apport ?",
      r: "Le plus souvent, les banques en demandent un, au moins pour couvrir les frais. Son montant dépend du dossier entier : nous te le disons au rendez-vous, chiffres en main.",
    },
  },
];

export const questions = [
  {
    q: "Comment est payé un courtier ?",
    r: "Par toi, avec des honoraires fixés dans le mandat avant de commencer (exemple : 1 900 € TTC), payés une fois les fonds versés. La banque peut aussi nous verser une rémunération : son existence et son montant te sont indiqués avant que tu ne t'engages.",
  },
  {
    q: "Pourquoi cette phrase en titre ?",
    r: "Parce que la loi l'impose, mot pour mot, à tous les courtiers en crédit immobilier (code de la consommation, art. L322-2). Elle est souvent cachée en bas de page. Nous préférons qu'elle soit la première chose que tu lises.",
  },
  {
    q: "Et si aucune banque ne me prête ?",
    r: "Les fonds ne sont jamais versés, et tu ne nous dois rien : rien ne peut être perçu avant leur versement, c'est la loi pour tous les intermédiaires (code monétaire et financier, art. L519-6). Nous te disons pourquoi les banques ont refusé.",
  },
  {
    q: "Vous allez m'appeler ?",
    r: "Non, pas pour te démarcher : depuis le 11 août 2026, démarcher un particulier par téléphone sans son accord est interdit (code de la consommation, art. L223-1). C'est toi qui choisis ton créneau ; une fois ton dossier ouvert, nous t'appelons pour le suivre.",
  },
];

export const photos = {
  pignon: { src: "/exemples/mot-pour-mot/pignon-raye.webp", largeur: 1200, hauteur: 1800, alt: "Le pignon d'une maison à rayures noires et blanches, une fenêtre aux volets fermés" },
  angle: { src: "/exemples/mot-pour-mot/angle-blanc.webp", largeur: 1000, hauteur: 1280, alt: "L'angle d'un immeuble blanc sur un ciel noir" },
  piece: { src: "/exemples/mot-pour-mot/piece-vide.webp", largeur: 1200, hauteur: 800, alt: "Une pièce vide aux murs blancs : un escabeau, un tabouret et une plante" },
};
