"use client";

import { useState } from "react";
import { LOTISSEMENT } from "./donnees";

/** Une maison du lotissement, sur sous-sol, de face : la même pour les trente-six. */
function Petite({ transformee, voit, retard = 0 }: { transformee: boolean; voit: boolean; retard?: number }) {
  const t = { transition: `fill .5s ease ${retard}ms` };
  return (
    <svg viewBox="0 0 40 36" aria-hidden="true" className="block h-auto w-full">
      <rect x="6" y="22" width="28" height="10" fill={transformee ? "#C98F3A" : "#B9AC93"} stroke="#1B1F24" strokeWidth="1.1" />
      <rect x="6" y="11" width="28" height="11" fill="#F1E6CF" stroke="#1B1F24" strokeWidth="1.1" />
      <path d="M3 12L20 3L37 12Z" fill="#B24A2E" stroke="#1B1F24" strokeWidth="1.1" strokeLinejoin="round" />
      <rect x="9.5" y="14" width="6" height="5" fill={voit || transformee ? "#FFE7A3" : "#A9CBD0"} stroke="#1B1F24" strokeWidth="0.7" style={t} />
      <rect x="24.5" y="14" width="6" height="5" fill={voit || transformee ? "#FFE7A3" : "#A9CBD0"} stroke="#1B1F24" strokeWidth="0.7" style={t} />
      {transformee ? (
        <rect x="9" y="24" width="17" height="8" fill="#FFE7A3" stroke="#1B1F24" strokeWidth="0.8" />
      ) : (
        <rect x="10" y="25" width="13" height="7" fill="#D9CDB5" stroke="#1B1F24" strokeWidth="0.7" />
      )}
      <rect x="0" y="32" width="40" height="4" fill="#7C9A6B" />
    </svg>
  );
}

/**
 * Le lotissement des Tilleuls (exemple) : trente-six maisons identiques, sur sous-sol,
 * bâties en 1976 sur le même plan. On transforme le n° 14, et chaque voisin y voit la
 * sienne — de proche en proche, ses fenêtres s'allument. Toucher une maison dit laquelle
 * c'est.
 */
export default function Lotissement() {
  const { maisons, colonnes, transformee, nom, annee } = LOTISSEMENT;
  const [fait, setFait] = useState(false);
  const [choisie, setChoisie] = useState<number | null>(null);
  const cible = transformee - 1;
  const distance = (k: number) => Math.hypot((k % colonnes) - (cible % colonnes), Math.floor(k / colonnes) - Math.floor(cible / colonnes));

  return (
    <div data-film="lotissement" className="space-y-5">
      <div className="overflow-hidden rounded-2xl border-2 border-[var(--encre)] bg-[#D5DAD7]">
        <p className="flex items-baseline justify-between gap-3 border-b-2 border-[var(--encre)] bg-[var(--carte)] px-4 py-3 text-[13px] font-medium uppercase tracking-[0.12em]">
          <span>{nom} · {annee}</span>
          <span>exemple</span>
        </p>
        <ul
          className="grid gap-x-2 gap-y-1 bg-[linear-gradient(transparent_calc(50%-6px),#EEF0EF_calc(50%-6px),#EEF0EF_calc(50%+6px),transparent_calc(50%+6px))] p-3 sm:gap-x-3 sm:p-5"
          style={{ gridTemplateColumns: `repeat(${colonnes}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: maisons }, (_, k) => {
            const n = k + 1;
            const estCible = k === cible;
            const voit = fait && !estCible;
            return (
              <li key={n}>
                <button
                  type="button"
                  onClick={() => setChoisie(n)}
                  aria-label={`Maison n° ${n}`}
                  aria-pressed={choisie === n}
                  className={`block w-full rounded-lg p-0.5 transition-transform duration-700 ${estCible && fait ? "relative z-10 scale-[1.4] bg-[var(--carte)] shadow-[0_10px_24px_-8px_rgba(21,24,28,0.55)]" : ""} ${choisie === n ? "outline outline-2 outline-[var(--accent)]" : ""}`}
                >
                  <Petite transformee={estCible && fait} voit={voit} retard={voit ? 450 + distance(k) * 160 : 0} />
                  <span className="block text-center text-[10px] font-medium leading-tight text-[#1B1F24]">{n}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div role="status" className="min-h-[56px] text-[17px] leading-relaxed">
        {choisie ? (
          <p>
            <strong>Le n° {choisie}</strong> : un pavillon de {annee} sur sous-sol.{" "}
            {choisie === transformee ? "C'est celui qu'on a transformé, avec l'accord de ses propriétaires." : `La même maison que le n° ${transformee}. Voilà ce qu'elle peut devenir.`}
          </p>
        ) : fait ? (
          <p><strong>Le n° {transformee} a changé.</strong> Et chacune des trente-cinq autres maisons y voit la sienne.</p>
        ) : (
          <p className="text-[var(--doux)]">Trente-six maisons construites en même temps, sur le même plan.</p>
        )}
      </div>
      <button
        type="button"
        data-film="transformer"
        onClick={() => setFait((f) => !f)}
        className="inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-full bg-[var(--encre)] px-7 font-[family-name:var(--texte)] text-[17px] font-medium text-[var(--fond)] transition-transform hover:scale-[1.02] sm:w-auto"
      >
        {fait ? "Revoir le lotissement d'origine" : `Transformer le n° ${transformee}`}
        <span aria-hidden="true">{fait ? "↺" : "→"}</span>
      </button>
    </div>
  );
}
