"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOSSIER, NAVIGATION } from "./donnees";

/** Le logo : une chaise de profil, pleine (un point dessus), et le nom. */
export function Logo({ clair = false }: { clair?: boolean }) {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <rect x="6" y="3" width="6" height="16" rx="2" fill="#E5674B" />
        <rect x="6" y="15" width="18" height="5" rx="2" fill="#E5674B" />
        <path d="M15 20v6M9 29h12" stroke={clair ? "#F4F1EA" : "#1E2A33"} strokeWidth="3" strokeLinecap="round" />
        <circle cx="19" cy="9" r="4" fill={clair ? "#F4F1EA" : "#1E2A33"} />
      </svg>
      <span className="font-[family-name:var(--titres)] text-xl font-extrabold tracking-tight">Chaise Pleine</span>
    </span>
  );
}

/** En-tête collé en haut, sur fond ardoise ; sous 900 px, les liens passent dans un panneau. */
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
    <header className="sticky top-0 z-40 border-b border-[#46525C] bg-[#2A343D] text-[#F4F1EA]">
      <nav aria-label="Principale" className="mx-auto flex h-[60px] max-w-6xl items-center justify-between gap-3 px-4 sm:px-5">
        <Link href={DOSSIER} aria-label="Chaise Pleine, accueil" onClick={() => setOuvert(false)}>
          <Logo clair />
        </Link>
        <ul className="hidden min-[900px]:flex items-center gap-6 text-sm font-semibold">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} aria-current={chemin === l.href ? "page" : undefined} className={`hover:text-[#F28C6B] ${chemin === l.href ? "text-[#F28C6B]" : ""}`}>{l.libelle}</Link></li>
          ))}
          <li><Link href={`${DOSSIER}#vingt-minutes`} className="inline-flex min-h-10 items-center rounded-lg bg-[#F28C6B] px-4 font-bold text-[#2A343D]">20 minutes</Link></li>
        </ul>
        <button type="button" className="min-[900px]:hidden min-h-10 rounded-lg border border-[#5B6873] px-3 text-sm font-bold" aria-expanded={ouvert} aria-controls="cp-menu" onClick={() => setOuvert((o) => !o)}>
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </nav>
      <div id="cp-menu" hidden={!ouvert} className="min-[900px]:hidden border-t border-[#46525C] bg-[#2A343D]">
        <ul className="mx-auto max-w-6xl px-4 py-3">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} onClick={() => setOuvert(false)} className="block py-3 font-[family-name:var(--titres)] text-2xl font-extrabold">{l.libelle}</Link></li>
          ))}
          <li className="pt-3 pb-2"><Link href={`${DOSSIER}#vingt-minutes`} onClick={() => setOuvert(false)} className="flex min-h-12 items-center justify-center rounded-lg bg-[#F28C6B] font-bold text-[#2A343D]">Réserver 20 minutes</Link></li>
        </ul>
      </div>
    </header>
  );
}
