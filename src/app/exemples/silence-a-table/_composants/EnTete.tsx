"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le nom, en bas de casse, avec un point cuivre : une assiette vue de dessus. */
export function Logo() {
  return (
    <span className="inline-flex items-center gap-2 font-[family-name:var(--titres)] text-[26px] leading-none">
      <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
        <circle cx="10" cy="10" r="8.5" fill="none" stroke="var(--accent)" strokeWidth="1.4" />
        <circle cx="10" cy="10" r="4" fill="var(--accent)" />
      </svg>
      silence à table
    </span>
  );
}

export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOuvert(false);
    };
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur border-b border-[var(--trait)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-5 h-16">
        <Link href={DOSSIER} aria-label="Silence à Table, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-[15px]">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={chemin === l.href ? "page" : undefined}
                className={l.libelle === "Dégustation" ? "inline-flex h-10 items-center rounded-full bg-[var(--accent)] px-5 font-medium text-[var(--sur-accent)]" : "hover:text-[var(--accent-texte)]"}
              >
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="md:hidden inline-flex h-11 items-center rounded-full border border-[var(--trait)] px-5 text-[15px]"
          aria-expanded={ouvert}
          aria-controls="sat-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "fermer" : "menu"}
        </button>
      </nav>
      <div id="sat-menu" hidden={!ouvert} className="md:hidden border-t border-[var(--trait)] bg-[var(--fond)]">
        <ul className="px-5 py-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-4 font-[family-name:var(--titres)] text-[28px] lowercase">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
