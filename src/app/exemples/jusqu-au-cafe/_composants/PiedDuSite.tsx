import Link from "next/link";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION, atelier } from "./donnees";

/** Le pied du site : l'atelier, ses coordonnées d'exemple, ses pages. */
export default function PiedDuSite() {
  return (
    <footer className="border-t border-[var(--trait)] bg-[var(--carte)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          <p className="flex items-center gap-2.5">
            <Logo taille={34} />
            <span className="font-[family-name:var(--titres)] text-2xl">Jusqu&apos;au Café</span>
          </p>
          <p className="font-[family-name:var(--titres)] text-3xl leading-tight">La pièce où finissent <span className="italic text-[var(--accent-texte)]">toutes les soirées.</span></p>
          <p className="leading-relaxed">
            Cuisiniste · {atelier.adresse} · SIRET {atelier.siret} <span className="text-[var(--doux)]">(exemples)</span>
          </p>
          <p className="text-sm text-[var(--doux)]">{atelier.telephone} : un numéro réservé à la fiction, qui ne sonne chez personne.</p>
        </div>
        <ul className="space-y-2.5 font-semibold">
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
