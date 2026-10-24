"use client";

import { useState } from "react";
import { SOIREE } from "./donnees";

/**
 * La salle de la soirée découverte : quatre tables de six. Les places déjà prises
 * sont un exemple (la page le dit) ; sur le vrai site, ce seraient de vraies
 * réservations — jamais une rareté inventée. On choisit combien on vient, on touche
 * une table, on réserve. Rien n'est envoyé.
 */
export default function Soiree() {
  const [combien, setCombien] = useState(2);
  const [table, setTable] = useState<number | null>(null);
  const [reserve, setReserve] = useState(false);

  const libres = SOIREE.prises.map((p) => 6 - p.length);
  const totalLibres = libres.reduce((a, b) => a + b, 0);
  const assez = (t: number) => libres[t] >= combien;

  const choisirTable = (t: number) => {
    if (!assez(t) || reserve) return;
    setTable(t);
  };

  return (
    <div className="space-y-5" data-film="salle">
      <div className="rounded-[18px] bg-[var(--carte)] border border-[var(--trait)] p-4 sm:p-5 space-y-3">
        <p className="font-[family-name:var(--titres)] text-2xl">Vous venez à combien ?</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={combien === n}
              disabled={reserve}
              onClick={() => {
                setCombien(n);
                if (table !== null && libres[table] < n) setTable(null);
              }}
              className={`flex-1 min-h-12 rounded-full border text-lg font-semibold ${
                combien === n ? "bg-[var(--encre)] border-[var(--encre)] text-[var(--fond)]" : "bg-[var(--fond)] border-[var(--trait)] text-[var(--encre)]"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {SOIREE.prises.map((prises, t) => {
          const choisie = table === t;
          const possible = assez(t);
          return (
            <button
              key={t}
              type="button"
              data-table={t + 1}
              aria-pressed={choisie}
              disabled={!possible || reserve}
              onClick={() => choisirTable(t)}
              aria-label={`Table ${t + 1} : ${libres[t]} place${libres[t] > 1 ? "s" : ""} libre${libres[t] > 1 ? "s" : ""}`}
              className={`relative rounded-[18px] border-2 p-3 text-left transition-colors ${
                choisie ? "border-[var(--accent)] bg-[var(--carte)]" : possible ? "border-[var(--encre)] bg-[var(--carte)]" : "border-[var(--trait)] bg-[var(--fond)]"
              }`}
            >
              <svg viewBox="0 0 120 90" className="w-full" aria-hidden="true">
                <rect x="30" y="22" width="60" height="46" rx="10" fill="var(--sombre)" />
                {[0, 1, 2, 3, 4, 5].map((s) => {
                  const pos = [[42, 10], [60, 10], [78, 10], [42, 80], [60, 80], [78, 80]][s];
                  const prise = prises.includes(s);
                  const libresIci = [0, 1, 2, 3, 4, 5].filter((x) => !prises.includes(x));
                  const mienne = choisie && libresIci.indexOf(s) > -1 && libresIci.indexOf(s) < combien;
                  return (
                    <circle
                      key={s}
                      cx={pos[0]}
                      cy={pos[1]}
                      r="8"
                      fill={mienne ? "var(--accent)" : prise ? "var(--doux)" : "var(--carte)"}
                      stroke={prise ? "var(--doux)" : "var(--encre)"}
                      strokeWidth="2.5"
                    />
                  );
                })}
              </svg>
              <span className="mt-1 flex items-baseline justify-between gap-2">
                <span className="font-[family-name:var(--titres)] text-lg">Table {t + 1}</span>
                <span className="text-sm font-semibold tabular-nums">{libres[t] === 0 ? "complète" : `${libres[t]} libre${libres[t] > 1 ? "s" : ""}`}</span>
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-sm text-[var(--doux)]">
        {totalLibres} places libres sur {SOIREE.places}. Les places déjà prises sont un exemple : sur le vrai site,
        ce sont de vraies réservations, jamais un chiffre gonflé.
      </p>

      {table !== null && (
        <div className="rounded-[18px] bg-[var(--carte)] border border-[var(--trait)] p-5 space-y-3">
          <p className="font-[family-name:var(--titres)] text-2xl">
            {SOIREE.date}, {SOIREE.heure} · table {table + 1} · {combien} place{combien > 1 ? "s" : ""}
          </p>
          {reserve ? (
            <div role="status" className="rounded-2xl bg-[var(--fond)] border border-[var(--accent)] p-4 space-y-1">
              <p className="font-bold">
                Place{combien > 1 ? "s" : ""} réservée{combien > 1 ? "s" : ""} : {SOIREE.date.toLowerCase()}, {SOIREE.heure}, table {table + 1}.
              </p>
              <p className="text-sm text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
            </div>
          ) : (
            <button type="button" data-film="reserver" onClick={() => setReserve(true)} className="w-full min-h-12 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-5 text-lg font-semibold">
              Réserver ma place
            </button>
          )}
          {reserve && (
            <button
              type="button"
              onClick={() => {
                setReserve(false);
                setTable(null);
              }}
              className="text-sm font-semibold underline underline-offset-4"
            >
              Changer de table
            </button>
          )}
        </div>
      )}
    </div>
  );
}
