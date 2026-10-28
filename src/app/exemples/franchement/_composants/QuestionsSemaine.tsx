"use client";

import { useState } from "react";
import { QUESTIONS_SEMAINE } from "./donnees";

/** La question de la semaine : une question reçue en commentaire public, et la question posée en retour. */
export default function QuestionsSemaine() {
  const [i, setI] = useState(0);
  const q = QUESTIONS_SEMAINE[i];
  const n = QUESTIONS_SEMAINE.length;

  return (
    <div className="space-y-5">
      <div aria-live="polite" className="space-y-3">
        <div className="max-w-[85%] rounded-[24px] rounded-bl-md bg-[var(--carte)] text-[var(--encre)] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--doux)]">Question n° {q.numero} · reçue en commentaire</p>
          <p className="mt-1 text-xl font-semibold">{q.recue}</p>
        </div>
        <div className="ml-auto max-w-[85%] rounded-[24px] rounded-br-md bg-[#E9B44C] text-[#17251C] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em]">Ma question en retour</p>
          <p className="mt-1 text-xl font-semibold">{q.retour}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4">
        <button type="button" onClick={() => setI((i + 1) % n)} aria-label="Question plus ancienne" className="rounded-full border border-[var(--sur-sombre)] px-5 h-11 font-bold whitespace-nowrap">
          ← Avant
        </button>
        <span className="text-sm tabular-nums">{i + 1} / {n}</span>
        <button type="button" onClick={() => setI((i - 1 + n) % n)} aria-label="Question plus récente" className="rounded-full border border-[var(--sur-sombre)] px-5 h-11 font-bold whitespace-nowrap">
          Après →
        </button>
      </div>
    </div>
  );
}
