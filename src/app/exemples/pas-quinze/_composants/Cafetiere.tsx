"use client";

import { useState } from "react";
import Link from "next/link";
import { CAFES, DOSSIER, FINESSES, METHODES, ORDRE_METHODES, euros, type CleMethode } from "./donnees";
import { IconeMethode } from "./Icones";

/**
 * L'outil de l'accueil, celui de la vidéo : une seule question — « tu fais ton café
 * comment ? » — et la réponse : la mouture, et les deux cafés faits pour cette
 * cafetière. Pas quinze. Deux. Tout se calcule dans le navigateur.
 */
export default function Cafetiere() {
  const [choix, setChoix] = useState<CleMethode | null>(null);
  const m = choix ? METHODES[choix] : null;

  return (
    <div className="space-y-5">
      <div data-film="methodes" className="grid grid-cols-2 gap-3">
        {ORDRE_METHODES.map((cle) => {
          const actif = choix === cle;
          return (
            <button
              key={cle}
              type="button"
              data-methode={cle}
              aria-pressed={actif}
              onClick={() => setChoix(cle)}
              className={`flex min-h-[7.5rem] flex-col items-start justify-between rounded-2xl border-[3px] p-4 text-left transition-colors ${
                actif ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--encre)] bg-transparent text-[var(--encre)] hover:bg-[#1A1410]/10"
              }`}
            >
              <IconeMethode methode={cle} className="h-10 w-10" />
              <span className="font-[family-name:var(--titres)] text-xl font-bold">{METHODES[cle].libelle}</span>
            </button>
          );
        })}
      </div>

      {m && choix ? (
        <div data-film="reponse" aria-live="polite" className="space-y-5 rounded-[22px] bg-[var(--fond)] p-5 text-[var(--encre)] sm:p-6">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Pour {m.pour}</p>
          <div className="space-y-2">
            <p className="flex items-baseline justify-between gap-3">
              <span className="font-semibold">Mouture</span>
              <span className="font-[family-name:var(--titres)] text-xl font-bold">{m.mouture}</span>
            </p>
            <div className="grid grid-cols-4 gap-1" aria-hidden="true">
              {FINESSES.map((f, i) => (
                <span key={f} className={`h-2 rounded-full ${i === m.finesse ? "bg-[var(--accent)]" : "bg-[var(--trait)]"}`} />
              ))}
            </div>
            <p className="flex justify-between text-xs text-[var(--doux)]"><span>fine</span><span>grossière</span></p>
            <p className="text-[15px] text-[var(--doux)]">{m.conseil}</p>
          </div>
          <div className="space-y-3">
            <p className="font-[family-name:var(--titres)] text-2xl font-bold">Tes deux cafés</p>
            <ul className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
              {m.cafes.map((c) => (
                <li key={c} data-film={`cafe-${c}`} className="flex items-center gap-4 py-3">
                  <span aria-hidden="true" className="h-10 w-10 shrink-0 rounded-full" style={{ background: CAFES[c].teinte }} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-bold">{CAFES[c].nom}</span>
                    <span className="block text-[var(--doux)]">{CAFES[c].enClair}</span>
                  </span>
                  <span className="text-right text-sm tabular-nums">{euros(CAFES[c].prix250)}<br /><span className="text-[var(--doux)]">250 g</span></span>
                </li>
              ))}
            </ul>
            <p className="flex items-baseline justify-between gap-3">
              <span className="font-[family-name:var(--titres)] text-lg font-bold">Pas quinze. Deux.</span>
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--doux)]">Exemple · prix TTC</span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link href={`${DOSSIER}/cafes#${choix}`} className="grid min-h-12 place-items-center rounded-full bg-[var(--encre)] px-4 text-center font-bold text-[var(--fond)]">Commander</Link>
            <Link href={`${DOSSIER}/abonnement`} className="grid min-h-12 place-items-center rounded-full border-[3px] border-[var(--encre)] px-4 text-center font-bold">M&apos;abonner</Link>
          </div>
        </div>
      ) : (
        <p className="text-[15px] font-semibold">Touche ta cafetière : on te dit la mouture, et les deux cafés faits pour elle.</p>
      )}
    </div>
  );
}
