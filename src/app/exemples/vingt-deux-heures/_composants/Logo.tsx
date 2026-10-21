/** Le monogramme de Vingt-Deux Heures : « 22 », la soirée qui commence. */
export default function Logo({ taille = 38 }: { taille?: number }) {
  return (
    <svg viewBox="0 0 48 48" width={taille} height={taille} aria-hidden="true" className="shrink-0">
      <rect width="48" height="48" rx="12" fill="var(--accent)" />
      <text x="24" y="31" textAnchor="middle" fontSize="22" fontWeight="900" fill="var(--sur-accent)" style={{ fontFamily: "var(--titres)", letterSpacing: "-1px" }}>22</text>
      <circle cx="38" cy="10" r="3.5" fill="#F2B33D" />
    </svg>
  );
}
