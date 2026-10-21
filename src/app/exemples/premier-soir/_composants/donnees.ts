// Les contenus du site Premier Soir, entreprise fictive : prix, numéros, durées et seuils
// sont des exemples. La règle de la promesse est expliquée dans
// Videos/marque-demenageurs/SOURCES.md.

export const DOSSIER = "/exemples/premier-soir";

export const entreprise = {
  nom: "Premier Soir",
  signature: "Ce soir, tu dors dans ton lit.",
  // Tranche réservée par l'ARCEP aux œuvres de fiction : ce numéro ne sonne chez personne.
  telephone: "01 99 00 85 30",
  siret: "000 000 000 00000",
  // Ce qui fait un déménagement « livré dans la journée » (exemple).
  seuilKm: 150,
  seuilM3: 40,
};

export const NAVIGATION = [
  { href: `${DOSSIER}/ce-soir`, libelle: "On remonte quoi ?" },
  { href: `${DOSSIER}/le-carton`, libelle: "Le carton orange" },
  { href: `${DOSSIER}#promesse`, libelle: "La promesse" },
];

export const MEUBLES = [
  { id: "lit", nom: "Le lit", minutes: 30 },
  { id: "berceau", nom: "Le berceau", minutes: 15 },
  { id: "table", nom: "La table", minutes: 10 },
  { id: "canape", nom: "Le canapé", minutes: 10 },
  { id: "armoire", nom: "L'armoire", minutes: 90 },
];

export const CARTON = ["Les draps", "Les brosses à dents", "Le chargeur", "Le café"];
export const CARTON_EN_PLUS = ["Le doudou", "La bouilloire", "Deux tasses", "Une ampoule", "Le papier toilette", "Les médicaments du soir", "Une lampe de poche", "Les pyjamas"];

export const photos = {
  immeuble: { src: "/exemples/premier-soir/immeuble-a-la-nuit-tombee.webp", largeur: 1200, hauteur: 1800, alt: "Un immeuble à la nuit tombée, quelques fenêtres allumées, des arbres au premier plan" },
  lampe: { src: "/exemples/premier-soir/lampe-de-chevet.webp", largeur: 1000, hauteur: 1500, alt: "Une lampe de chevet allumée sur une table de nuit, au bord d'un lit fait" },
  lit: { src: "/exemples/premier-soir/lit-fait.webp", largeur: 1000, hauteur: 1500, alt: "Un lit fait, deux oreillers, une petite lampe allumée et une plante sur la table de nuit" },
  cartons: { src: "/exemples/premier-soir/cartons-pres-de-la-fenetre.webp", largeur: 1000, hauteur: 1500, alt: "Des cartons empilés près d'une fenêtre, des coussins posés dessus" },
};

export const JOUR_J = [
  { heure: "7 h 30", quoi: "On t'apporte le carton orange", detail: "Tu le remplis en dernier : draps, brosses à dents, chargeur, café." },
  { heure: "8 h", quoi: "On démonte et on charge", detail: "Le lit, le berceau, ce que tu as coché. Le carton orange monte en dernier." },
  { heure: "13 h", quoi: "On décharge", detail: "Le carton orange descend en premier, et va dans la chambre." },
  { heure: "15 h", quoi: "On remonte ce que tu as coché", detail: "Le lit d'abord. Puis le berceau, la table." },
  { heure: "17 h 30", quoi: "On part", detail: "Le lit est monté, les draps sont dans le carton. Ce soir, tu dors dedans." },
];

export const QUESTIONS = [
  {
    q: "« Ce soir, tu dors dans ton lit », c'est promis à tout le monde ?",
    r: "Non, et on le dit : seulement pour un déménagement livré dans la journée — moins de 150 km et 40 m³ dans nos exemples — et seulement pour le lit coché au devis. Plus loin, ton déménagement est livré le lendemain : on te le dit avant que tu signes.",
  },
  {
    q: "Et si le lit n'est pas coché ?",
    r: "Alors on ne le promet pas. On le démonte, on le transporte, et tu le remontes ou tu nous demandes de revenir. Seul ce qui est coché au devis est remonté avant qu'on parte.",
  },
  {
    q: "Le carton orange est payant ?",
    r: "Il est compris dans chaque déménagement. Tu le gardes ensuite.",
  },
  {
    q: "Le devis est-il gratuit ?",
    r: "Oui : gratuit, écrit, remis avant tout contrat, avec la prestation exacte — dont ce qu'on remonte —, le montant HT et TTC, et la mention que ce prix est définitif.",
  },
  {
    q: "Et l'armoire ?",
    r: "Une armoire se remonte en une heure et demie environ (exemple). Coche-la : la durée est comptée au devis, et l'heure de départ de l'équipe aussi.",
  },
];
