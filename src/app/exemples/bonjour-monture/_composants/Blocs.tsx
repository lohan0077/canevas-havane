import type { Visage } from "./donnees";

/** Le petit titre en capitales espacées qui coiffe chaque section. */
export function Surtitre({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">{children}</p>;
}

/** Questions et réponses dépliables : `<details>` fait tout, sans JavaScript. */
export function Faq({ questions }: { questions: { q: string; r: string }[] }) {
  return (
    <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {x.q}
              <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--trait)] text-xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="max-w-2xl pb-6 pr-10 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}

/** La silhouette d'une forme de visage, en un trait. */
export function FormeVisage({ forme, className = "" }: { forme: Visage["slug"]; className?: string }) {
  const contour = {
    rond: <circle cx="40" cy="52" r="34" />,
    ovale: <ellipse cx="40" cy="50" rx="29" ry="40" />,
    carre: <rect x="9" y="14" width="62" height="74" rx="16" />,
    allonge: <rect x="15" y="5" width="50" height="90" rx="25" />,
  }[forme];
  return (
    <svg viewBox="0 0 80 100" className={className} aria-hidden="true" fill="none" stroke="var(--accent)" strokeWidth="4">
      {contour}
    </svg>
  );
}
