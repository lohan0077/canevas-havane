"use client";

import { useState } from "react";
import Image from "next/image";
import { MINUTES, photos } from "./donnees";

const borne = (x: number) => Math.max(0, Math.min(1, x));

/**
 * L'accueil sans portfolio : deux photos, minute 1 et minute 40, et un curseur pour
 * passer de l'une à l'autre. La seconde photo monte entre la minute 12 et la minute 32 ;
 * la légende suit la minute. Tout se passe dans le navigateur.
 */
export default function CurseurMinutes() {
  const [minute, setMinute] = useState(1);
  const fondu = borne((minute - 12) / 20);
  const etape = MINUTES.find((m) => minute <= m.jusqua) ?? MINUTES[MINUTES.length - 1];
  const rempli = ((minute - 1) / 39) * 100;

  return (
    <div id="minutes" data-film="minutes" className="space-y-5">
      <div className="relative aspect-[4/5] sm:aspect-[5/4] overflow-hidden rounded-[6px] bg-[var(--sombre)]">
        <Image
          src={photos.minute1.src}
          alt={photos.minute1.alt}
          fill
          priority
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover"
          style={{ opacity: 1 - fondu }}
        />
        <Image
          src={photos.minute40.src}
          alt={photos.minute40.alt}
          fill
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover object-[60%_50%]"
          style={{ opacity: fondu }}
        />
        <p
          aria-hidden="true"
          className="absolute left-4 bottom-3 font-[family-name:var(--titres)] italic text-[#FFFFFF] text-[88px] leading-none tabular-nums [text-shadow:0_2px_18px_rgba(0,0,0,.45)]"
        >
          {minute}
          <span className="text-5xl align-top">′</span>
        </p>
      </div>

      <label className="block space-y-3">
        <span className="flex items-baseline justify-between text-sm font-bold uppercase tracking-[0.14em]">
          <span>Minute 1</span>
          <span className="normal-case tracking-normal text-base tabular-nums">minute {minute}</span>
          <span>Minute 40</span>
        </span>
        <input
          type="range"
          min={1}
          max={40}
          value={minute}
          onChange={(e) => setMinute(Number(e.target.value))}
          aria-label="Avancer dans la séance, de la minute 1 à la minute 40"
          className="w-full h-2.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--carte)] [&::-webkit-slider-thumb]:border-[5px] [&::-webkit-slider-thumb]:border-[var(--accent)] [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--carte)] [&::-moz-range-thumb]:border-[5px] [&::-moz-range-thumb]:border-[var(--accent)]"
          style={{ background: `linear-gradient(90deg, var(--accent) ${rempli}%, var(--trait) ${rempli}%)` }}
        />
      </label>

      <div aria-live="polite" className="min-h-[7.5rem] space-y-1.5">
        <p className="font-[family-name:var(--titres)] text-2xl sm:text-3xl font-medium leading-tight">{etape.titre}</p>
        <p className="leading-relaxed text-[var(--doux)]">{etape.texte}</p>
      </div>
    </div>
  );
}
