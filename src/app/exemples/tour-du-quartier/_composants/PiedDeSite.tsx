import Link from "next/link";
import { Logo } from "./EnTete";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le pied du site Tour du Quartier. */
export default function PiedDeSite() {
  return (
    <footer className="bg-[var(--carte)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <Logo grand />
          <p className="max-w-xs leading-relaxed text-[var(--doux)]">Le magasin de vélos de celles et ceux qui s&apos;y remettent. On commence par là.</p>
        </div>
        <ul className="space-y-2">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="font-semibold hover:underline">{l.libelle}</Link></li>
          ))}
          <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
        </ul>
        <p className="leading-relaxed">
          {entreprise.adresse}
          <br />
          {entreprise.horaires}
          <br />
          <a href={`tel:${entreprise.telephone.replace(/ /g, "")}`} className="font-bold underline underline-offset-4">{entreprise.telephone}</a>
        </p>
      </div>
    </footer>
  );
}
