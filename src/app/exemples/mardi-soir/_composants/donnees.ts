// Le cabinet de diététique imaginaire « Mardi Soir ». La diététicienne, l'adresse, les
// prix et les créneaux sont des exemples ; le téléphone est dans la tranche que l'ARCEP
// réserve à la fiction. Aucun conseil nutritionnel, aucun kilo promis, et la photo du
// frigo ne quitte jamais le téléphone du patient : le site ne la reçoit pas.

export const DOSSIER = "/exemples/mardi-soir";

export const cabinet = {
  nom: "Mardi Soir",
  dieteticienne: "Jeanne P.",
  titre: "Diététicienne",
  diplome: "BTS Diététique et nutrition — exemple",
  adeli: "00 000 000 0",
  adresse: "12 rue de l'Exemple",
  ville: "Saint-Exemple",
  telephone: "01 99 00 19 30",
  horaires: "Du lundi au vendredi, de 12 h à 21 h",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#frigo`, libelle: "Votre frigo" },
  { href: `${DOSSIER}/dieteticienne-ou-nutritionniste`, libelle: "Diététicienne ou nutritionniste ?" },
  { href: `${DOSSIER}#tarifs`, libelle: "Tarifs" },
  { href: `${DOSSIER}/reserver`, libelle: "Réserver" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const P = "/exemples/mardi-soir";
export const photos = {
  cuisine: { src: `${P}/cuisine-nuit.webp`, largeur: 1400, hauteur: 933, alt: "Une cuisine dans le noir, la porte du réfrigérateur ouverte et allumée" },
  bocaux: { src: `${P}/frigo-bocaux.webp`, largeur: 1200, hauteur: 800, alt: "L'intérieur d'un réfrigérateur : bocaux, sauce tomate, poivrons et tomates" },
  legumes: { src: `${P}/frigo-legumes.webp`, largeur: 1200, hauteur: 800, alt: "La porte et les clayettes d'un réfrigérateur : salade, œufs, oranges" },
} satisfies Record<string, Photo>;

/* ---------- Les séances ---------- */
export const seances = [
  { id: "premiere", nom: "Première séance", duree: "1 h", prix: "55 €", detail: "On part de votre frigo, de vos soirs, de vos questions." },
  { id: "suivi", nom: "Séance de suivi", duree: "45 min", prix: "40 €", detail: "Ce qui a marché, ce qui coince, la suite." },
];

/* ---------- Le soir : créneaux d'exemple ---------- */
export type Soir = { id: string; court: string; long: string; heures: { h: string; pris?: boolean }[] };
export const soirs: Soir[] = [
  { id: "lundi", court: "Lun.", long: "lundi", heures: [{ h: "17 h 30" }, { h: "18 h 30", pris: true }, { h: "19 h 30" }, { h: "20 h 30", pris: true }] },
  { id: "mardi", court: "Mar.", long: "mardi", heures: [{ h: "17 h 30", pris: true }, { h: "18 h 30" }, { h: "19 h 30" }, { h: "20 h 30" }] },
  { id: "mercredi", court: "Mer.", long: "mercredi", heures: [{ h: "17 h 30" }, { h: "18 h 30" }, { h: "19 h 30", pris: true }, { h: "20 h 30" }] },
  { id: "jeudi", court: "Jeu.", long: "jeudi", heures: [{ h: "17 h 30", pris: true }, { h: "18 h 30", pris: true }, { h: "19 h 30" }, { h: "20 h 30" }] },
  { id: "vendredi", court: "Ven.", long: "vendredi", heures: [{ h: "17 h 30" }, { h: "18 h 30" }, { h: "19 h 30", pris: true }] },
];

/* ---------- Ce que vous apportez (rien n'est envoyé) ---------- */
export const aApporter = [
  { id: "photo", libelle: "Une photo de votre frigo", detail: "Sur votre téléphone. Vous me la montrez, elle y reste." },
  { id: "questions", libelle: "Vos questions", detail: "Notées sur un papier, ou dans votre tête." },
  { id: "soirs", libelle: "Vos soirs de la semaine", detail: "Qui rentre à quelle heure, qui cuisine, qui mange quoi." },
];

/* ---------- Diététicienne ou nutritionniste ? ---------- */
export const reponse = {
  titre: "Diététicienne ou nutritionniste ?",
  court: "Diététicienne : un titre protégé par la loi. Le voici, avec mon diplôme dessous.",
  points: [
    {
      titre: "Diététicien, un titre protégé",
      texte: "Seules les personnes titulaires des diplômes fixés par la loi peuvent exercer comme diététicien et porter ce titre. L'utiliser sans y avoir droit est puni comme une usurpation de titre.",
      source: "Code de la santé publique, art. L4371-2 et L4372-2",
    },
    {
      titre: "Et « nutritionniste » ?",
      texte: "Le mot seul ne correspond, dans ces textes, à aucun diplôme réglementé. Un « médecin nutritionniste », lui, est médecin. Si vous hésitez, demandez le diplôme : un professionnel vous le montre sans difficulté.",
      source: "",
    },
    {
      titre: "Ce que je fais",
      texte: "Des conseils nutritionnels et un bilan diététique, à partir de votre vie réelle. Pour un trouble du métabolisme ou de l'alimentation, j'interviens sur prescription médicale.",
      source: "Code de la santé publique, art. L4371-1",
    },
    {
      titre: "Ce que je ne fais pas",
      texte: "Je ne pose pas de diagnostic de maladie, je ne promets aucun kilo et je ne vends pas de régime. Si quelque chose relève d'un médecin, je vous le dis.",
      source: "",
    },
  ],
};

export const questions = [
  { q: "Est-ce que vous allez me mettre au régime ?", r: "Non. On part de ce que vous mangez vraiment, le mardi soir comme les autres soirs. Aucun kilo n'est promis ici." },
  { q: "Dois-je envoyer la photo de mon frigo ?", r: "Non, surtout pas. Vous la prenez avec votre téléphone et vous me la montrez en séance. Le site ne reçoit aucune photo et n'enregistre rien." },
  { q: "Pourquoi des rendez-vous le soir ?", r: "Parce que c'est là que tout se joue, et que c'est souvent le seul moment libre. Les créneaux vont jusqu'à 20 h 30." },
  { q: "Combien coûte une séance ?", r: "55 € la première séance d'une heure, 40 € le suivi de 45 minutes (prix d'exemple). Facture remise à chaque séance." },
];
