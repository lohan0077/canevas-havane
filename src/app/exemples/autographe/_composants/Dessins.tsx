import type { Dessin } from "./donnees";

/**
 * Un produit d'épicerie dessiné : bouteille, pot, sachet, tablette ou boîte, dans sa
 * teinte, avec une collerette blanche. Pas d'étiquette lisible, pas de marque : un
 * dessin, pas une photo de produit qu'on croirait réel.
 */
export function DessinProduit({ dessin, teinte, className = "" }: { dessin: Dessin; teinte: string; className?: string }) {
  const papier = "#FFFCF6";
  const trait = "#1E2A4A";
  return (
    <svg viewBox="0 0 80 100" aria-hidden="true" className={className}>
      {dessin === "bouteille" && (
        <g>
          <rect x="32" y="4" width="16" height="12" rx="3" fill={trait} />
          <path d="M33 16h14v12c0 4 9 8 9 18v46a4 4 0 0 1-4 4H28a4 4 0 0 1-4-4V46c0-10 9-14 9-18z" fill={teinte} />
          <rect x="29" y="56" width="22" height="24" rx="3" fill={papier} />
          <path d="M33 70c3-5 6 2 8-3s5 2 6-1" fill="none" stroke={trait} strokeWidth="1.6" strokeLinecap="round" />
        </g>
      )}
      {dessin === "pot" && (
        <g>
          <rect x="18" y="16" width="44" height="14" rx="4" fill={trait} />
          <rect x="14" y="28" width="52" height="66" rx="14" fill={teinte} />
          <rect x="21" y="48" width="38" height="24" rx="3" fill={papier} />
          <path d="M26 62c4-7 8 3 11-3s7 3 9-1 6 2 8-1" fill="none" stroke={trait} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      )}
      {dessin === "sachet" && (
        <g>
          <path d="M16 22h48l4 72H12z" fill={teinte} />
          <path d="M16 22h48v8H16z" fill={trait} opacity=".25" />
          <path d="M22 14h36l6 8H16z" fill={teinte} />
          <rect x="22" y="48" width="36" height="22" rx="3" fill={papier} />
          <path d="M27 61c4-6 7 3 10-2s6 3 9-1 5 2 7 0" fill="none" stroke={trait} strokeWidth="1.6" strokeLinecap="round" />
        </g>
      )}
      {dessin === "tablette" && (
        <g>
          <rect x="12" y="20" width="56" height="74" rx="5" fill={teinte} />
          <rect x="12" y="20" width="56" height="74" rx="5" fill="none" stroke={trait} strokeOpacity=".25" strokeWidth="2" />
          <rect x="12" y="44" width="56" height="20" fill={papier} />
          <path d="M22 56c4-6 8 3 11-2s7 3 10-1 7 2 14 0" fill="none" stroke={trait} strokeWidth="1.6" strokeLinecap="round" />
        </g>
      )}
      {dessin === "boite" && (
        <g>
          <ellipse cx="40" cy="30" rx="28" ry="9" fill={trait} />
          <path d="M12 30v52c0 5 12.5 9 28 9s28-4 28-9V30c0 5-12.5 9-28 9s-28-4-28-9z" fill={teinte} />
          <path d="M18 56h44v14H18z" fill={papier} />
          <path d="M24 64c4-5 7 3 10-1s6 2 9-1 6 2 12 0" fill="none" stroke={trait} strokeWidth="1.6" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
