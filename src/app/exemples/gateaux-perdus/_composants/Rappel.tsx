"use client";

import { useState } from "react";
import { RAPPEL } from "./donnees";

/**
 * À la livraison, une seule question : « On vous le rappelle l'an prochain ? ». La
 * case n'est jamais cochée d'avance ; on peut dire non. Rien n'est envoyé.
 */
export default function Rappel() {
  const [oui, setOui] = useState(false);
  const [repondu, setRepondu] = useState<"oui" | "non" | null>(null);
  return (
    <div id="rappel-livraison" className="scroll-mt-24 space-y-5 rounded-[2rem] bg-[var(--carte)] p-6 text-[var(--encre)] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Livré · {RAPPEL.livre}</p>
          <p className="text-lg font-bold">{RAPPEL.gateau}, {RAPPEL.parts} parts, pour les {RAPPEL.age} ans de {RAPPEL.prenom}.</p>
        </div>
        <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#E9B7C0] font-[family-name:var(--titres)] text-xl">{RAPPEL.age}</span>
      </div>
      <p className="font-[family-name:var(--titres)] text-[2rem] leading-[1.05]">On vous le rappelle l&apos;an prochain&nbsp;?</p>
      {repondu ? (
        <div role="status" className="space-y-1 rounded-2xl bg-[#F3D88A] p-4">
          <p className="font-bold">
            {repondu === "oui" ? `C'est noté : un seul message, ${RAPPEL.message}, avant ses ${RAPPEL.age + 1} ans.` : "C'est noté : aucun message. Bon anniversaire à " + RAPPEL.prenom + "."}
          </p>
          <p className="text-sm">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setRepondu(oui ? "oui" : "non");
          }}
        >
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-[var(--trait)] p-4 has-[:checked]:border-[var(--encre)]">
            <input id="case-rappel" type="checkbox" checked={oui} onChange={(e) => setOui(e.target.checked)} className="mt-1 h-6 w-6 shrink-0 accent-[#3D1D13]" />
            <span>
              <span className="block font-bold">Oui, rappelez-moi un mois avant ses {RAPPEL.age + 1} ans.</span>
              <span className="block text-sm text-[var(--doux)]">Un message par an. Un lien pour ne plus rien recevoir.</span>
            </span>
          </label>
          <button type="submit" className="w-full rounded-full bg-[var(--encre)] px-6 py-3.5 text-lg font-bold text-[var(--fond)]">
            Valider
          </button>
          <p className="text-[13px] text-[var(--doux)]">Case jamais pré-cochée. Sans rien cocher, on ne vous écrira pas.</p>
        </form>
      )}
    </div>
  );
}
