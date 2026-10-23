import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import ChoixRayon from "../_composants/ChoixRayon";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import { cabinet, photos, seanceRayon } from "../_composants/donnees";

// La page que la vidéo « Créer une marque » filme : on choisit le rayon qu'on fait
// ensemble — le petit-déj, l'apéro, le goûter. En individuel, si on veut.
export const metadata: Metadata = {
  title: "Au rayon — Rayon Frais, site de démonstration",
  description:
    "Choisir le rayon qu'on fait ensemble, chez une diététicienne imaginaire : le petit-déj, l'apéro, le goûter. En individuel, si vous voulez.",
  ...adressesDeLaPage("/exemples/rayon-frais/rayons"),
};

const DEROULE = [
  ["On se retrouve à l'entrée", "Sans blouse ni badge. Pour les autres clients, deux personnes qui font leurs courses."],
  ["Le rayon que vous avez choisi", "On regarde ce que vous prenez d'habitude, ce que vous aimeriez y trouver, ce qui coûte quoi."],
  ["Le caddie, sans morale", "Rien n'est interdit, rien n'est « bon » ou « mauvais ». On comprend vos choix."],
  ["Les questions de santé ? Au cabinet", "Au rayon, on parle de courses. Le reste se dit entre quatre murs."],
];

export default function Rayons() {
  return (
    <main>
      <EnTetePage ton="jaune" surtitre="Au supermarché · en individuel" titre="Quel *rayon ?*" photo={photos.panier}>
        Après la première séance au cabinet, on peut aller au rayon ensemble, si vous voulez.
        Vous choisissez lequel.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-8 md:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-6 px-1 lg:sticky lg:top-28">
          <Apparition><Surtitre>La séance au rayon</Surtitre></Apparition>
          <Apparition as="p" delai={100} className="font-[family-name:var(--titres)] text-[4.5rem] font-bold leading-none [font-variant-numeric:lining-nums]">
            {seanceRayon.prix}
          </Apparition>
          <Apparition as="p" delai={200} className="text-xl leading-relaxed text-[var(--doux)]">
            {seanceRayon.duree}, prix d&apos;exemple. {seanceRayon.lieu}. Avec {cabinet.dieteticienne}, diététicienne diplômée.
          </Apparition>
        </div>
        <Apparition de="zoom">
          <ChoixRayon />
        </Apparition>
      </section>

      <section className="px-3 pb-3 sm:px-5 sm:pb-5">
        <div className="grid overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8 px-6 py-20 sm:px-12 md:py-24">
            <Apparition><Surtitre>Comment ça se passe</Surtitre></Apparition>
            <TitreRevele
              texte="Quarante-cinq minutes, *un caddie.*"
              className="text-[clamp(2.6rem,5vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.03em]"
              classeAccent="text-[#F2C94C]"
            />
            <ol className="space-y-5">
              {DEROULE.map(([titre, texte], i) => (
                <Apparition as="li" key={titre} delai={i * 120} className="grid grid-cols-[3rem_1fr] gap-4 border-t-2 border-dashed border-white/25 pt-5">
                  <span className="font-[family-name:var(--titres)] text-4xl font-bold text-[#F2C94C] [font-variant-numeric:lining-nums]">{i + 1}</span>
                  <span>
                    <span className="block font-[family-name:var(--titres)] text-2xl font-bold">{titre}</span>
                    <span className="mt-1 block text-lg leading-relaxed text-[var(--sur-sombre)]/90">{texte}</span>
                  </span>
                </Apparition>
              ))}
            </ol>
          </div>
          <div className="relative min-h-[320px]">
            <Image src={photos.caisse.src} alt={photos.caisse.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
