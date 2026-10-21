"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le nom de la marque, entre ses crochets : la pièce, et rien d'autre autour. */
export function Logo({ clair = false }: { clair?: boolean }) {
  return (
    <span className={`inline-flex items-baseline gap-1.5 text-[26px] leading-none font-[family-name:var(--titres)] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--encre)]"}`}>
      <span aria-hidden="true" className={clair ? "" : "text-[var(--accent-texte)]"}>[</span>
      Jamais Deux
      <span aria-hidden="true" className={clair ? "" : "text-[var(--accent-texte)]"}>]</span>
    </span>
  );
}

/**
 * La barre du site, collée en haut. Sous 1024 px, les liens passent dans un panneau
 * ouvert par « Menu » ; Échap ou un lien le referme.
 */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  const actif = (href: string) => !href.includes("#") && (chemin === href || chemin.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]/95 backdrop-blur">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={DOSSIER} aria-label="Jamais Deux, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden items-center gap-8 text-[13px] font-semibold uppercase tracking-[0.14em] lg:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={actif(l.href) ? "page" : undefined} className={`underline-offset-8 hover:underline ${actif(l.href) ? "underline" : ""}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="flex min-h-11 items-center gap-2 border border-[var(--encre)] px-4 text-[13px] font-semibold uppercase tracking-[0.14em] lg:hidden"
          aria-expanded={ouvert}
          aria-controls="jd-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          <span aria-hidden="true" className="flex flex-col gap-[3px]">
            <i className={`block h-px w-4 bg-current transition-transform ${ouvert ? "translate-y-[2px] rotate-45" : ""}`} />
            <i className={`block h-px w-4 bg-current transition-transform ${ouvert ? "-translate-y-[2px] -rotate-45" : ""}`} />
          </span>
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="jd-menu" hidden={!ouvert} className="border-t border-[var(--trait)] bg-[var(--fond)] lg:hidden">
        <ul className="mx-auto max-w-6xl px-5 py-2">
          {NAVIGATION.map((l, i) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-baseline justify-between py-4 text-2xl font-[family-name:var(--titres)]">
                {l.libelle}
                <span className="text-sm text-[var(--doux)] tabular-nums">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
