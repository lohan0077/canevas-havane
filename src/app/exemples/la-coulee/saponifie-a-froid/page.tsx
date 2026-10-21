import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { adressesDeLaPage } from "@/lib/seo";
import { CURE, DOSSIER, PHOTOS } from "../_composants/donnees";
import { Coins, Technique } from "../_composants/Elements";

export const metadata: Metadata = {
  title: "La Coulée — site de démonstration",
  description: "Savon saponifié à froid, c'est quoi ? La réponse d'une savonnerie imaginaire, étape par étape, sans promesse.",
  ...adressesDeLaPage("/exemples/la-coulee/saponifie-a-froid"),
};

const ETAPES = [
  ["Le mélange", "Des huiles végétales et une solution de soude (hydroxyde de sodium), mélangées sans les chauffer. On manipule la soude avec des gants et des lunettes : elle est corrosive."],
  ["La trace", "Le mélange épaissit, comme une crème anglaise. On le verse dans le moule."],
  ["La saponification", "Dans les jours qui suivent, la soude réagit avec les huiles : elles deviennent du savon, et de la glycérine se forme. C'est pour ça que l'étiquette dit « Sodium Olivate » et non « huile d'olive »."],
  ["La cure", `Le savon coupé sèche ${CURE / 7} semaines sur des claies, à l'air. Il perd son eau et durcit. La durée exacte dépend de la recette.`],
];

export default function SaponifieAFroid() {
  return (
    <main>
      <section className="mx-auto max-w-4xl px-4 pb-8 pt-8 sm:px-8">
        <Technique>La question qu&apos;on nous pose le plus</Technique>
        <h1 className="mt-5 text-[46px] font-bold uppercase leading-[0.92] tracking-[-0.035em] sm:text-[80px]">Savon saponifié à froid, c&apos;est quoi&nbsp;?</h1>
        <p className="mt-6 text-[22px] leading-relaxed">
          Un savon fabriqué en mélangeant des huiles et de la soude <strong>sans chauffer</strong>, puis séché plusieurs
          semaines avant d&apos;être utilisé.
        </p>
      </section>
      <section className="mx-auto max-w-4xl px-4 sm:px-8">
        <div className="overflow-hidden rounded-[6px]">
          <Image src={PHOTOS.cure.src} alt={PHOTOS.cure.alt} width={PHOTOS.cure.largeur} height={PHOTOS.cure.hauteur} sizes="(min-width: 896px) 832px, 94vw" className="h-auto w-full" priority />
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
        <h2 className="text-[36px] font-bold uppercase leading-[0.95] tracking-[-0.03em] sm:text-5xl">Étape par étape.</h2>
        <ol className="mt-8 space-y-4">
          {ETAPES.map(([t, d], i) => (
            <li key={t} className="relative grid gap-2 p-6 sm:grid-cols-[120px_1fr]">
              <Coins couleur="var(--doux)" />
              <p className="font-mono text-[40px] font-bold leading-none text-[var(--accent-texte)]">0{i + 1}</p>
              <div className="space-y-1">
                <h3 className="text-[24px] font-bold uppercase">{t}</h3>
                <p className="text-[18px] leading-relaxed">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="bg-[var(--sombre)] text-[var(--sur-sombre)]">
        <div className="mx-auto max-w-4xl space-y-5 px-4 py-16 sm:px-8">
          <Technique clair>Et à chaud ?</Technique>
          <p className="text-[20px] leading-relaxed">
            À chaud, on chauffe le mélange pour accélérer la saponification ; la cure est plus courte. Les deux méthodes
            donnent du savon. Nous coulons à froid, et chaque lot affiche ses dates.
          </p>
          <p className="text-[16px] text-[#C9BEE3]">
            Ce que ce savon fait sur ta peau, on ne le promet pas : on te montre ce qu&apos;il y a dedans, lot par lot.
          </p>
          <Link href={`${DOSSIER}#lot`} className="inline-block rounded-[6px] bg-[var(--fond)] px-5 py-3 font-mono text-[13px] font-bold uppercase tracking-[0.12em] text-[var(--encre)]">Taper mon numéro de lot</Link>
        </div>
      </section>
    </main>
  );
}
