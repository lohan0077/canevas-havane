"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le monogramme « 50 » dans un cercle fin, le nom, et le titre dessous. */
export function Logo() {
  return (
    <span className="flex items-center gap-3">
      <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full border border-[#C9A27E] font-[family-name:var(--titres)] text-lg italic text-[#C9A27E]">
        50
      </span>
      <span className="leading-none">
        <span className="block font-[family-name:var(--titres)] text-[19px] tracking-[0.01em] whitespace-nowrap">Cinquante Minutes</span>
        <span className="block mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C9A27E]">Psychologue</span>
      </span>
    </span>
  );
}

/** La barre du cabinet, en prune ; sur téléphone, les liens passent dans un panneau. */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 bg-[var(--sombre)] text-[var(--sur-sombre)] border-b border-white/10">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 h-[70px]">
        <Link href={DOSSIER} aria-label="Cinquante Minutes, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:text-[#C9A27E]">{l.libelle}</Link></li>
          ))}
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="cm-menu"
          onClick={() => setOuvert((o) => !o)}
          className="md:hidden inline-flex items-center min-h-11 rounded-full border border-[#C9A27E] px-5 text-sm"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="cm-menu" hidden={!ouvert} className="md:hidden border-t border-white/10">
        <ul className="px-5 py-2">
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-white/10 last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-4 font-[family-name:var(--titres)] text-2xl">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
