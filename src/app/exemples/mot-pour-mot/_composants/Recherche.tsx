"use client";

import { useState } from "react";
import { questions } from "./donnees";

const SUGGESTIONS = [
  { texte: "courtier immobilier comment sont ils payés", question: 0 },
  { texte: "courtier immobilier et si la banque refuse", question: 2 },
  { texte: "courtier immobilier démarchage téléphone", question: 3 },
  { texte: "courtier immobilier phrase obligatoire", question: 1 },
];

const normaliser = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

/**
 * Les questions telles qu'on les tape : une barre de recherche, des suggestions, et la
 * réponse du cabinet. La première suggestion reprend une recherche Google relevée le
 * 15/10/2026 (« courtier immobilier comment sont ils payés ») ; les autres sont des
 * formulations d'exemple. Tout se passe dans le navigateur.
 */
export default function Recherche() {
  const [saisie, setSaisie] = useState("courtier immobilier ");
  const [choisie, setChoisie] = useState<number | null>(null);
  const visibles = SUGGESTIONS.filter((s) => normaliser(s.texte).includes(normaliser(saisie.trim())) || !saisie.trim());
  const reponse = choisie === null ? null : questions[SUGGESTIONS[choisie].question];

  return (
    <div data-film="recherche" className="space-y-4">
      <label className="flex items-center gap-3 rounded-full border-2 border-[var(--encre)] bg-[var(--fond)] px-5 py-3">
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
          <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
          <path d="M15.5 15.5 21 21" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        <span className="sr-only">Ta question</span>
        <input
          value={saisie}
          onChange={(e) => {
            setSaisie(e.target.value);
            setChoisie(null);
          }}
          className="min-w-0 flex-1 bg-transparent text-[16px] outline-none"
        />
      </label>
      <ul className="overflow-hidden rounded-[20px] border border-[var(--trait)]">
        {visibles.map((s) => {
          const i = SUGGESTIONS.indexOf(s);
          return (
            <li key={s.texte} className="border-b border-[var(--trait)] last:border-0">
              <button
                type="button"
                data-film={`suggestion-${i}`}
                aria-pressed={choisie === i}
                onClick={() => setChoisie(i)}
                className={`w-full px-5 py-3.5 text-left text-[16px] ${choisie === i ? "bg-[var(--carte)] font-semibold" : ""}`}
              >
                {s.texte}
              </button>
            </li>
          );
        })}
        {visibles.length === 0 && <li className="px-5 py-3.5 text-[15px] text-[var(--doux)]">Aucune suggestion : pose-la au rendez-vous.</li>}
      </ul>
      <div aria-live="polite">
        {reponse && (
          <div className="space-y-2 rounded-[20px] bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]">
            <p className="text-[18px] font-semibold">{reponse.q}</p>
            <p className="text-[15px] leading-relaxed text-[#E4E4E7]">{reponse.r}</p>
          </div>
        )}
      </div>
    </div>
  );
}
