/**
 * Le dessous d'un plateau, et le numéro gravé au fer : le fil du bois en courbes, la
 * marque de l'atelier, le numéro. Un dessin — l'atelier est fictif.
 */
export default function Plaque({ numero = "31", className = "" }: { numero?: string; className?: string }) {
  return (
    <svg viewBox="0 0 360 220" className={className} role="img" aria-label={`Le numéro ${numero}, gravé sous le plateau`}>
      <defs>
        <linearGradient id="an-bois" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#D9AE78" />
          <stop offset="1" stopColor="#B98549" />
        </linearGradient>
      </defs>
      <rect width="360" height="220" rx="10" fill="url(#an-bois)" />
      {[18, 46, 78, 112, 150, 186].map((y, i) => (
        <path
          key={y}
          d={`M0 ${y} C 70 ${y - 10 - i * 2}, 140 ${y + 14}, 220 ${y + 2} S 330 ${y - 12}, 360 ${y + 4}`}
          fill="none"
          stroke="#8E5E2E"
          strokeOpacity=".35"
          strokeWidth="1.6"
        />
      ))}
      <ellipse cx="64" cy="186" rx="16" ry="7" fill="none" stroke="#7A4E25" strokeOpacity=".45" strokeWidth="1.6" />
      <ellipse cx="64" cy="186" rx="8" ry="3" fill="#7A4E25" fillOpacity=".35" />
      <g fill="#3B2416" fillOpacity=".86" className="font-[family-name:var(--titres)]">
        <text x="180" y="78" textAnchor="middle" fontSize="17" letterSpacing="5">APRÈS NOUS</text>
        <text x="180" y="150" textAnchor="middle" fontSize="64">N°&nbsp;{numero}</text>
      </g>
      <line x1="120" y1="96" x2="240" y2="96" stroke="#3B2416" strokeOpacity=".6" strokeWidth="1.4" />
    </svg>
  );
}
