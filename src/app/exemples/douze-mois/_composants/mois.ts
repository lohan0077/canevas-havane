"use client";

import { useSyncExternalStore } from "react";

const rienAEcouter = () => () => {};

/**
 * Le mois en cours (1 à 12), lu chez le visiteur. La page est générée d'avance : côté
 * serveur, et jusqu'à ce que le navigateur prenne la main, c'est `depart` (octobre,
 * le mois des vidéos).
 */
export function useMoisCourant(depart = 10) {
  return useSyncExternalStore(rienAEcouter, () => new Date().getMonth() + 1, () => depart);
}
