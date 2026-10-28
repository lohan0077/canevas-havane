import Link from "next/link";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION, ecole } from "./donnees";

/**
 * Le pied du site. Il porte les trois mentions que l'arrêté du 19 juin 1987 (art. 3)
 * exige sur toute publicité d'une auto-école : nom, adresse, numéro d'agrément.
 */
export default function PiedDuSite() {
  return (
    <footer className="border-t border-[var(--trait)] bg-[var(--carte)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="flex items-center gap-2.5">
            <Logo />
            <span className="font-[family-name:var(--titres)] text-xl font-extrabold">Premier Trajet</span>
          </p>
          <p className="leading-relaxed">
            Auto-école · {ecole.adresse}
            <br />
            Agrément préfectoral n° {ecole.agrement} <span className="text-[var(--doux)]">(exemple)</span>
          </p>
          <p className="text-sm text-[var(--doux)]">
            Téléphone : {ecole.telephone} — un numéro réservé à la fiction, qui ne sonne chez personne.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--doux)]">L'école</p>
          <ul className="space-y-2">
            {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
              </li>
            ))}
            <li>
              <Link href={`${DOSSIER}/mentions-legales`} className="underline-offset-4 hover:underline">Mentions légales et crédits</Link>
            </li>
          </ul>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--doux)]">Accueil, au bureau</p>
          <ul className="space-y-2">
            {ecole.horaires.map((h) => (
              <li key={h.jours} className="flex justify-between gap-4 border-b border-[var(--trait)] pb-2">
                <span>{h.jours}</span>
                <span className="font-semibold tabular-nums">{h.heures}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-[var(--doux)]">Horaires d'exemple. Les leçons, elles, se réservent sur le site.</p>
        </div>
      </div>
    </footer>
  );
}
