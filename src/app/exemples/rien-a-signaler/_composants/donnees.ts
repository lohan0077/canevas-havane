// Les données de Rien à Signaler, installateur d'alarmes et de climatisation imaginaire,
// filmé dans les deux vidéos du métier : « Créer une marque » (le nom, l'alarme qui ne
// vend pas la peur, la première question « t'as un chat ? », le message du dimanche) et
// « Remplir l'agenda » (la clim qui vend la première nuit où l'on dort en août, le plan
// de la maison qui donne une fourchette pose comprise, le vrai délai de pose tout en
// haut du site, la date de pose réservée en ligne).
//
// Règles tenues (voir les SOURCES.md des deux vidéos) :
// - alarme SANS TÉLÉSURVEILLANCE, et le site le dit : installée et pilotée par une
//   application ; le rapport du dimanche vient du système, pas d'une personne. Aucun mot
//   qui laisse croire qu'une personne garde la maison (sinon : activité de sécurité
//   privée, CSI art. L611-1, autorisation du CNAPS et mentions de l'art. L612-15) ;
// - détecteurs « animaux » : on dit ce que fait l'installateur (choisir, placer, régler),
//   jamais un résultat absolu (C. consom., art. L121-2) ; aucune statistique de
//   cambriolage, aucune vente par la peur ;
// - la clim sert à rafraîchir : ni chauffage, ni « réversible », ni pompe à chaleur
//   (démarchage et lien France Rénov' non tranchés pour une clim vendue pour chauffer) ;
// - le délai affiché est le délai réel, mis à jour chaque lundi, jamais gonflé
//   (C. consom., art. L121-2) — ici, des exemples ;
// - l'attestation de capacité (fluides frigorigènes) est affichée avec sa date de
//   validité (C. env., art. R543-78 et R543-99) : numéro d'exemple ;
// - prix TTC, pose comprise, « exemple » ; le prix ferme vient au devis ; pas de démarchage.

export const DOSSIER = "/exemples/rien-a-signaler";

export const NAVIGATION = [
  { href: `${DOSSIER}/mon-alarme`, libelle: "Mon alarme" },
  { href: `${DOSSIER}/ma-maison`, libelle: "Ma clim" },
  { href: `${DOSSIER}/le-dimanche`, libelle: "Le dimanche" },
  { href: `${DOSSIER}/ma-date`, libelle: "Ma date de pose" },
];

export const maison = {
  nom: "Rien à Signaler",
  telephone: "06 39 98 42 17",
  adresse: "12 rue de l'Exemple",
  ville: "Ta Ville",
  horaires: "Du lundi au samedi, de 8 h à 18 h",
  attestation: "00 000 000",
  validite: "30 juin 2029",
};

/** Le délai de pose de la semaine, mis à jour chaque lundi (exemple). */
export const DELAI = { valeur: "9 jours", majLe: "lundi 19 octobre" };

export const HISTORIQUE = [
  { mois: "Avril", valeur: "9 jours", hauteur: 0.22 },
  { mois: "Mai", valeur: "2 semaines", hauteur: 0.38 },
  { mois: "Juin", valeur: "5 semaines", hauteur: 0.86 },
  { mois: "Juillet", valeur: "6 semaines", hauteur: 1 },
  { mois: "Octobre", valeur: "9 jours", hauteur: 0.22, maintenant: true },
];

export const photos = {
  chat: { src: "/exemples/rien-a-signaler/chat-fenetre.webp", alt: "Un chat tigré somnole sur le rebord d'une fenêtre" },
  chatSoleil: { src: "/exemples/rien-a-signaler/chat-soleil.webp", alt: "Un chaton gris dort au soleil, contre une fenêtre en bois" },
  cle: { src: "/exemples/rien-a-signaler/cle.webp", alt: "Une clé ancienne dans la serrure d'une porte" },
  cafe: { src: "/exemples/rien-a-signaler/cafe-dimanche.webp", alt: "Une tasse fumante sur une table, dans la lumière du matin" },
  chambre: { src: "/exemples/rien-a-signaler/chambre-nuit.webp", alt: "Un lit dans une chambre plongée dans la pénombre, la lumière du soir à la fenêtre" },
  draps: { src: "/exemples/rien-a-signaler/draps-bleus.webp", alt: "Des draps bleu nuit, froissés, dans le noir" },
  oreiller: { src: "/exemples/rien-a-signaler/oreiller-matin.webp", alt: "Un oreiller blanc rayé par la lumière d'un store, au matin" },
  toits: { src: "/exemples/rien-a-signaler/toits-soir.webp", alt: "Des toits et leurs cheminées en silhouette sur un ciel d'été orangé" },
};

/* ---------- L'alarme ---------- */

export type Animal = "chat" | "chien" | "aucun";

export const ANIMAUX: { v: Animal; libelle: string }[] = [
  { v: "chat", libelle: "Un chat" },
  { v: "chien", libelle: "Un chien" },
  { v: "aucun", libelle: "Aucun" },
];

export const REPONSES: Record<Animal, string> = {
  chat: "Détecteurs choisis pour les animaux, réglés à la pose selon ton chat.",
  chien: "Détecteurs choisis pour les animaux, réglés à la pose selon la taille de ton chien.",
  aucun: "Détecteurs de mouvement classiques, placés et réglés à la pose.",
};

export const NUANCE =
  "Un détecteur dit « animaux » ignore un animal sous un certain poids, qui se déplace au sol. Un chat qui grimpe sur une armoire peut encore le déclencher : on choisit l'emplacement avec toi, et on te dit où sont les limites.";

export const KITS = {
  appartement: { nom: "Appartement", prix: 590, ouvertures: 2, mouvements: 1, exterieure: false },
  maison: { nom: "Maison", prix: 890, ouvertures: 4, mouvements: 2, exterieure: true },
} as const;

export const PRIX_OUVERTURE = 49;

/* ---------- La clim ---------- */

export type Piece = { id: string; nom: string; surface: number; zone: string };

export const PIECES: Piece[] = [
  { id: "chambre", nom: "Chambre", surface: 12, zone: "a" },
  { id: "salon", nom: "Salon", surface: 30, zone: "b" },
  { id: "bureau", nom: "Bureau", surface: 10, zone: "c" },
  { id: "cuisine", nom: "Cuisine", surface: 12, zone: "d" },
  { id: "chambre-2", nom: "Chambre 2", surface: 11, zone: "e" },
];

/** Fourchettes TTC, pose comprise, selon le nombre d'unités intérieures (exemple). */
export const FOURCHETTES: Record<number, [number, number]> = {
  1: [1900, 2600],
  2: [4200, 5600],
  3: [5900, 7600],
  4: [7400, 9600],
  5: [8900, 11600],
};

export const COMPRIS_CLIM = [
  "La visite technique chez toi",
  "L'unité extérieure et les unités intérieures",
  "Les liaisons et leur raccordement, par un technicien titulaire de l'attestation de capacité",
  "La mise en service et les essais",
  "Le réglage avec toi, pièce par pièce",
];

/* ---------- Ensemble ---------- */

export const ENGAGEMENTS = [
  { titre: "On n'appelle personne", texte: "Pas de démarchage. Tu viens par le site, ou par un voisin." },
  { titre: "Sans télésurveillance, et on le dit", texte: "L'alarme sonne, ton téléphone le sait, et c'est toi qui décides. Aucune personne ne regarde chez toi." },
  { titre: "Un délai vrai", texte: "Celui qu'on affiche est celui qu'on tient. Mis à jour chaque lundi, jamais gonflé." },
  { titre: "La fourchette d'abord", texte: "Avant qu'on vienne, tu sais l'ordre de grandeur. Le prix ferme est sur le devis." },
];

export const ETAPES = [
  { moment: "Sur le site", titre: "Tes questions d'abord", texte: "Ton animal, pour l'alarme. Les pièces à rafraîchir, pour la clim. Le prix tombe tout de suite : TTC, pose comprise, exemple." },
  { moment: "Chez toi, une heure", titre: "La visite technique", texte: "On place chaque détecteur avec toi, loin des perchoirs du chat. On calcule la puissance de chaque pièce. Le devis suit, avec la date écrite." },
  { moment: "Le jour J", titre: "La pose", texte: "Une demi-journée pour une alarme, une journée pour une ou deux unités de clim. On règle l'application sur ton téléphone avant de partir." },
  { moment: "Ensuite", titre: "Le premier dimanche", texte: "À 9 h, un seul message : le rapport de ta semaine. La plupart du temps, il tient en une ligne." },
  { moment: "Au mois d'août", titre: "La première nuit", texte: "Trente degrés dehors, la chambre au frais. Tu dors. Rien à signaler." },
];

export const DEFILE = [
  "Fermer la porte",
  "N'y plus penser",
  "Dormir en août",
  "Un seul message le dimanche",
  "Pas de démarchage",
  "Sans télésurveillance, et on le dit",
  "Le délai réel, chaque lundi",
  "T'as un chat ?",
];

export const FAQ = [
  { q: "Et si mon chat déclenche l'alarme ?", r: "Ça peut arriver : un détecteur « animaux » a des limites, surtout avec un chat qui grimpe. On les choisit, on les place et on les règle selon ton chat, et on te dit où sont les limites. Si ça arrive quand même, on revient régler." },
  { q: "Quelqu'un vient-il si l'alarme se déclenche ?", r: "Non. Rien à Signaler ne fait pas de télésurveillance : la sirène sonne, ton téléphone reçoit l'alerte, et c'est toi qui décides quoi faire — regarder, appeler un voisin, appeler les secours." },
  { q: "Le délai en haut du site, il est vrai ?", r: "Oui : c'est le délai de pose de la semaine, mis à jour chaque lundi. S'il était gonflé pour te presser, ce serait mentir. Ici, c'est un exemple." },
  { q: "Quelle puissance de clim pour ma chambre ?", r: "Le technicien la calcule à la visite : surface, exposition, isolation, nombre de fenêtres. La fourchette du site suffit pour commencer." },
  { q: "La clim, elle chauffe aussi ?", r: "On l'installe pour rafraîchir les pièces l'été. C'est ce que le site chiffre, et rien d'autre." },
  { q: "Faut-il une autorisation pour l'unité extérieure ?", r: "Selon ton logement, l'accord de la copropriété ou une déclaration en mairie peuvent être nécessaires. On te le dit à la visite technique." },
  { q: "Faut-il un abonnement ?", r: "Non. L'application et le rapport du dimanche sont compris dans le prix de l'alarme (exemple)." },
  { q: "Pourquoi aucun chiffre de cambriolages sur le site ?", r: "Parce qu'on ne vend pas la peur. On vend le moment où tu fermes la porte et où tu n'y penses plus." },
];

/** Les jours de pose : le premier libre tombe au bout du délai affiché (exemple). */
export const CRENEAUX_POSE = [
  { libelle: "Lun. 2", sous: "novembre" },
  { libelle: "Mar. 3", sous: "novembre", pris: true },
  { libelle: "Mer. 4", sous: "novembre" },
  { libelle: "Jeu. 5", sous: "novembre", pris: true },
  { libelle: "Ven. 6", sous: "novembre" },
  { libelle: "Lun. 9", sous: "novembre" },
];

export const euros = (n: number) => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;
