import type { Metadata } from "next";
import Image from "next/image";
import { adressesDeLaPage } from "@/lib/seo";
import Apparition from "../../_kit/Apparition";
import CarteLueur from "../../_kit/CarteLueur";
import TitreRevele from "../../_kit/TitreRevele";
import Horloge from "../_composants/Horloge";
import { AppelFinal, EnTetePage, Surtitre } from "../_composants/Blocs";
import { cabinet, etapes, photos, rienAPreparer } from "../_composants/donnees";

export const metadata: Metadata = {
  title: "La première séance — Cinquante Minutes, site de démonstration",
  description:
    "Une horloge de cinquante minutes qui raconte la première séance chez une psychologue imaginaire : un déroulé, pas une promesse. Rien à préparer, rien à prouver.",
  ...adressesDeLaPage("/exemples/cinquante-minutes/premiere-seance"),
};

const PAS_PROMIS = ["Que vous irez mieux en sortant", "Un nombre de séances pour « régler » quoi que ce soit", "Que vous devrez tout dire"];

export default function PremiereSeance() {
  return (
    <main>
      <EnTetePage surtitre={`La première séance · ${cabinet.seance.duree}`} titre="Ce qui se passe, *minute après minute.*" photo={photos.sablier}>
        Une horloge de cinquante minutes. Faites glisser le temps : elle raconte la séance, sans
        rien promettre de ce que vous ressentirez.
      </EnTetePage>

      {/* L'horloge, en grand : celle que la vidéo filme. */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-8 md:py-28">
        <Apparition de="zoom">
          <Horloge />
        </Apparition>
      </section>

      {/* Les cinquante minutes, en entier. */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 sm:px-8 md:pb-32 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <Apparition><Surtitre>En entier</Surtitre></Apparition>
          <TitreRevele
            texte="Les cinquante minutes, *une à une.*"
            className="font-normal text-[clamp(2.6rem,5.4vw,4.8rem)] leading-[0.96] tracking-[-0.02em]"
            classeAccent="italic text-[var(--accent-texte)]"
          />
          <Apparition as="p" delai={150} className="max-w-md text-lg leading-relaxed text-[var(--doux)]">
            Un déroulé d&apos;exemple : chaque psychologue a sa façon de faire, et la durée
            d&apos;une séance varie d&apos;un cabinet à l&apos;autre.
          </Apparition>
        </div>
        <ol className="relative space-y-4 before:absolute before:bottom-6 before:left-[2.1rem] before:top-6 before:w-px before:bg-[var(--trait)]">
          {etapes.map((e, i) => (
            <Apparition as="li" key={e.minute} delai={i * 80} className="relative grid grid-cols-[4.2rem_1fr] gap-5">
              <span className="relative z-10 grid h-[4.2rem] w-[4.2rem] place-items-center rounded-full border border-[var(--trait)] bg-[var(--carte)] font-[family-name:var(--titres)] text-2xl italic tabular-nums">
                {e.minute}&apos;
              </span>
              <div className="rounded-[1.5rem] border border-[var(--trait)] bg-[var(--carte)] p-6">
                <h2 className="text-[1.9rem] font-normal italic leading-tight">{e.texte}</h2>
                <p className="mt-2 text-lg leading-relaxed text-[var(--doux)]">{e.detail}</p>
              </div>
            </Apparition>
          ))}
        </ol>
      </section>

      {/* Rien à préparer. */}
      <section className="px-3 sm:px-5">
        <div className="kit-grain relative overflow-hidden rounded-[2.5rem] bg-[var(--sombre)] text-[var(--sur-sombre)]">
          <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 md:py-32">
            <div className="mb-12 space-y-6">
              <Apparition><Surtitre clair>Avant de venir</Surtitre></Apparition>
              <TitreRevele
                texte="Rien à préparer. *Rien à prouver.*"
                className="font-normal text-[clamp(2.6rem,5.6vw,5rem)] leading-[0.96] tracking-[-0.02em]"
                classeAccent="italic text-[var(--accent)]"
              />
            </div>
            <ul className="grid gap-4 md:grid-cols-2">
              {rienAPreparer.map((r, i) => (
                <Apparition as="li" key={r.titre} delai={i * 110} de="zoom">
                  <CarteLueur className="h-full rounded-[1.75rem]">
                    <div className="h-full rounded-[1.75rem] border border-white/12 bg-white/[0.05] p-7">
                      <p className="font-[family-name:var(--titres)] text-4xl italic text-[var(--accent)] tabular-nums">0{i + 1}</p>
                      <h2 className="mt-3 text-2xl font-normal">{r.titre}</h2>
                      <p className="mt-2 leading-relaxed text-[var(--sur-sombre)]/90">{r.texte}</p>
                    </div>
                  </CarteLueur>
                </Apparition>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Ce qui n'est pas promis. */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-[1fr_0.8fr] lg:items-center">
        <div className="space-y-7">
          <Apparition><Surtitre>Ce que la séance ne promet pas</Surtitre></Apparition>
          <ul className="space-y-4">
            {PAS_PROMIS.map((p, i) => (
              <Apparition as="li" key={p} delai={i * 150} className="font-[family-name:var(--titres)] text-[clamp(1.7rem,3.4vw,2.8rem)] leading-[1.1] text-[var(--doux)]">
                <span className="kit-barre">{p}</span>
              </Apparition>
            ))}
          </ul>
          <Apparition as="p" delai={450} className="max-w-xl text-xl leading-relaxed">
            Une thérapie ne se promet pas. Une séance, si : elle dure cinquante minutes, et
            vous repartez sans engagement.
          </Apparition>
        </div>
        <Apparition de="rideau" className="relative mx-auto aspect-[4/5] w-full max-w-[380px] overflow-hidden rounded-t-[999px] rounded-b-[12px]">
          <Image src={photos.chaise.src} alt={photos.chaise.alt} fill sizes="380px" className="object-cover object-[60%_50%]" />
        </Apparition>
      </section>

      <AppelFinal />
    </main>
  );
}
