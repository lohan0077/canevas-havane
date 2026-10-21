"use client";

import { useState } from "react";
import { BULLETINS } from "./donnees";
import { Faits, Semaine } from "./Meteo";
import PanierSemaine from "./PanierSemaine";

/** Les bulletins des lundis passés : un onglet par semaine, le ciel puis le panier. */
export default function Bulletins() {
  const [numero, setNumero] = useState(BULLETINS[0].numero);
  const b = BULLETINS.find((x) => x.numero === numero) ?? BULLETINS[0];
  return (
    <div className="space-y-8">
      <div role="tablist" aria-label="Choisir un bulletin" className="flex gap-2 overflow-x-auto">
        {BULLETINS.map((x) => (
          <button
            key={x.numero}
            type="button"
            role="tab"
            aria-selected={x.numero === numero}
            onClick={() => setNumero(x.numero)}
            className={`shrink-0 rounded-full border px-5 py-2.5 font-[family-name:var(--titres)] text-xs uppercase tracking-[0.2em] ${x.numero === numero ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[var(--trait)]"}`}
          >
            N° {x.numero}
          </button>
        ))}
      </div>
      <div role="tabpanel" aria-label={`Bulletin n° ${b.numero}`} className="grid gap-10 md:grid-cols-2">
        <div className="space-y-6">
          <p className="font-[family-name:var(--titres)] text-xs uppercase tracking-[0.28em] text-[var(--doux)]">Semaine {b.semaine}</p>
          <p className="font-[family-name:var(--titres)] text-3xl font-light uppercase leading-tight">{b.phrase}</p>
          <Semaine bulletin={b} />
          <Faits bulletin={b} />
        </div>
        <div className="space-y-4">
          <p className="font-[family-name:var(--titres)] text-xs uppercase tracking-[0.28em] text-[var(--doux)]">Le panier qui allait avec</p>
          <PanierSemaine key={b.numero} bulletin={b} />
        </div>
      </div>
    </div>
  );
}
