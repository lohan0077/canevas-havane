"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le logo : un seul onglet, dessiné, et le nom. */
export function Logo() {
  return (
    <span className="flex items-center gap-2.5 whitespace-nowrap">
      <span aria-hidden="true" className="relative h-6 w-9">
        <span className="absolute inset-x-0 bottom-0 h-4 rounded-t-md bg-[var(--accent)]" />
        <span className="absolute bottom-0 left-1 h-6 w-6 rounded-t-md bg-[var(--accent)]" />
      </span>
      <span className="font-[family-name:var(--titres)] text-2xl leading-none">Un Seul Onglet</span>
    </span>
  );
}

/** En-tête collé en haut ; sous 900 px, les liens passent dans un panneau. */
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
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--carte)]">
      <nav aria-label="Principale" className="mx-auto flex h-[60px] max-w-6xl items-center justify-between gap-3 px-4 sm:px-5">
        <Link href={DOSSIER} aria-label="Un Seul Onglet, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden min-[900px]:flex items-center gap-1 text-[15px] font-semibold">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`rounded-lg px-3 py-2 hover:bg-[var(--fond)] ${chemin === l.href ? "bg-[var(--fond)]" : ""}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="min-[900px]:hidden min-h-10 rounded-lg border border-[var(--trait)] px-3 text-sm font-bold"
          aria-expanded={ouvert}
          aria-controls="uso-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="uso-menu" hidden={!ouvert} className="min-[900px]:hidden border-t border-[var(--trait)] bg-[var(--carte)]">
        <ul className="mx-auto max-w-6xl px-4 py-3">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-center gap-3 rounded-lg px-2 py-3 text-lg font-semibold hover:bg-[var(--fond)]">
                <i aria-hidden="true" className="h-3 w-3 rounded-full bg-[var(--accent)]" />
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
