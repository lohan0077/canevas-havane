"use client";

import { useState } from "react";
import { FORMULES, euros } from "./donnees";

/**
 * Les prix, en clair, sur l'accueil : trois formules, « dès » un prix TTC d'exemple, et
 * ce qui est compris d'un toucher. Pas de PDF envoyé trois jours plus tard.
 */
export default function Formules() {
  const [ouverte, setOuverte] = useState<string | null>(null);
  return (
    <div data-film="tarifs" className="space-y-3">
      <ul className="space-y-3">
        {FORMULES.map((f, i) => {
          const o = ouverte === f.id;
          return (
            <li key={f.id} className={`rounded-[26px] border transition-colors ${o ? "bg-[var(--sombre)] text-[var(--sur-sombre)] border-[var(--sombre)]" : "bg-[var(--carte)] border-[var(--trait)]"}`}>
              <button
                type="button"
                data-formule={f.id}
                aria-expanded={o}
                onClick={() => setOuverte(o ? null : f.id)}
                className="w-full px-5 py-5 sm:px-7 grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 text-left"
              >
                <span className={`text-xs font-semibold uppercase tracking-[0.18em] ${o ? "text-[#D9B98A]" : "text-[var(--accent-texte)]"}`}>0{i + 1} · {f.sous}</span>
                <span aria-hidden="true" className={`row-span-2 grid h-10 w-10 place-items-center rounded-full border text-xl transition-transform ${o ? "rotate-45 border-[#D9B98A]" : "border-[var(--encre)]"}`}>+</span>
                <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-[family-name:var(--titres)] text-[32px] leading-tight">{f.titre}</span>
                  <span className="font-[family-name:var(--titres)] text-[26px] italic tabular-nums whitespace-nowrap">dès {euros(f.prix)}</span>
                </span>
              </button>
              {o && (
                <ul className="px-5 pb-6 sm:px-7 space-y-2">
                  {f.compris.map((c) => (
                    <li key={c} className="flex gap-3"><span aria-hidden="true" className="text-[#D9B98A]">✦</span>{c}</li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      <p className="text-sm text-[var(--doux)]">Prix d&apos;exemple, TTC. Le devis précis vient après le premier rendez-vous, gratuit.</p>
    </div>
  );
}
