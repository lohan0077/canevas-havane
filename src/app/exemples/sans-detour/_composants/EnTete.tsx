"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION } from "./donnees";

/**
 * La barre de navigation, collée en haut. Sous 900 px, les liens passent dans un
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

  const actif = (href: string) => chemin === href;

  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur border-b border-[var(--trait)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 h-16">
        <Link href={DOSSIER} aria-label="Sans Détour, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>

        <ul className="hidden min-[900px]:flex items-center gap-7 text-[15px] font-semibold">
          {NAVIGATION.slice(0, 2).map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={actif(l.href) ? "page" : undefined}
                className={`underline-offset-[6px] decoration-2 hover:underline ${actif(l.href) ? "underline decoration-[var(--accent)]" : ""}`}
              >
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={`${DOSSIER}/reserver`}
            className="inline-flex items-center min-h-11 rounded-full bg-[var(--encre)] text-[var(--fond)] px-5 text-sm font-bold"
          >
            Réserver
          </Link>
          <button
            type="button"
            className="min-[900px]:hidden inline-flex items-center min-h-11 rounded-full border-2 border-[var(--encre)] px-4 text-sm font-bold"
            aria-expanded={ouvert}
            aria-controls="sd-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>

      <div id="sd-menu" hidden={!ouvert} className="min-[900px]:hidden border-t border-[var(--trait)] bg-[var(--fond)]">
        <ul className="max-w-6xl mx-auto px-4 py-3">
          <li className="border-b border-[var(--trait)]">
            <Link href={DOSSIER} onClick={() => setOuvert(false)} className="block py-4 text-lg font-bold">Accueil</Link>
          </li>
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link
                href={l.href}
                onClick={() => setOuvert(false)}
                aria-current={actif(l.href) ? "page" : undefined}
                className="flex items-center justify-between py-4 text-lg font-bold"
              >
                {l.libelle}
                <span aria-hidden="true" className="text-[var(--accent-texte)]">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
