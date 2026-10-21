/** Les questions, en accordéon natif. */
export default function Faq({ questions }: { questions: { q: string; r: string }[] }) {
  return (
    <div className="space-y-3">
      {questions.map((x) => (
        <details key={x.q} className="group rounded-[20px] bg-[var(--carte)] border border-[var(--trait)] px-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-[family-name:var(--titres)] text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {x.q}
            <span aria-hidden="true" className="grid place-items-center shrink-0 w-8 h-8 rounded-full bg-[var(--fond)] text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-5 text-lg leading-relaxed">{x.r}</p>
        </details>
      ))}
    </div>
  );
}
