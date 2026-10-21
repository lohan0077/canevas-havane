// Tout ce qu'affiche le site de Deux Heures, DJ de mariage imaginaire. Entreprise
// fictive : chaque prix, chaque date est un exemple, et le site le dit.
//
// Les règles tenues ici (voir Videos/agenda-evenementiel/SOURCES.md) :
//   - l'heure de fin est toujours « selon la salle » : le règlement de la salle et les
//     règles locales sur le bruit la fixent, pas le DJ ;
//   - aucun nom, aucune photo de vrais mariés ou de vrais invités ; tout contenu publié
//     (photo, vidéo, playlist) l'est avec l'accord des personnes ;
//   - les samedis « pris » sont un exemple, et rien ne bascule tout seul à l'écran : pas
//     de fausse rareté (C. consom., art. L. 121-4, 7°) ; aucun avis, aucune note ;
//   - prix TTC pour des particuliers, marqués « exemple ».

export const DOSSIER = "/exemples/deux-heures";

export const entreprise = {
  nom: "Deux Heures",
  telephone: "06 39 98 02 00",
  telephoneLien: "+33639980200",
  siret: "000 000 000 00000",
};

export const NAVIGATION = [
  { href: `${DOSSIER}#interdite`, libelle: "La chanson interdite" },
  { href: `${DOSSIER}/dj-ou-playlist`, libelle: "DJ ou playlist ?" },
  { href: `${DOSSIER}/samedis-libres`, libelle: "Samedis libres" },
];

export type Photo = { src: string; largeur: number; hauteur: number; alt: string };

export const photos = {
  bouleOr: { src: `${DOSSIER}/boule-or.webp`, largeur: 1400, hauteur: 933, alt: "Une boule à facettes dorée dans le noir, traversée de faisceaux de lumière" },
  bouleRose: { src: `${DOSSIER}/boule-rose.webp`, largeur: 1200, hauteur: 800, alt: "Une boule à facettes aux reflets roses et violets, dans une salle sombre" },
  rayons: { src: `${DOSSIER}/rayons.webp`, largeur: 1200, hauteur: 675, alt: "Une petite boule à facettes renvoie des rayons de lumière blanche dans l'obscurité" },
} satisfies Record<string, Photo>;

/** « 1 290 € » : espace fine insécable pour les milliers, insécable avant €. */
export const euros = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;

export type Samedi = { id: string; jour: string; mois: string; long: string; pris: boolean };

/** Juin et juillet 2027 (vérifiés : ce sont des samedis). « pris » : exemple. */
export const SAMEDIS: Samedi[] = [
  { id: "5-juin", jour: "5", mois: "juin", long: "samedi 5 juin 2027", pris: true },
  { id: "12-juin", jour: "12", mois: "juin", long: "samedi 12 juin 2027", pris: false },
  { id: "19-juin", jour: "19", mois: "juin", long: "samedi 19 juin 2027", pris: false },
  { id: "26-juin", jour: "26", mois: "juin", long: "samedi 26 juin 2027", pris: true },
  { id: "3-juillet", jour: "3", mois: "juil.", long: "samedi 3 juillet 2027", pris: false },
  { id: "10-juillet", jour: "10", mois: "juil.", long: "samedi 10 juillet 2027", pris: true },
];

export const FORMULES = [
  { nom: "La soirée", prix: 1290, detail: "De l'ouverture du bal à la dernière chanson, jusqu'à 2 h selon la salle. Son et lumière compris." },
  { nom: "La journée", prix: 1690, detail: "La cérémonie, l'accueil des invités, le dîner en musique douce, puis la soirée." },
  { nom: "Une heure de plus", prix: 150, detail: "Si la salle le permet, et seulement si la piste le demande." },
];

export const SOIREE = [
  { heure: "19 h", titre: "L'accueil", texte: "Musique douce, assez basse pour qu'on se parle. Personne ne danse, et c'est normal." },
  { heure: "21 h", titre: "Le dîner", texte: "Une playlist suffirait. On la passe quand même : on regarde la salle, on note qui chante." },
  { heure: "23 h", titre: "L'ouverture du bal", texte: "La chanson que tu as choisie. Puis celles qu'on a vu fredonner pendant le dîner." },
  { heure: "2 h", titre: "La dernière", texte: "Selon la salle : c'est son règlement qui fixe l'heure de fin. Si la piste est encore pleine, c'est gagné." },
];

export type Question = { q: string; r: string };

export const QUESTIONS: Question[] = [
  { q: "Jusqu'à quelle heure ?", r: "Jusqu'à 2 h, selon la salle. C'est son règlement, et les règles de la commune sur le bruit, qui fixent l'heure de fin : on les lit avec toi avant de signer." },
  { q: "Et la chanson interdite, vraiment ?", r: "Vraiment. Elle est notée dans ta fiche, et elle ne passera pas, même si un oncle la réclame à minuit." },
  { q: "Tu mets des photos de nos invités en ligne ?", r: "Jamais sans leur accord. Aucune photo, aucune vidéo de ton mariage n'est publiée sans l'accord écrit des mariés, et de chaque personne reconnaissable." },
  { q: "Il faut un DJ pour tout le monde ?", r: "Non. Un dîner calme à trente, une playlist le fait très bien, et on te le dit. La page « DJ ou playlist ? » t'aide à trancher." },
  { q: "Et si mon samedi est déjà pris ?", r: "Les samedis libres sont sur le site, à jour. S'il est pris, il est pris : on te le dit tout de suite, sans « dernières places »." },
];
