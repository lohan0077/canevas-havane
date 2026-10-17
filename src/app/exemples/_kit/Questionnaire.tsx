"use client";

import { useState } from "react";

export type Question = { question: string; options: { libelle: string; points?: number }[] };
export type Resultat = { min: number; titre: string; texte: string };

/**
 * Quelques questions, une à la fois, et une réponse au bout : la formule qui convient,
 * le diagnostic à prévoir, le cours à suivre. Chaque option rapporte des points ; le
 * résultat retenu est celui dont le seuil `min` est le plus haut atteint.
 * Tout se calcule dans le navigateur.
 */
export default function Questionnaire({
  questions,
  resultats,
  surtitreResultat = "Pour toi",
  mention,
}: {
  questions: Question[];
  resultats: Resultat[];
  surtitreResultat?: string;
  mention?: string;
}) {
  const [reponses, setReponses] = useState<number[]>([]);
  const etape = reponses.length;
  const fini = etape >= questions.length;
  const score = reponses.reduce((total, r, i) => total + (questions[i].options[r].points ?? 0), 0);
  const resultat = [...resultats].sort((a, b) => b.min - a.min).find((r) => score >= r.min) ?? resultats[0];

  return (
    <div className="rounded-[26px] bg-[var(--carte)] border border-[var(--trait)] p-6 sm:p-8 space-y-5">
      <div className="flex gap-1.5" aria-hidden="true">
        {questions.map((q, i) => (
          <span key={q.question} className={`h-1.5 flex-1 rounded-full ${i < etape ? "bg-[var(--accent)]" : "bg-[var(--trait)]"}`} />
        ))}
      </div>
      {!fini ? (
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--doux)]">
            Question {etape + 1} sur {questions.length}
          </p>
          <p className="text-2xl font-[family-name:var(--titres)] font-semibold leading-snug">{questions[etape].question}</p>
          <div className="grid gap-2.5">
            {questions[etape].options.map((o, i) => (
              <button
                key={o.libelle}
                type="button"
                onClick={() => setReponses([...reponses, i])}
                className="rounded-2xl border-2 border-[var(--trait)] bg-[var(--fond)] px-5 py-4 text-left text-lg font-semibold hover:border-[var(--accent)] transition-colors"
              >
                {o.libelle}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div role="status" className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">{surtitreResultat}</p>
          <p className="text-3xl font-[family-name:var(--titres)] font-semibold leading-tight">{resultat.titre}</p>
          <p className="text-lg leading-relaxed">{resultat.texte}</p>
          <button type="button" onClick={() => setReponses([])} className="text-sm font-semibold underline underline-offset-4">
            Recommencer
          </button>
        </div>
      )}
      {mention && <p className="text-xs text-[var(--doux)]">{mention}</p>}
    </div>
  );
}
