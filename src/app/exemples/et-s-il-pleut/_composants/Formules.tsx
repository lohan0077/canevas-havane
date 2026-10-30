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
            <li key={f.id} className={`rounded-[1.5rem] border transition-[background-color,border-color,box-shadow] duration-500 ${o ? "border-[var(--sombre)] bg-[var(--sombre)] text-[var(--sur-sombre)] shadow-[0_30px_60px_-34px_rgba(25,26,40,0.7)]" : "border-[var(--trait)] bg-[var(--carte)] hover:border-[var(--encre)]"}`}>
              <button
                type="button"
                data-formule={f.id}
                aria-expanded={o}
                onClick={() => setOuverte(o ? null : f.id)}
                className="w-full px-5 py-5 sm:px-7 grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 text-left"
              >
                <span className={`text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ${o ? "text-[var(--accent)]" : "text-[var(--accent-texte)]"}`}>0{i + 1} · {f.sous}</span>
                <span aria-hidden="true" className={`row-span-2 grid h-10 w-10 place-items-center rounded-full border text-xl transition-[transform,border-color,background-color] duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)] ${o ? "rotate-45 border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[var(--encre)]"}`}>+</span>
                <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <span className="font-[family-name:var(--titres)] text-[32px] leading-tight">{f.titre}</span>
                  <span className="font-[family-name:var(--titres)] text-[26px] italic tabular-nums whitespace-nowrap">dès {euros(f.prix)}</span>
                </span>
              </button>
              {/* Le détail glisse au lieu de sauter ; fermé, il est masqué aux lecteurs d'écran. */}
              <div className="esp-deplie" data-ouvert={o} aria-hidden={!o} inert={!o}>
                <div>
                  <ul className="space-y-2 px-5 pb-6 sm:px-7">
                    {f.compris.map((c, k) => (
                      <li key={c} className={`flex gap-3 transition-[opacity,transform] duration-500 ${o ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"}`} style={{ transitionDelay: o ? `${120 + k * 60}ms` : "0ms" }}>
                        <span aria-hidden="true" className="text-[var(--accent)]">✦</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="text-sm text-[var(--doux)]">Prix d&apos;exemple, TTC. Le devis précis vient après le premier rendez-vous, gratuit.</p>
    </div>
  );
}
