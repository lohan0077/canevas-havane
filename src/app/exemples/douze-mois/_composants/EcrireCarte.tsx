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
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
        {CARTES.map((c, i) => (
          <div key={c.occasion} className="grid gap-4 py-6 sm:grid-cols-[180px_1fr]">
            <h2 className="font-normal text-2xl leading-tight">
              <span className="block text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)] [font-family:var(--texte)]">{String(i + 1).padStart(2, "0")}</span>
              {c.occasion}
            </h2>
            <ul className="flex flex-wrap gap-2">
              {c.phrases.map((p) => (
                <li key={p}>
                  <button
                    type="button"
                    aria-pressed={texte === p}
                    onClick={() => setTexte(p)}
                    className={`rounded-xl border px-4 py-2.5 text-left text-[15px] transition-colors ${texte === p ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)] hover:border-[var(--encre)]"}`}
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="space-y-4 lg:sticky lg:top-28">
        <div id="apercu-carte" className="min-h-[240px] rounded-2xl border border-[var(--trait)] bg-[var(--carte)] p-8 [background-image:repeating-linear-gradient(transparent_0_41px,#D9D1EC_41px_42px)]">
          <p className="font-[family-name:var(--f-caveat)] text-[38px] leading-[1.1] break-words" aria-live="polite">{texte || "…"}</p>
        </div>
        <label className="block space-y-2">
          <span className="text-[12px] font-medium uppercase tracking-[0.2em]">Ou écris la tienne</span>
          <textarea
            value={texte}
            onChange={(e) => setTexte(e.target.value.slice(0, LIMITE))}
            rows={3}
            className="w-full rounded-2xl border border-[var(--trait)] bg-[var(--carte)] p-4 text-lg outline-none focus:border-[var(--encre)]"
          />
        </label>
        <p className={`text-sm ${reste < 15 ? "font-medium text-[var(--accent-texte)]" : "text-[var(--doux)]"}`}>
          {reste} signe{reste > 1 ? "s" : ""} restant{reste > 1 ? "s" : ""} sur la carte · rien n&apos;est envoyé
        </p>
      </div>
    </div>
  );
}
