"use client";

import { useState } from "react";
import { CRENEAUX } from "./donnees";

const JOURS = ["Aujourd'hui", "Demain", "Après-demain"];

/**
 * Réserver une séance d'une heure, et recevoir sa carte d'embarquement : l'heure,
 * le casier, le téléphone « en soute ». Démonstration : rien n'est envoyé.
 */
export default function Seances() {
  const [jour, setJour] = useState(0);
  const [heure, setHeure] = useState<string | null>(null);
  const [reserve, setReserve] = useState(false);
  const casier = heure ? (CRENEAUX.indexOf(heure) * 5 + jour * 3) % 12 + 1 : 0;
  const fin = (h: string) => {
    const [hh, mm = "0"] = h.replace(" h", ":").replace(/\s/g, "").split(":");
    const t = Number(hh) + 1;
    return `${t} h${Number(mm) ? ` ${mm}` : ""}`;
  };
  return (
    <div className="space-y-5">
      <div role="group" aria-label="Jour" className="flex flex-wrap gap-2">
        {JOURS.map((j, i) => (
          <button key={j} type="button" aria-pressed={jour === i} onClick={() => { setJour(i); setReserve(false); }} className={`rounded-full px-4 py-2 text-sm font-semibold ${jour === i ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "border border-[var(--trait)]"}`}>{j}</button>
        ))}
      </div>
      <div role="group" aria-label="Heure" className="grid grid-cols-3 gap-2">
        {CRENEAUX.map((h) => (
          <button key={h} type="button" data-heure={h} aria-pressed={heure === h} onClick={() => { setHeure(h); setReserve(false); }} className={`rounded-2xl border-2 py-4 font-[family-name:var(--titres)] text-xl font-semibold ${heure === h ? "border-[var(--accent)] bg-[var(--carte)]" : "border-[var(--trait)]"}`}>{h}</button>
        ))}
      </div>
      <p className="text-sm text-[var(--doux)]">Créneaux d'une heure, d'exemple. Le nombre de places n'est pas affiché : il n'y a pas d'urgence.</p>

      {heure && (
        <div className="overflow-hidden rounded-[26px] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="flex items-center justify-between px-5 pt-5">
            <p className="font-[family-name:var(--titres)] font-semibold">✈ Mode Avion</p>
            <p className="text-xs font-semibold uppercase tracking-[0.16em]">Carte d'embarquement</p>
          </div>
          <dl className="grid grid-cols-3 gap-3 px-5 py-5">
            <div><dt className="text-xs uppercase tracking-[0.14em]">Départ</dt><dd className="font-[family-name:var(--titres)] text-2xl font-semibold">{heure}</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.14em]">Arrivée</dt><dd className="font-[family-name:var(--titres)] text-2xl font-semibold">{fin(heure)}</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.14em]">Casier</dt><dd className="font-[family-name:var(--titres)] text-2xl font-semibold">{casier}</dd></div>
            <div className="col-span-2"><dt className="text-xs uppercase tracking-[0.14em]">Passager</dt><dd className="font-semibold">Toi · {JOURS[jour].toLowerCase()}</dd></div>
            <div><dt className="text-xs uppercase tracking-[0.14em]">Téléphone</dt><dd className="font-semibold">en soute</dd></div>
          </dl>
          <div className="border-t-2 border-dashed border-[var(--sur-sombre)]/30 px-5 py-4">
            {reserve ? (
              <p role="status" className="font-semibold">Réservé. Démonstration : rien n'est envoyé, rien n'est enregistré.</p>
            ) : (
              <button type="button" onClick={() => setReserve(true)} className="w-full rounded-full bg-[var(--accent)] py-3.5 font-[family-name:var(--titres)] font-semibold text-[var(--sur-accent)]">Réserver cette séance</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
