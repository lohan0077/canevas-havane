"use client";

import { useState } from "react";
import { FOURCHETTES, PIECES, euros } from "./donnees";

/**
 * Le plan de la maison : on touche les pièces à rafraîchir, le site compte les unités
 * intérieures et donne une fourchette TTC, pose comprise — un exemple : le prix ferme
 * vient au devis, après la visite technique. Tout se passe dans le navigateur.
 */
export default function PlanMaison() {
  const [choisies, setChoisies] = useState<string[]>([]);
  const n = choisies.length;
  const surface = PIECES.filter((p) => choisies.includes(p.id)).reduce((t, p) => t + p.surface, 0);
  const basculer = (id: string) => setChoisies(choisies.includes(id) ? choisies.filter((x) => x !== id) : [...choisies, id]);
  const zones = "grid-cols-[1fr_1.25fr] [grid-template-areas:'a_b'_'c_b'_'d_e']";

  return (
    <div className="space-y-4" data-film="plan">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--doux)]">Ta maison · touche les pièces à rafraîchir</p>
      <div className={`grid ${zones} gap-2 rounded-[22px] border-[5px] border-[var(--encre)] bg-[var(--encre)] p-2`}>
        {PIECES.map((p) => {
          const active = choisies.includes(p.id);
          return (
            <button
              key={p.id}
              type="button"
              data-piece={p.id}
              aria-pressed={active}
              onClick={() => basculer(p.id)}
              style={{ gridArea: p.zone }}
              className={`relative min-h-[92px] rounded-[12px] p-3 text-left transition-colors ${
                active ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "bg-[var(--carte)] text-[var(--encre)]"
              } ${p.id === "salon" ? "min-h-[192px]" : ""}`}
            >
              <span className="block font-[family-name:var(--titres)] text-lg font-semibold">{p.nom}</span>
              <span className="block text-sm">{p.surface}&nbsp;m²</span>
              <svg viewBox="0 0 40 16" aria-hidden="true" className={`absolute bottom-3 right-3 w-12 transition-opacity ${active ? "opacity-100" : "opacity-0"}`}>
                <rect x="1" y="1" width="38" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M6 15 h28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          );
        })}
      </div>
      <p className="text-lg" aria-live="polite">
        <strong className="font-[family-name:var(--titres)] text-3xl tabular-nums">{n}</strong>{" "}
        {n > 1 ? "unités intérieures" : "unité intérieure"}
        {n > 0 && <span className="text-[var(--doux)]"> · {surface}&nbsp;m² à rafraîchir</span>}
      </p>
      <div role="status" className={`rounded-[22px] p-5 space-y-1 transition-colors ${n > 0 ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "bg-[var(--carte)] border border-[var(--trait)]"}`} data-film="fourchette">
        {n > 0 ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F2B6A0]">Fourchette TTC, pose comprise</p>
            <p className="font-[family-name:var(--titres)] text-[1.9rem] sm:text-4xl font-light tabular-nums whitespace-nowrap">
              {euros(FOURCHETTES[n][0])} – {euros(FOURCHETTES[n][1])}
            </p>
            <p className="text-sm">Exemple · le prix ferme vient au devis, après la visite technique.</p>
          </>
        ) : (
          <p className="text-[var(--doux)]">Touche une pièce : la fourchette s&apos;affiche ici, pose comprise.</p>
        )}
      </div>
    </div>
  );
}
