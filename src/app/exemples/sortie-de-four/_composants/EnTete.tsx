"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION, ouvertures } from "./donnees";

/** La voûte du four, et un bol dedans : le monogramme de l'atelier. */
export function Logo({ taille = 30 }: { taille?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={taille} height={taille} aria-hidden="true">
      <path d="M4 30 V14 A12 12 0 0 1 28 14 V30 Z" fill="var(--accent)" />
      <path d="M9 24 C9 28 12 29 16 29 C20 29 23 28 23 24 Z" fill="var(--fond)" />
    </svg>
  );
}

/** La barre de Sortie de Four : le nom, trois liens, la date du prochain four. Repliée sous 768 px. */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]/95 backdrop-blur">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Sortie de Four, accueil" className="flex items-center gap-2.5">
          <Logo />
          <span className="font-[family-name:var(--titres)] text-[26px] leading-none">
            Sortie <span className="italic">de</span> Four
          </span>
        </Link>
        <ul className="hidden items-center gap-7 text-sm font-semibold md:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`underline-offset-8 decoration-2 decoration-[var(--accent)] hover:underline ${chemin === l.href ? "underline" : ""}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
          <li>
            <Link href={`${DOSSIER}/ouverture-du-four`} className="rounded-full bg-[var(--encre)] px-4 py-2.5 text-[var(--fond)]">
              Four ouvert le {ouvertures.prochaine.court}
            </Link>
          </li>
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="sdf-menu"
          onClick={() => setOuvert((o) => !o)}
          className="h-11 rounded-full border border-[var(--encre)] px-5 text-sm font-semibold md:hidden"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="sdf-menu" hidden={!ouvert} className="border-t border-[var(--trait)] bg-[var(--fond)] md:hidden">
        <ul className="space-y-1 px-5 py-5">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-center justify-between border-b border-[var(--trait)] py-3 font-[family-name:var(--titres)] text-3xl">
                {l.libelle}
                <span aria-hidden="true" className="text-[var(--accent-texte)]">→</span>
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <Link href={`${DOSSIER}/ouverture-du-four`} onClick={() => setOuvert(false)} className="flex justify-center rounded-full bg-[var(--accent)] px-6 py-4 font-bold text-[var(--sur-accent)]">
              Prochain four : {ouvertures.prochaine.date}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
