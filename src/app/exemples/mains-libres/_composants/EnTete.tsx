"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION } from "./donnees";

/** La barre de Mains Libres : le nom, une pilule de navigation au centre, le rendez-vous. */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur">
      <nav aria-label="Principale" className="max-w-6xl mx-auto h-[68px] px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Mains Libres, accueil" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-[family-name:var(--titres)] text-lg font-bold tracking-tight">Mains Libres</span>
        </Link>
        <ul className="hidden md:flex items-center gap-1 rounded-full border border-[var(--trait)] bg-[var(--carte)] p-1 text-sm">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`block rounded-full px-4 py-2 font-medium ${chemin === l.href ? "bg-[var(--encre)] text-[var(--fond)]" : ""}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href={`${DOSSIER}/rendez-vous`} className="hidden sm:inline-flex rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-5 h-11 items-center text-sm font-bold">
            Réserver
          </Link>
          <button
            type="button"
            aria-expanded={ouvert}
            aria-controls="ml-menu"
            onClick={() => setOuvert((o) => !o)}
            className="md:hidden rounded-full border border-[var(--trait)] bg-[var(--carte)] px-5 h-11 text-sm font-semibold"
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="ml-menu" hidden={!ouvert} className="md:hidden border-y border-[var(--trait)] bg-[var(--carte)]">
        <ul className="px-4 py-4 grid gap-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex justify-between rounded-2xl border border-[var(--trait)] px-5 py-4 font-[family-name:var(--titres)] text-xl font-semibold">
                {l.libelle} <span aria-hidden="true" className="text-[var(--accent-texte)]">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
