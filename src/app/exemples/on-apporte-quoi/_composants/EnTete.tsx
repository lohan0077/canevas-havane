"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER } from "./donnees";
import { Monogramme } from "./Dessins";

const LIENS = [
  { href: `${DOSSIER}#composer`, libelle: "Composer un coffret" },
  { href: `${DOSSIER}/coffrets`, libelle: "Les coffrets" },
  { href: `${DOSSIER}/degustations`, libelle: "Dégustations" },
  { href: `${DOSSIER}#infos`, libelle: "Infos pratiques" },
];

/** La barre du site : le nom, quatre liens, et un menu replié sous 900 px. */
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
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]/95 backdrop-blur">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} className="flex items-center gap-2.5" aria-label="On Apporte Quoi, accueil">
          <Monogramme className="h-9 w-9 shrink-0" />
          <span className="font-[family-name:var(--titres)] text-[1.35rem] font-semibold tracking-tight">
            On Apporte <em className="font-normal">Quoi</em>
          </span>
        </Link>
        <ul className="hidden items-center gap-7 text-[15px] font-medium min-[900px]:flex">
          {LIENS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className="underline-offset-[6px] hover:underline aria-[current=page]:underline">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="min-h-11 rounded-full border-2 border-[var(--encre)] px-5 text-sm font-semibold min-[900px]:hidden"
          aria-expanded={ouvert}
          aria-controls="oaq-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="oaq-menu" hidden={!ouvert} className="border-t border-[var(--trait)] bg-[var(--fond)] min-[900px]:hidden">
        <ul className="mx-auto max-w-6xl px-5 py-2">
          {LIENS.map((l) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-4 font-[family-name:var(--titres)] text-2xl">
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
