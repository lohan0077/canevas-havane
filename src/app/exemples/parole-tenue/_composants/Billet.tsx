/** Un billet d'avion en papier, écrit à la main : la destination, et pour qui. */
export default function Billet({ ou, pour, angle = 0, neuf = false }: { ou: string; pour: string; angle?: number; neuf?: boolean }) {
  return (
    <div
      className={`flex w-full overflow-hidden rounded-[4px] bg-[#FFFDF7] text-[var(--encre)] shadow-[0_14px_24px_-16px_rgba(31,61,54,0.7)] ${neuf ? "ring-2 ring-[#E5674B]" : ""}`}
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <div aria-hidden="true" className="grid w-10 place-items-center bg-[#E5674B] text-lg text-white">✈</div>
      <div className="min-w-0 flex-1 px-3 py-2.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--doux)]">Destination</p>
        <p className="truncate font-[family-name:var(--manuscrit)] text-2xl leading-none">{ou}</p>
        <p className="truncate font-[family-name:var(--manuscrit)] text-xl leading-tight text-[var(--doux)]">{pour}</p>
      </div>
    </div>
  );
}
