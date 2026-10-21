"use client";

import { useState } from "react";
import { carte } from "./donnees";

/**
 * La carte professionnelle, en tête de l'accueil, avant toute photo. Chaque ligne se
 * touche et dit ce qu'elle veut dire. Le numéro est un exemple, et la carte le porte.
 * Aucun sceau, aucune couleur d'État, aucun « agréé » : le décret n° 72-678 (art. 92)
 * interdit toute mention qui ferait croire à un agrément.
 */
export default function Carte({ compacte = false }: { compacte?: boolean }) {
  const [ouverte, setOuverte] = useState<string | null>(null);
  const ligne = carte.find((l) => l.cle === ouverte);

  return (
    <div data-film="carte" className="overflow-hidden rounded-[22px] border border-[var(--trait)] bg-[var(--carte)] shadow-[0_28px_60px_-36px_rgba(22,33,50,0.55)]">
      <div className="flex items-center justify-between gap-3 bg-[var(--sombre)] px-5 py-3.5 text-[var(--sur-sombre)]">
        <p className="text-[13px] font-bold uppercase tracking-[0.16em]">Carte professionnelle</p>
        <span className="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--sur-accent)]">
          exemple
        </span>
      </div>
      <dl className="divide-y divide-[var(--trait)]">
        {carte.map((l) => {
          const active = ouverte === l.cle;
          return (
            <div key={l.cle}>
              <dt className="sr-only">{l.libelle}</dt>
              <dd>
                <button
                  type="button"
                  data-film={`carte-${l.cle}`}
                  aria-expanded={active}
                  onClick={() => setOuverte(active ? null : l.cle)}
                  className={`flex w-full items-baseline justify-between gap-4 px-5 text-left transition-colors ${compacte ? "py-2.5" : "py-3.5"} ${active ? "bg-[var(--fond)]" : ""}`}
                >
                  <span aria-hidden="true" className="shrink-0 text-[12px] font-bold uppercase tracking-[0.12em] text-[var(--doux)]">
                    {l.libelle}
                  </span>
                  <span className="text-right text-[15px] font-bold leading-snug">
                    {l.valeur}
                    <span aria-hidden="true" className="ml-2 inline-block text-[var(--accent-texte)]">{active ? "−" : "+"}</span>
                  </span>
                </button>
              </dd>
            </div>
          );
        })}
      </dl>
      <p aria-live="polite" className="min-h-[3.25rem] border-t border-[var(--trait)] bg-[var(--fond)] px-5 py-3 text-[14px] leading-snug text-[var(--doux)]">
        {ligne ? ligne.explication : "Touche une ligne : elle dit ce qu'elle veut dire."}
      </p>
    </div>
  );
}
