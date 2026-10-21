// Les données du site Rien à Signaler, marque d'alarmes imaginée dans la vidéo « Si je
// devais créer une entreprise d'alarmes ». Toutes les alarmes vendent la peur ; celle-ci
// vend le moment où l'on ferme la porte, et où l'on n'y pense plus.
//
// Règles tenues (voir SOURCES.md de la vidéo) :
// - SANS TÉLÉSURVEILLANCE, et le site le dit : une alarme installée et pilotée par une
//   application ; le rapport du dimanche vient du système, pas d'une personne. Aucun mot
//   qui laisse croire qu'une personne garde la maison (sinon : activité de sécurité
//   privée, CSI art. L611-1, autorisation du CNAPS et mentions de l'art. L612-15) ;
// - détecteurs « animaux » : on dit ce que fait l'installateur (choisir, placer, régler),
//   jamais un résultat absolu (C. consom., art. L121-2) ;
// - aucune statistique de cambriolage, aucune vente par la peur ;
// - prix TTC, pose comprise, « exemple » ; pas de démarchage.

export const DOSSIER = "/exemples/rien-a-signaler";

export const NAVIGATION = [
  { href: `${DOSSIER}/mon-alarme`, libelle: "Mon alarme" },
  { href: `${DOSSIER}/le-dimanche`, libelle: "Le message du dimanche" },
];

export const maison = {
  telephone: "06 39 98 42 17",
  adresse: "12 rue de l'Exemple, Ta Ville",
};

export const photos = {
  chat: { src: "/exemples/rien-a-signaler/chat-fenetre.webp", largeur: 1300, hauteur: 1950, alt: "Un chat tigré somnole sur le rebord d'une fenêtre" },
  chatSoleil: { src: "/exemples/rien-a-signaler/chat-soleil.webp", largeur: 1000, hauteur: 750, alt: "Un chaton gris dort au soleil, contre une fenêtre en bois" },
  cle: { src: "/exemples/rien-a-signaler/cle.webp", largeur: 1000, hauteur: 1250, alt: "Une clé ancienne dans la serrure d'une porte" },
  cafe: { src: "/exemples/rien-a-signaler/cafe-dimanche.webp", largeur: 1100, hauteur: 1650, alt: "Une tasse fumante sur une table, dans la lumière du matin" },
};

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
  "Un détecteur dit «\u00A0animaux\u00A0» ignore un animal sous un certain poids, qui se déplace au sol. Un chat qui grimpe sur une armoire peut encore le déclencher\u00A0: on choisit l'emplacement avec toi, et on te dit où sont les limites.";

export const KITS = {
  appartement: { nom: "Appartement", prix: 590, ouvertures: 2, mouvements: 1, exterieure: false },
  maison: { nom: "Maison", prix: 890, ouvertures: 4, mouvements: 2, exterieure: true },
} as const;

export const PRIX_OUVERTURE = 49;

export const ETAPES = [
  { titre: "Trois questions", texte: "Ton animal d'abord. Puis ton logement, et ses portes et fenêtres." },
  { titre: "La pose", texte: "Une demi-journée. On place chaque détecteur avec toi, et on règle l'application sur ton téléphone." },
  { titre: "Le dimanche", texte: "Chaque dimanche à 9 h, un seul message. La plupart du temps\u00A0: rien à signaler." },
];

export const FAQ = [
  { q: "Et si mon chat déclenche l'alarme\u00A0?", r: "Ça peut arriver\u00A0: un détecteur «\u00A0animaux\u00A0» a des limites, surtout avec un chat qui grimpe. On les choisit, on les place et on les règle selon ton chat, et on te dit où sont les limites. Si ça arrive quand même, on revient régler." },
  { q: "Quelqu'un vient-il si l'alarme se déclenche\u00A0?", r: "Non. Rien à Signaler ne fait pas de télésurveillance\u00A0: la sirène sonne, ton téléphone reçoit l'alerte, et c'est toi qui décides quoi faire — regarder, appeler un voisin, appeler les secours." },
  { q: "Qui écrit le message du dimanche\u00A0?", r: "Personne\u00A0: c'est un rapport automatique de ton alarme. Il dit ce que la centrale a enregistré dans la semaine — mises en marche, arrêts, alertes." },
  { q: "Pourquoi aucun chiffre de cambriolages sur le site\u00A0?", r: "Parce qu'on ne vend pas la peur. On vend le moment où tu fermes la porte et où tu n'y penses plus." },
  { q: "Faut-il un abonnement\u00A0?", r: "Non. L'application et le rapport du dimanche sont compris dans le prix du kit (exemple)." },
];

export const euros = (n: number) => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;
