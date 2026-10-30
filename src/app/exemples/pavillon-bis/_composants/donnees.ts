// Tout ce qu'affiche le site de Pavillon Bis, agence d'architecture fictive filmée dans
// les deux vidéos des architectes :
//   - « Créer une marque » : le nom, uniquement les pavillons des années 70, tu choisis
//     ta maison (plain-pied, sur sous-sol, à étage) et tu vois ce qu'on a fait de la
//     même ; le lotissement où tous les voisins voient la leur ; samedi, le n° 14 ;
//   - « Remplir l'agenda » (ancien site Atelier Samedi) : architecte ou pas ? — le calcul
//     sur l'accueil, le seuil de 150 m² ; une page par projet, avec le budget ; un samedi
//     matin par mois, trente minutes, les vrais créneaux en ligne.
// Chaque projet, chaque budget, chaque maison du lotissement est un exemple.
//
// La règle de droit appliquée par le calcul (code de l'urbanisme, R431-2 et R*421-14 ;
// loi n° 77-2 du 3 janvier 1977, art. 3 et 4), lue sur Légifrance le 15 et le 16/10/2026 :
//   - un particulier qui construit pour lui-même est dispensé d'architecte tant que la
//     surface de plancher de l'ensemble ne dépasse pas 150 m² ;
//   - la dispense tombe quand un PERMIS DE CONSTRUIRE fait passer l'ensemble au-delà ;
//   - sur une maison existante, jusqu'à 20 m² créés, une déclaration préalable suffit
//     (40 m² en zone urbaine d'un PLU, sauf si l'ensemble dépasse alors 150 m²) : pas de
//     permis, donc pas d'architecte imposé, même au-delà de 150 m² au total ;
//   - d'où : architecte obligatoire si plus de 20 m² sont créés ET si le total dépasse
//     150 m² ; une société (SCI comprise) n'a pas la dispense : le site le dit.
// Code de déontologie des architectes (version du 01/07/2026) : publicité autorisée
// (art. 10 bis) ; ni dénigrement ni sous-évaluation trompeuse (art. 18) — les trente
// minutes du samedi ont un prix ; rémunération annoncée avant tout engagement (art. 46).
// Vie privée (C. civ., art. 9) : la visite du n° 14 et les avant / après se font avec
// l'accord des propriétaires, et le site le dit. Prix TTC marqués « exemple » (arrêté du
// 3 décembre 1987, art. 1).

export const DOSSIER = "/exemples/pavillon-bis";

export const agence = {
  nom: "Pavillon Bis",
  signature: "Ta maison, deuxième version.",
  metier: "Architecture des pavillons des années 70",
  adresse: "12 rue de l'Exemple, 00000 Ville-Exemple",
  telephone: "01 99 00 96 14",
  prixSamedi: "40 € TTC",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#outil`, libelle: "Architecte ou pas ?" },
  { href: `${DOSSIER}#maisons`, libelle: "Les maisons" },
  { href: `${DOSSIER}/visite-du-14`, libelle: "Le n° 14" },
  { href: `${DOSSIER}/rendez-vous`, libelle: "Le samedi" },
];

/* ---------- Les photos ----------
   Unsplash (licence Unsplash), servies depuis notre domaine ; crédits dans les mentions
   légales. Aucun visage, aucune adresse reconnaissable. */
export type Photo = { src: string; alt: string };
const P = DOSSIER;
export const photos = {
  lotissement: { src: `${P}/lotissement.webp`, alt: "Un lotissement vu d'avion au soleil couchant : des rangées de maisons identiques aux toits de tuiles" },
  sousSol: { src: `${P}/sous-sol-sejour.webp`, alt: "Un séjour aménagé en demi-sous-sol, lambris de bois, canapé et fauteuil, une petite fenêtre haute" },
  salon: { src: `${P}/salon-annees-70.webp`, alt: "Un salon aux couleurs chaudes : canapé vert, coussins ocre, fauteuils en bois, lampe arc" },
  jardin: { src: `${P}/fenetre-jardin.webp`, alt: "Un jardin vert vu à travers une grande fenêtre à petits bois noirs" },
  lumiere: { src: `${P}/puits-de-lumiere.webp`, alt: "Une salle à manger longue et blanche, éclairée par un grand puits de lumière" },
  maquette: { src: `${P}/maquette.webp`, alt: "Une maquette blanche de maison, posée sur un fond gris clair" },
  croquis: { src: `${P}/croquis.webp`, alt: "Un croquis au crayon sur un carnet, avec une règle et une gomme" },
} satisfies Record<string, Photo>;

/* ---------- Architecte ou pas ? ---------- */

export const SEUIL = 150;
export const DECLARATION = 20;

export type Verdict = "aucune" | "declaration" | "obligatoire" | "libre";
export function verdict(maison: number, ajout: number): Verdict {
  if (ajout <= 0) return "aucune";
  if (ajout <= DECLARATION) return "declaration";
  return maison + ajout > SEUIL ? "obligatoire" : "libre";
}

export const APPORTS = ["La lumière, pensée avant les murs", "Le dossier d'autorisation, monté", "Le chantier, suivi chaque semaine"];

export const LOI = [
  { titre: "Jusqu'à 150 m² au total", texte: "Un particulier qui construit pour lui-même peut se passer d'architecte, tant que la surface de plancher de l'ensemble ne dépasse pas 150 m²." },
  { titre: "Au-delà, avec permis", texte: "Si le projet fait passer l'ensemble au-delà de 150 m² et demande un permis de construire, l'architecte devient obligatoire." },
  { titre: "Une petite extension", texte: "Jusqu'à 20 m² créés (40 m² en zone urbaine d'un PLU, si le total reste sous 150 m²), une déclaration préalable suffit : pas d'architecte imposé." },
  { titre: "Une société, une SCI", texte: "Elle n'a pas la dispense : dès qu'il faut un permis de construire, il faut un architecte." },
];

/* ---------- Les trois maisons, et ce qu'on a fait de chacune ---------- */

export type Modele = "plain" | "sous-sol" | "etage";

export type Projet = {
  slug: string;
  modele: Modele;
  nom: string;            // le modèle de maison
  annee: number;
  titre: string;          // le titre de la page, tel qu'on le tape sur Google
  court: string;
  existant: number;       // surface de plancher avant, en m²
  cree: number;           // surface de plancher créée
  avant: string;
  apres: string;
  budget: string;
  duree: string;
  autorisation: string;
  architecteObligatoire: boolean;
  resume: string;
  detail: string[];
  etapes: { quoi: string; quand: string }[];
  postes: { poste: string; montant: string }[];
  honoraires: string;
};

export const PROJETS: Projet[] = [
  {
    slug: "extension-1974",
    modele: "plain",
    nom: "Plain-pied",
    annee: 1974,
    titre: "Extension 40\u00a0m², maison de 1974",
    court: "Extension de 40 m²",
    existant: 120,
    cree: 40,
    avant: "120 m² de plain-pied, couloir central, cuisine fermée",
    apres: "Un séjour de 40 m² en bois, plein sud, ouvert sur le jardin",
    budget: "85 000 € TTC",
    duree: "7 mois",
    autorisation: "Permis compris",
    architecteObligatoire: true,
    resume:
      "Un séjour ouvert sur le jardin, plein sud, accolé à un plain-pied de 1974. 120 m² + 40 m² : 160 m² au total, avec permis de construire. L'architecte était obligatoire ; il a surtout déplacé la cuisine.",
    detail: ["Le couloir disparaît : on entre dans la pièce de vie", "Une extension en bois de 40 m², à toit plat, côté jardin", "La cuisine déménage, ouverte sur le séjour"],
    etapes: [
      { quoi: "Esquisse et chiffrage", quand: "3 semaines" },
      { quoi: "Dossier de permis de construire", quand: "1 mois" },
      { quoi: "Instruction du permis par la mairie", quand: "2 mois" },
      { quoi: "Consultation des entreprises", quand: "1 mois" },
      { quoi: "Chantier", quand: "3 mois" },
    ],
    postes: [
      { poste: "Gros œuvre et fondations", montant: "31 000 €" },
      { poste: "Menuiseries et baie vitrée", montant: "17 500 €" },
      { poste: "Charpente, toiture, isolation", montant: "16 000 €" },
      { poste: "Électricité, chauffage, finitions", montant: "20 500 €" },
    ],
    honoraires: "mission complète au forfait, 9 800 € TTC, fixé avant la mission (exemple).",
  },
  {
    slug: "sous-sol-1976",
    modele: "sous-sol",
    nom: "Sur sous-sol",
    annee: 1976,
    titre: "Sous-sol devenu séjour, maison de 1976",
    court: "Le garage devient le séjour",
    existant: 95,
    cree: 38,
    avant: "95 m², garage en bas",
    apres: "Le sous-sol devient le séjour, ouvert sur le jardin",
    budget: "96 000 € TTC",
    duree: "8 mois",
    autorisation: "Déclaration préalable",
    architecteObligatoire: false,
    resume:
      "Le n° 14 des Tilleuls, un pavillon de 1976 sur sous-sol. Le garage de 38 m² devient le séjour, de plain-pied avec le jardin, dans le volume existant et en zone urbaine d'un PLU : 133 m² au total, une déclaration préalable a suffi. L'architecte n'était pas obligatoire ; les propriétaires voulaient la lumière.",
    detail: ["Le garage devient le séjour, de plain-pied avec le jardin", "La porte de garage laisse place à une grande baie", "L'escalier intérieur relie enfin les deux niveaux"],
    etapes: [
      { quoi: "Relevé et esquisse", quand: "1 mois" },
      { quoi: "Déclaration préalable", quand: "1 mois d'instruction" },
      { quoi: "Consultation des entreprises", quand: "1 mois" },
      { quoi: "Chantier", quand: "5 mois" },
    ],
    postes: [
      { poste: "Ouverture de la façade, baie vitrée", montant: "26 000 €" },
      { poste: "Isolation, sol, chauffage", montant: "24 500 €" },
      { poste: "Escalier intérieur", montant: "14 500 €" },
      { poste: "Électricité, plomberie, finitions", montant: "31 000 €" },
    ],
    honoraires: "mission de conception et de suivi au forfait, 8 400 € TTC (exemple).",
  },
  {
    slug: "facade-1978",
    modele: "etage",
    nom: "À étage",
    annee: 1978,
    titre: "Façade isolée, maison de 1978",
    court: "Une nouvelle peau, en bois",
    existant: 110,
    cree: 0,
    avant: "110 m², chambres sous un toit mal isolé",
    apres: "Isolée par l'extérieur : une façade en bois, deux grandes fenêtres à l'étage",
    budget: "84 000 € TTC",
    duree: "5 mois",
    autorisation: "Déclaration préalable",
    architecteObligatoire: false,
    resume:
      "Une maison à étage de 1978, froide l'hiver, brûlante l'été. Isolée par l'extérieur, habillée de bois, deux fenêtres agrandies plein sud. Aucun mètre carré créé : une déclaration préalable pour la façade, et pas d'architecte imposé.",
    detail: ["Isolation par l'extérieur, façade en bardage bois", "Deux fenêtres agrandies à l'étage, plein sud", "La salle de bains descend au rez-de-chaussée"],
    etapes: [
      { quoi: "Diagnostic thermique et esquisse", quand: "1 mois" },
      { quoi: "Déclaration préalable", quand: "1 mois d'instruction" },
      { quoi: "Chantier", quand: "3 mois" },
    ],
    postes: [
      { poste: "Isolation par l'extérieur, bardage bois", montant: "46 000 €" },
      { poste: "Fenêtres agrandies, menuiseries", montant: "21 000 €" },
      { poste: "Salle de bains au rez-de-chaussée", montant: "17 000 €" },
    ],
    honoraires: "mission de conception et de suivi au forfait, 7 200 € TTC (exemple).",
  },
];

export const projetDe = (m: Modele) => PROJETS.find((p) => p.modele === m)!;

export const TRANSFORMATIONS = [
  { titre: "Ouvrir le sous-sol", texte: "Le garage du bas devient la pièce de vie, de plain-pied avec le jardin." },
  { titre: "Isoler par l'extérieur", texte: "Une nouvelle peau, et la maison change de visage sans perdre un mètre carré." },
  { titre: "Agrandir de plain-pied", texte: "Une extension en bois côté jardin, là où la maison n'avait qu'une porte-fenêtre." },
  { titre: "Retrouver la lumière", texte: "Des fenêtres agrandies, un couloir supprimé, une cuisine ouverte." },
];

export const ETAPES = [
  { titre: "Trente minutes, un samedi", texte: "Ta maison, ton terrain, ton budget. On te dit si le projet tient, et ce qu'il demande." },
  { titre: "On te montre sa jumelle", texte: "Ta maison existe à des milliers d'exemplaires : on te montre ce qu'on a fait d'une maison identique." },
  { titre: "La deuxième version, dessinée", texte: "Deux pistes chiffrées, et l'autorisation qu'il faut : déclaration préalable ou permis de construire." },
  { titre: "Le chantier, suivi", texte: "Les entreprises consultées, les travaux suivis chaque semaine, la maison habitée le plus longtemps possible." },
];

/* ---------- Le lotissement et la visite du n° 14 (exemples) ---------- */

export const LOTISSEMENT = { nom: "Lotissement des Tilleuls", annee: 1976, maisons: 36, colonnes: 6, transformee: 14 };

export const VISITE = {
  date: "Samedi 14 novembre 2026",
  heures: "de 10 h à 13 h",
  creneaux: [
    { libelle: "10 h 00", sous: "petit groupe" },
    { libelle: "10 h 30", sous: "petit groupe", pris: true },
    { libelle: "11 h 00", sous: "petit groupe" },
    { libelle: "11 h 30", sous: "petit groupe" },
    { libelle: "12 h 00", sous: "petit groupe", pris: true },
    { libelle: "12 h 30", sous: "petit groupe" },
  ],
};

/* ---------- Le samedi : trente minutes, un samedi matin par mois ---------- */

export const SAMEDIS = [
  { id: "7-novembre", libelle: "Samedi 7 novembre", court: "7 nov." },
  { id: "5-decembre", libelle: "Samedi 5 décembre", court: "5 déc." },
];
export const HEURES = ["9 h 00", "9 h 30", "10 h 00", "10 h 30", "11 h 00", "11 h 30"];
/** Créneaux déjà pris, par samedi (exemple). */
export const PRIS: Record<string, string[]> = {
  "7-novembre": ["9 h 00", "10 h 30", "11 h 00"],
  "5-decembre": ["10 h 00"],
};

export const HONORAIRES = [
  ["Trente minutes, un samedi matin", "40 € TTC", "déduits si tu nous confies la mission"],
  ["Visite et diagnostic chez toi", "180 € TTC", "une heure, avec un relevé"],
  ["Esquisse, deux pistes chiffrées", "1 400 € TTC", "avant de choisir"],
  ["Mission complète, extension de 40 m²", "9 800 € TTC", "au forfait, fixé avant la mission"],
];

/** Ce que les gens tapent déjà (suggestions Google relevées le 15/10/2026). */
export const RECHERCHES = [
  "maison année 70 architecte",
  "architecte ou pas",
  "maison année 70 avant après",
  "rénovation maison année 70 sur sous-sol",
  "architecte extension maison prix",
  "maison année 70 plain-pied",
];

export const QUESTIONS = [
  {
    q: "Faut-il un architecte pour transformer mon pavillon ?",
    r: "Pas toujours. Pour un particulier qui construit pour lui-même, l'architecte devient obligatoire quand un permis de construire porte la surface de plancher de l'ensemble au-delà de 150 m². Le calcul de l'accueil donne une première réponse ; ton PLU, l'emprise au sol ou un secteur protégé peuvent changer la donne.",
  },
  {
    q: "Et si je construis avec une SCI ?",
    r: "La dispense jusqu'à 150 m² vaut pour un particulier qui construit pour lui-même. Une société, SCI comprise, ne l'a pas : dès qu'il faut un permis de construire, l'architecte est obligatoire.",
  },
  {
    q: "Les avant / après sont-ils de vraies maisons ?",
    r: "Sur ce site de démonstration, ce sont des exemples dessinés. Sur un vrai site, chaque avant / après est publié avec l'accord écrit des propriétaires, sans adresse ni photo qui permette de les reconnaître.",
  },
  {
    q: "Les trente minutes du samedi sont-elles gratuites ?",
    r: "Non : elles coûtent 40 € TTC (exemple), déduits si tu nous confies ensuite une mission. C'est le prix d'un vrai premier avis.",
  },
  {
    q: "Qui peut venir voir le n° 14 ?",
    r: "Les voisins du lotissement, et tous ceux qui ont la même maison. Les propriétaires ont accepté d'ouvrir leur porte un samedi matin ; on visite par petits groupes, et on respecte les pièces qu'ils gardent fermées.",
  },
  {
    q: "Comment êtes-vous rémunérés ?",
    r: "Au forfait, fixé avant le début de la mission, ou selon la mission. Avant tout engagement, nous te communiquons les modalités de notre rémunération ; elles figurent au contrat.",
  },
];
