"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/**
 * L'en-tête du Veilleur, collé en haut de l'écran. Sous 1024 px, les liens passent
 * dans un panneau que le bouton « Menu » ouvre et ferme (Échap le ferme aussi).
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

  const actif = (href: string) => chemin === href || chemin.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]/95 backdrop-blur">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href={DOSSIER} aria-label="Le Veilleur, accueil" onClick={() => setOuvert(false)}>
          <Logo />
        </Link>

        <ul className="hidden items-center gap-8 text-[15px] font-semibold lg:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={actif(l.href) ? "page" : undefined}
                className={`underline-offset-[6px] hover:underline ${actif(l.href) ? "underline decoration-[var(--accent)] decoration-2" : ""}`}
              >
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${entreprise.telephoneLien}`}
            className="hidden rounded-full border border-[var(--encre)] px-4 py-2.5 text-sm font-bold sm:inline-block"
          >
            {entreprise.telephone}
          </a>
          <button
            type="button"
            className="min-h-11 rounded-full bg-[var(--encre)] px-5 text-sm font-bold text-[var(--fond)] lg:hidden"
            aria-expanded={ouvert}
            aria-controls="veilleur-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
          <Link
            href={`${DOSSIER}/proprietaires#estimation`}
            className="hidden rounded-full bg-[var(--encre)] px-5 py-2.5 text-sm font-bold text-[var(--fond)] lg:inline-block"
          >
            Confier mon logement
          </Link>
        </div>
      </nav>

      <div id="veilleur-menu" hidden={!ouvert} className="border-t border-[var(--trait)] bg-[var(--fond)] lg:hidden">
        <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <li className="border-b border-[var(--trait)]">
            <Link href={DOSSIER} onClick={() => setOuvert(false)} className="block py-3.5 font-[family-name:var(--titres)] text-2xl">
              Accueil
            </Link>
          </li>
          {NAVIGATION.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)]">
              <Link
                href={l.href}
                onClick={() => setOuvert(false)}
                aria-current={actif(l.href) ? "page" : undefined}
                className="block py-3.5 font-[family-name:var(--titres)] text-2xl"
              >
                {l.libelle}
              </Link>
            </li>
          ))}
          <li className="pt-4 pb-2">
            <Link
              href={`${DOSSIER}/proprietaires#estimation`}
              onClick={() => setOuvert(false)}
              className="block rounded-full bg-[var(--encre)] px-6 py-3.5 text-center font-bold text-[var(--fond)]"
            >
              Confier mon logement
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
