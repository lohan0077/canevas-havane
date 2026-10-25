import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, NAVIGATION, maison } from "./donnees";

/** Le pied du site : la boutique, ses heures, ses pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-12 pt-20 sm:px-10 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-3xl italic">Relue</p>
          <p className="leading-relaxed">
            Papeterie et jeux de société
            <br />
            {maison.adresse}
          </p>
          <p className="tabular-nums">{maison.telephone}</p>
        </div>
        <dl className="space-y-1.5">
          <dt className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#F2C9A8]">La boutique</dt>
          {maison.horaires.map((h) => (
            <dd key={h.jours} className="flex justify-between gap-4">
              <span>{h.jours}</span>
              <span className="tabular-nums">{h.heures}</span>
            </dd>
          ))}
        </dl>
        <ul className="space-y-2">
          {[
            { href: DOSSIER, libelle: "Accueil" },
            ...NAVIGATION,
            { href: `${DOSSIER}/jeux-pour-deux`, libelle: "Jeux pour deux" },
            { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" },
          ].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Relue" chasse={1.5} className="px-4 pb-4 font-[family-name:var(--titres)] italic text-[var(--accent)]" />
    </footer>
  );
}
