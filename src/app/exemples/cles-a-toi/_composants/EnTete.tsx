"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION } from "./donnees";

/** La barre de Clés à Toi : le logo, deux liens, le trousseau. Repliée sous 768 px. */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)] border-b border-[var(--trait)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto h-[66px] px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Clés à Toi, accueil" className="flex items-center gap-2">
          <Logo taille={30} />
          <span className="font-[family-name:var(--titres)] text-xl font-bold tracking-tight">Clés à Toi</span>
        </Link>
        <ul className="hidden md:flex items-center gap-8 font-[family-name:var(--titres)] font-semibold">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`underline-offset-8 decoration-2 decoration-[var(--accent)] hover:underline ${chemin === l.href ? "underline" : ""}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
          <li>
            <Link href={`${DOSSIER}/formules#evaluation`} className="rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-5 py-2.5">
              Réserver l'évaluation
            </Link>
          </li>
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="ct-menu"
          onClick={() => setOuvert((o) => !o)}
          className="md:hidden rounded-full border-2 border-[var(--encre)] px-5 h-11 font-[family-name:var(--titres)] font-semibold"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="ct-menu" hidden={!ouvert} className="md:hidden border-t border-[var(--trait)] bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <ul className="px-5 py-6 space-y-1 font-[family-name:var(--titres)]">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-center justify-between py-3 text-3xl font-bold border-b border-[var(--sur-sombre)]/20">
                {l.libelle}
                <span aria-hidden="true" className="text-[var(--accent)]">→</span>
              </Link>
            </li>
          ))}
          <li className="pt-5">
            <Link href={`${DOSSIER}/formules#evaluation`} onClick={() => setOuvert(false)} className="flex justify-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-4 text-lg font-bold">
              Réserver l'évaluation
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
