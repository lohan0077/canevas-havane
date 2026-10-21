import Link from "next/link";
import { DOSSIER, brulerie } from "./donnees";

/** Le pied du site lui-même, avant le pied commun des démonstrations. */
export default function PiedDuSite() {
  return (
    <div className="bg-[#F26B3A] text-[var(--encre)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between">
        <p className="font-[family-name:var(--titres)] text-4xl font-black uppercase leading-none">Pas quinze.<br />Deux.</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 font-semibold">
          <li><Link href={`${DOSSIER}/cafes`} className="underline underline-offset-4">Les cafés</Link></li>
          <li><Link href={`${DOSSIER}/abonnement`} className="underline underline-offset-4">L&apos;abonnement</Link></li>
          <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          <li className="tabular-nums">{brulerie.telephone}</li>
        </ul>
      </div>
    </div>
  );
}
