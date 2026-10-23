"use client";

import { useState } from "react";
import { etapes } from "./donnees";

/**
 * « Quand est-ce que je paie ? » La frise du site : rendez-vous, dossier, offre de la
 * banque, fonds versés. Chaque étape se touche et dit ce qui s'y passe. La frise dit
 * elle-même que « rien avant le versement des fonds » est la loi pour tous (CMF L519-6),
 * et non un avantage du cabinet (C. consom. L121-4, 10°). Honoraires d'exemple.
 */
export default function Frise() {
  const [active, setActive] = useState(0);

  return (
    <div data-film="frise" className="overflow-hidden rounded-[1.75rem] border border-[var(--trait)] bg-white text-[var(--encre)] shadow-[0_40px_80px_-50px_rgba(27,42,65,0.6)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--trait)] px-5 py-4 sm:px-7">
        <p className="font-[family-name:var(--titres)] text-[28px] font-semibold leading-tight tracking-[-0.02em]">Quand est-ce que je paie&nbsp;?</p>
      </div>
      <ol>
        {etapes.map((e, i) => {
          const ouverte = active === i;
          const finale = i === etapes.length - 1;
          return (
            <li key={e.titre} className="border-b border-[var(--trait)] last:border-b-0">
              <button
                type="button"
                data-film={`etape-${i + 1}`}
                aria-expanded={ouverte}
                onClick={() => setActive(i)}
                className={`grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 text-left sm:px-7 ${ouverte ? "bg-[var(--fond)]" : ""}`}
              >
                <span
                  aria-hidden="true"
                  className={`grid h-9 w-9 place-items-center rounded-full border-2 text-[15px] font-bold tabular-nums ${
                    finale ? "border-[#F2C14E] bg-[#F2C14E] text-[#1B2A41]" : "border-[#1B2A41]"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="text-[18px] font-semibold leading-snug">{e.titre}</span>
                <span className="text-right">
                  <span className={`block font-[family-name:var(--titres)] text-[24px] font-semibold leading-none tracking-[-0.02em] ${finale ? "text-[var(--accent-texte)]" : ""}`}>{e.prix}</span>
                  {e.note && <span className="block pt-1 text-[12px] text-[var(--doux)]">{e.note}</span>}
                </span>
              </button>
              {ouverte && <p className="bg-[var(--fond)] px-5 pb-5 pl-[4.75rem] text-[15px] leading-relaxed text-[var(--doux)] sm:px-7 sm:pl-[5.25rem]">{e.texte}</p>}
            </li>
          );
        })}
      </ol>
      <p className="bg-[#1B2A41] px-5 py-4 text-[15px] leading-snug font-semibold text-[#FFF8EC] sm:px-7">
        Rien avant le versement des fonds : c&apos;est la loi pour tous (CMF, art. L519-6).
      </p>
    </div>
  );
}
