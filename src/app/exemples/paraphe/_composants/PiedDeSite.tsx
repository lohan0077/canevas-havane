import Link from "next/link";
import { Logo } from "./EnTete";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le pied du site Paraphe, en colonnes, comme une page de garde. */
export default function PiedDeSite() {
  return (
    <footer className="border-t border-[var(--trait)] bg-[var(--carte)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo grand />
          <p className="max-w-xs pt-2 leading-relaxed text-[var(--doux)]">Lu, puis signé. Une librairie où chaque livre en rayon porte le paraphe de qui l&apos;a lu.</p>
        </div>
        <div className="space-y-3">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em]">La boutique</p>
          <ul className="space-y-2">
            {NAVIGATION.map((l) => (
              <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
            ))}
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
          </ul>
        </div>
        <div className="space-y-3">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em]">Venir</p>
          <p className="leading-relaxed">
            {entreprise.adresse}
            <br />
            {entreprise.horaires}
            <br />
            <a href={`tel:${entreprise.telephone.replace(/ /g, "")}`} className="font-semibold underline underline-offset-4">{entreprise.telephone}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
