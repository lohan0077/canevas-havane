import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { Embleme } from "./Blocs";
import { DOSSIER, NAVIGATION, STATUT_COMPLET, cabinet } from "./donnees";

/** Le pied de chaque page : le statut écrit juste, l'ORIAS, l'association, le médiateur, et le nom en grand. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[var(--sombre)] text-[var(--sur-sombre)]">
      <div className="mx-auto grid grid-cols-1 max-w-6xl gap-10 px-6 pb-10 pt-20 sm:px-10 lg:grid-cols-[1.4fr_0.6fr_0.6fr]">
        <div data-film="mentions-pied" className="space-y-4 text-[15px] leading-relaxed">
          <span className="flex items-center gap-3">
            <Embleme clair taille={44} />
            <span className="font-[family-name:var(--titres)] text-[30px] leading-none">{cabinet.nom}</span>
          </span>
          <p className="font-[family-name:var(--titres)] text-[24px] italic leading-snug text-[#E3C374]">{cabinet.signature}</p>
          <p className="text-[#E9DDC2]">
            {cabinet.nom}, {cabinet.adresse} · {STATUT_COMPLET}, à vérifier sur le registre de l&apos;ORIAS · Adhérent de
            l&apos;{cabinet.association} · Conseil non indépendant · Médiateur de la consommation : {cabinet.mediateur}.
          </p>
          <p className="text-[14px] text-[#E9DDC2]">
            Aucun placement, aucun rendement, aucune réduction d&apos;impôt n&apos;est promis sur ce site. Placer son épargne
            comporte un risque de perte en capital.
          </p>
        </div>
        <div className="space-y-3 text-[15px]">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#E3C374]">Le cabinet</p>
          <p className="tabular-nums">{cabinet.telephone}</p>
          <p className="leading-relaxed text-[#E9DDC2]">{cabinet.horaires}</p>
        </div>
        <ul className="space-y-2 text-[15px] font-semibold">
          {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}#rendez-vous`, libelle: "Rendez-vous" }, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
            <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
          ))}
        </ul>
      </div>
      <MotGeant texte="Dimanche Midi" chasse={1.95} className="px-4 pb-3 font-[family-name:var(--titres)] text-[#B5523B]" />
    </footer>
  );
}
