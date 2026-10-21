"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION, carte } from "./donnees";

/**
 * L'en-tête de Tel Quel, collé en haut, et sous lui la bande de la carte professionnelle,
 * présente sur chaque page : repliée, elle dit la mention et le numéro ; dépliée, tout ce
 * que la carte porte, garant compris. Sous 1024 px, la navigation passe dans un panneau.
 */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  const [carteOuverte, setCarteOuverte] = useState(false);

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
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]">
        <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href={DOSSIER} aria-label="Tel Quel, accueil" onClick={() => setOuvert(false)}>
            <Logo />
          </Link>
          <ul className="hidden items-center gap-8 text-[15px] font-medium lg:flex">
            {NAVIGATION.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={actif(l.href) ? "page" : undefined}
                  className={`border-b-2 pb-1 ${actif(l.href) ? "border-[var(--accent)]" : "border-transparent hover:border-[var(--trait)]"}`}
                >
                  {l.libelle}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Link href={`${DOSSIER}#contact`} className="hidden rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--sur-accent)] sm:inline-block">
              Parler de mon logement
            </Link>
            <button
              type="button"
              aria-expanded={ouvert}
              aria-controls="telquel-menu"
              onClick={() => setOuvert((o) => !o)}
              className="min-h-11 rounded-full border border-[var(--encre)] px-5 text-sm font-semibold lg:hidden"
            >
              {ouvert ? "Fermer" : "Menu"}
            </button>
          </div>
        </nav>
        <div id="telquel-menu" hidden={!ouvert} className="border-t border-[var(--trait)] lg:hidden">
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
              <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
                <Link
                  href={l.href}
                  onClick={() => setOuvert(false)}
                  aria-current={chemin === l.href ? "page" : undefined}
                  className="block py-3.5 font-[family-name:var(--titres)] text-[26px]"
                >
                  {l.libelle}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <Link href={`${DOSSIER}#contact`} onClick={() => setOuvert(false)} className="block rounded-full bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-[var(--sur-accent)]">
                Parler de mon logement
              </Link>
            </li>
          </ul>
        </div>
      </header>

      {/* La carte, sur chaque page. */}
      <aside aria-label="Carte professionnelle" data-film="bande-carte" className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <button
            type="button"
            data-film="carte-depliee"
            aria-expanded={carteOuverte}
            aria-controls="telquel-carte"
            onClick={() => setCarteOuverte((o) => !o)}
            className="flex min-h-11 w-full items-center justify-between gap-3 py-2 text-left text-[13px]"
          >
            <span>
              <span className="font-semibold text-[#E3C88E]">Carte professionnelle · {carte[0].valeur}</span>
              <span className="hidden sm:inline"> · n° {carte[1].valeur} (exemple)</span>
            </span>
            <span className="shrink-0 font-semibold underline underline-offset-4">{carteOuverte ? "Replier" : "Tout lire"}</span>
          </button>
          <div id="telquel-carte" hidden={!carteOuverte} className="pb-5">
            <dl className="grid gap-x-8 gap-y-3 border-t border-[#3D5D55] pt-4 text-[14px] sm:grid-cols-2">
              {carte.map((l) => (
                <div key={l.libelle}>
                  <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#C9D6CF]">{l.libelle}</dt>
                  <dd className="font-semibold">{l.valeur}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[13px] leading-relaxed text-[#C9D6CF]">
              Numéro d&apos;exemple : l&apos;entreprise est fictive. Louer, de façon habituelle, le logement
              d&apos;un autre exige cette carte, même à titre accessoire (loi n° 70-9 du 2 janvier 1970,
              art. 1er et 3).
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
