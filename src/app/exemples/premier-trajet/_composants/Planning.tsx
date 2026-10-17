"use client";

import { useState } from "react";
import { HEURES, JOURS, MONITEUR_DU_CRENEAU, SEMAINES } from "./donnees";

/**
 * Le planning des leçons de conduite : six jours, trois heures, deux semaines. On
 * touche une case libre, on réserve, c'est fait — sans appeler. Les cases prises
 * sont un exemple ; rien n'est envoyé.
 */
export default function Planning() {
  const [semaine, setSemaine] = useState(0);
  const [choisi, setChoisi] = useState<string | null>(null);
  const [reserves, setReserves] = useState<string[]>([]);
  const pris = new Set(SEMAINES[semaine].pris);
  const cle = (j: string, h: string) => `${semaine}:${j}-${h}`;
  const [jourChoisi, heureChoisie] = choisi ? choisi.split(":")[1].split("-") : ["", ""];
  const jourLong = JOURS.find((j) => j.court === jourChoisi)?.long ?? "";
  const dejaReserve = choisi !== null && reserves.includes(choisi);

  return (
    <div data-film="planning" className="space-y-5">
      <div role="group" aria-label="Semaine" className="inline-flex rounded-full bg-[var(--carte)] border border-[var(--trait)] p-1">
        {SEMAINES.map((s, i) => (
          <button
            key={s.nom}
            type="button"
            aria-pressed={semaine === i}
            onClick={() => {
              setSemaine(i);
              setChoisi(null);
            }}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${semaine === i ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : ""}`}
          >
            {s.nom}
          </button>
        ))}
      </div>

      <div className="rounded-[26px] bg-[var(--carte)] border border-[var(--trait)] p-3 sm:p-5">
        <div className="grid grid-cols-[38px_repeat(6,minmax(0,1fr))] gap-1.5 sm:gap-2">
          <span />
          {JOURS.map((j) => (
            <span key={j.court} className="text-center text-xs sm:text-sm font-bold uppercase tracking-[0.08em] pb-1">{j.court}</span>
          ))}
          {HEURES.map((h) => (
            <div key={h} className="contents">
              <span className="self-center text-xs sm:text-sm font-bold tabular-nums">{h}</span>
              {JOURS.map((j) => {
                const k = cle(j.court, h);
                const estPris = pris.has(`${j.court}-${h}`);
                const estReserve = reserves.includes(k);
                const actif = choisi === k;
                return (
                  <button
                    key={k}
                    type="button"
                    data-creneau={`${j.court}-${h}`}
                    disabled={estPris}
                    aria-pressed={actif}
                    aria-label={`${j.long} ${h} : ${estPris ? "pris" : estReserve ? "réservé" : "libre"}`}
                    onClick={() => setChoisi(k)}
                    className={`h-14 rounded-xl border-2 text-[11px] sm:text-xs font-bold transition-colors ${
                      estPris
                        ? "border-transparent bg-[var(--fond)] text-[var(--doux)] cursor-not-allowed"
                        : estReserve
                          ? "border-[var(--sombre)] bg-[var(--sombre)] text-[var(--sur-sombre)]"
                          : actif
                            ? "border-[var(--sombre)] bg-[var(--accent)] text-[var(--sur-accent)]"
                            : "border-[var(--trait)] bg-[var(--carte)] hover:border-[var(--encre)]"
                    }`}
                  >
                    {estPris ? "Pris" : estReserve ? "Réservé" : "Libre"}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <p className="text-sm text-[var(--doux)]">
        Créneaux d'exemple : certains sont déjà pris par d'autres élèves, les autres sont libres. Leçon d'une heure, au volant.
      </p>

      {choisi && (
        <div data-film="lecon-choisie" className="rounded-[26px] bg-[var(--carte)] border-2 border-[var(--encre)] p-5 sm:p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Leçon de conduite · 1 h</p>
              <p className="font-[family-name:var(--titres)] text-3xl font-extrabold">
                {jourLong}, {heureChoisie}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-[var(--fond)] border border-[var(--trait)] px-3 py-1 text-xs font-bold">avec {MONITEUR_DU_CRENEAU[heureChoisie]}</span>
          </div>
          {dejaReserve ? (
            <div role="status" className="rounded-2xl bg-[var(--sombre)] text-[var(--sur-sombre)] p-4 space-y-1">
              <p className="text-lg font-extrabold">
                Réservé : {jourLong.toLowerCase()} {heureChoisie}
              </p>
              <p className="text-sm">Démonstration : rien n'est envoyé, rien n'est enregistré.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-[var(--doux)]">Décomptée de ton forfait, ou 55 € TTC à l'unité (exemple). Départ devant l'école.</p>
              <button
                type="button"
                data-film="reserver-lecon"
                onClick={() => setReserves([...reserves, choisi])}
                className="w-full rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-4 text-lg font-extrabold"
              >
                Réserver cette leçon
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
