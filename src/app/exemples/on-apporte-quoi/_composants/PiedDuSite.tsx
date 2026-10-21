import Link from "next/link";
import { DOSSIER, boutique } from "./donnees";
import { Monogramme } from "./Dessins";

/** Le pied du site lui-même, avant le pied commun des démonstrations. */
export default function PiedDuSite() {
  return (
    <div className="border-t border-[var(--trait)] bg-[var(--fond)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-3 font-[family-name:var(--titres)] text-xl font-semibold">
          <Monogramme className="h-8 w-8" />
          <span>On Apporte <em className="font-normal">Quoi</em></span>
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
          <li><Link href={`${DOSSIER}/coffrets`} className="underline underline-offset-4">Les coffrets</Link></li>
          <li><Link href={`${DOSSIER}/degustations`} className="underline underline-offset-4">Dégustations</Link></li>
          <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          <li className="[font-variant-numeric:lining-nums]">{boutique.telephone}</li>
        </ul>
      </div>
    </div>
  );
}
