// Les ornements d'À Garder, dessinés : un timbre dentelé et un cachet de la poste.
// Décoratifs (aria-hidden) : ils disent « par la poste » sans un mot de plus.

export function Timbre({ className = "" }: { className?: string }) {
  const dents = Array.from({ length: 9 }, (_, i) => 12 + i * 12);
  return (
    <svg viewBox="0 0 120 144" className={className} aria-hidden="true" focusable="false">
      <rect x="0" y="0" width="120" height="144" fill="#FFFDF8" />
      {dents.map((x) => (
        <g key={x} fill="#F5EFE3">
          <circle cx={x} cy="0" r="4.5" />
          <circle cx={x} cy="144" r="4.5" />
        </g>
      ))}
      {Array.from({ length: 11 }, (_, i) => 12 + i * 12).map((y) => (
        <g key={y} fill="#F5EFE3">
          <circle cx="0" cy={y} r="4.5" />
          <circle cx="120" cy={y} r="4.5" />
        </g>
      ))}
      <rect x="12" y="12" width="96" height="120" fill="#C2381F" />
      <text x="60" y="88" textAnchor="middle" fill="#FFFDF8" style={{ fontFamily: "var(--titres)", fontSize: 76, fontStyle: "italic" }}>À</text>
      <text x="60" y="122" textAnchor="middle" fill="#FFFDF8" style={{ fontFamily: "var(--texte)", fontSize: 11, letterSpacing: "0.18em" }}>GARDER</text>
    </svg>
  );
}

export function Cachet({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 120" className={className} aria-hidden="true" focusable="false">
      <g fill="none" stroke="#1E2A5A" strokeWidth="3" opacity=".75">
        <circle cx="60" cy="60" r="44" />
        <circle cx="60" cy="60" r="36" />
        {[34, 50, 66, 82].map((y) => (
          <path key={y} d={`M108 ${y} q 14 -8 28 0 t 28 0 t 28 0 t 26 0`} />
        ))}
      </g>
      <text x="60" y="56" textAnchor="middle" fill="#1E2A5A" opacity=".8" style={{ fontFamily: "var(--texte)", fontSize: 11, letterSpacing: "0.14em", fontWeight: 700 }}>PAR LA</text>
      <text x="60" y="72" textAnchor="middle" fill="#1E2A5A" opacity=".8" style={{ fontFamily: "var(--texte)", fontSize: 11, letterSpacing: "0.14em", fontWeight: 700 }}>POSTE</text>
    </svg>
  );
}
