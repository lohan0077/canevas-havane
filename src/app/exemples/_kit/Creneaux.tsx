"use client";

import { useState } from "react";

export type Creneau = { libelle: string; sous?: string; pris?: boolean };

/**
 * Des créneaux (semaines, jours, heures) qu'on choisit puis qu'on bloque soi-même.
 * Les créneaux pris sont un exemple, et la page le dit (`note`). La confirmation
 * dit aussi que rien n'est envoyé : c'est une démonstration.
 */
export default function Creneaux({
  creneaux,
  colonnes = 3,
  titreCarte,
  bouton,
  confirmation,
  note,
  libellePris = "Pris",
  libelleLibre = "Libre",
}: {
  creneaux: Creneau[];
  colonnes?: 2 | 3 | 4;
  titreCarte: string;
  bouton: string;
  confirmation: string;
  note: string;
  libellePris?: string;
  libelleLibre?: string;
}) {
  const [choisi, setChoisi] = useState<number | null>(null);
  const [bloque, setBloque] = useState(false);
  const grille = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-3 sm:grid-cols-4" }[colonnes];

  return (
    <div className="space-y-6">
      <div className={`grid ${grille} gap-3`}>
        {creneaux.map((c, i) => {
          const actif = choisi === i;
          return (
            <button
              key={c.libelle + i}
              type="button"
              disabled={c.pris || bloque}
              aria-pressed={actif}
              onClick={() => setChoisi(i)}
              className={`rounded-2xl border-[3px] px-2 py-3 text-center transition-colors ${
                c.pris
                  ? "border-[var(--trait)] bg-[var(--fond)] text-[var(--doux)]"
                  : actif
                    ? "border-[var(--accent)] bg-[var(--carte)] text-[var(--encre)]"
                    : "border-[var(--trait)] bg-[var(--carte)] text-[var(--encre)]"
              }`}
            >
              <span className="block text-lg font-extrabold leading-tight">{c.libelle}</span>
              {c.sous && <span className="block text-xs mt-0.5">{c.sous}</span>}
              <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${c.pris ? "bg-[var(--doux)] text-[var(--carte)]" : "bg-[var(--accent)] text-[var(--sur-accent)]"}`}>
                {c.pris ? libellePris : libelleLibre}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-sm text-[var(--doux)]">{note}</p>
      {choisi !== null && (
        <div className="rounded-[24px] bg-[var(--carte)] border border-[var(--trait)] p-6 space-y-4">
          <p className="text-2xl font-[family-name:var(--titres)] font-semibold">{titreCarte}</p>
          <p className="text-lg">
            {creneaux[choisi].libelle}
            {creneaux[choisi].sous ? ` · ${creneaux[choisi].sous}` : ""}
          </p>
          {bloque ? (
            <div role="status" className="rounded-2xl bg-[var(--fond)] border-2 border-[var(--accent)] p-4 space-y-1">
              <p className="font-bold">{confirmation}</p>
              <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setBloque(true)}
              className="w-full rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-4 text-lg font-extrabold"
            >
              {bouton}
            </button>
          )}
          {bloque && (
            <button
              type="button"
              onClick={() => {
                setBloque(false);
                setChoisi(null);
              }}
              className="text-sm font-semibold underline underline-offset-4"
            >
              Choisir un autre créneau
            </button>
          )}
        </div>
      )}
    </div>
  );
}
