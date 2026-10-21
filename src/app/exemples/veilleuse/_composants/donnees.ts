// Les données de Veilleuse, marque de sécurité privée imaginaire (vidéo « Créer une
// marque — sécurité »). Tout est inventé ; les prix et les numéros sont des exemples.
//
// Règles du métier tenues partout (Code de la sécurité intérieure) :
//   - L612-3 et R631-12 : un nom, un logo, des couleurs qui ne prêtent à aucune
//     confusion avec la police — une veilleuse, du vert nuit, du jaune de lampe ;
//     et « Sécurité privée » accolé au nom.
//   - L612-15, al. 1 : le numéro d'autorisation et la phrase de l'art. L612-14 au
//     pied de chaque page, sur l'espace client et sur l'affiche.
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
  autorisation: "AUT-000-0000-00-00-00000000000",
};

export const PHRASE_L612_14 =
  "L'autorisation d'exercice ne confère aucune prérogative de puissance publique à l'entreprise ou aux personnes qui en bénéficient.";

export const NAVIGATION = [
  { href: `${DOSSIER}/ce-soir`, libelle: "Qui vient ce soir" },
  { href: `${DOSSIER}/nos-nuits`, libelle: "Nos nuits et nos prix" },
  { href: `${DOSSIER}#questions`, libelle: "Questions" },
];

export const photos = {
  lune: { src: "/exemples/veilleuse/lune-sapins.webp", largeur: 1400, hauteur: 2100, alt: "Un croissant de lune au-dessus d'une forêt de sapins, dans un ciel de nuit étoilé" },
  maison: { src: "/exemples/veilleuse/maison-nuit.webp", largeur: 1400, hauteur: 787, alt: "Une maison la nuit, deux fenêtres éclairées, le jardin calme" },
  chevet: { src: "/exemples/veilleuse/lampe-chevet.webp", largeur: 1400, hauteur: 933, alt: "Une lampe de chevet allumée près d'un lit, dans une chambre sombre" },
};

/** Les nuits de la semaine dans l'espace client d'exemple. */
export const NUITS = [
  { jour: "Ce soir", date: "vendredi", prenom: "Karim", initiale: "K", horaires: "21\u00A0h – 7\u00A0h", passages: "3\u00A0passages", carte: "CAR-000-0000-00-00-00000000001" },
  { jour: "Demain", date: "samedi", prenom: "Inès", initiale: "I", horaires: "21\u00A0h – 7\u00A0h", passages: "3\u00A0passages", carte: "CAR-000-0000-00-00-00000000002" },
  { jour: "Dimanche", date: "dimanche", prenom: "Karim", initiale: "K", horaires: "22\u00A0h – 6\u00A0h", passages: "2\u00A0passages", carte: "CAR-000-0000-00-00-00000000001" },
];

export const OFFRES = [
  { titre: "Ta maison, quand tu pars", texte: "Deux ou trois passages par nuit, portail et volets vérifiés, une photo du portail à chaque fois.", prix: "dès 45 € TTC la nuit", pour: "particulier" },
  { titre: "Ton commerce, la nuit", texte: "Des rondes à heures variables, rideau et alarme vérifiés, un mot chaque matin.", prix: "dès 120 € HT la nuit", pour: "professionnel" },
  { titre: "Ton chantier", texte: "Un agent sur place de 19 h à 7 h, le week-end compris.", prix: "dès 290 € HT la nuit", pour: "professionnel" },
  { titre: "Ta fête à la maison", texte: "Un agent discret au portail et au parking, jusqu'au départ du dernier invité.", prix: "dès 240 € TTC la soirée", pour: "particulier" },
];

export const ETAPES = [
  { titre: "On passe voir", texte: "De jour, gratuitement. On note les accès, la lumière, tes consignes." },
  { titre: "On te présente l'agent", texte: "Son prénom, ses horaires et les références de sa carte professionnelle, dans ton espace client." },
  { titre: "Chaque matin, un mot", texte: "« Nuit calme. » Ou ce qui mérite ton attention, s'il y a quelque chose." },
];

export const QUESTIONS = [
  { question: "Pourquoi « Veilleuse » ?", reponse: "Comme la petite lumière qui reste allumée toute la nuit dans une chambre d'enfant. Elle ne fait pas peur. Elle rassure." },
  { question: "Qui vient chez moi ?", reponse: "Un agent de sécurité titulaire de sa carte professionnelle. Tu vois son prénom, ses horaires et les références de sa carte dans ton espace client, avant la nuit. La loi te permet de les demander (Code de la sécurité intérieure, art. L612-15) : on te les donne sans attendre." },
  { question: "L'agent peut-il arrêter quelqu'un ?", reponse: "Non. Veilleuse est une entreprise privée : l'autorisation d'exercice ne confère aucune prérogative de puissance publique. L'agent observe, dissuade, et appelle les secours ou la police quand il le faut." },
  { question: "Et si je rentre plus tôt ?", reponse: "Tu le dis dans ton espace client ou par téléphone avant midi : la nuit n'est pas facturée." },
  { question: "Pourquoi pas de bouclier dans votre logo ?", reponse: "Parce que tu ne veux pas avoir peur, tu veux dormir. Et parce que la loi demande qu'une société de sécurité privée ne prête à aucune confusion avec la police, ni par son nom, ni par son logo." },
];

/** « 1 450 € » : espace fine insécable pour les milliers, espace insécable avant €. */
export const euros = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;
