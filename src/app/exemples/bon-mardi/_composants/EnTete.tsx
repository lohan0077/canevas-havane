"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le logo : un billet, perforé, « Bon Mardi ». */
export function Logo() {
  return (
    <span className="relative inline-flex items-center rounded-md bg-[var(--accent)] text-[var(--sur-accent)] border-2 border-[var(--encre)] pl-2.5 pr-3 h-9 font-[family-name:var(--titres)] text-lg font-extrabold tracking-[-0.02em]">
      <span aria-hidden="true" className="absolute -left-[7px] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[var(--fond)] border-2 border-[var(--encre)]" />
      <span aria-hidden="true" className="absolute -right-[7px] top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[var(--fond)] border-2 border-[var(--encre)]" />
      Bon&nbsp;Mardi
    </span>
  );
}

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
    <header className="sticky top-0 z-40 bg-[var(--fond)] border-b-2 border-[var(--encre)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
        <Link href={DOSSIER} aria-label="Bon Mardi, accueil" onClick={() => setOuvert(false)} className="pl-1.5">
          <Logo />
        </Link>
        <ul className="hidden md:flex items-center gap-7 font-bold">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className="hover:underline underline-offset-4 decoration-2">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href={`${DOSSIER}#calendrier`} className="inline-flex h-10 items-center rounded-full bg-[var(--sombre)] px-4 text-sm font-bold text-[var(--sur-sombre)]">
            Ma date
          </Link>
          <button
            type="button"
            className="md:hidden grid h-10 w-10 place-items-center rounded-full border-2 border-[var(--encre)]"
            aria-expanded={ouvert}
            aria-controls="bm-menu"
            aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOuvert((o) => !o)}
          >
            <span aria-hidden="true" className="relative block h-3 w-4">
              <span className={`absolute left-0 h-0.5 w-4 bg-[var(--encre)] transition-transform ${ouvert ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-4 bg-[var(--encre)] transition-transform ${ouvert ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </nav>
      <div id="bm-menu" hidden={!ouvert} className="md:hidden border-t-2 border-[var(--encre)] px-4 pb-4">
        <ul className="divide-y-2 divide-[var(--trait)]">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-center justify-between py-4 font-[family-name:var(--titres)] text-2xl font-bold">
                {l.libelle}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
