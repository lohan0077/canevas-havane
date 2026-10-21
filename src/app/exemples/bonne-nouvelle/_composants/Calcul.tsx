"use client";

import { useState } from "react";

const euros = (n: number) => `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} €`;
const TAUX = 0.01;
const PLANCHER = 1200;
const PLAFOND = 2500;

/**
 * Nos honoraires, pour le montant que tu empruntes : 1 % du montant, entre 1 200 et
 * 2 500 € TTC (exemple). Aucun taux de crédit, aucune mensualité : ce calcul ne dit que
 * ce que coûte le courtier, et quand on le paie. Tout se calcule dans le navigateur.
 */
export default function Calcul() {
  const [montant, setMontant] = useState(220000);
  const honoraires = Math.min(PLAFOND, Math.max(PLANCHER, montant * TAUX));
  const rempli = ((montant - 50000) / (600000 - 50000)) * 100;

  return (
    <div data-film="calcul" className="space-y-6 rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-7">
      <label className="block space-y-3">
        <span className="flex items-baseline justify-between gap-3">
          <span className="text-[14px] font-semibold">Le montant que tu empruntes</span>
          <span className="font-[family-name:var(--titres)] text-[28px] leading-none tabular-nums [font-variant-numeric:lining-nums]">{euros(montant)}</span>
        </span>
        <input
          type="range"
          min={50000}
          max={600000}
          step={5000}
          value={montant}
          data-film="montant"
          onChange={(e) => setMontant(Number(e.target.value))}
          className="h-2.5 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-[var(--encre)] [&::-moz-range-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[var(--encre)] [&::-webkit-slider-thumb]:bg-[var(--accent)]"
          style={{ background: `linear-gradient(90deg, var(--encre) ${rempli}%, var(--trait) ${rempli}%)` }}
        />
      </label>
      <dl aria-live="polite" className="grid gap-px overflow-hidden rounded-[20px] bg-[var(--trait)] sm:grid-cols-3">
        <div className="space-y-1 bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]">
          <dt className="text-[13px] text-[#C9D2DF]">Nos honoraires</dt>
          <dd className="font-[family-name:var(--titres)] text-[34px] leading-none text-[#F2C14E] tabular-nums [font-variant-numeric:lining-nums]">{euros(honoraires)}</dd>
          <dd className="text-[12px] text-[#C9D2DF]">TTC · exemple</dd>
        </div>
        <div className="space-y-1 bg-[var(--fond)] p-5">
          <dt className="text-[13px] text-[var(--doux)]">Quand tu les paies</dt>
          <dd className="text-[18px] leading-snug font-semibold">Une fois les fonds versés</dd>
        </div>
        <div className="space-y-1 bg-[var(--fond)] p-5">
          <dt className="text-[13px] text-[var(--doux)]">Si aucune banque ne prête</dt>
          <dd className="text-[18px] leading-snug font-semibold">0 €, rien n&apos;est dû</dd>
        </div>
      </dl>
      <p className="text-[13px] leading-relaxed text-[var(--doux)]">
        1 % du montant emprunté, au moins 1 200 €, au plus 2 500 € TTC : barème d&apos;exemple, fixé dans le
        mandat. Rien avant le versement des fonds : c&apos;est la loi pour tous (CMF, art. L519-6).
      </p>
    </div>
  );
}
