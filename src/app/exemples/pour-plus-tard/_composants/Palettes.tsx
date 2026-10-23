"use client";

import { useState } from "react";
import { PALETTES } from "./donnees";

// Une famille de quatre, dessinée : taille, couleur du haut, couleur du bas.
// Des silhouettes, jamais des visages.
const FAMILLE = [
  { qui: "Toi", x: 34, h: 1, haut: 0, bas: 2 },
  { qui: "L'autre parent", x: 104, h: 1.06, haut: 2, bas: 1 },
  { qui: "La grande", x: 168, h: 0.74, haut: 1, bas: 2 },
  { qui: "Le petit", x: 220, h: 0.58, haut: 0, bas: 1 },
];

/**
 * « Trois couleurs qui vont ensemble » : on choisit une palette, la famille dessinée
 * s'habille avec. Rien n'est envoyé : c'est une aide, pas une commande.
 */
export default function Palettes() {
  const [choix, setChoix] = useState(PALETTES[1].id);
  const palette = PALETTES.find((p) => p.id === choix) ?? PALETTES[0];

  return (
    <div id="palettes" data-film="palettes" className="scroll-mt-24 rounded-[6px] border border-[var(--trait)] bg-[var(--carte)] p-5 shadow-[0_30px_70px_-45px_rgba(42,33,29,0.7)] sm:p-8 space-y-6">
      <div role="radiogroup" aria-label="Choisir une palette de trois couleurs" className="grid grid-cols-2 gap-2.5">
        {PALETTES.map((p) => {
          const actif = p.id === choix;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={actif}
              data-palette={p.id}
              onClick={() => setChoix(p.id)}
              className={`flex items-center gap-3 rounded-[4px] border-2 px-3 py-3 text-left font-semibold transition-all duration-300 ${
                actif ? "-translate-y-0.5 border-[var(--encre)] bg-[var(--fond)] shadow-[0_6px_0_var(--accent)]" : "border-[var(--trait)] bg-[var(--carte)]"
              }`}
            >
              <span aria-hidden="true" className="flex -space-x-1.5">
                {p.couleurs.map((c) => (
                  <span key={c} className="h-6 w-6 rounded-full border-2 border-[var(--carte)]" style={{ background: c }} />
                ))}
              </span>
              {p.nom}
            </button>
          );
        })}
      </div>

      <svg viewBox="0 0 260 170" role="img" aria-label={`Une famille de quatre habillée en ${palette.noms.join(", ")}`} className="w-full h-auto">
        <rect x="0" y="150" width="260" height="20" fill="var(--trait)" />
        {FAMILLE.map((f) => {
          const H = 140 * f.h;
          const sol = 152;
          const tete = 11 * Math.max(f.h, 0.8);
          const torse = H * 0.36;
          const jambes = H * 0.42;
          const larg = 30 * Math.max(f.h, 0.75);
          const yTorse = sol - jambes - torse;
          return (
            <g key={f.qui}>
              <rect x={f.x - larg / 2 + 4} y={sol - jambes} width={larg - 8} height={jambes} rx="5" fill={palette.couleurs[f.bas]} stroke="#3a312b" strokeWidth="1.2" />
              <rect x={f.x - larg / 2} y={yTorse} width={larg} height={torse + 4} rx="9" fill={palette.couleurs[f.haut]} stroke="#3a312b" strokeWidth="1.2" />
              <circle cx={f.x} cy={yTorse - tete - 3} r={tete} fill="#cfa98a" stroke="#3a312b" strokeWidth="1.2" />
            </g>
          );
        })}
      </svg>

      <div aria-live="polite" className="space-y-2">
        <p className="font-[family-name:var(--titres)] text-[1.8rem] font-medium leading-tight">
          {palette.nom} : {palette.noms.join(", ")}.
        </p>
        <p className="leading-relaxed text-[var(--doux)]">{palette.idee}</p>
      </div>
    </div>
  );
}
