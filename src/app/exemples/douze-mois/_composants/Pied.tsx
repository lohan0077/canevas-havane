import Link from "next/link";
import { Marque } from "./Blocs";
import { DOSSIER, NAVIGATION, boutique } from "./donnees";

/** Le pied du site : la boutique, ses heures, ses pages. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-20 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <Marque />
          <p className="max-w-xs leading-relaxed">Fleurs de saison, rien d&apos;autre. Ce qui fleurit en France ce mois-ci.</p>
          <p className="leading-relaxed">
            {boutique.adresse}, {boutique.ville}
            <br />
            <a href={`tel:${boutique.telephoneLien}`} className="font-medium tabular-nums underline-offset-4 hover:underline">{boutique.telephone}</a>
          </p>
        </div>
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-[22px] leading-tight">Horaires</p>
          <p className="leading-relaxed">{boutique.horaires}</p>
          <p className="leading-relaxed">{boutique.livraisons}</p>
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
