/** Le monogramme de Sept Mille Dîners : un 7, dans une assiette. */
export default function Logo({ taille = 36 }: { taille?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={taille} height={taille} aria-hidden="true" className="shrink-0">
      <circle cx="20" cy="20" r="19" fill="var(--accent)" />
      <circle cx="20" cy="20" r="13.5" fill="none" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="1.4" />
      <text x="20" y="27.5" textAnchor="middle" fontSize="21" fontStyle="italic" fill="#FFFFFF" style={{ fontFamily: "var(--titres)" }}>7</text>
    </svg>
  );
}
