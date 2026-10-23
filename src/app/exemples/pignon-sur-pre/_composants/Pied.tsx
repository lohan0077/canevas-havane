import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le pied du site : la promesse, les pages, le téléphone, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-20 sm:px-10 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-3xl leading-tight">
            Ta salle des fêtes, <span className="italic text-[#F2C98A]">chez toi.</span>
          </p>
          <p className="leading-relaxed text-[var(--sur-sombre)]/90">
            Tentes de réception et engins de jardin, livrés, montés, repris. 12 rue de l&apos;Exemple, 00000 Exemple-Ville.
          </p>
        </div>
        <ul className="space-y-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, { href: `${DOSSIER}#quoi`, libelle: "Tu veux faire quoi ?" }, ...NAVIGATION, { href: `${DOSSIER}/reserver`, libelle: "Réserver ma tente" }, { href: `${DOSSIER}/dt-dict`, libelle: "DT-DICT : on t'aide" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <div className="space-y-2">
          <p className="text-[13px] uppercase tracking-[0.16em] text-[#F2C98A]">Nous joindre</p>
          <p className="font-[family-name:var(--titres)] text-2xl tabular-nums">{entreprise.telephone}</p>
          <p className="text-[var(--sur-sombre)]/90">Joignable tout le week-end de ta fête</p>
          <Link href={`${DOSSIER}/mentions-legales`} className="inline-block pt-2 underline underline-offset-4">Mentions légales et crédits</Link>
          <p className="text-sm text-[var(--sur-sombre)]/90">Prix TTC d&apos;exemple · capacités du fabricant</p>
        </div>
      </div>
      <MotGeant texte="Pignon sur Pré" chasse={1.85} className="px-4 pb-2 font-[family-name:var(--titres)] italic text-[#7FAE5C]" />
    </footer>
  );
}
