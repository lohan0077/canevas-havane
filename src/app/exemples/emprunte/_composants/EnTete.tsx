"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le E d'Emprunté, dans un rond de maille : le monogramme de la vidéo. */
export function Monogramme({ taille = 36 }: { taille?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={taille} height={taille} aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="var(--accent)" />
      <circle cx="20" cy="20" r="15" fill="none" stroke="var(--sur-accent)" strokeOpacity=".5" strokeWidth="1.5" strokeDasharray="2 3" />
      <text x="20" y="27" textAnchor="middle" fontSize="20" fontWeight="800" fill="var(--sur-accent)" className="font-[family-name:var(--titres)]">E</text>
    </svg>
  );
}

/** La barre d'Emprunté : le monogramme centré, les liens de part et d'autre. Repliée sous 768 px. */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur">
      <nav aria-label="Principale" className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6">
        <ul className="hidden items-center gap-6 text-sm font-bold md:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={chemin === l.href ? "underline decoration-2 underline-offset-8" : "hover:underline"}>
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <span className="md:hidden" />
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Emprunté, accueil" className="flex items-center gap-2">
          <Monogramme />
          <span className="font-[family-name:var(--titres)] text-2xl font-extrabold tracking-tight">Emprunté</span>
        </Link>
        <div className="flex justify-end">
          <Link href={`${DOSSIER}/col-rond`} className="hidden rounded-full bg-[var(--encre)] px-5 py-2.5 text-sm font-bold text-[var(--fond)] md:inline-block">
            Ajouter sa taille
          </Link>
          <button
            type="button"
            aria-expanded={ouvert}
            aria-controls="em-menu"
            onClick={() => setOuvert((o) => !o)}
            className="h-11 rounded-full border-2 border-[var(--encre)] px-4 text-sm font-bold md:hidden"
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="em-menu" hidden={!ouvert} className="bg-[var(--sombre)] text-[var(--sur-sombre)] md:hidden">
        <ul className="space-y-2 px-5 py-6">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="block rounded-full border-2 border-[var(--sur-sombre)] px-6 py-3 text-center font-[family-name:var(--titres)] text-2xl font-extrabold">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
