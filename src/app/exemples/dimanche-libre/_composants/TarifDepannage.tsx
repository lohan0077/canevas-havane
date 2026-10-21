"use client";

import { useState } from "react";
import { DEPANNAGE, euros, horsTaxe } from "./donnees";

/**
 * Combien coûte un dépannage ? Déplacement + demi-heures, calculé ici. TTC (c'est un
 * particulier qui paie), HT dit à côté. Sans crédit d'impôt : le dépannage en est exclu.
 */
export default function TarifDepannage() {
  const [demiHeures, setDemiHeures] = useState(2);
  const total = DEPANNAGE.deplacement + demiHeures * DEPANNAGE.demiHeure;
  const duree = demiHeures % 2 ? `${Math.floor(demiHeures / 2) ? `${Math.floor(demiHeures / 2)} h ` : ""}30 min` : `${demiHeures / 2} h`;
  return (
    <div data-film="tarif" className="rounded-[30px] bg-[var(--carte)] border border-[var(--trait)] p-5 sm:p-7 space-y-5">
      <label htmlFor="dl-duree" className="flex items-baseline justify-between gap-3">
        <span className="font-bold">Temps passé chez toi</span>
        <span className="font-[family-name:var(--titres)] text-3xl font-extrabold tabular-nums">{duree.replace(/ /g, " ")}</span>
      </label>
      <input
        id="dl-duree"
        type="range"
        min={1}
        max={6}
        value={demiHeures}
        onChange={(e) => setDemiHeures(Number(e.target.value))}
        className="w-full h-3 rounded-full appearance-none cursor-pointer bg-[#FFE8E1] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[var(--encre)] [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--accent)] [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-[var(--encre)]"
      />
      <dl className="divide-y divide-[var(--trait)] border-y border-[var(--trait)] text-[15px]">
        <div className="flex justify-between gap-3 py-2.5"><dt>Déplacement</dt><dd className="tabular-nums">{euros(DEPANNAGE.deplacement)}</dd></div>
        <div className="flex justify-between gap-3 py-2.5"><dt>{demiHeures} demi-heure{demiHeures > 1 ? "s" : ""} × {euros(DEPANNAGE.demiHeure)}</dt><dd className="tabular-nums">{euros(demiHeures * DEPANNAGE.demiHeure)}</dd></div>
      </dl>
      <div aria-live="polite" className="rounded-[22px] bg-[var(--sombre)] text-[var(--sur-sombre)] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#FF9A80]">Ton dépannage · exemple</p>
        <p className="font-[family-name:var(--titres)] text-4xl font-extrabold tabular-nums">{euros(total)} TTC</p>
        <p className="text-sm text-[#C9C0DD]">soit {euros(horsTaxe(total))} HT. Pas de crédit d&apos;impôt : c&apos;est du dépannage.</p>
      </div>
      <p className="text-sm text-[var(--doux)]">Prix d&apos;exemple. Calcul fait sur ton téléphone : rien n&apos;est envoyé.</p>
    </div>
  );
}
