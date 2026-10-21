import Link from "next/link";
import { Monogramme } from "./EnTete";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le pied du site À la Prochaine, avant celui qui dit que la marque est fictive. */
export default function PiedDeSite() {
  return (
    <footer className="border-t border-[var(--trait)] bg-[var(--carte)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Monogramme />
          <p className="max-w-sm font-[family-name:var(--titres)] text-2xl italic leading-snug">À toi. Puis à la prochaine.</p>
        </div>
        <ul className="space-y-2 text-[15px]">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
          ))}
          <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4">Mentions légales et crédits</Link></li>
        </ul>
        <p className="text-[15px] leading-relaxed">
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
