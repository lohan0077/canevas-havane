import type { Fromage } from "./donnees";
import Dessin from "./Dessin";

/**
 * La carte d'un fromage, posée sur le plateau : qui le fait, d'où il vient, son lait,
 * et la phrase à dire à table. Comme une étiquette de musée. Marquée « exemple » :
 * les producteurs sont inventés.
 */
export default function Carte({ f, className = "" }: { f: Fromage; className?: string }) {
  const lignes = [
    ["Qui le fait", f.quiLaFait],
    ["D'où il vient", f.dOu],
    ["Le lait", f.lait],
  ];
  return (
    <article data-film={`carte-${f.numero}`} className={`relative flex h-full flex-col gap-4 rounded-[6px] border border-[var(--encre)] bg-[var(--carte)] p-5 shadow-[6px_6px_0_var(--encre)] ${className}`}>
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="font-[family-name:var(--titres)] text-sm [font-variant-numeric:lining-nums]">N° {f.numero}</p>
          <h3 className="text-2xl leading-tight">{f.nom}</h3>
        </div>
        <span className="shrink-0 rounded-full border border-[var(--encre)] px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.12em]">exemple</span>
      </header>
      <Dessin forme={f.forme} teinte={f.teinte} className="h-20 w-28" />
      <dl className="space-y-3 border-t border-[var(--trait)] pt-3 text-[15px]">
        {lignes.map(([t, v]) => (
          <div key={t}>
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">{t}</dt>
            <dd className="leading-snug">{v}</dd>
          </div>
        ))}
        <div className="rounded-[4px] bg-[#F3EBD8] p-3">
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">À dire à table</dt>
          <dd className="font-[family-name:var(--titres)] text-lg leading-snug">{f.phrase}</dd>
        </div>
      </dl>
    </article>
  );
}
