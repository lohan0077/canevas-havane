import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { Intitule, Section } from "../_composants/Blocs";
import Question from "../_composants/Question";
import { cabinet, photos } from "../_composants/donnees";

// La page de rendez-vous : celle que la vidéo filme. Avant de réserver, une seule
// question ; « un peu » ou « beaucoup » ouvre le créneau calme, avant l'ouverture.
export const metadata: Metadata = {
  title: "Rendez-vous — Voix Basse, site de démonstration",
  description: "Avant de réserver, une seule question : ton animal est stressé ? Un créneau calme, avant l'ouverture. Page de démonstration d'un cabinet vétérinaire imaginaire.",
  ...adressesDeLaPage("/exemples/voix-basse/rendez-vous"),
};

const DEROULE = [
  { heure: "7 h 55", texte: "Tu te gares devant la porte, sur la place réservée. Personne dans la cour." },
  { heure: "8 h 00", texte: "La salle d'attente est à toi. La caisse se pose en hauteur, porte ouverte." },
  { heure: "8 h 05", texte: "On vient vous chercher à voix basse. Il sort de sa caisse quand il veut." },
  { heure: "8 h 30", texte: "Le cabinet ouvre. Vous, vous êtes déjà repartis." },
];

export default function RendezVous() {
  return (
    <main>
      <Section className="pt-10 sm:pt-16">
        <Question titre="h1" />
      </Section>

      <Section teinte className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-10">
          <Intitule surtitre="Le créneau calme" titre={<>Une demi-heure <em>avant tout le monde.</em></>}>
            Avant l&apos;ouverture, le cabinet ne reçoit qu&apos;un rendez-vous à la fois. Même
            consultation, même prix ; seulement plus tôt, et plus bas.
          </Intitule>
          <ol className="space-y-0 border-l-2 border-[var(--accent)] pl-6">
            {DEROULE.map((d) => (
              <li key={d.heure} className="relative pb-7 last:pb-0">
                <span aria-hidden="true" className="absolute -left-[33px] top-1.5 h-4 w-4 rounded-full border-[3px] border-[#EFE8F7] bg-[var(--encre)]" />
                <p className="font-[family-name:var(--titres)] text-3xl tabular-nums">{d.heure}</p>
                <p className="text-lg leading-relaxed text-[var(--doux)]">{d.texte}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-[28px] lg:mt-24">
          <Image src={photos.caisse.src} alt={photos.caisse.alt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
        </div>
      </Section>

      <Section className="max-w-3xl space-y-4">
        <h2 className="text-[38px] sm:text-5xl">Une urgence&nbsp;?</h2>
        <p className="text-lg leading-relaxed text-[var(--doux)]">
          N&apos;attends pas un créneau : appelle le cabinet au{" "}
          <span className="font-semibold text-[var(--encre)] tabular-nums">{cabinet.telephone}</span> aux heures
          d&apos;ouverture. Le soir et le dimanche, le répondeur donne le numéro du service de
          garde du secteur. Numéro de fiction : il ne sonne chez personne.
        </p>
      </Section>
    </main>
  );
}
