"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

export function Logo() {
  return (
    <span className="font-[family-name:var(--titres)] text-2xl font-extrabold tracking-[-0.04em] leading-none">
      franchement<span className="text-[var(--accent-texte)]">.</span>
    </span>
  );
}

/**
 * Une barre en pilule, posée sur le fond vert sauge, comme dans le modèle « Mindora ».
 * Sous 768 px : le nom, « Appel » et un bouton qui déplie les rubriques.
 */
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
    <header className="sticky top-0 z-40 bg-[var(--fond)] px-3 pt-3 pb-2">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex items-center justify-between gap-3 rounded-full bg-[var(--carte)] pl-5 pr-2 h-14 shadow-[0_8px_30px_-18px_rgba(23,37,28,.45)]">
        <Link href={DOSSIER} aria-label="Franchement, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden md:flex items-center gap-7 text-[15px] font-semibold">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className="hover:text-[var(--accent-texte)]">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1.5">
          <Link href={`${DOSSIER}/premier-appel`} className="hidden min-[380px]:inline-flex items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-4 h-10 text-sm font-bold">
            Appel 20 min
          </Link>
          <button
            type="button"
            className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-[var(--trait)]"
            aria-expanded={ouvert}
            aria-controls="fr-menu"
            aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOuvert((o) => !o)}
          >
            <span aria-hidden="true" className="relative block h-3 w-4">
              <span className={`absolute left-0 h-0.5 w-4 bg-[var(--encre)] transition-transform ${ouvert ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-4 bg-[var(--encre)] transition-transform ${ouvert ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </nav>
      <div id="fr-menu" hidden={!ouvert} className="md:hidden max-w-6xl mx-auto mt-2 rounded-[28px] bg-[var(--carte)] p-3 shadow-[0_8px_30px_-18px_rgba(23,37,28,.45)]">
        <ul>
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-semibold hover:bg-[var(--fond)]">
                {l.libelle}
                <span aria-hidden="true">↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
