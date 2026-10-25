"use client";

import { useState } from "react";
import { VEILLE } from "./donnees";

/** La liste de la veille, à cocher. Rien n'est enregistré : elle s'efface au rechargement. */
export default function Veille() {
  const [faits, setFaits] = useState<boolean[]>(VEILLE.map(() => false));
  const total = faits.filter(Boolean).length;

  return (
    <div className="rounded-[6px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-8 space-y-5">
      <p className="flex items-baseline justify-between gap-4">
        <span className="text-xl font-bold">La veille au soir</span>
        <span className="text-sm font-bold tabular-nums" aria-live="polite">{total} / {VEILLE.length}</span>
      </p>
      <ul className="space-y-2.5">
        {VEILLE.map((v, i) => (
          <li key={v}>
            <label className="flex items-start gap-3 rounded-[6px] border border-[var(--trait)] bg-[var(--fond)] px-4 py-3.5 cursor-pointer">
              <input
                type="checkbox"
                checked={faits[i]}
                onChange={() => setFaits(faits.map((f, j) => (j === i ? !f : f)))}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--accent)]"
              />
              <span className={`leading-snug ${faits[i] ? "line-through decoration-2" : ""}`}>{v}</span>
            </label>
          </li>
        ))}
      </ul>
      {total === VEILLE.length && <p role="status" className="font-bold">Tout est prêt. À demain, à la minute 1.</p>}
    </div>
  );
}
