import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Surtitre } from "../_composants/Blocs";
import Question from "../_composants/Question";
import { DEROULE_CALME, SOMBRE, cabinet, photos } from "../_composants/donnees";

// La page que la vidéo « Créer une marque » filme. Avant de réserver, une seule question ;
// « un peu » ou « beaucoup » ouvre le créneau calme, avant l'ouverture. La question ouvre
// la page : elle est à l'écran dès l'arrivée, sur un téléphone aussi.
export const metadata: Metadata = {
  title: "Rendez-vous — Voix Basse, site de démonstration",
  description: "Avant de réserver, une seule question : ton animal est stressé ? Un créneau calme, avant l'ouverture. Page de démonstration d'un cabinet vétérinaire imaginaire.",
  ...adressesDeLaPage("/exemples/voix-basse/rendez-vous"),
};

export default function RendezVous() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(45%_55%_at_85%_15%,color-mix(in_oklab,var(--accent)_32%,transparent),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-28 sm:px-8 md:pt-36 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <Question titre="h1" />
          <Apparition de="rideau" delai={200} className="relative hidden aspect-[3/4] overflow-hidden rounded-[2.5rem] lg:block">
            <Image src={photos.soleil.src} alt={photos.soleil.alt} fill priority sizes="(min-width: 1024px) 420px, 100vw" className="object-cover" />
          </Apparition>
        </div>
      </section>

      <section className="px-3 sm:px-5">
        <div style={SOMBRE} className="overflow-hidden rounded-[2.5rem] bg-[var(--fond)] text-[var(--encre)]">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-8">
              <Apparition><Surtitre>Le créneau calme</Surtitre></Apparition>
              <TitreRevele
                texte="Une demi-heure *avant tout le monde.*"
                className="text-[clamp(2.6rem,5.4vw,5rem)] leading-[0.95] tracking-[-0.02em]"
                classeAccent="italic text-[var(--accent-texte)]"
              />
              <ol className="space-y-0 border-l-2 border-[var(--accent)] pl-6">
                {DEROULE_CALME.map((d, i) => (
                  <Apparition as="li" key={d.heure} delai={i * 120} className="relative pb-7 last:pb-0">
                    <span aria-hidden="true" className="absolute -left-[33px] top-1.5 h-4 w-4 rounded-full border-[3px] border-[var(--fond)] bg-[var(--accent)]" />
                    <p className="font-[family-name:var(--titres)] text-3xl tabular-nums">{d.heure}</p>
                    <p className="text-lg leading-relaxed text-[var(--doux)]">{d.texte}</p>
                  </Apparition>
                ))}
              </ol>
            </div>
            <Apparition de="zoom" className="relative aspect-[3/2] overflow-hidden rounded-[2rem]">
              <Image src={photos.caisse.src} alt={photos.caisse.alt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
            </Apparition>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-5 px-5 py-24 sm:px-8 md:py-28">
        <Apparition><Surtitre>Une urgence ?</Surtitre></Apparition>
        <TitreRevele
          texte="N'attends pas *un créneau.*"
          className="text-[clamp(2.4rem,5vw,4.4rem)] leading-[0.95] tracking-[-0.02em]"
          classeAccent="italic text-[var(--accent-texte)]"
        />
        <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
          Appelle le cabinet au <span className="font-semibold text-[var(--encre)] tabular-nums">{cabinet.telephone}</span> aux
          heures d&apos;ouverture. Le soir et le dimanche, le site passe au visage du soir et te
          dit qui appeler : la garde du secteur. Numéros de fiction : ils ne sonnent chez personne.
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
