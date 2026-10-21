"use client";

import { useState } from "react";
import { soutienPsy } from "./donnees";

/**
 * « Partenaire Mon soutien psy », dit dès l'accueil : une pastille qui s'ouvre sur
 * « comment ça marche, en trois lignes ». Aucun chiffre : ils changent, et la source
 * est ameli.fr.
 */
export default function SoutienPsy({ ouvertAuDepart = false }: { ouvertAuDepart?: boolean }) {
  const [ouvert, setOuvert] = useState(ouvertAuDepart);
  return (
    <div className="rounded-[22px] bg-[#DCE3FF] text-left" data-film="soutien">
      <button
        type="button"
        id="soutien-bouton"
        aria-expanded={ouvert}
        aria-controls="soutien-lignes"
        onClick={() => setOuvert((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left"
      >
        <span>
          <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Remboursement</span>
          <span className="block font-[family-name:var(--titres)] text-lg font-semibold">Partenaire Mon soutien psy</span>
        </span>
        <span aria-hidden="true" className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-xl text-white transition-transform ${ouvert ? "rotate-45" : ""}`}>+</span>
      </button>
      <ol id="soutien-lignes" hidden={!ouvert} className="space-y-2.5 px-5 pb-5">
        {soutienPsy.map((l, i) => (
          <li key={l} className="flex gap-3 text-[15px] leading-relaxed">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-xs font-bold tabular-nums">{i + 1}</span>
            {l}
          </li>
        ))}
      </ol>
    </div>
  );
}
