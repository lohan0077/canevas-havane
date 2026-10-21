// Tout ce qu'affiche le site de Douze Lunes, cabinet vétérinaire fictif imaginé dans
// la vidéo « Si je devais remplir l'agenda d'un vétérinaire ». Chaque chiffre, chaque
// date, chaque prix est un exemple, et le site le dit là où il les montre.
//
// Règles tenues ici :
//   - « cabinet vétérinaire », jamais « clinique » : l'appellation est réservée aux
//     établissements qui en remplissent les conditions (Code rural, R242-54) ;
//   - ni avis, ni note, ni comparaison : le code de déontologie interdit le
//     témoignage de tiers et les procédés comparatifs (R242-35) ;
//   - les prix sont clairs, datés, avec ce qu'ils comprennent et ce qui peut
//     s'ajouter (R242-35), et affichés TTC (arrêté du 3 décembre 1987, art. 1) ;
//   - téléphone dans la tranche que l'ARCEP réserve à la fiction, aucune adresse
//     e-mail, une adresse postale inventée, l'équipe par ses initiales.

import type { CSSProperties } from "react";

export const DOSSIER = "/exemples/douze-lunes";

export const cabinet = {
  nom: "Douze Lunes",
  accroche: "Cabinet vétérinaire · chats et chiens",
  adresse: ["12 rue de l'Exemple", "00000 Ville-Exemple"],
  telephone: "01 99 00 41 12",
  garde: {
    nom: "Service de garde du secteur",
    telephone: "01 99 00 31 12",
    distance: "12 km",
    trajet: "environ 15 minutes en voiture",
    adresse: "3 avenue de l'Exemple, 00000 Ville-Voisine",
  },
  horaires: [
    { jours: "Lundi – vendredi", heures: "8 h 30 – 19 h" },
    { jours: "Samedi", heures: "9 h – 12 h 30" },
    { jours: "Dimanche et jours fériés", heures: "Service de garde" },
  ],
};

/** Ouvert à l'instant donné ? Lun.–ven. 8 h 30 – 19 h, sam. 9 h – 12 h 30. */
export function estOuvert(d: Date) {
  const jour = d.getDay();
  const minutes = d.getHours() * 60 + d.getMinutes();
  if (jour >= 1 && jour <= 5) return minutes >= 8 * 60 + 30 && minutes < 19 * 60;
  if (jour === 6) return minutes >= 9 * 60 && minutes < 12 * 60 + 30;
  return false;
}

// Le soir, le site change de palette : mêmes variables que le Cadre, autres valeurs.
// Les bandes sombres du site de jour la reprennent aussi. Chaque couple texte / fond
// tient 4,5:1 (calculé avant d'écrire, mesuré ensuite).
export const SOIR = {
  "--fond": "#0F1631",
  "--encre": "#F3EBDB",
  "--doux": "#B5BCD3",
  "--accent": "#F2B661",
  "--sur-accent": "#0F1631",
  "--accent-texte": "#F2B661",
  "--carte": "#18213F",
  "--trait": "#2C3658",
} as CSSProperties;

/** Quand le cabinet rouvre : « demain à 8 h 30 », « lundi à 8 h 30 »… (par pas d'un quart d'heure). */
export function reouverture(d: Date) {
  const t = new Date(d);
  t.setSeconds(0, 0);
  t.setMinutes(Math.ceil(t.getMinutes() / 15) * 15);
  for (let k = 0; k < 4 * 24 * 4 && !estOuvert(t); k++) t.setMinutes(t.getMinutes() + 15);
  const jours = Math.round((new Date(t).setHours(0, 0, 0, 0) - new Date(d).setHours(0, 0, 0, 0)) / 86_400_000);
  const jour = jours === 0 ? "aujourd'hui" : jours === 1 ? "demain" : t.toLocaleDateString("fr-FR", { weekday: "long" });
  // Espaces insécables : « 8 h 30 » ne se coupe pas en fin de ligne.
  return `${jour} à ${t.getHours()}\u00a0h\u00a0${String(t.getMinutes()).padStart(2, "0")}`.replace("\u00a0h\u00a000", "\u00a0h");
}

export const NAVIGATION = [
  { href: `${DOSSIER}#annee`, libelle: "Sa première année" },
  { href: `${DOSSIER}/tarifs`, libelle: "Tarifs" },
  { href: `${DOSSIER}/garde`, libelle: "La garde" },
  { href: `${DOSSIER}#cabinet`, libelle: "Le cabinet" },
  { href: `${DOSSIER}#venir`, libelle: "Nous trouver" },
];

/* ---------- Les photos (Unsplash, servies depuis notre domaine) ---------- */

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const photo = (fichier: string, largeur: number, hauteur: number, alt: string): Photo => ({
  src: `/exemples/douze-lunes/${fichier}.webp`, largeur, hauteur, alt,
});

export const photos = {
  chaton: photo("chaton", 1400, 933, "Un chaton blanc et gris, couché sur un canapé bleu, regarde l'objectif"),
  chiot: photo("chiot", 1200, 800, "Un chiot crème endormi dans une couverture bleue, au fond d'un panier"),
  nuit: photo("nuit-chien", 1200, 1800, "Un chien roux dort, enfoui sous une couverture tricotée orange"),
  visite: photo("visite", 1200, 900, "Une main examine doucement l'oreille d'un chat tigré"),
};

/* ---------- Le calendrier de la première année ----------
   Un exemple de protocole, pas une prescription : chaque cabinet règle le sien
   (R242-35 : une communication « scientifiquement étayée »). Les écarts sont
   comptés depuis la naissance. */

export type Espece = "chaton" | "chiot";
export type Etape = { jours?: number; mois?: number; titre: string; detail: string; acte: string };

export const PROTOCOLES: Record<Espece, Etape[]> = {
  chaton: [
    { jours: 56, titre: "Première visite", detail: "Examen complet, identification vérifiée, premier vaccin", acte: "premiere-visite" },
    { jours: 84, titre: "Rappel de vaccin", detail: "Deuxième injection, point sur l'alimentation", acte: "rappel" },
    { jours: 126, titre: "Visite de contrôle", detail: "Croissance, dents, vermifuge", acte: "consultation" },
    { mois: 6, titre: "Stérilisation", detail: "Consultation avant, intervention, contrôle après", acte: "sterilisation-chatte" },
    { mois: 12, titre: "Bilan d'un an", detail: "Examen complet et rappel annuel", acte: "bilan" },
  ],
  chiot: [
    { jours: 56, titre: "Première visite", detail: "Examen complet, identification vérifiée, premier vaccin", acte: "premiere-visite" },
    { jours: 84, titre: "Rappel de vaccin", detail: "Deuxième injection, conseils d'éducation", acte: "rappel" },
    { jours: 112, titre: "Rappel et contrôle", detail: "Troisième injection, croissance, vermifuge", acte: "rappel" },
    { mois: 6, titre: "Visite de croissance", detail: "Poids, dents de lait, on parle stérilisation", acte: "consultation" },
    { mois: 12, titre: "Bilan d'un an", detail: "Examen complet et rappel annuel", acte: "bilan" },
  ],
};

/* ---------- Les tarifs ----------
   Exemples, datés. Chaque acte dit ce qu'il comprend et ce qui peut s'y ajouter. */

export const DATE_DES_TARIFS = "1er octobre 2026";

export type Acte = {
  id: string;
  nom: string;
  prix: number;
  compris: string[];
  ajouts: { nom: string; prix?: number }[];
};

export const ACTES: Acte[] = [
  {
    id: "consultation",
    nom: "Consultation",
    prix: 45,
    compris: ["Examen clinique complet", "Conseils et réponses à vos questions", "Compte rendu dans le carnet de santé"],
    ajouts: [{ nom: "Médicaments, selon l'ordonnance" }, { nom: "Analyse d'urine", prix: 28 }],
  },
  {
    id: "premiere-visite",
    nom: "Première visite",
    prix: 68,
    compris: ["Examen complet", "Premier vaccin", "Vérification de l'identification", "Carnet de santé"],
    ajouts: [{ nom: "Vermifuge", prix: 8 }, { nom: "Antiparasitaire externe", prix: 14 }],
  },
  {
    id: "rappel",
    nom: "Rappel de vaccin",
    prix: 55,
    compris: ["Examen avant l'injection", "Injection", "Mise à jour du carnet"],
    ajouts: [{ nom: "Vermifuge", prix: 8 }],
  },
  {
    id: "sterilisation-chatte",
    nom: "Stérilisation · chatte",
    prix: 180,
    compris: ["Consultation avant", "Anesthésie", "Intervention", "Contrôle après"],
    ajouts: [{ nom: "Bilan sanguin", prix: 45 }, { nom: "Collerette", prix: 9 }],
  },
  {
    id: "castration-chat",
    nom: "Castration · chat",
    prix: 95,
    compris: ["Consultation avant", "Anesthésie", "Intervention", "Contrôle après"],
    ajouts: [{ nom: "Bilan sanguin", prix: 45 }],
  },
  {
    id: "identification",
    nom: "Identification par puce",
    prix: 62,
    compris: ["Pose de la puce", "Enregistrement au fichier national", "Carte d'identification"],
    ajouts: [],
  },
  {
    id: "bilan",
    nom: "Bilan d'un an",
    prix: 72,
    compris: ["Examen complet", "Rappel annuel", "Pesée et conseils d'alimentation"],
    ajouts: [{ nom: "Bilan sanguin", prix: 45 }, { nom: "Détartrage, si besoin", prix: 140 }],
  },
];

export const euros = (n: number) => `${n.toLocaleString("fr-FR")} €`;

/* ---------- Le cabinet ---------- */

export const SOINS = [
  { titre: "Consultations", texte: "Chats et chiens, sur rendez-vous, avec une salle d'attente à part pour les chats." },
  { titre: "Vaccins et identification", texte: "Le calendrier de la première année, posé dès la naissance, puis un rappel par an." },
  { titre: "Chirurgie courante", texte: "Stérilisation, castration, petites interventions : le prix est affiché avant." },
  { titre: "Dents", texte: "Détartrage sous anesthésie, examen de la bouche à chaque bilan." },
  { titre: "Analyses au cabinet", texte: "Prise de sang et analyses courantes faites sur place, résultats dans la journée." },
  { titre: "Fin de vie", texte: "Un rendez-vous au calme, en fin de journée, pour prendre le temps." },
];

export const EQUIPE = [
  { initiales: "C. A.", role: "Docteur vétérinaire", phrase: "Chirurgie courante et dents." },
  { initiales: "M. R.", role: "Docteur vétérinaire", phrase: "Chatons, chiots, et leur première année." },
  { initiales: "L. B.", role: "Auxiliaire spécialisée vétérinaire", phrase: "L'accueil, le téléphone, les rendez-vous." },
];

export const QUESTIONS = [
  {
    q: "Pourquoi poser toute sa première année dès maintenant ?",
    r: "Parce que les rendez-vous de la première année tombent à des âges précis. Les poser à l'avance évite de les rattraper au hasard d'une urgence. Vous pouvez en déplacer un à tout moment, par téléphone.",
  },
  {
    q: "Le calendrier vaut-il pour tous les chatons et tous les chiots ?",
    r: "Non : c'est le protocole habituel du cabinet, et il s'adapte à chaque animal dès la première visite. Les dates affichées sont un point de départ, pas une ordonnance.",
  },
  {
    q: "Mon animal a déjà eu un vaccin chez l'éleveur. Je fais quoi ?",
    r: "Apportez son carnet à la première visite : on reprend le calendrier là où il en est. S'il a été cédé, il doit déjà être identifié ; on le vérifie ensemble.",
  },
  {
    q: "Que se passe-t-il le soir et le dimanche ?",
    r: "Le cabinet est fermé, et le site vous le dit : il passe en mode soir et vous montre, en haut de l'accueil, qui appeler et où aller. La garde est assurée par le service de garde du secteur.",
  },
  {
    q: "Pourquoi n'y a-t-il pas d'avis clients sur ce site ?",
    r: "Notre code de déontologie nous interdit d'utiliser le témoignage de tiers. Ce site parle de ce que nous faisons, et de ce que cela coûte.",
  },
];
