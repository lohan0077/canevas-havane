import { QUESTIONS } from "./donnees";

/** Le libellé au-dessus des titres : petites capitales, numérotées comme des chapitres. */
export function Libelle({ n, children, clair = false }: { n: string; children: React.ReactNode; clair?: boolean }) {
  return (
    <p className={`flex items-baseline gap-3 text-[12px] font-semibold uppercase tracking-[0.12em] ${clair ? "" : "text-[var(--accent-texte)]"}`}>
      <span className="tabular-nums">{n}</span>
      <span aria-hidden="true" className="h-px w-10 self-center bg-current" />
      {children}
    </p>
  );
}

/** Le port d'un livre neuf : par la poste, 3 € au moins sous 35 € ; en boutique, rien. */
export function Port() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2 rounded-3xl border-2 border-[var(--encre)] bg-[var(--carte)] p-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em]">Par la poste</p>
        <p className="font-[family-name:var(--titres)] text-[64px] leading-none">3 €</p>
        <p className="leading-relaxed text-[var(--doux)]">au moins, pour moins de 35 € de livres neufs. Au-delà, le port ne peut toujours pas être gratuit.</p>
      </div>
      <div className="space-y-2 rounded-3xl bg-[var(--accent)] p-6 text-[var(--sur-accent)]">
        <p className="text-[12px] font-semibold uppercase tracking-[0.12em]">Retiré en boutique</p>
        <p className="font-[family-name:var(--titres)] text-[64px] leading-none">0 €</p>
        <p className="leading-relaxed">de port. C&apos;est la seule exception que la loi prévoit. Et le marque-page est dedans.</p>
      </div>
      <p className="text-[13px] text-[var(--doux)] sm:col-span-2">Loi n° 81-766 du 10 août 1981, art. 1 ; arrêté du 4 avril 2023, art. 1 (livres neufs).</p>
    </div>
  );
}

/** Questions et réponses dépliables, sans JavaScript. */
export function Faq() {
  return (
    <div className="space-y-3">
      {QUESTIONS.map((x) => (
        <details key={x.q} className="group rounded-3xl bg-[var(--carte)] px-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-[family-name:var(--titres)] text-[22px] leading-snug [&::-webkit-details-marker]:hidden">
            {x.q}
            <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--encre)] text-xl text-[var(--fond)] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="max-w-2xl pb-6 leading-relaxed text-[var(--doux)]">{x.r}</p>
        </details>
      ))}
    </div>
  );
}
