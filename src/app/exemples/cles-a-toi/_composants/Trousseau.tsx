"use client";

import { useState } from "react";
import Anneau from "./Anneau";
import { CLES, PERMIS } from "./donnees";

/**
 * Le trousseau de l'élève, en démonstration : une clé par étape. Sur le vrai site,
 * le moniteur allume chaque clé ; ici, on touche l'étape pour voir. La dernière, le
 * permis, ne s'allume qu'une fois les quatre autres allumées. Rien n'est enregistré.
 */
export default function Trousseau() {
  const [allumees, setAllumees] = useState<string[]>([]);
  const [permis, setPermis] = useState(false);
  const restantes = CLES.length - allumees.length;

  const basculer = (id: string) => {
    if (permis) return;
    setAllumees((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));
  };

  return (
    <div data-film="trousseau" className="rounded-[32px] bg-[var(--carte)] border border-[var(--trait)] p-5 sm:p-8 space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[var(--accent-texte)]">Le trousseau de Léa</p>
          <p className="font-[family-name:var(--titres)] text-2xl font-bold tabular-nums">
            {allumees.length + (permis ? 1 : 0)} clé{allumees.length + (permis ? 1 : 0) > 1 ? "s" : ""} sur 5
          </p>
        </div>
        <span className="rounded-full border border-[var(--trait)] px-3 py-1 text-xs font-semibold">Exemple</span>
      </div>

      <div data-film="anneau" className="mx-auto max-w-[300px] sm:max-w-[380px]">
        <Anneau allumees={allumees} permis={permis} />
      </div>

      <ul className="grid grid-cols-2 gap-2.5">
        {CLES.map((c, i) => {
          const allumee = allumees.includes(c.id);
          return (
            <li key={c.id}>
              <button
                type="button"
                data-cle={c.id}
                aria-pressed={allumee}
                onClick={() => basculer(c.id)}
                className={`w-full h-full text-left rounded-2xl border-2 px-4 py-3 transition-colors ${
                  allumee ? "border-[var(--encre)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[var(--trait)] bg-[var(--fond)]"
                }`}
              >
                <span className="block font-[family-name:var(--titres)] text-xs font-bold uppercase tracking-[0.12em]">Clé {i + 1}</span>
                <span className="block font-[family-name:var(--titres)] text-lg font-bold leading-tight">{c.nom}</span>
                <span className="block text-sm">{allumee ? `Allumée · ${c.date}` : "À venir"}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className={`rounded-2xl p-5 space-y-3 ${permis ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "bg-[var(--fond)] border-2 border-dashed border-[var(--doux)]"}`}>
        {permis ? (
          <div role="status" className="space-y-1">
            <p className="font-[family-name:var(--titres)] text-xs font-bold uppercase tracking-[0.14em] text-[var(--accent)]">Clé 5 · {PERMIS.nom}</p>
            <p className="font-[family-name:var(--titres)] text-3xl font-bold leading-tight">Obtenu. Les clés sont à toi.</p>
            <p className="text-sm">Démonstration : sur le vrai site, c'est ton moniteur qui allume chaque clé. Rien n'est enregistré.</p>
          </div>
        ) : (
          <>
            <div>
              <p className="font-[family-name:var(--titres)] text-xs font-bold uppercase tracking-[0.14em]">Clé 5 · la dernière</p>
              <p className="font-[family-name:var(--titres)] text-xl font-bold">{PERMIS.nom}</p>
              <p className="text-sm text-[var(--doux)]">{PERMIS.detail}</p>
            </div>
            <button
              type="button"
              data-film="allumer-permis"
              disabled={restantes > 0}
              onClick={() => setPermis(true)}
              className="w-full rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 py-4 font-[family-name:var(--titres)] text-lg font-bold disabled:bg-[var(--carte)] disabled:text-[var(--doux)] disabled:border-2 disabled:border-[var(--trait)]"
            >
              {restantes > 0 ? `Encore ${restantes} clé${restantes > 1 ? "s" : ""} à allumer` : "C'est le jour du permis"}
            </button>
          </>
        )}
      </div>
      <p className="text-sm text-[var(--doux)]">Démonstration : touche une étape pour allumer sa clé.</p>
    </div>
  );
}
