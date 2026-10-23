import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, NAVIGATION, boutique } from "./donnees";

/** Le pied du site : la boutique, ses heures, ses pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-20 sm:px-10 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-3xl italic">Patience</p>
          <p className="leading-relaxed text-[var(--sur-sombre)]/90">
            Fromagerie et cave d&apos;affinage. La boutique devant, la cave dessous.
            <br />
            {boutique.adresse}, {boutique.ville}
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#E3B85C]">Horaires</p>
          <dl className="space-y-1.5">
            {boutique.horaires.map((h) => (
              <div key={h.jours} className="flex justify-between gap-4 border-b border-white/15 pb-1.5">
                <dt>{h.jours}</dt>
                <dd className="text-right">{h.heures}</dd>
              </div>
            ))}
          </dl>
          <p className="tabular-nums">{boutique.telephone}</p>
        </div>
        <ul className="space-y-2 font-[family-name:var(--titres)] text-xl">
          {[...NAVIGATION, { href: `${DOSSIER}#plateau`, libelle: "Composer un plateau" }, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Patience" chasse={1.7} className="px-4 pb-3 font-[family-name:var(--titres)] italic text-[var(--accent)]" />
    </footer>
  );
}
