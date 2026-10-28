import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import Gravure from "../_composants/Gravure";
import { photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Graver mon outil — Reviens., site de démonstration",
  description:
    "Chez Reviens., dépôt de matériel professionnel imaginaire : choisis l'outil, tape ton prénom, et vois la gravure en direct. Prix HT, gravure comprise.",
  ...adressesDeLaPage("/exemples/reviens/graver"),
};

const ETAPES = [
  ["Tu commandes", "L'outil, sa couleur, ton prénom tel que tu l'as vu à l'écran."],
  ["On grave", "Au laser, sur le côté du corps, en lettres de 12 mm. Le lendemain ouvré."],
  ["Tu le reçois", "Sous trois à cinq jours ouvrés, ou au comptoir si tu passes le chercher."],
];

export default function Graver() {
  return (
    <main>
      <EnTetePage surtitre="L'outil qu'on te rend" n="01" titre="Gravé *à ton prénom.*" photo={photos.etabli}>
        Choisis l&apos;outil, tape ton prénom : tu vois la gravure en direct, là où elle sera. Sur le corps,
        en gros. Impossible à rater.
      </EnTetePage>

      <section className="border-b border-[#D9C08A] bg-[#E9D8B4] text-[#1F2B35] [--accent-texte:#8E3524]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-6 lg:sticky lg:top-28">
            <Apparition><Surtitre n="02">En direct</Surtitre></Apparition>
            <TitreRevele
              texte="Tu choisis. Tu tapes. *Tu vois.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.3rem,4.6vw,4rem)] font-black uppercase leading-[0.92] tracking-[-0.045em]"
              classeAccent="text-[var(--accent-texte)]"
            />
            <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed">
              Celui qui l&apos;emprunte sait à qui la rendre. Et si deux Karim travaillent sur le même
              chantier, ajoute une initiale : « KARIM B. ».
            </Apparition>
          </div>
          <div id="atelier" className="scroll-mt-24">
            <Gravure />
          </div>
        </div>
      </section>

      <section className="px-3 py-20 sm:px-5 md:py-28">
        <div className="rounded-[22px] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-6xl space-y-10 px-7 py-20 sm:px-12">
            <div className="space-y-5">
              <Apparition><Surtitre clair n="03">Après le bouton</Surtitre></Apparition>
              <TitreRevele
                texte="Trois jours, *ton prénom dessus.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.3rem,4.6vw,4rem)] font-black uppercase leading-[0.92] tracking-[-0.045em]"
                classeAccent="text-[#E9D8B4]"
              />
            </div>
            <ol className="grid gap-4 md:grid-cols-3">
              {ETAPES.map(([t, d], i) => (
                <Apparition as="li" key={t} delai={i * 130} de="zoom" className="space-y-3 rounded-[16px] border border-dashed border-[#E9D8B4]/60 p-6">
                  <p className="font-[family-name:var(--titres)] text-5xl font-black tabular-nums text-[#E9D8B4]">{i + 1}</p>
                  <h3 className="font-[family-name:var(--titres)] text-2xl font-black uppercase">{t}</h3>
                  <p>{d}</p>
                </Apparition>
              ))}
            </ol>
            <p className="text-sm">Délais d&apos;exemple : le dépôt est fictif.</p>
          </div>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
