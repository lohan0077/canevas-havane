"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION } from "./donnees";

/** La barre de Jusqu'au Café : le monogramme, deux liens, la prise de cotes. Repliée sous 768 px. */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur border-b border-[var(--trait)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto h-[64px] px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Jusqu'au Café, accueil" className="flex items-center gap-2.5">
          <Logo taille={34} />
          <span className="leading-none">
            <span className="block font-[family-name:var(--titres)] text-xl">Jusqu&apos;au Café</span>
            <span className="block text-[11px] uppercase tracking-[0.2em] text-[var(--doux)]">cuisiniste</span>
          </span>
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`underline-offset-8 decoration-[var(--accent)] hover:underline ${chemin === l.href ? "underline" : ""}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
          <li>
            <Link href={`${DOSSIER}/ma-cuisine#cotes`} className="rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-5 py-2.5">
              Prise de cotes
            </Link>
          </li>
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="jac-menu"
          onClick={() => setOuvert((o) => !o)}
          className="md:hidden rounded-full border border-[var(--encre)] px-5 h-11 text-sm font-semibold"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="jac-menu" hidden={!ouvert} className="md:hidden border-t border-[var(--trait)] bg-[var(--fond)]">
        <ul className="px-5 py-6 space-y-1">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/ma-cuisine#cotes`, libelle: "Prise de cotes" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-baseline justify-between py-3 font-[family-name:var(--titres)] text-3xl border-b border-[var(--trait)]">
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
