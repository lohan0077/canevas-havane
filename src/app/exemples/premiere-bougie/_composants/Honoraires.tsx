"use client";

import { useState } from "react";
import { POSTES, VERSEMENT, euros, total } from "./donnees";

/**
 * Les honoraires d'un recrutement, en exemple : on choisit un poste, le forfait
 * s'affiche avec son détail ligne par ligne, et son versement — une part à l'arrivée,
 * le reste à la première bougie. Prix HT (clients professionnels).
 */
export default function Honoraires() {
  const [id, setId] = useState(POSTES[0].id);
  const p = POSTES.find((x) => x.id === id) ?? POSTES[0];
  const t = total(p);
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choisir un poste d'exemple">
        {POSTES.map((x) => (
          <button
            key={x.id}
            type="button"
            aria-pressed={x.id === id}
            data-poste={x.id}
            onClick={() => setId(x.id)}
            className={`min-h-12 rounded-full border-2 px-5 text-[15px] font-bold transition-colors ${x.id === id ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)] hover:border-[var(--encre)]"}`}
          >
            {x.intitule}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-[2rem] bg-[var(--carte)] shadow-[0_40px_80px_-50px_rgba(27,27,48,0.8)]" data-film="forfait">
        <div className="space-y-2 bg-[var(--sombre)] p-6 text-[var(--sur-sombre)] sm:p-8">
          <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">Exemple · {p.intitule.toLowerCase()}</p>
          <p className="font-[family-name:var(--titres)] text-[clamp(2.6rem,6vw,4rem)] leading-none tabular-nums">Forfait {euros(t)} HT</p>
          <p className="text-[15px] text-[#C9C9DA]">{p.contexte}</p>
        </div>
        <ul className="divide-y divide-[var(--trait)]" data-film="lignes">
          {p.lignes.map((l) => (
            <li key={l.quoi} className="flex items-start justify-between gap-4 px-6 py-4 sm:px-8">
              <span>
                <span className="block text-[17px] font-bold">{l.quoi}</span>
                <span className="block text-[15px] text-[var(--doux)]">{l.detail}</span>
              </span>
              <span className="shrink-0 font-bold tabular-nums">{euros(l.montant)}</span>
            </li>
          ))}
          <li className="flex justify-between gap-4 bg-[var(--fond)] px-6 py-4 text-lg font-extrabold sm:px-8">
            <span>Total HT</span>
            <span className="tabular-nums">{euros(t)}</span>
          </li>
        </ul>
        <div className="grid grid-cols-2 border-t border-[var(--trait)]" data-film="versement">
          {VERSEMENT.map((v, i) => (
            <div key={v.quand} className={`space-y-1 px-6 py-5 sm:px-8 ${i ? "border-l border-[var(--trait)] bg-[#FFF1CF]" : ""}`}>
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[var(--doux)]">{v.quand}</p>
              <p className="font-[family-name:var(--titres)] text-[1.9rem] leading-none tabular-nums">{euros(Math.round((t * v.part) / 100))}</p>
              <p className="text-[14px] text-[var(--doux)]">{v.part} % du forfait</p>
            </div>
          ))}
        </div>
      </div>
      <p className="text-[15px] text-[var(--doux)]">
        Prix d&apos;exemple, hors taxes : nos clients sont des entreprises. Les vrais honoraires sont écrits
        et signés avant de commencer, et ne bougent pas si le salaire négocié monte.
      </p>
    </div>
  );
}
