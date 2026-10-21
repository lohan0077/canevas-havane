import Link from "next/link";
import Marque from "./Marque";
import { DOSSIER, entreprise } from "./donnees";

/** Le pied de Dimanche Libre : contact, zone, déclaration services à la personne. */
export default function PiedDuSite() {
  return (
    <footer className="px-3 pb-3 bg-[var(--fond)]">
      <div className="max-w-6xl mx-auto rounded-[32px] bg-[var(--sombre)] text-[var(--sur-sombre)] px-6 py-12 sm:px-10 grid gap-10 md:grid-cols-[1.1fr_1fr]">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Marque taille={44} />
            <p className="font-[family-name:var(--titres)] text-3xl font-extrabold">{entreprise.nom}</p>
          </div>
          <p className="max-w-sm leading-relaxed text-[#C9C0DD]">Dépannage et cours d&apos;informatique à domicile, du lundi au samedi. {entreprise.zone}.</p>
          <a href={`tel:${entreprise.telephoneLien}`} className="inline-block rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-3.5 font-bold">{entreprise.telephone}</a>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-[#C9C0DD]">
          <p>
            Organisme déclaré services à la personne, déclaration n°&nbsp;{entreprise.declarationSap}{" "}
            (exemple). Les cours, l&apos;installation et la maintenance des logiciels chez toi
            sont notre activité principale ; le dépannage reste une activité secondaire, sans
            crédit d&apos;impôt.
          </p>
          <p>{entreprise.adresse} (adresse d&apos;exemple).</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 font-semibold text-[var(--sur-sombre)]">
            <li><Link href={`${DOSSIER}/c-est-casse`} className="underline underline-offset-4">C&apos;est cassé</Link></li>
            <li><Link href={`${DOSSIER}/j-apprends`} className="underline underline-offset-4">Je veux apprendre</Link></li>
            <li><Link href={`${DOSSIER}/credit-d-impot`} className="underline underline-offset-4">Crédit d&apos;impôt</Link></li>
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
