"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le monogramme « 1 » coiffé d'une flamme, et le nom. */
export function Logo() {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      <span aria-hidden="true" className="relative grid h-9 w-9 place-items-center rounded-full bg-[var(--sombre)] font-[family-name:var(--titres)] text-lg text-[#F2C14E]">
        1
        <span className="absolute -top-1.5 left-1/2 h-3 w-2 -translate-x-1/2 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-[#F2A33C]" />
      </span>
      <span className="font-[family-name:var(--titres)] text-[1.45rem] leading-none">Première Bougie</span>
    </span>
  );
}

/** En-tête collé en haut ; sous 900 px, les liens passent dans un panneau. */
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
    <header className="sticky top-0 z-40 border-b border-[var(--trait)] bg-[var(--fond)]">
      <nav aria-label="Principale" className="mx-auto flex h-[62px] max-w-6xl items-center justify-between gap-3 px-5">
        <Link href={DOSSIER} aria-label="Première Bougie, accueil" onClick={() => setOuvert(false)}><Logo /></Link>
        <ul className="hidden min-[900px]:flex items-center gap-7 text-[15px] font-medium">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`underline-offset-[6px] hover:underline ${chemin === l.href ? "underline" : ""}`}>{l.libelle}</Link></li>
          ))}
        </ul>
        <button type="button" className="min-[900px]:hidden min-h-10 rounded-full bg-[var(--sombre)] px-4 text-sm font-semibold text-[var(--sur-sombre)]" aria-expanded={ouvert} aria-controls="pb-menu" onClick={() => setOuvert((o) => !o)}>
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="pb-menu" hidden={!ouvert} className="min-[900px]:hidden border-t border-[var(--trait)] bg-[var(--fond)]">
        <ul className="mx-auto max-w-6xl px-5 py-3">
          {NAVIGATION.map((l) => (<li key={l.href}><Link href={l.href} onClick={() => setOuvert(false)} className="block py-3 font-[family-name:var(--titres)] text-3xl">{l.libelle}</Link></li>))}
        </ul>
      </div>
    </header>
  );
}
