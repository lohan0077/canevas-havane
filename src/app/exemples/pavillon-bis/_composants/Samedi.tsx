"use client";

import { useState } from "react";
import { HEURES, PRIS, SAMEDIS, agence } from "./donnees";

/**
 * Un samedi matin par mois : trente minutes pour savoir si ton projet tient. Les
 * créneaux pris sont un exemple, et la page le dit ; la réservation ne part nulle part.
 */
export default function Samedi() {
  const [jour, setJour] = useState(SAMEDIS[0].id);
  const [heure, setHeure] = useState<string | null>(null);
  const [lieu, setLieu] = useState<"agence" | "visio">("agence");
  const [reserve, setReserve] = useState(false);
  const samedi = SAMEDIS.find((s) => s.id === jour) ?? SAMEDIS[0];
  const pris = PRIS[jour] ?? [];
  const libres = HEURES.length - pris.length;

  return (
    <div data-film="samedi" className="space-y-5 rounded-2xl border border-[var(--trait)] bg-[var(--carte)] p-5 shadow-[0_40px_90px_-50px_rgba(21,24,28,0.45)] sm:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-[var(--doux)]">Les vrais créneaux</p>
        <p className="text-[13px] font-medium text-[var(--doux)]">{libres} libres</p>
      </div>
      <div role="tablist" aria-label="Le samedi" className="grid grid-cols-2 gap-2">
        {SAMEDIS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={jour === s.id}
            onClick={() => { setJour(s.id); setHeure(null); setReserve(false); }}
            className={`min-h-[54px] rounded-2xl border-2 px-3 text-[16px] font-medium transition-colors ${jour === s.id ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--fond)]"}`}
          >
            <span className="sm:hidden">Samedi {s.court}</span>
            <span className="hidden sm:inline">{s.libelle}</span>
          </button>
        ))}
      </div>

      <div data-film="creneaux" className="grid grid-cols-3 gap-2.5">
        {HEURES.map((h) => {
          const occupe = pris.includes(h);
          const choisi = heure === h;
          return (
            <button
              key={h}
              type="button"
              disabled={occupe || reserve}
              aria-pressed={choisi}
              data-film={`heure-${h.replace(/\s/g, "")}`}
              onClick={() => setHeure(h)}
              className={`rounded-2xl border-2 px-2 py-3 text-center transition-all duration-300 ${occupe ? "border-transparent bg-[var(--fond)] text-[var(--doux)]" : choisi ? "scale-[1.04] border-[var(--accent)] bg-[#F7E3DD]" : "border-[var(--trait)] bg-[var(--carte)] hover:border-[var(--encre)]"}`}
            >
              <span className={`block font-[family-name:var(--titres)] text-[21px] font-medium tracking-[-0.03em] tabular-nums ${occupe ? "line-through decoration-1" : ""}`}>{h}</span>
              <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[12px] font-medium ${occupe ? "bg-[var(--doux)] text-[var(--carte)]" : "bg-[var(--accent)] text-[var(--sur-accent)]"}`}>
                {occupe ? "Réservé" : "Libre"}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-[14px] text-[var(--doux)]">
        Créneaux d&apos;exemple. Sur un vrai site, ce sont les vrais créneaux de l&apos;agence, mis à jour
        à chaque réservation.
      </p>

      <div data-film="reservation" className="space-y-4 rounded-2xl bg-[var(--fond)] p-5 sm:p-6">
        <p className="text-[13px] font-medium uppercase tracking-[0.16em] text-[var(--accent-texte)]">{samedi.libelle} · matin</p>
        <p className="font-[family-name:var(--titres)] text-[28px] font-medium leading-tight tracking-[-0.035em]">Trente minutes pour ton projet</p>
        <p className="text-[var(--doux)]">
          {heure ? `${heure} · ` : "Choisis une heure · "}
          {lieu === "agence" ? "à l'agence" : "en visio"} · {agence.prixSamedi}, exemple
        </p>
        <div role="radiogroup" aria-label="Où" className="grid grid-cols-2 gap-2">
          {(["agence", "visio"] as const).map((l) => (
            <button key={l} type="button" role="radio" aria-checked={lieu === l} disabled={reserve} onClick={() => setLieu(l)} className={`min-h-[48px] rounded-2xl border-2 text-[15px] font-medium ${lieu === l ? "border-[var(--encre)] bg-[var(--carte)]" : "border-[var(--trait)]"}`}>
              {l === "agence" ? "À l'agence" : "En visio"}
            </button>
          ))}
        </div>
        {reserve ? (
          <div role="status" className="space-y-1 rounded-2xl border-2 border-[var(--accent)] bg-[var(--carte)] p-4">
            <p className="text-lg font-medium">Réservé : samedi, {heure}</p>
            <p className="text-[14px] text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
            <button type="button" onClick={() => { setReserve(false); setHeure(null); }} className="pt-1 text-[14px] font-medium underline underline-offset-4">
              Choisir un autre créneau
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={!heure}
            onClick={() => setReserve(true)}
            className="min-h-[56px] w-full rounded-full bg-[var(--encre)] px-6 text-[17px] font-medium text-[var(--fond)] transition-transform enabled:hover:scale-[1.01] disabled:cursor-not-allowed disabled:bg-[var(--doux)]"
          >
            Réserver mes 30 minutes
          </button>
        )}
      </div>
    </div>
  );
}
