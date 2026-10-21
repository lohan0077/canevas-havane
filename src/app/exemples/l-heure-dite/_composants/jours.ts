"use client";

import { useSyncExternalStore } from "react";

// Les cinq prochains jours ouvrables, comptés depuis le jour où le visiteur ouvre la
// page : tous les jours sauf le dimanche et les jours fériés (C. consom., art. R223-4 :
// le rappel a lieu « dans les cinq jours ouvrables suivant la demande »). Calculés dans
// le navigateur, à la date du visiteur — jamais figés à la compilation.

export type Jour = { cle: string; semaine: number; court: string; long: string; quantieme: number; mois: string };

const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const COURTS = ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."];
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

const cle = (d: Date) => d.toISOString().slice(0, 10);
const plus = (d: Date, n: number) => new Date(d.getTime() + n * 86_400_000);

/** Le dimanche de Pâques (calcul grégorien de Meeus, Jones et Butcher). */
function paques(annee: number): Date {
  const a = annee % 19, b = Math.floor(annee / 100), c = annee % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mois = Math.floor((h + l - 7 * m + 114) / 31), jour = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(annee, mois - 1, jour));
}

/** Les onze jours fériés de France métropolitaine. */
function feries(annee: number): Set<string> {
  const p = paques(annee);
  const fixes = ["01-01", "05-01", "05-08", "07-14", "08-15", "11-01", "11-11", "12-25"].map((md) => `${annee}-${md}`);
  return new Set([...fixes, cle(plus(p, 1)), cle(plus(p, 39)), cle(plus(p, 50))]);
}

export function joursOuvrables(depuis: string, n = 5): Jour[] {
  const [a, m, j] = depuis.split("-").map(Number);
  let d = new Date(Date.UTC(a, m - 1, j));
  const liste: Jour[] = [];
  while (liste.length < n) {
    d = plus(d, 1);
    const s = d.getUTCDay();
    if (s === 0 || feries(d.getUTCFullYear()).has(cle(d))) continue;
    liste.push({ cle: cle(d), semaine: s, court: COURTS[s], long: JOURS[s], quantieme: d.getUTCDate(), mois: MOIS[d.getUTCMonth()] });
  }
  return liste;
}

const sAbonner = () => () => {};
const aujourdhui = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/** La date du jour chez le visiteur ; `null` pendant le rendu serveur. */
export function useAujourdhui(): string | null {
  return useSyncExternalStore(sAbonner, aujourdhui, () => null);
}
