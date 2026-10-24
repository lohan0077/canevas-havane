import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { Marque } from "./Blocs";
import { DOSSIER, NAVIGATION, cabinet } from "./donnees";

/** Le pied du site : le cabinet, la règle des candidats, ses pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-20 sm:px-10 md:grid-cols-3">
        <div className="space-y-4">
          <Marque />
          <p className="leading-relaxed">
            {cabinet.metier}
            <br />
            {cabinet.adresse}
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-[13px] font-bold uppercase tracking-[0.18em]">{cabinet.baseline}</p>
          <p className="leading-relaxed">Placement gratuit pour les candidats. Honoraires HT, écrits avant de signer.</p>
          <p className="tabular-nums">{cabinet.telephone}</p>
        </div>
        <ul className="space-y-2">
          {[...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Première Bougie" chasse={1.95} className="px-4 pb-3 font-[family-name:var(--titres)] text-[var(--accent)]" />
    </footer>
  );
}
