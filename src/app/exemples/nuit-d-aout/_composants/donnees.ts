// Les données du site Nuit d'Août, installateur de climatisation imaginé dans la vidéo
// « Si je devais remplir le carnet de chantiers d'un installateur de clim ». On ne vend
// pas une clim : on vend la première nuit où l'on dort, en plein mois d'août.
//
// Règles tenues (voir SOURCES.md de la vidéo) :
// - la clim sert à rafraîchir : le site ne parle pas de chauffer (démarchage et lien
//   France Rénov' non tranchés pour une clim réversible vendue pour se chauffer) ;
// - le délai affiché est le délai réel, mis à jour chaque lundi, jamais gonflé
//   (C. consom., art. L121-2) — ici, des exemples ;
// - fourchettes TTC, pose comprise, « exemple » ; le prix ferme vient au devis, après
//   la visite technique (arrêté du 3 décembre 1987, art. 1) ;
// - l'attestation de capacité de l'entreprise est affichée, avec sa date de validité
//   (C. env., art. R543-78 et R543-99) : numéro d'exemple ;
// - pas de démarchage : le client vient par le site.

export const DOSSIER = "/exemples/nuit-d-aout";

export const NAVIGATION = [
  { href: `${DOSSIER}/ma-maison`, libelle: "Ma maison" },
  { href: `${DOSSIER}/ma-date`, libelle: "Ma date de pose" },
  { href: `${DOSSIER}#attestation`, libelle: "L'attestation" },
];

export const entreprise = {
  telephone: "01 99 00 08 15",
  adresse: "12 rue de l'Exemple, Ta Ville",
  attestation: "00 000 000",
  validite: "30 juin 2029",
};

export const DELAI = { valeur: "9 jours", majLe: "lundi 12 octobre" };

export const HISTORIQUE = [
  { mois: "Avril", valeur: "9 jours", hauteur: 0.22 },
  { mois: "Mai", valeur: "2 semaines", hauteur: 0.38 },
  { mois: "Juin", valeur: "5 semaines", hauteur: 0.86 },
  { mois: "Juillet", valeur: "6 semaines", hauteur: 1 },
  { mois: "Octobre", valeur: "9 jours", hauteur: 0.22, maintenant: true },
];

export const photos = {
  chambre: { src: "/exemples/nuit-d-aout/chambre-nuit.webp", largeur: 1400, hauteur: 2488, alt: "Un lit dans une chambre plongée dans la pénombre, la lumière du soir à la fenêtre" },
  draps: { src: "/exemples/nuit-d-aout/draps-bleus.webp", largeur: 1100, hauteur: 1648, alt: "Des draps bleu nuit, froissés, dans le noir" },
  oreiller: { src: "/exemples/nuit-d-aout/oreiller-matin.webp", largeur: 1100, hauteur: 1650, alt: "Un oreiller blanc rayé par la lumière d'un store, au matin" },
  toits: { src: "/exemples/nuit-d-aout/toits-soir.webp", largeur: 1200, hauteur: 675, alt: "Des toits et leurs cheminées en silhouette sur un ciel d'été orangé" },
};

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

export const COMPRIS = [
  "La visite technique chez toi",
  "L'unité extérieure et les unités intérieures",
  "Les liaisons et leur raccordement, par un technicien titulaire de l'attestation de capacité",
  "La mise en service et les essais",
  "Le réglage avec toi, pièce par pièce",
];

export const ENGAGEMENTS = [
  { titre: "On n'appelle personne", texte: "Pas de démarchage. Tu viens par le site, ou par un voisin." },
  { titre: "Un délai vrai", texte: "Celui qu'on affiche est celui qu'on tient. Mis à jour chaque lundi, jamais gonflé." },
  { titre: "La fourchette d'abord", texte: "Avant de venir, tu sais l'ordre de grandeur. Le prix ferme est sur le devis." },
];

export const FAQ = [
  { q: "Le délai en haut du site, il est vrai\u00A0?", r: "Oui\u00A0: c'est le délai de pose de la semaine, mis à jour chaque lundi. S'il était gonflé pour te presser, ce serait mentir. Ici, c'est un exemple." },
  { q: "Quelle puissance pour ma chambre\u00A0?", r: "Le technicien la calcule à la visite\u00A0: surface, exposition, isolation, nombre de fenêtres. La fourchette du site suffit pour commencer." },
  { q: "Combien de temps dure une pose\u00A0?", r: "Une journée pour une ou deux unités, en général. La date est écrite sur le devis." },
  { q: "Faut-il une autorisation pour l'unité extérieure\u00A0?", r: "Selon ton logement, l'accord de la copropriété ou une déclaration en mairie peuvent être nécessaires. On te le dit à la visite technique." },
  { q: "Pourquoi afficher l'attestation de capacité\u00A0?", r: "Parce que poser et mettre en service une clim split demande un opérateur qui la détient. C'est vérifiable\u00A0: on la montre, avec sa date de validité." },
];

export const CRENEAUX_POSE = [
  { libelle: "Mar. 27", sous: "octobre" },
  { libelle: "Mer. 28", sous: "octobre" },
  { libelle: "Jeu. 29", sous: "octobre", pris: true },
  { libelle: "Ven. 30", sous: "octobre", pris: true },
  { libelle: "Lun. 2", sous: "novembre" },
  { libelle: "Mar. 3", sous: "novembre" },
];

export const euros = (n: number) => `${String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;
