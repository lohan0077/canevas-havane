import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT_CLAIR, AppelFinal, Bouton, EnTetePage, Surtitre } from "../_composants/Blocs";
import { DOSSIER, PANNEAUX, POSE_SOLAIRE, photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Nos panneaux solaires — L'Heure Dite, site de démonstration",
  description:
    "Des panneaux, et de quoi savoir ce qu'ils font : la pose, la courbe de ton toit, et ce que ça coûte, pose comprise (prix d'exemple, TTC). Aucune économie annoncée. Site de démonstration.",
  ...adressesDeLaPage("/exemples/l-heure-dite/panneaux-solaires"),
};

export default function PanneauxSolaires() {
  return (
    <main>
      <EnTetePage surtitre="Nos panneaux solaires" titre="Des panneaux, *et de quoi savoir ce qu'ils font.*" photo={photos.tuiles} origine="50% 45%">
        Pas d&apos;économies annoncées en très gros : ton toit, heure par heure, et le moment où lancer la machine.
        On mesure ton vrai toit à la visite.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-20 sm:px-8 md:grid-cols-3 md:py-28">
        {POSE_SOLAIRE.map((p, i) => (
          <Apparition key={p.titre} de="zoom" delai={i * 140} className="flex min-h-[260px] flex-col justify-between gap-6 rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)] p-7">
            <span aria-hidden="true" className="font-[family-name:var(--titres)] text-5xl text-[var(--accent-texte)]">0{i + 1}</span>
            <span>
              <span className="block font-[family-name:var(--titres)] text-3xl">{p.titre}</span>
              <span className="mt-2 block text-[17px] leading-relaxed text-[var(--doux)]">{p.texte}</span>
            </span>
          </Apparition>
        ))}
      </section>

      <section className="px-3 sm:px-5">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8 p-8 sm:p-12 md:py-20">
            <Apparition><Surtitre clair>Ce que ça coûte</Surtitre></Apparition>
            <TitreRevele
              texte="Pose comprise, *en trois tailles de toit.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[0.98] tracking-[-0.03em]"
              classeAccent="italic text-[#F2B27A]"
            />
            <ul className="divide-y divide-white/20 border-y border-white/20">
              {PANNEAUX.map((p) => (
                <li key={p.taille} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                  <span>
                    <span className="block font-[family-name:var(--titres)] text-2xl">{p.taille}</span>
                    <span className="block text-[15px] text-[var(--sur-sombre)]/90">{p.detail}</span>
                  </span>
                  <span className="font-[family-name:var(--titres)] text-4xl tabular-nums">{p.prix}</span>
                </li>
              ))}
            </ul>
            <p className="text-[15px] leading-relaxed text-[var(--sur-sombre)]/90">
              TTC, pose comprise, exemples, avant toute aide : on ne t&apos;en promet aucune. Un à deux jours sur le
              toit selon sa taille (exemple) ; le raccordement prend plus de temps : la date est au devis.
            </p>
            <Bouton href={`${DOSSIER}/ma-journee`}>Voir ton toit, heure par heure</Bouton>
          </div>
          <div className="relative min-h-[360px] bg-[var(--sombre)]">
            <Image src={photos.panneaux.src} alt={photos.panneaux.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:grid-cols-2 md:items-center md:py-32">
        <div className="space-y-6">
          <Apparition><Surtitre>Ton premier midi</Surtitre></Apparition>
          <TitreRevele
            texte="On règle avec toi *l'heure de la machine.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[0.98] tracking-[-0.03em]"
            classeAccent={ACCENT_CLAIR}
          />
          <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
            Le lave-linge, le lave-vaisselle, le chauffe-eau : à la mise en service, on programme leur départ sur
            le pic de ton toit. Après la pose, le suivi te montre ta vraie journée sur ton téléphone.
          </Apparition>
        </div>
        <Apparition de="zoom" delai={150} className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[var(--sombre)]">
          <Image src={photos.ciel.src} alt={photos.ciel.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
