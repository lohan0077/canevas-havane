/**
 * La fiche d'un site de démonstration, dans `src/app/exemples/<site>/fiche.ts`.
 * `outils/registre-exemples.mjs` les rassemble dans `_registre.ts` pour la page
 * /exemples, la mesure de contraste et les redirections : on n'édite jamais la liste
 * à la main.
 *
 * Un site par métier, filmé dans ses deux vidéos : `agenda-<secteur>` (« Remplir
 * l'agenda ») et `marque-<secteur>` (« Créer une marque »). Le site porte la marque
 * inventée dans la seconde, et les idées de la première.
 */
export type Fiche = {
  nom: string;                                        // le nom de l'entreprise fictive
  metier: string;                                     // « Cabinet d'ostéopathie », « Fleuriste »…
  secteur: string;                                    // « osteopathes » : le dossier des vidéos, sans préfixe
  groupe: "rendez-vous" | "vente" | "devis";          // ce que le site fait venir
  idee: string;                                       // l'idée du site, en une phrase
  image: string;                                      // la photo de la vignette sur /exemples
  ancien?: string;                                    // le site « Remplir l'agenda » fondu dans celui-ci : redirigé ici
};

/** L'ancienne fiche, un site par vidéo : le temps que les 51 sites soient fondus. */
export type FicheAncienne = {
  nom: string;
  metier: string;
  serie: "Remplir l'agenda" | "Créer une marque";
  idee: string;
  video: string;
};
