"use client";

import { useState } from "react";
import { GOUTER } from "./donnees";

const APPAREILS = ["Une tablette", "Un téléphone", "Un ordinateur portable"];

/**
 * L'inscription au goûter numérique : gratuite, juste pour prévoir les chaises et le
 * thé. Un prénom, un appareil. Rien n'est envoyé : la démonstration le dit.
 */
export default function Inscription() {
  const [prenom, setPrenom] = useState("");
  const [appareil, setAppareil] = useState<string | null>(null);
  const [envoye, setEnvoye] = useState(false);
  const [erreur, setErreur] = useState(false);
  if (envoye) {
    return (
      <div role="status" className="rounded-[28px] bg-[var(--carte)] border-2 border-[var(--accent)] p-6 space-y-2">
        <p className="font-[family-name:var(--titres)] text-3xl font-bold">À samedi, {prenom.trim()}&nbsp;!</p>
        <p className="text-lg">On t&apos;attend {GOUTER.date}, {GOUTER.heure}, avec {appareil?.toLowerCase()}.</p>
        <p className="text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
        <button type="button" onClick={() => setEnvoye(false)} className="font-semibold underline underline-offset-4">Modifier</button>
      </div>
    );
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!prenom.trim() || !appareil) return setErreur(true);
        setEnvoye(true);
      }}
      className="rounded-[28px] bg-[var(--carte)] border border-[var(--trait)] p-6 space-y-5"
    >
      <div className="space-y-2">
        <label htmlFor="ss-prenom" className="block text-lg font-bold">Ton prénom</label>
        <input
          id="ss-prenom"
          type="text"
          autoComplete="off"
          value={prenom}
          onChange={(e) => {
            setPrenom(e.target.value);
            setErreur(false);
          }}
          className="w-full rounded-2xl border-2 border-[var(--trait)] bg-[var(--fond)] px-4 py-3.5 text-lg focus:border-[var(--sombre)] outline-none"
        />
      </div>
      <fieldset className="space-y-2">
        <legend className="text-lg font-bold mb-2">Tu viens avec…</legend>
        <div className="grid gap-2">
          {APPAREILS.map((a) => (
            <button
              key={a}
              type="button"
              aria-pressed={appareil === a}
              onClick={() => {
                setAppareil(a);
                setErreur(false);
              }}
              className={`rounded-2xl border-2 px-4 py-3.5 text-left text-lg font-semibold ${appareil === a ? "border-[var(--sombre)] bg-[var(--sombre)] text-[var(--sur-sombre)]" : "border-[var(--trait)] bg-[var(--fond)]"}`}
            >
              {a}
            </button>
          ))}
        </div>
      </fieldset>
      {erreur && <p role="alert" className="rounded-2xl bg-[#FBE6E2] px-4 py-3 font-semibold text-[#9B2C1F]">Il manque ton prénom ou ton appareil.</p>}
      <button type="submit" className="w-full rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-4 text-lg font-bold">Je viens, c&apos;est gratuit</button>
    </form>
  );
}
