// Tout ce que le site Bonne Nouvelle affiche. L'entreprise est fictive : numéros, dates,
// dossiers, honoraires et créneaux sont des exemples, et le site le dit à chaque fois.
//
// Les règles qui façonnent ces données (Videos/marque-courtiers/SOURCES.md) :
// - aucune formule qui présuppose que la banque dira oui (C. consom. L313-5, 2°) : « Oui ou
//   non, on t'appelle », jamais « quand la banque dira oui » ; un dossier refusé est montré
//   à côté d'un dossier accordé ;
// - aucun appel de prospection : on n'appelle que ses clients (contrat en cours, L223-1 al. 4) ;
// - nom, adresse, ORIAS et catégorie (CMF R519-24), établissements (L322-2 al. 2), les
//   phrases de L322-2 et de L313-3, le médiateur (R616-1), sur chaque page ;
// - rien avant le versement des fonds (CMF L519-6), dit comme la loi pour tous ;
// - aucun taux, aucune promesse chiffrée.

export const DOSSIER = "/exemples/bonne-nouvelle";

export const PHRASE_L322_2 =
  "Aucun versement, de quelque nature que ce soit, ne peut être exigé d'un particulier, avant l'obtention d'un ou plusieurs prêts d'argent.";
export const PHRASE_L313_3 =
  "L'emprunteur dispose d'un délai de réflexion de dix jours. La vente est subordonnée à l'obtention du prêt ; si celui-ci n'est pas obtenu, le vendeur doit lui rembourser les sommes versées.";

export const entreprise = {
  nom: "Bonne Nouvelle",
  adresse: "12 rue de l'Exemple, 69000 Lyon",
  categorie: "Courtier en opérations de banque et en services de paiement",
  orias: "00 000 000",
  telephone: "01 99 00 57 13",
  telephoneLien: "+33199005713",
  horaires: "Du lundi au vendredi, de 9 h à 19 h",
  banques: ["Banque d'exemple A, 1 avenue de l'Exemple, 75000 Paris", "Banque d'exemple B, 2 quai de l'Exemple, 69000 Lyon"],
};

export const NAVIGATION = [
  { href: `${DOSSIER}/mon-dossier`, libelle: "Suivre un dossier" },
  { href: `${DOSSIER}/honoraires`, libelle: "Honoraires" },
  { href: `${DOSSIER}#rendez-vous`, libelle: "Rendez-vous" },
];

export type Etape = { titre: string; date: string; etat: "fait" | "attente" | "sans-objet"; texte: string };
export type DossierSuivi = { numero: string; statut: string; issue: "accord" | "refus"; etapes: Etape[] };

/** Deux dossiers d'exemple : l'un accordé, l'autre refusé. On appelle dans les deux cas. */
export const dossiers: DossierSuivi[] = [
  {
    numero: "2731",
    statut: "Terminé · fonds versés",
    issue: "accord",
    etapes: [
      { titre: "Dossier reçu", date: "3 mars 2026", etat: "fait", texte: "Toutes les pièces sont là. Rien ne manque." },
      { titre: "Envoyé aux banques", date: "6 mars 2026", etat: "fait", texte: "Présenté à quatre banques. C'est nous qui les relançons, pas toi." },
      {
        titre: "Réponse des banques",
        date: "21 mars 2026",
        etat: "fait",
        texte: "Accord de la Banque d'exemple A, trois refus. Nous t'avons appelé le jour même. Offre de prêt reçue le 2 avril : dix jours de réflexion avant de l'accepter.",
      },
      { titre: "Fonds versés", date: "28 avril 2026", etat: "fait", texte: "Les fonds sont versés. Nos honoraires sont dus à partir de là, pas avant : c'est la loi pour tous (CMF, art. L519-6)." },
    ],
  },
  {
    numero: "2688",
    statut: "Clôturé · sans prêt",
    issue: "refus",
    etapes: [
      { titre: "Dossier reçu", date: "10 avril 2026", etat: "fait", texte: "Toutes les pièces sont là." },
      { titre: "Envoyé aux banques", date: "14 avril 2026", etat: "fait", texte: "Présenté à trois banques." },
      {
        titre: "Réponse des banques",
        date: "5 mai 2026",
        etat: "fait",
        texte: "Trois refus. Nous t'avons appelé le jour même pour t'expliquer pourquoi, et ce qui pourrait changer la réponse.",
      },
      { titre: "Fonds versés", date: "—", etat: "sans-objet", texte: "Sans prêt, rien n'est versé : tu ne nous dois rien. Même loi." },
    ],
  },
];

export const methode = [
  { titre: "Le rendez-vous", texte: "Une heure, au cabinet ou en visio : ton projet, ton budget, ce que les banques vont regarder." },
  { titre: "Le dossier", texte: "Nous le montons avec toi, pièce par pièce. Le mandat fixe nos honoraires avant de commencer." },
  { titre: "Les banques", texte: "Nous présentons ton dossier et les relançons. Tu le suis en ligne, étape par étape." },
  { titre: "Le coup de fil", texte: "Quand elles répondent, on t'appelle. Oui ou non." },
];

export const questions = [
  {
    q: "Vous m'appelez ? Je croyais que c'était interdit.",
    r: "Démarcher un particulier par téléphone sans son accord l'est, depuis le 11 août 2026 (code de la consommation, art. L223-1). Appeler son propre client pour lui donner la réponse de la banque, non : c'est faire ce pour quoi il nous a mandatés. Nous n'appelons que nos clients.",
  },
  {
    q: "Et si la banque dit non ?",
    r: "On t'appelle aussi, le jour même. On t'explique pourquoi, et ce qui pourrait changer la réponse. Tu ne nous dois rien : rien ne peut être perçu avant le versement des fonds, c'est la loi pour tous les courtiers.",
  },
  {
    q: "Combien ça coûte ?",
    r: "1 % du montant emprunté, entre 1 200 et 2 500 € TTC (exemple), fixé dans le mandat et payé une fois les fonds versés. La banque peut aussi nous verser une rémunération : son existence et son montant te sont indiqués avant que tu ne t'engages.",
  },
  {
    q: "Vous affichez des taux ?",
    r: "Non. Un taux dépend de ton dossier ; affiché sans lui, il ne dit rien de ce que tu obtiendras.",
  },
  {
    q: "Le suivi en ligne, qui le voit ?",
    r: "Toi seul : sur un vrai site, ton dossier est derrière un accès personnel. Ici, les deux dossiers sont des exemples.",
  },
];

export const photos = {
  vert: { src: "/exemples/bonne-nouvelle/telephone-vert.webp", largeur: 1200, hauteur: 803, alt: "Un téléphone à cadran vert posé sur une table en bois sombre" },
  jaune: { src: "/exemples/bonne-nouvelle/telephone-jaune.webp", largeur: 1000, hauteur: 1500, alt: "Un téléphone à cadran jaune sur un guéridon, devant un tableau" },
  porte: { src: "/exemples/bonne-nouvelle/porte-entrouverte.webp", largeur: 1000, hauteur: 1500, alt: "Une porte blanche entrouverte, la lumière du jour passe par l'entrebâillement" },
};
