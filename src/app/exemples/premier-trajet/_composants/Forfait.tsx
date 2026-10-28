import { ecole, forfait } from "./donnees";

/**
 * Le forfait, ligne par ligne, dans l'ordre de l'arrêté du 19 juin 1987 (art. 3) :
 * répartition code / conduite, heures en plus du minimum, frais inclus, frais qui
 * restent à la charge de l'élève, total TTC. Les `id` servent au tournage.
 */
export default function Forfait({ compact = false }: { compact?: boolean }) {
  return (
    <article data-film="forfait" className="relative rounded-[28px] bg-[var(--carte)] border border-[var(--trait)] overflow-hidden">
      <div className="px-5 sm:px-7 pt-6 pb-5 border-b-2 border-dashed border-[var(--trait)] space-y-1">
        <p className="flex items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">{forfait.sous}</span>
          <span className="shrink-0 rotate-[4deg] rounded-md border-2 border-[var(--encre)] px-2.5 py-1 text-xs font-extrabold uppercase tracking-[0.14em]">Exemple</span>
        </p>
        <h3 className="text-3xl font-extrabold">{forfait.nom}</h3>
      </div>

      <div className="px-5 sm:px-7 py-5 space-y-6">
        <section aria-label="Les heures" className="space-y-1">
          {forfait.heures.map((h, i) => (
            <p key={h.libelle} id={["ligne-code", "ligne-volant", "ligne-minimum"][i]} className="flex items-baseline gap-3 py-2 scroll-mt-28">
              <span className="min-w-0">
                <span className="block font-semibold">{h.libelle}</span>
                {!compact && <span className="block text-sm text-[var(--doux)]">{h.detail}</span>}
              </span>
              <span aria-hidden="true" className="flex-1 border-b-2 border-dotted border-[var(--trait)] translate-y-[-4px]" />
              <span className="font-[family-name:var(--titres)] text-xl font-extrabold tabular-nums whitespace-nowrap">{h.valeur}</span>
            </p>
          ))}
        </section>

        <section id="ligne-inclus" className="space-y-2.5 scroll-mt-28">
          <h4 className="font-[family-name:var(--texte)] text-xs font-bold uppercase tracking-[0.16em] text-[var(--doux)]">Inclus dans le forfait</h4>
          <ul className="space-y-2">
            {forfait.inclus.map((x) => (
              <li key={x} className="flex gap-3">
                <span aria-hidden="true" className="mt-0.5 grid place-items-center shrink-0 w-6 h-6 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] text-xs font-extrabold">✓</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="ligne-charge" className="space-y-2.5 scroll-mt-28">
          <h4 className="font-[family-name:var(--texte)] text-xs font-bold uppercase tracking-[0.16em] text-[var(--doux)]">Reste à ta charge</h4>
          <ul className="space-y-2">
            {(compact ? forfait.aCharge.slice(0, 1) : forfait.aCharge).map((x) => (
              <li key={x} className="flex gap-3">
                <span aria-hidden="true" className="mt-0.5 grid place-items-center shrink-0 w-6 h-6 rounded-full border-2 border-[var(--encre)] text-xs font-extrabold">!</span>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div id="ligne-total" className="flex items-baseline justify-between gap-4 bg-[var(--sombre)] text-[var(--sur-sombre)] px-5 sm:px-7 py-5 scroll-mt-28">
        <span className="font-bold">Total</span>
        <span className="font-[family-name:var(--titres)] text-3xl font-extrabold tabular-nums">{forfait.total}</span>
      </div>
      {!compact && (
        <div id="ligne-arrete" className="px-5 sm:px-7 py-5 space-y-2">
          <p className="inline-flex rounded-full bg-[var(--fond)] border border-[var(--trait)] px-3 py-1 text-xs font-bold">Arrêté du 19 juin 1987, art. 3</p>
          <p className="text-sm text-[var(--doux)]">
            {ecole.nom}, auto-école · {ecole.adresse} · agrément n° {ecole.agrement}. Prix TTC d'exemple : l'école est fictive.
          </p>
        </div>
      )}
    </article>
  );
}
