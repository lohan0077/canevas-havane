"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/**
 * La barre du haut : le nom en romain et italique, les liens, et la pilule
 * « Commander ». Sous 900 px, les liens passent dans un panneau ouvert par « Menu ».
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
    <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} className="font-[family-name:var(--titres)] text-[26px] leading-none" aria-label="Deux Mots, accueil">
          Deux <span className="italic">Mots</span>
        </Link>
        <ul className="hidden items-center gap-8 text-sm min-[900px]:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:underline underline-offset-4">{l.libelle}</Link></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href={`${DOSSIER}#choix`} className="rounded-full bg-[var(--encre)] px-4 py-2.5 text-sm font-semibold text-[var(--fond)] max-[360px]:hidden">
            Commander
          </Link>
          <button
            type="button"
            className="rounded-full border border-[var(--encre)] px-4 py-2.5 text-sm font-semibold min-[900px]:hidden"
            aria-expanded={ouvert}
            aria-controls="dm-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="dm-menu" hidden={!ouvert} className="border-t border-[var(--trait)] bg-[var(--fond)] min-[900px]:hidden">
        <ul className="mx-auto max-w-6xl px-4 py-2">
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3.5 font-[family-name:var(--titres)] text-2xl italic">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
