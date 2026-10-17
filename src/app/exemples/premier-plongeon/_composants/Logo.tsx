/** Le symbole de Premier Plongeon : deux vagues dans un cercle, tracé pour la nuit. */
export function Symbole({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <circle cx="16" cy="16" r="14.6" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />
      <path d="M7 15.5c3 0 3-2.5 5-2.5S15 15.5 16 15.5s3-2.5 5-2.5 2 2.5 4 2.5" fill="none" stroke="#6FD3E8" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M7 20.5c3 0 3-2.5 5-2.5S15 20.5 16 20.5s3-2.5 5-2.5 2 2.5 4 2.5" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Le logo de Premier Plongeon : le symbole et le nom, en libellé. Dans une barre
 * étroite, `replie` ne garde que le symbole sur téléphone — le lien qui l'entoure
 * porte le nom pour les lecteurs d'écran.
 */
export default function Logo({ replie = false }: { replie?: boolean }) {
  return (
    <span className="flex items-center gap-2.5 text-white">
      <Symbole className="w-7 h-7 shrink-0" />
      <span className={`font-[family-name:var(--pp-libelles)] text-[13px] sm:text-sm font-bold tracking-[0.16em] whitespace-nowrap ${replie ? "max-[430px]:hidden" : ""}`}>PREMIER PLONGEON</span>
    </span>
  );
}
