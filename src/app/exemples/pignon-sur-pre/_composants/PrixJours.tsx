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
    <div id="prix" className="scroll-mt-20 rounded-2xl border border-[var(--encre)] bg-[var(--carte)] p-5 sm:p-6 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <p className="font-medium whitespace-nowrap">Combien de jours&nbsp;?</p>
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Un jour de moins" onClick={() => setJours(Math.max(1, jours - 1))} className="h-11 w-11 rounded-full border border-[var(--encre)] text-xl font-medium">−</button>
          <span className="w-16 text-center font-[family-name:var(--titres)] text-2xl tabular-nums">{jours} j</span>
          <button type="button" aria-label="Un jour de plus" onClick={() => setJours(Math.min(5, jours + 1))} className="h-11 w-11 rounded-full bg-[var(--sombre)] text-xl font-medium text-[var(--sur-sombre)]">+</button>
        </div>
      </div>
      {m.chauffeur && (
        <label className="flex items-center gap-3 font-medium cursor-pointer">
          <input type="checkbox" checked={chauffeur} onChange={(e) => setChauffeur(e.target.checked)} className="h-6 w-6 accent-[var(--accent)]" />
          Avec chauffeur, carburant compris
        </label>
      )}
      <div aria-live="polite" className="rounded-xl bg-[var(--sombre)] p-5 text-[var(--sur-sombre)]">
        <p className="text-[12px] font-medium uppercase tracking-[0.2em]">Total TTC · exemple</p>
        <p className="font-[family-name:var(--titres)] text-[44px] leading-none tabular-nums text-[#F2C98A]">{euros(total)}</p>
        <p className="mt-2 text-[14px]">
          {chauffeur && m.chauffeur
            ? `${jours} × ${euros(m.chauffeur)}, chauffeur et carburant compris.`
            : `${euros(m.jour)} la première journée${jours > 1 ? `, puis ${euros(m.jourEnPlus)} par jour` : ""}. Livraison et reprise comprises à 20 km.`}
        </p>
      </div>
      <Link href={`${DOSSIER}/disponibilites`} className="flex h-12 items-center justify-center rounded-full bg-[var(--accent)] text-[15px] font-medium text-[var(--sur-accent)]">
        Voir les samedis libres
      </Link>
    </div>
  );
}
