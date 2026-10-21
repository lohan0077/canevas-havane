"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le monogramme « AV » et le nom, espacé, comme une plaque discrète. */
export function Logo() {
  return (
    <span className="flex items-center gap-3">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full border border-[var(--accent)] font-[family-name:var(--titres)] text-[15px] text-[var(--accent-texte)]">AV</span>
      <span className="text-[13px] font-semibold uppercase tracking-[0.32em]">Après Vous</span>
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
    <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur border-b border-[var(--trait)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
        <Link href={DOSSIER} aria-label="Après Vous, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className="hover:text-[var(--accent-texte)]">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-[var(--trait)]"
          aria-expanded={ouvert}
          aria-controls="av-menu"
          aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOuvert((o) => !o)}
        >
          <span aria-hidden="true" className="relative block h-3 w-4">
            <span className={`absolute left-0 h-px w-4 bg-[var(--encre)] transition-transform ${ouvert ? "top-1.5 rotate-45" : "top-0.5"}`} />
            <span className={`absolute left-0 h-px w-4 bg-[var(--encre)] transition-transform ${ouvert ? "top-1.5 -rotate-45" : "top-2.5"}`} />
          </span>
        </button>
      </nav>
      <div id="av-menu" hidden={!ouvert} className="md:hidden border-t border-[var(--trait)] px-4 pb-4">
        <ul className="divide-y divide-[var(--trait)]">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-center justify-between py-4 font-[family-name:var(--titres)] text-3xl">
                {l.libelle}
                <span aria-hidden="true" className="text-base text-[var(--accent-texte)]">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
