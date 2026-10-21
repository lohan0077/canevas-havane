"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION } from "./donnees";

/** La barre de Nuit d'Août : la lune, trois liens, la date de pose. Repliée sous 768 px. */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur border-b border-[var(--trait)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto h-[64px] px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Nuit d'Août, accueil" className="flex items-center gap-2.5">
          <Logo taille={34} />
          <span className="font-[family-name:var(--titres)] text-xl font-semibold tracking-tight">Nuit d&apos;Août</span>
        </Link>
        <ul className="hidden md:flex items-center gap-7 text-sm font-medium">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`underline-offset-8 decoration-[var(--accent)] hover:underline ${chemin === l.href ? "underline" : ""}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
          <li>
            <Link href={`${DOSSIER}/ma-date`} className="rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-5 py-2.5">Réserver ma pose</Link>
          </li>
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="nda-menu"
          onClick={() => setOuvert((o) => !o)}
          className="md:hidden rounded-full border border-[var(--trait)] bg-[var(--carte)] px-5 h-11 text-sm font-semibold"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="nda-menu" hidden={!ouvert} className="md:hidden border-t border-[var(--trait)] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <ul className="px-5 py-6 space-y-1">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-baseline justify-between py-3 font-[family-name:var(--titres)] text-3xl font-light border-b border-[var(--sur-sombre)]/20">
                {l.libelle}
                <span aria-hidden="true" className="text-xl text-[#F2B6A0]">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
