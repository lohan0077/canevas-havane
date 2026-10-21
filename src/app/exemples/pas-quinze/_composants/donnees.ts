// Les données du site Pas Quinze, torréfacteur imaginaire de la vidéo « Si je devais
// remplir le carnet de commandes d'un torréfacteur ». On part de la cafetière du
// client, pas des origines : une question, une mouture, deux cafés. Pas quinze.
// Café seulement (loi Évin : ni bière ni spiritueux). Aucune allégation de santé :
// on parle de goût et de moments, jamais d'effet. Cafés, prix et dates d'exemple.

export const DOSSIER = "/exemples/pas-quinze";

export const brulerie = {
  telephone: "01 99 00 27 45",
  adresse: "12 rue de l'Exemple",
  horaires: [
    { jours: "Mardi", heures: "Torréfaction · boutique fermée" },
    { jours: "Mercredi – samedi", heures: "9 h – 19 h" },
    { jours: "Dimanche et lundi", heures: "Fermé" },
  ],
};

export type CleCafe = "bresil" | "ethiopie" | "colombie" | "guatemala" | "inde" | "perou";
export type Cafe = { nom: string; enClair: string; phrase: string; prix250: number; teinte: string };

export const CAFES: Record<CleCafe, Cafe> = {
  bresil: { nom: "Brésil", enClair: "rond, noisette", phrase: "Le café qui plaît à toute la table. Peu d'acidité, un goût de noisette grillée.", prix250: 9, teinte: "#8A5A35" },
  ethiopie: { nom: "Éthiopie", enClair: "plus vif, fruité", phrase: "Plus léger, plus vif. Un goût de fruit qu'on remarque dès la première gorgée.", prix250: 10.5, teinte: "#C2532E" },
  colombie: { nom: "Colombie", enClair: "doux, caramel", phrase: "Sucré sans sucre. Le plus facile à aimer en filtre.", prix250: 9.5, teinte: "#B07A3B" },
  guatemala: { nom: "Guatemala", enClair: "épais, chocolat", phrase: "Un café qui a du corps, fait pour être infusé longtemps.", prix250: 10, teinte: "#5C3A21" },
  inde: { nom: "Inde", enClair: "corsé, cacao", phrase: "Pour un expresso court et serré, avec une belle mousse.", prix250: 9, teinte: "#3B2418" },
  perou: { nom: "Pérou", enClair: "léger, agrumes", phrase: "Le plus clair de la gamme. À boire sans rien ajouter.", prix250: 9.5, teinte: "#D08A3C" },
};

export type CleMethode = "filtre" | "piston" | "expresso" | "italienne";
export type Methode = { libelle: string; pour: string; mouture: string; finesse: number; cafes: [CleCafe, CleCafe]; conseil: string };

/** Pour chaque cafetière : la mouture, et les deux cafés faits pour elle. */
export const METHODES: Record<CleMethode, Methode> = {
  filtre: { libelle: "Filtre", pour: "ta cafetière filtre", mouture: "moyenne", finesse: 2, cafes: ["colombie", "perou"], conseil: "Comme du sable. Trop fin, l'eau passe mal ; trop gros, elle passe trop vite." },
  piston: { libelle: "Piston", pour: "ta cafetière à piston", mouture: "grossière", finesse: 3, cafes: ["guatemala", "bresil"], conseil: "Comme du gros sel. Quatre minutes d'infusion, puis on presse doucement." },
  expresso: { libelle: "Expresso", pour: "ta machine à expresso", mouture: "fine", finesse: 0, cafes: ["inde", "bresil"], conseil: "Presque de la farine. Le mieux reste de moudre juste avant, si tu as un moulin." },
  italienne: { libelle: "Italienne", pour: "ta cafetière italienne", mouture: "moyenne-fine", finesse: 1, cafes: ["bresil", "ethiopie"], conseil: "Un peu plus fine qu'en filtre. On ne tasse pas le café dans le panier." },
};

export const ORDRE_METHODES: CleMethode[] = ["filtre", "piston", "expresso", "italienne"];
export const FINESSES = ["fine", "moyenne-fine", "moyenne", "grossière"];

/** L'abonnement réglé en tasses : 7 g par tasse (repère d'exemple), et un envoi qui
 * arrive avant que le paquet soit vide. */
export const GRAMMES_PAR_TASSE = 7;
export const abonnementPour = (tasses: number) => {
  const poids = tasses <= 1 ? 250 : tasses <= 3 ? 500 : 1000;
  const semaines = Math.floor(poids / (tasses * GRAMMES_PAR_TASSE * 7));
  const prix = poids === 250 ? 9 : poids === 500 ? 17 : 32;
  return { poids, semaines, prix, libelle: poids === 1000 ? "1 kg" : `${poids} g` };
};

export const euros = (n: number) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" }).replace(/\u202f/g, "\u00a0");

export const QUESTIONS = [
  { q: "Café en grain ou moulu ?", r: "En grain si tu as un moulin : tu mouds juste avant, et c'est meilleur. Sinon, moulu pour ta cafetière, le jour de la torréfaction. Tu nous dis laquelle, on règle la mouture." },
  { q: "Pourquoi seulement deux cafés par cafetière ?", r: "Parce que quinze origines, c'est quinze questions. On a goûté chaque café dans chaque cafetière, et on garde les deux qui y sont les meilleurs." },
  { q: "C'est quoi, « torréfié mardi » ?", r: "Le jour où ton café a été torréfié, écrit en gros sur le sachet. On torréfie le mardi, on envoie et on vend à partir du mercredi." },
  { q: "Comment marche l'abonnement ?", r: "Tu dis combien de tasses tu bois par jour, on calcule le paquet et le rythme pour qu'il arrive avant que le précédent soit vide. Tu changes le rythme, tu suspends ou tu arrêtes quand tu veux, en ligne." },
  { q: "Vous faites du décaféiné ?", r: "Pas encore. On préfère deux cafés qu'on maîtrise à un troisième qu'on ferait à moitié." },
];

export const photos = {
  italienne: { src: "/exemples/pas-quinze/italienne.webp", largeur: 1200, hauteur: 800, alt: "Une cafetière italienne en aluminium posée sur un fond jaune vif" },
  filtre: { src: "/exemples/pas-quinze/filtre.webp", largeur: 1200, hauteur: 1800, alt: "De l'eau versée en filet sur du café moulu, dans un filtre en papier" },
  refroidissement: { src: "/exemples/pas-quinze/refroidissement.webp", largeur: 1400, hauteur: 791, alt: "Des grains de café qui refroidissent, brassés par les bras d'acier du torréfacteur, vus de dessus" },
  tasses: { src: "/exemples/pas-quinze/trois-tasses.webp", largeur: 1200, hauteur: 1800, alt: "Trois tasses blanches alignées sur une table en bois : un café au lait, un café, des grains" },
};
