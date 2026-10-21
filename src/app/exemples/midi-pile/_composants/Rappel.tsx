"use client";

import { useState } from "react";

const SUJETS = ["Un devis pour des panneaux solaires", "Une question sur ma journée solaire"];

/**
 * La demande de rappel. Pour ces travaux, un professionnel n'appelle que celui qui l'a
 * demandé, dans les cinq jours ouvrables, et seulement pour ce qu'il a demandé
 * (C. consom., art. R223-4) : la case à cocher garde la trace de la demande, le sujet
 * borne l'appel. Démonstration : rien n'est envoyé.
 */
export default function Rappel() {
  const [tel, setTel] = useState("");
  const [sujet, setSujet] = useState(0);
  const [accord, setAccord] = useState(false);
  const [erreur, setErreur] = useState("");
  const [pret, setPret] = useState(false);

  const envoyer = (e: React.FormEvent) => {
    e.preventDefault();
    const chiffres = tel.replace(/\D/g, "");
    if (chiffres.length !== 10 || !chiffres.startsWith("0")) return setErreur("Indique un numéro à 10 chiffres, par exemple 06 39 98 00 00.");
    if (!accord) return setErreur("Coche la case : sans ta demande, on n'a pas le droit de t'appeler.");
    setErreur("");
    setPret(true);
  };

  return (
    <div>
      {pret && (
      <div role="status" data-film="rappel-confirme" className="rounded-[28px] bg-[var(--carte)] border-2 border-[var(--accent)] p-6 space-y-3">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Demande prête</p>
        <p className="font-[family-name:var(--titres)] text-[28px] leading-tight font-semibold">Rappel sous 5 jours ouvrables.</p>
        <p>
          Au {tel}, au sujet de : <strong>{SUJETS[sujet].toLowerCase()}</strong>. Et de rien d'autre.
        </p>
        <p className="text-sm text-[var(--doux)]">Démonstration : rien n'est envoyé, rien n'est enregistré.</p>
        <button type="button" onClick={() => { setPret(false); setAccord(false); }} className="text-sm font-semibold underline underline-offset-4">
          Modifier ma demande
        </button>
      </div>
      )}
      {/* Le formulaire reste dans la page, caché, une fois la demande prête. */}
    <form onSubmit={envoyer} noValidate hidden={pret} data-film="rappel" className="rounded-[28px] bg-[var(--carte)] border border-[var(--trait)] p-5 sm:p-7 space-y-5">
      <label className="block space-y-2">
        <span className="text-sm font-bold">Ton téléphone</span>
        <input
          id="telephone"
          type="tel"
          inputMode="tel"
          autoComplete="off"
          placeholder="06 39 98 00 00"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          className="w-full h-14 rounded-2xl border-2 border-[var(--trait)] bg-[var(--fond)] px-4 text-lg tabular-nums placeholder:text-[var(--doux)] focus:border-[var(--encre)] outline-none"
        />
      </label>
      <fieldset className="space-y-2">
        <legend className="text-sm font-bold mb-2">L'appel portera sur</legend>
        {SUJETS.map((s, i) => (
          <label key={s} className="flex items-center gap-3 rounded-2xl border-2 border-[var(--trait)] px-4 py-3 has-[:checked]:border-[var(--encre)]">
            <input type="radio" name="sujet" checked={sujet === i} onChange={() => setSujet(i)} className="h-5 w-5 accent-[var(--sombre)]" />
            <span>{s}</span>
          </label>
        ))}
      </fieldset>
      <label className="flex items-start gap-3 rounded-2xl bg-[var(--fond)] p-4">
        <input id="accord" type="checkbox" checked={accord} onChange={(e) => setAccord(e.target.checked)} className="mt-0.5 h-6 w-6 shrink-0 accent-[var(--sombre)]" />
        <span className="font-semibold leading-snug">Je souhaite être rappelé à ce numéro, au sujet de cette demande uniquement.</span>
      </label>
      {erreur && <p role="alert" className="rounded-2xl border-2 border-[var(--encre)] px-4 py-3 text-sm font-semibold">{erreur}</p>}
      <button type="submit" className="w-full h-14 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] text-lg font-bold">
        Envoyer ma demande
      </button>
      <p className="text-xs text-[var(--doux)] leading-relaxed">
        Sur un vrai site, ta demande servirait seulement à te rappeler, et sa trace serait gardée trois ans, comme l'exige le code de la consommation. Ici, c'est une démonstration : rien n'est envoyé.
      </p>
    </form>
    </div>
  );
}
