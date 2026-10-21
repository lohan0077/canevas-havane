import Link from "next/link";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";
import { Logo } from "./EnTete";

/** Le pied du site. */
export default function PiedDePage() {
  return (
    <footer className="border-t border-[var(--trait)] bg-[#FBEFD8]">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="font-[family-name:var(--titres)] text-xl italic">On fête la première année.</p>
        </div>
        <div className="space-y-1 text-sm">
          <p>{entreprise.adresse}, {entreprise.ville}</p>
          <p><a href={`tel:${entreprise.telephoneLien}`} className="font-semibold underline underline-offset-4">{entreprise.telephone}</a></p>
          <p className="pt-2 font-semibold">Placement gratuit pour les candidats</p>
          <p className="text-[var(--doux)]">Code du travail, art. L.5321-3.</p>
        </div>
        <ul className="space-y-1.5 text-sm font-medium">
          {NAVIGATION.map((l) => (<li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>))}
          <li><Link href={`${DOSSIER}/mentions-legales`} className="underline-offset-4 hover:underline">Mentions légales et crédits</Link></li>
        </ul>
      </div>
    </footer>
  );
}
