import Link from "next/link";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION, cabinet } from "./donnees";

/** Le pied du site du cabinet, avant le pied commun des démonstrations. */
export default function PiedDeSite() {
  return (
    <div className="bg-[var(--sombre)] text-[var(--sur-sombre)] border-b border-white/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo clair />
          <p className="text-[#B9C2BD] leading-relaxed max-w-sm">
            {cabinet.praticien}, ostéopathe D.O. — {cabinet.diplome}.
            N° ADELI {cabinet.adeli} (exemple).
          </p>
        </div>
        <div className="space-y-2 text-[15px]">
          <p className="font-bold">Le cabinet</p>
          <p className="text-[#B9C2BD]">{cabinet.adresse}<br />{cabinet.ville}</p>
          <p className="text-[#B9C2BD]">{cabinet.horaires}</p>
          <p className="font-bold tabular-nums">{cabinet.telephone}</p>
        </div>
        <ul className="space-y-2 text-[15px] font-semibold">
          {NAVIGATION.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline underline-offset-4 decoration-white/30 hover:decoration-white">{l.libelle}</Link>
            </li>
          ))}
          <li>
            <Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4 decoration-white/30 hover:decoration-white">Mentions légales et crédits</Link>
          </li>
        </ul>
      </div>
      <p className="max-w-6xl mx-auto px-5 sm:px-6 pb-8 text-sm text-[#B9C2BD]">
        En cas d&apos;urgence, appelez le 15. L&apos;ostéopathie ne remplace pas une consultation médicale.
      </p>
    </div>
  );
}
