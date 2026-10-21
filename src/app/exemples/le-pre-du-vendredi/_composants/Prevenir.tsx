"use client";

import { useState } from "react";
import { PROCHAINE } from "./donnees";

/**
 * Quand tout est parti : pas « épuisé », mais la date suivante, et de quoi être
 * prévenu. Le visiteur donne lui-même son numéro, pour ce seul message. Rien ne
 * quitte le navigateur : c'est une démonstration, et la confirmation le dit.
 */
export default function Prevenir({ titre, detail, id }: { titre?: React.ReactNode; detail: string; id?: string }) {
  const [numero, setNumero] = useState("");
  const [fait, setFait] = useState(false);
  const [erreur, setErreur] = useState(false);
  const valide = numero.replace(/\D/g, "").length === 10;

  return (
    <div id={id} className="rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-6 sm:p-8 space-y-5">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--doux)]">{detail}</p>
      <p className="font-[family-name:var(--titres)] text-5xl leading-[1.02]">{titre ?? <>Tout est <span className="italic text-[var(--accent-texte)]">parti.</span></>}</p>
      <p className="text-lg">
        Prochaine découpe : <strong className="font-semibold">{PROCHAINE.date}.</strong>
      </p>
      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (!valide) return setErreur(true);
          setErreur(false);
          setFait(true);
        }}
      >
        <label className="block space-y-2">
          <span className="text-sm font-semibold">Ton portable</span>
          <input
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="06 39 98 00 00"
            value={numero}
            readOnly={fait}
            onChange={(e) => setNumero(e.target.value)}
            className="w-full rounded-2xl border border-[var(--trait)] bg-[var(--fond)] px-4 py-3.5 text-lg tabular-nums outline-none placeholder:text-[var(--doux)] focus:border-[var(--accent)]"
          />
        </label>
        {fait ? (
          <div role="status" className="rounded-2xl border-2 border-[var(--accent)] p-4 space-y-1">
            <p className="font-semibold">C&apos;est noté : on te prévient.</p>
            <p className="text-sm text-[var(--doux)]">
              Un SMS le {PROCHAINE.ouverture}, quand les réservations ouvrent. Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.
            </p>
          </div>
        ) : (
          <button type="submit" className="w-full rounded-full bg-[var(--accent)] px-6 py-4 text-lg font-semibold text-[var(--sur-accent)]">
            Prévenez-moi
          </button>
        )}
        {erreur && <p role="alert" className="text-sm font-semibold text-[var(--accent-texte)]">Un numéro à dix chiffres, pour qu&apos;on puisse t&apos;écrire.</p>}
        <p className="text-sm text-[var(--doux)]">
          Un seul message, le jour où les réservations ouvrent. Rien d&apos;autre, et ton numéro est effacé ensuite.
        </p>
      </form>
    </div>
  );
}
