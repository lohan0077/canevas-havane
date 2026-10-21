// Les données du site Patience, fromagerie imaginaire de la vidéo « Si je devais créer
// une fromagerie ». On ne vend pas du fromage, on vend du temps : l'âge de chaque
// fromage en jours, et la meule qu'on réserve six mois avant de la manger.
//
// Règles tenues (voir SOURCES.md de la vidéo) : l'âge affiché est calculé depuis une
// date d'entrée en cave écrite noir sur blanc (ici des dates d'exemple), pas inventé
// au fil de l'eau ; la date « prête le 14 avril » est la fin d'affinage prévue, pas
// un compte à rebours commercial ; les meules réservables sont en nombre réel (trente)
// et les réservées sont marquées exemple ; ni « fermier », ni « montagne », ni
// appellation attribuée à la boutique ; retrait en boutique seulement ; le lait et
// son traitement sont indiqués, l'allergène (lait) avant la réservation.

export const DOSSIER = "/exemples/patience";

export const boutique = {
  telephone: "01 99 00 51 14",
  adresse: "12 rue de l'Exemple",
  horaires: [
    { jours: "Mercredi – samedi", heures: "9 h 30 – 19 h" },
    { jours: "Dimanche", heures: "9 h – 12 h 30" },
    { jours: "Lundi et mardi", heures: "Fermé : on soigne la cave" },
  ],
};

export type Fromage = {
  slug: string;
  nom: string;
  numero: string;
  entree: string; // date et heure d'entrée en cave (heure de Paris)
  dureeJours: number; // durée d'affinage prévue
  lait: string;
  poids: string;
  soin: string;
};

export const CAVE: Fromage[] = [
  { slug: "grande-tomme", nom: "Grande tomme", numero: "meule n° 4", entree: "2026-04-18T09:00:00+02:00", dureeJours: 180, lait: "Lait cru de vache", poids: "4 kg", soin: "Retournée et brossée chaque semaine, sur planche d'épicéa." },
  { slug: "tomme-de-brebis", nom: "Tomme de brebis", numero: "meule n° 11", entree: "2026-07-02T09:00:00+02:00", dureeJours: 150, lait: "Lait cru de brebis", poids: "3 kg", soin: "Frottée à l'eau salée les deux premiers mois, puis laissée tranquille." },
  { slug: "vieille-meule", nom: "Vieille meule de vache", numero: "meule n° 2", entree: "2025-02-03T09:00:00+01:00", dureeJours: 720, lait: "Lait cru de vache", poids: "9 kg", soin: "Deux ans prévus. On la goûte au sondoir tous les trois mois." },
  { slug: "petite-chevre", nom: "Petite tomme de chèvre", numero: "meule n° 19", entree: "2026-09-20T09:00:00+02:00", dureeJours: 60, lait: "Lait thermisé de chèvre", poids: "800 g", soin: "Retournée tous les deux jours. Elle prend sa croûte grise en un mois." },
];

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

// Les meules à réserver : trente grandes tommes entrées en cave le 14 octobre 2026,
// prêtes le 14 avril 2027 (182 jours, vérifié par calcul). Les réservées sont un exemple.
export const MEULES = {
  entree: "2026-10-14T09:00:00+02:00",
  pret: "14 avril 2027",
  nombre: 30,
  reservees: [1, 2, 3, 5, 7, 8, 12, 13, 15, 18, 19, 21, 22, 24, 26, 28],
  nom: "Grande tomme",
  poids: "4 kg",
  prixKg: 30,
  lait: "Lait cru de vache",
};

export const euros = (n: number) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" }).replace(/ /g, " ");

export const QUESTIONS = [
  { q: "D'où vient l'âge affiché ?", r: "De la date d'entrée en cave, écrite sur la planche de chaque meule. Le site compte à partir d'elle, à la seconde près." },
  { q: "Que se passe-t-il pendant six mois ?", r: "Ta meule reste en cave, à son numéro. Chaque mois, on la photographie et on t'envoie la photo. Elle se retire en boutique le 14 avril." },
  { q: "Et si elle n'est pas prête le 14 avril ?", r: "Le 14 avril est la fin d'affinage prévue. Si elle a besoin de quelques jours de plus, on te le dit, et elle attend." },
  { q: "Je peux en réserver plusieurs ?", r: "Oui, tant qu'il en reste. Il y en a trente, pas une de plus : c'est ce que tient la planche." },
  { q: "Vous livrez ?", r: "Non. Les fromages se retirent en boutique. Le jour de la découpe, on coupe les meules devant tout le quartier." },
];

export const photos = {
  tommes: { src: "/exemples/patience/tommes.webp", largeur: 1400, hauteur: 930, alt: "Trois tommes à croûte naturelle empilées, dont une entamée" },
  coupe: { src: "/exemples/patience/coupe.webp", largeur: 1400, hauteur: 933, alt: "Une meule entamée sur une planche ronde, un couteau posé à côté" },
  bloc: { src: "/exemples/patience/bloc.webp", largeur: 1400, hauteur: 2100, alt: "Un bloc de fromage affiné posé sur une table en bois, dans la pénombre" },
  cave: { src: "/exemples/patience/cave.webp", largeur: 1400, hauteur: 1865, alt: "Des rangées de fromages ronds qui s'affinent sur des étagères en bois, en cave" },
};
