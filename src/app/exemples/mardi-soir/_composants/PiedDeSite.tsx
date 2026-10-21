import Link from "next/link";
import { Logo } from "./EnTete";
import { DOSSIER, NAVIGATION, cabinet } from "./donnees";

/** Le pied du site du cabinet, avant le pied commun des démonstrations. */
export default function PiedDeSite() {
  return (
    <div className="bg-[var(--sombre)] text-[var(--sur-sombre)] border-b border-white/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 grid gap-10 md:grid-cols-3">
        <div className="space-y-4">
          <Logo clair />
          <p className="text-[#B8CBC3] leading-relaxed">
            {cabinet.dieteticienne}, diététicienne — {cabinet.diplome}. N° ADELI {cabinet.adeli} (exemple).
          </p>
        </div>
        <div className="space-y-2">
          <p className="font-[family-name:var(--titres)] text-xl">Le cabinet</p>
          <p className="text-[#B8CBC3]">{cabinet.adresse}, {cabinet.ville} (exemple)<br />{cabinet.horaires}</p>
          <p className="font-semibold tabular-nums">{cabinet.telephone}</p>
        </div>
        <ul className="space-y-2 font-medium">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="underline underline-offset-4 decoration-white/30 hover:decoration-white">{l.libelle}</Link></li>
          ))}
          <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4 decoration-white/30 hover:decoration-white">Mentions légales et crédits</Link></li>
        </ul>
      </div>
    </div>
  );
}
