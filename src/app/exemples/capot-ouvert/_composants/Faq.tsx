/** Les questions, en accordéon natif. */
export default function Faq({ questions }: { questions: { q: string; r: string }[] }) {
  return (
    <div className="border-t-[3px] border-[var(--trait)]">
      {questions.map((x) => (
        <details key={x.q} className="group border-b-[3px] border-[var(--trait)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-[family-name:var(--titres)] text-2xl font-bold [&::-webkit-details-marker]:hidden">
            {x.q}
            <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-[var(--sombre)] text-[var(--sur-sombre)] text-xl transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-6 text-lg leading-relaxed">{x.r}</p>
        </details>
      ))}
    </div>
  );
}
