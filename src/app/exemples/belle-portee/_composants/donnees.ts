// Les données de Belle Portée, cabinet imaginaire qui réunit un bureau d'études structure
// et un géomètre-expert : le site des deux vidéos du métier « bureaux-etudes ».
//   - « Créer une marque » : le nom (la portée, c'est la longueur qu'une poutre
//     franchit), le mur qui disparaît, ton mur en photo, jamais de oui à distance, la
//     visite, l'affiche au rayon des masses, le mur de la semaine ;
//   - « Remplir l'agenda » (géomètres) : une seule question, « qu'est-ce qui
//     t'arrive ? », le prix au nombre de bornes, la page « comment se passe un bornage ».
// Tout est inventé : adresse, prix (TTC d'exemple, pour des particuliers), créneaux,
// numéros. La règle la plus stricte des deux métiers vaut pour tout le site : celle des
// géomètres-experts (décret n° 96-478, art. 53) — une publicité qui informe sur
// l'activité, avec modération, communiquée au conseil régional de l'Ordre. Aucun avis,
// aucune note, aucun chiffre de clientèle, aucune comparaison avec des confrères.

export const DOSSIER = "/exemples/belle-portee";

export const bureau = {
  nom: "Belle Portée",
  titre: "Bureau d'études structure et géomètre-expert",
  telephone: "01 99 00 85 31",
  telephoneLien: "+33199008531",
  adresse: ["12 rue de l'Exemple", "00000 Ville-Exemple"],
  inscription: "00000",
  siret: "000 000 000 00000",
  assurance: "Assureur d'exemple, contrat n° 00 000 000",
  horaires: "Du lundi au vendredi, 8 h 30 – 18 h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/mon-mur`, libelle: "Mon mur en photo" },
  { href: `${DOSSIER}/bornage`, libelle: "Le bornage" },
  { href: `${DOSSIER}/prix`, libelle: "Les prix" },
  { href: `${DOSSIER}/visite`, libelle: "La visite" },
];

export type Photo = { src: string; alt: string; largeur: number; hauteur: number };

/* Unsplash (licence Unsplash), servies depuis notre domaine ; crédits dans les mentions.
   Ni visage, ni marque lisible, ni plaque. */
const P = DOSSIER;
export const photos = {
  cuisine: { src: `${P}/cuisine-poutre.webp`, alt: "Une cuisine en travaux : le mur ouvert, la poutre posée, les étais encore en place", largeur: 1400, hauteur: 933 },
  etais: { src: `${P}/etais.webp`, alt: "Une pièce en chantier, le plafond soutenu par des étais métalliques", largeur: 1400, hauteur: 933 },
  charpente: { src: `${P}/charpente.webp`, alt: "Des poutres métalliques sous un plafond en bois", largeur: 1100, hauteur: 947 },
  poutre: { src: `${P}/poutre.webp`, alt: "Une poutre acier boulonnée, posée sur des étais pendant les travaux", largeur: 1400, hauteur: 1050 },
  prairie: { src: `${P}/prairie.webp`, alt: "Une prairie en fleurs, dans la lumière du soir", largeur: 1600, hauteur: 1066 },
  parcelles: { src: `${P}/parcelles.webp`, alt: "Des parcelles vues du ciel, séparées par une ligne d'arbres", largeur: 900, hauteur: 675 },
  cloture: { src: `${P}/cloture.webp`, alt: "Une palissade en bois entre deux jardins, devant une maison en pierre", largeur: 1400, hauteur: 933 },
  champs: { src: `${P}/champs.webp`, alt: "Des champs vus du ciel, découpés en parcelles le long d'une route", largeur: 1000, hauteur: 1333 },
} satisfies Record<string, Photo>;

/* ---------- L'accueil : une seule question, « qu'est-ce qui t'arrive ? » ---------- */
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
    id: "mur",
    choix: "Je veux ouvrir un mur",
    titre: "Un mur porteur : pas de oui à distance",
    texte: "Un mur porteur porte ce qu'on ne voit pas : planchers, cloisons, charpente. Prends-le en photo, dis ce qu'il y a au-dessus et la largeur voulue : on te dit ce que la visite vérifiera, puis on calcule la poutre qui le remplace.",
    lien: { href: `${DOSSIER}/mon-mur`, libelle: "Mon mur en photo" },
  },
  {
    id: "divise",
    choix: "Je veux diviser",
    titre: "Diviser : un plan, puis le cadastre",
    texte: "Pour détacher un terrain à bâtir ou partager une propriété, on mesure, on dessine la division avec toi, puis on prépare les documents qui mettent le cadastre à jour. Le notaire s'appuie dessus pour la vente.",
    lien: { href: `${DOSSIER}/prix`, libelle: "Les prix, et ce qui est sur devis" },
  },
] as const;

/* ---------- Le mur : ce qu'il y a au-dessus, ce que la visite vérifie ---------- */
export const DESSUS = [
  { id: "toit", libelle: "Le toit", note: "On regarde la charpente : ce qu'elle pose sur ce mur." },
  { id: "etage", libelle: "Un étage, chambre", note: "On regarde le plancher de la chambre, et ce qu'il porte." },
  { id: "deux", libelle: "Deux étages ou plus", note: "On suit les charges jusqu'en haut : chaque plancher compte." },
  { id: "inconnu", libelle: "Je ne sais pas", note: "C'est fréquent. On le saura à la visite, en ouvrant un peu le plafond." },
] as const;

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

/* ---------- Le bornage, étape par étape (Service-public.fr, fiche F3037) ---------- */
export const ETAPES = [
  { titre: "Le voisin convoqué", court: "On informe ton voisin, de préférence par lettre recommandée, et on fixe ensemble un rendez-vous sur place.", detail: "Le rendez-vous réunit les propriétaires concernés. Chacun peut venir avec ses titres de propriété, ses anciens plans, ses souvenirs de la haie d'avant." },
  { titre: "Le terrain mesuré", court: "Le géomètre-expert examine les titres de propriété, les plans et les traces sur le terrain, puis mesure.", detail: "Il compare les actes, le cadastre (un document fiscal, qui ne fixe pas à lui seul la limite), les murs, les clôtures et les anciennes bornes, et propose une limite." },
  { titre: "Les bornes posées", court: "Si la limite proposée convient à tous, les bornes sont posées à chaque angle.", detail: "Les bornes matérialisent la limite sur le terrain. On les repère aussi par des mesures, pour pouvoir les retrouver si l'une d'elles disparaît." },
  { titre: "Le procès-verbal signé", court: "Le procès-verbal de bornage décrit la limite. Chacun le signe, seulement s'il est d'accord.", detail: "Signé par tous, il fixe la limite pour l'avenir. Si un voisin refuse, le bornage peut être demandé au juge : on te dit alors comment ça se passe." },
];

/* ---------- Les prix (TTC d'exemple, pour un particulier) ---------- */
/** La fourchette selon le nombre de bornes : celle de la vidéo « Remplir l'agenda ». */
export const FOURCHETTES: Record<number, [number, number]> = {
  2: [1100, 1500],
  3: [1300, 1800],
  4: [1500, 2100],
  5: [1700, 2400],
  6: [1900, 2700],
};

export const LIVRABLES = [
  { titre: "La visite du mur", texte: "Sur place, une heure : on regarde, on mesure, on te dit ce qu'on a vu. Aucun oui avant.", prix: "180 € TTC" },
  { titre: "La note de calcul", texte: "La poutre, ses appuis, les étais du chantier : ce que l'entreprise de maçonnerie suivra.", prix: "à partir de 690 € TTC" },
  { titre: "Le passage pendant les travaux", texte: "Le jour où la poutre est posée, on vient vérifier que tout est comme prévu.", prix: "150 € TTC" },
];

export const MISSIONS = [
  { titre: "Bornage", texte: "Fixer la limite entre deux terrains, poser les bornes, signer le procès-verbal.", metier: "Géomètre-expert" },
  { titre: "Division", texte: "Détacher un terrain à bâtir, partager une propriété, mettre le cadastre à jour.", metier: "Géomètre-expert" },
  { titre: "Plan du terrain", texte: "Mesurer les niveaux, les arbres, les murs : le plan dont l'architecte a besoin.", metier: "Géomètre-expert" },
  { titre: "Ouvrir un mur porteur", texte: "Voir le mur, calculer la poutre qui le remplace, vérifier la pose.", metier: "Bureau d'études" },
  { titre: "Une trémie, un escalier", texte: "Ouvrir un plancher pour un escalier : on calcule ce qui le tient autour.", metier: "Bureau d'études" },
  { titre: "Implantation", texte: "Placer la future maison sur le terrain, à la bonne distance des limites.", metier: "Géomètre-expert" },
];

/* ---------- Les questions ---------- */
export const QUESTIONS = [
  { question: "Je peux ouvrir un mur porteur sans bureau d'études ?", reponse: "On comprend la question : beaucoup la tapent. Un mur porteur porte ce qu'on ne voit pas — planchers, cloisons, toiture. Sans calcul, la poutre est devinée. Notre avis : faites-le calculer, par nous ou par un autre." },
  { question: "Pourquoi vous ne répondez pas oui en ligne ?", reponse: "Parce qu'une photo ne montre ni le sens des planchers, ni l'état des appuis. On te dit quoi vérifier, on vient voir, et seulement après, on calcule." },
  { question: "Le bornage est-il obligatoire pour vendre ?", reponse: "Pas automatiquement. Il le devient si un propriétaire le demande. Pour un lot de lotissement, la vente mentionne le descriptif issu du bornage ; pour un terrain où l'acheteur veut construire un logement, elle dit si le terrain a été borné (Code de l'urbanisme, art. L. 115-4)." },
  { question: "Mon voisin peut-il refuser le bornage ?", reponse: "Il ne peut pas refuser le bornage lui-même : tout propriétaire peut y obliger son voisin (Code civil, art. 646). Il peut en revanche ne pas signer le procès-verbal s'il n'est pas d'accord avec la limite proposée ; le bornage peut alors être demandé au juge." },
  { question: "Qui paie le bornage ?", reponse: "Le bornage se fait à frais communs (Code civil, art. 646) : en général, les voisins partagent. Le devis le dit avant toute intervention." },
  { question: "Peut-on faire un bornage sans géomètre-expert ?", reponse: "Un bornage amiable peut être écrit entre voisins, avec un plan. Mais dès qu'un professionnel fixe la limite, ce ne peut être qu'un géomètre-expert inscrit à l'Ordre (loi n° 46-942, art. 1er et 2)." },
  { question: "J'habite en copropriété : ça change quoi pour mon mur ?", reponse: "Un mur porteur concerne souvent tout l'immeuble. Parles-en d'abord à ton syndic : on te dira à la visite ce qu'il faudra lui présenter." },
  { question: "Qui fait les travaux ?", reponse: "Une entreprise de maçonnerie, que tu choisis. Nous, on calcule, on dessine et on vient vérifier la pose." },
];
