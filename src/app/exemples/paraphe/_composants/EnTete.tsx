"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le nom, en italique, souligné de son paraphe. */
export function Logo({ grand = false }: { grand?: boolean }) {
  return (
    <span className="relative inline-block">
      <span className={`font-[family-name:var(--titres)] italic leading-none ${grand ? "text-[44px]" : "text-[30px]"}`}>Paraphe</span>
      <svg viewBox="0 0 300 40" aria-hidden="true" className="absolute -bottom-2 left-0 h-3 w-full text-[var(--accent-texte)]">
        <path d="M 4 26 C 60 4, 120 36, 170 18 C 210 4, 250 30, 296 12" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/**
 * La barre du site, sur le papier. Sous 768 px, les liens passent dans un panneau
 * ouvert par « Menu » ; Échap ou un lien le referme.
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
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={DOSSIER} aria-label="Paraphe, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden items-center gap-8 text-[14px] md:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin.startsWith(l.href) ? "page" : undefined} className={`underline-offset-[6px] hover:underline ${chemin.startsWith(l.href) ? "underline" : ""}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="min-h-11 border border-[var(--encre)] px-4 text-[14px] md:hidden"
          aria-expanded={ouvert}
          aria-controls="pa-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="pa-menu" hidden={!ouvert} className="border-t border-[var(--trait)] md:hidden">
        <ul className="mx-auto max-w-6xl px-5 py-3">
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-dashed border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3.5 font-[family-name:var(--titres)] text-[28px] italic">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
