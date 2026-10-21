/**
 * Une maison gravée au trait, son perron de trois marches au milieu : le dessin de la
 * marque, à la manière d'une gravure (hachures, arbres au trait). Purement décoratif.
 */
export default function Gravure({ className = "", id = "tm" }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 480 300" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <pattern id={`${id}-hachure`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" strokeWidth="0.9" />
        </pattern>
        <pattern id={`${id}-hachure-fine`} width="4" height="4" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="4" y2="0" strokeWidth="0.6" />
        </pattern>
      </defs>

      {/* Le sol */}
      <path d="M20 262 H460" strokeWidth="1.4" />
      <path d="M40 270 H180 M300 270 H440 M90 277 H150 M330 277 H400" strokeWidth="0.8" opacity="0.7" />

      {/* L'arbre de gauche */}
      <path d="M92 262 V196 M92 214 L78 200 M92 206 L104 192" strokeWidth="1.6" />
      <path d="M92 120 c-22 2 -34 18 -30 34 c-14 6 -16 26 -2 34 c4 14 24 16 32 8 c10 8 30 4 32 -10 c14 -6 12 -26 -2 -32 c2 -18 -14 -34 -30 -34 z" strokeWidth="1.3" />
      <path d="M72 150 c6 -4 12 -4 16 0 M98 140 c6 -3 12 -2 15 3 M70 176 c5 4 12 5 18 2 M104 170 c6 3 12 2 16 -3 M84 188 c4 3 10 3 14 0" strokeWidth="0.9" opacity="0.8" />

      {/* L'arbre de droite, plus mince */}
      <path d="M398 262 V180" strokeWidth="1.6" />
      <path d="M398 92 c-14 4 -20 22 -16 38 c-10 12 -8 34 4 42 c6 8 18 8 24 0 c12 -8 14 -30 4 -42 c4 -16 -2 -34 -16 -38 z" strokeWidth="1.3" />
      <path d="M390 120 c4 -2 9 -2 12 1 M388 146 c5 2 10 2 14 -1 M392 166 c4 2 8 2 11 0" strokeWidth="0.9" opacity="0.8" />

      {/* La maison */}
      <path d="M160 128 L240 74 L320 128" strokeWidth="1.8" />
      <path d="M150 132 L240 70 L330 132" strokeWidth="1.1" />
      <path d="M168 128 V262 H312 V128" strokeWidth="1.8" />
      <path d="M240 74 L320 128 H160 Z" fill={`url(#${id}-hachure-fine)`} stroke="none" opacity="0.55" />
      <rect x="276" y="84" width="14" height="26" strokeWidth="1.4" />
      <path d="M273 84 H293" strokeWidth="1.4" />

      {/* Les fenêtres */}
      {[[186, 148], [270, 148], [186, 200], [270, 200]].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="24" height="32" strokeWidth="1.4" />
          <path d={`M${x + 12} ${y} V${y + 32} M${x} ${y + 14} H${x + 24}`} strokeWidth="0.9" />
          <rect x={x - 7} y={y} width="6" height="32" fill={`url(#${id}-hachure)`} strokeWidth="0.9" />
          <rect x={x + 25} y={y} width="6" height="32" fill={`url(#${id}-hachure)`} strokeWidth="0.9" />
        </g>
      ))}
      <rect x="230" y="150" width="20" height="26" rx="10" strokeWidth="1.2" />

      {/* La porte, en haut du perron */}
      <path d="M226 238 V204 a14 14 0 0 1 28 0 V238" strokeWidth="1.6" />
      <path d="M240 190 V238" strokeWidth="0.9" />
      <circle cx="246" cy="222" r="1.4" fill="currentColor" stroke="none" />

      {/* Les trois marches */}
      <path d="M218 238 H262 V246 H218 Z" strokeWidth="1.5" />
      <path d="M212 246 H268 V254 H212 Z" strokeWidth="1.5" />
      <path d="M206 254 H274 V262 H206 Z" strokeWidth="1.5" />
      <path d="M218 246 H262 M212 254 H268" strokeWidth="0.6" opacity="0.6" />
      <path d="M206 262 L200 268 M274 262 L280 268" strokeWidth="0.8" opacity="0.7" />

      {/* Deux pots, de part et d'autre */}
      <path d="M200 262 l3 -12 h10 l3 12 z M264 262 l3 -12 h10 l3 12 z" strokeWidth="1.1" />
      <path d="M208 250 c-6 -8 -4 -16 0 -20 c4 4 6 12 0 20 M272 250 c-6 -8 -4 -16 0 -20 c4 4 6 12 0 20" strokeWidth="0.9" />

      {/* Des oiseaux */}
      <path d="M120 64 q6 -6 12 0 q6 -6 12 0 M346 48 q4 -4 8 0 q4 -4 8 0 M370 66 q3 -3 6 0 q3 -3 6 0" strokeWidth="1" />
    </svg>
  );
}
