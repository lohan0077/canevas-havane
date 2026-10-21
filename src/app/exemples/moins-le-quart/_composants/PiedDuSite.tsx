import Link from "next/link";
import { DOSSIER, maison } from "./donnees";

/** Le pied du site lui-même, avant le pied commun des démonstrations. */
export default function PiedDuSite() {
  return (
    <div className="border-t border-[var(--trait)] bg-[var(--fond)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-[family-name:var(--titres)] text-3xl font-light">Moins le Quart</p>
          <p className="text-[var(--doux)]">Le café d&apos;avant l&apos;heure.</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li><Link href={`${DOSSIER}/cafes`} className="underline underline-offset-4">Les trois cafés</Link></li>
          <li><Link href={`${DOSSIER}/maison`} className="underline underline-offset-4">La maison</Link></li>
          <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          <li className="tabular-nums">{maison.telephone}</li>
        </ul>
      </div>
    </div>
  );
}
