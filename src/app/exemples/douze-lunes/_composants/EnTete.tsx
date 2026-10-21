"use client";

import { useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";
import { useMoment } from "./Moment";

/** Le croissant de Douze Lunes : une lune pleine, mangée par une autre. */
export function Croissant({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <path d="M20 3.2A13 13 0 1 0 29 22.4 10.4 10.4 0 0 1 20 3.2Z" fill="currentColor" />
    </svg>
  );
}

/** L'interrupteur jour / soir. Le site bascule seul à la fermeture ; ici, on regarde l'autre visage. */
function Interrupteur() {
  const { moment, basculer } = useMoment();
  const soir = moment === "soir";
  return (
    <button
      type="button"
      data-film="bascule"
      onClick={basculer}
      aria-pressed={soir}
      aria-label={soir ? "Afficher le site de jour" : "Afficher le site du soir"}
      className="relative flex h-11 w-[86px] shrink-0 items-center justify-between rounded-full border border-[var(--trait)] bg-[var(--carte)] px-2.5"
    >
      <span
        aria-hidden="true"
        className={`absolute top-1 h-[34px] w-[38px] rounded-full bg-[var(--accent)] transition-transform duration-500 ${soir ? "translate-x-[36px]" : "translate-x-[-4px]"}`}
      />
      <svg viewBox="0 0 24 24" aria-hidden="true" className={`relative h-5 w-5 ${soir ? "text-[var(--doux)]" : "text-[var(--sur-accent)]"}`}>
        <circle cx="12" cy="12" r="4.5" fill="currentColor" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <path key={a} d="M12 2.5v2.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" transform={`rotate(${a} 12 12)`} />
        ))}
      </svg>
      <Croissant className={`relative h-5 w-5 ${soir ? "text-[var(--sur-accent)]" : "text-[var(--doux)]"}`} />
    </button>
  );
}

export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]/95 backdrop-blur transition-colors duration-500">
      <nav aria-label="Principale" className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href={DOSSIER} aria-label="Douze Lunes, accueil" className="flex items-center gap-2.5" onClick={() => setOuvert(false)}>
          <Croissant className="h-8 w-8 text-[var(--accent-texte)]" />
          <span className="font-[family-name:var(--titres)] text-[26px] leading-none tracking-tight">Douze Lunes</span>
        </Link>
        <ul className="hidden items-center gap-7 text-[15px] font-semibold lg:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-8 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Interrupteur />
          <button
            type="button"
            className="h-11 rounded-full border border-[var(--trait)] px-4 text-sm font-bold lg:hidden"
            aria-expanded={ouvert}
            aria-controls="dl-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="dl-menu" hidden={!ouvert} className="border-t border-[var(--trait)] bg-[var(--fond)] lg:hidden">
        <ul className="mx-auto max-w-6xl px-4 py-3">
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3.5 text-lg font-semibold">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
