"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le monogramme : A et N, gravés dans un cartouche, comme sous les plateaux. */
export function Monogramme({ taille = 34 }: { taille?: number }) {
  return (
    <svg viewBox="0 0 40 40" width={taille} height={taille} aria-hidden="true">
      <rect x="1.5" y="1.5" width="37" height="37" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="5" y="5" width="30" height="30" rx="1.5" fill="none" stroke="currentColor" strokeWidth=".8" />
      <text x="20" y="26.5" textAnchor="middle" fontSize="15" fill="currentColor" className="font-[family-name:var(--titres)]">AN</text>
    </svg>
  );
}

/** La barre d'Après Nous : un registre, en capitales fines. Repliée sous 768 px. */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--encre)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Après Nous, accueil" className="flex items-center gap-3">
          <Monogramme />
          <span className="font-[family-name:var(--titres)] text-xl uppercase tracking-[0.28em]">Après Nous</span>
        </Link>
        <ul className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.2em] md:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`border-b pb-1 ${chemin === l.href ? "border-[var(--encre)]" : "border-transparent hover:border-[var(--encre)]"}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="an-menu"
          onClick={() => setOuvert((o) => !o)}
          className="flex h-11 items-center gap-2 border border-[var(--encre)] px-4 text-xs font-semibold uppercase tracking-[0.2em] md:hidden"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="an-menu" hidden={!ouvert} className="border-t border-[var(--trait)] bg-[var(--sombre)] text-[var(--sur-sombre)] md:hidden">
        <ol className="px-5 py-6">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l, i) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-baseline gap-4 border-b border-[#F3EDE2]/25 py-4">
                <span className="text-xs tracking-[0.2em]">{["I", "II", "III", "IV"][i]}</span>
                <span className="font-[family-name:var(--titres)] text-3xl">{l.libelle}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </header>
  );
}
