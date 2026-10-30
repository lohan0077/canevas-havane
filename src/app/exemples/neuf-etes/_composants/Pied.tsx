import Link from "next/link";
import { Marque } from "./Blocs";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le pied du site : la marque, ses heures, ses pages. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-20 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <Marque />
          <p className="max-w-xs leading-relaxed">
            {entreprise.accroche}, depuis {entreprise.depuis}. {entreprise.baseline}
          </p>
          <p className="leading-relaxed">
            {entreprise.adresse.join(", ")}
            <br />
            <a href={`tel:${entreprise.telephoneLien}`} className="font-bold tabular-nums underline-offset-4 hover:underline">
              {entreprise.telephone}
            </a>
          </p>
        </div>
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-lg font-normal">Horaires</p>
          <ul className="space-y-1.5 leading-relaxed">
            {entreprise.horaires.map((h) => (
              <li key={h.jours}>
                <span className="font-bold">{h.jours}</span>&nbsp;: {h.heures}
              </li>
            ))}
          </ul>
          <p className="pt-2 leading-relaxed">
            {entreprise.zone.join(", ")}, dans un rayon de {entreprise.rayon}.
          </p>
        </div>
        <ul className="space-y-2">
          {[
            ...NAVIGATION,
            { href: `${DOSSIER}/ma-date`, libelle: "Ma date" },
            { href: `${DOSSIER}/contact`, libelle: "Contact" },
            { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" },
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
