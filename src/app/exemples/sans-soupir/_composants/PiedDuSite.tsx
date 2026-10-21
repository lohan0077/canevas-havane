import Link from "next/link";
import Marque from "./Marque";
import { DOSSIER, entreprise } from "./donnees";

/** Le pied de Sans Soupir : le téléphone en grand, la déclaration services à la personne. */
export default function PiedDuSite() {
  return (
    <footer className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 grid gap-10 md:grid-cols-2">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Marque taille={46} inverse />
            <p className="leading-tight">
              <span className="block font-[family-name:var(--titres)] text-3xl font-bold">{entreprise.nom}</span>
              <span className="block text-[#C8D6DF]">{entreprise.signature}</span>
            </p>
          </div>
          <p className="text-lg">Une question&nbsp;? Appelle. On répète.</p>
          <a href={`tel:${entreprise.telephoneLien}`} className="inline-block rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-7 py-4 text-xl font-bold">{entreprise.telephone}</a>
        </div>
        <div className="space-y-4 leading-relaxed text-[#C8D6DF]">
          <p>
            Organisme déclaré services à la personne, déclaration n°&nbsp;{entreprise.declarationSap} (exemple).
            Les cours, l&apos;installation et la maintenance des logiciels chez toi sont notre activité
            principale ; un éventuel dépannage reste secondaire, et sans crédit d&apos;impôt.
          </p>
          <p>{entreprise.adresse} (adresse d&apos;exemple).</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-semibold text-[var(--sur-sombre)]">
            <li><Link href={`${DOSSIER}/fiches`} className="underline underline-offset-4">Les fiches</Link></li>
            <li><Link href={`${DOSSIER}/cours-a-domicile`} className="underline underline-offset-4">Cours à domicile</Link></li>
            <li><Link href={`${DOSSIER}/gouter-numerique`} className="underline underline-offset-4">Le goûter numérique</Link></li>
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
