// Le calendrier des prix de Bon Mardi : chaque date a son prix, comme un billet de
// train. Des prix d'exemple, TTC, pour un déménagement de moins de 30 km : le mardi
// est le moins cher parce que le camion y est vraiment libre ; le samedi de fin de mois,
// le plus demandé, coûte le plus. Le prix ferme vient au devis, gratuit.

export type Volume = { id: string; nom: string; m3: number; base: number };

export const VOLUMES: Volume[] = [
  { id: "studio", nom: "Studio", m3: 12, base: 520 },
  { id: "t2", nom: "T2", m3: 18, base: 690 },
  { id: "t3", nom: "T3", m3: 30, base: 1090 },
  { id: "maison", nom: "Maison", m3: 45, base: 1590 },
];

// Lundi … samedi ; le dimanche et les jours fériés, on ne déménage pas.
const COEF: Record<number, number> = { 1: 1.09, 2: 1, 3: 1.04, 4: 1.145, 5: 1.435, 6: 1.58 };
const COEF_SAMEDI_FIN_DE_MOIS = 1.87;

export const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
export const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

const cle = (d: Date) => d.toISOString().slice(0, 10);
const plus = (d: Date, n: number) => new Date(d.getTime() + n * 86_400_000);

function paques(annee: number): Date {
  const a = annee % 19, b = Math.floor(annee / 100), c = annee % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mois = Math.floor((h + l - 7 * m + 114) / 31), jour = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(annee, mois - 1, jour));
}

export function estFerie(d: Date): boolean {
  const annee = d.getUTCFullYear(), p = paques(annee);
  const fixes = ["01-01", "05-01", "05-08", "07-14", "08-15", "11-01", "11-11", "12-25"].map((md) => `${annee}-${md}`);
  return [...fixes, cle(plus(p, 1)), cle(plus(p, 39)), cle(plus(p, 50))].includes(cle(d));
}

export type Case = {
  cle: string;
  quantieme: number;
  semaine: number;
  rang: number;          // 1er, 2e, 3e… jour de ce nom dans le mois
  prix: number | null;   // null : fermé (dimanche, jour férié)
  passe: boolean;
  samediFin: boolean;
};

const arrondi = (n: number) => Math.round(n / 10) * 10;

export function prixDuJour(v: Volume, semaine: number, samediFin: boolean): number {
  return arrondi(v.base * (samediFin ? COEF_SAMEDI_FIN_DE_MOIS : COEF[semaine]));
}

/** Les cases d'un mois, précédées des cases vides qui alignent le 1er sur son jour (semaine du lundi). */
export function mois(annee: number, m: number, v: Volume, aujourdhui: string): { vides: number; cases: Case[] } {
  const premier = new Date(Date.UTC(annee, m, 1));
  const dernier = new Date(Date.UTC(annee, m + 1, 0)).getUTCDate();
  const vides = (premier.getUTCDay() + 6) % 7;
  const vus: Record<number, number> = {};
  const cases: Case[] = [];
  for (let q = 1; q <= dernier; q++) {
    const d = new Date(Date.UTC(annee, m, q));
    const s = d.getUTCDay();
    vus[s] = (vus[s] ?? 0) + 1;
    const samediFin = s === 6 && q > dernier - 7;
    const ferme = s === 0 || estFerie(d);
    cases.push({ cle: cle(d), quantieme: q, semaine: s, rang: vus[s], prix: ferme ? null : prixDuJour(v, s, samediFin), passe: cle(d) <= aujourdhui, samediFin });
  }
  return { vides, cases };
}

/** « 1 290 € », espaces insécables. */
export const euros = (n: number, decimales = false) =>
  `${(decimales ? n.toFixed(2).replace(".", ",") : String(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;

export function dateLongue(c: string): string {
  const [a, m, j] = c.split("-").map(Number);
  const d = new Date(Date.UTC(a, m - 1, j));
  return `${JOURS[d.getUTCDay()]} ${j} ${MOIS[m - 1]}`;
}
