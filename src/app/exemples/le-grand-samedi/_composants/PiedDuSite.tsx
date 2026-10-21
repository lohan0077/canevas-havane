import Link from "next/link";
import Marque from "./Marque";
import { DOSSIER, entreprise } from "./donnees";

/** Le pied du Grand Samedi. */
export default function PiedDuSite() {
  return (
    <footer className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Marque taille={44} />
            <p className="font-[family-name:var(--titres)] text-4xl">Le Grand <span className="italic text-[#D9B98A]">Samedi</span></p>
          </div>
          <p className="max-w-sm leading-relaxed text-[#CDBDB5]">Wedding planner, {entreprise.region}. Pour que tu sois invité à ton propre mariage.</p>
          <a href={`tel:${entreprise.telephoneLien}`} className="inline-block font-[family-name:var(--titres)] text-3xl italic underline underline-offset-8 decoration-[#C69C5D]">{entreprise.telephone}</a>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-[#CDBDB5]">
          <p>{entreprise.adresse} (adresse d&apos;exemple). Sur rendez-vous.</p>
          <p>Aucune photo de mariés sur ce site : leurs images leur appartiennent. Les coulisses ne se publient qu&apos;avec leur accord écrit, sans jamais nommer un prestataire.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-medium text-[var(--sur-sombre)]">
            <li><Link href={`${DOSSIER}/formules`} className="underline underline-offset-4">Les prix</Link></li>
            <li><Link href={`${DOSSIER}/coulisses`} className="underline underline-offset-4">Les coulisses</Link></li>
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
