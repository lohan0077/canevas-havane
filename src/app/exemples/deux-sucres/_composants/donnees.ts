// Les données de Deux Sucres, l'entreprise d'aide à domicile imaginée dans la vidéo
// « Si je devais créer une entreprise d'aide à domicile de zéro ». Tout est inventé :
// prénoms, goûts, prix. Une marque créée « de zéro » n'a pas d'ancienneté : aucune
// n'est affichée, ni pour l'entreprise ni pour les intervenantes. Les règles tenues
// (arrêté du 17 mars 2015, art. 4, 5 et 6 ; autorisation pour l'aide aux personnes
// âgées) sont lues dans Videos/marque-services-personne/SOURCES.md.

export const DOSSIER = "/exemples/deux-sucres";

export const agence = {
  nom: "Deux Sucres",
  telephone: "01 99 00 72 46",
  telephoneLien: "+33199007246",
  adresse: ["Agence · 12 rue de l'Exemple", "00000 Ville-Exemple"],
  declaration: "SAP000000000",
  siret: "000 000 000 00000",
  horaires: "Du lundi au vendredi, 9 h – 18 h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/celle-qui-viendra`, libelle: "Celle qui viendra" },
  { href: `${DOSSIER}/tarif`, libelle: "Le tarif" },
  { href: `${DOSSIER}#cafe`, libelle: "Le café du mardi" },
];

export type Photo = { src: string; alt: string; largeur: number; hauteur: number };

export const photos = {
  cafe: { src: "/exemples/deux-sucres/cafe.webp", alt: "Une tasse de café sur une table en bois, un bol de sucres à côté", largeur: 1000, hauteur: 1436 },
  mains: { src: "/exemples/deux-sucres/mains.webp", alt: "Deux mains âgées posées sur une nappe, en noir et blanc", largeur: 1400, hauteur: 933 },
  fauteuil: { src: "/exemples/deux-sucres/fauteuil.webp", alt: "Un fauteuil près d'une fenêtre, dans le soleil de fin de journée", largeur: 1400, hauteur: 933 },
} satisfies Record<string, Photo>;

/** Les intervenantes d'exemple : un prénom, des jours, ce qu'elles aiment. */
export const INTERVENANTES = [
  {
    id: "nadia",
    prenom: "Nadia",
    jours: "le mardi et le jeudi",
    teinte: "#D98E73",
    aime: ["☕ Les cafés longs", "🧩 Les mots croisés", "🌷 Le jardinage"],
    phrase: "Elle range la cuisine comme si c'était la sienne, et elle demande avant de déplacer quoi que ce soit.",
    releve: "Sophie",
  },
  {
    id: "sophie",
    prenom: "Sophie",
    jours: "le lundi et le vendredi",
    teinte: "#8BA888",
    aime: ["📻 La radio du matin", "🍰 Les gâteaux du dimanche", "🐈 Les chats du quartier"],
    phrase: "Elle connaît toutes les boulangeries du quartier, et le jour de la meilleure tarte.",
    releve: "Nadia",
  },
];

export const HEURE_HT = 24;
export const TVA = 0.1;
export const euros = (n: number) => `${n.toFixed(2).replace(".", ",")} €`;

export const AVANTAGE =
  "Avantage fiscal : crédit d'impôt de 50 % des sommes versées, dans la limite des plafonds annuels, sous conditions.";
export const PHRASE_DEVIS =
  "« Le vendeur remet gratuitement un devis personnalisé au consommateur à qui il propose une prestation ou un ensemble de prestations dont le prix total est supérieur ou égal à 100 € TTC ou au consommateur qui lui en fait la demande. »";
export const AUTORISATION = "L'aide aux gestes du quotidien d'une personne âgée exige une autorisation du département.";

export const questions = [
  { question: "Ce sera vraiment toujours la même personne\u00A0?", reponse: "C'est notre façon d'organiser : une intervenante par maison, les mêmes jours. Quand elle est absente, une collègue que vous avez déjà rencontrée la remplace, et on vous prévient." },
  { question: "Vous aidez pour la toilette ou le lever\u00A0?", reponse: "Non : le ménage et les courses. L'aide aux gestes du quotidien d'une personne âgée exige une autorisation du département ; nous vous indiquons les services qui l'ont." },
  { question: "Pourquoi publier ce qu'aiment les intervenantes\u00A0?", reponse: "Parce qu'on ouvre sa porte plus facilement à quelqu'un qu'on connaît un peu. Elles choisissent ce qu'elles partagent, et leur photo n'est publiée qu'avec leur accord écrit." },
  { question: "Le crédit d'impôt est-il automatique\u00A0?", reponse: "Non, il est sous conditions : une entreprise déclarée, et des dépenses dans la limite des plafonds annuels. On vous explique ce qui s'applique chez vous." },
  { question: "Le café du premier mardi, c'est pour qui\u00A0?", reponse: "Pour les familles des personnes que nous aidons, et pour celles qui hésitent. On vient comme on est, une heure, pour parler." },
];
