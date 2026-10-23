import Link from "next/link";
import { DELAI, DOSSIER } from "./donnees";

/**
 * Tout en haut du site, sur chaque page : le vrai délai de pose, mis à jour chaque lundi.
 * Une rareté réelle, jamais gonflée — ici, un exemple, et le bandeau le dit. Le tournage
 * de la vidéo « Remplir l'agenda » filme le haut de l'accueil.
 */
export default function BandeauDelai() {
  return (
    <Link href={`${DOSSIER}/ma-date#delai`} data-film="delai" className="block bg-[#F2B6A0] text-[var(--encre)]">
      <span className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-0.5 px-4 py-2.5 text-center sm:px-6">
        <span className="flex items-center gap-2 font-semibold">
          <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--encre)] opacity-40 motion-reduce:animate-none" />
            <span className="relative h-2.5 w-2.5 rounded-full bg-[var(--encre)]" />
          </span>
          Délai de pose cette semaine : <strong className="font-[family-name:var(--titres)] text-lg">{DELAI.valeur}</strong>
        </span>
        <span className="text-sm">Mis à jour chaque lundi · le {DELAI.majLe} · exemple</span>
      </span>
    </Link>
  );
}
