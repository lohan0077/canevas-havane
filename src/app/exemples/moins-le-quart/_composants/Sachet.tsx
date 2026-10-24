import DateTorrefaction from "./DateTorrefaction";
import type { Cafe } from "./donnees";

/**
 * Le sachet d'un café : son heure en très grand, et la date de torréfaction en gros,
 * au tampon — « torréfié mardi », calculé chez le visiteur (toujours le dernier vrai
 * mardi). Dessiné : aucun vrai sachet ne porte ce nom.
 */
export default function Sachet({ cafe, className = "", tampon = true, film }: { cafe: Cafe; className?: string; tampon?: boolean; film?: string }) {
  return (
    <div data-film={film} className={`relative mx-auto w-full max-w-[14rem] ${className}`}>
      <div aria-hidden="true" className="mx-auto h-4 w-[92%] rounded-t-[6px] opacity-80" style={{ background: cafe.fond }} />
      <div className="flex aspect-[3/4] flex-col justify-between rounded-b-[12px] rounded-t-[3px] px-5 py-6 shadow-[0_28px_44px_-24px_rgba(43,27,18,0.75)]" style={{ background: cafe.fond, color: cafe.encre }}>
        <p className="font-[family-name:var(--titres)] text-[11px] font-semibold uppercase tracking-[0.24em]">Moins le Quart</p>
        <div>
          <p className="font-[family-name:var(--titres)] text-[3.2rem] font-extralight leading-none tracking-[-0.04em]">{cafe.heure}</p>
          <p className="mt-1 text-sm italic">{cafe.moment} · 250 g</p>
        </div>
        {tampon && (
          <div className="-mx-1 -rotate-6 rounded-lg border-[3px] border-[#A63A16] bg-[#FBF4E7] px-2 py-1.5 text-center text-[#A63A16]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em]">Torréfié le</p>
            <p className="font-[family-name:var(--titres)] text-lg font-bold leading-tight"><DateTorrefaction /></p>
          </div>
        )}
      </div>
    </div>
  );
}
