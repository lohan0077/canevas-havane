import type { Savon } from "./donnees";

/**
 * Un pain de savon dessiné, ceint de sa bande de papier : la marque, le nom du souvenir,
 * et le numéro du lot. Ornement : le nom est écrit à côté, en texte.
 */
export function Pain({ savon, lot, className = "", incline = 0 }: { savon: Savon; lot?: string; className?: string; incline?: number }) {
  return (
    <div
      aria-hidden="true"
      className={`relative mx-auto aspect-[4/3] w-full max-w-[300px] rounded-[26px] shadow-[0_30px_50px_-28px_rgba(42,24,32,0.6)] ${className}`}
      style={{ background: `radial-gradient(120% 90% at 30% 20%, ${savon.fond}, ${savon.bord})`, transform: `rotate(${incline}deg)` }}
    >
      <span className="absolute inset-[7%] rounded-[20px] border border-white/40" />
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 bg-[#FFFBF5] px-4 py-3 text-center shadow-sm">
        <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#6A5260]">Souvenance</p>
        <p className="font-[family-name:var(--titres)] text-[22px] italic leading-tight text-[#3E2532]">{savon.nom}</p>
        {lot && <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#6A5260]">Lot {lot} · 100 g</p>}
      </div>
    </div>
  );
}
