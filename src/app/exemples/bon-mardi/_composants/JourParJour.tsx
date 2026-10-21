"use client";

import { useMemo, useState } from "react";
import { dateLongue } from "./calendrier";
import { useAujourdhui } from "./aujourdhui";
import { ETAPES } from "./donnees";


const ajouter = (c: string, n: number) => {
  const [a, m, j] = c.split("-").map(Number);
  return new Date(Date.UTC(a, m - 1, j + n)).toISOString().slice(0, 10);
};

/** Le troisième mardi du mois prochain : le jour J proposé par défaut. */
function mardiParDefaut(aujourdhui: string): string {
  const [a, m] = aujourdhui.split("-").map(Number);
  const d = new Date(Date.UTC(a, m, 1));
  const premierMardi = 1 + ((2 - d.getUTCDay() + 7) % 7);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), premierMardi + 14)).toISOString().slice(0, 10);
}

/**
 * « Ton déménagement, jour par jour » : la date du jour J, et ce qu'on fait avant, daté.
 * Les étapes se cochent ; rien n'est enregistré.
 */
export default function JourParJour() {
  const aujourdhui = useAujourdhui();
  const [choisie, setChoisie] = useState<string | null>(null);
  const [faits, setFaits] = useState<string[]>([]);
  const jourJ = choisie ?? (aujourdhui ? mardiParDefaut(aujourdhui) : null);
  const dates = useMemo(() => (jourJ ? ETAPES.map((e) => ajouter(jourJ, e.decalage)) : []), [jourJ]);

  return (
    <div data-film="jour-par-jour" className="space-y-5">
      {/* La date s'affiche en français quelle que soit la langue du navigateur ; le
          sélecteur natif est posé dessus, invisible, et s'ouvre au toucher. */}
      <label className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[var(--sombre)] text-[var(--sur-sombre)] px-5 py-4">
        <span className="font-bold">Ton jour J</span>
        <span className="relative inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--carte)] text-[var(--encre)] px-3 font-bold">
          {jourJ ? dateLongue(jourJ).replace(/^./, (l) => l.toUpperCase()) : "\u00A0"}
          <span aria-hidden="true">▾</span>
          <input
            id="jour-j"
            type="date"
            aria-label="Ton jour J"
            value={jourJ ?? ""}
            onChange={(e) => e.target.value && setChoisie(e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
        </span>
      </label>
      <ol id="etapes" className="space-y-2.5">
        {ETAPES.map((e, i) => {
          const fait = faits.includes(e.id);
          return (
            <li key={e.id} className={`rounded-2xl border-2 p-4 transition-colors ${fait ? "border-[var(--encre)] bg-[var(--accent)] text-[var(--sur-accent)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}>
              <label className="grid grid-cols-[auto_1fr_auto] items-start gap-3 cursor-pointer">
                <span className="font-[family-name:var(--titres)] text-xl font-bold w-[64px] leading-tight">{e.quand}</span>
                <span className="space-y-1">
                  <span className="block text-lg font-bold leading-snug">{e.quoi}</span>
                  <span className="block text-sm first-letter:uppercase">{dates[i] ? dateLongue(dates[i]) : " "}</span>
                </span>
                <input
                  id={`etape-${e.id}`}
                  type="checkbox"
                  checked={fait}
                  onChange={() => setFaits(fait ? faits.filter((x) => x !== e.id) : [...faits, e.id])}
                  className="mt-1 h-7 w-7 accent-[var(--encre)]"
                  aria-label={`${e.quoi} : fait`}
                />
              </label>
              <p className="mt-2 pl-[76px] text-sm leading-relaxed">{e.detail}</p>
            </li>
          );
        })}
      </ol>
      <p className="text-sm text-[var(--doux)]" aria-live="polite">
        {faits.length} étape{faits.length > 1 ? "s" : ""} sur {ETAPES.length} cochée{faits.length > 1 ? "s" : ""}
        {jourJ ? ` · jour J : ${dateLongue(jourJ)}` : ""} · Rien n'est enregistré.
      </p>
    </div>
  );
}
