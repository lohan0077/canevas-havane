"use client";

import { useState } from "react";
import { bilans } from "./donnees";

/**
 * Le bilan du lundi, publié chaque semaine (et filmé pour TikTok) : arrivées, appels de
 * nuit, propriétaires réveillés. Une semaine où un propriétaire a été réveillé est
 * affichée comme les autres : un bilan qui ne dirait que les bonnes semaines serait
 * trompeur. Chiffres d'exemple ; sur un vrai site, les vrais.
 */
export default function Bilan() {
  const [i, setI] = useState(0);
  const b = bilans[i];
  const lignes = [
    { libelle: "Arrivées", valeur: b.arrivees },
    { libelle: "Appels de nuit", valeur: b.appels },
    { libelle: "Propriétaires réveillés", valeur: b.reveilles },
  ];

  return (
    <div data-film="bilan" className="space-y-5">
      <div role="group" aria-label="Choisir la semaine" className="flex flex-wrap gap-2">
        {bilans.map((s, k) => (
          <button
            key={s.semaine}
            type="button"
            aria-pressed={i === k}
            onClick={() => setI(k)}
            className={`min-h-11 rounded-full border px-4 text-[14px] font-bold tabular-nums ${
              i === k ? "border-[#E2B65C] bg-[#E2B65C] text-[#162132]" : "border-[#34435A] text-[#F1ECE2]"
            }`}
          >
            {s.court}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-[22px] border border-[#34435A] bg-[#1C2A3F]" aria-live="polite">
        <div className="border-b border-[#34435A] px-5 py-4 sm:px-7">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#E2B65C]">Le Veilleur · lundi</p>
          <p className="font-[family-name:var(--titres)] text-[28px] leading-tight text-[#F1ECE2]">Le bilan de la semaine</p>
          <p className="text-[14px] text-[#C9D0DB]">Semaine {b.semaine}</p>
        </div>
        <ul className="divide-y divide-[#34435A]">
          {lignes.map((l, k) => (
            <li key={l.libelle} className="flex items-center justify-between gap-4 px-5 py-4 sm:px-7">
              <span className={`text-[17px] ${k === 2 ? "font-bold text-[#F1ECE2]" : "text-[#C9D0DB]"}`}>{l.libelle}</span>
              <span className={`font-[family-name:var(--titres)] text-[44px] leading-none tabular-nums ${k === 2 ? "text-[#E2B65C]" : "text-[#F1ECE2]"}`}>
                {l.valeur}
              </span>
            </li>
          ))}
        </ul>
        <p className="border-t border-[#34435A] px-5 py-4 text-[15px] leading-relaxed text-[#F1ECE2] sm:px-7">{b.note}</p>
        <p className="bg-[#162132] px-5 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-[#C9D0DB] sm:px-7">
          Chiffres d&apos;exemple · sur un vrai site, les vrais, chaque lundi
        </p>
      </div>
    </div>
  );
}
