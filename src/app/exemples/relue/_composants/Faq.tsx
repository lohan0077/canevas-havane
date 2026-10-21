/** Les questions, en accordéon natif. */
export default function Faq({ questions }: { questions: { q: string; r: string }[] }) {
  return (
    <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((x) => (
        <details key={x.q} className="group">
          <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 py-5 font-[family-name:var(--titres)] text-2xl leading-snug [&::-webkit-details-marker]:hidden">
            {x.q}
            <span aria-hidden="true" className="shrink-0 text-2xl text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-6 text-lg leading-relaxed max-w-2xl">{x.r}</p>
        </details>
      ))}
    </div>
  );
}
