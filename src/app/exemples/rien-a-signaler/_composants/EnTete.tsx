"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION } from "./donnees";

/** La barre de Rien à Signaler : la coche, deux liens. Repliée sous 768 px. */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur border-b border-[var(--trait)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto h-[64px] px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Rien à Signaler, accueil" className="flex items-center gap-2.5">
          <Logo taille={34} />
          <span className="font-[family-name:var(--titres)] text-xl font-bold tracking-[-0.02em]">Rien à Signaler</span>
        </Link>
        <ul className="hidden md:flex items-center gap-7 font-semibold">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`underline-offset-8 decoration-[3px] decoration-[var(--accent)] hover:underline ${chemin === l.href ? "underline" : ""}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="ras-menu"
          onClick={() => setOuvert((o) => !o)}
          className="md:hidden rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-5 h-11 font-semibold"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="ras-menu" hidden={!ouvert} className="md:hidden border-t border-[var(--trait)] bg-[var(--fond)]">
        <ul className="px-5 py-6 space-y-1">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-baseline justify-between py-3 font-[family-name:var(--titres)] text-3xl font-bold tracking-[-0.02em] border-b border-[var(--trait)]">
                {l.libelle}
                <span aria-hidden="true" className="text-xl text-[var(--accent-texte)]">✓</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
