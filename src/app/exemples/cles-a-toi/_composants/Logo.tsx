/** Le monogramme de Clés à Toi : un « C » dans la tête d'une clé moutarde. */
export default function Logo({ taille = 38 }: { taille?: number }) {
  return (
    <svg aria-hidden="true" width={taille * 1.6} height={taille} viewBox="0 0 64 40" className="shrink-0">
      <circle cx="20" cy="20" r="18" fill="var(--accent)" stroke="var(--encre)" strokeWidth="2.5" />
      <path d="M26 13.5 A9 9 0 1 0 26 26.5" fill="none" stroke="var(--encre)" strokeWidth="4" strokeLinecap="round" />
      <path d="M38 20 H61 M52 20 V27 M58 20 V25" stroke="var(--encre)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
