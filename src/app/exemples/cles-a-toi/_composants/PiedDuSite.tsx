import Link from "next/link";
import Logo from "./Logo";
import { DOSSIER, NAVIGATION, ecole } from "./donnees";

/** Le pied du site : nom, adresse et agrément, comme sur toute publicité d'auto-école (arrêté du 19 juin 1987, art. 3). */
export default function PiedDuSite() {
  return (
    <footer className="bg-[var(--carte)] border-t border-[var(--trait)]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          <p className="flex items-center gap-2">
            <Logo taille={30} />
            <span className="font-[family-name:var(--titres)] text-xl font-bold">Clés à Toi</span>
          </p>
          <p className="font-[family-name:var(--titres)] text-3xl font-bold leading-tight">Je passe te prendre.</p>
          <p className="leading-relaxed">
            Auto-école · {ecole.adresse} · agrément préfectoral n° {ecole.agrement}{" "}
            <span className="text-[var(--doux)]">(nom, adresse et agrément d'exemple)</span>
          </p>
          <p className="text-sm text-[var(--doux)]">{ecole.telephone} : un numéro réservé à la fiction, qui ne sonne chez personne.</p>
        </div>
        <ul className="space-y-2 font-[family-name:var(--titres)] font-semibold">
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
