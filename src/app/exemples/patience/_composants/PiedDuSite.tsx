import Link from "next/link";
import { DOSSIER, boutique } from "./donnees";

/** Le pied du site lui-même, avant le pied commun des démonstrations. */
export default function PiedDuSite() {
  return (
    <div className="border-t border-[var(--trait)] bg-[var(--fond)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-[family-name:var(--titres)] text-2xl uppercase tracking-[0.3em]">Patience</p>
          <p className="font-[family-name:var(--titres)] italic text-[var(--doux)]">Affiné sans se presser.</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li><Link href={`${DOSSIER}/cave`} className="underline underline-offset-4">La cave</Link></li>
          <li><Link href={`${DOSSIER}/meules`} className="underline underline-offset-4">Réserver une meule</Link></li>
          <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          <li className="[font-variant-numeric:lining-nums]">{boutique.telephone}</li>
        </ul>
      </div>
    </div>
  );
}
