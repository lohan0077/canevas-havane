import Link from "next/link";
import { Marque } from "./Blocs";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le pied du site : la marque, sa promesse, ses pages. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 pb-16 pt-20 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <Marque />
          <p className="max-w-xs leading-relaxed">
            Ce dont vous parlerez lundi. Soirées d&apos;entreprise, séminaires, mariages, DJ compris. 12 rue de l&apos;Exemple,
            00000 Exemple-Ville.
          </p>
          <p>
            <a href={`tel:${entreprise.telephoneLien}`} className="font-medium tabular-nums underline-offset-4 hover:underline">{entreprise.telephone}</a>
          </p>
        </div>
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-[20px] font-semibold lowercase leading-tight tracking-[-0.02em]">à savoir</p>
          <p className="max-w-xs leading-relaxed">Entreprises : prix hors taxes. Mariages : prix TTC. Tous sont des exemples.</p>
        </div>
        <ul className="space-y-2">
          {[
            { href: DOSSIER, libelle: "Accueil" },
            ...NAVIGATION,
            { href: `${DOSSIER}/la-phrase-du-lundi`, libelle: "La phrase du lundi" },
            { href: `${DOSSIER}/samedis-libres`, libelle: "Samedis libres" },
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
