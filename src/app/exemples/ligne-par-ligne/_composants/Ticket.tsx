"use client";

import { useEffect, useState } from "react";
import { HONORAIRES, RETROCESSIONS, STATUTS_COURTS } from "./donnees";

const espace = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const euros = (n: number) => `${espace(n)} €`;
const pourcent = (t: number) => `${(t * 100).toFixed(2).replace(".", ",")} %/an`;
const NB_LIGNES = HONORAIRES.length + RETROCESSIONS.length;

/**
 * « Ce que je gagne » : un ticket de caisse. Les honoraires (payés par le client) et ce que
 * reversent l'assureur et la société de gestion, pris sur les frais que paie le client
 * (CMF L541-8-1, 8°). En tête : « conseil non indépendant » (L541-8-1, 7° b). Le bouton
 * réimprime le ticket, ligne par ligne. Avec `calcul`, un curseur chiffre en euros ce que
 * reversent les partenaires sur l'épargne choisie : ce que gagne le conseiller, jamais ce
 * que gagnerait le client. Montants d'exemple ; tout se calcule dans la page.
 */
export default function Ticket({ calcul = false, film }: { calcul?: boolean; film?: string }) {
  const [montant, setMontant] = useState(100000);
  const [visibles, setVisibles] = useState(NB_LIGNES);

  useEffect(() => {
    if (visibles >= NB_LIGNES) return;
    const t = setTimeout(() => setVisibles((v) => v + 1), visibles === 0 ? 700 : 1000);
    return () => clearTimeout(t);
  }, [visibles]);

  const imprimer = () => {
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setVisibles(reduit ? NB_LIGNES : 0);
  };

  const fixe = HONORAIRES.reduce((s, h) => s + h.montant, 0);
  const verse = RETROCESSIONS.reduce((s, r) => s + r.taux * montant, 0);
  const rempli = ((montant - 20000) / (500000 - 20000)) * 100;
  const ligne = (i: number) => `transition-[opacity,transform] duration-500 ${i < visibles ? "opacity-100" : "-translate-y-1.5 opacity-0"}`;

  return (
    <div data-film={film} className="mx-auto w-full max-w-[380px]">
      <div
        className="relative bg-[var(--carte)] px-6 pt-6 pb-9 text-[var(--encre)] shadow-[0_30px_60px_-35px_rgba(23,37,30,0.55)]"
        style={{
          WebkitMaskImage: "linear-gradient(#000,#000), radial-gradient(circle at 8px 0, transparent 7px, #000 7.5px)",
          WebkitMaskSize: "100% calc(100% - 8px), 16px 8px",
          WebkitMaskPosition: "top, bottom",
          WebkitMaskRepeat: "no-repeat, repeat-x",
          maskImage: "linear-gradient(#000,#000), radial-gradient(circle at 8px 0, transparent 7px, #000 7.5px)",
          maskSize: "100% calc(100% - 8px), 16px 8px",
          maskPosition: "top, bottom",
          maskRepeat: "no-repeat, repeat-x",
        }}
      >
        <div className="border-b-2 border-dashed border-[var(--trait)] pb-4 text-center">
          <p className="font-[family-name:var(--titres)] text-[30px] leading-tight">Ce que je gagne</p>
          <p className="mt-1 text-[12px] leading-snug text-[var(--doux)]">Ligne par Ligne · conseil non indépendant · montants TTC&nbsp;: exemple</p>
        </div>

        <ul className="space-y-3.5 py-5 text-[15px]">
          {HONORAIRES.map((h, i) => (
            <li key={h.libelle} className={ligne(i)}>
              <p className="flex items-baseline gap-2">
                <span className="font-semibold">{h.libelle}</span>
                <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-4px] border-b border-dotted border-[var(--doux)]" />
                <span className="font-semibold tabular-nums">{euros(h.montant)}</span>
              </p>
              <p className="text-[12px] text-[var(--doux)]">{h.note}</p>
            </li>
          ))}
          {RETROCESSIONS.map((r, j) => (
            <li key={r.libelle} className={ligne(HONORAIRES.length + j)}>
              <p className="flex items-baseline gap-2">
                <span className="font-semibold">{r.libelle}</span>
                <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-4px] border-b border-dotted border-[var(--doux)]" />
                <span className="font-semibold whitespace-nowrap tabular-nums">{pourcent(r.taux)}</span>
              </p>
              <p className="text-[12px] text-[#9A4423]">
                {r.note}
                {calcul && <span className="text-[var(--doux)]"> · soit {euros(r.taux * montant)} par an sur {euros(montant)}</span>}
              </p>
            </li>
          ))}
        </ul>

        {calcul && (
          <div className="space-y-4 border-t-2 border-dashed border-[var(--trait)] pt-5">
            <label className="block space-y-3">
              <span className="flex items-baseline justify-between gap-3 text-[13px] font-semibold">
                Ton épargne confiée
                <span className="font-[family-name:var(--titres)] text-[22px] font-normal tabular-nums">{euros(montant)}</span>
              </span>
              <input
                type="range"
                min={20000}
                max={500000}
                step={10000}
                value={montant}
                data-film="epargne"
                onChange={(e) => setMontant(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-[var(--carte)] [&::-moz-range-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[var(--carte)] [&::-webkit-slider-thumb]:bg-[var(--accent)] [&::-webkit-slider-thumb]:shadow"
                style={{ background: `linear-gradient(90deg, var(--accent) ${rempli}%, var(--trait) ${rempli}%)` }}
              />
            </label>
            <dl aria-live="polite" className="space-y-1.5 text-[14px]">
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--doux)]">Mes honoraires, la première année</dt>
                <dd className="font-semibold tabular-nums">{euros(fixe)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--doux)]">Reversé par les partenaires, chaque année</dt>
                <dd className="font-semibold tabular-nums">{euros(verse)}</dd>
              </div>
              <div className="flex justify-between gap-3 border-t border-[var(--trait)] pt-2 text-[16px]">
                <dt className="font-semibold">Ce que je gagne, la première année</dt>
                <dd className="font-[family-name:var(--titres)] text-[22px] tabular-nums">{euros(fixe + verse)}</dd>
              </div>
            </dl>
          </div>
        )}

        <p className="mt-5 border-t-2 border-dashed border-[var(--trait)] pt-4 text-center text-[12px] leading-snug text-[var(--doux)]">{STATUTS_COURTS}</p>
        <button
          type="button"
          data-film={film ? "imprimer" : undefined}
          onClick={imprimer}
          className="mx-auto mt-4 block min-h-11 rounded-full border border-[var(--encre)] px-5 text-[14px] font-semibold"
        >
          Imprimer le ticket
        </button>
      </div>
    </div>
  );
}
