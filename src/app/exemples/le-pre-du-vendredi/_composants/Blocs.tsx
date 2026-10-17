import type { Question } from "./donnees";

/** Le petit libellé au-dessus des titres : un filet, des capitales espacées. */
export function Surtitre({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-texte)]">
      <span aria-hidden="true" className="h-px w-8 bg-[var(--accent)]" />
      {children}
    </p>
  );
}

/** Questions dépliables, sans JavaScript : `<details>` fait tout. */
export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {x.q.replace(/ ([?!:;])/g, "\u00A0$1")}
              <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--trait)] text-xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="max-w-2xl pb-6 pr-10 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

/** L'en-tête d'une page intérieure. */
export function HautDePage({ surtitre, titre, children }: { surtitre: string; titre: React.ReactNode; children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl space-y-5 px-4 pb-10 pt-14 sm:px-6 sm:pt-20">
      <Surtitre>{surtitre}</Surtitre>
      <h1 className="max-w-3xl text-6xl sm:text-7xl">{titre}</h1>
      {children && <p className="max-w-2xl text-lg leading-relaxed">{children}</p>}
    </div>
  );
}
