"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le logo : le nom en capitales grasses, entre deux guillemets bleus. Décoratifs, les guillemets. */
export function Logo({ clair = false }: { clair?: boolean }) {
  return (
    <span className={`flex items-baseline gap-1 font-[family-name:var(--titres)] text-[22px] leading-none font-black tracking-[-0.03em] uppercase ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--encre)]"}`}>
      <span aria-hidden="true" className={clair ? "text-[#A9B8FF]" : "text-[var(--accent-texte)]"}>«</span>
      Mot pour Mot
      <span aria-hidden="true" className={clair ? "text-[#A9B8FF]" : "text-[var(--accent-texte)]"}>»</span>
    </span>
  );
}

/**
 * L'en-tête : blanc, collé en haut, un trait noir dessous. Sous 1024 px, la navigation
 * passe dans un panneau que le bouton rond « Menu » ouvre (Échap le ferme).
 */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    const largeur = () => window.innerWidth >= 1024 && setOuvert(false);
    document.addEventListener("keydown", touche);
    window.addEventListener("resize", largeur);
    return () => {
      document.removeEventListener("keydown", touche);
      window.removeEventListener("resize", largeur);
    };
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-[var(--encre)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={DOSSIER} aria-label="Mot pour Mot, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden items-center gap-2 lg:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={chemin === l.href.split("#")[0] && !l.href.includes("#") ? "page" : undefined}
                className="rounded-full px-4 py-2 text-[14px] font-semibold hover:bg-[var(--carte)]"
              >
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href={`${DOSSIER}#rendez-vous`} className="hidden rounded-full bg-[var(--encre)] px-5 py-2.5 text-[14px] font-semibold text-[var(--fond)] sm:inline-block">
            Choisir mon créneau
          </Link>
          <button
            type="button"
            aria-expanded={ouvert}
            aria-controls="mpm-menu"
            onClick={() => setOuvert((o) => !o)}
            className="min-h-11 rounded-full border-2 border-[var(--encre)] px-5 text-[14px] font-semibold lg:hidden"
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="mpm-menu" hidden={!ouvert} className="border-t border-[var(--trait)] lg:hidden">
        <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3.5 font-[family-name:var(--titres)] text-[28px] font-black tracking-[-0.02em] uppercase">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
