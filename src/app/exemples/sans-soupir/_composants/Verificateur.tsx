"use client";

import { useState } from "react";
import { SITUATIONS } from "./donnees";

/**
 * « Est-ce que ça ouvre droit au crédit d'impôt ? » Une situation, une réponse franche,
 * d'après la fiche officielle « Assistance informatique à domicile » (DGE). Tout se
 * passe dans le navigateur.
 */
export default function Verificateur() {
  const [choisie, setChoisie] = useState<number | null>(null);
  const s = choisie === null ? null : SITUATIONS[choisie];
  return (
    <div data-film="verificateur" className="rounded-[30px] bg-[var(--carte)] border border-[var(--trait)] p-5 sm:p-7 space-y-5">
      <p className="font-[family-name:var(--titres)] text-2xl font-extrabold leading-tight">Ta situation, ma réponse.</p>
      <ul className="grid gap-2">
        {SITUATIONS.map((x, i) => (
          <li key={x.question}>
            <button
              type="button"
              aria-pressed={choisie === i}
              onClick={() => setChoisie(i)}
              className={`w-full rounded-[18px] border-2 px-4 py-3 text-left font-semibold transition-colors ${choisie === i ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--fond)]"}`}
            >
              {x.question}
            </button>
          </li>
        ))}
      </ul>
      <div role="status" aria-live="polite" className="min-h-[96px]">
        {s ? (
          <div className={`rounded-[22px] p-4 space-y-1 ${s.reponse ? "bg-[#DDF6EC] text-[#14614E]" : "bg-[#FFE8E1] text-[#A8391B]"}`}>
            <p className="font-[family-name:var(--titres)] text-3xl font-extrabold">{s.reponse ? "Oui, sous conditions." : "Non."}</p>
            <p className="text-[15px] leading-snug text-[var(--encre)]">{s.pourquoi}</p>
          </div>
        ) : (
          <p className="rounded-[22px] border-2 border-dashed border-[var(--trait)] p-4 text-[var(--doux)]">Touche ta situation : la réponse s&apos;affiche ici.</p>
        )}
      </div>
    </div>
  );
}
