"use client";

import { useState } from "react";
import Link from "next/link";
import { CAFES, DOSSIER, FINESSES, METHODES, ORDRE_METHODES, euros, type CleMethode } from "./donnees";
import { IconeMethode } from "./Icones";

/**
 * L'outil de la vidéo « Remplir le carnet de commandes » : une seule question — « tu
 * fais ton café comment ? » — et la réponse : la mouture, et les deux cafés de la
 * maison faits pour cette cafetière. Pas quinze. Deux. Tout se calcule dans le
 * navigateur.
 */
export default function Cafetiere() {
  const [choix, setChoix] = useState<CleMethode | null>(null);
  const m = choix ? METHODES[choix] : null;

  return (
    <div className="overflow-hidden rounded-[2rem] bg-[var(--carte)] text-[var(--encre)] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--trait)] bg-[var(--fond)] px-5 py-3.5 sm:px-7">
        <p className="font-[family-name:var(--titres)] text-lg font-medium">Ta cafetière</p>
        <p className="text-sm font-semibold text-[var(--doux)]">1 question · 2 cafés</p>
      </div>
      <div className="space-y-5 p-5 sm:p-7">
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
                className={`flex min-h-[7rem] flex-col items-start justify-between rounded-[1.25rem] border-2 p-4 text-left transition-all duration-300 ${
                  actif ? "scale-[1.03] border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--fond)] text-[var(--encre)] hover:border-[var(--encre)]"
                }`}
              >
                <IconeMethode methode={cle} className="h-10 w-10" />
                <span className="font-[family-name:var(--titres)] text-xl font-medium">{METHODES[cle].libelle}</span>
              </button>
            );
          })}
        </div>

        {m && choix ? (
          <div data-film="reponse" aria-live="polite" className="space-y-5 rounded-[1.25rem] bg-[var(--sombre)] p-5 text-[var(--sur-sombre)] sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#E8A24B]">Pour {m.pour}</p>
            <div className="space-y-2">
              <p className="flex items-baseline justify-between gap-3">
                <span className="font-semibold">Mouture</span>
                <span className="font-[family-name:var(--titres)] text-2xl font-medium">{m.mouture}</span>
              </p>
              <div className="grid grid-cols-4 gap-1" aria-hidden="true">
                {FINESSES.map((f, i) => (
                  <span key={f} className={`h-2 rounded-full ${i === m.finesse ? "bg-[#E8A24B]" : "bg-white/20"}`} />
                ))}
              </div>
              <p className="flex justify-between text-xs text-[var(--sur-sombre)]/90"><span>fine</span><span>grossière</span></p>
              <p className="text-[15px] text-[var(--sur-sombre)]/90">{m.conseil}</p>
            </div>
            <div className="space-y-3">
              <p className="font-[family-name:var(--titres)] text-2xl font-medium">Tes deux cafés</p>
              <ul className="grid grid-cols-2 gap-3">
                {m.cafes.map((c) => (
                  <li key={c} data-film={`cafe-${c}`} className="space-y-2 rounded-[1rem] p-4" style={{ background: CAFES[c].fond, color: CAFES[c].encre }}>
                    <span className="block font-[family-name:var(--titres)] text-[2rem] font-extralight leading-none tracking-[-0.03em]">{CAFES[c].heure}</span>
                    <span className="block text-sm italic">{CAFES[c].moment}</span>
                    <span className="block font-semibold leading-snug">{CAFES[c].nom}</span>
                    <span className="block text-sm">{CAFES[c].enClair}</span>
                    <span className="block text-sm font-semibold tabular-nums">{euros(CAFES[c].prix)} · 250 g</span>
                  </li>
                ))}
              </ul>
              <p className="flex items-baseline justify-between gap-3">
                <span className="font-[family-name:var(--titres)] text-xl font-medium">Pas quinze. Deux.</span>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--sur-sombre)]/90">Exemple · prix TTC</span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link href={`${DOSSIER}/cafes#commander`} className="grid min-h-12 place-items-center rounded-full bg-[#E8A24B] px-4 text-center font-semibold text-[#2B1B12]">Commander</Link>
              <Link href={`${DOSSIER}#abonnement`} className="grid min-h-12 place-items-center rounded-full border border-white/40 px-4 text-center font-semibold">M&apos;abonner</Link>
            </div>
          </div>
        ) : (
          <p className="text-[15px] font-semibold">Touche ta cafetière : on te dit la mouture, et les deux cafés faits pour elle.</p>
        )}
      </div>
    </div>
  );
}
