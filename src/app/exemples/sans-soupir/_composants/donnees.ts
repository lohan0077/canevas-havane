// Les données de Sans Soupir, l'informaticien à domicile imaginé pour les deux vidéos
// du dépannage informatique : « Créer une marque » (on répète, sans soupirer ; les
// fiches du frigo, gratuites, à imprimer ; le goûter numérique) et « Remplir l'agenda »
// (deux portes sur l'accueil, le dépannage à prix clair, la vraie réponse sur le crédit
// d'impôt, des cours qui donnent envie, le dimanche où personne ne t'appelle plus pour
// l'imprimante). Tout est inventé ; les prix sont des exemples, en HT et en TTC
// (arrêté du 17 mars 2015, art. 4).
//
// La règle du métier, tenue partout : seule l'assistance informatique à domicile
// (installation, mise en service, maintenance des logiciels, initiation et formation)
// peut ouvrir droit au crédit d'impôt, si l'entreprise est déclarée services à la
// personne et que ces services restent son activité principale (C. trav., art.
// D7231-1, II, 11°, L7232-1-2 et D7233-5 ; CGI, art. 199 sexdecies). Le dépannage, la
// réparation de matériel, la vente et l'aide à distance en sont exclus (fiche DGE
// « Assistance informatique à domicile »). L'avantage fiscal n'est jamais collé à un
// prix, et jamais au dépannage. Aucune exclusivité : « on répète, sans soupirer » est
// une manière de faire, pas un titre.

export const DOSSIER = "/exemples/sans-soupir";

export const entreprise = {
  nom: "Sans Soupir",
  signature: "On répète. Sans soupirer.",
  ville: "Angers",
  zone: "Angers et 20 km autour",
  adresse: "12 rue de l'Exemple, 49000 Angers",
  telephone: "01 99 00 81 36",
  telephoneLien: "+33199008136",
  horaires: "Du lundi au samedi, de 9 h à 19 h. Le dimanche, c'est pour la famille.",
  declarationSap: "SAP000000000",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/fiches`, libelle: "Les fiches gratuites" },
  { href: `${DOSSIER}/cours-a-domicile`, libelle: "Les cours" },
  { href: `${DOSSIER}/c-est-casse`, libelle: "C'est cassé" },
  { href: `${DOSSIER}/credit-d-impot`, libelle: "Crédit d'impôt" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };
const P = DOSSIER;
export const photos = {
  pelote: { src: `${P}/pelote-jaune.webp`, largeur: 1400, hauteur: 2100, alt: "Une pelote de laine jaune et un ouvrage au crochet commencé, posés sur un fauteuil" },
  lunettes: { src: `${P}/lunettes-cahier.webp`, largeur: 1400, hauteur: 2097, alt: "Une paire de lunettes posée sur un cahier ouvert, un stylo à côté" },
  gouter: { src: `${P}/the-biscuits.webp`, largeur: 1400, hauteur: 933, alt: "Deux tasses de thé et une assiette de biscuits sur un guéridon en marbre" },
  tablette: { src: `${P}/tablette-main.webp`, largeur: 1400, hauteur: 935, alt: "Une main touche l'écran d'une tablette, manche de pull bleu à fleurs" },
  imprimante: { src: `${P}/imprimante-parquet.webp`, largeur: 1400, hauteur: 933, alt: "Une imprimante posée sur un parquet ensoleillé, deux photos et une feuille imprimée" },
  portable: { src: `${P}/portable-table.webp`, largeur: 1400, hauteur: 2100, alt: "Un ordinateur portable ouvert sur une table en bois, un carnet et un téléphone à côté" },
} satisfies Record<string, Photo>;

/** « 270 € » ou « 49,50 € » : virgule décimale, espace insécable avant €. */
export const euros = (n: number) => {
  const [e, c] = (Math.round(n * 100) / 100).toFixed(2).split(".");
  return `${e.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}${c === "00" ? "" : "," + c} €`;
};
/** Prix TTC → HT, TVA à 20 %. */
export const horsTaxe = (ttc: number) => Math.round((ttc / 1.2) * 100) / 100;

/* ---------- Les fiches du frigo ---------- */

export type FicheGuide = { numero: number; titre: string; theme: "Appels" | "Photos" | "Sécurité" | "Réglages"; etapes: string[]; aide: string };

/** Les fiches, gratuites, à imprimer. La n° 12 est celle du frigo, dans la vidéo. */
export const FICHES: FicheGuide[] = [
  { numero: 12, titre: "Appeler Léa en vidéo", theme: "Appels", etapes: ["Touche la bulle verte.", "Touche « Léa ».", "Touche la caméra. Souris !"], aide: "Bloqué ? Appelle-nous. On répète." },
  { numero: 9, titre: "Écrire plus gros sur la tablette", theme: "Réglages", etapes: ["Ouvre « Réglages », la roue grise.", "Touche « Affichage ».", "Glisse le curseur « Taille du texte » vers la droite."], aide: "Trop gros ? Glisse un peu vers la gauche." },
  { numero: 10, titre: "Envoyer une photo par message", theme: "Photos", etapes: ["Ouvre la conversation.", "Touche le petit appareil photo.", "Choisis la photo, puis la flèche bleue."], aide: "Elle est partie quand la flèche disparaît." },
  { numero: 11, titre: "Reconnaître un faux message", theme: "Sécurité", etapes: ["On te presse ? Méfiance.", "On te demande ta carte ? Jamais par message.", "Dans le doute, tu ne touches à rien et tu appelles."], aide: "Ta banque ne te demande jamais ton code." },
  { numero: 13, titre: "Ranger ses photos par année", theme: "Photos", etapes: ["Ouvre « Photos ».", "Touche « Albums », puis « + ».", "Nomme l'album : « 2026 ». Ajoute les photos."], aide: "Une année à la fois. Rien ne presse." },
  { numero: 14, titre: "Retrouver un mot de passe oublié", theme: "Sécurité", etapes: ["Touche « Mot de passe oublié ».", "Ouvre le message reçu.", "Choisis le nouveau, écris-le dans ton carnet."], aide: "Le carnet reste à la maison, pas dans le sac." },
  { numero: 15, titre: "Faire une mise à jour", theme: "Réglages", etapes: ["Branche la tablette.", "Ouvre « Réglages », puis « Mise à jour ».", "Touche « Installer » et laisse-la faire."], aide: "Elle peut s'éteindre et se rallumer : c'est normal." },
  { numero: 16, titre: "Payer en ligne sans stress", theme: "Sécurité", etapes: ["Un petit cadenas devant l'adresse.", "Un code reçu par SMS : c'est toi qui le tapes.", "Un doute ? Tu fermes, tu appelles."], aide: "Jamais de code donné au téléphone." },
];

/** Trois façons d'expliquer la même chose. */
export const EXPLICATIONS = [
  "Pour appeler Léa en vidéo : tu touches la bulle verte, puis son nom, puis la petite caméra.",
  "Autrement dit : la bulle verte, c'est la porte. Le nom de Léa, c'est sa sonnette. La caméra, c'est pour qu'elle te voie.",
  "On le fait ensemble ? Ton doigt sur la bulle verte… voilà. Maintenant « Léa »… et la caméra. Elle décroche.",
];

/* ---------- Porte 2 : les cours, chez toi ---------- */

/** Les cours qui donnent envie : prix HT et TTC, à part de l'avantage fiscal. */
export const COURS = [
  { id: "video", titre: "Appeler la famille en vidéo", texte: "Ouvrir l'appli, trouver le bon contact, tenir la tablette pour qu'on te voie. On s'entraîne avec un vrai appel.", duree: "1 h 30", ht: 50, teinte: "#FFE8E1" },
  { id: "photos", titre: "Ranger ses photos", texte: "Un dossier par année, les doublons en moins, et les plus belles mises de côté pour les imprimer.", duree: "1 h 30", ht: 50, teinte: "#DDF6EC" },
  { id: "payer", titre: "Payer en ligne sans stress", texte: "Reconnaître un site sûr, le code reçu par SMS, et les trois signes d'un faux message. Sans jamais taper ta carte devant nous.", duree: "1 h 30", ht: 50, teinte: "#E9E2FA" },
  { id: "installer", titre: "Installer ton nouvel ordinateur", texte: "On le branche, on transfère tes fichiers, on règle les mises à jour, et on te montre où tout se trouve.", duree: "2 h", ht: 75, teinte: "#FFF1C9" },
];

export const FORMULES = [
  { titre: "Un cours chez toi", detail: "1 h 30, sur ton appareil, avec la fiche à garder", ht: 50 },
  { titre: "Le carnet de cinq cours", detail: "à ton rythme, valable un an", ht: 225 },
  { titre: "Installer un appareil neuf", detail: "2 h : on branche, on transfère, on t'explique", ht: 75 },
];

/* ---------- Porte 1 : le dépannage, prix clair ---------- */

/** Le dépannage : prix clair, TTC, sans crédit d'impôt. */
export const DEPANNAGE = {
  deplacement: 49,
  demiHeure: 39,
  forfaits: [
    { titre: "Ordinateur lent ou virus", detail: "nettoyage, mises à jour, une heure environ", prix: 89 },
    { titre: "Imprimante qui ne veut plus", detail: "pilote, réseau, cartouches, un test d'impression", prix: 59 },
    { titre: "Box et wifi", detail: "connexion, mot de passe, portée dans la maison", prix: 59 },
  ],
};

/** Ce qui ouvre droit au crédit d'impôt, et ce qui n'y ouvre pas : la vraie réponse. */
export const SITUATIONS = [
  { question: "Mon ordinateur ne s'allume plus", reponse: false, pourquoi: "C'est du dépannage, ou une réparation de matériel : exclu du crédit d'impôt." },
  { question: "Un cours pour appeler mes petits-enfants", reponse: true, pourquoi: "C'est de l'initiation, chez toi : ça peut ouvrir droit au crédit d'impôt, sous conditions." },
  { question: "Installer mon imprimante neuve chez moi", reponse: true, pourquoi: "Installation et mise en service à domicile : possible, sous conditions." },
  { question: "De l'aide par téléphone", reponse: false, pourquoi: "L'assistance à distance est exclue, même pour un cours." },
  { question: "Mettre à jour mes logiciels chez moi", reponse: true, pourquoi: "Maintenance des logiciels à domicile : possible, sous conditions." },
  { question: "Remplacer l'écran cassé", reponse: false, pourquoi: "Réparation de matériel : exclue." },
];

/* ---------- Le goûter numérique ---------- */

export const GOUTER = {
  date: "samedi 14 novembre 2026",
  heure: "15 h – 17 h",
  lieu: "la médiathèque du quartier (exemple)",
};

export const QUESTIONS = [
  { question: "Vous allez vraiment répéter ?", reponse: "Autant de fois qu'il faut, pendant le cours. Et après, la fiche répète pour nous." },
  { question: "Le dépannage ouvre-t-il droit au crédit d'impôt ?", reponse: "Non. Le dépannage, la réparation de matériel et l'aide à distance en sont exclus. On préfère te le dire avant plutôt que sur la facture." },
  { question: "Et les cours ?", reponse: "Les cours, l'installation et la maintenance des logiciels chez toi peuvent y ouvrir droit, sous conditions : une entreprise déclarée services à la personne dont c'est l'activité principale, une prestation à ta résidence, et un plafond de 3 000 € de dépenses par an et par foyer." },
  { question: "Les fiches sont vraiment gratuites ?", reponse: "Oui, toutes, sans compte et sans adresse e-mail. Tu les imprimes, tu les colles où tu veux. Pas d'imprimante ? On te l'apporte au prochain cours." },
  { question: "Vous venez le dimanche ?", reponse: "Non, justement : du lundi au samedi. Le dimanche, c'est pour la famille — et plus pour l'imprimante." },
  { question: "Tu tapes mes mots de passe à ma place ?", reponse: "Jamais. On t'apprend à les taper et à les garder. C'est ton ordinateur, ce sont tes codes." },
];
