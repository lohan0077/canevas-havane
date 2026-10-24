import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, NAVIGATION, cabinet } from "./donnees";

/** Le pied du site : le cabinet, ses soirs, ses pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-12 pt-20 sm:px-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-3xl font-bold">{cabinet.nom}</p>
          <p className="leading-relaxed text-[var(--sur-sombre)]/90">
            {cabinet.dieteticienne}, diététicienne · ADELI {cabinet.adeli} (exemple)
            <br />
            {cabinet.adresse}, {cabinet.ville}
          </p>
        </div>
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-sm font-bold uppercase tracking-[0.16em] text-[#F2C94C]">Horaires</p>
          <p className="leading-relaxed">{cabinet.horaires}</p>
          <p className="tabular-nums">{cabinet.telephone}</p>
        </div>
        <ul className="space-y-2.5 font-[family-name:var(--titres)] text-lg">
          {[...NAVIGATION, { href: `${DOSSIER}/reserver`, libelle: "Réserver un soir" }, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Rayon Frais" chasse={1.62} className="px-4 pb-3 font-[family-name:var(--titres)] font-bold text-[#F2C94C]" />
    </footer>
  );
}
