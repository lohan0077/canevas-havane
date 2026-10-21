"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION, depot } from "./donnees";

/** Le pictogramme du dépôt : une clé plate dans un carré, comme un panneau d'atelier. */
export function Picto({ taille = 30 }: { taille?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={taille} height={taille} aria-hidden="true">
      <rect width="32" height="32" rx="6" fill="var(--accent)" />
      <path d="M20.5 7.5a5 5 0 0 0-4.6 6.9L8 22.3 9.7 24l7.9-7.9a5 5 0 0 0 6.9-4.6l-3 3-2.6-.7-.7-2.6 3-3a5 5 0 0 0-.7-.7Z" fill="var(--sur-accent)" />
    </svg>
  );
}

/** La barre de Ton dépôt : le nom, deux liens, le numéro du comptoir. Repliée sous 768 px. */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Ton dépôt, accueil" className="flex items-center gap-2.5">
          <Picto />
          <span className="font-[family-name:var(--titres)] text-xl font-extrabold">Ton dépôt</span>
        </Link>
        <ul className="hidden items-center gap-6 text-xs font-bold uppercase tracking-[0.14em] md:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={chemin === l.href ? "text-[var(--accent-texte)]" : "hover:text-[var(--accent-texte)]"}>
                {l.libelle}
              </Link>
            </li>
          ))}
          <li>
            <a href={`tel:${depot.telephoneLien}`} className="rounded-md border border-[var(--trait)] px-3 py-2 tabular-nums">{depot.telephone}</a>
          </li>
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="td-menu"
          onClick={() => setOuvert((o) => !o)}
          className="h-11 rounded-md border border-[var(--trait)] px-4 text-xs font-bold uppercase tracking-[0.14em] md:hidden"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="td-menu" hidden={!ouvert} className="border-t border-[var(--trait)] bg-[var(--sombre)] md:hidden">
        <ul className="divide-y divide-[var(--trait)] px-5">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-center justify-between py-4 font-[family-name:var(--titres)] text-2xl font-extrabold">
                {l.libelle}
                <span aria-hidden="true" className="text-[var(--accent-texte)]">→</span>
              </Link>
            </li>
          ))}
          <li className="py-4">
            <a href={`tel:${depot.telephoneLien}`} className="block rounded-full bg-[var(--accent)] py-3 text-center font-bold text-[var(--sur-accent)]">
              Comptoir : {depot.telephone}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
