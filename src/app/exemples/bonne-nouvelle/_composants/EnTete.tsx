"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le monogramme « BN » dans une bulle (un appel qui arrive) et le nom en Fraunces. */
export function Logo({ clair = false }: { clair?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-full rounded-br-[6px] bg-[#F2C14E] font-[family-name:var(--titres)] text-[14px] font-semibold text-[#1B2A41]">
        BN
      </span>
      <span className={`font-[family-name:var(--titres)] text-[24px] leading-none font-medium tracking-[-0.01em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--encre)]"}`}>
        Bonne Nouvelle
      </span>
    </span>
  );
}

/** L'en-tête : le logo, trois liens au centre, le bouton du rendez-vous ; un panneau sous 1024 px. */
export default function EnTete() {
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
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={DOSSIER} aria-label="Bonne Nouvelle, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden items-center gap-8 text-[15px] lg:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:underline hover:underline-offset-4">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href={`${DOSSIER}#rendez-vous`} className="hidden rounded-[12px] bg-[var(--encre)] px-5 py-2.5 text-[14px] font-semibold text-[var(--carte)] sm:inline-block">
            Prendre rendez-vous
          </Link>
          <button
            type="button"
            aria-expanded={ouvert}
            aria-controls="bn-menu"
            onClick={() => setOuvert((o) => !o)}
            className="min-h-11 rounded-[12px] border border-[var(--encre)] px-4 text-[14px] font-semibold lg:hidden"
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="bn-menu" hidden={!ouvert} className="border-t border-[var(--trait)] lg:hidden">
        <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3.5 font-[family-name:var(--titres)] text-[26px]">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
