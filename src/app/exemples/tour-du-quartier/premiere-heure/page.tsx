import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Pastille } from "../_composants/Blocs";
import { PremiereHeure } from "../_composants/Formulaires";
import { DEROULE, IMAGES } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "La première heure — Tour du Quartier, site de démonstration",
  description: "Réserver sa première heure de vélo dans un magasin imaginaire : sur le parking, vélo et casque prêtés, offerte, sans obligation d'achat.",
  ...adressesDeLaPage("/exemples/tour-du-quartier/premiere-heure"),
};

export default function PagePremiereHeure() {
  return (
    <main>
      <EnTetePage pastille="Offerte · vélo et casque prêtés" titre="Ta première *heure.*" photo={IMAGES.parking}>
        Sur le parking du magasin, sans voiture et sans public. On ne sort dans la rue calme que quand
        tu le décides.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="space-y-8">
          <Apparition><Pastille>Le déroulé</Pastille></Apparition>
          <TitreRevele
            texte="Quatre étapes, *à ton rythme.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.2rem,4.4vw,3.8rem)] font-bold leading-[0.98] tracking-[-0.05em]"
            classeAccent="text-[var(--accent-texte)]"
          />
          <ol className="space-y-3">
            {DEROULE.map((d, i) => (
              <Apparition as="li" key={d.titre} delai={i * 110} de="gauche" className="flex gap-4 rounded-[28px] bg-[var(--carte)] p-5 shadow-[0_20px_40px_-32px_rgba(31,58,44,0.6)]">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#F2C14E] font-[family-name:var(--titres)] font-bold text-[#1F3A2C]">{i + 1}</span>
                <span>
                  <span className="block font-[family-name:var(--titres)] text-lg font-bold">{d.titre}</span>
                  <span className="leading-relaxed text-[var(--doux)]">{d.texte}</span>
                </span>
              </Apparition>
            ))}
          </ol>
          <Apparition className="relative hidden aspect-[3/2] overflow-hidden rounded-[36px] lg:block">
            <Image src={IMAGES.rue.src} alt={IMAGES.rue.alt} fill sizes="45vw" className="object-cover" />
          </Apparition>
        </div>
        <div id="reserver" className="scroll-mt-24 rounded-[40px] bg-[#FCEFD3] p-4 sm:p-8 lg:sticky lg:top-28">
          <PremiereHeure />
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
