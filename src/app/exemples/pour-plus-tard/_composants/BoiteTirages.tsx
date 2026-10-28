"use client";

import { useState } from "react";
import { FORMULE } from "./donnees";

// Cinq tirages dessinés (ciel, colline, mer) : des paysages, jamais des visages.
const TIRAGES = [
  "radial-gradient(circle at 70% 28%, #f3e2c0 0 9%, transparent 10%), linear-gradient(#d8c3a0 0 52%, #9c8262 52% 74%, #6c5741 74%)",
  "linear-gradient(#cdb994 0 40%, #b19570 40% 58%, #8a7154 58% 80%, #5e4b39 80%)",
  "radial-gradient(ellipse at 30% 100%, #6c5741 0 38%, transparent 39%), linear-gradient(#e2d2b2 0 60%, #a48a68 60%)",
  "linear-gradient(170deg, #d6c09b 0 45%, #8f7556 45% 47%, #c4ab85 47% 70%, #7a6249 70%)",
  "radial-gradient(circle at 35% 35%, #efdcb8 0 7%, transparent 8%), linear-gradient(#bfa883 0 48%, #7d6650 48%)",
];

/**
 * La formule unique, en vrai : une boîte de vingt tirages. On l'ouvre, les tirages
 * sortent en éventail, le prix se pose dessous. `etiquette` : le nom écrit sur la
 * boîte (la page « La boîte » le fait choisir). Rien ne quitte le navigateur.
 */
export default function BoiteTirages({ etiquette = "Famille M.", date = "séance du 14 mars" }: { etiquette?: string; date?: string }) {
  const [ouverte, setOuverte] = useState(false);

  return (
    <div className="space-y-6">
      <div className="relative mx-auto h-[330px] w-full max-w-[360px]" aria-hidden="true">
        {/* Les annotations du catalogue, quand la boîte est fermée. */}
        <div className={`absolute inset-x-0 top-2 flex justify-between text-[10px] font-bold uppercase tracking-[0.16em] leading-snug transition-opacity duration-300 ${ouverte ? "opacity-0" : "opacity-100"}`}>
          <p className="w-[44%]">Fig. 3a<br />20 tirages 13 × 18<br />papier mat</p>
          <p className="w-[44%] text-right">Fig. 3b<br />Boîte toilée<br />à ton nom</p>
        </div>
        <span className={`absolute left-[18%] top-[64px] h-[92px] w-px bg-[var(--encre)] transition-opacity duration-300 ${ouverte ? "opacity-0" : "opacity-100"}`} />
        <span className={`absolute right-[18%] top-[64px] h-[92px] w-px bg-[var(--encre)] transition-opacity duration-300 ${ouverte ? "opacity-0" : "opacity-100"}`} />
        {TIRAGES.map((fond, k) => {
          const d = k - 2;
          const transform = ouverte
            ? `translate(calc(-50% + ${d * 62}px), ${-168 + Math.abs(d) * 26}px) rotate(${d * 12}deg)`
            : `translate(-50%, ${-6 - k * 3}px) rotate(${d * 1.5}deg)`;
          return (
            <div
              key={k}
              className="absolute left-1/2 bottom-[46px] w-[112px] h-[140px] bg-[#FBF7EF] p-[7px] pb-[18px] shadow-[0_10px_24px_-12px_rgba(59,47,42,.6)] transition-transform duration-700 ease-[cubic-bezier(.2,.9,.25,1.15)]"
              style={{ transform, transitionDelay: ouverte ? `${k * 70}ms` : "0ms" }}
            >
              <div className="h-full w-full" style={{ background: fond }} />
            </div>
          );
        })}
        {/* Le couvercle, qui se soulève. */}
        <div
          className="absolute left-1/2 bottom-[150px] z-10 h-[26px] w-[284px] rounded-[3px] bg-[#B38F69] border border-[#8f6f4f] transition-all duration-500"
          style={{ transform: ouverte ? "translate(-30%, -150px) rotate(-14deg)" : "translate(-50%, 0)", opacity: ouverte ? 0 : 1 }}
        />
        {/* La boîte, devant les tirages. */}
        <div className="absolute left-1/2 bottom-0 z-20 h-[150px] w-[276px] -translate-x-1/2 rounded-[3px] bg-[#C9A27E] border border-[#a78461] shadow-[0_24px_40px_-24px_rgba(59,47,42,.8)] [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,.05)_0_2px,transparent_2px_6px)]">
          <div className="absolute left-1/2 top-1/2 w-[188px] -translate-x-1/2 -translate-y-1/2 bg-[#FBF7EF] px-4 py-3 text-center text-[#3B2F2A] border border-[#a78461]">
            <p className="font-[family-name:var(--titres)] italic text-xl leading-tight">Pour Plus Tard</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em] leading-snug">{etiquette}<br />20 tirages · {date}</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        data-film="ouvrir"
        onClick={() => setOuverte((o) => !o)}
        aria-pressed={ouverte}
        className="mx-auto flex min-h-[52px] items-center justify-center rounded-[3px] bg-[var(--accent)] px-7 text-base font-semibold text-[var(--sur-accent)] transition-transform hover:-translate-y-0.5"
      >
        {ouverte ? "Refermer la boîte" : "Ouvrir la boîte"}
      </button>

      <div data-film="prix-boite" className="border-t border-[var(--encre)] pt-5 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em]">{FORMULE.nom}</p>
        <p className="mt-1 font-[family-name:var(--titres)] text-6xl [font-variant-numeric:lining-nums]">
          {FORMULE.prix} <span className="text-xl align-middle">TTC</span>
        </p>
        <p className="mt-1 text-sm text-[var(--doux)]">Prix d&apos;exemple · livrée chez toi</p>
        <p role="status" className="sr-only">{ouverte ? "La boîte est ouverte : vingt tirages en sortent." : ""}</p>
      </div>
    </div>
  );
}
