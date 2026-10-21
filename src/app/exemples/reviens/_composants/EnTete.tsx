"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le nom de la marque : « Reviens », le point en brique. */
export function Nom({ className = "" }: { className?: string }) {
  return (
    <span className={`font-[family-name:var(--titres)] font-extrabold tracking-tight ${className}`}>
      Reviens<span className="text-[var(--accent-texte)]">.</span>
    </span>
  );
}

/** La barre de Reviens. : le nom, deux liens, « Graver ». Repliée sous 768 px. */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b-2 border-[var(--encre)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Reviens, accueil">
          <Nom className="text-[28px]" />
        </Link>
        <div className="hidden items-center gap-7 text-sm font-semibold md:flex">
          {NAVIGATION.map((l) => (
            <Link key={l.href} href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={chemin === l.href ? "underline decoration-[var(--accent)] decoration-[3px] underline-offset-8" : "hover:underline"}>
              {l.libelle}
            </Link>
          ))}
          <Link href={`${DOSSIER}/graver`} className="rounded-2xl bg-[var(--encre)] px-5 py-2.5 text-[var(--fond)]">
            Graver
          </Link>
        </div>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="rv-menu"
          onClick={() => setOuvert((o) => !o)}
          className="h-11 rounded-2xl bg-[var(--encre)] px-5 text-sm font-semibold text-[var(--fond)] md:hidden"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="rv-menu" hidden={!ouvert} className="border-t-2 border-[var(--encre)] bg-[var(--accent)] text-[var(--sur-accent)] md:hidden">
        <ul className="px-5 py-4">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3 font-[family-name:var(--titres)] text-3xl font-extrabold">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
