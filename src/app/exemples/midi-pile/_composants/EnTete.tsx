"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, FRANCE_RENOV, NAVIGATION } from "./donnees";

/** Le soleil à midi pile : un disque, et l'aiguille à la verticale. */
export function Logo() {
  return (
    <span className="flex items-center gap-2">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <circle cx="16" cy="16" r="15" fill="var(--accent)" />
        <circle cx="16" cy="16" r="15" fill="none" stroke="var(--encre)" strokeWidth="2" />
        <line x1="16" y1="16" x2="16" y2="5" stroke="var(--encre)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="16" cy="16" r="2.5" fill="var(--encre)" />
      </svg>
      <span className="font-[family-name:var(--titres)] text-[22px] font-bold tracking-[-0.03em] leading-none">midi pile</span>
    </span>
  );
}

/**
 * Le lien France Rénov', au premier rang de chaque page : le message de l'annexe I
 * de l'arrêté du 7 juillet 2026, sans un mot changé, cliquable vers la page que
 * l'arrêté désigne. La loi exige le lien (C. consom., art. L122-26) ; la place tout en
 * haut est un choix.
 */
export function BandeauRenov() {
  return (
    <div id="france-renov" className="bg-[#16407A] text-white">
      <a href={FRANCE_RENOV.lien} rel="noopener noreferrer" className="block max-w-6xl mx-auto px-4 py-3 text-[14px] leading-snug sm:text-center">
        <span className="font-bold">France Rénov'</span>
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
    <header className="sticky top-0 z-40 bg-[var(--fond)]/95 backdrop-blur border-b border-[var(--trait)]">
      <nav aria-label="Principale" className="max-w-6xl mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
        <Link href={DOSSIER} aria-label="Midi Pile, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>
        <ul className="hidden md:flex items-center gap-7 text-[15px] font-semibold">
          {NAVIGATION.slice(0, 3).map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className="hover:text-[var(--accent-texte)]">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link href={`${DOSSIER}/etre-rappele`} className="inline-flex h-10 items-center rounded-full bg-[var(--accent)] px-4 text-sm font-bold text-[var(--sur-accent)]">
            Être rappelé
          </Link>
          <button
            type="button"
            className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-[var(--encre)]"
            aria-expanded={ouvert}
            aria-controls="mp-menu"
            aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setOuvert((o) => !o)}
          >
            <span aria-hidden="true" className="relative block h-3 w-4">
              <span className={`absolute left-0 h-0.5 w-4 bg-[var(--encre)] transition-transform ${ouvert ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-4 bg-[var(--encre)] transition-transform ${ouvert ? "top-1.5 -rotate-45" : "top-2.5"}`} />
            </span>
          </button>
        </div>
      </nav>
      <div id="mp-menu" hidden={!ouvert} className="md:hidden border-t border-[var(--trait)] bg-[var(--fond)] px-4 pb-4">
        <ul className="divide-y divide-[var(--trait)]">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-center justify-between py-4 text-lg font-semibold">
                {l.libelle}
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
