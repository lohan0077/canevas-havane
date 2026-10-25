import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { CONTACT, DOSSIER, NAVIGATION } from "./donnees";

/** Le pied du site : la pépinière, ses jours, ses pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-10 pt-20 sm:px-10 md:grid-cols-3">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-3xl">Ombre <span className="italic">Lente</span></p>
          <p className="font-[family-name:var(--titres)] text-xl italic text-[#D9A441]">On plante. Le temps fait le reste.</p>
          <p className="leading-relaxed">{CONTACT.adresse}</p>
        </div>
        <div className="space-y-3">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em]">La pépinière</p>
          <p className="leading-relaxed">{CONTACT.horaires}</p>
          <p className="tabular-nums">{CONTACT.telephone}</p>
          <p className="text-[14px] leading-relaxed">Inscrite au registre officiel des opérateurs professionnels · FR 00000 · exemple</p>
        </div>
        <ul className="space-y-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Ombre Lente" chasse={1.95} className="px-4 pb-3 font-[family-name:var(--titres)] italic text-[#D9A441]" />
    </footer>
  );
}
