/** Les questions, en accordéon natif. */
export default function Faq({ questions }: { questions: { q: string; r: string }[] }) {
  return (
    <div className="space-y-2">
      {questions.map((x) => (
        <details key={x.q} className="group rounded-[22px] bg-[var(--carte)] px-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-[family-name:var(--titres)] text-xl [&::-webkit-details-marker]:hidden">
            {x.q}
            <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--trait)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-5 leading-relaxed text-[var(--doux)]">{x.r}</p>
        </details>
      ))}
    </div>
  );
}
