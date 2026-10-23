"use client";

import { useState } from "react";
import { SOIR, entreprise } from "./donnees";

/**
 * L'équipe du soir, en vrai : toujours la même, et depuis combien d'années. Ni nom, ni
 * visage — « l'équipe du soir · 2 agents » — mais ce qu'elle fait, et depuis quand.
 */
export default function Equipe() {
  const [depuis, setDepuis] = useState(false);
  const [soir, setSoir] = useState(false);

  return (
    <div data-film="equipe" className="rounded-[14px] border border-[var(--trait)] bg-[var(--carte)] overflow-hidden">
      <div className="relative h-36 bg-[var(--sombre)]">
        {/* Deux silhouettes, dessinées : l'équipe, pas des personnes reconnaissables. */}
        <svg viewBox="0 0 320 144" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx="262" cy="34" r="16" fill="var(--accent)" />
          <circle cx="270" cy="28" r="14" fill="var(--sombre)" />
          <g fill="#2E3D5E">
            <circle cx="124" cy="62" r="20" />
            <path d="M88 144c0-30 16-50 36-50s36 20 36 50z" />
            <circle cx="190" cy="68" r="18" />
            <path d="M158 144c0-27 14-45 32-45s32 18 32 45z" />
          </g>
        </svg>
      </div>
      <div className="p-6 space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Chez vous chaque soir</p>
          <h3 id="equipe-nom" className="mt-2 font-[family-name:var(--titres)] text-[34px] leading-tight">{entreprise.equipe}</h3>
          <p className="mt-1 text-[var(--doux)]">Toujours la même, chez vous. Jamais une équipe de remplacement sans vous prévenir.</p>
        </div>

        <div id="depuis" className="rounded-[10px] border border-[var(--trait)] p-4">
          {depuis ? (
            <p className="flex items-baseline gap-3" role="status">
              <span className="font-[family-name:var(--titres)] text-6xl leading-none text-[var(--accent-texte)] tabular-nums">{entreprise.ensemble}</span>
              <span className="text-lg leading-snug">ans chez nous, ensemble.<span className="block text-sm text-[var(--doux)]">exemple</span></span>
            </p>
          ) : (
            <button type="button" id="voir-depuis" onClick={() => setDepuis(true)} className="flex w-full items-center justify-between text-left text-lg">
              Depuis combien d'années&nbsp;?
              <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)]">→</span>
            </button>
          )}
        </div>

        <div>
          <button type="button" id="voir-soir" aria-expanded={soir} onClick={() => setSoir((s) => !s)} className="flex w-full items-center justify-between py-2 text-left font-semibold">
            Son soir chez vous
            <span aria-hidden="true" className={`transition-transform ${soir ? "rotate-45" : ""}`}>+</span>
          </button>
          {soir && (
            <ul className="mt-2 space-y-2 text-[15px] text-[var(--doux)]">
              {SOIR.slice(1).map((s) => (
                <li key={s.quoi}><span className="font-semibold text-[var(--encre)]">{s.quoi}</span> · {s.detail}</li>
              ))}
            </ul>
          )}
        </div>
        <p className="text-xs text-[var(--doux)]">Ni nom ni visage publiés : ce sont nos salariés, pas notre vitrine.</p>
      </div>
    </div>
  );
}
