"use client";

import { useState } from "react";
import { HEURES, JOURS, PRESTATIONS, PRIS, euros } from "./donnees";

/**
 * Le créneau : la prestation, puis le jour et l'heure de dépôt. Tu déposes la
 * voiture, c'est tout. Les créneaux pris sont un exemple ; rien n'est envoyé.
 */
export default function RendezVous() {
  const [prestation, setPrestation] = useState(0);
  const [choisi, setChoisi] = useState<string | null>(null);
  const [reserve, setReserve] = useState(false);
  const p = PRESTATIONS[prestation];
  const [jour, heure] = choisi ? choisi.split("-") : ["", ""];

  return (
    <div className="space-y-6">
      <fieldset className="space-y-3">
        <legend className="font-[family-name:var(--titres)] text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">1 · La prestation</legend>
        <div className="grid gap-2">
          {PRESTATIONS.slice(0, 3).map((x, i) => (
            <button
              key={x.id}
              type="button"
              aria-pressed={prestation === i}
              onClick={() => { setPrestation(i); setReserve(false); }}
              className={`flex items-baseline justify-between gap-3 rounded-2xl border-2 px-4 py-3 text-left ${prestation === i ? "border-[var(--accent)] bg-[var(--carte)]" : "border-[var(--trait)]"}`}
            >
              <span className="font-semibold">{x.nom} <span className="font-normal text-[var(--doux)]">· {x.duree}</span></span>
              <span className="font-[family-name:var(--titres)] font-bold whitespace-nowrap">{euros(x.prix.citadine)}</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-[var(--doux)]">Prix TTC d'exemple pour une citadine, pièces et main-d'œuvre comprises.</p>
      </fieldset>

      <fieldset id="ml-creneaux" className="space-y-3 scroll-mt-24">
        <legend className="font-[family-name:var(--titres)] text-sm font-semibold uppercase tracking-[0.14em] text-[var(--accent-texte)]">2 · Le dépôt</legend>
        <div className="rounded-[22px] border border-[var(--trait)] bg-[var(--carte)] divide-y divide-[var(--trait)]">
          {JOURS.map((j) => (
            <div key={j} className="flex items-center gap-3 px-3 py-2.5">
              <span className="w-[74px] shrink-0 font-[family-name:var(--titres)] font-semibold">{j}</span>
              <div className="grid flex-1 grid-cols-4 gap-1.5">
                {HEURES.map((h) => {
                  const cle = `${j}-${h}`;
                  const pris = PRIS.has(cle);
                  const actif = choisi === cle;
                  return (
                    <button
                      key={cle}
                      type="button"
                      data-creneau={cle}
                      disabled={pris || reserve}
                      aria-pressed={actif}
                      aria-label={`${j} ${h} : ${pris ? "pris" : "libre"}`}
                      onClick={() => setChoisi(cle)}
                      className={`h-11 rounded-xl text-sm font-bold tabular-nums ${
                        pris ? "text-[var(--doux)] line-through" : actif ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "border border-[var(--trait)] bg-[var(--fond)]"
                      }`}
                    >
                      {h}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-[var(--doux)]">Créneaux d'exemple : les heures barrées sont déjà prises.</p>
      </fieldset>

      {choisi && (
        <div data-film="recapitulatif" className="rounded-[24px] bg-[var(--sombre)] p-5 text-[var(--sur-sombre)] space-y-3">
          <p className="font-[family-name:var(--titres)] text-3xl font-bold">{jour}, {heure}</p>
          <p>{p.nom} · citadine · {euros(p.prix.citadine)}</p>
          <p className="text-sm">Tu déposes la voiture, on s'occupe du reste. Tu suis l'avancement sur le site.</p>
          {reserve ? (
            <div role="status" className="rounded-2xl border-2 border-[var(--sur-sombre)] p-4 space-y-1">
              <p className="font-[family-name:var(--titres)] text-xl font-bold">Réservé : {jour.toLowerCase()} {heure}</p>
              <p className="text-sm">Démonstration : rien n'est envoyé, rien n'est enregistré.</p>
            </div>
          ) : (
            <button type="button" data-film="reserver-creneau" onClick={() => setReserve(true)} className="w-full rounded-full bg-[var(--sur-sombre)] px-6 py-4 font-[family-name:var(--titres)] text-lg font-bold text-[var(--sombre)]">
              Réserver ce créneau
            </button>
          )}
        </div>
      )}
    </div>
  );
}
