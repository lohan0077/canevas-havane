"use client";

import { useState } from "react";

/**
 * Le téléphone du propriétaire, un samedi à 23 h 04. Sans conciergerie, l'appel du
 * voyageur sonne chez lui ; avec Le Veilleur, il arrive sur notre ligne, et lui reçoit
 * un résumé le lendemain. Aucun logement nommé, aucune adresse : l'écran ne dit pas
 * où est le logement, ni qu'il est vide.
 */
export default function Telephone() {
  const [avec, setAvec] = useState(true);

  return (
    <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10">
      <div className="mx-auto w-[260px] rounded-[42px] border-[3px] border-[#34435A] bg-[#0D1522] p-3 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]">
        <div className="relative h-[420px] overflow-hidden rounded-[32px] bg-[radial-gradient(120%_70%_at_50%_0%,#2B3B52_0%,#101A29_70%)] px-4 pt-10 text-center">
          <p className="text-[13px] font-semibold text-[#C9D0DB]">samedi</p>
          <p className="font-[family-name:var(--titres)] text-[76px] leading-none text-[#F1ECE2] tabular-nums">23:04</p>
          <div className="mt-10 space-y-3 text-left" aria-live="polite">
            {avec ? (
              <>
                <div className="rounded-2xl bg-[#F1ECE2] p-3.5 text-[#162132]">
                  <p className="text-[12px] font-bold uppercase tracking-[0.1em]">Le Veilleur</p>
                  <p className="text-[14px] font-bold leading-snug">Rien à faire ce soir.</p>
                  <p className="text-[13px] leading-snug">Résumé de la nuit demain, à 9 h.</p>
                </div>
                <p className="px-2 text-[13px] leading-snug text-[#C9D0DB]">
                  L&apos;appel du voyageur est arrivé sur notre ligne. Nous l&apos;avons pris.
                </p>
              </>
            ) : (
              <>
                <div className="rounded-2xl bg-[#E2B65C] p-3.5 text-[#162132] ring-4 ring-[#E2B65C]/30">
                  <p className="text-[12px] font-bold uppercase tracking-[0.1em]">Appel entrant · voyageur</p>
                  <p className="text-[14px] font-bold leading-snug">« La boîte à clés ne s&apos;ouvre pas. »</p>
                </div>
                <p className="px-2 text-[13px] leading-snug text-[#C9D0DB]">Et c&apos;est à toi de répondre.</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div role="group" aria-label="Le téléphone du propriétaire" className="inline-flex rounded-full border border-[#34435A] p-1">
          <button
            type="button"
            aria-pressed={!avec}
            onClick={() => setAvec(false)}
            className={`min-h-11 rounded-full px-4 text-[14px] font-bold ${!avec ? "bg-[#F1ECE2] text-[#162132]" : "text-[#F1ECE2]"}`}
          >
            Sans conciergerie
          </button>
          <button
            type="button"
            aria-pressed={avec}
            onClick={() => setAvec(true)}
            className={`min-h-11 rounded-full px-4 text-[14px] font-bold ${avec ? "bg-[#E2B65C] text-[#162132]" : "text-[#F1ECE2]"}`}
          >
            Avec Le Veilleur
          </button>
        </div>
        <p className="max-w-md text-[17px] leading-relaxed text-[#C9D0DB]">
          Les voyageurs ont un seul numéro : le nôtre. De jour comme de nuit, c&apos;est lui qui
          sonne. Si une décision t&apos;appartient, nous t&apos;appelons ; sinon, tu lis le résumé
          au réveil.
        </p>
      </div>
    </div>
  );
}
