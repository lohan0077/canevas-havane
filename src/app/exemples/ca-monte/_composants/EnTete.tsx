"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le nom, en capitales, et sa côte : un trait qui monte. */
export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <svg viewBox="0 0 40 24" aria-hidden="true" className="h-6 w-10 text-[#D7F23C]">
        <path d="M2 21 L12 21 L24 6 L30 13 L38 13" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-[family-name:var(--titres)] text-[22px] font-bold uppercase tracking-tight">Ça monte</span>
    </span>
  );
}

/** La barre du site, couleur bitume. Sous 1024 px, les liens passent dans un panneau. */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={DOSSIER} aria-label="Ça Monte, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden items-center gap-8 text-[13px] font-semibold uppercase tracking-[0.12em] lg:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:text-[#D7F23C]">{l.libelle}</Link></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href={`${DOSSIER}#essai`} className="hidden min-h-11 items-center rounded-full bg-[#D7F23C] px-5 text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--sombre)] sm:flex">
            Réserver un essai
          </Link>
          <button
            type="button"
            className="min-h-11 rounded-full border border-white/40 px-5 text-[13px] font-semibold uppercase tracking-[0.08em] lg:hidden"
            aria-expanded={ouvert}
            aria-controls="cm-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="cm-menu" hidden={!ouvert} className="border-t border-white/10 lg:hidden">
        <ul className="mx-auto max-w-6xl px-5 py-3">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex min-h-14 items-center font-[family-name:var(--titres)] text-[26px] font-bold uppercase">
                {l.libelle}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link href={`${DOSSIER}#essai`} onClick={() => setOuvert(false)} className="flex min-h-12 items-center justify-center rounded-full bg-[#D7F23C] font-bold uppercase text-[var(--sombre)]">
              Réserver un essai
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
