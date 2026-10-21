import Link from "next/link";
import { Logo } from "./EnTete";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le pied du site Ça Monte, sur le bitume. */
export default function PiedDeSite() {
  return (
    <footer className="border-t border-white/10 bg-[#1E2226] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs leading-relaxed text-[#C3C7CC]">Magasin de vélos, atelier, occasion. On ne vend pas un vélo : on vend le trajet de lundi matin.</p>
        </div>
        <ul className="space-y-2">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="hover:text-[#D7F23C]">{l.libelle}</Link></li>
          ))}
          <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
        </ul>
        <p className="leading-relaxed">
          {entreprise.adresse}
          <br />
          {entreprise.horaires}
          <br />
          <a href={`tel:${entreprise.telephone.replace(/ /g, "")}`} className="font-bold text-[#D7F23C] underline underline-offset-4">{entreprise.telephone}</a>
        </p>
      </div>
    </footer>
  );
}
