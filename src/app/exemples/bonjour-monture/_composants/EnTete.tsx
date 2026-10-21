"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** La marque : « Bonjour » en italique, « Monture » droit, comme une signature. */
export function Logo({ grand = false }: { grand?: boolean }) {
  return (
    <span className={`font-[family-name:var(--titres)] leading-none whitespace-nowrap ${grand ? "text-5xl sm:text-6xl" : "text-[1.7rem]"}`}>
      <span className="italic">Bonjour</span> Monture
    </span>
  );
}

/**
 * La barre du haut, collée en haut de l'écran. Sous 900 px, les liens passent dans
 * un panneau ouvert par « Menu » ; « Réserver » reste toujours à portée de pouce.
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

  const actif = (href: string) => !href.includes("#") && (chemin === href || chemin.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]/95 backdrop-blur">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={DOSSIER} aria-label="Bonjour Monture, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden min-[900px]:flex items-center gap-8 text-[12px] font-bold uppercase tracking-[0.16em]">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={actif(l.href) ? "page" : undefined} className={`underline-offset-[6px] hover:underline ${actif(l.href) ? "underline" : ""}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href={`${DOSSIER}/essayage`} className="hidden min-[420px]:inline-flex min-h-10 items-center rounded-full bg-[var(--accent)] px-4 text-sm font-bold text-[var(--sur-accent)]">
            Réserver
          </Link>
          <button
            type="button"
            className="min-[900px]:hidden min-h-10 rounded-full border border-[var(--encre)] px-4 text-sm font-bold"
            aria-expanded={ouvert}
            aria-controls="bm-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="bm-menu" hidden={!ouvert} className="min-[900px]:hidden border-t border-[var(--trait)] bg-[var(--fond)]">
        <ul className="mx-auto max-w-6xl px-5 py-3">
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3.5 font-[family-name:var(--titres)] text-2xl">
                {l.libelle}
              </Link>
            </li>
          ))}
          <li className="py-4">
            <Link href={`${DOSSIER}/essayage`} onClick={() => setOuvert(false)} className="flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] text-base font-bold text-[var(--sur-accent)]">
              Réserver mon essayage
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
