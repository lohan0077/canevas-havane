// Les données du site Celui-Là, fromagerie imaginaire de la vidéo « Si je devais
// remplir le carnet de commandes d'un fromager ». On ne vend pas cent cinquante
// fromages : on vend la réponse à la question des invités — « il vient d'où,
// celui-là ? ». Fromages, producteurs, distances et prix sont inventés, et marqués
// « exemple ».
//
// Règles tenues (voir SOURCES.md de la vidéo) : le traitement du lait est dit pour
// chaque fromage (décret n° 2007-628, art. 14 et 20) ; une origine fermière n'est
// affichée que pour un fromage fait avec le lait de l'exploitation (art. 9-1) — ici,
// des exemples ; le mot « fermier » n'est pas employé ; aucune appellation (AOP)
// n'est attribuée à la boutique ; retrait en boutique seulement (rien sur
// l'expédition, dont les règles n'ont pas été lues) ; allergènes (le lait) indiqués
// avant la commande (règlement (UE) n° 1169/2011, art. 14 § 2 et 44).

export const DOSSIER = "/exemples/celui-la";

export const boutique = {
  telephone: "01 99 00 83 21",
  adresse: "12 rue de l'Exemple",
  horaires: [
    { jours: "Mardi – vendredi", heures: "9 h 30 – 13 h · 16 h – 19 h 30" },
    { jours: "Samedi", heures: "8 h 30 – 19 h 30" },
    { jours: "Dimanche", heures: "9 h – 13 h" },
  ],
};

export type Fromage = {
  numero: number;
  nom: string;
  quiLaFait: string;
  dOu: string;
  lait: string;
  phrase: string;
  teinte: string;
  forme: "meule" | "buche" | "pyramide" | "carre" | "rond";
};

export const FROMAGES: Fromage[] = [
  { numero: 1, nom: "Grande tomme de vache", quiLaFait: "Bastien, avec le lait de ses vaches", dOu: "Sa ferme, à 45 km de la boutique", lait: "Cru, de vache", phrase: "« Dix-huit mois en cave. Il est plus vieux que la nappe. »", teinte: "#E3B23C", forme: "meule" },
  { numero: 2, nom: "Petit chèvre frais", quiLaFait: "La laiterie de Sarah et Jean, avec le lait de quatre élevages voisins", dOu: "Leur laiterie, à 20 km de la boutique", lait: "Pasteurisé, de chèvre", phrase: "« Il a été fait mardi. On ne peut pas faire plus frais. »", teinte: "#F6F1E4", forme: "buche" },
  { numero: 3, nom: "Tomme de chèvre", quiLaFait: "Madeleine, avec le lait de ses chèvres", dOu: "Sa ferme, à 30 km de la boutique", lait: "Cru, de chèvre", phrase: "« Madeleine connaît ses chèvres par leur prénom. »", teinte: "#EADFC4", forme: "meule" },
  { numero: 4, nom: "Bleu de brebis", quiLaFait: "Lucie, avec le lait de ses brebis", dOu: "Sa bergerie, à 60 km de la boutique", lait: "Cru, de brebis", phrase: "« Le bleu, ce sont des moisissures qu'on invite exprès. »", teinte: "#DCE3E6", forme: "rond" },
  { numero: 5, nom: "Coulommiers", quiLaFait: "La laiterie de Sarah et Jean", dOu: "Leur laiterie, à 20 km de la boutique", lait: "Thermisé, de vache", phrase: "« Sorti du frigo une heure avant. Sinon, il boude. »", teinte: "#F4EAD5", forme: "rond" },
  { numero: 6, nom: "Carré à croûte lavée", quiLaFait: "Hugo, avec le lait de ses vaches", dOu: "Sa ferme, à 70 km de la boutique", lait: "Cru, de vache", phrase: "« Il sent plus fort qu'il n'a de goût. Goûte avant de juger. »", teinte: "#D98A3D", forme: "carre" },
];

export const fromage = (n: number) => FROMAGES.find((f) => f.numero === n)!;

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

/** Le lait et les allergènes d'un plateau, à lire avant la commande. */
export const laitsDe = (fromages: Fromage[]) => fromages.map((f) => `${f.nom} : lait ${f.lait.toLowerCase()}`);

export const euros = (n: number) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" }).replace(/\u202f/g, "\u00a0");

export const RETRAITS = ["Vendredi · 17 h", "Samedi · 10 h", "Samedi · 17 h"];

// Les pages par occasion : ce que les gens tapent (« plateau de fromage pour 10
// personnes », suggestions Google relevées le 15/10/2026, voir SOURCES.md).
export const OCCASIONS = [
  { slug: "pour-6-personnes", titre: "Plateau de fromage pour 6 personnes", personnes: 6, chapo: "Un dîner entre amis : quatre fromages, un de chaque lait ou presque, et de quoi en reprendre." },
  { slug: "pour-10-personnes", titre: "Plateau de fromage pour 10 personnes", personnes: 10, chapo: "Une grande tablée : cinq fromages, du plus doux au plus fort, 1,2 kg en tout." },
  { slug: "pour-20-personnes", titre: "Plateau de fromage pour 20 personnes", personnes: 20, chapo: "Un anniversaire, un pot de départ : les six fromages de la boutique, en deux plateaux." },
  { slug: "pour-un-mariage", titre: "Plateau de fromage pour un mariage", personnes: 30, chapo: "Pour un mariage, on compose sur rendez-vous : on part de six fromages et de 120 g par invité, et on ajuste avec vous." },
];

export const QUESTIONS = [
  { q: "Combien de fromage par personne ?", r: "On compte 120 g par personne pour un plateau servi en fin de repas. Pour un apéritif dînatoire ou un buffet, dis-le-nous : on prévoit davantage." },
  { q: "Je commande quand ?", r: "Deux jours avant au moins. Commandé jeudi, ton plateau est prêt samedi matin." },
  { q: "Vous livrez ?", r: "Non : les plateaux se retirent à la boutique, découpés et présentés, avec leurs cartes." },
  { q: "Et si un invité ne mange pas de lait cru ?", r: "Le lait de chaque fromage est écrit sur sa carte et avant la commande. On remplace un fromage au lait cru par un autre, au lait pasteurisé ou thermisé." },
  { q: "C'est quoi, la carte ?", r: "Une carte par fromage, posée sur le plateau : qui le fait, d'où il vient, son lait, et une phrase à dire à table quand quelqu'un demande « il vient d'où, celui-là ? »." },
];

export const photos = {
  plateau: { src: "/exemples/celui-la/plateau.webp", largeur: 1400, hauteur: 933, alt: "Un plateau en bois : quatre fromages, du raisin, des crackers et de la pâte de coing" },
  morceaux: { src: "/exemples/celui-la/morceaux.webp", largeur: 1400, hauteur: 1867, alt: "Des morceaux de fromages à croûte naturelle posés sur du papier, vus de dessus" },
  bleu: { src: "/exemples/celui-la/bleu.webp", largeur: 1200, hauteur: 800, alt: "Une part de fromage bleu posée sur une planche" },
  chevre: { src: "/exemples/celui-la/chevre.webp", largeur: 1200, hauteur: 805, alt: "Une chèvre blanche aux oreilles tombantes, dans l'herbe, d'autres chèvres derrière" },
};
