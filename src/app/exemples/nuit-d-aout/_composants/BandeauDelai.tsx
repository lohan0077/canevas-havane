import Link from "next/link";
import { DELAI, DOSSIER } from "./donnees";

/**
 * Tout en haut du site : le vrai délai de pose, mis à jour chaque lundi. Une rareté
 * réelle, jamais gonflée — ici, un exemple, et le bandeau le dit.
 */
export default function BandeauDelai() {
  return (
    <Link href={`${DOSSIER}/ma-date#delai`} data-film="delai" className="block bg-[#F2B6A0] text-[var(--encre)]">
      <span className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-0.5 text-center">
        <span className="flex items-center gap-2 font-semibold">
          <span aria-hidden="true" className="relative flex w-2.5 h-2.5">
            <span className="absolute inset-0 rounded-full bg-[var(--encre)] opacity-40 animate-ping" />
            <span className="relative w-2.5 h-2.5 rounded-full bg-[var(--encre)]" />
          </span>
          Délai de pose cette semaine : <strong className="font-[family-name:var(--titres)] text-lg">{DELAI.valeur}</strong>
        </span>
        <span className="text-sm">Mis à jour chaque lundi · le {DELAI.majLe} · exemple</span>
      </span>
    </Link>
  );
}
