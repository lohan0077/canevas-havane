"use client";

import { useState } from "react";
import Link from "next/link";
import { Monogramme } from "./Blocs";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Une barre fine, posée sur la nuit : le monogramme, les liens en petites capitales, le rendez-vous. */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]/95 backdrop-blur">
      <nav aria-label="Principale" className="mx-auto flex h-[60px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
        <Link href={DOSSIER} aria-label="Tiers Regard, accueil" onClick={() => setOuvert(false)} className="flex items-center gap-2.5">
          <Monogramme className="h-8 w-8 text-[15px]" />
          <span className="font-[family-name:var(--titres)] text-[20px] font-semibold tracking-[-0.02em]">Tiers Regard</span>
        </Link>
        <ul className="hidden items-center gap-7 text-[12px] font-medium uppercase tracking-[0.16em] lg:flex">
          {NAVIGATION.slice(0, 3).map((l) => (
            <li key={l.href}><Link href={l.href} className="underline-offset-8 hover:underline">{l.libelle}</Link></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href={`${DOSSIER}/rendez-vous`} className="hidden h-10 items-center gap-2 rounded-[6px] border border-[var(--encre)] pl-3.5 pr-1.5 text-[12px] font-medium uppercase tracking-[0.16em] sm:inline-flex">
            Rendez-vous
            <span aria-hidden="true" className="grid h-7 w-7 place-items-center rounded-[4px] bg-[var(--accent)] text-[var(--sur-accent)]">↗</span>
          </Link>
          <button
            type="button"
            className="h-10 rounded-[6px] border border-[var(--trait)] px-3.5 text-[12px] font-medium uppercase tracking-[0.16em] lg:hidden"
            aria-expanded={ouvert}
            aria-controls="tr-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <ul id="tr-menu" hidden={!ouvert} className="absolute inset-x-0 top-full border-b border-[var(--trait)] bg-[var(--fond)] px-4 py-2 lg:hidden">
        {NAVIGATION.map((l, i) => (
          <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
            <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-baseline gap-4 py-4">
              <span className="text-[12px] text-[var(--accent-texte)]">0{i + 1}</span>
              <span className="font-[family-name:var(--titres)] text-[22px] font-semibold">{l.libelle}</span>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
