import Link from "next/link";
import { Logo } from "./EnTete";
import { DOSSIER, NAVIGATION, cabinet } from "./donnees";

/** Le pied du site du cabinet, avant le pied commun des démonstrations. */
export default function PiedDeSite() {
  return (
    <div className="bg-[var(--sombre)] text-[var(--sur-sombre)] border-b border-white/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 grid gap-10 md:grid-cols-3">
        <div className="space-y-4">
          <Logo />
          <p className="text-[#BBAAB8] leading-relaxed">
            {cabinet.psychologue}, psychologue — {cabinet.diplome}. N° ADELI {cabinet.adeli} (exemple).
          </p>
        </div>
        <div className="space-y-2">
          <p className="font-[family-name:var(--titres)] text-xl">Le cabinet</p>
          <p className="text-[#BBAAB8]">{cabinet.adresse}<br />{cabinet.ville} (exemple)<br />{cabinet.horaires}</p>
          <p className="tabular-nums">{cabinet.telephone}</p>
        </div>
        <ul className="space-y-2">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="underline underline-offset-4 decoration-white/30 hover:decoration-white">{l.libelle}</Link></li>
          ))}
          <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4 decoration-white/30 hover:decoration-white">Mentions légales et crédits</Link></li>
        </ul>
      </div>
      <p className="max-w-6xl mx-auto px-5 sm:px-6 pb-10 text-[15px] leading-relaxed">
        Si c&apos;est urgent : <strong>15</strong>. Prévention du suicide : <strong>3114</strong>,
        numéro national, pour vous ou pour un proche.
      </p>
    </div>
  );
}
