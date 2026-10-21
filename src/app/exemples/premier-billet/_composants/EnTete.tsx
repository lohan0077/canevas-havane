"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";
import { Medaillon } from "./Ornements";

export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-double border-[var(--trait)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href={DOSSIER} aria-label="Premier Billet, accueil" className="flex items-center gap-3" onClick={() => setOuvert(false)}>
          <Medaillon className="text-[var(--encre)]" />
          <span className="font-[family-name:var(--titres)] text-[25px] font-semibold leading-none">Premier Billet</span>
        </Link>
        <ul className="hidden items-center gap-7 text-[14px] font-medium uppercase tracking-[0.12em] lg:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-8 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="h-11 border border-[var(--encre)] px-4 text-[13px] font-semibold uppercase tracking-[0.12em] lg:hidden"
          aria-expanded={ouvert}
          aria-controls="pb-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <ul id="pb-menu" hidden={!ouvert} className="border-t border-[var(--trait)] px-4 py-2 lg:hidden">
        {NAVIGATION.map((l) => (
          <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
            <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3.5 font-[family-name:var(--titres)] text-[22px]">
              {l.libelle}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
