"use client";

import { useState } from "react";
import Velo from "./Velo";
import { conseiller } from "./donnees";

const MIN = 1, MAX = 30;

/**
 * La seule question de l'accueil : ton trajet, c'est combien ? On glisse la distance,
 * on dit s'il y a une côte, et le site montre le vélo qu'il faut, avec un temps
 * estimé. Calculé dans le navigateur, sans rien envoyer.
 */
export default function Trajet() {
  const [km, setKm] = useState(3);
  const [cote, setCote] = useState(false);
  const c = conseiller(km, cote);
  const rempli = ((km - MIN) / (MAX - MIN)) * 100;

  return (
    <div data-film="trajet" className="space-y-5">
      <div className="space-y-4 rounded-[28px] bg-[#183A2A] p-5">
        <label className="block space-y-3">
          <span className="flex items-baseline justify-between gap-4">
            <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#C3D9C9]">Aller simple</span>
            <span className="font-[family-name:var(--titres)] text-[44px] font-bold leading-none tabular-nums text-[#F2C14E]">{km} km</span>
          </span>
          <input
            type="range"
            min={MIN}
            max={MAX}
            value={km}
            onChange={(e) => setKm(Number(e.target.value))}
            className="h-3 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-[#1F3A2C] [&::-moz-range-thumb]:bg-[#F2C14E] [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#1F3A2C] [&::-webkit-slider-thumb]:bg-[#F2C14E]"
            style={{ background: `linear-gradient(90deg, #F2C14E ${rempli}%, #2E5A45 ${rempli}%)` }}
          />
        </label>
        <button
          type="button"
          role="switch"
          aria-checked={cote}
          data-film="cote"
          onClick={() => setCote((v) => !v)}
          className="flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl border border-white/15 px-4 text-left"
        >
          <span className="text-[17px] font-semibold">Une côte sur le trajet&nbsp;?</span>
          <span aria-hidden="true" className={`relative h-8 w-14 shrink-0 rounded-full transition-colors ${cote ? "bg-[#F2C14E]" : "bg-[#2E5A45]"}`}>
            <span className={`absolute top-1 h-6 w-6 rounded-full bg-[var(--sombre)] transition-[left] ${cote ? "left-7" : "left-1"}`} />
          </span>
        </button>
        {/* Le profil du trajet : plat, ou avec sa côte. */}
        <div aria-hidden="true">
          <svg viewBox="0 0 300 70" className="h-16 w-full">
            <path d="M0 60 L300 60" stroke="#2E5A45" strokeWidth="2" strokeDasharray="4 6" />
            <path d="M0 58 C60 58 90 57 120 56 S240 58 300 57" fill="none" stroke="#F2C14E" strokeWidth="4" strokeLinecap="round" className={`transition-opacity duration-300 ${cote ? "opacity-0" : "opacity-100"}`} />
            <path d="M0 58 C50 58 80 56 110 40 C140 20 160 14 190 16 C230 20 250 50 300 52" fill="none" stroke="#F2C14E" strokeWidth="4" strokeLinecap="round" className={`transition-opacity duration-300 ${cote ? "opacity-100" : "opacity-0"}`} />
          </svg>
          <span className="mt-1 flex justify-between text-[12px] font-semibold text-[#C3D9C9]">
            <span>Chez toi</span>
            <span>Lundi, 8 h 30</span>
          </span>
        </div>
      </div>

      <div data-film="resultat" aria-live="polite" className="overflow-hidden rounded-[28px] bg-[#F2C14E] text-[var(--sombre)]">
        <div className="flex items-center gap-4 p-5">
          <Velo couleur="#1F3A2C" roues="#1F3A2C" batterie={c.batterie !== null} className="h-16 w-28 shrink-0" />
          <div className="min-w-0">
            <p className="text-[12px] font-bold uppercase tracking-[0.12em]">Pour toi</p>
            <p className="font-[family-name:var(--titres)] text-[26px] font-bold uppercase leading-[1.02]">{c.velo}</p>
          </div>
        </div>
        <dl className="grid grid-cols-3 border-t-2 border-[var(--sombre)]">
          <div className="border-r-2 border-[var(--sombre)] p-3">
            <dt className="text-[11px] font-bold uppercase tracking-[0.08em]">Trajet</dt>
            <dd className="whitespace-nowrap font-[family-name:var(--titres)] text-[21px] font-bold tabular-nums">≈ {c.minutes} min</dd>
          </div>
          <div className="border-r-2 border-[var(--sombre)] p-3">
            <dt className="text-[11px] font-bold uppercase tracking-[0.08em]">Batterie</dt>
            <dd className="whitespace-nowrap font-[family-name:var(--titres)] text-[21px] font-bold tabular-nums">{c.batterie ? `${c.batterie} Wh` : "—"}</dd>
          </div>
          <div className="p-3">
            <dt className="text-[11px] font-bold uppercase tracking-[0.08em]">Recharge</dt>
            <dd className="text-[15px] font-bold leading-tight">{c.recharge}</dd>
          </div>
        </dl>
        <p className="border-t-2 border-[var(--sombre)] p-4 text-[15px] leading-relaxed">{c.pourquoi}</p>
        <p className="bg-[var(--sombre)] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[#F2C14E]">Estimation · à essayer sur ton vrai trajet</p>
      </div>
    </div>
  );
}
