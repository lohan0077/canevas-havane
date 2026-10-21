import Link from "next/link";
import { DOSSIER, MENTIONS_TOURISME, NAVIGATION, entreprise } from "./donnees";
import { Logo } from "./EnTete";

/** Le pied du site, avec les mentions du Code du tourisme (art. R.211-2), en exemple. */
export default function PiedDePage() {
  return (
    <footer className="border-t-2 border-[var(--encre)] bg-[#F3EAD8]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1fr_1.3fr]">
        <div className="space-y-4">
          <Logo />
          <p className="font-[family-name:var(--titres)] text-2xl italic">Le voyage que tu as promis.</p>
          <p className="text-sm leading-relaxed">
            {entreprise.adresse}, {entreprise.ville} · <a href={`tel:${entreprise.telephoneLien}`} className="font-semibold underline underline-offset-4">{entreprise.telephone}</a><br />{entreprise.horaires}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            {NAVIGATION.map((l) => (<li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>))}
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline-offset-4 hover:underline">Mentions légales et crédits</Link></li>
          </ul>
        </div>
        <dl className="grid gap-3 border-l-2 border-[var(--encre)] pl-5 text-sm">
          {MENTIONS_TOURISME.map((m) => (
            <div key={m.libelle}><dt className="font-semibold">{m.libelle}</dt><dd className="text-[var(--doux)]">{m.valeur}</dd></div>
          ))}
          <p className="text-xs text-[var(--doux)]">Code du tourisme, art. R.211-2. Numéros, garant et assureur d&apos;exemple : l&apos;agence est fictive.</p>
        </dl>
      </div>
    </footer>
  );
}
