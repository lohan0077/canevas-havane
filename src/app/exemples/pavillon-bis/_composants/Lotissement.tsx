"use client";

import { useState } from "react";
import { LOTISSEMENT } from "./donnees";

/** Une maison du lotissement, vue de dessus de biais : la même pour les trente-six. */
function Petite({ transformee, voit, retard = 0 }: { transformee: boolean; voit: boolean; retard?: number }) {
  const transition = { transition: `fill .4s ease ${retard}ms` };
  return (
    <svg viewBox="0 0 40 34" aria-hidden="true" className="block h-auto w-full">
      <rect x="6" y="14" width="24" height="16" fill={voit ? "#EDBE57" : "#EFE3CC"} stroke="#2F3B35" strokeWidth="1.4" style={transition} />
      <path d="M2 15L18 5L34 15Z" fill="#A63F2A" stroke="#2F3B35" strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="10" y="18" width="6" height="5" fill={voit ? "#FFF6D6" : "#9FC3C9"} stroke="#2F3B35" strokeWidth="0.8" style={transition} />
      <rect x="20" y="20" width="5" height="10" fill="#6B4A2F" />
      {transformee && (
        <g>
          <rect x="30" y="18" width="9" height="12" fill="#C98F3A" stroke="#2F3B35" strokeWidth="1.2" />
          <rect x="31.5" y="21" width="6" height="9" fill="#9FC3C9" stroke="#2F3B35" strokeWidth="0.6" />
        </g>
      )}
    </svg>
  );
}

/**
 * Le lotissement des Tilleuls (exemple) : trente-six maisons identiques. On transforme le
 * n° 14, et chaque voisin y voit la sienne — de proche en proche. Toucher une maison dit
 * laquelle c'est.
 */
export default function Lotissement() {
  const { maisons, colonnes, transformee, nom, annee } = LOTISSEMENT;
  const [fait, setFait] = useState(false);
  const [choisie, setChoisie] = useState<number | null>(null);
  const cible = transformee - 1;
  const distance = (k: number) => Math.hypot((k % colonnes) - (cible % colonnes), Math.floor(k / colonnes) - Math.floor(cible / colonnes));

  return (
    <div data-film="lotissement" className="space-y-5">
      <div className="rounded-[24px] border-2 border-[var(--encre)] bg-[#DCE5CF] p-3 sm:p-5">
        <p className="mb-3 flex items-baseline justify-between gap-3 text-[13px] font-bold uppercase tracking-[0.12em] text-[#2F3B35]">
          <span>{nom} · {annee}</span>
          <span>exemple</span>
        </p>
        <ul className="grid gap-x-1.5 gap-y-2" style={{ gridTemplateColumns: `repeat(${colonnes}, minmax(0, 1fr))` }}>
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
                  className={`block w-full rounded-lg p-0.5 transition-transform duration-500 ${estCible && fait ? "relative z-10 scale-[1.35] bg-[#F4EFE6] shadow-md" : ""} ${choisie === n ? "outline outline-2 outline-[#A63F2A]" : ""}`}
                >
                  <Petite transformee={estCible && fait} voit={voit} retard={voit ? 300 + distance(k) * 140 : 0} />
                  <span className="block text-center text-[10px] font-bold leading-none text-[#2F3B35]">{n}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div role="status" className="min-h-[52px] text-[16px] leading-relaxed">
        {choisie ? (
          <p>
            <strong>Le n° {choisie}</strong> : un plain-pied de {annee}.{" "}
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
        className="min-h-[54px] w-full rounded-full bg-[var(--encre)] px-6 font-[family-name:var(--titres)] text-[17px] font-bold text-[var(--fond)] sm:w-auto"
      >
        {fait ? "Revoir le lotissement d'origine" : `Transformer le n° ${transformee}`}
      </button>
    </div>
  );
}
