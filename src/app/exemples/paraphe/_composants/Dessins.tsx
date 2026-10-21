/**
 * Les dessins à l'encre du site : une étagère tracée à la plume. Décoratif, d'où
 * `aria-hidden`.
 */
export function Etagere({ className = "" }: { className?: string }) {
  // Des livres debout, penchés, couchés : de simples traits, comme un croquis.
  const livres = [
    [20, 34, 92], [58, 26, 100], [88, 30, 84], [122, 22, 108], [148, 34, 90], [186, 28, 96],
    [272, 30, 88], [306, 24, 104], [334, 36, 94], [374, 26, 86], [404, 32, 100], [440, 22, 92],
  ];
  return (
    <svg viewBox="0 0 480 160" aria-hidden="true" className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {livres.map(([x, l, h]) => (
          <g key={x}>
            <rect x={x} y={140 - h} width={l} height={h} rx="2" />
            <path d={`M ${x + 5} ${140 - h + 12} h ${l - 10} M ${x + 5} ${140 - 14} h ${l - 10}`} opacity="0.6" />
          </g>
        ))}
        {/* Un livre penché, un autre couché, une plume. */}
        <path d="M 222 140 L 246 54 L 266 60 L 244 142" />
        <rect x="214" y="126" width="56" height="14" rx="2" opacity="0.8" />
        <path d="M 6 141 H 474" strokeWidth="3" />
        <path d="M 384 34 C 410 10, 450 8, 470 2 C 452 22, 430 40, 396 46 Z" opacity="0.7" />
        <path d="M 396 46 L 370 70" />
      </g>
    </svg>
  );
}
