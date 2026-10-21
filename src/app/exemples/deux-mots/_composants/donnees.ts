// Les données du site Deux Mots : un fleuriste imaginaire qui ne vend pas des bouquets
// nommés « Tendresse », mais la phrase sur la carte. Les bouquets, les prix, l'heure
// limite et la zone de livraison sont des exemples.

export const DOSSIER = "/exemples/deux-mots";

export const boutique = {
  nom: "Deux Mots",
  telephone: "01 99 00 63 45",
  telephoneLien: "+33199006345",
  adresse: ["Deux Mots, fleuriste", "12 rue de l'Exemple", "00000 Exemple-Ville"],
  horaires: [
    { jours: "Du mardi au samedi", heures: "9 h – 19 h" },
    { jours: "Livraisons", heures: "de 10 h à 19 h" },
  ],
  heureLimite: "14 h",
  livraison: 6,
};

export const NAVIGATION = [
  { href: `${DOSSIER}#choix`, libelle: "Le bouquet" },
  { href: `${DOSSIER}/la-carte`, libelle: "La carte" },
  { href: `${DOSSIER}/livraison`, libelle: "Livraison" },
  { href: `${DOSSIER}#questions`, libelle: "Questions" },
];

export const euros = (n: number) =>
  n.toLocaleString("fr-FR", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).replace(/ | /g, " ") + " €";

export type Photo = { src: string; alt: string; largeur: number; hauteur: number };

export const PHOTOS: Record<"blanc" | "jaune" | "rose", Photo> = {
  blanc: { src: "/exemples/deux-mots/bouquet-blanc.webp", alt: "Un bouquet de renoncules blanches tenu à deux mains", largeur: 900, hauteur: 1350 },
  jaune: { src: "/exemples/deux-mots/bouquet-jaune.webp", alt: "Un bouquet de fleurs jaunes sur un fond noir", largeur: 900, hauteur: 1200 },
  rose: { src: "/exemples/deux-mots/bouquet-rose.webp", alt: "Un bouquet de roses roses et de petites fleurs, emballé dans du papier clair", largeur: 900, hauteur: 1200 },
};

export type Message = { id: string; dire: string; bouquet: string; couleur: keyof typeof PHOTOS; detail: string; prix: number; phrases: string[] };

export const MESSAGES: Message[] = [
  {
    id: "merci",
    dire: "Merci",
    bouquet: "Le bouquet jaune",
    couleur: "jaune",
    detail: "Des fleurs jaunes et blanches, selon l'arrivage du jour.",
    prix: 39,
    phrases: ["Merci. Vraiment.", "Sans toi, je n'y serais pas arrivé.", "Merci pour tout, et pour le reste."],
  },
  {
    id: "bravo",
    dire: "Bravo",
    bouquet: "Le bouquet soleil",
    couleur: "jaune",
    detail: "Un bouquet jaune, haut et généreux.",
    prix: 45,
    phrases: ["Bravo. Je savais que tu y arriverais.", "Tu l'as fait. Je suis fier de toi.", "Ce n'était pas de la chance."],
  },
  {
    id: "pense",
    dire: "Je pense à toi",
    bouquet: "Le bouquet blanc",
    couleur: "blanc",
    detail: "Des fleurs blanches et du feuillage, tout en douceur.",
    prix: 42,
    phrases: ["Je pense à toi. Même quand je ne le dis pas.", "Je suis là, si tu veux.", "Un bouquet, juste pour te dire que je pense à toi."],
  },
  {
    id: "pardon",
    dire: "Pardon",
    bouquet: "Le bouquet blanc",
    couleur: "blanc",
    detail: "Des renoncules blanches, sans un mot de trop.",
    prix: 45,
    phrases: ["Pardon pour hier. Tu avais raison.", "J'ai eu tort. Je t'invite à dîner ?", "Je suis désolé. Vraiment."],
  },
  {
    id: "anniversaire",
    dire: "Joyeux anniversaire",
    bouquet: "Le bouquet rose",
    couleur: "rose",
    detail: "Des roses et des petites fleurs des champs.",
    prix: 49,
    phrases: ["Joyeux anniversaire. Encore cent comme ça.", "Tu ne fais pas ton âge. Et je sais lequel.", "Un an de plus, et toujours le même sourire."],
  },
  {
    id: "aime",
    dire: "Je t'aime",
    bouquet: "Le bouquet rose foncé",
    couleur: "rose",
    detail: "Des roses, beaucoup de roses.",
    prix: 55,
    phrases: ["Je t'aime. C'est tout.", "Encore toi. Toujours toi.", "Rien à ajouter."],
  },
];

/** La page « La carte » : ce que les gens cherchent — « message bouquet de fleur amour,
 * anniversaire, amitié » (suggestions Google, 15/10/2026) —, des phrases toutes prêtes. */
export const CARTES: { occasion: string; phrases: string[] }[] = [
  { occasion: "Pour dire je t'aime", phrases: ["Je t'aime. C'est tout.", "Encore toi. Toujours toi.", "Je t'aurais bien écrit un poème. Voilà des fleurs."] },
  { occasion: "Pour un anniversaire", phrases: ["Joyeux anniversaire. Encore cent comme ça.", "Tu ne fais pas ton âge. Et je sais lequel.", "Bon anniversaire à la personne qui m'a appris à souffler les bougies."] },
  { occasion: "Pour un ami, une amie", phrases: ["Pour rien. Juste parce que tu es là.", "Tu me manques. On se voit quand ?", "Merci d'être toi, depuis toutes ces années."] },
  { occasion: "Pour dire merci", phrases: ["Merci. Vraiment.", "Sans toi, je n'y serais pas arrivé.", "Merci pour le dîner, et pour tout le reste."] },
  { occasion: "Pour se faire pardonner", phrases: ["Pardon pour hier. Tu avais raison.", "J'ai eu tort. Je t'invite à dîner ?", "Je ne recommencerai pas. (J'essaierai.)"] },
];

export const ETAPES = [
  { titre: "Tu dis ce que tu veux dire", texte: "Merci, bravo, pardon… Une question, pas quarante vignettes." },
  { titre: "On te propose le bouquet et la phrase", texte: "La phrase est écrite à la main sur la carte. Tu la changes si tu veux." },
  { titre: "Tu signes", texte: "Avant 14 h, c'est livré aujourd'hui, dans la ville. Après, demain matin." },
];

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  {
    q: "Qui écrit la carte ?",
    r: "Nous, à la main, à l'encre, avec la phrase que tu as choisie ou écrite. Tu signes en ligne, on recopie ta signature en toutes lettres.",
  },
  {
    q: "Commandé avant 14 h, c'est vraiment livré aujourd'hui ?",
    r: "Oui, du mardi au samedi, dans la zone de livraison. C'est une promesse : si on ne peut pas la tenir un jour (un vélo en panne, une tempête), le site le dit dès le matin, avant que tu commandes.",
  },
  {
    q: "Je peux écrire ma propre phrase ?",
    r: "Bien sûr. Les phrases proposées sont là pour aider, pas pour remplacer les tiennes. La carte tient environ 120 signes.",
  },
  {
    q: "Et si je ne sais pas quoi dire du tout ?",
    r: "Appelle-nous. On en a écrit des milliers, on trouvera les tiennes en deux minutes.",
  },
  {
    q: "Les bouquets ressemblent aux photos ?",
    r: "Dans l'esprit et la couleur, oui. Les fleurs exactes dépendent de l'arrivage du jour : on te le dit au téléphone si tu veux savoir.",
  },
];
