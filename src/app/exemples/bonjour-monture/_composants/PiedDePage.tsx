import Link from "next/link";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";
import { Logo } from "./EnTete";

/** Le pied du site : où venir, quand, et les pages. Le pied de démonstration suit. */
export default function PiedDePage() {
  return (
    <footer className="border-t border-[var(--trait)] bg-[var(--carte)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm leading-relaxed text-[var(--doux)]">Opticien. Essayages préparés, sur un plateau à ton prénom.</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Venir</p>
          <p>{entreprise.adresse}<br />{entreprise.ville}</p>
          <p>
            <a href={`tel:${entreprise.telephoneLien}`} className="font-semibold underline underline-offset-4">{entreprise.telephone}</a>
          </p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Horaires</p>
          <ul className="space-y-1">
            {entreprise.horaires.map((h) => (
              <li key={h.jours} className="flex justify-between gap-4"><span>{h.jours}</span><span className="tabular-nums">{h.heures}</span></li>
            ))}
          </ul>
        </div>
        <nav aria-label="Pied de page" className="space-y-2 text-sm">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent-texte)]">Pages</p>
          <ul className="space-y-1.5">
            {NAVIGATION.map((l) => (
              <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
            ))}
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline-offset-4 hover:underline">Mentions légales et crédits</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
