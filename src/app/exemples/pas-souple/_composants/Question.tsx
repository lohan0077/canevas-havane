"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, REPONSES, type Cle } from "./donnees";

/**
 * L'accueil tient en une question : « Tu touches tes pieds ? ». Trois réponses, aucune
 * mauvaise ; chacune envoie au cours qui lui va. Rien n'est envoyé ni enregistré.
 */
export default function Question() {
  const [cle, setCle] = useState<Cle | null>(null);
  const r = REPONSES.find((x) => x.cle === cle);
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--accent-texte)]">Une seule question</p>
        <h1 className="text-[54px] sm:text-8xl font-light tracking-[-0.03em] leading-[0.98]">
          Tu touches <span className="font-normal text-[var(--accent-texte)]">tes pieds&nbsp;?</span>
        </h1>
      </div>
      <div role="group" aria-label="Ta réponse" className="grid gap-2.5 sm:grid-cols-3">
        {REPONSES.map((x) => (
          <button
            key={x.cle}
            type="button"
            data-reponse={x.cle}
            aria-pressed={cle === x.cle}
            onClick={() => setCle(x.cle)}
            className={`rounded-full border px-6 py-4 text-left text-lg font-semibold transition-colors ${
              cle === x.cle ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[var(--trait)] bg-[var(--carte)]"
            }`}
          >
            {x.libelle}
          </button>
        ))}
      </div>
      <p className="text-[var(--doux)]">Aucune mauvaise réponse.</p>

      {r && (
        <div data-film="resultat" aria-live="polite" className="rounded-[30px] bg-[var(--sombre)] p-6 sm:p-8 text-[var(--sur-sombre)] space-y-4 scroll-mt-24">
          <p className="font-[family-name:var(--titres)] text-3xl font-light">{r.titre}</p>
          <div className="space-y-1">
            <p className="text-sm font-semibold uppercase tracking-[0.18em]">Pour toi</p>
            <p className="font-[family-name:var(--titres)] text-5xl">Cours {r.cours}</p>
          </div>
          <ul className="space-y-2 text-lg">
            {[r.quand, ...r.details].map((d) => (
              <li key={d} className="flex gap-3"><span aria-hidden="true">✓</span>{d}</li>
            ))}
          </ul>
          <Link href={`${DOSSIER}/planning`} className="flex justify-center rounded-full bg-[var(--sur-sombre)] px-6 py-4 text-lg font-semibold text-[var(--sombre)]">
            Réserver ma place
          </Link>
          <p className="text-sm">Exemple : horaires et cours du studio fictif. Ta réponse n'est enregistrée nulle part.</p>
        </div>
      )}
    </div>
  );
}
