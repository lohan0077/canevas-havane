"use client";

import Link from "next/link";
import { useState } from "react";
import { DOSSIER, repondre } from "./donnees";

const MAX = 30;

/**
 * La seule question du site : « t'as pas pédalé depuis combien de temps ? ». On
 * glisse, le site répond par une première heure à la mesure. Tout se calcule dans le
 * navigateur.
 */
export default function Depuis() {
  const [ans, setAns] = useState(1);
  const [jamais, setJamais] = useState(false);
  const r = repondre(ans, jamais);
  const rempli = ((ans - 1) / (MAX - 1)) * 100;

  return (
    <div className="space-y-4" data-film="depuis">
      <div className="space-y-5 rounded-[36px] bg-[var(--carte)] p-6 shadow-[0_24px_50px_-30px_rgba(31,58,44,0.5)]">
        <label className="block space-y-3">
          <span className="flex items-baseline justify-between gap-4">
            <span className="text-[15px] font-semibold">Sans faire de vélo depuis…</span>
            <span className={`whitespace-nowrap font-[family-name:var(--titres)] text-[44px] font-extrabold leading-none tabular-nums transition-opacity ${jamais ? "opacity-30" : ""}`}>
              {ans} an{ans > 1 ? "s" : ""}
            </span>
          </span>
          <input
            type="range"
            min={1}
            max={MAX}
            value={ans}
            disabled={jamais}
            onChange={(e) => setAns(Number(e.target.value))}
            aria-label="Nombre d'années sans faire de vélo"
            className="h-4 w-full cursor-pointer appearance-none rounded-full disabled:cursor-not-allowed [&::-moz-range-thumb]:h-10 [&::-moz-range-thumb]:w-10 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-[var(--carte)] [&::-moz-range-thumb]:bg-[#E8553D] [&::-webkit-slider-thumb]:h-10 [&::-webkit-slider-thumb]:w-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[var(--carte)] [&::-webkit-slider-thumb]:bg-[#E8553D] [&::-webkit-slider-thumb]:shadow-md"
            style={{ background: `linear-gradient(90deg, #F2C14E ${rempli}%, #EADFC8 ${rempli}%)` }}
          />
          <span className="flex justify-between text-[13px] text-[var(--doux)]">
            <span>1 an</span>
            <span>30 ans et plus</span>
          </span>
        </label>
        <label className="flex items-center gap-3 text-[15px]">
          <input type="checkbox" checked={jamais} onChange={(e) => setJamais(e.target.checked)} className="h-6 w-6 shrink-0 accent-[var(--accent)]" />
          Je n&apos;ai jamais appris
        </label>
      </div>

      <div data-film="reponse" aria-live="polite" className="relative overflow-hidden rounded-[36px] bg-[var(--sombre)] p-6 text-[var(--sur-sombre)]">
        <p className="relative font-[family-name:var(--titres)] text-[30px] font-extrabold leading-[1.05] text-[#F2C14E]">{r.titre}</p>
        <p className="relative mt-3 text-[17px] leading-relaxed">{r.texte}</p>
        <dl className="relative mt-4 grid grid-cols-3 gap-2 text-center">
          {[
            { t: "Où", d: r.ou },
            { t: "Combien", d: r.duree },
            { t: "Avec", d: r.avec },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl bg-white/10 px-2 py-3">
              <dt className="text-[12px] font-semibold uppercase tracking-[0.08em]">{x.t}</dt>
              <dd className="mt-1 text-[15px] font-bold leading-tight">{x.d}</dd>
            </div>
          ))}
        </dl>
        <Link href={`${DOSSIER}/premiere-heure`} className="relative mt-5 flex min-h-14 items-center justify-center rounded-full bg-[#F2C14E] px-6 text-[17px] font-bold text-[#1F3A2C]">
          Réserver ma première heure
        </Link>
        <p className="relative mt-3 text-center text-[13px]">Offerte, sans obligation d&apos;achat. Vélo et casque prêtés.</p>
      </div>
    </div>
  );
}
