import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import { Chemin } from "../_composants/Outils";
import { photos } from "../_composants/donnees";

// La vidéo « Créer une marque » : « Et le site te montre le chemin, étape par étape.
// Jusqu'au jour où tu le joues en entier. » Quatre étapes par morceau ; on coche, la
// suivante s'allume. Aucune durée n'est promise.
export const metadata: Metadata = {
  title: "Ton chemin au piano — Clair de Salon, site de démonstration",
  description: "Le chemin d'un morceau de piano, étape par étape, jusqu'au jour où on le joue en entier. Site de démonstration d'une entreprise de cours à domicile imaginaire.",
  ...adressesDeLaPage("/exemples/clair-de-salon/ton-chemin"),
};

export default function TonChemin() {
  return (
    <main>
      <EnTetePage surtitre="Le piano · étape par étape" titre="Ton *chemin.*" photo={photos.pianoQuiDort} origine="40% 55%" filmTitre="chemin">
        Jusqu&apos;au jour où tu le joues en entier. Choisis le morceau, puis coche chaque étape
        quand tu la passes. Le solfège vient en chemin.
      </EnTetePage>
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-8 md:py-28 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <Apparition><Surtitre>Avec Jeanne R.</Surtitre></Apparition>
          <TitreRevele
            texte="Le morceau *d'abord.*"
            className="text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.98] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="ul" delai={150} className="space-y-3 text-lg">
            {["Chez toi, sur ton piano", "Le soir ou le samedi matin", "Sans examen ni audition de juin", "Quatre morceaux du domaine public pour commencer"].map((t) => (
              <li key={t} className="flex gap-3 border-b border-[var(--trait)] pb-3"><span aria-hidden="true" className="text-[var(--accent-texte)]">♪</span>{t}</li>
            ))}
          </Apparition>
        </div>
        <Apparition de="zoom">
          <Chemin />
        </Apparition>
      </section>
      <section className="relative mx-3 h-[60vh] min-h-[360px] overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] sm:mx-5">
        <Image src={photos.clavierSoir.src} alt={photos.clavierSoir.alt} fill sizes="100vw" className="kit-cinema-img object-cover" />
      </section>
      <AppelFinal />
    </main>
  );
}
