"use client";

import { useState } from "react";
import { ANNEE, PRISES, SEMAINES, lundi } from "./donnees";

const jourMois = (d: Date) =>
  d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" });

/**
 * Le planning des chantiers de la saison : chaque semaine libre se choisit et se
 * bloque en ligne (pré-réservée, confirmée après la visite technique). Rien n'est
 * envoyé : c'est une démonstration, et le site le dit.
 */
export default function Creneaux() {
  const [choisie, setChoisie] = useState<number | null>(null);
  const [bloquee, setBloquee] = useState(false);

  return (
    <div className="space-y-6" data-film="planning">
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6" data-film="semaines">
        {SEMAINES.map((sem) => {
          const prise = PRISES.has(sem);
          const active = choisie === sem;
          return (
            <button
              key={sem}
              type="button"
              disabled={prise || bloquee}
              aria-pressed={active}
              data-semaine={sem}
              onClick={() => setChoisie(sem)}
              className={`rounded-[1.4rem] border-2 px-2 py-4 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                active
                  ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--sur-accent)]"
                  : prise
                    ? "cursor-not-allowed border-white/10 bg-[#0A2A39] text-[var(--sur-sombre)]"
                    : "cursor-pointer border-white/30 bg-[var(--sombre)] text-[var(--sur-sombre)] hover:border-[var(--accent)]"
              }`}
            >
              <span className="block text-[12px] font-bold uppercase tracking-[0.1em]">Semaine</span>
              <span className="block font-[family-name:var(--titres)] text-3xl font-bold leading-tight tabular-nums">{sem}</span>
              <span className="block text-[13px]">{jourMois(lundi(ANNEE, sem))}</span>
              <span className={`mt-2 block text-[12px] font-bold uppercase tracking-[0.08em] ${prise && !active ? "line-through" : ""}`}>
                {active ? "Choisie" : prise ? "Réservée" : "Libre"}
              </span>
            </button>
          );
        })}
      </div>

      <p data-film="dates-exemple" className="text-[15px]">
        Dates d&apos;exemple. Sur un vrai site, ce calendrier suit le planning réel de
        l&apos;entreprise, mis à jour à chaque signature.
      </p>

      {choisie !== null && (
        <div data-film="ma-semaine" className="space-y-5 rounded-[2rem] bg-[var(--carte)] p-6 text-[var(--encre)] sm:p-8">
          <p className="font-[family-name:var(--titres)] text-sm font-bold uppercase tracking-[0.14em] text-[var(--doux)]">Saison {ANNEE}</p>
          <p className="font-[family-name:var(--titres)] text-3xl font-bold sm:text-4xl">Ta date de chantier</p>
          <p className="text-lg text-[var(--doux)]">
            Semaine {choisie} · à partir du{" "}
            {lundi(ANNEE, choisie).toLocaleDateString("fr-FR", { day: "numeric", month: "long", timeZone: "UTC" })}
          </p>
          {bloquee ? (
            <div className="space-y-1 rounded-[1.4rem] bg-[var(--sombre)] p-4 text-[var(--sur-sombre)]" role="status">
              <p className="font-[family-name:var(--titres)] font-bold text-[var(--accent)]">Pré-réservée · après visite technique</p>
              <p className="text-[15px]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
            </div>
          ) : (
            <button
              type="button"
              data-film="bloquer"
              onClick={() => setBloquee(true)}
              className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-[var(--accent)] px-7 font-[family-name:var(--titres)] text-lg font-bold text-[var(--sur-accent)] sm:w-auto"
            >
              Bloquer ma date
            </button>
          )}
          {bloquee && (
            <button
              type="button"
              onClick={() => {
                setBloquee(false);
                setChoisie(null);
              }}
              className="text-[15px] font-bold text-[var(--accent-texte)] underline underline-offset-4"
            >
              Choisir une autre semaine
            </button>
          )}
        </div>
      )}
    </div>
  );
}
