"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le logo : « LUNDI » en capitales, « propre » dessous, et la coche du rapport. */
export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] text-sm font-black">✓</span>
      <span className="font-[family-name:var(--titres)] text-[17px] font-black leading-[0.9] tracking-[-0.02em]">
        LUNDI<br /><span className="font-semibold tracking-normal">propre</span>
      </span>
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
    <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
        <Link href={DOSSIER} aria-label="Lundi Propre, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden md:flex items-center gap-1 text-sm font-semibold">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className="rounded-full px-4 py-2 hover:bg-[var(--carte)]">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href={`${DOSSIER}/tarifs`} className="inline-flex h-10 items-center rounded-full bg-[var(--encre)] px-4 text-sm font-bold text-[var(--fond)]">
            Votre prix
          </Link>
          <button
            type="button"
            className="md:hidden grid h-10 w-10 place-items-center rounded-full border-2 border-[var(--encre)]"
            aria-expanded={ouvert}
            aria-controls="lp-menu"
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
      <div id="lp-menu" hidden={!ouvert} className="md:hidden px-4 pb-4">
        <ul className="rounded-[22px] bg-[var(--carte)] p-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-bold hover:bg-[var(--fond)]">
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
