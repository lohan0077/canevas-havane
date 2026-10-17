"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/**
 * La barre du site, à la façon d'un cartel de musée : le nom au centre, les rubriques
 * en petites capitales. Sous 768 px, les rubriques passent dans un panneau.
 */
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
    <header className="sticky top-0 z-40 bg-[var(--fond)] border-b border-[var(--encre)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 h-16">
        <ul className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-[0.16em]">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`py-2 border-b-2 ${chemin === l.href ? "border-[var(--accent)]" : "border-transparent"}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <Link href={DOSSIER} aria-label="Pour Plus Tard, accueil" onClick={() => setOuvert(false)} className="font-[family-name:var(--titres)] text-2xl italic tracking-[-0.01em] md:text-center">
          Pour Plus Tard
        </Link>
        <div className="flex items-center justify-end gap-2">
          <Link href={`${DOSSIER}/la-boite#reserver`} className="hidden md:inline-flex items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-5 h-11 text-sm font-bold">
            Réserver ma séance
          </Link>
          <button
            type="button"
            className="md:hidden inline-flex items-center h-11 px-4 border border-[var(--encre)] text-xs font-bold uppercase tracking-[0.16em]"
            aria-expanded={ouvert}
            aria-controls="ppt-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="ppt-menu" hidden={!ouvert} className="md:hidden border-t border-[var(--encre)] bg-[var(--fond)]">
        <ol className="px-5 py-2">
          {NAVIGATION.map((l, i) => (
            <li key={l.href} className="border-b border-[var(--trait)]">
              <Link href={l.href} onClick={() => setOuvert(false)} aria-current={chemin === l.href ? "page" : undefined} className="flex items-baseline gap-4 py-4">
                <span className="text-xs font-bold tabular-nums">0{i + 1}</span>
                <span className="font-[family-name:var(--titres)] text-2xl">{l.libelle}</span>
              </Link>
            </li>
          ))}
          <li className="py-4">
            <Link href={`${DOSSIER}/la-boite#reserver`} onClick={() => setOuvert(false)} className="flex min-h-[52px] items-center justify-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] font-bold">
              Réserver ma séance
            </Link>
          </li>
        </ol>
      </div>
    </header>
  );
}
