// Les données du site Patience, fromagerie imaginaire filmée dans les deux vidéos des
// fromagers : « Créer une marque » (on ne vend pas du fromage, on vend du temps :
// l'âge de chaque fromage en jours, qui tourne ; la meule réservée six mois avant de
// la manger, avec une photo d'elle chaque mois) et « Remplir le carnet de commandes »
// (« vous êtes combien ? » compose le plateau ; chaque fromage arrive avec sa carte ;
// une page par occasion ; commandé jeudi, prêt samedi matin).
//
// Règles tenues (voir les SOURCES.md des deux vidéos) :
// - l'âge affiché est calculé depuis une date d'entrée en cave écrite noir sur blanc
//   (ici des dates d'exemple), pas inventé ; ce n'est jamais un compte à rebours ;
// - la date « prête le 14 avril » est une fin d'affinage prévue, et les trente meules
//   réservables sont en nombre réel (les réservées sont marquées exemple) ;
// - Patience affine elle-même ses fromages, dans sa cave : aucune carte ne laisse donc
//   entendre une origine fermière (décret n° 2007-628, art. 9-1 ; Conseil d'État,
//   17/04/2015, n° 374602) — « son atelier », jamais « sa ferme », ni « fermier » ;
// - le traitement du lait est dit pour chaque fromage (même décret, art. 14 et 20), et
//   l'allergène (le lait) avant toute commande ou réservation (règlement (UE)
//   n° 1169/2011, art. 14 § 2 et 44) ;
// - ni « montagne », ni appellation (AOP) attribuée à la boutique, ni alcool ;
// - retrait en boutique seulement : rien sur l'expédition (règles non lues).

export const DOSSIER = "/exemples/patience";

export const boutique = {
  nom: "Patience",
  telephone: "01 99 00 51 14",
  adresse: "12 rue de l'Exemple",
  ville: "Saint-Exemple",
  horaires: [
    { jours: "Mercredi – samedi", heures: "9 h 30 – 19 h" },
    { jours: "Dimanche", heures: "9 h – 12 h 30" },
    { jours: "Lundi et mardi", heures: "Fermé : on soigne la cave" },
  ],
};

export const NAVIGATION = [
  { href: `${DOSSIER}/cave`, libelle: "La cave" },
  { href: `${DOSSIER}/plateaux`, libelle: "Les plateaux" },
  { href: `${DOSSIER}/meules`, libelle: "Réserver une meule" },
];

export type Fromage = {
  numero: number;
  slug: string;
  nom: string;
  quiLeFait: string;
  dOu: string;
  lait: string;          // « Cru, de vache » : le traitement thermique, puis l'espèce
  phrase: string;        // la phrase à dire à table
  entree: string;        // date et heure d'entrée dans notre cave (heure de Paris)
  dureeJours: number;    // durée d'affinage prévue
  poids: string;
  soin: string;
  teinte: string;
  forme: "meule" | "buche" | "pyramide" | "carre" | "rond";
};

// Six fromages, pas cent cinquante. Producteurs, distances et dates : des exemples.
export const FROMAGES: Fromage[] = [
  {
    numero: 1, slug: "grande-tomme", nom: "Grande tomme",
    quiLeFait: "Bastien, fromager", dOu: "Son atelier, à 45 km de la boutique", lait: "Cru, de vache",
    phrase: "« Six mois en cave. On l'a retournée vingt-six fois. »",
    entree: "2026-04-18T09:00:00+02:00", dureeJours: 180, poids: "4 kg",
    soin: "Retournée et brossée chaque semaine, sur planche d'épicéa.", teinte: "#E3B23C", forme: "meule",
  },
  {
    numero: 2, slug: "vieille-meule", nom: "Vieille meule de vache",
    quiLeFait: "Yves, fromager", dOu: "Son atelier, à 80 km de la boutique", lait: "Cru, de vache",
    phrase: "« On le goûte au sondoir tous les trois mois. Lui ne se presse pas. »",
    entree: "2025-02-03T09:00:00+01:00", dureeJours: 720, poids: "9 kg",
    soin: "Deux ans prévus. Goûté au sondoir tous les trois mois.", teinte: "#C98F2E", forme: "meule",
  },
  {
    numero: 3, slug: "tomme-de-chevre", nom: "Tomme de chèvre",
    quiLeFait: "Madeleine, fromagère", dOu: "Son atelier, à 30 km de la boutique", lait: "Cru, de chèvre",
    phrase: "« Sa croûte grise, c'est la cave qui la dessine. »",
    entree: "2026-08-10T09:00:00+02:00", dureeJours: 90, poids: "1,5 kg",
    soin: "Retournée tous les deux jours le premier mois, puis chaque semaine.", teinte: "#EADFC4", forme: "meule",
  },
  {
    numero: 4, slug: "bleu-de-brebis", nom: "Bleu de brebis",
    quiLeFait: "Lucie, fromagère", dOu: "Son atelier, à 60 km de la boutique", lait: "Cru, de brebis",
    phrase: "« Le bleu, ce sont des moisissures qu'on invite exprès. »",
    entree: "2026-07-02T09:00:00+02:00", dureeJours: 120, poids: "2,5 kg",
    soin: "Piqué à l'aiguille à la troisième semaine, pour laisser entrer l'air.", teinte: "#DCE3E6", forme: "rond",
  },
  {
    numero: 5, slug: "coulommiers", nom: "Coulommiers",
    quiLeFait: "La laiterie de Sarah et Jean, avec le lait de quatre élevages voisins", dOu: "Leur laiterie, à 20 km de la boutique", lait: "Thermisé, de vache",
    phrase: "« Sorti du frigo une heure avant. Sinon, il boude. »",
    entree: "2026-09-20T09:00:00+02:00", dureeJours: 35, poids: "500 g",
    soin: "Retourné tous les deux jours, jusqu'à ce que le cœur soit souple.", teinte: "#F4EAD5", forme: "rond",
  },
  {
    numero: 6, slug: "carre-croute-lavee", nom: "Carré à croûte lavée",
    quiLeFait: "Hugo, fromager", dOu: "Son atelier, à 70 km de la boutique", lait: "Cru, de vache",
    phrase: "« Il sent plus fort qu'il n'a de goût. Goûte avant de juger. »",
    entree: "2026-08-25T09:00:00+02:00", dureeJours: 60, poids: "700 g",
    soin: "Frotté à l'eau salée deux fois par semaine : c'est ce qui lui donne sa croûte orangée.", teinte: "#D98A3D", forme: "carre",
  },
];

export const fromage = (n: number) => FROMAGES.find((f) => f.numero === n)!;

/** L'âge d'un fromage à un instant donné, en jours, heures, minutes et secondes. */
export const ageDe = (entree: string, maintenant: number) => {
  const s = Math.max(0, Math.floor((maintenant - Date.parse(entree)) / 1000));
  return { jours: Math.floor(s / 86400), heures: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), secondes: s % 60 };
};

const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
export const dateLisible = (iso: string, plus = 0) => {
  const d = new Date(Date.parse(iso) + plus * 86400000);
  return `${d.getDate()} ${MOIS[d.getMonth()]} ${d.getFullYear()}`;
};

/* ---------- Le plateau « Vous êtes combien ? » ---------- */

/** L'ordre dans lequel les fromages entrent dans le plateau, du premier au sixième. */
const ORDRE_PLATEAU = [3, 1, 4, 5, 6, 2];
export const GRAMMES_PAR_PERSONNE = 120;
export const PRIX_PAR_PERSONNE = 7;

/** Le plateau pour `n` personnes : 120 g chacun, de trois à six fromages. */
export const plateauPour = (n: number) => {
  const combien = n < 6 ? 3 : n < 10 ? 4 : n < 15 ? 5 : 6;
  const grammes = n * GRAMMES_PAR_PERSONNE;
  return {
    fromages: ORDRE_PLATEAU.slice(0, combien).map(fromage),
    poids: grammes >= 1000 ? `${(grammes / 1000).toLocaleString("fr-FR", { maximumFractionDigits: 2 })} kg` : `${grammes} g`,
    parPersonne: PRIX_PAR_PERSONNE,
    total: n * PRIX_PAR_PERSONNE,
  };
};

/** Le lait de chaque fromage d'un plateau, à lire avant la commande. */
export const laitsDe = (fromages: Fromage[]) => fromages.map((f) => `${f.nom} : lait ${f.lait.toLowerCase()}`);

/** « 70,00 € » : écrit à la main, l'espace avant € variant d'un navigateur à l'autre. */
export const euros = (n: number) => `${n.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;

export const RETRAITS = ["Vendredi · 17 h", "Samedi · 10 h", "Samedi · 17 h"];

// Les pages par occasion : ce que les gens tapent (« plateau de fromage pour 10
// personnes », suggestions Google relevées le 15/10/2026, voir SOURCES.md).
export const OCCASIONS = [
  { slug: "pour-6-personnes", titre: "Plateau de fromage pour 6 personnes", court: "Pour 6", personnes: 6, chapo: "Un dîner entre amis : quatre fromages, un de chaque lait ou presque, et de quoi en reprendre." },
  { slug: "pour-10-personnes", titre: "Plateau de fromage pour 10 personnes", court: "Pour 10", personnes: 10, chapo: "Une grande tablée : cinq fromages, du plus doux au plus fort, 1,2 kg en tout." },
  { slug: "pour-20-personnes", titre: "Plateau de fromage pour 20 personnes", court: "Pour 20", personnes: 20, chapo: "Un anniversaire, un pot de départ : les six fromages de la cave, en deux plateaux." },
  { slug: "pour-un-mariage", titre: "Plateau de fromage pour un mariage", court: "Un mariage", personnes: 30, chapo: "Pour un mariage, on compose sur rendez-vous : on part des six fromages et de 120 g par invité, et on ajuste avec vous." },
];

/* ---------- Les meules à réserver ----------
   Trente grandes tommes entrées en cave le 14 octobre 2026, prêtes le 14 avril 2027
   (182 jours, vérifié par calcul). Les réservées sont un exemple. */
export const MEULES = {
  entree: "2026-10-14T09:00:00+02:00",
  dureeJours: 182,
  pret: "14 avril 2027",
  jourJ: "Samedi 17 avril 2027",
  nombre: 30,
  reservees: [1, 2, 3, 5, 7, 8, 12, 13, 15, 18, 19, 21, 22, 24, 26, 28],
  nom: "Grande tomme",
  poids: "4 kg",
  prixKg: 30,
  lait: "Lait cru de vache",
};

export const QUESTIONS = [
  { q: "Combien de fromage par personne ?", r: "On compte 120 g par personne pour un plateau servi en fin de repas. Pour un apéritif dînatoire ou un buffet, dis-le-nous : on prévoit davantage." },
  { q: "Je commande quand ?", r: "Deux jours avant au moins. Commandé jeudi, ton plateau est prêt samedi matin, découpé, avec ses cartes." },
  { q: "D'où vient l'âge affiché ?", r: "De la date d'entrée dans notre cave, écrite sur la planche de chaque fromage. Le site compte à partir d'elle, à la seconde près. Ce n'est pas un compte à rebours : c'est le temps déjà passé." },
  { q: "Que se passe-t-il pendant six mois, pour une meule réservée ?", r: "Elle reste en cave, à son numéro. Chaque mois, on la photographie et on t'envoie la photo. Elle se retire en boutique le 14 avril ; si elle a besoin de quelques jours de plus, on te le dit, et elle attend." },
  { q: "Et si un invité ne mange pas de lait cru ?", r: "Le lait de chaque fromage est écrit sur sa carte et avant la commande. On remplace un fromage au lait cru par un autre, au lait thermisé." },
  { q: "C'est quoi, la carte ?", r: "Une carte par fromage, posée sur le plateau : qui le fait, d'où il vient, son lait, son âge, et une phrase à dire à table quand quelqu'un demande « il vient d'où, celui-là ? »." },
  { q: "Vous livrez ?", r: "Non : plateaux et meules se retirent à la boutique. Le jour de la découpe, on coupe les meules devant tout le quartier." },
];

/* ---------- Les photos ----------
   Unsplash (licence Unsplash), servies depuis notre domaine ; crédits dans les
   mentions légales. Aucun visage, aucune étiquette lisible, aucun vin. */
export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const P = DOSSIER;
export const photos = {
  tommes: { src: `${P}/tommes.webp`, largeur: 1400, hauteur: 930, alt: "Trois tommes à croûte naturelle empilées, dont une entamée" },
  coupe: { src: `${P}/coupe.webp`, largeur: 1400, hauteur: 933, alt: "Une meule entamée sur une planche ronde, un couteau posé à côté" },
  bloc: { src: `${P}/bloc.webp`, largeur: 1400, hauteur: 2100, alt: "Un bloc de fromage affiné posé sur une table en bois, dans la pénombre" },
  cave: { src: `${P}/cave.webp`, largeur: 1400, hauteur: 1865, alt: "Des rangées de fromages ronds qui s'affinent sur des étagères en bois, en cave" },
  plateau: { src: `${P}/plateau.webp`, largeur: 1400, hauteur: 933, alt: "Un plateau en bois : quatre fromages, du raisin, des crackers et de la pâte de coing" },
  morceaux: { src: `${P}/morceaux.webp`, largeur: 1400, hauteur: 1867, alt: "Des morceaux de fromages à croûte naturelle posés sur du papier, vus de dessus" },
  bleu: { src: `${P}/bleu.webp`, largeur: 1200, hauteur: 800, alt: "Une part de fromage bleu posée sur une planche" },
  chevre: { src: `${P}/chevre.webp`, largeur: 1200, hauteur: 805, alt: "Une chèvre blanche aux oreilles tombantes, dans l'herbe, d'autres chèvres derrière" },
} satisfies Record<string, Photo>;
