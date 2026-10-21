"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le nom, écrit à la main comme sur les marque-pages. */
export function Logo({ taille = "text-[34px]" }: { taille?: string }) {
  return <span className={`font-[family-name:var(--f-caveat)] font-bold leading-none ${taille}`}>Tu vas voir</span>;
}

/**
 * La barre du site : le nom écrit à la main, trois petites colonnes de texte, la
 * navigation. Sous 1024 px, les liens passent dans un panneau ouvert par « Menu ».
 */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--encre)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5">
        <Link href={DOSSIER} aria-label="Tu Vas Voir, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <p className="hidden max-w-[220px] text-[11px] font-semibold uppercase leading-snug tracking-[0.08em] xl:block">
          Librairie indépendante. Chaque conseil est écrit à la main.
        </p>
        <ul className="hidden items-center gap-7 text-[12px] font-semibold uppercase tracking-[0.1em] lg:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:underline hover:underline-offset-4">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="min-h-11 rounded-full bg-[var(--encre)] px-5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--fond)] lg:hidden"
          aria-expanded={ouvert}
          aria-controls="tvv-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="tvv-menu" hidden={!ouvert} className="border-t border-[var(--encre)] lg:hidden">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-2 px-5 py-4">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex min-h-14 items-center rounded-2xl border border-[var(--trait)] bg-[var(--carte)] px-4 font-[family-name:var(--titres)] text-xl">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
