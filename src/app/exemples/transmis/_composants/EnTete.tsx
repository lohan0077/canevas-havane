"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le nom en italique, et le T monogramme dans un cercle, comme un tampon de famille. */
export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full border-[1.5px] border-[var(--encre)] font-[family-name:var(--titres)] text-[19px] italic">T</span>
      <span className="font-[family-name:var(--titres)] text-[25px] italic leading-none">Transmis</span>
    </span>
  );
}

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
        <Link href={DOSSIER} aria-label="Transmis, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden lg:flex items-center gap-7 text-[15px]">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className="hover:text-[var(--accent-texte)]">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href={`${DOSSIER}#recette`} className="inline-flex h-11 items-center rounded-full bg-[var(--accent)] px-4 text-[14px] font-semibold text-[var(--sur-accent)] max-[360px]:hidden">
            Ma recette
          </Link>
          <button
            type="button"
            className="lg:hidden inline-flex h-11 items-center rounded-full border border-[var(--encre)] px-4 text-[14px] font-medium"
            aria-expanded={ouvert}
            aria-controls="tr-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="tr-menu" hidden={!ouvert} className="lg:hidden border-t border-[var(--trait)] bg-[var(--fond)]">
        <ul className="px-5 py-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-4 font-[family-name:var(--titres)] text-2xl italic">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
