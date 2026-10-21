"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

export function Logo() {
  return (
    <span className="inline-flex items-baseline gap-1 font-[family-name:var(--titres)] text-[22px] leading-none">
      Le Bon <span className="relative">Chapitre<span aria-hidden="true" className="absolute -bottom-1 left-0 right-0 h-[3px] -rotate-1 rounded-full bg-[var(--accent)]" /></span>
    </span>
  );
}

/** La barre du site : le nom au centre sur ordinateur, à gauche sur téléphone. */
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
    <header className="sticky top-0 z-40 bg-[var(--fond)] border-b-2 border-[var(--encre)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 h-16">
        <p className="hidden md:block font-[family-name:var(--f-caveat)] text-xl text-[var(--accent-texte)]">Maths · collège · à domicile</p>
        <Link href={DOSSIER} aria-label="Le Bon Chapitre, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <div className="flex items-center justify-end gap-2">
          <ul className="hidden md:flex items-center gap-6 mr-2 font-semibold">
            {NAVIGATION.map((l) => (
              <li key={l.href}>
                <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className="hover:underline underline-offset-4">
                  {l.libelle}
                </Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="md:hidden inline-flex items-center rounded-full border-2 border-[var(--encre)] px-4 h-10 text-sm font-bold"
            aria-expanded={ouvert}
            aria-controls="lbc-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="lbc-menu" hidden={!ouvert} className="md:hidden border-t border-[var(--trait)] bg-[var(--fond)]">
        <ul className="px-5 py-3">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-4 text-lg font-semibold">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
