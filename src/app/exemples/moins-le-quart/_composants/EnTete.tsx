"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER } from "./donnees";

const LIENS = [
  { href: `${DOSSIER}/cafes`, libelle: "Les trois cafés" },
  { href: `${DOSSIER}/maison`, libelle: "La maison" },
  { href: `${DOSSIER}#questions`, libelle: "Questions" },
];

/** La barre du site : un cadran pour logo, le nom, trois liens, un menu replié sur téléphone. */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} className="flex items-center gap-3" aria-label="Moins le Quart, accueil">
          <svg viewBox="0 0 40 40" aria-hidden="true" className="h-9 w-9">
            <circle cx="20" cy="20" r="18" fill="none" stroke="var(--encre)" strokeWidth="2.5" />
            <path d="M20 20V6A14 14 0 0 0 6 20z" fill="var(--accent)" />
            <path d="M20 20V9M20 20h-8" stroke="var(--encre)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span className="font-[family-name:var(--titres)] text-xl font-medium tracking-tight">Moins le Quart</span>
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {LIENS.map((l) => <li key={l.href}><Link href={l.href} className="underline-offset-[6px] hover:underline">{l.libelle}</Link></li>)}
        </ul>
        <button
          type="button"
          className="min-h-11 rounded-full border border-[var(--encre)] px-5 font-[family-name:var(--titres)] text-sm md:hidden"
          aria-expanded={ouvert}
          aria-controls="mlq-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="mlq-menu" hidden={!ouvert} className="border-t border-[var(--trait)] md:hidden">
        <ul className="mx-auto max-w-6xl px-5 py-2">
          {LIENS.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-4 font-[family-name:var(--titres)] text-2xl font-light">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
