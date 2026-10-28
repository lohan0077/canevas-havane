"use client";

import { useState } from "react";
import { PLANNING } from "./donnees";

/** Le planning de la semaine, en vrai : on réserve sa place sans appeler. Rien n'est envoyé. */
export default function Planning() {
  const [reserves, setReserves] = useState<string[]>([]);
  return (
    <div className="space-y-6">
      {PLANNING.map((j) => (
        <section key={j.jour} id={`jour-${j.jour.toLowerCase()}`} className="space-y-2 scroll-mt-24">
          <h2 className="font-[family-name:var(--titres)] text-3xl font-light">{j.jour}</h2>
          <ul className="space-y-2">
            {j.cours.map((c) => {
              const cle = `${j.jour}-${c.heure}`;
              const reserve = reserves.includes(cle);
              return (
                <li key={cle} data-cours={cle} className="rounded-[24px] bg-[var(--carte)] p-4 sm:p-5 space-y-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <p>
                      <span className="block font-[family-name:var(--titres)] text-2xl">{c.nom}</span>
                      <span className="block text-[var(--doux)]">avec {c.prof} · 50 min · petit groupe</span>
                    </p>
                    <p className="font-[family-name:var(--titres)] text-3xl tabular-nums whitespace-nowrap">{c.heure}</p>
                  </div>
                  {reserve ? (
                    <div role="status" className="rounded-2xl bg-[var(--sombre)] p-4 text-[var(--sur-sombre)] space-y-1">
                      <p className="text-lg font-semibold">Réservé : {j.jour.toLowerCase()} {c.heure}</p>
                      <p className="text-sm">Démonstration : rien n'est envoyé, rien n'est enregistré.</p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      data-reserver={cle}
                      onClick={() => setReserves([...reserves, cle])}
                      className="w-full rounded-full bg-[var(--accent)] py-3.5 font-semibold text-[var(--sur-accent)]"
                    >
                      Réserver ma place
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      <p className="text-sm text-[var(--doux)]">Planning d'exemple. Annulation possible sur le site jusqu'à deux heures avant le cours.</p>
    </div>
  );
}
