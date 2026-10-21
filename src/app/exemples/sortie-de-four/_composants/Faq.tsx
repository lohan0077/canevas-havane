/** Les questions, repliées : un clic ouvre la réponse, sans JavaScript. */
export default function Faq({ questions }: { questions: { q: string; r: string }[] }) {
  return (
    <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((x) => (
        <details key={x.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-[family-name:var(--titres)] text-2xl leading-snug [&::-webkit-details-marker]:hidden">
            {x.q}
            <span aria-hidden="true" className="mt-1 text-xl text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pt-3 leading-relaxed text-[var(--doux)]">{x.r}</p>
        </details>
      ))}
    </div>
  );
}
