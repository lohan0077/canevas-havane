// Les pictogrammes du site, dessinés au trait : un par projet (fête, bal, chantiers).
// Ils suivent la couleur du texte (currentColor) et sont décoratifs (aria-hidden).

const trait = { fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function Picto({ id, className = "h-9 w-9" }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {id === "fete" && (
        <g {...trait}>
          <path d="M4 40L14 18L24 10L34 18L44 40" />
          <path d="M14 18h20M24 10v30M14 18v22M34 18v22" />
          <path d="M8 26c5 3 9 3 16 0s11-3 16 0" strokeDasharray="1 4" />
          <path d="M2 42h44" />
        </g>
      )}
      {id === "bal" && (
        <g {...trait}>
          <path d="M3 40l9-18 12-8 12 8 9 18" />
          <path d="M12 22h24M24 14v26" />
          <path d="M24 14V5l7 3-7 3" />
          <path d="M33 30v7M33 30l5-2v7" />
          <circle cx="31.5" cy="37.5" r="1.8" />
          <circle cx="36.5" cy="35.5" r="1.8" />
          <path d="M1 42h46" />
        </g>
      )}
      {id === "tranchee" && (
        <g {...trait}>
          <path d="M3 20h12v14h10V20h20" />
          <path d="M15 20l3-6h4l3 6" />
          <path d="M33 8l-6 10 5 3 6-9z" />
          <path d="M38 12l5-6" />
        </g>
      )}
      {id === "terrasse" && (
        <g {...trait}>
          <path d="M6 34l8-16h28l-8 16z" />
          <path d="M20 18l-8 16M28 18l-8 16M36 18l-8 16M10 26h30" />
          <path d="M6 34v4h28v-4M34 38l8-16v-4" />
        </g>
      )}
      {id === "souche" && (
        <g {...trait}>
          <ellipse cx="24" cy="18" rx="11" ry="4" />
          <path d="M13 18v12M35 18v12" />
          <path d="M13 30c-3 3-7 4-10 4M35 30c3 3 7 4 10 4M19 32c-1 3-3 5-5 6M29 32c1 3 3 5 5 6M13 30c4 2 18 2 22 0" />
          <path d="M20 17.5c2 1 6 1 8 0" />
        </g>
      )}
      {id === "niveler" && (
        <g {...trait}>
          <path d="M3 34c8-6 14 2 21-2s13 2 21-1" strokeDasharray="3 4" />
          <path d="M3 26h42" />
          <rect x="15" y="10" width="18" height="8" rx="4" />
          <circle cx="24" cy="14" r="2" />
          <path d="M8 22l-4 4 4 4M40 22l4 4-4 4" />
        </g>
      )}
    </svg>
  );
}
