/** Le signe de Pas Souple : un piquet bien droit, à côté d'une courbe qui n'y arrive pas. */
export default function Logo({ taille = 30 }: { taille?: number }) {
  return (
    <svg aria-hidden="true" width={taille} height={taille} viewBox="0 0 32 32" className="shrink-0">
      <circle cx="16" cy="16" r="15" fill="var(--accent)" />
      <path d="M11 8 V24" stroke="var(--sur-accent)" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M16 24 C 17 15, 21 11, 24 10" fill="none" stroke="var(--sur-accent)" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
