import { reparation } from "./donnees";

/** L'étiquette attachée au sac de la vieille pièce : quoi, pourquoi, quand. */
export default function Etiquette() {
  const e = reparation.etiquette;
  return (
    <div className="relative mx-auto w-full max-w-[340px] rotate-[-3deg] rounded-[10px] border-[3px] border-[var(--trait)] bg-[var(--carte)] px-6 pb-6 pt-9 shadow-[8px_8px_0_var(--trait)]">
      <span aria-hidden="true" className="absolute left-1/2 top-3 h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-[var(--trait)] bg-[var(--fond)]" />
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Capot Ouvert · ta pièce</p>
      <p className="mt-2 font-[family-name:var(--titres)] text-3xl font-bold leading-tight">{e.piece}</p>
      <p className="mt-1 text-lg">{e.raison}</p>
      <p className="mt-4 border-t-2 border-dashed border-[var(--trait)] pt-3 text-sm font-semibold">{e.quand} · exemple</p>
    </div>
  );
}
