import type { Forme } from "./donnees";

// Une pièce dessinée, vue de côté : le corps émaillé, le pied laissé nu (la terre),
// une coulure d'émail et quelques points de fer. Aucune photo d'une vraie pièce :
// l'atelier est fictif, ses pièces aussi.
const TERRE = "#CDB79C";

const CORPS: Record<Forme, { corps: string; levre: [number, number, number, number]; pied: string; coulure: string }> = {
  bol: {
    corps: "M18 52 C18 92 46 118 100 118 C154 118 182 92 182 52 Z",
    levre: [100, 52, 82, 12],
    pied: "M70 112 L130 112 L126 128 L74 128 Z",
    coulure: "M60 52 C60 70 66 78 64 92 C62 84 56 76 56 52 Z",
  },
  vase: {
    corps: "M84 22 L116 22 C116 40 110 46 116 58 C150 74 164 104 152 134 C146 150 128 158 100 158 C72 158 54 150 48 134 C36 104 50 74 84 58 C90 46 84 40 84 22 Z",
    levre: [100, 22, 18, 5],
    pied: "M72 152 L128 152 L124 166 L76 166 Z",
    coulure: "M120 62 C128 80 126 92 130 104 C122 96 116 80 112 62 Z",
  },
  tasse: {
    corps: "M52 40 L148 40 L142 132 C140 142 128 146 100 146 C72 146 60 142 58 132 Z",
    levre: [100, 40, 48, 9],
    pied: "M66 140 L134 140 L132 152 L68 152 Z",
    coulure: "M76 40 C76 60 82 70 80 84 C74 74 70 60 70 40 Z",
  },
  assiette: {
    corps: "M8 70 C8 96 48 112 100 112 C152 112 192 96 192 70 Z",
    levre: [100, 70, 92, 22],
    pied: "M64 108 L136 108 L132 120 L68 120 Z",
    coulure: "M150 74 C150 86 154 92 152 100 C146 92 144 84 144 74 Z",
  },
};

export default function Piece({ forme, email, className = "", titre }: { forme: Forme; email: string; className?: string; titre?: string }) {
  const f = CORPS[forme];
  const [cx, cy, rx, ry] = f.levre;
  const hauteur = forme === "vase" ? 172 : forme === "tasse" ? 158 : 132;
  return (
    <svg viewBox={`0 0 200 ${hauteur}`} className={className} role={titre ? "img" : undefined} aria-label={titre} aria-hidden={titre ? undefined : true}>
      <path d={f.pied} fill={TERRE} />
      <path d={f.corps} fill={email} />
      {forme === "tasse" && <path d="M146 62 C176 62 178 112 144 112" fill="none" stroke={email} strokeWidth="12" strokeLinecap="round" />}
      <path d={f.coulure} fill="#000" opacity=".14" />
      <path d={f.corps} fill="url(#reflet)" opacity=".5" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={email} />
      <ellipse cx={cx} cy={cy + ry * 0.18} rx={rx * 0.86} ry={ry * 0.72} fill="#000" opacity=".22" />
      {[[62, 82], [128, 96], [104, 70], [86, 104], [146, 74]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={forme === "vase" ? y + 34 : y} r="1.6" fill="#2A1B12" opacity=".35" />
      ))}
      <defs>
        <linearGradient id="reflet" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" />
          <stop offset=".35" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".25" />
        </linearGradient>
      </defs>
    </svg>
  );
}
