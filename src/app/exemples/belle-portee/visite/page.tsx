import type { Metadata } from "next";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, DateDeVisite, EnTetePage, Surtitre, Verifications } from "../_composants/Blocs";
import { photos } from "../_composants/donnees";

// La vidéo « Créer une marque » : « Et le site ne te dit jamais oui à distance. Il te dit
// quoi vérifier, et te propose une date de visite. » Les trois vérifications, puis les
// créneaux du kit (filmés).
export const metadata: Metadata = {
  title: "La visite — Belle Portée, site de démonstration",
  description: "Avant de dire oui, on vient voir ton mur : ce que la visite vérifie, et les créneaux de la semaine. Démonstration d'un bureau d'études structure imaginaire.",
  ...adressesDeLaPage("/exemples/belle-portee/visite"),
};

export default function LaVisite() {
  return (
    <main>
      <EnTetePage surtitre="Avant de dire oui" titre="On vient *voir ton mur.*" photo={photos.poutre}>
        Jamais de oui à distance. Voilà ce qu&apos;on vérifie sur place, en une heure.
      </EnTetePage>
      <section id="verifications" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-8 md:py-20">
        <Verifications />
      </section>
      <section id="creneaux" className="scroll-mt-20 border-y-2 border-[var(--encre)] bg-[var(--carte)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-8 md:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <Apparition><Surtitre>La date</Surtitre></Apparition>
            <TitreRevele texte="Choisis *ta date.*" className="font-black uppercase text-[clamp(2.4rem,5vw,4.2rem)] leading-[0.92]" classeAccent="text-[var(--accent-texte)]" />
            <p className="leading-relaxed text-[var(--doux)]">La visite : 180 € TTC, exemple. On te dit ce qu&apos;on a vu avant de partir.</p>
          </div>
          <DateDeVisite />
        </div>
      </section>
      <AppelFinal />
    </main>
  );
}
