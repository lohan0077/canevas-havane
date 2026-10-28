"use client";

import { useState } from "react";
import { DOSSIER, PAYEUR, euros, honorairesMax, pourcent, tauxMax } from "./donnees";

const MIN = 50_000;
const MAX = 700_000;

/**
 * Le barème en page d'accueil : on glisse le prix de sa maison, le site dit ce que
 * l'agence prend au maximum, qui le paie, et le prix qui sera affiché sur l'annonce.
 * Tout se calcule dans le navigateur.
 */
export default function Calculateur() {
  const [prix, setPrix] = useState(250_000);
  const hono = honorairesMax(prix);
  const rempli = ((prix - MIN) / (MAX - MIN)) * 100;

  return (
    <div
      data-film="calcul"
      className="rounded-t-[200px] rounded-b-[2rem] border border-white/15 bg-[#2E2B28] px-6 pb-6 pt-16 text-[#F7F2E8] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.6)] sm:px-8 sm:pb-8"
    >
      <label htmlFor="lsm-prix" className="block space-y-3">
        <span className="block text-center text-[12px] font-semibold uppercase tracking-[0.22em]">Le prix de ta maison</span>
        <span className="block text-center font-[family-name:var(--titres)] text-[56px] leading-none tabular-nums" data-film="prix-affiche">
          {euros(prix)}
        </span>
      </label>
      <input
        id="lsm-prix"
        data-film="prix"
        type="range"
        min={MIN}
        max={MAX}
        step={5_000}
        value={prix}
        onChange={(e) => setPrix(Number(e.target.value))}
        aria-valuetext={euros(prix)}
        className="mt-5 h-3 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[5px] [&::-moz-range-thumb]:border-[#E8A27C] [&::-moz-range-thumb]:bg-[#2E2B28] [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[5px] [&::-webkit-slider-thumb]:border-[#E8A27C] [&::-webkit-slider-thumb]:bg-[#2E2B28] [&::-webkit-slider-thumb]:shadow-[0_0_0_6px_rgba(232,162,124,0.3)]"
        style={{ background: `linear-gradient(90deg, #E8A27C ${rempli}%, rgba(255,255,255,0.18) ${rempli}%)` }}
      />
      <p className="mt-2 flex justify-between text-[13px]">
        <span>{euros(MIN)}</span>
        <span>{euros(MAX)}</span>
      </p>

      <div role="status" aria-live="polite" data-film="resultat" className="mt-6 rounded-[1.5rem] bg-[#F7F2E8] p-5 text-[#3E3A36]">
        <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Ce que l&apos;agence prend, au maximum</p>
        <p className="mt-1 font-[family-name:var(--titres)] text-[48px] leading-none tabular-nums">
          {euros(hono)} <span className="font-[family-name:var(--texte)] text-[16px] font-semibold">TTC</span>
        </p>
        <p className="mt-2 text-[15px] font-semibold">
          {pourcent(tauxMax(prix))} TTC du prix, au maximum · {PAYEUR}
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-[var(--trait)] pt-4 text-[14px]">
          <div>
            <dt className="text-[var(--doux)]">Toi, tu touches</dt>
            <dd className="text-[18px] font-semibold tabular-nums">{euros(prix)}</dd>
          </div>
          <div>
            <dt className="text-[var(--doux)]">Prix affiché, au plus</dt>
            <dd className="text-[18px] font-semibold tabular-nums">{euros(prix + hono)}</dd>
          </div>
        </dl>
      </div>
      <p className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[14px]">
        <a href={`${DOSSIER}/bareme`} className="font-semibold underline decoration-[#E8A27C] decoration-2 underline-offset-[6px]">
          Le barème complet, en un clic
        </a>
        <span>Barème : exemple · calcul fait sur ton téléphone</span>
      </p>
    </div>
  );
}
