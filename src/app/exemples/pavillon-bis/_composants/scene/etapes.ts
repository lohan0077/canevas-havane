import type { Modele } from "../donnees";

/**
 * Où, sur la bascule avant / après (0 → 1), chacune des trois lignes du projet devient
 * visible dans la maquette. Calé sur l'ordre du chantier de `interieurs.ts` : si l'on y
 * déplace une phase, on déplace son seuil ici.
 */
export const SEUILS: Record<Modele, [number, number, number]> = {
  plain: [0.2, 0.5, 0.74],
  "sous-sol": [0.36, 0.55, 0.86],
  etage: [0.2, 0.55, 0.78],
};
