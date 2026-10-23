import Link from "next/link";
import MotGeant from "../../_kit/MotGeant";
import { Monogramme } from "./Blocs";
import { DOSSIER, NAVIGATION, PHRASE_L313_3, PHRASE_L322_2, entreprise } from "./donnees";

/** Le pied de chaque page : les mentions que la loi impose, en vrai, lisibles ; puis le nom en grand. */
export default function Pied() {
  return (
    <footer className="overflow-hidden bg-[#1B2A41] text-[#FFF8EC]">
      <div className="mx-auto grid grid-cols-1 max-w-6xl gap-12 px-6 pb-10 pt-20 sm:px-10 lg:grid-cols-[1.35fr_0.65fr]">
        <div data-film="mentions-pied" className="space-y-4 text-[15px] leading-relaxed">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#F2C14E]">En vrai, lisibles</p>
          <p className="font-[family-name:var(--titres)] text-[24px] leading-snug">« {PHRASE_L322_2} »</p>
          <p className="text-[#E6EBF2]">{PHRASE_L313_3}</p>
          <p className="text-[#DDE4EE]">
            {entreprise.nom}, {entreprise.adresse} · {entreprise.categorie} · ORIAS n°&nbsp;{entreprise.orias} (exemple) · Nous
            exerçons pour le compte de : {entreprise.banques.join(" ; ")} (exemples) · Médiateur de la consommation : médiateur
            d&apos;exemple, ses coordonnées et l&apos;adresse de son site.
          </p>
        </div>
        <div className="space-y-5">
          <span className="flex items-center gap-3">
            <Monogramme taille={44} />
            <span className="font-[family-name:var(--titres)] text-[26px] font-semibold">{entreprise.nom}</span>
          </span>
          <p className="font-[family-name:var(--titres)] text-[19px] italic text-[#F2C14E]">{entreprise.signature}</p>
          <p className="text-[15px] text-[#DDE4EE]">
            <span className="font-bold tabular-nums text-[#FFF8EC]">{entreprise.telephone}</span>
            <br />
            {entreprise.horaires}
          </p>
          <ul className="space-y-2 text-[15px] font-bold">
            {[{ href: DOSSIER, libelle: "Accueil" }, ...NAVIGATION, { href: `${DOSSIER}#rendez-vous`, libelle: "Rendez-vous" }, { href: `${DOSSIER}/mentions-legales`, libelle: "Mentions légales et crédits" }].map((l) => (
              <li key={l.href}><Link href={l.href} className="underline-offset-4 hover:underline">{l.libelle}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <MotGeant texte="Bonne Nouvelle" chasse={1.9} className="px-4 pb-3 font-[family-name:var(--titres)] font-semibold text-[#F2C14E]" />
    </footer>
  );
}
