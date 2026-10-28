import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, NAVIGATION, cabinet } from "./donnees";
import { Frise } from "./Ornements";

/** Le pied du site : le cabinet, son inscription à l'Ordre, ses pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <Frise className="text-[#C9A227] opacity-60" />
      <div className="mx-auto grid grid-cols-1 max-w-6xl gap-10 px-6 pb-10 pt-20 sm:px-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-3xl font-semibold">{cabinet.nom}</p>
          <p className="font-[family-name:var(--titres)] text-lg italic">{cabinet.signature}</p>
          <p className="text-[15px] leading-relaxed text-[var(--sur-sombre)]/90">{cabinet.ordre}.</p>
        </div>
        <div className="space-y-3">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#E0C25A]">Le cabinet</p>
          <p className="leading-relaxed">{cabinet.adresse}</p>
          <p className="leading-relaxed">{cabinet.horaires}</p>
          <p className="tabular-nums">{cabinet.telephone}</p>
        </div>
        <ul className="space-y-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/rendez-vous`, libelle: "Rendez-vous" }, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Premier Billet" chasse={1.85} className="px-4 pb-3 font-[family-name:var(--titres)] font-semibold italic text-[#C9A227]" />
    </footer>
  );
}
