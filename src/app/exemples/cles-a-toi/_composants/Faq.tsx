/** Les questions, en accordéon natif. */
export default function Faq({ questions }: { questions: { q: string; r: string }[] }) {
  return (
    <div className="space-y-3">
      {questions.map((x) => (
        <details key={x.q} className="group rounded-2xl bg-[var(--carte)] border border-[var(--trait)] px-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-[family-name:var(--titres)] text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {x.q}
            <span aria-hidden="true" className="shrink-0 text-2xl transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-5 text-lg leading-relaxed">{x.r}</p>
        </details>
      ))}
    </div>
  );
}
