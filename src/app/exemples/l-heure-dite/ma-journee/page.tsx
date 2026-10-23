import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { ACCENT_CLAIR, AppelFinal, Appli, EnTetePage, Surtitre } from "../_composants/Blocs";
import Journee from "../_composants/Journee";
import { photos } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Ton toit, heure par heure — L'Heure Dite, site de démonstration",
  description:
    "Dis où regarde ton toit : la courbe montre quand il produit, et le conseil dit quand lancer la machine. Une forme indicative, pas une mesure. Site de démonstration.",
  ...adressesDeLaPage("/exemples/l-heure-dite/ma-journee"),
};

const LIRE = [
  { titre: "La hauteur", texte: "Ce que ton toit donne à cette heure-là, comparé au plus beau midi d'été. Pas de kilowattheures : une forme, pour comprendre ta journée." },
  { titre: "Le soleil", texte: "Il se pose sur le pic. Plein sud, vers 13 h 30 en été (heure légale) ; plus tôt à l'est, plus tard à l'ouest." },
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
    <main>
      <EnTetePage surtitre="Ta journée" titre="Ton toit, *heure par heure.*" photo={photos.ciel} origine="55% 40%">
        Dis où regarde ton toit. La courbe te montre quand il produit, et le conseil te dit quand lancer la
        machine. C&apos;est une forme indicative : la vraie, on la mesure chez toi.
      </EnTetePage>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <Apparition de="zoom">
          <Appli titre="Ta journée" note="forme indicative">
            <Journee titre={false} />
          </Appli>
        </Apparition>
        <div className="space-y-8 lg:sticky lg:top-28">
          <TitreRevele
            texte="Comment lire *la courbe.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.2rem,4vw,3.6rem)] leading-[1] tracking-[-0.03em]"
            classeAccent={ACCENT_CLAIR}
          />
          <ol className="space-y-6">
            {LIRE.map((l, i) => (
              <Apparition as="li" key={l.titre} delai={i * 120} className="grid grid-cols-[auto_1fr] gap-4">
                <span aria-hidden="true" className="grid h-11 w-11 place-items-center rounded-full border border-[var(--encre)] font-[family-name:var(--titres)] text-xl">{i + 1}</span>
                <div className="space-y-1">
                  <h2 className="font-[family-name:var(--titres)] text-2xl">{l.titre}</h2>
                  <p className="leading-relaxed text-[var(--doux)]">{l.texte}</p>
                </div>
              </Apparition>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-3 sm:px-5">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)] md:grid-cols-2">
          <div className="space-y-6 p-8 sm:p-12 md:py-20">
            <Apparition><Surtitre clair>Ce que tu peux décaler</Surtitre></Apparition>
            <TitreRevele
              texte="Fais tourner la maison *pendant ton pic.*"
              className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[0.98] tracking-[-0.03em]"
              classeAccent="italic text-[#F2B27A]"
            />
            <ul className="space-y-3">
              {DECALER.map((d, i) => (
                <Apparition as="li" key={d} delai={i * 100} className="flex gap-3 text-lg">
                  <span aria-hidden="true" className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]" />
                  {d}
                </Apparition>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[320px] bg-[var(--sombre)]">
            <Image src={photos.linge.src} alt={photos.linge.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-6 px-5 py-24 sm:px-8 md:py-32">
        <Apparition><Surtitre>D&apos;où vient cette forme</Surtitre></Apparition>
        <TitreRevele
          texte="Une cloche, *pas une promesse.*"
          className="font-[family-name:var(--titres)] text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[0.98] tracking-[-0.03em]"
          classeAccent={ACCENT_CLAIR}
        />
        <Apparition as="p" delai={150} className="text-lg leading-relaxed">
          Un panneau donne le plus quand le soleil lui fait face. Plein sud, c&apos;est vers le midi solaire : entre
          12 h et 14 h à l&apos;heure légale en France, selon la saison et la longitude. La courbe de cette page est une
          cloche centrée sur ce moment, décalée selon l&apos;orientation, coupée au lever et au coucher du soleil.
        </Apparition>
        <Apparition as="p" delai={250} className="text-lg leading-relaxed text-[var(--doux)]">
          Elle ne tient compte ni de la pente de ton toit, ni des ombres, ni de ta région. C&apos;est pour ça qu&apos;on
          vient voir, et qu&apos;après la pose, le suivi te montre ta vraie journée.
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
