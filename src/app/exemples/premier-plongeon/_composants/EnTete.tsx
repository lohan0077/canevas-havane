"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION } from "./donnees";
import { styles as s } from "./Habillage";

/**
 * La barre de navigation du site, collée en haut de l'écran. Sur l'accueil, elle
 * vient juste après l'ouverture ; sur les autres pages, juste sous le bandeau.
 * Sous 1024 px, les liens passent dans un panneau ouvert par le bouton « Menu ».
 */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOuvert(false);
    };
    const largeur = () => {
      if (window.innerWidth >= 1024) setOuvert(false);
    };
    document.addEventListener("keydown", touche);
    window.addEventListener("resize", largeur);
    return () => {
      document.removeEventListener("keydown", touche);
      window.removeEventListener("resize", largeur);
    };
  }, [ouvert]);

  const actif = (href: string) => chemin === href || chemin.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 bg-[#04070d]/90 backdrop-blur border-b border-[rgba(255,255,255,0.13)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 h-[68px]">
        <Link href={DOSSIER} aria-label="Premier Plongeon, accueil" onClick={() => setOuvert(false)}>
          <Logo replie />
        </Link>

        <ul className={`${s.technique} hidden lg:flex items-center gap-7 text-xs whitespace-nowrap`}>
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={actif(l.href) ? "page" : undefined}
                className={`transition-colors hover:text-[#e8d1cb] ${actif(l.href) ? "text-[#e8d1cb]" : "text-[#e6eaf5]"}`}
              >
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href={`${DOSSIER}/ma-date`} className={`${s.bouton} min-h-[42px]! px-5! text-[12px] max-[430px]:hidden!`}>
            Ma date
          </Link>
          <button
            type="button"
            className={`${s.boutonFantome} min-h-[42px]! px-4! text-[12px] lg:hidden!`}
            aria-expanded={ouvert}
            aria-controls="pp-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>

      <div id="pp-menu" hidden={!ouvert} className="lg:hidden border-t border-[rgba(255,255,255,0.13)] bg-[#04070d]">
        <ul className={`${s.technique} max-w-6xl mx-auto px-4 sm:px-6 py-4 text-sm`}>
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-[rgba(255,255,255,0.08)] last:border-0">
              <Link
                href={l.href}
                onClick={() => setOuvert(false)}
                aria-current={actif(l.href) ? "page" : undefined}
                className={`block py-3.5 ${actif(l.href) ? "text-[#e8d1cb]" : "text-[#e6eaf5]"}`}
              >
                {l.libelle}
              </Link>
            </li>
          ))}
          <li className="pt-4">
            <Link href={`${DOSSIER}/ma-date`} onClick={() => setOuvert(false)} className={`${s.bouton} w-full`}>
              Choisir ma semaine
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
