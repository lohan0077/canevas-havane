"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le monogramme : un « B » sous un toit à deux pentes, années 70. */
export function Monogramme({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`relative grid h-11 w-11 shrink-0 place-items-end justify-center overflow-hidden rounded-[12px] bg-[var(--sombre)] pb-1 ${className}`}>
      <svg viewBox="0 0 44 16" className="absolute left-0 top-1.5 w-full">
        <path d="M3 15L22 3L41 15" fill="none" stroke="#E3B04B" strokeWidth="3.4" strokeLinejoin="round" />
      </svg>
      <span className="font-[family-name:var(--titres)] text-[22px] font-extrabold leading-none text-[var(--sur-sombre)]">B</span>
    </span>
  );
}

export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur">
      <nav aria-label="Principale" className="mx-auto flex h-[66px] max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href={DOSSIER} aria-label="Pavillon Bis, accueil" className="flex items-center gap-2.5" onClick={() => setOuvert(false)}>
          <Monogramme />
          <span className="font-[family-name:var(--titres)] text-[23px] font-extrabold tracking-[-0.02em]">Pavillon Bis</span>
        </Link>
        <ul className="hidden items-center gap-6 text-[15px] font-semibold lg:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="underline-offset-8 hover:underline">{l.libelle}</Link></li>
          ))}
        </ul>
        <button
          type="button"
          className="h-11 rounded-full bg-[var(--accent)] px-5 font-[family-name:var(--titres)] text-[15px] font-bold text-[var(--sur-accent)] lg:hidden"
          aria-expanded={ouvert}
          aria-controls="pv-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div className="h-1.5 bg-[linear-gradient(90deg,#A63F2A_0_33%,#E3B04B_33%_66%,#2F3B35_66%)]" aria-hidden="true" />
      <ul id="pv-menu" hidden={!ouvert} className="border-b border-[var(--trait)] px-4 py-2 lg:hidden">
        {NAVIGATION.map((l) => (
          <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
            <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3.5 font-[family-name:var(--titres)] text-[20px] font-bold">{l.libelle}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
