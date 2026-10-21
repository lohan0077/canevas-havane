"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";
import { Logo } from "./Elements";

/** La barre du site, claire et fine ; un menu repliable sur téléphone. */
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
      <nav aria-label="Principale" className="mx-auto flex h-[62px] max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} className="flex items-center gap-2.5" aria-label="Vue Cadrée, accueil">
          <Logo />
          <span className="font-[family-name:var(--titres)] text-[23px] font-bold leading-none">Vue Cadrée</span>
        </Link>
        <ul className="hidden items-center gap-6 text-[14px] lg:flex">
          {NAVIGATION.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-[var(--accent-texte)]">{l.libelle}</Link></li>)}
        </ul>
        <button
          type="button"
          className="rounded-full bg-[var(--encre)] px-5 py-2.5 text-[14px] font-semibold text-[var(--fond)] lg:hidden"
          aria-expanded={ouvert}
          aria-controls="vc-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="vc-menu" hidden={!ouvert} className="border-t border-[var(--trait)] bg-[var(--fond)] lg:hidden">
        <ul className="mx-auto max-w-6xl px-5 py-3">
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3.5 font-[family-name:var(--titres)] text-[24px] font-bold">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
