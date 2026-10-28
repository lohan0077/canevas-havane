// Les données de Veilleuse, société de sécurité privée imaginaire des deux vidéos de
// la sécurité : « Créer une marque » (pas de bouclier, une veilleuse ; qui vient ce
// soir, avec les références de sa carte ; l'affiche « On veille. Tu dors. ») et
// « Remplir l'agenda » (le rapport de la nuit à 7 h ; le devis en trois questions ;
// une page par besoin ; le numéro CNAPS et la phrase obligatoire en évidence). Tout
// est inventé ; les prix et les numéros sont des exemples, et le site le dit.
//
// Règles du métier tenues partout (Code de la sécurité intérieure) :
//   - L612-3 et R631-12 : un nom, un logo, des couleurs qui ne prêtent à aucune
//     confusion avec la police — une veilleuse, du vert nuit, du jaune de lampe ;
//     et « Sécurité privée » accolé au nom.
//   - L612-15, al. 1 : le numéro d'autorisation et la phrase de l'art. L612-14 au
//     pied de chaque page, sur le devis, le rapport, l'espace client et l'affiche.
//   - L612-15, al. 2 : aucun ancien policier ni militaire mis en avant.
//   - L612-15, al. 3 : les références de la carte professionnelle de l'agent, que le
//     client peut demander, sont données avant qu'il demande — dans son espace
//     client, pas sur une page publique (ce sont des données personnelles).

export const DOSSIER = "/exemples/veilleuse";

export const entreprise = {
  nom: "Veilleuse",
  denomination: "Veilleuse · Sécurité privée",
  signature: "On veille. Tu dors.",
  ville: "Nantes",
  adresse: "12 rue de l'Exemple, 44000 Nantes",
  telephone: "01 99 00 63 18",
  telephoneLien: "+33199006318",
  horaires: "Au téléphone du lundi au vendredi, de 8 h à 19 h",
  // Numéro d'exemple : le vrai se lit sur l'autorisation délivrée par le CNAPS.
  autorisation: "AUT-000-0000-00-00-00000000000",
};

/** La phrase de l'art. L612-14, mot pour mot. */
export const PHRASE_L612_14 =
  "L'autorisation d'exercice ne confère aucune prérogative de puissance publique à l'entreprise ou aux personnes qui en bénéficient.";

export const NAVIGATION = [
  { href: `${DOSSIER}/ce-soir`, libelle: "Qui vient ce soir" },
  { href: `${DOSSIER}#rapport`, libelle: "Le rapport de 7 h" },
  { href: `${DOSSIER}/nos-nuits`, libelle: "Nos nuits et nos prix" },
  { href: `${DOSSIER}/devis`, libelle: "Devis" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const P = DOSSIER;
export const photos = {
  lune: { src: `${P}/lune-sapins.webp`, largeur: 1400, hauteur: 2100, alt: "Un croissant de lune au-dessus d'une forêt de sapins, dans un ciel de nuit étoilé" },
  maison: { src: `${P}/maison-nuit.webp`, largeur: 1400, hauteur: 787, alt: "Une maison la nuit, deux fenêtres éclairées, le jardin calme" },
  chevet: { src: `${P}/lampe-chevet.webp`, largeur: 1400, hauteur: 933, alt: "Une lampe de chevet allumée près d'un lit, dans une chambre sombre" },
  aube: { src: `${P}/chantier-aube.webp`, largeur: 1200, hauteur: 1363, alt: "Un chantier et ses grues à l'aube, le ciel encore orangé, personne sur place" },
  brouillard: { src: `${P}/lampadaire-brouillard.webp`, largeur: 1400, hauteur: 933, alt: "Un parking vide dans le brouillard, éclairé par un seul lampadaire" },
  jardin: { src: `${P}/jardin-guirlandes.webp`, largeur: 1400, hauteur: 933, alt: "Un jardin de réception la nuit, des guirlandes lumineuses au-dessus de tables en bois vides" },
} satisfies Record<string, Photo>;

/* ---------- L'espace client : qui vient ce soir ---------- */

/** Les nuits de la semaine dans l'espace client d'exemple. */
export const NUITS = [
  { jour: "Ce soir", date: "vendredi", prenom: "Karim", initiale: "K", horaires: "21 h – 7 h", passages: "3 passages", carte: "CAR-000-0000-00-00-00000000001" },
  { jour: "Demain", date: "samedi", prenom: "Inès", initiale: "I", horaires: "21 h – 7 h", passages: "3 passages", carte: "CAR-000-0000-00-00-00000000002" },
  { jour: "Dimanche", date: "dimanche", prenom: "Karim", initiale: "K", horaires: "22 h – 6 h", passages: "2 passages", carte: "CAR-000-0000-00-00-00000000001" },
];

/* ---------- Le rapport de 7 h ---------- */

/** Une nuit de rondes sur un chantier : l'exemple du rapport de 7 h. */
export const RONDES = [
  { minute: 74, heure: "22 h 14", titre: "Ronde 1", note: "Portail fermé, cadenas en place.", cadrage: "20% 92%" },
  { minute: 221, heure: "00 h 41", titre: "Ronde 2", note: "Bâches tendues, rien au sol.", cadrage: "75% 88%" },
  { minute: 365, heure: "03 h 05", titre: "Ronde 3", note: "Grue en girouette, zone de stockage fermée.", cadrage: "60% 35%" },
  { minute: 532, heure: "05 h 52", titre: "Ronde 4", note: "Tout est en place. Le jour se lève.", cadrage: "45% 70%" },
];

/* ---------- Ce qu'on veille, et à quel prix ---------- */

export const OFFRES = [
  { titre: "Ta maison, quand tu pars", texte: "Deux ou trois passages par nuit, portail et volets vérifiés, une photo du portail à chaque fois.", prix: "dès 45 € TTC la nuit", pour: "particulier", photo: "maison" as const, href: `${DOSSIER}/nos-nuits` },
  { titre: "Ton commerce, la nuit", texte: "Des rondes à heures variables, rideau et alarme vérifiés, le rapport chaque matin.", prix: "dès 120 € HT la nuit", pour: "professionnel", photo: "brouillard" as const, href: `${DOSSIER}/devis` },
  { titre: "Gardiennage de chantier", texte: "Un agent sur place de 19 h à 7 h, le week-end compris, et le rapport de 7 h pour le conducteur de travaux.", prix: "dès 290 € HT la nuit", pour: "professionnel", photo: "aube" as const, href: `${DOSSIER}/gardiennage-de-chantier` },
  { titre: "Agent de sécurité pour un mariage", texte: "Un agent discret au portail et au parking, jusqu'au départ du dernier invité.", prix: "dès 240 € TTC la soirée", pour: "particulier", photo: "jardin" as const, href: `${DOSSIER}/agent-de-securite-mariage` },
];

/** Les fourchettes du devis, par nuit (ou par soirée), à titre d'exemple. */
export const TARIFS = {
  chantier: { libelle: "Un chantier", unite: "nuit", min: 290, max: 340, ttc: false, detail: "nuit de 12 h, un agent, rondes et rapport compris" },
  magasin: { libelle: "Un commerce ou un entrepôt", unite: "nuit", min: 120, max: 160, ttc: false, detail: "trois rondes dans la nuit, photo à chaque passage" },
  mariage: { libelle: "Un mariage ou une fête", unite: "soirée", min: 240, max: 280, ttc: true, detail: "un agent pour 8 h, entrée et parking" },
  maison: { libelle: "Ma maison, quand je pars", unite: "nuit", min: 45, max: 60, ttc: true, detail: "deux ou trois passages, une photo du portail à chaque fois" },
} as const;

export type TypeDeSite = keyof typeof TARIFS;

/* ---------- Comment ça se passe ---------- */

export const ETAPES = [
  { titre: "On passe voir", moment: "De jour, gratuitement", texte: "Une heure sur place. On note les accès, la lumière, les points sensibles et tes consignes.", photo: "maison" as const },
  { titre: "Les consignes, écrites", moment: "Sous 48 heures", texte: "Une page, en français courant : ce que l'agent fait, quand, et qui il appelle.", photo: "brouillard" as const },
  { titre: "On te présente l'agent", moment: "L'après-midi", texte: "Son prénom, ses horaires et les références de sa carte professionnelle, dans ton espace client.", photo: "chevet" as const },
  { titre: "Le rapport de 7 h", moment: "Chaque matin", texte: "Les rondes, l'heure, la photo. Et, le plus souvent, la ligne qu'on aime écrire : rien à signaler.", photo: "aube" as const },
];

export const QUESTIONS = [
  { question: "Pourquoi « Veilleuse » ?", reponse: "Comme la petite lumière qui reste allumée toute la nuit dans une chambre d'enfant. Elle ne fait pas peur. Elle rassure." },
  { question: "Qui vient chez moi ?", reponse: "Un agent de sécurité titulaire de sa carte professionnelle. Tu vois son prénom, ses horaires et les références de sa carte dans ton espace client, avant la nuit. La loi te permet de les demander (Code de la sécurité intérieure, art. L612-15) : on te les donne sans attendre." },
  { question: "Que contient le rapport de 7 h ?", reponse: "L'heure de chaque ronde, ce que l'agent a vérifié, une photo du site à chaque passage, et ce qui mérite ton attention. Les photos montrent le site, jamais une personne." },
  { question: "Combien coûte une nuit de gardiennage ?", reponse: "Pour un chantier, compte à titre d'exemple 290 à 340 € HT la nuit de douze heures, rondes et rapport compris. Le devis en trois questions donne une fourchette ; le prix ferme vient après la visite." },
  { question: "L'agent peut-il contrôler une identité, ou arrêter quelqu'un ?", reponse: "Non. Veilleuse est une entreprise privée : l'autorisation d'exercice ne confère aucune prérogative de puissance publique. L'agent observe, dissuade, et appelle les secours ou la police quand il le faut." },
  { question: "Et si je rentre plus tôt ?", reponse: "Tu le dis dans ton espace client ou par téléphone avant midi : la nuit n'est pas facturée." },
  { question: "Pourquoi pas de bouclier dans votre logo ?", reponse: "Parce que tu ne veux pas avoir peur, tu veux dormir. Et parce que la loi demande qu'une société de sécurité privée ne prête à aucune confusion avec la police, ni par son nom, ni par son logo." },
];

/** « 1 450 € » : espace fine insécable pour les milliers, espace insécable avant €. */
export const euros = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;
