import Link from "next/link";
import { Marque } from "./Blocs";
import { DOSSIER, NAVIGATION, agence } from "./donnees";

/** Le pied du site : l'agence, le samedi, ses pages. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-20 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <Marque />
          <p className="max-w-xs leading-relaxed">
            {agence.metier}. {agence.signature}
          </p>
          <p className="leading-relaxed">{agence.adresse}</p>
        </div>
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-lg font-medium tracking-[-0.03em]">Le samedi</p>
          <p className="leading-relaxed">Trente minutes, le premier samedi matin de chaque mois, à l&apos;agence ou en visio.</p>
          <p className="font-medium tabular-nums">{agence.telephone}</p>
        </div>
        <ul className="space-y-2">
          {[
            ...NAVIGATION,
            { href: `${DOSSIER}/projets/extension-1974`, libelle: "Extension 40 m², maison de 1974" },
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
