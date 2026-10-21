import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Parapluie from "../_composants/Parapluie";
import { photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Les parapluies · Et s'il pleut — site de démonstration",
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
    <div>
      <section className="relative isolate overflow-hidden bg-[#1E2733] text-[var(--sur-sombre)]">
        <Image src={photos.lac.src} alt={photos.lac.alt} fill preload loading="eager" sizes="100vw" className="-z-10 object-cover object-[50%_62%] opacity-50" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,#1E2733cc_0%,#1E273340_40%,#1E2733e6_100%)]" />
        <div className="max-w-6xl mx-auto px-5 sm:px-6 min-h-[520px] flex flex-col justify-end pb-12 space-y-4">
          <p className="font-[family-name:var(--titres)] text-7xl italic text-[var(--accent)]">× 100</p>
          <h1 className="text-[48px] sm:text-8xl font-normal leading-[0.94] tracking-[-0.02em]">Cent parapluies jaunes.</h1>
          <p className="max-w-md text-lg text-[#D4DCE6]">À chaque mariage, aux prénoms des mariés. Les invités repartent avec.</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 space-y-8">
        <h2 className="text-[42px] sm:text-6xl font-normal leading-[0.98]">Mettez <span className="italic">vos prénoms dessus.</span></h2>
        <Parapluie />
      </section>

      <section className="bg-[#FFF4CF]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-20 grid gap-8 md:grid-cols-3">
          {ETAPES.map((e, i) => (
            <div key={e.titre} className="space-y-3 border-t border-[var(--encre)] pt-5">
              <p className="font-[family-name:var(--titres)] text-4xl italic">{i + 1}</p>
              <h3 className="text-2xl font-normal">{e.titre}</h3>
              <p className="leading-relaxed text-[var(--doux)]">{e.texte}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid gap-8 md:grid-cols-2 md:items-center">
        <div className="relative aspect-square overflow-hidden rounded-[32px]">
          <Image src={photos.parapluies.src} alt={photos.parapluies.alt} fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
        </div>
        <div className="space-y-5">
          <h2 className="text-[42px] sm:text-6xl font-normal leading-[0.98]">Les invités d&apos;aujourd&apos;hui, <span className="italic">les mariés de demain.</span></h2>
          <p className="text-lg leading-relaxed text-[var(--doux)]">Un parapluie jaune dans une entrée, c&apos;est une question qu&apos;on vous posera longtemps : « Il vient d&apos;où&nbsp;? »</p>
        </div>
      </section>
    </div>
  );
}
