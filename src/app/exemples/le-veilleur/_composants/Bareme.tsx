"use client";

import { useState } from "react";
import { BASE_DE_CALCUL, bareme } from "./donnees";

const FILTRES = [
  { cle: "tout", libelle: "Tout" },
  { cle: "proprietaire", libelle: "Ce que paie le propriétaire" },
  { cle: "voyageur", libelle: "Ce que paie le voyageur" },
] as const;

/**
 * Le barème, sur le site : ce qu'on prend, le ménage, et qui paie quoi. Prix maximums
 * TTC, à qui incombe le paiement de chaque prestation, et la base de calcul du
 * pourcentage (arrêté du 10 janvier 2017, art. 2, I à IV). Les montants sont des exemples.
 * Les filtres soulignent les lignes de l'un ou de l'autre ; ils n'en cachent aucune.
 */
export default function Bareme() {
  const [filtre, setFiltre] = useState<(typeof FILTRES)[number]["cle"]>("tout");

  return (
    <div data-film="bareme" className="overflow-hidden rounded-[22px] border border-[var(--trait)] bg-[var(--carte)]">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[var(--trait)] px-5 pt-5 pb-4 sm:px-7">
        <p className="font-[family-name:var(--titres)] text-[32px] leading-none">Notre barème</p>
        <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Prix maximums TTC</p>
      </div>

      <div role="group" aria-label="Qui paie quoi ?" className="flex flex-wrap gap-2 border-b border-[var(--trait)] px-5 py-3.5 sm:px-7">
        {FILTRES.map((f) => (
          <button
            key={f.cle}
            type="button"
            data-film={`qui-${f.cle}`}
            aria-pressed={filtre === f.cle}
            onClick={() => setFiltre(f.cle)}
            className={`min-h-10 rounded-full border px-3.5 text-[13px] font-bold transition-colors ${
              filtre === f.cle ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--carte)]" : "border-[var(--trait)] bg-[var(--fond)]"
            }`}
          >
            {f.libelle}
          </button>
        ))}
      </div>

      <ul className="divide-y divide-[var(--trait)]">
        {bareme.map((l) => {
          const vise = filtre !== "tout" && l.payeur === filtre;
          return (
            <li
              key={l.prestation}
              data-film={`ligne-${l.payeur}`}
              className={`grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-l-[5px] px-5 py-4 transition-colors sm:px-7 ${
                vise ? "border-l-[var(--accent)] bg-[var(--fond)]" : "border-l-transparent"
              }`}
            >
              <p className="text-[17px] font-bold leading-snug">{l.prestation}</p>
              <p className="text-right font-[family-name:var(--titres)] text-[28px] leading-none whitespace-nowrap">{l.prix}</p>
              <p className={`text-[14px] font-bold ${vise ? "text-[var(--encre)]" : "text-[var(--accent-texte)]"}`}>{l.qui}</p>
              <p className="text-right text-[13px] text-[var(--doux)]">{l.unite}</p>
              <p className="col-span-2 pt-1 text-[14px] leading-relaxed text-[var(--doux)]">{l.detail}</p>
            </li>
          );
        })}
      </ul>

      <div className="space-y-2 border-t border-[var(--trait)] bg-[var(--fond)] px-5 py-4 text-[13px] leading-relaxed text-[var(--doux)] sm:px-7">
        <p>{BASE_DE_CALCUL}</p>
        <p>
          <strong className="text-[var(--encre)]">Prix d&apos;exemple</strong>, toutes taxes comprises. Aucune autre somme
          n&apos;est demandée, ni au propriétaire ni au voyageur.
        </p>
      </div>
    </div>
  );
}
