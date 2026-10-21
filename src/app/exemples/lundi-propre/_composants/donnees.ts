// Les contenus du site Lundi Propre, entreprise fictive : rapports, horaires, prix et
// numéros sont des exemples. Les règles respectées sont datées dans
// Videos/agenda-nettoyage-b2b/SOURCES.md.

export const DOSSIER = "/exemples/lundi-propre";

export const entreprise = {
  nom: "Lundi Propre",
  // Tranche réservée par l'ARCEP aux œuvres de fiction : ce numéro ne sonne chez personne.
  telephone: "01 99 00 52 64",
  zone: "Exemple-Ville et sa métropole",
  siret: "000 000 000 00000",
  equipe: "Équipe du soir · 2 agents",
};

export const NAVIGATION = [
  { href: `${DOSSIER}/rapport-de-passage`, libelle: "Le rapport du soir" },
  { href: `${DOSSIER}/tarifs`, libelle: "Nos prix" },
  { href: `${DOSSIER}#preuves`, libelle: "Nos preuves" },
];

export type Ligne = { titre: string; detail: string };
export type Remarque = { titre: string; lieu: string; heure: string; detail: string };
export type Soir = { id: string; jour: string; arrivee: string; depart: string; bureaux: number; remarques: Remarque[] };

/** Une semaine de rapports, d'exemple. Le rapport dit ce qui a été fait, pas qui l'a fait. */
export const SOIRS: Soir[] = [
  { id: "lundi", jour: "Lundi", arrivee: "19 h 35", depart: "21 h 00", bureaux: 14, remarques: [
    { titre: "Ampoule grillée", lieu: "Accueil", heure: "20 h 02", detail: "Le plafonnier de gauche. Rien de dangereux : à remplacer par votre mainteneur." },
  ] },
  { id: "mardi", jour: "Mardi", arrivee: "19 h 40", depart: "21 h 05", bureaux: 14, remarques: [
    { titre: "Store bloqué", lieu: "Salle 3", heure: "20 h 18", detail: "Lame coincée en position basse. Laissé tel quel : à voir par votre mainteneur." },
    { titre: "Fuite sous l'évier", lieu: "Cuisine", heure: "20 h 41", detail: "Goutte-à-goutte au siphon. Seau posé dessous, robinet d'arrêt fermé." },
  ] },
  { id: "mercredi", jour: "Mercredi", arrivee: "19 h 45", depart: "21 h 10", bureaux: 14, remarques: [] },
  { id: "jeudi", jour: "Jeudi", arrivee: "19 h 40", depart: "21 h 15", bureaux: 14, remarques: [
    { titre: "Fenêtre restée ouverte", lieu: "Bureau 7", heure: "20 h 30", detail: "Fermée par l'équipe. Rien d'autre à signaler dans le bureau." },
  ] },
  { id: "vendredi", jour: "Vendredi", arrivee: "18 h 50", depart: "20 h 40", bureaux: 14, remarques: [] },
];

export function lignes(s: Soir): Ligne[] {
  return [
    { titre: `Arrivée ${s.arrivee} · départ ${s.depart}`, detail: `Entrée et sortie badgées ; alarme remise à ${s.depart}.` },
    { titre: `${s.bureaux} bureaux`, detail: "Corbeilles vidées, plans de travail dépoussiérés, sols aspirés, poignées essuyées." },
    { titre: "Sanitaires", detail: "Deux blocs nettoyés et désinfectés, consommables complétés." },
    { titre: "Poubelles et tri", detail: "Sacs changés, tri sélectif descendu au local, bacs rincés le vendredi." },
  ];
}

export const SURFACES = [150, 300, 600, 1000];
export const PASSAGES = [1, 2, 3, 5];

/** Le prix mensuel d'exemple, HT : la surface, les passages par semaine, un tarif dégressif au m². */
export function prixMensuel(surface: number, passages: number): number {
  const tarif = surface <= 150 ? 0.2 : surface <= 300 ? 0.177 : surface <= 600 ? 0.155 : 0.14;
  return Math.max(180, Math.round((surface * passages * (52 / 12) * tarif) / 10) * 10);
}

export const euros = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;

export const photos = {
  bureau: { src: "/exemples/lundi-propre/bureau-ouvert.webp", largeur: 1400, hauteur: 935, alt: "Un bureau ouvert, rangé et vide : postes de travail en bois clair, fauteuils bleus, grandes fenêtres" },
  sanitaires: { src: "/exemples/lundi-propre/lavabo-miroir-rond.webp", largeur: 1100, hauteur: 734, alt: "Un lavabo blanc sous un miroir rond, dans des sanitaires carrelés de blanc et de rouge" },
  chiffon: { src: "/exemples/lundi-propre/chiffon-microfibre.webp", largeur: 1200, hauteur: 801, alt: "Une main passe un chiffon microfibre gris sur une surface lisse" },
  plateau: { src: "/exemples/lundi-propre/plateau-vide.webp", largeur: 1400, hauteur: 933, alt: "Un plateau de bureaux vide et éclairé, piliers blancs et sol brillant" },
};

export const PRESTATIONS = [
  { titre: "Bureaux", texte: "Corbeilles, plans de travail, sols, poignées et interrupteurs." },
  { titre: "Sanitaires", texte: "Nettoyés et désinfectés à chaque passage, consommables complétés." },
  { titre: "Cuisine et coin café", texte: "Évier, plans, micro-ondes, réfrigérateur vidé le vendredi." },
  { titre: "Poubelles et tri", texte: "Sacs changés, tri sélectif descendu au local." },
  { titre: "Vitres intérieures", texte: "Une fois par mois, ou plus, en option." },
];

export const PREUVES = [
  { titre: "Le rapport, chaque soir", texte: "L'heure d'arrivée et de départ, ce qui a été fait, ce qu'on a remarqué. Dans votre boîte avant 21 h 30." },
  { titre: "L'attestation de vigilance, d'office", texte: "Elle vous est due à la signature puis tous les six mois : on vous l'envoie sans que vous ayez à la demander." },
  { titre: "La même équipe chaque soir", texte: "Deux agents qui connaissent vos bureaux. Le rapport dit ce qui a été fait, jamais qui l'a fait." },
  { titre: "Le prix en ligne", texte: "Votre surface, vos passages : un prix mensuel d'exemple, tout de suite. Le prix ferme vient au devis, après visite." },
];

export const QUESTIONS = [
  {
    q: "Vos prix sont HT ?",
    r: "Oui : nos clients sont des entreprises, et nos prix sont affichés hors taxes, TVA à 20 % en sus. La grille donne un prix d'exemple ; le prix ferme vient au devis, après visite.",
  },
  {
    q: "Qui reçoit le rapport ?",
    r: "La personne que vous désignez : l'office manager, le responsable des services généraux, l'accueil. Un seul destinataire ou plusieurs, comme vous voulez.",
  },
  {
    q: "Le rapport surveille-t-il vos agents ?",
    r: "Il dit ce qui a été fait et à quelle heure, pas qui l'a fait. Nos agents en sont informés avant d'y travailler, comme la loi le demande, et le comité social et économique est consulté quand l'entreprise en a un.",
  },
  {
    q: "Et si quelque chose est oublié ?",
    r: "Vous répondez au rapport, on repasse le lendemain soir, et le rapport suivant le dit.",
  },
  {
    q: "Quel engagement ?",
    r: "Un contrat d'un an, résiliable avec un mois de préavis (exemple). Le premier mois, on ajuste les passages avec vous.",
  },
];
