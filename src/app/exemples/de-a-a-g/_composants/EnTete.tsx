"use client";

import { useState } from "react";
import Link from "next/link";
import { Barres } from "./Blocs";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Une barre blanche aux coins arrondis, posée au-dessus de la page, comme une tuile de plus. */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6">
      <nav aria-label="Principale" className="mx-auto flex h-[58px] max-w-6xl items-center justify-between gap-3 rounded-[20px] bg-[var(--carte)]/95 pl-4 pr-2 shadow-[0_8px_30px_rgba(20,35,28,0.08)] ring-1 ring-[var(--trait)] backdrop-blur">
        <Link href={DOSSIER} aria-label="De A à G, accueil" onClick={() => setOuvert(false)} className="flex items-center gap-2.5">
          <Barres />
          <span className="font-[family-name:var(--titres)] text-[21px] font-bold tracking-[-0.03em]">De A à G</span>
        </Link>
        <ul className="hidden items-center gap-6 text-[14px] font-medium lg:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="underline-offset-8 hover:underline">{l.libelle}</Link></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href={`${DOSSIER}/rendez-vous`} className="hidden h-10 items-center rounded-[14px] bg-[var(--accent)] px-4 text-[14px] font-semibold text-[var(--sur-accent)] sm:inline-flex">
            Prendre rendez-vous
          </Link>
          <button
            type="button"
            className="h-10 rounded-[14px] bg-[var(--fond)] px-4 text-[14px] font-semibold ring-1 ring-[var(--trait)] lg:hidden"
            aria-expanded={ouvert}
            aria-controls="dag-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <ul id="dag-menu" hidden={!ouvert} className="absolute inset-x-3 top-full mt-2 rounded-[20px] bg-[var(--carte)] px-5 py-2 shadow-xl ring-1 ring-[var(--trait)] sm:inset-x-6 lg:hidden">
        {NAVIGATION.map((l) => (
          <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
            <Link href={l.href} onClick={() => setOuvert(false)} className="block py-4 text-[19px] font-semibold">{l.libelle}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
