import type { CleMethode } from "./donnees";

/** Les quatre cafetières, dessinées au trait. */
export function IconeMethode({ methode, className = "" }: { methode: CleMethode; className?: string }) {
  const t = { fill: "none", stroke: "currentColor", strokeWidth: 3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      {methode === "filtre" && (
        <g {...t}>
          <path d="M12 12h40L38 34H26z" />
          <path d="M22 40h20v12a4 4 0 0 1-4 4H26a4 4 0 0 1-4-4z" />
          <path d="M32 34v6" />
        </g>
      )}
      {methode === "piston" && (
        <g {...t}>
          <rect x="18" y="16" width="26" height="40" rx="3" />
          <path d="M44 24h6v22h-6M31 6v20M22 26h18" />
        </g>
      )}
      {methode === "expresso" && (
        <g {...t}>
          <path d="M14 30h30v8a14 14 0 0 1-14 14h-2a14 14 0 0 1-14-14z" />
          <path d="M44 34h4a5 5 0 0 1 0 10h-5M10 58h40" />
          <path d="M24 22c0-4 4-4 4-8M32 22c0-4 4-4 4-8" />
        </g>
      )}
      {methode === "italienne" && (
        <g {...t}>
          <path d="M22 8h20l-2 6H24z" />
          <path d="M20 14h24l-4 18H24z" />
          <path d="M24 32h16l4 22H20z" />
          <path d="M44 18c6 0 8 4 6 10l-6 8" />
        </g>
      )}
    </svg>
  );
}

/** Une tasse, pour l'abonnement réglé en tasses. */
export function Tasse({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path d="M8 18h26v10a12 12 0 0 1-12 12h-2A12 12 0 0 1 8 28z" fill="currentColor" />
      <path d="M34 21h3a5 5 0 0 1 0 10h-4" fill="none" stroke="currentColor" strokeWidth="3.5" />
      <path d="M16 12c0-3 3-3 3-6M24 12c0-3 3-3 3-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
