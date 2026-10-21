import Link from "next/link";
import { Logo } from "./EnTete";
import { DOSSIER, NAVIGATION, PROCHAINE, entreprise } from "./donnees";

/** Le pied du site Jamais Deux, avant celui qui dit que la marque est fictive. */
export default function PiedDeSite() {
  return (
    <footer className="border-t border-[var(--trait)] bg-[var(--carte)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="text-[15px] leading-relaxed text-[var(--doux)]">
            Des bijoux en argent, numérotés, faits une fois. Prochaine sortie : {PROCHAINE.date}, {PROCHAINE.heure}.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em]">Le site</p>
          <ul className="space-y-2 text-[15px]">
            {NAVIGATION.map((l) => (
              <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em]">L&apos;atelier</p>
          <p className="text-[15px] leading-relaxed">
            {entreprise.adresse}
            <br />
            {entreprise.horaires}
            <br />
            <a href={`tel:${entreprise.telephone.replace(/ /g, "")}`} className="font-semibold underline underline-offset-4">{entreprise.telephone}</a>
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em]">À savoir</p>
          <ul className="space-y-2 text-[15px]">
            <li>Retour sous 14 jours</li>
            <li>Ajustage d&apos;une taille offert</li>
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
