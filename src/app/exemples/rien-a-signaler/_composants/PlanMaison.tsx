"use client";

import { useState } from "react";
import { FOURCHETTES, PIECES, euros } from "./donnees";

/**
 * Le plan de la maison : on touche les pièces à rafraîchir, le site compte les unités
 * intérieures et donne une fourchette TTC, pose comprise — un exemple : le prix ferme
 * vient au devis, après la visite technique. Tout se passe dans le navigateur. Les
 * `data-piece` et `data-film` servent au tournage de la vidéo « Remplir l'agenda ».
 */
export default function PlanMaison() {
  const [choisies, setChoisies] = useState<string[]>([]);
  const n = choisies.length;
  const surface = PIECES.filter((p) => choisies.includes(p.id)).reduce((t, p) => t + p.surface, 0);
  const basculer = (id: string) => setChoisies(choisies.includes(id) ? choisies.filter((x) => x !== id) : [...choisies, id]);
  const zones = "grid-cols-[1fr_1.25fr] [grid-template-areas:'a_b'_'c_b'_'d_e']";

  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8" data-film="plan">
      <div className="space-y-3">
        <p className="font-[family-name:var(--titres)] text-sm font-semibold uppercase tracking-[0.16em] text-[var(--doux)]">Ta maison · touche les pièces à rafraîchir</p>
        <div className={`grid ${zones} gap-2 rounded-[1.25rem] bg-[var(--sombre)] p-2`}>
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
                className={`relative min-h-[92px] overflow-hidden rounded-[0.9rem] p-3 text-left transition-colors duration-300 ${
                  active ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "bg-[var(--carte)] text-[var(--encre)] hover:bg-[var(--fond)]"
                } ${p.id === "salon" ? "min-h-[192px]" : ""}`}
              >
                <span className="block font-[family-name:var(--titres)] text-lg font-semibold">{p.nom}</span>
                <span className="block text-sm">{p.surface}&nbsp;m²</span>
                {/* L'unité intérieure qui s'allume, et son souffle frais. */}
                <svg viewBox="0 0 40 22" aria-hidden="true" className={`absolute bottom-3 right-3 w-12 transition-all duration-500 ${active ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}>
                  <rect x="1" y="1" width="38" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M6 15 h28 M10 19 h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <p className="rounded-[1.25rem] border border-[var(--trait)] bg-[var(--fond)] p-5 text-lg" aria-live="polite">
          <strong className="font-[family-name:var(--titres)] text-5xl font-semibold tabular-nums tracking-[-0.04em]">{n}</strong>{" "}
          {n > 1 ? "unités intérieures" : "unité intérieure"}
          <span className="block text-[15px] text-[var(--doux)]">{n > 0 ? `${surface} m² à rafraîchir` : "Aucune pièce choisie"}</span>
        </p>
        <div
          role="status"
          data-film="fourchette"
          className={`flex-1 space-y-1 rounded-[1.25rem] p-5 transition-colors duration-500 ${n > 0 ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "border border-[var(--trait)] bg-[var(--fond)]"}`}
        >
          {n > 0 ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F2B6A0]">Fourchette TTC, pose comprise</p>
              <p className="whitespace-nowrap font-[family-name:var(--titres)] text-[1.8rem] font-semibold tabular-nums tracking-[-0.03em] sm:text-4xl">
                {euros(FOURCHETTES[n][0])} – {euros(FOURCHETTES[n][1])}
              </p>
              <p className="text-sm">Exemple · le prix ferme vient au devis, après la visite technique.</p>
            </>
          ) : (
            <p className="text-[var(--doux)]">Touche une pièce : la fourchette s&apos;affiche ici, pose comprise.</p>
          )}
        </div>
      </div>
    </div>
  );
}
