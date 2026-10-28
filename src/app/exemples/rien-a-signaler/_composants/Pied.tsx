import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, NAVIGATION, maison } from "./donnees";

/** Le pied du site : l'entreprise, l'attestation, les pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-12 pt-20 sm:px-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-2xl font-semibold tracking-[-0.03em]">{maison.nom}</p>
          <p className="max-w-xs leading-relaxed text-[var(--sur-sombre)]/90">
            Alarmes sans télésurveillance, climatisation pour rafraîchir. Pas de démarchage.
          </p>
          <p className="max-w-xs text-sm leading-relaxed text-[var(--sur-sombre)]/90">
            Attestation de capacité n° {maison.attestation}, valable jusqu&apos;au {maison.validite} (exemple).
          </p>
        </div>
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-sm uppercase tracking-[0.18em] text-[var(--sur-sombre)]/90">Nous joindre</p>
          <p className="leading-relaxed">
            {maison.adresse}, {maison.ville}
            <br />
            {maison.horaires}
          </p>
          <p className="tabular-nums">{maison.telephone}</p>
        </div>
        <ul className="space-y-2 font-[family-name:var(--titres)]">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Rien à Signaler" chasse={2.05} className="px-4 pb-3 font-[family-name:var(--titres)] font-semibold text-[var(--accent)]" />
    </footer>
  );
}
