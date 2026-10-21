"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le monogramme P dans un tampon rond, et le nom. */
export function Logo() {
  return (
    <span className="flex items-center gap-2.5 whitespace-nowrap">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full border-2 border-[var(--encre)] font-[family-name:var(--titres)] text-lg italic">P</span>
      <span className="font-[family-name:var(--titres)] text-[1.6rem] leading-none">Parole Tenue</span>
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
    <header className="sticky top-0 z-40 border-b-2 border-[var(--encre)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-[62px] max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={DOSSIER} aria-label="Parole Tenue, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden min-[900px]:flex items-center gap-7 text-[15px] font-medium">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`underline-offset-[6px] hover:underline ${chemin === l.href ? "underline" : ""}`}>{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <button type="button" className="min-[900px]:hidden min-h-10 rounded-full border-2 border-[var(--encre)] px-4 text-sm font-semibold" aria-expanded={ouvert} aria-controls="pt-menu" onClick={() => setOuvert((o) => !o)}>
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="pt-menu" hidden={!ouvert} className="min-[900px]:hidden border-t-2 border-[var(--encre)] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <ul className="mx-auto max-w-6xl px-5 py-4">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3 font-[family-name:var(--titres)] text-3xl italic">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
