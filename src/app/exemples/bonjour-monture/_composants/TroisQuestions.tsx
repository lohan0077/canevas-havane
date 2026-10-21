"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, QUESTIONS, plateauPour, type Choix } from "./donnees";
import Lunettes from "./Lunettes";

/**
 * Les trois questions d'avant l'essayage, toutes visibles d'un coup : on touche une
 * réponse par ligne. Une fois les trois données, l'aperçu du plateau apparaît. Les
 * réponses ne quittent pas le navigateur ; le bouton les passe à la page d'essayage
 * dans l'adresse (ce sont des goûts, pas des données personnelles).
 */
export default function TroisQuestions({
  choix: choixExterne,
  changer: changerExterne,
  avecBouton = true,
}: {
  choix?: Choix;
  changer?: (c: Choix) => void;
  avecBouton?: boolean;
}) {
  const [interne, setInterne] = useState<Choix>({});
  const choix = choixExterne ?? interne;
  const changer = changerExterne ?? setInterne;
  const nombre = QUESTIONS.filter((q) => choix[q.id]).length;
  const complet = nombre === QUESTIONS.length;
  const requete = new URLSearchParams(Object.entries(choix).filter(([, v]) => v) as [string, string][]).toString();

  return (
    <div className="space-y-5" data-film="trois-questions">
      <ol className="space-y-4">
        {QUESTIONS.map((q, i) => (
          <li key={q.id} className="space-y-2.5">
            <p className="flex items-baseline gap-3">
              <span className="text-xs font-bold tabular-nums text-[var(--accent-texte)]">0{i + 1}</span>
              <span className="font-[family-name:var(--titres)] text-[1.55rem] leading-tight">{q.question}</span>
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-label={q.question}>
              {q.reponses.map((r) => {
                const actif = choix[q.id] === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    aria-pressed={actif}
                    data-film={`${q.id}-${r.id}`}
                    onClick={() => changer({ ...choix, [q.id]: r.id })}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-[15px] font-semibold transition-colors ${
                      actif
                        ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]"
                        : "border-[var(--trait)] bg-[var(--carte)] text-[var(--encre)] hover:border-[var(--accent)]"
                    }`}
                  >
                    {r.pastille && <span aria-hidden="true" className="h-4 w-4 rounded-full ring-2 ring-white" style={{ background: r.pastille }} />}
                    {r.libelle}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      <div className="rounded-2xl border border-[var(--trait)] bg-[var(--carte)] p-4" aria-live="polite">
        {complet ? (
          <div className="space-y-3">
            <p className="text-sm font-semibold">Ton plateau : douze montures, choisies d&apos;après tes réponses.</p>
            <ul className="grid grid-cols-6 gap-1.5" aria-hidden="true">
              {plateauPour(choix).map((m) => (
                <li key={m.id} className="rounded-md bg-[var(--fond)] px-1 py-1.5">
                  <Lunettes forme={m.forme} couleur={m.couleur} className="w-full" />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-[var(--doux)]">
            {nombre === 0 ? "Trois réponses, et on prépare douze montures pour toi." : `Encore ${QUESTIONS.length - nombre} réponse${QUESTIONS.length - nombre > 1 ? "s" : ""}.`}
          </p>
        )}
      </div>

      {avecBouton && (
        <Link
          href={`${DOSSIER}/essayage${requete ? `?${requete}` : ""}`}
          data-film="reserver-essayage"
          className="flex min-h-14 w-full items-center justify-center rounded-full bg-[var(--accent)] px-6 text-lg font-bold text-[var(--sur-accent)]"
        >
          Réserver mon essayage
        </Link>
      )}
    </div>
  );
}
