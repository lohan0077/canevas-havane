// Tout ce que le site de Ton dépôt affiche, au même endroit. Le fournisseur est fictif :
// chaque modèle, chaque référence, chaque stock et chaque prix est un exemple.
//
// Règles tenues ici (Videos/agenda-materiel-pro/SOURCES.md) :
//   - le stock affiché est présenté comme le vrai stock, mis à jour à chaque sortie
//     (C. conso., L121-4, 5° et 7°, applicables entre professionnels par L121-5) ;
//   - prix hors taxes : la vente est réservée aux professionnels, et le site le dit ;
//     le TTC est indiqué à côté ;
//   - aucune marque réelle : la plaque porte « FABRICANT », les modèles (AR-700, TH-700…)
//     sont inventés ; « la liste de base », pas « complète » ;
//   - téléphone dans la tranche ARCEP réservée à la fiction, aucune adresse e-mail.

export const DOSSIER = "/exemples/ton-depot";

export const depot = {
  nom: "Ton dépôt",
  adresse: "12 rue de l'Exemple, 00000 Ta Ville",
  telephone: "01 99 00 18 70",
  telephoneLien: "+33199001870",
  siret: "000 000 000 00000",
};

export const HORAIRES = [
  { jours: "Lundi – vendredi", heures: "6 h 30 – 19 h" },
  { jours: "Samedi", heures: "7 h – 23 h", note: "Comptoir pièces ouvert pendant le service du soir" },
  { jours: "Dimanche", heures: "9 h – 13 h", note: "Comptoir pièces seulement" },
];

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

/** « 4 900 € », « 13 770 € » : espaces fines insécables, sans décimales. */
export const euros = (n: number) => `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;

export const questions = [
  { q: "Pourquoi les prix sont hors taxes ?", r: "Parce que Ton dépôt vend aux professionnels : un numéro SIRET est demandé à l'ouverture du compte. Le prix TTC est écrit à côté, pour que personne n'ait à calculer." },
  { q: "« En stock : 3 », c'est le vrai chiffre ?", r: "Oui, sur le vrai site : le stock du dépôt, mis à jour à chaque sortie de pièce. Quand une pièce n'y est pas, on écrit le délai, pas « disponible ». Ici, les stocks sont des exemples." },
  { q: "Et si le site ne reconnaît pas ma plaque ?", r: "Tape la référence du modèle, ou appelle le comptoir : quelqu'un lit la plaque avec toi au téléphone, le samedi soir aussi." },
  { q: "Vous livrez ?", r: "En semaine, oui, sous 24 h dans un rayon de 40 km. Le samedi soir, c'est au comptoir : la pièce est prête quand tu arrives." },
  { q: "La liste pour ouvrir un restaurant, c'est tout ce qu'il faut ?", r: "Non : c'est la liste de base, le gros matériel. Le petit matériel, la vaisselle, l'installation et les raccordements se chiffrent à part, après une visite." },
];

export const NAVIGATION = [
  { href: `${DOSSIER}/en-panne`, libelle: "En panne" },
  { href: `${DOSSIER}/ouvrir-un-restaurant`, libelle: "Ouvrir un restaurant" },
];

export const photos = {
  four: { src: `${DOSSIER}/four-a-pizza.webp`, largeur: 1200, hauteur: 961, alt: "La bouche d'un four à pizza, le feu au fond, une pile d'assiettes sur le comptoir en inox" },
  louches: { src: `${DOSSIER}/louches.webp`, largeur: 1000, hauteur: 1333, alt: "Des louches en inox suspendues sous la hotte d'une cuisine professionnelle" },
  piano: { src: `${DOSSIER}/piano.webp`, largeur: 1200, hauteur: 900, alt: "Une marmite sur le feu d'un piano de cuisine professionnelle, des casseroles autour" },
};
