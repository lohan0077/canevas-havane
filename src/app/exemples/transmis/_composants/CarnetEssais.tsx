"use client";

import { useState } from "react";
import { ESSAIS } from "./donnees";
import s from "./Transmis.module.css";

/**
 * Le carnet d'essais d'une recette : chaque essai, la date, ce qu'a dit la personne qui
 * l'a transmise. Au troisième, c'est elle qui valide — un bouton, un tampon. Exemple.
 */
export default function CarnetEssais() {
  const [valide, setValide] = useState(false);

  return (
    <div id="carnet" className="space-y-3">
      <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">La blanquette de Mamie Jo · exemple</p>
      <ol className="space-y-3">
        {ESSAIS.map((e, i) => {
          const dernier = i === ESSAIS.length - 1;
          return (
            <li key={e.numero} data-film={`essai-${e.numero}`} className={`relative overflow-hidden rounded-2xl border bg-[var(--carte)] p-5 ${dernier ? "border-[var(--encre)]" : "border-[var(--trait)]"}`}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-[26px]">Essai n<sup className="text-[0.6em]">o</sup>&nbsp;{e.numero}</h3>
                <p className="text-[14px] text-[var(--doux)]">samedi {e.date}</p>
              </div>
              <p className="mt-1 font-[family-name:var(--f-caveat)] text-[25px] leading-snug text-[#1E3A6E]">{e.note}</p>
              {!dernier && <p className="mt-1 text-[13px] text-[var(--doux)]">Noté, on recommence.</p>}
              {dernier && (
                <div className="mt-3">
                  {valide ? (
                    <p role="status" className="pr-28 text-[15px] font-medium">Validé par Mamie Jo. La blanquette part pour 120.</p>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setValide(true)}
                      className="inline-flex h-12 items-center rounded-full bg-[var(--accent)] px-6 text-[15px] font-medium text-[var(--sur-accent)]"
                    >
                      Mamie Jo valide
                    </button>
                  )}
                </div>
              )}
              {dernier && valide && (
                <span aria-hidden="true" className={`${s.tampon} absolute right-4 bottom-5 rounded-[10px] border-[4px] border-[var(--accent)] px-3 py-1 font-[family-name:var(--titres)] text-[30px] italic text-[var(--accent-texte)]`}>
                  Validé
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <p className="text-[13px] text-[var(--doux)]">Carnet d&apos;exemple : Mamie Jo et ses remarques sont inventées pour la démonstration.</p>
    </div>
  );
}
