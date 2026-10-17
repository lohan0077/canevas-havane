"use client";

import { useState } from "react";
import Link from "next/link";
import { CHAPITRES, DOSSIER } from "./donnees";
import { styleCahier } from "./cahier";

/**
 * L'accueil sans CV : « Quel chapitre bloque ? ». On touche un chapitre ; la page de
 * cahier montre la première séance sur ce chapitre, minute par minute. Rien n'est
 * envoyé : c'est le déroulé prévu, pas une inscription.
 */
export default function ChoixChapitre() {
  const [id, setId] = useState<string | null>(null);
  const chapitre = CHAPITRES.find((c) => c.id === id) ?? null;

  return (
    <div id="chapitre" data-film="chapitre" className="relative rounded-[6px] border border-[var(--trait)] shadow-[0_24px_50px_-30px_rgba(31,42,36,.45)] overflow-hidden" style={styleCahier}>
      <div className="pl-12 pr-5 py-7 sm:pl-16 sm:pr-8 space-y-6">
        <div className="space-y-1">
          <p className="font-[family-name:var(--f-caveat)] text-2xl text-[var(--accent-texte)] -rotate-2 origin-left">Maths · collège</p>
          <h2 className="text-[34px] sm:text-5xl">Quel chapitre bloque&nbsp;?</h2>
        </div>
        <div role="radiogroup" aria-label="Le chapitre qui bloque" className="flex flex-wrap gap-2.5">
          {CHAPITRES.map((c) => {
            const actif = c.id === id;
            return (
              <button
                key={c.id}
                type="button"
                role="radio"
                aria-checked={actif}
                onClick={() => setId(c.id)}
                className={`rounded-full border-2 px-4 py-2.5 text-[17px] font-semibold transition-transform ${
                  actif ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)] scale-105" : "border-[var(--encre)] bg-[var(--carte)]"
                }`}
              >
                {c.nom}
              </button>
            );
          })}
        </div>

        <div id="premiere-seance" aria-live="polite" className="min-h-[19rem]">
          {chapitre ? (
            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.14em]">
                {chapitre.nom} · {chapitre.classe}
              </p>
              <h3 className="text-3xl">Votre première <span className="text-[var(--accent-texte)]">séance</span>, minute par minute</h3>
              <ol className="space-y-3">
                {chapitre.etapes.map((e) => (
                  <li key={e.minute} className="grid grid-cols-[52px_1fr] gap-2 items-baseline">
                    <span className="font-[family-name:var(--f-caveat)] text-3xl leading-none text-[var(--accent-texte)]">{e.minute}</span>
                    <span className="text-[17px] leading-snug">{e.titre}</span>
                  </li>
                ))}
              </ol>
              <Link href={`${DOSSIER}/reserver`} className="inline-flex min-h-[52px] items-center rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 font-semibold">
                Voir les créneaux
              </Link>
            </div>
          ) : (
            <p className="font-[family-name:var(--f-caveat)] text-3xl text-[var(--doux)] -rotate-1 pt-4">
              ↑ Touchez un chapitre : la première séance s&apos;écrit ici.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
