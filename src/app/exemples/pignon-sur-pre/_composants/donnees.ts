// Tout ce qu'affiche le site de Pignon sur Pré, loueur de tentes de réception
// imaginaire. Entreprise fictive : chaque prix, chaque date est un exemple, et le
// site le dit.
//
// Les règles tenues ici (voir Videos/marque-loueurs/SOURCES.md) :
//   - la capacité d'une tente est celle du fabricant, jamais un calcul du site ;
//   - la vue du ciel est dessinée et le dit : un vrai site afficherait la photo
//     aérienne de l'IGN (Licence ouverte, à confirmer) ; l'adresse tapée ne quitte pas
//     le navigateur ;
//   - une tente qui reçoit du public (le bal, une fête de village) ne se monte pas sans
//     l'autorisation de la mairie : le site le dit ;
//   - prix TTC pour des particuliers, marqués « exemple » ; aucun avis, aucune note,
//     aucune « dernière tente disponible ».

export const DOSSIER = "/exemples/pignon-sur-pre";

export const entreprise = {
  nom: "Pignon sur Pré",
  telephone: "06 39 98 54 12",
  telephoneLien: "+33639985412",
  siret: "000 000 000 00000",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#pre`, libelle: "Mon pré" },
  { href: `${DOSSIER}/tentes`, libelle: "Les tentes" },
  { href: `${DOSSIER}/le-bal`, libelle: "Le bal" },
  { href: `${DOSSIER}/reserver`, libelle: "Réserver" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };

export const photos = {
  pre: { src: `${DOSSIER}/pre.webp`, largeur: 1600, hauteur: 1199, alt: "Un pré en fleurs au coucher du soleil, un arbre seul à l'horizon" },
  tenteJardin: { src: `${DOSSIER}/tente-jardin.webp`, largeur: 1100, hauteur: 1649, alt: "Une tente de réception vitrée aperçue entre les arbres en fleurs d'un jardin" },
  village: { src: `${DOSSIER}/village.webp`, largeur: 1300, hauteur: 867, alt: "Un village aux toits gris vu d'une colline, une tente blanche montée près des vieux murs" },
  tenteNuit: { src: `${DOSSIER}/tente-nuit.webp`, largeur: 1200, hauteur: 800, alt: "Une grande tente éclairée de guirlandes, la nuit, sous un ciel étoilé" },
} satisfies Record<string, Photo>;

/** « 2 400 € » : espace fine insécable pour les milliers, insécable avant €. */
export const euros = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;

export type Tente = {
  id: string;
  largeur: number;   // m
  longueur: number;  // m
  invites: number;   // assis : capacité du fabricant
  tables: number;    // tables rondes de 10, dessinées
  prix: number;      // le week-end, TTC, montage et démontage compris (exemple)
  surnom: string;
  pour: string;
};

export const TENTES: Tente[] = [
  { id: "6x12", largeur: 6, longueur: 12, invites: 60, tables: 6, prix: 1450, surnom: "La petite", pour: "Un anniversaire, des fiançailles, une fête de famille." },
  { id: "10x15", largeur: 10, longueur: 15, invites: 120, tables: 12, prix: 2400, surnom: "Celle des mariages", pour: "Le mariage dans le pré où tout a commencé." },
  { id: "12x25", largeur: 12, longueur: 25, invites: 240, tables: 24, prix: 3900, surnom: "La grande", pour: "Une fête de village, un comité des fêtes, une grande famille." },
];

export const tente = (id: string) => TENTES.find((t) => t.id === id) ?? TENTES[1];

/** Ce qu'on pose avec la tente. Prix TTC d'exemple, pour le week-end. */
export const OPTIONS = [
  { nom: "Plancher", detail: "Rattrape une pente légère, garde les pieds au sec.", prix: "8 € le m²" },
  { nom: "Tables rondes et chaises", detail: "Tables de 10, chaises pliantes en bois.", prix: "6 € par invité" },
  { nom: "Guirlandes", detail: "Ampoules chaudes, le long du faîtage et des côtés.", prix: "180 €" },
  { nom: "Parquet de bal", detail: "Une piste de 6 × 6 m, au centre ou au fond.", prix: "420 €" },
];

/** Les samedis de juin et juillet 2027 (vérifiés : ce sont des samedis). « pris » : exemple. */
export const SAMEDIS = [
  { id: "5-juin", court: "5 juin", long: "samedi 5 juin 2027", pris: true },
  { id: "12-juin", court: "12 juin", long: "samedi 12 juin 2027", pris: false },
  { id: "19-juin", court: "19 juin", long: "samedi 19 juin 2027", pris: false },
  { id: "26-juin", court: "26 juin", long: "samedi 26 juin 2027", pris: true },
  { id: "3-juillet", court: "3 juil.", long: "samedi 3 juillet 2027", pris: false },
  { id: "10-juillet", court: "10 juil.", long: "samedi 10 juillet 2027", pris: false },
];

export const WEEKEND = [
  { quand: "Trois semaines avant", titre: "On vient voir le pré", texte: "Gratuitement. On mesure, on regarde la pente, l'accès du camion, où passe le soleil du soir." },
  { quand: "Vendredi", titre: "On monte la veille", texte: "La tente, le plancher, les tables. Le soir, tu peux déjà dîner dessous." },
  { quand: "Samedi", titre: "La fête est chez toi", texte: "Le pré où tu as grandi, avec un toit. On reste joignable tout le week-end." },
  { quand: "Lundi", titre: "On démonte", texte: "On repart avec tout, piquets compris. Il ne reste que les photos." },
];

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  { q: "Combien d'invités dans chaque tente ?", r: "La capacité affichée est celle du fabricant de chaque modèle, en invités assis à des tables rondes de dix. Une piste de danse, un buffet ou une allée prennent de la place : on en parle à la visite du pré, plan à la main." },
  { q: "Il faut une autorisation ?", r: "Pour une fête ouverte au public (un bal, une fête de village, un marché), oui : une tente qui reçoit du public ne se monte pas sans l'autorisation de la mairie. On prépare le dossier avec toi. Pour une fête privée chez toi, renseigne-toi auprès de ta mairie : on te dit quoi lui demander." },
  { q: "Et s'il y a du vent ?", r: "La notice du fabricant fixe la vitesse de vent au-delà de laquelle on fait sortir tout le monde. On te la donne avec le contrat, on suit la météo avec toi, et on reste joignable tout le week-end." },
  { q: "Mon pré est en pente.", r: "Une pente légère se rattrape avec le plancher. Au-delà, on cherche ensemble un autre coin du terrain : c'est à ça que sert la visite." },
  { q: "Et l'électricité ?", r: "Une prise de ta maison suffit pour les guirlandes. Pour une sono ou un traiteur qui chauffe sur place, on prévoit un groupe électrogène silencieux (exemple)." },
  { q: "Et les voisins ?", r: "Préviens-les. Après la réservation, le site te donne un mot tout prêt à glisser dans leur boîte aux lettres, avec la date et l'heure de fin." },
];
