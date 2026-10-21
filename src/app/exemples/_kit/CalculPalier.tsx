"use client";

import { useState } from "react";

export type Palier = { jusqua: number; titre: string; prix?: string; detail?: string };

/**
 * Un curseur et ce qu'il donne : la surface du jardin et la piscine qui rentre, le
 * nombre d'invités et la formule, les kilomètres et le forfait… Chaque palier vaut
 * jusqu'à sa borne `jusqua`. Rien ne quitte le navigateur.
 */
export default function CalculPalier({
  etiquette,
  unite,
  min,
  max,
  pas = 1,
  depart,
  paliers,
  titreResultat,
  legende,
}: {
  etiquette: string;
  unite: string;
  min: number;
  max: number;
  pas?: number;
  depart: number;
  paliers: Palier[];
  titreResultat: string;
  legende?: string;
}) {
  const [valeur, setValeur] = useState(depart);
  const palier = paliers.find((p) => valeur <= p.jusqua) ?? paliers[paliers.length - 1];
  const rempli = ((valeur - min) / (max - min)) * 100;

  return (
    <div className="rounded-[26px] bg-[var(--carte)] text-[var(--encre)] border border-[var(--trait)] p-6 sm:p-8 space-y-6">
      <label className="block space-y-3">
        <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <span className="min-w-0 text-sm font-bold uppercase tracking-[0.14em]">{etiquette}</span>
          <span className="text-2xl font-extrabold tabular-nums lining-nums whitespace-nowrap">
            {valeur}{" "}{unite}
          </span>
        </span>
        <input
          type="range"
          min={min}
          max={max}
          step={pas}
          value={valeur}
          onChange={(e) => setValeur(Number(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--carte)] [&::-webkit-slider-thumb]:border-[5px] [&::-webkit-slider-thumb]:border-[var(--accent)] [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--carte)] [&::-moz-range-thumb]:border-[5px] [&::-moz-range-thumb]:border-[var(--accent)]"
          style={{ background: `linear-gradient(90deg, var(--accent) ${rempli}%, var(--trait) ${rempli}%)` }}
        />
      </label>
      <div className="rounded-2xl bg-[var(--sombre)] text-[var(--sur-sombre)] p-5 sm:p-6 space-y-2" aria-live="polite">
        <p className="text-xs font-bold uppercase tracking-[0.16em]">{titreResultat}</p>
        <p className="text-2xl sm:text-3xl font-[family-name:var(--titres)] font-semibold">{palier.titre}</p>
        {palier.prix && <p className="text-lg font-bold tabular-nums lining-nums">{palier.prix}</p>}
        {palier.detail && <p className="text-sm">{palier.detail}</p>}
      </div>
      {legende && <p className="text-sm text-[var(--doux)] leading-relaxed">{legende}</p>}
    </div>
  );
}
