"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";
import { Monogramme } from "./Elements";

/** La barre du site : le nom au centre de l'attention, un menu repliable sur téléphone. */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)]/90 backdrop-blur-md">
      <nav aria-label="Principale" className="mx-auto flex h-[66px] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href={DOSSIER} className="flex items-center gap-3" onClick={() => setOuvert(false)} aria-label="Ombre Lente, accueil">
          <Monogramme />
          <span className="font-[family-name:var(--titres)] text-[26px] leading-none">Ombre Lente</span>
        </Link>
        <ul className="hidden items-center gap-8 text-[14px] lg:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:text-[var(--accent-texte)]">{l.libelle}</Link></li>
          ))}
        </ul>
        <button
          type="button"
          className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-[14px] font-semibold text-[var(--sur-accent)] lg:hidden"
          aria-expanded={ouvert}
          aria-controls="ol-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="ol-menu" hidden={!ouvert} className="border-t border-[var(--trait)] bg-[var(--fond)] lg:hidden">
        <ul className="mx-auto max-w-6xl px-5 py-4 text-center">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3 font-[family-name:var(--titres)] text-[30px]">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
