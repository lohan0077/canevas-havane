"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, euros, machine, prixMachine, type IdMachine } from "./donnees";

/** Le prix d'une machine selon le nombre de jours, avec ou sans chauffeur. Exemple, TTC. */
export default function PrixJours({ id }: { id: IdMachine }) {
  const m = machine(id);
  const [jours, setJours] = useState(1);
  const [chauffeur, setChauffeur] = useState(false);
  const total = prixMachine(m, jours, chauffeur);

  return (
    <div id="prix" className="scroll-mt-20 rounded-[18px] border border-[var(--encre)] bg-[var(--carte)] p-5 sm:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <p className="font-bold whitespace-nowrap">Combien de jours&nbsp;?</p>
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Un jour de moins" onClick={() => setJours(Math.max(1, jours - 1))} className="h-11 w-11 rounded-full border border-[var(--encre)] text-xl font-bold">−</button>
          <span className="w-16 text-center font-[family-name:var(--titres)] text-2xl font-black tabular-nums">{jours} j</span>
          <button type="button" aria-label="Un jour de plus" onClick={() => setJours(Math.min(5, jours + 1))} className="h-11 w-11 rounded-full bg-[var(--encre)] text-xl font-bold text-[var(--fond)]">+</button>
        </div>
      </div>
      {m.chauffeur && (
        <label className="flex items-center gap-3 font-semibold cursor-pointer">
          <input type="checkbox" checked={chauffeur} onChange={(e) => setChauffeur(e.target.checked)} className="h-6 w-6 accent-[var(--encre)]" />
          Avec chauffeur, carburant compris
        </label>
      )}
      <div aria-live="polite" className="rounded-[14px] bg-[var(--encre)] p-5 text-[var(--fond)]">
        <p className="text-[12px] font-bold uppercase tracking-[0.14em]">Total TTC · exemple</p>
        <p className="font-[family-name:var(--titres)] text-[44px] font-black leading-none tabular-nums text-[var(--accent)]">{euros(total)}</p>
        <p className="mt-2 text-[14px]">
          {chauffeur && m.chauffeur
            ? `${jours} × ${euros(m.chauffeur)}, chauffeur et carburant compris.`
            : `${euros(m.jour)} la première journée${jours > 1 ? `, puis ${euros(m.jourEnPlus)} par jour` : ""}. Livraison et reprise comprises à 20 km.`}
        </p>
      </div>
      <Link href={`${DOSSIER}/disponibilites`} className="flex h-14 items-center justify-center rounded-full bg-[var(--accent)] border border-[var(--encre)] font-black uppercase tracking-[0.04em] text-[var(--sur-accent)]">
        Voir les samedis libres
      </Link>
    </div>
  );
}
