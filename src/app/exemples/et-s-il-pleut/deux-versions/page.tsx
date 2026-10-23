import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import Bascule from "../_composants/Bascule";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import Devis from "../_composants/Devis";
import { MOMENTS, PROTOCOLE, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Deux versions — Et s'il pleut, site de démonstration",
  description: "Un mariage d'exemple en deux versions, soleil ou pluie : la bascule, le protocole météo et le devis où le plan B est chiffré. Démonstration de Canevas Havane.",
  ...adressesDeLaPage("/exemples/et-s-il-pleut/deux-versions"),
};

export default function DeuxVersions() {
  return (
    <main>
      <EnTetePage surtitre="Un mariage d'exemple" titre="Soleil, *ou pluie.*" photo={photos.grange} origine="50% 60%">
        Tu bascules, et tu vois ton mariage dans les deux cas. Les lieux changent ; l&apos;heure, le
        déroulé et les gens restent.
      </EnTetePage>

      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
        <Apparition de="zoom"><Bascule grand /></Apparition>
      </section>

      <section className="px-3 sm:px-5">
        <div className="kit-grain rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-6xl space-y-10 px-6 py-24 sm:px-10">
            <TitreRevele texte="Côte *à côte.*" className="text-[clamp(2.8rem,6vw,5rem)] font-normal leading-[0.96]" classeAccent="italic text-[var(--accent)]" />
            <div className="overflow-hidden rounded-[1.6rem] border border-white/20">
              <div className="grid grid-cols-2 bg-white/10 text-xs uppercase tracking-[0.18em]">
                <p className="px-4 py-3 text-[var(--accent)]">☀ Soleil</p>
                <p className="border-l border-white/20 px-4 py-3">☂ Pluie</p>
              </div>
              {MOMENTS.map((m, i) => (
                <Apparition key={m.moment} delai={i * 90} className="border-t border-white/20">
                  <p className="px-4 pt-3 text-xs uppercase tracking-[0.16em]">{m.moment} · {m.heure}</p>
                  <div className="grid grid-cols-2">
                    <p className="px-4 pb-3 pt-1 font-[family-name:var(--titres)] text-lg leading-snug sm:text-2xl">{m.soleil}</p>
                    <p className="border-l border-white/20 px-4 pb-3 pt-1 font-[family-name:var(--titres)] text-lg italic leading-snug sm:text-2xl">{m.pluie}</p>
                  </div>
                </Apparition>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-6">
          <Apparition><Surtitre>Le devis</Surtitre></Apparition>
          <TitreRevele texte="Prévu, chiffré, *réservé.*" className="text-[clamp(2.8rem,6vw,5rem)] font-normal leading-[0.96]" classeAccent="italic text-[var(--accent-texte)]" />
          <p className="text-lg leading-relaxed text-[var(--doux)]">Le plan B a ses lignes dans le devis, comme le plan A. L&apos;annoncer sans le chiffrer, ce serait le promettre sans le tenir.</p>
          <ol className="space-y-4">
            {PROTOCOLE.map((p, i) => (
              <Apparition as="li" key={p.quand} delai={i * 100} className="grid grid-cols-[96px_1fr] gap-3 border-t border-[var(--trait)] pt-3">
                <span className="font-[family-name:var(--titres)] text-xl italic">{p.quand}</span>
                <span className="leading-relaxed text-[var(--doux)]">{p.texte}</span>
              </Apparition>
            ))}
          </ol>
        </div>
        <Apparition de="droite"><Devis /></Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
