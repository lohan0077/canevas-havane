"use client";

import { useState } from "react";
import { INVITES_MAX, INVITES_MIN, PALIERS, euros, prixParPersonne } from "./donnees";

/**
 * « Combien d'invités ? » On glisse ; la salle se remplit, une assiette par invité, et le
 * prix par personne s'affiche, TTC, avec le total. Prix d'exemple, calculés ici : rien
 * ne part.
 */
export default function Invites({ depart = 60 }: { depart?: number }) {
  const [n, setN] = useState(depart);
  const prix = prixParPersonne(n);
  const rempli = ((n - INVITES_MIN) / (INVITES_MAX - INVITES_MIN)) * 100;

  return (
    <div id="outil-invites" className="scroll-mt-24 space-y-6 rounded-2xl border border-[var(--trait)] bg-[var(--carte)] p-5 text-[var(--encre)] sm:p-7">
      <label className="block space-y-4">
        <span className="flex items-baseline justify-between gap-4">
          <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">Combien d&apos;invités&nbsp;?</span>
          <span className="font-[family-name:var(--titres)] text-[44px] leading-none tabular-nums">{n}</span>
        </span>
        <input
          type="range"
          min={INVITES_MIN}
          max={INVITES_MAX}
          step={5}
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
          aria-label="Nombre d'invités"
          className="h-2 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[6px] [&::-moz-range-thumb]:border-[var(--accent)] [&::-moz-range-thumb]:bg-[var(--encre)] [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[6px] [&::-webkit-slider-thumb]:border-[var(--accent)] [&::-webkit-slider-thumb]:bg-[var(--encre)]"
          style={{ background: `linear-gradient(90deg, var(--accent) ${rempli}%, var(--trait) ${rempli}%)` }}
        />
      </label>

      {/* La salle : une assiette par place, qui se pose quand l'invité s'ajoute. */}
      <div aria-hidden="true" className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1">
        {Array.from({ length: INVITES_MAX }, (_, k) => (
          <span key={k} className={`aspect-square rounded-full transition-all duration-300 ${k < n ? "scale-100 bg-[var(--accent)]" : "scale-75 bg-[var(--trait)]"}`} />
        ))}
      </div>

      <div aria-live="polite" className="space-y-1 rounded-xl bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]">
        <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[#E9C46A]">Prix par personne · exemple</p>
        <p data-film="prix" className="font-[family-name:var(--titres)] text-[60px] leading-none tabular-nums">
          {euros(prix)} <span className="align-middle font-[family-name:var(--texte)] text-[18px]">TTC</span>
        </p>
        <p className="text-[15px] tabular-nums text-[var(--sur-sombre)]/90">
          Total : {euros(prix * n)} TTC pour {n} invités · menu complet
        </p>
      </div>
      <p className="text-[13px] leading-relaxed text-[var(--doux)]">
        Le prix baisse avec le nombre d&apos;invités : {PALIERS.map((p, i) => `${euros(p.prix)} ${i === 0 ? `jusqu'à ${p.jusqua}` : i === PALIERS.length - 1 ? `au-delà de ${PALIERS[i - 1].jusqua}` : `jusqu'à ${p.jusqua}`}`).join(", ")}. Entrée, le plat de ta famille, dessert, service, vaisselle, eaux et café compris.
      </p>
    </div>
  );
}
