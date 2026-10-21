import Link from "next/link";
import { DOSSIER, MENTIONS_TOURISME, NAVIGATION, entreprise } from "./donnees";
import { Logo } from "./EnTete";

/**
 * Le pied du site, avec les mentions que le Code du tourisme demande sur le site
 * d'une agence (art. R.211-2) : raison sociale et forme, immatriculation, garant et
 * assureur, nom et adresse. Ici, toutes des exemples.
 */
export default function PiedDePage() {
  return (
    <footer className="border-t border-[var(--trait)] bg-[var(--carte)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm leading-relaxed text-[var(--doux)]">
            Agence de voyage. {entreprise.adresse}, {entreprise.ville}.<br />
            <a href={`tel:${entreprise.telephoneLien}`} className="font-semibold text-[var(--encre)] underline underline-offset-4">{entreprise.telephone}</a> · {entreprise.horaires}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            {NAVIGATION.map((l) => (
              <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
            ))}
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline-offset-4 hover:underline">Mentions légales et crédits</Link></li>
          </ul>
        </div>
        <dl className="grid gap-3 rounded-2xl bg-[var(--fond)] p-5 text-sm" aria-label="Mentions du Code du tourisme">
          {MENTIONS_TOURISME.map((m) => (
            <div key={m.libelle}>
              <dt className="font-bold">{m.libelle}</dt>
              <dd className="text-[var(--doux)]">{m.valeur}</dd>
            </div>
          ))}
          <p className="text-xs text-[var(--doux)]">Code du tourisme, art. R.211-2. Numéros, garant et assureur d&apos;exemple : l&apos;agence est fictive.</p>
        </dl>
      </div>
    </footer>
  );
}
