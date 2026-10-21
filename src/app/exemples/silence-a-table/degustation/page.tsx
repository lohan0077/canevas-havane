import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { photos } from "../_composants/donnees";
import { Surtitre } from "../_composants/Blocs";
import Degustation from "../_composants/Degustation";

// « Et pour remplir le carnet : la dégustation se réserve en ligne. Comme une table au
// restaurant. » Un samedi de mars 2027, pour deux ; les allergies se disent avant.
export const metadata: Metadata = {
  title: "Dégustation · Silence à Table — site de démonstration",
  description: "La dégustation se réserve en ligne, comme une table au restaurant : un samedi, pour deux. Site de démonstration : rien n'est envoyé.",
  ...adressesDeLaPage("/exemples/silence-a-table/degustation"),
};

export default function PageDegustation() {
  return (
    <div className="max-w-6xl mx-auto px-5 pt-8 pb-16 sm:pt-14 sm:pb-24 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div className="space-y-5">
        <Surtitre>La dégustation</Surtitre>
        <h1 className="text-[56px] sm:text-[88px] font-normal lowercase">viens goûter ton menu.</h1>
        <p className="text-lg leading-relaxed text-[var(--doux)]">
          Un samedi, pour deux, dans notre cuisine. Tu goûtes l&apos;entrée, le plat et le dessert que tu as choisis ; on note ce
          qui change. Elle est offerte (exemple).
        </p>
        <div className="relative hidden lg:block aspect-[3/2] overflow-hidden rounded-[28px]">
          <Image src={photos.framboises.src} alt={photos.framboises.alt} fill sizes="480px" className="object-cover" />
        </div>
      </div>
      <Degustation />
    </div>
  );
}
