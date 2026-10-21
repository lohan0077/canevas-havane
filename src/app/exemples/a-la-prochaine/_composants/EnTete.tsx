"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le monogramme et le nom : un « À » dans un cercle d'or. */
export function Monogramme() {
  return (
    <span className="flex items-center gap-3">
      <span aria-hidden="true" className="grid h-10 w-10 place-items-center rounded-full border border-[#C9A86A] font-[family-name:var(--titres)] text-xl text-[#C9A86A]">À</span>
      <span className="font-[family-name:var(--titres)] text-[22px] tracking-tight">À la Prochaine</span>
    </span>
  );
}

/**
 * La barre du site : vert sombre, comme l'écrin. Sous 768 px, les liens passent dans
 * un panneau ouvert par « Menu » ; Échap ou un lien le referme.
 */
export default function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!ouvert) return;
    const touche = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", touche);
    return () => document.removeEventListener("keydown", touche);
  }, [ouvert]);

  const actif = (href: string) => chemin === href || chemin.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <nav aria-label="Principale" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href={DOSSIER} aria-label="À la Prochaine, accueil" onClick={() => setOuvert(false)}>
          <Monogramme />
        </Link>
        <ul className="hidden items-center gap-9 text-[13px] font-semibold uppercase tracking-[0.18em] md:flex">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} aria-current={actif(l.href) ? "page" : undefined} className={`border-b pb-1 ${actif(l.href) ? "border-[#C9A86A] text-[#C9A86A]" : "border-transparent hover:border-current"}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="min-h-11 rounded-full border border-[var(--sur-sombre)] px-5 text-[13px] font-semibold uppercase tracking-[0.18em] md:hidden"
          aria-expanded={ouvert}
          aria-controls="alp-menu"
          onClick={() => setOuvert((o) => !o)}
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="alp-menu" hidden={!ouvert} className="border-t border-white/15 md:hidden">
        <ul className="mx-auto max-w-6xl px-5 pb-6 pt-2">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={() => setOuvert(false)} className={`block py-3 font-[family-name:var(--titres)] text-[34px] ${actif(l.href) ? "text-[#C9A86A]" : ""}`}>
                {l.libelle}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
