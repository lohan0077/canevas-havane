// Tout ce que le site de Sortie de Four affiche, au même endroit. L'atelier est
// fictif : chaque prix, chaque date, chaque numéro de pièce est un exemple, et le
// site le dit.
//
// Règles tenues ici (Videos/agenda-artisans-art/SOURCES.md) :
//   - une « pièce unique » l'est vraiment : chaque numéro n'existe qu'une fois, et
//     « Partie » veut dire vendue — jamais un faux « bientôt épuisé » (C. conso.,
//     L121-4, 7°) ;
//   - la vidéo d'une pièce est celle de son tournage, pas une vidéo d'illustration
//     (ici, une animation : la marque est fictive) ;
//   - ni « artisan d'art » ni « maître artisan » : titres réservés, que rien n'établit ;
//   - téléphone dans la tranche ARCEP réservée à la fiction, aucune adresse e-mail.

export const DOSSIER = "/exemples/sortie-de-four";

export const atelier = {
  nom: "Sortie de Four",
  adresse: "12 rue de l'Exemple, 00000 Ta Ville",
  telephone: "01 99 00 41 12",
  telephoneLien: "+33199004112",
  horaires: "Atelier ouvert le samedi, de 10 h à 13 h",
  siret: "000 000 000 00000",
};

/** Les ouvertures du four : le troisième jeudi du mois, à 19 h, en direct. */
export const ouvertures = {
  derniere: { date: "jeudi 15 octobre 2026", court: "15 oct." },
  prochaine: { date: "jeudi 19 novembre 2026", heure: "19 h", court: "19 nov.", iso: "2026-11-19T19:00:00+01:00" },
  suivante: { date: "jeudi 17 décembre 2026", court: "17 déc." },
};

export type Forme = "bol" | "vase" | "tasse" | "assiette";

export type Piece = {
  slug: string;
  numero: string;
  forme: Forme;
  nom: string;
  email: string;      // la couleur de l'émail, pour le dessin
  emailNom: string;
  terre: string;
  dimensions: string;
  tourneLe: string;
  prix: number;       // TTC, exemple
  partie: boolean;    // vendue : elle ne reviendra pas
  note: string;
};

export const pieces: Piece[] = [
  {
    slug: "bol-112", numero: "112", forme: "bol", nom: "Bol n° 112", email: "#2F4A44", emailNom: "Émail vert sapin, coulé sur le bord",
    terre: "Grès moucheté", dimensions: "Ø 14 cm · hauteur 7 cm · 45 cl", tourneLe: "3 octobre 2026", prix: 48, partie: false,
    note: "Le pied a gardé la trace du fil : c'est lui qui l'a détaché du tour.",
  },
  {
    slug: "vase-37", numero: "37", forme: "vase", nom: "Vase n° 37", email: "#B65A3A", emailNom: "Émail rouille, mat",
    terre: "Grès rouge", dimensions: "Hauteur 24 cm · Ø 11 cm", tourneLe: "26 septembre 2026", prix: 95, partie: true,
    note: "Tourné en deux fois, le col ajouté le lendemain.",
  },
  {
    slug: "tasse-58", numero: "58", forme: "tasse", nom: "Tasse n° 58", email: "#E8E0CF", emailNom: "Émail coquille d'œuf",
    terre: "Grès blanc", dimensions: "Ø 8 cm · hauteur 9 cm · 25 cl", tourneLe: "1er octobre 2026", prix: 32, partie: false,
    note: "L'anse est tirée à la main, pas moulée.",
  },
  {
    slug: "assiette-9", numero: "9", forme: "assiette", nom: "Assiette n° 9", email: "#5C7A4E", emailNom: "Émail céladon, vert mousse",
    terre: "Grès moucheté", dimensions: "Ø 26 cm", tourneLe: "29 septembre 2026", prix: 38, partie: true,
    note: "Une bulle d'émail a éclaté au four, sur le marli : c'est sa signature.",
  },
  {
    slug: "bol-113", numero: "113", forme: "bol", nom: "Bol n° 113", email: "#C9A04A", emailNom: "Émail miel, brillant",
    terre: "Grès moucheté", dimensions: "Ø 13 cm · hauteur 7 cm · 40 cl", tourneLe: "3 octobre 2026", prix: 48, partie: false,
    note: "Tourné juste après le 112, dans la même motte de terre.",
  },
  {
    slug: "vase-38", numero: "38", forme: "vase", nom: "Vase n° 38", email: "#2F3E5C", emailNom: "Émail nuit, satiné",
    terre: "Grès noir", dimensions: "Hauteur 21 cm · Ø 12 cm", tourneLe: "28 septembre 2026", prix: 95, partie: false,
    note: "La lèvre est légèrement ovale : elle a bougé au séchage, on l'a laissée faire.",
  },
  {
    slug: "tasse-59", numero: "59", forme: "tasse", nom: "Tasse n° 59", email: "#8C5A3C", emailNom: "Émail tenmoku, brun profond",
    terre: "Grès blanc", dimensions: "Ø 8 cm · hauteur 9 cm · 25 cl", tourneLe: "1er octobre 2026", prix: 32, partie: false,
    note: "Le tenmoku s'éclaircit sur les arêtes, là où l'émail est plus fin.",
  },
  {
    slug: "assiette-10", numero: "10", forme: "assiette", nom: "Assiette n° 10", email: "#D9D4C7", emailNom: "Émail blanc cassé, mat",
    terre: "Grès moucheté", dimensions: "Ø 22 cm", tourneLe: "30 septembre 2026", prix: 34, partie: false,
    note: "Les points sombres sont le fer de la terre, remonté à la cuisson.",
  },
];

export const pieceParSlug = (slug: string) => pieces.find((p) => p.slug === slug);

export const feminin = (f: Forme) => f === "tasse" || f === "assiette";

/** « Acheter ce bol », « Acheter cette tasse ». */
export const boutonAchat = (f: Forme) => `Acheter ${feminin(f) ? "cette" : "ce"} ${f}`;

export const FORMES: { id: Forme | "tout"; libelle: string }[] = [
  { id: "tout", libelle: "Tout" },
  { id: "bol", libelle: "Bols" },
  { id: "tasse", libelle: "Tasses" },
  { id: "assiette", libelle: "Assiettes" },
  { id: "vase", libelle: "Vases" },
];

/** « 48 € » : les prix sont ronds, l'espace avant € est insécable. */
export const prix = (n: number) => `${n} €`;

export const ENVOI = { prix: "7,90 €", delai: "expédiée sous 3 jours ouvrés, livrée en 2 à 4 jours" };

export const etapes = [
  { titre: "La terre", duree: "1 jour", texte: "Du grès, pétri à la main pour chasser l'air. Une motte par pièce, pesée avant de monter sur le tour." },
  { titre: "Le tournage", duree: "20 minutes", texte: "Centrer, ouvrir, monter, affiner. On filme la pièce du début à la fin : c'est la vidéo de sa page." },
  { titre: "Le séchage", duree: "1 semaine", texte: "Lentement, à l'abri des courants d'air. Le pied est tournassé quand la terre a la consistance du cuir." },
  { titre: "Le biscuit", duree: "1 jour", texte: "Une première cuisson, à 980 °C. La terre devient poreuse et solide, prête à boire l'émail." },
  { titre: "L'émail", duree: "1 jour", texte: "Trempé, versé ou coulé. Les émaux sont préparés à l'atelier, et chaque pièce reçoit le sien." },
  { titre: "La cuisson", duree: "2 jours", texte: "À 1 280 °C, puis le four refroidit seul. On ne l'ouvre qu'une fois froid : le jour de l'ouverture." },
];

export const engagements = [
  { titre: "Une seule de chaque", texte: "Chaque pièce porte un numéro, et ce numéro n'existe qu'une fois. Quand elle est partie, sa page le dit, et elle ne revient pas." },
  { titre: "La vidéo de sa naissance", texte: "Vingt secondes sur le tour, filmées le jour où elle a été tournée. Celle-là, pas une autre." },
  { titre: "En ligne le soir même", texte: "Les pièces sortent du four en direct, et elles sont en vente le soir de l'ouverture, à 21 h." },
];

export const questions = [
  { q: "La vidéo est vraiment celle de ma pièce ?", r: "Oui. On filme chaque tournage, et la vidéo est rangée avec le numéro de la pièce. Si elle a raté au four, la vidéo part avec elle." },
  { q: "Pourquoi un bol coûte 48 € ?", r: "Une motte de grès, vingt minutes de tour, une semaine de séchage, deux cuissons et un émail préparé à l'atelier. Et un sur six ne survit pas au four. Prix d'exemple, TTC." },
  { q: "Les pièces vont au lave-vaisselle ?", r: "Le grès cuit à 1 280 °C est vitrifié : il passe au lave-vaisselle. Évite seulement les chocs de température, du congélateur au four." },
  { q: "Et si elle arrive cassée ?", r: "Elle voyage calée dans du papier froissé et un carton double. Si elle arrive cassée malgré tout, envoie une photo : on te rembourse." },
  { q: "Je peux changer d'avis ?", r: "Oui : tu as quatorze jours après la réception pour nous la renvoyer, comme pour tout achat à distance. Le retour est à ta charge." },
  { q: "Je peux venir à l'atelier ?", r: "Le samedi matin, de 10 h à 13 h. Mais tout ce qui est en vente est sur le site : la boutique de l'atelier, c'est celle-ci." },
];

export const NAVIGATION = [
  { href: `${DOSSIER}/fournee`, libelle: "La fournée" },
  { href: `${DOSSIER}/fournee/bol-112`, libelle: "Le bol n° 112" },
  { href: `${DOSSIER}/ouverture-du-four`, libelle: "L'ouverture du four" },
];

export const photos = {
  tournage: { src: `${DOSSIER}/tournage.webp`, largeur: 1400, hauteur: 933, alt: "Deux mains couvertes de barbotine montent un bol en grès sur un tour qui tourne" },
  fournee: { src: `${DOSSIER}/fournee.webp`, largeur: 1200, hauteur: 1800, alt: "Une dizaine de bols émaillés, gris, miel et blancs, posés sur un fond rose poudré" },
  etagere: { src: `${DOSSIER}/etagere.webp`, largeur: 1200, hauteur: 800, alt: "Des piles de bols de toutes les couleurs sur une étagère en bois de l'atelier" },
  bol: { src: `${DOSSIER}/bol-112.webp`, largeur: 1000, hauteur: 787, alt: "Un bol vu de dessus, émail sombre sur le bord et grès moucheté au fond" },
};
