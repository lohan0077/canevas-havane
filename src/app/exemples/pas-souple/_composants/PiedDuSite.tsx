import Link from "next/link";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION, studio } from "./donnees";

/** Le pied du site : l'adresse, les pages. */
export default function PiedDuSite() {
  return (
    <footer className="mt-10 border-t border-[var(--trait)] bg-[var(--carte)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 grid gap-10 md:grid-cols-2">
        <div className="space-y-3">
          <p className="flex items-center gap-2"><Logo /><span className="font-[family-name:var(--titres)] text-2xl">Pas Souple</span></p>
          <p className="font-[family-name:var(--titres)] text-2xl font-light">Le droit d'être raide comme un piquet.</p>
          <p>Studio de pilates · {studio.adresse}</p>
          <p className="text-sm text-[var(--doux)]">{studio.telephone} : un numéro réservé à la fiction, qui ne sonne chez personne.</p>
        </div>
        <ul className="space-y-2 md:justify-self-end">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
