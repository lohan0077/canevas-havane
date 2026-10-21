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
    <div id="rappel-livraison" className="mx-auto max-w-md rounded-[28px] bg-[var(--carte)] p-6 text-[var(--encre)] shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] space-y-5">
      <div className="space-y-1">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Livré · {RAPPEL.livre}</p>
        <p className="text-lg font-bold">{RAPPEL.gateau}, {RAPPEL.parts} parts, pour les {RAPPEL.age} ans de {RAPPEL.prenom}.</p>
      </div>
      <p className="font-[family-name:var(--titres)] text-3xl font-extrabold leading-tight">On vous le rappelle l&apos;an prochain&nbsp;?</p>
      {repondu ? (
        <div role="status" className="rounded-2xl border-2 border-[var(--accent)] p-4 space-y-1">
          <p className="font-bold">
            {repondu === "oui" ? `C'est noté : un seul message, ${RAPPEL.message}, avant ses ${RAPPEL.age + 1} ans.` : "C'est noté : aucun message. Bon anniversaire à " + RAPPEL.prenom + "."}
          </p>
          <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setRepondu(oui ? "oui" : "non");
          }}
        >
          <label className="flex items-start gap-3 rounded-2xl border-2 border-[var(--trait)] p-4">
            <input id="case-rappel" type="checkbox" checked={oui} onChange={(e) => setOui(e.target.checked)} className="mt-1 h-6 w-6 shrink-0 accent-[var(--accent)]" />
            <span>
              <span className="block font-bold">Oui, rappelez-moi un mois avant ses {RAPPEL.age + 1} ans.</span>
              <span className="block text-sm text-[var(--doux)]">Un message par an, par e-mail. Un lien pour ne plus rien recevoir.</span>
            </span>
          </label>
          <button type="submit" className="w-full rounded-full bg-[var(--accent)] px-6 py-3.5 text-lg font-extrabold text-[var(--sur-accent)]">
            Valider
          </button>
          <p className="text-xs text-[var(--doux)]">Case jamais pré-cochée. Sans rien cocher, on ne vous écrira pas.</p>
        </form>
      )}
    </div>
  );
}
