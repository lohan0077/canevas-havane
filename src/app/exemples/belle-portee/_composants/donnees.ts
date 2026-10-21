// Les données de Belle Portée, bureau d'études structure imaginé dans la vidéo « Si je
// devais créer un bureau d'études de zéro ». Tout est inventé : adresse, prix (TTC
// d'exemple, pour des particuliers), créneaux. La règle tenue : le site ne dit jamais
// oui à distance — il dit quoi vérifier et propose une visite.

export const DOSSIER = "/exemples/belle-portee";

export const bureau = {
  nom: "Belle Portée",
  titre: "Bureau d'études structure",
  telephone: "01 99 00 85 31",
  telephoneLien: "+33199008531",
  adresse: ["12 rue de l'Exemple", "00000 Ville-Exemple"],
  siret: "000 000 000 00000",
  assurance: "Assureur d'exemple, contrat n° 00 000 000",
  horaires: "Du lundi au vendredi, 8 h – 18 h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/mon-mur`, libelle: "Mon mur en photo" },
  { href: `${DOSSIER}/visite`, libelle: "La visite" },
  { href: `${DOSSIER}#contact`, libelle: "Contact" },
];

export type Photo = { src: string; alt: string; largeur: number; hauteur: number };

export const photos = {
  cuisine: { src: "/exemples/belle-portee/cuisine-poutre.webp", alt: "Une cuisine en travaux : le mur ouvert, la poutre posée, les étais encore en place", largeur: 1400, hauteur: 933 },
  etais: { src: "/exemples/belle-portee/etais.webp", alt: "Une pièce en chantier, le plafond soutenu par des étais métalliques", largeur: 1400, hauteur: 933 },
  charpente: { src: "/exemples/belle-portee/charpente.webp", alt: "Des poutres métalliques sous un plafond en bois", largeur: 1100, hauteur: 947 },
  poutre: { src: "/exemples/belle-portee/poutre.webp", alt: "Une poutre acier boulonnée, posée sur des étais pendant les travaux", largeur: 1400, hauteur: 1050 },
} satisfies Record<string, Photo>;

/** Ce qu'il y a au-dessus du mur : la deuxième question de l'outil. */
export const DESSUS = [
  { id: "toit", libelle: "Le toit", note: "On regarde la charpente : ce qu'elle pose sur ce mur." },
  { id: "etage", libelle: "Un étage, chambre", note: "On regarde le plancher de la chambre, et ce qu'il porte." },
  { id: "deux", libelle: "Deux étages ou plus", note: "On suit les charges jusqu'en haut : chaque plancher compte." },
  { id: "inconnu", libelle: "Je ne sais pas", note: "C'est fréquent. On le saura à la visite, en ouvrant un peu le plafond." },
] as const;

/** Ce que la visite vérifie : les trois lignes de la vidéo. */
export const VERIFICATIONS = [
  { titre: "Ce que porte ce mur", texte: "Les planchers, les cloisons, la charpente : on suit les charges, du toit jusqu'au mur." },
  { titre: "Les planchers au-dessus", texte: "Leur sens, leur matière, leur état : ils décident de la poutre autant que la largeur." },
  { titre: "La poutre qu'il faudra", texte: "Acier ou bois, sa section, ses appuis : c'est ce que la note de calcul fixera." },
];

/** Les créneaux de visite de la semaine d'exemple. */
export const CRENEAUX = [
  { libelle: "Lundi", sous: "9 h" },
  { libelle: "Mardi", sous: "14 h" },
  { libelle: "Mercredi", sous: "10 h", pris: true },
  { libelle: "Jeudi", sous: "16 h" },
  { libelle: "Vendredi", sous: "9 h", pris: true },
  { libelle: "Samedi", sous: "10 h" },
];

/** Ce qu'on livre. Prix TTC d'exemple, pour un particulier. */
export const LIVRABLES = [
  { titre: "La visite", texte: "Sur place, une heure : on regarde, on mesure, on te dit ce qu'on a vu. Aucun oui avant.", prix: "180 € TTC" },
  { titre: "La note de calcul", texte: "La poutre, ses appuis, les étais du chantier : ce que l'entreprise de maçonnerie suivra.", prix: "à partir de 690 € TTC" },
  { titre: "Le passage pendant les travaux", texte: "Le jour où la poutre est posée, on vient vérifier que tout est comme prévu.", prix: "150 € TTC" },
];

export const questions = [
  { question: "Je peux ouvrir un mur porteur sans bureau d'études\u00A0?", reponse: "On comprend la question : beaucoup la tapent. Un mur porteur porte ce qu'on ne voit pas — planchers, cloisons, toiture. Sans calcul, la poutre est devinée. Notre avis : faites-le calculer, par nous ou par un autre." },
  { question: "Pourquoi vous ne répondez pas oui en ligne\u00A0?", reponse: "Parce qu'une photo ne montre ni le sens des planchers, ni l'état des appuis. On te dit quoi vérifier, on vient voir, et seulement après, on calcule." },
  { question: "J'habite en copropriété : ça change quoi\u00A0?", reponse: "Un mur porteur concerne souvent tout l'immeuble. Parles-en d'abord à ton syndic : on te dira à la visite ce qu'il faudra lui présenter." },
  { question: "Qui fait les travaux\u00A0?", reponse: "Une entreprise de maçonnerie, que tu choisis. Nous, on calcule, on dessine et on vient vérifier la pose." },
  { question: "Combien de temps entre la visite et la note de calcul\u00A0?", reponse: "Comptez une à deux semaines selon le mur. Délais d'exemple : le bureau est fictif." },
];
