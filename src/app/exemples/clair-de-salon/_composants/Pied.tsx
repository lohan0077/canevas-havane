import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, NAVIGATION, entreprise } from "./donnees";

/** Le pied du site : les deux professeures, les pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-12 pt-20 sm:px-10 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-3xl">{entreprise.nom}</p>
          <p className="leading-relaxed text-[var(--sur-sombre)]/90">
            Cours particuliers à domicile.
            <br />
            Piano avec {entreprise.pianiste}, maths avec {entreprise.mathematicienne}.
          </p>
          <p className="text-sm text-[var(--sur-sombre)]/85">Déclaration de services à la personne n°&nbsp;{entreprise.sap} (exemple).</p>
        </div>
        <div className="space-y-3">
          <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-[#E7C774]">Le soir et le mercredi</p>
          <p className="leading-relaxed">Du lundi au vendredi, de 14 h à 21 h · le samedi matin</p>
          <p><a href={`tel:${entreprise.telephoneLien}`} className="tabular-nums underline-offset-4 hover:underline">{entreprise.telephone}</a></p>
        </div>
        <ul className="space-y-2">
          {[...NAVIGATION, { href: `${DOSSIER}/reserver`, libelle: "Réserver" }, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Clair de Salon" chasse={1.85} className="px-4 pb-3 font-[family-name:var(--titres)] italic text-[var(--accent)]" />
    </footer>
  );
}
