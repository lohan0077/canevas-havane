"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, entreprise } from "./donnees";
import { styles as s } from "./Habillage";

// Sur téléphone, les deux gestes qui remplissent l'agenda restent sous le pouce.
// Le numéro est pris dans la tranche que l'ARCEP réserve à la fiction.
export default function BarreMobile() {
  const chemin = usePathname();
  if (chemin.startsWith(`${DOSSIER}/ma-date`)) return null;

  return (
    <div className="print:hidden fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(255,255,255,0.13)] bg-[#04070d]/92 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden">
      <div className="flex gap-2">
        <a href={`tel:${entreprise.telephoneLien}`} className={`${s.boutonFantome} flex-1 px-3!`} aria-label={`Appeler ${entreprise.nom} au ${entreprise.telephone}`}>
          Appeler
        </a>
        <Link href={`${DOSSIER}/ma-date`} className={`${s.bouton} flex-[2] px-3!`}>
          Choisir ma semaine
        </Link>
      </div>
    </div>
  );
}
