"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type Lien = { href: string; libelle: string };

/**
 * L'en-tête flottant : une pastille de verre posée sur le premier écran, qui reste
 * en haut quand on descend et se fait plus opaque pour rester lisible. Sur
 * téléphone, « Menu » ouvre un panneau plein écran.
 *
 * Il ne prend aucune hauteur : le premier écran passe dessous. `surSombre` quand ce
 * premier écran est sombre (photo, fond animé) : texte clair tant qu'on n'a pas
 * défilé. Le fond de la pastille reste assez opaque (82 %) pour que la mesure de
 * contraste, qui ne voit pas la photo, la juge sur sa propre couleur.
 */
export default function NavVerre({
  accueil,
  marque,
  liens,
  action,
  surSombre = false,
}: {
  accueil: string;
  marque: React.ReactNode;
  liens: Lien[];
  action?: Lien;
  surSombre?: boolean;
}) {
  const [ouvert, setOuvert] = useState(false);
  const [defile, setDefile] = useState(false);
  const chemin = usePathname();

  useEffect(() => {
    const surDefilement = () => setDefile(window.scrollY > 40);
    surDefilement();
    window.addEventListener("scroll", surDefilement, { passive: true });
    return () => window.removeEventListener("scroll", surDefilement);
  }, []);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", touche);
      document.body.style.overflow = avant;
    };
  }, [ouvert]);

  const clair = surSombre && !defile;
  const pastille = clair
    ? "bg-[color-mix(in_oklab,var(--sombre)_82%,transparent)] text-[var(--sur-sombre)] border-white/15"
    : "bg-[color-mix(in_oklab,var(--carte)_88%,transparent)] text-[var(--encre)] border-[var(--trait)] shadow-[0_12px_40px_-18px_rgba(0,0,0,0.35)]";

  return (
    // Le conteneur collant ne prend aucune hauteur ; la pastille y est posée en absolu.
    // (Une marge sur la pastille traversait le conteneur vide et repoussait la page de
    // 12 px sous le bandeau de démonstration.)
    <div className="sticky top-0 z-50 h-0">
      <nav
        aria-label="Principale"
        className={`absolute left-1/2 top-3 flex w-[calc(100%-1.5rem)] -translate-x-1/2 max-w-6xl items-center justify-between gap-3 rounded-full border px-3 py-2 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-500 sm:w-[calc(100%-3rem)] sm:px-4 ${pastille}`}
      >
        <Link href={accueil} className="flex min-h-11 items-center rounded-full pl-1 pr-2" onClick={() => setOuvert(false)}>
          {marque}
        </Link>
        <ul className="hidden items-center gap-1 lg:flex">
          {liens.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={chemin === l.href ? "page" : undefined}
                className="block rounded-full px-4 py-2.5 text-[15px] font-medium transition-colors hover:bg-[color-mix(in_oklab,currentColor_12%,transparent)] aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[6px]"
              >
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          {action && (
            <Link
              href={action.href}
              className="max-[419px]:hidden inline-flex min-h-11 items-center rounded-full bg-[var(--accent)] px-5 text-[15px] font-semibold text-[var(--sur-accent)] transition-transform hover:scale-[1.03]"
            >
              {action.libelle}
            </Link>
          )}
          <button
            type="button"
            aria-expanded={ouvert}
            aria-controls="menu-plein-ecran"
            onClick={() => setOuvert(true)}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-current/25 px-4 text-[15px] font-semibold lg:hidden"
          >
            Menu
          </button>
        </div>
      </nav>

      {ouvert && (
        <div
          id="menu-plein-ecran"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] flex flex-col bg-[var(--sombre)] px-6 pb-10 pt-6 text-[var(--sur-sombre)]"
        >
          <div className="flex items-center justify-between">
            <Link href={accueil} className="flex min-h-11 items-center" onClick={() => setOuvert(false)}>
              {marque}
            </Link>
            <button
              type="button"
              autoFocus
              onClick={() => setOuvert(false)}
              className="inline-flex min-h-11 items-center rounded-full border border-current/30 px-5 text-[15px] font-semibold"
            >
              Fermer
            </button>
          </div>
          <ul className="mt-14 space-y-2">
            {[{ href: accueil, libelle: "Accueil" }, ...liens].map((l, i) => (
              <li key={l.href} className="kit-apparait" data-vu="" style={{ "--kit-delai": `${80 + i * 60}ms` } as React.CSSProperties}>
                <Link
                  href={l.href}
                  onClick={() => setOuvert(false)}
                  aria-current={chemin === l.href ? "page" : undefined}
                  className="block py-2 font-[family-name:var(--titres)] text-4xl leading-tight aria-[current=page]:underline aria-[current=page]:underline-offset-8"
                >
                  {l.libelle}
                </Link>
              </li>
            ))}
          </ul>
          {action && (
            <Link
              href={action.href}
              onClick={() => setOuvert(false)}
              className="mt-auto inline-flex min-h-14 items-center justify-center rounded-full bg-[var(--accent)] px-6 text-lg font-semibold text-[var(--sur-accent)]"
            >
              {action.libelle}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
