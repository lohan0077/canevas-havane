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
          <p className="text-[#AEB6C4] leading-relaxed">
            {cabinet.psychologue}, psychologue — {cabinet.diplome}. N° ADELI {cabinet.adeli} (exemple).
          </p>
        </div>
        <div className="space-y-2">
          <p className="font-semibold">Le cabinet</p>
          <p className="text-[#AEB6C4]">{cabinet.adresse}<br />{cabinet.ville} (exemple)<br />{cabinet.horaires}</p>
          <p className="font-semibold tabular-nums">{cabinet.telephone}</p>
        </div>
        <ul className="space-y-2 font-medium">
          {NAVIGATION.map((l) => (
            <li key={l.href}><Link href={l.href} className="underline underline-offset-4 decoration-white/30 hover:decoration-white">{l.libelle}</Link></li>
          ))}
          <li><Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4 decoration-white/30 hover:decoration-white">Mentions légales et crédits</Link></li>
        </ul>
      </div>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 pb-10">
        <p className="rounded-2xl bg-white/10 px-5 py-4 text-[15px] leading-relaxed">
          Si c&apos;est urgent, n&apos;attendez pas un rendez-vous : appelez le <strong>15</strong>.
          Pour une pensée suicidaire, la vôtre ou celle d&apos;un proche : le <strong>3114</strong>,
          numéro national de prévention du suicide.
        </p>
      </div>
    </div>
  );
}
