/**
 * Les ornements de Premier Billet, dessinés à la façon d'une gravure de billet : une
 * rosace guillochée (des ellipses tournées autour d'un centre), un médaillon, et la
 * première facture encadrée. Un billet imaginaire, jamais la reproduction d'un billet
 * en euros.
 */

export function Rosace({ className = "", traits = 36 }: { className?: string; traits?: number }) {
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden="true" className={className}>
      <g fill="none" stroke="currentColor" strokeWidth="0.6">
        {Array.from({ length: traits }, (_, i) => (
          <ellipse key={i} rx="92" ry="34" transform={`rotate(${(i * 180) / traits})`} />
        ))}
        <circle r="96" strokeWidth="1.2" />
        <circle r="30" strokeWidth="1.2" />
      </g>
    </svg>
  );
}

/** Le médaillon : PB dans un double cercle. */
export function Medaillon({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-current ${className}`}>
      <span className="absolute inset-[3px] rounded-full border border-current" />
      <span className="font-[family-name:var(--titres)] text-[15px] font-semibold tracking-tight">PB</span>
    </span>
  );
}

/** La première facture, payée, dans son cadre doré : l'image de la marque. */
export function FactureEncadree({ className = "" }: { className?: string }) {
  return (
    <figure className={`relative ${className}`}>
      <div className="rounded-[4px] bg-[linear-gradient(135deg,#E6C866,#A9841C_45%,#E0C25A_70%,#8C6C12)] p-[14px] shadow-[0_30px_60px_-30px_rgba(30,59,50,0.7)]">
        <div className="bg-[#FBF6EA] p-5 sm:p-7">
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
      <figcaption className="mt-4 text-center text-[13px] text-[var(--doux)]">Une première facture, encadrée · exemple</figcaption>
    </figure>
  );
}
