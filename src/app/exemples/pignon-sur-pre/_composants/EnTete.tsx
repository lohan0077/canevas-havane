"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le logo : un pignon de maison posé dans l'herbe, et le nom en romain, « sur » en italique. */
export function Logo({ clair = false }: { clair?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 40 32" className="h-8 w-10 shrink-0" aria-hidden="true">
        <path d="M6 26V14L20 4l14 10v12" fill="none" stroke={clair ? "var(--sur-sombre)" : "var(--encre)"} strokeWidth="2.6" strokeLinejoin="round" />
        <path d="M16 26v-7h8v7" fill="none" stroke="var(--accent)" strokeWidth="2.6" strokeLinejoin="round" />
        <path d="M1 27c4-2 6 1 10-1s6 1 9-1 6 1 10-1 6 1 9-1" fill="none" stroke="#7FAE5C" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
      <span className="font-[family-name:var(--titres)] text-[23px] leading-none tracking-[-0.01em]">
        Pignon <span className="italic">sur</span> Pré
      </span>
    </span>
  );
}

/** La barre du site : le nom à gauche, les liens à droite ; sous 900 px, « Menu ». */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOuvert(false);
    };
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur border-b border-[var(--trait)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-5 h-16">
        <Link href={DOSSIER} aria-label="Pignon sur Pré, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden md:flex items-center gap-7 text-[15px] font-medium">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={chemin === l.href ? "page" : undefined}
                className={l.libelle === "Réserver" ? "inline-flex h-10 items-center rounded-full bg-[var(--accent)] px-5 text-[var(--sur-accent)]" : "hover:text-[var(--accent-texte)]"}
              >
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="md:hidden inline-flex h-11 items-center gap-2 rounded-full border border-[var(--encre)] px-4 text-[15px] font-medium"
          aria-expanded={ouvert}
          aria-controls="psp-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="psp-menu" hidden={!ouvert} className="md:hidden border-t border-[var(--trait)] bg-[var(--fond)]">
        <ul className="px-5 py-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-4 font-[family-name:var(--titres)] text-2xl">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
