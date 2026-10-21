"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION } from "./donnees";

/** La barre de Mode Avion : une pilule translucide, comme un bandeau de cabine. */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 px-3 sm:px-6 pt-3 pb-2 bg-[var(--fond)]/80 backdrop-blur">
      <nav aria-label="Principale" className="max-w-5xl mx-auto flex items-center justify-between gap-3 rounded-full border border-[var(--trait)] bg-[var(--carte)] pl-2 pr-1.5 py-1.5">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Mode Avion, accueil" className="flex items-center gap-2 pr-2">
          <Logo />
          <span className="font-[family-name:var(--titres)] font-semibold tracking-tight">Mode Avion</span>
        </Link>
        <ul className="hidden md:flex items-center gap-1 text-sm">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`block rounded-full px-4 py-2 ${chemin === l.href ? "bg-[var(--fond)]" : ""}`}>{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1.5">
          <Link href={`${DOSSIER}/seances`} className="hidden sm:inline-flex rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-4 h-10 items-center text-sm font-semibold">Réserver</Link>
          <button type="button" aria-expanded={ouvert} aria-controls="ma-menu" onClick={() => setOuvert((o) => !o)} className="md:hidden rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-4 h-10 text-sm font-semibold">
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="ma-menu" hidden={!ouvert} className="md:hidden max-w-5xl mx-auto mt-2 rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-2">
        <ul>
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex justify-between rounded-2xl px-4 py-3.5 font-[family-name:var(--titres)] text-xl font-semibold">
                {l.libelle} <span aria-hidden="true" className="text-[var(--accent-texte)]">✈</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
