"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le nom : « DEUX » en gras, « HEURES » en maigre, comme deux aiguilles. */
export function Logo() {
  return (
    <span className="font-[family-name:var(--titres)] text-[17px] uppercase tracking-[-0.02em] leading-none">
      <span className="font-extrabold">Deux</span> <span className="font-light">Heures</span>
    </span>
  );
}

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
    <header className="sticky top-0 z-40 bg-[var(--fond)]/90 backdrop-blur border-b border-[var(--trait)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-5 h-16">
        <Link href={DOSSIER} aria-label="Deux Heures, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden md:flex items-center gap-7 text-[14px]">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className="hover:text-[var(--accent-texte)]">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href={`${DOSSIER}/samedis-libres`} className="inline-flex h-10 items-center rounded-full bg-[var(--encre)] px-4 text-[13px] font-semibold text-[var(--fond)] max-[360px]:hidden">
            Ma date
          </Link>
          <button
            type="button"
            className="md:hidden inline-flex h-10 items-center rounded-full border border-[var(--trait)] px-4 text-[13px] font-semibold"
            aria-expanded={ouvert}
            aria-controls="dh-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="dh-menu" hidden={!ouvert} className="md:hidden border-t border-[var(--trait)] bg-[var(--fond)]">
        <ul className="px-5 py-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-4 font-[family-name:var(--titres)] text-xl uppercase">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
