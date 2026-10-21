/** Le cachet de Relue : un « R » dans la cire. */
export default function Logo({ taille = 34 }: { taille?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={taille} height={taille} aria-hidden="true" className="shrink-0">
      <path d="M20 2 C26 3 30 1 33 6 C38 10 37 15 38 20 C37 26 39 30 34 34 C30 38 25 37 20 38 C14 37 10 39 6 34 C2 30 3 25 2 20 C3 14 1 10 6 6 C10 2 15 3 20 2 Z" fill="var(--accent)" />
      <circle cx="20" cy="20" r="12.5" fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1.2" />
      <text x="20" y="26.5" textAnchor="middle" fontSize="19" fill="#FFFFFF" style={{ fontFamily: "var(--titres)" }}>R</text>
    </svg>
  );
}
