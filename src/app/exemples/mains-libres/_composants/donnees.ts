// Les données de Mains Libres, le garage imaginé pour la vidéo « Si je devais remplir
// l'agenda d'un garagiste ». Tout est inventé et marqué « exemple » : prix TTC, pièces
// et main-d'œuvre comprises ; aucune marque de voiture n'est citée — le site parle de
// « citadine », de « compacte », de « SUV ».

export const DOSSIER = "/exemples/mains-libres";

export const garage = {
  nom: "Mains Libres",
  adresse: "12 rue de l'Exemple, Ta Ville",
  telephone: "01 99 00 47 18",
  horaires: [
    { jours: "Lundi – vendredi", heures: "7 h 30 – 18 h 30" },
    { jours: "Samedi", heures: "8 h – 12 h" },
  ],
};

export const NAVIGATION = [
  { href: `${DOSSIER}/tarifs`, libelle: "Tarifs" },
  { href: `${DOSSIER}/rendez-vous`, libelle: "Rendez-vous" },
  { href: `${DOSSIER}/suivi`, libelle: "Suivi" },
];

export const photos = {
  mains: { src: "/exemples/mains-libres/mains-moteur.webp", alt: "Deux mains au travail dans un compartiment moteur, une clé à la main", largeur: 1600, hauteur: 1200 },
  cames: { src: "/exemples/mains-libres/arbre-a-cames.webp", alt: "Gros plan sur un moteur ouvert : arbre à cames et chaîne de distribution", largeur: 1200, hauteur: 800 },
  cles: { src: "/exemples/mains-libres/cles-plates.webp", alt: "Des clés plates disposées en cercle sur un fond noir", largeur: 1200, hauteur: 800 },
};

export type Categorie = "citadine" | "compacte" | "suv";

/** Les profils de voiture que la démonstration sait reconnaître. Aucune marque. */
export const PROFILS: Record<Categorie, { titre: string; detail: string }> = {
  citadine: { titre: "Citadine 5 portes", detail: "diesel 1.5 · 2017" },
  compacte: { titre: "Compacte", detail: "essence 1.2 · 2019" },
  suv: { titre: "SUV compact", detail: "hybride · 2021" },
};

export const PRESTATIONS = [
  { id: "vidange", nom: "Vidange + filtre à huile", duree: "1\u00a0h", prix: { citadine: 89, compacte: 99, suv: 119 } },
  { id: "plaquettes", nom: "Plaquettes de frein avant", duree: "1\u00a0h\u00a030", prix: { citadine: 129, compacte: 139, suv: 169 } },
  { id: "revision", nom: "Révision complète", duree: "2\u00a0h\u00a030", prix: { citadine: 239, compacte: 259, suv: 299 } },
  { id: "pneus", nom: "Deux pneus avant, montés et équilibrés", duree: "45\u00a0min", prix: { citadine: 178, compacte: 218, suv: 298 } },
  { id: "clim", nom: "Recharge de climatisation", duree: "1\u00a0h", prix: { citadine: 79, compacte: 79, suv: 89 } },
] as const;

export const euros = (n: number) => `${n} € TTC`;

/**
 * La plaque, au format des immatriculations (AA-123-AA). « AB-123-CD » est le
 * format d'exemple officiel ; la démonstration lui associe une citadine, et répartit
 * les autres plaques entre trois profils. Rien n'est interrogé : tout reste ici.
 */
export const formaterPlaque = (brut: string) => {
  const c = brut.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
  return [c.slice(0, 2), c.slice(2, 5), c.slice(5, 7)].filter(Boolean).join("-");
};
export const plaqueComplete = (p: string) => /^[A-Z]{2}-\d{3}-[A-Z]{2}$/.test(p);
export const profilDe = (p: string): Categorie => {
  if (p === "AB-123-CD") return "citadine";
  const somme = [...p].reduce((t, c) => t + c.charCodeAt(0), 0);
  return (["citadine", "compacte", "suv"] as const)[somme % 3];
};

export const JOURS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
export const HEURES = ["8 h", "10 h", "14 h", "16 h"];
/** Les créneaux déjà pris : un exemple. Le samedi, l'atelier ferme à midi. */
export const PRIS = new Set(["Lundi-8 h", "Lundi-10 h", "Mardi-10 h", "Mardi-14 h", "Mercredi-8 h", "Jeudi-16 h", "Vendredi-8 h", "Vendredi-10 h", "Samedi-8 h", "Samedi-14 h", "Samedi-16 h"]);

export const questions = [
  { q: "Et si je préfère appeler ?", r: "Le téléphone reste là, et quelqu'un décroche à l'accueil de 7 h 30 à 9 h, puis de 17 h à 18 h 30. Mais tout ce qu'on te dirait au téléphone est déjà sur le site : le prix, le créneau, l'avancement." },
  { q: "Comment le site reconnaît ma voiture ?", r: "Sur un vrai site, la plaque interroge un service de données d'immatriculation, et ne sert qu'à trouver le modèle. Ici, c'est une démonstration : rien ne quitte ton téléphone, et le site choisit un exemple." },
  { q: "Le prix affiché, c'est le prix final ?", r: "C'est le prix TTC de la prestation, pièces et main-d'œuvre comprises, pour ton modèle. Si on trouve autre chose pendant la réparation, on t'envoie une photo et un devis : rien n'est fait sans ton accord." },
  { q: "Je peux déposer ma voiture la veille ?", r: "Oui : une boîte à clés est à côté de la porte de l'atelier. Tu laisses la clé dans l'enveloppe à ton nom, on commence à l'heure du créneau." },
  { q: "Comment je sais où en est ma voiture ?", r: "Par la page de suivi : déposée, au pont, terminée. Et si une question se pose, elle arrive avec une photo et deux boutons : oui, ou non." },
];
