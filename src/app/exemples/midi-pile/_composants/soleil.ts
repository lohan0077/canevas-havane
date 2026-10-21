// La journée d'un toit : une forme indicative, pas une mesure. Une cloche centrée sur
// l'heure où le soleil fait face au toit — vers 13 h 30 en été plein sud (heure légale),
// plus tôt à l'est, plus tard à l'ouest —, coupée au lever et au coucher. Par temps
// gris, la lumière arrive surtout diffuse : la courbe baisse beaucoup, s'élargit, et
// l'orientation compte moins. Un vrai outil s'appuierait sur les relevés de
// l'installation ; c'est ce que montre le suivi, une fois les panneaux posés.

export type Orientation = { id: string; court: string; nom: string; decalage: number };
export type Saison = { id: "ete" | "hiver"; nom: string; midi: number; lever: number; coucher: number; largeur: number; ampleur: number };
export type Ciel = { id: "soleil" | "gris"; nom: string };

export const ORIENTATIONS: Orientation[] = [
  { id: "est", court: "Est", nom: "plein est", decalage: -2.5 },
  { id: "sud-est", court: "S-E", nom: "sud-est", decalage: -1.25 },
  { id: "sud", court: "Sud", nom: "plein sud", decalage: 0 },
  { id: "sud-ouest", court: "S-O", nom: "sud-ouest", decalage: 1.25 },
  { id: "ouest", court: "Ouest", nom: "plein ouest", decalage: 2.5 },
];

export const SAISONS: Saison[] = [
  { id: "ete", nom: "Été", midi: 13.5, lever: 6.25, coucher: 21.75, largeur: 2.7, ampleur: 1 },
  { id: "hiver", nom: "Hiver", midi: 12.5, lever: 8.5, coucher: 17.5, largeur: 1.7, ampleur: 0.55 },
];

export const CIELS: Ciel[] = [
  { id: "soleil", nom: "Soleil" },
  { id: "gris", nom: "Gris" },
];

/** Les réglages d'une courbe : de quoi la dessiner, et de quoi passer de l'une à l'autre. */
export type Forme = { pic: number; largeur: number; ampleur: number; lever: number; coucher: number };

export function forme(o: Orientation, s: Saison, c: Ciel): Forme {
  const gris = c.id === "gris";
  return {
    // Sous un ciel gris, la lumière vient de partout : le toit suit le soleil de moins près.
    pic: s.midi + (gris ? o.decalage * 0.35 : o.decalage),
    largeur: s.largeur * (gris ? 1.35 : 1),
    ampleur: s.ampleur * (gris ? 0.24 : 1),
    lever: s.lever,
    coucher: s.coucher,
  };
}

/** De 0 à 1 : ce que le toit donne à l'heure `h`, rapporté au plus beau midi d'été. */
export function niveau(f: Forme, h: number): number {
  if (h <= f.lever || h >= f.coucher) return 0;
  const cloche = Math.exp(-((h - f.pic) ** 2) / (2 * f.largeur ** 2));
  const bords = Math.min(1, (h - f.lever) / 0.9, (f.coucher - h) / 0.9);
  return Math.max(0, f.ampleur * cloche * bords);
}

/** « 15 h », « 12 h 30 ». */
export function heure(h: number): string {
  const m = Math.round((h % 1) * 60);
  const hh = Math.floor(h) + (m === 60 ? 1 : 0);
  const mm = m === 60 ? 0 : m;
  return mm === 0 ? `${hh} h` : `${hh} h ${String(mm).padStart(2, "0")}`;
}

/** L'heure de départ conseillée pour un appareil qui tourne deux heures : une heure avant le pic, au quart d'heure. */
export function depart(f: Forme): number {
  return Math.round((f.pic - 1) * 4) / 4;
}

export function enMots(n: number, ampleurMax: number): string {
  if (n <= 0.001) return "rien : il fait nuit";
  const r = n / Math.max(ampleurMax, 0.0001);
  if (r >= 0.85) return "le plus fort de sa journée";
  if (r >= 0.5) return "bien";
  if (r >= 0.2) return "un peu";
  return "presque rien";
}
