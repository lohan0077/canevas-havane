"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION } from "./donnees";

/** La barre de Pas Souple : une pilule claire qui flotte, le menu dedans, la réservation à côté. */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 px-3 sm:px-6 pt-3">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 rounded-full border border-[var(--trait)] bg-[var(--carte)]/90 backdrop-blur pl-2 pr-1 py-1">
          <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Pas Souple, accueil" className="flex items-center gap-2 pr-2">
            <Logo />
            <span className="font-[family-name:var(--titres)] text-lg">Pas Souple</span>
          </Link>
          <ul className="hidden md:flex items-center">
            {NAVIGATION.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`block rounded-full px-4 py-2 text-sm font-medium ${chemin === l.href ? "bg-[var(--fond)]" : ""}`}>{l.libelle}</Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            aria-expanded={ouvert}
            aria-controls="ps-menu"
            onClick={() => setOuvert((o) => !o)}
            className="md:hidden rounded-full bg-[var(--fond)] px-4 h-10 text-sm font-semibold"
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
        <Link href={`${DOSSIER}/planning`} className="rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-5 h-12 inline-flex items-center text-sm font-semibold">
          Réserver
        </Link>
      </nav>
      <div id="ps-menu" hidden={!ouvert} className="md:hidden mt-2 rounded-[24px] border border-[var(--trait)] bg-[var(--carte)] p-2">
        <ul>
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="block rounded-2xl px-4 py-3.5 font-[family-name:var(--titres)] text-2xl">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
