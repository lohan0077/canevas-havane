"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";
import { Logo } from "./Pictos";

/**
 * La barre du site : le logo à gauche, les liens dans une pilule au centre (sur
 * ordinateur), « Réserver » en noir à droite. Sous 1024 px, les liens passent dans
 * un panneau ouvert par « Menu ».
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

  const actif = (href: string) => chemin === href;

  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)] border-b border-[var(--encre)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 h-16">
        <Link href={DOSSIER} aria-label="Samedi Chantier, accueil" onClick={() => setOuvert(false)}>
          <Logo replie />
        </Link>

        <ul className="hidden lg:flex items-center gap-1 rounded-full border border-[var(--encre)] p-1 text-[13px] font-semibold uppercase tracking-[0.08em]">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={actif(l.href) ? "page" : undefined}
                className={`block rounded-full px-4 py-2 ${actif(l.href) ? "bg-[var(--encre)] text-[var(--fond)]" : "hover:bg-[var(--accent)]"}`}
              >
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={`${DOSSIER}/disponibilites`}
            className="inline-flex h-11 items-center rounded-full bg-[var(--encre)] px-5 text-[13px] font-bold uppercase tracking-[0.08em] text-[var(--fond)] max-[370px]:hidden"
          >
            Réserver
          </Link>
          <button
            type="button"
            className="lg:hidden inline-flex h-11 items-center rounded-full border border-[var(--encre)] px-4 text-[13px] font-bold uppercase tracking-[0.08em]"
            aria-expanded={ouvert}
            aria-controls="sc-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>

      <div id="sc-menu" hidden={!ouvert} className="lg:hidden border-t border-[var(--encre)] bg-[var(--fond)]">
        <ul className="max-w-6xl mx-auto px-4 sm:px-6 py-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l, i) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link
                href={l.href}
                onClick={() => setOuvert(false)}
                aria-current={actif(l.href) ? "page" : undefined}
                className="flex items-baseline gap-4 py-4 text-lg font-bold uppercase tracking-[0.02em]"
              >
                <span className="text-xs tabular-nums text-[var(--doux)]">{String(i + 1).padStart(2, "0")}</span>
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
