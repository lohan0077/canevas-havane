"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/**
 * La barre du haut, comme l'en-tête d'un musée : le monogramme « 12 », le nom en
 * petites capitales, les liens. Sous 900 px, les liens passent dans « Menu ».
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
    <header className="sticky top-0 z-40 border-b border-[var(--encre)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} className="flex items-center gap-3" aria-label="Douze Mois, accueil">
          <span aria-hidden="true" className="font-[family-name:var(--titres)] text-3xl italic leading-none">12</span>
          <span className="text-[11px] uppercase tracking-[0.3em]">Douze Mois</span>
        </Link>
        <ul className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.22em] min-[900px]:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:underline underline-offset-8">{l.libelle}</Link></li>
          ))}
        </ul>
        <button
          type="button"
          className="border border-[var(--encre)] px-4 py-2 text-[11px] uppercase tracking-[0.22em] min-[900px]:hidden"
          aria-expanded={ouvert}
          aria-controls="dzm-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="dzm-menu" hidden={!ouvert} className="border-t border-[var(--trait)] bg-[var(--fond)] min-[900px]:hidden">
        <ul className="mx-auto max-w-6xl px-4 py-2">
          {NAVIGATION.map((l, i) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-baseline gap-4 py-3.5">
                <span className="text-[11px] tracking-[0.2em] text-[var(--doux)]">0{i + 1}</span>
                <span className="font-[family-name:var(--titres)] text-2xl">{l.libelle}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
