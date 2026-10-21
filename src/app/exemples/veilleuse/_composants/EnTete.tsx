"use client";

import { useState } from "react";
import Link from "next/link";
import Marque from "./Marque";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** La barre de Veilleuse, couleur de nuit : la marque, trois liens. Repliée sous 860 px. */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-[var(--sombre)] text-[var(--sur-sombre)] border-b border-[#33493F]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Veilleuse, sécurité privée — accueil" className="flex items-center gap-2.5">
          <Marque />
          <span className="leading-none">
            <span className="block font-[family-name:var(--titres)] text-2xl">{entreprise.nom}</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9C2B3] mt-1">Sécurité privée</span>
          </span>
        </Link>
        <ul className="hidden min-[860px]:flex items-center gap-7 text-sm font-semibold">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:text-[var(--accent)]">{l.libelle}</Link></li>
          ))}
          <li>
            <a href={`tel:${entreprise.telephoneLien}`} className="rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-5 py-2.5 font-bold">{entreprise.telephone}</a>
          </li>
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="vl-menu"
          onClick={() => setOuvert((o) => !o)}
          className="min-[860px]:hidden h-11 w-11 rounded-full bg-[#33493F] grid place-items-center"
        >
          <span className="sr-only">{ouvert ? "Fermer le menu" : "Ouvrir le menu"}</span>
          <span aria-hidden="true" className="grid gap-[5px]">
            <i className={`block h-[2px] w-5 rounded bg-[var(--sur-sombre)] transition-transform ${ouvert ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <i className={`block h-[2px] w-5 rounded bg-[var(--sur-sombre)] transition-transform ${ouvert ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </nav>
      <div id="vl-menu" hidden={!ouvert} className="min-[860px]:hidden border-t border-[#33493F]">
        <ul className="px-5 pt-2 pb-6">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-center justify-between py-4 border-b border-[#33493F] font-[family-name:var(--titres)] text-[26px]">
                {l.libelle}
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
              </Link>
            </li>
          ))}
          <li className="pt-5">
            <a href={`tel:${entreprise.telephoneLien}`} className="flex justify-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-4 font-bold">Appeler le {entreprise.telephone}</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
