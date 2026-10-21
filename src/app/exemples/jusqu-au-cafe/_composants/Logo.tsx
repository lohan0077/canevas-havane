/** Le monogramme de Jusqu'au Café : une tasse vue de dessus, dans un carré de chêne. */
export default function Logo({ taille = 34 }: { taille?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={taille} height={taille} aria-hidden="true" className="shrink-0">
      <rect width="40" height="40" rx="9" fill="var(--accent)" />
      <circle cx="18" cy="21" r="10" fill="none" stroke="var(--sur-accent)" strokeWidth="3" />
      <circle cx="18" cy="21" r="5" fill="var(--sur-accent)" />
      <path d="M28 18 h4 a3 3 0 0 1 0 6 h-4" fill="none" stroke="var(--sur-accent)" strokeWidth="3" />
    </svg>
  );
}
