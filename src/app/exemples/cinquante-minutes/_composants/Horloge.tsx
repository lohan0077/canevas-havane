"use client";

import { useState } from "react";
import { etapes } from "./donnees";

const R = 104;
const TOUR = 2 * Math.PI * R;

/**
 * L'horloge de cinquante minutes : on fait glisser le temps, le cadran se remplit, et
 * la première séance se raconte, étape par étape. Un déroulé, pas un résultat. Tout se
 * passe dans le navigateur.
 */
export default function Horloge({ clair = false }: { clair?: boolean }) {
  const [minute, setMinute] = useState(0);
  const courante = [...etapes].reverse().find((e) => minute >= e.minute) ?? etapes[0];
  const part = minute / 50;
  const encre = clair ? "#F4ECE2" : "#3B2440";
  const piste = clair ? "rgba(244,236,226,0.18)" : "#E2D5C6";

  return (
    <div className={`rounded-[34px] p-5 sm:p-8 space-y-6 ${clair ? "bg-white/[0.06]" : "bg-[var(--carte)] border border-[var(--trait)]"}`} data-film="horloge">
      <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="relative mx-auto h-[236px] w-[236px]">
          <svg viewBox="0 0 240 240" className="h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="120" cy="120" r={R} fill="none" stroke={piste} strokeWidth="10" />
            <circle
              cx="120"
              cy="120"
              r={R}
              fill="none"
              stroke="#C9A27E"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${TOUR * part} ${TOUR}`}
            />
            {Array.from({ length: 10 }, (_, i) => {
              // Arrondi : le serveur et le navigateur doivent écrire exactement la même valeur.
              const a = (i / 10) * 2 * Math.PI;
              const p = (r: number, f: (x: number) => number) => (120 + r * f(a)).toFixed(2);
              return (
                <line key={i} x1={p(88, Math.cos)} y1={p(88, Math.sin)} x2={p(80, Math.cos)} y2={p(80, Math.sin)} stroke={encre} strokeOpacity="0.45" strokeWidth="2" />
              );
            })}
          </svg>
          <div className="absolute inset-0 grid place-content-center text-center">
            <p className="font-[family-name:var(--titres)] text-7xl leading-none tabular-nums [font-variant-numeric:lining-nums]" data-film="minute">{minute}</p>
            <p className={`mt-1 text-sm ${clair ? "text-[#BBAAB8]" : "text-[var(--doux)]"}`}>min sur 50</p>
          </div>
        </div>
        <div className="space-y-3" aria-live="polite">
          <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${clair ? "text-[#C9A27E]" : "text-[var(--accent-texte)]"}`}>
            À {courante.minute} min
          </p>
          <p className="font-[family-name:var(--titres)] text-[32px] sm:text-4xl leading-[1.1] italic" data-film="etape">{courante.texte}</p>
          <p className={`leading-relaxed ${clair ? "text-[#E6D3BF]" : "text-[var(--doux)]"}`}>{courante.detail}</p>
        </div>
      </div>

      <label className="block space-y-2">
        <span className={`text-sm font-semibold ${clair ? "text-[#E6D3BF]" : ""}`}>Faites glisser le temps</span>
        <input
          type="range"
          min={0}
          max={50}
          step={1}
          value={minute}
          onChange={(e) => setMinute(Number(e.target.value))}
          aria-label="Minute de la première séance"
          className="w-full h-2.5 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C9A27E] [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#FBF6EF] [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#C9A27E]"
          style={{ background: `linear-gradient(90deg, #C9A27E ${part * 100}%, ${piste} ${part * 100}%)` }}
        />
      </label>

      <ol className="grid grid-cols-6 gap-1" aria-label="Les étapes">
        {etapes.map((e) => (
          <li key={e.minute}>
            <button
              type="button"
              onClick={() => setMinute(e.minute)}
              aria-pressed={courante.minute === e.minute}
              className={`w-full min-h-11 rounded-full text-sm tabular-nums [font-variant-numeric:lining-nums] transition-colors ${
                courante.minute === e.minute
                  ? "bg-[#C9A27E] text-[#2A1830] font-semibold"
                  : clair ? "text-[#E6D3BF] hover:bg-white/10" : "text-[var(--encre)] hover:bg-[var(--fond)]"
              }`}
            >
              {e.minute}&apos;
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
