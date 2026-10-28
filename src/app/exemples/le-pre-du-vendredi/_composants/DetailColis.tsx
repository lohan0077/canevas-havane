"use client";

import { useState } from "react";
import { COLIS, PRIX_KILO, euros, kilos } from "./donnees";

/**
 * L'intérieur d'un colis : chaque morceau, son poids, ce qu'il coûte au prix du
 * kilo. Deux colis, un onglet chacun. Les poids et le prix sont des exemples.
 */
export default function DetailColis({ depart = "10" }: { depart?: string }) {
  const [id, setId] = useState(depart);
  const colis = COLIS.find((c) => c.id === id) ?? COLIS[0];
  const plusLourd = Math.max(...colis.morceaux.map((m) => m.poids));

  return (
    <div id="detail-colis" className="space-y-6">
      <div role="tablist" aria-label="Choisir un colis" className="inline-flex rounded-full border border-[var(--trait)] p-1">
        {COLIS.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={c.id === id}
            onClick={() => setId(c.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold ${c.id === id ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "text-[var(--encre)]"}`}
          >
            {c.titre}
          </button>
        ))}
      </div>

      <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]" role="tabpanel" aria-label={colis.titre}>
        {colis.morceaux.map((m) => (
          <li key={m.nom} className="py-4 space-y-2">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[28px] leading-none">{m.nom}</h3>
              <p className="shrink-0 text-lg font-semibold tabular-nums">{kilos(m.poids)}</p>
            </div>
            <div className="h-1.5 rounded-full bg-[var(--trait)]" aria-hidden="true">
              <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${(m.poids / plusLourd) * 100}%` }} />
            </div>
            <p className="flex items-baseline justify-between gap-4 text-sm text-[var(--doux)]">
              <span>{m.usage}</span>
              <span className="shrink-0 tabular-nums">{euros(m.poids * PRIX_KILO)}</span>
            </p>
          </li>
        ))}
      </ul>

      <div id="prix-colis" className="flex items-end justify-between gap-4">
        <p>
          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--doux)]">Le prix au kilo</span>
          <span className="font-[family-name:var(--titres)] text-4xl tabular-nums">{euros(PRIX_KILO)}</span>
        </p>
        <p className="text-right">
          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-[var(--doux)]">{colis.titre}</span>
          <span className="font-[family-name:var(--titres)] text-4xl tabular-nums">{euros(colis.poids * PRIX_KILO)}</span>
        </p>
      </div>
      <p className="text-xs text-[var(--doux)]">Prix TTC d&apos;exemple. Le jour de la découpe, chaque colis est pesé : tu paies son poids réel.</p>
    </div>
  );
}
