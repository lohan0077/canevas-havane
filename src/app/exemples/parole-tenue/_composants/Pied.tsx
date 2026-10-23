import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { Marque } from "./Blocs";
import { DOSSIER, MENTIONS_TOURISME, NAVIGATION, agence } from "./donnees";

/**
 * Le pied du site : l'agence, les mentions que le Code du tourisme demande sur le site
 * (art. R.211-2, toutes d'exemple), ses pages, et le nom en lettres géantes.
 */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-20 sm:px-10 md:grid-cols-[1fr_1.3fr_0.9fr]">
        <div className="space-y-4">
          <Marque />
          <p className="leading-relaxed">
            {agence.adresse}
            <br />
            {agence.horaires}
          </p>
          <p className="tabular-nums">{agence.telephone}</p>
        </div>
        <dl className="space-y-2.5 text-[14px]">
          {MENTIONS_TOURISME.map((m) => (
            <div key={m.libelle}>
              <dt className="font-semibold">{m.libelle}</dt>
              <dd>{m.valeur}</dd>
            </div>
          ))}
        </dl>
        <ul className="space-y-2">
          {[...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Parole Tenue" chasse={2.05} className="px-4 pb-3 font-[family-name:var(--titres)] italic text-[var(--accent)]" />
    </footer>
  );
}
