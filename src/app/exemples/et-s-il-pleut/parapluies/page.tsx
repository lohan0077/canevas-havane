import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, EnTetePage, Titre } from "../_composants/Blocs";
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
      <EnTetePage titre="Cent parapluies jaunes, à chaque mariage." photo={photos.lac} origine="50% 62%">
        Aux prénoms des mariés. Les invités repartent avec.
      </EnTetePage>

      <section className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
        <Titre texte="Mettez vos prénoms sur l'étiquette." />
        <Apparition><Parapluie /></Apparition>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Titre texte={"Le jour J\u00a0: trois temps, et ils repartent avec."} />
          <ol className="grid gap-10 md:grid-cols-3">
            {ETAPES.map((e, i) => (
              <Apparition as="li" key={e.titre} delai={i * 120} className="space-y-3 border-t border-white/20 pt-5">
                <p aria-hidden="true" className="font-[family-name:var(--titres)] text-4xl italic leading-none text-[var(--accent)]">{i + 1}</p>
                <h3 className="font-[family-name:var(--titres)] text-2xl font-normal">{e.titre}</h3>
                <p className="leading-relaxed">{e.texte}</p>
              </Apparition>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:py-40 md:grid-cols-2 md:items-center">
        <Apparition className="relative aspect-square overflow-hidden rounded-2xl">
          <Image src={photos.parapluies.src} alt={photos.parapluies.alt} fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
        </Apparition>
        <div className="space-y-6">
          <Titre texte="Les invités d'aujourd'hui, les mariés de demain." />
          <p className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">Un parapluie jaune dans une entrée, c&apos;est une question qu&apos;on vous posera longtemps : « Il vient d&apos;où&nbsp;? »</p>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
