"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, EXEMPLES, FORMULE } from "./donnees";

// Une phrase = une seule ponctuation forte, à la fin. Au-delà, on demande d'en garder une.
const nombreDePhrases = (t: string) => t.trim().split(/[.?!…]+(?=\s+\S)/).filter((x) => x.trim()).length;

/**
 * La seule case du site : « Écris ta question, en une phrase. » Le bouton s'allume quand
 * elle est écrite. La question reste dans le navigateur : elle n'est ni envoyée, ni
 * enregistrée, et le site le dit.
 */
export default function CaseQuestion() {
  const [question, setQuestion] = useState("");
  const ecrite = question.trim().length >= 6;
  const phrases = nombreDePhrases(question);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4" data-film="case">
      <label htmlFor="ds-question" className="block text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">
        Trois heures, une question
      </label>
      <h1 className="text-[44px] sm:text-6xl">
        Écris ta question, <span className="italic whitespace-nowrap text-[var(--accent-texte)]">en une phrase.</span>
      </h1>
      <input
        id="ds-question"
        type="text"
        value={question}
        maxLength={140}
        autoComplete="off"
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Celle qui revient le dimanche soir…"
        className="w-full rounded-2xl border-2 border-[var(--trait)] bg-[var(--carte)] px-5 py-4 text-xl text-[var(--encre)] outline-none placeholder:text-[var(--doux)] focus:border-[var(--accent)]"
      />
      <p aria-live="polite" className="min-h-[1.5rem] text-[var(--doux)]">
        {!ecrite ? "Une seule. Celle qui revient." : phrases > 1 ? "Ça fait plusieurs phrases : garde celle qui revient le plus." : "C'est celle-là. On la regarde pendant trois heures."}
      </p>
      <div className="flex flex-wrap gap-2" aria-label="Exemples de questions">
        {EXEMPLES.map((x) => (
          <button key={x} type="button" onClick={() => setQuestion(x)} className="rounded-full border border-[var(--trait)] px-3.5 py-2 text-sm hover:border-[var(--accent)]">
            {x}
          </button>
        ))}
      </div>
      <Link
        href={`${DOSSIER}/reserver`}
        aria-disabled={!ecrite}
        className={`flex min-h-[56px] w-full items-center justify-center rounded-full text-lg font-semibold transition-colors ${ecrite ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "border-2 border-[var(--trait)] text-[var(--encre)]"}`}
      >
        Réserver mes trois séances
      </Link>
      <p className="text-sm">
        {FORMULE.seances} × {FORMULE.duree} · {FORMULE.prix} TTC · prix d&apos;exemple. Ta question reste dans ton
        navigateur : elle n&apos;est ni envoyée, ni enregistrée.
      </p>
    </form>
  );
}
