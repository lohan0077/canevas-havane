"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION } from "./donnees";

/** L'emblème : un cadran rond, « 12 » en haut, les deux aiguilles sur midi. */
export function Embleme({ taille = 40, clair = false }: { taille?: number; clair?: boolean }) {
  const trait = clair ? "#FBF5EA" : "#2F4A3A";
  return (
    <svg viewBox="0 0 48 48" width={taille} height={taille} aria-hidden="true" className="shrink-0">
      <circle cx="24" cy="24" r="22" fill="none" stroke={trait} strokeWidth="1.6" />
      <circle cx="24" cy="24" r="18.5" fill="none" stroke={trait} strokeWidth="0.7" />
      <text x="24" y="17" textAnchor="middle" fontSize="9.5" fontFamily="var(--titres)" fill={trait}>12</text>
      <path d="M24 34V22" stroke="#B5523B" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="34" r="1.8" fill="#B5523B" />
    </svg>
  );
}

export function Logo({ clair = false }: { clair?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <Embleme clair={clair} />
      <span className={`font-[family-name:var(--titres)] text-[23px] leading-none tracking-[-0.01em] ${clair ? "text-[var(--sur-sombre)]" : "text-[var(--encre)]"}`}>
        Dimanche Midi
      </span>
    </span>
  );
}

/** L'en-tête : l'emblème et le nom, trois liens, un panneau sous 1024 px (Échap le ferme). */
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
        <Link href={DOSSIER} aria-label="Dimanche Midi, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden items-center gap-8 text-[15px] lg:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="hover:underline hover:underline-offset-4">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-expanded={ouvert}
          aria-controls="dm-menu"
          onClick={() => setOuvert((o) => !o)}
          className="min-h-11 rounded-full border border-[var(--encre)] px-5 text-[14px] font-semibold lg:hidden"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
        <Link href={`${DOSSIER}/carnet`} className="hidden rounded-full bg-[var(--accent)] px-5 py-2.5 text-[14px] font-semibold text-[var(--sur-accent)] lg:inline-block">
          Ouvrir le carnet
        </Link>
      </nav>
      <div id="dm-menu" hidden={!ouvert} className="border-t border-[var(--trait)] lg:hidden">
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
