/** Les questions fréquentes, en accordéon natif : aucune ligne de JavaScript. */
export default function Faq({ questions }: { questions: { q: string; r: string }[] }) {
  return (
    <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((x) => (
        <details key={x.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {x.q}
            <span aria-hidden="true" className="grid place-items-center shrink-0 w-9 h-9 rounded-full bg-[var(--carte)] border border-[var(--trait)] text-xl transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-5 pr-10 leading-relaxed text-[var(--doux)]">{x.r}</p>
        </details>
      ))}
    </div>
  );
}
