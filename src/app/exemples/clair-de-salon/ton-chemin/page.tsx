import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { photos } from "../_composants/donnees";
import { AppelFinal, Surtitre } from "../_composants/Blocs";
import { Chemin } from "../_composants/Interactifs";

// La vidéo : « Et le site te montre le chemin, étape par étape. Jusqu'au jour où tu le
// joues en entier. » Quatre étapes par morceau ; on coche, la suivante s'allume. Aucune
// durée n'est promise.
export const metadata: Metadata = {
  title: "Ton chemin · Clair de Salon — site de démonstration",
  description: "Le chemin d'un morceau de piano, étape par étape, jusqu'au jour où on le joue en entier. Site de démonstration d'une marque de cours de piano imaginaire.",
  ...adressesDeLaPage("/exemples/clair-de-salon/ton-chemin"),
};

export default function TonChemin() {
  return (
    <main>
      <section className="max-w-4xl mx-auto px-5 pt-10 pb-16 sm:pt-16 space-y-8">
        <div className="space-y-4 text-center">
          <Surtitre>Étape par étape</Surtitre>
          <h1 data-film="chemin" className="text-[52px] sm:text-[84px]">Ton <span className="italic text-[var(--accent-texte)]">chemin.</span></h1>
          <p className="text-lg leading-relaxed max-w-xl mx-auto">
            Jusqu&apos;au jour où tu le joues en entier. Choisis le morceau, puis coche chaque
            étape quand tu la passes.
          </p>
        </div>
        <Chemin />
      </section>
      <section className="relative aspect-[16/9] max-h-[520px] w-full overflow-hidden">
        <Image src={photos.clavierSoir.src} alt={photos.clavierSoir.alt} fill sizes="100vw" className="object-cover" />
      </section>
      <AppelFinal />
    </main>
  );
}
