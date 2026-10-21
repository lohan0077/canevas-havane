"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le monogramme : un 2, et deux petits sucres. */
export function Logo() {
  return (
    <span className="flex items-center gap-4">
      <span aria-hidden="true" className="relative grid h-10 w-10 place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] text-xl italic text-[var(--sur-accent)]">
        2
        <span className="absolute -right-1 top-0 h-2.5 w-2.5 rotate-12 rounded-[2px] border border-[#5A3E2B] bg-white" />
        <span className="absolute -right-2 top-3 h-2.5 w-2.5 -rotate-12 rounded-[2px] border border-[#5A3E2B] bg-white" />
      </span>
      <span className="font-[family-name:var(--titres)] text-2xl font-semibold tracking-tight">Deux Sucres</span>
    </span>
  );
}

/** La barre du site : le nom, trois liens, « Menu » sous 768 px. */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOuvert(false);
    };
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-[66px] max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={DOSSIER} aria-label="Deux Sucres, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden items-center gap-7 text-sm font-semibold md:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`underline-offset-8 hover:underline ${chemin === l.href ? "text-[var(--accent-texte)] underline" : ""}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="ds-menu"
          onClick={() => setOuvert((o) => !o)}
          className="min-h-[44px] rounded-full border-2 border-[var(--accent)] px-5 text-sm font-semibold md:hidden"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="ds-menu" hidden={!ouvert} className="bg-[var(--fond)] md:hidden">
        <ul className="mx-auto max-w-6xl px-5 pb-5">
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-4 font-[family-name:var(--titres)] text-2xl">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
