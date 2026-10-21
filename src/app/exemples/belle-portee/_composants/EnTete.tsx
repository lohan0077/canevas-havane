"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le monogramme : un P, posé sur deux appuis, comme une poutre. */
export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="relative grid h-9 w-9 place-items-center bg-[var(--encre)] font-[family-name:var(--titres)] text-lg font-bold text-[#F2B134]">
        P
        <span className="absolute -bottom-1 left-0.5 h-1 w-1.5 bg-[var(--encre)]" />
        <span className="absolute -bottom-1 right-0.5 h-1 w-1.5 bg-[var(--encre)]" />
      </span>
      <span className="font-[family-name:var(--titres)] text-lg font-bold uppercase tracking-[0.06em]">Belle Portée</span>
    </span>
  );
}

/** La barre du site, encadrée d'un filet comme le reste de la page. */
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
    <header className="sticky top-0 z-40 border-b-2 border-[var(--encre)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-[64px] max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={DOSSIER} aria-label="Belle Portée, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden items-center gap-1 text-xs font-bold uppercase tracking-[0.14em] md:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`px-3 py-2 ${chemin === l.href ? "bg-[var(--accent)] text-[var(--sur-accent)]" : "hover:bg-[var(--carte)]"}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="bp-menu"
          onClick={() => setOuvert((o) => !o)}
          className="min-h-[44px] border-2 border-[var(--encre)] px-4 text-xs font-bold uppercase tracking-[0.14em] md:hidden"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="bp-menu" hidden={!ouvert} className="border-t-2 border-[var(--encre)] bg-[var(--accent)] md:hidden">
        <ul className="mx-auto max-w-6xl divide-y-2 divide-[var(--encre)] px-5">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-4 font-[family-name:var(--titres)] text-2xl font-bold uppercase text-[var(--sur-accent)]">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
