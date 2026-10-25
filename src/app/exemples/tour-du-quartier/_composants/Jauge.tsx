"use client";

import { useEffect, useState } from "react";

/**
 * La batterie testée : la jauge se remplit jusqu'à la capacité mesurée, le
 * pourcentage compte avec elle. Un exemple, et la fiche le dit.
 */
export default function Jauge({ capacite, wh, testeLe }: { capacite: number; wh: number; testeLe: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (v >= capacite) return;
    const t = setTimeout(() => setV((x) => Math.min(capacite, x + 4)), v === 0 ? 1800 : 45);
    return () => clearTimeout(t);
  }, [v, capacite]);
  return (
    <div data-film="batterie" className="space-y-3 rounded-[24px] bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]">
      <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#C3D9C9]">Batterie {wh} Wh · testée le {testeLe}</p>
      <div className="flex items-center gap-3">
        <div className="relative h-9 flex-1 rounded-lg border-2 border-[var(--sur-sombre)] p-1" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={capacite} aria-label="Capacité restante de la batterie">
          <div className="h-full rounded bg-[#F2C14E]" style={{ width: `${v}%` }} />
          <span aria-hidden="true" className="absolute -right-2 top-1/2 h-3 w-1.5 -translate-y-1/2 rounded-r bg-[var(--sur-sombre)]" />
        </div>
        <p className="w-[92px] text-right font-[family-name:var(--titres)] text-[40px] font-bold leading-none tabular-nums text-[#F2C14E]">{v} %</p>
      </div>
      <p className="text-[14px]">de sa capacité d&apos;origine, mesurée au banc · <span className="font-semibold">exemple</span></p>
    </div>
  );
}
