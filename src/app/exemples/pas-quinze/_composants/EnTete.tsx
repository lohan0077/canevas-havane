"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER } from "./donnees";

const LIENS = [
  { href: `${DOSSIER}#cafetiere`, libelle: "Ta cafetière" },
  { href: `${DOSSIER}/cafes`, libelle: "Les cafés" },
  { href: `${DOSSIER}/abonnement`, libelle: "L'abonnement" },
  { href: `${DOSSIER}#brulerie`, libelle: "La brûlerie" },
];

/** La barre du site : le nom en capitales, quatre liens, un menu replié sur téléphone. */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 bg-[var(--encre)] text-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} className="font-[family-name:var(--titres)] text-lg font-black uppercase tracking-tight" aria-label="Pas Quinze, accueil">
          Pas Quinze<span className="text-[#F26B3A]">.</span>
        </Link>
        <ul className="hidden items-center gap-7 text-sm font-semibold md:flex">
          {LIENS.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:text-[#F26B3A]">{l.libelle}</Link></li>
          ))}
        </ul>
        <button
          type="button"
          className="min-h-10 rounded-full bg-[#F26B3A] px-5 text-sm font-bold text-[var(--encre)] md:hidden"
          aria-expanded={ouvert}
          aria-controls="pq-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="pq-menu" hidden={!ouvert} className="border-t border-[#FBF6EE]/20 md:hidden">
        <ul className="mx-auto max-w-6xl px-5 py-2">
          {LIENS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className="block py-3.5 font-[family-name:var(--titres)] text-2xl font-bold uppercase">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
