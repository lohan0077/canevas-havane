"use client";

import { useState } from "react";
import { PALIERS, euros, prixParPersonne } from "./donnees";

const MIN = 30;
const MAX = 150;

/**
 * L'accueil : « Combien d'invités ? ». On glisse ; la salle se remplit, et le prix par
 * personne s'affiche, TTC, avec le total. Prix d'exemple, calculés ici : rien ne part.
 */
export default function Invites() {
  const [n, setN] = useState(60);
  const prix = prixParPersonne(n);
  const rempli = ((n - MIN) / (MAX - MIN)) * 100;

  return (
    <div id="outil-invites" className="scroll-mt-20 rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-7 space-y-6">
      <label className="block space-y-4">
        <span className="flex items-baseline justify-between gap-4">
          <span className="text-[12px] uppercase tracking-[0.22em] text-[var(--doux)]">Tes invités</span>
          <span className="font-[family-name:var(--titres)] text-[40px] leading-none tabular-nums">{n}</span>
        </span>
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={5}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          aria-label="Nombre d'invités"
          className="w-full h-2 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--encre)] [&::-webkit-slider-thumb]:border-[6px] [&::-webkit-slider-thumb]:border-[var(--accent)] [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--encre)] [&::-moz-range-thumb]:border-[6px] [&::-moz-range-thumb]:border-[var(--accent)]"
          style={{ background: `linear-gradient(90deg, var(--accent) ${rempli}%, var(--trait) ${rempli}%)` }}
        />
      </label>

      {/* La salle : un point par place, qui s'allume quand l'invité s'ajoute. */}
      <div aria-hidden="true" className="grid grid-cols-[repeat(15,minmax(0,1fr))] gap-1.5">
        {Array.from({ length: MAX }, (_, k) => (
          <span key={k} className={`aspect-square rounded-full transition-colors ${k < n ? "bg-[var(--accent)]" : "bg-[var(--trait)]"}`} />
        ))}
      </div>

      <div aria-live="polite" className="rounded-[20px] bg-[var(--sombre)] p-5 space-y-1">
        <p className="text-[12px] uppercase tracking-[0.22em] text-[var(--doux)]">Prix par personne · exemple</p>
        <p data-film="prix" className="font-[family-name:var(--titres)] text-[64px] leading-none tabular-nums">
          {euros(prix)} <span className="font-[family-name:var(--texte)] text-[18px] align-middle">TTC</span>
        </p>
        <p className="text-[15px] text-[var(--doux)] tabular-nums">
          Total : {euros(prix * n)} TTC pour {n} invités
        </p>
      </div>
      <p className="text-[13px] leading-relaxed text-[var(--doux)]">
        Le prix baisse avec le nombre d&apos;invités : {PALIERS.map((p, i) => `${euros(p.prix)} ${i === 0 ? `jusqu'à ${p.jusqua}` : i === PALIERS.length - 1 ? `au-delà de ${PALIERS[i - 1].jusqua}` : `jusqu'à ${p.jusqua}`}`).join(", ")}. Entrée, plat, dessert, service, vaisselle, eaux et café compris.
      </p>
    </div>
  );
}
