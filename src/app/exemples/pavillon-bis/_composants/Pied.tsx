import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { Bandes, Marque } from "./Blocs";
import { DOSSIER, NAVIGATION, agence } from "./donnees";

/** Le pied du site : l'agence, le samedi, ses pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-20 sm:px-10 md:grid-cols-3">
        <div className="space-y-4">
          <Marque />
          <p className="leading-relaxed">
            {agence.metier}
            <br />
            {agence.adresse}
          </p>
          <Bandes />
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.16em]">Le samedi</p>
          <p className="leading-relaxed">Trente minutes, le premier samedi matin de chaque mois, à l&apos;agence ou en visio.</p>
          <p className="tabular-nums">{agence.telephone}</p>
        </div>
        <ul className="space-y-2">
          {[
            ...NAVIGATION,
            ...[
              { href: `${DOSSIER}/projets/extension-1974`, libelle: "Extension 40 m², maison de 1974" },
              { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" },
            ],
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Pavillon Bis" chasse={1.85} className="px-4 pb-3 font-[family-name:var(--titres)] font-semibold italic text-[var(--accent)]" />
    </footer>
  );
}
