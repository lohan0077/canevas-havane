import { ALLERGENES, GATEAUX, type Question } from "./donnees";

/** Le petit libellé en pilule au-dessus des titres. */
export function Pastille({ children }: { children: React.ReactNode }) {
  return <p className="inline-block rounded-full border-2 border-[var(--encre)] bg-[var(--carte)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em]">{children}</p>;
}

/** Le tableau des 14 allergènes, gâteau par gâteau : ce qu'il contient, en clair. */
export function TableauAllergenes() {
  return (
    <div className="overflow-x-auto rounded-[24px] border-2 border-[var(--encre)] bg-[var(--carte)]">
      <table id="tableau-allergenes" className="w-full text-left text-xs sm:text-sm">
        <caption className="sr-only">Les quatorze allergènes, gâteau par gâteau</caption>
        <thead>
          <tr className="border-b-2 border-[var(--encre)]">
            <th scope="col" className="p-2 font-bold sm:p-3">Allergène</th>
            {GATEAUX.map((g) => <th key={g.id} scope="col" className="p-2 text-center font-bold sm:p-3">{g.nom}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--trait)]">
          {ALLERGENES.map((a) => (
            <tr key={a}>
              <th scope="row" className="p-2 font-semibold sm:p-3">{a}</th>
              {GATEAUX.map((g) => (
                <td key={g.id} className="p-2 text-center sm:p-3">
                  {g.allergenes.includes(a) ? <span className="rounded-full bg-[var(--accent)] px-2 py-1 text-[11px] font-bold text-[var(--sur-accent)]">Contient</span> : <span className="text-[var(--doux)]">—</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Questions dépliables, sans JavaScript : `<details>` fait tout. */
export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="space-y-3">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="group rounded-[24px] border-2 border-[var(--encre)] bg-[var(--carte)]">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-lg font-bold [&::-webkit-details-marker]:hidden">
              {x.q.replace(/ ([?!:;])/g, " $1")}
              <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-xl text-[var(--sur-accent)] transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="px-5 pb-5 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
