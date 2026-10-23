import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import Compteur from "../_composants/Compteur";
import Meules from "../_composants/Meules";
import MoisParMois from "../_composants/MoisParMois";
import { MEULES, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Réserver une meule — Patience, site de démonstration",
  description: "Réserver sa meule de grande tomme à la fromagerie Patience (entreprise fictive) : six mois de cave, une photo par mois, prête le 14 avril.",
  ...adressesDeLaPage("/exemples/patience/meules"),
};

const ETAPES = [
  ["Aujourd'hui", "Tu choisis ton numéro. La meule reste en cave, à sa place."],
  ["Chaque mois", "On la retourne, on la brosse, on la photographie. Tu reçois la photo."],
  [`Le ${MEULES.pret}`, "Elle est prête. Tu viens la chercher, tu la paies au retrait."],
  [MEULES.jourJ, "On coupe les meules devant tout le quartier."],
];

// La page de la vidéo « Créer une marque » : « Et tu réserves ta meule aujourd'hui.
// Tu la manges dans six mois. Avec une photo d'elle, chaque mois. »
export default function PageMeules() {
  return (
    <main>
      <EnTetePage surtitre="Réserver une meule" titre="Prête le *14 avril.*" photo={photos.bloc}>
        Trente grandes tommes de 4 kg, entrées en cave le 14 octobre. Tu choisis la tienne
        aujourd&apos;hui, tu la manges dans six mois.
      </EnTetePage>

      <section id="reserver" className="scroll-mt-20 mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <Apparition><Surtitre>Elles comptent déjà</Surtitre></Apparition>
          <div className="rounded-t-[8rem] rounded-b-[1.5rem] border-2 border-[var(--encre)] bg-[var(--carte)] px-7 pb-7 pt-16">
            <Compteur entree={MEULES.entree} dureeJours={MEULES.dureeJours} taille="grand" />
          </div>
          <div className="relative hidden aspect-[3/2] overflow-hidden rounded-[1.5rem] lg:block">
            <Image src={photos.tommes.src} alt={photos.tommes.alt} fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
          </div>
        </div>
        <Apparition de="zoom">
          <Meules />
        </Apparition>
      </section>

      <section className="px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-6xl space-y-12 px-5 py-20 sm:px-10 md:py-28">
            <TitreRevele texte="Six mois, *pas à pas.*" className="text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.03em]" classeAccent="italic text-[#E3B85C]" />
            <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {ETAPES.map(([t, x], i) => (
                <Apparition as="li" key={t} delai={i * 120} className="space-y-3 border-t-2 border-[var(--accent)] pt-5">
                  <p className="font-[family-name:var(--titres)] text-2xl italic text-[#E3B85C]">{t}</p>
                  <p className="text-lg leading-relaxed">{x}</p>
                </Apparition>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-5 py-20 sm:px-8 md:py-28">
        <div className="space-y-5">
          <Apparition><Surtitre>Chaque mois</Surtitre></Apparition>
          <TitreRevele texte="Une photo d'elle, *chaque mois.*" className="text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95] tracking-[-0.03em]" classeAccent="italic text-[var(--accent-texte)]" />
        </div>
        <MoisParMois />
        <p className="text-sm text-[var(--doux)]">Dessins à la place des photos : la meule est fictive.</p>
      </section>

      <AppelFinal />
    </main>
  );
}
