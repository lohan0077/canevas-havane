"use client";

import { useState } from "react";
import { aLUnite, euros, forfait } from "./donnees";

/**
 * Ce que coûtera le permis selon les heures estimées à l'évaluation : le forfait,
 * plus les heures au-delà de 20, au tarif à l'unité. Un exemple de calcul, pas un devis.
 */
export default function Simulateur() {
  const [heures, setHeures] = useState(24);
  const lecon = aLUnite[1].prix;
  const enPlus = Math.max(0, heures - 20);
  const total = forfait.total + enPlus * lecon;
  const rempli = ((heures - 20) / 20) * 100;
  return (
    <div className="rounded-[28px] bg-[var(--carte)] border border-[var(--trait)] p-6 sm:p-8 space-y-6">
      <label className="block space-y-3">
        <span className="flex items-baseline justify-between gap-4">
          <span className="font-[family-name:var(--titres)] font-bold">Heures estimées à l'évaluation</span>
          <span className="font-[family-name:var(--titres)] text-3xl font-bold tabular-nums">{heures} h</span>
        </span>
        <input
          type="range"
          min={20}
          max={40}
          value={heures}
          onChange={(e) => setHeures(Number(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-[var(--encre)]"
          style={{ background: `linear-gradient(90deg, var(--accent-texte) ${rempli}%, var(--trait) ${rempli}%)` }}
        />
      </label>
      <div className="space-y-2 text-lg" aria-live="polite">
        <p className="flex justify-between gap-4"><span>Forfait (20 h au volant)</span><span className="tabular-nums">{euros(forfait.total)}</span></p>
        <p className="flex justify-between gap-4"><span>{enPlus} h en plus × {lecon} €</span><span className="tabular-nums">{euros(enPlus * lecon)}</span></p>
        <p className="flex justify-between gap-4 border-t-2 border-[var(--encre)] pt-3 font-[family-name:var(--titres)] text-2xl font-bold"><span>Total estimé</span><span className="tabular-nums">{euros(total)}</span></p>
      </div>
      <p className="text-sm text-[var(--doux)]">Exemple de calcul avec les prix d'exemple de cette page. Le nombre prévisionnel d'heures est fixé après l'évaluation et inscrit au contrat.</p>
    </div>
  );
}
