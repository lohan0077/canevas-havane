"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION } from "./donnees";

/**
 * La barre de Premier Trajet : des pilules, comme un tableau de bord. Sous 1024 px,
 * les liens passent dans un panneau ouvert par « Menu » ; le bouton de l'évaluation
 * reste toujours à portée de pouce.
 */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  const actif = (href: string) => chemin === href || chemin.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur border-b border-[var(--trait)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 h-[64px]">
        <Link href={DOSSIER} aria-label="Premier Trajet, accueil" onClick={() => setOuvert(false)} className="flex items-center gap-2.5">
          <Logo />
          <span className="font-[family-name:var(--titres)] text-lg font-extrabold tracking-tight">Premier Trajet</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1 rounded-full bg-[var(--carte)] border border-[var(--trait)] p-1">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={actif(l.href) ? "page" : undefined}
                className={`block rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  actif(l.href) ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "hover:bg-[var(--fond)]"
                }`}
              >
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={`${DOSSIER}/evaluation`}
            className="hidden sm:inline-flex items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-5 h-11 text-sm font-bold"
          >
            Mon évaluation
          </Link>
          <button
            type="button"
            aria-expanded={ouvert}
            aria-controls="pt-menu"
            onClick={() => setOuvert((o) => !o)}
            className="lg:hidden inline-flex items-center gap-2 rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-5 h-11 text-sm font-bold"
          >
            <span aria-hidden="true" className="grid gap-[3px]">
              <i className={`block h-[2px] w-4 bg-current transition-transform ${ouvert ? "translate-y-[5px] rotate-45" : ""}`} />
              <i className={`block h-[2px] w-4 bg-current ${ouvert ? "opacity-0" : ""}`} />
              <i className={`block h-[2px] w-4 bg-current transition-transform ${ouvert ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>

      <div id="pt-menu" hidden={!ouvert} className="lg:hidden border-t border-[var(--trait)] bg-[var(--fond)]">
        <ul className="max-w-6xl mx-auto px-4 py-4 grid gap-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOuvert(false)}
                aria-current={chemin === l.href ? "page" : undefined}
                className={`flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-semibold ${
                  chemin === l.href ? "bg-[var(--sombre)] text-[var(--sur-sombre)]" : "bg-[var(--carte)] border border-[var(--trait)]"
                }`}
              >
                {l.libelle}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href={`${DOSSIER}/evaluation`}
              onClick={() => setOuvert(false)}
              className="flex justify-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-4 text-lg font-extrabold"
            >
              Réserver mon évaluation
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
