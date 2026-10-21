// Les données de La Bonne Limite, cabinet de géomètre-expert imaginé dans la vidéo
// « Si je devais remplir le carnet de commandes d'un géomètre ». Tout ce que dit le
// site est de l'information sur l'activité, avec modération : c'est la seule
// publicité que permet la déontologie des géomètres-experts (décret n° 96-478,
// art. 53). Les textes cités ont été lus pour la vidéo : Videos/agenda-bureaux-etudes
// et Videos/regles-metiers/bureaux-etudes-01-bornage-obligatoire.md.

export const DOSSIER = "/exemples/la-bonne-limite";

export const cabinet = {
  nom: "La Bonne Limite",
  titre: "Cabinet de géomètre-expert",
  telephone: "01 99 00 27 54",
  telephoneLien: "+33199002754",
  adresse: ["12 rue de l'Exemple", "00000 Ville-Exemple"],
  inscription: "00000",
  siret: "000 000 000 00000",
  assurance: "Assureur d'exemple, contrat n° 00 000 000",
  horaires: "Du lundi au vendredi, 8 h 30 – 12 h 30 et 14 h – 18 h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/bornage`, libelle: "Le bornage, étape par étape" },
  { href: `${DOSSIER}/prix`, libelle: "Les prix" },
  { href: `${DOSSIER}#contact`, libelle: "Contact" },
];

export type Photo = { src: string; alt: string; largeur: number; hauteur: number };

export const photos = {
  prairie: { src: "/exemples/la-bonne-limite/prairie.webp", alt: "Une prairie en fleurs, dans la lumière du soir", largeur: 1600, hauteur: 1066 },
  parcelles: { src: "/exemples/la-bonne-limite/parcelles.webp", alt: "Des parcelles vues du ciel, séparées par une ligne d'arbres", largeur: 900, hauteur: 675 },
  cloture: { src: "/exemples/la-bonne-limite/cloture.webp", alt: "Une palissade en bois entre deux jardins, devant une maison en pierre", largeur: 1400, hauteur: 933 },
  champs: { src: "/exemples/la-bonne-limite/champs.webp", alt: "Des champs vus du ciel, découpés en parcelles le long d'une route", largeur: 1000, hauteur: 1333 },
} satisfies Record<string, Photo>;

/** Les situations de l'accueil : ce qui arrive aux gens, dit avec leurs mots. */
export const SITUATIONS = [
  {
    id: "vends",
    choix: "Je vends mon terrain",
    titre: "Vendre : le bornage n'est pas toujours obligatoire",
    texte: "Il ne l'est pas automatiquement. Mais si le terrain est un lot de lotissement, la vente doit mentionner le descriptif issu du bornage ; et si l'acheteur veut construire une maison, la vente dit si le terrain a été borné (Code de l'urbanisme, art. L. 115-4). Un bornage avant de vendre évite les questions après.",
    lien: { href: `${DOSSIER}/bornage`, libelle: "Comment se passe un bornage" },
  },
  {
    id: "voisin",
    choix: "Mon voisin conteste la limite",
    titre: "Bornage amiable : les 4 étapes",
    texte: "Tout propriétaire peut demander le bornage à son voisin, qui ne peut pas s'y opposer ; les frais sont partagés (Code civil, art. 646). On informe le voisin, on mesure, on pose les bornes, et le procès-verbal est signé par les deux, s'ils sont d'accord.",
    lien: { href: `${DOSSIER}/bornage`, libelle: "Les 4 étapes, en détail" },
  },
  {
    id: "divise",
    choix: "Je veux diviser",
    titre: "Diviser : un plan, puis le cadastre",
    texte: "Pour détacher un terrain à bâtir ou partager une propriété, on mesure, on dessine la division avec toi, puis on prépare les documents qui mettent le cadastre à jour. Le notaire s'appuie dessus pour la vente.",
    lien: { href: `${DOSSIER}/prix`, libelle: "Les prix, et ce qui est sur devis" },
  },
] as const;

/** Les quatre étapes d'un bornage amiable (Service-public.fr, fiche F3037). */
export const ETAPES = [
  { titre: "Le voisin convoqué", court: "On informe ton voisin, de préférence par lettre recommandée, et on fixe ensemble un rendez-vous sur place.", detail: "Le rendez-vous réunit les propriétaires concernés. Chacun peut venir avec ses titres de propriété, ses anciens plans, ses souvenirs de la haie d'avant." },
  { titre: "Le terrain mesuré", court: "Le géomètre-expert examine les titres de propriété, les plans et les traces sur le terrain, puis mesure.", detail: "Il compare les actes, le cadastre (un document fiscal, qui ne fixe pas à lui seul la limite), les murs, les clôtures et les anciennes bornes, et propose une limite." },
  { titre: "Les bornes posées", court: "Si la limite proposée convient à tous, les bornes sont posées à chaque angle.", detail: "Les bornes matérialisent la limite sur le terrain. On les repère aussi par des mesures, pour pouvoir les retrouver si l'une d'elles disparaît." },
  { titre: "Le procès-verbal signé", court: "Le procès-verbal de bornage décrit la limite. Chacun le signe, seulement s'il est d'accord.", detail: "Signé par tous, il fixe la limite pour l'avenir. Si un voisin refuse, le bornage peut être demandé au juge : on te dit alors comment ça se passe." },
];

/** La fourchette TTC selon le nombre de bornes : des exemples, comme dans la vidéo. */
export const FOURCHETTES: Record<number, [number, number]> = {
  2: [1100, 1500],
  3: [1300, 1800],
  4: [1500, 2100],
  5: [1700, 2400],
  6: [1900, 2700],
};

export const questions = [
  {
    question: "Le bornage est-il obligatoire pour vendre\u00A0?",
    reponse: "Pas automatiquement. Il le devient si un propriétaire le demande. Pour un lot de lotissement, la vente mentionne le descriptif issu du bornage ; pour un terrain où l'acheteur veut construire un logement, elle dit si le terrain a été borné (Code de l'urbanisme, art. L. 115-4).",
  },
  {
    question: "Mon voisin peut-il refuser\u00A0?",
    reponse: "Il ne peut pas refuser le bornage lui-même : tout propriétaire peut y obliger son voisin (Code civil, art. 646). Il peut en revanche ne pas signer le procès-verbal s'il n'est pas d'accord avec la limite proposée ; le bornage peut alors être demandé au juge.",
  },
  {
    question: "Qui paie le bornage\u00A0?",
    reponse: "Le bornage se fait à frais communs (Code civil, art. 646) : en général, les voisins partagent. Le devis le dit avant toute intervention.",
  },
  {
    question: "Peut-on faire un bornage sans géomètre-expert\u00A0?",
    reponse: "Un bornage amiable peut être écrit entre voisins, avec un plan. Mais dès qu'un professionnel fixe la limite, ce ne peut être qu'un géomètre-expert inscrit à l'Ordre (loi n° 46-942, art. 1er et 2).",
  },
  {
    question: "Combien de temps faut-il\u00A0?",
    reponse: "Compter quelques semaines entre la demande et le rendez-vous sur place, le temps de rechercher les titres et de convoquer les voisins. La pose des bornes elle-même prend une demi-journée. Délais d'exemple : on te donne les vrais au devis.",
  },
];
