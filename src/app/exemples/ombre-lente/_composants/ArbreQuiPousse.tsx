/**
 * L'arbre du premier écran, qui pousse une fois, lentement, derrière le nom : du bâton à
 * la couronne. Ornement (masqué aux lecteurs d'écran) ; immobile avec « animations
 * réduites ». L'animation est une animation CSS : l'horloge virtuelle du tournage la suit.
 */
export default function ArbreQuiPousse({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 400 420" className={className}>
      <style>{`
        @keyframes ol-pousse { from { transform: scale(0.18); } to { transform: scale(1); } }
        @keyframes ol-feuilles { from { opacity: 0; transform: scale(0.6); } to { opacity: 1; transform: scale(1); } }
        .ol-arbre { transform-box: fill-box; transform-origin: 50% 100%; animation: ol-pousse 7s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
        .ol-couronne { transform-box: fill-box; transform-origin: 50% 100%; animation: ol-feuilles 5s 1.6s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
        @media (prefers-reduced-motion: reduce) { .ol-arbre, .ol-couronne { animation: none; } }
      `}</style>
      <g className="ol-arbre">
        <path d="M194 420 C 196 360, 192 300, 197 250 L 205 250 C 208 300, 205 360, 208 420 Z" fill="#B8862A" opacity="0.9" />
        <path d="M199 300 C 180 280, 160 268, 140 250" stroke="#B8862A" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M203 285 C 222 262, 244 250, 262 236" stroke="#B8862A" strokeWidth="7" fill="none" strokeLinecap="round" />
        <g className="ol-couronne" fill="#3F6B45">
          <circle cx="140" cy="210" r="78" opacity="0.55" />
          <circle cx="262" cy="200" r="82" opacity="0.55" />
          <circle cx="200" cy="140" r="104" opacity="0.6" />
          <circle cx="196" cy="226" r="70" opacity="0.5" />
        </g>
      </g>
    </svg>
  );
}
