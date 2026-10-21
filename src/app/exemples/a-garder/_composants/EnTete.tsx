"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

export function Logo() {
  return (
    <span className="flex items-baseline gap-2">
      <span className="font-[family-name:var(--titres)] text-[28px] italic leading-none">À Garder</span>
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent-texte)]">imprimerie</span>
    </span>
  );
}

/** La barre du site : le nom, trois liens, et « Menu » sous 768 px. */
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
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-[64px] max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={DOSSIER} aria-label="À Garder, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[0.16em] md:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`underline-offset-8 hover:underline ${chemin === l.href ? "underline decoration-[var(--accent)] decoration-2" : ""}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="ag-menu"
          onClick={() => setOuvert((o) => !o)}
          className="min-h-[44px] rounded-full border-2 border-[var(--encre)] px-5 text-sm font-bold md:hidden"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="ag-menu" hidden={!ouvert} className="border-t border-[var(--trait)] bg-[var(--fond)] md:hidden">
        <ul className="mx-auto max-w-6xl px-5 py-3">
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-4 font-[family-name:var(--titres)] text-3xl italic">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
