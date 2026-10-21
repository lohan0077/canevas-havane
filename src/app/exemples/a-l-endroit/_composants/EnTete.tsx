"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/**
 * L'en-tête : le nom en Bodoni, sa réplique en miroir à peine visible derrière, et
 * les liens en petites lignes. Sous 900 px, un bouton « Menu » ouvre le panneau.
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
    <header className="sticky top-0 z-40 bg-[var(--fond)] border-b border-[var(--encre)]">
      <nav aria-label="Principale" className="mx-auto flex h-[60px] max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={DOSSIER} aria-label="À l'Endroit, accueil" onClick={() => setOuvert(false)} className="relative font-[family-name:var(--titres)] text-[1.75rem] leading-none whitespace-nowrap">
          À l&apos;Endroit
        </Link>
        <ul className="hidden min-[900px]:flex items-center gap-7 text-sm">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`hover:text-[var(--accent-texte)] ${chemin === l.href ? "underline underline-offset-[6px]" : ""}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
          <li>
            <Link href={`${DOSSIER}/seance`} className="inline-flex min-h-10 items-center rounded-full bg-[var(--accent)] px-5 font-semibold text-[var(--sur-accent)]">Réserver</Link>
          </li>
        </ul>
        <button
          type="button"
          className="min-[900px]:hidden min-h-10 px-1 text-sm font-semibold uppercase tracking-[0.18em] underline underline-offset-[6px]"
          aria-expanded={ouvert}
          aria-controls="ae-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="ae-menu" hidden={!ouvert} className="min-[900px]:hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <ul className="mx-auto max-w-6xl px-5 py-4">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3 font-[family-name:var(--titres)] text-4xl">
                {l.libelle}
              </Link>
            </li>
          ))}
          <li className="pt-4 pb-2">
            <Link href={`${DOSSIER}/seance`} onClick={() => setOuvert(false)} className="flex min-h-12 items-center justify-center rounded-full bg-[var(--sur-sombre)] font-semibold text-[var(--sombre)]">
              Réserver ma séance
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
