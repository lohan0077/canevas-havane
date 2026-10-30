import type { Forme } from "./fleurs";
import styles from "./Bouquet.module.css";

// Le bouquet qu'on compose dans le jardin, dessiné à plat : chaque tige choisie y
// pousse depuis le nœud du ruban, les plus hautes (épis, graminées) au fond. Les têtes
// se rangent en dôme et glissent à leur nouvelle place quand une tige arrive ou s'en
// va. Une dessin par fleur, à la main, en quelques formes.

export type TigeChoisie = { cle: string; espece: Forme; couleur: string };

/** Une couleur plus sombre (ou plus claire, k > 1), pour les traits et les cœurs. */
function nuance(hex: string, k: number) {
  const n = parseInt(hex.slice(1), 16);
  const f = (c: number) => Math.max(0, Math.min(255, Math.round(k > 1 ? c + (255 - c) * (k - 1) : c * k)));
  return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`;
}

const anneau = (n: number, r: number, f: (x: number, y: number, a: number, i: number) => React.ReactNode, decalage = 0) =>
  Array.from({ length: n }, (_, i) => {
    const a = decalage + (i / n) * Math.PI * 2;
    return f(Math.cos(a) * r, Math.sin(a) * r, (a * 180) / Math.PI, i);
  });

/** La tête d'une fleur, centrée sur (0, 0), dans un carré d'environ 24 de côté. */
function Tete({ espece, couleur }: { espece: Forme; couleur: string }) {
  const trait = nuance(couleur, 0.62);
  const clair = nuance(couleur, 1.25);
  const v = { stroke: trait, strokeWidth: 0.6 };
  switch (espece) {
    case "tulipe":
      return (
        <g {...v}>
          <path d="M-8 -1 C-10 -13 -4 -15 -1 -9 C1 -15 8 -14 8 -2 C8 7 -8 7 -8 -1 Z" fill={couleur} />
          <path d="M-3 4 C-5 -4 -2 -11 1 -12 C4 -9 5 -3 3 4 Z" fill={clair} />
        </g>
      );
    case "anemone":
      return (
        <g {...v}>
          {anneau(6, 5.6, (x, y, a, i) => <ellipse key={i} cx={x} cy={y} rx={5.6} ry={4.6} transform={`rotate(${a} ${x} ${y})`} fill={couleur} />)}
          <circle r={3.6} fill="#1a1022" stroke="none" />
          {anneau(10, 4.6, (x, y, _a, i) => <circle key={i} cx={x} cy={y} r={0.7} fill="#1a1022" stroke="none" />)}
        </g>
      );
    case "hellebore":
      return (
        <g {...v}>
          {anneau(5, 5.4, (x, y, a, i) => <ellipse key={i} cx={x} cy={y} rx={5.6} ry={5} transform={`rotate(${a} ${x} ${y})`} fill={couleur} />, -Math.PI / 2)}
          <circle r={3} fill="#a3b86f" stroke="none" />
          {anneau(12, 3.8, (x, y, _a, i) => <circle key={i} cx={x} cy={y} r={0.7} fill="#e6cf55" stroke="none" />)}
        </g>
      );
    case "renoncule":
    case "camelia":
      return (
        <g {...v}>
          {[10, 7.6, 5.2, 2.8].map((r, i) => (
            <g key={r}>{anneau(espece === "camelia" ? 7 : 9, r * 0.45, (x, y, _a, k) => <circle key={k} cx={x} cy={y} r={r * 0.62} fill={i % 2 ? clair : couleur} />, i * 0.4)}</g>
          ))}
          <circle r={1.6} fill={espece === "renoncule" ? "#6f8a42" : nuance(couleur, 0.8)} stroke="none" />
        </g>
      );
    case "rose":
      return (
        <g {...v}>
          <circle r={9.5} fill={couleur} />
          <path d="M0 0 C3 -2 4 2 1 4 C-4 6 -6 0 -3 -4 C1 -9 8 -6 8 0 C8 6 2 9 -3 8" fill="none" strokeWidth={1} />
          <path d="M-9 2 C-7 8 -1 10 4 9" fill="none" strokeWidth={0.8} />
        </g>
      );
    case "pivoine":
      return (
        <g {...v}>
          <circle r={12} fill={couleur} />
          {anneau(7, 7, (x, y, a, i) => <ellipse key={i} cx={x} cy={y} rx={5} ry={6.5} transform={`rotate(${a + 90} ${x} ${y})`} fill={clair} />)}
          {anneau(5, 3.4, (x, y, a, i) => <ellipse key={i} cx={x} cy={y} rx={3.4} ry={4.2} transform={`rotate(${a} ${x} ${y})`} fill={couleur} />, 0.5)}
          <circle r={2.2} fill={clair} />
        </g>
      );
    case "dahlia":
      return (
        <g {...v}>
          {anneau(14, 8, (x, y, a, i) => <ellipse key={i} cx={x} cy={y} rx={4.6} ry={1.9} transform={`rotate(${a} ${x} ${y})`} fill={couleur} />)}
          {anneau(11, 5, (x, y, a, i) => <ellipse key={i} cx={x} cy={y} rx={3.4} ry={1.7} transform={`rotate(${a} ${x} ${y})`} fill={clair} />, 0.3)}
          {anneau(7, 2.4, (x, y, a, i) => <ellipse key={i} cx={x} cy={y} rx={2.2} ry={1.4} transform={`rotate(${a} ${x} ${y})`} fill={couleur} />, 0.6)}
        </g>
      );
    case "marguerite":
    case "aster":
    case "tournesol": {
      const n = espece === "tournesol" ? 18 : espece === "aster" ? 20 : 16;
      const r = espece === "tournesol" ? 8.6 : espece === "aster" ? 6.2 : 7;
      const coeur = espece === "tournesol" ? "#3e2410" : "#e9c03c";
      return (
        <g {...v}>
          {anneau(n, r, (x, y, a, i) => <ellipse key={i} cx={x} cy={y} rx={espece === "tournesol" ? 4.6 : 4.2} ry={espece === "aster" ? 0.9 : 1.6} transform={`rotate(${a} ${x} ${y})`} fill={couleur} />)}
          <circle r={espece === "tournesol" ? 6 : 2.8} fill={coeur} stroke="none" />
        </g>
      );
    }
    case "cosmos":
      return (
        <g {...v}>
          {anneau(8, 6.6, (x, y, a, i) => (
            <path key={i} d="M-6 -3 L4 -4 L6 -1.6 L4.6 0 L6 1.6 L4 4 L-6 3 Z" transform={`translate(${x} ${y}) rotate(${a})`} fill={couleur} />
          ))}
          <circle r={2.6} fill="#e3b52c" stroke="none" />
        </g>
      );
    case "narcisse":
      return (
        <g {...v}>
          {anneau(6, 5.4, (x, y, a, i) => <ellipse key={i} cx={x} cy={y} rx={5.4} ry={2.8} transform={`rotate(${a} ${x} ${y})`} fill={couleur} />)}
          <circle r={3.8} fill="#ef9f33" stroke="#c9771c" />
          <circle r={2} fill="#f6c255" stroke="none" />
        </g>
      );
    case "iris":
      return (
        <g {...v}>
          {[-28, 0, 28].map((a) => <ellipse key={a} cx={0} cy={-7} rx={3.4} ry={7} transform={`rotate(${a} 0 0)`} fill={clair} />)}
          {[-62, 0, 62].map((a) => <ellipse key={a} cx={0} cy={6} rx={4.2} ry={7} transform={`rotate(${a} 0 0)`} fill={couleur} />)}
          {[-62, 0, 62].map((a) => <line key={a} x1={0} y1={1} x2={0} y2={7} transform={`rotate(${a} 0 0)`} stroke="#f0bf2a" strokeWidth={1.4} />)}
        </g>
      );
    case "lavande":
    case "glaieul":
    case "jacinthe": {
      const n = espece === "lavande" ? 9 : espece === "glaieul" ? 6 : 7;
      const pas = espece === "lavande" ? 2.6 : espece === "glaieul" ? 5 : 3;
      const r = espece === "lavande" ? 1.8 : espece === "glaieul" ? 4.6 : 3.2;
      return (
        <g {...v}>
          {Array.from({ length: n }, (_, i) => (
            <g key={i} transform={`translate(${(i % 2 ? 1 : -1) * r * 0.35} ${8 - i * pas}) scale(${1 - i * 0.05})`}>
              <circle r={r} fill={i % 2 ? clair : couleur} />
              {espece === "jacinthe" && <circle r={0.8} fill={trait} stroke="none" />}
            </g>
          ))}
        </g>
      );
    }
    case "lilas":
      return (
        <g {...v}>
          {Array.from({ length: 15 }, (_, i) => {
            const rang = Math.floor((Math.sqrt(8 * i + 1) - 1) / 2);
            const dans = i - (rang * (rang + 1)) / 2;
            return <circle key={i} cx={(dans - rang / 2) * 4.2} cy={-10 + rang * 4} r={2.6} fill={i % 3 ? couleur : clair} />;
          })}
        </g>
      );
    case "hortensia":
      return (
        <g {...v}>
          <circle r={11.5} fill={nuance(couleur, 0.85)} />
          {Array.from({ length: 13 }, (_, i) => {
            const a = i * 2.399;
            const r = Math.sqrt(i / 13) * 9;
            return (
              <g key={i} transform={`translate(${Math.cos(a) * r} ${Math.sin(a) * r}) rotate(${i * 27})`}>
                {[0, 90, 180, 270].map((b) => <ellipse key={b} cx={0} cy={-1.7} rx={1.5} ry={1.9} transform={`rotate(${b})`} fill={i % 2 ? clair : couleur} strokeWidth={0.3} />)}
              </g>
            );
          })}
        </g>
      );
    case "mimosa":
      return (
        <g>
          <path d="M-8 8 C-4 0 2 -6 9 -10 M-2 2 C-6 -3 -8 -6 -10 -7 M2 -3 C5 -1 8 0 10 1" stroke="#5a7a68" strokeWidth={1} fill="none" />
          {[[-9, -7], [-6, -4], [-3, -1], [-10, -3], [0, -5], [3, -7], [6, -9], [9, -11], [5, -3], [8, -1], [10, 2], [-1, 1], [2, -10], [-4, -8], [11, -7]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={2.3} fill={i % 3 ? couleur : clair} stroke={trait} strokeWidth={0.3} />
          ))}
        </g>
      );
    case "chardon":
      return (
        <g>
          {anneau(18, 8.5, (x, y, _a, i) => <line key={i} x1={0} y1={0} x2={x} y2={y} stroke={trait} strokeWidth={0.8} />)}
          <circle r={6.4} fill={couleur} stroke={trait} strokeWidth={0.6} />
          {anneau(10, 3.6, (x, y, _a, i) => <circle key={i} cx={x} cy={y} r={1} fill={clair} />)}
        </g>
      );
    case "graminees":
      return (
        <g fill="none" stroke={couleur} strokeLinecap="round">
          {[-18, -6, 6, 18].map((a) => (
            <g key={a} transform={`rotate(${a})`}>
              <path d="M0 10 C1 2 0 -6 -1 -14" strokeWidth={2.6} />
              <path d="M0 10 C1 2 0 -6 -1 -14" strokeWidth={0.8} stroke={clair} />
            </g>
          ))}
        </g>
      );
  }
}

/** Les fleurs hautes vont au fond du bouquet. */
const HAUTES: Forme[] = ["glaieul", "lavande", "graminees", "lilas", "tournesol", "mimosa", "iris", "jacinthe"];

/** Les places des têtes : un dôme au-dessus du nœud, deux rangs. */
function places(tiges: TigeChoisie[]) {
  const fond = tiges.filter((t) => HAUTES.includes(t.espece));
  const devant = tiges.filter((t) => !HAUTES.includes(t.espece));
  const rangs = fond.length && devant.length ? [{ liste: fond, r: 128, ouverture: 46 }, { liste: devant, r: 96, ouverture: 52 }] : [{ liste: tiges, r: 108, ouverture: 50 }];
  const sortie = new Map<string, { x: number; y: number; a: number }>();
  for (const rang of rangs) {
    const n = rang.liste.length;
    const ouverture = Math.min(rang.ouverture, 12 + n * 9);
    rang.liste.forEach((t, i) => {
      const a = n === 1 ? 0 : -ouverture + (2 * ouverture * i) / (n - 1);
      const vague = (i % 2 ? -8 : 6) * (n > 3 ? 1 : 0);
      const r = rang.r + vague;
      const rad = (a * Math.PI) / 180;
      sortie.set(t.cle, { x: 120 + Math.sin(rad) * r, y: 214 - Math.cos(rad) * r, a });
    });
  }
  return sortie;
}

export default function Bouquet({ tiges, className = "" }: { tiges: TigeChoisie[]; className?: string }) {
  const pos = places(tiges);
  // les têtes du fond d'abord, celles de devant par-dessus
  const ordre = [...tiges].sort((a, b) => Number(HAUTES.includes(b.espece)) - Number(HAUTES.includes(a.espece)));
  return (
    <svg viewBox="0 0 240 300" className={className} aria-hidden="true">
      {/* le papier, derrière */}
      <path d="M120 236 L30 112 C62 96 92 104 120 120 C148 104 178 96 210 112 Z" fill="#d9cfee" opacity={tiges.length ? 0.95 : 0.7} className={styles.papier} />
      {ordre.map((t) => {
        const p = pos.get(t.cle)!;
        return (
          <g key={t.cle}>
            <path
              className={styles.tige}
              style={{ d: `path("M120 220 Q${120 + (p.x - 120) * 0.35} ${170} ${p.x} ${p.y}")` } as React.CSSProperties}
              d={`M120 220 Q${120 + (p.x - 120) * 0.35} ${170} ${p.x} ${p.y}`}
              stroke="#4d7a3a"
              strokeWidth={2.2}
              fill="none"
              strokeLinecap="round"
            />
            <g className={styles.place} style={{ transform: `translate(${p.x}px, ${p.y}px) rotate(${p.a * 0.4}deg)` }}>
              <g className={styles.tete}>
                <g transform="scale(2)">
                  <Tete espece={t.espece} couleur={t.couleur} />
                </g>
              </g>
            </g>
          </g>
        );
      })}
      {/* le papier, devant, et le ruban */}
      <path d="M120 290 L70 176 C88 186 104 190 120 190 C136 190 152 186 170 176 Z" fill="#efeaf8" />
      <path d="M120 290 L70 176 C88 186 104 190 120 190 L120 290 Z" fill="#e2daf2" />
      <g>
        <path d="M120 222 C104 214 96 230 104 236 C110 240 116 230 120 224 C124 230 130 240 136 236 C144 230 136 214 120 222 Z" fill="#d4f36b" stroke="#8aa22e" strokeWidth={1} />
        <path d="M118 224 L108 258 M122 224 L134 256" stroke="#b8d24a" strokeWidth={3} strokeLinecap="round" />
      </g>
    </svg>
  );
}
