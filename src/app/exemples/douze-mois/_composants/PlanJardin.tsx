import { MOIS } from "./donnees";
import { fleursDuMois, type Forme } from "./fleurs";
import type { Groupe } from "./Jardin3D";

// Le jardin vu du dessus, à plat : l'affiche qui s'affiche tout de suite, avant que la
// 3D n'arrive, et qui reste si le navigateur ne sait pas faire de 3D. Le même plan que
// la 3D — douze massifs autour du cadran, décembre à midi —, et la même touffe
// éclairée quand on choisit une fleur dans la liste.

const R_IN = 2.2;
const R_OUT = 4.7;
const R_HAIE = 6.0;

const azimut = (m: number) => (m % 12) * (Math.PI / 6);
// arrondi au millième : le serveur et le navigateur n'ont pas tout à fait les mêmes
// sinus, et des chiffres qui diffèrent à la 16e décimale casseraient l'hydratation
const arrondi = (n: number) => Math.round(n * 1000) / 1000;
const point = (r: number, a: number) => [arrondi(r * Math.sin(a)), arrondi(-r * Math.cos(a))] as const;

/** Un hasard qui se rejoue, pour poser les mêmes points à chaque rendu. */
function hasard(graine: number) {
  let s = graine;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function massif(m: number, rIn: number, rOut: number, allee: number) {
  const phi = azimut(m);
  const arc = (r: number) => Math.PI / 12 - Math.asin(allee / 2 / r);
  const [x1, y1] = point(rOut, phi - arc(rOut));
  const [x2, y2] = point(rOut, phi + arc(rOut));
  const [x3, y3] = point(rIn, phi + arc(rIn));
  const [x4, y4] = point(rIn, phi - arc(rIn));
  return `M${x1} ${y1} A${rOut} ${rOut} 0 0 1 ${x2} ${y2} L${x3} ${y3} A${rIn} ${rIn} 0 0 0 ${x4} ${y4} Z`;
}

/** Les touffes d'un massif : des points de couleur dans les trois bandes, comme en 3D. */
function touffes(m: number) {
  const h = hasard(m * 977 + 13);
  const fleurs = fleursDuMois(m);
  const bandes = fleurs.length >= 3 ? [[2.45, 3.4, 0.05, 0.95], [3.6, 4.45, 0.04, 0.48], [3.6, 4.45, 0.52, 0.96]] : [[2.45, 3.4, 0.05, 0.95], [3.6, 4.45, 0.05, 0.95]];
  const sortie: { espece: Forme; x: number; y: number; r: number; couleur: string }[] = [];
  fleurs.slice(0, bandes.length).forEach((f, i) => {
    const [r0, r1, p0, p1] = bandes[i];
    const n = i === 0 ? 9 : 5;
    for (let k = 0; k < n; k++) {
      const r = r0 + (r1 - r0) * h();
      const demi = Math.PI / 12 - Math.asin(0.5 / r);
      const a = azimut(m) - demi + 2 * demi * (p0 + (p1 - p0) * h());
      const [x, y] = point(r, a);
      sortie.push({ espece: f.id, x, y, r: i === 0 ? 0.24 : 0.18, couleur: f.couleurs[(m + i * 2 + (h() < 0.75 ? 0 : 1)) % f.couleurs.length] });
    }
  });
  return sortie;
}

export default function PlanJardin({ courant, actif, className = "" }: { courant: number; actif: Groupe | null; className?: string }) {
  return (
    <svg viewBox="-7.6 -7.6 15.2 15.2" className={className} aria-hidden="true">
      <circle r={R_HAIE + 0.4} fill="none" stroke="#1d3a26" strokeWidth={0.8} />
      <circle r={R_HAIE} fill="#8c849c" />
      {MOIS.map((m) => {
        const [lx, ly] = point(R_HAIE + 1.18, azimut(m.n));
        return (
          <g key={m.n}>
            <path d={massif(m.n, R_IN, R_OUT, 0.5)} fill="#2a5130" />
            <path d={massif(m.n, R_IN + 0.16, R_OUT - 0.16, 0.82)} fill="#2c2f24" />
            {touffes(m.n).map((t, i) => (
              <circle key={i} cx={t.x} cy={t.y} r={t.r} fill={t.couleur} opacity={actif && (actif.mois !== m.n || actif.espece !== t.espece) ? 0.55 : 1} />
            ))}
            {m.n === courant && <path d={massif(m.n, R_IN - 0.08, R_OUT + 0.08, 0.36)} fill="none" stroke="#d4f36b" strokeWidth={0.08} />}
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize={0.52} fill={m.n === courant ? "#d4f36b" : "#b9a9e3"} style={{ fontFamily: "var(--titres)" }}>
              {m.court}
            </text>
          </g>
        );
      })}
      <circle r={0.8} fill="#bdb4c8" />
      <circle r={0.46} fill="#cfc6d8" stroke="#3a2c52" strokeWidth={0.04} />
      <path d="M0 0 L0 -0.42" stroke="#8a6a3e" strokeWidth={0.06} />
    </svg>
  );
}
