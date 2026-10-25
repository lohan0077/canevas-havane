import Compteur from "./Compteur";
import Dessin from "./Dessin";
import type { Fromage } from "./donnees";

/**
 * La carte d'un fromage, posée sur le plateau comme une étiquette de musée : qui le
 * fait, d'où il vient, son lait, son âge (qui tourne), et la phrase à dire à table.
 * Marquée « exemple » : les producteurs sont inventés. « Son atelier », jamais « sa
 * ferme » : c'est Patience qui affine, dans sa cave (décret n° 2007-628, art. 9-1).
 */
export default function Carte({ f, className = "" }: { f: Fromage; className?: string }) {
  const lignes = [
    ["Qui le fait", f.quiLeFait],
    ["D'où il vient", f.dOu],
    ["Le lait", f.lait],
  ];
  return (
    <article data-film={`carte-${f.numero}`} className={`relative flex h-full flex-col gap-5 overflow-hidden rounded-t-[2.5rem] rounded-b-[1rem] border-2 border-[var(--encre)] bg-[var(--carte)] p-6 shadow-[8px_8px_0_var(--encre)] ${className}`}>
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="font-[family-name:var(--titres)] text-4xl italic leading-none text-[var(--accent-texte)] [font-variant-numeric:lining-nums]">N° {f.numero}</p>
          <h3 className="mt-2 text-[1.75rem] leading-tight">{f.nom}</h3>
        </div>
        <span className="shrink-0 rounded-full border border-[var(--encre)] px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.12em]">exemple</span>
      </header>
      <Dessin forme={f.forme} teinte={f.teinte} className="h-20 w-28" />
      <dl className="space-y-3 border-t border-[var(--trait)] pt-4 text-[15px]">
        {lignes.map(([t, v]) => (
          <div key={t}>
            <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">{t}</dt>
            <dd className="leading-snug">{v}</dd>
          </div>
        ))}
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">Son âge</dt>
          <dd className="pt-1"><Compteur entree={f.entree} dureeJours={f.dureeJours} /></dd>
        </div>
        <div className="rounded-[0.75rem] bg-[var(--accent)] p-4 text-[var(--sur-accent)]">
          <dt className="text-xs font-semibold uppercase tracking-[0.14em]">À dire à table</dt>
          <dd className="font-[family-name:var(--titres)] text-xl leading-snug">{f.phrase}</dd>
        </div>
      </dl>
    </article>
  );
}
