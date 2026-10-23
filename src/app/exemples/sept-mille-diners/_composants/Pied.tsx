import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, NAVIGATION, maison } from "./donnees";

/** Le pied du site : l'atelier, ses heures, ses pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-12 pt-20 sm:px-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-3xl italic">{maison.nom}</p>
          <p className="max-w-xs leading-relaxed text-[var(--sur-sombre)]/90">
            Cuisines sur mesure. On vend des dîners ; les meubles sont fournis.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--sur-sombre)]/85">L&apos;atelier</p>
          <p className="leading-relaxed">
            {maison.adresse}, {maison.ville}
            <br />
            {maison.horaires}
          </p>
          <p className="lining-nums tabular-nums">{maison.telephone}</p>
        </div>
        <ul className="space-y-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Sept Mille Dîners" chasse={2.45} className="px-4 pb-3 font-[family-name:var(--titres)] italic text-[var(--accent)]" />
    </footer>
  );
}
