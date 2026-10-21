import Link from "next/link";
import { DOSSIER, boutique } from "./donnees";

/** Le colophon du site, avant le pied commun des démonstrations. */
export default function PiedDuSite() {
  return (
    <div className="border-t-2 border-[var(--encre)] bg-[var(--fond)]">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="space-y-1">
          <p className="font-[family-name:var(--titres)] text-3xl font-semibold">Autographe<span className="text-[var(--accent-texte)]">.</span></p>
          <p className="text-[var(--doux)]">Épicerie fine · chaque pot est signé · {boutique.adresse}</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
          <li><Link href={`${DOSSIER}/auteurs`} className="underline underline-offset-4">Les auteurs</Link></li>
          <li><Link href={`${DOSSIER}/dedicaces`} className="underline underline-offset-4">Dédicaces</Link></li>
          <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
        </ul>
      </div>
    </div>
  );
}
