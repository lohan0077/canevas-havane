"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";
import { Huit } from "./Elements";

/** La barre du site : une pilule posée en haut, un menu repliable sur téléphone. */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3">
      <nav aria-label="Principale" className="mx-auto flex h-[56px] max-w-6xl items-center justify-between gap-3 rounded-full border border-[var(--trait)] bg-[var(--carte)]/95 pl-2 pr-2 shadow-[0_10px_30px_-20px_rgba(47,74,44,0.6)] backdrop-blur">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} className="flex items-center gap-2.5" aria-label="Vert en Août, accueil">
          <Huit />
          <span className="font-[family-name:var(--titres)] text-[17px] font-bold">Vert en Août</span>
        </Link>
        <ul className="hidden items-center gap-6 text-[14px] font-medium lg:flex">
          {NAVIGATION.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-[var(--accent-texte)]">{l.libelle}</Link></li>)}
        </ul>
        <button
          type="button"
          className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-[14px] font-bold text-[var(--sur-accent)] lg:hidden"
          aria-expanded={ouvert}
          aria-controls="va-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="va-menu" hidden={!ouvert} className="mx-auto mt-2 max-w-6xl rounded-[26px] border border-[var(--trait)] bg-[var(--carte)] lg:hidden">
        <ul className="px-5 py-2">
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3.5 font-[family-name:var(--titres)] text-[20px] font-bold">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
