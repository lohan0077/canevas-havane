"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/** La marque : un carré de plan, coupé d'une porte, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 28 28" aria-hidden="true" className="h-7 w-7">
        <path d="M3 3H25V25H17M11 25H3V3" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="miter" />
        <path d="M11 25A6 6 0 0 1 17 19" fill="none" stroke="var(--accent-texte)" strokeWidth="1.6" />
      </svg>
      <span className="font-[family-name:var(--titres)] text-[22px] font-bold tracking-[-0.02em]">Atelier Samedi</span>
    </span>
  );
}

export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]/95 backdrop-blur">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href={DOSSIER} aria-label="Atelier Samedi, accueil" onClick={() => setOuvert(false)}>
          <Marque />
        </Link>
        <ul className="hidden items-center gap-6 text-[14px] font-medium lg:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="underline-offset-8 hover:underline">{l.libelle}</Link></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href={`${DOSSIER}/rendez-vous`} className="hidden h-10 items-center rounded-full bg-[var(--encre)] px-4 text-[14px] font-semibold text-[var(--fond)] sm:inline-flex">
            Mes 30 minutes
          </Link>
          <button
            type="button"
            className="h-10 rounded-full border border-[var(--trait)] bg-[var(--carte)] px-4 text-[14px] font-semibold lg:hidden"
            aria-expanded={ouvert}
            aria-controls="as-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <ul id="as-menu" hidden={!ouvert} className="border-t border-[var(--trait)] px-4 py-2 lg:hidden">
        {NAVIGATION.map((l) => (
          <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
            <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3.5 text-lg font-medium">{l.libelle}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
