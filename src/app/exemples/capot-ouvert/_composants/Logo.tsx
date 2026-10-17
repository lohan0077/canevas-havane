/** Le monogramme de Capot Ouvert : « CO » sur un capot relevé, graphite et jaune. */
export default function Logo({ taille = 40 }: { taille?: number }) {
  return (
    <svg aria-hidden="true" width={taille} height={taille} viewBox="0 0 40 40" className="shrink-0">
      <rect width="40" height="40" rx="6" fill="var(--sombre)" />
      <path d="M6 15 L20 6 L34 15" fill="none" stroke="#F2C230" strokeWidth="3.2" strokeLinejoin="round" />
      <text x="20" y="33" textAnchor="middle" fill="#F2C230" style={{ font: "700 15px var(--titres)" }}>CO</text>
    </svg>
  );
}
