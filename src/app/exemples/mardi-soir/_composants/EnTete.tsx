"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le logo : une lune sur une porte de frigo, et le nom. */
export function Logo({ clair = false }: { clair?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg aria-hidden="true" viewBox="0 0 34 40" className="h-9 w-8 shrink-0">
        <rect x="1.5" y="1.5" width="31" height="37" rx="7" fill={clair ? "#FBF4E6" : "#173B33"} />
        <line x1="1.5" y1="15" x2="32.5" y2="15" stroke={clair ? "#173B33" : "#FBF4E6"} strokeWidth="1.6" />
        <circle cx="23" cy="8" r="3.4" fill="#F2C14E" />
        <rect x="6" y="19" width="2.6" height="9" rx="1.3" fill="#F2C14E" />
      </svg>
      <span className="font-[family-name:var(--titres)] text-[22px] leading-none whitespace-nowrap">Mardi Soir</span>
    </span>
  );
}

export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur border-b border-[var(--trait)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 h-16">
        <Link href={DOSSIER} aria-label="Mardi Soir, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden lg:flex items-center gap-7 text-[15px] font-medium">
          {NAVIGATION.slice(0, 3).map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:underline underline-offset-4">{l.libelle}</Link></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href={`${DOSSIER}/reserver`} className="max-[400px]:hidden inline-flex items-center min-h-11 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-5 text-[15px] font-semibold">
            Réserver
          </Link>
          <button
            type="button"
            aria-expanded={ouvert}
            aria-controls="ms-menu"
            onClick={() => setOuvert((o) => !o)}
            className="lg:hidden inline-flex items-center min-h-11 rounded-full border-2 border-[var(--encre)] px-4 text-[15px] font-semibold"
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="ms-menu" hidden={!ouvert} className="lg:hidden border-t border-[var(--trait)]">
        <ul className="px-4 py-2">
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-4 font-[family-name:var(--titres)] text-xl">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
