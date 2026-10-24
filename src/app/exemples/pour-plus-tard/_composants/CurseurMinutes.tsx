"use client";

import { useState } from "react";
import Image from "next/image";
import { MINUTES, photos } from "./donnees";

const borne = (x: number) => Math.max(0, Math.min(1, x));

/**
 * L'accueil sans portfolio : deux photos de la même famille, minute 1 et minute 40, et un
 * curseur pour passer de l'une à l'autre. La seconde photo monte entre la minute 12 et la
 * minute 32 ; la légende et la frise suivent la minute. Tout se passe dans le navigateur.
 */
export default function CurseurMinutes() {
  const [minute, setMinute] = useState(1);
  const fondu = borne((minute - 12) / 20);
  const etape = MINUTES.find((m) => minute <= m.jusqua) ?? MINUTES[MINUTES.length - 1];
  const rempli = ((minute - 1) / 39) * 100;

  return (
    <div id="minutes" data-film="minutes" className="scroll-mt-24 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch lg:gap-10">
      <div className="bg-[#FBF7EF] p-2.5 pb-2 shadow-[0_30px_70px_-35px_rgba(42,33,29,0.8)] sm:p-3.5">
        <div className="relative aspect-square overflow-hidden bg-[var(--sombre)] sm:aspect-[5/4]">
          <Image src={photos.minute1.src} alt={photos.minute1.alt} fill priority sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" style={{ opacity: 1 - fondu }} />
          <Image src={photos.minute40.src} alt={photos.minute40.alt} fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover object-[60%_50%]" style={{ opacity: fondu }} />
          <p aria-hidden="true" className="absolute bottom-3 left-4 font-[family-name:var(--titres)] text-[96px] italic leading-none text-[#FFFFFF] tabular-nums [text-shadow:0_2px_22px_rgba(0,0,0,.55)]">
            {minute}
            <span className="align-top text-5xl">′</span>
          </p>
        </div>
        <p className="pt-1.5 text-center font-[family-name:var(--f-caveat)] text-[24px] leading-tight text-[#3B2F2A]">la même famille, minute {minute}</p>
      </div>

      <div className="flex flex-col justify-between gap-6 rounded-[6px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-8">
        <label className="block space-y-4">
          <span className="flex items-baseline justify-between text-[13px] font-semibold uppercase tracking-[0.16em]">
            <span>Minute 1</span>
            <span>Minute 40</span>
          </span>
          <input
            type="range"
            min={1}
            max={40}
            value={minute}
            onChange={(e) => setMinute(Number(e.target.value))}
            data-film="curseur-minutes"
            aria-label="Avancer dans la séance, de la minute 1 à la minute 40"
            className="h-2 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[5px] [&::-moz-range-thumb]:border-[var(--accent)] [&::-moz-range-thumb]:bg-[var(--carte)] [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[5px] [&::-webkit-slider-thumb]:border-[var(--accent)] [&::-webkit-slider-thumb]:bg-[var(--carte)]"
            style={{ background: `linear-gradient(90deg, var(--accent) ${rempli}%, var(--trait) ${rempli}%)` }}
          />
        </label>

        <div aria-live="polite" className="min-h-[8.5rem] space-y-2">
          <p className="font-[family-name:var(--titres)] text-[clamp(1.7rem,3vw,2.4rem)] font-medium leading-[1.08]">{etape.titre}</p>
          <p className="text-[17px] leading-relaxed text-[var(--doux)]">{etape.texte}</p>
        </div>

        <ol aria-hidden="true" className="grid grid-cols-4 gap-2">
          {MINUTES.map((m, i) => {
            const debut = i === 0 ? 1 : MINUTES[i - 1].jusqua + 1;
            const actif = minute >= debut && minute <= m.jusqua;
            return (
              <li key={m.jusqua} className={`border-t-2 pt-2 text-[13px] font-semibold tabular-nums transition-colors duration-500 ${actif ? "border-[var(--accent)] text-[var(--encre)]" : "border-[var(--trait)] text-[var(--doux)]"}`}>
                {debut}–{m.jusqua}′
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
