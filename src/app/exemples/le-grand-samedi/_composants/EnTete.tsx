"use client";

import { useState } from "react";
import Link from "next/link";
import Marque from "./Marque";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** La barre du Grand Samedi : la marque à gauche, une pilule à droite. Repliée sous 860 px. */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)] border-b border-[var(--trait)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Le Grand Samedi, accueil" className="flex items-center gap-2.5">
          <Marque />
          <span className="leading-none">
            <span className="block font-[family-name:var(--titres)] text-[23px]">Le Grand <span className="italic">Samedi</span></span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.24em] text-[var(--doux)] mt-0.5">{entreprise.metier}</span>
          </span>
        </Link>
        <ul className="hidden min-[860px]:flex items-center gap-8 text-sm font-medium">
          {NAVIGATION.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-[var(--accent-texte)]">{l.libelle}</Link></li>)}
          <li><Link href={`${DOSSIER}#rendez-vous`} className="rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-5 py-2.5 font-semibold">Premier rendez-vous</Link></li>
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="lgs-menu"
          onClick={() => setOuvert((o) => !o)}
          className="min-[860px]:hidden h-11 rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-5 text-sm font-semibold"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="lgs-menu" hidden={!ouvert} className="min-[860px]:hidden border-t border-[var(--trait)] bg-[var(--fond)]">
        <ul className="px-5 py-4">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}#rendez-vous`, libelle: "Premier rendez-vous" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3 border-b border-[var(--trait)] font-[family-name:var(--titres)] text-[30px] italic">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
