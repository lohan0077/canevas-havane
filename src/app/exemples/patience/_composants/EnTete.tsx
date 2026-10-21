"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER } from "./donnees";

const LIENS = [
  { href: `${DOSSIER}/cave`, libelle: "La cave" },
  { href: `${DOSSIER}/meules`, libelle: "Réserver une meule" },
  { href: `${DOSSIER}#decoupe`, libelle: "Le jour J" },
  { href: `${DOSSIER}#fromagerie`, libelle: "La fromagerie" },
];

/** La barre du site : le monogramme, le nom en capitales espacées, un menu replié sur téléphone. */
export default function EnTete() {
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
        <Link href={DOSSIER} onClick={() => setOuvert(false)} className="flex items-center gap-3" aria-label="Patience, accueil">
          <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full border border-[var(--accent)] font-[family-name:var(--titres)] text-lg italic text-[var(--accent-texte)]">P</span>
          <span className="font-[family-name:var(--titres)] text-xl uppercase tracking-[0.3em]">Patience</span>
        </Link>
        <ul className="hidden items-center gap-7 text-sm md:flex">
          {LIENS.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-[var(--accent-texte)]">{l.libelle}</Link></li>)}
        </ul>
        <button
          type="button"
          className="min-h-11 rounded-full border border-[var(--accent)] px-5 text-sm md:hidden"
          aria-expanded={ouvert}
          aria-controls="pa-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="pa-menu" hidden={!ouvert} className="border-t border-[var(--trait)] md:hidden">
        <ul className="mx-auto max-w-6xl px-5 py-2">
          {LIENS.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-4 font-[family-name:var(--titres)] text-2xl italic">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
