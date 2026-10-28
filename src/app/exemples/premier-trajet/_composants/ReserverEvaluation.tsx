"use client";

import { useState } from "react";
import { evaluations } from "./donnees";

const LONG: Record<string, string> = { "Sam.": "samedi", "Mar.": "mardi", "Mer.": "mercredi", "Jeu.": "jeudi" };
const enClair = (libelle: string) => {
  const [jour, ...reste] = libelle.split(" ");
  return `${LONG[jour] ?? jour} ${reste.join(" ")}`;
};

/**
 * Le bouton unique de l'accueil : réserver l'évaluation de départ. Le prochain
 * créneau libre est déjà choisi ; un toucher, c'est calé. Rien ne part : la
 * confirmation le dit.
 */
export default function ReserverEvaluation() {
  const libres = evaluations.filter((e) => !e.pris).slice(0, 3);
  const [choix, setChoix] = useState(0);
  const [reserve, setReserve] = useState(false);
  const creneau = libres[choix];

  return (
    <div data-film="carte-evaluation" className="rounded-[28px] bg-[var(--carte)] border border-[var(--trait)] p-5 sm:p-6 space-y-4 shadow-[0_24px_50px_-34px_rgba(21,25,28,0.55)]">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Pour commencer</p>
          <p className="font-[family-name:var(--titres)] text-2xl font-extrabold leading-tight">Ton évaluation de départ</p>
        </div>
        <span className="shrink-0 rounded-full bg-[var(--fond)] border border-[var(--trait)] px-3 py-1 text-xs font-bold">1 h · 45 € TTC</span>
      </div>
      <p className="leading-relaxed text-[var(--doux)]">Au volant, avec un moniteur. On estime tes heures ensemble.</p>

      {reserve ? (
        <div role="status" className="rounded-2xl bg-[var(--sombre)] text-[var(--sur-sombre)] p-5 space-y-1.5">
          <p className="flex items-center gap-2 text-lg font-extrabold">
            <span aria-hidden="true" className="grid place-items-center w-7 h-7 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] text-sm">✓</span>
            Évaluation réservée : {enClair(creneau.libelle)}
          </p>
          <p className="text-sm">Avec {creneau.sous.replace("avec ", "")}. Démonstration : rien n'est envoyé, rien n'est enregistré.</p>
          <button type="button" onClick={() => setReserve(false)} className="text-sm font-semibold underline underline-offset-4">
            Changer de créneau
          </button>
        </div>
      ) : (
        <>
          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold">Prochains créneaux libres</legend>
            <div className="grid grid-cols-3 gap-2">
              {libres.map((c, i) => (
                <button
                  key={c.libelle}
                  type="button"
                  aria-pressed={choix === i}
                  onClick={() => setChoix(i)}
                  className={`rounded-2xl border-2 px-2 py-2.5 text-center transition-colors ${
                    choix === i ? "border-[var(--sombre)] bg-[var(--sombre)] text-[var(--sur-sombre)]" : "border-[var(--trait)] bg-[var(--fond)]"
                  }`}
                >
                  <span className="block font-bold tabular-nums">{c.libelle}</span>
                  <span className="block text-xs">{c.sous}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <button
            type="button"
            data-film="reserver-evaluation"
            onClick={() => setReserve(true)}
            className="w-full rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-4 text-lg font-extrabold"
          >
            Réserver mon évaluation
          </button>
        </>
      )}
    </div>
  );
}
