// Tout ce que le site de Reviens. affiche, au même endroit. Reviens. est un dépôt de
// matériel professionnel imaginaire, filmé dans les deux vidéos du métier :
//   - « Créer une marque » (marque-materiel-pro) : la marque, l'outil gravé au prénom de
//     son propriétaire, la gravure en direct, la journée gravure, l'affiche ;
//   - « Remplir l'agenda » (agenda-materiel-pro) : le gros bouton « En panne », la photo
//     de la plaque, la pièce et le vrai stock, la liste du matériel pour ouvrir un
//     restaurant, le comptoir du samedi soir.
// Une seule idée pour les deux : le matériel qui revient. L'outil qu'on te rend, et
// l'appareil qui repart avant le service.
//
// Règles tenues ici (Videos/marque-materiel-pro/SOURCES.md, Videos/agenda-materiel-pro/SOURCES.md) :
//   - vente réservée aux professionnels : prix hors taxes, et le site le dit ; le TTC
//     est écrit à côté ; tout est marqué « exemple » ;
//   - le stock affiché est présenté comme le vrai stock, mis à jour à chaque sortie, et
//     le délai est écrit quand une pièce manque (C. conso., L121-4, 5° et 7°, étendus
//     aux pratiques visant les professionnels par L121-5) ;
//   - aucune marque réelle : la plaque porte « FABRICANT », les modèles (AR-700, TH-700…)
//     sont inventés, les outils sont dessinés sans logo ; « la liste de base », jamais
//     « complète » ;
//   - la journée gravure « toutes marques » est gratuite et sans achat ; graver l'outil
//     d'un autre fabricant peut toucher à sa garantie : le site demande de vérifier ;
//   - l'affiche, seulement dans les dépôts qui l'acceptent ;
//   - prénoms inventés, téléphone dans la tranche ARCEP réservée à la fiction, aucune
//     adresse e-mail.

export const DOSSIER = "/exemples/reviens";

export const depot = {
  nom: "Reviens.",
  adresse: "12 rue de l'Exemple, 00000 Ta Ville",
  telephone: "01 99 00 52 36",
  telephoneLien: "+33199005236",
  siret: "000 000 000 00000",
};

export const HORAIRES = [
  { jours: "Lundi – vendredi", heures: "6 h 30 – 19 h" },
  { jours: "Samedi", heures: "7 h – 23 h", note: "Comptoir pièces ouvert pendant le service du soir" },
  { jours: "Dimanche", heures: "9 h – 13 h", note: "Comptoir pièces seulement" },
];

export const NAVIGATION = [
  { href: `${DOSSIER}/en-panne`, libelle: "En panne" },
  { href: `${DOSSIER}/graver`, libelle: "Graver mon outil" },
  { href: `${DOSSIER}/ouvrir-un-restaurant`, libelle: "Ouvrir un restaurant" },
  { href: `${DOSSIER}/journee-gravure`, libelle: "La journée gravure" },
];

/** « 4 900 € », « 13 770 € » : espaces fines insécables, sans décimales. */
export const euros = (n: number) => `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;
/** Le TTC d'un prix HT (TVA à 20 %). */
export const ttc = (n: number) => n * 1.2;

/* ---------- Les photos ----------
   Unsplash (licence Unsplash), servies depuis notre domaine ; crédits dans les
   mentions légales. Aucune personne, aucune marque lisible. */
export const photos = {
  outils: { src: `${DOSSIER}/outils.webp`, largeur: 1200, hauteur: 800, alt: "Un marteau, un tournevis et deux pinces posés sur une planche, en noir et blanc" },
  etabli: { src: `${DOSSIER}/etabli.webp`, largeur: 1200, hauteur: 797, alt: "Un établi en bois : une équerre, un marteau, un cutter, des forets et des vis éparpillées" },
  chantier: { src: `${DOSSIER}/chantier.webp`, largeur: 1200, hauteur: 1500, alt: "Les poutres en bois d'une charpente en cours de montage, sur un ciel bleu" },
  four: { src: `${DOSSIER}/four-a-pizza.webp`, largeur: 1200, hauteur: 961, alt: "La bouche d'un four à pizza, le feu au fond, une pile d'assiettes sur le comptoir en inox" },
  louches: { src: `${DOSSIER}/louches.webp`, largeur: 1000, hauteur: 1333, alt: "Des louches en inox suspendues sous la hotte d'une cuisine professionnelle" },
  piano: { src: `${DOSSIER}/piano.webp`, largeur: 1200, hauteur: 900, alt: "Une marmite sur le feu d'un piano de cuisine professionnelle, des casseroles autour" },
};

/* ---------- L'outil gravé (la marque) ---------- */
export type IdOutil = "visseuse" | "perceuse" | "meuleuse" | "niveau" | "marteau";
export type Outil = { id: IdOutil; nom: string; detail: string; prix: number; maxLettres: number };

/** Prix hors taxes, gravure comprise : la vente est réservée aux professionnels. */
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

/** Le prénom tel qu'il est gravé : des lettres, des espaces, des tirets, en capitales. */
export const nettoyer = (s: string, max: number) =>
  s.replace(/[^\p{L}\p{M}'. -]/gu, "").toUpperCase().slice(0, max);

export const GAMME = ["KARIM", "SONIA", "MEHDI", "LUCAS", "INÈS"];

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

/* ---------- La panne (l'agenda) ---------- */
export type Piece = { ref: string; nom: string; stock: number; prix: number; delai?: string };
export type Appareil = { id: string; modele: string; nom: string; court: string; serie: string; tension: string; pieces: Piece[] };

export const appareils: Appareil[] = [
  {
    id: "armoire", modele: "AR-700", nom: "Armoire réfrigérée 700 L", court: "Armoire froide", serie: "2231-0457", tension: "230 V · 50 Hz",
    pieces: [
      { ref: "TH-700", nom: "Thermostat", stock: 3, prix: 64 },
      { ref: "VE-12", nom: "Ventilateur d'évaporateur", stock: 1, prix: 89 },
      { ref: "ST-2", nom: "Sonde de température", stock: 6, prix: 18 },
      { ref: "JP-700", nom: "Joint de porte", stock: 0, prix: 42, delai: "48 h" },
    ],
  },
  {
    id: "laverie", modele: "LV-500", nom: "Lave-vaisselle à capot", court: "Lave-vaisselle", serie: "1907-2210", tension: "400 V · 50 Hz",
    pieces: [
      { ref: "RS-5", nom: "Résistance de cuve", stock: 2, prix: 118 },
      { ref: "PV-3", nom: "Pompe de vidange", stock: 1, prix: 146 },
      { ref: "BL-5", nom: "Bras de lavage", stock: 4, prix: 37 },
    ],
  },
  {
    id: "four", modele: "FP-2", nom: "Four à pizza, 2 chambres", court: "Four à pizza", serie: "0412-8836", tension: "400 V · 50 Hz",
    pieces: [
      { ref: "TC-2", nom: "Thermocouple", stock: 5, prix: 29 },
      { ref: "JP-2", nom: "Joint de porte", stock: 2, prix: 46 },
      { ref: "RS-2", nom: "Résistance de sole", stock: 0, prix: 210, delai: "72 h" },
    ],
  },
];

export const appareilParModele = (m: string) => appareils.find((a) => a.modele.replace(/\W/g, "").toLowerCase() === m.replace(/\W/g, "").toLowerCase());

/** Le stock du dépôt, par famille (exemple). */
export const STOCK = [
  { nom: "Thermostats", ref: "TH-…", n: 42, etat: "ok" },
  { nom: "Joints de porte", ref: "JP-…", n: 18, etat: "ok" },
  { nom: "Batteries 18 V", ref: "BT-18", n: 26, etat: "ok" },
  { nom: "Résistances", ref: "RS-…", n: 7, etat: "bas" },
  { nom: "Disques 125 mm", ref: "DQ-125", n: 140, etat: "ok" },
  { nom: "Pompes de vidange", ref: "PV-…", n: 3, etat: "bas" },
];

/* ---------- Ouvrir un restaurant (l'agenda) ---------- */
export type Ligne = { nom: string; ref: string; prix: number };
export type Liste = { id: string; titre: string; couverts: string; lignes: Ligne[] };

export const listes: Liste[] = [
  {
    id: "pizzeria", titre: "Ouvrir une pizzeria", couverts: "40 couverts",
    lignes: [
      { nom: "Four à pizza, 2 chambres", ref: "FP-2", prix: 4900 },
      { nom: "Pétrin 20 litres", ref: "PT-20", prix: 1450 },
      { nom: "Saladette réfrigérée", ref: "SR-3", prix: 1290 },
      { nom: "Armoire froide 700 L", ref: "AR-700", prix: 1380 },
      { nom: "Lave-vaisselle à capot", ref: "LV-500", prix: 2650 },
      { nom: "Hotte 2 mètres", ref: "HT-200", prix: 2100 },
    ],
  },
  {
    id: "rapide", titre: "Ouvrir un restaurant rapide", couverts: "30 couverts",
    lignes: [
      { nom: "Friteuse double bac", ref: "FR-2", prix: 1690 },
      { nom: "Plaque de cuisson, 80 cm", ref: "PC-80", prix: 1240 },
      { nom: "Armoire froide 700 L", ref: "AR-700", prix: 1380 },
      { nom: "Table réfrigérée 3 portes", ref: "TR-3", prix: 1820 },
      { nom: "Lave-vaisselle frontal", ref: "LV-350", prix: 1950 },
      { nom: "Hotte 1,6 mètre", ref: "HT-160", prix: 1780 },
    ],
  },
  {
    id: "bar", titre: "Ouvrir un bar", couverts: "50 places",
    lignes: [
      { nom: "Arrière-bar réfrigéré 3 portes", ref: "AB-3", prix: 2140 },
      { nom: "Machine à glaçons, 40 kg / jour", ref: "MG-40", prix: 1590 },
      { nom: "Lave-verres", ref: "LG-400", prix: 1290 },
      { nom: "Évier de bar, 2 bacs", ref: "EB-2", prix: 690 },
      { nom: "Vitrine réfrigérée de comptoir", ref: "VR-1", prix: 980 },
    ],
  },
];

/* ---------- Samedi soir, minute par minute (récit de l'accueil) ---------- */
export const SAMEDI = [
  { heure: "21 h 40", titre: "Le frigo lâche.", texte: "Plein service, quarante couverts. L'armoire froide ne descend plus sous 9 °C." },
  { heure: "21 h 42", titre: "Une photo de la plaque.", texte: "Le gros bouton « En panne », sur l'accueil. Le site lit le modèle : AR-700." },
  { heure: "21 h 43", titre: "Thermostat TH-700 : en stock, 3.", texte: "Le vrai stock du dépôt, pas « appelez-nous du lundi au vendredi ». Il la réserve." },
  { heure: "22 h 15", titre: "La pièce l'attend au comptoir.", texte: "Ouvert le samedi jusqu'à 23 h. Le service suivant, l'armoire tourne." },
];

/* ---------- Les questions ---------- */
export const questions = [
  { q: "Pourquoi les prix sont hors taxes ?", r: "Parce que Reviens. vend aux professionnels : un numéro SIRET est demandé à l'ouverture du compte. Le prix TTC est écrit à côté, pour que personne n'ait à calculer. Ici, tous les prix sont des exemples." },
  { q: "« En stock : 3 », c'est le vrai chiffre ?", r: "Oui, sur le vrai site : le stock du dépôt, mis à jour à chaque sortie de pièce. Quand une pièce n'y est pas, on écrit le délai, pas « disponible ». Ici, les stocks sont des exemples." },
  { q: "Et si le site ne reconnaît pas ma plaque ?", r: "Tape la référence du modèle, ou appelle le comptoir : quelqu'un lit la plaque avec toi au téléphone, le samedi soir aussi." },
  { q: "La gravure, elle se voit vraiment ?", r: "Elle est faite pour ça : des lettres de 12 mm, au laser, sur le côté du corps de l'outil. Un prénom par outil, en capitales." },
  { q: "Graver mon vieil outil, ça touche à sa garantie ?", r: "Ça dépend de son fabricant. Vérifie sa garantie avant la journée gravure : on te pose la question sur place, et on ne grave que si tu es d'accord." },
  { q: "La liste pour ouvrir un restaurant, c'est tout ce qu'il faut ?", r: "Non : c'est la liste de base, le gros matériel. Le petit matériel, la vaisselle, l'installation et les raccordements se chiffrent à part, après une visite." },
  { q: "Et si quelqu'un s'appelle comme moi sur le chantier ?", r: "Ajoute une initiale : « KARIM B. ». Jusqu'à dix lettres sur une visseuse, douze sur un niveau." },
];
