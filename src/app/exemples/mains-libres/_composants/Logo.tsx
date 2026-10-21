/** Le signe de Mains Libres : une clé plate dans un cercle orange, ouverte comme une main. */
export default function Logo({ taille = 34 }: { taille?: number }) {
  return (
    <svg aria-hidden="true" width={taille} height={taille} viewBox="0 0 40 40" className="shrink-0">
      <circle cx="20" cy="20" r="19" fill="var(--accent)" />
      <path d="M12 28 L22 18" stroke="var(--sur-accent)" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M21.5 11.5 a7 7 0 1 0 7 7 l-4 0.5 -3.5 -3.5 z" fill="var(--sur-accent)" />
    </svg>
  );
}
