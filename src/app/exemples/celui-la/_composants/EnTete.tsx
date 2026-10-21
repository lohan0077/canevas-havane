"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER } from "./donnees";

const LIENS = [
  { href: `${DOSSIER}#plateau`, libelle: "Composer un plateau" },
  { href: `${DOSSIER}#cartes`, libelle: "Les fromages" },
  { href: `${DOSSIER}/plateaux`, libelle: "Par occasion" },
  { href: `${DOSSIER}#boutique`, libelle: "La boutique" },
];

/** La barre du site : le nom, en question, et quatre entrées. */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--encre)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} className="font-[family-name:var(--titres)] text-2xl" aria-label="Celui-Là, accueil">
          Celui-Là <span className="text-[var(--accent-texte)]">?</span>
        </Link>
        <ul className="hidden items-center gap-7 text-[15px] lg:flex">
          {LIENS.map((l) => <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>)}
        </ul>
        <button
          type="button"
          className="min-h-11 rounded-[4px] border border-[var(--encre)] px-4 text-sm font-semibold lg:hidden"
          aria-expanded={ouvert}
          aria-controls="cl-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="cl-menu" hidden={!ouvert} className="border-t border-[var(--trait)] lg:hidden">
        <ul className="mx-auto max-w-6xl px-5 py-2">
          {LIENS.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-4 font-[family-name:var(--titres)] text-2xl">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
