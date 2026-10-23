import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage } from "../_composants/Blocs";
import Parapluie from "../_composants/Parapluie";
import { photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Les parapluies — Et s'il pleut, site de démonstration",
  description: "Cent parapluies jaunes aux prénoms des mariés, à chaque mariage : les invités repartent avec. Démonstration de Canevas Havane, rien n'est commandé.",
  ...adressesDeLaPage("/exemples/et-s-il-pleut/parapluies"),
};

const ETAPES = [
  { titre: "Vos prénoms, votre date", texte: "Sur une étiquette en carton épais, nouée à la poignée. La toile reste unie." },
  { titre: "À l'entrée, dans un seau", texte: "Cent parapluies prêts, s'il pleut pour la cérémonie ou pour les photos." },
  { titre: "Les invités repartent avec", texte: "Et un jour de pluie, l'an prochain, ils pensent à vous — et à nous." },
];

export default function Parapluies() {
  return (
    <main>
      <EnTetePage surtitre="À chaque mariage" titre="Cent parapluies *jaunes.*" photo={photos.lac} origine="50% 62%">
        Aux prénoms des mariés. Les invités repartent avec.
      </EnTetePage>

      <section className="mx-auto max-w-5xl space-y-10 px-5 py-20 sm:px-8">
        <TitreRevele texte="Mettez *vos prénoms dessus.*" className="text-[clamp(2.8rem,6vw,5rem)] font-normal leading-[0.96]" classeAccent="italic text-[var(--accent-texte)]" />
        <Apparition de="zoom"><Parapluie /></Apparition>
      </section>

      <section className="bg-[#FFF4CF]">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-20 sm:px-8 md:grid-cols-3">
          {ETAPES.map((e, i) => (
            <Apparition key={e.titre} delai={i * 120} className="space-y-3 border-t border-[var(--encre)] pt-5">
              <p className="font-[family-name:var(--titres)] text-5xl italic">{i + 1}</p>
              <h2 className="text-2xl font-normal">{e.titre}</h2>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </Apparition>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-2 md:items-center">
        <Apparition de="rideau" className="relative aspect-square overflow-hidden rounded-full">
          <Image src={photos.parapluies.src} alt={photos.parapluies.alt} fill sizes="(min-width: 768px) 520px, 100vw" className="kit-cinema-img object-cover" />
        </Apparition>
        <div className="space-y-5">
          <TitreRevele texte="Les invités d'aujourd'hui, *les mariés de demain.*" className="text-[clamp(2.6rem,5vw,4.4rem)] font-normal leading-[0.98]" classeAccent="italic text-[var(--accent-texte)]" />
          <p className="text-lg leading-relaxed text-[var(--doux)]">Un parapluie jaune dans une entrée, c&apos;est une question qu&apos;on vous posera longtemps : « Il vient d&apos;où&nbsp;? »</p>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
