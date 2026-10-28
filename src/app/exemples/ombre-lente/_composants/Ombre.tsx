"use client";

import { useState } from "react";
import { ESSENCES, PLANTATION, hauteur, metres } from "./donnees";

// Échelle du dessin : 18 px par mètre au sol, 14 px par mètre en hauteur.
const SOL = 236, ARBRE_X = 104, PX_SOL = 18, PX_HAUT = 14, TERRASSE_LARGEUR = 4;
// Vers 18 h en juillet (16 h au soleil), l'ombre porte à environ 1,35 fois la hauteur.
const PORTEE = 1.35;
const DISTANCES = [5, 7, 9];

/** Où tombe l'ombre de la couronne vers 18 h en juillet, en mètres depuis le tronc. */
function ombre(h: number, port: number) {
  const r = (port * h) / 2;
  return { debut: Math.max(0, PORTEE * (0.65 * h - r)), fin: PORTEE * (0.65 * h + r) };
}

/**
 * « Glisse les années », comme une application : l'arbre grandit de 2026 à 2046, et son
 * ombre de fin d'après-midi avance jusqu'à la terrasse. Simulation d'exemple, calculée
 * dans le navigateur : croissance moyenne en bon sol, soleil de juillet vers 18 h.
 */
export default function Ombre() {
  const [slug, setSlug] = useState("tilleul");
  const [annee, setAnnee] = useState(PLANTATION);
  const [distance, setDistance] = useState(7);
  const e = ESSENCES.find((x) => x.slug === slug) ?? ESSENCES[0];
  const n = annee - PLANTATION;
  const h = hauteur(e, n);
  const o = ombre(h, e.port);
  const couvert = Math.max(0, Math.min(1, (o.fin - distance) / TERRASSE_LARGEUR));
  const premiere = Array.from({ length: 21 }, (_, k) => k).find((k) => ombre(hauteur(e, k), e.port).fin > distance + 0.4);

  const hPx = h * PX_HAUT, rPx = (e.port * h * PX_HAUT) / 2;
  const terrasseX = ARBRE_X + distance * PX_SOL;
  const ombreX = ARBRE_X + o.debut * PX_SOL, ombreL = (o.fin - o.debut) * PX_SOL;
  const pente = Math.round(((annee - PLANTATION) / 20) * 100);

  const phrase =
    couvert >= 0.95 ? "Toute ta terrasse est à l'ombre. Tu déjeunes dessous."
      : couvert > 0.05 ? `Son ombre couvre ${couvert > 0.6 ? "presque toute" : couvert > 0.35 ? "la moitié de" : "le bord de"} ta terrasse.`
        : "Son ombre n'atteint pas encore ta terrasse.";

  return (
    <div className="overflow-hidden rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] shadow-[0_50px_100px_-50px_rgba(22,41,31,0.6)]" data-film="ombre">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--trait)] bg-[var(--fond)] px-5 py-3 sm:px-7">
        <div className="flex flex-wrap gap-2" role="group" aria-label="L'essence">
          {ESSENCES.map((x) => (
            <button
              key={x.slug}
              type="button"
              aria-pressed={x.slug === slug}
              onClick={() => setSlug(x.slug)}
              className={`rounded-full border px-3.5 py-2 text-[13px] font-semibold transition-colors ${x.slug === slug ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}
            >
              {x.nom.split(" ")[0]}
            </button>
          ))}
        </div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--doux)]">Vers 18 h, en juillet</p>
      </div>

      <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-5 p-5 sm:p-7">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-[#EAF0E2]">
            <div className="absolute left-5 top-4 z-10">
              <p className="font-[family-name:var(--titres)] text-[56px] leading-none tabular-nums text-[var(--encre)]" data-film="annee">{annee}</p>
              <p className="text-[13px] font-semibold text-[#3A4D3C]">{n === 0 ? "La plantation" : `${n} an${n > 1 ? "s" : ""} après`}</p>
            </div>
            <div className="absolute right-5 top-5 z-10 text-right">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#3A4D3C]">Hauteur</p>
              <p className="text-2xl font-bold tabular-nums text-[var(--encre)]">{metres(h)}</p>
              <p className="text-[12px] text-[#3A4D3C]">exemple</p>
            </div>
            <svg viewBox="0 0 360 290" className="block h-auto w-full" aria-hidden="true">
              <defs>
                <linearGradient id="ol-ciel" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#F3E9CF" />
                  <stop offset="1" stopColor="#EAF0E2" />
                </linearGradient>
              </defs>
              <rect width="360" height="290" fill="url(#ol-ciel)" />
              <circle cx="190" cy="40" r="13" fill="#E7B95A" opacity="0.8" />
              <rect x="0" y={SOL} width="360" height={290 - SOL} fill="#B9C79A" />
              <rect x="336" y="150" width="24" height={SOL - 150} fill="#E5D9C2" />
              <rect x="342" y="170" width="12" height="20" fill="#9FB3A6" />
              <rect x={terrasseX} y={SOL} width={TERRASSE_LARGEUR * PX_SOL} height="14" fill="#D8C29A" />
              <g transform={`translate(${terrasseX + 40} ${SOL})`}>
                <rect x="-14" y="-16" width="28" height="3" fill="#7A6247" />
                <rect x="-2" y="-13" width="3" height="13" fill="#7A6247" />
                <rect x="-24" y="-10" width="6" height="10" fill="#7A6247" opacity="0.8" />
                <rect x="18" y="-10" width="6" height="10" fill="#7A6247" opacity="0.8" />
              </g>
              <ellipse cx={ombreX + ombreL / 2} cy={SOL + 8} rx={Math.max(4, ombreL / 2)} ry={4 + rPx * 0.12} fill="#1F3A2B" opacity={0.18 + 0.22 * Math.min(1, n / 12)} />
              <rect x={ARBRE_X} y={SOL + 6} width={Math.max(0, ombreX - ARBRE_X + 4)} height="3" fill="#1F3A2B" opacity="0.2" />
              <rect x={ARBRE_X - Math.max(1.5, h * 0.35)} y={SOL - hPx * 0.55} width={Math.max(3, h * 0.7)} height={hPx * 0.55} fill="#6B4E36" />
              {n > 0 && (
                <>
                  <circle cx={ARBRE_X - rPx * 0.35} cy={SOL - hPx * 0.62} r={rPx * 0.72} fill={e.feuillage} />
                  <circle cx={ARBRE_X + rPx * 0.38} cy={SOL - hPx * 0.66} r={rPx * 0.7} fill={e.feuillage} />
                  <circle cx={ARBRE_X} cy={SOL - hPx * 0.8} r={rPx * 0.78} fill={e.feuillage} />
                </>
              )}
              {n === 0 && <path d={`M${ARBRE_X} ${SOL - hPx} l -5 6 M${ARBRE_X} ${SOL - hPx * 0.8} l 6 5`} stroke="#6B4E36" strokeWidth="1.5" />}
              {n < 4 && <rect x={ARBRE_X + 5} y={SOL - 30} width="2.5" height="30" fill="#C9A86A" />}
            </svg>
          </div>

          <label className="block space-y-3">
            <span className="flex items-baseline justify-between text-[14px] font-semibold">
              <span>Glisse les années</span>
              <span className="tabular-nums text-[var(--doux)]">{PLANTATION} → {PLANTATION + 20}</span>
            </span>
            <input
              type="range"
              min={PLANTATION}
              max={PLANTATION + 20}
              step={1}
              value={annee}
              data-film="annees"
              aria-label="Année"
              onChange={(ev) => setAnnee(Number(ev.target.value))}
              className="h-3 w-full cursor-pointer appearance-none rounded-full [&::-webkit-slider-thumb]:h-9 [&::-webkit-slider-thumb]:w-9 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[6px] [&::-webkit-slider-thumb]:border-[#16291F] [&::-webkit-slider-thumb]:bg-[#D9A441] [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[6px] [&::-moz-range-thumb]:border-[#16291F] [&::-moz-range-thumb]:bg-[#D9A441]"
              style={{ background: `linear-gradient(90deg, #16291F ${pente}%, var(--trait) ${pente}%)` }}
            />
          </label>
        </div>

        <div className="flex flex-col justify-between gap-5 border-t border-[var(--trait)] p-5 sm:p-7 lg:border-l lg:border-t-0">
          <div aria-live="polite" className="space-y-2 rounded-[1.5rem] bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]" data-film="verdict">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#D9A441]">{e.nom}</p>
            <p className="font-[family-name:var(--titres)] text-[30px] leading-tight">{phrase}</p>
            <p className="text-[15px] text-[#C9D3B8]">
              {premiere !== undefined ? `Première ombre sur la terrasse : été ${PLANTATION + premiere}.` : "À cette distance, son ombre n'atteint pas la terrasse en vingt ans."}{" "}
              Simulation d&apos;exemple, en bon sol.
            </p>
          </div>
          <div className="space-y-3">
            <span className="block text-[14px] font-semibold">Ta terrasse est à</span>
            <div className="inline-flex rounded-full border border-[var(--trait)] bg-[var(--fond)] p-1" role="group" aria-label="Distance de la terrasse">
              {DISTANCES.map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={d === distance}
                  onClick={() => setDistance(d)}
                  className={`rounded-full px-4 py-2 text-[14px] font-semibold ${d === distance ? "bg-[var(--encre)] text-[var(--fond)]" : ""}`}
                >
                  {d} m
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
