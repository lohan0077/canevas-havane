"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/**
 * L'en-tête, centré comme une page de titre : le monogramme III dans son cercle, le nom
 * en Bodoni, les liens en petites capitales de part et d'autre (sur grand écran).
 */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  const gauche = NAVIGATION.slice(0, 2);
  const droite = NAVIGATION.slice(2);
  const lien = "text-[12px] font-semibold uppercase tracking-[0.22em] underline-offset-8 hover:underline";

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]/95 backdrop-blur">
      <nav aria-label="Principale" className="mx-auto grid h-[68px] max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 sm:px-8">
        <div className="flex items-center gap-7">
          <button
            type="button"
            className="h-10 border border-[var(--encre)] px-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] lg:hidden"
            aria-expanded={ouvert}
            aria-controls="tm-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
          {gauche.map((l) => (
            <Link key={l.href} href={l.href} className={`hidden lg:inline ${lien}`}>{l.libelle}</Link>
          ))}
        </div>
        <Link href={DOSSIER} aria-label="Trois Marches, accueil" onClick={() => setOuvert(false)} className="flex items-center gap-2.5">
          <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full border border-[var(--encre)] font-[family-name:var(--titres)] text-[13px] tracking-[0.08em]">III</span>
          <span className="font-[family-name:var(--titres)] text-[22px] leading-none sm:text-[26px]">Trois Marches</span>
        </Link>
        <div className="flex items-center justify-end gap-7">
          {droite.map((l) => (
            <Link key={l.href} href={l.href} className={`hidden lg:inline ${lien}`}>{l.libelle}</Link>
          ))}
        </div>
      </nav>
      <ul id="tm-menu" hidden={!ouvert} className="absolute inset-x-0 top-full border-b border-[var(--trait)] bg-[var(--fond)] px-5 py-2 lg:hidden">
        {NAVIGATION.map((l) => (
          <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
            <Link href={l.href} onClick={() => setOuvert(false)} className="block py-4 font-[family-name:var(--titres)] text-[26px]">
              {l.libelle}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
