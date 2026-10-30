import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Accordeon from "../../_kit/Accordeon";
import Apparition from "../../_kit/Apparition";
import Bascule from "../_composants/Bascule";
import { AppelFinal, EnTetePage, Titre } from "../_composants/Blocs";
import Devis from "../_composants/Devis";
import { MOMENTS, PROTOCOLE, QUESTIONS, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Deux versions — Et s'il pleut, site de démonstration",
  description: "Un mariage d'exemple en deux versions, soleil ou pluie : la bascule, le protocole météo et le devis où le plan B est chiffré. Démonstration de Canevas Havane.",
  ...adressesDeLaPage("/exemples/et-s-il-pleut/deux-versions"),
};

const BEAU = QUESTIONS.filter((q) => q.question.startsWith("Et s'il fait beau"));

export default function DeuxVersions() {
  return (
    <main>
      <EnTetePage titre="Soleil, ou pluie." photo={photos.grange} origine="50% 60%">
        Un mariage d&apos;exemple. Tu bascules, et tu vois ton mariage dans les deux cas. Les lieux
        changent ; l&apos;heure, le déroulé et les gens restent.
      </EnTetePage>

      <section className="mx-auto max-w-3xl px-6 py-28 md:py-40">
        <Apparition><Bascule grand /></Apparition>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-6xl space-y-14 px-6 py-28 md:py-40">
          <Titre texte="Le même jour, deux lieux, côte à côte." />
          <div className="overflow-hidden rounded-2xl border border-white/20">
            <div className="grid grid-cols-2 bg-white/10 font-[family-name:var(--titres)] text-xl italic">
              <p className="px-4 py-3">Soleil</p>
              <p className="border-l border-white/20 px-4 py-3">Pluie</p>
            </div>
            {MOMENTS.map((m, i) => (
              <Apparition key={m.moment} delai={i * 80} className="border-t border-white/20">
                <p className="px-4 pt-3 text-[15px] font-semibold">{m.moment}, à {m.heure.replace(/ /g, "\u00a0")}</p>
                <div className="grid grid-cols-2">
                  <p className="px-4 pb-3 pt-1 font-[family-name:var(--titres)] text-lg leading-snug sm:text-2xl">{m.soleil}</p>
                  <p className="border-l border-white/20 px-4 pb-3 pt-1 font-[family-name:var(--titres)] text-lg italic leading-snug sm:text-2xl">{m.pluie}</p>
                </div>
              </Apparition>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-16 px-6 py-28 md:py-40 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-6">
          <Titre texte={"Le devis\u00a0: prévu, chiffré, réservé."} />
          <p className="max-w-[26rem] text-lg leading-relaxed text-[var(--doux)]">Le plan B a ses lignes dans le devis, comme le plan A. L&apos;annoncer sans le chiffrer, ce serait le promettre sans le tenir.</p>
          <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {PROTOCOLE.map((p, i) => (
              <Apparition as="li" key={p.quand} delai={i * 90} className="grid grid-cols-[96px_1fr] gap-3 py-4">
                <span className="font-[family-name:var(--titres)] text-xl italic">{p.quand}</span>
                <span className="leading-relaxed text-[var(--doux)]">{p.texte}</span>
              </Apparition>
            ))}
          </ol>
          <Accordeon questions={BEAU} className="esp-questions" />
        </div>
        <Apparition><Devis /></Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
