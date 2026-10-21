"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, PRESTATIONS, PROFILS, euros, formaterPlaque, plaqueComplete, profilDe } from "./donnees";

/**
 * Tu tapes ta plaque ; le site reconnaît ta voiture et t'affiche le prix de la vidange.
 * Démonstration : aucun fichier n'est interrogé, la plaque ne quitte pas le
 * navigateur, et le modèle reconnu est un exemple sans marque.
 */
export default function Plaque() {
  const [plaque, setPlaque] = useState("");
  const complete = plaqueComplete(plaque);
  const categorie = complete ? profilDe(plaque) : null;
  const vidange = PRESTATIONS[0];

  return (
    <div data-film="plaque" className="rounded-[28px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-7 space-y-5">
      <label className="block space-y-3">
        <span className="block font-[family-name:var(--titres)] text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">Ta plaque</span>
        <span className="flex h-[72px] overflow-hidden rounded-xl border-[3px] border-[var(--encre)] bg-[var(--encre)]">
          <span aria-hidden="true" className="grid w-12 shrink-0 place-items-center bg-[#1F3F99] text-white">
            <span className="text-[9px] leading-none tracking-[2px]">✦✦✦</span>
            <span className="font-[family-name:var(--titres)] text-xl font-bold leading-none">F</span>
          </span>
          <input
            type="text"
            inputMode="text"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            placeholder="AA-123-AA"
            size={9}
            value={plaque}
            onChange={(e) => setPlaque(formaterPlaque(e.target.value))}
            aria-describedby="ml-plaque-aide"
            className="w-0 min-w-0 flex-1 bg-[var(--encre)] px-3 text-center font-[family-name:var(--titres)] text-[34px] font-bold uppercase tracking-[0.08em] text-[var(--fond)] placeholder:text-[#5B6168] outline-none"
          />
        </span>
      </label>

      {categorie ? (
        <div aria-live="polite" className="space-y-4">
          <div className="flex items-center gap-3 rounded-2xl border border-[var(--trait)] bg-[var(--fond)] p-4">
            <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-lg font-bold text-[var(--sur-accent)]">✓</span>
            <span>
              <span className="block font-[family-name:var(--titres)] text-xl font-bold">{PROFILS[categorie].titre}</span>
              <span className="block text-[var(--doux)]">{PROFILS[categorie].detail} · reconnue, exemple</span>
            </span>
          </div>
          <div id="prix-vidange" className="rounded-2xl bg-[var(--accent)] p-5 text-[var(--sur-accent)]">
            <p className="font-semibold">{vidange.nom}</p>
            <p className="font-[family-name:var(--titres)] text-5xl font-bold tracking-tight">{euros(vidange.prix[categorie])}</p>
            <p className="text-sm font-medium">Pièces et main-d'œuvre comprises · {vidange.duree} · prix d'exemple</p>
          </div>
          <ul className="divide-y divide-[var(--trait)]">
            {PRESTATIONS.slice(1, 4).map((p) => (
              <li key={p.id} className="flex items-baseline justify-between gap-4 py-2.5">
                <span>{p.nom}</span>
                <span className="font-[family-name:var(--titres)] font-bold whitespace-nowrap">{euros(p.prix[categorie])}</span>
              </li>
            ))}
          </ul>
          <Link href={`${DOSSIER}/rendez-vous`} className="flex justify-center rounded-full bg-[var(--encre)] px-6 py-4 font-[family-name:var(--titres)] text-lg font-bold text-[var(--fond)]">
            Choisir mon créneau
          </Link>
        </div>
      ) : (
        <div id="ml-plaque-aide" className="space-y-3">
          <p className="text-[var(--doux)]">Le site trouve ta voiture et le prix de la vidange. Format : AB-123-CD.</p>
          <button type="button" onClick={() => setPlaque("AB-123-CD")} className="rounded-full border border-[var(--trait)] px-4 py-2 text-sm font-semibold">
            Essayer avec AB-123-CD
          </button>
        </div>
      )}
      <p className="text-sm text-[var(--doux)]">Démonstration : la plaque ne quitte pas ton téléphone, aucun fichier n'est interrogé.</p>
    </div>
  );
}
