// Les données du site Ciel Variable : une ferme maraîchère imaginaire qui remplace le
// catalogue par le bulletin météo de la semaine, et le panier qui en découle. Les
// relevés, les paniers et les prix sont des exemples. Sur un vrai site, ce sont les
// relevés de la ferme : une météo inventée pour justifier un panier serait trompeuse.

export const DOSSIER = "/exemples/ciel-variable";

export const ferme = {
  nom: "Ciel Variable",
  telephone: "01 99 00 52 18",
  telephoneLien: "+33199005218",
  adresse: ["Ciel Variable, ferme maraîchère", "Chemin de l'Exemple", "00000 Exemple-les-Champs"],
  retrait: "le samedi, de 9 h à 12 h 30, à la ferme",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#bulletin`, libelle: "Le bulletin" },
  { href: `${DOSSIER}/panier`, libelle: "Le panier" },
  { href: `${DOSSIER}/bulletins`, libelle: "Les lundis" },
  { href: `${DOSSIER}#questions`, libelle: "Questions" },
];

export type Temps = "soleil" | "gel" | "pluie" | "nuage" | "eclaircie" | "vent";
export type Jour = { jour: string; temps: Temps; degres: string; pluie?: number };
export type Fait = { temps: Temps; titre: string; detail: string };
export type Legume = { nom: string; oui: boolean; pourquoi: string };
export type Bulletin = { numero: number; semaine: string; jours: Jour[]; faits: Fait[]; panier: Legume[]; phrase: string };

export const BULLETINS: Bulletin[] = [
  {
    numero: 42,
    semaine: "du 12 au 18 octobre",
    phrase: "Cette semaine, la pluie a choisi tes légumes.",
    jours: [
      { jour: "Lun", temps: "soleil", degres: "16°" },
      { jour: "Mar", temps: "gel", degres: "−2°" },
      { jour: "Mer", temps: "pluie", degres: "11°", pluie: 8 },
      { jour: "Jeu", temps: "pluie", degres: "12°", pluie: 6 },
      { jour: "Ven", temps: "nuage", degres: "13°" },
      { jour: "Sam", temps: "eclaircie", degres: "14°" },
      { jour: "Dim", temps: "soleil", degres: "15°" },
    ],
    faits: [
      { temps: "pluie", titre: "14 mm de pluie", detail: "mercredi et jeudi" },
      { temps: "gel", titre: "Gel mardi matin", detail: "−2 °C au lever du jour" },
      { temps: "soleil", titre: "Soleil lundi", detail: "courges rentrées avant le gel" },
    ],
    panier: [
      { nom: "Poireaux", oui: true, pourquoi: "La pluie de mercredi et jeudi les a fait gonfler." },
      { nom: "Courge", oui: true, pourquoi: "Rentrée lundi, au soleil, la veille du gel." },
      { nom: "Salade", oui: false, pourquoi: "Elle a gelé mardi matin. On ne vend pas une salade gelée." },
      { nom: "Carottes", oui: true, pourquoi: "Sous la terre, le gel ne les a pas touchées." },
      { nom: "Épinards", oui: true, pourquoi: "Le froid ne leur fait pas peur : on les a coupés jeudi." },
      { nom: "Haricots verts", oui: false, pourquoi: "Le gel a eu les derniers pieds. Rendez-vous l'été prochain." },
    ],
  },
  {
    numero: 41,
    semaine: "du 5 au 11 octobre",
    phrase: "Cette semaine, la pluie a tout ralenti.",
    jours: [
      { jour: "Lun", temps: "pluie", degres: "13°", pluie: 7 },
      { jour: "Mar", temps: "pluie", degres: "12°", pluie: 6 },
      { jour: "Mer", temps: "pluie", degres: "12°", pluie: 5 },
      { jour: "Jeu", temps: "pluie", degres: "13°", pluie: 4 },
      { jour: "Ven", temps: "vent", degres: "14°" },
      { jour: "Sam", temps: "eclaircie", degres: "17°" },
      { jour: "Dim", temps: "soleil", degres: "17°" },
    ],
    faits: [
      { temps: "pluie", titre: "22 mm de pluie", detail: "de lundi à jeudi" },
      { temps: "vent", titre: "Du vent vendredi", detail: "les filets ont tenu" },
      { temps: "soleil", titre: "Doux le week-end", detail: "17 °C dimanche" },
    ],
    panier: [
      { nom: "Salade", oui: true, pourquoi: "Avec cette eau, elles ont poussé d'un coup." },
      { nom: "Radis", oui: true, pourquoi: "Semés il y a trois semaines, juste à temps." },
      { nom: "Poireaux", oui: true, pourquoi: "Encore fins : des poireaux primeur, à la vapeur." },
      { nom: "Haricots verts", oui: true, pourquoi: "Les derniers. Profites-en." },
      { nom: "Courge", oui: false, pourquoi: "Trop mouillé pour les rentrer : on attend un jour sec." },
    ],
  },
  {
    numero: 40,
    semaine: "du 28 septembre au 4 octobre",
    phrase: "Cette semaine, le soleil a fini les tomates.",
    jours: [
      { jour: "Lun", temps: "soleil", degres: "22°" },
      { jour: "Mar", temps: "soleil", degres: "23°" },
      { jour: "Mer", temps: "soleil", degres: "21°" },
      { jour: "Jeu", temps: "eclaircie", degres: "20°" },
      { jour: "Ven", temps: "soleil", degres: "21°" },
      { jour: "Sam", temps: "soleil", degres: "22°" },
      { jour: "Dim", temps: "soleil", degres: "20°" },
    ],
    faits: [
      { temps: "soleil", titre: "Six jours de soleil", detail: "et pas une goutte" },
      { temps: "nuage", titre: "Nuits fraîches", detail: "6 °C au plus bas" },
      { temps: "eclaircie", titre: "0 mm de pluie", detail: "on a arrosé deux fois" },
    ],
    panier: [
      { nom: "Tomates", oui: true, pourquoi: "Les dernières, mûries au soleil de la semaine." },
      { nom: "Haricots verts", oui: true, pourquoi: "Ils aiment la chaleur : récolte pleine." },
      { nom: "Salade", oui: true, pourquoi: "À l'ombre des filets, elle a tenu." },
      { nom: "Poireaux", oui: false, pourquoi: "Pas encore assez gros. Patience." },
      { nom: "Courge", oui: false, pourquoi: "On attend que la peau durcisse." },
    ],
  },
];

export const ETAPES = [
  { jour: "Lundi", titre: "Le bulletin", texte: "Le ciel de la semaine passée, relevé à la ferme, et le panier qui va avec. En vidéo, trente secondes." },
  { jour: "Mercredi", titre: "La récolte", texte: "On récolte ce que le ciel a laissé. Pas plus, pas autre chose." },
  { jour: "Samedi", titre: "Le retrait", texte: "Tu viens chercher ton panier à la ferme, le samedi matin." },
];

export type Formule = { nom: string; pour: string; prix: number; detail: string };

export const FORMULES: Formule[] = [
  { nom: "Le petit panier", pour: "pour 1 ou 2", prix: 15, detail: "Quatre ou cinq légumes, selon le ciel." },
  { nom: "Le grand panier", pour: "pour 3 ou 4", prix: 24, detail: "Les mêmes légumes, en quantité de famille." },
];

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  {
    q: "Pourquoi pas de catalogue ?",
    r: "Parce qu'un catalogue promet ce que le ciel n'a pas encore décidé. Le bulletin dit ce qui s'est passé, et ce qu'il y a vraiment dans le panier.",
  },
  {
    q: "Les relevés sont vrais ?",
    r: "Sur une vraie ferme, oui : le pluviomètre et le thermomètre sont au bout du champ, on relève tous les matins. Une météo arrangée pour justifier un panier serait une tromperie. Ici, la ferme est fictive : les relevés sont des exemples.",
  },
  {
    q: "Et si je n'aime pas ce que le ciel a choisi ?",
    r: "Tu le dis au retrait : on échange un légume contre un autre du panier, tant qu'il y en a. Tu peux aussi sauter une semaine.",
  },
  {
    q: "Je peux sauter une semaine ?",
    r: "Oui, il suffit de le dire avant le mercredi, jour de récolte. Rien n'est payé d'avance.",
  },
  {
    q: "Où récupérer le panier ?",
    r: "À la ferme, le samedi matin. On ne livre pas : le samedi, c'est aussi l'occasion de voir le champ dont parle le bulletin.",
  },
];
