"use client";

import Link from "next/link";
import { useState } from "react";
import { DOSSIER, INVITES_MAX, INVITES_MIN, euros, prixParPersonne } from "./donnees";

/**
 * « Combien d'invités ? », dès le premier écran : deux boutons, dix invités de plus ou de
 * moins, et le prix par personne s'affiche, TTC, d'exemple. Le détail (la jauge, le
 * total, les paliers) est plus bas, sur l'accueil. Des boutons plutôt qu'une glissière :
 * sur le carrousel, un doigt qui glisse change de plat. Tout tient dans un seul cartouche,
 * pour laisser la place aux photos sur téléphone.
 */
export default function InvitesExpress({ depart = 120 }: { depart?: number }) {
  const [n, setN] = useState(depart);
  const prix = prixParPersonne(n);
  const changer = (pas: number) => setN((x) => Math.min(INVITES_MAX, Math.max(INVITES_MIN, x + pas)));
  const bouton =
    "grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/20 text-xl leading-none transition-colors hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-transparent";

  return (
    <div className="flex w-full max-w-[25rem] items-center gap-3 rounded-[1.25rem] border border-white/15 bg-[color-mix(in_oklab,var(--sombre)_72%,transparent)] py-2 pl-4 pr-4 backdrop-blur-md">
      <div className="space-y-1.5">
        <Link
          href={`${DOSSIER}#invites`}
          className="group inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--sur-sombre)] underline-offset-4 hover:underline"
        >
          Combien d&apos;invités&nbsp;?
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
        <div className="-ml-1.5 flex items-center gap-1">
          <button type="button" className={bouton} onClick={() => changer(-10)} disabled={n <= INVITES_MIN} aria-label="Dix invités de moins">
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14"><path d="M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
          <p className="w-[4.5rem] text-center leading-none">
            <span className="block font-[family-name:var(--titres)] text-[28px] tabular-nums">{n}</span>
            <span className="mt-0.5 block text-[12px] text-[var(--sur-sombre)]">invités</span>
          </p>
          <button type="button" className={bouton} onClick={() => changer(10)} disabled={n >= INVITES_MAX} aria-label="Dix invités de plus">
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14"><path d="M2 7h10M7 2v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>
      <div aria-live="polite" className="ml-auto flex flex-col justify-center self-stretch border-l border-white/15 pl-4 text-right">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#E7A574]">Par personne</p>
        <p className="mt-1.5 whitespace-nowrap font-[family-name:var(--titres)] text-[28px] leading-none tabular-nums">
          {euros(prix)} <span className="font-[family-name:var(--texte)] text-[12px]">TTC</span>
        </p>
        <p className="mt-1 text-[11px] text-[var(--sur-sombre)]">exemple</p>
      </div>
    </div>
  );
}
