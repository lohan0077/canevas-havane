"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION } from "./donnees";

/** La barre de Vingt-Deux Heures : le monogramme, trois liens, la soirée. Repliée sous 768 px. */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)] border-b-2 border-[var(--encre)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto h-[64px] px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Vingt-Deux Heures, accueil" className="flex items-center gap-2.5">
          <Logo taille={36} />
          <span className="font-[family-name:var(--titres)] text-lg font-black uppercase tracking-[-0.02em] leading-none">
            Vingt-Deux<br />Heures
          </span>
        </Link>
        <ul className="hidden md:flex items-center gap-7 font-bold">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`underline-offset-8 decoration-[3px] decoration-[var(--accent)] hover:underline ${chemin === l.href ? "underline" : ""}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
          <li>
            <Link href={`${DOSSIER}/soiree-decouverte`} className="rounded-full bg-[var(--encre)] text-[var(--fond)] px-5 py-2.5">
              Jeudi 5 nov. · 20 h
            </Link>
          </li>
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="vdh-menu"
          onClick={() => setOuvert((o) => !o)}
          className="md:hidden rounded-full border-2 border-[var(--encre)] px-5 h-11 font-bold"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="vdh-menu" hidden={!ouvert} className="md:hidden border-t-2 border-[var(--encre)] bg-[var(--fond)]">
        <ul className="px-5 py-5 space-y-1">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-center justify-between py-3 font-[family-name:var(--titres)] text-3xl font-black uppercase tracking-[-0.03em] border-b border-[var(--trait)]">
                {l.libelle}
                <span aria-hidden="true" className="text-[var(--accent-texte)]">→</span>
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <Link href={`${DOSSIER}/soiree-decouverte`} onClick={() => setOuvert(false)} className="flex justify-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-4 text-lg font-bold">
              Réserver ma place jeudi
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
