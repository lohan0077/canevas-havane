"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** La barre de L'Addition : le nom en gras, un point final, trois liens. Repliée sous 768 px. */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b-2 border-[var(--encre)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="L'Addition, accueil" className="font-[family-name:var(--titres)] text-2xl font-black tracking-tight">
          L&apos;Addition<span className="text-[var(--accent-texte)]">.</span>
        </Link>
        <ul className="hidden items-center gap-6 text-sm font-bold md:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`rounded-full px-3 py-1.5 ${chemin === l.href ? "bg-[var(--encre)] text-[var(--fond)]" : "hover:underline"}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="ad-menu"
          onClick={() => setOuvert((o) => !o)}
          className="h-11 rounded-full bg-[var(--encre)] px-5 text-sm font-bold text-[var(--fond)] md:hidden"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="ad-menu" hidden={!ouvert} className="border-t-2 border-[var(--encre)] bg-[var(--fond)] md:hidden">
        <ul className="divide-y-2 divide-[var(--encre)]">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-center justify-between px-5 py-4 font-[family-name:var(--titres)] text-3xl font-black tracking-tight">
                {l.libelle}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
