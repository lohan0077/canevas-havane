import type { Cafe } from "./donnees";

/** Le sachet d'un café : son heure en très grand, le reste en petit. */
export default function Sachet({ cafe, className = "" }: { cafe: Cafe; className?: string }) {
  return (
    <div aria-hidden="true" className={`relative mx-auto w-full max-w-[13rem] ${className}`}>
      <div className="mx-auto h-4 w-[92%] rounded-t-[6px] opacity-80" style={{ background: cafe.fond }} />
      <div className="flex aspect-[3/4] flex-col justify-between rounded-b-[10px] rounded-t-[3px] px-5 py-6 shadow-[0_24px_40px_-24px_rgba(43,27,18,0.7)]" style={{ background: cafe.fond, color: cafe.encre }}>
        <p className="font-[family-name:var(--titres)] text-[11px] font-semibold uppercase tracking-[0.24em]">Moins le Quart</p>
        <p className="font-[family-name:var(--titres)] text-[3.2rem] font-extralight leading-none tracking-[-0.03em]">{cafe.heure}</p>
        <p className="text-sm italic">{cafe.moment}</p>
      </div>
    </div>
  );
}
