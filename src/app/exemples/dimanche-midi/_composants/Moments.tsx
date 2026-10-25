"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, moments } from "./donnees";

/**
 * « Qu'est-ce qui t'arrive ? » Des moments de vie, pas des produits : on touche ce qui
 * arrive, le site dit les questions à se poser d'abord, ce qu'on regarde ensemble et qui
 * d'autre consulter. Aucun placement nommé, aucun rendement promis. Avec `detail`, le
 * panneau dit tout ; sinon, les questions seulement et un lien vers la page.
 */
export default function Moments({ detail = false }: { detail?: boolean }) {
  const [cle, setCle] = useState<string | null>(null);
  const m = moments.find((x) => x.cle === cle);

  return (
    <div data-film="moments" className="overflow-hidden rounded-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="space-y-5 p-5 sm:p-8">
        <p className="font-[family-name:var(--titres)] text-[40px] leading-[1] sm:text-[54px]">
          Qu&apos;est-ce qui <em className="text-[#E3C374]">t&apos;arrive</em>&nbsp;?
        </p>
        <div role="group" aria-label="Ce qui t'arrive" className="grid grid-cols-2 gap-2.5">
          {moments.map((x) => (
            <button
              key={x.cle}
              type="button"
              data-film={`moment-${x.cle}`}
              aria-pressed={cle === x.cle}
              onClick={() => setCle(x.cle)}
              className={`min-h-14 rounded-[16px] px-4 py-3 text-left text-[15px] leading-snug font-semibold transition-colors ${
                cle === x.cle ? "bg-[#E3C374] text-[#22382C]" : "bg-[#3A5848] text-[var(--sur-sombre)] hover:bg-[#44624F]"
              }`}
            >
              {x.libelle}
            </button>
          ))}
        </div>
      </div>

      <div aria-live="polite" className="border-t border-[#3E5A4A] bg-[#283F32] p-5 sm:p-8">
        {m ? (
          <div className="space-y-5">
            <p className="font-[family-name:var(--titres)] text-[34px] leading-tight">{m.titre}</p>
            <div className="space-y-2">
              <p className="text-[12px] font-semibold tracking-[0.18em] text-[#E3C374] uppercase">Les questions d&apos;abord</p>
              <ol className="space-y-2 text-[16px] leading-snug">
                {m.questions.map((q, i) => (
                  <li key={q} className="flex gap-3">
                    <span aria-hidden="true" className="font-[family-name:var(--titres)] text-[#C9D9C9] tabular-nums">{i + 1}.</span>
                    {q}
                  </li>
                ))}
              </ol>
            </div>
            {detail && (
              <>
                <div className="space-y-2">
                  <p className="text-[12px] font-semibold tracking-[0.18em] text-[#E3C374] uppercase">Ce qu&apos;on regarde ensemble</p>
                  <ul className="space-y-1.5 text-[15px] leading-snug text-[#E7EEE6]">
                    {m.ensemble.map((e) => (
                      <li key={e} className="flex gap-3">
                        <span aria-hidden="true" className="text-[#C9D9C9]">—</span>
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="rounded-[14px] bg-[#22382C] p-4 text-[14px] leading-relaxed text-[#D6E2D6]">
                  <span className="font-semibold text-[var(--sur-sombre)]">Qui d&apos;autre consulter : </span>
                  {m.autres}
                </p>
              </>
            )}
            <p className="text-[13px] text-[#D6E2D6]">Aucun placement n&apos;est proposé avant d&apos;avoir répondu à ces questions.</p>
            <Link
              href={detail ? `${DOSSIER}#rendez-vous` : `${DOSSIER}/moments`}
              className="inline-block rounded-full bg-[var(--fond)] px-5 py-3 text-[15px] font-semibold text-[var(--encre)]"
            >
              {detail ? "En parler, au cabinet ou en visio" : "Tout lire sur ce moment"}
            </Link>
          </div>
        ) : (
          <p className="text-[15px] leading-relaxed text-[#D6E2D6]">
            Touche ce qui t&apos;arrive. Je te dis les questions à se poser, avant de parler du moindre placement.
          </p>
        )}
      </div>
    </div>
  );
}
