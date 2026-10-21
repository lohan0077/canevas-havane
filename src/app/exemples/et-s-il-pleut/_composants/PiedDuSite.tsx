import Link from "next/link";
import Marque from "./Marque";
import { DOSSIER, entreprise } from "./donnees";

/** Le pied d'« Et s'il pleut ». */
export default function PiedDuSite() {
  return (
    <footer className="bg-[#1E2733] text-[var(--sur-sombre)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Marque taille={46} clair />
            <p className="leading-tight">
              <span className="block font-[family-name:var(--titres)] text-4xl italic">Et s&apos;il pleut</span>
              <span className="block text-sm uppercase tracking-[0.18em] text-[#B9C6D6]">{entreprise.signature}</span>
            </p>
          </div>
          <p className="max-w-sm leading-relaxed text-[#B9C6D6]">{entreprise.metier}, {entreprise.region}. Chaque mariage en deux versions, dans le même devis.</p>
          <a href={`tel:${entreprise.telephoneLien}`} className="inline-block rounded-full bg-[var(--accent)] text-[var(--sur-accent)] px-6 py-3.5 font-semibold">{entreprise.telephone}</a>
        </div>
        <div className="space-y-4 text-sm leading-relaxed text-[#B9C6D6]">
          <p>{entreprise.adresse} (adresse d&apos;exemple). Sur rendez-vous.</p>
          <p>Aucune photo de mariés sur ce site : leurs images leur appartiennent. Aucune prévision météo non plus : le ciel, on le regarde à J-7, ensemble.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[var(--sur-sombre)]">
            <li><Link href={`${DOSSIER}/deux-versions`} className="underline underline-offset-4">Deux versions</Link></li>
            <li><Link href={`${DOSSIER}/parapluies`} className="underline underline-offset-4">Les parapluies</Link></li>
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
