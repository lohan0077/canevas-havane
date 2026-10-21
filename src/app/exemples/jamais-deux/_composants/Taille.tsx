"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, PIECES } from "./donnees";

const bagues = PIECES.filter((p) => p.forme === "bague" && !p.partieLe);

/**
 * La taille d'une bague, en France, c'est le tour du doigt en millimètres. On glisse
 * jusqu'à la longueur du fil, et le site dit quelles bagues encore là y vont — à une
 * taille près, puisque l'atelier en ajuste une.
 */
export default function Taille() {
  const [tour, setTour] = useState(54);
  const vont = bagues.filter((b) => Math.abs(Number(b.taille.replace(/\D/g, "")) - tour) <= 1);
  const rempli = ((tour - 46) / (66 - 46)) * 100;

  return (
    <div className="space-y-5 border border-[var(--trait)] bg-[var(--carte)] p-6">
      <label className="block space-y-3">
        <span className="flex items-baseline justify-between gap-4">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em]">Le tour de ton doigt</span>
          <span className="font-[family-name:var(--titres)] text-4xl tabular-nums">{tour} mm</span>
        </span>
        <input
          type="range"
          min={46}
          max={66}
          value={tour}
          onChange={(e) => setTour(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-[var(--accent)]"
          style={{ background: `linear-gradient(90deg, var(--accent) ${rempli}%, var(--trait) ${rempli}%)` }}
        />
      </label>
      <div aria-live="polite" className="space-y-2">
        <p className="font-[family-name:var(--titres)] text-3xl">Taille {tour}</p>
        {vont.length ? (
          <p className="leading-relaxed">
            Encore là, à ta taille ou à une taille près :{" "}
            {vont.map((b, i) => (
              <span key={b.numero}>
                {i > 0 && ", "}
                <Link href={`${DOSSIER}/pieces/${b.numero}`} className="font-semibold underline underline-offset-4">n° {b.numero} «&nbsp;{b.nom}&nbsp;»</Link>
              </span>
            ))}
            .
          </p>
        ) : (
          <p className="leading-relaxed text-[var(--doux)]">Aucune bague encore là à cette taille. Vendredi, peut-être : les tailles changent à chaque sortie.</p>
        )}
      </div>
    </div>
  );
}
