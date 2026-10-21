import { QUESTIONS } from "./donnees";

/** Une pastille ronde, comme un autocollant, au-dessus des titres. */
export function Pastille({ children, couleur = "#F2C14E" }: { children: React.ReactNode; couleur?: string }) {
  return (
    <p className="inline-flex items-center rounded-full px-4 py-1.5 text-[14px] font-bold text-[#1F3A2C]" style={{ background: couleur }}>
      {children}
    </p>
  );
}

/** Questions et réponses dépliables, en bulles. */
export function Faq() {
  return (
    <div className="space-y-3">
      {QUESTIONS.map((x) => (
        <details key={x.q} className="group rounded-[28px] bg-[var(--carte)] px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-[family-name:var(--titres)] text-[21px] font-bold leading-snug [&::-webkit-details-marker]:hidden">
            {x.q}
            <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#F2C14E] text-xl font-bold transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-6 leading-relaxed text-[var(--doux)]">{x.r}</p>
        </details>
      ))}
    </div>
  );
}
