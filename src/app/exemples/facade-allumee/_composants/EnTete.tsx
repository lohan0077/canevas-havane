"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le nom, et sa lettre allumée : un point d'ambre, qui ne clignote pas. */
export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="relative grid h-9 w-9 place-items-center rounded-full border border-[var(--trait)] font-[family-name:var(--titres)] text-xl italic text-[var(--accent-texte)]">
        A
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_12px_3px_rgba(242,181,68,.6)]" />
      </span>
      <span className="font-[family-name:var(--titres)] text-[22px] leading-none tracking-tight">
        Façade <span className="italic text-[var(--accent-texte)]">Allumée</span>
      </span>
    </span>
  );
}

/**
 * La barre du site, collée en haut. Sous 768 px, les liens passent dans un panneau
 * ouvert par « Menu ». Aucun bouton d'action ici : sur l'accueil, il n'y en a qu'un.
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

  const actif = (href: string) => (href === DOSSIER ? chemin === href : chemin.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-[64px] max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={DOSSIER} aria-label="Façade Allumée, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden items-center gap-8 text-sm font-semibold md:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={actif(l.href) ? "page" : undefined} className={`underline-offset-8 hover:underline ${actif(l.href) ? "text-[var(--accent-texte)]" : ""}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
          <li>
            <a href="#contact" className="underline-offset-8 hover:underline">Contact</a>
          </li>
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="fa-menu"
          onClick={() => setOuvert((o) => !o)}
          className="min-h-[44px] rounded-full border border-[var(--trait)] px-5 text-sm font-semibold md:hidden"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="fa-menu" hidden={!ouvert} className="border-t border-[var(--trait)] bg-[var(--fond)] md:hidden">
        <ul className="mx-auto max-w-6xl px-5 py-3">
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} aria-current={actif(l.href) ? "page" : undefined} className={`block py-4 text-lg font-semibold ${actif(l.href) ? "text-[var(--accent-texte)]" : ""}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
          <li>
            <a href="#contact" onClick={() => setOuvert(false)} className="block py-4 text-lg font-semibold">Contact</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
