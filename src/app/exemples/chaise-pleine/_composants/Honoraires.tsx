"use client";

import { useState } from "react";
import { POSTES, euros, total } from "./donnees";

/**
 * Les honoraires d'un recrutement, en exemple : on choisit un poste, le forfait
 * s'affiche avec son détail ligne par ligne. Prix HT (clients professionnels).
 */
export default function Honoraires() {
  const [id, setId] = useState(POSTES[0].id);
  const p = POSTES.find((x) => x.id === id) ?? POSTES[0];
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choisir un poste d'exemple">
        {POSTES.map((x) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={x.id === id}
            onClick={() => setId(x.id)}
            className={`min-h-11 rounded-lg border-2 px-4 text-[15px] font-bold ${x.id === id ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--carte)]" : "border-[var(--trait)] bg-[var(--carte)] hover:border-[var(--encre)]"}`}
          >
            {x.intitule}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl bg-[var(--carte)] shadow-[0_24px_40px_-32px_rgba(30,42,51,0.8)]" data-film="forfait">
        <div className="space-y-1 bg-[#2A343D] p-5 text-[#F4F1EA] sm:p-7">
          <p className="text-sm font-semibold text-[#F28C6B]">Exemple · {p.intitule.toLowerCase()}</p>
          <p className="font-[family-name:var(--titres)] text-5xl font-extrabold tabular-nums">Forfait {euros(total(p))} HT</p>
          <p className="text-sm text-[#C9D2D9]">{p.contexte}</p>
        </div>
        <ul className="divide-y divide-[var(--trait)]" data-film="lignes">
          {p.lignes.map((l) => (
            <li key={l.quoi} className="flex items-start justify-between gap-4 px-5 py-3.5 sm:px-7">
              <span>
                <span className="block font-bold">{l.quoi}</span>
                <span className="block text-sm text-[var(--doux)]">{l.detail}</span>
              </span>
              <span className="shrink-0 font-bold tabular-nums">{euros(l.montant)}</span>
            </li>
          ))}
          <li className="flex justify-between gap-4 bg-[var(--fond)] px-5 py-4 text-lg font-extrabold sm:px-7">
            <span>Total HT</span>
            <span className="tabular-nums">{euros(total(p))}</span>
          </li>
        </ul>
      </div>
      <p className="text-sm text-[var(--doux)]">
        Prix exemple, hors taxes : nos clients sont des entreprises. Les vrais honoraires sont écrits
        et signés avant de commencer, et ne bougent pas si le salaire négocié monte.
      </p>
    </div>
  );
}
