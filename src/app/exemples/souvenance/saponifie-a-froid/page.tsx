import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import TitreRevele from "../../_kit/TitreRevele";
import { AppelFinal, Bouton, EnTetePage, Surtitre } from "../_composants/Blocs";
import { CURE, DOSSIER, PHOTOS } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "Savon saponifié à froid, c'est quoi ? — Souvenance, site de démonstration",
  description: "Savon saponifié à froid, c'est quoi ? La réponse d'une savonnerie imaginaire, étape par étape, sans promesse sur la peau.",
  ...adressesDeLaPage("/exemples/souvenance/saponifie-a-froid"),
};

const ETAPES = [
  { titre: "Le mélange", texte: "Des huiles végétales et une solution de soude (hydroxyde de sodium), mélangées sans les chauffer. On manipule la soude avec des gants et des lunettes : elle est corrosive.", photo: PHOTOS.lavande },
  { titre: "La trace", texte: "Le mélange épaissit, comme une crème anglaise. On y verse le souvenir — la lavande et le cèdre, ou une composition parfumée — puis on coule dans le moule.", photo: PHOTOS.deux },
  { titre: "La saponification", texte: "Dans les jours qui suivent, la soude réagit avec les huiles : elles deviennent du savon, et de la glycérine se forme. C'est pour ça que l'étiquette dit « Sodium Olivate » et non « huile d'olive ».", photo: PHOTOS.rang },
  { titre: "La cure", texte: `Le savon coupé sèche ${CURE / 7} semaines sur des claies, à l'air. Il perd son eau et durcit. La durée exacte dépend de la recette.`, photo: PHOTOS.cure },
];

export default function SaponifieAFroid() {
  return (
    <main>
      <EnTetePage surtitre="La question qu'on nous pose le plus" titre={"Saponifié à froid, *c'est quoi ?*"} photo={PHOTOS.rang}>
        Un savon fabriqué en mélangeant des huiles et de la soude <strong>sans chauffer</strong>, puis séché plusieurs
        semaines avant d&apos;être utilisé.
      </EnTetePage>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <div className="mb-14 space-y-6">
          <Apparition><Surtitre>Étape par étape</Surtitre></Apparition>
          <TitreRevele
            texte="Quatre étapes, *cinq semaines.*"
            className="font-[family-name:var(--titres)] text-[clamp(2.8rem,6vw,5.4rem)] leading-[0.95] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
        </div>
        <ol className="grid gap-5 md:grid-cols-2">
          {ETAPES.map((e, i) => (
            <Apparition as="li" key={e.titre} delai={(i % 2) * 140} de="zoom" className="overflow-hidden rounded-[2rem] border border-[var(--trait)] bg-[var(--carte)]">
              <div className="relative aspect-[16/9]">
                <Image src={e.photo.src} alt={e.photo.alt} fill sizes="(min-width: 768px) 560px, 92vw" className="object-cover" />
                <span className="absolute left-5 top-5 grid h-14 w-14 place-items-center rounded-full bg-[var(--carte)] font-[family-name:var(--titres)] text-[26px] italic text-[var(--encre)]">{i + 1}</span>
              </div>
              <div className="space-y-3 p-6 sm:p-8">
                <h2 className="font-[family-name:var(--titres)] text-[32px] leading-tight">{e.titre}</h2>
                <p className="text-[18px] leading-relaxed text-[var(--doux)]">{e.texte}</p>
              </div>
            </Apparition>
          ))}
        </ol>
      </section>

      <section className="px-3 pb-5 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:px-10 md:py-28 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div className="space-y-6">
              <Apparition><Surtitre clair>Et à chaud&nbsp;?</Surtitre></Apparition>
              <TitreRevele
                texte="Les deux donnent *du savon.*"
                className="font-[family-name:var(--titres)] text-[clamp(2.6rem,5vw,4.6rem)] leading-[0.95] tracking-[-0.02em]"
                classeAccent="italic text-[#E8C4BC]"
              />
            </div>
            <Apparition delai={150} className="space-y-5 text-[18px] leading-relaxed text-[var(--sur-sombre)]/90">
              <p>
                À chaud, on chauffe le mélange pour accélérer la saponification ; la cure est plus courte. Nous coulons à
                froid, et chaque lot affiche ses dates.
              </p>
              <p>Ce que ce savon fait sur ta peau, on ne le promet pas : on te montre ce qu&apos;il y a dedans, lot par lot.</p>
              <Bouton href={`${DOSSIER}#lot`} variante="clair">Taper mon numéro de lot</Bouton>
            </Apparition>
          </div>
        </div>
      </section>

      <AppelFinal />
    </main>
  );
}
