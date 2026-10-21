"use client";

import { useState } from "react";
import { VISITES } from "./donnees";

/**
 * La page du vendeur : chaque visite, avec son compte rendu envoyé le soir même.
 * Les visiteurs ne sont jamais nommés. La dernière visite est ouverte ; les autres
 * s'ouvrent d'un toucher.
 */
export default function Suivi() {
  const [ouverte, setOuverte] = useState(VISITES.length - 1);
  return (
    <ol className="relative space-y-5 before:absolute before:bottom-6 before:left-[19px] before:top-6 before:w-px before:bg-[var(--trait)]" data-film="visites">
      {VISITES.map((v, i) => {
        const active = ouverte === i;
        return (
          <li key={v.date} className="relative pl-14" data-film={`visite-${i + 1}`}>
            <span aria-hidden="true" className={`absolute left-0 top-5 grid h-10 w-10 place-items-center rounded-full border-2 font-[family-name:var(--titres)] text-[20px] ${active ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}>
              {i + 1}
            </span>
            <article className="rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-5">
              <button type="button" onClick={() => setOuverte(active ? -1 : i)} aria-expanded={active} className="w-full space-y-2 text-left">
                <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Visite {i + 1} · {v.jour} {v.date}, {v.heure}</span>
                  <span className="text-[13px] text-[var(--doux)]">Compte rendu envoyé à {v.envoi}</span>
                </span>
                <span className="block font-[family-name:var(--titres)] text-[30px] leading-[1.08]">{v.phrase}</span>
                <span className="block text-[14px] font-semibold underline decoration-[var(--accent)] decoration-2 underline-offset-4">
                  {active ? "Refermer le compte rendu" : "Lire le compte rendu"}
                </span>
              </button>
              {active && (
                <dl className="mt-4 space-y-3 border-t border-[var(--trait)] pt-4 text-[16px] leading-relaxed">
                  <div>
                    <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">Ce qui a plu</dt>
                    <dd>{v.plu}</dd>
                  </div>
                  <div>
                    <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">Ce qui freine</dt>
                    <dd>{v.freine}</dd>
                  </div>
                  <div>
                    <dt className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--doux)]">La suite</dt>
                    <dd>{v.suite}</dd>
                  </div>
                </dl>
              )}
            </article>
          </li>
        );
      })}
    </ol>
  );
}
