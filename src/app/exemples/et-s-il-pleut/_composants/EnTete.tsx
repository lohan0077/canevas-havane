"use client";

import { useState } from "react";
import Link from "next/link";
import Marque from "./Marque";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** La barre d'« Et s'il pleut » : ardoise, comme un ciel couvert. Repliée sous 860 px. */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[#1E2733] text-[var(--sur-sombre)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Et s'il pleut, accueil" className="flex items-center gap-2.5">
          <Marque clair />
          <span className="font-[family-name:var(--titres)] text-[24px] italic leading-none">Et s&apos;il pleut</span>
        </Link>
        <ul className="hidden min-[860px]:flex items-center gap-8 text-sm">
          {NAVIGATION.map((l) => <li key={l.href}><Link href={l.href} className="uppercase tracking-[0.16em] text-[#B9C6D6] hover:text-[var(--sur-sombre)]">{l.libelle}</Link></li>)}
          <li><a href={`tel:${entreprise.telephoneLien}`} className="rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-5 py-2.5 font-semibold">{entreprise.telephone}</a></li>
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="esp-menu"
          aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOuvert((o) => !o)}
          className="min-[860px]:hidden grid h-11 w-11 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)]"
        >
          <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
            {ouvert ? <path d="M3 1l12 12M15 1L3 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /> : <path d="M1 2h16M1 7h16M1 12h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />}
          </svg>
        </button>
      </nav>
      <div id="esp-menu" hidden={!ouvert} className="min-[860px]:hidden border-t border-[#3A4759]">
        <ul className="px-5 py-5 space-y-1">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-baseline justify-between py-3 border-b border-[#3A4759] font-[family-name:var(--titres)] text-[32px] italic">
                {l.libelle}
                <span aria-hidden="true" className="text-lg not-italic text-[var(--accent)]">→</span>
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <a href={`tel:${entreprise.telephoneLien}`} className="flex justify-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-3.5 font-semibold">Appeler le {entreprise.telephone}</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
