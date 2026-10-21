// Les données de Façade Allumée, enseigniste imaginaire de la vidéo « Si je devais
// remplir le carnet de commandes d'un enseigniste ». Tout est inventé : nom, adresse,
// prix (HT, la clientèle est professionnelle), boutiques dessinées. Aucun commerce
// réel n'est nommé : les façades portent un nom de métier, pas un nom d'enseigne.

export const DOSSIER = "/exemples/facade-allumee";

export const entreprise = {
  nom: "Façade Allumée",
  telephone: "01 99 00 41 27",
  telephoneLien: "+33199004127",
  adresse: ["Atelier · 12 rue de l'Exemple", "00000 Ville-Exemple"],
  siret: "000 000 000 00000",
  horaires: [
    { jours: "Lundi – vendredi", heures: "8 h – 18 h" },
    { jours: "Samedi", heures: "sur rendez-vous" },
  ],
  zone: "Dans un rayon de 40 km autour de l'atelier",
};

export const NAVIGATION = [
  { href: DOSSIER, libelle: "Accueil" },
  { href: `${DOSSIER}/enseignes`, libelle: "Nos enseignes" },
  { href: `${DOSSIER}/dossier`, libelle: "Le dossier en mairie" },
];

export type Photo = { src: string; alt: string; largeur: number; hauteur: number };

export const photos = {
  ampoules: { src: "/exemples/facade-allumee/ampoules.webp", alt: "Ampoules à filament allumées, suspendues dans la pénombre", largeur: 1000, hauteur: 1500 },
  atelier: { src: "/exemples/facade-allumee/atelier-lampe.webp", alt: "Établi d'atelier en métal, outils posés sous une lampe articulée", largeur: 1400, hauteur: 933 },
  soudure: { src: "/exemples/facade-allumee/soudure.webp", alt: "Deux mains soudent une petite carte électronique au fer à souder", largeur: 1200, hauteur: 800 },
} satisfies Record<string, Photo>;

/** Les quatre temps, de la photo à la pose. */
export const etapes = [
  { titre: "Tu envoies ta façade", texte: "Une photo, prise du trottoir d'en face, de jour. Toute la largeur de la boutique, le bandeau au-dessus de la vitrine." },
  { titre: "Tu reçois le montage", texte: "Ta façade avec ton enseigne posée dessus, avant et après, de jour et de nuit. Tu changes ce que tu veux, autant de fois que tu veux." },
  { titre: "On prépare le dossier", texte: "Quand l'enseigne doit être autorisée, on monte les pièces de la demande. Tu signes, tu déposes en mairie." },
  { titre: "On fabrique, on pose", texte: "À l'atelier, puis chez toi, par ceux qui l'ont fabriquée. Et on l'allume avec toi, le premier soir." },
];

/** Ce que l'atelier fabrique. Prix HT d'exemple : la clientèle est professionnelle. */
export const enseignes = [
  { id: "boitier", nom: "Lettres boîtier rétroéclairées", texte: "Chaque lettre est une boîte en aluminium ; la lumière part vers le mur et dessine un halo autour d'elle.", prix: "à partir de 2 400 € HT", lumineuse: true },
  { id: "caisson", nom: "Caisson lumineux", texte: "Un panneau éclairé de l'intérieur, sur toute la longueur du bandeau. Lisible de loin, simple à changer.", prix: "à partir de 1 300 € HT", lumineuse: true },
  { id: "drapeau", nom: "Enseigne drapeau", texte: "Perpendiculaire à la façade : on la voit en remontant la rue, avant même d'être devant la vitrine.", prix: "à partir de 690 € HT", lumineuse: true },
  { id: "decoupees", nom: "Lettres découpées", texte: "Bois, laiton ou aluminium, fixées à distance du mur. Éclairées par deux projecteurs, ou pas du tout.", prix: "à partir de 890 € HT", lumineuse: false },
  { id: "vitrophanie", nom: "Vitrophanie", texte: "Les horaires, le métier, un dessin : des adhésifs découpés, posés sur la vitrine, sans percer.", prix: "à partir de 180 € HT", lumineuse: false },
];

export const questions = [
  {
    question: "Faut-il une autorisation pour poser une enseigne\u00A0?",
    reponse: "Pas partout. L'installation d'une enseigne est soumise à autorisation sur certains immeubles et dans certains lieux (abords d'un monument historique, site patrimonial remarquable, site classé ou inscrit…), ainsi que dans les communes couvertes par un règlement local de publicité (Code de l'environnement, art. L. 581-18). On vérifie pour ton adresse avant de dessiner quoi que ce soit.",
  },
  {
    question: "Qui fait la demande\u00A0?",
    reponse: "Toi : la demande est présentée par la personne ou l'entreprise qui exerce l'activité signalée (art. R. 581-9). Nous, on prépare les pièces. Tu signes, puis tu l'adresses à la mairie en trois exemplaires : par lettre recommandée, par voie électronique, ou au guichet.",
  },
  {
    question: "Combien de temps la mairie a-t-elle pour répondre\u00A0?",
    reponse: "Deux mois à compter d'un dossier complet. Sans décision notifiée dans ce délai, l'autorisation est réputée accordée dans les termes demandés (art. R. 581-13). C'est pour ça qu'on cale la fabrication sur le dépôt, pas l'inverse.",
  },
  {
    question: "Mon enseigne peut-elle clignoter\u00A0?",
    reponse: "Non. Les enseignes clignotantes sont interdites, sauf pour les pharmacies et les services d'urgence (art. R. 581-59). Nos enseignes s'allument, doucement, et restent allumées. Elles s'éteignent aussi la nuit : entre 1 h et 6 h quand l'activité a cessé, sauf règle locale.",
  },
  {
    question: "Le montage est-il gratuit\u00A0?",
    reponse: "Oui, le montage de ta façade est offert, que tu commandes ou non. Il te sert à choisir, et il sert au dossier si l'enseigne doit être autorisée.",
  },
  {
    question: "Pourquoi les prix sont-ils hors taxes\u00A0?",
    reponse: "Parce qu'on travaille pour des commerces et des entreprises, qui raisonnent hors taxes. Les prix du site sont des exemples : le devis tient compte de la taille, de la lumière et de la pose.",
  },
];
