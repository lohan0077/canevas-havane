"use client";

import { useState } from "react";
import Link from "next/link";
import Marque from "./Marque";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** La barre de Dimanche Libre : une pilule blanche qui flotte, trois liens. Repliée sous 860 px. */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 px-3 pt-3 pb-2 bg-[var(--fond)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto h-14 rounded-full bg-[var(--carte)] border border-[var(--trait)] pl-3 pr-2 flex items-center justify-between gap-3 shadow-[0_8px_24px_-18px_rgba(34,27,51,0.5)]">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} aria-label="Dimanche Libre, accueil" className="flex items-center gap-2">
          <Marque taille={34} />
          <span className="font-[family-name:var(--titres)] text-xl font-extrabold tracking-tight">{entreprise.nom}</span>
        </Link>
        <ul className="hidden min-[860px]:flex items-center gap-1 text-sm font-semibold">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="rounded-full px-4 py-2 hover:bg-[var(--fond)]">{l.libelle}</Link></li>
          ))}
          <li><a href={`tel:${entreprise.telephoneLien}`} className="ml-1 inline-block rounded-full bg-[var(--encre)] text-[var(--fond)] px-5 py-2.5 font-bold">{entreprise.telephone}</a></li>
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="dl-menu"
          onClick={() => setOuvert((o) => !o)}
          className="min-[860px]:hidden h-10 rounded-full bg-[var(--encre)] text-[var(--fond)] px-4 text-sm font-bold"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="dl-menu" hidden={!ouvert} className="min-[860px]:hidden max-w-6xl mx-auto mt-2 rounded-[28px] bg-[var(--carte)] border border-[var(--trait)] p-3">
        <ul className="space-y-1.5">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l, i) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOuvert(false)}
                className="flex items-center justify-between rounded-[20px] px-4 py-3.5 font-[family-name:var(--titres)] text-2xl font-extrabold"
                style={{ background: ["#F3EFFA", "#FFE8E1", "#DDF6EC", "#FFF1C9"][i] }}
              >
                {l.libelle}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
          <li className="pt-1.5">
            <a href={`tel:${entreprise.telephoneLien}`} className="flex justify-center rounded-full bg-[var(--encre)] text-[var(--fond)] px-6 py-3.5 font-bold">Appeler le {entreprise.telephone}</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
