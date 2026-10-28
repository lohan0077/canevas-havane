/**
 * Le plan du quartier, dessiné : des maisons, des arbres, le parking du magasin, et la
 * boucle du premier tour, que parcourt un point jaune (animation CSS du tracé).
 * Décoratif.
 */
const BOUCLE = "M 70 210 C 70 120 130 70 220 70 C 320 70 370 110 370 190 C 370 270 320 300 230 300 C 140 300 70 290 70 210 Z";

export default function Quartier({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 440 370" aria-hidden="true" className={className}>
      <style>{`@keyframes tq-tour { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -100; } } .tq-point { animation: tq-tour 9s linear infinite; } @media (prefers-reduced-motion: reduce) { .tq-point { animation: none; } }`}</style>
      {/* Le fond : un îlot de verdure aux bords arrondis. */}
      <rect x="10" y="10" width="420" height="350" rx="70" fill="#E3EFD9" />
      {/* Les rues. */}
      <path d={BOUCLE} fill="none" stroke="#FFFFFF" strokeWidth="34" strokeLinejoin="round" />
      <path d={BOUCLE} fill="none" stroke="#2E6B4F" strokeWidth="3" strokeDasharray="10 12" pathLength={100} />
      {/* Le parking du magasin, au centre. */}
      <rect x="160" y="150" width="130" height="90" rx="18" fill="#FFF8EC" stroke="#1F3A2C" strokeWidth="3" />
      {[180, 205, 230, 255].map((x) => <path key={x} d={`M ${x} 160 v 26 M ${x} 204 v 26`} stroke="#EADFC8" strokeWidth="3" />)}
      <rect x="196" y="122" width="58" height="34" rx="8" fill="#E8553D" />
      <path d="M 196 130 h 58" stroke="#FFF8EC" strokeWidth="3" />
      {/* Les maisons et les arbres. */}
      {[
        [30, 40, "#F2C14E"], [350, 30, "#E8553D"], [26, 300, "#2E6B4F"], [360, 300, "#F2C14E"], [300, 330, "#E8553D"],
      ].map(([x, y, c]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <path d="M 0 22 L 20 4 L 40 22 V 46 H 0 Z" fill={String(c)} stroke="#1F3A2C" strokeWidth="3" strokeLinejoin="round" />
          <rect x="15" y="30" width="10" height="16" fill="#1F3A2C" />
        </g>
      ))}
      {[[120, 110], [320, 150], [130, 255], [270, 110], [110, 175]].map(([x, y]) => (
        <g key={`a-${x}-${y}`}>
          <circle cx={x} cy={y} r="16" fill="#2E6B4F" />
          <circle cx={x - 5} cy={y - 5} r="5" fill="#5E9A72" />
        </g>
      ))}
      {/* Le point qui fait le tour. */}
      <path d={BOUCLE} className="tq-point" fill="none" stroke="#1F3A2C" strokeWidth="40" strokeLinecap="round" pathLength={100} strokeDasharray="0.01 99.99" />
      <path d={BOUCLE} className="tq-point" fill="none" stroke="#F2C14E" strokeWidth="34" strokeLinecap="round" pathLength={100} strokeDasharray="0.01 99.99" />
      <path d={BOUCLE} className="tq-point" fill="none" stroke="#1F3A2C" strokeWidth="12" strokeLinecap="round" pathLength={100} strokeDasharray="0.01 99.99" />
    </svg>
  );
}
