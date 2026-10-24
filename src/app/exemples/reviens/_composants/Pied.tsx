import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, HORAIRES, NAVIGATION, depot } from "./donnees";

/** Le pied du site : le dépôt, ses heures, ses pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-20 sm:px-10 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-2xl font-black uppercase">{depot.nom}</p>
          <p className="leading-relaxed">
            Matériel professionnel · bâtiment et restauration
            <br />
            {depot.adresse}
          </p>
          <p className="text-[15px]">Vente réservée aux professionnels · prix HT</p>
        </div>
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-sm font-bold uppercase tracking-[0.18em] text-[#E9D8B4]">Le comptoir</p>
          <dl className="space-y-1.5">
            {HORAIRES.map((h) => (
              <div key={h.jours} className="flex justify-between gap-4">
                <dt>{h.jours}</dt>
                <dd className="tabular-nums">{h.heures}</dd>
              </div>
            ))}
          </dl>
          <p className="tabular-nums">{depot.telephone}</p>
        </div>
        <ul className="space-y-2 font-[family-name:var(--titres)] font-semibold">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="REVIENS." chasse={1.62} className="px-4 pb-2 font-[family-name:var(--titres)] font-black text-[var(--accent)]" />
    </footer>
  );
}
