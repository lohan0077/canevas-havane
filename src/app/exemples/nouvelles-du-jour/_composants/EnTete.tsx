"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <span aria-hidden="true" className="relative grid h-9 w-9 place-items-center rounded-[12px] bg-[var(--accent)] text-xs font-bold text-[var(--sur-accent)]">
        NJ
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[var(--fond)] bg-[#E3A76F]" />
      </span>
      <span className="font-[family-name:var(--titres)] text-xl font-semibold tracking-tight">Nouvelles du Jour</span>
    </span>
  );
}

/** La barre du site : le nom, les liens en pastilles, « Menu » sous 768 px. */
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

  const actif = (href: string) => (href === DOSSIER ? chemin === href : chemin.startsWith(href));

  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-[66px] max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={DOSSIER} aria-label="Nouvelles du Jour, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden items-center gap-1 rounded-full bg-[var(--carte)] p-1 text-sm font-semibold shadow-sm md:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={actif(l.href) ? "page" : undefined} className={`block rounded-full px-4 py-2 ${actif(l.href) ? "bg-[#E6EDE4] text-[var(--accent-texte)]" : ""}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <Link href={`${DOSSIER}/devis`} className="hidden min-h-[44px] items-center rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--sur-accent)] md:inline-flex">
          Mon devis
        </Link>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="ndj-menu"
          onClick={() => setOuvert((o) => !o)}
          className="min-h-[44px] rounded-full bg-[var(--carte)] px-5 text-sm font-semibold shadow-sm md:hidden"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="ndj-menu" hidden={!ouvert} className="bg-[var(--fond)] md:hidden">
        <ul className="mx-auto max-w-6xl space-y-2 px-5 pb-5">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="block rounded-[20px] bg-[var(--carte)] px-5 py-4 text-lg font-semibold">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
