"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le repère du cabinet : deux bornes et la limite qui les relie. */
export function Repere({ className = "h-7 w-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 28" className={className} aria-hidden="true" focusable="false">
      <path d="M8 20 L40 8" stroke="currentColor" strokeWidth="2.5" strokeDasharray="4 3" />
      <rect x="2" y="14" width="12" height="12" rx="2.5" fill="currentColor" />
      <rect x="34" y="2" width="12" height="12" rx="2.5" fill="currentColor" />
      <circle cx="8" cy="20" r="2.6" fill="#F27438" />
      <circle cx="40" cy="8" r="2.6" fill="#F27438" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5 text-[var(--accent-texte)]">
      <Repere />
      <span className="leading-none">
        <span className="block font-[family-name:var(--titres)] text-lg font-bold tracking-tight text-[var(--encre)]">La Bonne Limite</span>
        <span className="block text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--doux)]">Géomètre-expert</span>
      </span>
    </span>
  );
}

/**
 * La barre du site : le nom au centre de la page, trois liens, et un « Menu » en
 * pastille sous 768 px — la sobriété des modèles de MotionSites, transposée.
 */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOuvert(false);
    };
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-[64px] max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={DOSSIER} aria-label="La Bonne Limite, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden items-center gap-2 text-sm font-medium md:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={chemin === l.href ? "page" : undefined}
                className={`rounded-full px-4 py-2 transition-colors hover:bg-[var(--carte)] ${chemin === l.href ? "bg-[var(--carte)] text-[var(--accent-texte)]" : ""}`}
              >
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="lbl-menu"
          onClick={() => setOuvert((o) => !o)}
          className="min-h-[44px] rounded-full bg-[var(--encre)] px-5 text-sm font-semibold text-[var(--fond)] md:hidden"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="lbl-menu" hidden={!ouvert} className="border-t border-[var(--trait)] bg-[var(--fond)] md:hidden">
        <ul className="mx-auto max-w-6xl space-y-1 px-5 py-4">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="block rounded-2xl bg-[var(--carte)] px-5 py-4 text-lg font-semibold">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
