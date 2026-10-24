import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le pied du site : la signature, les pages, les heures, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden border-t border-[var(--trait)] bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-12 pt-20 sm:px-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="font-[family-name:var(--titres)] text-4xl italic leading-tight">{entreprise.signature}</p>
          <p className="max-w-sm text-[15px] leading-relaxed text-[var(--doux)]">
            Nettoyage de bureaux, le soir, {entreprise.zone} (exemple). Prix hors taxes : nos clients sont des entreprises.
          </p>
        </div>
        <ul className="space-y-2.5">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:text-[var(--accent-texte)] hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
        <div className="space-y-2 text-[15px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[var(--accent-texte)]">Nous joindre</p>
          <p className="font-[family-name:var(--titres)] text-2xl tabular-nums">{entreprise.telephone}</p>
          <p className="text-[var(--doux)]">Du lundi au vendredi, 9 h – 18 h</p>
          <p className="text-[var(--doux)]">12 rue de l&apos;Exemple, 00000 Exemple-Ville</p>
        </div>
      </div>
      <MotGeant texte="Après Vous" chasse={2.05} className="px-4 pb-3 font-[family-name:var(--titres)] italic text-[var(--accent)]" />
    </footer>
  );
}
