import type { Question } from "./donnees";

/** Le libellé des sections : capitales fines, très espacées, comme une légende de carte. */
export function Libelle({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`font-[family-name:var(--titres)] text-[11px] uppercase tracking-[0.32em] ${clair ? "text-[#A8C3D8]" : "text-[var(--doux)]"}`}>
      {children}
    </p>
  );
}

/** Un titre de section en capitales fines. */
export function Titre({ children, niveau = 2, className = "" }: { children: React.ReactNode; niveau?: 1 | 2; className?: string }) {
  const Balise = niveau === 1 ? "h1" : "h2";
  return <Balise className={`font-light uppercase tracking-[-0.01em] ${className}`}>{children}</Balise>;
}

/** Questions dépliables, sans JavaScript : `<details>` fait tout. */
export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-[family-name:var(--titres)] text-base uppercase tracking-[0.04em] [&::-webkit-details-marker]:hidden">
              {x.q.replace(/ ([?!:;])/g, "\u00A0$1")}
              <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--encre)] text-lg transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="max-w-2xl pb-6 pr-12 text-lg leading-relaxed">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
