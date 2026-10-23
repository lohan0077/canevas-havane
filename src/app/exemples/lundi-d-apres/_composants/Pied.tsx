import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le pied du site : la promesse, les pages, le téléphone, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="mt-3 overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-20 sm:px-10 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-3xl font-extrabold lowercase leading-tight tracking-[-0.03em]">
            ce dont vous parlerez <span className="text-[#FF8A6E]">lundi.</span>
          </p>
          <p className="leading-relaxed text-[var(--sur-sombre)]/90">
            Soirées d&apos;entreprise, séminaires, mariages, DJ compris. 12 rue de l&apos;Exemple, 00000 Exemple-Ville.
          </p>
        </div>
        <ul className="space-y-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/samedis-libres`, libelle: "Samedis libres" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <div className="space-y-2">
          <p className="text-[13px] font-bold lowercase text-[#FFD9A0]">nous appeler</p>
          <p className="font-[family-name:var(--titres)] text-2xl font-bold tabular-nums">{entreprise.telephone}</p>
          <p className="text-[var(--sur-sombre)]/90">Entreprises : prix HT · mariages : prix TTC · exemples</p>
          <Link href={`${DOSSIER}/mentions-legales`} className="inline-block pt-2 underline underline-offset-4">Mentions légales et crédits</Link>
        </div>
      </div>
      <MotGeant texte="lundi d'après" chasse={1.6} className="px-4 pb-3 font-[family-name:var(--titres)] font-extrabold lowercase text-[var(--accent)]" />
    </footer>
  );
}
