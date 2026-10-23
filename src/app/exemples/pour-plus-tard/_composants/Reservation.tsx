"use client";

import { useState } from "react";
import { CRENEAUX, FORMULE } from "./donnees";

/**
 * Les séances de novembre : on choisit un samedi ou un dimanche, on le réserve. Les
 * créneaux pris sont un exemple, et la page le dit ; la confirmation dit aussi que rien
 * n'est envoyé. Chaque créneau porte un `data-creneau` stable (le tournage le touche).
 */
export default function Reservation() {
  const [choisi, setChoisi] = useState<string | null>(null);
  const [reserve, setReserve] = useState(false);
  const creneau = CRENEAUX.find((c) => c.id === choisi);

  return (
    <div id="creneaux" data-film="creneaux" className="scroll-mt-24 space-y-5 rounded-[6px] border border-[var(--trait)] bg-[var(--carte)] p-5 shadow-[0_30px_70px_-45px_rgba(42,33,29,0.7)] sm:p-8">
      <p className="flex items-baseline justify-between gap-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--doux)]">
        <span>Novembre 2026</span>
        <span>une heure · en extérieur ou chez toi</span>
      </p>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {CRENEAUX.map((c) => {
          const actif = choisi === c.id;
          return (
            <button
              key={c.id}
              type="button"
              data-creneau={c.id}
              disabled={c.pris || reserve}
              aria-pressed={actif}
              onClick={() => setChoisi(c.id)}
              className={`rounded-[4px] border-2 px-2 py-3 text-center transition-all duration-300 ${
                c.pris
                  ? "border-transparent bg-[var(--fond)] text-[var(--doux)]"
                  : actif
                    ? "-translate-y-0.5 border-[var(--accent)] bg-[var(--fond)] shadow-[0_6px_0_var(--accent)]"
                    : "border-[var(--trait)] bg-[var(--carte)] hover:border-[var(--encre)]"
              }`}
            >
              <span className={`block font-[family-name:var(--titres)] text-[19px] leading-tight ${c.pris ? "line-through decoration-1" : ""}`}>{c.jour}</span>
              <span className="block text-[14px] font-semibold tabular-nums">{c.heure}</span>
              <span className={`mt-1.5 inline-block rounded-[3px] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.08em] ${c.pris ? "bg-[var(--doux)] text-[var(--carte)]" : "bg-[#C9A27E] text-[#2A211D]"}`}>
                {c.pris ? "Pris" : "Libre"}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-[14px] text-[var(--doux)]">Créneaux pris : exemple, le studio est fictif. Sur un vrai site, ce sont les vrais créneaux, mis à jour à chaque réservation.</p>

      <div data-film="ta-seance" className="space-y-4 rounded-[6px] bg-[var(--fond)] p-5 sm:p-6">
        <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-texte)]">Ta séance</p>
        <p className="font-[family-name:var(--titres)] text-[1.9rem] leading-tight">
          {creneau ? `${creneau.jour}, ${creneau.heure}` : "Choisis une date"}
        </p>
        <p className="text-[var(--doux)]">{FORMULE.nom} · {FORMULE.prix} TTC (exemple), réglés le jour de la séance</p>
        {reserve ? (
          <div role="status" className="space-y-1 rounded-[4px] border-2 border-[var(--accent)] bg-[var(--carte)] p-4">
            <p className="text-lg font-semibold">Séance réservée : {creneau?.jour}, {creneau?.heure}. On t&apos;appelle pour choisir le lieu.</p>
            <p className="text-[14px] text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
            <button type="button" onClick={() => { setReserve(false); setChoisi(null); }} className="pt-1 text-[14px] font-semibold underline underline-offset-4">
              Choisir une autre date
            </button>
          </div>
        ) : (
          <button
            type="button"
            data-film="reserver"
            disabled={!creneau}
            onClick={() => setReserve(true)}
            className="min-h-[56px] w-full rounded-[3px] bg-[var(--accent)] px-6 text-[17px] font-semibold text-[var(--sur-accent)] transition-transform enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-[var(--doux)]"
          >
            Réserver ma séance
          </button>
        )}
      </div>
    </div>
  );
}
