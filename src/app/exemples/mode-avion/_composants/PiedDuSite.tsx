import Link from "next/link";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION, salle } from "./donnees";

/** Le pied du site : l'adresse, l'accueil joignable en urgence, les horaires. */
export default function PiedDuSite() {
  return (
    <footer className="border-t border-[var(--trait)]">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 py-14 grid gap-10 md:grid-cols-3">
        <div className="space-y-3">
          <p className="flex items-center gap-2"><Logo /><span className="font-[family-name:var(--titres)] text-xl font-semibold">Mode Avion</span></p>
          <p>Salle de sport · {salle.adresse}</p>
          <p className="text-sm text-[var(--doux)]">Accueil, joignable en urgence pendant ta séance : {salle.accueil}. Numéro réservé à la fiction, il ne sonne chez personne.</p>
        </div>
        <ul className="space-y-2">
          {salle.horaires.map((h) => (
            <li key={h.jours} className="flex justify-between gap-4 border-b border-[var(--trait)] pb-2"><span>{h.jours}</span><span className="font-semibold">{h.heures}</span></li>
          ))}
          <li className="text-sm text-[var(--doux)]">Horaires d'exemple.</li>
        </ul>
        <ul className="space-y-2 md:justify-self-end">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
