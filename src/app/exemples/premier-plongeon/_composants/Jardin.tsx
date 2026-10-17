"use client";

import { useState, type CSSProperties } from "react";
import { Plaque, styles as s } from "./Habillage";

// La piscine qui rentre, selon la surface du jardin. Prix d'exemple, pose comprise.
// Espaces insécables dans les dimensions et les prix : « 8 × 4 » ne se coupe pas.
const TAILLES = [
  { jusqua: 89, coque: "5 × 2,5", longueur: 5, largeur: 2.5, prix: "17 000 – 23 000 €" },
  { jusqua: 119, coque: "6 × 3", longueur: 6, largeur: 3, prix: "20 000 – 27 000 €" },
  { jusqua: 159, coque: "7 × 3,5", longueur: 7, largeur: 3.5, prix: "23 000 – 31 000 €" },
  { jusqua: 200, coque: "8 × 4", longueur: 8, largeur: 4, prix: "25 000 – 34 000 €" },
];
const MIN = 60;
const MAX = 200;

// Le plan est dessiné à l'échelle : 16 pixels du dessin par mètre, un jardin de
// proportions 1,6 : 1, centré dans un cadre de 320 × 200 — comme un plan de masse.
const PX_PAR_METRE = 16;

const metres = (m: number) => m.toLocaleString("fr-FR", { maximumFractionDigits: 1 });

export default function Jardin() {
  const [surface, setSurface] = useState(80);
  const taille = TAILLES.find((t) => surface <= t.jusqua) ?? TAILLES[TAILLES.length - 1];

  const longueurJardin = Math.sqrt(surface * 1.6);
  const largeurJardin = longueurJardin * PX_PAR_METRE;
  const hauteurJardin = (surface / longueurJardin) * PX_PAR_METRE;
  const xJardin = (320 - largeurJardin) / 2;
  const yJardin = (196 - hauteurJardin) / 2;
  const largeurBassin = taille.longueur * PX_PAR_METRE;
  const hauteurBassin = taille.largeur * PX_PAR_METRE;
  const remplissage = ((surface - MIN) / (MAX - MIN)) * 100;
  const cote = yJardin + hauteurJardin + 12;

  return (
    <Plaque coupe={22}>
      <div className={`${s.quadrillage} px-4 pt-5 pb-2`}>
        <svg
          viewBox="0 0 320 210"
          role="img"
          aria-label={`Plan d'un jardin de ${surface} m² avec une piscine coque ${taille.coque}`}
          className="w-full h-auto"
          style={{ fontFamily: "var(--pp-libelles), sans-serif" }}
        >
          <defs>
            <pattern id="pp-pelouse" width="10" height="10" patternUnits="userSpaceOnUse">
              <rect width="5" height="10" fill="#1E3B2C" />
              <rect x="5" width="5" height="10" fill="#1A3427" />
            </pattern>
            <linearGradient id="pp-bassin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7EDBEE" />
              <stop offset="1" stopColor="#2797BA" />
            </linearGradient>
          </defs>
          <rect x={xJardin} y={yJardin} width={largeurJardin} height={hauteurJardin} fill="url(#pp-pelouse)" stroke="#5E9A70" strokeWidth="1" />
          <rect
            x={160 - largeurBassin / 2}
            y={yJardin + hauteurJardin / 2 - hauteurBassin / 2}
            width={largeurBassin}
            height={hauteurBassin}
            fill="url(#pp-bassin)"
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
          <text x="160" y={yJardin + hauteurJardin / 2 + 4.5} textAnchor="middle" fontSize="12" fontWeight="700" fill="#04131A">
            {taille.coque}{" "}M
          </text>
          <text x={xJardin + 7} y={yJardin + 14} fontSize="9" fontWeight="700" fill="#E6EAF5" letterSpacing="1">
            {surface}{" "}M²
          </text>
          {/* Cote du jardin, à la manière d'un plan */}
          <g stroke="#8F98A8" strokeWidth="0.8">
            <path d={`M${xJardin} ${cote} H${xJardin + largeurJardin}`} />
            <path d={`M${xJardin} ${cote - 4} v8 M${xJardin + largeurJardin} ${cote - 4} v8`} />
          </g>
          <rect x="136" y={cote - 6} width="48" height="12" fill="#070B13" />
          <text x="160" y={cote + 3} textAnchor="middle" fontSize="8" fontWeight="700" fill="#B9C0CC" letterSpacing="1">
            {metres(longueurJardin)}{" "}M
          </text>
        </svg>
      </div>

      <div className="p-6 sm:p-8 space-y-7">
        <label className="block space-y-4">
          <span className="flex items-baseline justify-between gap-4">
            <span className={`${s.technique} text-xs text-[#e8d1cb]`}>Surface du jardin</span>
            <span className="text-2xl font-bold tabular-nums text-white">{surface}{" "}m²</span>
          </span>
          <input
            type="range"
            min={MIN}
            max={MAX}
            step={5}
            value={surface}
            onChange={(e) => setSurface(Number(e.target.value))}
            className={s.curseur}
            style={{ "--rempli": `${remplissage}%` } as CSSProperties}
          />
        </label>

        <Plaque fond="#0e1522" coupe={14}>
          <div className="p-5 sm:p-6 space-y-2">
            <p className={`${s.technique} text-xs text-[#e8d1cb]`}>La piscine qui rentre</p>
            <p className={`${s.titre} text-[26px] sm:text-3xl`}>Coque {taille.coque}{" "}m</p>
            <p className="text-lg font-bold tabular-nums text-[#7edbee]">{taille.prix} TTC</p>
            <p className={`${s.technique} text-[11px] text-[#8f98a8]`}>Pose comprise · prix d&apos;exemple</p>
          </div>
        </Plaque>

        <p className="text-sm leading-relaxed text-[#8f98a8]">
          Ce qui fait bouger le prix : l&apos;accès au terrain pour la grue, la nature du
          sol, et la plage autour du bassin. On le vérifie à la visite technique, avant
          tout devis.
        </p>
      </div>
    </Plaque>
  );
}
