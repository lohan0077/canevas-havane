// Les données de Nouvelles du Jour, entreprise d'aide à domicile imaginée dans la vidéo
// « Si je devais remplir le planning d'une entreprise d'aide à domicile ». Tout est
// inventé (prénoms, prix, numéros). Les règles tenues, lues pour la vidéo
// (Videos/agenda-services-personne/SOURCES.md) : prix HT et TTC (arrêté du 17 mars 2015,
// art. 4), avantage fiscal détaché du prix et plus petit (art. 5), phrase du devis
// gratuit (art. 6), et l'aide aux personnes âgées soumise à autorisation, dite.

export const DOSSIER = "/exemples/nouvelles-du-jour";

export const agence = {
  nom: "Nouvelles du Jour",
  telephone: "01 99 00 19 62",
  telephoneLien: "+33199001962",
  adresse: ["12 rue de l'Exemple", "00000 Ville-Exemple"],
  declaration: "SAP000000000",
  siret: "000 000 000 00000",
  horaires: "Du lundi au samedi, 8 h – 19 h",
};

export const NAVIGATION = [
  { href: DOSSIER, libelle: "Accueil" },
  { href: `${DOSSIER}/tarifs`, libelle: "Tarifs" },
  { href: `${DOSSIER}/devis`, libelle: "Devis" },
];

export type Photo = { src: string; alt: string; largeur: number; hauteur: number };

export const photos = {
  linge: { src: "/exemples/nouvelles-du-jour/linge.webp", alt: "Une pile de pulls pliés, dans la lumière du matin", largeur: 1400, hauteur: 933 },
  table: { src: "/exemples/nouvelles-du-jour/table.webp", alt: "Une table de cuisine rangée : une tasse, des noix, un bocal, des pommes", largeur: 1400, hauteur: 932 },
  salon: { src: "/exemples/nouvelles-du-jour/salon.webp", alt: "Un coin de salon près d'une fenêtre, un fauteuil et des plantes", largeur: 1000, hauteur: 1499 },
} satisfies Record<string, Photo>;

/** Le prix d'une heure, en exemple : 24 € HT, TVA à 10 % (taux à vérifier selon l'activité). */
export const HEURE_HT = 24;
export const TVA = 0.1;
export const euros = (n: number) => `${n.toFixed(2).replace(".", ",")} €`;

/** L'avantage fiscal, toujours à part et en plus petit (arrêté du 17 mars 2015, art. 5). */
export const AVANTAGE =
  "Avantage fiscal : crédit d'impôt de 50 % des sommes versées, dans la limite des plafonds annuels, sous conditions.";

/** La phrase obligatoire sur les offres à distance (arrêté du 17 mars 2015, art. 6), mot pour mot. */
export const PHRASE_DEVIS =
  "« Le vendeur remet gratuitement un devis personnalisé au consommateur à qui il propose une prestation ou un ensemble de prestations dont le prix total est supérieur ou égal à 100 € TTC ou au consommateur qui lui en fait la demande. »";

export const AUTORISATION =
  "Ménage et courses. L'aide aux gestes du quotidien d'une personne âgée exige une autorisation du département.";

export const SERVICES = [
  { titre: "Le ménage", texte: "Les sols, la cuisine, la salle de bains, les poussières. Comme chez toi, avec tes produits." },
  { titre: "Le linge", texte: "La machine, l'étendage, le repassage, et le linge plié rangé dans l'armoire." },
  { titre: "Les courses", texte: "La liste faite ensemble, les courses rapportées et rangées, le ticket gardé." },
];

export const etapes = [
  { titre: "Le devis", texte: "Trois questions sur le site, ou un appel. Le devis est gratuit, et écrit." },
  { titre: "La rencontre", texte: "On vient à la maison, on fait connaissance, on note ce qui compte." },
  { titre: "Le premier passage", texte: "Le jour et l'heure choisis. La même personne, si l'emploi du temps le permet." },
  { titre: "Le texto de 18 h", texte: "Après chaque passage, ce qui a été fait, et un mot — avec l'accord de la personne aidée." },
];

export const questions = [
  {
    question: "Que dit le message de 18 h\u00A0?",
    reponse: "Ce qui a été fait pendant le passage, et un mot de la personne aidée si elle le souhaite. Il ne part qu'avec son accord, et il ne contient aucune information de santé.",
  },
  {
    question: "Vous aidez aussi pour la toilette ou le lever\u00A0?",
    reponse: "Non. Nous faisons le ménage, le linge et les courses. L'aide aux gestes du quotidien d'une personne âgée exige une autorisation du département : nous t'indiquons les services qui l'ont.",
  },
  {
    question: "Le crédit d'impôt, c'est automatique\u00A0?",
    reponse: "Non, il est sous conditions : une entreprise déclarée, des dépenses dans la limite des plafonds annuels. Il peut aussi être déduit de chaque facture avec l'avance immédiate de l'Urssaf, un service gratuit et optionnel, si l'entreprise y est habilitée et sauf exceptions (aides APA ou PCH, par exemple).",
  },
  {
    question: "Le devis est-il payant\u00A0?",
    reponse: "Non. Le devis est gratuit, à la demande, et dès que la prestation atteint 100 € TTC.",
  },
  {
    question: "Et si l'intervenante est absente\u00A0?",
    reponse: "On te prévient, et une collègue la remplace, présentée à l'avance si possible.",
  },
];
