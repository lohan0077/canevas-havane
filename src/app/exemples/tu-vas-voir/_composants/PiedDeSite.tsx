import Link from "next/link";
import { Logo } from "./EnTete";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le pied du site Tu Vas Voir, avant celui qui dit que la librairie est fictive. */
export default function PiedDeSite() {
  return (
    <footer className="border-t border-[var(--encre)] bg-[var(--carte)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <Logo taille="text-[44px]" />
          <p className="max-w-xs leading-relaxed text-[var(--doux)]">Librairie indépendante. On ne vend pas un catalogue : on vend le livre que t&apos;aurais jamais trouvé tout seul.</p>
        </div>
        <ul className="space-y-2">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
          ))}
          <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
        </ul>
        <p className="leading-relaxed">
          {entreprise.adresse}
          <br />
          {entreprise.horaires}
          <br />
          <a href={`tel:${entreprise.telephone.replace(/ /g, "")}`} className="font-semibold underline underline-offset-4">{entreprise.telephone}</a>
        </p>
      </div>
    </footer>
  );
}
