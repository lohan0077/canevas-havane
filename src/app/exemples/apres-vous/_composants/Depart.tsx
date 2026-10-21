"use client";

import { useState } from "react";
import { SOIR } from "./donnees";

const heure = (minutes: number) => {
  const h = Math.floor(minutes / 60) % 24, m = minutes % 60;
  return m ? `${h} h ${String(m).padStart(2, "0")}` : `${h} h`;
};

/**
 * « Vous partez à quelle heure ? » Le curseur dit l'heure où la dernière lumière
 * s'éteint ; la soirée de l'équipe se cale dessus. Un exemple de passage de deux heures.
 * Rien n'est envoyé.
 */
export default function Depart() {
  const [depart, setDepart] = useState(18 * 60 + 30);
  const rempli = ((depart - 17 * 60) / (21 * 60 - 17 * 60)) * 100;

  return (
    <div data-film="depart" className="rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-8 space-y-6">
      <label className="block space-y-3">
        <span className="flex items-baseline justify-between gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--doux)]">Vous partez à</span>
          <span className="font-[family-name:var(--titres)] text-4xl tabular-nums">{heure(depart)}</span>
        </span>
        <input
          id="heure-depart"
          type="range"
          min={17 * 60}
          max={21 * 60}
          step={15}
          value={depart}
          onChange={(e) => setDepart(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[var(--carte)] [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--accent)]"
          style={{ background: `linear-gradient(90deg, var(--accent) ${rempli}%, var(--trait) ${rempli}%)` }}
        />
      </label>
      <ol className="relative space-y-4 border-l border-[var(--trait)] pl-6" aria-live="polite">
        {SOIR.map((s, i) => (
          <li key={s.quoi} className="relative">
            <span aria-hidden="true" className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ${i === 0 || i === SOIR.length - 1 ? "bg-[var(--accent)]" : "border border-[var(--accent)] bg-[var(--carte)]"}`} />
            <p className="flex items-baseline gap-3">
              <span className="w-[70px] shrink-0 font-semibold tabular-nums text-[var(--accent-texte)]">{heure(depart + s.heure)}</span>
              <span className="font-semibold">{s.quoi}</span>
            </p>
            <p className="pl-[82px] text-sm leading-relaxed text-[var(--doux)]">{s.detail}</p>
          </li>
        ))}
      </ol>
      <p className="font-[family-name:var(--titres)] text-2xl leading-snug">
        Vous ne nous croiserez pas. <span className="italic text-[var(--accent-texte)]">C'est le principe.</span>
      </p>
      <p className="text-xs text-[var(--doux)]">Exemple d'un passage de deux heures · rien n'est envoyé</p>
    </div>
  );
}
