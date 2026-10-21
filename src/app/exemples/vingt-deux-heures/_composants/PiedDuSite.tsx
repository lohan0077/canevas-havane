import Link from "next/link";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION, boutique } from "./donnees";

/** Le pied du site : la boutique, ses horaires, ses pages. */
export default function PiedDuSite() {
  return (
    <footer className="bg-[var(--carte)] border-t-2 border-[var(--encre)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-4">
          <p className="flex items-center gap-2.5">
            <Logo taille={36} />
            <span className="font-[family-name:var(--titres)] text-xl font-black uppercase tracking-[-0.02em]">Vingt-Deux Heures</span>
          </p>
          <p className="font-[family-name:var(--titres)] text-3xl font-black tracking-[-0.03em] leading-tight">Pas des jeux. Le fou rire de 22&nbsp;h.</p>
          <p className="leading-relaxed">
            Boutique de jeux de société · {boutique.adresse} <span className="text-[var(--doux)]">(adresse d&apos;exemple)</span>
          </p>
          <p className="text-sm text-[var(--doux)]">{boutique.telephone} : un numéro réservé à la fiction, qui ne sonne chez personne.</p>
        </div>
        <div className="space-y-2">
          <p className="font-black uppercase tracking-[0.08em] text-sm">Horaires · exemple</p>
          <ul className="space-y-1.5">
            {boutique.horaires.map((h) => (
              <li key={h.jours}>
                <span className="font-semibold">{h.jours}</span> · {h.heures}
              </li>
            ))}
          </ul>
        </div>
        <ul className="space-y-2 font-bold">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
