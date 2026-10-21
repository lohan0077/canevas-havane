import Link from "next/link";
import { DOSSIER, FROMAGES, boutique } from "./donnees";
import Dessin from "./Dessin";

/** Le pied du site lui-même : une frise de fromages dessinés, les liens, le téléphone. */
export default function PiedDuSite() {
  return (
    <div className="border-t border-[var(--encre)] bg-[var(--fond)]">
      <div className="mx-auto max-w-6xl space-y-6 px-5 py-10">
        <div aria-hidden="true" className="grid max-w-xl grid-cols-6 items-end gap-2">
          {FROMAGES.map((f) => <Dessin key={f.numero} forme={f.forme} teinte={f.teinte} className="h-auto w-full" />)}
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-[family-name:var(--titres)] text-3xl">Celui-Là <span className="text-[var(--accent-texte)]">?</span></p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
            <li><Link href={`${DOSSIER}/plateaux`} className="underline underline-offset-4">Les plateaux par occasion</Link></li>
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
            <li className="[font-variant-numeric:lining-nums]">{boutique.telephone}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
