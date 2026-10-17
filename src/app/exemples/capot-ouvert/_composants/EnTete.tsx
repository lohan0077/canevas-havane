"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION } from "./donnees";

/** La barre de Capot Ouvert : un trait noir épais, comme une page de manuel d'atelier. */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)] border-b-[3px] border-[var(--trait)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto h-[64px] px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Capot Ouvert, accueil" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-[family-name:var(--titres)] text-2xl font-bold tracking-tight">Capot Ouvert</span>
        </Link>
        <ul className="hidden md:flex items-center gap-6 font-semibold">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`border-b-[3px] pb-1 ${chemin === l.href ? "border-[var(--accent)]" : "border-transparent hover:border-[var(--trait)]"}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="co-menu"
          onClick={() => setOuvert((o) => !o)}
          className="md:hidden h-11 px-4 rounded-md bg-[var(--sombre)] text-[var(--sur-sombre)] font-semibold"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="co-menu" hidden={!ouvert} className="md:hidden border-t-[3px] border-[var(--trait)] bg-[var(--carte)]">
        <ul className="divide-y-2 divide-[var(--trait)]">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-center justify-between px-5 py-4 font-[family-name:var(--titres)] text-2xl font-bold">
                {l.libelle} <span aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
