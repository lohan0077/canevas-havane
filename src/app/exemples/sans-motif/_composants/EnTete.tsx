"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le monogramme : deux lettres sur un aplat, sans motif. */
export function Logo({ clair = false }: { clair?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className={`grid h-10 w-10 place-items-center rounded-[12px] font-[family-name:var(--titres)] text-[15px] font-bold tracking-[-0.04em] ${clair ? "bg-[#EEF0F2] text-[#1B2230]" : "bg-[#3552C7] text-white"}`}>
        sm
      </span>
      <span className="leading-none">
        <span className="block font-[family-name:var(--titres)] text-lg font-semibold tracking-[-0.03em] whitespace-nowrap">Sans Motif</span>
        <span className={`block text-[11px] mt-1 ${clair ? "text-[#AEB6C4]" : "text-[var(--doux)]"}`}>Psychologue</span>
      </span>
    </span>
  );
}

/**
 * En tête de chaque page : les numéros d'urgence, puis la barre du cabinet. Sur
 * téléphone, les liens passent dans un panneau ouvert par « Menu ».
 */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <>
      <p id="urgences" className="bg-[#DCE3FF] text-[#1B2230] text-[13px] leading-snug text-center px-4 py-2">
        Urgence&nbsp;: <strong>15</strong> · Prévention du suicide&nbsp;: <strong>3114</strong>
      </p>
      <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur">
        <nav aria-label="Principale" className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-4 sm:px-6 h-[68px]">
          <Link href={DOSSIER} aria-label="Sans Motif, accueil" onClick={() => setOuvert(false)}>
            <Logo />
          </Link>
          <ul className="hidden lg:flex items-center gap-7 text-[15px] font-medium">
            {NAVIGATION.slice(0, 3).map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-[var(--accent-texte)]">{l.libelle}</Link></li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Link href={`${DOSSIER}/rendez-vous`} className="max-[419px]:hidden inline-flex items-center min-h-11 rounded-full bg-[var(--encre)] text-[var(--fond)] px-5 text-[15px] font-semibold whitespace-nowrap">
              Rendez-vous
            </Link>
            <button
              type="button"
              aria-expanded={ouvert}
              aria-controls="sm-menu"
              onClick={() => setOuvert((o) => !o)}
              className="lg:hidden inline-flex items-center min-h-11 rounded-full bg-[var(--carte)] px-5 text-[15px] font-semibold"
            >
              {ouvert ? "Fermer" : "Menu"}
            </button>
          </div>
        </nav>
        <div id="sm-menu" hidden={!ouvert} className="lg:hidden bg-[var(--fond)] border-b border-[var(--trait)]">
          <ul className="px-4 pb-4 space-y-2">
            {NAVIGATION.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-center justify-between rounded-2xl bg-[var(--carte)] px-5 py-4 font-[family-name:var(--titres)] text-lg font-medium">
                  {l.libelle}
                  <span aria-hidden="true" className="text-[var(--accent-texte)]">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
}
