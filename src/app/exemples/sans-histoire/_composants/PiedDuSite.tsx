import Link from "next/link";
import Marque from "./Marque";
import MentionCnaps from "./MentionCnaps";
import { DOSSIER, entreprise } from "./donnees";

/**
 * Le pied de chaque page de Sans Histoire. Les mentions du Code de la sécurité
 * intérieure n'y sont pas cachées en petits caractères : elles sont en évidence.
 */
export default function PiedDuSite() {
  return (
    <footer className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Marque taille={40} />
            <p className="leading-tight">
              <span className="block font-[family-name:var(--titres)] text-2xl italic">{entreprise.nom}</span>
              <span className="block text-sm text-[#C7C1B4]">Sécurité privée · gardiennage · événements</span>
            </p>
          </div>
          <p className="text-sm leading-relaxed text-[#C7C1B4]">
            {entreprise.adresse} (adresse d&apos;exemple)
            <br />
            <a href={`tel:${entreprise.telephoneLien}`} className="underline underline-offset-4 text-[var(--sur-sombre)]">{entreprise.telephone}</a>, du lundi au vendredi, de 8 h à 19 h.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
            <li><Link href={`${DOSSIER}/devis`} className="underline underline-offset-4">Devis en 3 questions</Link></li>
            <li><Link href={`${DOSSIER}/gardiennage-de-chantier`} className="underline underline-offset-4">Chantiers</Link></li>
            <li><Link href={`${DOSSIER}/agent-de-securite-mariage`} className="underline underline-offset-4">Mariages</Link></li>
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          </ul>
        </div>
        <MentionCnaps />
      </div>
    </footer>
  );
}
