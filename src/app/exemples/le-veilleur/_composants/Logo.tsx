/**
 * Le logo du Veilleur : une lanterne de veilleur de nuit, en laiton, et le nom en
 * Instrument Serif. Dessiné ici (aucun fichier image) ; décoratif, le nom suit en texte.
 */
export function Lanterne({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 40" className={className} aria-hidden="true">
      <path d="M16 2 v4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M9 10 q7 -6 14 0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="8" y="10" width="16" height="22" rx="3" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M16 15 c3 3.5 3 7 0 10 c-3 -3 -3 -6.5 0 -10z" fill="var(--accent)" />
      <path d="M6 36 h20" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M10 32 v4 M22 32 v4" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

export default function Logo({ clair = false }: { clair?: boolean }) {
  return (
    <span className={`flex items-center gap-2.5 ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--encre)]"}`}>
      <Lanterne className="h-8 w-7 shrink-0" />
      <span className="font-[family-name:var(--titres)] text-[27px] leading-none tracking-[-0.01em]">Le Veilleur</span>
    </span>
  );
}
