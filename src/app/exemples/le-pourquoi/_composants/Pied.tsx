import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, NAVIGATION, cabinet } from "./donnees";

/** Le pied du site : le cabinet, ses heures, ses pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-20 sm:px-10 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-2xl font-semibold">{cabinet.nom}</p>
          <p className="leading-relaxed text-[var(--sur-sombre)]/85">
            {cabinet.praticienne}, {cabinet.titre}
            <br />
            {cabinet.adresse}, {cabinet.ville}
          </p>
        </div>
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-sm uppercase tracking-[0.16em] text-[var(--sur-sombre)]/85">Horaires</p>
          <p className="leading-relaxed">{cabinet.horaires}</p>
          <p className="tabular-nums">{cabinet.telephone}</p>
        </div>
        <ul className="space-y-2 font-[family-name:var(--titres)]">
          {[...NAVIGATION, { href: `${DOSSIER}/rendez-vous`, libelle: "Rendez-vous" }, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Le Pourquoi" chasse={1.9} className="px-4 pb-2 font-[family-name:var(--titres)] font-semibold text-[var(--accent)]" />
    </footer>
  );
}
