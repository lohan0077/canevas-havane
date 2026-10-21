"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/** La barre du site : le nom en Didone au centre, un menu repliable sur téléphone. */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto grid h-[64px] max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 sm:px-8">
        <ul className="hidden items-center gap-6 text-[14px] lg:flex">
          {NAVIGATION.slice(0, 2).map((l) => <li key={l.href}><Link href={l.href} className="hover:text-[var(--accent-texte)]">{l.libelle}</Link></li>)}
        </ul>
        <span className="lg:hidden" />
        <Link href={DOSSIER} onClick={() => setOuvert(false)} className="font-[family-name:var(--titres)] text-[28px] leading-none tracking-[0.02em]" aria-label="Souvenance, accueil">
          Souvenance
        </Link>
        <div className="flex items-center justify-end gap-6">
          <ul className="hidden items-center gap-6 text-[14px] lg:flex">
            {NAVIGATION.slice(2).map((l) => <li key={l.href}><Link href={l.href} className="hover:text-[var(--accent-texte)]">{l.libelle}</Link></li>)}
          </ul>
          <button
            type="button"
            className="text-[14px] font-semibold underline underline-offset-4 lg:hidden"
            aria-expanded={ouvert}
            aria-controls="sv-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="sv-menu" hidden={!ouvert} className="border-t border-[var(--trait)] bg-[var(--fond)] lg:hidden">
        <ul className="mx-auto max-w-6xl px-5 py-4 text-center">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} onClick={() => setOuvert(false)} className="block py-3 font-[family-name:var(--titres)] text-[28px] italic">{l.libelle}</Link></li>
          ))}
        </ul>
      </div>
    </header>
  );
}
