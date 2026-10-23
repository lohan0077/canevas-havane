import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le pied du site : le magasin, ses heures, ses pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-12 pt-20 sm:px-10 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-2xl font-bold">Tour du Quartier</p>
          <p className="leading-relaxed">
            Magasin de vélos · on commence par là
            <br />
            {entreprise.adresse}
          </p>
          <p className="tabular-nums">{entreprise.telephone}</p>
        </div>
        <dl className="space-y-2">
          {entreprise.horaires.map((h) => (
            <div key={h.jours}>
              <dt className="font-semibold text-[#F2C14E]">{h.jours}</dt>
              <dd className="tabular-nums">{h.heures}{h.note ? ` · ${h.note}` : ""}</dd>
            </div>
          ))}
        </dl>
        <ul className="space-y-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/atelier`, libelle: "L'atelier" }, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Tour du Quartier" chasse={1.38} className="px-4 pb-3 font-[family-name:var(--titres)] font-bold text-[#F2C14E]" />
    </footer>
  );
}
