import type { Metadata } from "next";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { entreprise, photos } from "../_composants/donnees";
import { Intitule, styles as s } from "../_composants/Habillage";
import { HautDePage } from "../_composants/Blocs";

export const metadata: Metadata = {
  title: "Mentions légales — Premier Plongeon (démonstration)",
  description: "Premier Plongeon est une entreprise fictive : qui a réalisé ce site de démonstration, ce qu'il collecte, et d'où viennent ses images.",
  ...adressesDeLaPage("/exemples/premier-plongeon/mentions-legales"),
};

export default function MentionsLegales() {
  const credits = Object.values(photos);
  return (
    <>
      <HautDePage />
      <main className="max-w-3xl mx-auto px-5 sm:px-6 pt-14 sm:pt-20 pb-24 space-y-14">
        <Intitule niveau={1} libelle="Mentions légales" titre={<>Une entreprise <span className="text-[#e8d1cb]">fictive.</span></>}>
          {entreprise.nom} n&apos;existe pas. Son nom, son adresse, son équipe, ses prix, ses
          chantiers et ses avis sont inventés pour les vidéos de Canevas Havane.
        </Intitule>

        <section className="space-y-4 leading-relaxed text-[#b9c0cc]">
          <h2 className={`${s.titre} text-2xl`}>Qui a réalisé ce site</h2>
          <p>
            Ce site de démonstration est édité par Canevas Havane. Ses coordonnées complètes
            figurent dans les{" "}
            <Link href="/mentions-legales" className={s.lien}>mentions légales de Canevas Havane</Link>.
          </p>
          <p>
            Le numéro de téléphone affiché, {entreprise.telephone}, appartient à la tranche que
            l&apos;ARCEP réserve aux œuvres de fiction : il ne sonne chez personne.
          </p>
        </section>

        <section className="space-y-4 leading-relaxed text-[#b9c0cc]">
          <h2 className={`${s.titre} text-2xl`}>Vos données</h2>
          <p>
            Aucune. Les formulaires et le choix de la semaine fonctionnent entièrement dans
            votre navigateur : rien n&apos;est envoyé ni enregistré, et aucun traceur n&apos;est
            posé. Le détail est dans la{" "}
            <Link href="/confidentialite" className={s.lien}>politique de confidentialité de Canevas Havane</Link>.
          </p>
        </section>

        <section className="space-y-6 leading-relaxed text-[#b9c0cc]">
          <h2 className={`${s.titre} text-2xl`}>Crédits</h2>
          <p>
            Le premier écran est construit sur le modèle « Monolith Hero » de MotionSites,
            utilisé sous licence ; ses vidéos et son image sont servies depuis ce domaine.
            Polices : Inter et Chakra Petch, sous licence SIL Open Font.
          </p>
          <p>
            Photos d&apos;illustration publiées sur Unsplash, sous la licence Unsplash, et
            servies depuis ce domaine :
          </p>
          <ul className="border-y border-[rgba(255,255,255,0.13)] divide-y divide-[rgba(255,255,255,0.13)]">
            {credits.map((p) => (
              <li key={p.src} className="py-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <span className="text-[#e6eaf5]">{p.alt}</span>
                <a href={p.page} className={`${s.lien} text-sm`}>{p.auteur}</a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
