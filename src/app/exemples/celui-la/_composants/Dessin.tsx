import type { Fromage } from "./donnees";

/** Un fromage dessiné à l'encre : la forme, la teinte de la pâte, le trait de la croûte. */
export default function Dessin({ forme, teinte, className = "" }: Pick<Fromage, "forme" | "teinte"> & { className?: string }) {
  const t = { stroke: "#1F2A24", strokeWidth: 2.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 120 80" aria-hidden="true" className={className}>
      {forme === "meule" && (
        <g {...t}>
          <path d="M14 46 L60 18 L106 46 V58 L60 70 L14 58 Z" fill={teinte} />
          <path d="M14 46 L60 58 L106 46 M60 58 V70" fill="none" />
          <circle cx="44" cy="40" r="2.5" fill="none" /><circle cx="70" cy="34" r="2" fill="none" /><circle cx="78" cy="46" r="1.6" fill="none" />
        </g>
      )}
      {forme === "buche" && (
        <g {...t}>
          <rect x="12" y="30" width="86" height="30" rx="15" fill={teinte} />
          <ellipse cx="98" cy="45" rx="10" ry="15" fill="#FFFBF2" />
          <path d="M30 38 q6 -4 12 0 M54 50 q6 -4 12 0" fill="none" strokeWidth="1.6" />
        </g>
      )}
      {forme === "pyramide" && (
        <g {...t}><path d="M60 12 L98 66 H22 Z" fill={teinte} /><path d="M60 12 L60 66" fill="none" /></g>
      )}
      {forme === "carre" && (
        <g {...t}>
          <path d="M22 34 L60 22 L98 34 L60 46 Z" fill={teinte} />
          <path d="M22 34 V52 L60 64 V46 M98 34 V52 L60 64" fill={teinte} />
          <path d="M34 40 l8 3 M70 34 l8 -2" fill="none" strokeWidth="1.6" />
        </g>
      )}
      {forme === "rond" && (
        <g {...t}>
          <ellipse cx="60" cy="52" rx="44" ry="14" fill={teinte} />
          <path d="M16 40 V52 M104 40 V52" fill="none" />
          <ellipse cx="60" cy="40" rx="44" ry="14" fill={teinte} />
          <path d="M44 36 q4 3 8 0 M66 42 q4 3 8 0" fill="none" strokeWidth="1.6" />
        </g>
      )}
    </svg>
  );
}
