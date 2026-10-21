"use client";

import { useState } from "react";
import Image from "next/image";
import { euros, photos, total, type PageBudgets } from "./donnees";

/**
 * Trois budgets côte à côte, avec un seul interrupteur : « Détailler ligne par
 * ligne ». Les vols, les nuits, les transferts, puis le total. Prix d'exemple.
 */
export default function Budgets({ page }: { page: PageBudgets }) {
  const [detail, setDetail] = useState(false);
  return (
    <div className="space-y-4" data-film="budgets">
      <button
        type="button"
        aria-pressed={detail}
        onClick={() => setDetail((d) => !d)}
        data-film="detailler"
        className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border-2 border-[var(--accent)] bg-[var(--carte)] px-4 text-base font-bold sm:w-auto"
      >
        <span>Détailler ligne par ligne</span>
        <span aria-hidden="true" className={`relative h-6 w-11 rounded-full transition-colors ${detail ? "bg-[var(--accent)]" : "bg-[var(--trait)]"}`}>
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-[left] ${detail ? "left-[22px]" : "left-0.5"}`} />
        </span>
      </button>
      <ul className="grid gap-3 md:grid-cols-3">
        {page.voyages.map((v) => {
          const p = photos[v.photo];
          return (
            <li key={v.ou} className="overflow-hidden rounded-2xl bg-[var(--carte)] shadow-[0_20px_40px_-34px_rgba(15,42,67,0.7)]">
              <div className="flex items-center gap-3 p-3">
                <Image src={p.src} width={p.largeur} height={p.hauteur} alt={p.alt} sizes="64px" className="h-14 w-14 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-[family-name:var(--titres)] text-2xl leading-tight">{v.ou}</h3>
                  <p className="text-sm text-[var(--doux)]">{v.duree} · {page.pour}</p>
                </div>
                <p className="text-right">
                  <span className="block text-xl font-bold tabular-nums">{euros(total(v))}</span>
                  <span className="block text-[11px] text-[var(--doux)]">TTC, exemple</span>
                </p>
              </div>
              {detail && (
                <div className="border-t border-[var(--trait)] bg-[var(--fond)] px-4 py-3 space-y-2">
                  <ul className="space-y-1 text-[15px]">
                    {v.lignes.map((l) => (
                      <li key={l.quoi} className="flex justify-between gap-4">
                        <span>{l.quoi}</span>
                        <span className="font-semibold tabular-nums">{euros(l.montant)}</span>
                      </li>
                    ))}
                    <li className="flex justify-between gap-4 border-t border-[var(--trait)] pt-1 font-bold">
                      <span>Total</span>
                      <span className="tabular-nums">{euros(total(v))}</span>
                    </li>
                  </ul>
                  <p className="text-sm text-[var(--doux)]">{v.note}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
