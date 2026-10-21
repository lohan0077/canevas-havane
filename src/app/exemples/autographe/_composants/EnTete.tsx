"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER } from "./donnees";

const LIENS = [
  { href: `${DOSSIER}/auteurs`, libelle: "Auteurs" },
  { href: `${DOSSIER}#pots`, libelle: "Pots" },
  { href: `${DOSSIER}/dedicaces`, libelle: "Dédicaces" },
  { href: `${DOSSIER}#boutique`, libelle: "La boutique" },
];

/** La barre du site, comme la page de titre d'un livre : le nom, centré, et quatre entrées. */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-[var(--encre)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5">
        <ul className="hidden gap-6 text-[15px] md:flex">
          {LIENS.slice(0, 2).map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:underline underline-offset-4">{l.libelle}</Link></li>
          ))}
        </ul>
        <Link href={DOSSIER} onClick={() => setOuvert(false)} className="col-start-1 justify-self-start font-[family-name:var(--titres)] text-[1.7rem] font-semibold tracking-tight md:col-start-2 md:justify-self-center" aria-label="Autographe, accueil">
          Autographe<span className="text-[var(--accent-texte)]">.</span>
        </Link>
        <ul className="hidden justify-end gap-6 text-[15px] md:flex">
          {LIENS.slice(2).map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:underline underline-offset-4">{l.libelle}</Link></li>
          ))}
        </ul>
        <button
          type="button"
          className="col-start-3 min-h-11 justify-self-end border-b-2 border-[var(--encre)] px-1 text-[15px] font-semibold md:hidden"
          aria-expanded={ouvert}
          aria-controls="auto-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Sommaire"}
        </button>
      </nav>
      <div id="auto-menu" hidden={!ouvert} className="border-t border-[var(--trait)] bg-[var(--fond)] md:hidden">
        <ol className="mx-auto max-w-6xl px-5 py-3">
          {LIENS.map((l, i) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-baseline justify-between py-4 font-[family-name:var(--titres)] text-3xl">
                {l.libelle}
                <span className="font-[family-name:var(--texte)] text-sm text-[var(--doux)]">{String(i + 1).padStart(2, "0")}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </header>
  );
}
