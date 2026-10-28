/**
 * Les ornements de Premier Billet, dessinés à la façon d'une gravure de billet : une
 * rosace guillochée (des ellipses tournées autour d'un centre), un médaillon, une
 * frise ondulée, la première facture encadrée et la lettre de mission. Un billet
 * imaginaire, jamais la reproduction d'un billet en euros. Tout est décoratif.
 */

export function Rosace({ className = "", traits = 36, ry = 34 }: { className?: string; traits?: number; ry?: number }) {
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden="true" className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="0.45">
        {Array.from({ length: traits }, (_, i) => (
          <ellipse key={i} rx="92" ry={ry} transform={`rotate(${(i * 180) / traits})`} />
        ))}
        <circle r="96" strokeWidth="0.9" />
        <circle r="98.5" strokeWidth="0.4" />
        <circle r="30" strokeWidth="0.9" />
      </g>
    </svg>
  );
}

/** Le médaillon : PB dans un double cercle. */
export function Medaillon({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-current ${className}`}>
      <span className="absolute inset-[3px] rounded-full border border-current" />
      <span className="font-[family-name:var(--titres)] text-[14px] font-semibold tracking-tight">PB</span>
    </span>
  );
}

/** Une frise ondulée, comme le bord d'un billet : un filet qui court sur toute la largeur. */
export function Frise({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={`block h-3 w-full ${className}`} preserveAspectRatio="none" viewBox="0 0 240 12">
      <defs>
        <pattern id="pb-frise" width="24" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 6 Q6 0 12 6 T24 6" fill="none" stroke="currentColor" strokeWidth="0.9" />
          <path d="M0 6 Q6 12 12 6 T24 6" fill="none" stroke="currentColor" strokeWidth="0.9" />
        </pattern>
      </defs>
      <rect width="240" height="12" fill="url(#pb-frise)" />
    </svg>
  );
}

/** La première facture, payée, dans son cadre doré : l'image de la marque. */
export function FactureEncadree({ className = "", legende = true }: { className?: string; legende?: boolean }) {
  return (
    <figure className={`relative ${className}`}>
      <div className="bg-[linear-gradient(135deg,#E6C866,#A9841C_45%,#E0C25A_70%,#8C6C12)] p-[12px] shadow-[0_40px_70px_-30px_rgba(10,25,20,0.75)]">
        <div className="bg-[#FBF6EA] p-4 sm:p-6">
          <div className="relative overflow-hidden border border-[#DCCFB0] bg-white px-5 py-6 text-[#1E3B32]">
            <Rosace className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 text-[#C9A227] opacity-50" />
            <p className="relative font-[family-name:var(--titres)] text-[24px] font-semibold">Facture n°&nbsp;0001</p>
            <div className="relative mt-4 space-y-2" aria-hidden="true">
              <span className="block h-2 w-4/5 bg-[#E8DFC8]" />
              <span className="block h-2 w-3/5 bg-[#E8DFC8]" />
              <span className="block h-2 w-2/3 bg-[#E8DFC8]" />
            </div>
            <p className="relative mt-5 flex items-baseline justify-between gap-3">
              <span className="text-[13px]">Le 3 mars</span>
              <span className="border-2 border-[#2E6B55] px-2 py-0.5 text-[14px] font-bold uppercase tracking-[0.1em] text-[#2E6B55]">Payée ✓</span>
            </p>
          </div>
        </div>
      </div>
      {legende && <figcaption className="mt-4 text-center text-[13px] text-[var(--doux)]">Une première facture, encadrée · exemple</figcaption>}
    </figure>
  );
}

/** La lettre de mission, signée : ce qui est écrit avant de commencer. */
export function LettreDeMission({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#FBF6EA] p-7 text-[#1E3B32] shadow-[0_30px_60px_-30px_rgba(10,25,20,0.6)] sm:p-9 ${className}`}>
      <Rosace className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 text-[#C9A227] opacity-40" />
      <p className="relative text-[12px] font-semibold uppercase tracking-[0.2em] text-[#7A5C0C]">Lettre de mission · exemple</p>
      <p className="relative mt-3 font-[family-name:var(--titres)] text-[28px] font-semibold leading-tight">Ce que nous faisons, et le prix.</p>
      <dl className="relative mt-5 space-y-2 border-t border-[#DCCFB0] pt-4 text-[15px]">
        <div className="flex justify-between gap-4"><dt>Mission</dt><dd className="font-semibold">Comptabilité et comptes annuels</dd></div>
        <div className="flex justify-between gap-4"><dt>Statut</dt><dd className="font-semibold">SASU</dd></div>
        <div className="flex justify-between gap-4"><dt>Honoraires</dt><dd className="font-semibold">149 € HT / mois</dd></div>
      </dl>
      <p className="relative mt-6 flex items-end justify-between gap-4 border-t border-[#DCCFB0] pt-4 text-[13px]">
        <span>Signée avant de commencer</span>
        <span className="font-[family-name:var(--f-caveat)] text-[30px] leading-none">H. D.</span>
      </p>
    </div>
  );
}
