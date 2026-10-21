"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le monogramme « 1er », sous un croissant de lune. */
export function Logo({ clair = false }: { clair?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className={`grid h-10 w-10 place-items-center rounded-full ${clair ? "bg-[var(--sur-sombre)] text-[var(--sombre)]" : "bg-[var(--sombre)] text-[var(--sur-sombre)]"} font-[family-name:var(--titres)] text-[15px] leading-none`}>
        <span>1<sup className="text-[9px]">er</sup></span>
      </span>
      <span className="font-[family-name:var(--titres)] text-[24px] leading-none">Premier Soir</span>
    </span>
  );
}

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
    <header className="sticky top-0 z-40 bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
        <Link href={DOSSIER} aria-label="Premier Soir, accueil" onClick={() => setOuvert(false)}>
          <Logo clair />
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-[15px]">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className="hover:underline underline-offset-4">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href={`${DOSSIER}/ce-soir`} className="hidden min-[380px]:inline-flex h-10 items-center rounded-full bg-[var(--accent)] px-4 text-sm font-semibold text-[var(--sur-accent)]">
            Mon devis
          </Link>
          <button
            type="button"
            className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-[var(--sur-sombre)]"
            aria-expanded={ouvert}
            aria-controls="ps-menu"
            aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOuvert((o) => !o)}
          >
            <span aria-hidden="true" className="relative block h-3 w-4">
              <span className={`absolute left-0 h-0.5 w-4 bg-[var(--sur-sombre)] transition-transform ${ouvert ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-4 bg-[var(--sur-sombre)] transition-transform ${ouvert ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </nav>
      <div id="ps-menu" hidden={!ouvert} className="md:hidden border-t border-[var(--sur-sombre)]/25 px-4 pb-4">
        <ul className="divide-y divide-[var(--sur-sombre)]/25">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-center justify-between py-4 font-[family-name:var(--titres)] text-2xl">
                {l.libelle}
                <span aria-hidden="true" className="text-base">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
