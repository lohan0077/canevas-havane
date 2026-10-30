import { PIECES, POSE, REPERES, ROTULES, SQUELETTE, TACHES, profil, type Ancre, type IdZone, type Piece } from "./mannequin-forme";

// Le mannequin vu de face, en dessin : ce que la page montre avant que la 3D arrive, et
// ce qu'elle garde si le navigateur ne sait pas faire de 3D. Il est calculé depuis les
// mêmes mesures que la 3D (mannequin-forme.ts), sans three.js : rien de lourd dans le
// premier rendu. La zone choisie s'y allume comme sur le mannequin.

/* ----------------------- la pose, ramenée au plan de face ----------------------- */

type Repere2D = { a: number; x: number; y: number };
const suivre = (p: Repere2D, x: number, y: number, a = 0): Repere2D => ({
  a: p.a + a,
  x: p.x + x * Math.cos(p.a) - y * Math.sin(p.a),
  y: p.y + x * Math.sin(p.a) + y * Math.cos(p.a),
});

type Trace = { repere: Repere2D; piece?: Piece; y?: number; rotule?: number; pied?: boolean; matiere: "corps" | "rotule" };
const traces: Trace[] = [];
const ancres = {} as Record<Ancre, Repere2D>;

const bassin = suivre({ a: 0, x: 0, y: 0 }, 0, SQUELETTE.bassin, POSE.bassin.z);
ancres.bassin = bassin;
let plusBas = Infinity;
for (const cote of [1, -1] as const) {
  const G = cote === 1;
  const hanche = suivre(bassin, cote * SQUELETTE.hanche.x, SQUELETTE.hanche.y, (G ? POSE.hancheG : POSE.hancheD).z);
  const genou = suivre(hanche, 0, SQUELETTE.genou, (G ? POSE.genouG : POSE.genouD).z);
  const cheville = suivre(genou, 0, SQUELETTE.cheville, (G ? POSE.chevilleG : POSE.chevilleD).z);
  traces.push(
    { repere: hanche, piece: PIECES.cuisse, y: -(ROTULES.hanche + 0.012 + PIECES.cuisse.longueur / 2), matiere: "corps" },
    { repere: genou, piece: PIECES.jambe, y: -(ROTULES.genou + 0.006 + PIECES.jambe.longueur / 2), matiere: "corps" },
    { repere: cheville, pied: true, matiere: "corps" },
    { repere: hanche, rotule: ROTULES.hanche, matiere: "rotule" },
    { repere: genou, rotule: ROTULES.genou, matiere: "rotule" },
    { repere: cheville, rotule: ROTULES.cheville, matiere: "rotule" },
  );
  plusBas = Math.min(plusBas, cheville.y - 0.044 - 0.6 * PIECES.pied.bas);
}
traces.unshift({ repere: bassin, piece: PIECES.bassin, y: 0, matiere: "corps" });
const taille = suivre(bassin, 0, SQUELETTE.taille, POSE.taille.z);
const thorax = suivre(taille, 0, SQUELETTE.thorax, POSE.thorax.z);
const cou = suivre(thorax, 0, SQUELETTE.cou);
const tete = suivre(cou, 0, SQUELETTE.tete, POSE.tete.z);
Object.assign(ancres, { taille, thorax, cou, tete });
traces.push(
  { repere: taille, piece: PIECES.ventre, y: 0.085, matiere: "corps" },
  { repere: taille, rotule: ROTULES.taille, matiere: "rotule" },
  { repere: thorax, piece: PIECES.thorax, y: PIECES.thorax.longueur / 2, matiere: "corps" },
  { repere: cou, piece: PIECES.cou, y: 0.052, matiere: "corps" },
  { repere: cou, rotule: ROTULES.cou, matiere: "rotule" },
  { repere: tete, piece: PIECES.tete, y: PIECES.tete.longueur / 2, matiere: "corps" },
);
for (const cote of [1, -1] as const) {
  const G = cote === 1;
  const epaule = suivre(thorax, cote * SQUELETTE.epaule.x, SQUELETTE.epaule.y, (G ? POSE.epauleG : POSE.epauleD).z);
  const coude = suivre(epaule, 0, SQUELETTE.coude, (G ? POSE.coudeG : POSE.coudeD).z);
  const poignet = suivre(coude, 0, SQUELETTE.poignet, (G ? POSE.poignetG : POSE.poignetD).z);
  ancres[G ? "epauleG" : "epauleD"] = epaule;
  traces.push(
    { repere: epaule, piece: PIECES.bras, y: -(ROTULES.epaule + 0.008 + PIECES.bras.longueur / 2), matiere: "corps" },
    { repere: coude, piece: PIECES.avantBras, y: -(ROTULES.coude + 0.006 + PIECES.avantBras.longueur / 2), matiere: "corps" },
    { repere: poignet, piece: PIECES.main, y: -(ROTULES.poignet + 0.004 + PIECES.main.longueur / 2), matiere: "corps" },
    { repere: epaule, rotule: ROTULES.epaule, matiere: "rotule" },
    { repere: coude, rotule: ROTULES.coude, matiere: "rotule" },
    { repere: poignet, rotule: ROTULES.poignet, matiere: "rotule" },
  );
}

/* ------------------------------ l'échelle du dessin ------------------------------ */

// Le dessin est en mètres, y vers le haut ; le SVG compte en unités de 1/1000 de mètre,
// y vers le bas. Les pieds posent sur le socle, comme en 3D.
const E = 1000;
const X = (x: number) => Math.round(x * E);
const Y = (y: number) => Math.round(-(y - plusBas) * E);
const deg = (a: number) => (-a * 180) / Math.PI;

function chemin(p: Piece) {
  const pts = profil(p, 28).map(([r, y]) => [r * (p.echelleX ?? 1), y] as const);
  const d = [...pts.map(([r, y]) => `${X(r)},${X(-y)}`), ...pts.reverse().map(([r, y]) => `${X(-r)},${X(-y)}`)];
  return `M${d.join("L")}Z`;
}

const centreTaches = TACHES.map((t) => {
  const p = suivre(ancres[t.ancre], t.x, t.y);
  return { zone: t.zone, x: X(p.x), y: Y(p.y), r: X(t.rayon * 1.25) };
});
const centreReperes = (Object.keys(REPERES) as IdZone[]).map((z) => {
  const r = REPERES[z];
  const p = suivre(ancres[r.ancre], r.x, r.y);
  return { zone: z, x: X(p.x), y: Y(p.y), devant: r.z > 0.05, derriere: r.z < -0.05 };
});
const haut = Y(2.02 + plusBas);
const bassinBas = suivre(bassin, 0, -0.05);

export default function MannequinPlan({ zone, deDos }: { zone: IdZone | null; deDos: boolean }) {
  return (
    <svg
      // Cadré comme la 3D : la tête à 8 % du haut, le socle à 6 % du bas.
      viewBox={`-700 ${haut - 195} 1400 ${-haut + 195 + 215}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="lp-bois" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#9C7048" />
          <stop offset="0.3" stopColor="#D9B78B" />
          <stop offset="0.5" stopColor="#ECD2A9" />
          <stop offset="0.78" stopColor="#C99D6E" />
          <stop offset="1" stopColor="#6E4C34" />
        </linearGradient>
        <radialGradient id="lp-rotule" cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#EBCDA6" />
          <stop offset="0.55" stopColor="#B88A5D" />
          <stop offset="1" stopColor="#6B4930" />
        </radialGradient>
        <radialGradient id="lp-lueur">
          <stop offset="0" stopColor="#FFE9CC" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#C8CFFF" stopOpacity="0.45" />
          <stop offset="1" stopColor="#B4BEFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lp-ombre">
          <stop offset="0" stopColor="#02051A" stopOpacity="0.55" />
          <stop offset="1" stopColor="#02051A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="60" cy="40" rx="560" ry="60" fill="url(#lp-ombre)" />
      <g transform={deDos ? "scale(-1 1)" : undefined}>
        {/* Le socle et sa tige */}
        <rect x={-390} y={0} width={780} height={70} rx={22} fill="#B48A62" />
        <rect x={-390} y={0} width={780} height={10} rx={5} fill="#D7B48A" />
        <line x1={0} y1={0} x2={X(bassinBas.x)} y2={Y(bassinBas.y)} stroke="#AEB5C4" strokeWidth={21} strokeLinecap="round" />
        {traces.map((t, i) => {
          const tr = `translate(${X(t.repere.x)} ${Y(t.repere.y)}) rotate(${deg(t.repere.a)})`;
          if (t.rotule) return <circle key={i} transform={tr} r={X(t.rotule)} fill="url(#lp-rotule)" />;
          if (t.pied)
            return <ellipse key={i} transform={tr} cy={X(0.044)} rx={X(PIECES.pied.bas * 0.95)} ry={X(PIECES.pied.bas * 0.6)} fill="url(#lp-bois)" />;
          return (
            <g key={i} transform={tr}>
              <path d={chemin(t.piece!)} transform={`translate(0 ${X(-(t.y ?? 0))})`} fill="url(#lp-bois)" />
            </g>
          );
        })}
        {centreTaches.map((t, i) => (
          <circle
            key={i}
            cx={t.x}
            cy={t.y}
            r={t.r}
            fill="url(#lp-lueur)"
            style={{ mixBlendMode: "screen", opacity: zone === t.zone ? 1 : 0, transition: "opacity 0.6s ease" }}
          />
        ))}
        {centreReperes.map((r) =>
          // Vu de face, les repères du dos sont cachés ; vu de dos, ceux du ventre.
          r.zone === zone || (deDos ? r.devant : r.derriere) ? null : (
            <g key={r.zone} transform={`translate(${r.x} ${r.y})`}>
              <circle r={26} fill="none" stroke="#F4F5FA" strokeWidth={6} />
              <circle r={10} fill="#F4F5FA" />
            </g>
          ),
        )}
      </g>
    </svg>
  );
}
