/** Un vélo dessiné : deux roues, un cadre, et sa batterie s'il en a une. Sans marque. */
export default function Velo({ couleur = "#F2C14E", batterie = true, roues = "currentColor", className = "", titre }: { couleur?: string; batterie?: boolean; roues?: string; className?: string; titre?: string }) {
  return (
    <svg viewBox="0 0 220 130" className={className} role={titre ? "img" : undefined} aria-label={titre} aria-hidden={titre ? undefined : true}>
      <g fill="none" stroke={roues} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="50" cy="90" r="34" />
        <circle cx="170" cy="90" r="34" />
      </g>
      <g fill="none" stroke={couleur} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 90 L88 40 L150 40 L170 90 M88 40 L110 90 L150 40 M110 90 L50 90" />
        <path d="M80 26 L100 26 M88 40 L84 26" />
        <path d="M150 40 L144 20 L160 16" />
      </g>
      {batterie && <rect x="104" y="44" width="40" height="16" rx="5" transform="rotate(-38 124 52)" fill={roues} />}
    </svg>
  );
}
