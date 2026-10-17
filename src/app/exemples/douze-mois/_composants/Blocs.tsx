import type { Question } from "./donnees";

/** Une légende de musée : petites capitales espacées, un numéro. */
export function Legende({ n, children }: { n?: string; children: React.ReactNode }) {
  return (
    <p className="flex items-baseline gap-3 text-[11px] uppercase tracking-[0.26em] text-[var(--doux)]">
      {n && <span className="text-[var(--encre)]">{n}</span>}
      {children}
    </p>
  );
}

/** Questions dépliables, sans JavaScript : `<details>` fait tout. */
export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="divide-y divide-[var(--encre)] border-y border-[var(--encre)]">
      {questions.map((x, i) => (
        <li key={x.q}>
          <details className="group">
            <summary className="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-baseline gap-4 py-5 [&::-webkit-details-marker]:hidden">
              <span className="text-[11px] tracking-[0.2em] text-[var(--doux)]">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-[family-name:var(--titres)] text-2xl">{x.q.replace(/ ([?!:;])/g, " $1")}</span>
              <span aria-hidden="true" className="text-2xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="max-w-2xl pb-6 pl-10 pr-8 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
