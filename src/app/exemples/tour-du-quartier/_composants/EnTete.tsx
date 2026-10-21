"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le monogramme TQ dans sa pastille, et le nom. */
export function Logo({ grand = false }: { grand?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className={`grid place-items-center rounded-full bg-[var(--accent)] font-[family-name:var(--titres)] font-extrabold text-[#F2C14E] ${grand ? "h-14 w-14 text-2xl" : "h-10 w-10 text-lg"}`}>TQ</span>
      <span className={`font-[family-name:var(--titres)] font-extrabold leading-none tracking-tight ${grand ? "text-[30px]" : "text-[21px]"}`}>Tour du Quartier</span>
    </span>
  );
}

/** La barre du site. Sous 1024 px, les liens passent dans un panneau tout rond. */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={DOSSIER} aria-label="Tour du Quartier, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden items-center gap-2 lg:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="rounded-full px-4 py-2 text-[15px] font-semibold hover:bg-[var(--carte)]">{l.libelle}</Link></li>
          ))}
        </ul>
        <button
          type="button"
          className="min-h-11 rounded-full bg-[var(--accent)] px-5 text-[15px] font-bold text-[var(--sur-accent)] lg:hidden"
          aria-expanded={ouvert}
          aria-controls="tq-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="tq-menu" hidden={!ouvert} className="px-4 pb-4 lg:hidden">
        <ul className="space-y-2 rounded-[28px] bg-[var(--carte)] p-3 shadow-lg">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex min-h-14 items-center rounded-[20px] px-4 font-[family-name:var(--titres)] text-[22px] font-bold hover:bg-[var(--fond)]">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
