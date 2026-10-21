import Link from "next/link";
import { DOSSIER, NAVIGATION, atelier, ouvertures } from "./donnees";

/** Le pied du site : l'atelier, ses horaires, son numéro (fictif), et les liens. */
export default function PiedDuSite() {
  return (
    <div className="border-t border-[var(--trait)] bg-[var(--carte)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-4xl leading-none">
            Sortie <span className="italic">de</span> Four
          </p>
          <p className="max-w-sm text-[var(--doux)]">
            Céramiques tournées à la main, une par une. Une fournée par mois, ouverte en direct
            le troisième jeudi, à 19 h.
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-bold uppercase tracking-[0.14em]">L&apos;atelier</p>
          <p>{atelier.adresse}</p>
          <p>{atelier.horaires}</p>
          <p>
            <a href={`tel:${atelier.telephoneLien}`} className="underline underline-offset-4">{atelier.telephone}</a>
          </p>
          <p className="text-[var(--doux)]">Prochain four : {ouvertures.prochaine.date}, {ouvertures.prochaine.heure}</p>
        </div>
        <ul className="space-y-2 text-sm">
          <li className="font-bold uppercase tracking-[0.14em]">Le site</li>
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline underline-offset-4">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
