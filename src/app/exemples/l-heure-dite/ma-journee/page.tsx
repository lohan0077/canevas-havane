import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import { AppelFinal, Appli, EnTetePage, Surtitre, Titre } from "../_composants/Blocs";
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
      <EnTetePage surtitre="Ta journée" titre="Ton toit, *heure par heure.*">
        Dis où regarde ton toit. La courbe te montre quand il produit, et le conseil te dit quand lancer la machine.
        C&apos;est une forme indicative : la vraie, on la mesure chez toi.
      </EnTetePage>

      <section className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <Apparition>
          <Appli titre="Ta journée" note="forme indicative">
            <Journee titre={false} />
          </Appli>
        </Apparition>
        <div className="space-y-8 lg:sticky lg:top-28">
          <Titre texte="Comment lire *la courbe.*" taille="moyen" />
          <ol className="divide-y divide-[var(--trait)] border-y border-[var(--trait)]">
            {LIRE.map((l, i) => (
              <Apparition as="li" key={l.titre} delai={i * 120} className="space-y-1 py-5">
                <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-[var(--doux)]">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="font-[family-name:var(--titres)] text-2xl font-normal">{l.titre}</h2>
                <p className="leading-relaxed text-[var(--doux)]">{l.texte}</p>
              </Apparition>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-28 md:grid-cols-2 md:items-center md:py-40">
          <div className="space-y-6">
            <Apparition><Surtitre clair>Ce que tu peux décaler</Surtitre></Apparition>
            <Titre texte="Fais tourner la maison *pendant ton pic.*" clair />
            <ul className="divide-y divide-white/15 border-y border-white/15">
              {DECALER.map((d, i) => (
                <Apparition as="li" key={d} delai={i * 100} className="py-3.5 text-lg">
                  {d}
                </Apparition>
              ))}
            </ul>
          </div>
          <Apparition className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--sombre)]">
            <Image src={photos.linge.src} alt={photos.linge.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </Apparition>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-6 px-6 py-28 md:py-40">
        <Apparition><Surtitre>D&apos;où vient cette forme</Surtitre></Apparition>
        <Titre texte="Une cloche, *pas une promesse.*" />
        <Apparition as="p" delai={150} className="text-lg leading-relaxed text-[var(--doux)]">
          Un panneau donne le plus quand le soleil lui fait face. Plein sud, c&apos;est vers le midi solaire : entre 12 h et
          14 h à l&apos;heure légale en France, selon la saison et la longitude. La courbe de cette page est une cloche centrée
          sur ce moment, décalée selon l&apos;orientation, coupée au lever et au coucher du soleil.
        </Apparition>
        <Apparition as="p" delai={250} className="text-lg leading-relaxed text-[var(--doux)]">
          Elle ne tient compte ni de la pente de ton toit, ni des ombres, ni de ta région. C&apos;est pour ça qu&apos;on vient
          voir, et qu&apos;après la pose, le suivi te montre ta vraie journée.
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
