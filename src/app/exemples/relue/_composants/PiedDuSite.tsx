import Link from "next/link";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION, maison } from "./donnees";

/** Le pied du site : la maison, son adresse d'exemple, ses pages. */
export default function PiedDuSite() {
  return (
    <footer className="border-t border-[var(--trait)] bg-[var(--carte)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          <p className="flex items-center gap-2.5">
            <Logo taille={32} />
            <span className="font-[family-name:var(--titres)] text-3xl">Relue</span>
          </p>
          <p className="font-[family-name:var(--titres)] text-3xl leading-tight">Pour les lettres <span className="italic">qu&apos;on garde.</span></p>
          <p className="leading-relaxed">Papeterie · {maison.adresse} <span className="text-[var(--doux)]">(adresse d&apos;exemple)</span></p>
          <p className="text-sm text-[var(--doux)]">{maison.telephone} : un numéro réservé à la fiction, qui ne sonne chez personne.</p>
        </div>
        <ul className="space-y-2.5 text-sm font-medium uppercase tracking-[0.14em]">
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
