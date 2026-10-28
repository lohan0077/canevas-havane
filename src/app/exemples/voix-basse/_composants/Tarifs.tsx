"use client";

import { useState } from "react";
import { ACTES, DATE_DES_TARIFS, euros, type Acte } from "./donnees";

/** La fiche d'un acte : le prix, ce qu'il comprend, ce qui peut s'ajouter, et la date. */
export function FicheTarif({ acte }: { acte: Acte }) {
  return (
    <article data-film="fiche-tarif" className="rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] overflow-hidden">
      <p className="bg-[var(--encre)] px-6 py-2.5 text-sm font-bold text-[var(--fond)] sm:px-8">Tarif au {DATE_DES_TARIFS}</p>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 px-6 pt-6 sm:px-8">
        <h3 className="text-3xl sm:text-4xl">{acte.nom}</h3>
        <p className="text-right">
          <span className="block text-4xl font-bold tabular-nums">{euros(acte.prix)}{acte.prix !== null && <span className="text-xl"> TTC</span>}</span>
          <span className="text-sm font-semibold text-[var(--doux)]">exemple</span>
        </p>
      </div>
      <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
        <div className="space-y-3">
          <h4 className="font-[family-name:var(--texte)] text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Compris</h4>
          <ul className="space-y-2">
            {acte.compris.map((c) => (
              <li key={c} className="flex gap-2.5">
                <span aria-hidden="true" className="font-bold">✓</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="font-[family-name:var(--texte)] text-sm font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Peut s&apos;ajouter</h4>
          {acte.ajouts.length ? (
            <ul className="space-y-2">
              {acte.ajouts.map((a) => (
                <li key={a.nom} className="flex items-baseline justify-between gap-3">
                  <span className="flex gap-2.5"><span aria-hidden="true" className="font-bold">+</span>{a.nom}</span>
                  {a.prix ? <span className="shrink-0 font-semibold tabular-nums">{euros(a.prix)}</span> : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[var(--doux)]">Rien : le prix est le prix.</p>
          )}
        </div>
      </div>
    </article>
  );
}

/** Le choix d'un acte, puis sa fiche. */
export default function ChoixTarif({ depart = "sterilisation-chatte" }: { depart?: string }) {
  const [id, setId] = useState(depart);
  const acte = ACTES.find((a) => a.id === id) ?? ACTES[0];
  return (
    <div className="space-y-6">
      <div role="radiogroup" aria-label="L'acte" className="flex flex-wrap gap-2">
        {ACTES.map((a) => (
          <button
            key={a.id}
            type="button"
            role="radio"
            aria-checked={a.id === id}
            data-film={`acte-${a.id}`}
            onClick={() => setId(a.id)}
            className={`rounded-full border px-4 py-2.5 text-[15px] font-bold transition-colors ${a.id === id ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}
          >
            {a.nom}
          </button>
        ))}
      </div>
      <FicheTarif acte={acte} />
    </div>
  );
}
