"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION } from "./donnees";

/** La barre de Relue : le cachet, le nom, trois liens. Repliée sous 768 px. */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur border-b border-[var(--trait)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto h-[64px] px-5 sm:px-8 flex items-center justify-between gap-4">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Relue, accueil" className="flex items-center gap-2.5">
          <Logo taille={32} />
          <span className="font-[family-name:var(--titres)] text-3xl leading-none">Relue</span>
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-[0.14em]">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`underline-offset-8 hover:underline ${chemin === l.href ? "underline" : ""}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="relue-menu"
          onClick={() => setOuvert((o) => !o)}
          className="md:hidden h-11 px-4 text-sm font-medium uppercase tracking-[0.14em] border-b border-[var(--encre)]"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="relue-menu" hidden={!ouvert} className="md:hidden border-t border-[var(--trait)] bg-[var(--fond)]">
        <ul className="px-5 py-6 space-y-1">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-baseline justify-between py-3 font-[family-name:var(--titres)] text-4xl border-b border-[var(--trait)]">
                {l.libelle}
                <span aria-hidden="true" className="text-xl text-[var(--accent-texte)]">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
