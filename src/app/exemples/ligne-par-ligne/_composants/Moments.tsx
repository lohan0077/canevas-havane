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
    <div data-film="moments" className="overflow-hidden rounded-[28px] bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="space-y-5 p-5 sm:p-8">
        <p className="font-[family-name:var(--titres)] text-[34px] leading-[1.05] sm:text-[44px]">
          Qu&apos;est-ce qui <em className="text-[#E9B36B]">t&apos;arrive</em>&nbsp;?
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
                cle === x.cle ? "bg-[#E9B36B] text-[#1B3329]" : "bg-[#24443A] text-[var(--sur-sombre)] hover:bg-[#2C5245]"
              }`}
            >
              {x.libelle}
            </button>
          ))}
        </div>
      </div>

      <div aria-live="polite" className="border-t border-[#2E4A3E] bg-[#20392F] p-5 sm:p-8">
        {m ? (
          <div className="space-y-5">
            <p className="font-[family-name:var(--titres)] text-[28px] leading-tight">{m.titre}</p>
            <div className="space-y-2">
              <p className="text-[12px] font-semibold tracking-[0.18em] text-[#E9B36B] uppercase">Les questions d&apos;abord</p>
              <ol className="space-y-2 text-[16px] leading-snug">
                {m.questions.map((q, i) => (
                  <li key={q} className="flex gap-3">
                    <span aria-hidden="true" className="font-[family-name:var(--titres)] text-[#A8C9B6] tabular-nums">{i + 1}.</span>
                    {q}
                  </li>
                ))}
              </ol>
            </div>
            {detail && (
              <>
                <div className="space-y-2">
                  <p className="text-[12px] font-semibold tracking-[0.18em] text-[#E9B36B] uppercase">Ce qu&apos;on regarde ensemble</p>
                  <ul className="space-y-1.5 text-[15px] leading-snug text-[#DCE7E0]">
                    {m.ensemble.map((e) => (
                      <li key={e} className="flex gap-3">
                        <span aria-hidden="true" className="text-[#A8C9B6]">—</span>
                        {e}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="rounded-[14px] bg-[#1B3329] p-4 text-[14px] leading-relaxed text-[#BFD3C6]">
                  <span className="font-semibold text-[var(--sur-sombre)]">Qui d&apos;autre consulter : </span>
                  {m.autres}
                </p>
              </>
            )}
            <p className="text-[13px] text-[#BFD3C6]">Aucun placement n&apos;est proposé avant d&apos;avoir répondu à ces questions.</p>
            <Link
              href={detail ? `${DOSSIER}#rendez-vous` : `${DOSSIER}/moments`}
              className="inline-block rounded-full bg-[var(--fond)] px-5 py-3 text-[15px] font-semibold text-[var(--encre)]"
            >
              {detail ? "En parler, au cabinet ou en visio" : "Tout lire sur ce moment"}
            </Link>
          </div>
        ) : (
          <p className="text-[15px] leading-relaxed text-[#BFD3C6]">
            Touche ce qui t&apos;arrive. Je te dis les questions à se poser, avant de parler du moindre placement.
          </p>
        )}
      </div>
    </div>
  );
}
