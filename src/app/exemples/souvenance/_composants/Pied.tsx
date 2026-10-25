import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { CONTACT, DOSSIER, NAVIGATION } from "./donnees";

/** Le pied du site : la boutique-atelier, la personne responsable, les pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-20 sm:px-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-3xl">Souvenance</p>
          <p className="font-[family-name:var(--titres)] text-xl italic text-[#E8C4BC]">Ça sentait comme ça, chez toi.</p>
          <p className="max-w-xs leading-relaxed text-[var(--sur-sombre)]/90">Savons coulés à froid, par lots de 96. Chaque savon a un numéro.</p>
        </div>
        <div className="space-y-3 leading-relaxed">
          <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#E8C4BC]">La boutique-atelier</p>
          <p>{CONTACT.adresse}</p>
          <p>{CONTACT.horaires}</p>
          <p className="tabular-nums">{CONTACT.telephone}</p>
          <p className="text-[14px] text-[var(--sur-sombre)]/85">
            Personne responsable : Souvenance · exemple. Atelier déclaré auprès de la DGCCRF (code de la santé publique,
            art. L5131-2) · exemple
          </p>
        </div>
        <ul className="space-y-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Souvenance" chasse={1.62} className="px-4 pb-3 font-[family-name:var(--titres)] italic text-[#C9A9A6]" />
    </footer>
  );
}
