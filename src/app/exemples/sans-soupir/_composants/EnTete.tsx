"use client";

import { useState } from "react";
import Link from "next/link";
import Marque from "./Marque";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** La barre de Sans Soupir : de gros caractères, de grosses cibles. Repliée sous 900 px. */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)] border-b border-[var(--trait)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto h-[68px] px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Sans Soupir, accueil" className="flex items-center gap-2.5">
          <Marque />
          <span className="font-[family-name:var(--titres)] text-[22px] font-bold tracking-tight">{entreprise.nom}</span>
        </Link>
        <ul className="hidden min-[900px]:flex items-center gap-7 text-[17px] font-semibold">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="underline-offset-8 decoration-[var(--accent)] decoration-[3px] hover:underline">{l.libelle}</Link></li>
          ))}
          <li><a href={`tel:${entreprise.telephoneLien}`} className="rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-5 py-3 font-bold">{entreprise.telephone}</a></li>
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="ss-menu"
          onClick={() => setOuvert((o) => !o)}
          className="min-[900px]:hidden h-12 rounded-full border-2 border-[var(--sombre)] px-5 text-[17px] font-bold"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="ss-menu" hidden={!ouvert} className="min-[900px]:hidden border-t border-[var(--trait)] bg-[var(--carte)]">
        <ul className="px-4 py-4 space-y-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-center justify-between rounded-2xl bg-[var(--fond)] px-5 py-4 text-xl font-bold">
                {l.libelle}
                <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full bg-[var(--accent)]">→</span>
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <a href={`tel:${entreprise.telephoneLien}`} className="flex justify-center rounded-full bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 py-4 text-lg font-bold">Appeler le {entreprise.telephone}</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
