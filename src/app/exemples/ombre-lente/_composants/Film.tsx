"use client";

import { useEffect, useRef, useState } from "react";
import { ESSENCES, PLANTATION, hauteur, metres } from "./donnees";

/** Un arbre dessiné à une année donnée (vignette du film). */
function Vignette({ k, couleur }: { k: number; couleur: string }) {
  const h = hauteur(ESSENCES[0], k);
  const t = 14 + h * 6.5, r = h * 3;
  return (
    <svg viewBox="0 0 120 120" className="block h-auto w-full" aria-hidden="true">
      <rect width="120" height="120" fill="#EAF0E2" />
      <rect y="100" width="120" height="20" fill="#B9C79A" />
      <rect x={59 - h * 0.3} y={100 - t * 0.55} width={Math.max(2, h * 0.6)} height={t * 0.55} fill="#6B4E36" />
      {k > 0 && <circle cx="60" cy={100 - t * 0.78} r={r} fill={couleur} />}
      {k > 0 && <circle cx={60 - r * 0.5} cy={100 - t * 0.62} r={r * 0.7} fill={couleur} />}
      {k > 0 && <circle cx={60 + r * 0.5} cy={100 - t * 0.64} r={r * 0.7} fill={couleur} />}
    </svg>
  );
}

/**
 * « Dans vingt ans, ça fait un film » : une photo par an, au même endroit, chaque
 * 25 novembre. Ici, des dessins à la place des photos, et un bouton qui les fait défiler.
 */
export default function Film() {
  const [image, setImage] = useState(0);
  const [joue, setJoue] = useState(false);
  const minuteur = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearInterval(minuteur.current), []);
  const jouer = () => {
    window.clearInterval(minuteur.current);
    setImage(0);
    setJoue(true);
    let k = 0;
    minuteur.current = window.setInterval(() => {
      k += 1;
      setImage(k);
      if (k >= 20) {
        window.clearInterval(minuteur.current);
        setJoue(false);
      }
    }, 250);
  };
  return (
    <div className="space-y-5" data-film="film">
      <div className="relative mx-auto max-w-md overflow-hidden rounded-[2rem] border-[10px] border-[var(--sombre)] bg-[#EAF0E2] shadow-[0_40px_80px_-40px_rgba(22,41,31,0.7)]">
        <Vignette k={image} couleur={ESSENCES[0].feuillage} />
        <p className="absolute left-4 top-3 font-[family-name:var(--titres)] text-[44px] leading-none text-[var(--encre)] tabular-nums">{PLANTATION + image}</p>
        <p className="absolute right-4 top-4 rounded-full bg-[var(--carte)] px-3 py-1 text-[13px] font-semibold tabular-nums">{metres(hauteur(ESSENCES[0], image))}</p>
        <p className="absolute bottom-3 left-4 rounded-full bg-[var(--carte)] px-3 py-1 text-[12px] font-semibold">25 novembre</p>
      </div>
      <div className="mx-auto flex max-w-md flex-wrap items-center gap-3">
        <button type="button" onClick={jouer} disabled={joue} className="rounded-full bg-[#D9A441] px-6 py-3 font-semibold text-[#16291F] disabled:opacity-80" data-film="jouer">
          {joue ? "Lecture…" : "▶ 20 ans en 5 secondes"}
        </button>
        <span className="text-[13px] text-[var(--doux)]">Dessins d&apos;exemple : les vraies images seront les vôtres.</span>
      </div>
      <ol className="mx-auto grid max-w-md grid-cols-7 gap-1.5" aria-label="Une image par an">
        {Array.from({ length: 21 }, (_, k) => (
          <li key={k}>
            <button type="button" onClick={() => setImage(k)} aria-label={`Année ${PLANTATION + k}`} className={`block w-full overflow-hidden rounded-md border-2 ${k === image ? "border-[#D9A441]" : "border-transparent"}`}>
              <Vignette k={k} couleur={ESSENCES[0].feuillage} />
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
