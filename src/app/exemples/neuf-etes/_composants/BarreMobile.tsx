"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, entreprise } from "./donnees";

// Sur téléphone, les deux gestes qui remplissent l'agenda restent sous le pouce.
// Le numéro est pris dans la tranche que l'ARCEP réserve à la fiction.
export default function BarreMobile() {
  const chemin = usePathname();
  if (chemin.startsWith(`${DOSSIER}/ma-date`)) return null;

  return (
    <div className="print:hidden fixed inset-x-0 bottom-0 z-40 border-t border-white/15 bg-[var(--sombre)] px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-[var(--sur-sombre)] lg:hidden">
      <div className="flex gap-2">
        <a
          href={`tel:${entreprise.telephoneLien}`}
          aria-label={`Appeler ${entreprise.nom} au ${entreprise.telephone}`}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border-2 border-white/30 px-3 font-[family-name:var(--titres)] text-[15px] font-normal"
        >
          Appeler
        </a>
        <Link
          href={`${DOSSIER}/ma-date`}
          className="inline-flex min-h-12 flex-[2] items-center justify-center rounded-full bg-[var(--accent)] px-3 font-[family-name:var(--titres)] text-[15px] font-normal text-[var(--sur-accent)]"
        >
          Choisir ma semaine
        </Link>
      </div>
    </div>
  );
}
