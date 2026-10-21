import type { Question } from "./donnees";

/** Le petit libellé, en capitales espacées, entre deux filets. */
export function Surtitre({ children, centre = false }: { children: React.ReactNode; centre?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-texte)] ${centre ? "justify-center" : ""}`}>
      <span aria-hidden="true" className="h-px w-6 bg-current" />
      {children}
      <span aria-hidden="true" className="h-px w-6 bg-current" />
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
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-[family-name:var(--titres)] text-2xl [&::-webkit-details-marker]:hidden">
              {x.q.replace(/ ([?!:;])/g, " $1")}
              <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--accent)] font-[family-name:var(--texte)] text-lg transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="max-w-2xl pb-6 pr-12 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
