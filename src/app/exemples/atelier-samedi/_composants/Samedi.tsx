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

  return (
    <div data-film="samedi" className="space-y-6">
      <div role="tablist" aria-label="Le samedi" className="grid grid-cols-2 gap-2">
        {SAMEDIS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={jour === s.id}
            onClick={() => { setJour(s.id); setHeure(null); setReserve(false); }}
            className={`min-h-[52px] rounded-xl border px-3 text-[16px] font-semibold ${jour === s.id ? "border-[var(--encre)] bg-[var(--encre)] text-[var(--fond)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}
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
              className={`rounded-xl border-2 px-2 py-3 text-center ${occupe ? "border-[var(--trait)] bg-[var(--fond)] text-[var(--doux)]" : choisi ? "border-[var(--accent-texte)] bg-[var(--carte)]" : "border-[var(--trait)] bg-[var(--carte)]"}`}
            >
              <span className="block font-[family-name:var(--titres)] text-[20px] font-semibold tabular-nums">{h}</span>
              <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[12px] font-semibold ${occupe ? "bg-[var(--doux)] text-[var(--carte)]" : "bg-[var(--accent)] text-[var(--sur-accent)]"}`}>
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

      <div data-film="reservation" className="space-y-4 rounded-[22px] border border-[var(--trait)] bg-[var(--carte)] p-5 sm:p-6">
        <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--accent-texte)]">{samedi.libelle} · matin</p>
        <p className="font-[family-name:var(--titres)] text-[28px] font-semibold leading-tight">Trente minutes pour ton projet</p>
        <p className="text-[var(--doux)]">
          {heure ? `${heure} · ` : "Choisis une heure · "}
          {lieu === "agence" ? "à l'agence" : "en visio"} · {agence.prixRendezVous}, exemple
        </p>
        <div role="radiogroup" aria-label="Où" className="grid grid-cols-2 gap-2">
          {(["agence", "visio"] as const).map((l) => (
            <button key={l} type="button" role="radio" aria-checked={lieu === l} disabled={reserve} onClick={() => setLieu(l)} className={`min-h-[46px] rounded-xl border text-[15px] font-semibold ${lieu === l ? "border-[var(--encre)] bg-[var(--fond)]" : "border-[var(--trait)]"}`}>
              {l === "agence" ? "À l'agence" : "En visio"}
            </button>
          ))}
        </div>
        {reserve ? (
          <div role="status" className="space-y-1 rounded-xl border-2 border-[var(--accent-texte)] bg-[var(--fond)] p-4">
            <p className="text-lg font-semibold">Réservé : samedi, {heure}</p>
            <p className="text-[14px] text-[var(--doux)]">Démonstration : rien n&apos;est envoyé, rien n&apos;est enregistré.</p>
            <button type="button" onClick={() => { setReserve(false); setHeure(null); }} className="pt-1 text-[14px] font-semibold underline underline-offset-4">
              Choisir un autre créneau
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={!heure}
            onClick={() => setReserve(true)}
            className="min-h-[54px] w-full rounded-full bg-[var(--encre)] px-6 text-[17px] font-semibold text-[var(--fond)] disabled:cursor-not-allowed disabled:bg-[var(--doux)]"
          >
            Réserver mes 30 minutes
          </button>
        )}
      </div>
    </div>
  );
}
