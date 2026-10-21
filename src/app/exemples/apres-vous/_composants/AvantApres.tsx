"use client";

import { useState } from "react";

/** Un bureau, dessiné : désordonné ou rangé. Aucun document, aucun écran allumé, aucun nom. */
function Bureau({ sale }: { sale: boolean }) {
  return (
    <svg viewBox="0 0 360 240" className="h-full w-full" aria-hidden="true">
      <rect width="360" height="240" fill={sale ? "#0F1729" : "#16223D"} />
      <rect x="250" y="26" width="80" height="96" rx="4" fill={sale ? "#1B2A4A" : "#22335A"} />
      <rect x="256" y="32" width="68" height="84" fill={sale ? "#273B63" : "#2F4675"} />
      <rect x="40" y="150" width="280" height="12" rx="3" fill="#C9A57B" />
      <rect x="58" y="162" width="10" height="60" fill="#8C7356" />
      <rect x="292" y="162" width="10" height="60" fill="#8C7356" />
      <rect x="150" y="100" width="70" height="48" rx="4" fill="#0B1222" />
      <rect x="180" y="148" width="10" height="4" fill="#0B1222" />
      {sale ? (
        <g>
          <circle cx="92" cy="140" r="9" fill="#E8E2D4" /><rect x="84" y="128" width="16" height="12" rx="2" fill="#E8E2D4" />
          <circle cx="250" cy="142" r="7" fill="#E8E2D4" />
          <circle cx="118" cy="146" r="5" fill="#F5F1E8" /><circle cx="128" cy="144" r="4" fill="#F5F1E8" /><circle cx="236" cy="146" r="5" fill="#F5F1E8" />
          <path d="M60 222 l14 -8 l10 8 z" fill="#E8E2D4" opacity=".7" />
          <circle cx="270" cy="226" r="6" fill="#E8E2D4" opacity=".7" />
          <rect x="300" y="196" width="22" height="26" rx="3" fill="#2E3D5E" /><path d="M298 196 h26 l-4 -10 h-18 z" fill="#E8E2D4" />
        </g>
      ) : (
        <g>
          <path d="M90 148 q-6 -26 8 -40 q4 18 -2 40 z" fill="#6FB7A8" /><rect x="84" y="138" width="16" height="12" rx="2" fill="#E9B44C" />
          <rect x="300" y="196" width="22" height="26" rx="3" fill="#2E3D5E" />
        </g>
      )}
    </svg>
  );
}

/**
 * La série « Un bureau, la nuit » : du sale au propre, à glisser du doigt. Le volet
 * suit le curseur.
 */
export default function AvantApres() {
  const [p, setP] = useState(15);
  return (
    <div data-film="avant-apres" className="space-y-4">
      <div className="relative aspect-[3/2] overflow-hidden rounded-[24px] border border-[var(--trait)]">
        <div className="absolute inset-0"><Bureau sale /></div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - p}% 0 0)` }}><Bureau sale={false} /></div>
        <div aria-hidden="true" className="absolute inset-y-0 w-1 -translate-x-1/2 bg-[var(--accent)]" style={{ left: `${p}%` }} />
        <p className="absolute left-3 top-3 rounded-full bg-[var(--sombre)] px-3 py-1 text-xs font-semibold tabular-nums">21:32 · après</p>
        <p className="absolute right-3 top-3 rounded-full bg-[var(--sombre)] px-3 py-1 text-xs font-semibold tabular-nums">21:02 · avant</p>
      </div>
      <label className="block space-y-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--doux)]">Glissez : du sale au propre</span>
        <input
          id="volet"
          type="range"
          min={0}
          max={100}
          value={p}
          onChange={(e) => setP(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[var(--trait)] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--accent)]"
        />
      </label>
    </div>
  );
}
