import Link from "next/link";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION, garage } from "./donnees";

/** Le pied du site : l'adresse, les horaires de l'atelier, les pages. */
export default function PiedDuSite() {
  return (
    <footer className="border-t border-[var(--trait)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 grid gap-10 md:grid-cols-3">
        <div className="space-y-3">
          <p className="flex items-center gap-2.5">
            <Logo />
            <span className="font-[family-name:var(--titres)] text-xl font-bold">Mains Libres</span>
          </p>
          <p>Garage · entretien et réparation<br />{garage.adresse}</p>
          <p className="text-sm text-[var(--doux)]">{garage.telephone} : un numéro réservé à la fiction, qui ne sonne chez personne.</p>
        </div>
        <ul className="space-y-2">
          {garage.horaires.map((h) => (
            <li key={h.jours} className="flex justify-between gap-4 border-b border-[var(--trait)] pb-2">
              <span>{h.jours}</span><span className="font-semibold tabular-nums">{h.heures}</span>
            </li>
          ))}
          <li className="text-sm text-[var(--doux)]">Horaires d'exemple. Boîte à clés ouverte jour et nuit.</li>
        </ul>
        <ul className="space-y-2 font-medium">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
