"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION, STATUT, cabinet } from "./donnees";

/** Le logo : un petit ticket (trois lignes, un bord dentelé) et le nom en Newsreader. */
export function Logo({ clair = false }: { clair?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 28 34" className="h-8 w-7 shrink-0" aria-hidden="true">
        <path
          d="M3 2h22v27l-3.7 3-3.6-3-3.7 3-3.7-3-3.6 3L3 29z"
          fill={clair ? "#F4F2EA" : "#24443A"}
        />
        <path d="M8 10h12M8 15h12M8 20h7" stroke={clair ? "#1B3329" : "#F4F2EA"} strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className={`font-[family-name:var(--titres)] text-[23px] leading-none tracking-[-0.01em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--encre)]"}`}>
        Ligne par Ligne
      </span>
    </span>
  );
}

/**
 * En haut de chaque page, le statut, écrit juste : jamais « agréé AMF », « adhérent d'une
 * association agréée par l'AMF » (position AMF DOC-2006-23, q. 4.6), avec l'autre statut
 * et l'ORIAS. Puis la navigation, repliable sous 1024 px (Échap ferme le panneau).
 */
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
    <>
      <p data-film="statut" className="bg-[var(--sombre)] px-4 py-2 text-center text-[12px] leading-snug text-[#BFD3C6] sm:px-6">
        <span className="text-[var(--sur-sombre)]">{STATUT}</span> · Courtier en assurance · ORIAS n°&nbsp;{cabinet.orias} (exemple)
      </p>
      <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]/95 backdrop-blur">
        <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href={DOSSIER} aria-label="Ligne par Ligne, accueil" onClick={() => setOuvert(false)}>
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
            <Link href={`${DOSSIER}#rendez-vous`} className="hidden rounded-full bg-[var(--accent)] px-5 py-2.5 text-[14px] font-semibold text-[var(--sur-accent)] sm:inline-block">
              Prendre rendez-vous
            </Link>
            <button
              type="button"
              aria-expanded={ouvert}
              aria-controls="lpl-menu"
              onClick={() => setOuvert((o) => !o)}
              className="min-h-11 rounded-full border border-[var(--encre)] px-5 text-[14px] font-semibold lg:hidden"
            >
              {ouvert ? "Fermer" : "Menu"}
            </button>
          </div>
        </nav>
        <div id="lpl-menu" hidden={!ouvert} className="border-t border-[var(--trait)] lg:hidden">
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
    </>
  );
}
