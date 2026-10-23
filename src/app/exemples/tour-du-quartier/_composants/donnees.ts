// Les données du site Tour du Quartier, magasin de vélos imaginaire filmé dans les deux
// vidéos du métier :
//   - « Créer une marque » (marque-magasins-velo) : le nom, « on commence par là », la
//     question « t'as pas pédalé depuis combien de temps ? », la première heure sur le
//     parking avec Paul, l'affiche « pas de cuissard, pas de chrono », la course de
//     lenteur du premier dimanche ;
//   - « Remplir l'agenda » (agenda-magasins-velo) : la page « Lundi matin » (« ton trajet,
//     c'est combien ? » → le vélo qu'il faut), l'essai réservé en ligne sur ton vrai
//     trajet un samedi matin, la fiche de chaque vélo d'occasion (batterie testée,
//     marquage).
// Une seule idée pour les deux : d'abord le tour du quartier, puis le trajet de lundi.
// Prénoms, prix, dates, tests de batterie : tout est inventé, et marqué « exemple ».
//
// Règles tenues (SOURCES.md des deux vidéos) : aucune marque de vélo, vélos dessinés ;
// marquage présenté comme une obligation (code des transports, L1271-2) ; assistance
// électrique coupée à 25 km/h, temps de trajet marqués « estimation » ; casque obligatoire
// pour les moins de douze ans ; la course de lenteur, sur le parking, sans lot ; première
// heure offerte sans obligation d'achat ; prix TTC « exemple » ; téléphone de la tranche
// ARCEP réservée à la fiction ; aucune adresse e-mail.

export const DOSSIER = "/exemples/tour-du-quartier";

export const entreprise = {
  nom: "Tour du Quartier",
  telephone: "06 39 98 15 15",
  telephoneLien: "+33639981515",
  adresse: "12 rue de l'Exemple, Ta Ville",
  horaires: [
    { jours: "Mardi – samedi", heures: "10 h – 19 h" },
    { jours: "Dimanche matin", heures: "9 h – 12 h", note: "Premières heures sur le parking" },
  ],
};

export const NAVIGATION = [
  { href: `${DOSSIER}#depuis`, libelle: "Depuis combien ?" },
  { href: `${DOSSIER}/premiere-heure`, libelle: "La première heure" },
  { href: `${DOSSIER}/lundi-matin`, libelle: "Lundi matin" },
  { href: `${DOSSIER}/occasion`, libelle: "L'occasion" },
  { href: `${DOSSIER}/course-de-lenteur`, libelle: "La course de lenteur" },
];

// Unsplash (licence Unsplash), servies depuis notre domaine ; crédits dans les mentions.
export const IMAGES = {
  mur: { src: `${DOSSIER}/velo-mur-jaune.webp`, largeur: 1200, hauteur: 752, alt: "Un vieux vélo à panier, appuyé contre un mur jaune" },
  parking: { src: `${DOSSIER}/parking.webp`, largeur: 1200, hauteur: 800, alt: "Un grand parking vide au soleil, bordé d'arbres" },
  rue: { src: `${DOSSIER}/rue-calme.webp`, largeur: 1000, hauteur: 628, alt: "Une allée tranquille sous une voûte d'arbres" },
  arbre: { src: `${DOSSIER}/velo-arbre.webp`, largeur: 1200, hauteur: 800, alt: "Un vélo de ville posé contre un arbre, au bord de l'eau" },
  piste: { src: `${DOSSIER}/piste-verte.webp`, largeur: 1000, hauteur: 1500, alt: "Une piste cyclable peinte en vert, son pictogramme de vélo au sol, sous l'ombre des arbres" },
  chaine: { src: `${DOSSIER}/chaine.webp`, largeur: 1200, hauteur: 1805, alt: "Gros plan sur la chaîne et le plateau d'un vélo" },
  atelier: { src: `${DOSSIER}/atelier.webp`, largeur: 1200, hauteur: 800, alt: "Deux mains démontent le boîtier de pédalier d'un vélo, à l'atelier" },
};

/* ---------- La question de la marque : depuis combien de temps ? ---------- */

export type Reponse = { titre: string; texte: string; ou: string; duree: string; avec: string };

/** Ce que le magasin propose, selon le temps passé sans pédaler. */
export function repondre(ans: number, jamais: boolean): Reponse {
  if (jamais) return { titre: "Jamais appris ? Très bien.", texte: "On commence par l'équilibre, sur un vélo sans pédales à ta taille. Personne ne regarde, le parking est à nous.", ou: "Sur le parking", duree: "Une heure", avec: "Paul" };
  if (ans <= 1) return { titre: `${ans} an ? Tu n'as presque pas arrêté.`, texte: "On règle ton vélo, ou on t'en prête un, et on fait un tour du quartier ensemble.", ou: "Le tour du quartier", duree: "Trente minutes", avec: "Malo" };
  if (ans <= 5) return { titre: `${ans} ans ? Ça revient vite.`, texte: "Dix minutes sur le parking pour retrouver les freins, puis la rue calme derrière le magasin.", ou: "Le parking, puis la rue calme", duree: "Quarante-cinq minutes", avec: "Inès" };
  if (ans <= 14) return { titre: `${ans} ans ? On prend le temps.`, texte: "On commence sur le parking, et on ne sort dans la rue calme que quand tu le décides.", ou: "Sur le parking", duree: "Une heure", avec: "Inès" };
  return { titre: `${ans} ans ? Parfait.`, texte: "On commence sur le parking. Vélo et casque prêtés, selle réglée, et personne ne regarde.", ou: "Sur le parking", duree: "Une heure", avec: "Paul" };
}

export const EQUIPE = [
  { prenom: "Paul", role: "Les premières heures, sur le parking", couleur: "#F2C14E" },
  { prenom: "Inès", role: "La rue calme, puis le quartier", couleur: "#E8553D" },
  { prenom: "Malo", role: "L'atelier, les réglages, l'occasion", couleur: "#7FB08F" },
];

export const CRENEAUX_PREMIERE = ["Dimanche · 9 h", "Dimanche · 10 h 30", "Mercredi · 18 h", "Samedi · 9 h"];

export const COURSE = { date: "Dimanche 8 novembre", heure: "10 h", lieu: "sur le parking du magasin" };

export const DEROULE = [
  { titre: "On règle la selle", texte: "Et le guidon, à ta taille. Vélo et casque prêtés si tu n'en as pas." },
  { titre: "On marche à côté", texte: "Dix minutes, freins serrés, pour l'apprivoiser. Personne ne regarde." },
  { titre: "Le parking", texte: "Les premiers tours de roue, sans voiture et sans public. Le parking est à nous." },
  { titre: "La rue calme", texte: "Si tu veux. Sinon, la prochaine fois : c'est toi qui décides quand on sort." },
];

export const VELOS = [
  { nom: "Le vélo de ville", texte: "Cadre bas, on monte sans lever la jambe. Le plus prêté de tous.", prix: "à partir de 390 €" },
  { nom: "Le vélo à assistance", texte: "Pour la côte qu'on n'ose plus. L'assistance s'arrête à 25 km/h.", prix: "à partir de 1 490 €" },
  { nom: "Le tricycle adulte", texte: "Trois roues, zéro équilibre à trouver. Pour aller au marché tranquille.", prix: "à partir de 990 €" },
];

/* ---------- Le trajet de lundi matin (l'agenda) ---------- */

export type Conseil = { velo: string; batterie: number | null; minutes: number; recharge: string; pourquoi: string };

/**
 * Le vélo qu'il te faut, d'après ton trajet (aller simple) et sa côte. Estimations :
 * environ 15 km/h à vélo musculaire, 20 km/h à assistance électrique (18 avec une côte)
 * — l'assistance s'arrête à 25 km/h. Consommation d'environ 8 Wh/km, 10 avec une côte.
 */
export function conseiller(km: number, cote: boolean): Conseil {
  const musculaire = km <= 5 && !cote;
  const vitesse = musculaire ? 15 : cote ? 18 : 20;
  const minutes = Math.round((km / vitesse) * 60 / 5) * 5 || 5;
  if (musculaire) {
    return { velo: "Vélo de ville", batterie: null, minutes, recharge: "pas de batterie", pourquoi: "À plat et à moins de 5 km, l'assistance ne te ferait gagner que quelques minutes. Un bon vélo de ville suffit." };
  }
  const batterie = km <= 8 ? 400 : km <= 15 ? 500 : km <= 25 ? 625 : 750;
  const autonomie = batterie / (cote ? 10 : 8);
  const jours = Math.max(1, Math.floor(autonomie / (2 * km)));
  const recharge = jours >= 5 ? "une fois par semaine" : jours >= 2 ? `tous les ${jours} jours` : "chaque soir";
  const velo = km <= 15 ? "Vélo électrique de ville" : "Vélo électrique de trekking";
  const pourquoi = cote
    ? "La côte, c'est l'assistance qui la monte : tu arrives sans avoir transpiré. Une batterie à la mesure de l'aller-retour, sans en porter trop."
    : "Sur cette distance, l'assistance garde ta moyenne régulière, vent de face compris. Une batterie à la mesure de l'aller-retour, sans en porter trop.";
  return { velo, batterie, minutes, recharge, pourquoi };
}

export type Creneau = { jour: string; heure: string; pris?: boolean };
/** Les créneaux d'essai sur ton vrai trajet (exemple). */
export const CRENEAUX: Creneau[] = [
  { jour: "Samedi", heure: "9 h" },
  { jour: "Samedi", heure: "11 h", pris: true },
  { jour: "Samedi", heure: "14 h" },
  { jour: "Samedi", heure: "16 h", pris: true },
  { jour: "Mercredi", heure: "18 h" },
  { jour: "Jeudi", heure: "18 h", pris: true },
];

/* ---------- L'occasion (l'agenda) ---------- */

export type Occasion = {
  id: string;
  nom: string;
  annee: number;
  taille: string;
  km: number;
  prix: number; // TTC, prix d'exemple
  couleur: string;
  batterie: { wh: number; capacite: number; testeLe: string } | null;
  revise: string[];
};

export const OCCASIONS: Occasion[] = [
  { id: "ville-500", nom: "Vélo électrique de ville", annee: 2023, taille: "M · de 1,65 à 1,80 m", km: 2400, prix: 1290, couleur: "#2E6B4F", batterie: { wh: 500, capacite: 88, testeLe: "12 octobre" }, revise: ["Freins : plaquettes neuves, purge", "Transmission : chaîne et cassette changées", "Roues : rayons retendus, voile corrigé", "Moteur : diagnostic sans erreur"] },
  { id: "trekking-625", nom: "Vélo électrique de trekking", annee: 2022, taille: "L · de 1,78 à 1,92 m", km: 5100, prix: 1690, couleur: "#3A6EA5", batterie: { wh: 625, capacite: 81, testeLe: "9 octobre" }, revise: ["Freins : disques et plaquettes neufs", "Transmission : chaîne changée", "Fourche : joints et huile", "Moteur : diagnostic sans erreur"] },
  { id: "cargo", nom: "Vélo cargo électrique", annee: 2021, taille: "Unique · de 1,60 à 1,90 m", km: 7800, prix: 2190, couleur: "#C2412A", batterie: { wh: 500, capacite: 76, testeLe: "14 octobre" }, revise: ["Freins : purge, plaquettes neuves", "Caisse : fixations resserrées", "Pneus neufs", "Moteur : diagnostic sans erreur"] },
  { id: "ville", nom: "Vélo de ville", annee: 2020, taille: "S · de 1,55 à 1,70 m", km: 3200, prix: 290, couleur: "#6B5B95", batterie: null, revise: ["Freins : câbles et patins neufs", "Transmission : moyeu à vitesses réglé", "Éclairage : dynamo vérifiée"] },
];

export const FORFAITS = [
  { nom: "Réglage des freins", prix: 25, detail: "Une paire, câbles ou hydrauliques, pièces en plus." },
  { nom: "Révision complète", prix: 89, detail: "Freins, transmission, roues, serrages, essai sur route." },
  { nom: "Test de batterie", prix: 30, detail: "Capacité restante mesurée, résultat écrit, que tu achètes ou non." },
  { nom: "Changement de chaîne", prix: 35, detail: "Main-d'œuvre, chaîne en plus selon le modèle." },
  { nom: "Marquage d'un vélo", prix: 15, detail: "Inscription au fichier national des cycles identifiés, pour un vélo qui n'est pas vendu par nous." },
];

export const euros = (n: number) => `${n.toLocaleString("fr-FR").replace(/\s/g, " ")} €`;

/* ---------- Les questions ---------- */

export const QUESTIONS = [
  { q: "Je n'ai pas de vélo. Je peux venir ?", r: "Oui : pour la première heure, on prête le vélo et le casque. On règle la selle à ta taille avant de partir." },
  { q: "Et si j'ai peur de tomber ?", r: "C'est pour ça qu'on commence sur le parking, sans voiture, à ton rythme. On ne sort dans la rue que quand tu le décides." },
  { q: "La première heure, c'est payant ?", r: "Non. Elle est offerte, sans obligation d'achat. Si tu veux continuer, les heures suivantes coûtent 15 € (exemple)." },
  { q: "L'essai, c'est vraiment sur mon trajet ?", r: "Oui : deux heures, le samedi matin ou en semaine en fin de journée. Tu pars du magasin avec le vélo réglé à ta taille et un casque prêté, tu fais ton vrai trajet, tu reviens. Une pièce d'identité est demandée au départ." },
  { q: "Un vélo électrique, ça va jusqu'à combien ?", r: "L'assistance s'arrête à 25 km/h : c'est ce qui en fait un vélo, et pas un cyclomoteur. Nos estimations de temps de trajet restent en dessous, autour de 18 à 20 km/h de moyenne." },
  { q: "C'est quoi, le marquage ?", r: "Depuis 2021, tout vélo vendu par un commerçant, neuf ou d'occasion, est marqué d'un identifiant et inscrit au fichier national des cycles identifiés (code des transports, art. L1271-2). C'est une obligation, pas une option : tous nos vélos le sont." },
  { q: "Le casque est obligatoire ?", r: "À vélo, il est obligatoire pour les moins de douze ans. Pour les adultes, on le conseille, et on le prête pour toutes nos sorties." },
  { q: "La course de lenteur, c'est sérieux ?", r: "Pas du tout. Elle se court sur le parking du magasin, le dernier arrivé gagne, et il n'y a rien à gagner. Juste le droit de dire qu'on a été le plus lent du quartier." },
];
