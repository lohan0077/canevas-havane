"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le nom en bas de casse, et une bulle de conversation corail : ce qu'on se dira lundi. */
export function Logo() {
  return (
    <span className="inline-flex items-center gap-2">
      <svg viewBox="0 0 28 24" className="h-6 w-7" aria-hidden="true">
        <path d="M4 2h20a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H12l-6 5v-5H4a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3z" fill="var(--accent)" />
        <circle cx="9" cy="10" r="1.6" fill="var(--encre)" />
        <circle cx="14" cy="10" r="1.6" fill="var(--encre)" />
        <circle cx="19" cy="10" r="1.6" fill="var(--encre)" />
      </svg>
      <span className="font-[family-name:var(--titres)] text-[21px] font-bold lowercase tracking-[-0.02em]">lundi d&apos;après</span>
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
    <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-5 h-16">
        <Link href={DOSSIER} aria-label="Lundi d'Après, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden lg:flex items-center gap-1 rounded-full bg-[var(--carte)] p-1 text-[14px] font-medium">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={chemin === l.href ? "page" : undefined}
                className={`inline-flex h-9 items-center rounded-full px-4 ${chemin === l.href ? "bg-[var(--encre)] text-[var(--fond)]" : "hover:bg-[var(--fond)]"}`}
              >
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="lg:hidden inline-flex h-11 items-center gap-2 rounded-full bg-[var(--encre)] px-5 text-[14px] font-semibold text-[var(--fond)]"
          aria-expanded={ouvert}
          aria-controls="lda-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "fermer" : "menu"}
        </button>
      </nav>
      <div id="lda-menu" hidden={!ouvert} className="lg:hidden px-5 pb-4">
        <ul className="rounded-[24px] bg-[var(--carte)] p-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="block rounded-[18px] px-4 py-3.5 font-[family-name:var(--titres)] text-[22px] font-semibold lowercase hover:bg-[var(--fond)]">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
