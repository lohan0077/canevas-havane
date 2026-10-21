"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le monogramme : deux lettres dans un cercle, et une onde qui s'éteint. */
export function Monogramme({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--encre)] text-[var(--fond)] font-[family-name:var(--titres)] text-[19px] leading-none tracking-tight ${className}`}>
      VB
    </span>
  );
}

/**
 * La barre de navigation : une pilule claire qui flotte en haut de l'écran. Sous
 * 1024 px, les liens passent dans un panneau ouvert par « Menu ».
 */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-5">
      <nav aria-label="Principale" className="mx-auto max-w-6xl rounded-[26px] border border-[var(--trait)] bg-[var(--fond)]/92 shadow-[0_10px_30px_-20px_rgba(47,74,62,0.5)] backdrop-blur">
        <div className="flex h-[60px] items-center justify-between gap-3 pl-3 pr-2.5">
          <Link href={DOSSIER} aria-label="Voix Basse, accueil" className="flex items-center gap-2.5" onClick={() => setOuvert(false)}>
            <Monogramme />
            <span className="font-[family-name:var(--titres)] text-[26px] leading-none">Voix Basse</span>
          </Link>
          <ul className="hidden items-center gap-6 text-[15px] lg:flex">
            {NAVIGATION.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-offset-8 hover:underline">{l.libelle}</Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Link href={`${DOSSIER}/rendez-vous`} className="hidden h-11 items-center rounded-full bg-[var(--encre)] px-5 text-sm font-semibold text-[var(--fond)] sm:inline-flex">
              Prendre rendez-vous
            </Link>
            <button
              type="button"
              className="h-11 rounded-full border border-[var(--trait)] px-4 text-sm font-semibold lg:hidden"
              aria-expanded={ouvert}
              aria-controls="vb-menu"
              onClick={() => setOuvert((o) => !o)}
            >
              {ouvert ? "Fermer" : "Menu"}
            </button>
          </div>
        </div>
        <ul id="vb-menu" hidden={!ouvert} className="border-t border-[var(--trait)] px-4 py-2 lg:hidden">
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3.5 text-lg">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
