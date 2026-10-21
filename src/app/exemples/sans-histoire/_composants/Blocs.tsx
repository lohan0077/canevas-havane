/** Un surtitre et un titre de section, sur le ton calme d'un registre. */
export function Intitule({ surtitre, titre, children, sombre = false, niveau = 2 }: { surtitre: string; titre: React.ReactNode; children?: React.ReactNode; sombre?: boolean; niveau?: 1 | 2 }) {
  const Titre = niveau === 1 ? "h1" : "h2";
  return (
    <div className="space-y-4 max-w-2xl">
      <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${sombre ? "text-[#F0A47F]" : "text-[var(--accent-texte)]"}`}>{surtitre}</p>
      <Titre className={`${niveau === 1 ? "text-[44px] sm:text-6xl" : "text-[34px] sm:text-5xl"} font-normal tracking-[-0.01em]`}>{titre}</Titre>
      {children && <div className={`text-[17px] leading-relaxed ${sombre ? "text-[#C7C1B4]" : "text-[var(--doux)]"}`}>{children}</div>}
    </div>
  );
}

/** Les questions fréquentes, dépliables sans JavaScript. */
export function Questions({ questions }: { questions: { question: string; reponse: string }[] }) {
  return (
    <div className="border-t border-[var(--trait)]">
      {questions.map((q) => (
        <details key={q.question} className="group border-b border-[var(--trait)]">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-[family-name:var(--titres)] text-xl sm:text-2xl leading-snug [&::-webkit-details-marker]:hidden">
            {q.question}
            <span aria-hidden="true" className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--encre)] text-lg transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="pb-6 pr-10 text-[17px] leading-relaxed text-[var(--doux)]">{q.reponse}</p>
        </details>
      ))}
    </div>
  );
}
