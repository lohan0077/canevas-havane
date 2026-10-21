"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DOSSIER, NAVIGATION, PROCHAIN } from "./donnees";

/** La barre du site, façon carnet d'atelier ; un menu repliable sur téléphone. */
export default function EnTete() {
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--encre)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-[60px] max-w-6xl items-center justify-between gap-3 px-4 sm:px-8">
        <Link href={DOSSIER} onClick={() => setOuvert(false)} className="font-[family-name:var(--titres)] text-[22px] font-bold uppercase tracking-[0.02em]" aria-label="La Coulée, accueil">
          La Coulée
        </Link>
        <ul className="hidden items-center gap-7 font-mono text-[12px] uppercase tracking-[0.12em] lg:flex">
          {NAVIGATION.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-[var(--accent-texte)]">{l.libelle}</Link></li>)}
        </ul>
        <div className="flex items-center gap-3">
          <Link href={`${DOSSIER}/sechoir`} className="hidden font-mono text-[12px] uppercase tracking-[0.12em] min-[400px]:inline">
            Lot {PROCHAIN.numero} · {PROCHAIN.sortieCourte}
          </Link>
          <button
            type="button"
            className="rounded-[6px] border-2 border-[var(--encre)] px-4 py-2 font-mono text-[12px] font-bold uppercase tracking-[0.12em] lg:hidden"
            aria-expanded={ouvert}
            aria-controls="lc-menu"
            onClick={() => setOuvert((o) => !o)}
          >
            {ouvert ? "Fermer" : "Menu"}
          </button>
        </div>
      </nav>
      <div id="lc-menu" hidden={!ouvert} className="border-t border-[var(--trait)] bg-[var(--fond)] lg:hidden">
        <ol className="mx-auto max-w-6xl px-4 py-2">
          {NAVIGATION.map((l, i) => (
            <li key={l.href} className="border-b border-[var(--trait)] last:border-0">
              <Link href={l.href} onClick={() => setOuvert(false)} className="flex items-baseline gap-4 py-4">
                <span className="font-mono text-[12px] text-[var(--doux)]">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-[family-name:var(--titres)] text-[26px] font-bold uppercase">{l.libelle}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </header>
  );
}
