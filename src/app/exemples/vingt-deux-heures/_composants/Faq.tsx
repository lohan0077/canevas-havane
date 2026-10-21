/** Les questions, en accordéon natif. */
export default function Faq({ questions }: { questions: { q: string; r: string }[] }) {
  return (
    <div className="border-t-2 border-[var(--encre)]">
      {questions.map((x) => (
        <details key={x.q} className="group border-b-2 border-[var(--encre)]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-xl font-black tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
            {x.q}
            <span aria-hidden="true" className="grid place-items-center shrink-0 w-9 h-9 rounded-full bg-[var(--encre)] text-[var(--fond)] text-xl transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-6 text-lg leading-relaxed max-w-2xl">{x.r}</p>
        </details>
      ))}
    </div>
  );
}
