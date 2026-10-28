// Tout ce qu'affiche le site de Voix Basse, cabinet vétérinaire fictif filmé dans les
// deux vidéos des vétérinaires : « Créer une marque » (le nom, « ici, on parle bas », la
// question du stress, le créneau calme avant l'ouverture, viens pour rien) et « Remplir
// l'agenda » (un seul champ sur l'accueil, la date de naissance, et toute la première
// année réservable ; le site qui change de visage le soir ; la page de garde ; les prix
// clairs, compris, ajouts et date). Il a absorbé « Douze Lunes ».
//
// Règles tenues ici :
//   - « cabinet vétérinaire », jamais l'appellation réservée aux établissements qui en
//     remplissent les conditions (Code rural, R242-54) ;
//   - ni avis, ni note, ni comparaison avec un autre cabinet (R242-35) : « Ici, on parle
//     bas » décrit ce cabinet, sans dire qu'ailleurs on parle fort ;
//   - aucune promesse sur l'animal : le calme est une façon de recevoir, pas un résultat ;
//   - prix TTC, d'exemple, datés, avec ce qu'ils comprennent et ce qui peut s'ajouter
//     (R242-35 ; arrêté du 3 décembre 1987, art. 1) ;
//   - téléphone dans la tranche que l'ARCEP réserve à la fiction, aucune adresse e-mail,
//     adresse inventée, équipe par ses initiales.
import type { CSSProperties } from "react";

export const DOSSIER = "/exemples/voix-basse";

export const cabinet = {
  nom: "Voix Basse",
  signature: "Ici, on parle bas.",
  accroche: "Cabinet vétérinaire · chats et chiens",
  adresse: ["12 rue de l'Exemple", "00000 Ville-Exemple"],
  telephone: "01 99 00 52 40",
  garde: {
    nom: "Service de garde du secteur",
    telephone: "01 99 00 31 12",
    distance: "12 km",
    trajet: "environ 15 minutes en voiture",
    adresse: "3 avenue de l'Exemple, 00000 Ville-Voisine",
  },
  horaires: [
    { jours: "Lundi – vendredi", heures: "8 h 30 – 19 h" },
    { jours: "Créneaux calmes", heures: "8 h et 8 h 15, avant l'ouverture" },
    { jours: "Samedi", heures: "9 h – 12 h 30" },
    { jours: "Soir, dimanche, jours fériés", heures: "Service de garde" },
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

/** Quand le cabinet rouvre : « demain à 8 h 30 », « lundi à 8 h 30 »… (par pas d'un quart d'heure). */
export function reouverture(d: Date) {
  const t = new Date(d);
  t.setSeconds(0, 0);
  t.setMinutes(Math.ceil(t.getMinutes() / 15) * 15);
  for (let k = 0; k < 4 * 24 * 4 && !estOuvert(t); k++) t.setMinutes(t.getMinutes() + 15);
  const jours = Math.round((new Date(t).setHours(0, 0, 0, 0) - new Date(d).setHours(0, 0, 0, 0)) / 86_400_000);
  const jour = jours === 0 ? "aujourd'hui" : jours === 1 ? "demain" : t.toLocaleDateString("fr-FR", { weekday: "long" });
  // Espaces insécables : « 8 h 30 » ne se coupe pas en fin de ligne.
  return `${jour} à ${t.getHours()} h ${String(t.getMinutes()).padStart(2, "0")}`.replace(" h 00", " h");
}

// Le soir, le site change de palette : mêmes variables que le Cadre, autres valeurs.
// Une nuit vert-noir, la lavande de la marque. Chaque couple texte / fond tient 4,5:1.
export const SOIR = {
  "--fond": "#131F19",
  "--encre": "#F3EEE4",
  "--doux": "#B9C6BC",
  "--accent": "#C9B6E4",
  "--sur-accent": "#131F19",
  "--accent-texte": "#D6C8EE",
  "--carte": "#1B2B23",
  "--trait": "#33473D",
  "--sombre": "#0C1611",
  "--sur-sombre": "#F3EEE4",
} as CSSProperties;

/** Les bandes sombres du jour : mêmes variables, autres valeurs (chaque couple tient 4,5:1). */
export const SOMBRE = {
  "--fond": "#2F4A3E",
  "--encre": "#FBF7EF",
  "--doux": "#D9E3DB",
  "--accent": "#C9B6E4",
  "--sur-accent": "#2F4A3E",
  "--accent-texte": "#D6C8EE",
  "--carte": "#284035",
  "--trait": "#4A6457",
} as CSSProperties;

export const NAVIGATION = [
  { href: `${DOSSIER}#annee`, libelle: "Sa première année" },
  { href: `${DOSSIER}/pour-rien`, libelle: "Viens pour rien" },
  { href: `${DOSSIER}/tarifs`, libelle: "Tarifs" },
  { href: `${DOSSIER}/garde`, libelle: "La garde" },
];

/* ---------- Les photos (Unsplash, servies depuis notre domaine) ---------- */
export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const photo = (fichier: string, largeur: number, hauteur: number, alt: string): Photo => ({
  src: `/exemples/voix-basse/${fichier}.webp`, largeur, hauteur, alt,
});

export const photos = {
  soleil: photo("chat-soleil", 1000, 1333, "Un chat tigré dort au soleil sur la moquette, à côté de sa caisse de transport fermée"),
  caisse: photo("chat-caisse", 1200, 803, "Un chat roux couché, tranquille, dans sa caisse de transport ouverte"),
  chien: photo("chien-calme", 1200, 1800, "Un chiot golden retriever allongé sur un parquet, le museau sur les pattes"),
  friandise: photo("friandise", 1200, 675, "Un chat roux renifle une friandise posée sur le bout d'un doigt"),
  chaton: photo("chaton", 1400, 933, "Un chaton blanc et gris, couché sur un canapé bleu, regarde l'objectif"),
  chiot: photo("chiot", 1200, 800, "Un chiot crème endormi dans une couverture bleue, au fond d'un panier"),
  nuit: photo("nuit-chien", 1200, 1800, "Un chien roux dort, enfoui sous une couverture tricotée orange"),
  visite: photo("visite", 1200, 900, "Une main examine doucement l'oreille d'un chat tigré"),
};

/* ---------- La question, et les créneaux qu'elle ouvre ---------- */
export type Niveau = "pas-du-tout" | "un-peu" | "beaucoup";

export const NIVEAUX: { id: Niveau; libelle: string }[] = [
  { id: "pas-du-tout", libelle: "Pas du tout" },
  { id: "un-peu", libelle: "Un peu" },
  { id: "beaucoup", libelle: "Beaucoup" },
];

/** Les créneaux calmes : avant l'ouverture, la salle d'attente est réservée à un seul rendez-vous. */
export const CRENEAUX_CALMES = [
  { libelle: "Lundi", sous: "8 h 00", pris: true },
  { libelle: "Mardi", sous: "8 h 00" },
  { libelle: "Mardi", sous: "8 h 15" },
  { libelle: "Jeudi", sous: "8 h 00", pris: true },
  { libelle: "Jeudi", sous: "8 h 15" },
  { libelle: "Vendredi", sous: "8 h 00" },
];

export const CRENEAUX_HABITUELS = [
  { libelle: "Lundi", sous: "10 h 30" },
  { libelle: "Lundi", sous: "17 h 45", pris: true },
  { libelle: "Mardi", sous: "14 h 00" },
  { libelle: "Mercredi", sous: "9 h 15" },
  { libelle: "Jeudi", sous: "18 h 15", pris: true },
  { libelle: "Samedi", sous: "11 h 00" },
];

/** Le créneau calme, minute par minute. */
export const DEROULE_CALME = [
  { heure: "7 h 55", texte: "Tu te gares devant la porte, sur la place réservée. Personne dans la cour." },
  { heure: "8 h 00", texte: "La salle d'attente est à toi. La caisse se pose en hauteur, porte ouverte." },
  { heure: "8 h 05", texte: "On vient vous chercher à voix basse. Il sort de sa caisse quand il veut." },
  { heure: "8 h 30", texte: "Le cabinet ouvre. Vous, vous êtes déjà repartis." },
];

/* ---------- Ce qui change ici ---------- */
export const ICI = [
  { titre: "On parle bas", texte: "À l'accueil, en salle, en consultation. Le téléphone sonne doucement, la porte ne claque pas." },
  { titre: "Les chats attendent à part", texte: "Une petite salle sans chien, avec une étagère pour poser la caisse en hauteur." },
  { titre: "Le créneau calme", texte: "Avant l'ouverture, à 8 h ou 8 h 15 : la salle d'attente est à toi, et à personne d'autre." },
  { titre: "Trente minutes", texte: "Chaque consultation dure une demi-heure. On a le temps de le laisser sortir seul de sa caisse." },
  { titre: "Tu restes avec lui", texte: "Pour l'examen, pour le vaccin. Sauf pour une intervention, évidemment." },
  { titre: "La table couverte", texte: "Une couverture sur la table d'examen, pas l'inox froid sous les pattes." },
];

/* ---------- Viens pour rien ---------- */
export const POUR_RIEN = [
  { titre: "Il renifle", texte: "La salle, la table, nos mains. À son rythme, porte de la caisse ouverte." },
  { titre: "Il a une friandise", texte: "Si tu es d'accord, et si son alimentation le permet : dis-nous ce qu'il ne doit pas manger." },
  { titre: "Il repart", texte: "Dix minutes, pas plus. Sans examen, sans piqûre, sans facture." },
];

export const CAISSE = [
  { titre: "Laisse-la ouverte", texte: "Dans le salon, toute la semaine. Une caisse qui ne sort que pour le vétérinaire, ton chat la reconnaît." },
  { titre: "Une couverture de la maison", texte: "Elle sent chez lui. Il la retrouvera chez nous, dans la salle des chats." },
  { titre: "Viens pour rien, d'abord", texte: "Une visite sans soin, pour que le cabinet devienne un endroit comme un autre." },
];

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
   Exemples, TTC, datés. Chaque acte dit ce qu'il comprend et ce qui peut s'y ajouter. */
export const DATE_DES_TARIFS = "1er octobre 2026";

export type Acte = {
  id: string;
  nom: string;
  prix: number | null; // null : sans frais
  compris: string[];
  ajouts: { nom: string; prix?: number }[];
};

export const ACTES: Acte[] = [
  {
    id: "consultation",
    nom: "Consultation",
    prix: 48,
    compris: ["Trente minutes", "Examen complet", "Réponses à tes questions", "Compte rendu dans le carnet de santé"],
    ajouts: [{ nom: "Médicaments, selon l'ordonnance" }, { nom: "Analyse d'urine", prix: 28 }],
  },
  {
    id: "creneau-calme",
    nom: "Consultation au créneau calme",
    prix: 48,
    compris: ["La même consultation", "Avant l'ouverture, à 8 h ou 8 h 15", "La salle d'attente pour toi seul"],
    ajouts: [{ nom: "Médicaments, selon l'ordonnance" }],
  },
  {
    id: "pour-rien",
    nom: "Visite pour rien",
    prix: null,
    compris: ["Il renifle la salle", "Une friandise, si tu es d'accord", "Une ligne dans son carnet"],
    ajouts: [],
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
    nom: "Vaccin et rappel",
    prix: 58,
    compris: ["Examen avant l'injection", "Injection", "Mise à jour du carnet"],
    ajouts: [{ nom: "Vermifuge", prix: 8 }],
  },
  {
    id: "sterilisation-chatte",
    nom: "Stérilisation · chatte",
    prix: 185,
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

export const euros = (n: number | null) => (n === null ? "Sans frais" : `${n.toLocaleString("fr-FR")} €`);

/* ---------- L'équipe, par ses initiales ---------- */
export const EQUIPE = [
  { initiales: "A. V.", role: "Docteure vétérinaire", phrase: "Les chats, surtout ceux qui se cachent." },
  { initiales: "T. M.", role: "Docteur vétérinaire", phrase: "Les chiens, la chirurgie courante, et la première année." },
  { initiales: "S. L.", role: "Auxiliaire spécialisée vétérinaire", phrase: "L'accueil, le téléphone, à voix basse." },
];

/* ---------- Questions ---------- */
export const QUESTIONS = [
  {
    q: "Le créneau calme coûte-t-il plus cher ?",
    r: "Non. C'est la même consultation, au même prix, simplement avant l'ouverture : la salle d'attente n'est qu'à toi.",
  },
  {
    q: "Pourquoi poser toute sa première année dès maintenant ?",
    r: "Parce que les rendez-vous de la première année tombent à des âges précis. Les poser à l'avance évite de les rattraper au hasard d'une urgence. Tu peux en déplacer un à tout moment, par téléphone.",
  },
  {
    q: "Le calendrier vaut-il pour tous les chatons et tous les chiots ?",
    r: "Non : c'est le protocole habituel du cabinet, et il s'adapte à chaque animal dès la première visite. Les dates affichées sont un point de départ, pas une ordonnance.",
  },
  {
    q: "La visite pour rien, c'est vraiment pour rien ?",
    r: "Oui : ton animal entre, renifle, reçoit une friandise et repart. Aucun examen, aucun soin, aucune facture. Juste pour que la prochaine fois, la caisse redevienne une caisse.",
  },
  {
    q: "Que se passe-t-il le soir et le dimanche ?",
    r: "Le cabinet est fermé, et le site te le dit : il passe au visage du soir et te montre, en haut de l'accueil, qui appeler et où aller. La garde est assurée par le service de garde du secteur.",
  },
  {
    q: "Le calme, ça marche pour tous les animaux ?",
    r: "On ne promet rien sur ton animal : chacun réagit à sa façon. On promet seulement la façon dont on le reçoit.",
  },
  {
    q: "Pourquoi n'y a-t-il pas d'avis sur ce site ?",
    r: "Notre code de déontologie nous interdit d'utiliser le témoignage de tiers. On préfère te montrer comment on travaille, et ce que ça coûte.",
  },
];
