"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, FRANCE_RENOV, NAVIGATION } from "./donnees";

/** Le monogramme : un H dans le cadran, et un point à midi. */
export function Monogramme({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="20" y="28" textAnchor="middle" fontSize="21" fontFamily="var(--titres)" fill="currentColor">H</text>
      <circle cx="20" cy="4.5" r="2.2" fill="var(--accent)" />
    </svg>
  );
}

/**
 * Le lien France Rénov', au premier rang : le message de l'annexe I de l'arrêté du
 * 7 juillet 2026, sans un mot changé, cliquable vers la page que l'arrêté désigne
 * (C. consom., art. L122-26).
 */
export function BandeauRenov() {
  return (
    <div id="france-renov" className="bg-[#E3EEF3] text-[#14324A] border-b border-[#9CC3D5]">
      <a href={FRANCE_RENOV.lien} rel="noopener noreferrer" className="block max-w-6xl mx-auto px-4 py-3 text-[14px] leading-snug sm:text-center">
        <span className="font-semibold">France Rénov'</span>
        <span aria-hidden="true"> · </span>
        <span className="underline underline-offset-2">{FRANCE_RENOV.message}</span>
      </a>
    </div>
  );
}

export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 bg-[var(--fond)] border-b border-[var(--trait)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
        <Link href={DOSSIER} aria-label="L'Heure Dite, accueil" onClick={() => setOuvert(false)} className="flex items-center gap-2.5">
          <Monogramme />
          <span className="font-[family-name:var(--titres)] text-[22px] leading-none">L'Heure Dite</span>
        </Link>
        <ul className="hidden md:flex items-center gap-8 text-[15px]">
          {NAVIGATION.slice(1).map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className="hover:underline underline-offset-4">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href={`${DOSSIER}/rendez-vous`} className="inline-flex h-10 items-center rounded-full bg-[var(--sombre)] px-4 text-sm font-semibold text-[var(--sur-sombre)]">
            Mon heure
          </Link>
          <button
            type="button"
            className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-[var(--encre)]"
            aria-expanded={ouvert}
            aria-controls="hd-menu"
            aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOuvert((o) => !o)}
          >
            <span aria-hidden="true" className="relative block h-3 w-4">
              <span className={`absolute left-0 h-px w-4 bg-[var(--encre)] transition-transform ${ouvert ? "top-1.5 rotate-45" : "top-0.5"}`} />
              <span className={`absolute left-0 h-px w-4 bg-[var(--encre)] transition-transform ${ouvert ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </nav>
      <div id="hd-menu" hidden={!ouvert} className="md:hidden border-t border-[var(--trait)] px-4 pb-4">
        <ul className="divide-y divide-[var(--trait)]">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-center justify-between py-4 font-[family-name:var(--titres)] text-2xl">
                {l.libelle}
                <span aria-hidden="true" className="text-base">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
