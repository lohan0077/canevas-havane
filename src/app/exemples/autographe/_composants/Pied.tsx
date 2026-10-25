import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import Signature from "./Signature";
import { DOSSIER, NAVIGATION, boutique } from "./donnees";

/** Le colophon : la boutique, ses heures, ses pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-20 sm:px-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-3xl font-semibold">Autographe</p>
          <p className="leading-relaxed text-[var(--sur-sombre)]/90">
            Épicerie fine. Chaque pot est signé.
            <br />
            {boutique.adresse}, {boutique.ville}
          </p>
          <Signature variante={2} couleur="#E8B4A8" className="h-12 w-56" />
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--sur-sombre)]/90">Horaires</p>
          <dl className="space-y-1.5">
            {boutique.horaires.map((h) => (
              <div key={h.jours} className="flex justify-between gap-4 border-b border-white/15 pb-1.5">
                <dt>{h.jours}</dt>
                <dd className="tabular-nums">{h.heures}</dd>
              </div>
            ))}
          </dl>
          <p className="tabular-nums">{boutique.telephone}</p>
        </div>
        <ul className="space-y-2 font-[family-name:var(--titres)] text-xl">
          {[...NAVIGATION, { href: `${DOSSIER}#composer`, libelle: "On apporte quoi\u00a0?" }, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Autographe" chasse={1.62} className="px-4 pb-3 font-[family-name:var(--titres)] font-semibold text-[var(--accent)]" />
    </footer>
  );
}
