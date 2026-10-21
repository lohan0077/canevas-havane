import { QUESTIONS } from "./donnees";

/** Le petit libellé au-dessus d'un titre : un tiret, des capitales espacées. */
export function Libelle({ children, clair = false }: { children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.16em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--accent-texte)]"}`}>
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

/** Questions et réponses dépliables : `<details>` fait tout, sans JavaScript. */
export function Faq() {
  return (
    <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {QUESTIONS.map((x) => (
        <li key={x.q}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-[family-name:var(--titres)] text-2xl leading-snug [&::-webkit-details-marker]:hidden">
              {x.q}
              <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center border border-[var(--trait)] text-xl transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="max-w-2xl pb-6 pr-10 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
