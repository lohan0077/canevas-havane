"use client";

import { useState } from "react";
import { euros, horsTaxe, produits, ttc, tva } from "./donnees";

/**
 * L'addition d'un vêtement, imprimée comme un ticket de caisse : chaque ligne de coût,
 * la TVA, le total TTC. On touche une ligne, elle s'explique sous le ticket. Avec
 * `choix`, des onglets pour passer d'un vêtement à l'autre.
 */
export default function Addition({ choix = false }: { choix?: boolean }) {
  const [produitId, setProduitId] = useState("jean");
  const [ouverte, setOuverte] = useState<string | null>(null);
  const p = produits.find((x) => x.id === produitId) ?? produits[0];
  const lignes = [
    ...p.lignes.filter((l) => !l.marque),
    { id: "tva", libelle: "TVA 20 %", montant: tva(p), detail: `Elle va à l'État : 20 % du prix hors taxe, soit ${euros(tva(p))}.` },
    ...p.lignes.filter((l) => l.marque),
  ];
  const detail = lignes.find((l) => l.id === ouverte);

  return (
    <div className="space-y-4" data-film="addition">
      {choix && (
        <div role="tablist" aria-label="Choisir un vêtement" className="flex gap-2 overflow-x-auto">
          {produits.map((x) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={x.id === p.id}
              onClick={() => {
                setProduitId(x.id);
                setOuverte(null);
              }}
              className={`shrink-0 rounded-full border-2 px-4 py-2 text-sm font-bold ${x.id === p.id ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}
            >
              {x.nom}
            </button>
          ))}
        </div>
      )}
      <div className="relative mx-auto max-w-md bg-[var(--carte)] px-5 pb-8 pt-6 shadow-[0_24px_50px_-30px_rgba(20,22,28,0.6)] [mask:conic-gradient(from_-45deg_at_bottom,#0000,#000_1deg_89deg,#0000_90deg)_50%/16px_100%]">
        <div className="space-y-1 border-b-2 border-dashed border-[var(--encre)] pb-4 pr-24">
          <p className="font-[family-name:var(--titres)] text-2xl font-black uppercase tracking-tight">L&apos;Addition</p>
          <p className="text-sm uppercase tracking-[0.18em]">
            {p.nom} · {p.sous}
          </p>
        </div>
        <ul className="py-2">
          {lignes.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                data-ligne={l.id}
                aria-expanded={ouverte === l.id}
                onClick={() => setOuverte(ouverte === l.id ? null : l.id)}
                className={`flex w-full items-baseline gap-2 rounded-md px-2 py-2.5 text-left transition-colors ${
                  ouverte === l.id ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "hover:bg-[var(--fond)]"
                } ${l.id === "marque" ? "font-bold" : ""}`}
              >
                <span>{l.libelle}</span>{" "}
                <span aria-hidden="true" className="mb-1 flex-1 border-b-2 border-dotted border-current opacity-40" />
                <span className="tabular-nums">{euros(l.montant)}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="flex items-baseline justify-between border-t-2 border-dashed border-[var(--encre)] px-2 pt-4 text-xl font-black">
          <span>Total TTC</span>{" "}
          <span className="tabular-nums">{euros(ttc(p))}</span>
        </p>
        <p className="px-2 pt-1 text-xs text-[var(--doux)]">
          Dont {euros(horsTaxe(p))} hors taxe. Composition : {p.composition}.
        </p>
        <span aria-hidden="true" className="absolute right-3 top-3 rotate-[12deg] rounded-md border-[3px] border-[#B3261E] px-2 py-0.5 font-[family-name:var(--titres)] text-sm font-black uppercase tracking-[0.2em] text-[#B3261E]">
          Exemple
        </span>
      </div>
      <div className="mx-auto min-h-[5.5rem] max-w-md rounded-xl border-2 border-[var(--encre)] bg-[var(--fond)] p-4" aria-live="polite" data-film="explication">
        {detail ? (
          <p>
            <strong className="font-bold">{detail.libelle} : </strong>
            {detail.detail}
          </p>
        ) : (
          <p className="text-[var(--doux)]">Touche une ligne de l&apos;addition : elle te dit à quoi sert cet argent.</p>
        )}
      </div>
    </div>
  );
}
