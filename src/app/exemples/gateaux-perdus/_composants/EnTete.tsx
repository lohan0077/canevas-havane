"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/**
 * La barre du haut : le nom à gauche, les liens réunis dans une pilule au centre.
 * Sous 900 px, les liens passent dans un panneau ouvert par « Menu ».
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
        <Link href={DOSSIER} onClick={() => setOuvert(false)} className="flex items-baseline gap-2" aria-label="Gâteaux Perdus, accueil">
          <span aria-hidden="true" className="grid h-9 w-9 place-items-center self-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] text-sm text-[var(--sur-accent)]">GP</span>
          <span className="font-[family-name:var(--titres)] text-2xl">Gâteaux <span className="italic">Perdus</span></span>
        </Link>
        <ul className="hidden items-center gap-1 rounded-full border border-[var(--accent)] p-1 text-sm min-[900px]:flex">
          {NAVIGATION.map((l, i) => (
            <li key={l.href}>
              <Link href={l.href} className={`block rounded-full px-4 py-1.5 ${i === 0 ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "hover:bg-[var(--carte)]"}`}>{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="rounded-full border border-[var(--accent)] px-4 py-2 text-sm font-semibold min-[900px]:hidden"
          aria-expanded={ouvert}
          aria-controls="gp-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="gp-menu" hidden={!ouvert} className="border-t border-[var(--trait)] bg-[var(--fond)] min-[900px]:hidden">
        <ul className="mx-auto max-w-6xl px-4 py-2">
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3.5 font-[family-name:var(--titres)] text-2xl">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
