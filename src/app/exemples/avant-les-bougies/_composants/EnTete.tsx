"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/** La flamme d'une bougie : le signe de la pâtisserie. */
export function Flamme({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" aria-hidden="true" className={className}>
      <path d="M12 2c3 5 7 8 7 14a7 7 0 0 1-14 0c0-4 2-6 4-8 0 3 1 4 3 5 0-4-1-7 0-11Z" fill="#C42D47" />
      <rect x="10" y="23" width="4" height="8" rx="1" fill="#3B1A12" />
    </svg>
  );
}

/**
 * La barre en pilule, posée sur le ciel : le nom, les liens. Sous 900 px, les liens
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
    <header className="sticky top-0 z-40 px-3 pt-3">
      <nav aria-label="Principale" className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full border-2 border-[var(--encre)] bg-[var(--carte)] pl-4 pr-1.5 shadow-[0_10px_30px_-20px_rgba(59,26,18,0.6)]">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} className="flex items-center gap-2" aria-label="Avant les Bougies, accueil">
          <Flamme className="h-7 w-5" />
          <span className="font-[family-name:var(--titres)] text-lg font-extrabold tracking-tight">Avant les Bougies</span>
        </Link>
        <ul className="hidden items-center gap-1 text-sm font-semibold min-[900px]:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="rounded-full px-4 py-2 hover:bg-[var(--fond)]">{l.libelle}</Link></li>
          ))}
        </ul>
        <button
          type="button"
          className="rounded-full bg-[var(--encre)] px-4 py-2.5 text-sm font-bold text-[var(--fond)] min-[900px]:hidden"
          aria-expanded={ouvert}
          aria-controls="alb-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="alb-menu" hidden={!ouvert} className="mx-auto mt-2 max-w-6xl rounded-[28px] border-2 border-[var(--encre)] bg-[var(--carte)] min-[900px]:hidden">
        <ul className="px-5 py-2">
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3.5 font-[family-name:var(--titres)] text-2xl font-extrabold">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
