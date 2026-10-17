"use client";

import { useState } from "react";
import { CARTES } from "./donnees";

const LIMITE = 120;

/**
 * Écrire sa carte : on part d'une phrase toute prête ou d'une page blanche, et la
 * carte se recopie à la main sous les yeux. Le texte reste dans le navigateur.
 */
export default function EcrireCarte() {
  const [texte, setTexte] = useState(CARTES[0].phrases[0]);
  const reste = LIMITE - texte.length;
  return (
    <div className="grid gap-8 md:grid-cols-2 md:items-start">
      <div className="space-y-6">
        {CARTES.map((c) => (
          <div key={c.occasion} className="space-y-2">
            <h2 className="font-[family-name:var(--titres)] text-2xl">{c.occasion}</h2>
            <ul className="flex flex-wrap gap-2">
              {c.phrases.map((p) => (
                <li key={p}>
                  <button
                    type="button"
                    aria-pressed={texte === p}
                    onClick={() => setTexte(p)}
                    className={`rounded-2xl border px-4 py-2.5 text-left text-sm ${texte === p ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="space-y-4 md:sticky md:top-24">
        <div id="apercu-carte" className="min-h-[220px] rotate-[-1deg] rounded-[6px] bg-[var(--carte)] p-7 shadow-[0_24px_50px_-28px_rgba(58,14,28,0.55)] [background-image:repeating-linear-gradient(transparent_0_37px,#F1DDD5_37px_38px)]">
          <p className="font-[family-name:var(--f-caveat)] text-[34px] leading-[1.1] break-words" aria-live="polite">{texte || "…"}</p>
        </div>
        <label className="block space-y-2">
          <span className="text-sm font-semibold">Ou écris la tienne</span>
          <textarea
            value={texte}
            onChange={(e) => setTexte(e.target.value.slice(0, LIMITE))}
            rows={3}
            className="w-full rounded-2xl border border-[var(--trait)] bg-[var(--carte)] p-4 text-lg outline-none focus:border-[var(--accent)]"
          />
        </label>
        <p className={`text-sm ${reste < 15 ? "font-semibold text-[var(--accent-texte)]" : "text-[var(--doux)]"}`}>
          {reste} signe{reste > 1 ? "s" : ""} restant{reste > 1 ? "s" : ""} sur la carte · rien n&apos;est envoyé
        </p>
      </div>
    </div>
  );
}
