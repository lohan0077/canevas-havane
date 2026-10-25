import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, NAVIGATION, cabinet } from "./donnees";

/** Le pied du site : venir, les heures, les pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer id="venir" className="scroll-mt-24 overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-12 pt-20 sm:px-10 md:grid-cols-[1.1fr_1.2fr_0.9fr]">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-3xl">{cabinet.nom}</p>
          <p className="text-[var(--sur-sombre)]/90">{cabinet.accroche}</p>
          <p className="leading-relaxed">
            {cabinet.adresse[0]}
            <br />
            {cabinet.adresse[1]}
          </p>
          <p className="tabular-nums">{cabinet.telephone}</p>
        </div>
        <dl className="space-y-2">
          {cabinet.horaires.map((h) => (
            <div key={h.jours} className="flex flex-wrap justify-between gap-x-4 border-b border-white/15 pb-2">
              <dt className="font-semibold">{h.jours}</dt>
              <dd className="text-[var(--sur-sombre)]/90">{h.heures}</dd>
            </div>
          ))}
        </dl>
        <ul className="space-y-2.5">
          {[...NAVIGATION, { href: `${DOSSIER}/rendez-vous`, libelle: "Rendez-vous" }, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Voix Basse" chasse={1.85} className="px-4 pb-3 font-[family-name:var(--titres)] italic text-[#C9B6E4]" />
    </footer>
  );
}
