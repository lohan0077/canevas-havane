import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, NAVIGATION, boutique } from "./donnees";

/** Le pied du site : la boutique, ses heures, ses pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-20 sm:px-10 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-3xl">Douze <span className="italic">Mois</span></p>
          <p className="leading-relaxed">
            Fleurs de saison, rien d&apos;autre.
            <br />
            {boutique.adresse}, {boutique.ville}
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-[12px] font-bold uppercase tracking-[0.22em]">Horaires</p>
          <p className="leading-relaxed">{boutique.horaires}</p>
          <p className="leading-relaxed">{boutique.livraisons}</p>
          <p className="tabular-nums">{boutique.telephone}</p>
        </div>
        <ul className="space-y-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Douze Mois" chasse={1.85} className="px-4 pb-3 font-[family-name:var(--titres)] italic text-[var(--accent)]" />
    </footer>
  );
}
