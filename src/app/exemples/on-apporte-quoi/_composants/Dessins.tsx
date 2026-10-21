import type { Produit } from "./donnees";

/**
 * Un produit d'épicerie dessiné : bouteille, pot, sachet, tablette ou boîte, dans sa
 * teinte. Pas d'étiquette lisible, pas de marque : un dessin, pas une photo de
 * produit qu'on croirait réel.
 */
export function DessinProduit({ dessin, teinte, className = "" }: Pick<Produit, "dessin" | "teinte"> & { className?: string }) {
  const papier = "#FFFDF8";
  const trait = "#2A2118";
  return (
    <svg viewBox="0 0 80 100" aria-hidden="true" className={className}>
      {dessin === "bouteille" && (
        <g>
          <rect x="32" y="4" width="16" height="12" rx="3" fill={trait} />
          <path d="M33 16h14v12c0 4 9 8 9 18v46a4 4 0 0 1-4 4H28a4 4 0 0 1-4-4V46c0-10 9-14 9-18z" fill={teinte} />
          <rect x="29" y="56" width="22" height="24" rx="3" fill={papier} />
          <path d="M40 61c5 5 5 10 0 15-5-5-5-10 0-15z" fill={teinte} />
        </g>
      )}
      {dessin === "pot" && (
        <g>
          <rect x="18" y="16" width="44" height="14" rx="4" fill={trait} />
          <rect x="14" y="28" width="52" height="66" rx="14" fill={teinte} />
          <rect x="21" y="48" width="38" height="24" rx="3" fill={papier} />
          <rect x="27" y="56" width="26" height="3" rx="1.5" fill={teinte} />
          <rect x="31" y="62" width="18" height="3" rx="1.5" fill={teinte} />
        </g>
      )}
      {dessin === "sachet" && (
        <g>
          <path d="M16 22h48l4 72H12z" fill={teinte} />
          <path d="M16 22h48v8H16z" fill={trait} opacity=".25" />
          <path d="M22 14h36l6 8H16z" fill={teinte} />
          <circle cx="40" cy="58" r="15" fill={papier} />
          <circle cx="40" cy="58" r="8" fill="none" stroke={teinte} strokeWidth="3" />
        </g>
      )}
      {dessin === "tablette" && (
        <g>
          <rect x="12" y="20" width="56" height="74" rx="5" fill={teinte} />
          <rect x="12" y="20" width="56" height="74" rx="5" fill="none" stroke={trait} strokeOpacity=".25" strokeWidth="2" />
          <rect x="12" y="44" width="56" height="20" fill={papier} />
          <rect x="24" y="51" width="32" height="5" rx="2.5" fill={teinte} />
        </g>
      )}
      {dessin === "boite" && (
        <g>
          <ellipse cx="40" cy="30" rx="28" ry="9" fill={trait} />
          <path d="M12 30v52c0 5 12.5 9 28 9s28-4 28-9V30c0 5-12.5 9-28 9s-28-4-28-9z" fill={teinte} />
          <path d="M18 56h44v14H18z" fill={papier} />
        </g>
      )}
    </svg>
  );
}

/** Le monogramme : un point d'interrogation dans un cachet. */
export function Monogramme({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <circle cx="24" cy="24" r="22" fill="var(--accent)" />
      <circle cx="24" cy="24" r="17.5" fill="none" stroke="var(--sur-accent)" strokeWidth="1.5" strokeDasharray="2 3" />
      <path d="M18.5 19.5c0-3.6 2.6-5.8 5.8-5.8 3.3 0 5.6 2.1 5.6 5 0 4.6-5.4 4.4-5.4 8.6" fill="none" stroke="var(--sur-accent)" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="24.5" cy="33.5" r="2.1" fill="var(--sur-accent)" />
    </svg>
  );
}
