import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import { Proposition } from "../_composants/Interactifs";
import { PHOTOS } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Le prochain savon — Souvenance, site de démonstration",
  description: "Ça sentait quoi, chez ta grand-mère ? L'odeur la plus citée deviendra le prochain savon d'une marque imaginaire.",
  ...adressesDeLaPage("/exemples/souvenance/prochain-savon"),
};

const ETAPES = [
  ["Tu réponds", "En commentaire sous l'affiche, ou ici. Une odeur, pas besoin de plus."],
  ["On compte", "Les réponses telles qu'elles ont été écrites. L'odeur la plus citée l'emporte, et on publie le décompte."],
  ["On formule", "Une recette pour retrouver cette odeur. Puis l'évaluation de sa sécurité et sa déclaration, comme pour tout cosmétique : quelques mois."],
  ["Il sort", "Avec le nom de ce souvenir sur sa bande, et son premier numéro de lot."],
];

export default function ProchainSavon() {
  return (
    <main>
      <EnTetePage surtitre="Le prochain savon" titre={"Chez ta grand-mère, ça sentait *quoi ?*"} photo={PHOTOS.armoire}>
        L&apos;odeur la plus citée deviendra le prochain savon.
      </EnTetePage>

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 md:items-start md:py-28">
        <Apparition de="zoom">
          <Proposition />
        </Apparition>
        <ol className="space-y-8">
          {ETAPES.map(([t, d], i) => (
            <Apparition as="li" key={t} delai={i * 120} className="flex gap-6 border-b border-[var(--trait)] pb-8">
              <span className="font-[family-name:var(--titres)] text-[56px] italic leading-none text-[var(--accent-texte)]">{i + 1}</span>
              <span className="space-y-2">
                <span className="block font-[family-name:var(--titres)] text-[30px] leading-tight">{t}</span>
                <span className="block text-[17px] leading-relaxed text-[var(--doux)]">{d}</span>
              </span>
            </Apparition>
          ))}
        </ol>
      </section>

      <section className="border-t border-[var(--trait)] bg-[var(--carte)]">
        <div className="mx-auto max-w-4xl space-y-5 px-5 py-20 text-center sm:px-8">
          <Apparition><div className="flex justify-center"><Surtitre>Le décompte</Surtitre></div></Apparition>
          <TitreRevele
            texte="Il n'a *pas commencé.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="mx-auto max-w-xl text-[18px] leading-relaxed text-[var(--doux)]">
            Il s&apos;ouvrira avec l&apos;affiche. On n&apos;affichera que les réponses réellement écrites, jamais un
            chiffre arrangé.
          </Apparition>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
