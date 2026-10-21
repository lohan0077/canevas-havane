"use client";

import { useState } from "react";
import { seance } from "./donnees";

/**
 * La séance racontée étape par étape, avec un bouton « Pourquoi ? » sur chacune :
 * on l'ouvre, la raison s'affiche. Rien ne quitte le navigateur.
 */
export default function SeancePourquoi() {
  const [ouverts, setOuverts] = useState<number[]>([]);
  const basculer = (i: number) => setOuverts((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));

  return (
    <ol className="space-y-3" data-film="seance">
      {seance.map((s, i) => {
        const ouvert = ouverts.includes(i);
        return (
          <li key={s.moment} className="rounded-[26px] bg-[var(--carte)] border border-[var(--trait)] p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-1 min-w-0 flex-1">
                <p className="font-[family-name:var(--titres)] text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">
                  {String(i + 1).padStart(2, "0")} · {s.moment}
                </p>
                <p className="font-[family-name:var(--titres)] text-[22px] sm:text-2xl font-medium leading-snug">{s.etape}</p>
              </div>
              <button
                type="button"
                aria-expanded={ouvert}
                aria-controls={`pq-${i}`}
                onClick={() => basculer(i)}
                className={`min-h-11 rounded-full px-5 font-[family-name:var(--titres)] text-base font-semibold transition-colors ${
                  ouvert ? "bg-[var(--encre)] text-[var(--fond)]" : "bg-[var(--accent)] text-[var(--sur-accent)]"
                }`}
              >
                Pourquoi&nbsp;?
              </button>
            </div>
            <p id={`pq-${i}`} hidden={!ouvert} className="mt-4 border-t border-[var(--trait)] pt-4 text-lg leading-relaxed">
              {s.pourquoi}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
