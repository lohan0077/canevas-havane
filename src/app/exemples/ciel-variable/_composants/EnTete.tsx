"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le monogramme : C et V dans un cercle, comme un sigle de bulletin météo. */
export function Monogramme({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`grid place-items-center rounded-full border border-current font-[family-name:var(--titres)] text-[11px] font-semibold tracking-[0.08em] ${className}`}>
      CV
    </span>
  );
}

/**
 * La barre du haut : le nom en capitales, quatre liens fins. Sous 900 px, les liens
 * passent dans un panneau ouvert par « Menu ».
 */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]/95 backdrop-blur">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={DOSSIER} className="flex items-center gap-3" onClick={() => setOuvert(false)} aria-label="Ciel Variable, accueil">
          <Monogramme className="h-9 w-9" />
          <span className="font-[family-name:var(--titres)] text-sm font-semibold uppercase tracking-[0.28em]">Ciel Variable</span>
        </Link>
        <ul className="hidden items-center gap-8 font-[family-name:var(--titres)] text-[11px] uppercase tracking-[0.24em] min-[900px]:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:underline underline-offset-8">{l.libelle}</Link></li>
          ))}
        </ul>
        <button
          type="button"
          className="font-[family-name:var(--titres)] rounded-full border border-[var(--encre)] px-4 py-2 text-[11px] uppercase tracking-[0.24em] min-[900px]:hidden"
          aria-expanded={ouvert}
          aria-controls="cv-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="cv-menu" hidden={!ouvert} className="border-t border-[var(--trait)] bg-[var(--fond)] min-[900px]:hidden">
        <ul className="mx-auto max-w-6xl px-4 py-2">
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-4 font-[family-name:var(--titres)] text-lg font-light uppercase tracking-[0.08em]">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
