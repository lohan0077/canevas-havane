/** Le monogramme de Rien à Signaler : une coche, rien de plus. */
export default function Logo({ taille = 34 }: { taille?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={taille} height={taille} aria-hidden="true" className="shrink-0">
      <circle cx="20" cy="20" r="19" fill="var(--sombre)" />
      <path d="M11 20.5 L17.5 27 L29.5 14" fill="none" stroke="var(--accent)" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
