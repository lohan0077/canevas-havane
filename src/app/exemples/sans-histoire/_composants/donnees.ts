// Les données de Sans Histoire, société de sécurité privée imaginaire (vidéo
// « Remplir l'agenda — sécurité »). Tout est inventé ; les chiffres et les prix
// sont des exemples, et le site le dit à chaque fois.
//
// Règles du métier tenues partout (Code de la sécurité intérieure) :
//   - L612-15, al. 1 : tout document informatif, contractuel ou publicitaire
//     reproduit le numéro d'autorisation et la phrase de l'art. L612-14. Le pied
//     de chaque page, le devis et le rapport de nuit les portent.
//   - L612-15, al. 2 : aucun ancien policier ni militaire n'est mis en avant.
//   - L612-3 : la dénomination fait ressortir qu'il s'agit d'une personne de droit
//     privé — « Sans Histoire · Sécurité privée », jamais le nom seul.
//   - R631-12 : aucun logo, aucune couleur, aucun mot qui rappelle la police ou
//     l'armée (ni écusson, ni bleu-blanc-rouge, ni « intervention », ni « unité »).

export const DOSSIER = "/exemples/sans-histoire";

export const entreprise = {
  nom: "Sans Histoire",
  denomination: "Sans Histoire · Sécurité privée",
  activites: "Gardiennage · rondes · événements",
  ville: "Lyon",
  adresse: "12 rue de l'Exemple, 69007 Lyon",
  telephone: "01\u00A099\u00A000\u00A041\u00A027",
  telephoneLien: "+33199004127",
  // Numéro d'exemple : le vrai se lit sur l'autorisation délivrée par le CNAPS.
  autorisation: "AUT-000-0000-00-00-00000000000",
};

/** La phrase de l'art. L612-14, mot pour mot. */
export const PHRASE_L612_14 =
  "L'autorisation d'exercice ne confère aucune prérogative de puissance publique à l'entreprise ou aux personnes qui en bénéficient.";

export const NAVIGATION = [
  { href: `${DOSSIER}#rapport`, libelle: "Le rapport de 7 h" },
  { href: `${DOSSIER}/gardiennage-de-chantier`, libelle: "Chantiers" },
  { href: `${DOSSIER}/agent-de-securite-mariage`, libelle: "Mariages" },
  { href: `${DOSSIER}/devis`, libelle: "Devis" },
];

export const photos = {
  aube: { src: "/exemples/sans-histoire/chantier-aube.webp", largeur: 1200, hauteur: 1363, alt: "Un chantier et ses grues à l'aube, le ciel encore orangé, personne sur place" },
  brouillard: { src: "/exemples/sans-histoire/lampadaire-brouillard.webp", largeur: 1400, hauteur: 933, alt: "Un parking vide dans le brouillard, éclairé par un seul lampadaire" },
  jardin: { src: "/exemples/sans-histoire/jardin-guirlandes.webp", largeur: 1400, hauteur: 933, alt: "Un jardin de réception la nuit, des guirlandes lumineuses au-dessus de tables en bois vides" },
};

/** Une nuit de rondes sur un chantier : l'exemple du rapport de 7 h. */
export const RONDES = [
  { minute: 74, heure: "22 h 14", titre: "Ronde 1", note: "Portail fermé, cadenas en place.", cadrage: "20% 92%" },
  { minute: 221, heure: "00 h 41", titre: "Ronde 2", note: "Bâches tendues, rien au sol.", cadrage: "75% 88%" },
  { minute: 365, heure: "03 h 05", titre: "Ronde 3", note: "Grue en girouette, zone de stockage fermée.", cadrage: "60% 35%" },
  { minute: 532, heure: "05 h 52", titre: "Ronde 4", note: "Tout est en place. Le jour se lève.", cadrage: "45% 70%" },
];

/** Une page par besoin, avec les mots que les clients tapent. */
export const BESOINS = [
  {
    titre: "Gardiennage de chantier",
    texte: "Un agent la nuit et le week-end, des rondes, et le rapport chaque matin pour le conducteur de travaux.",
    href: `${DOSSIER}/gardiennage-de-chantier`,
    lien: "Gardiennage de chantier : prix et déroulé",
  },
  {
    titre: "Agent de sécurité pour un mariage",
    texte: "Un agent discret à l'entrée et au parking, pour que les mariés n'aient à penser à rien.",
    href: `${DOSSIER}/agent-de-securite-mariage`,
    lien: "Agent de sécurité pour un mariage : prix",
  },
  {
    titre: "Magasins et entrepôts",
    texte: "Des rondes la nuit, portes et volets vérifiés, une photo à chaque passage.",
    href: `${DOSSIER}/devis`,
    lien: "Demander un devis",
  },
  {
    titre: "Événements d'entreprise",
    texte: "Un accueil calme, un vestiaire tenu, un parking surveillé, du premier invité au dernier.",
    href: `${DOSSIER}/devis`,
    lien: "Demander un devis",
  },
];

export const METHODE = [
  { titre: "La visite", texte: "On vient voir le site, de jour. On note les accès, les points sensibles, vos consignes.", duree: "1 heure" },
  { titre: "Les consignes écrites", texte: "Une page, en français courant : ce que l'agent fait, quand, et qui il appelle.", duree: "48 heures" },
  { titre: "La première nuit", texte: "Un agent titulaire de sa carte professionnelle, dont vous recevez les références avant.", duree: "le soir convenu" },
  { titre: "Le premier rapport", texte: "À 7 h, dans votre boîte : les rondes, l'heure, la photo. Et la ligne qu'on aime écrire.", duree: "7 h pile" },
];

export const QUESTIONS = [
  {
    question: "Combien coûte une nuit de gardiennage ?",
    reponse: "Pour un chantier, comptez à titre d'exemple 290 à 340 € HT la nuit de douze heures, rondes et rapport compris. Le devis en trois questions vous donne une fourchette ; le prix ferme vient après la visite.",
  },
  {
    question: "Que contient le rapport de 7 h ?",
    reponse: "L'heure de chaque ronde, ce que l'agent a vérifié, une photo du site à chaque passage, et ce qui mérite votre attention. Les photos montrent le site, jamais une personne.",
  },
  {
    question: "Vos agents peuvent-ils contrôler une identité ?",
    reponse: "Non. Sans Histoire est une entreprise privée : l'autorisation d'exercice ne confère aucune prérogative de puissance publique. Nos agents observent, dissuadent, préviennent et appellent les secours ou la police quand il le faut.",
  },
  {
    question: "Puis-je savoir qui vient chez moi ?",
    reponse: "Oui. La loi vous permet de demander les références de la carte professionnelle de chaque agent qui travaille pour vous (Code de la sécurité intérieure, art. L612-15). Nous vous les envoyons avant la première nuit, sans attendre que vous les demandiez.",
  },
  {
    question: "Et s'il se passe quelque chose ?",
    reponse: "L'agent suit les consignes écrites ensemble : il appelle les secours ou la police, puis vous. Le rapport du matin raconte la nuit telle qu'elle a été, sans l'arranger.",
  },
];

/** Les fourchettes du devis, par nuit (ou par soirée), à titre d'exemple. */
export const TARIFS = {
  chantier: { libelle: "Un chantier", unite: "nuit", min: 290, max: 340, ttc: false, detail: "nuit de 12 h, un agent, rondes et rapport compris" },
  magasin: { libelle: "Un magasin ou un entrepôt", unite: "nuit", min: 120, max: 160, ttc: false, detail: "trois rondes dans la nuit, photo à chaque passage" },
  mariage: { libelle: "Un mariage ou une fête", unite: "soirée", min: 240, max: 280, ttc: true, detail: "un agent pour 8 h, entrée et parking" },
  entreprise: { libelle: "Un événement d'entreprise", unite: "soirée", min: 230, max: 270, ttc: false, detail: "un agent pour 8 h, accueil et vestiaire" },
} as const;

export type TypeDeSite = keyof typeof TARIFS;

/** « 1 450 € » : espace fine insécable pour les milliers, espace insécable avant €. */
export const euros = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;
