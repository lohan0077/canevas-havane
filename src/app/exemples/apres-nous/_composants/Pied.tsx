import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { DOSSIER, NAVIGATION, atelier } from "./donnees";

/** Le pied du site : l'atelier, ses deux métiers, ses pages, et le nom en lettres géantes. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 pb-12 pt-20 sm:px-10 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="space-y-3">
          <p className="font-[family-name:var(--titres)] text-3xl">Après Nous</p>
          <p className="font-[family-name:var(--titres)] text-xl italic text-[#E0B36A]">Pour ceux qui viendront après.</p>
          <p className="max-w-xs leading-relaxed text-[var(--sur-sombre)]/90">Ébénisterie et céramique : la table, et ce qu&apos;on pose dessus.</p>
        </div>
        <div className="space-y-2 leading-relaxed">
          <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-[#E0B36A]">L&apos;atelier</p>
          <p>{atelier.adresse}</p>
          <p>{atelier.horaires}</p>
          <p className="tabular-nums">{atelier.telephone}</p>
          <p>SIRET {atelier.siret} · exemple</p>
        </div>
        <ul className="space-y-2">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Après Nous" chasse={1.7} className="px-4 pb-3 font-[family-name:var(--titres)] italic text-[#C8955A]" />
    </footer>
  );
}
