"use client";

import { useState } from "react";

const ANNEE = 2027;
const SEMAINES = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
// Semaines déjà prises : un exemple. Sur un vrai site, le planning de l'entreprise.
const PRISES = new Set([11, 12, 15, 17, 18, 20]);

/** Lundi de la semaine ISO `semaine` de l'année `annee` (le 4 janvier est toujours en semaine 1). */
function lundi(annee: number, semaine: number) {
  const quatreJanvier = new Date(Date.UTC(annee, 0, 4));
  const lundiSemaine1 = Date.UTC(annee, 0, 4 - ((quatreJanvier.getUTCDay() + 6) % 7));
  return new Date(lundiSemaine1 + (semaine - 1) * 7 * 86_400_000);
}

const jourMois = (d: Date) =>
  d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", timeZone: "UTC" });

export default function Creneaux() {
  const [choisie, setChoisie] = useState<number | null>(null);
  const [bloquee, setBloquee] = useState(false);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {SEMAINES.map((s) => {
          const prise = PRISES.has(s);
          const active = choisie === s;
          return (
            <button
              key={s}
              type="button"
              disabled={prise || bloquee}
              aria-pressed={active}
              onClick={() => setChoisie(s)}
              className={`rounded-2xl border-[3px] px-2 py-3 text-center transition-colors ${
                prise
                  ? "border-[#E7DCCB] bg-[#EFE6D8] text-[#4A5A60]"
                  : active
                    ? "border-[#C4471D] bg-[#FFF1E8] text-[#0F3442]"
                    : "border-[#CFE6D2] bg-white text-[#0F3442] hover:border-[#0E6E8C]"
              }`}
            >
              <span className="block text-[11px] font-bold uppercase tracking-[0.12em]">Semaine</span>
              <span className="block text-3xl font-extrabold leading-tight tabular-nums">{s}</span>
              <span className="block text-xs">{jourMois(lundi(ANNEE, s))}</span>
              <span
                className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                  prise ? "bg-[#4A5A60] text-white" : "bg-[#E3F2E6] text-[#2E6B3A]"
                }`}
              >
                {prise ? "Réservée" : "Libre"}
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-sm text-[#4A6470]">
        Dates d&apos;exemple. Sur un vrai site, ce calendrier suit le planning réel de
        l&apos;entreprise, mis à jour à chaque signature.
      </p>

      {choisie !== null && (
        <div className="rounded-[24px] bg-white p-6 shadow-[0_20px_50px_-28px_rgba(15,52,66,0.6)] space-y-4">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0E6E8C]">Saison {ANNEE}</p>
          <p className="text-3xl font-[family-name:var(--pp-titres)] font-semibold text-[#0F3442]">
            Ta date de chantier
          </p>
          <p className="text-lg text-[#0F3442]">
            Semaine {choisie} · à partir du {lundi(ANNEE, choisie).toLocaleDateString("fr-FR", { day: "numeric", month: "long", timeZone: "UTC" })}
          </p>
          {bloquee ? (
            <div className="rounded-2xl bg-[#E3F2E6] p-4 space-y-1" role="status">
              <p className="font-bold text-[#2E6B3A]">Pré-réservée · après visite technique</p>
              <p className="text-sm text-[#2E6B3A]">
                Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setBloquee(true)}
              className="w-full rounded-full bg-[#C4471D] px-6 py-4 text-lg font-extrabold text-white hover:bg-[#B5401A] transition-colors"
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
              className="text-sm font-semibold text-[#0E6E8C] underline underline-offset-4"
            >
              Choisir une autre semaine
            </button>
          )}
        </div>
      )}
    </div>
  );
}
