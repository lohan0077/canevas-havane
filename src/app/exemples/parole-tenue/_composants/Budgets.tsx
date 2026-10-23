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
    <div className="scroll-mt-24 space-y-5" data-film="budgets">
      <button
        type="button"
        aria-pressed={detail}
        onClick={() => setDetail((d) => !d)}
        data-film="detailler"
        className="flex min-h-14 w-full items-center justify-between gap-4 rounded-full border-2 border-[var(--encre)] bg-[var(--carte)] px-6 text-[17px] font-semibold sm:w-auto"
      >
        <span>Détailler ligne par ligne</span>
        <span aria-hidden="true" className={`relative h-7 w-12 rounded-full transition-colors duration-300 ${detail ? "bg-[#E5674B]" : "bg-[var(--trait)]"}`}>
          <span className={`absolute top-1 h-5 w-5 rounded-full bg-[var(--carte)] shadow transition-[left] duration-300 ${detail ? "left-6" : "left-1"}`} />
        </span>
      </button>
      <ul className="grid gap-4 md:grid-cols-3">
        {page.voyages.map((v) => {
          const p = photos[v.photo];
          return (
            <li key={v.ou} className="overflow-hidden rounded-[1.8rem] bg-[var(--carte)] shadow-[0_30px_60px_-45px_rgba(22,48,42,0.8)]">
              <div className="relative h-36 overflow-hidden">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="flex items-end justify-between gap-3 p-5">
                <div className="min-w-0">
                  <h3 className="font-[family-name:var(--titres)] text-[2rem] leading-none">{v.ou}</h3>
                  <p className="mt-1 text-[15px] text-[var(--doux)]">{v.duree} · {page.pour}</p>
                </div>
                <p className="text-right">
                  <span className="block font-[family-name:var(--titres)] text-[1.9rem] leading-none tabular-nums">{euros(total(v))}</span>
                  <span className="block text-[12px] text-[var(--doux)]">TTC, exemple</span>
                </p>
              </div>
              {detail && (
                <div className="space-y-2 border-t border-[var(--trait)] bg-[var(--fond)] px-5 py-4">
                  <ul className="space-y-1.5 text-[15px]">
                    {v.lignes.map((l) => (
                      <li key={l.quoi} className="flex justify-between gap-4">
                        <span>{l.quoi}</span>
                        <span className="font-semibold tabular-nums">{euros(l.montant)}</span>
                      </li>
                    ))}
                    <li className="flex justify-between gap-4 border-t border-[var(--trait)] pt-1.5 font-bold">
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
