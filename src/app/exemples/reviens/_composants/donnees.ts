// Tout ce que le site de Reviens. affiche, au même endroit. La marque est fictive :
// chaque prix, chaque prénom, chaque créneau est un exemple, et le site le dit.
//
// Règles tenues ici (Videos/marque-materiel-pro/SOURCES.md) :
//   - aucune marque réelle n'est nommée ni montrée, aucune comparaison ;
//   - prix TTC pour un particulier, marqués « exemple », « gravure comprise » ;
//   - un outil gravé à un prénom est personnalisé : exclu du droit de rétractation
//     (C. conso., L221-28, 3°), et le site le dit avant la commande ;
//   - la journée gravure « toutes marques » est gratuite pour de vrai ; graver un outil
//     peut toucher à sa garantie : le site demande de vérifier, et on le redit sur place ;
//   - l'affiche dans les dépôts, avec l'accord de chaque dépôt ;
//   - prénoms inventés, téléphone dans la tranche ARCEP réservée à la fiction, aucune
//     adresse e-mail.

export const DOSSIER = "/exemples/reviens";

export const marque = {
  nom: "Reviens.",
  adresse: "12 rue de l'Exemple, 00000 Ta Ville",
  telephone: "01 99 00 52 36",
  telephoneLien: "+33199005236",
  horaires: "Du lundi au samedi, de 7 h à 18 h",
  siret: "000 000 000 00000",
};

export type IdOutil = "visseuse" | "perceuse" | "meuleuse" | "niveau" | "marteau";
export type Outil = { id: IdOutil; nom: string; detail: string; prix: number; maxLettres: number };

export const outils: Outil[] = [
  { id: "visseuse", nom: "Visseuse", detail: "18 V · deux batteries", prix: 189, maxLettres: 10 },
  { id: "perceuse", nom: "Perceuse", detail: "18 V · à percussion", prix: 229, maxLettres: 10 },
  { id: "meuleuse", nom: "Meuleuse", detail: "Disque de 125 mm", prix: 149, maxLettres: 10 },
  { id: "niveau", nom: "Niveau", detail: "80 cm · trois fioles", prix: 49, maxLettres: 12 },
  { id: "marteau", nom: "Marteau", detail: "Coffreur · 600 g", prix: 29, maxLettres: 8 },
];

export const teintes = [
  { id: "anthracite", nom: "Anthracite", corps: "#2A3A47", gravure: "#E9D8B4" },
  { id: "sable", nom: "Sable", corps: "#E3CFA3", gravure: "#2A3A47" },
  { id: "brique", nom: "Brique", corps: "#B34A34", gravure: "#F7EBDD" },
];

export const euros = (n: number) => `${n} €`;

/** Le prénom tel qu'il est gravé : des lettres, des espaces, des tirets, en capitales. */
export const nettoyer = (s: string, max: number) =>
  s.replace(/[^\p{L}\p{M}'. -]/gu, "").toUpperCase().slice(0, max);

export const JOURNEE = {
  date: "samedi 14 novembre 2026",
  heures: "de 9 h à 17 h",
  lieu: "12 rue de l'Exemple, 00000 Ta Ville",
  maxOutils: 5,
};

export const creneauxJournee = [
  { libelle: "9 h", sous: "9 h – 10 h", pris: true },
  { libelle: "10 h", sous: "10 h – 11 h" },
  { libelle: "11 h", sous: "11 h – 12 h", pris: true },
  { libelle: "13 h", sous: "13 h – 14 h" },
  { libelle: "14 h", sous: "14 h – 15 h" },
  { libelle: "15 h", sous: "15 h – 16 h", pris: true },
  { libelle: "16 h", sous: "16 h – 17 h" },
];

export const questions = [
  { q: "La gravure, elle se voit vraiment ?", r: "Elle est faite pour ça : des lettres de 12 mm, au laser, sur le côté du corps de l'outil. Un prénom par outil, en capitales." },
  { q: "Je peux renvoyer un outil gravé ?", r: "Non, pas au titre de la rétractation : un outil gravé à ton prénom est fait pour toi. On te le redit avant le bouton « Commander ». S'il a un défaut, les garanties légales s'appliquent, gravé ou pas." },
  { q: "La journée gravure, c'est vraiment gratuit ?", r: "Oui. Tu ramènes jusqu'à cinq outils, de n'importe quelle marque, et on les grave. Tu ne paies rien et tu n'as rien à acheter." },
  { q: "Graver mon vieil outil, ça touche à sa garantie ?", r: "Ça dépend de son fabricant. Vérifie sa garantie avant de venir : on te pose la question sur place, et on ne grave que si tu es d'accord." },
  { q: "Et si quelqu'un s'appelle comme moi sur le chantier ?", r: "Ajoute une initiale : « KARIM B. ». Jusqu'à dix lettres sur une visseuse, douze sur un niveau." },
];

export const NAVIGATION = [
  { href: `${DOSSIER}/graver`, libelle: "Graver mon outil" },
  { href: `${DOSSIER}/journee-gravure`, libelle: "La journée gravure" },
];

export const photos = {
  outils: { src: `${DOSSIER}/outils.webp`, largeur: 1200, hauteur: 800, alt: "Un marteau, un tournevis et deux pinces posés sur une planche, en noir et blanc" },
  etabli: { src: `${DOSSIER}/etabli.webp`, largeur: 1200, hauteur: 797, alt: "Un établi en bois : une équerre, un marteau, un cutter, des forets et des vis éparpillées" },
  chantier: { src: `${DOSSIER}/chantier.webp`, largeur: 1200, hauteur: 1500, alt: "Les poutres en bois d'une charpente en cours de montage, sur un ciel bleu" },
};
