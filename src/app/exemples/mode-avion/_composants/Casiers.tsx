"use client";

import { useState } from "react";

const OCCUPES = new Set([0, 2, 3, 6, 8, 9, 11]);

/**
 * Le mur de casiers de l'entrée : tu choisis un casier libre, tu y poses ton
 * téléphone, la porte se ferme pour une heure. Démonstration : rien n'est enregistré.
 */
export default function Casiers() {
  const [choisi, setChoisi] = useState<number | null>(null);
  const [ferme, setFerme] = useState(false);
  return (
    <div className="rounded-[30px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-7 space-y-5">
      <p className="font-[family-name:var(--titres)] text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">✈ Casiers · entrée</p>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 12 }, (_, k) => {
          const occupe = OCCUPES.has(k) || (ferme && choisi === k);
          const actif = choisi === k;
          return (
            <button
              key={k}
              type="button"
              disabled={OCCUPES.has(k) || ferme}
              aria-pressed={actif}
              aria-label={`Casier ${k + 1} : ${OCCUPES.has(k) ? "occupé" : actif && ferme ? "fermé, ton téléphone est dedans" : "libre"}`}
              onClick={() => setChoisi(k)}
              className={`relative aspect-[3/4] rounded-xl border-2 text-left p-2 transition-colors ${
                occupe ? "border-[var(--fond)] bg-[var(--fond)] text-[var(--doux)]" : actif ? "border-[var(--accent)] bg-[var(--sombre)] text-[var(--sur-sombre)]" : "border-dashed border-[var(--doux)] bg-[var(--carte)]"
              }`}
            >
              <span className="block font-[family-name:var(--titres)] text-sm font-semibold">{k + 1}</span>
              <span className="absolute bottom-2 left-2 text-xs font-semibold">{OCCUPES.has(k) || (actif && ferme) ? "fermé" : actif ? "le tien" : "libre"}</span>
            </button>
          );
        })}
      </div>
      {choisi === null ? (
        <p className="text-[var(--doux)]">Touche un casier libre.</p>
      ) : ferme ? (
        <div role="status" className="rounded-2xl bg-[var(--sombre)] p-4 text-[var(--sur-sombre)] space-y-1">
          <p className="font-[family-name:var(--titres)] text-xl font-semibold">Casier {choisi + 1} fermé, pour une heure.</p>
          <p className="text-sm">Ton téléphone t'attend. En cas d'urgence, on appelle l'accueil. Démonstration : rien n'est enregistré.</p>
          <button type="button" onClick={() => { setFerme(false); setChoisi(null); }} className="text-sm font-semibold underline underline-offset-4">Rouvrir</button>
        </div>
      ) : (
        <button type="button" onClick={() => setFerme(true)} className="w-full rounded-full bg-[var(--accent)] px-6 py-4 font-[family-name:var(--titres)] text-lg font-semibold text-[var(--sur-accent)]">
          Fermer le casier {choisi + 1}
        </button>
      )}
    </div>
  );
}
