"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le soleil bas sur l'horizon du pré : le signe de la ferme. */
export function Signe({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 24a11 11 0 0 1 22 0" fill="currentColor" />
      <path d="M5 24h30M8 29h24M12 33.5h16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * La barre du haut, collée à l'écran. Sous 900 px, les liens passent dans un
 * panneau ouvert par « Menu » ; le bouton « Réserver » reste toujours visible.
 */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]/95 backdrop-blur">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href={DOSSIER} className="flex items-center gap-2.5" onClick={() => setOuvert(false)} aria-label="Le Pré du Vendredi, accueil">
          <Signe className="h-9 w-9 text-[var(--accent)]" />
          <span className="font-[family-name:var(--titres)] text-[22px] leading-none">
            Le Pré <span className="italic">du Vendredi</span>
          </span>
        </Link>
        <ul className="hidden items-center gap-7 text-sm min-[900px]:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className="hover:text-[var(--accent-texte)] aria-[current=page]:text-[var(--accent-texte)]">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href={`${DOSSIER}#decoupe`} className="rounded-full bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-[var(--sur-accent)] max-[380px]:hidden">
            Réserver
          </Link>
          <button
            type="button"
            className="rounded-full border border-[var(--trait)] px-4 py-2.5 text-sm font-semibold min-[900px]:hidden"
            aria-expanded={ouvert}
            aria-controls="pv-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="pv-menu" hidden={!ouvert} className="border-t border-[var(--trait)] bg-[var(--fond)] min-[900px]:hidden">
        <ul className="mx-auto max-w-6xl px-4 py-3">
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3.5 font-[family-name:var(--titres)] text-2xl">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
