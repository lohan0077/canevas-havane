"use client";

import { useState } from "react";
import { EXPLICATIONS } from "./donnees";

/** « Tu peux répéter ? » Trois façons d'expliquer la même chose, et pas un soupir. */
export default function TroisFois() {
  const [fois, setFois] = useState(1);
  const fin = fois > EXPLICATIONS.length;
  return (
    <div data-film="trois-fois" className="rounded-[32px] bg-[var(--carte)] border border-[var(--trait)] p-6 sm:p-8 space-y-5">
      <div className="flex items-center gap-2" aria-hidden="true">
        {EXPLICATIONS.map((_, i) => (
          <span key={i} className={`h-3 flex-1 rounded-full transition-colors ${i < fois ? "bg-[var(--accent)]" : "bg-[var(--trait)]"}`} />
        ))}
      </div>
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent-texte)]" aria-live="polite">
        {fin ? "Et une quatrième, si tu veux" : `${fois} fois sur 3`}
      </p>
      <p className="font-[family-name:var(--titres)] text-2xl sm:text-3xl font-semibold leading-snug min-h-[6.5em]">
        {fin ? "Sans soupirer. On recommence quand tu veux." : EXPLICATIONS[fois - 1]}
      </p>
      <button
        type="button"
        onClick={() => setFois(fin ? 1 : fois + 1)}
        className="w-full rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 py-4 text-lg font-bold"
      >
        {fin ? "Recommencer" : "Tu peux répéter ?"}
      </button>
    </div>
  );
}
