import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, NAVIGATION, boutique } from "./donnees";

/** Le pied du site : la pâtisserie, ses heures, ses pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-20 sm:px-10 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-3xl">Gâteaux Perdus</p>
          <p className="font-[family-name:var(--f-caveat)] text-2xl text-[#F3D88A]">Ceux qu&apos;on croyait perdus.</p>
          <p className="leading-relaxed">{boutique.adresse}, {boutique.ville}</p>
        </div>
        <div className="space-y-3">
          <p className="text-[12px] font-bold uppercase tracking-[0.18em]">Horaires</p>
          <p className="leading-relaxed">{boutique.horaires}</p>
          <p className="tabular-nums">{boutique.telephone}</p>
        </div>
        <ul className="space-y-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, { href: `${DOSSIER}#envoyer`, libelle: "Envoyer sa recette" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Gâteaux Perdus" chasse={1.7} className="px-4 pb-3 font-[family-name:var(--titres)] text-[#E9B7C0]" />
    </footer>
  );
}
