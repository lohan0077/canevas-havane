import Link from "next/link";
import { NomMarque } from "./Blocs";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le pied du site : la marque, la région, le téléphone, les pages. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-20 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <NomMarque />
          <p className="max-w-xs leading-relaxed">{entreprise.metier}, {entreprise.region}. {entreprise.signature}</p>
          <p className="leading-relaxed">
            {entreprise.adresse}
            <br />
            <a href={`tel:${entreprise.telephoneLien}`} className="font-medium tabular-nums underline-offset-4 hover:underline">{entreprise.telephone}</a>
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-[12px] font-medium uppercase tracking-[0.2em]">À savoir</p>
          <p className="leading-relaxed">Prix TTC d&apos;exemple. Premier rendez-vous gratuit.</p>
          <p className="leading-relaxed">Aucune photo de mariés sur ce site : leurs images leur appartiennent. Aucune prévision météo non plus : le ciel, on le regarde à J-7, ensemble.</p>
        </div>
        <ul className="space-y-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
