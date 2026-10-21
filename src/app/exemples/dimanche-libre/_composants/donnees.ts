// Les données de Dimanche Libre, dépanneur et formateur informatique imaginaire (vidéo
// « Remplir l'agenda — dépannage informatique »). Tout est inventé ; les prix sont
// des exemples, en HT et en TTC (arrêté du 17 mars 2015, art. 4).
//
// La règle du métier, tenue partout : seule l'assistance informatique à domicile
// (installation, mise en service, maintenance des logiciels, initiation et formation)
// peut ouvrir droit au crédit d'impôt, si l'entreprise est déclarée services à la
// personne (C. trav., art. D7231-1, II, 11° ; CGI, art. 199 sexdecies). Le dépannage,
// la réparation de matériel, la vente et l'aide à distance en sont exclus (fiche DGE
// « Assistance informatique à domicile »). Le site ne colle donc jamais l'avantage
// fiscal à un prix, et jamais au dépannage. Aucune exclusivité (« le seul », « le
// premier », « n° 1 ») : elle ne se prouve pas.

export const DOSSIER = "/exemples/dimanche-libre";

export const entreprise = {
  nom: "Dimanche Libre",
  ville: "Dijon",
  zone: "Dijon et 20\u00A0km autour",
  adresse: "12 rue de l'Exemple, 21000 Dijon",
  telephone: "01 99 00 27 54",
  telephoneLien: "+33199002754",
  declarationSap: "SAP000000000",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/c-est-casse`, libelle: "C'est cassé" },
  { href: `${DOSSIER}/j-apprends`, libelle: "Je veux apprendre" },
  { href: `${DOSSIER}/credit-d-impot`, libelle: "Crédit d'impôt" },
];

export const photos = {
  tablette: { src: "/exemples/dimanche-libre/tablette-main.webp", largeur: 1400, hauteur: 935, alt: "Une main touche l'écran d'une tablette, manche de pull bleu à fleurs" },
  imprimante: { src: "/exemples/dimanche-libre/imprimante-parquet.webp", largeur: 1400, hauteur: 933, alt: "Une imprimante posée sur un parquet ensoleillé, deux photos et une feuille imprimée" },
  portable: { src: "/exemples/dimanche-libre/portable-table.webp", largeur: 1400, hauteur: 2100, alt: "Un ordinateur portable ouvert sur une table en bois, un carnet et un téléphone à côté" },
};

/** « 49 € » ou « 40,83 € » : virgule décimale, espace insécable avant €. */
export const euros = (n: number) => {
  const [e, c] = n.toFixed(2).split(".");
  return `${e.replace(/\B(?=(\d{3})+(?!\d))/g, " ")}${c === "00" ? "" : "," + c} €`;
};
/** Prix TTC → HT, TVA à 20 %. */
export const horsTaxe = (ttc: number) => Math.round((ttc / 1.2) * 100) / 100;

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

/** Les cours et l'installation chez toi : prix HT et TTC, à part de l'avantage fiscal. */
export const COURS = [
  {
    id: "video",
    titre: "Appeler la famille en vidéo",
    texte: "Ouvrir l'appli, trouver le bon contact, tenir la tablette pour qu'on te voie. On s'entraîne avec un vrai appel.",
    duree: "1 h 30",
    ht: 50,
    teinte: "#FFE8E1",
  },
  {
    id: "photos",
    titre: "Ranger ses photos",
    texte: "Un dossier par année, les doublons en moins, et les plus belles mises de côté pour les imprimer.",
    duree: "1 h 30",
    ht: 50,
    teinte: "#DDF6EC",
  },
  {
    id: "payer",
    titre: "Payer en ligne sans stress",
    texte: "Reconnaître un site sûr, le code reçu par SMS, et les trois signes d'un faux message. Sans jamais taper ta carte devant nous.",
    duree: "1 h 30",
    ht: 50,
    teinte: "#E9E2FA",
  },
  {
    id: "installer",
    titre: "Installer ton nouvel ordinateur",
    texte: "On le branche, on transfère tes fichiers, on règle les mises à jour, et on te montre où tout se trouve.",
    duree: "2 h",
    ht: 75,
    teinte: "#FFF1C9",
  },
];

/** Ce qui ouvre droit au crédit d'impôt, et ce qui n'y ouvre pas : la vraie réponse. */
export const SITUATIONS = [
  { question: "Mon ordinateur ne s'allume plus", reponse: false, pourquoi: "C'est du dépannage, ou une réparation de matériel : exclu du crédit d'impôt." },
  { question: "Un cours pour appeler mes petits-enfants", reponse: true, pourquoi: "C'est de l'initiation, chez toi : ça peut ouvrir droit au crédit d'impôt, sous conditions." },
  { question: "Installer mon imprimante neuve chez moi", reponse: true, pourquoi: "Installation et mise en service à domicile : possible, sous conditions." },
  { question: "De l'aide par téléphone", reponse: false, pourquoi: "L'assistance à distance est exclue, même pour un cours." },
  { question: "Mettre à jour mes logiciels chez moi", reponse: true, pourquoi: "Maintenance des logiciels à domicile : possible, sous conditions." },
  { question: "Remplacer l'écran cassé", reponse: false, pourquoi: "Réparation de matériel : exclue." },
];

export const QUESTIONS = [
  { question: "Le dépannage ouvre-t-il droit au crédit d'impôt ?", reponse: "Non. Le dépannage, la réparation de matériel et l'aide à distance en sont exclus. On préfère te le dire avant plutôt que sur la facture." },
  { question: "Et les cours ?", reponse: "Les cours, l'installation et la maintenance des logiciels chez toi peuvent y ouvrir droit, sous conditions : une entreprise déclarée services à la personne, une prestation à ta résidence, et un plafond de 3 000 € de dépenses par an et par foyer." },
  { question: "Vous venez le dimanche ?", reponse: "Non, justement : du lundi au samedi. Le dimanche, c'est pour la famille." },
  { question: "Tu tapes mes mots de passe à ma place ?", reponse: "Jamais. On t'apprend à les taper et à les garder. C'est ton ordinateur, ce sont tes codes." },
  { question: "Combien de temps dure un cours ?", reponse: "Une heure et demie, chez toi, avec une fiche qu'on te laisse pour refaire seul." },
];
