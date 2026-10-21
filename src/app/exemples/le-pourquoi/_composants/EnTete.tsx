"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le monogramme « ? » dans un rond, et le nom. */
export function Logo({ clair = false }: { clair?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className={`grid h-10 w-10 place-items-center rounded-full font-[family-name:var(--titres)] text-xl font-bold ${
          clair ? "bg-[#F3EBDD] text-[#1E3A34]" : "bg-[#1E3A34] text-[#F3EBDD]"
        }`}
      >
        ?
      </span>
      <span className="font-[family-name:var(--titres)] text-[21px] font-semibold tracking-[-0.02em] whitespace-nowrap">Le Pourquoi</span>
    </span>
  );
}

/**
 * L'en-tête, à la manière d'une pastille posée au-dessus de la page : le nom à
 * gauche, les liens au centre (sur grand écran), le rendez-vous à droite. Sur
 * téléphone, les liens passent dans un panneau ouvert par « Menu ».
 */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 h-[68px]">
        <Link href={DOSSIER} aria-label="Le Pourquoi, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden lg:flex items-center gap-1 rounded-full border border-[var(--trait)] bg-[var(--carte)] p-1 font-[family-name:var(--titres)] text-[15px]">
          {NAVIGATION.slice(0, 3).map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="block rounded-full px-4 py-2 hover:bg-[var(--fond)]">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link
            href={`${DOSSIER}/rendez-vous`}
            className="max-[419px]:hidden inline-flex items-center min-h-11 rounded-full bg-[var(--encre)] text-[var(--fond)] px-5 font-[family-name:var(--titres)] text-[15px] font-medium whitespace-nowrap"
          >
            Rendez-vous
          </Link>
          <button
            type="button"
            aria-expanded={ouvert}
            aria-controls="lp-menu"
            onClick={() => setOuvert((o) => !o)}
            className="lg:hidden inline-flex items-center min-h-11 rounded-full border border-[var(--encre)] px-4 font-[family-name:var(--titres)] text-[15px] font-medium"
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="lp-menu" hidden={!ouvert} className="lg:hidden border-y border-[var(--trait)] bg-[var(--fond)]">
        <ul className="px-4 py-2 font-[family-name:var(--titres)]">
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-center justify-between py-4 text-xl font-medium">
                {l.libelle}
                <span aria-hidden="true" className="text-[var(--accent-texte)]">?</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
