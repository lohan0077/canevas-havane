// Les données de Sans Soupir, marque d'assistance informatique imaginaire (vidéo
// « Créer une marque — dépannage informatique »). Tout est inventé ; les prix sont des
// exemples, en HT et en TTC (arrêté du 17 mars 2015, art. 4).
//
// La règle du métier, tenue partout : seule l'assistance informatique à domicile
// (installation, maintenance des logiciels, cours) peut ouvrir droit au crédit
// d'impôt, si l'entreprise est déclarée services à la personne et que ces services
// restent son activité principale (C. trav., art. D7231-1 et L7232-1-2). Le dépannage,
// la réparation et l'aide à distance en sont exclus. L'avantage fiscal n'est jamais
// accolé à un prix. Aucune exclusivité : « on répète, sans soupirer » est une manière
// de faire, pas un titre.

export const DOSSIER = "/exemples/sans-soupir";

export const entreprise = {
  nom: "Sans Soupir",
  signature: "On répète. Sans soupirer.",
  ville: "Angers",
  adresse: "12 rue de l'Exemple, 49000 Angers",
  telephone: "01 99 00 81 36",
  telephoneLien: "+33199008136",
  declarationSap: "SAP000000000",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/fiches`, libelle: "Les fiches gratuites" },
  { href: `${DOSSIER}/cours-a-domicile`, libelle: "Cours à domicile" },
  { href: `${DOSSIER}/gouter-numerique`, libelle: "Le goûter numérique" },
];

export const photos = {
  pelote: { src: "/exemples/sans-soupir/pelote-jaune.webp", largeur: 1400, hauteur: 2100, alt: "Une pelote de laine jaune et un ouvrage au crochet commencé, posés sur un fauteuil" },
  lunettes: { src: "/exemples/sans-soupir/lunettes-cahier.webp", largeur: 1400, hauteur: 2097, alt: "Une paire de lunettes posée sur un cahier ouvert, un stylo à côté" },
  gouter: { src: "/exemples/sans-soupir/the-biscuits.webp", largeur: 1400, hauteur: 933, alt: "Deux tasses de thé et une assiette de biscuits sur un guéridon en marbre" },
};

export type FicheGuide = { numero: number; titre: string; theme: "Appels" | "Photos" | "Sécurité" | "Réglages"; etapes: string[]; aide: string };

/** Les fiches, gratuites, à imprimer. La n° 12 est celle du frigo, dans la vidéo. */
export const FICHES: FicheGuide[] = [
  { numero: 12, titre: "Appeler Léa en vidéo", theme: "Appels", etapes: ["Touche la bulle verte.", "Touche « Léa ».", "Touche la caméra. Souris !"], aide: "Bloqué ? Appelle-nous. On répète." },
  { numero: 9, titre: "Écrire plus gros sur la tablette", theme: "Réglages", etapes: ["Ouvre « Réglages », la roue grise.", "Touche « Affichage ».", "Glisse le curseur « Taille du texte » vers la droite."], aide: "Trop gros ? Glisse un peu vers la gauche." },
  { numero: 10, titre: "Envoyer une photo par message", theme: "Photos", etapes: ["Ouvre la conversation.", "Touche le petit appareil photo.", "Choisis la photo, puis la flèche bleue."], aide: "Elle est partie quand la flèche disparaît." },
  { numero: 11, titre: "Reconnaître un faux message", theme: "Sécurité", etapes: ["On te presse ? Méfiance.", "On te demande ta carte ? Jamais par message.", "Dans le doute, tu ne touches à rien et tu appelles."], aide: "Ta banque ne te demande jamais ton code." },
  { numero: 13, titre: "Ranger ses photos par année", theme: "Photos", etapes: ["Ouvre « Photos ».", "Touche « Albums », puis « + ».", "Nomme l'album : « 2026 ». Ajoute les photos."], aide: "Une année à la fois. Rien ne presse." },
  { numero: 14, titre: "Retrouver un mot de passe oublié", theme: "Sécurité", etapes: ["Touche « Mot de passe oublié ».", "Ouvre le message reçu.", "Choisis le nouveau, écris-le dans ton carnet."], aide: "Le carnet reste à la maison, pas dans le sac." },
  { numero: 15, titre: "Faire une mise à jour", theme: "Réglages", etapes: ["Branche la tablette.", "Ouvre « Réglages », puis « Mise à jour ».", "Touche « Installer » et laisse-la faire."], aide: "Elle peut s'éteindre et se rallumer : c'est normal." },
  { numero: 16, titre: "Payer en ligne sans stress", theme: "Sécurité", etapes: ["Un petit cadenas devant l'adresse.", "Un code reçu par SMS : c'est toi qui le tapes.", "Un doute ? Tu fermes, tu appelles."], aide: "Jamais de code donné au téléphone." },
];

export const COURS = [
  { titre: "Un cours chez toi", detail: "1 h 30, sur ton appareil, avec la fiche à garder", ht: 50 },
  { titre: "Le carnet de cinq cours", detail: "à ton rythme, valable un an", ht: 225 },
  { titre: "Installer un appareil neuf", detail: "2 h : on branche, on transfère, on t'explique", ht: 75 },
];

/** « 270 € » ou « 49,50 € » : espace insécable avant €. */
export const euros = (n: number) => {
  const [e, c] = (Math.round(n * 100) / 100).toFixed(2).split(".");
  return `${e.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}${c === "00" ? "" : "," + c} €`;
};

export const EXPLICATIONS = [
  "Pour appeler Léa en vidéo : tu touches la bulle verte, puis son nom, puis la petite caméra.",
  "Autrement dit : la bulle verte, c'est la porte. Le nom de Léa, c'est sa sonnette. La caméra, c'est pour qu'elle te voie.",
  "On le fait ensemble ? Ton doigt sur la bulle verte… voilà. Maintenant « Léa »… et la caméra. Elle décroche.",
];

export const GOUTER = {
  date: "samedi 14 novembre 2026",
  heure: "15\u00A0h\u00A0–\u00A017\u00A0h",
  lieu: "la médiathèque du quartier (exemple)",
};

export const QUESTIONS = [
  { question: "Vous allez vraiment répéter ?", reponse: "Autant de fois qu'il faut, pendant le cours. Et après, la fiche répète pour nous." },
  { question: "Le crédit d'impôt, c'est pour tout ?", reponse: "Non. Les cours, l'installation et la maintenance des logiciels chez toi peuvent y ouvrir droit, sous conditions. Le dépannage, la réparation et l'aide à distance, non." },
  { question: "Les fiches sont vraiment gratuites ?", reponse: "Oui, toutes, sans compte et sans adresse e-mail. Tu les imprimes, tu les colles où tu veux." },
  { question: "Et si je n'ai pas d'imprimante ?", reponse: "On t'apporte la fiche imprimée au prochain cours. Ou on l'imprime ensemble au goûter numérique." },
];
