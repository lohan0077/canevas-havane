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
            La recette de ta famille, <span className="italic text-[#E9C46A]">servie à 120.</span>
          </p>
          <p className="leading-relaxed text-[var(--sur-sombre)]/90">Maison de traiteur, 12 rue de l&apos;Exemple, 00000 Exemple-Ville. Une recette, ça ne s&apos;achète pas&nbsp;: ça se transmet.</p>
        </div>
        <ul className="space-y-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/carte-de-table`, libelle: "La carte de table" }, { href: `${DOSSIER}/degustation`, libelle: "Réserver une dégustation" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <div className="space-y-2">
          <p className="font-[family-name:var(--f-caveat)] text-[26px] leading-none text-[#E9C46A]">nous appeler</p>
          <p className="font-[family-name:var(--titres)] text-2xl tabular-nums">{entreprise.telephone}</p>
          <p className="text-[var(--sur-sombre)]/90">Prix TTC par personne, d&apos;exemple · allergènes plat par plat · aucune boisson alcoolisée</p>
          <Link href={`${DOSSIER}/mentions-legales`} className="inline-block pt-2 underline underline-offset-4">Mentions légales et crédits</Link>
        </div>
      </div>
      <MotGeant texte="Transmis" chasse={1.75} className="px-4 pb-3 font-[family-name:var(--titres)] italic text-[var(--accent)]" />
    </footer>
  );
}
