import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import { photos } from "../_composants/donnees";
import { AppelFinal, Section, Surtitre } from "../_composants/Blocs";
import Journee from "../_composants/Journee";

export const metadata: Metadata = {
  title: "Ma journée · Midi Pile — site de démonstration",
  description: "Ta journée solaire heure par heure, selon l'orientation de ton toit, la saison et le ciel : une forme indicative, et l'heure où lancer la machine.",
  ...adressesDeLaPage("/exemples/midi-pile/ma-journee"),
};

const LIRE = [
  { titre: "La hauteur", texte: "Ce que ton toit donne à cette heure-là, comparé au plus beau midi d'été. Pas de kilowattheures : une forme, pour comprendre ta journée." },
  { titre: "Le soleil", texte: "Il se pose sur le pic. Plein sud, vers 13 h 30 en été (heure légale) ; plus tôt à l'est, plus tard à l'ouest." },
  { titre: "Le trait", texte: "L'heure que tu promènes avec le curseur. Sous la courbe, la phrase te dit, en mots, ce que ton toit donne à ce moment." },
];

const DECALER = [
  "Le lave-linge et le lave-vaisselle, avec leur départ différé",
  "Le chauffe-eau, s'il se programme",
  "Le sèche-linge, plutôt que le soir",
  "La recharge d'une voiture, si elle attend au garage",
];

export default function MaJournee() {
  return (
    <>
      <Section className="!pb-8 space-y-5">
        <Surtitre>Ma journée</Surtitre>
        <h1 className="text-[46px] sm:text-7xl font-semibold tracking-[-0.04em] max-w-3xl">Ton toit, heure par heure.</h1>
        <p className="text-lg sm:text-xl leading-relaxed max-w-2xl text-[var(--doux)]">
          Dis-nous où regarde ton toit. La courbe te montre quand il produit, et le conseil te dit
          quand lancer la machine. C'est une forme indicative : la vraie, on la mesure chez toi.
        </p>
      </Section>

      <Section className="!pt-0 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <Journee titre={false} />
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">Comment lire la courbe</h2>
          <ol className="space-y-5">
            {LIRE.map((l, i) => (
              <li key={l.titre} className="grid grid-cols-[auto_1fr] gap-4">
                <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-[var(--encre)] font-bold tabular-nums">{i + 1}</span>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{l.titre}</h3>
                  <p className="leading-relaxed text-[var(--doux)]">{l.texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <div className="bg-[var(--carte)] border-y border-[var(--trait)]">
        <Section className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <Surtitre>Ce que tu peux décaler</Surtitre>
            <h2 className="text-[38px] sm:text-5xl font-semibold tracking-[-0.02em]">Fais tourner la maison pendant ton pic.</h2>
            <ul className="space-y-3">
              {DECALER.map((d) => (
                <li key={d} className="flex gap-3 text-lg">
                  <span aria-hidden="true" className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[3/2] overflow-hidden rounded-[30px]">
            <Image src={photos.linge.src} alt={photos.linge.alt} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
          </div>
        </Section>
      </div>

      <Section className="!max-w-3xl space-y-4">
        <Surtitre>D'où vient cette forme</Surtitre>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">Une cloche, pas une promesse.</h2>
        <p className="text-lg leading-relaxed">
          Un panneau donne le plus quand le soleil lui fait face. Plein sud, c'est vers le midi
          solaire : entre 12 h et 14 h à l'heure légale en France, selon la saison et la
          longitude. La courbe de cette page est une cloche centrée sur ce moment, décalée selon
          l'orientation, coupée au lever et au coucher du soleil.
        </p>
        <p className="text-lg leading-relaxed">
          Elle ne tient compte ni de la pente de ton toit, ni des ombres, ni de ta région. C'est
          pour ça qu'on vient voir, et qu'après la pose, le suivi te montre ta vraie journée.
        </p>
      </Section>

      <AppelFinal />
    </>
  );
}
