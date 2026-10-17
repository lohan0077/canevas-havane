import Link from "next/link";
import { Logo } from "./EnTete";
import { DOSSIER, cabinet, gestes } from "./donnees";

/** Le pied du site du cabinet, avant le pied commun des démonstrations. */
export default function PiedDeSite() {
  return (
    <div className="bg-[var(--sombre)] text-[var(--sur-sombre)] border-b border-white/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 grid gap-10 md:grid-cols-3">
        <div className="space-y-4">
          <Logo clair />
          <p className="text-[#B9CBBF] leading-relaxed">
            L&apos;ostéopathie, expliquée. {cabinet.praticienne}, ostéopathe D.O. — {cabinet.diplome}.
            N° ADELI {cabinet.adeli} (exemple).
          </p>
        </div>
        <div className="space-y-2">
          <p className="font-[family-name:var(--titres)] font-semibold">Les gestes</p>
          <ul className="space-y-1.5">
            {gestes.map((g) => (
              <li key={g.slug}>
                <Link href={`${DOSSIER}/gestes/${g.slug}`} className="underline underline-offset-4 decoration-white/30 hover:decoration-white">{g.question}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2">
          <p className="font-[family-name:var(--titres)] font-semibold">Le cabinet</p>
          <p className="text-[#B9CBBF]">{cabinet.adresse}, {cabinet.ville} (exemple)<br />{cabinet.horaires}</p>
          <p className="font-semibold tabular-nums">{cabinet.telephone}</p>
          <p>
            <Link href={`${DOSSIER}/mentions-legales`} className="underline underline-offset-4 decoration-white/30 hover:decoration-white">Mentions légales et crédits</Link>
          </p>
        </div>
      </div>
      <p className="max-w-6xl mx-auto px-5 sm:px-6 pb-8 text-sm text-[#B9CBBF]">
        En cas d&apos;urgence, appelez le 15. L&apos;ostéopathie ne remplace pas une consultation médicale.
      </p>
    </div>
  );
}
