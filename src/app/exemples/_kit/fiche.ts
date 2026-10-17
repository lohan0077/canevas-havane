/**
 * La fiche d'un site de démonstration, dans `src/app/exemples/<site>/fiche.ts`.
 * `outils/registre-exemples.mjs` les rassemble dans `_registre.ts` pour la page
 * /exemples et la mesure de contraste : on n'édite jamais la liste à la main.
 */
export type Fiche = {
  nom: string;                                        // le nom de l'entreprise fictive
  metier: string;                                     // « Pisciniste », « Fleuriste »…
  serie: "Remplir l'agenda" | "Créer une marque";
  idee: string;                                       // l'idée du site, en une phrase
  video: string;                                      // le dossier de la vidéo, ex. « agenda-piscinistes »
};
