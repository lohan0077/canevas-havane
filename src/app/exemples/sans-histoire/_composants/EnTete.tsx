"use client";

import { useState } from "react";
import Link from "next/link";
import Marque from "./Marque";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** La barre de Sans Histoire : la marque, quatre liens, le devis. Repliée sous 900 px. */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)] border-b border-[var(--trait)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Sans Histoire, sécurité privée — accueil" className="flex items-center gap-2.5">
          <Marque />
          <span className="leading-none">
            <span className="block font-[family-name:var(--titres)] text-[22px] italic">{entreprise.nom}</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--doux)] mt-1">Sécurité privée</span>
          </span>
        </Link>
        <ul className="hidden min-[900px]:flex items-center gap-7 text-sm font-medium">
          {NAVIGATION.slice(0, 3).map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:underline underline-offset-8 decoration-[var(--accent)] decoration-2">{l.libelle}</Link>
            </li>
          ))}
          <li>
            <Link href={`${DOSSIER}/devis`} className="rounded-full bg-[var(--encre)] text-[var(--fond)] px-5 py-2.5 font-semibold">Devis en 3 questions</Link>
          </li>
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="sh-menu"
          onClick={() => setOuvert((o) => !o)}
          className="min-[900px]:hidden h-11 px-4 rounded-full border border-[var(--encre)] text-sm font-semibold flex items-center gap-2"
        >
          <span aria-hidden="true" className="grid gap-[5px]">
            <i className={`block h-[2px] w-4 bg-[var(--encre)] transition-transform ${ouvert ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <i className={`block h-[2px] w-4 bg-[var(--encre)] transition-transform ${ouvert ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </span>
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="sh-menu" hidden={!ouvert} className="min-[900px]:hidden border-t border-[var(--trait)] bg-[var(--fond)]">
        <ul className="px-5 pt-3 pb-6">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-baseline justify-between py-3.5 border-b border-[var(--trait)] font-[family-name:var(--titres)] text-2xl">
                {l.libelle}
                <span aria-hidden="true" className="text-base text-[var(--accent-texte)]">→</span>
              </Link>
            </li>
          ))}
          <li className="pt-5">
            <a href={`tel:${entreprise.telephoneLien}`} className="flex justify-center rounded-full border border-[var(--encre)] px-6 py-3.5 font-semibold">
              {entreprise.telephone}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
