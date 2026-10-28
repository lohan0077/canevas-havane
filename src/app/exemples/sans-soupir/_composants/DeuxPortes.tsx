"use client";

import { useState } from "react";
import Link from "next/link";
import { DEPANNAGE, DOSSIER, euros } from "./donnees";

type Porte = "casse" | "apprendre";

/**
 * Les deux portes de l'accueil. « C'est cassé » : le dépannage, ses prix TTC, et la
 * phrase qui dit qu'il n'ouvre pas droit au crédit d'impôt. « Je veux apprendre » :
 * les cours et l'installation chez toi ; la mention de l'avantage fiscal vient à part,
 * jamais collée à un prix.
 */
export default function DeuxPortes() {
  const [porte, setPorte] = useState<Porte | null>(null);

  const bouton = (id: Porte, titre: string, sous: string, couleur: string, icone: React.ReactNode) => {
    const ouverte = porte === id;
    return (
      <button
        type="button"
        data-porte={id}
        aria-pressed={ouverte}
        aria-controls="dl-porte"
        onClick={() => setPorte(ouverte ? null : id)}
        className={`relative flex min-h-[208px] flex-col justify-end gap-1.5 rounded-t-[999px] rounded-b-[26px] border-[3px] px-4 pb-5 pt-14 text-left transition-transform duration-300 ${ouverte ? "-translate-y-2 border-[var(--encre)] shadow-[0_18px_0_-6px_var(--encre)]" : "border-transparent"}`}
        style={{ background: couleur }}
      >
        <span aria-hidden="true" className="absolute left-1/2 top-7 -translate-x-1/2">{icone}</span>
        <span aria-hidden="true" className="absolute right-4 top-[38%] h-3 w-3 rounded-full bg-[var(--encre)]" />
        <span className="font-[family-name:var(--titres)] text-[23px] sm:text-[28px] font-extrabold leading-[1.02] tracking-[-0.01em]">{titre}</span>
        <span className="text-sm font-medium leading-snug">{sous}</span>
      </button>
    );
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        {bouton(
          "casse",
          "C'est cassé",
          "Dépannage, réparation",
          "#FF9A80",
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#221B33" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M24 6a8 8 0 0 0-7.5 10.7L6 27.2 12.8 34l10.5-10.5A8 8 0 0 0 34 16l-5 5-5-1-1-5 5-5a8 8 0 0 0-4-4z" /></svg>,
        )}
        {bouton(
          "apprendre",
          "Je veux apprendre",
          "Cours et installation, chez toi",
          "#7FD8BE",
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="#221B33" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15 20 8l16 7-16 7z" /><path d="M10 18v8c3 3 7 4 10 4s7-1 10-4v-8" /><path d="M36 15v9" /></svg>,
        )}
      </div>

      <div id="dl-porte" aria-live="polite" className="min-h-[150px]">
        {porte === null && (
          <p className="rounded-[24px] border-2 border-dashed border-[var(--trait)] px-5 py-6 text-center text-[var(--doux)]">
            Touche une porte : on te dit tout de suite ce qu&apos;on fait, et combien.
          </p>
        )}
        {porte === "casse" && (
          <div className="rounded-[24px] bg-[var(--carte)] border-2 border-[var(--encre)] p-5 space-y-3">
            <p className="font-[family-name:var(--titres)] text-2xl font-extrabold">Dépannage, prix clair.</p>
            <ul className="space-y-1.5 text-[15px]">
              <li className="flex justify-between gap-3"><span>Déplacement</span><strong className="tabular-nums">{euros(DEPANNAGE.deplacement)} TTC</strong></li>
              <li className="flex justify-between gap-3"><span>Puis la demi-heure</span><strong className="tabular-nums">{euros(DEPANNAGE.demiHeure)} TTC</strong></li>
              <li className="flex justify-between gap-3"><span>Forfait imprimante</span><strong className="tabular-nums">{euros(DEPANNAGE.forfaits[1].prix)} TTC</strong></li>
            </ul>
            <p className="text-sm text-[var(--doux)]">Prix d&apos;exemple. Pas de crédit d&apos;impôt pour le dépannage : on te le dit avant.</p>
            <Link href={`${DOSSIER}/c-est-casse`} className="inline-block font-bold underline underline-offset-4 decoration-[var(--accent)] decoration-[3px]">Tous les prix du dépannage →</Link>
          </div>
        )}
        {porte === "apprendre" && (
          <div className="rounded-[24px] bg-[var(--carte)] border-2 border-[var(--encre)] p-5 space-y-3">
            <p className="font-[family-name:var(--titres)] text-2xl font-extrabold">Des cours, chez toi.</p>
            <p className="text-[15px] leading-relaxed">
              Appeler la famille en vidéo, ranger ses photos, payer en ligne sans stress. Et
              l&apos;installation de ton nouvel ordinateur, logiciels compris.
            </p>
            <p data-credit className="rounded-2xl bg-[#DDF6EC] px-4 py-3 text-sm leading-relaxed text-[#14614E]">
              Crédit d&apos;impôt possible pour les cours et l&apos;installation chez toi, sous
              conditions. Pas pour le dépannage, qui reste une activité secondaire.
            </p>
            <Link href={`${DOSSIER}/cours-a-domicile`} className="inline-block font-bold underline underline-offset-4 decoration-[#1B7A63] decoration-[3px]">Voir les cours →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
