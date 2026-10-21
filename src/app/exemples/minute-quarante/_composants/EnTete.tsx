"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le nom, en deux voix : « Minute » droit, « Quarante » en italique. */
export function Logo({ grand = false }: { grand?: boolean }) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 leading-none ${grand ? "text-3xl" : "text-xl"}`}>
      <span className="font-extrabold tracking-[-0.04em]">Minute</span>
      <span className="font-[family-name:var(--titres)] italic font-medium tracking-[-0.02em] text-[var(--accent-texte)]">Quarante</span>
    </span>
  );
}

/**
 * La barre du site, collée en haut. Sous 768 px, les liens passent dans un panneau
 * ouvert par « Menu » ; « Réserver » reste toujours à portée de pouce.
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

  const actif = (href: string) => chemin === href;

  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)] border-b border-[var(--trait)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-5 h-16">
        <Link href={DOSSIER} aria-label="Minute Quarante, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-[15px] font-semibold">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={actif(l.href) ? "page" : undefined}
                className={`underline-offset-[6px] decoration-2 hover:underline ${actif(l.href) ? "underline decoration-[var(--accent)]" : ""}`}
              >
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link
            href={`${DOSSIER}/reserver`}
            className="hidden min-[400px]:inline-flex md:inline-flex items-center rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-4 h-11 text-sm font-bold"
          >
            Ma date
          </Link>
          <button
            type="button"
            className="md:hidden inline-flex items-center rounded-full border-2 border-[var(--encre)] px-4 h-11 text-sm font-bold"
            aria-expanded={ouvert}
            aria-controls="mq-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="mq-menu" hidden={!ouvert} className="md:hidden border-t border-[var(--trait)] bg-[var(--fond)]">
        <ul className="px-5 py-3 text-lg font-semibold">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link
                href={l.href}
                onClick={() => setOuvert(false)}
                aria-current={actif(l.href) ? "page" : undefined}
                className="flex items-center justify-between py-4"
              >
                {l.libelle}
                <span aria-hidden="true" className="text-[var(--accent-texte)]">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
