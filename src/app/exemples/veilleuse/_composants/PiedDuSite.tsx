import Link from "next/link";
import Marque from "./Marque";
import { DOSSIER, PHRASE_L612_14, entreprise } from "./donnees";

/** Le pied de chaque page : la marque, le contact, et les mentions du CNAPS. */
export default function PiedDuSite() {
  return (
    <footer className="bg-[#1A2B24] text-[var(--sur-sombre)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Marque taille={44} />
            <p className="leading-tight">
              <span className="block font-[family-name:var(--titres)] text-3xl">{entreprise.nom}</span>
              <span className="block text-sm text-[#D3CCBD]">Sécurité privée · {entreprise.signature}</span>
            </p>
          </div>
          <p className="text-sm leading-relaxed text-[#D3CCBD]">
            {entreprise.adresse} (adresse d&apos;exemple)<br />
            <a href={`tel:${entreprise.telephoneLien}`} className="underline underline-offset-4 text-[var(--sur-sombre)]">{entreprise.telephone}</a> · on répond jusqu&apos;à 22 h
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            <li><Link href={`${DOSSIER}/ce-soir`} className="underline underline-offset-4">Qui vient ce soir</Link></li>
            <li><Link href={`${DOSSIER}/nos-nuits`} className="underline underline-offset-4">Nos nuits et nos prix</Link></li>
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          </ul>
        </div>
        <div id="mentions-cnaps" className="rounded-[26px] bg-[#23382F] p-6 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Mentions obligatoires</p>
          <p className="text-sm text-[#D3CCBD]">Autorisation d&apos;exercer délivrée par le CNAPS</p>
          <p className="text-[15px] sm:text-xl font-bold tracking-tight whitespace-nowrap">n°&nbsp;{entreprise.autorisation}</p>
          <p className="-mt-2 text-xs text-[#D3CCBD]">Numéro d&apos;exemple : l&apos;entreprise est fictive.</p>
          <p className="font-[family-name:var(--titres)] text-xl leading-snug">« {PHRASE_L612_14} »</p>
          <p className="text-xs text-[#D3CCBD]">Code de la sécurité intérieure, art.&nbsp;<span className="whitespace-nowrap">L612-14</span> et <span className="whitespace-nowrap">L612-15</span>.</p>
        </div>
      </div>
    </footer>
  );
}
