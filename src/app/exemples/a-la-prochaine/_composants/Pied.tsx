import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le pied du site : l'atelier-boutique, les pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 border-b border-white/15 px-6 pb-12 pt-20 sm:px-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-4xl">À la Prochaine</p>
          <p className="font-[family-name:var(--titres)] text-2xl italic text-[#C9A86A]">À toi. Puis à la prochaine.</p>
          <p className="max-w-xs leading-relaxed text-[var(--sur-sombre)]/90">Des bijoux faits main, une seule fois chacun, gravés d&apos;un numéro qui a sa page.</p>
        </div>
        <div className="space-y-2 leading-relaxed">
          <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#C9A86A]">L&apos;atelier-boutique</p>
          <p>{entreprise.adresse}</p>
          <p>{entreprise.horaires}</p>
          <p className="tabular-nums">{entreprise.telephone}</p>
          <p>Sortie des pièces : le vendredi à 18 h</p>
        </div>
        <ul className="space-y-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="À la Prochaine" chasse={1.62} className="px-4 pb-2 pt-6 font-[family-name:var(--titres)] text-[#C9A86A]" />
    </footer>
  );
}
