import Link from "next/link";
import { DOSSIER, HORAIRES, NAVIGATION, depot } from "./donnees";
import { Picto } from "./EnTete";

/** Le pied du site : le dépôt, ses horaires (samedi soir compris), les liens. */
export default function PiedDuSite() {
  return (
    <div className="border-t border-[var(--trait)] bg-[var(--carte)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-3">
        <div className="space-y-3">
          <p className="flex items-center gap-2.5">
            <Picto taille={34} />
            <span className="font-[family-name:var(--titres)] text-2xl font-extrabold">Ton dépôt</span>
          </p>
          <p className="text-sm text-[var(--doux)]">Matériel et pièces pour la restauration. Vente réservée aux professionnels, prix hors taxes.</p>
          <p className="text-sm">{depot.adresse}</p>
        </div>
        <dl className="space-y-2 text-sm">
          {HORAIRES.map((h) => (
            <div key={h.jours} className="flex justify-between gap-4 border-b border-[var(--trait)] pb-2">
              <dt className="font-bold">{h.jours}</dt>
              <dd className="tabular-nums">{h.heures}</dd>
            </div>
          ))}
        </dl>
        <ul className="space-y-2 text-sm">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline underline-offset-4">{l.libelle}</Link>
            </li>
          ))}
          <li>
            <a href={`tel:${depot.telephoneLien}`} className="underline underline-offset-4 tabular-nums">{depot.telephone}</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
