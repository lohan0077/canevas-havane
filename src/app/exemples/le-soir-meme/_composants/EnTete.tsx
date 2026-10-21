"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/** La marque : une fenêtre allumée dans la nuit, et le nom. */
export function Marque() {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 28 28" aria-hidden="true" className="h-7 w-7 shrink-0">
        <path d="M4 13L14 4l10 9v11H4z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <rect x="11" y="14" width="6" height="6" rx="0.5" fill="var(--accent)" />
      </svg>
      <span className="font-[family-name:var(--titres)] text-[24px] leading-none">Le Soir Même</span>
    </span>
  );
}

/**
 * Une barre en pilule, en verre sombre, qui flotte au-dessus de la photo d'accueil et
 * des hauts de page — transposée du modèle « Sky Estate » de MotionSites.
 */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6">
      <nav
        aria-label="Principale"
        className="mx-auto flex h-[60px] max-w-5xl items-center justify-between gap-3 rounded-full border border-white/15 bg-[#1B1E3A]/85 pl-5 pr-2 text-[var(--sur-sombre)] shadow-[0_12px_40px_rgba(10,12,30,0.25)] backdrop-blur-md"
      >
        <Link href={DOSSIER} aria-label="Le Soir Même, accueil" onClick={() => setOuvert(false)}>
          <Marque />
        </Link>
        <ul className="hidden items-center gap-7 text-[14px] lg:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-8 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link
            href={`${DOSSIER}/estimation`}
            className="hidden h-11 items-center rounded-full bg-[var(--accent)] px-5 text-[14px] font-semibold text-[var(--sur-accent)] sm:inline-flex"
          >
            Faire estimer ma maison
          </Link>
          <button
            type="button"
            className="h-11 rounded-full border border-white/25 px-5 text-[14px] font-semibold lg:hidden"
            aria-expanded={ouvert}
            aria-controls="lsm-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div
        id="lsm-menu"
        hidden={!ouvert}
        className="absolute inset-x-3 top-full mx-auto mt-2 max-w-5xl rounded-[28px] sm:inset-x-6 border border-white/15 bg-[#1B1E3A] px-6 py-3 text-[var(--sur-sombre)] shadow-xl lg:hidden"
      >
        <ul>
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-white/10 last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-4 font-[family-name:var(--titres)] text-[26px]">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={`${DOSSIER}/estimation`}
          onClick={() => setOuvert(false)}
          className="my-3 flex h-14 items-center justify-center rounded-full bg-[var(--accent)] text-[16px] font-semibold text-[var(--sur-accent)]"
        >
          Faire estimer ma maison
        </Link>
      </div>
    </header>
  );
}
