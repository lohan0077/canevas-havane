import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import { photos, questions } from "../_composants/donnees";
import { AppelFinal, HautDePage, Section, TetePage } from "../_composants/Blocs";
import Faq from "../_composants/Faq";

export const metadata: Metadata = {
  title: "Questions — Premier Plongeon (démonstration)",
  description: "Permis, délais, sécurité, garanties : les questions posées à un pisciniste imaginaire avant de signer, et ses réponses.",
  ...adressesDeLaPage("/exemples/premier-plongeon/questions"),
};

export default function Questions() {
  return (
    <>
      <HautDePage />
      <main>
        <TetePage libelle="Questions" titre={<>Tout ce qu&apos;on nous demande <span className="text-[#e8d1cb]">avant de signer.</span></>} photo={photos.bouee}>
          Le permis, les délais, la sécurité, les garanties. Si ta question n&apos;y est pas,
          pose-la à la visite technique : c&apos;est fait pour ça.
        </TetePage>
        <Section sombre>
          <Faq questions={questions} />
        </Section>
        <div className="pt-24">
          <AppelFinal />
        </div>
      </main>
    </>
  );
}
