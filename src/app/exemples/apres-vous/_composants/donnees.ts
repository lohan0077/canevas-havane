// Les contenus du site Après Vous, entreprise fictive : horaires, prix, ancienneté et
// numéros sont des exemples. Aucun agent n'est nommé ni montré : le site parle de
// « l'équipe du soir · 2 agents » (voir Videos/marque-nettoyage-b2b/SOURCES.md).

export const DOSSIER = "/exemples/apres-vous";

export const entreprise = {
  nom: "Après Vous",
  signature: "On arrive quand vous partez.",
  // Tranche réservée par l'ARCEP aux œuvres de fiction : ce numéro ne sonne chez personne.
  telephone: "01 99 00 74 19",
  siret: "000 000 000 00000",
  equipe: "L'équipe du soir · 2 agents",
  ensemble: 6, // années ensemble chez nous (exemple)
};

export const NAVIGATION = [
  { href: `${DOSSIER}/l-equipe-du-soir`, libelle: "L'équipe du soir" },
  { href: `${DOSSIER}/un-bureau-la-nuit`, libelle: "Un bureau, la nuit" },
  { href: `${DOSSIER}#prix`, libelle: "Prix" },
];

export const photos = {
  interrupteur: { src: "/exemples/apres-vous/interrupteur-dans-l-ombre.webp", largeur: 1400, hauteur: 933, alt: "Un interrupteur blanc sur un mur gris, à la limite de l'ombre et de la lumière" },
  vitre: { src: "/exemples/apres-vous/bureaux-derriere-la-vitre.webp", largeur: 1400, hauteur: 944, alt: "Des bureaux vides derrière une grande vitre, le soir, où se reflète la ville" },
  nuit: { src: "/exemples/apres-vous/bureau-a-la-nuit.webp", largeur: 1000, hauteur: 1250, alt: "Un bureau dans la pénombre, une lampe allumée, une fenêtre sur l'immeuble d'en face" },
  lampe: { src: "/exemples/apres-vous/lampe-orange.webp", largeur: 900, hauteur: 1350, alt: "Une lampe de bureau allumée, sa lumière orangée sur un mur clair" },
};

export const SOIR = [
  { heure: 0, quoi: "Vous partez", detail: "La dernière lumière s'éteint. Rien ne se passe pendant que vous êtes là." },
  { heure: 30, quoi: "On arrive", detail: "Badge, alarme, et la même équipe que la veille." },
  { heure: 40, quoi: "Les bureaux", detail: "Corbeilles, plans de travail, sols, poignées. Les papiers restent où vous les avez laissés." },
  { heure: 85, quoi: "Les sanitaires et la cuisine", detail: "Nettoyés, désinfectés, consommables complétés." },
  { heure: 110, quoi: "Le petit mot", detail: "Posé sur le bureau de l'accueil : l'heure du passage, ce qu'on a remarqué." },
  { heure: 120, quoi: "On repart", detail: "Lumières éteintes, alarme remise, clés à leur place." },
];

export const PRESTATIONS = [
  { titre: "Les bureaux", texte: "Corbeilles, plans de travail dégagés, sols, poignées et interrupteurs. On ne touche ni aux papiers ni aux écrans." },
  { titre: "Les sanitaires", texte: "Nettoyés et désinfectés à chaque passage, consommables complétés." },
  { titre: "La cuisine", texte: "Évier, plans, micro-ondes ; le réfrigérateur vidé le vendredi, avec votre accord." },
  { titre: "Les vitres intérieures", texte: "Une fois par mois, ou plus, en option." },
];

export const PRIX = [
  { taille: "Jusqu'à 150 m²", passages: "2 soirs par semaine", prix: "290 €" },
  { taille: "Jusqu'à 400 m²", passages: "3 soirs par semaine", prix: "780 €" },
  { taille: "Au-delà", passages: "sur mesure", prix: "Sur devis" },
];

export const QUESTIONS = [
  {
    q: "« Vous ne nous verrez jamais », c'est vrai ?",
    r: "Oui : tous nos contrats sont du soir, après votre départ. Si quelqu'un reste tard, on commence par les autres pièces et on revient à la sienne quand elle est vide.",
  },
  {
    q: "Qui sont les agents ?",
    r: "Une équipe de deux, toujours la même chez vous. On ne publie ni leurs noms ni leurs visages : sur ce site comme dans le petit mot, c'est « l'équipe du soir ».",
  },
  {
    q: "Et nos clés ?",
    r: "Un jeu de clés ou de badges par équipe, rangé au dépôt dans une armoire fermée, sans votre adresse dessus. Remis le premier soir, rendu le dernier.",
  },
  {
    q: "Vos prix sont HT ?",
    r: "Oui : nos clients sont des entreprises, nos prix sont hors taxes, TVA à 20 % en sus. Ce sont des exemples ; le prix ferme vient au devis, après une visite.",
  },
  {
    q: "Vous filmez nos bureaux pour vos vidéos ?",
    r: "Non. La série « Un bureau, la nuit » est tournée dans nos propres locaux, sans document, écran ni nom visible.",
  },
];
