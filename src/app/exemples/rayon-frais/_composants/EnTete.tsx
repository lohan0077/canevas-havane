"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le logo : « RF » sur une étiquette de prix, et le nom à la machine à écrire. */
export function Logo({ clair = false }: { clair?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="relative grid h-9 w-12 place-items-center rounded-[6px] bg-[#C2402A] font-[family-name:var(--titres)] text-base font-bold text-white [clip-path:polygon(22%_0,100%_0,100%_100%,22%_100%,0_50%)] pl-2">
        RF
      </span>
      <span className={`font-[family-name:var(--titres)] text-[22px] font-semibold tracking-[-0.01em] whitespace-nowrap ${clair ? "text-[#FFF7E6]" : ""}`}>Rayon Frais</span>
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
    <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur border-b-2 border-dashed border-[var(--trait)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 h-16">
        <Link href={DOSSIER} aria-label="Rayon Frais, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden lg:flex items-center gap-7 font-medium">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:text-[var(--accent-texte)]">{l.libelle}</Link></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href={`${DOSSIER}/rayons`} className="max-[400px]:hidden inline-flex items-center min-h-11 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-5 font-semibold">
            Réserver
          </Link>
          <button
            type="button"
            aria-expanded={ouvert}
            aria-controls="rf-menu"
            onClick={() => setOuvert((o) => !o)}
            className="lg:hidden inline-flex items-center min-h-11 rounded-full border-2 border-[var(--encre)] px-4 font-semibold"
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="rf-menu" hidden={!ouvert} className="lg:hidden border-t-2 border-dashed border-[var(--trait)]">
        <ul className="px-4 py-2">
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-center justify-between py-4 font-[family-name:var(--titres)] text-2xl font-semibold">
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
