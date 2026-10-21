"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";
import { Monogramme } from "./Dessins";

/** La barre du site : le nom, les pages, et un menu repliable sur téléphone. */
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
      <nav aria-label="Principale" className="mx-auto flex h-[64px] max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href={DOSSIER} className="flex items-center gap-2.5" onClick={() => setOuvert(false)} aria-label="Premier Fruit, accueil">
          <Monogramme />
          <span className="whitespace-nowrap font-[family-name:var(--titres)] text-[22px] leading-none">Premier Fruit</span>
        </Link>
        <ul className="hidden lg:flex items-center gap-7 text-[15px] font-medium">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:text-[var(--accent-texte)]">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href={`${DOSSIER}/arbres`} className="rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--sur-accent)] max-[430px]:hidden">
            Commander
          </Link>
          <button
            type="button"
            className="rounded-full border-2 border-[var(--encre)] px-4 py-2 text-sm font-semibold lg:hidden"
            aria-expanded={ouvert}
            aria-controls="pf-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="pf-menu" hidden={!ouvert} className="lg:hidden border-t border-[var(--trait)] bg-[var(--fond)]">
        <ul className="mx-auto max-w-6xl px-4 py-3">
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
