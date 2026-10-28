/** Le monogramme de Premier Trajet : une route qui file vers l'horizon, sur un panneau jaune. */
export default function Logo({ taille = 40 }: { taille?: number }) {
  return (
    <svg aria-hidden="true" width={taille} height={taille} viewBox="0 0 40 40" className="shrink-0">
      <rect width="40" height="40" rx="11" fill="var(--accent)" />
      <path d="M10 33 L18 9 M30 33 L22 9" stroke="var(--sur-accent)" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M20 31 V26 M20 21 V17 M20 13 V11" stroke="var(--sur-accent)" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
