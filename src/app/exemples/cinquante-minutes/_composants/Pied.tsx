import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, NAVIGATION, cabinet } from "./donnees";

/** Le pied du site : le cabinet, ses heures, les numéros d'urgence, et le nom en grand. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-12 pt-20 sm:px-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-3xl italic">{cabinet.nom}</p>
          <p className="text-[13px] font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">Psychologue</p>
          <p className="leading-relaxed text-[var(--sur-sombre)]/85">
            {cabinet.psychologue}, psychologue · ADELI {cabinet.adeli} (exemple)
            <br />
            {cabinet.adresse}, {cabinet.ville}
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">Horaires</p>
          <p className="leading-relaxed">{cabinet.horaires}</p>
          <p className="tabular-nums">{cabinet.telephone}</p>
          <p className="leading-relaxed text-[var(--sur-sombre)]/85">
            Urgence : <strong className="text-[var(--sur-sombre)]">15</strong> · Prévention du suicide : <strong className="text-[var(--sur-sombre)]">3114</strong>
          </p>
        </div>
        <ul className="space-y-2.5">
          {[...NAVIGATION, { href: `${DOSSIER}/rendez-vous`, libelle: "Rendez-vous" }, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Cinquante Minutes" chasse={1.95} className="px-4 pb-3 font-[family-name:var(--titres)] italic text-[var(--accent)]" />
    </footer>
  );
}
