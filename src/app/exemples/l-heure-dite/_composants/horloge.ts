// Le toit-horloge de l'accueil : ce que l'aiguille fait au ciel, au soleil et au toit.
// Calcul pur, partagé par la 3D (ToitHorloge3D), le cadran 2D de secours et la lecture
// sous le cadran. L'exemple est celui que la page dit : un toit plein sud, en été, par
// beau temps — la même cloche que « Ton toit, heure par heure » (soleil.ts), une forme
// indicative, jamais une mesure ni une promesse de production.
//
// Le cadran fait 24 heures et se lit comme un cadran solaire posé au sol, vu du sud :
// l'aiguille pointe vers le soleil. Le soleil est plein sud vers 13 h 30 en été (heure
// légale) : 13 h 30 est donc devant, au plus près de celui qui regarde ; 7 h 30 à droite
// (l'est), 19 h 30 à gauche (l'ouest), la nuit au fond. Les heures tournent dans le sens
// des aiguilles d'une montre, comme sur tous les cadrans — c'est d'ailleurs pour ça
// qu'elles tournent dans ce sens.

import { HEURES } from "./donnees";
import { CIELS, ORIENTATIONS, SAISONS, depart, forme, niveau } from "./soleil";

export const ETE = SAISONS[0];
/** La journée de l'exemple : plein sud, en été, beau temps. */
export const JOURNEE = forme(ORIENTATIONS[2], ETE, CIELS[0]);
/** L'heure de la machine : celle que « Ton toit, heure par heure » conseille pour ce toit. */
export const HEURE_MACHINE = depart(JOURNEE);
/** L'heure où l'on ouvre la page : midi et demi, l'heure de la photo de l'horloge. */
export const HEURE_DEPART = 12.5;

/** Ramène une heure dans [0, 24). */
export const tour = (h: number) => ((h % 24) + 24) % 24;

/** L'écart le plus court entre deux heures du cadran, de -12 à +12. */
export const ecart = (de: number, a: number) => tour(a - de + 12) - 12;

/** Au quart d'heure, comme les réglages du site. */
export const auQuart = (h: number) => tour(Math.round(h * 4) / 4);

/**
 * L'angle d'une heure sur le cadran, en radians, compté depuis l'avant (le sud, vers
 * celui qui regarde) en tournant vers la droite (l'est). Le point de l'heure h est en
 * (sin a, cos a) dans le plan du sol : x vers la droite, z vers l'avant.
 */
export const angle = (h: number) => ((ETE.midi - h) * Math.PI) / 12;

/** L'inverse : l'heure qui se trouve dans la direction (x, z). */
export const heureDe = (x: number, z: number) => tour(ETE.midi - (Math.atan2(x, z) * 12) / Math.PI);

/** La hauteur du soleil, en degrés : 0 au lever et au coucher, 64° au plus haut ; négative la nuit. */
export function hauteur(h: number): number {
  const { lever, coucher, midi } = ETE;
  const max = 64;
  if (h > lever && h < coucher) {
    const p = h <= midi ? (h - lever) / (midi - lever) : (coucher - h) / (coucher - midi);
    return max * Math.sin((p * Math.PI) / 2);
  }
  // La nuit : le soleil descend sous l'horizon, jusqu'à -18° (la nuit noire).
  const depuis = h >= coucher ? h - coucher : h + 24 - coucher;
  const jusqua = h <= lever ? lever - h : lever + 24 - h;
  return -18 * Math.min(1, Math.min(depuis, jusqua) / 1.5);
}

/** De 0 à 1 : ce que le toit de l'exemple donne à l'heure h (la cloche de soleil.ts). */
export const production = (h: number) => niveau(JOURNEE, tour(h));

/* ---------- Le ciel ---------- */

type Teinte = [number, number, number];
const rvb = (c: string): Teinte => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16)) as Teinte;
const hexa = (t: Teinte) => `#${t.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;

/** Le ciel de la journée : haut, bas, étoiles. Interpolé d'une heure à l'autre. */
const CIEL: [number, string, string, number][] = [
  [0, "#0A1430", "#1A2A4F", 1],
  [4.75, "#0E1B3B", "#22335C", 1],
  [5.6, "#27356A", "#7A6C9E", 0.55],
  [6.25, "#6A80B8", "#F1B796", 0.08],
  [7.25, "#99C5EA", "#F5DCCB", 0],
  [9, "#9FCEF0", "#E6F2FA", 0],
  [13.5, "#8CC6EF", "#EAF5FC", 0],
  [18, "#9FC8EB", "#F0E8E1", 0],
  [20.5, "#B9A2C9", "#F6C39E", 0],
  [21.5, "#4E5893", "#E58C6C", 0.05],
  [22.25, "#1C2752", "#46447A", 0.6],
  [23, "#0C1734", "#1D2C51", 1],
  [24, "#0A1430", "#1A2A4F", 1],
];

export type Ciel = { haut: string; bas: string; etoiles: number; nuit: number };

export function ciel(h: number): Ciel {
  const t = tour(h);
  let i = 0;
  while (i < CIEL.length - 2 && CIEL[i + 1][0] <= t) i++;
  const [h0, a0, b0, e0] = CIEL[i];
  const [h1, a1, b1, e1] = CIEL[i + 1];
  const p = (t - h0) / (h1 - h0);
  const mel = (x: string, y: string) => hexa(rvb(x).map((v, k) => v + (rvb(y)[k] - v) * p) as Teinte);
  const etoiles = e0 + (e1 - e0) * p;
  // La nuit, de 0 à 1 : sert aux fenêtres allumées et à la lumière de lune.
  const nuit = Math.min(1, Math.max(0, -hauteur(t) / 10));
  return { haut: mel(a0, a1), bas: mel(b0, b1), etoiles, nuit };
}

/* ---------- Les heures d'appel ---------- */

export type HeureAppel = { id: string; libelle: string; valeur: number };

/** Les heures d'appel du site (donnees.ts), avec leur place sur le cadran. */
export const APPELS: HeureAppel[] = HEURES.map((x) => {
  const [hh, mm = 0] = x.id.split("-").map(Number); // « 12-30 » : 12 h 30
  return { id: x.id, libelle: x.libelle, valeur: hh + mm / 60 };
});

/** L'heure d'appel la plus proche de l'aiguille, sur le tour du cadran. */
export function appelProche(h: number): HeureAppel {
  return APPELS.reduce((m, a) => (Math.abs(ecart(h, a.valeur)) < Math.abs(ecart(h, m.valeur)) ? a : m), APPELS[0]);
}
