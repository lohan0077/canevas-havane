"use client";

import { useState } from "react";

// La piscine qui rentre, selon la surface du jardin. Prix d'exemple, pose comprise.
// Espaces insécables dans les dimensions et les prix : « 8 × 4 » ne se coupe pas.
const TAILLES = [
  { jusqua: 89, coque: "5\u00A0×\u00A02,5", longueur: 5, largeur: 2.5, prix: "17\u202F000 – 23\u202F000\u00A0€" },
  { jusqua: 119, coque: "6\u00A0×\u00A03", longueur: 6, largeur: 3, prix: "20\u202F000 – 27\u202F000\u00A0€" },
  { jusqua: 159, coque: "7\u00A0×\u00A03,5", longueur: 7, largeur: 3.5, prix: "23\u202F000 – 31\u202F000\u00A0€" },
  { jusqua: 200, coque: "8\u00A0×\u00A04", longueur: 8, largeur: 4, prix: "25\u202F000 – 34\u202F000\u00A0€" },
];
const MIN = 60;
const MAX = 200;

// Le plan est dessiné à l'échelle : 16 pixels du dessin par mètre, un jardin de
// proportions 1,6 : 1, centré dans un cadre de 320 × 200.
const PX_PAR_METRE = 16;

export default function Jardin() {
  const [surface, setSurface] = useState(80);
  const taille = TAILLES.find((t) => surface <= t.jusqua) ?? TAILLES[TAILLES.length - 1];

  const largeurJardin = Math.sqrt(surface * 1.6) * PX_PAR_METRE;
  const hauteurJardin = (surface / Math.sqrt(surface * 1.6)) * PX_PAR_METRE;
  const xJardin = (320 - largeurJardin) / 2;
  const yJardin = (200 - hauteurJardin) / 2;
  const largeurBassin = taille.longueur * PX_PAR_METRE;
  const hauteurBassin = taille.largeur * PX_PAR_METRE;
  const remplissage = ((surface - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="rounded-[28px] bg-white shadow-[0_24px_60px_-30px_rgba(15,52,66,0.45)] overflow-hidden">
      <svg viewBox="0 0 320 200" role="img" aria-label={`Jardin de ${surface} m² avec une piscine coque ${taille.coque}`} className="w-full h-auto bg-[#E9F3EC]">
        <defs>
          <pattern id="pelouse" width="24" height="24" patternUnits="userSpaceOnUse">
            <rect width="12" height="24" fill="#86BC6B" />
            <rect x="12" width="12" height="24" fill="#7DB262" />
          </pattern>
          <linearGradient id="bassin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6FD3E8" />
            <stop offset="1" stopColor="#1F8FB3" />
          </linearGradient>
        </defs>
        <rect x={xJardin} y={yJardin} width={largeurJardin} height={hauteurJardin} rx="10" fill="url(#pelouse)" stroke="#5E8F48" strokeWidth="2" />
        <rect
          x={160 - largeurBassin / 2}
          y={100 - hauteurBassin / 2 + 4}
          width={largeurBassin}
          height={hauteurBassin}
          rx="7"
          fill="url(#bassin)"
          stroke="#FFFFFF"
          strokeWidth="4"
        />
        <text x="160" y={100 + 9} textAnchor="middle" fontSize="13" fontWeight="800" fill="#0F3442">
          {taille.coque}{"\u00A0"}m
        </text>
        <text x={xJardin + 8} y={yJardin + 16} fontSize="10" fontWeight="700" fill="#0F3442">
          {surface} m²
        </text>
      </svg>

      <div className="p-6 sm:p-8 space-y-6">
        <label className="block space-y-3">
          <span className="flex items-baseline justify-between text-[#0F3442]">
            <span className="text-sm font-bold uppercase tracking-[0.14em]">Surface du jardin</span>
            <span className="text-2xl font-extrabold tabular-nums">{surface} m²</span>
          </span>
          <input
            type="range"
            min={MIN}
            max={MAX}
            step={5}
            value={surface}
            onChange={(e) => setSurface(Number(e.target.value))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[5px] [&::-webkit-slider-thumb]:border-[#C4471D] [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-[5px] [&::-moz-range-thumb]:border-[#C4471D]"
            style={{ background: `linear-gradient(90deg, #C4471D ${remplissage}%, #D6E7EC ${remplissage}%)` }}
          />
        </label>

        <div className="rounded-2xl bg-[#0F3442] text-white p-5 sm:p-6 space-y-2">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9FD8E8]">La piscine qui rentre</p>
          <p className="text-2xl sm:text-3xl font-[family-name:var(--pp-titres)] font-semibold">Coque {taille.coque}{"\u00A0"}m</p>
          <p className="text-lg font-bold tabular-nums">{taille.prix} TTC</p>
          <p className="text-sm text-[#D7E6EA]">Pose comprise · prix d&apos;exemple</p>
        </div>

        <p className="text-sm leading-relaxed text-[#4A6470]">
          Ce qui fait bouger le prix : l&apos;accès au terrain pour la grue, la nature du
          sol, et la plage autour du bassin. On le vérifie à la visite technique, avant
          tout devis.
        </p>
      </div>
    </div>
  );
}
