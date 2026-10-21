"use client";

import { useState } from "react";
import Link from "next/link";
import { DELAI_DU_MOIS, DOSSIER, MOIS_DU_CHIFFRE, NAVIGATION, heures } from "./donnees";

/** Le cadran d'Heure Claire : une horloge à deux aiguilles, sobre. */
export function Cadran({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <circle cx="16" cy="16" r="13.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <path d="M16 8.5V16l5 3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * En haut du site, avant tout le reste : le délai de réponse du mois. Un chiffre qu'on
 * ne voit presque jamais. Mis à jour le 1er de chaque mois — d'où « Chiffre du mois »,
 * jamais « en direct ».
 */
export function BarreDuDelai() {
  return (
    <Link
      href={`${DOSSIER}/delai`}
      data-film="barre-delai"
      className="block border-b border-[var(--trait)] bg-[var(--accent)] text-[var(--sur-accent)]"
    >
      <span className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 text-[13px] sm:px-6">
        <span className="flex items-center gap-2">
          <Cadran className="h-4 w-4 shrink-0" />
          <span>
            Chiffre du mois · délai moyen de réponse en {MOIS_DU_CHIFFRE} :{" "}
            <strong className="tabular-nums">{heures(DELAI_DU_MOIS)}</strong>
          </span>
        </span>
        <span className="shrink-0 font-semibold underline underline-offset-2">exemple</span>
      </span>
    </Link>
  );
}

/** La barre de navigation, réglée comme un registre : des cases séparées par des filets. */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-stretch justify-between">
        <Link href={DOSSIER} aria-label="Heure Claire, accueil" className="flex items-center gap-2.5 px-4 sm:px-6" onClick={() => setOuvert(false)}>
          <Cadran className="h-7 w-7" />
          <span className="font-[family-name:var(--titres)] text-[25px] font-semibold leading-none tracking-tight">Heure Claire</span>
        </Link>
        <ul className="hidden items-stretch lg:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href} className="flex border-l border-[var(--trait)]">
              <Link href={l.href} className="flex items-center px-5 text-[14px] font-medium hover:bg-[var(--carte)]">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-stretch">
          <Link href={`${DOSSIER}#echange`} className="hidden items-center bg-[var(--encre)] px-6 text-[14px] font-semibold text-[var(--fond)] sm:flex">
            Premier échange
          </Link>
          <button
            type="button"
            className="border-l border-[var(--trait)] px-5 text-[14px] font-semibold lg:hidden"
            aria-expanded={ouvert}
            aria-controls="hc-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <ul id="hc-menu" hidden={!ouvert} className="border-t border-[var(--trait)] lg:hidden">
        {NAVIGATION.map((l) => (
          <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
            <Link href={l.href} onClick={() => setOuvert(false)} className="block px-4 py-4 text-lg font-medium">
              {l.libelle}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
