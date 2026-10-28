/** Les questions, en accordéon natif. */
export default function Faq({ questions }: { questions: { q: string; r: string }[] }) {
  return (
    <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((x, i) => (
        <details key={x.q} className="group">
          <summary className="flex cursor-pointer list-none items-baseline gap-4 py-5 [&::-webkit-details-marker]:hidden">
            <span className="font-[family-name:var(--titres)] text-sm text-[var(--accent-texte)] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex-1 font-[family-name:var(--titres)] text-xl font-semibold">{x.q}</span>
            <span aria-hidden="true" className="text-2xl transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-6 pl-9 leading-relaxed text-[var(--doux)]">{x.r}</p>
        </details>
      ))}
    </div>
  );
}
