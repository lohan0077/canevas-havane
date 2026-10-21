"use client";

import { useState } from "react";
import { DEROULE } from "./donnees";

/**
 * La première séance, minute par minute. On touche une minute de la piste : la barre
 * avance jusqu'à elle et la carte dit ce qui se passe — ce que tu fais, ce que je fais.
 * Un format, jamais un résultat.
 */
export default function LecteurSeance() {
  const [i, setI] = useState(0);
  const etape = DEROULE[i];
  const rempli = (etape.minute / 60) * 100;

  return (
    <div data-film="lecteur" className="rounded-[32px] bg-[var(--carte)] p-5 sm:p-8 space-y-6 shadow-[0_20px_50px_-30px_rgba(23,37,28,.4)]">
      <div className="space-y-3">
        <div className="relative h-2 rounded-full bg-[var(--trait)]" aria-hidden="true">
          <div className="absolute inset-y-0 left-0 rounded-full bg-[var(--accent)] transition-[width] duration-500" style={{ width: `${rempli}%` }} />
        </div>
        <div role="tablist" aria-label="Les minutes de la séance" className="grid grid-cols-4 gap-2">
          {DEROULE.map((d, k) => (
            <button
              key={d.minute}
              type="button"
              role="tab"
              aria-selected={k === i}
              aria-controls="fr-etape"
              onClick={() => setI(k)}
              className={`rounded-2xl px-2 py-3 text-center font-bold transition-colors ${k === i ? "bg-[var(--accent)] text-[var(--sur-accent)]" : k < i ? "bg-[var(--fond)]" : "bg-[var(--fond)] text-[var(--doux)]"}`}
            >
              <span className="block font-[family-name:var(--titres)] text-2xl leading-none tabular-nums">{d.minute}</span>
              <span className="block text-xs mt-1">min</span>
            </button>
          ))}
        </div>
      </div>

      <div id="fr-etape" role="tabpanel" aria-live="polite" className="space-y-4 min-h-[15rem]">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Minute {etape.minute}</p>
        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.03em]">{etape.titre}</h3>
        <p className="text-lg leading-relaxed">{etape.texte}</p>
        <dl className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-[var(--fond)] p-4">
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--doux)]">Toi</dt>
            <dd className="font-semibold">{etape.toi}</dd>
          </div>
          <div className="rounded-2xl bg-[var(--fond)] p-4">
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--doux)]">Moi</dt>
            <dd className="font-semibold">{etape.moi}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
