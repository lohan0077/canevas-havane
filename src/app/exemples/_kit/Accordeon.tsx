/**
 * Questions et réponses qui s'ouvrent en glissant. `exclusif` : une seule ouverte
 * à la fois (le navigateur s'en charge, par l'attribut `name`).
 */
export default function Accordeon({
  questions,
  exclusif = true,
  nom = "questions",
  className = "",
}: {
  questions: { question: string; reponse: React.ReactNode }[];
  exclusif?: boolean;
  nom?: string;
  className?: string;
}) {
  return (
    <div className={`divide-y divide-[var(--trait)] border-y border-[var(--trait)] ${className}`}>
      {questions.map((q) => (
        <details key={q.question} name={exclusif ? nom : undefined} className="kit-accordeon group">
          <summary className="flex items-start justify-between gap-6 py-6 md:py-7">
            <span className="text-lg md:text-2xl font-[family-name:var(--titres)] leading-snug">{q.question}</span>
            <span aria-hidden="true" className="kit-plus mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--trait)] text-xl leading-none">
              +
            </span>
          </summary>
          <div className="pb-7 pr-12 text-base md:text-lg leading-relaxed text-[var(--doux)]">{q.reponse}</div>
        </details>
      ))}
    </div>
  );
}
