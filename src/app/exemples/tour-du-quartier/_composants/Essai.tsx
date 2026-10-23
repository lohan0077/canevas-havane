"use client";

import { useState } from "react";
import { CRENEAUX } from "./donnees";

/**
 * L'essai sur ton vrai trajet, réservé en ligne : un créneau, et c'est tout. Les
 * créneaux pris sont un exemple. Rien n'est envoyé.
 */
export default function Essai() {
  const [choisi, setChoisi] = useState<number | null>(null);
  const [reserve, setReserve] = useState(false);
  const c = choisi !== null ? CRENEAUX[choisi] : null;

  return (
    <div data-film="essai" className="space-y-4">
      <div className="grid grid-cols-3 gap-2.5">
        {CRENEAUX.map((cr, i) => (
          <button
            key={cr.jour + cr.heure}
            type="button"
            disabled={cr.pris || reserve}
            aria-pressed={choisi === i}
            onClick={() => setChoisi(i)}
            className={`rounded-2xl border-2 px-2 py-3 text-center ${cr.pris ? "border-[var(--trait)] bg-transparent text-[var(--doux)]" : choisi === i ? "border-[var(--sombre)] bg-[var(--sombre)] text-[#F2C14E]" : "border-[var(--sombre)] bg-[var(--carte)]"}`}
          >
            <span className="block text-[13px] font-semibold uppercase tracking-[0.06em]">{cr.jour}</span>
            <span className="block font-[family-name:var(--titres)] text-[26px] font-bold leading-tight tabular-nums">{cr.heure}</span>
            <span className="block text-[12px]">{cr.pris ? "pris" : "libre"}</span>
          </button>
        ))}
      </div>
      <p className="text-[13px] text-[var(--doux)]">Créneaux d&apos;exemple. Deux heures d&apos;essai, au départ du magasin.</p>
      {c && (
        reserve ? (
          <div role="status" data-film="essai-reserve" className="space-y-2 rounded-[24px] bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]">
            <p className="font-[family-name:var(--titres)] text-[30px] font-bold uppercase leading-tight text-[#F2C14E]">Essai réservé : {c.jour.toLowerCase()}, {c.heure}</p>
            <p className="leading-relaxed">Deux heures, sur ton vrai trajet. Casque prêté, selle réglée avant de partir. Une pièce d&apos;identité au départ.</p>
            <p className="text-sm font-semibold">Démonstration : rien n&apos;est envoyé, rien n&apos;est réservé.</p>
            <button type="button" onClick={() => { setReserve(false); setChoisi(null); }} className="text-sm font-semibold underline underline-offset-4">Choisir un autre créneau</button>
          </div>
        ) : (
          <button type="button" onClick={() => setReserve(true)} className="flex min-h-16 w-full flex-col items-center justify-center rounded-full bg-[var(--sombre)] px-6 text-[#F2C14E]">
            <span className="text-[16px] font-bold uppercase tracking-[0.06em]">Réserver mon essai</span>
            <span className="text-[13px] font-semibold">{c.jour.toLowerCase()} · {c.heure}</span>
          </button>
        )
      )}
    </div>
  );
}
