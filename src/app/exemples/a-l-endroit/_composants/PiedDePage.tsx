import Link from "next/link";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le pied du site : le nom, son reflet, l'adresse, les heures. */
export default function PiedDePage() {
  return (
    <footer className="bg-[var(--carte)] border-t border-[var(--encre)]">
      <div className="mx-auto max-w-6xl px-5 py-14 space-y-10">
        <div aria-hidden="true" className="select-none font-[family-name:var(--titres)] whitespace-nowrap text-[15vw] sm:text-[8rem] leading-[0.85]">
          <span className="block">À l&apos;Endroit</span>
          <span className="block -scale-y-100 text-[#E4E1DB] [mask-image:linear-gradient(to_top,black,transparent_75%)]">À l&apos;Endroit</span>
        </div>
        <div className="grid gap-8 text-sm sm:grid-cols-3">
          <div className="space-y-1">
            <p className="font-bold">{entreprise.nom} · opticien</p>
            <p>{entreprise.adresse}, {entreprise.ville}</p>
            <p><a href={`tel:${entreprise.telephoneLien}`} className="underline underline-offset-4">{entreprise.telephone}</a></p>
          </div>
          <ul className="space-y-1">
            {entreprise.horaires.map((h) => (
              <li key={h.jours}>{h.jours} : {h.heures}</li>
            ))}
          </ul>
          <ul className="space-y-1">
            {NAVIGATION.map((l) => (
              <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
            ))}
            <li><Link href={`${DOSSIER}/mentions-legales`} className="underline-offset-4 hover:underline">Mentions légales et crédits</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
