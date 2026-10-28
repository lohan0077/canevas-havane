import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import CarteLueur from "../../_kit/CarteLueur";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT, AppelFinal, EnTetePage, PetitMot, Surtitre } from "../_composants/Blocs";
import Equipe from "../_composants/Equipe";
import { entreprise, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "L'équipe du soir — Après Vous, site de démonstration",
  description: "Ceux qui passent après vous : l'équipe du soir, toujours la même chez vous, et depuis combien d'années. Ni nom ni visage publiés.",
  ...adressesDeLaPage("/exemples/apres-vous/l-equipe-du-soir"),
};

const ENGAGEMENTS = [
  ["La même équipe", "Deux agents chez vous chaque soir. Un remplacement ? On vous prévient la veille."],
  ["Ni nom ni visage", "Ce sont nos salariés, pas notre vitrine : le site, le rapport et le petit mot disent « l'équipe du soir »."],
  ["Les clés à leur place", "Un jeu par équipe, rangé au dépôt dans une armoire fermée, sans votre adresse dessus."],
];

export default function LEquipeDuSoir() {
  return (
    <main>
      <EnTetePage surtitre="Pas de gant jaune" titre="Ceux qui passent *après vous.*" photo={photos.vitre} origine="60% 40%">
        L&apos;équipe du soir, en vrai&nbsp;: toujours la même, et depuis combien d&apos;années. Ce qu&apos;on vous montre, c&apos;est ce
        qu&apos;elle fait et depuis quand — pas qui elle est.
      </EnTetePage>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="space-y-6 lg:sticky lg:top-28">
          <Apparition><Surtitre>Chez vous chaque soir</Surtitre></Apparition>
          <TitreRevele
            texte={`${entreprise.ensemble}\u00a0ans *ensemble.*`}
            className="font-[family-name:var(--titres)] text-[clamp(3.2rem,7vw,6rem)] font-normal leading-[0.95]"
            classeAccent={ACCENT}
          />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            Deux agents, ensemble chez nous depuis {entreprise.ensemble} ans (exemple). Ils connaissent vos bureaux, vos
            habitudes, la porte qui ferme mal. C&apos;est ça, la confiance&nbsp;: toujours les mêmes.
          </Apparition>
          <Apparition de="rideau" className="relative hidden aspect-[4/3] overflow-hidden rounded-t-full lg:block">
            <Image src={photos.nuit.src} alt={photos.nuit.alt} fill sizes="520px" className="object-cover" />
          </Apparition>
        </div>
        <Apparition de="zoom"><Equipe /></Apparition>
      </section>

      <section className="border-y border-[var(--trait)] bg-[var(--sombre)]">
        <ul className="mx-auto grid max-w-6xl gap-4 px-5 py-20 sm:px-8 md:grid-cols-3">
          {ENGAGEMENTS.map(([t, d], i) => (
            <Apparition as="li" key={t} delai={i * 120} de="zoom">
              <CarteLueur className="h-full rounded-[14px]">
                <div className="h-full space-y-3 rounded-[14px] border border-[var(--trait)] bg-[var(--carte)] p-7">
                  <p className="font-[family-name:var(--titres)] text-3xl italic text-[var(--accent-texte)]">0{i + 1}</p>
                  <h2 className="font-[family-name:var(--titres)] text-[34px] font-normal leading-tight">{t}</h2>
                  <p className="leading-relaxed text-[var(--doux)]">{d}</p>
                </div>
              </CarteLueur>
            </Apparition>
          ))}
        </ul>
      </section>

      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 md:grid-cols-2 md:items-center md:py-32">
        <div className="space-y-6">
          <Apparition><Surtitre>Le lendemain matin</Surtitre></Apparition>
          <TitreRevele texte="Ce qu'elle laisse *en partant.*" className="font-[family-name:var(--titres)] text-[clamp(3rem,6vw,5.2rem)] font-normal leading-[0.95]" classeAccent={ACCENT} />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            Des bureaux faits, la lumière éteinte, et un petit mot sur le bureau de l&apos;accueil. Signé de l&apos;équipe du soir.
          </Apparition>
        </div>
        <Apparition de="droite" className="[clip-path:none]"><PetitMot /></Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
