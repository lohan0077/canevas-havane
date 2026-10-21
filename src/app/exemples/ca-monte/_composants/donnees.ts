// Les données du site Ça Monte : un magasin de vélos imaginaire, qui vend le trajet de
// lundi matin plutôt que des fiches techniques. Vélos sans marque, prix, dates, tests
// de batterie : tout est inventé, et marqué « exemple ».

export const DOSSIER = "/exemples/ca-monte";

export const entreprise = {
  nom: "Ça Monte",
  telephone: "01 99 00 12 12", // tranche réservée par l'ARCEP aux œuvres de fiction
  adresse: "12 rue de l'Exemple",
  horaires: "Du mardi au samedi, 9 h 30 – 19 h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#trajet`, libelle: "Ton trajet" },
  { href: `${DOSSIER}#essai`, libelle: "L'essai" },
  { href: `${DOSSIER}/occasion`, libelle: "L'occasion" },
  { href: `${DOSSIER}/atelier`, libelle: "L'atelier" },
];

export const IMAGES = {
  piste: { src: "/exemples/ca-monte/piste-verte.webp", largeur: 1000, hauteur: 1500, alt: "Une piste cyclable peinte en vert, son pictogramme de vélo au sol, sous l'ombre des arbres" },
  chaine: { src: "/exemples/ca-monte/chaine.webp", largeur: 1200, hauteur: 1805, alt: "Gros plan sur la chaîne et le plateau d'un vélo" },
  atelier: { src: "/exemples/ca-monte/atelier.webp", largeur: 1200, hauteur: 800, alt: "Deux mains démontent le boîtier de pédalier d'un vélo, à l'atelier" },
};

export type Conseil = { velo: string; batterie: number | null; minutes: number; recharge: string; pourquoi: string };

/**
 * Le vélo qu'il te faut, d'après ton trajet (aller simple) et sa côte. Estimations :
 * environ 15 km/h à vélo musculaire (12 avec une côte), 20 km/h à assistance
 * électrique (18 avec une côte) — l'assistance s'arrête à 25 km/h. Consommation
 * d'environ 8 Wh/km, 10 avec une côte, en assistance moyenne.
 */
export function conseiller(km: number, cote: boolean): Conseil {
  const musculaire = km <= 5 && !cote;
  const vitesse = musculaire ? 15 : cote ? 18 : 20;
  const minutes = Math.round((km / vitesse) * 60 / 5) * 5 || 5;
  if (musculaire) {
    return { velo: "Vélo de ville", batterie: null, minutes, recharge: "pas de batterie", pourquoi: "À plat et à moins de 5 km, l'assistance ne te ferait gagner que quelques minutes. Un bon vélo de ville suffit." };
  }
  const batterie = km <= 8 ? 400 : km <= 15 ? 500 : km <= 25 ? 625 : 750;
  const autonomie = batterie / (cote ? 10 : 8); // km, en mode d'assistance moyen
  const jours = Math.max(1, Math.floor(autonomie / (2 * km)));
  const recharge = jours >= 5 ? "une fois par semaine" : jours >= 2 ? `tous les ${jours} jours` : "chaque soir";
  const velo = km <= 15 ? "Vélo électrique de ville" : "Vélo électrique de trekking";
  const pourquoi = cote
    ? "La côte, c'est l'assistance qui la monte : tu arrives sans avoir transpiré. Une batterie à la mesure de l'aller-retour, sans en porter trop."
    : "Sur cette distance, l'assistance garde ta moyenne régulière, vent de face compris. Une batterie à la mesure de l'aller-retour, sans en porter trop.";
  return { velo, batterie, minutes, recharge, pourquoi };
}

export type Creneau = { jour: string; heure: string; pris?: boolean };
export const CRENEAUX: Creneau[] = [
  { jour: "Samedi", heure: "9\u00a0h" },
  { jour: "Samedi", heure: "11\u00a0h", pris: true },
  { jour: "Samedi", heure: "14\u00a0h" },
  { jour: "Samedi", heure: "16\u00a0h", pris: true },
  { jour: "Mercredi", heure: "18\u00a0h" },
  { jour: "Jeudi", heure: "18\u00a0h", pris: true },
];

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
  { id: "ville-500", nom: "Vélo électrique de ville", annee: 2023, taille: "M · de 1,65 à 1,80 m", km: 2400, prix: 1290, couleur: "#3A6EA5", batterie: { wh: 500, capacite: 88, testeLe: "12 octobre" }, revise: ["Freins : plaquettes neuves, purge", "Transmission : chaîne et cassette changées", "Roues : rayons retendus, voile corrigé", "Moteur : diagnostic sans erreur"] },
  { id: "trekking-625", nom: "Vélo électrique de trekking", annee: 2022, taille: "L · de 1,78 à 1,92 m", km: 5100, prix: 1690, couleur: "#4A6B00", batterie: { wh: 625, capacite: 81, testeLe: "9 octobre" }, revise: ["Freins : disques et plaquettes neufs", "Transmission : chaîne changée", "Fourche : joints et huile", "Moteur : diagnostic sans erreur"] },
  { id: "cargo", nom: "Vélo cargo électrique", annee: 2021, taille: "Unique · de 1,60 à 1,90 m", km: 7800, prix: 2190, couleur: "#B04A15", batterie: { wh: 500, capacite: 76, testeLe: "14 octobre" }, revise: ["Freins : purge, plaquettes neuves", "Caisse : fixations resserrées", "Pneus neufs", "Moteur : diagnostic sans erreur"] },
  { id: "ville", nom: "Vélo de ville", annee: 2020, taille: "S · de 1,55 à 1,70 m", km: 3200, prix: 290, couleur: "#6B5B95", batterie: null, revise: ["Freins : câbles et patins neufs", "Transmission : moyeu à vitesses réglé", "Éclairage : dynamo vérifiée"] },
];
export const occasion = (id: string) => OCCASIONS.find((o) => o.id === id);

export const FORFAITS = [
  { nom: "Réglage des freins", prix: 25, detail: "Une paire, câbles ou hydrauliques, pièces en plus." },
  { nom: "Révision complète", prix: 89, detail: "Freins, transmission, roues, serrages, essai sur route." },
  { nom: "Test de batterie", prix: 30, detail: "Capacité restante mesurée, résultat écrit, que tu achètes ou non." },
  { nom: "Changement de chaîne", prix: 35, detail: "Main-d'œuvre, chaîne en plus selon le modèle." },
  { nom: "Marquage d'un vélo", prix: 15, detail: "Inscription au fichier national des cycles identifiés, pour un vélo qui n'est pas vendu par nous." },
];

export const euros = (n: number) => `${n.toLocaleString("fr-FR").replace(/ /g, " ")} €`;

export const QUESTIONS = [
  { q: "Pourquoi tu ne parles pas de couple et de wattheures ?", r: "On en parle, en magasin, si tu veux. Mais la vraie question, c'est ton trajet : sa longueur, sa côte, ce que tu portes. Le reste en découle." },
  { q: "Un vélo électrique, ça va jusqu'à combien ?", r: "L'assistance s'arrête à 25 km/h : c'est ce qui en fait un vélo, et pas un cyclomoteur. Nos estimations de temps de trajet restent en dessous, autour de 18 à 20 km/h de moyenne." },
  { q: "Comment testez-vous les batteries d'occasion ?", r: "Une charge complète, puis une décharge mesurée au banc. On écrit la capacité restante, en pourcentage de l'origine, et la date du test sur la fiche du vélo." },
  { q: "C'est quoi, le marquage ?", r: "Depuis 2021, tout vélo vendu par un commerçant, neuf ou d'occasion, est marqué d'un identifiant et inscrit au fichier national des cycles identifiés (code des transports, art. L1271-2). C'est une obligation, pas une option : tous nos vélos le sont." },
  { q: "L'essai, c'est vraiment sur mon trajet ?", r: "Oui : deux heures, le samedi ou en semaine en fin de journée. Tu pars du magasin avec le vélo réglé à ta taille et un casque prêté, tu fais ton vrai trajet, tu reviens. Une pièce d'identité est demandée au départ." },
];
