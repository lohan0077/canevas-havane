/** Le monogramme de Nuit d'Août : une lune, dans la nuit. */
export default function Logo({ taille = 34 }: { taille?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={taille} height={taille} aria-hidden="true" className="shrink-0">
      <rect width="40" height="40" rx="12" fill="var(--sombre)" />
      <path d="M25 9 A12 12 0 1 0 31 27 A9.5 9.5 0 1 1 25 9 Z" fill="#F2B6A0" />
      <circle cx="12" cy="12" r="1.3" fill="#F3F5FA" />
      <circle cx="9" cy="22" r="1" fill="#F3F5FA" />
    </svg>
  );
}
