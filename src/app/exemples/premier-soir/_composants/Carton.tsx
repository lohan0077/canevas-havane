"use client";

import { useState } from "react";
import { CARTON, CARTON_EN_PLUS } from "./donnees";

/** Le carton orange, dessiné : deux rabats, et sur la face, ce qu'on y écrit. */
export function DessinCarton({ mot, ouvert = false, className = "" }: { mot?: string; ouvert?: boolean; className?: string }) {
  return (
    <div aria-hidden="true" className={`relative mx-auto w-[260px] ${className}`}>
      <div className="relative h-14">
        <span className={`absolute bottom-0 left-0 h-12 w-1/2 origin-bottom-left rounded-t-md bg-[#D9741C] ${ouvert ? "-rotate-[150deg]" : "-rotate-[8deg]"} transition-transform`} />
        <span className={`absolute bottom-0 right-0 h-12 w-1/2 origin-bottom-right rounded-t-md bg-[#D9741C] ${ouvert ? "rotate-[150deg]" : "rotate-[8deg]"} transition-transform`} />
      </div>
      <div className="rounded-b-xl rounded-t-sm bg-[#F28C28] px-5 pt-6 pb-7 text-center text-[#1D2B4F] shadow-[0_24px_40px_-24px_rgba(29,43,79,.8)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em]">À ouvrir en premier</p>
        <p className="mt-2 font-[family-name:var(--titres)] text-[34px] leading-none">Premier Soir</p>
        <p className="mt-2 text-2xl leading-none">☾</p>
        <p className="mt-3 min-h-6 font-[family-name:var(--titres)] italic text-lg">{mot}</p>
        <span className="absolute left-1/2 top-[56px] h-3 w-24 -translate-x-1/2 bg-[#C9A57B]/70" />
      </div>
    </div>
  );
}

/**
 * Le carton du premier soir, à composer : les quatre indispensables, ce qu'on y ajoute,
 * et un mot écrit sur la face. Rien n'est envoyé ni enregistré.
 */
export default function Carton() {
  const [ajouts, setAjouts] = useState<string[]>([]);
  const [mot, setMot] = useState("");

  return (
    <div data-film="carton" className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-start">
      <div className="space-y-4">
        <DessinCarton mot={mot || " "} />
        <label className="block space-y-2">
          <span className="text-sm font-semibold">Un mot sur le carton</span>
          <input
            id="mot"
            type="text"
            maxLength={28}
            placeholder="Pour la chambre de Léo"
            value={mot}
            onChange={(e) => setMot(e.target.value)}
            className="w-full h-12 rounded-xl border-2 border-[var(--trait)] bg-[var(--carte)] px-3 placeholder:text-[var(--doux)] focus:border-[var(--encre)] outline-none"
          />
        </label>
      </div>
      <div className="space-y-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Toujours dedans</p>
          <ul className="mt-2 space-y-2">
            {CARTON.map((c) => (
              <li key={c} className="flex items-center gap-3 rounded-xl bg-[var(--carte)] border border-[var(--trait)] px-4 py-3 text-lg">
                <span aria-hidden="true" className="grid h-6 w-6 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] text-sm font-bold">✓</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Ce que tu ajoutes</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {CARTON_EN_PLUS.map((c) => {
              const oui = ajouts.includes(c);
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={oui}
                  onClick={() => setAjouts(oui ? ajouts.filter((x) => x !== c) : [...ajouts, c])}
                  className={`rounded-full border-2 px-4 py-2 font-semibold transition-colors ${oui ? "border-[var(--sombre)] bg-[var(--sombre)] text-[var(--sur-sombre)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}
                >
                  {oui ? "✓ " : "+ "}{c}
                </button>
              );
            })}
          </div>
        </fieldset>
        <p className="text-sm text-[var(--doux)]" aria-live="polite">
          {CARTON.length + ajouts.length} choses dans ton carton · on te l'apporte le matin du jour J · rien n'est envoyé.
        </p>
      </div>
    </div>
  );
}
