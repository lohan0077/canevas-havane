"use client";

import { useState } from "react";
import { soutienPsy } from "./donnees";

/**
 * « Partenaire Mon soutien psy », dit dès l'accueil : une pastille qui s'ouvre sur
 * « comment ça marche, en trois lignes ». Aucun chiffre : ils changent, et la source
 * est ameli.fr. `#soutien-bouton` sert au tournage de la vidéo.
 */
export default function SoutienPsy({ ouvertAuDepart = false }: { ouvertAuDepart?: boolean }) {
  const [ouvert, setOuvert] = useState(ouvertAuDepart);
  return (
    <div className="w-full max-w-md rounded-[1.4rem] bg-[var(--carte)] text-left text-[var(--encre)] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)]" data-film="soutien">
      <button
        type="button"
        id="soutien-bouton"
        aria-expanded={ouvert}
        aria-controls="soutien-lignes"
        onClick={() => setOuvert((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left"
      >
        <span>
          <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Remboursement</span>
          <span className="block font-[family-name:var(--titres)] text-[19px]">Partenaire Mon soutien psy</span>
        </span>
        <span aria-hidden="true" className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-xl text-[var(--sur-accent)] transition-transform duration-500 ${ouvert ? "rotate-45" : ""}`}>+</span>
      </button>
      <ol id="soutien-lignes" hidden={!ouvert} className="space-y-2.5 px-5 pb-5">
        {soutienPsy.map((l, i) => (
          <li key={l} className="flex gap-3 text-[15px] leading-relaxed">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--fond)] text-xs font-bold tabular-nums">{i + 1}</span>
            {l}
          </li>
        ))}
      </ol>
    </div>
  );
}
