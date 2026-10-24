import CoupeDuChantier from "../../_composants/CoupeDuChantier";
import type { Jour } from "./donnees";

/**
 * Une image du « film » d'un chantier : la coupe du bassin à cette étape, dans le
 * cadre d'un écran de tournage (repère « REC », jour du chantier). L'entreprise est
 * fictive : un schéma tient la place des images d'une vraie famille.
 */
export default function FilmChantier({ jour, rang, total }: { jour: Jour; rang: number; total: number }) {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#DDEFF4]">
      <div className="flex items-center justify-between gap-3 p-4 sm:p-5">
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--sombre)] px-3 py-1.5 text-[13px] font-bold text-[var(--sur-sombre)]">
          <span aria-hidden="true" className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#E5484D]" />
          REC · {jour.jour}
        </span>
        <span className="rounded-full bg-[var(--sombre)] px-3 py-1.5 text-[13px] font-bold text-[var(--sur-sombre)] tabular-nums">
          {rang} / {total}
        </span>
      </div>
      <div className="flex flex-1 items-center px-4 pb-6 sm:px-8">
        <CoupeDuChantier etape={jour.etape} fond="#DDEFF4" eau="#1F8FB3" libelle={`Coupe du chantier : ${jour.titre.toLowerCase()}`} />
      </div>
    </div>
  );
}
