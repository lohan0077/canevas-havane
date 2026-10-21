// Les contenus du site Chaise Pleine, cabinet de recrutement imaginé dans la vidéo
// « Si je devais remplir l'agenda d'un cabinet de recrutement ». Il parle d'abord au
// dirigeant qui doit recruter. Prix HT (clients professionnels), exemples. Aucune
// donnée de candidat, aucun nom de recrue ni d'entreprise cliente. Placement gratuit
// pour les candidats (Code du travail, art. L.5321-3).

export const DOSSIER = "/exemples/chaise-pleine";

export const entreprise = {
  nom: "Chaise Pleine",
  // Tranche que l'ARCEP réserve aux œuvres de fiction.
  telephone: "01 99 00 64 05",
  telephoneLien: "+33199006405",
  adresse: "12 rue de l'Exemple",
  ville: "Ville-d'Exemple",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#chaise`, libelle: "Ma chaise vide" },
  { href: `${DOSSIER}/honoraires`, libelle: "Honoraires" },
  { href: `${DOSSIER}#methode`, libelle: "Méthode" },
  { href: `${DOSSIER}/candidats`, libelle: "Candidats" },
];

export const photos = {
  chaiseOrange: { src: "/exemples/chaise-pleine/chaise-mur-orange.webp", largeur: 1200, hauteur: 800, alt: "Une chaise de bureau noire, vide, devant un mur de carrelage orange" },
  chaiseRouge: { src: "/exemples/chaise-pleine/chaise-rouge.webp", largeur: 1000, hauteur: 695, alt: "Une chaise pivotante rouge, vide, sur un sol de béton" },
  atelier: { src: "/exemples/chaise-pleine/atelier.webp", largeur: 1200, hauteur: 675, alt: "Un atelier de production à contre-jour, les machines dans la lumière des verrières" },
};

/** Durée légale du travail à temps complet : 35 heures par semaine (C. trav., art. L.3121-27). */
export const HEURES_SEMAINE = 35;

export const CRENEAUX = [
  { jour: "Lundi", heure: "8 h 30", pris: true },
  { jour: "Mardi", heure: "9 h" },
  { jour: "Mardi", heure: "13 h 30" },
  { jour: "Jeudi", heure: "8 h" },
  { jour: "Jeudi", heure: "17 h 40", pris: true },
  { jour: "Vendredi", heure: "12 h 40" },
];

/* ---------- Honoraires : des exemples, ligne par ligne, HT ---------- */

export type Ligne = { quoi: string; detail: string; montant: number };
export type Poste = { id: string; intitule: string; contexte: string; lignes: Ligne[] };

export const POSTES: Poste[] = [
  {
    id: "chef-atelier",
    intitule: "Chef d'atelier",
    contexte: "PME industrielle, 40 salariés, encadrement d'une équipe de huit",
    lignes: [
      { quoi: "Définition du poste", detail: "Vingt minutes au téléphone, puis une fiche de poste relue avec toi", montant: 600 },
      { quoi: "Annonce et diffusion", detail: "Rédaction, publication sur les sites d'emploi du secteur", montant: 900 },
      { quoi: "Tri des CV et préqualification", detail: "Lecture de chaque candidature, appel des plus proches", montant: 1500 },
      { quoi: "Entretiens", detail: "Deux tours, dont un sur place, dans l'atelier", montant: 2400 },
      { quoi: "Prise de références", detail: "Avec l'accord écrit de chaque candidat", montant: 600 },
      { quoi: "Suivi de la période d'essai", detail: "Un point à un mois, un à trois mois ; nouvelle recherche si départ pendant l'essai", montant: 900 },
    ],
  },
  {
    id: "comptable",
    intitule: "Comptable",
    contexte: "Entreprise de services, 25 salariés, poste unique au service financier",
    lignes: [
      { quoi: "Définition du poste", detail: "Vingt minutes au téléphone, puis une fiche de poste relue avec toi", montant: 600 },
      { quoi: "Annonce et diffusion", detail: "Rédaction, publication sur les sites d'emploi du secteur", montant: 700 },
      { quoi: "Tri des CV et préqualification", detail: "Lecture de chaque candidature, appel des plus proches", montant: 1200 },
      { quoi: "Entretiens", detail: "Deux tours, dont un avec un cas pratique", montant: 1800 },
      { quoi: "Prise de références", detail: "Avec l'accord écrit de chaque candidat", montant: 500 },
      { quoi: "Suivi de la période d'essai", detail: "Un point à un mois, un à trois mois ; nouvelle recherche si départ pendant l'essai", montant: 700 },
    ],
  },
  {
    id: "technicien",
    intitule: "Technicien de maintenance",
    contexte: "Site de production, travail en équipes, astreintes",
    lignes: [
      { quoi: "Définition du poste", detail: "Vingt minutes au téléphone, puis une fiche de poste relue avec toi", montant: 600 },
      { quoi: "Annonce et approche directe", detail: "Annonce, et approche de profils qui ne cherchent pas activement", montant: 1400 },
      { quoi: "Tri des CV et préqualification", detail: "Lecture de chaque candidature, appel des plus proches", montant: 1300 },
      { quoi: "Entretiens", detail: "Deux tours, dont un technique sur le site", montant: 2000 },
      { quoi: "Prise de références", detail: "Avec l'accord écrit de chaque candidat", montant: 500 },
      { quoi: "Suivi de la période d'essai", detail: "Un point à un mois, un à trois mois ; nouvelle recherche si départ pendant l'essai", montant: 800 },
    ],
  },
];

export const total = (p: Poste) => p.lignes.reduce((s, l) => s + l.montant, 0);
export const euros = (n: number) => `${n.toLocaleString("fr-FR").replace(/ /g, " ")} €`;

export const METHODE = [
  { titre: "Vingt minutes", texte: "Pour définir le poste avec toi : ce qu'il faut savoir faire, ce qui fera partir quelqu'un, le salaire réel." },
  { titre: "Les honoraires, écrits", texte: "Un forfait, ligne par ligne, signé avant de commencer. Pas de pourcentage découvert à la fin." },
  { titre: "La recherche", texte: "Annonce, approche directe, tri, entretiens. Tu reçois un point chaque semaine, même quand il n'y a rien." },
  { titre: "Trois candidats", texte: "Présentés avec leur accord, chacun avec ce qui nous a convaincus et ce qui nous a fait hésiter." },
  { titre: "La période d'essai", texte: "On appelle à un mois et à trois mois. Si la personne part pendant l'essai, on relance la recherche." },
];

export const FAQ = [
  { q: "Combien coûte un cabinet de recrutement ?", r: "Ça dépend du poste. Plutôt que « nous consulter », on montre des exemples chiffrés ligne par ligne, en HT, sur la page Honoraires." },
  { q: "Forfait ou pourcentage du salaire ?", r: "Forfait. Il est écrit et signé avant de commencer ; il ne bouge pas si le salaire négocié monte." },
  { q: "Combien de temps pour recruter ?", r: "On ne promet pas de délai : ça dépend du poste et du marché. On te dit chaque semaine où on en est." },
  { q: "Les candidats paient quelque chose ?", r: "Non. Le placement est gratuit pour les candidats : aucun frais ne peut leur être demandé pour leur trouver un poste (Code du travail, art. L.5321-3)." },
  { q: "Vous publiez les noms de vos clients ?", r: "Non. Ni les noms des entreprises, ni ceux des personnes recrutées. Ce qui se passe chez toi reste chez toi." },
];
