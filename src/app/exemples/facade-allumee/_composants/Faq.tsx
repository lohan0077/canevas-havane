/** Les questions, en accordéon natif : rien à charger, lisible sans script. */
export default function Faq({ questions }: { questions: { question: string; reponse: string }[] }) {
  return (
    <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((q) => (
        <details key={q.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {q.question}
            <span aria-hidden="true" className="mt-1 text-2xl leading-none text-[var(--accent-texte)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pt-4 leading-relaxed text-[var(--doux)]">{q.reponse}</p>
        </details>
      ))}
    </div>
  );
}
