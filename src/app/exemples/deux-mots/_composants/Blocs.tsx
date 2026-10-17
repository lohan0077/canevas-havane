import type { Question } from "./donnees";

/** Le petit libellé au-dessus des titres. */
export function Libelle({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-texte)]">{children}</p>;
}

/** L'heure limite, écrite en gros, tout en haut de l'accueil et de la page livraison. */
export function HeureLimite({ niveau = 2 }: { niveau?: 1 | 2 }) {
  const Balise = niveau === 1 ? "h1" : "p";
  return (
    <section id="heure" aria-label="L'heure limite" className="bg-[var(--accent)] text-[var(--sur-accent)]">
      <div className="mx-auto max-w-6xl px-4 py-9 sm:px-6 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.22em]">Livraison dans la ville · du mardi au samedi</p>
        <Balise className="mt-3 font-[family-name:var(--titres)] text-[46px] leading-[1.02] [font-variant-numeric:lining-nums] sm:text-[84px]">
          Commandé avant 14 h, <span className="italic">livré aujourd&apos;hui.</span>
        </Balise>
        <p className="mt-4 text-base">Après 14 h : livré demain matin.</p>
      </div>
    </section>
  );
}

/** Questions dépliables, sans JavaScript : `<details>` fait tout. */
export function Faq({ questions }: { questions: Question[] }) {
  return (
    <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
      {questions.map((x) => (
        <li key={x.q}>
          <details className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-[family-name:var(--titres)] text-xl [&::-webkit-details-marker]:hidden">
              {x.q.replace(/ ([?!:;])/g, "\u00A0$1")}
              <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--encre)] text-lg text-[var(--fond)] transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="max-w-2xl pb-6 pr-12 leading-relaxed text-[var(--doux)]">{x.r}</p>
          </details>
        </li>
      ))}
    </ul>
  );
}
