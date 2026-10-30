import Link from "next/link";
import { Marque } from "./Blocs";
import { DOSSIER, NAVIGATION, cabinet } from "./donnees";

/** Le pied du site : le cabinet, ses heures, ses pages. */
export default function Pied() {
  return (
    <footer className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-20 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <Marque />
          <p className="max-w-xs leading-relaxed">
            {cabinet.praticienne}, {cabinet.titre}
            <br />
            {cabinet.adresse}, {cabinet.ville}
          </p>
        </div>
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-xl">Horaires</p>
          <p className="leading-relaxed">{cabinet.horaires}</p>
          <p className="font-medium tabular-nums">{cabinet.telephone}</p>
        </div>
        <ul className="space-y-2">
          {[...NAVIGATION, { href: `${DOSSIER}/rendez-vous`, libelle: "Rendez-vous" }, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
